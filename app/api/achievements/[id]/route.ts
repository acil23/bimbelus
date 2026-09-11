import { handleApiError } from "@/lib/api/handle-api-error";
import { successResponse } from "@/lib/api/response";
import { ApiError } from "@/lib/errors/api-error";
import {
  deactivateAchievement,
  getAchievementById,
  updateAchievement,
} from "@/modules/achievements/achievement.service";
import {
  achievementIdSchema,
  updateAchievementSchema,
} from "@/modules/achievements/achievement.validation";
import { requireAdmin } from "@/lib/auth/current-user";
import { requireSameOrigin } from "@/lib/security/request-origin";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  _request: Request,
  { params }: RouteContext,
) {
  try {
    const { id } = await params;

    achievementIdSchema.parse(id);

    const achievement = await getAchievementById(id);

    if (!achievement || !achievement.is_active) {
      throw new ApiError(
        "NOT_FOUND",
        "Achievement not found",
        404,
      );
    }

    return successResponse(achievement);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(
  request: Request,
  { params }: RouteContext,
) {
  try {
    requireSameOrigin(request);
    await requireAdmin();
    const { id } = await params;

    achievementIdSchema.parse(id);

    const body: unknown = await request.json();

    const validatedData = updateAchievementSchema.parse(body);

    if (Object.keys(validatedData).length === 0) {
      throw new ApiError(
        "VALIDATION_ERROR",
        "At least one field must be provided",
        400,
      );
    }

    const achievement = await updateAchievement(
      id,
      validatedData,
    );

    return successResponse(
      achievement,
      200,
      "Achievement updated successfully",
    );
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  _request: Request,
  { params }: RouteContext,
) {
  try {
    requireSameOrigin(_request);
    await requireAdmin();
    const { id } = await params;

    achievementIdSchema.parse(id);

    const achievement = await deactivateAchievement(id);

    return successResponse(
      achievement,
      200,
      "Achievement deactivated successfully",
    );
  } catch (error) {
    return handleApiError(error);
  }
}
