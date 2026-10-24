import { Compass, Target, BookOpen, Sparkles } from "lucide-react";
import { getCompany } from "@/lib/api/company";
import { PageIntro } from "@/components/ui/page-intro";
import { Media } from "@/components/ui/media";
import { CtaBand } from "@/components/site/cta-band";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
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

  return (
    <>
      <PageIntro
        eyebrow="Identitas Lembaga"
        title={`Mengenal ${company.name}`}
        description={
          company.tagline ||
          "Membangun fondasi akademik yang kuat, terarah, dan relevan bagi generasi pelajar di Dharmasraya."
        }
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

      <section className="section container stack">
        {/* Top Asymmetric Bento Row: Profile + Brand Identity Card */}
        <div className="detail-grid">
          <div className="stack">
            {company.description && (
              <ScrollReveal>
                <article className="clay-card overflow-hidden">
                  <div className="terminal-bar">
                    <span className="inline-flex items-center gap-1.5 text-[#D97706] font-extrabold">
                      <BookOpen size={13} aria-hidden="true" />
                      <span>BAB 01 · PROFIL LEMBAGA</span>
                    </span>
                    <span>{company.name}</span>
                  </div>
                  <div className="rich-panel space-y-3">
                    <h2>Tentang kami</h2>
                    <p className="pre-line muted leading-relaxed">{company.description}</p>
                  </div>
                </article>
              </ScrollReveal>
            )}

            {company.history && (
              <ScrollReveal delay={0.1}>
                <article className="clay-card overflow-hidden">
                  <div className="terminal-bar">
                    <span className="inline-flex items-center gap-1.5 text-[#2E8BC0] font-extrabold">
                      <Sparkles size={13} aria-hidden="true" />
                      <span>BAB 02 · REKAM JEJAK</span>
                    </span>
                    <span>Sejarah &amp; Perjalanan</span>
                  </div>
                  <div className="rich-panel space-y-3">
                    <h2>Perjalanan kami</h2>
                    <p className="pre-line muted leading-relaxed">{company.history}</p>
                  </div>
                </article>
              </ScrollReveal>
            )}
          </div>

          <ScrollReveal delay={0.15}>
            <aside className="detail-aside">
              <div className="clay-card p-6 grid gap-5">
                <div className="w-36 h-36 mx-auto rounded-2xl overflow-hidden border border-sky-200 bg-white/80 p-2 shadow-sm">
                  <Media
                    src={company.logo_url || "/logo.png"}
                    alt={company.name}
                    className="media-square media-logo !border-b-0"
                  />
                </div>
                {company.tagline && (
                  <div className="text-center space-y-2 pt-3 border-t border-dashed border-slate-200">
                    <span className="font-mono-tech text-xs text-[#2E8BC0] font-extrabold uppercase tracking-widest block">
                      Our Tagline
                    </span>
                    <p className="text-base font-bold text-[#1F2937] leading-relaxed">
                      “{company.tagline}”
                    </p>
                  </div>
                )}
              </div>
            </aside>
          </ScrollReveal>
        </div>

        {/* Bottom Bento Row: Visi & Misi Side-by-Side Pillars */}
        {(company.vision || company.mission) && (
          <div className="grid-2 pt-2">
            {company.vision && (
              <ScrollReveal delay={0.1}>
                <article className="clay-card overflow-hidden h-full">
                  <div className="terminal-bar">
                    <span className="inline-flex items-center gap-1.5 text-[#D97706] font-extrabold">
                      <Compass size={13} aria-hidden="true" />
                      <span>PILAR AKADEMIK · VISI</span>
                    </span>
                    <span>Arah Masa Depan</span>
                  </div>
                  <div className="rich-panel space-y-3">
                    <h2>Visi</h2>
                    <p className="pre-line muted leading-relaxed">{company.vision}</p>
                  </div>
                </article>
              </ScrollReveal>
            )}

            {company.mission && (
              <ScrollReveal delay={0.2}>
                <article className="clay-card overflow-hidden h-full">
                  <div className="terminal-bar">
                    <span className="inline-flex items-center gap-1.5 text-[#2E8BC0] font-extrabold">
                      <Target size={13} aria-hidden="true" />
                      <span>PILAR AKADEMIK · MISI</span>
                    </span>
                    <span>Langkah Nyata</span>
                  </div>
                  <div className="rich-panel space-y-3">
                    <h2>Misi</h2>
                    <p className="pre-line muted leading-relaxed">{company.mission}</p>
                  </div>
                </article>
              </ScrollReveal>
            )}
          </div>
        )}
      </section>

      <ScrollReveal>
        <CtaBand />
      </ScrollReveal>
    </>
  );
}
