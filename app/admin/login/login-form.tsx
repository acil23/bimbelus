// app/admin/login/login-form.tsx --- IGNORE ---

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  login,
} from "@/lib/api/auth";
import { ApiClientError } from "@/lib/api/client";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [error, setError] = useState<string | null>(
    null,
  );

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError(null);
    setIsSubmitting(true);

    try {
      await login(email, password);

      router.replace("/admin/dashboard");
      router.refresh();
    } catch (error) {
      if (error instanceof ApiClientError) {
        setError(error.message);
      } else {
        setError(
          "Terjadi kesalahan. Silakan coba lagi.",
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 space-y-5"
    >
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium"
        >
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
          className="mt-2 block w-full rounded-lg border border-zinc-300 px-3 py-2.5 outline-none focus:border-zinc-900"
          placeholder="admin@example.com"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium"
        >
          Password
        </label>

        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
          className="mt-2 block w-full rounded-lg border border-zinc-300 px-3 py-2.5 outline-none focus:border-zinc-900"
          placeholder="••••••••"
        />
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-zinc-900 px-4 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? "Memproses..." : "Login"}
      </button>
    </form>
  );
}