"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Sparkles, Compass, Users, Trophy, ArrowRight } from "lucide-react";

const methodHighlights = [
  {
    step: "01",
    title: "Diagnostic & Pemetaan Konsep",
    desc: "Mengidentifikasi gaya belajar dan penguasaan materi dasar siswa sebelum menyusun target kurikulum.",
    icon: Compass,
    color: "#2E8BC0",
  },
  {
    step: "02",
    title: "Sesi Interaktif & Visualisasi",
    desc: "Pendekatan diskusi dua arah bersama tutor ahli yang mengubah rumus abstrak menjadi logika visual yang intuitif.",
    icon: Users,
    color: "#F4A261",
  },
  {
    step: "03",
    title: "Evaluasi Terukur & Klinik PR",
    desc: "Simulasi ujian berkala, bedah soal HOTS/Olimpiade, serta laporan perkembangan berkala bagi orang tua.",
    icon: Trophy,
    color: "#E76F51",
  },
];

export function HeroActions() {
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (!openModal) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenModal(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [openModal]);

  return (
    <>
      <div className="hero-cta-row">
        <Link href="/program" className="btn-hero-blue">
          <span>Mulai Eksplorasi</span>
          <ArrowRight size={17} aria-hidden="true" className="ml-2" />
        </Link>

        <button
          type="button"
          onClick={() => setOpenModal(true)}
          className="btn-hero-video"
        >
          <span className="btn-hero-play-icon" aria-hidden="true">
            <Play size={12} fill="#2E8BC0" color="#2E8BC0" />
          </span>
          <span>Selengkapnya...</span>
        </button>
      </div>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {openModal && (
              <motion.div
                className="hero-modal-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpenModal(false)}
              >
                <motion.div
                  className="hero-modal-card"
                  initial={{ opacity: 0, scale: 0.92, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 16 }}
                  transition={{ type: "spring", stiffness: 280, damping: 24 }}
                  onClick={(e) => e.stopPropagation()}
                  role="dialog"
                  aria-modal="true"
                  aria-label="Preview Metode Belajar Bimbel YS"
                >
                  <div className="flex items-center justify-between gap-3 pb-3.5 border-b border-slate-200/80">
                    <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-[#2E8BC0]">
                      <Sparkles size={15} className="text-[#F4A261] shrink-0" aria-hidden="true" />
                      <span>Interactive Method Preview · Bimbel YS</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOpenModal(false)}
                      className="icon-btn !w-9 !h-9 shrink-0"
                      aria-label="Tutup preview"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="py-4 sm:py-5 space-y-4">
                    <div>
                      <h3 className="text-lg sm:text-2xl font-black text-[#111827] leading-snug">
                        Bagaimana Bimbel YS Membantu Siswa Melompat Lebih Jauh?
                      </h3>
                      <p className="text-xs sm:text-sm text-[#4B5563] mt-1">
                        Tiga tahapan pendampingan terstruktur untuk jenjang SD, SMP, SMA, dan Olimpiade:
                      </p>
                    </div>

                    <div className="grid gap-3">
                      {methodHighlights.map((item) => {
                        const Icon = item.icon;
                        return (
                          <div
                            key={item.step}
                            className="p-3.5 sm:p-4 rounded-2xl bg-white/95 border border-slate-200/90 shadow-sm flex items-start gap-3"
                          >
                            <div
                              className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl grid place-items-center shrink-0"
                              style={{
                                background: `${item.color}18`,
                                color: item.color,
                              }}
                            >
                              <Icon size={20} aria-hidden="true" />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span
                                  className="text-[10px] sm:text-[11px] font-black px-2 py-0.5 rounded-full"
                                  style={{
                                    background: `${item.color}18`,
                                    color: item.color,
                                  }}
                                >
                                  TAHAP {item.step}
                                </span>
                                <strong className="text-xs sm:text-sm font-extrabold text-[#111827]">
                                  {item.title}
                                </strong>
                              </div>
                              <p className="text-xs text-[#4B5563] mt-1 leading-relaxed">
                                {item.desc}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-3.5 border-t border-slate-200/80 flex items-center justify-between gap-3 flex-wrap">
                    <span className="text-xs font-semibold text-[#4B5563]">
                      Ingin berkonsultasi langsung mengenai jadwal &amp; cabang?
                    </span>
                    <div className="flex items-center gap-2.5 w-full sm:w-auto">
                      <Link
                        href="/contact"
                        className="btn-hero-blue !py-2.5 !px-5 !text-xs w-full sm:w-auto justify-center"
                        onClick={() => setOpenModal(false)}
                      >
                        <span>Konsultasi &amp; Daftar</span>
                        <ArrowRight size={14} aria-hidden="true" className="ml-1.5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}

