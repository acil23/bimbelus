import { prisma } from "@/lib/db/prisma";

export async function findActiveTutors() {
  return prisma.tutors.findMany({
    where: {
      is_active: true,
    },
    orderBy: {
      display_order: "asc",
    },
    include: {
      tutor_educations: {
        orderBy: {
          display_order: "asc",
        },
      },
      tutor_experiences: {
        orderBy: {
          display_order: "asc",
        },
      },
    },
  });
}

export async function findTutorById(id: string) {
  return prisma.tutors.findUnique({
    where: {
      id,
    },
    include: {
      tutor_educations: {
        orderBy: {
          display_order: "asc",
        },
      },
      tutor_experiences: {
        orderBy: {
          display_order: "asc",
        },
      },
    },
  });
}

export async function findTutorBySlug(slug: string) {
  return prisma.tutors.findUnique({
    where: {
      slug,
    },
    include: {
      tutor_educations: {
        orderBy: {
          display_order: "asc",
        },
      },
      tutor_experiences: {
        orderBy: {
          display_order: "asc",
        },
      },
    },
  });
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
  return prisma.tutors.create({
    data,
  });
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
  return prisma.tutors.update({
    where: {
      id,
    },
    data,
  });
}

export async function deactivateTutor(id: string) {
  return prisma.tutors.update({
    where: {
      id,
    },
    data: {
      is_active: false,
    },
  });
}
