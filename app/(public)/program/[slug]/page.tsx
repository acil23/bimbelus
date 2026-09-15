import Link from "next/link";
import { notFound } from "next/navigation";
import { ApiClientError } from "@/lib/api/client";
import { getContact } from "@/lib/api/contact";
import { getProgramBySlug } from "@/lib/api/programs";
import { categoryLabels, formatPrice, priceUnits, whatsappUrl } from "@/lib/ui/format";
import { PageIntro } from "@/components/ui/page-intro";
import { Media } from "@/components/ui/media";
import { EmptyState } from "@/components/ui/empty-state";

function buildInquiryMessage(programName: string, packageName: string) {
  return `Halo, saya tertarik untuk mendaftar pada program ${programName} Bimbel YS. Saya ingin bertanya mengenai paket ${packageName}. Mohon informasi selengkapnya.`;
}

function getPrimaryWhatsAppNumber(contact: Awaited<ReturnType<typeof getContact>> | null) {
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
    if (error instanceof ApiClientError && error.status === 404) notFound();
    throw error;
  }

  const primaryWhatsApp = getPrimaryWhatsAppNumber(contact);

  return (
    <>
      <PageIntro
        eyebrow="Detail program"
        title={program.name}
        description={categoryLabels[program.category]}
      />

      <section className="section container detail-grid">
        <div className="stack">
          <Link href="/program" className="text-link">
            ← Semua program
          </Link>

          {program.description && (
            <article className="card rich-panel">
              <h2>Tentang program</h2>
              <p className="pre-line muted">{program.description}</p>
            </article>
          )}

          <h2>Pilihan paket belajar</h2>

          {program.program_packages.length ? (
            <div className="grid-2">
              {program.program_packages.map((pkg) => {
                const waHref = primaryWhatsApp
                  ? whatsappUrl(primaryWhatsApp, buildInquiryMessage(program.name, pkg.name))
                  : undefined;

                return (
                  <article className="card card-body" key={pkg.id}>
                    <span className="badge badge-gold">
                      {priceUnits[pkg.price_unit] ?? pkg.price_unit}
                    </span>

                    <h3>{pkg.name}</h3>
                    <span className="price">{formatPrice(pkg.price)}</span>

                    {pkg.duration && <p>Durasi: {pkg.duration}</p>}
                    {pkg.description && <p className="pre-line small">{pkg.description}</p>}

                    {waHref ? (
                      <a
                        className="btn"
                        href={waHref}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Tanyakan paket ini
                      </a>
                    ) : (
                      <Link className="btn" href="/contact">
                        Tanyakan paket ini
                      </Link>
                    )}
                  </article>
                );
              })}
            </div>
          ) : (
            <EmptyState
              title="Paket belum tersedia"
              description="Hubungi tim kami untuk informasi lebih lanjut."
            />
          )}
        </div>

        <aside className="detail-aside">
          <Media src={program.image_url} alt={program.name} />

          <div className="card rich-panel stack">
            <h3>Mulai dengan konsultasi</h3>
            <p className="muted">
              Konfirmasikan jadwal, ketersediaan, dan pilihan paket bersama tim Bimbel YS.
            </p>

            <Link href="/contact" className="btn btn-gold">
              Hubungi Kami
            </Link>
          </div>
        </aside>
      </section>
    </>
  );
}