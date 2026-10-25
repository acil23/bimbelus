"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Pause, Play, Trophy, ArrowRight } from "lucide-react";
import type { Achievement, Tutor } from "@/lib/api/types";
import { TutorCard } from "./tutor-card";
import { AchievementTicket } from "./achievement-ticket";
import { EmptyState } from "@/components/ui/empty-state";

export function TutorCarousel({ tutors }: { tutors: Tutor[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [pausedUntil, setPausedUntil] = useState<number>(0);
  const touchStartX = useRef<number | null>(null);

  const total = tutors.length;

  const pauseTemporarily = useCallback(() => {
    setPausedUntil(Date.now() + 8000);
  }, []);

  const handleNext = useCallback(
    (isManual = false) => {
      if (total <= 1) return;
      if (isManual) pauseTemporarily();
      setActiveIndex((prev) => (prev + 1) % total);
    },
    [total, pauseTemporarily]
  );

  const handlePrev = useCallback(
    (isManual = false) => {
      if (total <= 1) return;
      if (isManual) pauseTemporarily();
      setActiveIndex((prev) => (prev - 1 + total) % total);
    },
    [total, pauseTemporarily]
  );

  // Auto-scroll every 4 seconds
  useEffect(() => {
    if (total <= 1) return;
    const interval = setInterval(() => {
      if (Date.now() < pausedUntil) return;
      setActiveIndex((prev) => (prev + 1) % total);
    }, 4000);

    return () => clearInterval(interval);
  }, [total, pausedUntil]);

  if (total === 0) {
    return (
      <EmptyState
        title="Tutor belum tersedia"
        description="Daftar pengajar aktif Bimbel YS akan segera ditampilkan."
      />
    );
  }

  const safeActiveIndex = activeIndex % total;
  const leftIndex = (safeActiveIndex - 1 + total) % total;
  const rightIndex = (safeActiveIndex + 1) % total;

  const visibleSlots =
    total === 1
      ? [{ tutor: tutors[0], index: 0, position: "center" as const }]
      : total === 2
        ? [
            { tutor: tutors[leftIndex], index: leftIndex, position: "side" as const },
            { tutor: tutors[safeActiveIndex], index: safeActiveIndex, position: "center" as const },
          ]
        : [
            { tutor: tutors[leftIndex], index: leftIndex, position: "side" as const },
            { tutor: tutors[safeActiveIndex], index: safeActiveIndex, position: "center" as const },
            { tutor: tutors[rightIndex], index: rightIndex, position: "side" as const },
          ];

  return (
    <div
      className="tutor-carousel-3d"
      role="region"
      aria-label="Carousel daftar tutor terpopuler"
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const deltaX = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
        if (Math.abs(deltaX) > 40) {
          if (deltaX < 0) handleNext(true);
          else handlePrev(true);
        }
        touchStartX.current = null;
      }}
    >
      <div className="tutor-carousel-stage-wrap">
        {/* Left Ghost Peek Card */}
        <div className="tutor-ghost-peek tutor-ghost-peek--left" aria-hidden="true" />

        {/* Left Circular Arrow Button */}
        {total > 1 && (
          <button
            type="button"
            className="tutor-nav-arrow tutor-nav-arrow--left"
            aria-label="Tutor sebelumnya"
            onClick={() => handlePrev(true)}
          >
            <ChevronLeft size={22} />
          </button>
        )}

        {/* 3-Card Stage */}
        <div className="tutor-stage-grid">
          {visibleSlots.map(({ tutor, index, position }, slotIdx) => {
            const isCenter = position === "center";
            return (
              <div
                key={`${tutor.id}-${slotIdx}`}
                onClick={() => {
                  if (!isCenter) {
                    pauseTemporarily();
                    setActiveIndex(index);
                  }
                }}
                className={`tutor-stage-slot ${
                  isCenter ? "tutor-stage-slot--active" : "tutor-stage-slot--side"
                }`}
              >
                <TutorCard tutor={tutor} isActive={isCenter} />
              </div>
            );
          })}
        </div>

        {/* Right Circular Arrow Button */}
        {total > 1 && (
          <button
            type="button"
            className="tutor-nav-arrow tutor-nav-arrow--right"
            aria-label="Tutor berikutnya"
            onClick={() => handleNext(true)}
          >
            <ChevronRight size={22} />
          </button>
        )}

        {/* Right Ghost Peek Card */}
        <div className="tutor-ghost-peek tutor-ghost-peek--right" aria-hidden="true" />
      </div>

      {/* Bottom Centered Pagination Dots */}
      {total > 1 && (
        <div className="tutor-pagination-dots">
          {tutors.map((item, idx) => {
            const isCurrent = idx === safeActiveIndex;
            return (
              <button
                key={item.id}
                type="button"
                aria-label={`Pilih tutor ${item.name}`}
                aria-current={isCurrent ? "true" : undefined}
                onClick={() => {
                  pauseTemporarily();
                  setActiveIndex(idx);
                }}
                className={`tutor-dot ${isCurrent ? "tutor-dot--active" : ""}`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export function AchievementMarquee({ achievements }: { achievements: Achievement[] }) {
  const [paused, setPaused] = useState(false);

  if (achievements.length === 0) {
    return (
      <div className="achievement-marquee-section">
        <EmptyState
          title="Prestasi siswa belum tersedia"
          description="Data pencapaian akademik dan olimpiade siswa akan segera ditampilkan."
        />
      </div>
    );
  }

  // Repeat real DB achievements if fewer than 4 so the marquee track loops seamlessly
  const marqueeItems: Achievement[] = [];
  while (marqueeItems.length < Math.max(4, achievements.length)) {
    marqueeItems.push(...achievements);
  }

  return (
    <div className="achievement-marquee-section">
      <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
        <div className="inline-flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-[#F4A261]/20 text-[#D97706] grid place-items-center">
            <Trophy size={16} aria-hidden="true" />
          </span>
          <div>
            <strong className="block text-sm font-extrabold text-[#111827]">
              Hall of Fame &amp; Jejak Keberhasilan Siswa ({achievements.length})
            </strong>
            <span className="block text-xs text-[#4B5563]">
              Geser atau arahkan kursor untuk membaca cerita pencapaian siswa kami
            </span>
          </div>
        </div>

        <div className="actions">
          <button
            type="button"
            className="btn btn-glass btn-small"
            aria-pressed={paused}
            onClick={() => setPaused(!paused)}
          >
            {paused ? <Play size={15} /> : <Pause size={15} />}
            <span>{paused ? "Lanjutkan animasi" : "Jeda animasi"}</span>
          </button>

          <Link href="/prestasi" className="btn btn-glass btn-small">
            <span>Semua Prestasi ({achievements.length})</span>
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="marquee-window">
        <div
          className="marquee-track"
          style={{ animationPlayState: paused ? "paused" : "running" }}
        >
          <div className="marquee-group">
            {marqueeItems.map((item, idx) => (
              <AchievementTicket key={`a-${item.id}-${idx}`} achievement={item} />
            ))}
          </div>

          <div className="marquee-group marquee-copy" aria-hidden="true" inert>
            {marqueeItems.map((item, idx) => (
              <AchievementTicket key={`b-${item.id}-${idx}`} achievement={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
