import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaBand({
  title = "Langkah besar dimulai dari belajar hari ini.",
  description = "Ceritakan kebutuhan belajarmu. Tim kami membantu memilih program yang sesuai.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="section container">
      <div className="cta">
        <div>
          <span className="eyebrow" style={{ color: "var(--gold)" }}>
            Bersama Bimbel YS
          </span>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>

        <div className="actions">
          <Link href="/contact" className="btn btn-gold">
            Hubungi Kami <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link href="/program" className="btn btn-light">
            Jelajahi Program
          </Link>
        </div>
      </div>
    </section>
  );
}
