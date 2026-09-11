import { handleApiError } from "@/lib/api/handle-api-error";
import { successResponse } from "@/lib/api/response";
import { createPackage } from "@/modules/programs/package.service";
import {
  createPackageSchema,
  programIdSchema,
} from "@/modules/programs/package.validation";
import { requireAdmin } from "@/lib/auth/current-user";
import { requireSameOrigin } from "@/lib/security/request-origin";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(
  request: Request,
  { params }: RouteContext,
) {
  try {
    requireSameOrigin(request);
    await requireAdmin();
    const { id } = await params;

    programIdSchema.parse(id);

    const body: unknown = await request.json();

    const validatedData = createPackageSchema.parse(body);

    const packageData = await createPackage({
      program_id: id,
      ...validatedData,
    });

    return successResponse(
      packageData,
      201,
      "Program package created successfully",
    );
  } catch (error) {
    return handleApiError(error);
  }
}
