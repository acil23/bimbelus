import { prisma } from "@/lib/db/prisma";

export async function createEducation(data: {
  tutor_id: string;
  institution: string;
  field_of_study?: string | null;
  start_year?: number | null;
  end_year?: number | null;
  description?: string | null;
  display_order?: number;
}) {
  return prisma.tutor_educations.create({
    data,
  });
}

export async function findEducationById(id: string) {
  return prisma.tutor_educations.findUnique({
    where: {
      id,
    },
  });
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
  return prisma.tutor_educations.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteEducation(id: string) {
  return prisma.tutor_educations.delete({
    where: {
      id,
    },
  });
}
