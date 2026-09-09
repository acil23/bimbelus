import { handleApiError } from "@/lib/api/handle-api-error";
import { successResponse } from "@/lib/api/response";
import { ApiError } from "@/lib/errors/api-error";
import {
  deactivateContactLocation,
  updateContactLocation,
} from "@/modules/contact/contact.service";
import {
  contactLocationIdSchema,
  updateContactLocationSchema,
} from "@/modules/contact/contact.validation";
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

    contactLocationIdSchema.parse(id);

    const body: unknown = await request.json();

    const validatedData =
      updateContactLocationSchema.parse(body);

    if (Object.keys(validatedData).length === 0) {
      throw new ApiError(
        "VALIDATION_ERROR",
        "At least one field must be provided",
        400,
      );
    }

    const location =
      await updateContactLocation(id, validatedData);

    return successResponse(
      location,
      200,
      "Contact location updated successfully",
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

    contactLocationIdSchema.parse(id);

    const location =
      await deactivateContactLocation(id);

    return successResponse(
      location,
      200,
      "Contact location deactivated successfully",
    );
  } catch (error) {
    return handleApiError(error);
  }
}
