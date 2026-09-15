import Link from "next/link";
import { Media } from "@/components/ui/media";

const primaryLinks = [
  ["/program", "Program Belajar"],
  ["/tutor", "Tim Tutor"],
  ["/prestasi", "Prestasi Siswa"],
  ["/tentang-kami", "Tentang Kami"],
] as const;

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="stack">
          <Link href="/" className="brand">
            <Media src="/logo.png" alt="Logo Bimbel YS" className="media-logo" />
            <span>
              Bimbel YS
              <small>LEARN · GROW · ACHIEVE</small>
            </span>
          </Link>

          <p>
            Enabling students to advance in their education. Temukan langkah belajar
            berikutnya bersama kami.
          </p>
        </div>

        <div>
          <h3>Jelajahi Bimbel YS</h3>
          <ul className="footer-links">
            {primaryLinks.map(([href, label]) => (
              <li key={href}>
                <Link href={href}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Mari terhubung</h3>
          <p style={{ marginTop: "1.25rem" }}>
            Informasi program, konsultasi, dan lokasi belajar.
          </p>
          <ul className="footer-links">
            <li>
              <Link href="/contact">Kontak & lokasi cabang →</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Bimbel YS. Seluruh hak cipta dilindungi.</span>
        <Link href="/admin">Portal Admin</Link>
      </div>
    </footer>
  );
}
