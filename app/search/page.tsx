"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Search,
  SlidersHorizontal,
  X,
  MapPin,
  ArrowUpDown,
  RotateCcw,
  Sparkles,
  PackageOpen,
} from "lucide-react";
import { useMarketplace } from "@/context/MarketplaceContext";
import { Product, ItemCategory, ItemCondition, SortOption } from "@/lib/types";
import { ProductCard } from "@/components/ui/ProductCard";
import { FilterSidebar } from "@/components/search/FilterSidebar";
import { CategoryCard } from "@/components/ui/CategoryCard";
import { CATEGORIES } from "@/lib/mock-data";

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { products, currentLocation, setIsLocationModalOpen } = useMarketplace();

  // Query Params init
  const initialQuery = searchParams.get("q") || "";
  const initialCategory = (searchParams.get("category") as ItemCategory) || "All";
  const initialSort = (searchParams.get("sort") as SortOption) || "relevant";
  const isDealsOnly = searchParams.get("deals") === "true";
  const isPriceDropOnly = searchParams.get("priceDrop") === "true";

  // Search State
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [category, setCategory] = useState<ItemCategory | "All">(initialCategory);
  const [condition, setCondition] = useState<ItemCondition | "All">("All");
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [maxDistance, setMaxDistance] = useState<number | undefined>(undefined);
  const [sortBy, setSortBy] = useState<SortOption>(initialSort);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync state when URL params change
  useEffect(() => {
    if (searchParams.get("q") !== null) {
      setSearchQuery(searchParams.get("q") || "");
    }
    if (searchParams.get("category")) {
      setCategory(searchParams.get("category") as ItemCategory);
    }
    if (searchParams.get("sort")) {
      setSortBy(searchParams.get("sort") as SortOption);
    }
  }, [searchParams]);

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Deals filter from homepage
    if (isDealsOnly) {
      result = result.filter((p) => p.isGoodDeal);
    }
    if (isPriceDropOnly) {
      result = result.filter((p) => p.isPriceDrop);
    }

    // Keyword Search (title, description, district)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.district.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Category Filter
    if (category !== "All") {
      result = result.filter((p) => p.category === category);
    }

    // Condition Filter
    if (condition !== "All") {
      result = result.filter((p) => p.condition === condition);
    }

    // Distance Filter
    if (maxDistance !== undefined) {
      result = result.filter((p) => p.distanceKm <= maxDistance);
    }

    // Price Filter
    if (minPrice !== undefined) {
      result = result.filter((p) => p.price >= minPrice);
    }
    if (maxPrice !== undefined) {
      result = result.filter((p) => p.price <= maxPrice);
    }

    // Sorting
    switch (sortBy) {
      case "price_asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "distance":
        result.sort((a, b) => a.distanceKm - b.distanceKm);
        break;
      case "newest":
        result.sort((a, b) => (b.isNewListing ? 1 : 0) - (a.isNewListing ? 1 : 0));
        break;
      case "relevant":
      default:
        // Default relevant sort prioritizes closer and good deals
        result.sort((a, b) => {
          if (a.isGoodDeal && !b.isGoodDeal) return -1;
          if (!a.isGoodDeal && b.isGoodDeal) return 1;
          return a.distanceKm - b.distanceKm;
        });
        break;
    }

    return result;
  }, [
    products,
    searchQuery,
    category,
    condition,
    maxDistance,
    minPrice,
    maxPrice,
    sortBy,
    isDealsOnly,
    isPriceDropOnly,
  ]);

  const activeFilterCount =
    (category !== "All" ? 1 : 0) +
    (condition !== "All" ? 1 : 0) +
    (maxDistance !== undefined ? 1 : 0) +
    (minPrice !== undefined || maxPrice !== undefined ? 1 : 0);

  const resetAllFilters = () => {
    setSearchQuery("");
    setCategory("All");
    setCondition("All");
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setMaxDistance(undefined);
    setSortBy("relevant");
    router.push("/search");
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Search Header Banner */}
      <div className="bg-white border-b border-slate-200 py-4 px-4 sm:px-6 lg:px-8 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Main Search Input */}
          <div className="relative w-full md:max-w-xl">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari barang bekas (cth: iPhone, Keychron, Meja)..."
              className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-100/80 focus:bg-white border border-slate-200 focus:border-teal-600 focus:outline-none text-sm text-slate-800 transition-all"
            />
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Active Location Info & Trigger */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
            <button
              onClick={() => setIsLocationModalOpen(true)}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-xs font-semibold text-teal-800 hover:bg-teal-100 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-teal-600" />
              <span>Area: {currentLocation.district}, {currentLocation.city}</span>
              <span className="text-[11px] underline font-bold ml-1">Ganti</span>
            </button>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              type="button"
              className="lg:hidden flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-xs active:scale-95 transition-transform"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filter</span>
              {activeFilterCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-teal-500 text-[10px] flex items-center justify-center font-black">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Quick Category Pills Scroll */}
        <div className="max-w-7xl mx-auto mt-3 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            type="button"
            onClick={() => setCategory("All")}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
              category === "All"
                ? "bg-teal-700 text-white border-teal-700 shadow-xs"
                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
            }`}
          >
            Semua
          </button>
          {CATEGORIES.map((cat) => (
            <CategoryCard
              key={cat.slug}
              category={cat}
              isActive={category === cat.name}
              onClick={() => setCategory(cat.name)}
              asPill
            />
          ))}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <FilterSidebar
                selectedCategory={category}
                onSelectCategory={setCategory}
                minPrice={minPrice}
                maxPrice={maxPrice}
                onPriceChange={(min, max) => {
                  setMinPrice(min);
                  setMaxPrice(max);
                }}
                selectedCondition={condition}
                onSelectCondition={setCondition}
                maxDistance={maxDistance}
                onSelectDistance={setMaxDistance}
                sortBy={sortBy}
                onSelectSort={setSortBy}
                onReset={resetAllFilters}
              />
            </div>
          </aside>

          {/* Search Results Area */}
          <main className="lg:col-span-3 space-y-4">
            {/* Top Toolbar: Results count & Sort Selector */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
              <div>
                <span className="font-bold text-slate-900 text-sm">
                  {filteredProducts.length} barang bekas ditemukan
                </span>
                <span className="text-xs text-slate-500 block sm:inline sm:ml-1">
                  di sekitar {currentLocation.district}
                </span>
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 shrink-0">
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                  Urutkan:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
                >
                  <option value="relevant">Paling Relevan</option>
                  <option value="distance">Jarak Terdekat</option>
                  <option value="newest">Baru Masuk</option>
                  <option value="price_asc">Harga Terendah</option>
                  <option value="price_desc">Harga Tertinggi</option>
                </select>
              </div>
            </div>

            {/* Active Filter Badges */}
            {activeFilterCount > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-slate-400 font-medium">Filter Aktif:</span>
                {category !== "All" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
                    {category}
                    <button onClick={() => setCategory("All")}>
                      <X className="w-3 h-3 text-teal-600 hover:text-teal-900" />
                    </button>
                  </span>
                )}
                {condition !== "All" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
                    Kondisi: {condition}
                    <button onClick={() => setCondition("All")}>
                      <X className="w-3 h-3 text-teal-600 hover:text-teal-900" />
                    </button>
                  </span>
                )}
                {maxDistance !== undefined && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
                    Radius &lt; {maxDistance} km
                    <button onClick={() => setMaxDistance(undefined)}>
                      <X className="w-3 h-3 text-teal-600 hover:text-teal-900" />
                    </button>
                  </span>
                )}
                {(minPrice !== undefined || maxPrice !== undefined) && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
                    Harga {minPrice ? `min Rp${minPrice.toLocaleString("id-ID")}` : ""} {maxPrice ? `max Rp${maxPrice.toLocaleString("id-ID")}` : ""}
                    <button
                      onClick={() => {
                        setMinPrice(undefined);
                        setMaxPrice(undefined);
                      }}
                    >
                      <X className="w-3 h-3 text-teal-600 hover:text-teal-900" />
                    </button>
                  </span>
                )}
                <button
                  onClick={resetAllFilters}
                  className="text-xs text-rose-600 hover:underline font-semibold ml-1"
                >
                  Hapus Semua
                </button>
              </div>
            )}

            {/* Product Grid or Empty State */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                {filteredProducts.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-3xl bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
                  <PackageOpen className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Tidak Ada Barang yang Cocok
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mt-1 mb-6 leading-relaxed">
                  Coba perluas radius pencarian lokasi Anda atau kurangi filter harga dan kondisi untuk melihat lebih banyak barang dari warga sekitar.
                </p>
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-teal-600/20 transition-all active:scale-95"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset Semua Filter</span>
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Slide-over Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs lg:hidden animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-white h-full p-5 overflow-y-auto flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <div className="flex items-center gap-2 text-slate-900 font-black text-base">
                <SlidersHorizontal className="w-4 h-4 text-teal-600" />
                <span>Filter Pencarian</span>
              </div>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1">
              <FilterSidebar
                selectedCategory={category}
                onSelectCategory={setCategory}
                minPrice={minPrice}
                maxPrice={maxPrice}
                onPriceChange={(min, max) => {
                  setMinPrice(min);
                  setMaxPrice(max);
                }}
                selectedCondition={condition}
                onSelectCondition={setCondition}
                maxDistance={maxDistance}
                onSelectDistance={setMaxDistance}
                sortBy={sortBy}
                onSelectSort={setSortBy}
                onReset={resetAllFilters}
              />
            </div>

            <div className="pt-4 border-t border-slate-200 mt-4">
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md shadow-teal-600/20 active:scale-98"
              >
                Terapkan ({filteredProducts.length} Barang)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
          <div className="text-center text-slate-500 text-sm font-medium">
            Memuat pencarian barang...
          </div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
