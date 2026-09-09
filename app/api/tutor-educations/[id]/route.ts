import { handleApiError } from "@/lib/api/handle-api-error";
import { successResponse } from "@/lib/api/response";
import { ApiError } from "@/lib/errors/api-error";
import {
  deleteEducation,
  updateEducation,
} from "@/modules/tutors/education.service";
import {
  educationIdSchema,
  updateEducationSchema,
} from "@/modules/tutors/education.validation";
import { requireAdmin } from "@/lib/auth/current-user";

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
    await requireAdmin();
    const { id } = await params;

    educationIdSchema.parse(id);

    const body: unknown = await request.json();

    const validatedData = updateEducationSchema.parse(body);

    if (Object.keys(validatedData).length === 0) {
      throw new ApiError(
        "VALIDATION_ERROR",
        "At least one field must be provided",
        400,
      );
    }

    const education = await updateEducation(id, validatedData);

    return successResponse(
      education,
      200,
      "Tutor education updated successfully",
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
    await requireAdmin();
    const { id } = await params;

    educationIdSchema.parse(id);

    await deleteEducation(id);

    return successResponse(
      null,
      200,
      "Tutor education deleted successfully",
    );
  } catch (error) {
    return handleApiError(error);
  }
}
