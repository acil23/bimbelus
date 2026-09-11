import { handleApiError } from "@/lib/api/handle-api-error";
import { successResponse } from "@/lib/api/response";
import { createContactLocation } from "@/modules/contact/contact.service";
import { createContactLocationSchema } from "@/modules/contact/contact.validation";
import { requireAdmin } from "@/lib/auth/current-user";
import { requireSameOrigin } from "@/lib/security/request-origin";

export async function POST(request: Request) {
  try {
    requireSameOrigin(request);

    await requireAdmin();
    const body: unknown = await request.json();

    const validatedData =
      createContactLocationSchema.parse(body);

    const location =
      await createContactLocation(validatedData);

    return successResponse(
      location,
      201,
      "Contact location created successfully",
    );
  } catch (error) {
    return handleApiError(error);
  }
}
