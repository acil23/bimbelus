import { handleApiError } from "@/lib/api/handle-api-error";
import { successResponse } from "@/lib/api/response";
import { ApiError } from "@/lib/errors/api-error";
import { getTutorBySlug } from "@/modules/tutors/tutor.service";

type RouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(
  _request: Request,
  { params }: RouteContext,
) {
  try {
    const { slug } = await params;

    const tutor = await getTutorBySlug(slug);

    if (!tutor || !tutor.is_active) {
      throw new ApiError(
        "NOT_FOUND",
        "Tutor not found",
        404,
      );
    }

    return successResponse(tutor);
  } catch (error) {
    return handleApiError(error);
  }
}
