// app/(public)/tentang-kami/page.tsx --- IGNORE ---

import { getCompany } from "@/lib/api/company";

export default async function AboutPage() {
  const company = await getCompany();

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-12">
      <p className="text-sm text-zinc-500">
        {company.name}
      </p>

      <h1 className="mt-2 text-3xl font-bold">
        Tentang Kami
      </h1>

      <p className="mt-4 text-lg font-medium">
        {company.tagline}
      </p>

      {company.description && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold">
            Deskripsi
          </h2>

          <p className="mt-3 text-zinc-600">
            {company.description}
          </p>
        </section>
      )}

      {company.history && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold">
            Sejarah
          </h2>

          <p className="mt-3 whitespace-pre-line text-zinc-600">
            {company.history}
          </p>
        </section>
      )}

      {company.vision && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold">
            Visi
          </h2>

          <p className="mt-3 whitespace-pre-line text-zinc-600">
            {company.vision}
          </p>
        </section>
      )}

      {company.mission && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold">
            Misi
          </h2>

          <p className="mt-3 whitespace-pre-line text-zinc-600">
            {company.mission}
          </p>
        </section>
      )}
    </section>
  );
}