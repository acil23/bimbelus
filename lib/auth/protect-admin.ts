import "server-only";

import { redirect } from "next/navigation";

import { getCurrentUser } from "./current-user";

export async function protectAdminPage() {
  const user = await getCurrentUser();

  if (!user || user.role !== "ADMIN") {
    redirect("/admin/login");
  }

  return user;
}