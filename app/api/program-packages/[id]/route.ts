import { handleApiError } from "@/lib/api/handle-api-error";
import { successResponse } from "@/lib/api/response";
import {
  deactivatePackage,
  updatePackage,
} from "@/modules/programs/package.service";
import {
  packageIdSchema,
  updatePackageSchema,
} from "@/modules/programs/package.validation";
import { ApiError } from "@/lib/errors/api-error";
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

    packageIdSchema.parse(id);

    const body: unknown = await request.json();

    const validatedData = updatePackageSchema.parse(body);

    if (Object.keys(validatedData).length === 0) {
      throw new ApiError(
        "VALIDATION_ERROR",
        "At least one field must be provided",
        400,
      );
    }

    const packageData = await updatePackage(id, validatedData);

    return successResponse(
      packageData,
      200,
      "Program package updated successfully",
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

    packageIdSchema.parse(id);

    const packageData = await deactivatePackage(id);

    return successResponse(
      packageData,
      200,
      "Program package deactivated successfully",
    );
  } catch (error) {
    return handleApiError(error);
  }
}
