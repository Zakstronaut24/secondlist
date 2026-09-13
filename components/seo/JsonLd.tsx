import React from "react";

export function JsonLd() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://secondlist.vercel.app");

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Seconda Marketplace",
        description:
          "Platform jual-beli barang bekas lokal berbasis komunitas. Temukan smartphone, laptop, pakaian, perabot dan sepeda dengan harga lebih murah dan siap COD hari ini.",
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
        potentialAction: [
          {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${siteUrl}/search?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          },
        ],
        inLanguage: "id-ID",
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Seconda Marketplace",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/logo.png`,
        },
        sameAs: [],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
