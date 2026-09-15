"use client";

import Link from "next/link";
import { RefreshCw } from "lucide-react";

export function ErrorState({
  reset,
  admin = false,
}: {
  reset: () => void;
  admin?: boolean;
}) {
  return (
    <section className="container section">
      <div className="card rich-panel stack" role="alert">
        <span className="eyebrow">Ada kendala</span>
        <h1 style={{ fontSize: "2rem" }}>Konten belum dapat dimuat.</h1>
        <p className="muted">
          Coba kembali beberapa saat lagi. {" "}
          {admin
            ? "Jika sesi berakhir, masuk kembali ke akun admin."
            : "Koneksi ke layanan data mungkin sedang terganggu."}
        </p>

        <div className="actions">
          <button type="button" className="btn btn-gold" onClick={reset}>
            <RefreshCw size={17} aria-hidden="true" />
            Coba lagi
          </button>

          <Link className="btn btn-outline" href={admin ? "/admin/login" : "/"}>
            {admin ? "Halaman login" : "Kembali ke beranda"}
          </Link>
        </div>
      </div>
    </section>
  );
}
