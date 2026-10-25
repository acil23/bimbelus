"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Menu,
  X,
  BookOpen,
  Home,
  Users,
  Trophy,
  Compass,
  PhoneCall,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Media } from "@/components/ui/media";
import { ScrollProgress } from "@/components/animations/scroll-progress";

const links = [
  { href: "/", label: "Beranda", desc: "Halaman utama & ringkasan", icon: Home },
  { href: "/tutor", label: "Tutor", desc: "Profil & spesialisasi pengajar", icon: Users },
  { href: "/program", label: "Program", desc: "Paket belajar SD, SMP & SMA", icon: BookOpen },
  { href: "/prestasi", label: "Prestasi", desc: "Jejak juara & alumni siswa", icon: Trophy },
  { href: "/tentang-kami", label: "Tentang Kami", desc: "Visi, misi & identitas lembaga", icon: Compass },
  { href: "/contact", label: "Kontak", desc: "Konsultasi & lokasi cabang", icon: PhoneCall },
] as const;

export function Navbar() {
  const path = usePathname();
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const shouldReduce = useReducedMotion();

  const open = openedAt === path;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 18);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = links.map(({ href, label }) => {
    const isActive =
      path === href || (href !== "/" && path.startsWith(`${href}/`));

    return (
      <Link
        key={href}
        href={href}
        aria-current={isActive ? "page" : undefined}
        onClick={() => setOpenedAt(null)}
        className="relative"
      >
        {label}
      </Link>
    );
  });

  return (
    <header
      className={`site-header ${scrolled ? "site-header--scrolled" : ""} ${open ? "site-header--open" : ""}`}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpenedAt(null);
          toggle.current?.focus();
        }
      }}
    >
      <ScrollProgress />

      {/* Backdrop overlay when mobile menu is open */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-nav-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpenedAt(null)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <div className="container relative z-50">
        <div className={`header-dock ${open ? "header-dock--open" : ""}`}>
          <div className="header-row">
            <Link href="/" className="brand group" onClick={() => setOpenedAt(null)}>
              <Media src="/logo.png" alt="Logo Bimbel YS" className="media-logo" eager />
              <span className="brand-wordmark">
                <span className="brand-bimbel">BIMBEL</span>{" "}
                <span className="brand-ys">YS</span>
              </span>
            </Link>

            <nav className="desktop-nav" aria-label="Navigasi utama">
              {navItems}
            </nav>

            <div className="header-cta flex items-center gap-3">
              <motion.div
                whileHover={shouldReduce ? undefined : { scale: 1.03 }}
                whileTap={shouldReduce ? undefined : { scale: 0.97 }}
              >
                <Link className="btn-nav-register" href="/contact">
                  Daftar Sekarang
                </Link>
              </motion.div>
            </div>

            <button
              ref={toggle}
              className={`mobile-toggle ${open ? "mobile-toggle--active" : ""}`}
              type="button"
              aria-label={open ? "Tutup navigasi" : "Buka navigasi"}
              aria-expanded={open}
              aria-controls="public-navigation"
              onClick={() => setOpenedAt(open ? null : path)}
            >
              {open ? <X size={20} strokeWidth={2.5} /> : <Menu size={20} strokeWidth={2.5} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              id="public-navigation"
              className="mobile-nav-sheet"
              aria-label="Navigasi mobile"
              initial={shouldReduce ? undefined : { opacity: 0, y: -12, scale: 0.97 }}
              animate={shouldReduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
              exit={shouldReduce ? undefined : { opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mobile-nav-header">
                <span className="inline-flex items-center gap-1.5 text-[#2E8BC0] font-extrabold text-xs">
                  <Sparkles size={14} className="text-[#F4A261]" aria-hidden="true" />
                  <span>Menu Navigasi Belajar</span>
                </span>
                <span className="mobile-nav-tag">SD · SMP · SMA</span>
              </div>

              <div className="mobile-nav-list">
                {links.map(({ href, label, desc, icon: Icon }, i) => {
                  const isActive =
                    path === href || (href !== "/" && path.startsWith(`${href}/`));

                  return (
                    <motion.div
                      key={href}
                      initial={shouldReduce ? undefined : { opacity: 0, y: 8 }}
                      animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
                      transition={{ delay: 0.03 + i * 0.035, duration: 0.22 }}
                    >
                      <Link
                        href={href}
                        aria-current={isActive ? "page" : undefined}
                        onClick={() => setOpenedAt(null)}
                        className={`mobile-nav-item ${isActive ? "mobile-nav-item--active" : ""}`}
                      >
                        <span className="mobile-nav-item-icon" aria-hidden="true">
                          <Icon size={18} />
                        </span>
                        <span className="mobile-nav-item-text">
                          <span className="mobile-nav-item-label">{label}</span>
                          <span className="mobile-nav-item-desc">{desc}</span>
                        </span>
                        <span className="mobile-nav-item-num" aria-hidden="true">
                          0{i + 1}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mobile-nav-footer">
                <Link
                  href="/contact"
                  className="btn-hero-blue w-full justify-center"
                  onClick={() => setOpenedAt(null)}
                >
                  <span>Daftar Sekarang</span>
                  <ArrowRight size={16} aria-hidden="true" className="ml-2" />
                </Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
