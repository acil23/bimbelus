import Link from "next/link";
import { notFound } from "next/navigation";
import { ApiClientError } from "@/lib/api/client";
import { getProgramBySlug } from "@/lib/api/programs";
import { categoryLabels, formatPrice, priceUnits } from "@/lib/ui/format";
import { PageIntro } from "@/components/ui/page-intro";
import { Media } from "@/components/ui/media";
import { EmptyState } from "@/components/ui/empty-state";
export default async function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
 const { slug } = await params; let program;
 try { program = await getProgramBySlug(slug); } catch(error) { if(error instanceof ApiClientError && error.status === 404) notFound(); throw error; }
 return <><PageIntro eyebrow="Detail program" title={program.name} description={categoryLabels[program.category]} /><section className="section container detail-grid"><div className="stack"><Link href="/program" className="text-link">← Semua program</Link>{program.description && <article className="card rich-panel"><h2>Tentang program</h2><p className="pre-line muted">{program.description}</p></article>}<h2>Pilihan paket belajar</h2>{program.program_packages.length ? <div className="grid-2">{program.program_packages.map((pkg) => <article className="card card-body" key={pkg.id}><span className="badge badge-gold">{priceUnits[pkg.price_unit] ?? pkg.price_unit}</span><h3>{pkg.name}</h3><span className="price">{formatPrice(pkg.price)}</span>{pkg.duration && <p>Durasi: {pkg.duration}</p>}{pkg.description && <p className="pre-line small">{pkg.description}</p>}<Link className="btn" href="/contact">Tanyakan paket ini</Link></article>)}</div> : <EmptyState title="Paket belum tersedia" description="Hubungi tim kami untuk informasi lebih lanjut." />}</div><aside className="detail-aside"><Media src={program.image_url} alt={program.name} /><div className="card rich-panel stack"><h3>Mulai dengan konsultasi</h3><p className="muted">Konfirmasikan jadwal, ketersediaan, dan pilihan paket bersama tim Bimbel YS.</p><Link href="/contact" className="btn btn-gold">Hubungi Kami</Link></div></aside></section></>;
}
