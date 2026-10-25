import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { getPrograms } from "@/lib/api/programs";
import { getTutors } from "@/lib/api/tutors";
import { getAchievements } from "@/lib/api/achievements";
import { HeroMark } from "@/components/site/hero-mark";
import { HeroActions } from "@/components/site/hero-actions";
import { ClayFeatures } from "@/components/site/clay-features";
import { ProgramCard } from "@/components/site/program-card";
import { TutorCarousel, AchievementMarquee } from "@/components/site/showcases";
import { AchievementsStairs } from "@/components/site/achievements-stairs";
import { BusinessStructuredData } from "@/components/seo/business-structured-data";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container";

export default async function HomePage() {
  const [programs, tutors, achievements] = await Promise.all([
    getPrograms(),
    getTutors(),
    getAchievements(),
  ]);

  const highlights = [...achievements]
    .sort((a, b) => Number(b.is_featured) - Number(a.is_featured))
    .slice(0, 12);

  const featuredPrograms = programs.slice(0, 3);

  return (
    <>
      <BusinessStructuredData />

      {/* ── B. HERO SECTION (Lompatan Besar untuk Masa Depan Belajarmu + 3D Logo on Podium) ── */}
      <section className="hero">
        <div className="container hero-grid">
          <StaggerContainer
            className="flex flex-col justify-center"
            stagger={0.12}
            delay={0.05}
          >
            <StaggerItem>
              <span className="eyebrow">
                Bimbel YS · Studio Bimbingan Belajar Modern
              </span>
            </StaggerItem>

            <StaggerItem>
              <h1 className="hero-heading">
                Lompatan Besar
                <br />
                untuk Masa
                <br />
                Depan Belajarmu
              </h1>
            </StaggerItem>

            <StaggerItem>
              <p className="hero-uppercase-sub">
                ENABLING STUDENTS TO ADVANCE
                <br />
                IN THEIR EDUCATION
              </p>
            </StaggerItem>

            <StaggerItem>
              <HeroActions />
            </StaggerItem>

            <StaggerItem>
              <div className="hero-trust-pill">
                <CheckCircle2 size={17} className="text-[#2E8BC0] shrink-0" aria-hidden="true" />
                <span>
                  Pendampingan intensif <strong>SD, SMP, SMA, Olimpiade</strong> &amp;{" "}
                  <strong>Persiapan Seleksi</strong>
                </span>
              </div>
            </StaggerItem>
          </StaggerContainer>

          <HeroMark />
        </div>
      </section>

      {/* ── C. KEUNGGULAN KAMI (3 Horizontal Claymorphism Cards) ── */}
      <section className="landing-block">
        <div className="container">
          <ScrollReveal>
            <div className="flex items-center justify-between gap-4 flex-wrap mb-5">
              <h2 className="landing-block-title !mb-0">KEUNGGULAN KAMI</h2>
              <Link href="/tentang-kami" className="text-link text-xs">
                <span>Kenali filosofi belajar kami</span>
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </ScrollReveal>

          <ClayFeatures />
        </div>
      </section>

      {/* ── D. DAFTAR TUTOR TERPOPULER (Interactive 3-Card Portrait Carousel) ── */}
      <section className="landing-block">
        <div className="container">
          <ScrollReveal>
            <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
              <h2 className="landing-block-title !mb-0">DAFTAR TUTOR TERPOPULER</h2>
              <Link href="/tutor" className="btn btn-glass btn-small">
                <span>Lihat Semua Tutor</span>
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <TutorCarousel tutors={tutors} />
          </ScrollReveal>
        </div>
      </section>

      {/* ── PROGRAM BELAJAR PILIHAN (Claymorphism Program Showcase) ── */}
      {featuredPrograms.length > 0 && (
        <section className="landing-block">
          <div className="container">
            <ScrollReveal>
              <div className="flex items-center justify-between gap-4 flex-wrap mb-5">
                <div>
                  <h2 className="landing-block-title !mb-1">PROGRAM BELAJAR PILIHAN</h2>
                  <p className="text-sm text-[#4B5563]">
                    Pilih paket bimbingan belajar sesuai jenjang dan target akademikmu
                  </p>
                </div>
                <Link href="/program" className="btn btn-glass btn-small">
                  <span>Semua Program</span>
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid-3">
              {featuredPrograms.map((program) => (
                <StaggerItem key={program.id} className="h-full">
                  <ProgramCard program={program} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* ── E. PRESTASI KAMI (3D Stairs + Counters + Animated Student Achievements Marquee!) ── */}
      <section className="landing-block landing-block--prestasi">
        <div className="container space-y-12">
          <ScrollReveal>
            <AchievementsStairs
              achievementsCount={achievements.length}
              tutorsCount={tutors.length}
              programsCount={programs.length}
            />
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <AchievementMarquee achievements={highlights} />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
