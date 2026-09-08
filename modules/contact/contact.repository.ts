import { prisma } from "@/lib/db/prisma";

export async function findContactInformation() {
  return prisma.contact_information.findFirst({
    include: {
      contact_locations: {
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

export async function updateContactInformation(
  id: string,
  data: {
    email?: string | null;
    instagram_url?: string | null;
    facebook_url?: string | null;
    tiktok_url?: string | null;
    youtube_url?: string | null;
  },
) {
  return prisma.contact_information.update({
    where: {
      id,
    },
    data,
    include: {
      contact_locations: {
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

export async function createContactLocation(data: {
  contact_information_id: string;
  label?: string | null;
  address: string;
  phone?: string | null;
  whatsapp?: string | null;
  contact_person?: string | null;
  google_maps_url?: string | null;
  is_active?: boolean;
  display_order?: number;
}) {
  return prisma.contact_locations.create({
    data,
  });
}

export async function findContactLocationById(id: string) {
  return prisma.contact_locations.findUnique({
    where: {
      id,
    },
  });
}

export async function updateContactLocation(
  id: string,
  data: {
    label?: string | null;
    address?: string;
    phone?: string | null;
    whatsapp?: string | null;
    contact_person?: string | null;
    google_maps_url?: string | null;
    is_active?: boolean;
    display_order?: number;
  },
) {
  return prisma.contact_locations.update({
    where: {
      id,
    },
    data,
  });
}

export async function deactivateContactLocation(id: string) {
  return prisma.contact_locations.update({
    where: {
      id,
    },
    data: {
      is_active: false,
    },
  });
}
