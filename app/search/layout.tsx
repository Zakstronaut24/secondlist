import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cari Barang Bekas Terdekat",
  description:
    "Cari dan temukan ribuan barang bekas berkualitas di sekitar lokasimu. Filter berdasarkan radius jarak, kategori gadget, pakaian, perabot, dan harga termurah.",
  alternates: {
    canonical: "/search",
  },
  openGraph: {
    title: "Cari Barang Bekas Terdekat | Seconda Marketplace",
    description:
      "Temukan barang bekas terdekat dengan filter jarak, kondisi, dan harga terbaik di sekitarmu.",
  },
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
