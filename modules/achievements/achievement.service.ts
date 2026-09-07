import { ApiError } from "@/lib/errors/api-error";

import {
  createAchievement as createAchievementRepository,
  deactivateAchievement as deactivateAchievementRepository,
  findActiveAchievements,
  findAchievementById,
  updateAchievement as updateAchievementRepository,
} from "./achievement.repository";

export async function getActiveAchievements() {
  return findActiveAchievements();
}

export async function getAchievementById(id: string) {
  return findAchievementById(id);
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
  return createAchievementRepository(data);
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
  const existingAchievement = await findAchievementById(id);

  if (!existingAchievement) {
    throw new ApiError(
      "NOT_FOUND",
      "Achievement not found",
      404,
    );
  }

  return updateAchievementRepository(id, data);
}

export async function deactivateAchievement(id: string) {
  const existingAchievement = await findAchievementById(id);

  if (!existingAchievement) {
    throw new ApiError(
      "NOT_FOUND",
      "Achievement not found",
      404,
    );
  }

  return deactivateAchievementRepository(id);
}
