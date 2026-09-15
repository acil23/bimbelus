export function SectionHeading({
  title,
  description,
  eyebrow,
  align = "left",
}: {
  title: string;
  description?: string;
  eyebrow?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`section-heading ${align === "center" ? "center" : ""}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
