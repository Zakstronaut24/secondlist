"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Product } from "@/lib/types";
import { ProductCard } from "@/components/ui/ProductCard";

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  products: Product[];
  viewAllHref: string;
  badgeText?: string;
}

export function ProductSection({
  title,
  subtitle,
  icon,
  products,
  viewAllHref,
  badgeText,
}: ProductSectionProps) {
  if (products.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-5">
        <div>
          <div className="flex items-center gap-2">
            {icon}
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {title}
            </h2>
            {badgeText && (
              <span className="px-2 py-0.5 text-[11px] font-bold rounded-md bg-teal-50 text-teal-700 border border-teal-200">
                {badgeText}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs sm:text-sm text-slate-500 mt-1">{subtitle}</p>
          )}
        </div>

        <Link
          href={viewAllHref}
          className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-teal-700 hover:text-teal-800 hover:underline transition-colors shrink-0 group"
        >
          <span>Lihat Semua</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Grid of Product Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
        {products.slice(0, 8).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
