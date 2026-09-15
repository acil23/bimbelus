import { getPrograms } from "@/lib/api/programs";
import ProgramsAdmin from "./programs-admin";

export const metadata = { title: "Program" };

export default async function ProgramsPage() {
  const programs = await getPrograms();

  return (
    <>
      <header className="admin-title">
        <span className="eyebrow">Konten pembelajaran</span>
        <h1>Program & paket</h1>
        <p>Kelola informasi program, paket harga, dan ketersediaan konten publik.</p>
      </header>

      <ProgramsAdmin initialPrograms={programs} />
    </>
  );
}
