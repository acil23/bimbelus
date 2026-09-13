// app/(public)/tutor/page.tsx --- IGNORE ---

import Link from "next/link";
import { getTutors } from "@/lib/api/tutors";

export default async function TutorsPage() {
  const tutors = await getTutors();

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-bold">Tutor</h1>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {tutors.map((tutor) => (
          <article
            key={tutor.id}
            className="rounded-2xl border p-6"
          >
            <p className="text-sm text-zinc-500">
              {tutor.title}
            </p>

            <h2 className="mt-1 text-2xl font-semibold">
              {tutor.name}
            </h2>

            {tutor.specialization && (
              <p className="mt-2 text-zinc-600">
                {tutor.specialization}
              </p>
            )}

            {tutor.bio && (
              <p className="mt-4 text-sm text-zinc-600">
                {tutor.bio}
              </p>
            )}

            <Link
              href={`/tutor/${tutor.slug}`}
              className="mt-5 inline-block text-sm font-medium underline"
            >
              Lihat profil
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}