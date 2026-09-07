import { prisma } from "@/lib/db/prisma";

export async function findActiveAchievements() {
  return prisma.achievements.findMany({
    where: {
      is_active: true,
    },
    select: {
      id: true,
      student_name: true,
      title: true,
      student_school: true,
      destination: true,
      subject: true,
      achievement_type: true,
      year: true,
      image_url: true,
      is_featured: true,
      display_order: true,
    },
    orderBy: [
      {
        display_order: "asc",
      },
      {
        year: "desc",
      },
    ],
  });
}

export async function findAchievementById(id: string) {
  return prisma.achievements.findUnique({
    where: {
      id,
    },
  });
}

export async function createAchievement(data: {
  student_name: string;
  title: string;
  description?: string | null;
  student_school?: string | null;
  destination?: string | null;
  subject?: string | null;
  competition_name?: string | null;
  competition_level?: string | null;
  achievement_type:
    | "COMPETITION"
    | "ADMISSION"
    | "ACADEMIC"
    | "OTHER";
  year?: number | null;
  image_url?: string | null;
  is_featured?: boolean;
  is_active?: boolean;
  display_order?: number;
}) {
  return prisma.achievements.create({
    data,
  });
}

export async function updateAchievement(
  id: string,
  data: {
    student_name?: string;
    title?: string;
    description?: string | null;
    student_school?: string | null;
    destination?: string | null;
    subject?: string | null;
    competition_name?: string | null;
    competition_level?: string | null;
    achievement_type?:
      | "COMPETITION"
      | "ADMISSION"
      | "ACADEMIC"
      | "OTHER";
    year?: number | null;
    image_url?: string | null;
    is_featured?: boolean;
    is_active?: boolean;
    display_order?: number;
  },
) {
  return prisma.achievements.update({
    where: {
      id,
    },
    data,
  });
}

export async function deactivateAchievement(id: string) {
  return prisma.achievements.update({
    where: {
      id,
    },
    data: {
      is_active: false,
    },
  });
}
