// components/site/tutor-card.tsx --- IGNORE ---

import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Tutor = {
  id: string;
  slug: string;
  title: string | null;
  name: string;
  photo_url: string | null;
  specialization: string | null;
  bio: string | null;
};

const RING_COLORS = ["bg-lagoon", "bg-marigold", "bg-bark", "bg-espresso"];

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function colorFor(name: string) {
  const sum = name.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return RING_COLORS[sum % RING_COLORS.length];
}

export function TutorCard({ tutor }: { tutor: Tutor }) {
  return (
    <article className="rounded-2xl bg-white p-6 ring-1 ring-paper-dim transition-shadow hover:shadow-lg hover:shadow-espresso/5">
      <div className="flex items-start gap-4">
        {tutor.photo_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={tutor.photo_url}
            alt={tutor.name}
            className="h-14 w-14 shrink-0 rounded-full object-cover"
          />
        ) : (
          <div
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-display text-lg font-semibold text-white ${colorFor(
              tutor.name
            )}`}
          >
            {initials(tutor.name)}
          </div>
        )}

        <div className="min-w-0">
          {tutor.title && <p className="text-xs font-medium text-bark">{tutor.title}</p>}
          <h3 className="mt-0.5 font-display text-lg font-semibold text-espresso">
            {tutor.name}
          </h3>
          {tutor.specialization && (
            <p className="mt-1 text-sm text-lagoon-dark">{tutor.specialization}</p>
          )}
        </div>
      </div>

      {tutor.bio && (
        <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-bark">
          {tutor.bio}
        </p>
      )}

      <Link
        href={`/tutor/${tutor.slug}`}
        className="group mt-4 inline-flex items-center gap-1 text-sm font-semibold text-lagoon hover:text-lagoon-dark"
      >
        Lihat profil
        <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
      </Link>
    </article>
  );
}
