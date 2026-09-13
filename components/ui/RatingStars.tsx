import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  reviewsCount?: number;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function RatingStars({
  rating,
  reviewsCount,
  showText = true,
  size = "sm",
  className,
}: RatingStarsProps) {
  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base font-medium",
  };

  return (
    <div className={cn("inline-flex items-center gap-1 text-amber-500", className)}>
      <Star className={cn(iconSizes[size], "fill-amber-400 text-amber-400")} />
      {showText && (
        <span className={cn(textSizes[size], "font-bold text-slate-800")}>
          {rating.toFixed(1)}
        </span>
      )}
      {reviewsCount !== undefined && (
        <span className={cn(textSizes[size], "text-slate-500 font-normal")}>
          ({reviewsCount})
        </span>
      )}
    </div>
  );
}
