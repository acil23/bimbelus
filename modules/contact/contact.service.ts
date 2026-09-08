import { ApiError } from "@/lib/errors/api-error";

import {
  createContactLocation as createContactLocationRepository,
  deactivateContactLocation as deactivateContactLocationRepository,
  findContactInformation,
  findContactLocationById,
  updateContactInformation as updateContactInformationRepository,
  updateContactLocation as updateContactLocationRepository,
} from "./contact.repository";

export async function getContact() {
  return findContactInformation();
}

export async function updateContactInformation(data: {
  email?: string | null;
  instagram_url?: string | null;
  facebook_url?: string | null;
  tiktok_url?: string | null;
  youtube_url?: string | null;
}) {
  const existingContact = await findContactInformation();

  if (!existingContact) {
    throw new ApiError(
      "NOT_FOUND",
      "Contact information not found",
      404,
    );
  }

  return updateContactInformationRepository(
    existingContact.id,
    data,
  );
}

export async function createContactLocation(data: {
  label?: string | null;
  address: string;
  phone?: string | null;
  whatsapp?: string | null;
  contact_person?: string | null;
  google_maps_url?: string | null;
  is_active?: boolean;
  display_order?: number;
}) {
  const existingContact = await findContactInformation();

  if (!existingContact) {
    throw new ApiError(
      "NOT_FOUND",
      "Contact information not found",
      404,
    );
  }

  return createContactLocationRepository({
    ...data,
    contact_information_id: existingContact.id,
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
  const existingLocation =
    await findContactLocationById(id);

  if (!existingLocation) {
    throw new ApiError(
      "NOT_FOUND",
      "Contact location not found",
      404,
    );
  }

  return updateContactLocationRepository(id, data);
}

export async function deactivateContactLocation(id: string) {
  const existingLocation =
    await findContactLocationById(id);

  if (!existingLocation) {
    throw new ApiError(
      "NOT_FOUND",
      "Contact location not found",
      404,
    );
  }

  return deactivateContactLocationRepository(id);
}
