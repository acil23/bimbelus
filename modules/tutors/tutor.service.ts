import { ApiError } from "@/lib/errors/api-error";

import {
  createTutor as createTutorRepository,
  deactivateTutor as deactivateTutorRepository,
  findActiveTutors,
  findTutorById,
  findTutorBySlug,
  updateTutor as updateTutorRepository,
} from "./tutor.repository";

export async function getActiveTutors() {
  return findActiveTutors();
}

export async function getTutorById(id: string) {
  return findTutorById(id);
}

export async function getTutorBySlug(slug: string) {
  return findTutorBySlug(slug);
}

export async function createTutor(data: {
  name: string;
  slug: string;
  title?: string | null;
  photo_url?: string | null;
  specialization?: string | null;
  bio?: string | null;
  is_active?: boolean;
  display_order?: number;
}) {
  return createTutorRepository(data);
}

export async function updateTutor(
  id: string,
  data: {
    name?: string;
    slug?: string;
    title?: string | null;
    photo_url?: string | null;
    specialization?: string | null;
    bio?: string | null;
    is_active?: boolean;
    display_order?: number;
  },
) {
  const existingTutor = await findTutorById(id);

  if (!existingTutor) {
    throw new ApiError("NOT_FOUND", "Tutor not found", 404);
  }

  return updateTutorRepository(id, data);
}

export async function deactivateTutor(id: string) {
  const existingTutor = await findTutorById(id);

  if (!existingTutor) {
    throw new ApiError("NOT_FOUND", "Tutor not found", 404);
  }

  return deactivateTutorRepository(id);
}
