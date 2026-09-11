import { handleApiError } from "@/lib/api/handle-api-error";
import { successResponse } from "@/lib/api/response";
import { ApiError } from "@/lib/errors/api-error";
import {
  deactivateTutor,
  updateTutor,
} from "@/modules/tutors/tutor.service";
import {
  tutorIdSchema,
  updateTutorSchema,
} from "@/modules/tutors/tutor.validation";
import { requireAdmin } from "@/lib/auth/current-user";
import { requireSameOrigin } from "@/lib/security/request-origin";

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
    requireSameOrigin(request);
    await requireAdmin();
    const { id } = await params;

    tutorIdSchema.parse(id);

    const body: unknown = await request.json();

    const validatedData = updateTutorSchema.parse(body);

    if (Object.keys(validatedData).length === 0) {
      throw new ApiError(
        "VALIDATION_ERROR",
        "At least one field must be provided",
        400,
      );
    }

    const tutor = await updateTutor(id, validatedData);

    return successResponse(
      tutor,
      200,
      "Tutor updated successfully",
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

    tutorIdSchema.parse(id);

    const tutor = await deactivateTutor(id);

    return successResponse(
      tutor,
      200,
      "Tutor deactivated successfully",
    );
  } catch (error) {
    return handleApiError(error);
  }
}
