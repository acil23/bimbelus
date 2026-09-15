"use client";

import { useState } from "react";
import { getCompany, updateCompany } from "@/lib/api/company";
import type { Company } from "@/lib/api/types";
import { updateCompanyProfileSchema } from "@/modules/company/company.validation";
import { RecordForm } from "@/components/admin/record-form";
import { companyForm } from "@/components/admin/resources";

export default function CompanyAdmin({
  initialCompany,
}: {
  initialCompany: Company;
}) {
  const [company, setCompany] = useState(initialCompany);
  const [warning, setWarning] = useState("");

  async function save(data: unknown) {
    const saved = await updateCompany(updateCompanyProfileSchema.parse(data));
    setCompany(saved);
    setWarning("");

    try {
      setCompany(await getCompany());
    } catch {
      setWarning(
        "Perubahan tersimpan, tetapi pembacaan ulang gagal. Muat ulang halaman untuk melihat data terbaru.",
      );
    }
  }

  return (
    <section className="card rich-panel">
      {warning && (
        <div className="alert" role="status">
          {warning}
        </div>
      )}

      <RecordForm key={company.id} spec={companyForm} initial={company} onSave={save} />
    </section>
  );
}
