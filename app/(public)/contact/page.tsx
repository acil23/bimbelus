// app/(public)/contact/page.tsx --- IGNORE ---

import { getContact } from "@/lib/api/contact";

export default async function ContactPage() {
  const contact = await getContact();

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-bold">Contact</h1>

      {(contact.email ||
        contact.instagram_url ||
        contact.facebook_url ||
        contact.tiktok_url ||
        contact.youtube_url) && (
        <div className="mt-6 space-y-2">
          {contact.email && (
            <p>
              Email:{" "}
              <a
                href={`mailto:${contact.email}`}
                className="underline"
              >
                {contact.email}
              </a>
            </p>
          )}

          {contact.instagram_url && (
            <p>
              Instagram:{" "}
              <a
                href={contact.instagram_url}
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {contact.instagram_url}
              </a>
            </p>
          )}

          {contact.facebook_url && (
            <p>
              Facebook:{" "}
              <a
                href={contact.facebook_url}
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {contact.facebook_url}
              </a>
            </p>
          )}

          {contact.tiktok_url && (
            <p>
              TikTok:{" "}
              <a
                href={contact.tiktok_url}
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {contact.tiktok_url}
              </a>
            </p>
          )}

          {contact.youtube_url && (
            <p>
              YouTube:{" "}
              <a
                href={contact.youtube_url}
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {contact.youtube_url}
              </a>
            </p>
          )}
        </div>
      )}

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {contact.contact_locations.map((location) => (
          <article
            key={location.id}
            className="rounded-2xl border p-6"
          >
            <h2 className="text-xl font-semibold">
              {location.label}
            </h2>

            <p className="mt-3 text-zinc-600">
              {location.address}
            </p>

            {location.phone && (
              <p className="mt-4">
                Telepon: {location.phone}
              </p>
            )}

            {location.whatsapp && (
              <p className="mt-1">
                WhatsApp: {location.whatsapp}
              </p>
            )}

            {location.contact_person && (
              <p className="mt-1">
                Kontak: {location.contact_person}
              </p>
            )}

            {location.google_maps_url && (
              <a
                href={location.google_maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block underline"
              >
                Lihat Google Maps
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}