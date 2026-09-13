"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, MapPin, CheckCircle2, Tag } from "lucide-react";
import { Product } from "@/lib/types";
import { formatRupiah, formatDistance, cn } from "@/lib/utils";
import { useMarketplace } from "@/context/MarketplaceContext";
import { ConditionBadge, TagBadge } from "./Badge";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { isSaved, toggleSave } = useMarketplace();
  const saved = isSaved(product.id);

  const handleHeartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSave(product.id);
  };

  return (
    <div
      className={cn(
        "group relative flex flex-col bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-lg hover:border-teal-200 transition-all duration-200 overflow-hidden",
        className
      )}
    >
      {/* Top Media Container */}
      <Link href={`/product/${product.id}`} className="relative block aspect-4/3 w-full bg-slate-100 overflow-hidden">
        <Image
          src={product.photos[0] || "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop&q=80"}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Gradient Overlay on top for badge contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 pointer-events-none" />

        {/* Conditional Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
          {product.isGoodDeal && <TagBadge label="Good Deal" variant="deal" />}
          {product.isPriceDrop && <TagBadge label="Price Drop" variant="drop" />}
          {product.distanceKm <= 2.0 && <TagBadge label="Dekat" variant="nearby" />}
          {product.isNewListing && !product.isGoodDeal && <TagBadge label="Baru" variant="new" />}
        </div>

        {/* Heart Save Button */}
        <button
          onClick={handleHeartClick}
          type="button"
          aria-label={saved ? "Hapus dari simpanan" : "Simpan barang"}
          className={cn(
            "absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md shadow-xs transition-transform active:scale-90 z-10",
            saved
              ? "bg-rose-500 text-white hover:bg-rose-600"
              : "bg-white/80 text-slate-700 hover:bg-white hover:text-rose-500"
          )}
        >
          <Heart
            className={cn("w-4 h-4", saved ? "fill-white" : "stroke-current")}
          />
        </button>

        {/* Condition Chip Bottom Right of image */}
        <div className="absolute bottom-2.5 right-2.5 z-10">
          <ConditionBadge condition={product.condition} className="shadow-xs backdrop-blur-md bg-white/90" />
        </div>
      </Link>

      {/* Content Container */}
      <div className="flex flex-col flex-1 p-3.5">
        {/* Title */}
        <Link href={`/product/${product.id}`} className="group-hover:text-teal-700 transition-colors">
          <h3 className="font-semibold text-slate-900 text-sm sm:text-base leading-snug line-clamp-2 min-h-[2.5rem]">
            {product.title}
          </h3>
        </Link>

        {/* Price Section */}
        <div className="mt-2 flex items-baseline gap-2 flex-wrap">
          <span className="text-lg sm:text-xl font-bold text-teal-700 tracking-tight">
            {formatRupiah(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-xs text-slate-400 line-through">
              {formatRupiah(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Location & Distance */}
        <div className="mt-2.5 flex items-center gap-1.5 text-xs text-slate-500">
          <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
          <span className="font-medium text-slate-700">{formatDistance(product.distanceKm)}</span>
          <span className="text-slate-300">•</span>
          <span className="truncate">{product.district}</span>
        </div>

        {/* Divider */}
        <div className="my-2.5 border-t border-slate-100" />

        {/* Seller Info Footer */}
        <div className="mt-auto flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5 min-w-0">
            <div className="relative w-5 h-5 rounded-full overflow-hidden shrink-0 border border-slate-200">
              <Image
                src={product.seller.avatar}
                alt={product.seller.name}
                fill
                className="object-cover"
              />
            </div>
            <span className="font-medium text-slate-700 truncate text-[11px] sm:text-xs">
              {product.seller.name}
            </span>
            {product.seller.verified && (
              <CheckCircle2 className="w-3 h-3 text-teal-600 fill-teal-50 shrink-0" />
            )}
          </div>
          <span className="text-[11px] text-slate-400 shrink-0">{product.postedAt}</span>
        </div>
      </div>
    </div>
  );
}
