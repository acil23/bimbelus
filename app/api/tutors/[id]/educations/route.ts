import { handleApiError } from "@/lib/api/handle-api-error";
import { successResponse } from "@/lib/api/response";
import { createEducation } from "@/modules/tutors/education.service";
import { tutorIdSchema } from "@/modules/tutors/tutor.validation";
import { createEducationSchema } from "@/modules/tutors/education.validation";
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

    tutorIdSchema.parse(id);

    const body: unknown = await request.json();

    const validatedData = createEducationSchema.parse(body);

    const education = await createEducation({
      tutor_id: id,
      ...validatedData,
    });

    return successResponse(
      education,
      201,
      "Tutor education created successfully",
    );
  } catch (error) {
    return handleApiError(error);
  }
}
