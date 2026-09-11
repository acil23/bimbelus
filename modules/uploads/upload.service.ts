import "server-only";

import { uploadImage } from "@/lib/storage/image-upload";

const ALLOWED_FOLDERS = {
  branding: "branding",
  programs: "programs",
  tutors: "tutors",
  achievements: "achievements",
} as const;

export type UploadFolder = keyof typeof ALLOWED_FOLDERS;

export async function uploadPublicImageService(
  file: File,
  folder: UploadFolder,
) {
  return uploadImage(file, ALLOWED_FOLDERS[folder]);
}