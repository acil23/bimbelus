import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container section center stack">
      <span className="eyebrow">404 · Konten tidak tersedia</span>
      <h1>Halaman belum ditemukan.</h1>
      <p className="muted">Konten mungkin dipindahkan atau sudah tidak aktif.</p>

      <div className="actions" style={{ justifyContent: "center" }}>
        <Link className="btn btn-gold" href="/">
          Kembali ke beranda
        </Link>
        <Link className="btn btn-outline" href="/program">
          Jelajahi program
        </Link>
      </div>
    </section>
  );
}
