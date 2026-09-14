import { getCompany } from "@/lib/api/company";
import { PageIntro } from "@/components/ui/page-intro";
import { Media } from "@/components/ui/media";
import { CtaBand } from "@/components/site/cta-band";
export const metadata = { title: "Tentang Kami" };
export default async function AboutPage() { const company = await getCompany(); return <><PageIntro eyebrow="Tentang kami" title={`Mengenal ${company.name}`} description={company.tagline} /><section className="section container detail-grid"><div className="stack">{[["Tentang kami",company.description],["Perjalanan kami",company.history],["Visi",company.vision],["Misi",company.mission]].filter(([,value]) => value).map(([title,value]) => <article className="card rich-panel" key={title}><h2>{title}</h2><p className="pre-line muted">{value}</p></article>)}</div><aside className="detail-aside"><Media src={company.logo_url || "/logo.png"} alt={company.name} className="media-square media-logo" /><p className="lead">{company.tagline}</p></aside></section><CtaBand /></>; }
