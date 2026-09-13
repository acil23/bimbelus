"use client";

import { useState } from "react";

import {
  getCompany,
  updateCompany,
} from "@/lib/api/company";

import type { Company } from "@/lib/api/types";

type CompanyAdminProps = {
  initialCompany: Company;
};

export default function CompanyAdmin({
  initialCompany,
}: CompanyAdminProps) {
  const [company, setCompany] =
    useState(initialCompany);

  const [loading, setLoading] = useState(false);
  const [error, setError] =
    useState<string | null>(null);

  async function refreshCompany() {
    const latestCompany = await getCompany();
    setCompany(latestCompany);
  }

  async function handleUpdateCompany() {
    try {
      setLoading(true);
      setError(null);

      await updateCompany({
        tagline:
          "Updated during C-6.4 CRUD testing",
        description:
          "Temporary update for C-6.4 testing",
      });

      await refreshCompany();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to update company",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleRestoreCompany() {
    try {
      setLoading(true);
      setError(null);

      await updateCompany({
        tagline:
          "Enabling Students To Advance In Their Education",
        description: null,
      });

      await refreshCompany();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to restore company",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      {error && (
        <p role="alert">
          {error}
        </p>
      )}

      <article>
        <h2>{company.name}</h2>

        <p>
          Tagline: {company.tagline}
        </p>

        <p>
          Description:{" "}
          {company.description ?? "-"}
        </p>

        <p>
          Vision: {company.vision ?? "-"}
        </p>

        <p>
          Mission: {company.mission ?? "-"}
        </p>

        <p>
          Logo: {company.logo_url ?? "-"}
        </p>

        <button
          type="button"
          onClick={handleUpdateCompany}
          disabled={loading}
        >
          Test Update Company
        </button>

        <button
          type="button"
          onClick={handleRestoreCompany}
          disabled={loading}
        >
          Restore Company
        </button>
      </article>
    </section>
  );
}