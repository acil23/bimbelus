import { handleApiError } from "@/lib/api/handle-api-error";
import { successResponse } from "@/lib/api/response";
import { ApiError } from "@/lib/errors/api-error";
import {
  deleteExperience,
  updateExperience,
} from "@/modules/tutors/experience.service";
import {
  experienceIdSchema,
  updateExperienceSchema,
} from "@/modules/tutors/experience.validation";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(
  request: Request,
  { params }: RouteContext,
) {
  try {
    const { id } = await params;

    experienceIdSchema.parse(id);

    const body: unknown = await request.json();

    const validatedData = updateExperienceSchema.parse(body);

    if (Object.keys(validatedData).length === 0) {
      throw new ApiError(
        "VALIDATION_ERROR",
        "At least one field must be provided",
        400,
      );
    }

    const experience = await updateExperience(id, validatedData);

    return successResponse(
      experience,
      200,
      "Tutor experience updated successfully",
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
    const { id } = await params;

    experienceIdSchema.parse(id);

    await deleteExperience(id);

    return successResponse(
      null,
      200,
      "Tutor experience deleted successfully",
    );
  } catch (error) {
    return handleApiError(error);
  }
}
