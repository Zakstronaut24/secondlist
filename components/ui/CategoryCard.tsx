"use client";

import React from "react";
import Link from "next/link";
import {
  Smartphone,
  Shirt,
  Armchair,
  Home,
  Dumbbell,
  BookOpen,
  Gamepad2,
  Car,
  Package,
} from "lucide-react";
import { CategoryItem } from "@/lib/types";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  Smartphone,
  Shirt,
  Armchair,
  Home,
  Dumbbell,
  BookOpen,
  Gamepad2,
  Car,
  Package,
};

interface CategoryCardProps {
  category: CategoryItem;
  isActive?: boolean;
  onClick?: () => void;
  asPill?: boolean;
}

export function CategoryCard({ category, isActive = false, onClick, asPill = false }: CategoryCardProps) {
  const IconComponent = iconMap[category.iconName] || Package;

  if (asPill) {
    return (
      <button
        onClick={onClick}
        type="button"
        className={cn(
          "inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all border shrink-0 active:scale-95",
          isActive
            ? "bg-teal-700 text-white border-teal-700 shadow-sm"
            : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
        )}
      >
        <IconComponent className={cn("w-3.5 h-3.5", isActive ? "text-white" : "text-teal-600")} />
        <span>{category.name}</span>
      </button>
    );
  }

  return (
    <Link
      href={`/search?category=${encodeURIComponent(category.name)}`}
      className={cn(
        "group flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:border-teal-300 hover:-translate-y-0.5 transition-all text-center",
        isActive && "border-teal-600 ring-2 ring-teal-600/20"
      )}
    >
      <div
        className={cn(
          "w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110",
          category.color
        )}
      >
        <IconComponent className="w-6 h-6 sm:w-7 sm:h-7" />
      </div>
      <span className="mt-2.5 font-semibold text-slate-800 text-xs sm:text-sm group-hover:text-teal-700 transition-colors">
        {category.name}
      </span>
      <span className="text-[11px] text-slate-400 mt-0.5">
        {category.itemCount}+ barang
      </span>
    </Link>
  );
}
