import { handleApiError } from "@/lib/api/handle-api-error";
import { successResponse } from "@/lib/api/response";
import { ApiError } from "@/lib/errors/api-error";
import { getProgramBySlug } from "@/modules/programs/program.service";

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

    const program = await getProgramBySlug(slug);

    if (!program || !program.is_active) {
      throw new ApiError(
        "NOT_FOUND",
        "Program not found",
        404,
      );
    }

    return successResponse(program);
  } catch (error) {
    return handleApiError(error);
  }
}
