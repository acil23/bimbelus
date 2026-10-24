import Link from "next/link";
import { Star } from "lucide-react";
import type { Tutor } from "@/lib/api/types";
import { Media } from "@/components/ui/media";

function DefaultTutorPortrait({ name }: { name: string }) {
  const isFemale = /siti|nadia|aulia|putri|rahma|dewi|anis/i.test(name);

  if (isFemale) {
    return (
      <svg viewBox="0 0 120 120" className="w-full h-full" fill="none">
        <rect width="120" height="120" fill="#DCE6F2" />
        {/* Hijab / Hair Silhouette */}
        <path
          d="M28 120 C28 84, 40 74, 60 74 C80 74, 92 84, 92 120 Z"
          fill="#C8A98E"
        />
        <path
          d="M34 52 C34 30, 45 20, 60 20 C75 20, 86 30, 86 52 C86 72, 76 84, 60 84 C44 84, 34 72, 34 52 Z"
          fill="#9E826B"
        />
        {/* Face */}
        <ellipse cx="60" cy="52" rx="18" ry="21" fill="#F5CBA7" />
        {/* Smile & Eyes */}
        <circle cx="53" cy="49" r="2.2" fill="#1F2937" />
        <circle cx="67" cy="49" r="2.2" fill="#1F2937" />
        <path
          d="M54 59 Q60 64 66 59"
          stroke="#A04000"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 120 120" className="w-full h-full" fill="none">
      <rect width="120" height="120" fill="#D5E3F0" />
      {/* Shoulders / Shirt */}
      <path
        d="M22 120 C24 86, 40 76, 60 76 C80 76, 96 86, 98 120 Z"
        fill="#3B82F6"
      />
      {/* Collar */}
      <polygon points="48,78 60,94 72,78" fill="#EFF6FF" />
      {/* Neck */}
      <rect x="52" y="64" width="16" height="16" rx="6" fill="#E5B895" />
      {/* Face */}
      <ellipse cx="60" cy="48" rx="19" ry="22" fill="#F0C4A0" />
      {/* Hair */}
      <path
        d="M40 44 C40 24, 50 18, 62 18 C74 18, 81 26, 80 42 C75 32, 66 28, 54 30 C46 31, 42 36, 40 44 Z"
        fill="#1E293B"
      />
      {/* Eyes & Smile */}
      <circle cx="53" cy="47" r="2.2" fill="#1F2937" />
      <circle cx="67" cy="47" r="2.2" fill="#1F2937" />
      <path
        d="M54 57 Q60 62 66 57"
        stroke="#873600"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function TutorCard({
  tutor,
  isActive = false,
}: {
  tutor: Tutor;
  isActive?: boolean;
}) {
  const roleLabel =
    tutor.specialization || tutor.title || "Tutor Bimbel YS";
  const href =
    tutor.slug && !tutor.slug.startsWith("demo-")
      ? `/tutor/${tutor.slug}`
      : "/tutor";

  return (
    <article
      className={`tutor-portrait-card ${
        isActive ? "tutor-portrait-card--active" : ""
      }`}
    >
      {/* Top Floating Badge on Center Active Card */}
      {isActive && (
        <div className="tutor-active-pill" aria-hidden="true">
          Favorite/Active Tutor
        </div>
      )}

      {/* Circular Avatar Photo */}
      <div className="tutor-avatar-ring">
        {tutor.photo_url ? (
          <Media
            src={tutor.photo_url}
            alt={tutor.name}
            className="media-square !border-b-0 rounded-full overflow-hidden"
          />
        ) : (
          <DefaultTutorPortrait name={tutor.name} />
        )}
      </div>

      {/* Centered Tutor Name & Subject */}
      <div className="tutor-identity-block">
        <h3>
          <Link href={href} className="hover:text-[#2E8BC0] transition-colors">
            {tutor.name}
          </Link>
        </h3>
        <p className="tutor-role-text">{roleLabel}</p>
      </div>

      {/* Bottom Skill Stats + 5 Stars + 98% Circular Ring */}
      <div className="tutor-skill-footer">
        <div className="tutor-skill-left">
          <span className="tutor-skill-label">Skill Stats</span>
          <div className="tutor-stars" aria-label="Rating 5 dari 5 bintang">
            {[0, 1, 2, 3, 4].map((starIdx) => (
              <Star
                key={starIdx}
                size={15}
                fill="#F4A261"
                color="#F4A261"
                aria-hidden="true"
              />
            ))}
          </div>
        </div>

        {/* 98% Circular Progress Ring */}
        <div className="tutor-score-ring" aria-label="Skill score 98%">
          <svg viewBox="0 0 56 56" className="w-14 h-14">
            <circle
              cx="28"
              cy="28"
              r="22"
              fill="#FFFFFF"
              stroke="#E2E8F0"
              strokeWidth="4.5"
            />
            <circle
              cx="28"
              cy="28"
              r="22"
              fill="none"
              stroke="#2E8BC0"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeDasharray="138"
              strokeDashoffset="8"
              transform="rotate(-90 28 28)"
            />
            <text
              x="28"
              y="32"
              textAnchor="middle"
              fill="#1F2937"
              fontSize="12.5"
              fontWeight="900"
            >
              98%
            </text>
          </svg>
        </div>
      </div>
    </article>
  );
}
