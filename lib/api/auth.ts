import { apiClient } from "@/lib/api/client";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "EDITOR";
};

type LoginResponse = {
  user: AuthUser;
};

type MeResponse = {
  user: AuthUser;
};

export async function login(
  email: string,
  password: string,
): Promise<LoginResponse> {
  return apiClient<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
}

export async function getCurrentUser(): Promise<AuthUser> {
  const response = await apiClient<MeResponse>("/api/auth/me");

  return response.user;
}

export async function logout(): Promise<void> {
  await apiClient<null>("/api/auth/logout", {
    method: "POST",
  });
}