// app/(public)/prestasi/page.tsx --- IGNORE ---

import Link from "next/link";
import { getAchievements } from "@/lib/api/achievements";

export default async function AchievementsPage() {
  const achievements = await getAchievements();

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-bold">Prestasi</h1>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {achievements.map((achievement) => (
          <article
            key={achievement.id}
            className="rounded-2xl border p-6"
          >
            <p className="text-sm text-zinc-500">
              {achievement.year} ·{" "}
              {achievement.achievement_type}
            </p>

            <h2 className="mt-2 text-xl font-semibold">
              {achievement.title}
            </h2>

            <p className="mt-2">
              {achievement.student_name}
            </p>

            {achievement.student_school && (
              <p className="mt-1 text-sm text-zinc-500">
                {achievement.student_school}
              </p>
            )}

            {achievement.destination && (
              <p className="mt-1 text-sm text-zinc-600">
                → {achievement.destination}
              </p>
            )}

            <Link
              href={`/prestasi/${achievement.id}`}
              className="mt-5 inline-block text-sm font-medium underline"
            >
              Lihat detail
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}