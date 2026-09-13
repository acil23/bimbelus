import { getCompany } from "@/lib/api/company";
import CompanyAdmin from "./company-admin";

export default async function CompanyPage() {
  const company = await getCompany();

  return (
    <main>
      <h1>Company</h1>

      <p>
        Kelola informasi utama Bimbel YS.
      </p>

      <CompanyAdmin initialCompany={company} />
    </main>
  );
}