"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  Archive,
  ArrowLeft,
  ArrowRight,
  Pencil,
  Plus,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { apiClient } from "@/lib/api/client";
import { categoryLabels, priceUnits, formatPrice } from "@/lib/ui/format";
import { Media } from "@/components/ui/media";
import { EmptyState } from "@/components/ui/empty-state";
import { resources, type CmsRow, type ResourceKey } from "./resources";
import { RecordForm } from "./record-form";
import { Modal } from "./modal";

type Pagination = {
  page: number;
  pages: number;
  pageSize: number;
  total: number;
};

type PageResult = {
  items: CmsRow[];
  pagination: Pagination;
};

type Props = {
  resource: ResourceKey;
  initialItems: object[];
  parentId?: string;
  onRefresh?: () => Promise<void>;
  disabled?: boolean;
};

function rows(value: unknown): CmsRow[] {
  return Array.isArray(value)
    ? value.filter(
        (item): item is CmsRow =>
          Boolean(item && typeof item === "object" && typeof item.id === "string"),
      )
    : [];
}

function display(value: unknown) {
  return value == null ? "" : String(value);
}

export function ResourceManager({
  resource,
  initialItems,
  parentId = "",
  onRefresh,
  disabled = false,
}: Props) {
  const definition = resources[resource];
  const root = Boolean(definition.root);
  const id = useId();

  const [items, setItems] = useState<CmsRow[]>(() => rows(initialItems));
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    pages: 1,
    pageSize: 10,
    total: initialItems.length,
  });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [status, setStatus] = useState("active");
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(root);
  const [ready, setReady] = useState(!root);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [editor, setEditor] = useState<{ row?: CmsRow } | null>(null);
  const [confirm, setConfirm] = useState<{ row: CmsRow; restore: boolean } | null>(null);
  const [working, setWorking] = useState(false);
  const [operationError, setOperationError] = useState("");

  const lock = useRef(false);
  const controller = useRef<AbortController | null>(null);

  const load = useCallback(async () => {
    if (!root) {
      return;
    }

    controller.current?.abort();
    const request = new AbortController();
    controller.current = request;

    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams({
        page: String(page),
        pageSize: String(pageSize),
        status,
        search: query,
      });

      const result = await apiClient<PageResult>(`/api/admin/content/${resource}?${params}`, {
        signal: request.signal,
      });

      if (request.signal.aborted) {
        return;
      }

      setItems(result.items);
      setPagination(result.pagination);
      setPage(result.pagination.page);
      setReady(true);
    } catch (cause) {
      if (!request.signal.aborted) {
        setError(cause instanceof Error ? cause.message : "Daftar gagal dimuat.");
        setReady(false);
      }
    } finally {
      if (!request.signal.aborted) {
        setLoading(false);
      }
    }
  }, [root, resource, page, pageSize, status, query]);

  useEffect(() => {
    if (root) {
      void load();
    }

    return () => controller.current?.abort();
  }, [root, load]);

  async function refresh() {
    if (root) {
      await load();
      return;
    }

    await onRefresh?.();
  }

  const visibleItems = root ? items : rows(initialItems);
  const unavailable = disabled || loading || working || !ready;

  async function save(data: unknown) {
    if (editor?.row) {
      await definition.update(editor.row.id, data);
    } else {
      await definition.create(parentId, data);
    }

    setEditor(null);
    setNotice(`${definition.singular} berhasil disimpan.`);
    await refresh();
  }

  async function confirmOperation() {
    if (!confirm || lock.current) {
      return;
    }

    lock.current = true;
    setWorking(true);
    setOperationError("");

    try {
      if (confirm.restore && definition.restore) {
        await definition.restore(confirm.row.id);
      } else {
        await definition.remove(confirm.row.id);
      }

      setConfirm(null);
      setNotice(
        confirm.restore
          ? "Data berhasil dipulihkan."
          : definition.restore
            ? "Data dipindahkan ke arsip."
            : "Data berhasil dihapus.",
      );
      await refresh();
    } catch (cause) {
      setOperationError(cause instanceof Error ? cause.message : "Operasi gagal. Coba lagi.");
    } finally {
      lock.current = false;
      setWorking(false);
    }
  }

  const renderSearchForm = root && (
    <form
      className="toolbar"
      onSubmit={(event) => {
        event.preventDefault();
        setPage(1);
        setQuery(search.trim());
      }}
    >
      <div className="field search-field">
        <label htmlFor={`${id}-search`}>Cari {definition.singular}</label>
        <input
          id={`${id}-search`}
          type="search"
          maxLength={150}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Nama atau kata kunci…"
        />
      </div>

      <button type="submit" className="btn btn-outline" disabled={loading}>
        Cari
      </button>

      <div className="field">
        <label htmlFor={`${id}-status`}>Status konten</label>
        <select
          id={`${id}-status`}
          value={status}
          onChange={(event) => {
            setStatus(event.target.value);
            setPage(1);
          }}
        >
          <option value="active">Aktif</option>
          <option value="archived">Arsip</option>
          <option value="all">Semua</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor={`${id}-size`}>Per halaman</label>
        <select
          id={`${id}-size`}
          value={pageSize}
          onChange={(event) => {
            setPageSize(Number(event.target.value));
            setPage(1);
          }}
        >
          {[10, 20, 50].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
    </form>
  );

  const renderRows = visibleItems.length ? (
    <div className="admin-list">
      {visibleItems.map((row) => {
        const label = display(row[definition.labelKey]) || definition.singular;
        const archived = row.is_active === false;
        const secondary = display(row[definition.secondaryKey]);

        return (
          <article className="card admin-row" key={row.id}>
            <div className="admin-row-head">
              <div className="admin-row-info">
                {definition.imageKey && <Media src={display(row[definition.imageKey])} alt={label} />}

                <div>
                  <h3>{label}</h3>
                  <p className="small muted">
                    {categoryLabels[secondary] ?? priceUnits[secondary] ?? secondary}
                  </p>

                  {typeof row.price === "number" && <p className="small">{formatPrice(row.price)}</p>}

                  {definition.restore && (
                    <span className={`badge ${archived ? "badge-archived" : "badge-active"}`}>
                      {archived ? "Arsip" : "Aktif"}
                    </span>
                  )}

                  {row.is_featured === true && (
                    <span className="badge badge-gold">Unggulan</span>
                  )}

                  <span className="small muted">Urutan: {display(row.display_order) || "0"}</span>
                </div>
              </div>

              <div className="actions">
                <button
                  type="button"
                  disabled={unavailable}
                  className="btn btn-outline btn-small"
                  aria-label={`Edit ${label}`}
                  onClick={() => setEditor({ row })}
                >
                  <Pencil size={15} aria-hidden="true" />
                  Edit
                </button>

                {archived && definition.restore ? (
                  <button
                    type="button"
                    disabled={unavailable}
                    className="btn btn-small"
                    onClick={() => {
                      setOperationError("");
                      setConfirm({ row, restore: true });
                    }}
                  >
                    <RotateCcw size={15} aria-hidden="true" />
                    Pulihkan
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={unavailable}
                    className="btn btn-danger btn-small"
                    aria-label={`${definition.restore ? "Arsipkan" : "Hapus"} ${label}`}
                    onClick={() => {
                      setOperationError("");
                      setConfirm({ row, restore: false });
                    }}
                  >
                    {definition.restore ? (
                      <Archive size={15} aria-hidden="true" />
                    ) : (
                      <Trash2 size={15} aria-hidden="true" />
                    )}
                    {definition.restore ? "Arsipkan" : "Hapus"}
                  </button>
                )}
              </div>
            </div>

            {definition.children && (
              <details>
                <summary>
                  Kelola {definition.children.map((child) => child.title.toLowerCase()).join(" & ")}
                </summary>

                {archived && (
                  <p className="small muted">
                    Induk diarsipkan. Paket atau profil tidak tampil di publik sampai induk
                    dipulihkan.
                  </p>
                )}

                {definition.children.map((child) => (
                  <ResourceManager
                    key={child.key}
                    resource={child.key}
                    parentId={row.id}
                    initialItems={rows(row[child.property])}
                    onRefresh={refresh}
                    disabled={unavailable}
                  />
                ))}
              </details>
            )}
          </article>
        );
      })}
    </div>
  ) : (
    <EmptyState
      title={status === "archived" ? "Arsip masih kosong" : "Belum ada data yang cocok"}
      description="Tambahkan konten baru atau ubah pencarian dan status."
    />
  );

  const renderPagination = root && ready && (
    <nav className="pagination" aria-label={`Pagination ${definition.title}`}>
      <span role="status">
        {pagination.total} data · Halaman {pagination.page} dari {pagination.pages}
        {loading ? " · Memuat…" : ""}
      </span>

      <div className="actions">
        <button
          type="button"
          className="btn btn-outline btn-small"
          disabled={loading || page <= 1}
          onClick={() => setPage(page - 1)}
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Sebelumnya
        </button>
        <button
          type="button"
          className="btn btn-outline btn-small"
          disabled={loading || page >= pagination.pages}
          onClick={() => setPage(page + 1)}
        >
          Berikutnya
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    </nav>
  );

  return (
    <section className={root ? "" : "nested-manager"} aria-label={definition.title}>
      <div className="section-head">
        <div>
          <h3>{definition.title}</h3>
          <p className="small muted">
            {definition.restore
              ? "Kelola konten aktif dan pulihkan kembali data yang diarsipkan."
              : "Riwayat yang dihapus tidak dapat dipulihkan."}
          </p>
        </div>

        <button
          className="btn btn-gold btn-small"
          type="button"
          disabled={unavailable}
          onClick={() => setEditor({})}
        >
          <Plus size={17} aria-hidden="true" />
          Tambah {definition.singular}
        </button>
      </div>

      {notice && (
        <div className="alert alert-success" role="status">
          {notice}
        </div>
      )}

      {renderSearchForm}

      {error && (
        <div className="alert alert-error" role="alert">
          {error} {" "}
          <button type="button" className="text-link" onClick={() => void load()}>
            Muat ulang
          </button>
        </div>
      )}

      <div aria-busy={loading}>
        {loading && !ready ? (
          <div className="stack" role="status">
            <span className="muted">Memuat daftar…</span>
            <div className="skeleton" />
            <div className="skeleton" />
          </div>
        ) : !ready ? (
          <EmptyState
            title="Data belum dapat dimuat"
            description="Coba muat ulang. Jika sesi berakhir, masuk kembali melalui halaman login."
          />
        ) : (
          renderRows
        )}
      </div>

      {renderPagination}

      {editor && (
        <Modal
          title={`${editor.row ? "Edit" : "Tambah"} ${definition.singular}`}
          onClose={() => setEditor(null)}
          busy={working}
        >
          <RecordForm
            spec={definition}
            initial={editor.row}
            onSave={save}
            onCancel={() => setEditor(null)}
            onBusy={setWorking}
          />
        </Modal>
      )}

      {confirm && (
        <Modal
          title={
            confirm.restore
              ? "Pulihkan data?"
              : definition.restore
                ? "Pindahkan ke arsip?"
                : "Hapus permanen?"
          }
          onClose={() => setConfirm(null)}
          busy={working}
        >
          {operationError && (
            <div className="alert alert-error" role="alert">
              {operationError}
            </div>
          )}

          <p>
            <strong>{display(confirm.row[definition.labelKey]) || definition.singular}</strong>
          </p>

          <p className="muted" style={{ marginTop: ".75rem" }}>
            {confirm.restore
              ? "Data diaktifkan kembali. Konten anak tetap mengikuti statusnya masing-masing."
              : definition.restore
                ? "Data tidak lagi ditampilkan pada halaman publik. Kamu dapat memulihkannya dari arsip; konten anak tidak dihapus."
                : "Data ini akan dihapus permanen. Tindakan ini tidak bisa dibatalkan."}
          </p>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-outline"
              disabled={working}
              onClick={() => setConfirm(null)}
            >
              Batal
            </button>

            <button
              type="button"
              className={`btn ${confirm.restore ? "btn-gold" : "btn-danger"}`}
              disabled={working}
              onClick={() => void confirmOperation()}
            >
              {working
                ? "Memproses…"
                : confirm.restore
                  ? "Ya, pulihkan"
                  : definition.restore
                    ? "Ya, arsipkan"
                    : "Ya, hapus permanen"}
            </button>
          </div>
        </Modal>
      )}
    </section>
  );
}
