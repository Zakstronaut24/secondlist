"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, PlusCircle, MessageSquare, User } from "lucide-react";
import { useMarketplace } from "@/context/MarketplaceContext";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const pathname = usePathname();
  const { unreadChatCount } = useMarketplace();

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Cari", href: "/search", icon: Search },
    { label: "Jual", href: "/sell", icon: PlusCircle, isHighlight: true },
    {
      label: "Chat",
      href: "/chat",
      icon: MessageSquare,
      badge: unreadChatCount > 0 ? unreadChatCount : undefined,
    },
    { label: "Akun", href: "/profile", icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg px-2 py-1.5 safe-area-pb">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          if (item.isHighlight) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center -mt-4 group"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-teal-600 to-emerald-500 text-white flex items-center justify-center shadow-lg shadow-teal-600/30 group-active:scale-90 transition-transform">
                  <PlusCircle className="w-6 h-6 stroke-[2.5]" />
                </div>
                <span className="text-[10px] font-bold text-teal-700 mt-0.5">
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-colors",
                isActive
                  ? "text-teal-700 font-bold"
                  : "text-slate-500 hover:text-slate-800 font-medium"
              )}
            >
              <div className="relative">
                <Icon className={cn("w-5 h-5", isActive && "stroke-[2.5]")} />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-rose-500 text-white text-[9px] font-extrabold rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
