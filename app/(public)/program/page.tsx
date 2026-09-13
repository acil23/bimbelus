// app/(public)/program/page.tsx --- IGNORE ---

import { getPrograms } from "@/lib/api/programs";

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}

function formatPriceUnit(priceUnit: string) {
  switch (priceUnit) {
    case "PER_SEMESTER":
      return "per semester";
    case "PER_PERIODE":
      return "per periode";
    case "SEKALI_BAYAR":
      return "sekali bayar";
    default:
      return priceUnit;
  }
}

export default async function ProgramsPage() {
  const programs = await getPrograms();

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">
          Program Bimbel YS
        </h1>

        <p className="mt-2 text-gray-600">
          Daftar program bimbingan belajar Bimbel YS.
        </p>
      </div>

      {programs.length === 0 ? (
        <p className="text-gray-600">
          Belum ada program yang tersedia.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {programs.map((program) => (
            <article
              key={program.id}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4">
                <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
                  {program.category}
                </p>

                <h2 className="mt-1 text-2xl font-semibold">
                  {program.name}
                </h2>

                {program.description && (
                  <p className="mt-3 text-gray-600">
                    {program.description}
                  </p>
                )}
              </div>

              {program.program_packages.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-medium">
                    Pilihan Paket
                  </h3>

                  {program.program_packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className="rounded-xl bg-gray-50 p-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="font-medium">
                            {pkg.name}
                          </h4>

                          <p className="mt-1 text-sm text-gray-500">
                            {pkg.duration} ·{" "}
                            {formatPriceUnit(pkg.price_unit)}
                          </p>
                        </div>

                        <span className="whitespace-nowrap font-semibold">
                          {formatPrice(pkg.price)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </main>
  );
}