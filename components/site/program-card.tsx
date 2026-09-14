import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Program } from "@/lib/api/types";
import { Media } from "@/components/ui/media";
import { categoryLabels, priceUnits, formatPrice } from "@/lib/ui/format";
export function ProgramCard({ program }: { program: Program }) {
 const pkg = program.program_packages[0];
 return <article className="card card-hover"><Media src={program.image_url} alt={program.name} /><div className="card-body"><span className="badge badge-gold">{categoryLabels[program.category] ?? program.category}</span><h3>{program.name}</h3>{program.description && <p className="small clamp-3">{program.description}</p>}{pkg ? <div className="price-box"><span className="small muted">{pkg.name}</span><span className="price">{formatPrice(pkg.price)}</span><span className="small muted">{priceUnits[pkg.price_unit] ?? pkg.price_unit}{pkg.duration ? ` · ${pkg.duration}` : ""}</span></div> : <p className="small">Konsultasikan pilihan paket dengan tim kami.</p>}<Link href={`/program/${program.slug}`} className="text-link">Lihat detail <ArrowUpRight size={17} aria-hidden="true" /></Link></div></article>;
}
