"use client";

import React from "react";
import { History } from "lucide-react";
import { useMarketplace } from "@/context/MarketplaceContext";
import { ProductCard } from "@/components/ui/ProductCard";

export function RecentlyViewedSection() {
  const { recentlyViewedIds, products } = useMarketplace();

  const viewedProducts = recentlyViewedIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  if (viewedProducts.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 border-t border-slate-200/60 mt-4">
      <div className="flex items-center gap-2 mb-4">
        <History className="w-5 h-5 text-slate-500" />
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
          Baru Saja Dilihat
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
        {viewedProducts.slice(0, 4).map((product) => (
          product && <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
