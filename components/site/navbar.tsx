"use client";

// components/site/navbar.tsx --- IGNORE ---

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/program", label: "Program" },
  { href: "/tutor", label: "Tutor" },
  { href: "/prestasi", label: "Prestasi" },
  { href: "/tentang-kami", label: "Tentang Kami" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-paper-dim bg-paper/95 backdrop-blur">
      <div className="mx-auto flex h-18 w-full max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="h-1.5 w-1.5 rounded-full bg-lagoon" />
          <span className="font-display text-xl font-semibold text-espresso">
            Bimbel <span className="text-marigold">YS</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-bark md:flex">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 transition-colors hover:text-espresso ${
                  active ? "text-espresso" : ""
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute -bottom-[13px] left-0 right-0 h-[2px] rounded-full bg-marigold" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/contact"
            className="rounded-full bg-espresso px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-lagoon-dark"
          >
            Daftar Sekarang
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-espresso md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Buka menu navigasi"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu — animation responds to the user's tap, not on load */}
      <div
        className={`grid overflow-hidden border-t border-paper-dim bg-paper transition-[grid-template-rows] duration-300 ease-out md:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0">
          <nav className="flex flex-col gap-1 px-6 py-4 text-base font-medium text-bark">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-2 py-2.5 hover:bg-mist hover:text-espresso"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-2 rounded-full bg-espresso px-5 py-2.5 text-center text-sm font-semibold text-paper"
              onClick={() => setOpen(false)}
            >
              Daftar Sekarang
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
