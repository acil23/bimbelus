import { apiClient } from "@/lib/api/client";
import type {
  CreateProgramInput,
  CreateProgramPackageInput,
  Program,
  ProgramMutationResult,
  ProgramPackage,
  UpdateProgramInput,
  UpdateProgramPackageInput,
} from "@/lib/api/types";

export async function getPrograms(): Promise<Program[]> {
  return apiClient<Program[]>("/api/programs");
}

export async function getProgramBySlug(
  slug: string,
): Promise<Program> {
  return apiClient<Program>(
    `/api/programs/slug/${encodeURIComponent(slug)}`,
  );
}

export async function createProgram(
  data: CreateProgramInput,
): Promise<ProgramMutationResult> {
  return apiClient<ProgramMutationResult>("/api/programs", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateProgram(
  id: string,
  data: UpdateProgramInput,
): Promise<ProgramMutationResult> {
  return apiClient<ProgramMutationResult>(
    `/api/programs/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
    },
  );
}

export async function deleteProgram(
  id: string,
): Promise<ProgramMutationResult> {
  return apiClient<ProgramMutationResult>(
    `/api/programs/${id}`,
    {
      method: "DELETE",
    },
  );
}

export async function createProgramPackage(
  programId: string,
  data: CreateProgramPackageInput,
): Promise<ProgramPackage> {
  return apiClient<ProgramPackage>(
    `/api/programs/${programId}/packages`,
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  );
}

export async function updateProgramPackage(
  packageId: string,
  data: UpdateProgramPackageInput,
): Promise<ProgramPackage> {
  return apiClient<ProgramPackage>(
    `/api/program-packages/${packageId}`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
    },
  );
}

export async function deleteProgramPackage(
  packageId: string,
): Promise<ProgramPackage> {
  return apiClient<ProgramPackage>(
    `/api/program-packages/${packageId}`,
    {
      method: "DELETE",
    },
  );
}