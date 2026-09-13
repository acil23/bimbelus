import { getPrograms } from "@/lib/api/programs";
import ProgramsAdmin from "./programs-admin";

export default async function ProgramsPage() {
  const programs = await getPrograms();

  return (
    <main>
      <h1>Programs</h1>

      <p>
        Kelola program bimbingan belajar dan paket program.
      </p>

      <ProgramsAdmin initialPrograms={programs} />
    </main>
  );
}