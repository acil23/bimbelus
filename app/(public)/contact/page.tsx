import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { getContact } from "@/lib/api/contact";
import { webUrl, whatsappUrl } from "@/lib/ui/format";
import { PageIntro } from "@/components/ui/page-intro";
import { EmptyState } from "@/components/ui/empty-state";

export const metadata = { title: "Kontak & Lokasi" };

export default async function ContactPage() {
  const contact = await getContact();

  const socials = [
    {
      label: "Instagram",
      value: contact.instagram_url,
      icon: "/brands/Instagram_Glyph_Gradient.svg",
    },
    {
      label: "YouTube",
      value: contact.youtube_url,
      icon: "/brands/yt_icon_red_digital.png",
    },
    {
      label: "TikTok",
      value: contact.tiktok_url,
      icon: "/brands/TIKTOK_SOCIAL_ICON_CIRCLE_WHITE.svg",
    },
    {
      label: "Facebook",
      value: contact.facebook_url,
      icon: null,
    },
  ];

  const renderContactEmail = contact.email ? (
    <div className="contact-row">
      <Mail size={20} aria-hidden="true" />
      <a href={`mailto:${contact.email}`}>{contact.email}</a>
    </div>
  ) : (
    <p className="muted">
      Gunakan informasi kontak cabang di bawah untuk menghubungi kami.
    </p>
  );

  const renderSocialLinks = socials.map(({ label, value, icon }) => {
    const href = webUrl(value);

    if (!href) return null;

    return (
      <a
        key={label}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-outline btn-small social-btn"
      >
        {icon && (
          <img
            src={icon}
            alt=""
            aria-hidden="true"
            className="social-icon"
          />
        )}
        <span>{label}</span>
        <span aria-hidden="true">↗</span>
      </a>
    );
  });

  const renderLocations = contact.contact_locations.length ? (
    <div className="grid-2">
      {contact.contact_locations.map((location) => {
        const whatsapp = whatsappUrl(location.whatsapp);
        const maps = webUrl(location.google_maps_url);
        const phoneHref = location.phone
          ? `tel:${location.phone.replace(/[^+\d]/g, "")}`
          : undefined;

        return (
          <article className="card contact-card" key={location.id}>
            <h3>{location.label || "Cabang Bimbel YS"}</h3>

            <div className="contact-row">
              <MapPin size={20} aria-hidden="true" />
              <p className="pre-line">{location.address}</p>
            </div>

            {location.contact_person && (
              <p className="small muted">Kontak: {location.contact_person}</p>
            )}

            {location.phone && (
              <div className="contact-row">
                <Phone size={20} aria-hidden="true" />
                <a href={phoneHref}>{location.phone}</a>
              </div>
            )}

            {location.whatsapp && !whatsapp && <p>WhatsApp: {location.whatsapp}</p>}

            <div className="actions">
              {whatsapp && (
                <a
                  className="btn btn-gold"
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              )}

              {maps && (
                <a
                  className="btn btn-outline"
                  href={maps}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Lihat peta ↗
                </a>
              )}
            </div>
          </article>
        );
      })}
    </div>
  ) : (
    <EmptyState
      title="Lokasi belum tersedia"
      description="Informasi cabang akan ditampilkan setelah tersedia."
    />
  );

  return (
    <>
      <PageIntro
        eyebrow="Kontak"
        title="Mari bicarakan langkah belajarmu."
        description="Tanyakan program, jadwal, dan pilihan lokasi. Kami siap membantu menemukan informasi yang kamu butuhkan."
      />

      <section className="section container stack">
        <div className="grid-2">
          <article className="card contact-card">
            <span className="feature-icon">
              <MessageCircle size={25} aria-hidden="true" />
            </span>

            <h2>Terhubung dengan kami</h2>
            {renderContactEmail}

            <div className="actions">{renderSocialLinks}</div>
          </article>

          <article className="card rich-panel stack">
            <span className="eyebrow">Sebelum menghubungi</span>
            <h2>Mulai dari kebutuhanmu.</h2>
            <p className="muted">
              Sampaikan jenjang pendidikan, mata pelajaran, target belajar, dan
              waktu yang kamu inginkan agar tim kami bisa membantu dengan lebih
              tepat.
            </p>
            <p className="small muted">
              Pendaftaran dan konfirmasi ketersediaan program dilakukan bersama
              tim Bimbel YS, bukan melalui pembayaran di website ini.
            </p>
          </article>
        </div>

        <h2 style={{ marginTop: "2rem" }}>Lokasi belajar</h2>
        {renderLocations}
      </section>
    </>
  );
}