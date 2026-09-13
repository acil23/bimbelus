import { apiClient } from "@/lib/api/client";
import type {
  Contact,
  ContactLocation,
  CreateContactLocationInput,
  UpdateContactInput,
  UpdateContactLocationInput,
} from "@/lib/api/types";

export async function getContact(): Promise<Contact> {
  return apiClient<Contact>("/api/contact");
}

export async function updateContact(
  data: UpdateContactInput,
): Promise<Contact> {
  return apiClient<Contact>("/api/contact", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function createContactLocation(
  data: CreateContactLocationInput,
): Promise<ContactLocation> {
  return apiClient<ContactLocation>(
    "/api/contact/locations",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  );
}

export async function updateContactLocation(
  id: string,
  data: UpdateContactLocationInput,
): Promise<ContactLocation> {
  return apiClient<ContactLocation>(
    `/api/contact/locations/${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
    },
  );
}

export async function deleteContactLocation(
  id: string,
): Promise<ContactLocation> {
  return apiClient<ContactLocation>(
    `/api/contact/locations/${encodeURIComponent(id)}`,
    {
      method: "DELETE",
    },
  );
}