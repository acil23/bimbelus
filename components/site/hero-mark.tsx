// components/site/hero-mark.tsx --- IGNORE ---
// Purely decorative SVG. No data, no client state — the single
// page-load animation moment for the whole site lives here.

export function HeroMark() {
  return (
    <svg
      viewBox="0 0 480 420"
      className="h-auto w-full max-w-md"
      role="img"
      aria-label="Ilustrasi buku terbuka dengan garis pertumbuhan menanjak"
    >
      {/* open book */}
      <path
        d="M40 300 C 130 270, 190 270, 236 300 L236 120 C 190 96, 130 96, 40 120 Z"
        fill="var(--color-mist)"
        opacity="0.9"
      />
      <path
        d="M440 300 C 350 270, 290 270, 244 300 L244 120 C 290 96, 350 96, 440 120 Z"
        fill="var(--color-paper-dim)"
      />
      <path
        d="M40 120 C 130 96, 190 96, 236 120 M244 120 C 290 96, 350 96, 440 120"
        stroke="var(--color-bark)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M40 120 L40 300 M440 120 L440 300"
        stroke="var(--color-bark)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      {/* rising line, drawn on load */}
      <path
        pathLength="1"
        d="M96 240 L164 190 L196 214 L268 138 L320 158 L392 84"
        fill="none"
        stroke="var(--color-marigold)"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="draw-in"
      />
      <path
        pathLength="1"
        d="M356 84 L392 84 L392 120"
        fill="none"
        stroke="var(--color-marigold)"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="draw-in"
        style={{ animationDelay: "1.5s" }}
      />

      {/* leaf accent, echoing the wordmark */}
      <path
        d="M330 300 C 300 250, 300 200, 350 170 C 380 220, 370 270, 330 300 Z"
        fill="var(--color-lagoon)"
      />
      <path
        d="M334 296 C 320 260, 322 220, 350 178"
        stroke="var(--color-mist)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.8"
      />
    </svg>
  );
}
