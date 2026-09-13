"use client";

import { useState } from "react";

import {
    createProgram,
    createProgramPackage,
    deleteProgram,
    deleteProgramPackage,
    getPrograms,
    updateProgram,
    updateProgramPackage,
} from "@/lib/api/programs";

import type { Program } from "@/lib/api/types";

type ProgramsAdminProps = {
    initialPrograms: Program[];
};

export default function ProgramsAdmin({
    initialPrograms,
}: ProgramsAdminProps) {
    const [programs, setPrograms] = useState(initialPrograms);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function refreshPrograms() {
        const latestPrograms = await getPrograms();
        setPrograms(latestPrograms);
    }

    async function handleCreateTestProgram() {
        try {
            setLoading(true);
            setError(null);

            await createProgram({
                name: "C6 Test Program",
                slug: `c6-test-${Date.now()}`,
                category: "LAINNYA",
                description: "Temporary program for C-6.1 CRUD testing",
                is_active: true,
                display_order: 99,
            });

            await refreshPrograms();
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to create program",
            );
        } finally {
            setLoading(false);
        }
    }

    async function handleUpdate(program: Program) {
        try {
            setLoading(true);
            setError(null);

            await updateProgram(program.id, {
                description: "Updated during C-6.1 CRUD testing",
            });

            await refreshPrograms();
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to update program",
            );
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(program: Program) {
        const confirmed = window.confirm(
            `Nonaktifkan program "${program.name}"?`,
        );

        if (!confirmed) {
            return;
        }

        try {
            setLoading(true);
            setError(null);

            await deleteProgram(program.id);
            await refreshPrograms();
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to delete program",
            );
        } finally {
            setLoading(false);
        }
    }

    async function handleCreatePackage(program: Program) {
        try {
            setLoading(true);
            setError(null);

            await createProgramPackage(program.id, {
                name: "C6 Test Package",
                description: "Temporary package for C-6.1 testing",
                price: 100000,
                price_unit: "PER_BULAN",
                duration: "1 Bulan",
                is_active: true,
                display_order: program.program_packages.length + 1,
            });

            await refreshPrograms();
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to create package",
            );
        } finally {
            setLoading(false);
        }
    }

    async function handleUpdatePackage(
        packageId: string,
    ) {
        try {
            setLoading(true);
            setError(null);

            await updateProgramPackage(packageId, {
                name: "C6 Updated Package",
                price: 150000,
                duration: "1 Bulan",
            });

            await refreshPrograms();
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to update package",
            );
        } finally {
            setLoading(false);
        }
    }

    async function handleDeletePackage(
        packageId: string,
        packageName: string,
    ) {
        const confirmed = window.confirm(
            `Nonaktifkan package "${packageName}"?`,
        );

        if (!confirmed) {
            return;
        }

        try {
            setLoading(true);
            setError(null);

            await deleteProgramPackage(packageId);

            await refreshPrograms();
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to delete package",
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <section>
            <button
                type="button"
                onClick={handleCreateTestProgram}
                disabled={loading}
            >
                {loading ? "Processing..." : "Create Test Program"}
            </button>

            {error && (
                <p role="alert">
                    {error}
                </p>
            )}

            <div>
                {programs.map((program) => (
                    <article key={program.id}>
                        <h2>{program.name}</h2>

                        <p>
                            Category: {program.category}
                        </p>

                        <p>
                            Slug: {program.slug}
                        </p>

                        <p>
                            Packages: {program.program_packages.length}
                        </p>

                        <div>
                            <h3>Packages</h3>

                            {program.program_packages.length === 0 ? (
                                <p>No packages.</p>
                            ) : (
                                <ul>
                                    {program.program_packages.map((pkg) => (
                                        <li key={pkg.id}>
                                            <div>
                                                <strong>{pkg.name}</strong>
                                            </div>

                                            <div>
                                                Price: Rp {pkg.price.toLocaleString("id-ID")}
                                            </div>

                                            <div>
                                                Unit: {pkg.price_unit}
                                            </div>

                                            <div>
                                                Duration: {pkg.duration}
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleUpdatePackage(pkg.id)
                                                }
                                                disabled={loading}
                                            >
                                                Test Update Package
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDeletePackage(
                                                        pkg.id,
                                                        pkg.name,
                                                    )
                                                }
                                                disabled={loading}
                                            >
                                                Test Delete Package
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            <button
                                type="button"
                                onClick={() => handleCreatePackage(program)}
                                disabled={loading}
                            >
                                Test Create Package
                            </button>
                        </div>

                        <button
                            type="button"
                            onClick={() => handleUpdate(program)}
                            disabled={loading}
                        >
                            Test Update
                        </button>

                        <button
                            type="button"
                            onClick={() => handleDelete(program)}
                            disabled={loading}
                        >
                            Test Delete
                        </button>
                    </article>
                ))}
            </div>
        </section>
    );
}