import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MarketplaceProvider } from "@/context/MarketplaceContext";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { LocationModal } from "@/components/modals/LocationModal";
import { OfferModal } from "@/components/modals/OfferModal";
import { ReportModal } from "@/components/modals/ReportModal";
import { JsonLd } from "@/components/seo/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://secondlist.vercel.app");

export const viewport: Viewport = {
  themeColor: "#0f766e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Seconda - Marketplace Barang Bekas Komunitas Terdekat",
    template: "%s | Seconda Marketplace",
  },
  description:
    "Platform jual-beli barang bekas lokal terpercaya. Temukan iPhone, keyboard, laptop, sepeda, baju, dan perabot dengan harga terjangkau di sekitarmu. Siap COD hari ini!",
  keywords: [
    "marketplace barang bekas",
    "jual beli barang bekas",
    "secondhand marketplace indonesia",
    "thrifting online",
    "COD barang bekas terdekat",
    "Seconda",
    "elektronik bekas jakarta",
    "gadget murah bekas",
    "furniture bekas",
    "komunitas jual beli lokal",
    "preloved indonesia",
  ],
  authors: [{ name: "Seconda Community", url: siteUrl }],
  creator: "Seconda",
  publisher: "Seconda Marketplace",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Seconda - Marketplace Barang Bekas Komunitas Terdekat",
    description:
      "Temukan barang bekas berkualitas di dekatmu dengan lebih gampang, lebih dekat, dan lebih hemat. Transaksi aman, negosiasi langsung, siap COD.",
    url: siteUrl,
    siteName: "Seconda Marketplace",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Seconda - Marketplace Barang Bekas Komunitas Terdekat",
    description:
      "Temukan barang bekas berkualitas di dekatmu dengan lebih gampang, lebih dekat, dan lebih hemat. Siap COD hari ini!",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "5baf3c3ddd96d92a",
  },
  category: "marketplace",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <JsonLd />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 selection:bg-teal-100 selection:text-teal-900">
        <MarketplaceProvider>
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
          <BottomNav />
          <LocationModal />
          <OfferModal />
          <ReportModal />
        </MarketplaceProvider>
      </body>
    </html>
  );
}
