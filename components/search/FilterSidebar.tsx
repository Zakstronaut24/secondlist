"use client";

import React from "react";
import { Filter, RotateCcw, MapPin, Tag, SlidersHorizontal, Check } from "lucide-react";
import { ItemCategory, ItemCondition, SortOption } from "@/lib/types";
import { CATEGORIES } from "@/lib/mock-data";
import { formatRupiah } from "@/lib/utils";

interface FilterSidebarProps {
  selectedCategory: ItemCategory | "All";
  onSelectCategory: (category: ItemCategory | "All") => void;
  minPrice: number | undefined;
  maxPrice: number | undefined;
  onPriceChange: (min: number | undefined, max: number | undefined) => void;
  selectedCondition: ItemCondition | "All";
  onSelectCondition: (condition: ItemCondition | "All") => void;
  maxDistance: number | undefined;
  onSelectDistance: (distance: number | undefined) => void;
  sortBy: SortOption;
  onSelectSort: (sort: SortOption) => void;
  onReset: () => void;
  className?: string;
}

export function FilterSidebar({
  selectedCategory,
  onSelectCategory,
  minPrice,
  maxPrice,
  selectedCondition,
  onSelectCondition,
  maxDistance,
  onSelectDistance,
  onPriceChange,
  sortBy,
  onSelectSort,
  onReset,
  className = "",
}: FilterSidebarProps) {
  const distanceOptions = [
    { label: "Semua Jarak", value: undefined },
    { label: "< 1 km", value: 1 },
    { label: "< 5 km", value: 5 },
    { label: "< 10 km", value: 10 },
  ];

  const conditionOptions: (ItemCondition | "All")[] = [
    "All",
    "Like New",
    "Good",
    "Fair",
  ];

  const conditionLabels: Record<ItemCondition | "All", string> = {
    All: "Semua Kondisi",
    "Like New": "Seperti Baru",
    Good: "Bagus / Mulus",
    Fair: "Layak Pakai",
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header with Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2 text-slate-900 font-black text-base">
          <SlidersHorizontal className="w-4 h-4 text-teal-600" />
          <span>Filter Pencarian</span>
        </div>
        <button
          onClick={onReset}
          type="button"
          className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 hover:text-teal-900 hover:underline"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Distance Filter (Core USP) */}
      <div className="bg-teal-50/70 p-4 rounded-2xl border border-teal-100">
        <label className="block text-xs font-bold text-teal-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-teal-600" />
          <span>Radius Jarak dari Kamu</span>
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {distanceOptions.map((opt) => {
            const isSelected = maxDistance === opt.value;
            return (
              <button
                key={opt.label}
                type="button"
                onClick={() => onSelectDistance(opt.value)}
                className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all text-center ${
                  isSelected
                    ? "bg-teal-600 text-white shadow-xs font-bold"
                    : "bg-white text-slate-700 hover:bg-teal-100/50 border border-teal-200/60"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
          Kategori
        </label>
        <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
          <button
            type="button"
            onClick={() => onSelectCategory("All")}
            className={`w-full flex items-center justify-between py-1.5 px-2.5 rounded-xl text-xs font-medium transition-colors ${
              selectedCategory === "All"
                ? "bg-teal-600 text-white font-bold"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            <span>Semua Kategori</span>
            {selectedCategory === "All" && <Check className="w-3.5 h-3.5" />}
          </button>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => onSelectCategory(cat.name)}
                className={`w-full flex items-center justify-between py-1.5 px-2.5 rounded-xl text-xs transition-colors ${
                  isSelected
                    ? "bg-teal-600 text-white font-bold"
                    : "text-slate-700 hover:bg-slate-100 font-medium"
                }`}
              >
                <span>{cat.name}</span>
                <span
                  className={`text-[11px] ${
                    isSelected ? "text-teal-100" : "text-slate-400"
                  }`}
                >
                  {cat.itemCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Condition Filter */}
      <div>
        <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
          Kondisi Barang
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {conditionOptions.map((cond) => {
            const isSelected = selectedCondition === cond;
            return (
              <button
                key={cond}
                type="button"
                onClick={() => onSelectCondition(cond)}
                className={`py-2 px-2.5 rounded-xl text-xs transition-all text-center ${
                  isSelected
                    ? "bg-slate-900 text-white font-bold shadow-xs"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 font-medium"
                }`}
              >
                {conditionLabels[cond]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
          Rentang Harga (Rp)
        </label>
        <div className="space-y-2">
          <div>
            <span className="text-[11px] text-slate-500 mb-1 block">Harga Minimum:</span>
            <input
              type="number"
              min={0}
              step={50000}
              placeholder="Rp Min"
              value={minPrice ?? ""}
              onChange={(e) =>
                onPriceChange(
                  e.target.value ? Number(e.target.value) : undefined,
                  maxPrice
                )
              }
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 bg-white"
            />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 mb-1 block">Harga Maksimum:</span>
            <input
              type="number"
              min={0}
              step={50000}
              placeholder="Rp Maks"
              value={maxPrice ?? ""}
              onChange={(e) =>
                onPriceChange(
                  minPrice,
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 bg-white"
            />
          </div>
        </div>

        {/* Quick price chips */}
        <div className="flex gap-1 mt-2 flex-wrap">
          <button
            type="button"
            onClick={() => onPriceChange(undefined, 500000)}
            className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-[10px] font-semibold text-slate-600"
          >
            &lt; 500rb
          </button>
          <button
            type="button"
            onClick={() => onPriceChange(500000, 2000000)}
            className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-[10px] font-semibold text-slate-600"
          >
            500rb - 2jt
          </button>
          <button
            type="button"
            onClick={() => onPriceChange(2000000, undefined)}
            className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-[10px] font-semibold text-slate-600"
          >
            &gt; 2jt
          </button>
        </div>
      </div>
    </div>
  );
}
