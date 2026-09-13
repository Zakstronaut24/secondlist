import React from "react";
import { cn } from "@/lib/utils";
import { ItemCondition } from "@/lib/types";

interface ConditionBadgeProps {
  condition: ItemCondition;
  className?: string;
}

export function ConditionBadge({ condition, className }: ConditionBadgeProps) {
  const styles = {
    "Like New": "bg-emerald-50 text-emerald-700 border-emerald-200",
    "Good": "bg-blue-50 text-blue-700 border-blue-200",
    "Fair": "bg-amber-50 text-amber-700 border-amber-200",
  };

  const labels = {
    "Like New": "Seperti Baru",
    "Good": "Bagus / Mulus",
    "Fair": "Layak Pakai",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full border",
        styles[condition],
        className
      )}
    >
      {labels[condition]}
    </span>
  );
}

interface TagBadgeProps {
  label: string;
  variant?: "deal" | "drop" | "new" | "nearby" | "default";
  className?: string;
}

export function TagBadge({ label, variant = "default", className }: TagBadgeProps) {
  const styles = {
    deal: "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xs",
    drop: "bg-rose-500 text-white shadow-xs",
    new: "bg-emerald-600 text-white shadow-xs",
    nearby: "bg-teal-600 text-white shadow-xs",
    default: "bg-slate-100 text-slate-700 border border-slate-200",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center text-[11px] font-bold px-2 py-0.5 rounded-md tracking-tight",
        styles[variant],
        className
      )}
    >
      {label}
    </span>
  );
}
