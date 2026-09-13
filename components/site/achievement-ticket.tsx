// components/site/achievement-ticket.tsx --- IGNORE ---

import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Achievement = {
  id: string;
  year: number;
  achievement_type: string;
  title: string;
  student_name: string;
  student_school: string | null;
  destination: string | null;
  image_url: string | null;
};

const TYPE_LABEL: Record<string, string> = {
  ADMISSION: "Penerimaan",
  COMPETITION: "Kompetisi",
  OTHER: "Lainnya",
};

export function achievementTypeLabel(type: string) {
  return TYPE_LABEL[type.toUpperCase()] ?? type;
}

export function AchievementTicket({ achievement }: { achievement: Achievement }) {
  return (
    <article className="relative flex overflow-hidden rounded-2xl bg-white ring-1 ring-paper-dim">
      {achievement.image_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={achievement.image_url}
          alt=""
          className="h-auto w-28 shrink-0 object-cover"
        />
      )}

      <div className="min-w-0 flex-1 p-6">
        <h3 className="font-display text-lg font-semibold text-espresso">
          {achievement.title}
        </h3>
        <p className="mt-1.5 text-sm text-bark">{achievement.student_name}</p>

        {achievement.student_school && (
          <p className="mt-0.5 text-xs text-bark/70">{achievement.student_school}</p>
        )}

        {achievement.destination && (
          <p className="mt-3 inline-flex items-center gap-1 rounded-full bg-mist px-3 py-1 text-xs font-medium text-lagoon-dark">
            {achievement.destination}
          </p>
        )}

        <Link
          href={`/prestasi/${achievement.id}`}
          className="group mt-4 flex items-center gap-1 text-sm font-semibold text-lagoon hover:text-lagoon-dark"
        >
          Lihat detail
          <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* perforated divider */}
      <div className="relative flex w-24 shrink-0 flex-col items-center justify-center border-l border-dashed border-paper-dim bg-mist/50 px-2 py-6 text-center">
        <span className="absolute -top-2.5 left-1/2 h-5 w-5 -translate-x-1/2 rounded-full bg-paper" />
        <span className="absolute -bottom-2.5 left-1/2 h-5 w-5 -translate-x-1/2 rounded-full bg-paper" />
        <p className="font-display text-2xl font-semibold text-espresso">
          {achievement.year}
        </p>
        <p className="mt-1 text-[11px] font-medium leading-tight text-bark">
          {achievementTypeLabel(achievement.achievement_type)}
        </p>
      </div>
    </article>
  );
}
