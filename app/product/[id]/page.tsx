"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  MessageSquare,
  Tag,
  Heart,
  Share2,
  MapPin,
  Clock,
  ChevronRight,
  ShieldCheck,
  Flag,
  ArrowLeft,
  Check,
  AlertCircle,
} from "lucide-react";
import { useMarketplace } from "@/context/MarketplaceContext";
import { ProductGallery } from "@/components/product/ProductGallery";
import { SellerCard } from "@/components/product/SellerCard";
import { ConditionBadge } from "@/components/ui/Badge";
import { ProductCard } from "@/components/ui/ProductCard";
import { SafetyBanner } from "@/components/ui/SafetyBanner";
import { formatRupiah, formatDistance } from "@/lib/utils";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

  const {
    products,
    isSaved,
    toggleSave,
    addRecentlyViewed,
    startOrGetConversation,
    openOfferModal,
    openReportModal,
  } = useMarketplace();

  const [copied, setCopied] = useState(false);

  // Find target product
  const product = products.find((p) => p.id === productId);

  // Add to recently viewed on mount
  useEffect(() => {
    if (productId) {
      addRecentlyViewed(productId);
    }
  }, [productId, addRecentlyViewed]);

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-3xl bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Barang Tidak Ditemukan</h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mt-1 mb-6">
          Iklan barang ini mungkin sudah laku terjual atau dihapus oleh penjualnya.
        </p>
        <Link
          href="/search"
          className="px-5 py-2.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm transition-all"
        >
          Cari Barang Lainnya
        </Link>
      </div>
    );
  }

  const saved = isSaved(product.id);

  // Similar items (same category, not current item)
  const similarItems = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleChatSeller = () => {
    const convId = startOrGetConversation(product);
    router.push("/chat");
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-slate-200/80 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-teal-700 transition-colors">
            Beranda
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link
            href={`/search?category=${encodeURIComponent(product.category)}`}
            className="hover:text-teal-700 transition-colors"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-semibold truncate max-w-[200px] sm:max-w-md">
            {product.title}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Gallery & Details (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Gallery */}
            <ProductGallery product={product} />

            {/* Description Box */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
              <h3 className="font-extrabold text-slate-900 text-lg">Deskripsi Barang</h3>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {product.description}
              </p>

              {/* Meet-up Spot if specified */}
              {product.meetUpPreference && (
                <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-100 flex items-start gap-3 mt-4">
                  <MapPin className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-teal-900 text-xs sm:text-sm block">
                      Preferensi Lokasi Ketemuan / COD:
                    </span>
                    <span className="text-xs text-teal-800 mt-0.5 block">
                      {product.meetUpPreference}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Safety Reminder Banner */}
            <SafetyBanner />
          </div>

          {/* Right Column: Pricing, CTAs & Seller Profile (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Main Info Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
              {/* Category & Condition Row */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md">
                  {product.category}
                </span>
                <ConditionBadge condition={product.condition} />
              </div>

              {/* Title */}
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                {product.title}
              </h1>

              {/* Price Section */}
              <div className="pt-2 border-t border-slate-100">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-3xl sm:text-4xl font-black text-teal-700 tracking-tight">
                    {formatRupiah(product.price)}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm text-slate-400 line-through">
                        {formatRupiah(product.originalPrice)}
                      </span>
                      <span className="text-xs font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
                        Hemat {Math.round((1 - product.price / product.originalPrice) * 100)}%
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Location & Time Info */}
              <div className="space-y-2 py-3 border-y border-slate-100 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-teal-600 shrink-0" />
                  <span className="font-bold text-slate-900">
                    {formatDistance(product.distanceKm)}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span>{product.district}, {product.city}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Diunggah {product.postedAt}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleChatSeller}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md shadow-teal-600/20 active:scale-98 transition-all"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Chat Penjual Sekarang</span>
                </button>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => openOfferModal(product)}
                    className="py-3 px-4 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors active:scale-98"
                  >
                    <Tag className="w-4 h-4 text-amber-700" />
                    <span>Tawar Harga</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleSave(product.id)}
                    className={`py-3 px-4 rounded-2xl border font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors active:scale-98 ${
                      saved
                        ? "bg-rose-50 border-rose-200 text-rose-600"
                        : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${saved ? "fill-rose-500 text-rose-500" : ""}`} />
                    <span>{saved ? "Tersimpan" : "Simpan"}</span>
                  </button>
                </div>

                {/* Share Button */}
                <button
                  type="button"
                  onClick={handleShare}
                  className="w-full py-2.5 px-4 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-600 flex items-center justify-center gap-1.5 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-teal-600" />
                      <span className="text-teal-700">Link Berhasil Disalin!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4" />
                      <span>Bagikan Iklan Ini</span>
                    </>
                  )}
                </button>
              </div>

              {/* Report Listing */}
              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => openReportModal(product.title, product.seller.name)}
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 hover:text-rose-600 transition-colors"
                >
                  <Flag className="w-3 h-3" />
                  <span>Laporkan Iklan Ini</span>
                </button>
              </div>
            </div>

            {/* Seller Information Card */}
            <SellerCard seller={product.seller} itemTitle={product.title} />
          </div>
        </div>

        {/* Similar Items Shelf */}
        {similarItems.length > 0 && (
          <div className="mt-12 pt-8 border-t border-slate-200/80">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">
                  Barang Serupa Lainnya ({product.category})
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Pilihan lain yang mungkin cocok dengan kebutuhanmu
                </p>
              </div>
              <Link
                href={`/search?category=${encodeURIComponent(product.category)}`}
                className="text-xs font-bold text-teal-700 hover:underline"
              >
                Lihat Semua di {product.category}
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
              {similarItems.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
