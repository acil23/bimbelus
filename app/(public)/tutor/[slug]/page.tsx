import Link from "next/link";
import { notFound } from "next/navigation";
import { ApiClientError } from "@/lib/api/client";
import { getTutorBySlug } from "@/lib/api/tutors";
import { PageIntro } from "@/components/ui/page-intro";
import { Media } from "@/components/ui/media";
import { EmptyState } from "@/components/ui/empty-state";
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
          {item.field_of_study && <p>{item.field_of_study}</p>}
          {(item.start_year != null || item.end_year != null) && (
            <p className="small muted">
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
          {item.position && <p>{item.position}</p>}
          {(item.start_year != null || item.end_year != null) && (
            <p className="small muted">
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
        eyebrow="Profil tutor"
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
            <article className="card rich-panel">
              <h2>Mengenal {tutor.name}</h2>
              <p className="pre-line muted">{tutor.bio}</p>
            </article>
          )}

          <section className="card rich-panel">
            <h2>Pendidikan</h2>
            {renderEducations}
          </section>

          <section className="card rich-panel">
            <h2>Pengalaman</h2>
            {renderExperiences}
          </section>
        </div>

        <aside className="detail-aside">
          <Media src={tutor.photo_url} alt={tutor.name} className="media-square" />

          <div className="card rich-panel stack">
            <h3>Belajar bersama Bimbel YS</h3>
            <p className="muted">
              Hubungi tim kami untuk informasi program dan jadwal belajar.
            </p>
            <Link href="/contact" className="btn btn-gold">
              Konsultasikan kebutuhanmu
            </Link>
          </div>
        </aside>
      </section>
    </>
  );
}
