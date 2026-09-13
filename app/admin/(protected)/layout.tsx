// app/admin/%28protected%29/layout.tsx --- IGNORE ---

import Link from "next/link";
import AdminLogoutButton from "./admin-logout-button";
import AdminUserInfo from "./admin-user-info";
import { protectAdminPage } from "@/lib/auth/protect-admin";

const navigation = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
  },
  {
    href: "/admin/programs",
    label: "Programs",
  },
  {
    href: "/admin/tutors",
    label: "Tutors",
  },
  {
    href: "/admin/achievements",
    label: "Achievements",
  },
  {
    href: "/admin/company",
    label: "Company",
  },
  {
    href: "/admin/contact",
    label: "Contact",
  },
];

export default async function ProtectedAdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await protectAdminPage();

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 border-r border-zinc-200 bg-white md:block">
          <div className="border-b border-zinc-200 px-6 py-5">
            <Link
              href="/admin/dashboard"
              className="font-semibold"
            >
              Bimbel YS Admin
            </Link>
          </div>

          <nav className="p-4">
            <div className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-lg px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-100"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </aside>

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="border-b border-zinc-200 bg-white">
            <div className="flex h-16 items-center justify-between px-6">
              <div>
                <p className="text-sm font-medium">
                  Admin Panel
                </p>
              </div>

              <div className="flex items-center gap-5">
                <AdminUserInfo />

                <a
                  href="/"
                  className="text-sm text-zinc-600 hover:text-zinc-900"
                >
                  Lihat Website
                </a>

                <AdminLogoutButton />
              </div>
            </div>
          </header>

          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}