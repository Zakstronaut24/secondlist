"use client";

import React from "react";
import Link from "next/link";
import {
  Bookmark,
  TrendingDown,
  Trash2,
  PackageOpen,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useMarketplace } from "@/context/MarketplaceContext";
import { ProductCard } from "@/components/ui/ProductCard";
import { formatRupiah } from "@/lib/utils";

export default function SavedItemsPage() {
  const { savedIds, products, toggleSave } = useMarketplace();

  // Find saved products
  const savedProducts = savedIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as (typeof products)[number][];

  // Check items with price drop
  const priceDroppedItems = savedProducts.filter(
    (p) => p.isPriceDrop || (p.originalPrice && p.originalPrice > p.price)
  );

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 pb-24">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-xs font-bold mb-2">
              <Bookmark className="w-3.5 h-3.5 text-teal-600" />
              <span>Wishlist Pribadi</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Barang Tersimpan
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Pantau harga barang favoritmu. Kami akan memberi tahu jika ada penurunan harga!
            </p>
          </div>

          <div className="text-right flex items-center gap-3">
            <span className="text-xs sm:text-sm font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl">
              {savedProducts.length} Barang
            </span>
          </div>
        </div>

        {/* Price Drop Alert Section */}
        {priceDroppedItems.length > 0 && (
          <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-rose-50 to-orange-50 border border-rose-200/80 shadow-xs">
            <div className="flex items-center gap-2 text-rose-700 font-extrabold text-sm sm:text-base mb-2">
              <TrendingDown className="w-5 h-5 text-rose-600" />
              <span>Hore! Ada Barang Tersimpan yang Turun Harga</span>
            </div>
            <p className="text-xs text-rose-800/80 mb-3">
              Penjual baru saja menurunkan harga untuk barang berikut:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {priceDroppedItems.map((item) => (
                <Link
                  key={item.id}
                  href={`/product/${item.id}`}
                  className="p-3 bg-white/90 hover:bg-white rounded-2xl border border-rose-200 flex items-center justify-between gap-3 transition-colors group"
                >
                  <div className="min-w-0">
                    <span className="font-bold text-xs text-slate-900 block truncate group-hover:text-rose-600 transition-colors">
                      {item.title}
                    </span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      {item.originalPrice && (
                        <span className="text-[11px] text-slate-400 line-through">
                          {formatRupiah(item.originalPrice)}
                        </span>
                      )}
                      <span className="text-xs font-black text-rose-600">
                        → {formatRupiah(item.price)}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-1 rounded bg-rose-100 text-rose-700 shrink-0">
                    Turun Harga
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Saved Items Grid or Empty State */}
        {savedProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {savedProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-10 sm:p-16 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-3xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4">
              <Bookmark className="w-8 h-8" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Belum Ada Barang yang Disimpan
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mt-1.5 mb-6 leading-relaxed">
              Klik ikon hati (❤️) pada kartu produk yang kamu sukai untuk membandingkan harga dan menyimpannya di sini.
            </p>
            <Link
              href="/search"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-teal-600/20 transition-all active:scale-95"
            >
              <span>Jelajahi Barang Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
