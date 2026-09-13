"use client";

import React from "react";
import { MapPin, Sparkles, Flame, Tag, ShieldCheck } from "lucide-react";
import { useMarketplace } from "@/context/MarketplaceContext";
import { HeroSearch } from "@/components/home/HeroSearch";
import { CategorySection } from "@/components/home/CategorySection";
import { ProductSection } from "@/components/home/ProductSection";
import { CommunityValuesBanner } from "@/components/home/CommunityValuesBanner";
import { RecentlyViewedSection } from "@/components/home/RecentlyViewedSection";
import { SafetyBanner } from "@/components/ui/SafetyBanner";

export default function HomePage() {
  const { products, currentLocation } = useMarketplace();

  // 1. Items Near You (sort by distance or distance <= 3km)
  const nearbyProducts = [...products]
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, 8);

  // 2. Freshly Listed (newest first, includes user custom listings)
  const freshlyListed = [...products]
    .filter((p) => p.isNewListing || p.id.startsWith("prod-custom-") || p.postedAt.includes("menit") || p.postedAt.includes("jam"))
    .slice(0, 8);

  // 3. Good Deals
  const goodDeals = products.filter((p) => p.isGoodDeal).slice(0, 8);

  // 4. Price Drops
  const priceDrops = products.filter((p) => p.isPriceDrop).slice(0, 8);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Hero & Search Engine */}
      <HeroSearch />

      {/* Category Navigation */}
      <CategorySection />

      {/* Items Near You */}
      <ProductSection
        title="Barang Terdekat dari Kamu"
        subtitle={`Rekomendasi barang bekas di sekitar ${currentLocation.district}, ${currentLocation.city}`}
        icon={<MapPin className="w-5 h-5 text-teal-600" />}
        products={nearbyProducts}
        viewAllHref="/search?sort=distance"
        badgeText={`Dekat ${currentLocation.district}`}
      />

      {/* Freshly Listed */}
      <ProductSection
        title="Baru Saja Ditayangkan"
        subtitle="Barang bekas baru diunggah oleh warga komunitas hari ini"
        icon={<Sparkles className="w-5 h-5 text-emerald-600" />}
        products={freshlyListed}
        viewAllHref="/search?sort=newest"
        badgeText="Fresh"
      />

      {/* Mid-page Community Flow Banner */}
      <CommunityValuesBanner />

      {/* Good Deals */}
      <ProductSection
        title="Penawaran Terbaik (Good Deals)"
        subtitle="Barang berkualitas dengan selisih harga jauh lebih murah dari baru"
        icon={<Flame className="w-5 h-5 text-amber-500" />}
        products={goodDeals}
        viewAllHref="/search?deals=true"
        badgeText="Hemat s/d 60%"
      />

      {/* Price Drops */}
      {priceDrops.length > 0 && (
        <ProductSection
          title="Turun Harga Hari Ini"
          subtitle="Penjual baru saja menurunkan harga barang-barang ini"
          icon={<Tag className="w-5 h-5 text-rose-500" />}
          products={priceDrops}
          viewAllHref="/search?priceDrop=true"
          badgeText="Price Drop"
        />
      )}

      {/* Safety Notice in Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <SafetyBanner />
      </div>

      {/* Recently Viewed */}
      <RecentlyViewedSection />
    </div>
  );
}
