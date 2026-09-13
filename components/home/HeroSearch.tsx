"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Sparkles, ArrowRight } from "lucide-react";
import { useMarketplace } from "@/context/MarketplaceContext";

const POPULAR_SEARCHES = [
  "iPhone 13",
  "Keychron",
  "Meja Kerja",
  "Sepeda Lipat",
  "Nike Air Force",
  "Sony WH-1000XM4",
];

export function HeroSearch() {
  const router = useRouter();
  const { currentLocation, setIsLocationModalOpen, setFilter } = useMarketplace();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setFilter((prev) => ({ ...prev, searchQuery: searchTerm.trim() }));
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      router.push("/search");
    }
  };

  const handleQuickKeyword = (keyword: string) => {
    setSearchTerm(keyword);
    setFilter((prev) => ({ ...prev, searchQuery: keyword }));
    router.push(`/search?q=${encodeURIComponent(keyword)}`);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-teal-900 via-teal-800 to-slate-900 text-white pt-10 pb-16 sm:pt-14 sm:pb-20 px-4 sm:px-6 lg:px-8">
      {/* Subtle Background Glow Circles */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Community Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-teal-200 text-xs font-semibold mb-6 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Marketplace Komunitas Barang Bekas Terpercaya</span>
        </div>

        {/* Headlines */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight sm:leading-tight">
          Temukan yang Kamu Butuhkan.{" "}
          <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-200 bg-clip-text text-transparent">
            Bayar Jauh Lebih Murah.
          </span>
        </h1>
        <p className="mt-4 text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Jual dan beli barang bekas berkualitas dari orang-orang di sekitarmu. Transaksi mudah, negosiasi santai, dan siap COD hari ini.
        </p>

        {/* Big Search Box */}
        <div className="mt-8 sm:mt-10 max-w-3xl mx-auto">
          <form
            onSubmit={handleSearch}
            className="bg-white p-2 sm:p-2.5 rounded-3xl shadow-2xl flex flex-col sm:flex-row items-center gap-2 border border-white/30 text-slate-900"
          >
            {/* Input Field */}
            <div className="relative flex-1 w-full flex items-center pl-3">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari barang apa saja... (cth: iPhone, keyboard, sepeda)"
                className="w-full px-3 py-3 text-sm sm:text-base bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 font-medium"
              />
            </div>

            {/* Location Selector Pill */}
            <div className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-1.5 px-3 py-2 rounded-2xl bg-slate-50 border border-slate-200/80 shrink-0">
              <div className="flex items-center gap-1.5 min-w-0">
                <MapPin className="w-4 h-4 text-teal-600 shrink-0" />
                <span className="text-xs font-semibold text-slate-700 truncate max-w-[140px]">
                  Dekat {currentLocation.district}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsLocationModalOpen(true)}
                className="text-[11px] font-bold text-teal-700 hover:text-teal-800 underline underline-offset-2 ml-1"
              >
                Ubah
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold text-sm sm:text-base transition-all shadow-md shadow-teal-600/30 active:scale-98 flex items-center justify-center gap-2 shrink-0"
            >
              <span>Cari Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Keywords Chips */}
          <div className="mt-4 flex items-center justify-center gap-2 flex-wrap text-xs text-slate-300">
            <span className="text-slate-400 font-medium">Sering dicari:</span>
            {POPULAR_SEARCHES.map((keyword) => (
              <button
                key={keyword}
                type="button"
                onClick={() => handleQuickKeyword(keyword)}
                className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10 transition-colors text-xs font-medium"
              >
                {keyword}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
