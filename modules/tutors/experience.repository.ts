import { prisma } from "@/lib/db/prisma";

export async function createExperience(data: {
  tutor_id: string;
  organization: string;
  position?: string | null;
  start_year?: number | null;
  end_year?: number | null;
  description?: string | null;
  display_order?: number;
}) {
  return prisma.tutor_experiences.create({
    data,
  });
}

export async function findExperienceById(id: string) {
  return prisma.tutor_experiences.findUnique({
    where: {
      id,
    },
  });
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
  return prisma.tutor_experiences.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteExperience(id: string) {
  return prisma.tutor_experiences.delete({
    where: {
      id,
    },
  });
}
