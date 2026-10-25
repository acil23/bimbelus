"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Counter } from "@/components/animations/counter";

type AchievementsStairsProps = {
  achievementsCount: number;
  tutorsCount: number;
  programsCount: number;
};

export function AchievementsStairs({
  achievementsCount,
  tutorsCount,
  programsCount,
}: AchievementsStairsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Scroll-responsive upward parallax for medals, trophy & glass tiles
  const medalLowY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduce ? [0, 0] : [35, -55]
  );
  const medalHighY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduce ? [0, 0] : [50, -75]
  );
  const trophyY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduce ? [0, 0] : [20, -35]
  );
  const glassTilesY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduce ? [0, 0] : [30, -45]
  );

  return (
    <div ref={sectionRef} className="prestasi-design-grid">
      {/* ── LEFT COLUMN: Heading, Tagline & Real Database Counters ── */}
      <div className="prestasi-text-col">
        <h2 className="prestasi-title">
          <span className="block">PRESTASI KAMI</span>
          <span className="block prestasi-subtitle">
            Meraih Mimpi Bersama Kami
          </span>
        </h2>

        <p className="prestasi-tagline">
          ENABLING STUDENTS TO ADVANCE IN
          <br />
          THEIR EDUCATION
        </p>

        {/* Real Database Counts: Prestasi Siswa | Total Tutor | Program Belajar */}
        <div className="prestasi-big-counters">
          <div className="prestasi-counter-block">
            <Counter
              value={achievementsCount}
              duration={1.8}
              className="prestasi-counter-num"
            />
            <span className="prestasi-counter-label">Prestasi Siswa</span>
          </div>

          <div className="prestasi-counter-divider" aria-hidden="true" />

          <div className="prestasi-counter-block">
            <Counter
              value={tutorsCount}
              duration={1.8}
              className="prestasi-counter-num"
            />
            <span className="prestasi-counter-label">Total Tutor</span>
          </div>

          <div className="prestasi-counter-divider" aria-hidden="true" />

          <div className="prestasi-counter-block">
            <Counter
              value={programsCount}
              duration={1.8}
              className="prestasi-counter-num"
            />
            <span className="prestasi-counter-label">Program Belajar</span>
          </div>
        </div>
      </div>

      {/* ── RIGHT COLUMN: 3D Isometric 7-Step Staircase + Trophy + Floating Medals ── */}
      <div className="prestasi-3d-stage" aria-hidden="true">
        <div className="prestasi-3d-scene">
          {/* Floating Medal 1 (Lower-Left) */}
          <motion.div
            style={{ y: medalLowY }}
            className="prestasi-floating-medal prestasi-floating-medal--1"
          >
            <svg viewBox="0 0 80 100" className="w-full h-full drop-shadow-md" fill="none">
              {/* Blue V-Ribbon */}
              <polygon points="18,8 34,8 42,46 30,46" fill="#2E8BC0" />
              <polygon points="62,8 46,8 36,46 48,46" fill="#56B9EC" />
              {/* Bronze/Gold 3D Medal Disc */}
              <circle cx="42" cy="64" r="20" fill="#B45309" />
              <circle cx="39" cy="62" r="20" fill="#F4A261" stroke="#FDE68A" strokeWidth="2" />
              <circle cx="39" cy="62" r="14" fill="#D97706" opacity="0.45" />
            </svg>
          </motion.div>

          {/* Floating Medal 2 (Upper-Mid Left) */}
          <motion.div
            style={{ y: medalHighY }}
            className="prestasi-floating-medal prestasi-floating-medal--2"
          >
            <svg viewBox="0 0 80 100" className="w-full h-full drop-shadow-md" fill="none">
              <polygon points="18,8 34,8 42,46 30,46" fill="#2E8BC0" />
              <polygon points="62,8 46,8 36,46 48,46" fill="#60A5FA" />
              <circle cx="42" cy="64" r="19" fill="#B45309" />
              <circle cx="39" cy="62" r="19" fill="#F4A261" stroke="#FDE68A" strokeWidth="2" />
              <circle cx="39" cy="62" r="13" fill="#D97706" opacity="0.45" />
            </svg>
          </motion.div>

          {/* Summit 3D Golden Trophy */}
          <motion.div
            style={{ y: trophyY }}
            className="prestasi-summit-trophy"
          >
            <svg viewBox="0 0 120 130" className="w-full h-full drop-shadow-xl" fill="none">
              <defs>
                <linearGradient id="summitCupGold" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FEF08A" />
                  <stop offset="40%" stopColor="#F4A261" />
                  <stop offset="85%" stopColor="#D97706" />
                  <stop offset="100%" stopColor="#92400E" />
                </linearGradient>
              </defs>
              {/* Left & Right 3D Handles */}
              <path
                d="M34 32 H16 C14 54, 26 64, 38 64 M86 32 H104 C106 54, 94 64, 82 64"
                stroke="url(#summitCupGold)"
                strokeWidth="7"
                strokeLinecap="round"
              />
              {/* Main Trophy Bowl */}
              <path
                d="M30 20 H90 V48 C90 72, 74 84, 60 84 C46 84, 30 72, 30 48 Z"
                fill="url(#summitCupGold)"
              />
              {/* Top Rim Ellipse */}
              <ellipse cx="60" cy="20" rx="30" ry="7" fill="#FEF9C3" stroke="#F59E0B" strokeWidth="2" />
              {/* Stem */}
              <rect x="53" y="82" width="14" height="20" rx="4" fill="url(#summitCupGold)" />
              {/* Pedestal Base */}
              <ellipse cx="60" cy="106" rx="24" ry="7" fill="#D97706" />
              <ellipse cx="60" cy="103" rx="22" ry="6" fill="#FDE047" />
            </svg>
          </motion.div>

          {/* Floating Frosted Glass 3D Tiles in Foreground (Atom & Pencil/Chart) */}
          <motion.div
            style={{ y: glassTilesY }}
            className="prestasi-glass-tiles"
          >
            {/* Tile 1: Frosted Glass with 3D Blue Atom */}
            <div className="prestasi-glass-tile">
              <svg viewBox="0 0 64 64" className="w-9 h-9 sm:w-11 sm:h-11" fill="none">
                <ellipse
                  cx="32"
                  cy="32"
                  rx="24"
                  ry="9"
                  transform="rotate(-30 32 32)"
                  stroke="#2E8BC0"
                  strokeWidth="2.5"
                />
                <ellipse
                  cx="32"
                  cy="32"
                  rx="24"
                  ry="9"
                  transform="rotate(30 32 32)"
                  stroke="#38BDF8"
                  strokeWidth="2.5"
                />
                <ellipse
                  cx="32"
                  cy="32"
                  rx="24"
                  ry="9"
                  transform="rotate(90 32 32)"
                  stroke="#60A5FA"
                  strokeWidth="2"
                />
                <circle cx="32" cy="32" r="6" fill="#2E8BC0" />
              </svg>
            </div>

            {/* Tile 2: Frosted Glass with 3D Chart & Golden Pencil */}
            <div className="prestasi-glass-tile">
              <svg viewBox="0 0 64 64" className="w-9 h-9 sm:w-11 sm:h-11" fill="none">
                <rect x="10" y="14" width="34" height="36" rx="6" fill="#38BDF8" opacity="0.25" />
                <line x1="17" y1="24" x2="36" y2="24" stroke="#2E8BC0" strokeWidth="3" strokeLinecap="round" />
                <line x1="17" y1="32" x2="32" y2="32" stroke="#2E8BC0" strokeWidth="3" strokeLinecap="round" />
                <line x1="17" y1="40" x2="28" y2="40" stroke="#2E8BC0" strokeWidth="3" strokeLinecap="round" />
                <g transform="rotate(35 44 36)">
                  <rect x="40" y="18" width="9" height="26" rx="2" fill="#F4A261" />
                  <polygon points="40,44 49,44 44.5,52" fill="#78350F" />
                </g>
              </svg>
            </div>
          </motion.div>

          {/* ── MAIN 7-STEP ISOMETRIC 3D STAIRCASE SVG ── */}
          <svg
            viewBox="0 0 560 400"
            className="prestasi-stairs-svg"
            role="img"
            aria-label="Tangga 3D Prestasi Bimbel YS"
          >
            <defs>
              <linearGradient id="stairSideBlue" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#93C5FD" />
                <stop offset="50%" stopColor="#60A5FA" />
                <stop offset="100%" stopColor="#2E8BC0" />
              </linearGradient>

              <linearGradient id="stairFrontBlue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E0F2FE" />
                <stop offset="100%" stopColor="#7DD3FC" />
              </linearGradient>

              <linearGradient id="stairTreadGold" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#FDE68A" />
                <stop offset="50%" stopColor="#F4A261" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>

              <filter id="stairsDrop" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="18" stdDeviation="14" floodColor="#1E3A8A" floodOpacity="0.18" />
              </filter>
            </defs>

            <g filter="url(#stairsDrop)">
              {/* Isometric Base Platform under Stairs */}
              <polygon
                points="70,320 205,375 495,245 360,190"
                fill="#BFDBFE"
                opacity="0.55"
              />
              <polygon
                points="70,320 205,375 205,390 70,335"
                fill="#60A5FA"
              />
              <polygon
                points="205,375 495,245 495,260 205,390"
                fill="#2E8BC0"
              />

              {/* 7 Isometric Steps Ascending from Bottom-Left to Top-Right */}
              {[0, 1, 2, 3, 4, 5].map((step) => {
                const dx = step * 34;
                const dy = -step * 24;
                return (
                  <g key={step} transform={`translate(${dx}, ${dy})`}>
                    {/* Golden Step Top Tread */}
                    <polygon
                      points="115,295 215,335 250,318 150,278"
                      fill="url(#stairTreadGold)"
                      stroke="#FEF3C7"
                      strokeWidth="1"
                    />
                    {/* Sky-Blue Step Riser Front */}
                    <polygon
                      points="115,295 215,335 215,360 115,320"
                      fill="url(#stairFrontBlue)"
                    />
                  </g>
                );
              })}

              {/* Top Summit Platform (Step 7) where Trophy Stands */}
              <g transform="translate(204, -144)">
                {/* Top Platform Surface */}
                <polygon
                  points="115,295 225,340 295,308 185,263"
                  fill="#E0F2FE"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                />
                {/* Left Riser */}
                <polygon
                  points="115,295 225,340 225,365 115,320"
                  fill="url(#stairFrontBlue)"
                />
                {/* Right Side Wall */}
                <polygon
                  points="225,340 295,308 295,485 225,517"
                  fill="url(#stairSideBlue)"
                />
              </g>

              {/* Stepped Side Wall Connecting All Steps on the Right */}
              <polygon
                points="
                  215,360
                  215,335 250,318
                  250,311 284,294
                  284,287 318,270
                  318,263 352,246
                  352,239 386,222
                  386,215 429,196
                  429,373 215,373
                "
                fill="url(#stairSideBlue)"
                opacity="0.92"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
