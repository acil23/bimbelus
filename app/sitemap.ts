import type { MetadataRoute } from "next";

import { getAchievements } from "@/lib/api/achievements";
import { getPrograms } from "@/lib/api/programs";
import { getTutors } from "@/lib/api/tutors";

const SITE_URL = "https://bimbelys.me";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [programs, tutors, achievements] = await Promise.all([
    getPrograms(),
    getTutors(),
    getAchievements(),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
    },
    {
      url: `${SITE_URL}/program`,
    },
    {
      url: `${SITE_URL}/tutor`,
    },
    {
      url: `${SITE_URL}/prestasi`,
    },
    {
      url: `${SITE_URL}/tentang-kami`,
    },
    {
      url: `${SITE_URL}/contact`,
    },
  ];

  const programPages: MetadataRoute.Sitemap =
    programs.map((program) => ({
      url: `${SITE_URL}/program/${program.slug}`,
      lastModified: new Date(program.updated_at),
    }));

  const tutorPages: MetadataRoute.Sitemap =
    tutors.map((tutor) => ({
      url: `${SITE_URL}/tutor/${tutor.slug}`,
      lastModified: new Date(tutor.updated_at),
    }));

  const achievementPages: MetadataRoute.Sitemap =
    achievements.map((achievement) => ({
      url: `${SITE_URL}/prestasi/${achievement.id}`,
    }));

  return [
    ...staticPages,
    ...programPages,
    ...tutorPages,
    ...achievementPages,
  ];
}