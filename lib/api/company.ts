import { apiClient } from "@/lib/api/client";
import type {
  Company,
  UpdateCompanyInput,
} from "@/lib/api/types";

export async function getCompany(): Promise<Company> {
  return apiClient<Company>("/api/company");
}

export async function updateCompany(
  data: UpdateCompanyInput,
): Promise<Company> {
  return apiClient<Company>("/api/company", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}