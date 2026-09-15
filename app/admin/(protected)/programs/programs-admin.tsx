"use client";

import type { Program } from "@/lib/api/types";
import { ResourceManager } from "@/components/admin/resource-manager";

export default function ProgramsAdmin({
  initialPrograms,
}: {
  initialPrograms: Program[];
}) {
  return <ResourceManager resource="programs" initialItems={initialPrograms} />;
}
