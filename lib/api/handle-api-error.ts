import { Prisma } from "@/lib/generated/prisma/client";
import { ZodError } from "zod";

import { ApiError } from "@/lib/errors/api-error";
import { errorResponse } from "./response";

export function handleApiError(error: unknown) {
  if (error instanceof ApiError) {
    return errorResponse(
      error.code,
      error.message,
      error.status,
      error.details,
    );
  }

  if (error instanceof ZodError) {
    return errorResponse(
      "VALIDATION_ERROR",
      "Invalid data",
      400,
      error.flatten(),
    );
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return errorResponse(
        "CONFLICT",
        "A record with the same unique value already exists",
        409,
      );
    }

    if (error.code === "P2025") {
      return errorResponse(
        "NOT_FOUND",
        "Record not found",
        404,
      );
    }
  }

  console.error("Unhandled API error:", error);

  return errorResponse(
    "INTERNAL_ERROR",
    "An unexpected error occurred",
    500,
  );
}
