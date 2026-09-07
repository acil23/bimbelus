import { ApiError } from "@/lib/errors/api-error";

import {
  createEducation as createEducationRepository,
  deleteEducation as deleteEducationRepository,
  findEducationById,
  updateEducation as updateEducationRepository,
} from "./education.repository";

import { findTutorById } from "./tutor.repository";

export async function createEducation(data: {
  tutor_id: string;
  institution: string;
  field_of_study?: string | null;
  start_year?: number | null;
  end_year?: number | null;
  description?: string | null;
  display_order?: number;
}) {
  const tutor = await findTutorById(data.tutor_id);

  if (!tutor) {
    throw new ApiError("NOT_FOUND", "Tutor not found", 404);
  }

  return createEducationRepository(data);
}

export async function updateEducation(
  id: string,
  data: {
    institution?: string;
    field_of_study?: string | null;
    start_year?: number | null;
    end_year?: number | null;
    description?: string | null;
    display_order?: number;
  },
) {
  const existingEducation = await findEducationById(id);

  if (!existingEducation) {
    throw new ApiError(
      "NOT_FOUND",
      "Tutor education not found",
      404,
    );
  }

  return updateEducationRepository(id, data);
}

export async function deleteEducation(id: string) {
  const existingEducation = await findEducationById(id);

  if (!existingEducation) {
    throw new ApiError(
      "NOT_FOUND",
      "Tutor education not found",
      404,
    );
  }

  return deleteEducationRepository(id);
}
