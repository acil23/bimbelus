import Link from "next/link";
import { GraduationCap, Briefcase, ArrowUpRight } from "lucide-react";
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
  const href = `/tutor/${tutor.slug}`;

  const educationCount = tutor.tutor_educations?.length ?? 0;
  const experienceCount = tutor.tutor_experiences?.length ?? 0;
  const primaryEducation = tutor.tutor_educations?.[0]?.institution;
  const primaryField = tutor.tutor_educations?.[0]?.field_of_study;

  return (
    <article
      className={`tutor-portrait-card ${
        isActive ? "tutor-portrait-card--active" : ""
      }`}
    >
      {/* Top Floating Badge on Center Active Card */}
      {isActive && (
        <div className="tutor-active-pill" aria-hidden="true">
          Tutor Pilihan
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

      {/* Bottom Real Database Qualification & Experience Footer (No Fake Percentages) */}
      <div className="tutor-skill-footer">
        <div className="tutor-skill-left min-w-0 flex-1">
          <span className="tutor-skill-label truncate">
            {primaryEducation || tutor.title || "Profil Akademik"}
          </span>
          <div className="flex items-center gap-2.5 flex-wrap text-[11px] font-bold text-[#4B5563] mt-1">
            {educationCount > 0 || experienceCount > 0 ? (
              <>
                <span className="inline-flex items-center gap-1 text-[#2E8BC0]">
                  <GraduationCap size={13} aria-hidden="true" />
                  <span>{educationCount} Pendidikan</span>
                </span>
                {experienceCount > 0 && (
                  <span className="inline-flex items-center gap-1 text-[#D97706]">
                    <Briefcase size={12} aria-hidden="true" />
                    <span>{experienceCount} Pengalaman</span>
                  </span>
                )}
              </>
            ) : (
              <span className="inline-flex items-center gap-1 text-[#2E8BC0] truncate">
                <GraduationCap size={13} aria-hidden="true" />
                <span className="truncate">{primaryField || roleLabel}</span>
              </span>
            )}
          </div>
        </div>

        {/* Profile Action Circle */}
        <Link
          href={href}
          className="tutor-score-ring group"
          aria-label={`Lihat profil lengkap ${tutor.name}`}
          title={`Lihat profil ${tutor.name}`}
        >
          <span className="w-11 h-11 rounded-full bg-white border-2 border-[#56B9EC]/60 shadow-sm grid place-items-center text-[#2E8BC0] group-hover:bg-[#2E8BC0] group-hover:text-white transition-colors">
            <ArrowUpRight size={18} />
          </span>
        </Link>
      </div>
    </article>
  );
}
