import { ApiError } from "@/lib/errors/api-error";

import {
  createPackage as createPackageRepository,
  deactivatePackage as deactivatePackageRepository,
  findPackageById,
  updatePackage as updatePackageRepository,
} from "./package.repository";

import { findProgramById } from "./program.repository";

export async function createPackage(data: {
  program_id: string;
  name: string;
  description?: string | null;
  price: number;
  price_unit:
    | "PER_SEMESTER"
    | "PER_PERIODE"
    | "PER_BULAN"
    | "PER_PERTEMUAN"
    | "SEKALI_BAYAR";
  duration?: string | null;
  is_active?: boolean;
  display_order?: number;
}) {
  const program = await findProgramById(data.program_id);

  if (!program) {
    throw new ApiError(
      "NOT_FOUND",
      "Program not found",
      404,
    );
  }

  return createPackageRepository(data);
}

export async function updatePackage(
  id: string,
  data: {
    name?: string;
    description?: string | null;
    price?: number;
    price_unit?:
      | "PER_SEMESTER"
      | "PER_PERIODE"
      | "PER_BULAN"
      | "PER_PERTEMUAN"
      | "SEKALI_BAYAR";
    duration?: string | null;
    is_active?: boolean;
    display_order?: number;
  },
) {
  const existingPackage = await findPackageById(id);

  if (!existingPackage) {
    throw new ApiError(
      "NOT_FOUND",
      "Program package not found",
      404,
    );
  }

  return updatePackageRepository(id, data);
}

export async function deactivatePackage(id: string) {
  const existingPackage = await findPackageById(id);

  if (!existingPackage) {
    throw new ApiError(
      "NOT_FOUND",
      "Program package not found",
      404,
    );
  }

  return deactivatePackageRepository(id);
}
