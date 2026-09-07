import {
  createProgram as createProgramRepository,
  deactivateProgram as deactivateProgramRepository,
  updateProgram as updateProgramRepository,
  findActivePrograms,
  findProgramById,
  findProgramBySlug,
} from "./program.repository";
import { ApiError } from "@/lib/errors/api-error";

export async function getActivePrograms() {
  return findActivePrograms();
}

export async function getProgramById(id: string) {
  return findProgramById(id);
}

export async function getProgramBySlug(slug: string) {
  return findProgramBySlug(slug);
}

export async function createProgram(data: {
  name: string;
  slug: string;
  category:
    | "REGULER"
    | "OLIMPIADE"
    | "PROGRAM_TAHUNAN"
    | "LAINNYA";
  description?: string | null;
  image_url?: string | null;
  is_active?: boolean;
  display_order?: number;
}) {
  return createProgramRepository(data);
}

export async function updateProgram(
  id: string,
  data: {
    name?: string;
    slug?: string;
    category?:
      | "REGULER"
      | "OLIMPIADE"
      | "PROGRAM_TAHUNAN"
      | "LAINNYA";
    description?: string | null;
    image_url?: string | null;
    is_active?: boolean;
    display_order?: number;
  },
) {
  const existingProgram = await findProgramById(id);

  if (!existingProgram) {
    throw new ApiError(
      "NOT_FOUND",
      "Program not found",
      404,
    );
  }

  return updateProgramRepository(id, data);
}

export async function deactivateProgram(id: string) {
  const existingProgram = await findProgramById(id);

  if (!existingProgram) {
    throw new ApiError(
      "NOT_FOUND",
      "Program not found",
      404,
    );
  }

  return deactivateProgramRepository(id);
}