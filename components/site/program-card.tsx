// components/site/program-card.tsx --- IGNORE ---

type ProgramPackage = {
  id: string;
  name: string;
  duration: string;
  price_unit: string;
  price: number;
  description: string | null;
};

type Program = {
  id: string;
  category: string;
  name: string;
  description: string | null;
  image_url: string | null;
  program_packages: ProgramPackage[];
};

export function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatPriceUnit(priceUnit: string) {
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

const CATEGORY_THEME: Record<string, { bar: string; chip: string; chipText: string }> = {
  REGULER: { bar: "bg-lagoon", chip: "bg-lagoon/10", chipText: "text-lagoon-dark" },
  OLIMPIADE: { bar: "bg-marigold", chip: "bg-marigold/15", chipText: "text-marigold-dark" },
  PROGRAM_TAHUNAN: { bar: "bg-bark", chip: "bg-bark/10", chipText: "text-bark" },
  LAINNYA: { bar: "bg-espresso", chip: "bg-espresso/10", chipText: "text-espresso" },
};

const CATEGORY_LABEL: Record<string, string> = {
  REGULER: "Reguler",
  OLIMPIADE: "Olimpiade",
  PROGRAM_TAHUNAN: "Program Tahunan",
  LAINNYA: "Lainnya",
};

const FALLBACK_THEME = { bar: "bg-lagoon", chip: "bg-lagoon/10", chipText: "text-lagoon-dark" };

export function categoryTheme(category: string) {
  return CATEGORY_THEME[category.toUpperCase()] ?? FALLBACK_THEME;
}

export function categoryLabel(category: string) {
  return CATEGORY_LABEL[category.toUpperCase()] ?? category;
}

export function ProgramCard({ program }: { program: Program }) {
  const theme = categoryTheme(program.category);

  return (
    <article className="flex gap-5 rounded-2xl bg-white p-6 ring-1 ring-paper-dim">
      <span className={`w-1 shrink-0 rounded-full ${theme.bar}`} aria-hidden />

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-4">
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${theme.chip} ${theme.chipText}`}
          >
            {categoryLabel(program.category)}
          </span>

          {program.image_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={program.image_url}
              alt=""
              className="h-14 w-14 shrink-0 rounded-xl object-cover"
            />
          )}
        </div>

        <h3 className="mt-3 font-display text-xl font-semibold text-espresso">
          {program.name}
        </h3>

        {program.description && (
          <p className="mt-2 text-sm leading-relaxed text-bark">
            {program.description}
          </p>
        )}

        {program.program_packages.length > 0 && (
          <div className="mt-5 space-y-2.5">
            {program.program_packages.map((pkg) => (
              <div
                key={pkg.id}
                className="flex items-start justify-between gap-4 rounded-xl bg-mist/60 px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-espresso">{pkg.name}</p>
                  <p className="mt-0.5 text-xs text-bark">
                    {pkg.duration}, dibayar {formatPriceUnit(pkg.price_unit)}
                  </p>
                </div>
                <span className="whitespace-nowrap font-display text-base font-semibold text-espresso">
                  {formatPrice(pkg.price)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
