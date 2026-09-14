import { getTutors } from "@/lib/api/tutors";
import TutorsAdmin from "./tutors-admin";
export const metadata={title:"Tutor"};
export default async function TutorsPage(){const tutors=await getTutors();return <><header className="admin-title"><span className="eyebrow">Tim pengajar</span><h1>Profil tutor</h1><p>Kelola profil, pendidikan, dan pengalaman setiap tutor.</p></header><TutorsAdmin initialTutors={tutors} /></>;}
