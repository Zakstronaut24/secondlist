import React from "react";
import { Search, MessageSquare, Handshake, ShieldCheck } from "lucide-react";

export function CommunityValuesBanner() {
  const steps = [
    {
      step: "01",
      icon: Search,
      title: "Cari Terdekat",
      desc: "Temukan barang layak pakai dari tetangga di sekitar kecamatarmu.",
    },
    {
      step: "02",
      icon: MessageSquare,
      title: "Chat & Nego",
      desc: "Tanyakan kondisi fisik, kelengkapan, dan sepakati harga lewat obrolan santai.",
    },
    {
      step: "03",
      icon: Handshake,
      title: "Ketemuan & COD",
      desc: "Janjian di tempat umum, cek fungsi barang langsung, baru selesaikan transaksi.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-xl mb-8">
          <span className="text-teal-300 text-xs font-bold uppercase tracking-wider block mb-1">
            Alur Transaksi Mudah
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Cari. Chat. Ketemuan.
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
            Marketplace barang bekas tanpa birokrasi rumit. Belanja lebih hemat sekaligus mendukung keberlanjutan lingkungan lokal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 flex flex-col justify-between hover:bg-white/10 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xl font-black text-white/20 font-mono">
                      {s.step}
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-white mb-1">{s.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
