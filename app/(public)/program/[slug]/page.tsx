// app/(public)/program/[slug]/page.tsx --- IGNORE ---

import { ApiClientError } from "@/lib/api/client";
import { getProgramBySlug } from "@/lib/api/programs";
import { notFound } from "next/navigation";

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let program;

  try {
    program = await getProgramBySlug(slug);
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
      <p className="text-sm uppercase tracking-wide text-zinc-500">
        {program.category}
      </p>

      <h1 className="mt-2 text-4xl font-bold">
        {program.name}
      </h1>

      {program.description && (
        <p className="mt-4 max-w-2xl text-zinc-600">
          {program.description}
        </p>
      )}

      <div className="mt-10">
        <h2 className="text-xl font-semibold">
          Pilihan Paket
        </h2>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {program.program_packages.map((pkg) => (
            <article
              key={pkg.id}
              className="rounded-xl border p-5"
            >
              <h3 className="font-semibold">
                {pkg.name}
              </h3>

              <p className="mt-2 text-2xl font-bold">
                {formatPrice(pkg.price)}
              </p>

              <p className="mt-2 text-sm text-zinc-500">
                {pkg.duration} · {pkg.price_unit}
              </p>

              {pkg.description && (
                <p className="mt-3 text-sm text-zinc-600">
                  {pkg.description}
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}