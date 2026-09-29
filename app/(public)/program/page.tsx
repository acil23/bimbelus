import { getPrograms } from "@/lib/api/programs";
import { PageIntro } from "@/components/ui/page-intro";
import { Catalog } from "@/components/site/catalog";
import { CtaBand } from "@/components/site/cta-band";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Program Bimbingan Belajar di Dharmasraya",
  description:
    "Lihat program bimbingan belajar Bimbel YS untuk SD, SMP, SMA, olimpiade, dan program persiapan pendidikan di Dharmasraya.",
  alternates: {
    canonical: "/program",
  },
  openGraph: {
    title: "Program Bimbingan Belajar di Dharmasraya",
    description:
      "Lihat program bimbingan belajar Bimbel YS untuk SD, SMP, SMA, olimpiade, dan program persiapan pendidikan di Dharmasraya.",
    url: "/program",
    type: "website",
    locale: "id_ID",
    siteName: "Bimbel YS",
  },
};
export default async function ProgramsPage() {
  const programs = await getPrograms();
  return <>
    <PageIntro
      eyebrow="Program"
      title="Satu tujuan. Banyak cara untuk bertumbuh."
      description="Jelajahi kategori program dan pilih paket belajar yang sesuai kebutuhanmu."
      breadcrumbs={[
        {
          label: "Beranda",
          href: "/",
        },
        {
          label: "Program",
        },
      ]}
    />
    <section className="section container">
      <Catalog kind="programs" items={programs} /></section>
    <CtaBand title="Masih mencari program yang tepat?" /></>;
}
