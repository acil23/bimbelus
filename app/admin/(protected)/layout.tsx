import { protectAdminPage } from "@/lib/auth/protect-admin";

export default async function ProtectedAdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await protectAdminPage();

  return children;
}