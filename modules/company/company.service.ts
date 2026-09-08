import { ApiError } from "@/lib/errors/api-error";

import {
  findCompanyProfile,
  updateCompanyProfile as updateCompanyProfileRepository,
} from "./company.repository";

export async function getCompanyProfile() {
  return findCompanyProfile();
}

export async function updateCompanyProfile(data: {
  name?: string;
  tagline?: string | null;
  description?: string | null;
  history?: string | null;
  vision?: string | null;
  mission?: string | null;
  logo_url?: string | null;
}) {
  const existingProfile = await findCompanyProfile();

  if (!existingProfile) {
    throw new ApiError(
      "NOT_FOUND",
      "Company profile not found",
      404,
    );
  }

  return updateCompanyProfileRepository(
    existingProfile.id,
    data,
  );
}
