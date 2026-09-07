import { prisma } from "@/lib/db/prisma";

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
  return prisma.program_packages.create({
    data,
  });
}

export async function findPackageById(id: string) {
  return prisma.program_packages.findUnique({
    where: {
      id,
    },
  });
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
  return prisma.program_packages.update({
    where: {
      id,
    },
    data,
  });
}

export async function deactivatePackage(id: string) {
  return prisma.program_packages.update({
    where: {
      id,
    },
    data: {
      is_active: false,
    },
  });
}
