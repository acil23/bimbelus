"use client";

import { useRef, useCallback, type MouseEvent } from "react";
import { useReducedMotion } from "framer-motion";

export function HeroMark() {
  const stageRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const shouldReduce = useReducedMotion();

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (shouldReduce || !stageRef.current || !tiltRef.current) return;

      const rect = stageRef.current.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;

      // Max 10deg tilt
      const rotateY = relX * 20;
      const rotateX = -relY * 20;

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (tiltRef.current) {
          tiltRef.current.style.transform = `perspective(1100px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
        }
      });
    },
    [shouldReduce]
  );

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (tiltRef.current) {
      tiltRef.current.style.transform =
        "perspective(1100px) rotateX(0deg) rotateY(0deg)";
    }
  }, []);

  return (
    <div
      ref={stageRef}
      className="hero-3d-stage"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={tiltRef} className="hero-3d-tilt-wrapper">
        {/* ── FLOATING ORNAMENT 1: 3D Blue Atom (Top-Left) ── */}
        <div
          className="floating-ornament ornament-atom-tl"
          style={{ transform: "translateZ(70px)" }}
          aria-hidden="true"
        >
          <div className="ornament-levitate ornament-levitate--atom">
            <svg viewBox="0 0 110 110" className="w-full h-full drop-shadow-md" fill="none">
              <ellipse
                cx="55"
                cy="55"
                rx="42"
                ry="16"
                transform="rotate(-32 55 55)"
                stroke="#3B82F6"
                strokeWidth="3.2"
                strokeOpacity="0.65"
              />
              <ellipse
                cx="55"
                cy="55"
                rx="42"
                ry="16"
                transform="rotate(32 55 55)"
                stroke="#2E8BC0"
                strokeWidth="3.2"
                strokeOpacity="0.7"
              />
              <ellipse
                cx="55"
                cy="55"
                rx="42"
                ry="16"
                transform="rotate(90 55 55)"
                stroke="#60A5FA"
                strokeWidth="2.8"
                strokeOpacity="0.5"
              />
              <circle cx="55" cy="55" r="10" fill="#2E8BC0" />
              <circle cx="52" cy="52" r="4" fill="#93C5FD" />
              <circle cx="20" cy="36" r="5" fill="#F4A261" />
              <circle cx="88" cy="72" r="4.5" fill="#38BDF8" />
            </svg>
          </div>
        </div>

        {/* ── FLOATING ORNAMENT 2: 3D Open Book (Top-Right) ── */}
        <div
          className="floating-ornament ornament-book-tr"
          style={{ transform: "translateZ(75px)" }}
          aria-hidden="true"
        >
          <div className="ornament-levitate ornament-levitate--book">
            <svg viewBox="0 0 130 105" className="w-full h-full drop-shadow-lg" fill="none">
              {/* Brown/Bronze 3D Book Cover */}
              <path
                d="M18 48 L62 62 L112 38 L116 44 L62 72 L14 55 Z"
                fill="#9A5B32"
              />
              {/* Left Cream Page */}
              <path
                d="M22 44 C36 36, 50 40, 62 56 L62 64 C48 48, 34 44, 18 50 Z"
                fill="#FDF8EE"
                stroke="#E2D5C1"
                strokeWidth="1.2"
              />
              {/* Right Cream Page (Raised) */}
              <path
                d="M62 56 C74 34, 92 22, 110 26 L108 38 C92 34, 76 44, 62 64 Z"
                fill="#FFFDF9"
                stroke="#E2D5C1"
                strokeWidth="1.2"
              />
              {/* Fluttering Page Lines */}
              <path
                d="M30 44 C40 41, 48 44, 55 52 M72 44 C82 34, 94 29, 102 31"
                stroke="#CBD5E1"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* ── FLOATING ORNAMENT 3: 3D Screen & Mortarboard (Bottom-Left) ── */}
        <div
          className="floating-ornament ornament-cap-bl"
          style={{ transform: "translateZ(65px)" }}
          aria-hidden="true"
        >
          <div className="ornament-levitate ornament-levitate--bubble">
            <svg viewBox="0 0 110 110" className="w-full h-full drop-shadow-md" fill="none">
              {/* Tilted 3D Blue Tablet/Screen */}
              <g transform="rotate(-18 55 58)">
                <rect
                  x="26"
                  y="32"
                  width="54"
                  height="42"
                  rx="8"
                  fill="#1E3A8A"
                />
                <rect
                  x="22"
                  y="28"
                  width="54"
                  height="42"
                  rx="8"
                  fill="#38BDF8"
                  stroke="#E0F2FE"
                  strokeWidth="2"
                />
                <rect x="30" y="36" width="38" height="24" rx="4" fill="#F0F9FF" />
                {/* Stand */}
                <path d="M42 70 L36 82 H62 L56 70 Z" fill="#94A3B8" />
              </g>
              {/* Small Golden Cube */}
              <rect
                x="72"
                y="66"
                width="16"
                height="16"
                rx="4"
                transform="rotate(15 72 66)"
                fill="#F4A261"
              />
            </svg>
          </div>
        </div>

        {/* ── FLOATING ORNAMENT 4: 3D Yellow Pencil (Bottom-Right) ── */}
        <div
          className="floating-ornament ornament-pencil-br"
          style={{ transform: "translateZ(80px)" }}
          aria-hidden="true"
        >
          <div className="ornament-levitate ornament-levitate--star">
            <svg viewBox="0 0 110 110" className="w-full h-full drop-shadow-md" fill="none">
              <g transform="rotate(38 55 55)">
                {/* Pencil Body */}
                <rect x="44" y="24" width="22" height="50" rx="3" fill="#FACC15" />
                <rect x="55" y="24" width="11" height="50" rx="2" fill="#EAB308" />
                {/* Silver Ferrule */}
                <rect x="44" y="17" width="22" height="8" rx="1" fill="#CBD5E1" />
                {/* Pink/Coral Eraser */}
                <path
                  d="M44 17 V11 C44 7, 66 7, 66 11 V17 Z"
                  fill="#F472B6"
                />
                {/* Wood Cone & Lead Tip */}
                <polygon points="44,74 66,74 55,94" fill="#FDE68A" />
                <polygon points="51,87 59,87 55,94" fill="#1E293B" />
              </g>
            </svg>
          </div>
        </div>

        {/* ── FLOATING 3D GLASS BUBBLES AROUND SPHERE ── */}
        <div
          className="floating-ornament ornament-sphere-1"
          style={{ transform: "translateZ(40px)" }}
          aria-hidden="true"
        >
          <div className="ornament-levitate ornament-levitate--bubble-delayed">
            <div className="clay-sphere clay-sphere--blue" />
          </div>
        </div>
        <div
          className="floating-ornament ornament-sphere-2"
          style={{ transform: "translateZ(50px)" }}
          aria-hidden="true"
        >
          <div className="ornament-levitate ornament-levitate--book">
            <div className="clay-sphere clay-sphere--soft" />
          </div>
        </div>
        <div
          className="floating-ornament ornament-sphere-3"
          style={{ transform: "translateZ(35px)" }}
          aria-hidden="true"
        >
          <div className="ornament-levitate ornament-levitate--atom">
            <div className="clay-sphere clay-sphere--gold" />
          </div>
        </div>

        {/* ── MAIN 3D SPHERE LOGO + HOLOGRAPHIC PODIUM + ORBITAL RING ── */}
        <div
          className="hero-logo-levitate"
          style={{ transform: "translateZ(30px)" }}
        >
          <svg
            viewBox="0 0 680 650"
            className="hero-3d-svg"
            role="img"
            aria-label="Logo 3D Bimbel YS di atas Podium Futuristik"
          >
            <defs>
              {/* 3D Pearl White Sphere Gradient */}
              <radialGradient id="pearlSphere" cx="42%" cy="32%" r="60%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="38%" stopColor="#F1F5F9" />
                <stop offset="75%" stopColor="#CBD5E1" />
                <stop offset="94%" stopColor="#94A3B8" />
                <stop offset="100%" stopColor="#64748B" />
              </radialGradient>

              <radialGradient id="sphereHighlight" cx="36%" cy="25%" r="30%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
              </radialGradient>

              {/* Cyan/White Holographic Podium Glow */}
              <radialGradient id="podiumCyanGlow" cx="50%" cy="40%" r="55%">
                <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.95" />
                <stop offset="45%" stopColor="#38BDF8" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#2E8BC0" stopOpacity="0" />
              </radialGradient>

              {/* Podium White/Silver Tier Gradient */}
              <linearGradient id="podiumWhite" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#CBD5E1" />
                <stop offset="25%" stopColor="#F8FAFC" />
                <stop offset="50%" stopColor="#FFFFFF" />
                <stop offset="78%" stopColor="#E2E8F0" />
                <stop offset="100%" stopColor="#94A3B8" />
              </linearGradient>

              {/* Podium Gold Ring Gradient */}
              <linearGradient id="podiumGold" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#9A5B25" />
                <stop offset="25%" stopColor="#F4A261" />
                <stop offset="50%" stopColor="#FEF08A" />
                <stop offset="75%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#78350F" />
              </linearGradient>

              {/* 3D Bronze / Copper Gradient */}
              <linearGradient id="bronze3D" x1="0.1" y1="0" x2="0.9" y2="1">
                <stop offset="0%" stopColor="#C87D4B" />
                <stop offset="28%" stopColor="#9C5528" />
                <stop offset="55%" stopColor="#6E3815" />
                <stop offset="80%" stopColor="#8C4920" />
                <stop offset="100%" stopColor="#4A230B" />
              </linearGradient>

              <linearGradient id="bronzeBevel" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F4A261" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#B86B38" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#3B1B07" stopOpacity="0.9" />
              </linearGradient>

              <linearGradient id="leftArcGrad" x1="0" y1="1" x2="0.3" y2="0">
                <stop offset="0%" stopColor="#2E8BC0" />
                <stop offset="32%" stopColor="#236B96" />
                <stop offset="58%" stopColor="#4E3524" />
                <stop offset="100%" stopColor="#6E3B19" />
              </linearGradient>

              {/* 3D Sky Blue Gradient */}
              <linearGradient id="skyBlue3D" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#56B9EC" />
                <stop offset="40%" stopColor="#2E8BC0" />
                <stop offset="80%" stopColor="#1B6692" />
                <stop offset="100%" stopColor="#10496B" />
              </linearGradient>

              <linearGradient id="skyBlueLight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8CE0FF" />
                <stop offset="45%" stopColor="#399FD6" />
                <stop offset="100%" stopColor="#1E6A96" />
              </linearGradient>

              {/* 3D Golden Yellow Gradient */}
              <linearGradient id="gold3D" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFF099" />
                <stop offset="30%" stopColor="#F9C74F" />
                <stop offset="70%" stopColor="#F4A261" />
                <stop offset="100%" stopColor="#C87619" />
              </linearGradient>

              <linearGradient id="goldExtrude" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C87A19" />
                <stop offset="100%" stopColor="#7C4405" />
              </linearGradient>

              <filter id="castShadow3D" x="-15%" y="-15%" width="140%" height="140%">
                <feDropShadow dx="5" dy="10" stdDeviation="7" floodColor="#0F172A" floodOpacity="0.28" />
              </filter>

              <filter id="podiumDropShadow" x="-20%" y="-20%" width="140%" height="150%">
                <feGaussianBlur stdDeviation="18" />
              </filter>
            </defs>

            {/* ── 1. MULTI-TIERED FUTURISTIC 3D PODIUM / PEDESTAL (At Base) ── */}
            {/* Soft Ambient Floor Shadow */}
            <ellipse
              cx="340"
              cy="595"
              rx="235"
              ry="38"
              fill="rgba(30, 58, 138, 0.22)"
              filter="url(#podiumDropShadow)"
            />

            {/* Outer Golden Orbital Ring with Arrowheads on Floor */}
            <path
              d="M108 552 C108 602, 572 602, 572 552"
              stroke="url(#podiumGold)"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M92 536 C78 575, 195 616, 330 618"
              stroke="url(#podiumGold)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
            />
            <polygon points="345,618 322,608 324,628" fill="#F4A261" />

            <path
              d="M588 536 C602 575, 485 616, 365 618"
              stroke="url(#podiumGold)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
            />

            {/* Bottom Wide Podium Tier (Gold & White) */}
            <ellipse cx="340" cy="560" rx="205" ry="38" fill="url(#podiumGold)" />
            <ellipse cx="340" cy="552" rx="198" ry="35" fill="url(#podiumWhite)" />

            {/* Middle Podium Tier with Glowing Cyan Ring */}
            <ellipse
              cx="340"
              cy="542"
              rx="168"
              ry="28"
              fill="#38BDF8"
              opacity="0.65"
            />
            <ellipse cx="340" cy="534" rx="158" ry="26" fill="url(#podiumGold)" />
            <ellipse cx="340" cy="527" rx="150" ry="24" fill="url(#podiumWhite)" />

            {/* Upper Podium Tier & Holographic Blue Upward Glow */}
            <ellipse cx="340" cy="516" rx="115" ry="18" fill="url(#podiumGold)" />
            <ellipse cx="340" cy="510" rx="108" ry="16" fill="#E0F2FE" />
            <ellipse cx="340" cy="485" rx="145" ry="52" fill="url(#podiumCyanGlow)" />

            {/* ── 2. BACK HALF OF ORBITAL LIGHT RING ── */}
            <ellipse
              cx="340"
              cy="285"
              rx="255"
              ry="68"
              transform="rotate(-16 340 285)"
              stroke="#FFFBEB"
              strokeWidth="4"
              strokeOpacity="0.55"
              fill="none"
            />

            {/* ── 3. MAIN 3D GLOSSY PEARL SPHERE LOGO ── */}
            <g transform="translate(24, -18) scale(0.92)">
              <circle
                cx="340"
                cy="290"
                r="212"
                fill="url(#pearlSphere)"
                stroke="#FFFFFF"
                strokeWidth="2"
              />
              <circle cx="340" cy="290" r="212" fill="url(#sphereHighlight)" />

              {/* Top Bronze Orbital Cap */}
              <g filter="url(#castShadow3D)">
                <path
                  d="M204 82 C282 36, 398 38, 488 96 L478 104 C392 54, 288 56, 220 98 Z"
                  fill="#3E1D08"
                />
                <path
                  d="M200 74 C280 28, 396 32, 486 90 C398 44, 288 46, 218 90 Z"
                  fill="url(#bronze3D)"
                  stroke="url(#bronzeBevel)"
                  strokeWidth="2"
                />
              </g>

              {/* Left Orbital Arc */}
              <g filter="url(#castShadow3D)">
                <path
                  d="M108 175 C52 292, 78 456, 212 548 C246 570, 282 586, 316 594 C250 556, 188 500, 152 424 C106 330, 112 248, 140 194 Z"
                  fill="url(#leftArcGrad)"
                  stroke="#56B9EC"
                  strokeWidth="1.5"
                />
              </g>

              {/* Central Bronze 'Y' Stem */}
              <g filter="url(#castShadow3D)">
                <path
                  d="M118 92 C206 110, 284 172, 302 264 C338 238, 390 220, 464 212 C386 232, 342 256, 312 292 C304 376, 268 470, 222 502 C190 524, 160 490, 192 426 C204 400, 220 382, 234 370 C208 408, 200 444, 214 452 C232 460, 264 392, 274 298 C280 216, 222 144, 118 92 Z"
                  fill="#3B1B07"
                  transform="translate(4, 6)"
                />
                <path
                  d="M114 88 C204 106, 282 168, 300 260 C338 234, 390 216, 466 208 C386 228, 340 252, 310 288 C302 374, 266 466, 220 498 C188 520, 156 486, 188 422 C200 398, 218 378, 234 366 C206 404, 198 440, 212 448 C230 456, 262 388, 272 294 C278 212, 218 140, 114 88 Z"
                  fill="url(#bronze3D)"
                  stroke="url(#bronzeBevel)"
                  strokeWidth="2.2"
                />
              </g>

              {/* Top-Left 3D Sky Blue Leaf */}
              <g filter="url(#castShadow3D)">
                <path
                  d="M54 66 C132 62, 212 110, 250 216 C164 220, 94 174, 54 66 Z"
                  fill="#0D4366"
                  transform="translate(4, 6)"
                />
                <path
                  d="M54 66 C134 62, 212 110, 250 216 C164 220, 94 174, 54 66 Z"
                  fill="url(#skyBlue3D)"
                  stroke="#8CE0FF"
                  strokeWidth="2"
                />
                <path
                  d="M106 98 C154 118, 194 152, 226 196 C186 160, 146 128, 106 98 Z"
                  fill="#E0F4FF"
                  opacity="0.85"
                />
              </g>

              {/* Golden 3D Rising Arrow */}
              <g filter="url(#castShadow3D)">
                <path
                  d="M348 230 L422 160 L436 184 L478 148 L464 134 L538 118 L504 184 L492 168 L430 220 L414 192 Z"
                  fill="url(#goldExtrude)"
                  transform="translate(-4, 8)"
                />
                <path
                  d="M348 230 L422 160 L436 184 L478 148 L464 134 L538 118 L504 184 L492 168 L430 220 L414 192 Z"
                  fill="url(#gold3D)"
                  stroke="#FFF3B0"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </g>

              {/* Right 'S' Curve & 3D Open Book Pages */}
              <g filter="url(#castShadow3D)">
                <path
                  d="M330 482 C396 448, 450 424, 500 424 L528 266 L552 254 L516 446 C460 442, 400 462, 330 482 Z"
                  fill="url(#gold3D)"
                  stroke="#FFE082"
                  strokeWidth="1.5"
                />
                <path
                  d="M520 246 C464 210, 360 226, 340 276 C318 324, 428 336, 420 398 C412 444, 326 474, 236 504 C330 482, 438 452, 536 470 L578 290 L550 294 L516 444 C462 434, 404 448, 342 474 C418 440, 468 410, 466 372 C464 320, 362 312, 374 274 C386 242, 456 234, 520 246 Z"
                  fill="url(#skyBlueLight)"
                  stroke="#A5E8FF"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M392 278 C430 246, 480 238, 526 250 C490 292, 442 298, 392 278 Z"
                  fill="url(#skyBlue3D)"
                  stroke="#8CE0FF"
                  strokeWidth="1.8"
                />
              </g>
            </g>

            {/* ── 4. FRONT HALF OF LUMINOUS ORBITAL SWOOSH & SPARKLES ── */}
            <path
              d="M95 352 C175 425, 495 365, 585 215"
              stroke="#FFFFFF"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
              opacity="0.9"
            />
            <path
              d="M110 368 C205 435, 485 380, 578 232"
              stroke="url(#gold3D)"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.85"
            />
            {/* Glowing 4-Point Star Sparkles on the Orbit */}
            <path
              d="M210 382 L214 394 L226 398 L214 402 L210 414 L206 402 L194 398 L206 394 Z"
              fill="#FFFFFF"
            />
            <path
              d="M548 258 L551 267 L560 270 L551 273 L548 282 L545 273 L536 270 L545 267 Z"
              fill="#FEF08A"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
