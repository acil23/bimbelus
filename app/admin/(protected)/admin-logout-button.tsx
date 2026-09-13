// app/admin/%28protected%29/admin-logout-button.tsx --- IGNORE ---

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { logout } from "@/lib/api/auth";

export default function AdminLogoutButton() {
  const router = useRouter();

  const [isLoggingOut, setIsLoggingOut] =
    useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);

    try {
      await logout();

      router.replace("/admin/login");
      router.refresh();
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="text-sm text-zinc-600 hover:text-zinc-900 disabled:opacity-50"
    >
      {isLoggingOut ? "Logout..." : "Logout"}
    </button>
  );
}