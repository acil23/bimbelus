import { prisma } from "@/lib/db/prisma";

export async function findCompanyProfile() {
  return prisma.company_profile.findFirst();
}

export async function updateCompanyProfile(
  id: string,
  data: {
    name?: string;
    tagline?: string | null;
    description?: string | null;
    history?: string | null;
    vision?: string | null;
    mission?: string | null;
    logo_url?: string | null;
  },
) {
  return prisma.company_profile.update({
    where: {
      id,
    },
    data,
  });
}
