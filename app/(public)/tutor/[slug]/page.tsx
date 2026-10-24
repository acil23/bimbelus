import Link from "next/link";
import { notFound } from "next/navigation";
import { Award, GraduationCap, Briefcase } from "lucide-react";
import { ApiClientError } from "@/lib/api/client";
import { getTutorBySlug } from "@/lib/api/tutors";
import { PageIntro } from "@/components/ui/page-intro";
import { Media } from "@/components/ui/media";
import { EmptyState } from "@/components/ui/empty-state";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import type { Metadata } from "next";

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
    const tutor = await getTutorBySlug(slug);

    const description =
      tutor.bio ??
      `Profil ${tutor.name}, tutor Bimbel YS.`;

    return {
      title: `${tutor.name} | Tutor Bimbel YS`,
      description,
      alternates: {
        canonical: `/tutor/${tutor.slug}`,
      },
      openGraph: {
        title: `${tutor.name} | Tutor Bimbel YS`,
        description,
        url: `/tutor/${tutor.slug}`,
        type: "profile",
        locale: "id_ID",
        siteName: "Bimbel YS",
      },
    };
  } catch {
    return {
      title: "Tutor Bimbel YS",
      description:
        "Profil tutor dan pengajar Bimbel YS.",
    };
  }
}

export default async function TutorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let tutor;

  try {
    tutor = await getTutorBySlug(slug);
  } catch (error) {
    if (error instanceof ApiClientError && error.status === 404) {
      notFound();
    }

    throw error;
  }

  const tutorDescription = [tutor.title, tutor.specialization]
    .filter(Boolean)
    .join(" · ");

  const renderEducations = tutor.tutor_educations.length ? (
    <div className="timeline">
      {tutor.tutor_educations.map((item) => (
        <article key={item.id}>
          <h3>{item.institution}</h3>
          {item.field_of_study && <p className="font-semibold text-[#2E8BC0]">{item.field_of_study}</p>}
          {(item.start_year != null || item.end_year != null) && (
            <p className="small muted font-mono-tech text-xs">
              {item.start_year ?? "—"} – {item.end_year ?? "Sekarang"}
            </p>
          )}
          {item.description && <p className="pre-line muted">{item.description}</p>}
        </article>
      ))}
    </div>
  ) : (
    <EmptyState title="Riwayat pendidikan belum tersedia" />
  );

  const renderExperiences = tutor.tutor_experiences.length ? (
    <div className="timeline">
      {tutor.tutor_experiences.map((item) => (
        <article key={item.id}>
          <h3>{item.organization}</h3>
          {item.position && <p className="font-semibold text-[#2E8BC0]">{item.position}</p>}
          {(item.start_year != null || item.end_year != null) && (
            <p className="small muted font-mono-tech text-xs">
              {item.start_year ?? "—"} – {item.end_year ?? "Sekarang"}
            </p>
          )}
          {item.description && <p className="pre-line muted">{item.description}</p>}
        </article>
      ))}
    </div>
  ) : (
    <EmptyState title="Riwayat pengalaman belum tersedia" />
  );

  return (
    <>
      <PageIntro
        eyebrow="Profil Mentor Pengajar"
        title={tutor.name}
        description={tutorDescription}
        breadcrumbs={[
          {
            label: "Beranda",
            href: "/",
          },
          {
            label: "Tutor",
            href: "/tutor",
          },
          {
            label: tutor.name,
          },
        ]}
      />

      <section className="section container detail-grid">
        <div className="stack">
          <Link href="/tutor" className="text-link">
            ← Semua tutor
          </Link>

          {tutor.bio && (
            <ScrollReveal>
              <article className="card overflow-hidden">
                <div className="terminal-bar">
                  <span className="inline-flex items-center gap-1.5 text-amber-400">
                    <Award size={13} aria-hidden="true" />
                    <span>BIOGRAFI &amp; PENDEKATAN MENGAJAR</span>
                  </span>
                  <span>Mentor Bimbel YS</span>
                </div>
                <div className="rich-panel">
                  <h2>Mengenal {tutor.name}</h2>
                  <p className="pre-line muted leading-relaxed">{tutor.bio}</p>
                </div>
              </article>
            </ScrollReveal>
          )}

          <ScrollReveal delay={0.1}>
            <section className="card overflow-hidden">
              <div className="terminal-bar">
                <span className="inline-flex items-center gap-1.5 text-sky-400">
                  <GraduationCap size={13} aria-hidden="true" />
                  <span>LATAR BELAKANG AKADEMIK</span>
                </span>
                <span>Pendidikan</span>
              </div>
              <div className="rich-panel">
                <h2>Pendidikan</h2>
                {renderEducations}
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <section className="card overflow-hidden">
              <div className="terminal-bar">
                <span className="inline-flex items-center gap-1.5 text-emerald-400">
                  <Briefcase size={13} aria-hidden="true" />
                  <span>REKAM JEJAK &amp; PENGALAMAN</span>
                </span>
                <span>Pengalaman</span>
              </div>
              <div className="rich-panel">
                <h2>Pengalaman</h2>
                {renderExperiences}
              </div>
            </section>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.2}>
          <aside className="detail-aside">
            <Media src={tutor.photo_url} alt={tutor.name} className="media-square" />

            <div className="card rich-panel stack border-amber-500/25">
              <span className="eyebrow">Mulai Belajar</span>
              <h3>Belajar bersama Bimbel YS</h3>
              <p className="muted">
                Hubungi tim kami untuk informasi program dan jadwal belajar.
              </p>
              <Link href="/contact" className="btn btn-gold">
                Konsultasikan kebutuhanmu
              </Link>
            </div>
          </aside>
        </ScrollReveal>
      </section>
    </>
  );
}
