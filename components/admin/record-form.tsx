"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { apiClient, ApiClientError } from "@/lib/api/client";
import { Media } from "@/components/ui/media";
import type { FormSpec } from "./resources";

type Props = {
  spec: FormSpec;
  initial?: object;
  onSave: (data: unknown) => Promise<void>;
  onCancel?: () => void;
  onBusy?: (busy: boolean) => void;
  submitLabel?: string;
};

export function RecordForm({
  spec,
  initial = {},
  onSave,
  onCancel,
  onBusy,
  submitLabel = "Simpan perubahan",
}: Props) {
  const id = useId();
  const form = useRef<HTMLFormElement>(null);
  const lock = useRef(false);

  const [values, setValues] = useState<Record<string, string | boolean>>(() => {
    const input = initial as Record<string, unknown>;

    return Object.fromEntries(
      spec.fields.map((field) => {
        const value =
          input[field.name] ??
          field.initial ??
          (field.type === "select" ? Object.keys(field.options ?? {})[0] : "");

        return [
          field.name,
          field.type === "checkbox" ? Boolean(value) : String(value ?? ""),
        ];
      }),
    );
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  function setWorking(value: boolean) {
    lock.current = value;
    setBusy(value);
    onBusy?.(value);
  }

  function change(name: string, value: string | boolean) {
    setValues((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: "" }));
    setNotice("");
  }

  async function upload(name: string, file?: File) {
    if (!file || lock.current) {
      return;
    }

    if (!spec.folder) {
      return;
    }

    const isValidType = ["image/jpeg", "image/png", "image/webp"].includes(file.type);
    const isValidSize = file.size > 0 && file.size <= 5 * 1024 * 1024;

    if (!isValidType || !isValidSize) {
      setErrors((previous) => ({
        ...previous,
        [name]: "Pilih JPEG, PNG, atau WebP berukuran 1 byte sampai 5 MB.",
      }));
      return;
    }

    setWorking(true);
    setMessage("");

    try {
      const data = new FormData();
      data.append("file", file);
      data.append("folder", spec.folder);

      const result = await apiClient<{ url: string; key: string }>("/api/uploads", {
        method: "POST",
        body: data,
      });

      change(name, result.url);
      setNotice("Gambar terunggah. Simpan formulir untuk menghubungkannya ke konten.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Upload gagal. Coba lagi.");
    } finally {
      setWorking(false);
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (lock.current) {
      return;
    }

    setMessage("");
    setNotice("");

    const raw = Object.fromEntries(
      spec.fields.map((field) => {
        const value = values[field.name];

        if (field.type === "checkbox") {
          return [field.name, Boolean(value)];
        }

        const text = String(value ?? "").trim();

        return [
          field.name,
          field.type === "number"
            ? text === "" ? null : Number(text)
            : text === "" && !field.required ? null : text,
        ];
      }),
    );

    const result = spec.schema.safeParse(raw);

    if (!result.success) {
      const next: Record<string, string> = {};

      for (const issue of result.error.issues) {
        const name = String(issue.path[0] ?? "");
        next[name] ??= issue.message;
      }

      setErrors(next);
      setMessage("Periksa isian yang ditandai sebelum menyimpan.");

      const first = spec.fields.find((field) => next[field.name]);

      if (first) {
        (form.current?.elements.namedItem(first.name) as HTMLElement | null)?.focus();
      }

      return;
    }

    setErrors({});
    setWorking(true);

    try {
      await onSave(result.data);
      setNotice("Perubahan berhasil disimpan.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Penyimpanan gagal. Coba lagi.");

      if (
        error instanceof ApiClientError &&
        error.details &&
        typeof error.details === "object" &&
        "fieldErrors" in error.details
      ) {
        const fields = error.details.fieldErrors;

        if (fields && typeof fields === "object") {
          setErrors(
            Object.fromEntries(
              Object.entries(fields).map(([name, values]) => [
                name,
                Array.isArray(values) ? values.join(" ") : String(values),
              ]),
            ),
          );
        }
      }
    } finally {
      setWorking(false);
    }
  }

  return (
    <form ref={form} onSubmit={submit} aria-busy={busy}>
      {message && (
        <div className="alert alert-error" role="alert">
          {message}
        </div>
      )}

      {notice && (
        <div className="alert alert-success" role="status">
          {notice}
        </div>
      )}

      <fieldset
        disabled={busy}
        style={{ border: 0, padding: 0, margin: 0, minWidth: 0 }}
      >
        <div className="form-grid">
          {spec.fields.map((field) => {
            const inputId = `${id}-${field.name}`;
            const error = errors[field.name];
            const describedBy = `${inputId}-hint${error ? ` ${inputId}-error` : ""}`;
            const common = {
              id: inputId,
              name: field.name,
              required: field.required,
              "aria-invalid": Boolean(error),
              "aria-describedby": describedBy,
            };

            const fieldWide = ["textarea", "image", "checkbox"].includes(field.type ?? "");

            return (
              <div key={field.name} className={`field ${fieldWide ? "field-wide" : ""}`}>
                {field.type === "checkbox" ? (
                  <label className="checkbox-label" htmlFor={inputId}>
                    <input
                      {...common}
                      type="checkbox"
                      checked={Boolean(values[field.name])}
                      onChange={(event) => change(field.name, event.target.checked)}
                    />
                    {field.label}
                  </label>
                ) : (
                  <>
                    <label htmlFor={inputId}>
                      {field.label}
                      {field.required ? " *" : ""}
                    </label>

                    {field.type === "textarea" ? (
                      <textarea
                        {...common}
                        maxLength={field.maxLength}
                        value={String(values[field.name] ?? "")}
                        onChange={(event) => change(field.name, event.target.value)}
                      />
                    ) : field.type === "select" ? (
                      <select
                        {...common}
                        value={String(values[field.name] ?? "")}
                        onChange={(event) => change(field.name, event.target.value)}
                      >
                        {Object.entries(field.options ?? {}).map(([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        {...common}
                        type={field.type === "image" ? "url" : field.type ?? "text"}
                        maxLength={field.maxLength}
                        min={field.min}
                        max={field.max}
                        step={field.type === "number" ? 1 : undefined}
                        value={String(values[field.name] ?? "")}
                        onChange={(event) => change(field.name, event.target.value)}
                      />
                    )}
                  </>
                )}

                {field.name === "slug" && (
                  <button
                    type="button"
                    className="text-link"
                    onClick={() =>
                      change(
                        "slug",
                        String(values.name ?? "")
                          .normalize("NFKD")
                          .replace(/[\u0300-\u036f]/g, "")
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/^-|-$/g, "")
                          .slice(0, 180)
                          .replace(/-$/, ""),
                      )
                    }
                  >
                    Buat slug dari nama
                  </button>
                )}

                {field.type === "image" && spec.folder && (
                  <>
                    <label htmlFor={`${inputId}-file`} className="field-label">
                      Unggah file
                    </label>
                    <input
                      id={`${inputId}-file`}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        event.target.value = "";
                        void upload(field.name, file);
                      }}
                    />

                    {values[field.name] && (
                      <div className="stack">
                        <Media
                          src={String(values[field.name])}
                          alt={field.label}
                          className="upload-preview"
                        />
                        <button
                          type="button"
                          className="text-link"
                          onClick={() => change(field.name, "")}
                        >
                          Lepaskan gambar dari formulir
                        </button>
                      </div>
                    )}
                  </>
                )}

                <span id={`${inputId}-hint`} className="field-hint">
                  {field.hint ?? (field.required ? "Wajib diisi." : "Opsional.")}
                </span>

                {error && (
                  <span id={`${inputId}-error`} className="field-error">
                    {error}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="form-actions">
          {onCancel && (
            <button type="button" className="btn btn-outline" onClick={onCancel}>
              Batal
            </button>
          )}

          <button type="submit" className="btn btn-gold">
            {busy ? "Memproses…" : submitLabel}
          </button>
        </div>
      </fieldset>
    </form>
  );
}
