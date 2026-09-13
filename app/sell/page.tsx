"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  UploadCloud,
  Plus,
  X,
  Camera,
  MapPin,
  Tag,
  CheckCircle2,
  Sparkles,
  Eye,
  ArrowRight,
  AlertCircle,
  ShoppingBag,
} from "lucide-react";
import { useMarketplace } from "@/context/MarketplaceContext";
import { ItemCategory, ItemCondition, Product } from "@/lib/types";
import { CATEGORIES, DEFAULT_LOCATIONS, CURRENT_USER } from "@/lib/mock-data";
import { ProductCard } from "@/components/ui/ProductCard";
import { formatRupiah } from "@/lib/utils";

const SAMPLE_PHOTO_PRESETS = [
  { label: "Elektronik / Gadget", url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80" },
  { label: "Keyboard & Aksesoris", url: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80" },
  { label: "Meja & Perabot", url: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&auto=format&fit=crop&q=80" },
  { label: "Sepatu & Fashion", url: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80" },
  { label: "Kamera & Hobi", url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80" },
];

export default function SellPage() {
  const router = useRouter();
  const { addProduct, currentLocation } = useMarketplace();

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<ItemCategory>("Electronics");
  const [condition, setCondition] = useState<ItemCondition>("Like New");
  const [price, setPrice] = useState<number | "">("");
  const [originalPrice, setOriginalPrice] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState<string[]>([
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80",
  ]);
  const [district, setDistrict] = useState(currentLocation.district);
  const [city, setCity] = useState(currentLocation.city);
  const [meetUpPreference, setMeetUpPreference] = useState(
    "Area stasiun MRT / minimarket terdekat"
  );

  const [activeTab, setActiveTab] = useState<"form" | "preview">("form");
  const [successProduct, setSuccessProduct] = useState<Product | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  // Handle local file upload via input
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhotos((prev) => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAddPresetPhoto = (url: string) => {
    if (!photos.includes(url)) {
      setPhotos((prev) => [...prev, url]);
    }
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!title.trim()) {
      setErrorMsg("Mohon isi judul barang.");
      return;
    }
    if (!price || Number(price) <= 0) {
      setErrorMsg("Mohon masukkan harga barang yang valid.");
      return;
    }
    if (photos.length === 0) {
      setErrorMsg("Mohon unggah minimal 1 foto barang.");
      return;
    }
    if (!description.trim()) {
      setErrorMsg("Mohon tuliskan deskripsi kondisi barang.");
      return;
    }

    const created = addProduct({
      title: title.trim(),
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      category,
      condition,
      description: description.trim(),
      photos,
      district,
      city,
      meetUpPreference: meetUpPreference.trim() || undefined,
    });

    setSuccessProduct(created);
  };

  // Construct dummy product object for live preview
  const previewProduct: Product = {
    id: "preview",
    title: title.trim() || "Judul Barang Bekas Kamu",
    price: Number(price) || 500000,
    originalPrice: originalPrice ? Number(originalPrice) : undefined,
    category,
    condition,
    description:
      description.trim() ||
      "Tulis deskripsi kelengkapan dan kondisi barang di sini...",
    photos: photos.length > 0 ? photos : [SAMPLE_PHOTO_PRESETS[0].url],
    district: district || currentLocation.district,
    city: city || currentLocation.city,
    distanceKm: 0.8,
    seller: CURRENT_USER,
    postedAt: "Baru saja",
    isGoodDeal: originalPrice ? Number(originalPrice) > Number(price) : false,
    isNewListing: true,
    status: "available",
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 pb-24">
      <div className="max-w-6xl mx-auto">
        {/* Title Header */}
        <div className="mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Jual Cepat ke Tetangga Terdekat</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Pasang Iklan Barang Bekas
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Dapatkan uang tambahan dari barang yang sudah tidak kamu pakai. Pembeli siap COD di sekitarmu.
          </p>
        </div>

        {/* Mobile Tab Switcher (Form vs Preview) */}
        <div className="lg:hidden flex rounded-2xl bg-slate-200 p-1 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab("form")}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === "form"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600"
            }`}
          >
            Formulir Iklan
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === "preview"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600"
            }`}
          >
            Pratinjau Langsung
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ================= LEFT: FORM (7 COLS) ================= */}
          <div
            className={`lg:col-span-7 space-y-6 ${
              activeTab === "preview" ? "hidden lg:block" : "block"
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMsg && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2 font-medium">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Step 1: Upload Photos */}
              <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                    <Camera className="w-4 h-4 text-teal-600" />
                    <span>Foto Barang</span>
                  </h3>
                  <span className="text-xs text-slate-400">
                    {photos.length} foto terpilih
                  </span>
                </div>

                {/* Upload Drag/Click Zone */}
                <div className="relative border-2 border-dashed border-slate-300 hover:border-teal-500 rounded-2xl p-6 text-center transition-colors bg-slate-50/60 group">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="flex flex-col items-center pointer-events-none">
                    <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-bold text-slate-800">
                      Klik untuk unggah foto dari galeri
                    </span>
                    <span className="text-xs text-slate-400 mt-0.5">
                      Format JPG, PNG, atau WEBP (Maks 5MB per foto)
                    </span>
                  </div>
                </div>

                {/* Quick Presets for Demo */}
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                    Atau gunakan contoh foto demo cepat:
                  </span>
                  <div className="flex gap-1.5 flex-wrap">
                    {SAMPLE_PHOTO_PRESETS.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => handleAddPresetPhoto(preset.url)}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-teal-50 text-slate-600 hover:text-teal-700 font-medium transition-colors border border-slate-200"
                      >
                        + {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Photos Grid Preview */}
                {photos.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 pt-2">
                    {photos.map((url, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-square rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 group"
                      >
                        <Image
                          src={url}
                          alt={`Uploaded preview ${idx + 1}`}
                          fill
                          sizes="120px"
                          className="object-cover"
                        />
                        {idx === 0 && (
                          <span className="absolute bottom-1 left-1 right-1 text-center bg-teal-700/90 text-white text-[9px] font-bold py-0.5 rounded backdrop-blur-xs">
                            Foto Utama
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemovePhoto(idx)}
                          className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-rose-600 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Step 2: Details */}
              <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Tag className="w-4 h-4 text-teal-600" />
                  <span>Informasi & Detail Barang</span>
                </h3>

                {/* Title */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Judul Iklan Barang <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Contoh: Mechanical Keyboard Keychron K2 Brown Switch"
                    className="w-full px-4 py-2.5 rounded-2xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
                  />
                </div>

                {/* Category & Condition Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      Kategori <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as ItemCategory)}
                      className="w-full px-3 py-2.5 rounded-2xl border border-slate-300 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 bg-white"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c.name} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      Kondisi Barang <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={condition}
                      onChange={(e) => setCondition(e.target.value as ItemCondition)}
                      className="w-full px-3 py-2.5 rounded-2xl border border-slate-300 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 bg-white"
                    >
                      <option value="Like New">Seperti Baru (Like New - Mulus 95%+)</option>
                      <option value="Good">Bagus / Mulus (Ada bekas wajar, normal)</option>
                      <option value="Fair">Layak Pakai (Ada minus kosmetik ringan)</option>
                    </select>
                  </div>
                </div>

                {/* Price & Original Price */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      Harga Jual Kamu (Rp) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      min={1000}
                      step={10000}
                      value={price}
                      onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : "")}
                      placeholder="Contoh: 750000"
                      className="w-full px-4 py-2.5 rounded-2xl border border-slate-300 text-base font-bold text-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      Harga Beli Baru Asli (Opsional)
                    </label>
                    <input
                      type="number"
                      min={1000}
                      step={10000}
                      value={originalPrice}
                      onChange={(e) =>
                        setOriginalPrice(e.target.value ? Number(e.target.value) : "")
                      }
                      placeholder="Contoh: 1350000 (untuk Good Deal)"
                      className="w-full px-4 py-2.5 rounded-2xl border border-slate-300 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Deskripsi Lengkap <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Ceritakan pemakaian berapa lama, kelengkapan dus/aksesoris, ada minus atau tidak, alasan jual..."
                    className="w-full p-4 rounded-2xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 resize-none"
                  />
                </div>
              </div>

              {/* Step 3: Location & Meetup Preference */}
              <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-teal-600" />
                  <span>Lokasi & Preferensi COD</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      Pilih Area / Kota
                    </label>
                    <select
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                        const match = DEFAULT_LOCATIONS.find((l) => l.city === e.target.value);
                        if (match) setDistrict(match.district);
                      }}
                      className="w-full px-3 py-2.5 rounded-2xl border border-slate-300 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 bg-white"
                    >
                      {DEFAULT_LOCATIONS.map((loc) => (
                        <option key={loc.id} value={loc.city}>
                          {loc.city} ({loc.district})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      Kecamatan
                    </label>
                    <input
                      type="text"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      placeholder="Contoh: Kebayoran Baru"
                      className="w-full px-4 py-2.5 rounded-2xl border border-slate-300 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Preferensi Tempat Ketemuan / Titik COD
                  </label>
                  <input
                    type="text"
                    value={meetUpPreference}
                    onChange={(e) => setMeetUpPreference(e.target.value)}
                    placeholder="Contoh: Stasiun KRL Tebet / Citos / Ambil di rumah"
                    className="w-full px-4 py-2.5 rounded-2xl border border-slate-300 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    💡 Rekomendasi: Pilih tempat umum ramai seperti stasiun, minimarket, atau kafe.
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-extrabold text-base shadow-lg shadow-teal-600/20 transition-all active:scale-98 flex items-center justify-center gap-2"
              >
                <span>Tayangkan Iklan Sekarang</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* ================= RIGHT: LIVE PREVIEW CARD (5 COLS) ================= */}
          <div
            className={`lg:col-span-5 lg:sticky lg:top-24 space-y-4 ${
              activeTab === "form" ? "hidden lg:block" : "block"
            }`}
          >
            <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-teal-600" />
                  <span>Pratinjau Kartu di Beranda</span>
                </span>
                <span className="text-[11px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                  Live Update
                </span>
              </div>

              <div className="max-w-sm mx-auto">
                <ProductCard product={previewProduct} />
              </div>

              <p className="text-[11px] text-slate-400 text-center mt-3 leading-relaxed">
                Kartu ini akan langsung terlihat oleh pengguna di sekitar {district}, {city} begitu kamu klik &quot;Tayangkan Iklan&quot;.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {successProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 text-center shadow-2xl border border-slate-100">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">
              Iklan Berhasil Ditayangkan!
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 mb-6 max-w-xs mx-auto leading-relaxed">
              Barang Anda sekarang sudah aktif di katalog Seconda dan dapat ditemukan oleh pembeli di sekitar Anda.
            </p>

            <div className="flex flex-col gap-2.5">
              <Link
                href={`/product/${successProduct.id}`}
                className="w-full py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-teal-600/20 transition-all"
              >
                Lihat Halaman Iklan Saya
              </Link>
              <Link
                href="/"
                className="w-full py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-colors"
              >
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
