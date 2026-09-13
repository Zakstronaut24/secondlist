import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MarketplaceProvider } from "@/context/MarketplaceContext";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { LocationModal } from "@/components/modals/LocationModal";
import { OfferModal } from "@/components/modals/OfferModal";
import { ReportModal } from "@/components/modals/ReportModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Seconda - Marketplace Barang Bekas Komunitas Lokal",
  description:
    "Temukan barang bekas yang kamu butuhkan dengan lebih gampang, lebih dekat, lebih cepat, dan lebih murah.",
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
