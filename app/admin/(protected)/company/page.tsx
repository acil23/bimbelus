import { getCompany } from "@/lib/api/company";
import CompanyAdmin from "./company-admin";

export const metadata = { title: "Profil Lembaga" };

export default async function CompanyPage() {
  const company = await getCompany();

  return (
    <>
      <header className="admin-title">
        <span className="eyebrow">Identitas merek</span>
        <h1>Profil lembaga</h1>
        <p>Perbarui cerita, tujuan, dan identitas visual Bimbel YS.</p>
      </header>

      <CompanyAdmin initialCompany={company} />
    </>
  );
}
