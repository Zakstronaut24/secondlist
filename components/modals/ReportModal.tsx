"use client";

import React, { useState } from "react";
import { X, ShieldAlert, CheckCircle2 } from "lucide-react";
import { useMarketplace } from "@/context/MarketplaceContext";

export function ReportModal() {
  const { reportModalData, closeReportModal } = useMarketplace();
  const [reason, setReason] = useState<string>("Barang fiktif atau penipuan");
  const [details, setDetails] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!reportModalData.isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      closeReportModal();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-600">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Laporkan Iklan</h3>
          </div>
          <button
            onClick={closeReportModal}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="py-8 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">Laporan Diterima</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-xs">
              Terima kasih telah menjaga keamanan komunitas Seconda. Tim moderasi kami akan segera meninjau listing ini.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700">
              <span className="text-slate-400 block mb-0.5">Barang yang dilaporkan:</span>
              <strong className="text-slate-900 line-clamp-1">{reportModalData.itemTitle}</strong>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Alasan Pelaporan
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-600"
              >
                <option value="Barang fiktif atau penipuan">Barang fiktif atau penipuan</option>
                <option value="Harga tidak wajar / spam">Harga tidak wajar / spam</option>
                <option value="Kondisi barang tidak sesuai deskripsi">Kondisi barang tidak sesuai deskripsi</option>
                <option value="Barang ilegal atau berbahaya">Barang ilegal atau berbahaya</option>
                <option value="Penjual meminta transfer uang muka (DP)">Penjual meminta transfer uang muka (DP)</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Keterangan Tambahan
              </label>
              <textarea
                rows={3}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Jelaskan secara singkat detail masalah..."
                className="w-full p-3 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-600 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md shadow-rose-600/20 transition-all active:scale-98"
            >
              Kirim Laporan
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
