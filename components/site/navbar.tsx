"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Media } from "@/components/ui/media";

const links = [
  ["/", "Beranda"],
  ["/program", "Program"],
  ["/tutor", "Tutor"],
  ["/prestasi", "Prestasi"],
  ["/tentang-kami", "Tentang Kami"],
  ["/contact", "Kontak"],
] as const;

export function Navbar() {
  const path = usePathname();
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  const open = openedAt === path;

  const items = links.map(([href, label]) => (
    <Link
      key={href}
      href={href}
      aria-current={
        path === href || (href !== "/" && path.startsWith(`${href}/`)) ? "page" : undefined
      }
      onClick={() => setOpenedAt(null)}
    >
      {label}
    </Link>
  ));

  return (
    <header
      className="site-header"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpenedAt(null);
          toggle.current?.focus();
        }
      }}
    >
      <div className="container header-row">
        <Link href="/" className="brand" onClick={() => setOpenedAt(null)}>
          <Media src="/logo.png" alt="Logo Bimbel YS" className="media-logo" eager />
          <span>
            Bimbel YS
            <small>LEARN · GROW · ACHIEVE</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Navigasi utama">
          {items}
        </nav>

        <Link className="btn btn-gold header-cta" href="/contact">
          Daftar Sekarang
        </Link>

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

      <nav
        id="public-navigation"
        className="container mobile-nav"
        aria-label="Navigasi mobile"
        hidden={!open}
      >
        {items}
        <Link href="/contact" className="btn btn-gold" onClick={() => setOpenedAt(null)}>
          Daftar Sekarang
        </Link>
      </nav>
    </header>
  );
}
