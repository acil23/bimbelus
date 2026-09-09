import { handleApiError } from "@/lib/api/handle-api-error";
import {
  errorResponse,
  successResponse,
} from "@/lib/api/response";
import { getCurrentUser } from "@/lib/auth/current-user";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return errorResponse(
        "UNAUTHORIZED",
        "Authentication required",
        401,
      );
    }

    return successResponse(
      {
        user,
      },
      200,
    );
  } catch (error) {
    return handleApiError(error);
  }
}