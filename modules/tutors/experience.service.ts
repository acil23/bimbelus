import { ApiError } from "@/lib/errors/api-error";

import {
  createExperience as createExperienceRepository,
  deleteExperience as deleteExperienceRepository,
  findExperienceById,
  updateExperience as updateExperienceRepository,
} from "./experience.repository";

import { findTutorById } from "./tutor.repository";

export async function createExperience(data: {
  tutor_id: string;
  organization: string;
  position?: string | null;
  start_year?: number | null;
  end_year?: number | null;
  description?: string | null;
  display_order?: number;
}) {
  const tutor = await findTutorById(data.tutor_id);

  if (!tutor) {
    throw new ApiError("NOT_FOUND", "Tutor not found", 404);
  }

  return createExperienceRepository(data);
}

export async function updateExperience(
  id: string,
  data: {
    organization?: string;
    position?: string | null;
    start_year?: number | null;
    end_year?: number | null;
    description?: string | null;
    display_order?: number;
  },
) {
  const existingExperience = await findExperienceById(id);

  if (!existingExperience) {
    throw new ApiError(
      "NOT_FOUND",
      "Tutor experience not found",
      404,
    );
  }

  return updateExperienceRepository(id, data);
}

export async function deleteExperience(id: string) {
  const existingExperience = await findExperienceById(id);

  if (!existingExperience) {
    throw new ApiError(
      "NOT_FOUND",
      "Tutor experience not found",
      404,
    );
  }

  return deleteExperienceRepository(id);
}
