import { getContact } from "@/lib/api/contact";
import ContactAdmin from "./contact-admin";

export default async function ContactPage() {
  const contact = await getContact();

  return (
    <main>
      <h1>Contact</h1>

      <p>
        Kelola informasi kontak dan lokasi Bimbel YS.
      </p>

      <ContactAdmin initialContact={contact} />
    </main>
  );
}