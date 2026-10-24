"use client";

import { useState } from "react";
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
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 18 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Preview Metode Belajar Bimbel YS"
            >
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
                <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#2E8BC0]">
                  <Sparkles size={15} className="text-[#F4A261]" aria-hidden="true" />
                  <span>Interactive Method Preview · Bimbel YS</span>
                </div>
                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="icon-btn !w-9 !h-9"
                  aria-label="Tutup preview"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="py-5 space-y-5">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#111827]">
                    Bagaimana Bimbel YS Membantu Siswa Melompat Lebih Jauh?
                  </h3>
                  <p className="text-sm text-[#4B5563] mt-1">
                    Tiga tahapan pendampingan terstruktur untuk jenjang SD, SMP, SMA, dan Olimpiade:
                  </p>
                </div>

                <div className="grid gap-3.5">
                  {methodHighlights.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.step}
                        className="p-4 rounded-2xl bg-white/90 border border-slate-200/90 shadow-sm flex items-start gap-3.5"
                      >
                        <div
                          className="w-11 h-11 rounded-2xl grid place-items-center shrink-0"
                          style={{
                            background: `${item.color}18`,
                            color: item.color,
                          }}
                        >
                          <Icon size={22} aria-hidden="true" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              className="text-[11px] font-black px-2 py-0.5 rounded-full"
                              style={{
                                background: `${item.color}18`,
                                color: item.color,
                              }}
                            >
                              TAHAP {item.step}
                            </span>
                            <strong className="text-sm font-extrabold text-[#111827]">
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

              <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between gap-3 flex-wrap">
                <span className="text-xs font-semibold text-[#4B5563]">
                  Ingin berkonsultasi langsung mengenai jadwal &amp; cabang?
                </span>
                <div className="flex items-center gap-2.5">
                  <Link
                    href="/contact"
                    className="btn-hero-blue !py-2.5 !px-5 !text-xs"
                    onClick={() => setOpenModal(false)}
                  >
                    Konsultasi &amp; Daftar
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

