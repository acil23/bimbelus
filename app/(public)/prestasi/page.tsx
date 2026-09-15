import { getAchievements } from "@/lib/api/achievements";
import { PageIntro } from "@/components/ui/page-intro";
import { Catalog } from "@/components/site/catalog";
import { CtaBand } from "@/components/site/cta-band";

export const metadata = { title: "Prestasi Siswa" };

export default async function AchievementsPage() {
  const achievements = await getAchievements();

  return (
    <>
      <PageIntro
        eyebrow="Prestasi"
        title="Perjalanan yang layak dirayakan."
        description="Cerita siswa, pencapaian akademik, dan langkah menuju tujuan pendidikan."
      />

      <section className="section container">
        <Catalog kind="achievements" items={achievements} />
      </section>

      <CtaBand />
    </>
  );
}
