import { handleApiError } from "@/lib/api/handle-api-error";
import { successResponse } from "@/lib/api/response";
import {
  createTutor,
  getActiveTutors,
} from "@/modules/tutors/tutor.service";
import { createTutorSchema } from "@/modules/tutors/tutor.validation";
import { requireAdmin } from "@/lib/auth/current-user";
import { requireSameOrigin } from "@/lib/security/request-origin";

export async function GET() {
  try {
    const tutors = await getActiveTutors();

    return successResponse(tutors);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    requireSameOrigin(request);
    await requireAdmin();
    const body: unknown = await request.json();

    const validatedData = createTutorSchema.parse(body);

    const tutor = await createTutor(validatedData);

    return successResponse(
      tutor,
      201,
      "Tutor created successfully",
    );
  } catch (error) {
    return handleApiError(error);
  }
}
