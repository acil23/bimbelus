import { apiClient } from "@/lib/api/client";
import type {
  Achievement,
  AchievementDetail,
  AchievementMutationResult,
  CreateAchievementInput,
  UpdateAchievementInput,
} from "@/lib/api/types";

export async function getAchievements(): Promise<Achievement[]> {
  return apiClient<Achievement[]>("/api/achievements");
}

export async function getAchievementById(
  id: string,
): Promise<AchievementDetail> {
  return apiClient<AchievementDetail>(
    `/api/achievements/${encodeURIComponent(id)}`,
  );
}

export async function createAchievement(
  data: CreateAchievementInput,
): Promise<AchievementMutationResult> {
  return apiClient<AchievementMutationResult>(
    "/api/achievements",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  );
}

export async function updateAchievement(
  id: string,
  data: UpdateAchievementInput,
): Promise<AchievementMutationResult> {
  return apiClient<AchievementMutationResult>(
    `/api/achievements/${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
    },
  );
}

export async function deleteAchievement(
  id: string,
): Promise<AchievementMutationResult> {
  return apiClient<AchievementMutationResult>(
    `/api/achievements/${encodeURIComponent(id)}`,
    {
      method: "DELETE",
    },
  );
}