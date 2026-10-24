import Link from "next/link";
import { Compass, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="container section">
      <div className="card max-w-2xl mx-auto overflow-hidden">
        <div className="terminal-bar">
          <span className="inline-flex items-center gap-1.5 text-amber-400">
            <Compass size={13} aria-hidden="true" />
            <span>PETUNJUK HALAMAN · 404</span>
          </span>
          <span>Bimbel YS</span>
        </div>

        <div className="rich-panel center stack items-center py-12">
          <span className="eyebrow">404 · Konten tidak tersedia</span>
          <h1>Halaman belum ditemukan.</h1>
          <p className="muted max-w-md">
            Konten mungkin dipindahkan atau sudah tidak aktif.
          </p>

          <div className="actions" style={{ justifyContent: "center" }}>
            <Link className="btn btn-gold" href="/">
              Kembali ke beranda
            </Link>
            <Link className="btn btn-outline" href="/program">
              Jelajahi program
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
