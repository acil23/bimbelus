"use client";

import { useState } from "react";

import {
  createContactLocation,
  deleteContactLocation,
  getContact,
  updateContact,
  updateContactLocation,
} from "@/lib/api/contact";

import type { Contact } from "@/lib/api/types";

type ContactAdminProps = {
  initialContact: Contact;
};

export default function ContactAdmin({
  initialContact,
}: ContactAdminProps) {
  const [contact, setContact] =
    useState(initialContact);

  const [loading, setLoading] = useState(false);
  const [error, setError] =
    useState<string | null>(null);

  async function refreshContact() {
    const latestContact = await getContact();
    setContact(latestContact);
  }

  async function handleUpdateContact() {
    try {
      setLoading(true);
      setError(null);

      await updateContact({
        email: "c6-test@example.com",
      });

      await refreshContact();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to update contact",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateLocation() {
    try {
      setLoading(true);
      setError(null);

      await createContactLocation({
        label: "C6 Test Location",
        address:
          "Temporary address for C-6.5 testing",
        phone: "080000000000",
        whatsapp: "080000000000",
        contact_person: "C6 Test Contact",
        google_maps_url: null,
        is_active: true,
        display_order:
          contact.contact_locations.length + 1,
      });

      await refreshContact();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to create location",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateLocation(
    locationId: string,
  ) {
    try {
      setLoading(true);
      setError(null);

      await updateContactLocation(locationId, {
        label: "C6 Updated Location",
      });

      await refreshContact();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to update location",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteLocation(
    locationId: string,
    label: string,
  ) {
    const confirmed = window.confirm(
      `Nonaktifkan location "${label}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await deleteContactLocation(locationId);

      await refreshContact();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to delete location",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleRestoreContact() {
    try {
      setLoading(true);
      setError(null);

      await updateContact({
        email: null,
      });

      await refreshContact();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to restore contact",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      {error && (
        <p role="alert">
          {error}
        </p>
      )}

      <article>
        <h2>Contact Information</h2>

        <p>
          Email: {contact.email ?? "-"}
        </p>

        <p>
          Instagram:{" "}
          {contact.instagram_url ?? "-"}
        </p>

        <p>
          Facebook:{" "}
          {contact.facebook_url ?? "-"}
        </p>

        <p>
          TikTok: {contact.tiktok_url ?? "-"}
        </p>

        <p>
          YouTube:{" "}
          {contact.youtube_url ?? "-"}
        </p>

        <button
          type="button"
          onClick={handleUpdateContact}
          disabled={loading}
        >
          Test Update Contact
        </button>

        <button
          type="button"
          onClick={handleRestoreContact}
          disabled={loading}
        >
          Restore Contact
        </button>
      </article>

      <article>
        <h2>Locations</h2>

        {contact.contact_locations.length === 0 ? (
          <p>No locations.</p>
        ) : (
          <ul>
            {contact.contact_locations.map(
              (location) => (
                <li key={location.id}>
                  <strong>
                    {location.label}
                  </strong>

                  <p>
                    Address: {location.address}
                  </p>

                  <p>
                    Phone:{" "}
                    {location.phone ?? "-"}
                  </p>

                  <p>
                    WhatsApp:{" "}
                    {location.whatsapp ?? "-"}
                  </p>

                  <p>
                    Contact Person:{" "}
                    {location.contact_person ??
                      "-"}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      handleUpdateLocation(
                        location.id,
                      )
                    }
                    disabled={loading}
                  >
                    Test Update Location
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDeleteLocation(
                        location.id,
                        location.label,
                      )
                    }
                    disabled={loading}
                  >
                    Test Delete Location
                  </button>
                </li>
              ),
            )}
          </ul>
        )}

        <button
          type="button"
          onClick={handleCreateLocation}
          disabled={loading}
        >
          Test Create Location
        </button>
      </article>
    </section>
  );
}
