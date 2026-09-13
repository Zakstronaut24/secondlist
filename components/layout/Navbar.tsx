"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Search,
  MapPin,
  PlusCircle,
  MessageSquare,
  Bookmark,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { useMarketplace } from "@/context/MarketplaceContext";
import { CURRENT_USER } from "@/lib/mock-data";

export function Navbar() {
  const router = useRouter();
  const {
    currentLocation,
    setIsLocationModalOpen,
    savedIds,
    unreadChatCount,
    filter,
    setFilter,
  } = useMarketplace();

  const [searchInput, setSearchInput] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setFilter((prev) => ({ ...prev, searchQuery: searchInput.trim() }));
      router.push(`/search?q=${encodeURIComponent(searchInput.trim())}`);
    } else {
      router.push("/search");
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3 sm:gap-6">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-700 to-emerald-500 flex items-center justify-center text-white font-extrabold shadow-sm group-hover:scale-105 transition-transform">
              <span className="text-xl">S</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-slate-900 group-hover:text-teal-700 transition-colors">
                  Seconda
                </span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-teal-100 text-teal-800 uppercase tracking-wider">
                  Lokal
                </span>
              </div>
              <span className="text-[10px] font-medium text-slate-400 -mt-1 hidden sm:inline">
                Komunitas Jual Beli Dekat
              </span>
            </div>
          </Link>

          {/* Location Selector Button */}
          <button
            onClick={() => setIsLocationModalOpen(true)}
            type="button"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100/90 hover:bg-slate-200/70 border border-slate-200/60 text-xs font-semibold text-slate-700 transition-all shrink-0 max-w-[200px]"
          >
            <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
            <span className="truncate">{currentLocation.district}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </button>

          {/* Search Bar (Desktop & Tablet) */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex-1 max-w-xl relative hidden sm:block"
          >
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Cari iPhone, keyboard, sepeda, baju..."
                className="w-full pl-10 pr-24 py-2 text-sm bg-slate-100 hover:bg-slate-100/80 focus:bg-white rounded-full border border-slate-200 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/20 transition-all text-slate-800 placeholder-slate-400"
              />
              <Search className="absolute left-3.5 w-4 h-4 text-slate-400" />
              <button
                type="submit"
                className="absolute right-1.5 px-3.5 py-1 text-xs font-semibold bg-teal-600 hover:bg-teal-700 text-white rounded-full transition-colors shadow-xs"
              >
                Cari
              </button>
            </div>
          </form>

          {/* Action Icons & Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Location Icon Trigger */}
            <button
              onClick={() => setIsLocationModalOpen(true)}
              type="button"
              className="md:hidden p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors"
              title="Ganti Lokasi"
            >
              <MapPin className="w-5 h-5 text-teal-600" />
            </button>

            {/* Saved Items */}
            <Link
              href="/saved"
              className="relative p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Barang Disimpan"
            >
              <Bookmark className="w-5 h-5" />
              {savedIds.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-teal-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {savedIds.length}
                </span>
              )}
            </Link>

            {/* Chat Inbox */}
            <Link
              href="/chat"
              className="relative p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Pesan Masuk"
            >
              <MessageSquare className="w-5 h-5" />
              {unreadChatCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {unreadChatCount}
                </span>
              )}
            </Link>

            {/* Sell CTA Button */}
            <Link
              href="/sell"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white text-xs sm:text-sm font-bold shadow-sm shadow-teal-700/20 active:scale-95 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Jual Barang</span>
            </Link>

            {/* User Profile Avatar */}
            <Link
              href="/profile"
              className="flex items-center gap-2 pl-1 group"
              title="Profil Pengguna"
            >
              <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-teal-600/30 group-hover:border-teal-600 transition-colors">
                <Image
                  src={CURRENT_USER.avatar}
                  alt={CURRENT_USER.name}
                  fill
                  className="object-cover"
                />
              </div>
            </Link>
          </div>
        </div>

        {/* Mobile Search Bar Row */}
        <div className="sm:hidden pb-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Cari barang bekas terdekat..."
              className="w-full pl-9 pr-20 py-2 text-xs bg-slate-100 focus:bg-white rounded-full border border-slate-200 focus:border-teal-600 focus:outline-none transition-all text-slate-800"
            />
            <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
            <button
              type="submit"
              className="absolute right-1 top-1 px-3 py-1 text-xs font-semibold bg-teal-600 text-white rounded-full"
            >
              Cari
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
