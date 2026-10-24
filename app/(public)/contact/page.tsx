import {
  Mail,
  MapPin,
  Phone,
  MessageCircle,
  Compass,
  CheckCircle2,
  Sparkles,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import { getContact } from "@/lib/api/contact";
import { webUrl, whatsappUrl } from "@/lib/ui/format";
import { PageIntro } from "@/components/ui/page-intro";
import { EmptyState } from "@/components/ui/empty-state";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontak Bimbel YS | Sungai Kambut & Sungai Duo",
  description:
    "Temukan informasi kontak dan lokasi Bimbel YS di Sungai Kambut dan Sungai Duo, Dharmasraya.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Kontak Bimbel YS | Sungai Kambut & Sungai Duo",
    description:
      "Temukan informasi kontak dan lokasi Bimbel YS di Sungai Kambut dan Sungai Duo, Dharmasraya.",
    url: "/contact",
    type: "website",
    locale: "id_ID",
    siteName: "Bimbel YS",
  },
};

const enrollmentSteps = [
  {
    no: "01",
    title: "Sampaikan Jenjang & Target Belajar",
    desc: "Informasikan kelas siswa saat ini (SD, SMP, atau SMA) serta mata pelajaran atau target ujian/olimpiade yang ingin difokuskan.",
    accent: "#2E8BC0",
  },
  {
    no: "02",
    title: "Pilih Paket & Jadwal Pertemuan",
    desc: "Tim akademik membantu merekomendasikan program belajar dan jadwal kelas kondusif di cabang Sungai Kambut atau Sungai Duo.",
    accent: "#F4A261",
  },
  {
    no: "03",
    title: "Mulai Sesi Pendampingan Intensif",
    desc: "Konfirmasi pendaftaran bersama tim cabang dan mulai perjalanan belajar terarah bersama mentor Bimbel YS.",
    accent: "#E76F51",
  },
];

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

  const primaryWa = contact.contact_locations
    .map((loc) => whatsappUrl(loc.whatsapp))
    .find(Boolean);

  const renderContactEmail = contact.email ? (
    <div className="contact-info-pill">
      <span className="contact-info-icon">
        <Mail size={18} aria-hidden="true" />
      </span>
      <div>
        <span className="block text-[11px] font-bold uppercase tracking-wider text-[#6B7280]">
          Email Resmi
        </span>
        <a
          href={`mailto:${contact.email}`}
          className="text-sm font-extrabold text-[#2E8BC0] hover:underline"
        >
          {contact.email}
        </a>
      </div>
    </div>
  ) : (
    <div className="contact-info-pill">
      <span className="contact-info-icon">
        <Clock size={18} aria-hidden="true" />
      </span>
      <div>
        <span className="block text-[11px] font-bold uppercase tracking-wider text-[#6B7280]">
          Layanan Konsultasi
        </span>
        <span className="text-sm font-bold text-[#1F2937]">
          Senin – Sabtu · 08.00 – 20.00 WIB
        </span>
      </div>
    </div>
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
        className="btn btn-glass btn-small social-btn"
      >
        {icon && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={icon}
            alt=""
            aria-hidden="true"
            width={18}
            height={18}
            className="social-icon"
          />
        )}
        <span>{label}</span>
        <ArrowUpRight size={14} aria-hidden="true" />
      </a>
    );
  });

  const renderLocations = contact.contact_locations.length ? (
    <div className="grid-2">
      {contact.contact_locations.map((location, index) => {
        const whatsapp = whatsappUrl(location.whatsapp);
        const maps = webUrl(location.google_maps_url);
        const phoneHref = location.phone
          ? `tel:${location.phone.replace(/[^+\d]/g, "")}`
          : undefined;
        const locationId =
          location.label?.toLowerCase().includes("sungai kambut")
            ? "sungai-kambut"
            : location.label?.toLowerCase().includes("sungai duo")
              ? "sungai-duo"
              : undefined;

        return (
          <ScrollReveal key={location.id} delay={index * 0.08}>
            <article className="clay-card card-hover overflow-hidden h-full flex flex-col" id={locationId}>
              <div className="terminal-bar">
                <span className="inline-flex items-center gap-1.5 text-[#2E8BC0] font-extrabold">
                  <Compass size={14} aria-hidden="true" />
                  <span>CABANG BELAJAR 0{index + 1}</span>
                </span>
                <span className="status-pill">
                  <span className="status-dot" aria-hidden="true" />
                  Aktif Menerima Siswa
                </span>
              </div>

              <div className="contact-card flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="badge badge-gold mb-2">Lokasi Studio</span>
                    <h3 className="text-xl font-extrabold text-[#1F2937]">
                      {location.label || "Cabang Bimbel YS"}
                    </h3>
                  </div>
                </div>

                <div className="contact-row">
                  <span className="contact-row-icon">
                    <MapPin size={18} aria-hidden="true" />
                  </span>
                  <p className="pre-line text-sm font-medium text-[#4B5563]">
                    {location.address}
                  </p>
                </div>

                {location.contact_person && (
                  <p className="text-xs font-bold text-[#2E8BC0] bg-[#2E8BC0]/10 px-3 py-1.5 rounded-xl w-fit">
                    Narahubung Cabang: {location.contact_person}
                  </p>
                )}

                {location.phone && (
                  <div className="contact-row">
                    <span className="contact-row-icon">
                      <Phone size={18} aria-hidden="true" />
                    </span>
                    <a
                      href={phoneHref}
                      className="text-sm font-bold text-[#1F2937] hover:text-[#2E8BC0]"
                    >
                      {location.phone}
                    </a>
                  </div>
                )}

                {location.whatsapp && !whatsapp && (
                  <p className="text-sm font-semibold text-[#1F2937]">
                    WhatsApp: {location.whatsapp}
                  </p>
                )}

                <div className="ticket-divider mt-auto" aria-hidden="true" />

                <div className="actions pt-1">
                  {whatsapp && (
                    <a
                      className="btn-hero-blue"
                      href={whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle size={16} aria-hidden="true" className="mr-2" />
                      <span>Chat WhatsApp Cabang</span>
                    </a>
                  )}

                  {maps && (
                    <a
                      className="btn btn-glass"
                      href={maps}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Lihat Google Maps</span>
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          </ScrollReveal>
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
        eyebrow="Konsultasi & Lokasi Cabang"
        title="Mari bicarakan langkah belajarmu."
        description="Tanyakan program, jadwal kelas, dan pilihan lokasi belajar di Sungai Kambut maupun Sungai Duo. Tim kami siap membantu menemukan pendampingan yang paling tepat."
        breadcrumbs={[
          {
            label: "Beranda",
            href: "/",
          },
          {
            label: "Kontak",
          },
        ]}
      />

      <section className="section container stack">
        {/* Soft Futurism Consultation & 3-Step Enrollment Bento */}
        <div className="bento-blueprint">
          <ScrollReveal>
            <article className="clay-card contact-card h-full flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="feature-icon !mb-0">
                    <MessageCircle size={24} aria-hidden="true" />
                  </span>
                  <span className="badge">Respon Cepat &amp; Ramah</span>
                </div>

                <h2 className="text-2xl font-extrabold text-[#1F2937]">
                  Terhubung langsung dengan tim akademik kami
                </h2>

                <p className="text-[#4B5563] text-sm leading-relaxed">
                  Bingung menentukan program reguler, intensif ujian, atau persiapan
                  olimpiade? Konsultasikan kebutuhan belajar putra-putri Anda secara
                  gratis bersama tim Bimbel YS.
                </p>

                {renderContactEmail}
              </div>

              <div className="space-y-4 pt-4 border-t border-dashed border-slate-200">
                {primaryWa && (
                  <a
                    href={primaryWa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-hero-blue w-full justify-center"
                  >
                    <Sparkles size={16} aria-hidden="true" className="mr-2" />
                    <span>Konsultasi Cepat via WhatsApp</span>
                  </a>
                )}

                <div className="actions">{renderSocialLinks}</div>
              </div>
            </article>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <article className="clay-card overflow-hidden h-full">
              <div className="terminal-bar">
                <span className="inline-flex items-center gap-1.5 text-[#2E8BC0] font-extrabold">
                  <CheckCircle2 size={14} aria-hidden="true" />
                  <span>ALUR KONSULTASI &amp; PENDAFTARAN</span>
                </span>
                <span className="font-bold text-[#F4A261]">3 Langkah Mudah</span>
              </div>

              <div className="rich-panel space-y-5">
                <h2 className="text-2xl font-extrabold text-[#1F2937]">
                  Mulai dari kebutuhan belajarmu.
                </h2>

                <div className="grid gap-3.5">
                  {enrollmentSteps.map((step) => (
                    <div
                      key={step.no}
                      className="enrollment-step-card"
                    >
                      <span
                        className="enrollment-step-badge"
                        style={{
                          background: `${step.accent}18`,
                          color: step.accent,
                          borderColor: `${step.accent}38`,
                        }}
                      >
                        {step.no}
                      </span>
                      <div>
                        <strong className="block text-sm font-extrabold text-[#1F2937]">
                          {step.title}
                        </strong>
                        <p className="text-xs text-[#4B5563] mt-1 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-xs font-medium text-[#6B7280] pt-3 border-t border-dashed border-slate-200">
                  Pendaftaran dan konfirmasi ketersediaan kursi kelas dilakukan
                  langsung bersama admin cabang Bimbel YS secara transparan.
                </p>
              </div>
            </article>
          </ScrollReveal>
        </div>

        <div className="pt-4">
          <span className="eyebrow">Cabang Belajar Resmi</span>
          <h2 className="text-2xl font-extrabold text-[#1F2937] mb-6">
            Lokasi Studio Bimbel YS di Dharmasraya
          </h2>
          {renderLocations}
        </div>
      </section>
    </>
  );
}
