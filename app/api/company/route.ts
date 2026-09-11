import { handleApiError } from "@/lib/api/handle-api-error";
import { successResponse } from "@/lib/api/response";
import {
  getCompanyProfile,
  updateCompanyProfile,
} from "@/modules/company/company.service";
import { updateCompanyProfileSchema } from "@/modules/company/company.validation";
import { ApiError } from "@/lib/errors/api-error";
import { requireAdmin } from "@/lib/auth/current-user";
import { requireSameOrigin } from "@/lib/security/request-origin";

export async function GET() {
  try {
    const profile = await getCompanyProfile();

    if (!profile) {
      throw new ApiError(
        "NOT_FOUND",
        "Company profile not found",
        404,
      );
    }

    return successResponse(profile);
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
      updateCompanyProfileSchema.parse(body);

    if (Object.keys(validatedData).length === 0) {
      throw new ApiError(
        "VALIDATION_ERROR",
        "At least one field must be provided",
        400,
      );
    }

    const profile = await updateCompanyProfile(
      validatedData,
    );

    return successResponse(
      profile,
      200,
      "Company profile updated successfully",
    );
  } catch (error) {
    return handleApiError(error);
  }
}
