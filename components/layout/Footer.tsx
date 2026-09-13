import React from "react";
import Link from "next/link";
import { ShieldCheck, MapPin, Sparkles, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto pb-16 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-teal-600 flex items-center justify-center text-white font-extrabold">
                <span>S</span>
              </div>
              <span className="text-xl font-black text-slate-900 tracking-tight">
                Seconda
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Platform jual-beli barang bekas lokal berbasis komunitas. Temukan barang yang kamu butuhkan lebih dekat, lebih cepat, dan lebih hemat.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-teal-700 font-semibold pt-1">
              <MapPin className="w-4 h-4 text-teal-600" />
              <span>Jabodetabek Community Hub</span>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Kategori Populer
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <Link href="/search?category=Electronics" className="hover:text-teal-600 transition-colors">
                  Gadget & Elektronik
                </Link>
              </li>
              <li>
                <Link href="/search?category=Fashion" className="hover:text-teal-600 transition-colors">
                  Pakaian & Sepatu
                </Link>
              </li>
              <li>
                <Link href="/search?category=Furniture" className="hover:text-teal-600 transition-colors">
                  Perabot & Meja Kerja
                </Link>
              </li>
              <li>
                <Link href="/search?category=Sports" className="hover:text-teal-600 transition-colors">
                  Sepeda & Alat Olahraga
                </Link>
              </li>
            </ul>
          </div>

          {/* Community & Safety */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Keamanan Transaksi
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <span className="flex items-center gap-1.5 text-slate-700">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                  Tips COD Aman di Tempat Ramai
                </span>
              </li>
              <li>
                <span className="text-slate-500">Cek fungsi fisik barang sebelum bayar</span>
              </li>
              <li>
                <span className="text-slate-500">Hindari transfer DP ke penjual tak dikenal</span>
              </li>
              <li>
                <Link href="/chat" className="hover:text-teal-600 transition-colors">
                  Pusat Pesan & Bantuan
                </Link>
              </li>
            </ul>
          </div>

          {/* Core Values */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Mengapa Seconda?
            </h4>
            <div className="p-3.5 rounded-2xl bg-teal-50/60 border border-teal-100 text-xs text-slate-700 space-y-2">
              <div className="flex items-center gap-1.5 text-teal-800 font-bold">
                <Sparkles className="w-4 h-4 text-teal-600" />
                <span>Ekonomi Sirkular Lokal</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Kurangi limbah dan dapatkan barang berkualitas dengan harga separuh toko bersama tetangga terdekat Anda.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© 2026 Seconda Marketplace. Dibuat dengan integritas komunitas lokal.</p>
          <div className="flex items-center gap-1 text-slate-500">
            <span>Didesain untuk pembeli & penjual bijak</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
}
