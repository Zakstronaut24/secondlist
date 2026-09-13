import React from "react";
import { ShieldCheck, MapPin, Eye, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SafetyBannerProps {
  className?: string;
  compact?: boolean;
}

export function SafetyBanner({ className, compact = false }: SafetyBannerProps) {
  if (compact) {
    return (
      <div
        className={cn(
          "flex items-center gap-2.5 p-3 rounded-xl bg-amber-50/80 border border-amber-200/80 text-amber-900 text-xs",
          className
        )}
      >
        <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
        <p className="leading-relaxed">
          <strong className="font-semibold">Tips Keamanan:</strong> Bertemulah di tempat umum yang ramai (stasiun/mall) dan cek kondisi fisik barang sebelum bertransaksi.
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-teal-50/60 to-emerald-50/40 border border-teal-100",
        className
      )}
    >
      <div className="flex items-center gap-2 text-teal-800 font-bold text-sm sm:text-base mb-2">
        <ShieldCheck className="w-5 h-5 text-teal-600" />
        <span>Panduan Transaksi Aman & Nyaman di Seconda</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600 mt-3">
        <div className="flex items-start gap-2 bg-white/80 p-2.5 rounded-xl border border-teal-100/60">
          <MapPin className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-slate-800 block">Tempat Umum Ramai</span>
            <span>Janjian COD di stasiun MRT, minimarket, cafe, atau lobby mall.</span>
          </div>
        </div>
        <div className="flex items-start gap-2 bg-white/80 p-2.5 rounded-xl border border-teal-100/60">
          <Eye className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-slate-800 block">Cek Kondisi Langsung</span>
            <span>Periksa fungsi, kelengkapan, dan fisik barang sebelum bayar.</span>
          </div>
        </div>
        <div className="flex items-start gap-2 bg-white/80 p-2.5 rounded-xl border border-teal-100/60">
          <AlertCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-slate-800 block">Tanpa Transfer DP</span>
            <span>Hindari mentransfer uang muka sebelum bertemu dan melihat barang.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
