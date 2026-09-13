import { getAchievements } from "@/lib/api/achievements";
import AchievementsAdmin from "./achievements-admin";

export default async function AchievementsPage() {
  const achievements = await getAchievements();

  return (
    <main>
      <h1>Achievements</h1>

      <p>
        Kelola data prestasi dan pencapaian siswa.
      </p>

      <AchievementsAdmin
        initialAchievements={achievements}
      />
    </main>
  );
}