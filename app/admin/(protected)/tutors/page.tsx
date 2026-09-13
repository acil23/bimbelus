import { getTutors } from "@/lib/api/tutors";
import TutorsAdmin from "./tutors-admin";

export default async function TutorsPage() {
  const tutors = await getTutors();

  return (
    <main>
      <h1>Tutors</h1>

      <p>
        Kelola data tutor, pendidikan, dan pengalaman.
      </p>

      <TutorsAdmin initialTutors={tutors} />
    </main>
  );
}