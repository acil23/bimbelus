import Link from "next/link";
import { BookOpen, Users, Trophy, MapPin, ArrowUpRight, Terminal } from "lucide-react";
import { getPrograms } from "@/lib/api/programs";
import { getTutors } from "@/lib/api/tutors";
import { getAchievements } from "@/lib/api/achievements";
import { getContact } from "@/lib/api/contact";

export const metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const [programs, tutors, achievements, contact] = await Promise.all([
    getPrograms(),
    getTutors(),
    getAchievements(),
    getContact(),
  ]);

  const sections = [
    {
      href: "/admin/programs",
      label: "Program aktif",
      count: programs.length,
      icon: BookOpen,
      code: "MOD_PROG",
    },
    {
      href: "/admin/tutors",
      label: "Tutor aktif",
      count: tutors.length,
      icon: Users,
      code: "MOD_TUTR",
    },
    {
      href: "/admin/achievements",
      label: "Prestasi aktif",
      count: achievements.length,
      icon: Trophy,
      code: "MOD_ACHV",
    },
    {
      href: "/admin/contact",
      label: "Lokasi aktif",
      count: contact.contact_locations.length,
      icon: MapPin,
      code: "MOD_LOCS",
    },
  ];

  const workspaceItems = [
    {
      href: "/admin/programs",
      title: "Program & paket belajar",
      text: "Atur program, harga, durasi, dan urutan tampil.",
      cmd: "ys-admin --open programs",
    },
    {
      href: "/admin/tutors",
      title: "Profil tim tutor",
      text: "Lengkapi foto, biografi, pendidikan, dan pengalaman.",
      cmd: "ys-admin --open tutors",
    },
    {
      href: "/admin/achievements",
      title: "Cerita prestasi siswa",
      text: "Publikasikan pencapaian dan pilih cerita unggulan.",
      cmd: "ys-admin --open achievements",
    },
    {
      href: "/admin/company",
      title: "Identitas lembaga",
      text: "Perbarui logo, visi, misi, dan profil Bimbel YS.",
      cmd: "ys-admin --open company",
    },
  ];

  return (
    <div className="stack">
      <header className="admin-title">
        <span className="eyebrow">Content Studio</span>
        <h1>Selamat datang kembali.</h1>
        <p>Kelola informasi yang membantu siswa mengenal Bimbel YS lebih dekat.</p>
      </header>

      <div className="grid-4">
        {sections.map(({ href, label, count, icon: Icon, code }) => (
          <Link href={href} className="card stat-card card-hover" key={href}>
            <div className="flex items-center justify-between">
              <Icon size={22} aria-hidden="true" />
              <span className="font-mono-tech text-[11px] text-slate-500">[{code}]</span>
            </div>
            <strong className="stat-value">{count}</strong>
            <span className="small muted">{label}</span>
          </Link>
        ))}
      </div>

      <section className="card overflow-hidden">
        <div className="terminal-bar">
          <span className="terminal-dots" aria-hidden="true">
            <span className="terminal-dot terminal-dot--red" />
            <span className="terminal-dot terminal-dot--amber" />
            <span className="terminal-dot terminal-dot--green" />
          </span>
          <span>workspace://modules</span>
        </div>

        <div className="rich-panel">
          <h2>Ruang kerja konten</h2>

          <div className="grid-2">
            {workspaceItems.map((item) => (
              <Link href={item.href} className="card card-body card-hover" key={item.href}>
                <span className="font-mono-tech text-xs text-sky-400 inline-flex items-center gap-1.5">
                  <Terminal size={13} aria-hidden="true" />
                  {item.cmd}
                </span>
                <h3>{item.title}</h3>
                <p className="small">{item.text}</p>
                <span className="text-link">
                  Kelola konten <ArrowUpRight size={16} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <aside className="alert">
        <strong className="text-amber-400 font-mono-tech text-sm block mb-1">
          [INFO] Tidak perlu menghapus konten lama.
        </strong>
        <p className="small muted">
          Gunakan arsip untuk menyembunyikan program, paket, tutor, prestasi, dan lokasi.
          Pendidikan dan pengalaman tutor menggunakan penghapusan permanen dengan konfirmasi.
        </p>
      </aside>
    </div>
  );
}
