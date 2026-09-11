import { describe, expect, it } from "vitest";

import { hasValidMagicBytes } from "@/lib/storage/image-upload";

describe("image magic-byte validation", () => {
  it("accepts JPEG signature", () => {
    const buffer = Buffer.from([
      0xff,
      0xd8,
      0xff,
      0xe0,
    ]);

    expect(
      hasValidMagicBytes(buffer, "image/jpeg"),
    ).toBe(true);
  });

  it("accepts PNG signature", () => {
    const buffer = Buffer.from([
      0x89,
      0x50,
      0x4e,
      0x47,
      0x0d,
      0x0a,
      0x1a,
      0x0a,
    ]);

    expect(
      hasValidMagicBytes(buffer, "image/png"),
    ).toBe(true);
  });

  it("accepts WebP signature", () => {
    const buffer = Buffer.from(
      "524946460000000057454250",
      "hex",
    );

    expect(
      hasValidMagicBytes(buffer, "image/webp"),
    ).toBe(true);
  });

  it("rejects PNG declared as JPEG", () => {
    const buffer = Buffer.from([
      0x89,
      0x50,
      0x4e,
      0x47,
      0x0d,
      0x0a,
      0x1a,
      0x0a,
    ]);

    expect(
      hasValidMagicBytes(buffer, "image/jpeg"),
    ).toBe(false);
  });

  it("rejects arbitrary content", () => {
    const buffer = Buffer.from(
      "This is not an image",
    );

    expect(
      hasValidMagicBytes(buffer, "image/jpeg"),
    ).toBe(false);
  });
});