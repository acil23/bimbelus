import Link from "next/link";
import { Globe, ShieldCheck } from "lucide-react";
import { Media } from "@/components/ui/media";

export function Footer() {
  return (
    <footer className="site-footer-wrap">
      <div className="container">
        <div className="site-footer-box">
          <div className="footer-design-grid">
            {/* Left Column: Kontak */}
            <div className="footer-col-left">
              <h3>Kontak</h3>
              <ul className="footer-contact-list">
                <li>
                  <Link href="/contact">Sungai Kambut &amp; Sungai Duo, Dharmasraya</Link>
                </li>
                <li>
                  <a href="mailto:info@bimbelys.me">info@bimbelys.me</a>
                </li>
                <li>
                  <Link href="/">www.bimbelys.me</Link>
                </li>
              </ul>
            </div>

            {/* Center Column: 3D Emblem with Orbital Ring */}
            <div className="footer-col-center">
              <Link href="/" className="footer-3d-emblem" aria-label="Beranda Bimbel YS">
                <div className="footer-emblem-orbit" aria-hidden="true" />
                <div className="footer-emblem-sphere">
                  <Media src="/logo.png" alt="Logo Bimbel YS" className="media-logo" />
                </div>
              </Link>
              <span className="footer-copyright">
                Copyright {new Date().getFullYear()} Bimbel YS
              </span>
            </div>

            {/* Right Column: Media Sosial & Links */}
            <div className="footer-col-right">
              <h3>Media Sosial</h3>
              <div className="footer-social-row">
                <span className="footer-social-badges" aria-hidden="true">
                  <span className="footer-social-circle">f</span>
                  <span className="footer-social-circle">◎</span>
                </span>
                <Link href="/contact" className="hover:text-[#F4A261] transition-colors">
                  @bimbelys
                </Link>
              </div>
              <div className="footer-social-row mt-2">
                <span className="footer-social-circle" aria-hidden="true">
                  <Globe size={13} />
                </span>
                <Link href="/tentang-kami" className="hover:text-[#F4A261] transition-colors">
                  Bimbel YS
                </Link>
              </div>
              <div className="mt-3">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 text-xs text-blue-200/75 hover:text-[#F4A261] transition-colors"
                >
                  <ShieldCheck size={14} aria-hidden="true" />
                  <span>Portal Admin</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
