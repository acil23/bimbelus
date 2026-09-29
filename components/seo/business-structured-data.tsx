type BusinessStructuredDataProps = {
  logoUrl?: string | null;
  instagramUrl?: string | null;
  facebookUrl?: string | null;
  tiktokUrl?: string | null;
  youtubeUrl?: string | null;
};

const SITE_URL = "https://bimbelys.me";

export function BusinessStructuredData({
  logoUrl,
  instagramUrl,
  facebookUrl,
  tiktokUrl,
  youtubeUrl,
}: BusinessStructuredDataProps) {
  const sameAs = [
    instagramUrl,
    facebookUrl,
    tiktokUrl,
    youtubeUrl,
  ].filter((url): url is string => Boolean(url));

  const organization: Record<string, unknown> = {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Bimbel YS",
    url: SITE_URL,
    description:
      "Bimbingan belajar untuk siswa SD, SMP, SMA, olimpiade, dan persiapan pendidikan di Dharmasraya.",
  };

  if (logoUrl) {
    organization.logo = {
      "@type": "ImageObject",
      url: logoUrl,
    };
  }

  if (sameAs.length > 0) {
    organization.sameAs = sameAs;
  }

  const locations = [
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/contact#sungai-kambut`,
      name: "Bimbel YS",
      url: `${SITE_URL}/contact#sungai-kambut`,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Komplek Sakinah",
        addressLocality: "Sungai Kambut",
        addressRegion: "Sumatera Barat",
        addressCountry: "ID",
      },
      telephone: "+6282170108406",
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/contact#sungai-duo`,
      name: "Bimbel YS",
      url: `${SITE_URL}/contact#sungai-duo`,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Blok B, Situing I",
        addressLocality: "Sungai Duo",
        addressRegion: "Sumatera Barat",
        addressCountry: "ID",
      },
      telephone: "+6285314843296",
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      ...locations,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}