import { describe, expect, it } from "vitest";

import { loginSchema } from "@/modules/auth/auth.validation";

describe("Login Validation", () => {
  it("accepts a valid login payload", () => {
    const result = loginSchema.safeParse({
      email: "admin@example.com",
      password: "ValidPassword-2026!",
    });

    expect(result.success).toBe(true);
  });

  it("rejects an invalid email", () => {
    const result = loginSchema.safeParse({
      email: "not-an-email",
      password: "ValidPassword-2026!",
    });

    expect(result.success).toBe(false);
  });

  it("rejects a missing password", () => {
    const result = loginSchema.safeParse({
      email: "admin@example.com",
    });

    expect(result.success).toBe(false);
  });

  it("rejects a missing email", () => {
    const result = loginSchema.safeParse({
      password: "ValidPassword-2026!",
    });

    expect(result.success).toBe(false);
  });
});