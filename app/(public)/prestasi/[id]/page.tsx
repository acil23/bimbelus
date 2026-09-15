import Link from "next/link";
import { notFound } from "next/navigation";
import { ApiClientError } from "@/lib/api/client";
import { getAchievementById } from "@/lib/api/achievements";
import { achievementLabels } from "@/lib/ui/format";
import { PageIntro } from "@/components/ui/page-intro";
import { Media } from "@/components/ui/media";
import { CtaBand } from "@/components/site/cta-band";

export default async function AchievementDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let achievement;

  try {
    achievement = await getAchievementById(id);
  } catch (error) {
    if (error instanceof ApiClientError && error.status === 404) {
      notFound();
    }

    throw error;
  }

  const facts = [
    ["Sekolah", achievement.student_school],
    ["Tujuan", achievement.destination],
    ["Mata pelajaran", achievement.subject],
    ["Kompetisi", achievement.competition_name],
    ["Tingkat", achievement.competition_level],
  ];

  const renderFacts = facts
    .filter(([, value]) => value)
    .map(([label, value]) => (
      <div className="card rich-panel" key={label}>
        <dt className="small muted">{label}</dt>
        <dd style={{ margin: ".5rem 0 0", fontWeight: 750 }}>{value}</dd>
      </div>
    ));

  return (
    <>
      <PageIntro
        eyebrow="Cerita prestasi"
        title={achievement.title}
        description={achievement.student_name}
      />

      <section className="section container detail-grid">
        <article className="stack">
          <Link className="text-link" href="/prestasi">
            ← Semua prestasi
          </Link>

          <div className="actions">
            <span className="badge badge-gold">
              {achievementLabels[achievement.achievement_type]}
            </span>

            {achievement.year != null && <span className="badge">{achievement.year}</span>}
          </div>

          {achievement.description && (
            <p className="pre-line lead">{achievement.description}</p>
          )}

          <dl className="grid-2">{renderFacts}</dl>
        </article>

        <aside className="detail-aside">
          <Media
            src={achievement.image_url}
            alt={achievement.student_name}
            className="media-square"
          />
        </aside>
      </section>

      <CtaBand />
    </>
  );
}
