import { handleApiError } from "@/lib/api/handle-api-error";
import { successResponse } from "@/lib/api/response";
import {
  createAchievement,
  getActiveAchievements,
} from "@/modules/achievements/achievement.service";
import { createAchievementSchema } from "@/modules/achievements/achievement.validation";
import { requireAdmin } from "@/lib/auth/current-user";
import { requireSameOrigin } from "@/lib/security/request-origin";

export async function GET() {
  try {
    const achievements = await getActiveAchievements();

    return successResponse(achievements);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    requireSameOrigin(request);
    await requireAdmin();
    const body: unknown = await request.json();

    const validatedData = createAchievementSchema.parse(body);

    const achievement = await createAchievement(validatedData);

    return successResponse(
      achievement,
      201,
      "Achievement created successfully",
    );
  } catch (error) {
    return handleApiError(error);
  }
}
