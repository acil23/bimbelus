// app/admin/login/page.tsx --- IGNORE ---

import LoginForm from "./login-form";

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-6">
      <section className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <p className="text-sm text-zinc-500">
          Bimbel YS
        </p>

        <h1 className="mt-2 text-2xl font-bold">
          Admin Login
        </h1>

        <p className="mt-2 text-sm text-zinc-600">
          Masuk untuk mengelola konten website Bimbel YS.
        </p>

        <LoginForm />
      </section>
    </main>
  );
}