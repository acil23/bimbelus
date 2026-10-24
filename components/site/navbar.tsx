"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X, BookOpen } from "lucide-react";
import { Media } from "@/components/ui/media";
import { ScrollProgress } from "@/components/animations/scroll-progress";

const links = [
  ["/", "Beranda"],
  ["/tutor", "Tutor"],
  ["/program", "Program"],
  ["/prestasi", "Prestasi"],
  ["/tentang-kami", "Tentang Kami"],
  ["/contact", "Kontak"],
] as const;

export function Navbar() {
  const path = usePathname();
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const shouldReduce = useReducedMotion();

  const open = openedAt === path;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = links.map(([href, label]) => {
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
      className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpenedAt(null);
          toggle.current?.focus();
        }
      }}
    >
      <ScrollProgress />

      <div className="container">
        <div className="header-dock">
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
              className="icon-btn mobile-toggle"
              type="button"
              aria-label={open ? "Tutup navigasi" : "Buka navigasi"}
              aria-expanded={open}
              aria-controls="public-navigation"
              onClick={() => setOpenedAt(open ? null : path)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          <AnimatePresence>
            {open && (
              <motion.nav
                id="public-navigation"
                className="mobile-nav mobile-nav--animated"
                aria-label="Navigasi mobile"
                initial={shouldReduce ? undefined : { opacity: 0, height: 0 }}
                animate={shouldReduce ? undefined : { opacity: 1, height: "auto" }}
                exit={shouldReduce ? undefined : { opacity: 0, height: 0 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="terminal-bar rounded-xl mb-2">
                  <span className="inline-flex items-center gap-1.5 text-[#2E8BC0] font-bold">
                    <BookOpen size={13} aria-hidden="true" />
                    <span>Menu Navigasi Belajar</span>
                  </span>
                  <span>SD · SMP · SMA</span>
                </div>

                {links.map(([href, label], i) => (
                  <motion.div
                    key={href}
                    initial={shouldReduce ? undefined : { opacity: 0, x: -16 }}
                    animate={shouldReduce ? undefined : { opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 + i * 0.04, duration: 0.25 }}
                  >
                    <Link
                      href={href}
                      aria-current={
                        path === href || (href !== "/" && path.startsWith(`${href}/`))
                          ? "page"
                          : undefined
                      }
                      onClick={() => setOpenedAt(null)}
                      className="flex items-center justify-between"
                    >
                      <span>{label}</span>
                      <span className="font-mono-tech text-xs opacity-60" aria-hidden="true">
                        0{i + 1}
                      </span>
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={shouldReduce ? undefined : { opacity: 0, x: -16 }}
                  animate={shouldReduce ? undefined : { opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.25 }}
                  className="pt-2"
                >
                  <Link
                    href="/contact"
                    className="btn btn-cta-glow w-full"
                    onClick={() => setOpenedAt(null)}
                  >
                    <span>Daftar Sekarang</span>
                  </Link>
                </motion.div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
