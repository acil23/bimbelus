import "server-only";

import { ApiError } from "@/lib/errors/api-error";

export function requireSameOrigin(
  request: Request,
): void {
  const origin = request.headers.get("origin");

  if (!origin) {
    return;
  }

  const requestUrl = new URL(request.url);

  if (origin !== requestUrl.origin) {
    throw new ApiError(
      "FORBIDDEN",
      "Invalid request origin",
      403,
    );
  }
}
