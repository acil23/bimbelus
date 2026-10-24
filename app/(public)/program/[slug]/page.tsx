import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, Clock, Sparkles } from "lucide-react";
import { ApiClientError } from "@/lib/api/client";
import { getContact } from "@/lib/api/contact";
import { getProgramBySlug } from "@/lib/api/programs";
import {
  categoryLabels,
  formatPrice,
  priceUnits,
  whatsappUrl,
} from "@/lib/ui/format";
import { PageIntro } from "@/components/ui/page-intro";
import { Media } from "@/components/ui/media";
import { EmptyState } from "@/components/ui/empty-state";
import type { Metadata } from "next";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const program = await getProgramBySlug(slug);

    const description =
      program.description ??
      `${program.name} dari Bimbel YS untuk siswa di Dharmasraya.`;

    return {
      title: program.name,
      description,
      alternates: {
        canonical: `/program/${program.slug}`,
      },
      openGraph: {
        title: program.name,
        description,
        url: `/program/${program.slug}`,
        type: "website",
        locale: "id_ID",
        siteName: "Bimbel YS",
      },
    };
  } catch {
    return {
      title: "Program Bimbel YS",
      description:
        "Informasi program bimbingan belajar Bimbel YS di Dharmasraya.",
    };
  }
}

function buildInquiryMessage(programName: string, packageName: string) {
  return `Halo, saya tertarik untuk mendaftar pada program ${programName} Bimbel YS. Saya ingin bertanya mengenai paket ${packageName}. Mohon informasi selengkapnya.`;
}

function getPrimaryWhatsAppNumber(
  contact: Awaited<ReturnType<typeof getContact>> | null,
) {
  const locations = [...(contact?.contact_locations ?? [])]
    .filter((location) => location.is_active)
    .sort((a, b) => a.display_order - b.display_order);

  return locations[0]?.whatsapp ?? null;
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let program;
  let contact = null;

  try {
    [program, contact] = await Promise.all([
      getProgramBySlug(slug),
      getContact().catch(() => null),
    ]);
  } catch (error) {
    if (error instanceof ApiClientError && error.status === 404) {
      notFound();
    }

    throw error;
  }

  const primaryWhatsApp = getPrimaryWhatsAppNumber(contact);

  const renderPackageCards = program.program_packages.length ? (
    <StaggerContainer className="grid-2">
      {program.program_packages.map((pkg, index) => {
        const waHref = primaryWhatsApp
          ? whatsappUrl(
              primaryWhatsApp,
              buildInquiryMessage(program.name, pkg.name),
            )
          : undefined;

        return (
          <StaggerItem key={pkg.id}>
            <article className="clay-card card-hover overflow-hidden h-full flex flex-col">
              <div className="terminal-bar">
                <span className="inline-flex items-center gap-1.5 text-[#D97706] font-extrabold">
                  <Sparkles size={13} aria-hidden="true" />
                  <span>PAKET BELAJAR 0{index + 1}</span>
                </span>
                <span>{priceUnits[pkg.price_unit] ?? pkg.price_unit}</span>
              </div>

              <div className="card-body flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="badge badge-gold">
                    {priceUnits[pkg.price_unit] ?? pkg.price_unit}
                  </span>
                  {pkg.duration && (
                    <span className="font-mono-tech text-xs text-[#6B7280] font-semibold inline-flex items-center gap-1">
                      <Clock size={12} aria-hidden="true" />
                      {pkg.duration}
                    </span>
                  )}
                </div>

                <h3>{pkg.name}</h3>
                <span className="price">{formatPrice(pkg.price)}</span>

                <div className="ticket-divider" aria-hidden="true" />

                {pkg.description && (
                  <p className="pre-line small leading-relaxed">{pkg.description}</p>
                )}

                {waHref ? (
                  <a
                    className="btn-hero-blue mt-auto justify-center"
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Tanyakan paket ini
                  </a>
                ) : (
                  <Link className="btn-hero-blue mt-auto justify-center" href="/contact">
                    Tanyakan paket ini
                  </Link>
                )}
              </div>
            </article>
          </StaggerItem>
        );
      })}
    </StaggerContainer>
  ) : (
    <EmptyState
      title="Paket belum tersedia"
      description="Hubungi tim kami untuk informasi lebih lanjut."
    />
  );

  return (
    <>
      <PageIntro
        eyebrow="Detail Program Belajar"
        title={program.name}
        description={`Kategori Program: ${categoryLabels[program.category] ?? program.category}`}
        breadcrumbs={[
          {
            label: "Beranda",
            href: "/",
          },
          {
            label: "Program",
            href: "/program",
          },
          {
            label: program.name,
          },
        ]}
      />

      <section className="section container detail-grid">
        <div className="stack">
          <Link href="/program" className="text-link">
            ← Semua program
          </Link>

          {program.description && (
            <ScrollReveal>
              <article className="clay-card overflow-hidden">
                <div className="terminal-bar">
                  <span className="inline-flex items-center gap-1.5 text-[#2E8BC0] font-extrabold">
                    <BookOpen size={13} aria-hidden="true" />
                    <span>SILABUS &amp; GAMBARAN PROGRAM</span>
                  </span>
                  <span>{categoryLabels[program.category] ?? program.category}</span>
                </div>
                <div className="rich-panel space-y-3">
                  <h2>Tentang program</h2>
                  <p className="pre-line muted leading-relaxed">{program.description}</p>
                </div>
              </article>
            </ScrollReveal>
          )}

          <ScrollReveal delay={0.1}>
            <h2>Pilihan paket belajar</h2>
          </ScrollReveal>
          {renderPackageCards}
        </div>

        <ScrollReveal delay={0.2}>
          <aside className="detail-aside">
            <Media src={program.image_url} alt={program.name} />

            <div className="clay-card rich-panel stack">
              <span className="eyebrow">Konsultasi Kelas</span>
              <h3>Mulai dengan konsultasi</h3>
              <p className="muted">
                Konfirmasikan jadwal, ketersediaan kursi, dan pilihan paket bersama tim
                Bimbel YS.
              </p>

              <Link href="/contact" className="btn-hero-blue justify-center">
                Hubungi Kami
              </Link>
            </div>
          </aside>
        </ScrollReveal>
      </section>
    </>
  );
}
