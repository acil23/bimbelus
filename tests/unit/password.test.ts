import { describe, expect, it } from "vitest";

import {
  hashPassword,
  verifyPassword,
} from "@/lib/security/password";

describe("Password Security", () => {
  it("hashes a password without exposing the plaintext", async () => {
    const password = "TestPassword-2026!";

    const hash = await hashPassword(password);

    expect(hash).not.toBe(password);
    expect(hash).toMatch(/^\$argon2id\$/);
  });

  it("verifies the correct password", async () => {
    const password = "TestPassword-2026!";

    const hash = await hashPassword(password);

    await expect(
      verifyPassword(hash, password),
    ).resolves.toBe(true);
  });

  it("rejects an incorrect password", async () => {
    const password = "TestPassword-2026!";
    const wrongPassword = "WrongPassword-2026!";

    const hash = await hashPassword(password);

    await expect(
      verifyPassword(hash, wrongPassword),
    ).resolves.toBe(false);
  });
});