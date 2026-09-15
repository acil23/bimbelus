"use client";

import { useState } from "react";
import { getContact, updateContact } from "@/lib/api/contact";
import type { Contact } from "@/lib/api/types";
import { updateContactInformationSchema } from "@/modules/contact/contact.validation";
import { RecordForm } from "@/components/admin/record-form";
import { contactForm } from "@/components/admin/resources";
import { ResourceManager } from "@/components/admin/resource-manager";

export default function ContactAdmin({
  initialContact,
}: {
  initialContact: Contact;
}) {
  const [contact, setContact] = useState(initialContact);
  const [warning, setWarning] = useState("");

  async function save(data: unknown) {
    const saved = await updateContact(updateContactInformationSchema.parse(data));
    setContact(saved);
    setWarning("");

    try {
      setContact(await getContact());
    } catch {
      setWarning(
        "Perubahan tersimpan, tetapi pembacaan ulang gagal. Muat ulang untuk menyegarkan data.",
      );
    }
  }

  return (
    <div className="stack">
      <section className="card rich-panel">
        <h2>Kontak & media sosial</h2>

        {warning && (
          <div className="alert" role="status">
            {warning}
          </div>
        )}

        <RecordForm spec={contactForm} initial={contact} onSave={save} />
      </section>

      <ResourceManager resource="locations" initialItems={contact.contact_locations} />
    </div>
  );
}
