"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { TagBadge } from "@/components/ui/Badge";
import { Product } from "@/lib/types";

interface ProductGalleryProps {
  product: Product;
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const photos = product.photos && product.photos.length > 0
    ? product.photos
    : ["https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80"];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Main Image Container */}
      <div className="relative aspect-4/3 sm:aspect-16/11 w-full bg-slate-100 rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs group">
        <Image
          src={photos[activeIndex]}
          alt={`${product.title} - Foto ${activeIndex + 1}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          className="object-cover transition-transform duration-300 group-hover:scale-102"
        />

        {/* Badges on top-left */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10 pointer-events-none">
          {product.isGoodDeal && <TagBadge label="Good Deal" variant="deal" />}
          {product.isPriceDrop && <TagBadge label="Price Drop" variant="drop" />}
          {product.distanceKm <= 2.0 && <TagBadge label="Dekat" variant="nearby" />}
          {product.isNewListing && !product.isGoodDeal && <TagBadge label="Baru Masuk" variant="new" />}
        </div>

        {/* Navigation Arrows for multi-photo */}
        {photos.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              type="button"
              aria-label="Foto sebelumnya"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center backdrop-blur-md shadow-md transition-transform active:scale-90"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              type="button"
              aria-label="Foto selanjutnya"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center backdrop-blur-md shadow-md transition-transform active:scale-90"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Photo counter chip */}
            <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/60 text-white text-[11px] font-bold backdrop-blur-md">
              {activeIndex + 1} / {photos.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails strip */}
      {photos.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none">
          {photos.map((photo, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              type="button"
              className={`relative w-18 h-18 rounded-2xl overflow-hidden shrink-0 border-2 transition-all ${
                activeIndex === idx
                  ? "border-teal-600 ring-2 ring-teal-600/30 scale-95"
                  : "border-slate-200/80 hover:border-slate-300 opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={photo}
                alt={`Thumbnail ${idx + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
