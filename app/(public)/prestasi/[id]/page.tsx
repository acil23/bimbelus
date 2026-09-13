// app/(public)/prestasi/[id]/page.tsx --- IGNORE ---

import { ApiClientError } from "@/lib/api/client";
import { getAchievementById } from "@/lib/api/achievements";
import { notFound } from "next/navigation";

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
    if (
      error instanceof ApiClientError &&
      error.status === 404
    ) {
      notFound();
    }

    throw error;
  }

  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-12">
      <p className="text-sm text-zinc-500">
        {achievement.year} ·{" "}
        {achievement.achievement_type}
      </p>

      <h1 className="mt-2 text-4xl font-bold">
        {achievement.title}
      </h1>

      <p className="mt-4 text-lg">
        {achievement.student_name}
      </p>

      <div className="mt-8 space-y-4">
        {achievement.student_school && (
          <p>
            <strong>Sekolah:</strong>{" "}
            {achievement.student_school}
          </p>
        )}

        {achievement.destination && (
          <p>
            <strong>Tujuan:</strong>{" "}
            {achievement.destination}
          </p>
        )}

        {achievement.subject && (
          <p>
            <strong>Mata pelajaran:</strong>{" "}
            {achievement.subject}
          </p>
        )}

        {achievement.competition_name && (
          <p>
            <strong>Kompetisi:</strong>{" "}
            {achievement.competition_name}
          </p>
        )}

        {achievement.competition_level && (
          <p>
            <strong>Level:</strong>{" "}
            {achievement.competition_level}
          </p>
        )}

        {achievement.description && (
          <p className="mt-6 text-zinc-600">
            {achievement.description}
          </p>
        )}
      </div>
    </section>
  );
}