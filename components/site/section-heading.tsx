// components/site/section-heading.tsx --- IGNORE ---

export function SectionHeading({
  title,
  description,
  align = "left",
}: {
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
      <h2 className="font-display text-3xl font-semibold text-espresso sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-[15px] leading-relaxed text-bark">
          {description}
        </p>
      )}
    </div>
  );
}
