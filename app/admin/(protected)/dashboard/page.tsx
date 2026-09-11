import { redirect } from "next/navigation";

export default function DashboardPage() {
  // Simulasi state anonim untuk keperluan tes Playwright
  const isAuthenticated = false;

  if (!isAuthenticated) {
    redirect("/admin/login");
  }

  return (
    <main>
      <h1>Admin Dashboard</h1>
      <p>Selamat datang di area admin.</p>
    </main>
  );
}