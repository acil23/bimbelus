import { getCompany } from "@/lib/api/company";
import { PageIntro } from "@/components/ui/page-intro";
import { Media } from "@/components/ui/media";
import { CtaBand } from "@/components/site/cta-band";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Bimbel YS",
  description:
    "Kenali Bimbel YS dan informasi tentang layanan bimbingan belajar yang tersedia untuk siswa di Dharmasraya.",
  alternates: {
    canonical: "/tentang-kami",
  },
  openGraph: {
    title: "Tentang Bimbel YS",
    description:
      "Kenali Bimbel YS dan informasi tentang layanan bimbingan belajar yang tersedia untuk siswa di Dharmasraya.",
    url: "/tentang-kami",
    type: "website",
    locale: "id_ID",
    siteName: "Bimbel YS",
  },
};
export default async function AboutPage() {
  const company = await getCompany();
  const companyHighlights = [
    ["Tentang kami", company.description],
    ["Perjalanan kami", company.history],
    ["Visi", company.vision],
    ["Misi", company.mission],
  ].filter(([, value]) => value);
  return (
    <>
      <PageIntro
        eyebrow="Tentang kami"
        title={`Mengenal ${company.name}`}
        description={company.tagline}
        breadcrumbs={[
          {
            label: "Beranda",
            href: "/",
          },
          {
            label: "Tentang Kami",
          },
        ]}
      />
      <section className="section container detail-grid">
        <div className="stack">
          {companyHighlights.map(([title, value]) => (
            <article className="card rich-panel" key={title}>
              <h2>{title}</h2>
              <p className="pre-line muted">{value}</p>
            </article>
          ))}
        </div>
        <aside className="detail-aside">
          <Media
            src={company.logo_url || "/logo.png"}
            alt={company.name}
            className="media-square media-logo"
          />
          <p className="lead">{company.tagline}</p>
        </aside>
      </section>
      <CtaBand />
    </>
  );
}
