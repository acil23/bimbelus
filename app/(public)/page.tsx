// app/(public)/page.tsx --- IGNORE ---

import Link from "next/link";
import { getCompany } from "@/lib/api/company";
import { getPrograms } from "@/lib/api/programs";
import { getTutors } from "@/lib/api/tutors";
import { getAchievements } from "@/lib/api/achievements";
import { HeroMark } from "@/components/site/hero-mark";
import { SectionHeading } from "@/components/site/section-heading";
import { ProgramCard, categoryTheme, categoryLabel } from "@/components/site/program-card";
import { TutorCard } from "@/components/site/tutor-card";
import { AchievementTicket } from "@/components/site/achievement-ticket";
import { CtaBand } from "@/components/site/cta-band";
import { ChevronRight } from "lucide-react";

export default async function HomePage() {
  const [company, programs, tutors, achievements] = await Promise.all([
    getCompany(),
    getPrograms(),
    getTutors(),
    getAchievements(),
  ]);

  const categories = Array.from(new Set(programs.map((p) => p.category)));

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-espresso">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
          <div>
            <span className="inline-flex items-center rounded-full bg-paper/10 px-4 py-1.5 text-sm font-medium text-paper/80">
              {company.name}
            </span>

            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.1] text-paper sm:text-5xl">
              {company.tagline}
            </h1>

            {company.description && (
              <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-paper/70">
                {company.description}
              </p>
            )}

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/program"
                className="rounded-full bg-marigold px-6 py-3 text-sm font-semibold text-espresso transition-colors hover:bg-marigold-dark"
              >
                Lihat Program
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-paper/25 px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-paper/10"
              >
                Hubungi Kami
              </Link>
            </div>
          </div>

          <div className="mx-auto w-full max-w-sm md:max-w-none">
            <HeroMark />
          </div>
        </div>
      </section>

      {/* PROGRAM CATEGORY QUICK NAV */}
      {categories.length > 0 && (
        <section className="mx-auto w-full max-w-6xl px-6 py-14">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {categories.map((category) => {
              const theme = categoryTheme(category);
              return (
                <Link
                  key={category}
                  href="/program"
                  className="group flex items-center justify-between rounded-2xl bg-white px-5 py-5 ring-1 ring-paper-dim transition-shadow hover:shadow-lg hover:shadow-espresso/5"
                >
                  <div>
                    <span className={`inline-block h-2 w-2 rounded-full ${theme.bar}`} />
                    <p className="mt-2 font-display text-lg font-semibold text-espresso">
                      {categoryLabel(category)}
                    </p>
                  </div>
                  <ChevronRight
                    size={18}
                    className="text-bark/40 transition-transform group-hover:translate-x-0.5 group-hover:text-bark"
                  />
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* PROGRAM HIGHLIGHT */}
      {programs.length > 0 && (
        <section className="bg-mist/50 py-16">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading
                title="Program yang bisa kamu pilih"
                description="Dari sekolah dasar hingga persiapan UTBK, setiap program dirancang sesuai kebutuhan jenjang."
              />
              <Link
                href="/program"
                className="group inline-flex items-center gap-1 text-sm font-semibold text-lagoon hover:text-lagoon-dark"
              >
                Lihat semua program
                <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="mt-9 grid gap-5 md:grid-cols-2">
              {programs.slice(0, 4).map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TUTOR HIGHLIGHT */}
      {tutors.length > 0 && (
        <section className="py-16">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading
                title="Belajar bersama tutor berpengalaman"
                description="Tim pengajar Bimbel YS mendampingi setiap siswa dengan pendekatan yang personal."
              />
              <Link
                href="/tutor"
                className="group inline-flex items-center gap-1 text-sm font-semibold text-lagoon hover:text-lagoon-dark"
              >
                Kenali semua tutor
                <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {tutors.slice(0, 3).map((tutor) => (
                <TutorCard key={tutor.id} tutor={tutor} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ACHIEVEMENT HIGHLIGHT */}
      {achievements.length > 0 && (
        <section className="bg-espresso py-16">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-xl">
                <h2 className="font-display text-3xl font-semibold text-paper sm:text-4xl">
                  Jejak prestasi siswa kami
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-paper/60">
                  Sebagian cerita siswa yang berhasil melangkah lebih jauh bersama Bimbel YS.
                </p>
              </div>
              <Link
                href="/prestasi"
                className="group inline-flex items-center gap-1 text-sm font-semibold text-marigold hover:text-marigold-dark"
              >
                Lihat semua prestasi
                <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {achievements.slice(0, 3).map((achievement) => (
                <AchievementTicket key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ABOUT TEASER */}
      {(company.vision || company.mission) && (
        <section className="mx-auto w-full max-w-6xl px-6 py-16">
          <div className="grid gap-8 md:grid-cols-2">
            {company.vision && (
              <div className="rounded-2xl bg-white p-8 ring-1 ring-paper-dim">
                <p className="text-xs font-semibold text-lagoon">Visi</p>
                <p className="mt-3 whitespace-pre-line text-[15px] leading-relaxed text-bark">
                  {company.vision}
                </p>
              </div>
            )}
            {company.mission && (
              <div className="rounded-2xl bg-white p-8 ring-1 ring-paper-dim">
                <p className="text-xs font-semibold text-marigold-dark">Misi</p>
                <p className="mt-3 whitespace-pre-line text-[15px] leading-relaxed text-bark">
                  {company.mission}
                </p>
              </div>
            )}
          </div>
          <Link
            href="/tentang-kami"
            className="group mt-6 inline-flex items-center gap-1 text-sm font-semibold text-lagoon hover:text-lagoon-dark"
          >
            Selengkapnya tentang kami
            <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </section>
      )}

      <CtaBand
        title="Siap memulai langkah belajar berikutnya?"
        description="Konsultasikan kebutuhan belajarmu atau anakmu bersama tim Bimbel YS, gratis tanpa komitmen."
      />
    </>
  );
}
