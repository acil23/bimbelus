// app/admin/%28protected%29/admin-user-info.tsx --- IGNORE ---

"use client";

import { useEffect, useState } from "react";

import {
  getCurrentUser,
  type AuthUser,
} from "@/lib/api/auth";

export default function AdminUserInfo() {
  const [user, setUser] = useState<AuthUser | null>(
    null,
  );

  useEffect(() => {
    let isMounted = true;

    async function loadUser() {
      try {
        const currentUser =
          await getCurrentUser();

        if (isMounted) {
          setUser(currentUser);
        }
      } catch {
        if (isMounted) {
          setUser(null);
        }
      }
    }

    loadUser();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div className="hidden text-right sm:block">
      <p className="text-sm font-medium">
        {user.name}
      </p>

      <p className="text-xs text-zinc-500">
        {user.email}
      </p>
    </div>
  );
}