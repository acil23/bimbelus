import { handleApiError } from "@/lib/api/handle-api-error";
import { successResponse } from "@/lib/api/response";
import { createExperience } from "@/modules/tutors/experience.service";
import { createExperienceSchema } from "@/modules/tutors/experience.validation";
import { tutorIdSchema } from "@/modules/tutors/tutor.validation";

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
    const { id } = await params;

    tutorIdSchema.parse(id);

    const body: unknown = await request.json();

    const validatedData = createExperienceSchema.parse(body);

    const experience = await createExperience({
      tutor_id: id,
      ...validatedData,
    });

    return successResponse(
      experience,
      201,
      "Tutor experience created successfully",
    );
  } catch (error) {
    return handleApiError(error);
  }
}
