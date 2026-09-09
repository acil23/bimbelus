import "server-only";

import { ApiError } from "@/lib/errors/api-error";
import { getCurrentSession } from "./session";

export async function getCurrentUser() {
  const session = await getCurrentSession();

  if (!session) {
    return null;
  }

  const {
    id,
    name,
    email,
    role,
  } = session.user;

  return {
    id,
    name,
    email,
    role,
  };
}

export async function requireAdmin() {
  const user = await getCurrentUser();

  if (!user) {
    throw new ApiError(
      "UNAUTHORIZED",
      "Authentication required",
      401,
    );
  }

  if (user.role !== "ADMIN") {
    throw new ApiError(
      "FORBIDDEN",
      "You do not have permission to perform this action",
      403,
    );
  }

  return user;
}