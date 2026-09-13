// app/admin/%28protected%29/dashboard/page.tsx --- IGNORE ---

import Link from "next/link";

const sections = [
  {
    href: "/admin/programs",
    title: "Programs",
    description:
      "Kelola program dan paket bimbingan belajar.",
  },
  {
    href: "/admin/tutors",
    title: "Tutors",
    description:
      "Kelola profil tutor, pendidikan, dan pengalaman.",
  },
  {
    href: "/admin/achievements",
    title: "Achievements",
    description:
      "Kelola pencapaian siswa Bimbel YS.",
  },
  {
    href: "/admin/company",
    title: "Company",
    description:
      "Kelola informasi perusahaan dan branding.",
  },
  {
    href: "/admin/contact",
    title: "Contact",
    description:
      "Kelola kontak dan lokasi Bimbel YS.",
  },
];

export default function DashboardPage() {
  return (
    <section>
      <div>
        <p className="text-sm text-zinc-500">
          Bimbel YS
        </p>

        <h1 className="mt-1 text-3xl font-bold">
          Dashboard
        </h1>

        <p className="mt-2 text-zinc-600">
          Kelola konten website Bimbel YS dari satu tempat.
        </p>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <h2 className="text-lg font-semibold">
              {section.title}
            </h2>

            <p className="mt-2 text-sm leading-6 text-zinc-600">
              {section.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}