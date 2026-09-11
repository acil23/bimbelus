import { NextRequest } from "next/server";

import { handleApiError } from "@/lib/api/handle-api-error";
import { successResponse } from "@/lib/api/response";
import {
  SESSION_COOKIE_NAME,
  sessionCookieOptions,
} from "@/lib/auth/cookie";
import { logout } from "@/modules/auth/auth.service";
import { requireSameOrigin } from "@/lib/security/request-origin";

export async function POST(request: NextRequest) {
  try {
    requireSameOrigin(request);

    const token = request.cookies.get(
      SESSION_COOKIE_NAME,
    )?.value;

    await logout(token);

    const response = successResponse(
      null,
      200,
      "Logout successful",
    );

    response.headers.set("Cache-Control", "no-store");

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: "",
      ...sessionCookieOptions,
      maxAge: 0,
    });

    return response;
  } catch (error) {
    return handleApiError(error);
  }
}