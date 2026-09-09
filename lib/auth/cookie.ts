import "server-only";

import { SESSION_COOKIE_NAME } from "./constants";

export const sessionCookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "strict" as const,
  path: "/",
} as const;

export { SESSION_COOKIE_NAME };
