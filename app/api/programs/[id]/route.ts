import { handleApiError } from "@/lib/api/handle-api-error";
import { successResponse } from "@/lib/api/response";
import { ApiError } from "@/lib/errors/api-error";
import {
  deactivateProgram,
  updateProgram,
} from "@/modules/programs/program.service";
import {
  programIdSchema,
  updateProgramSchema,
} from "@/modules/programs/program.validation";
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

    programIdSchema.parse(id);

    const body: unknown = await request.json();
    const validatedData = updateProgramSchema.parse(body);

    if (Object.keys(validatedData).length === 0) {
      throw new ApiError(
        "VALIDATION_ERROR",
        "At least one field must be provided",
        400,
      );
    }

    const program = await updateProgram(id, validatedData);

    return successResponse(
      program,
      200,
      "Program updated successfully",
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

    programIdSchema.parse(id);

    const program = await deactivateProgram(id);

    return successResponse(
      program,
      200,
      "Program deactivated successfully",
    );
  } catch (error) {
    return handleApiError(error);
  }
}
