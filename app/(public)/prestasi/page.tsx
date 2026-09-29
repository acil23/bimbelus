import { getAchievements } from "@/lib/api/achievements";
import { PageIntro } from "@/components/ui/page-intro";
import { Catalog } from "@/components/site/catalog";
import { CtaBand } from "@/components/site/cta-band";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prestasi Siswa Bimbel YS",
  description:
    "Lihat perjalanan prestasi dan pencapaian siswa Bimbel YS dalam pendidikan, seleksi masuk sekolah, dan kompetisi.",
  alternates: {
    canonical: "/prestasi",
  },
  openGraph: {
    title: "Prestasi Siswa Bimbel YS",
    description:
      "Lihat perjalanan prestasi dan pencapaian siswa Bimbel YS dalam pendidikan, seleksi masuk sekolah, dan kompetisi.",
    url: "/prestasi",
    type: "website",
    locale: "id_ID",
    siteName: "Bimbel YS",
  },
};

export default async function AchievementsPage() {
  const achievements = await getAchievements();

  return (
    <>
      <PageIntro
        eyebrow="Prestasi"
        title="Perjalanan yang layak dirayakan."
        description="Cerita siswa, pencapaian akademik, dan langkah menuju tujuan pendidikan."
        breadcrumbs={[
          {
            label: "Beranda",
            href: "/",
          },
          {
            label: "Prestasi",
          },
        ]}
      />

      <section className="section container">
        <Catalog kind="achievements" items={achievements} />
      </section>

      <CtaBand />
    </>
  );
}
