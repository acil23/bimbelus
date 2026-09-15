import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Program } from "@/lib/api/types";
import { Media } from "@/components/ui/media";
import { categoryLabels, priceUnits, formatPrice } from "@/lib/ui/format";

export function ProgramCard({ program }: { program: Program }) {
  const packageInfo = program.program_packages[0];
  const packageLabel = packageInfo ? (
    <div className="price-box">
      <span className="small muted">{packageInfo.name}</span>
      <span className="price">{formatPrice(packageInfo.price)}</span>
      <span className="small muted">
        {priceUnits[packageInfo.price_unit] ?? packageInfo.price_unit}
        {packageInfo.duration ? ` · ${packageInfo.duration}` : ""}
      </span>
    </div>
  ) : (
    <p className="small">Konsultasikan pilihan paket dengan tim kami.</p>
  );

  return (
    <article className="card card-hover">
      <Media src={program.image_url} alt={program.name} />

      <div className="card-body">
        <span className="badge badge-gold">
          {categoryLabels[program.category] ?? program.category}
        </span>

        <h3>{program.name}</h3>

        {program.description && <p className="small clamp-3">{program.description}</p>}

        {packageLabel}

        <Link href={`/program/${program.slug}`} className="text-link">
          Lihat detail <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
