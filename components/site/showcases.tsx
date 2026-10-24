"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Pause, Play, Trophy, ArrowRight } from "lucide-react";
import type { Achievement, Tutor } from "@/lib/api/types";
import { TutorCard } from "./tutor-card";
import { AchievementTicket } from "./achievement-ticket";

const demoTimestamp = "2026-01-01T00:00:00.000Z";

const fallbackTutors: Tutor[] = [
  {
    id: "demo-1",
    name: "Yusuf Sulaiman",
    slug: "demo-yusuf-sulaiman",
    title: "Tutor Matematika",
    specialization: "Tutor Matematika",
    bio: "Berpengalaman membimbing siswa menembus seleksi sekolah unggulan dan meraih medali Olimpiade Matematika.",
    photo_url: null,
    is_active: true,
    display_order: 1,
    created_at: demoTimestamp,
    updated_at: demoTimestamp,
    tutor_educations: [],
    tutor_experiences: [],
  },
  {
    id: "demo-2",
    name: "Siti Rahma",
    slug: "demo-siti-rahma",
    title: "Tutor Bahasa",
    specialization: "Tutor Bahasa",
    bio: "Pendekatan ramah dan interaktif yang membangun penguasaan literasi Bahasa Indonesia & Bahasa Inggris.",
    photo_url: null,
    is_active: true,
    display_order: 2,
    created_at: demoTimestamp,
    updated_at: demoTimestamp,
    tutor_educations: [],
    tutor_experiences: [],
  },
  {
    id: "demo-3",
    name: "Hanui Inoes",
    slug: "demo-hanui-inoes",
    title: "Tutor Fisika",
    specialization: "Tutor Fisika",
    bio: "Mengubah konsep Fisika dan Sains menjadi eksperimen visual yang mudah dipahami siswa.",
    photo_url: null,
    is_active: true,
    display_order: 3,
    created_at: demoTimestamp,
    updated_at: demoTimestamp,
    tutor_educations: [],
    tutor_experiences: [],
  },
];

const fallbackAchievements: Achievement[] = [
  {
    id: "demo-ach-1",
    student_name: "Rafi Pratama",
    title: "Medali Emas Olimpiade Sains Nasional (OSN) Matematika",
    student_school: "SMAN 1 Pulau Punjung",
    destination: "Tingkat Provinsi & Nasional",
    subject: "Matematika",
    achievement_type: "COMPETITION",
    year: 2025,
    image_url: null,
    is_featured: true,
    display_order: 1,
  },
  {
    id: "demo-ach-2",
    student_name: "Nabila Azzahra",
    title: "Lolos Seleksi Masuk Fakultas Kedokteran SNBP",
    student_school: "SMAN Unggul Dharmasraya",
    destination: "Universitas Andalas",
    subject: "Biologi & Kimia",
    achievement_type: "ADMISSION",
    year: 2025,
    image_url: null,
    is_featured: true,
    display_order: 2,
  },
  {
    id: "demo-ach-3",
    student_name: "Farel Aditya",
    title: "Juara 1 Kompetisi Sains Madrasah (KSM) Fisika Terintegrasi",
    student_school: "MAN Dharmasraya",
    destination: "Juara 1 Tingkat Kabupaten",
    subject: "Fisika",
    achievement_type: "COMPETITION",
    year: 2025,
    image_url: null,
    is_featured: true,
    display_order: 3,
  },
  {
    id: "demo-ach-4",
    student_name: "Keisya Putri",
    title: "Peringkat 1 Paralel & Nilai Ujian Sekolah Tertinggi",
    student_school: "SMPN 1 Pulau Punjung",
    destination: "Diterima di SMA Favorit",
    subject: "Sains & Matematika",
    achievement_type: "ACADEMIC",
    year: 2025,
    image_url: null,
    is_featured: true,
    display_order: 4,
  },
];

export function TutorCarousel({ tutors }: { tutors: Tutor[] }) {
  const baseList = tutors.length > 0 ? tutors : fallbackTutors;
  const items: Tutor[] =
    baseList.length >= 3
      ? baseList
      : baseList.length === 2
        ? [...baseList, fallbackTutors[2]]
        : [baseList[0], fallbackTutors[1], fallbackTutors[2]];

  const [activeIndex, setActiveIndex] = useState(0);
  const [pausedUntil, setPausedUntil] = useState<number>(0);
  const touchStartX = useRef<number | null>(null);

  const total = items.length;

  const pauseTemporarily = useCallback(() => {
    setPausedUntil(Date.now() + 8000);
  }, []);

  const handleNext = useCallback(
    (isManual = false) => {
      if (isManual) pauseTemporarily();
      setActiveIndex((prev) => (prev + 1) % total);
    },
    [total, pauseTemporarily]
  );

  const handlePrev = useCallback(
    (isManual = false) => {
      if (isManual) pauseTemporarily();
      setActiveIndex((prev) => (prev - 1 + total) % total);
    },
    [total, pauseTemporarily]
  );

  // Auto-scroll every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() < pausedUntil) return;
      setActiveIndex((prev) => (prev + 1) % total);
    }, 4000);

    return () => clearInterval(interval);
  }, [total, pausedUntil]);

  const leftIndex = (activeIndex - 1 + total) % total;
  const rightIndex = (activeIndex + 1) % total;

  const visibleSlots = [
    { tutor: items[leftIndex], index: leftIndex, position: "side" as const },
    { tutor: items[activeIndex], index: activeIndex, position: "center" as const },
    { tutor: items[rightIndex], index: rightIndex, position: "side" as const },
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
        <button
          type="button"
          className="tutor-nav-arrow tutor-nav-arrow--left"
          aria-label="Tutor sebelumnya"
          onClick={() => handlePrev(true)}
        >
          <ChevronLeft size={22} />
        </button>

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
        <button
          type="button"
          className="tutor-nav-arrow tutor-nav-arrow--right"
          aria-label="Tutor berikutnya"
          onClick={() => handleNext(true)}
        >
          <ChevronRight size={22} />
        </button>

        {/* Right Ghost Peek Card */}
        <div className="tutor-ghost-peek tutor-ghost-peek--right" aria-hidden="true" />
      </div>

      {/* Bottom Centered Pagination Dots */}
      <div className="tutor-pagination-dots">
        {items.map((item, idx) => {
          const isCurrent = idx === activeIndex;
          return (
            <button
              key={`${item.id}-${idx}`}
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
    </div>
  );
}

export function AchievementMarquee({ achievements }: { achievements: Achievement[] }) {
  const [paused, setPaused] = useState(false);

  // Use database achievements if available, otherwise fallback so animation is always present
  const sourceList = achievements.length > 0 ? achievements : fallbackAchievements;

  // Ensure at least 4 cards in a group so the marquee track is wide and seamless
  const marqueeItems =
    sourceList.length >= 4
      ? sourceList
      : [...sourceList, ...fallbackAchievements].slice(0, Math.max(4, sourceList.length * 2));

  return (
    <div className="achievement-marquee-section">
      <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
        <div className="inline-flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-[#F4A261]/20 text-[#D97706] grid place-items-center">
            <Trophy size={16} aria-hidden="true" />
          </span>
          <div>
            <strong className="block text-sm font-extrabold text-[#111827]">
              Hall of Fame &amp; Jejak Keberhasilan Siswa
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
            <span>Semua Prestasi</span>
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
