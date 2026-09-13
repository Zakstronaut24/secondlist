"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Star,
  CheckCircle2,
  ShoppingBag,
  Clock,
  Zap,
  Calendar,
  MapPin,
  ShieldCheck,
  PlusCircle,
  MessageSquare,
  PackageCheck,
  Share2,
  Check,
} from "lucide-react";
import { useMarketplace } from "@/context/MarketplaceContext";
import { CURRENT_USER, MOCK_SELLERS, MOCK_REVIEWS } from "@/lib/mock-data";
import { ProductCard } from "@/components/ui/ProductCard";
import { RatingStars } from "@/components/ui/RatingStars";
import { formatRupiah } from "@/lib/utils";

function ProfileContent() {
  const searchParams = useSearchParams();
  const sellerId = searchParams.get("sellerId");
  const { products } = useMarketplace();

  const [activeTab, setActiveTab] = useState<"for-sale" | "sold" | "reviews">("for-sale");
  const [copied, setCopied] = useState(false);

  // Check if viewing another seller or current user
  const targetUser = (sellerId && MOCK_SELLERS[sellerId]) ? MOCK_SELLERS[sellerId] : CURRENT_USER;
  const isMe = targetUser.id === CURRENT_USER.id;

  // Filter products for this user
  const userProducts = products.filter((p) => {
    if (isMe) {
      return p.seller.id === CURRENT_USER.id || p.id.startsWith("prod-custom-");
    }
    return p.seller.id === targetUser.id;
  });

  const activeListings = userProducts.filter((p) => p.status !== "sold");
  const soldListings = userProducts.filter((p) => p.status === "sold");

  // Reviews for this seller
  const sellerReviews = MOCK_REVIEWS.filter((r) => r.sellerId === targetUser.id);

  const handleShareProfile = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 pb-24">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Profile Card Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Avatar & User Details */}
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl overflow-hidden border-2 border-teal-600/30 shrink-0 shadow-md">
                <Image
                  src={targetUser.avatar}
                  alt={targetUser.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 truncate">
                    {targetUser.name}
                  </h1>
                  {targetUser.verified && (
                    <span title="Identitas Terverifikasi" className="inline-flex">
                      <CheckCircle2 className="w-5 h-5 text-teal-600 fill-teal-50" />
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-teal-600" />
                  <span>{targetUser.location}</span>
                </div>

                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <RatingStars rating={targetUser.rating} reviewsCount={targetUser.reviewsCount} size="md" />
                  <span className="text-slate-300">•</span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    Member sejak {targetUser.memberSince}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex sm:flex-col items-center gap-2 self-start sm:self-auto">
              {isMe ? (
                <Link
                  href="/sell"
                  className="px-4 py-2.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-xs transition-all"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Pasang Iklan Baru</span>
                </Link>
              ) : (
                <Link
                  href="/chat"
                  className="px-4 py-2.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-xs transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Kirim Pesan</span>
                </Link>
              )}

              <button
                type="button"
                onClick={handleShareProfile}
                className="px-3.5 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-teal-600" />
                    <span className="text-teal-700">Link Disalin!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Bagikan Profil</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100">
            <div className="p-3 bg-slate-50 rounded-2xl text-center">
              <span className="text-[11px] text-slate-400 block font-medium">Listing Aktif</span>
              <span className="text-lg font-black text-slate-900 mt-0.5 block">
                {activeListings.length}
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl text-center">
              <span className="text-[11px] text-slate-400 block font-medium">Barang Terjual</span>
              <span className="text-lg font-black text-teal-700 mt-0.5 block">
                {targetUser.soldCount}
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl text-center">
              <span className="text-[11px] text-slate-400 block font-medium">Tingkat Balas</span>
              <span className="text-lg font-black text-amber-600 mt-0.5 block">
                {targetUser.responseRate}
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl text-center">
              <span className="text-[11px] text-slate-400 block font-medium">Waktu Respon</span>
              <span className="text-lg font-black text-slate-900 mt-0.5 block">
                {targetUser.responseTime}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("for-sale")}
            className={`pb-3 px-4 font-bold text-sm transition-all border-b-2 ${
              activeTab === "for-sale"
                ? "border-teal-600 text-teal-700"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Barang Dijual ({activeListings.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("sold")}
            className={`pb-3 px-4 font-bold text-sm transition-all border-b-2 ${
              activeTab === "sold"
                ? "border-teal-600 text-teal-700"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Barang Terjual ({targetUser.soldCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("reviews")}
            className={`pb-3 px-4 font-bold text-sm transition-all border-b-2 ${
              activeTab === "reviews"
                ? "border-teal-600 text-teal-700"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Ulasan Pembeli ({targetUser.reviewsCount})
          </button>
        </div>

        {/* Tab 1: Active Listings */}
        {activeTab === "for-sale" && (
          <div>
            {activeListings.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
                {activeListings.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-8 text-center text-slate-400 border border-slate-200">
                <ShoppingBag className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                <p className="text-sm font-semibold text-slate-700">Belum ada barang yang sedang dijual.</p>
                {isMe && (
                  <Link
                    href="/sell"
                    className="inline-block mt-3 px-4 py-2 rounded-xl bg-teal-600 text-white font-bold text-xs"
                  >
                    Mulai Jual Barang
                  </Link>
                )}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Sold Listings */}
        {activeTab === "sold" && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-2">
              <PackageCheck className="w-5 h-5 text-teal-600" />
              <span>Daftar Transaksi Sukses ({targetUser.soldCount} barang telah terjual)</span>
            </div>

            <div className="divide-y divide-slate-100">
              {/* Sample simulated sold items */}
              {[
                { title: "MacBook Air M1 2020 256GB Space Grey", price: 8200000, date: "10 September 2026", buyer: "Fajar Nugraha" },
                { title: "Sepatu Converse 70s Hi Black White Size 42", price: 450000, date: "28 Agustus 2026", buyer: "Rian Hidayat" },
                { title: "Monitor Dell 24 Inch IPS Full HD", price: 1100000, date: "15 Agustus 2026", buyer: "Cindy Novita" },
              ].map((item, idx) => (
                <div key={idx} className="py-3.5 flex items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-bold text-slate-800 text-sm block">{item.title}</span>
                    <span className="text-slate-400 text-[11px]">Terjual ke {item.buyer} • {item.date}</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-extrabold text-teal-700 block">{formatRupiah(item.price)}</span>
                    <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 mt-0.5">
                      COD Berhasil
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Reviews */}
        {activeTab === "reviews" && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base">Ulasan dari Pembeli</h3>
              <RatingStars rating={targetUser.rating} reviewsCount={targetUser.reviewsCount} />
            </div>

            <div className="space-y-4 pt-2">
              {(sellerReviews.length > 0
                ? sellerReviews
                : [
                    {
                      id: "rev-sample",
                      reviewerName: "Budi Santoso",
                      reviewerAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
                      rating: 5,
                      comment: "Penjual ramah banget, tepat waktu pas COD di MRT Blok M. Barangnya bener-bener mulus sesuai deskripsi!",
                      date: "12 September 2026",
                      itemTitle: "Sony WH-1000XM4",
                    },
                    {
                      id: "rev-sample-2",
                      reviewerName: "Clarissa Dewi",
                      reviewerAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80",
                      rating: 5,
                      comment: "Fast response banget gak nyampe 5 menit dibalas. Nego santai dan jujur soal kondisi barang. Recommended seller!",
                      date: "5 September 2026",
                      itemTitle: "Buku Atomic Habits",
                    },
                  ]
              ).map((rev) => (
                <div key={rev.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-200">
                        <Image
                          src={rev.reviewerAvatar}
                          alt={rev.reviewerName}
                          fill
                          sizes="32px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="font-bold text-xs text-slate-900 block">{rev.reviewerName}</span>
                        <span className="text-[10px] text-slate-400">Membeli {rev.itemTitle}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-bold text-slate-800">{rev.rating}.0</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed italic">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                  <span className="text-[10px] text-slate-400 block text-right">{rev.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
          <div className="text-center text-slate-500 text-sm font-medium">
            Memuat profil pengguna...
          </div>
        </div>
      }
    >
      <ProfileContent />
    </Suspense>
  );
}
