import {
  errorResponse,
  successResponse,
} from "@/lib/api/response";
import { handleApiError } from "@/lib/api/handle-api-error";
import {
  SESSION_COOKIE_NAME,
  sessionCookieOptions,
} from "@/lib/auth/cookie";
import { login } from "@/modules/auth/auth.service";
import { loginSchema } from "@/modules/auth/auth.validation";
import { getClientIp } from "@/lib/security/request-ip";
import {
  checkLoginRateLimit,
  clearLoginRateLimit,
} from "@/lib/security/rate-limit";
import { requireSameOrigin } from "@/lib/security/request-origin";

export async function POST(request: Request) {
  try {
    requireSameOrigin(request);
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return errorResponse(
        "VALIDATION_ERROR",
        "Invalid request data",
        400,
      );
    }

    const input = loginSchema.parse(body);

    const clientIp = getClientIp(request);

    const rateLimitResult =
      checkLoginRateLimit(
        clientIp,
        input.email,
      );

    if (!rateLimitResult.allowed) {
      return errorResponse(
        "TOO_MANY_REQUESTS",
        "Too many login attempts. Please try again later.",
        429,
      );
    }

    const result = await login(
      input.email,
      input.password,
    );

    if (!result.success) {
      return errorResponse(
        "UNAUTHORIZED",
        result.message,
        401,
      );
    }

    clearLoginRateLimit(input.email);

    const response = successResponse(
      {
        user: result.user,
      },
      200,
      "Login successful",
    );

    response.headers.set("Cache-Control", "no-store");

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: result.session.token,
      ...sessionCookieOptions,
      maxAge: Math.max(
        0,
        Math.floor(
          (result.session.expiresAt.getTime() -
            Date.now()) /
          1000,
        ),
      ),
    });

    return response;
  } catch (error) {
    return handleApiError(error);
  }
}