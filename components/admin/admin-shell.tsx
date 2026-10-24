"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Trophy,
  Building2,
  MapPin,
  ExternalLink,
  Terminal,
} from "lucide-react";
import { Media } from "@/components/ui/media";
import { PageTransition } from "@/components/animations/page-transition";

const navigation = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/programs", label: "Program", icon: BookOpen },
  { href: "/admin/tutors", label: "Tutor", icon: Users },
  { href: "/admin/achievements", label: "Prestasi", icon: Trophy },
  { href: "/admin/company", label: "Profil lembaga", icon: Building2 },
  { href: "/admin/contact", label: "Kontak & lokasi", icon: MapPin },
];

export function AdminShell({
  children,
  user,
  logout,
}: {
  children: ReactNode;
  user: ReactNode;
  logout: ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="admin-shell">
      <a href="#admin-content" className="skip-link">
        Langsung ke konten admin
      </a>

      <aside className="admin-sidebar">
        <Link href="/admin/dashboard" className="brand">
          <Media src="/logo.png" alt="Logo Bimbel YS" className="media-logo" />
          <span>
            Bimbel YS
            <small>CONTENT STUDIO</small>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900/80 border border-slate-800/80 font-mono-tech text-xs text-slate-400">
          <Terminal size={13} className="text-amber-400 shrink-0" aria-hidden="true" />
          <span className="truncate">ys-studio://{pathname.replace(/^\/admin\/?/, "") || "root"}</span>
        </div>

        <nav className="admin-nav" aria-label="Navigasi admin">
          {navigation.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
            >
              <Icon size={19} aria-hidden="true" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        <p className="admin-sidebar-note">
          <span className="text-emerald-400 block mb-1">● SESSION ACTIVE</span>
          Kelola cerita, program, dan informasi yang tampil di website Bimbel YS.
        </p>
      </aside>

      <div>
        <header className="admin-header">
          <div>{user}</div>

          <div className="actions">
            <Link
              href="/"
              className="btn btn-outline btn-small"
              target="_blank"
              rel="noopener noreferrer"
            >
              Lihat website <ExternalLink size={15} aria-hidden="true" />
            </Link>
            {logout}
          </div>
        </header>

        <main id="admin-content" className="admin-content" tabIndex={-1}>
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
    </div>
  );
}
