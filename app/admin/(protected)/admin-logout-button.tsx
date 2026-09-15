"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { logout } from "@/lib/api/auth";

export default function AdminLogoutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const lock = useRef(false);

  async function handleLogout() {
    if (lock.current) {
      return;
    }

    lock.current = true;
    setBusy(true);
    setError("");

    try {
      await logout();
      router.replace("/admin/login");
      router.refresh();
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Gagal keluar. Coba lagi.",
      );
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        className="btn btn-outline btn-small"
        disabled={busy}
        onClick={() => void handleLogout()}
      >
        <LogOut size={16} aria-hidden="true" />
        {busy ? "Keluar…" : "Keluar"}
      </button>

      {error && (
        <p className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
