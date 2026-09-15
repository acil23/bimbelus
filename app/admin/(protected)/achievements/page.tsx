import { getAchievements } from "@/lib/api/achievements";
import AchievementsAdmin from "./achievements-admin";

export const metadata = { title: "Prestasi" };

export default async function AchievementsPage() {
  const achievements = await getAchievements();

  return (
    <>
      <header className="admin-title">
        <span className="eyebrow">Cerita siswa</span>
        <h1>Prestasi siswa</h1>
        <p>Dokumentasikan pencapaian dan pilih prestasi unggulan untuk beranda.</p>
      </header>

      <AchievementsAdmin initialAchievements={achievements} />
    </>
  );
}
