import "server-only";

import crypto from "node:crypto";

import { uploadPublicImage } from "./azure-blob";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
} as const;

type AllowedMimeType = keyof typeof ALLOWED_TYPES;

export class ImageUploadValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ImageUploadValidationError";
  }
}

function isAllowedMimeType(
  value: string,
): value is AllowedMimeType {
  return value in ALLOWED_TYPES;
}

export function hasValidMagicBytes(
  buffer: Buffer,
  mimeType: AllowedMimeType,
): boolean {
  switch (mimeType) {
    case "image/jpeg":
      return (
        buffer.length >= 3 &&
        buffer[0] === 0xff &&
        buffer[1] === 0xd8 &&
        buffer[2] === 0xff
      );

    case "image/png":
      return (
        buffer.length >= 8 &&
        buffer[0] === 0x89 &&
        buffer[1] === 0x50 &&
        buffer[2] === 0x4e &&
        buffer[3] === 0x47 &&
        buffer[4] === 0x0d &&
        buffer[5] === 0x0a &&
        buffer[6] === 0x1a &&
        buffer[7] === 0x0a
      );

    case "image/webp":
      return (
        buffer.length >= 12 &&
        buffer.subarray(0, 4).toString("ascii") === "RIFF" &&
        buffer.subarray(8, 12).toString("ascii") === "WEBP"
      );

    default:
      return false;
  }
}

export async function uploadImage(
  file: File,
  folder: string,
) {
  if (!file || file.size === 0) {
    throw new ImageUploadValidationError(
      "File is empty",
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new ImageUploadValidationError(
      "File size exceeds 5 MB",
    );
  }

  if (!isAllowedMimeType(file.type)) {
    throw new ImageUploadValidationError(
      "Unsupported image type",
    );
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  if (!hasValidMagicBytes(buffer, file.type)) {
    throw new ImageUploadValidationError(
      "File content does not match its declared image type",
    );
  }

  const extension = ALLOWED_TYPES[file.type];

  const key = `${folder}/${crypto.randomUUID()}.${extension}`;

  return uploadPublicImage({
    key,
    buffer,
    contentType: file.type,
  });
}