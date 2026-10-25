"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Users, Cuboid, GraduationCap } from "lucide-react";

const keunggulanCards = [
  {
    id: "tutor-ahli",
    line1: "Tutor Ahli &",
    line2: "Berpengalaman",
    icon: Users,
    iconBg: "rgba(46, 139, 192, 0.14)",
    iconColor: "#2E8BC0",
    art: "trophy" as const,
  },
  {
    id: "metode-interaktif",
    line1: "Metode Belajar",
    line2: "Interaktif 3D",
    icon: Cuboid,
    iconBg: "rgba(244, 162, 97, 0.2)",
    iconColor: "#D97706",
    art: "trophy" as const,
  },
  {
    id: "kurikulum-masa-depan",
    line1: "Kurikulum",
    line2: "Masa Depan",
    icon: GraduationCap,
    iconBg: "rgba(244, 162, 97, 0.2)",
    iconColor: "#D97706",
    art: "book" as const,
  },
];

const containerSpringVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.05,
    },
  },
};

const cardSpringVariants = {
  hidden: {
    opacity: 0,
    y: 36,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 230,
      damping: 19,
    },
  },
};

function Trophy3DArt() {
  return (
    <svg viewBox="0 0 88 88" className="w-16 h-16 shrink-0 overflow-visible" fill="none">
      <defs>
        <radialGradient id="blueCloud" cx="50%" cy="55%" r="50%">
          <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.65" />
          <stop offset="65%" stopColor="#BFDBFE" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#DBEAFE" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cupGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="45%" stopColor="#F4A261" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
      </defs>
      {/* Soft Blue Glowing Blob Behind 3D Trophy */}
      <circle cx="44" cy="48" r="36" fill="url(#blueCloud)" />
      {/* Handles */}
      <path
        d="M28 28 H20 C20 40, 27 45, 32 45 M60 28 H68 C68 40, 61 45, 56 45"
        stroke="url(#cupGold)"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      {/* Cup Body */}
      <path
        d="M26 22 H62 V36 C62 49, 53 56, 44 56 C35 56, 26 49, 26 36 Z"
        fill="url(#cupGold)"
      />
      {/* Stem & Base */}
      <rect x="40" y="55" width="8" height="10" rx="2" fill="url(#cupGold)" />
      <rect x="30" y="64" width="28" height="7" rx="3.5" fill="#78350F" />
    </svg>
  );
}

function Book3DArt() {
  return (
    <svg viewBox="0 0 88 88" className="w-16 h-16 shrink-0 overflow-visible" fill="none">
      <defs>
        <radialGradient id="blueCloudBook" cx="50%" cy="55%" r="50%">
          <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.65" />
          <stop offset="65%" stopColor="#BFDBFE" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#DBEAFE" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="bookBlue3D" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="55%" stopColor="#2E8BC0" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>
      </defs>
      <circle cx="44" cy="48" r="36" fill="url(#blueCloudBook)" />
      <g transform="rotate(-10 44 44)">
        {/* Book Pages Side */}
        <rect x="26" y="20" width="38" height="48" rx="6" fill="#F8FAFC" />
        {/* Front 3D Blue Cover */}
        <rect x="22" y="18" width="38" height="48" rx="6" fill="url(#bookBlue3D)" />
        {/* Spine Highlight */}
        <rect x="22" y="18" width="6" height="48" rx="3" fill="#1D4ED8" />
        {/* Golden Badge on Cover */}
        <circle cx="43" cy="38" r="7" fill="#F4A261" />
        <rect x="33" y="50" width="20" height="4" rx="2" fill="#93C5FD" />
      </g>
    </svg>
  );
}

export function ClayFeatures() {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      className="keunggulan-clay-grid"
      variants={shouldReduce ? undefined : containerSpringVariants}
      initial={shouldReduce ? undefined : "hidden"}
      whileInView={shouldReduce ? undefined : "visible"}
      viewport={{ once: true, amount: "some" }}
    >
      {keunggulanCards.map((item) => {
        const Icon = item.icon;
        return (
          <motion.article
            key={item.id}
            variants={shouldReduce ? undefined : cardSpringVariants}
            className="clay-pill-card"
          >
            <div
              className="clay-pill-icon"
              style={{
                background: item.iconBg,
                color: item.iconColor,
              }}
            >
              <Icon size={22} aria-hidden="true" />
            </div>

            <div className="clay-pill-text">
              <h3>
                {item.line1}
                <br />
                {item.line2}
              </h3>
            </div>

            <div className="clay-pill-art" aria-hidden="true">
              {item.art === "trophy" ? <Trophy3DArt /> : <Book3DArt />}
            </div>
          </motion.article>
        );
      })}
    </motion.div>
  );
}
