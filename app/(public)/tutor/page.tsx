import { getTutors } from "@/lib/api/tutors";
import { PageIntro } from "@/components/ui/page-intro";
import { Catalog } from "@/components/site/catalog";
import { CtaBand } from "@/components/site/cta-band";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tutor Bimbel YS di Dharmasraya",
  description:
    "Kenali tutor Bimbel YS dan pengalaman mereka dalam mendampingi siswa dalam proses belajar dan persiapan pendidikan.",
  alternates: {
    canonical: "/tutor",
  },
  openGraph: {
    title: "Tutor Bimbel YS di Dharmasraya",
    description:
      "Kenali tutor Bimbel YS dan pengalaman mereka dalam mendampingi siswa dalam proses belajar dan persiapan pendidikan.",
    url: "/tutor",
    type: "website",
    locale: "id_ID",
    siteName: "Bimbel YS",
  },
};

export default async function TutorsPage() {
  const tutors = await getTutors();

  return (
    <>
      <PageIntro
        eyebrow="Tutor"
        title="Belajar dimulai dari koneksi yang baik."
        description="Kenali spesialisasi, latar belakang, dan pengalaman tim pengajar Bimbel YS."
        breadcrumbs={[
          {
            label: "Beranda",
            href: "/",
          },
          {
            label: "Tutor",
          },
        ]}
      />

      <section className="section container">
        <Catalog kind="tutors" items={tutors} />
      </section>

      <CtaBand />
    </>
  );
}
