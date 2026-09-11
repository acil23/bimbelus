import { handleApiError } from "@/lib/api/handle-api-error";
import { successResponse } from "@/lib/api/response";
import { ApiError } from "@/lib/errors/api-error";
import {
  getContact,
  updateContactInformation,
} from "@/modules/contact/contact.service";
import { updateContactInformationSchema } from "@/modules/contact/contact.validation";
import { requireAdmin } from "@/lib/auth/current-user";
import { requireSameOrigin } from "@/lib/security/request-origin";

export async function GET() {
  try {
    const contact = await getContact();

    if (!contact) {
      throw new ApiError(
        "NOT_FOUND",
        "Contact information not found",
        404,
      );
    }

    return successResponse(contact);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(request: Request) {
  try {
    requireSameOrigin(request);
    await requireAdmin();
    const body: unknown = await request.json();

    const validatedData =
      updateContactInformationSchema.parse(body);

    if (Object.keys(validatedData).length === 0) {
      throw new ApiError(
        "VALIDATION_ERROR",
        "At least one field must be provided",
        400,
      );
    }

    const contact =
      await updateContactInformation(validatedData);

    return successResponse(
      contact,
      200,
      "Contact information updated successfully",
    );
  } catch (error) {
    return handleApiError(error);
  }
}
