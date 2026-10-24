import Link from "next/link";
import { ArrowUpRight, BookOpen, Layers, Clock } from "lucide-react";
import type { Program } from "@/lib/api/types";
import { Media } from "@/components/ui/media";
import { categoryLabels, priceUnits, formatPrice } from "@/lib/ui/format";

export function ProgramCard({
  program,
  featured = false,
}: {
  program: Program;
  featured?: boolean;
}) {
  const packageInfo = program.program_packages[0];
  const categoryName = categoryLabels[program.category] ?? program.category;

  const packageLabel = packageInfo ? (
    <div className="price-box">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-bold text-[#1F2937]">
          {packageInfo.name}
        </span>
        {program.program_packages.length > 1 && (
          <span className="font-mono-tech text-[11px] font-bold text-[#2E8BC0] bg-[#2E8BC0]/10 border border-[#2E8BC0]/20 px-2.5 py-0.5 rounded-full">
            +{program.program_packages.length - 1} paket lainnya
          </span>
        )}
      </div>
      <div className="flex items-baseline justify-between gap-2 flex-wrap mt-1">
        <span className="price">{formatPrice(packageInfo.price)}</span>
        <span className="small muted font-mono-tech text-xs inline-flex items-center gap-1">
          {packageInfo.duration && <Clock size={12} aria-hidden="true" />}
          {priceUnits[packageInfo.price_unit] ?? packageInfo.price_unit}
          {packageInfo.duration ? ` · ${packageInfo.duration}` : ""}
        </span>
      </div>
    </div>
  ) : (
    <p className="small muted text-xs py-2.5 px-3 rounded-xl bg-[#F8F9FA] border border-dashed border-slate-300">
      Konsultasikan rincian jadwal &amp; paket belajar bersama tim kami.
    </p>
  );

  if (featured) {
    return (
      <article className="clay-card card-hover overflow-hidden h-full">
        <div className="terminal-bar">
          <span className="inline-flex items-center gap-1.5 text-[#2E8BC0] font-bold">
            <BookOpen size={13} aria-hidden="true" />
            <span>SOROTAN KURIKULUM UTAMA</span>
          </span>
          <span>{categoryName}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 h-full">
          <div className="md:col-span-5 relative min-h-[220px]">
            <Media
              src={program.image_url}
              alt={program.name}
              className="h-full w-full !aspect-auto !border-b-0 md:border-r border-slate-200/80"
            />
          </div>

          <div className="md:col-span-7 card-body flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="badge badge-gold">
                  <Layers size={12} aria-hidden="true" />
                  {categoryName}
                </span>
                <span className="font-mono-tech text-xs font-semibold text-[#6B7280]">
                  {program.program_packages.length || 1} Opsi Paket
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-[#1F2937]">
                {program.name}
              </h3>

              {program.description && (
                <p className="small clamp-3 leading-relaxed text-[#6B7280]">
                  {program.description}
                </p>
              )}
            </div>

            <div className="space-y-4 mt-2">
              <div className="ticket-divider" aria-hidden="true" />
              {packageLabel}

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-semibold text-[#6B7280]">
                  Terbuka untuk pendaftaran baru
                </span>
                <Link
                  href={`/program/${program.slug}`}
                  className="btn btn-cta-glow btn-small"
                >
                  <span>Lihat Silabus &amp; Paket</span>
                  <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="clay-card card-hover flex flex-col h-full">
      <div className="terminal-bar">
        <span className="inline-flex items-center gap-1.5 text-[#2E8BC0] font-bold">
          <BookOpen size={13} aria-hidden="true" />
          <span>MODUL PROGRAM</span>
        </span>
        <span className="truncate">{categoryName}</span>
      </div>

      <Media src={program.image_url} alt={program.name} />

      <div className="card-body flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="badge badge-gold">
            <Layers size={12} aria-hidden="true" />
            {categoryName}
          </span>
        </div>

        <h3 className="text-lg font-extrabold tracking-tight text-[#1F2937]">
          {program.name}
        </h3>

        {program.description && (
          <p className="small clamp-3 leading-relaxed text-[#6B7280]">
            {program.description}
          </p>
        )}

        <div className="ticket-divider" aria-hidden="true" />

        {packageLabel}

        <Link
          href={`/program/${program.slug}`}
          className="text-link pt-1 group inline-flex items-center justify-between w-full"
        >
          <span>Lihat detail program</span>
          <ArrowUpRight
            size={16}
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </div>
    </article>
  );
}
