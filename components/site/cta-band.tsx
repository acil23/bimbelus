"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export function CtaBand({
  title = "Langkah besar dimulai dari belajar hari ini.",
  description = "Ceritakan kebutuhan belajarmu. Tim kami membantu memilih program yang sesuai.",
}: {
  title?: string;
  description?: string;
}) {
  const shouldReduce = useReducedMotion();

  return (
    <section className="section container">
      <div className="cta">
        <div>
          <span className="eyebrow cta-eyebrow">Bersama Bimbel YS</span>
          <h2 className="text-white">{title}</h2>
          <p className="text-blue-100/90">{description}</p>
        </div>

        <div className="actions">
          <motion.div
            whileHover={shouldReduce ? undefined : { scale: 1.03 }}
            whileTap={shouldReduce ? undefined : { scale: 0.97 }}
          >
            <Link href="/contact" className="btn btn-gold">
              <Sparkles size={16} aria-hidden="true" />
              <span>Hubungi Kami</span>
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </motion.div>
          <motion.div
            whileHover={shouldReduce ? undefined : { scale: 1.03 }}
            whileTap={shouldReduce ? undefined : { scale: 0.97 }}
          >
            <Link href="/program" className="btn btn-light">
              Jelajahi Program
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
