import Link from "next/link";
import { Trophy, ArrowUpRight, School, Target } from "lucide-react";
import type { Achievement } from "@/lib/api/types";
import { achievementLabels } from "@/lib/ui/format";
import { Media } from "@/components/ui/media";

export function AchievementTicket({ achievement }: { achievement: Achievement }) {
  const label =
    achievementLabels[achievement.achievement_type] ?? achievement.achievement_type;

  return (
    <article className="clay-card card-hover flex flex-col h-full">
      {/* Perforated Boarding Pass Header */}
      <div className="terminal-bar">
        <span className="inline-flex items-center gap-1.5 text-[#E76F51] font-bold">
          <Trophy size={13} aria-hidden="true" />
          <span>{label.toUpperCase()}</span>
        </span>
        {achievement.year != null ? (
          <span className="px-2.5 py-0.5 rounded-full bg-[#F4A261]/20 text-[#9A3412] font-extrabold">
            ANGKATAN {achievement.year}
          </span>
        ) : (
          <span>PRESTASI SISWA</span>
        )}
      </div>

      <div className="card-body flex-1">
        {/* Student Identity + Mini Photo */}
        <div className="flex items-center gap-3.5">
          <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border-2 border-[#F4A261]/50 bg-[#F8F9FA]">
            <Media
              src={achievement.image_url}
              alt={achievement.student_name}
              className="media-square !border-b-0"
            />
          </div>
          <div className="min-w-0">
            <span className="text-xs font-mono-tech font-bold text-[#2E8BC0] block">
              Siswa Berprestasi
            </span>
            <strong className="text-base font-extrabold text-[#1F2937] block truncate">
              {achievement.student_name}
            </strong>
            {achievement.student_school && (
              <span className="text-xs font-medium text-[#6B7280] inline-flex items-center gap-1 truncate max-w-full">
                <School size={12} aria-hidden="true" className="shrink-0" />
                <span className="truncate">{achievement.student_school}</span>
              </span>
            )}
          </div>
        </div>

        <div className="ticket-divider" aria-hidden="true" />

        {/* Achievement Title & Destination Trajectory */}
        <div className="space-y-2.5">
          <h3 className="text-base font-extrabold tracking-tight text-[#1F2937] leading-snug">
            {achievement.title}
          </h3>

          {achievement.destination && (
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#2E8BC0]/10 border border-[#2E8BC0]/20 text-xs text-[#1E3A8A]">
              <Target size={14} className="shrink-0 text-[#2E8BC0]" aria-hidden="true" />
              <span className="font-bold truncate">{achievement.destination}</span>
            </div>
          )}
        </div>

        <Link
          href={
            achievement.id.startsWith("demo-")
              ? "/prestasi"
              : `/prestasi/${achievement.id}`
          }
          className="text-link pt-2 group inline-flex items-center justify-between w-full"
        >
          <span>Baca cerita lengkap</span>
          <ArrowUpRight
            size={16}
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </div>
    </article>
  );
}
