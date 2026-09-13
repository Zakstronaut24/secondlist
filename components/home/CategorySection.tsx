"use client";

import React from "react";
import { CATEGORIES } from "@/lib/mock-data";
import { CategoryCard } from "@/components/ui/CategoryCard";
import { LayoutGrid } from "lucide-react";

export function CategorySection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <LayoutGrid className="w-5 h-5 text-teal-600" />
            <span>Jelajahi Kategori</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Pilih jenis barang bekas yang sedang kamu butuhkan
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-2.5 sm:gap-3.5">
        {CATEGORIES.map((cat) => (
          <CategoryCard key={cat.slug} category={cat} />
        ))}
      </div>
    </section>
  );
}
