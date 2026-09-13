"use client";

import React, { useState } from "react";
import { X, MapPin, Navigation, Check } from "lucide-react";
import { useMarketplace } from "@/context/MarketplaceContext";
import { DEFAULT_LOCATIONS } from "@/lib/mock-data";
import { UserLocation } from "@/lib/types";

export function LocationModal() {
  const { isLocationModalOpen, setIsLocationModalOpen, currentLocation, setCurrentLocation } =
    useMarketplace();
  const [isDetecting, setIsDetecting] = useState(false);

  if (!isLocationModalOpen) return null;

  const handleSelect = (loc: UserLocation) => {
    setCurrentLocation(loc);
    setIsLocationModalOpen(false);
  };

  const handleUseCurrentLocation = () => {
    setIsDetecting(true);
    setTimeout(() => {
      // Simulated GPS detection
      const detected: UserLocation = {
        id: "loc-gps",
        name: "Lokasi Anda Saat Ini",
        district: "Kebayoran Baru",
        city: "Jakarta Selatan",
        lat: -6.2415,
        lng: 106.8005,
      };
      setCurrentLocation(detected);
      setIsDetecting(false);
      setIsLocationModalOpen(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
              <MapPin className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Pilih Area Lokasi</h3>
          </div>
          <button
            onClick={() => setIsLocationModalOpen(false)}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-500 mt-3 mb-4 leading-relaxed">
          Pilih lokasi Anda untuk menemukan barang bekas terdekat yang siap COD hari ini.
        </p>

        {/* GPS Button */}
        <button
          onClick={handleUseCurrentLocation}
          disabled={isDetecting}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-teal-50 hover:bg-teal-100 text-teal-700 font-semibold text-sm transition-colors border border-teal-200 mb-4"
        >
          <Navigation className={`w-4 h-4 ${isDetecting ? "animate-spin text-teal-600" : ""}`} />
          <span>{isDetecting ? "Mendeteksi koordinat GPS..." : "Gunakan Lokasi Saya Saat Ini"}</span>
        </button>

        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
          Area Populer Jabodetabek
        </div>

        {/* Locations List */}
        <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
          {DEFAULT_LOCATIONS.map((loc) => {
            const isSelected = currentLocation.id === loc.id;
            return (
              <button
                key={loc.id}
                onClick={() => handleSelect(loc)}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all ${
                  isSelected
                    ? "bg-teal-600 text-white font-semibold shadow-xs"
                    : "hover:bg-slate-50 text-slate-700 font-medium"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <MapPin
                    className={`w-4 h-4 ${isSelected ? "text-white" : "text-slate-400"}`}
                  />
                  <div>
                    <div className="text-sm">{loc.name}</div>
                    <div
                      className={`text-xs ${
                        isSelected ? "text-teal-100" : "text-slate-400"
                      }`}
                    >
                      Kec. {loc.district}, {loc.city}
                    </div>
                  </div>
                </div>
                {isSelected && <Check className="w-4 h-4 text-white" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
