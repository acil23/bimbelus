
import { ApiClientError } from "@/lib/api/client";
import { getTutorBySlug } from "@/lib/api/tutors";
import { notFound } from "next/navigation";

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
    if (
      error instanceof ApiClientError &&
      error.status === 404
    ) {
      notFound();
    }

    throw error;
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-12">
      <p className="text-sm text-zinc-500">
        {tutor.title}
      </p>

      <h1 className="mt-2 text-4xl font-bold">
        {tutor.name}
      </h1>

      {tutor.specialization && (
        <p className="mt-3 text-lg text-zinc-600">
          {tutor.specialization}
        </p>
      )}

      {tutor.bio && (
        <p className="mt-6 max-w-2xl text-zinc-600">
          {tutor.bio}
        </p>
      )}

      <div className="mt-12 grid gap-10 md:grid-cols-2">
        <section>
          <h2 className="text-xl font-semibold">
            Pendidikan
          </h2>

          <div className="mt-5 space-y-4">
            {tutor.tutor_educations.map((education) => (
              <article
                key={education.id}
                className="rounded-xl border p-4"
              >
                <h3 className="font-medium">
                  {education.institution}
                </h3>

                {education.field_of_study && (
                  <p className="mt-1 text-sm text-zinc-600">
                    {education.field_of_study}
                  </p>
                )}

                <p className="mt-2 text-sm text-zinc-500">
                  {education.start_year ?? "?"} –{" "}
                  {education.end_year ?? "Sekarang"}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold">
            Pengalaman
          </h2>

          <div className="mt-5 space-y-4">
            {tutor.tutor_experiences.map((experience) => (
              <article
                key={experience.id}
                className="rounded-xl border p-4"
              >
                <h3 className="font-medium">
                  {experience.organization}
                </h3>

                {experience.position && (
                  <p className="mt-1 text-sm text-zinc-600">
                    {experience.position}
                  </p>
                )}

                <p className="mt-2 text-sm text-zinc-500">
                  {experience.start_year ?? "?"} –{" "}
                  {experience.end_year ?? "Sekarang"}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}