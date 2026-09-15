import { BookOpen, GraduationCap } from "lucide-react";
import { Media } from "@/components/ui/media";

export function HeroMark({ logo }: { logo?: string | null }) {
  return (
    <div className="hero-art">
      <div className="hero-orbit">
        <Media src={logo || "/logo.png"} alt="Bimbel YS" className="media-logo" eager />
      </div>

      <div className="hero-float first">
        <BookOpen size={25} aria-hidden="true" />
        <div>
          <strong>Mulai dari rasa ingin tahu</strong>
          <span>Bangun pemahaman, bukan hafalan.</span>
        </div>
      </div>

      <div className="hero-float second">
        <GraduationCap size={28} aria-hidden="true" />
        <div>
          <strong>Selangkah menuju impian</strong>
          <span>Bertumbuh bersama Bimbel YS.</span>
        </div>
      </div>
    </div>
  );
}
