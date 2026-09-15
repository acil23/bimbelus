import { getContact } from "@/lib/api/contact";
import ContactAdmin from "./contact-admin";

export const metadata = { title: "Kontak dan Lokasi" };

export default async function ContactPage() {
  const contact = await getContact();

  return (
    <>
      <header className="admin-title">
        <span className="eyebrow">Hubungan & informasi</span>
        <h1>Kontak & lokasi</h1>
        <p>Pastikan calon siswa dapat menemukan cabang dan menghubungi tim yang tepat.</p>
      </header>

      <ContactAdmin initialContact={contact} />
    </>
  );
}
