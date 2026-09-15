import Link from "next/link";
import { Media } from "@/components/ui/media";
import LoginForm from "./login-form";

export const metadata = { title: "Masuk" };

export default function AdminLoginPage() {
  return (
    <main className="login-layout">
      <aside className="login-story">
        <span className="eyebrow" style={{ color: "var(--gold)" }}>
          Bimbel YS · Content Studio
        </span>
        <h2>Konten yang baik membuka lebih banyak kesempatan.</h2>
        <p>
          Kelola program, kenalkan tim pengajar, dan ceritakan pencapaian siswa dari satu
          ruang kerja.
        </p>
        <Link href="/" className="text-link" style={{ color: "var(--gold)" }}>
          ← Kembali ke website
        </Link>
      </aside>

      <section className="login-form-wrap">
        <div className="login-form-panel">
          <Link href="/" className="brand" style={{ marginBottom: "2rem" }}>
            <Media src="/logo.png" alt="Logo Bimbel YS" className="media-logo" />
            <span>
              Bimbel YS
              <small>CONTENT STUDIO</small>
            </span>
          </Link>

          <h1>Masuk ke ruang kerja</h1>
          <p className="muted" style={{ marginTop: "1rem" }}>
            Gunakan akun admin untuk mengelola konten website.
          </p>

          <LoginForm />

          <Link href="/" className="text-link" style={{ marginTop: "2rem" }}>
            ← Kembali ke website
          </Link>
        </div>
      </section>
    </main>
  );
}
