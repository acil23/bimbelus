import { prisma } from "@/lib/db/prisma";

export async function findActivePrograms() {
  return prisma.programs.findMany({
    where: {
      is_active: true,
    },
    orderBy: {
      display_order: "asc",
    },
    include: {
      program_packages: {
        where: {
          is_active: true,
        },
        orderBy: {
          display_order: "asc",
        },
      },
    },
  });
}

export async function findProgramById(id: string) {
  return prisma.programs.findUnique({
    where: {
      id,
    },
    include: {
      program_packages: {
        orderBy: {
          display_order: "asc",
        },
      },
    },
  });
}

export async function findProgramBySlug(slug: string) {
  return prisma.programs.findUnique({
    where: {
      slug,
    },
    include: {
      program_packages: {
        where: {
          is_active: true,
        },
        orderBy: {
          display_order: "asc",
        },
      },
    },
  });
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
  return prisma.programs.create({
    data,
  });
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
  return prisma.programs.update({
    where: {
      id,
    },
    data,
  });
}

export async function deactivateProgram(id: string) {
  return prisma.programs.update({
    where: {
      id,
    },
    data: {
      is_active: false,
    },
  });
}