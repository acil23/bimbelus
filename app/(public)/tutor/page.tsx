import { getTutors } from "@/lib/api/tutors";
import { PageIntro } from "@/components/ui/page-intro";
import { Catalog } from "@/components/site/catalog";
import { CtaBand } from "@/components/site/cta-band";

export const metadata = { title: "Tim Tutor" };

export default async function TutorsPage() {
  const tutors = await getTutors();

  return (
    <>
      <PageIntro
        eyebrow="Tutor"
        title="Belajar dimulai dari koneksi yang baik."
        description="Kenali spesialisasi, latar belakang, dan pengalaman tim pengajar Bimbel YS."
      />

      <section className="section container">
        <Catalog kind="tutors" items={tutors} />
      </section>

      <CtaBand />
    </>
  );
}
