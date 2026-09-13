"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  Zap,
  ShoppingBag,
  Calendar,
  ShieldAlert,
  Ban,
  UserCheck,
} from "lucide-react";
import { Seller } from "@/lib/types";
import { RatingStars } from "@/components/ui/RatingStars";
import { useMarketplace } from "@/context/MarketplaceContext";

interface SellerCardProps {
  seller: Seller;
  itemTitle?: string;
}

export function SellerCard({ seller, itemTitle }: SellerCardProps) {
  const { openReportModal } = useMarketplace();
  const [isBlocked, setIsBlocked] = useState(false);

  const handleBlock = () => {
    if (confirm(`Apakah Anda yakin ingin memblokir penjual "${seller.name}"? Anda tidak akan melihat barang dari penjual ini lagi.`)) {
      setIsBlocked(true);
    }
  };

  if (isBlocked) {
    return (
      <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-center text-xs text-slate-500">
        <Ban className="w-5 h-5 text-slate-400 mx-auto mb-1" />
        <span>Penjual ini telah Anda blokir.</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-4">
      {/* Seller Header */}
      <div className="flex items-center gap-3.5">
        <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-teal-600/20 shrink-0">
          <Image
            src={seller.avatar}
            alt={seller.name}
            fill
            sizes="56px"
            className="object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h4 className="font-bold text-slate-900 text-base truncate">
              {seller.name}
            </h4>
            {seller.verified && (
              <span title="Penjual Terverifikasi" className="inline-flex">
                <CheckCircle2 className="w-4 h-4 text-teal-600 fill-teal-50" />
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
            <RatingStars rating={seller.rating} reviewsCount={seller.reviewsCount} />
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500 truncate">{seller.location}</span>
          </div>
        </div>
      </div>

      {/* Trust Metrics Grid */}
      <div className="grid grid-cols-3 gap-2 py-3 px-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
        <div>
          <span className="text-[11px] text-slate-400 block">Terjual</span>
          <span className="font-extrabold text-slate-900 text-sm flex items-center justify-center gap-1 mt-0.5">
            <ShoppingBag className="w-3.5 h-3.5 text-teal-600" />
            {seller.soldCount} barang
          </span>
        </div>
        <div className="border-x border-slate-200/60">
          <span className="text-[11px] text-slate-400 block">Balas Chat</span>
          <span className="font-extrabold text-teal-700 text-sm flex items-center justify-center gap-1 mt-0.5">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            {seller.responseRate}
          </span>
        </div>
        <div>
          <span className="text-[11px] text-slate-400 block">Kecepatan</span>
          <span className="font-extrabold text-slate-900 text-sm flex items-center justify-center gap-1 mt-0.5">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            {seller.responseTime}
          </span>
        </div>
      </div>

      {/* Member Since Tag */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
        <span className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          Member sejak {seller.memberSince}
        </span>
        <span className="text-teal-700 font-semibold">{seller.listingsCount} barang aktif</span>
      </div>

      {/* Action links */}
      <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
        <Link
          href={`/profile?sellerId=${seller.id}`}
          className="font-bold text-teal-700 hover:text-teal-900 hover:underline flex items-center gap-1"
        >
          <UserCheck className="w-3.5 h-3.5" />
          Lihat Profil Lengkap
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => openReportModal(itemTitle || "Barang", seller.name)}
            className="text-slate-400 hover:text-rose-600 transition-colors flex items-center gap-1"
            title="Laporkan Penjual"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Lapor</span>
          </button>
          <span className="text-slate-200">|</span>
          <button
            type="button"
            onClick={handleBlock}
            className="text-slate-400 hover:text-rose-600 transition-colors flex items-center gap-1"
            title="Blokir Penjual"
          >
            <Ban className="w-3.5 h-3.5" />
            <span>Blokir</span>
          </button>
        </div>
      </div>
    </div>
  );
}
