"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { X, Tag, Send } from "lucide-react";
import { useMarketplace } from "@/context/MarketplaceContext";
import { formatRupiah } from "@/lib/utils";

export function OfferModal() {
  const router = useRouter();
  const { offerModalData, closeOfferModal, startOrGetConversation, sendMessage } =
    useMarketplace();
  const product = offerModalData.product;

  const [offerPrice, setOfferPrice] = useState<number>(0);
  const [note, setNote] = useState<string>("");

  useEffect(() => {
    if (product) {
      // Default to 10% discount
      setOfferPrice(Math.round(product.price * 0.9));
      setNote("Halo, apakah boleh nego di harga ini? Siap COD.");
    }
  }, [product]);

  if (!offerModalData.isOpen || !product) return null;

  const applyDiscount = (percentage: number) => {
    const discounted = Math.round(product.price * (1 - percentage / 100));
    setOfferPrice(discounted);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (offerPrice <= 0) return;

    const convId = startOrGetConversation(product);
    const offerMessage = `${note ? note + "\n" : ""}Saya mengajukan penawaran harga sebesar ${formatRupiah(
      offerPrice
    )}.`;

    sendMessage(convId, offerMessage, true, offerPrice);
    closeOfferModal();
    router.push("/chat");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
              <Tag className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Ajukan Penawaran</h3>
          </div>
          <button
            onClick={closeOfferModal}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Product Snippet */}
        <div className="flex items-center gap-3 p-3 mt-4 bg-slate-50 rounded-2xl border border-slate-200/60">
          <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-slate-200">
            <Image
              src={product.photos[0]}
              alt={product.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-semibold text-slate-800 line-clamp-1">
              {product.title}
            </h4>
            <div className="text-xs text-slate-500 mt-0.5">
              Harga Pasang: <span className="font-bold text-slate-800">{formatRupiah(product.price)}</span>
            </div>
            <div className="text-[11px] text-teal-600 font-medium">
              Penjual: {product.seller.name}
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Harga Penawaran Anda (Rp)
            </label>
            <div className="relative">
              <input
                type="number"
                min={10000}
                max={product.price}
                step={10000}
                value={offerPrice || ""}
                onChange={(e) => setOfferPrice(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-lg font-bold text-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
                required
              />
            </div>
          </div>

          {/* Quick Offer Chips */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => applyDiscount(5)}
              className="flex-1 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 active:scale-95 transition-all"
            >
              -5% ({formatRupiah(Math.round(product.price * 0.95))})
            </button>
            <button
              type="button"
              onClick={() => applyDiscount(10)}
              className="flex-1 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 active:scale-95 transition-all"
            >
              -10% ({formatRupiah(Math.round(product.price * 0.9))})
            </button>
            <button
              type="button"
              onClick={() => applyDiscount(15)}
              className="flex-1 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 active:scale-95 transition-all"
            >
              -15% ({formatRupiah(Math.round(product.price * 0.85))})
            </button>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Pesan Tambahan untuk Penjual
            </label>
            <textarea
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Contoh: Boleh COD di stasiun besok mas?"
              className="w-full p-3 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 resize-none"
            />
          </div>

          <p className="text-[11px] text-slate-400 leading-tight">
            💡 Penjual dapat menerima atau menolak tawaran Anda langsung di ruang obrolan.
          </p>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md shadow-teal-600/20 transition-all active:scale-98"
          >
            <Send className="w-4 h-4" />
            <span>Kirim Penawaran ke Penjual</span>
          </button>
        </form>
      </div>
    </div>
  );
}
