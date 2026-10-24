import Link from "next/link";
import { Terminal, ShieldCheck } from "lucide-react";
import { Media } from "@/components/ui/media";
import LoginForm from "./login-form";

export const metadata = { title: "Masuk" };

export default function AdminLoginPage() {
  return (
    <main className="login-layout">
      <aside className="login-story">
        <div className="inline-flex items-center gap-2 font-mono-tech text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-3 py-1.5 rounded-full w-fit">
          <ShieldCheck size={14} aria-hidden="true" />
          <span>AUTH GATEWAY · TLS ENCRYPTED</span>
        </div>

        <span className="eyebrow">Bimbel YS · Content Studio</span>

        <h2>Konten yang baik membuka lebih banyak kesempatan.</h2>

        <p>
          Kelola program, kenalkan tim pengajar, dan ceritakan pencapaian siswa dari satu
          ruang kerja terpadu.
        </p>

        <div className="card max-w-md border-slate-800/80">
          <div className="terminal-bar">
            <span className="terminal-dots" aria-hidden="true">
              <span className="terminal-dot terminal-dot--red" />
              <span className="terminal-dot terminal-dot--amber" />
              <span className="terminal-dot terminal-dot--green" />
            </span>
            <span>ys-cli — status</span>
          </div>
          <div className="p-4 font-mono-tech text-xs text-slate-400 space-y-1.5">
            <p className="text-slate-300">
              <span className="text-amber-400">$</span> ys-studio --check-modules
            </p>
            <p className="text-emerald-400">✓ modules/programs [READY]</p>
            <p className="text-emerald-400">✓ modules/tutors [READY]</p>
            <p className="text-emerald-400">✓ modules/achievements [READY]</p>
          </div>
        </div>

        <Link href="/" className="text-link">
          ← Kembali ke website
        </Link>
      </aside>

      <section className="login-form-wrap">
        <div className="login-form-panel">
          <div className="terminal-bar -mx-9 -mt-9 mb-6 rounded-t-2xl">
            <span className="terminal-dots" aria-hidden="true">
              <span className="terminal-dot terminal-dot--red" />
              <span className="terminal-dot terminal-dot--amber" />
              <span className="terminal-dot terminal-dot--green" />
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Terminal size={12} aria-hidden="true" />
              auth://admin/login
            </span>
          </div>

          <Link href="/" className="brand" style={{ marginBottom: "1.75rem" }}>
            <Media src="/logo.png" alt="Logo Bimbel YS" className="media-logo" />
            <span>
              Bimbel YS
              <small>CONTENT STUDIO</small>
            </span>
          </Link>

          <h1>Masuk ke ruang kerja</h1>
          <p className="muted" style={{ marginTop: "0.75rem" }}>
            Gunakan akun admin untuk mengelola konten website.
          </p>

          <LoginForm />

          <Link href="/" className="text-link" style={{ marginTop: "1.75rem" }}>
            ← Kembali ke website
          </Link>
        </div>
      </section>
    </main>
  );
}
