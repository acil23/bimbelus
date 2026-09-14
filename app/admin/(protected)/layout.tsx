import { protectAdminPage } from "@/lib/auth/protect-admin";
import { AdminShell } from "@/components/admin/admin-shell";
import AdminLogoutButton from "./admin-logout-button";
import AdminUserInfo from "./admin-user-info";
export default async function ProtectedAdminLayout({children}:Readonly<{children:React.ReactNode}>) { await protectAdminPage(); return <AdminShell user={<AdminUserInfo />} logout={<AdminLogoutButton />}>{children}</AdminShell>; }
