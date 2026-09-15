import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Tutor } from "@/lib/api/types";
import { Media } from "@/components/ui/media";

export function TutorCard({ tutor }: { tutor: Tutor }) {
  const firstEducation = tutor.tutor_educations[0];

  return (
    <article className="card card-hover">
      <Media src={tutor.photo_url} alt={tutor.name} className="media-portrait" />

      <div className="card-body">
        {tutor.title && <span className="badge">{tutor.title}</span>}

        <h3>{tutor.name}</h3>

        {tutor.specialization && <p className="small">{tutor.specialization}</p>}

        {tutor.bio && <p className="small clamp-3">{tutor.bio}</p>}

        {firstEducation && <p className="small">{firstEducation.institution}</p>}

        <Link href={`/tutor/${tutor.slug}`} className="text-link">
          Kenali tutor <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
