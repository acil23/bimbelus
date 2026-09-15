"use client";

import { useId, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import type { Achievement, Tutor } from "@/lib/api/types";
import { TutorCard } from "./tutor-card";
import { AchievementTicket } from "./achievement-ticket";
import { EmptyState } from "@/components/ui/empty-state";

export function TutorCarousel({ tutors }: { tutors: Tutor[] }) {
  const track = useRef<HTMLDivElement>(null);
  const id = useId();

  function scroll(direction: number) {
    const element = track.current;

    if (element) {
      element.scrollBy({
        left: direction * element.clientWidth,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    }
  }

  if (!tutors.length) {
    return (
      <EmptyState title="Tutor segera hadir" description="Profil tim pengajar akan tersedia di sini." />
    );
  }

  return (
    <div>
      <div className="actions" style={{ justifyContent: "end", marginBottom: "1rem" }}>
        <button
          type="button"
          className="icon-btn"
          aria-label="Tutor sebelumnya"
          aria-controls={id}
          onClick={() => scroll(-1)}
        >
          <ArrowLeft size={20} />
        </button>
        <button
          type="button"
          className="icon-btn"
          aria-label="Tutor berikutnya"
          aria-controls={id}
          onClick={() => scroll(1)}
        >
          <ArrowRight size={20} />
        </button>
      </div>

      <div
        id={id}
        ref={track}
        className="carousel-track"
        role="region"
        aria-label="Profil tutor, geser untuk melihat lainnya"
        tabIndex={0}
      >
        {tutors.map((tutor) => (
          <TutorCard key={tutor.id} tutor={tutor} />
        ))}
      </div>
    </div>
  );
}

export function AchievementMarquee({ achievements }: { achievements: Achievement[] }) {
  const [paused, setPaused] = useState(false);

  if (!achievements.length) {
    return (
      <EmptyState
        title="Cerita prestasi segera hadir"
        description="Nantikan perjalanan siswa Bimbel YS di sini."
      />
    );
  }

  if (achievements.length === 1) {
    return (
      <div className="grid-3">
        <AchievementTicket achievement={achievements[0]} />
      </div>
    );
  }

  return (
    <div>
      <div className="actions" style={{ justifyContent: "end", marginBottom: "1.5rem" }}>
        <button
          type="button"
          className="btn btn-light btn-small"
          aria-pressed={paused}
          onClick={() => setPaused(!paused)}
        >
          {paused ? <Play size={16} /> : <Pause size={16} />}
          {paused ? "Lanjutkan animasi" : "Jeda animasi"}
        </button>
      </div>

      <div className="marquee-window">
        <div
          className="marquee-track"
          style={{ animationPlayState: paused ? "paused" : "running" }}
        >
          <div className="marquee-group">
            {achievements.map((item) => (
              <AchievementTicket key={item.id} achievement={item} />
            ))}
          </div>

          <div className="marquee-group marquee-copy" aria-hidden="true" inert>
            {achievements.map((item) => (
              <AchievementTicket key={item.id} achievement={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
