"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Send,
  ArrowLeft,
  Tag,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Clock,
  Search,
} from "lucide-react";
import { useMarketplace } from "@/context/MarketplaceContext";
import { formatRupiah } from "@/lib/utils";
import { CURRENT_USER } from "@/lib/mock-data";

const QUICK_CHIPS = [
  "Halo, apakah barang masih tersedia?",
  "Bisa ketemuan besok?",
  "Bisa nego harga tipis?",
  "Boleh minta info kelengkapannya?",
];

function ChatContent() {
  const searchParams = useSearchParams();
  const requestedConvId = searchParams.get("convId");

  const {
    conversations,
    messages,
    sendMessage,
    respondToOffer,
    openOfferModal,
  } = useMarketplace();

  // Active conversation selection
  const [activeConvId, setActiveConvId] = useState<string>(() => {
    if (requestedConvId && conversations.some((c) => c.id === requestedConvId)) {
      return requestedConvId;
    }
    return conversations[0]?.id || "";
  });

  // Mobile toggle between list view and chat view
  const [showMobileChat, setShowMobileChat] = useState<boolean>(Boolean(requestedConvId));
  const [inputMessage, setInputMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sync if requestedConvId changes
  useEffect(() => {
    if (requestedConvId && conversations.some((c) => c.id === requestedConvId)) {
      setActiveConvId(requestedConvId);
      setShowMobileChat(true);
    }
  }, [requestedConvId, conversations]);

  // Auto scroll to bottom of messages
  const activeMessages = messages[activeConvId] || [];
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeMessages.length, activeConvId]);

  const activeConv = conversations.find((c) => c.id === activeConvId);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim() || !activeConvId) return;

    sendMessage(activeConvId, inputMessage.trim());
    setInputMessage("");
  };

  const handleQuickChipClick = (text: string) => {
    if (!activeConvId) return;
    sendMessage(activeConvId, text);
  };

  const handleSelectConv = (id: string) => {
    setActiveConvId(id);
    setShowMobileChat(true);
  };

  // Filter conversations by seller or product title
  const filteredConversations = conversations.filter((c) => {
    const q = searchTerm.toLowerCase();
    return (
      c.otherUser.name.toLowerCase().includes(q) ||
      c.product.title.toLowerCase().includes(q) ||
      c.lastMessage.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-100 flex flex-col">
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col p-2 sm:p-4 lg:p-6">
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm flex-1 flex overflow-hidden min-h-[580px] h-[calc(100vh-8rem)]">
          {/* ================= LEFT SIDE: CONVERSATION LIST ================= */}
          <div
            className={`w-full md:w-80 lg:w-96 border-r border-slate-200/80 flex flex-col bg-white ${
              showMobileChat ? "hidden md:flex" : "flex"
            }`}
          >
            {/* Header */}
            <div className="p-4 border-b border-slate-100">
              <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center justify-between">
                <span>Pesan & Negosiasi</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700">
                  {conversations.length} Obrolan
                </span>
              </h2>

              {/* Search Bar in list */}
              <div className="relative mt-3">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari obrolan atau barang..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-teal-600 text-slate-800"
                />
                <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
              </div>
            </div>

            {/* Conversation List Items */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
              {filteredConversations.length > 0 ? (
                filteredConversations.map((conv) => {
                  const isSelected = conv.id === activeConvId;
                  return (
                    <button
                      key={conv.id}
                      onClick={() => handleSelectConv(conv.id)}
                      type="button"
                      className={`w-full p-3.5 flex items-start gap-3 text-left transition-colors ${
                        isSelected
                          ? "bg-teal-50/60 border-l-4 border-teal-600"
                          : "hover:bg-slate-50"
                      }`}
                    >
                      {/* Product Thumbnail with OtherUser Avatar overlay */}
                      <div className="relative w-12 h-12 shrink-0">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-200 relative">
                          <Image
                            src={conv.product.photos[0]}
                            alt={conv.product.title}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full overflow-hidden border-2 border-white shadow-xs">
                          <Image
                            src={conv.otherUser.avatar}
                            alt={conv.otherUser.name}
                            fill
                            sizes="20px"
                            className="object-cover"
                          />
                        </div>
                      </div>

                      {/* Info & Last Message */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                            {conv.otherUser.name}
                          </span>
                          <span className="text-[10px] text-slate-400 shrink-0">
                            {conv.updatedAt}
                          </span>
                        </div>

                        <div className="text-[11px] font-semibold text-teal-700 truncate mt-0.5">
                          {conv.product.title}
                        </div>

                        <p className="text-xs text-slate-500 truncate mt-1">
                          {conv.lastMessage}
                        </p>
                      </div>

                      {/* Unread badge */}
                      {conv.unreadCount > 0 && (
                        <div className="w-5 h-5 rounded-full bg-teal-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 self-center">
                          {conv.unreadCount}
                        </div>
                      )}
                    </button>
                  );
                })
              ) : (
                <div className="p-8 text-center text-xs text-slate-400">
                  Tidak ada obrolan ditemukan.
                </div>
              )}
            </div>
          </div>

          {/* ================= RIGHT SIDE: ACTIVE CHAT ================= */}
          {activeConv ? (
            <div
              className={`flex-1 flex flex-col bg-slate-50/50 ${
                showMobileChat ? "flex" : "hidden md:flex"
              }`}
            >
              {/* Active Header */}
              <div className="p-3 sm:p-4 bg-white border-b border-slate-200/80 flex items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-3 min-w-0">
                  {/* Mobile Back Button */}
                  <button
                    onClick={() => setShowMobileChat(false)}
                    className="md:hidden p-1.5 rounded-full text-slate-500 hover:bg-slate-100"
                    aria-label="Kembali ke daftar pesan"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>

                  {/* Seller Avatar */}
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-200 shrink-0">
                    <Image
                      src={activeConv.otherUser.avatar}
                      alt={activeConv.otherUser.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-sm sm:text-base text-slate-900 truncate">
                        {activeConv.otherUser.name}
                      </span>
                      {activeConv.otherUser.verified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      )}
                    </div>
                    <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                      <span>Online • Biasa balas {activeConv.otherUser.responseTime}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => openOfferModal(activeConv.product)}
                    className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200 transition-colors"
                  >
                    <Tag className="w-3.5 h-3.5 text-amber-700" />
                    <span>Tawar Harga</span>
                  </button>
                  <Link
                    href={`/product/${activeConv.product.id}`}
                    className="p-2 text-slate-500 hover:text-teal-700 hover:bg-slate-50 rounded-xl"
                    title="Buka Halaman Barang"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Mini Product Context Bar */}
              <div className="bg-white/80 border-b border-slate-200/60 px-4 py-2.5 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0 bg-slate-200">
                    <Image
                      src={activeConv.product.photos[0]}
                      alt={activeConv.product.title}
                      fill
                      sizes="32px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-800 truncate">
                      {activeConv.product.title}
                    </div>
                    <div className="font-extrabold text-teal-700">
                      {formatRupiah(activeConv.product.price)}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => openOfferModal(activeConv.product)}
                  className="sm:hidden text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-1 rounded-lg"
                >
                  Nego
                </button>
              </div>

              {/* Safety Alert inside conversation */}
              <div className="px-4 pt-3">
                <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/70 flex items-center gap-2 text-amber-900 text-[11px]">
                  <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    <strong>Tips COD:</strong> Bertemu di tempat umum yang ramai (stasiun/mall) dan cek fisik barang sebelum membayar.
                  </span>
                </div>
              </div>

              {/* Messages Flow Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {activeMessages.map((msg) => {
                  const isMe = msg.senderId === CURRENT_USER.id;
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                    >
                      {/* If Message is an Offer */}
                      {msg.isOffer ? (
                        <div
                          className={`max-w-xs sm:max-w-sm rounded-2xl p-4 shadow-xs border ${
                            isMe
                              ? "bg-teal-700 text-white border-teal-800"
                              : "bg-white text-slate-900 border-slate-200"
                          }`}
                        >
                          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider mb-1 text-amber-300">
                            <Tag className="w-3.5 h-3.5" />
                            <span>Pengajuan Penawaran Harga</span>
                          </div>
                          <div className="text-xl font-black my-1">
                            {formatRupiah(msg.offerAmount || 0)}
                          </div>
                          <p className="text-xs leading-relaxed opacity-90">{msg.text}</p>

                          <div className="mt-2.5 pt-2 border-t border-white/20 flex items-center justify-between text-[11px]">
                            <span className="font-semibold">
                              Status:{" "}
                              <span
                                className={`px-1.5 py-0.5 rounded font-bold uppercase text-[10px] ${
                                  msg.offerStatus === "accepted"
                                    ? "bg-emerald-500 text-white"
                                    : msg.offerStatus === "declined"
                                    ? "bg-rose-500 text-white"
                                    : "bg-amber-400 text-slate-900"
                                }`}
                              >
                                {msg.offerStatus === "accepted"
                                  ? "Disetujui"
                                  : msg.offerStatus === "declined"
                                  ? "Ditolak"
                                  : "Menunggu Jawaban"}
                              </span>
                            </span>
                            <span className="opacity-75">{msg.timestamp}</span>
                          </div>
                        </div>
                      ) : (
                        /* Normal Bubble */
                        <div
                          className={`max-w-xs sm:max-w-md rounded-2xl px-4 py-2.5 text-xs sm:text-sm shadow-xs ${
                            isMe
                              ? "bg-teal-600 text-white rounded-br-xs"
                              : "bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs"
                          }`}
                        >
                          <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                          <span
                            className={`text-[10px] block text-right mt-1 ${
                              isMe ? "text-teal-200" : "text-slate-400"
                            }`}
                          >
                            {msg.timestamp}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Reply Chips */}
              <div className="px-4 py-2 bg-white/60 border-t border-slate-100 flex gap-1.5 overflow-x-auto scrollbar-none">
                {QUICK_CHIPS.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleQuickChipClick(chip)}
                    className="px-2.5 py-1 rounded-full bg-white hover:bg-teal-50 border border-slate-200 hover:border-teal-300 text-slate-600 hover:text-teal-700 text-[11px] font-medium whitespace-nowrap transition-colors"
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Chat Input Bar */}
              <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
                <form onSubmit={handleSend} className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openOfferModal(activeConv.product)}
                    className="p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 transition-colors shrink-0"
                    title="Ajukan Penawaran Harga"
                  >
                    <Tag className="w-4 h-4" />
                  </button>

                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Tulis pesan untuk penjual... (tekan Enter untuk kirim)"
                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 focus:bg-white border border-slate-200 focus:border-teal-600 focus:outline-none text-xs sm:text-sm text-slate-800 transition-colors"
                  />

                  <button
                    type="submit"
                    disabled={!inputMessage.trim()}
                    className="p-2.5 sm:px-4 sm:py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-40 disabled:hover:bg-teal-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-xs"
                  >
                    <Send className="w-4 h-4" />
                    <span className="hidden sm:inline">Kirim</span>
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400">
              <MessageSquare className="w-12 h-12 mb-2 stroke-1" />
              <h3 className="font-bold text-slate-700 text-base">Belum Ada Obrolan Dipilih</h3>
              <p className="text-xs text-slate-500 max-w-xs mt-1">
                Pilih salah satu obrolan dari daftar sebelah kiri atau klik &quot;Chat Penjual&quot; pada produk.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
          <div className="text-center text-slate-500 text-sm font-medium">
            Memuat obrolan...
          </div>
        </div>
      }
    >
      <ChatContent />
    </Suspense>
  );
}
