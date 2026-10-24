import React from 'react';
import { Star } from 'lucide-react';

export default function Rating({ rating = 5, reviewsCount, showCount = true, size = 15 }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.4;

  return (
    <div className="flex items-center gap-1.5 text-[#A66E0C]">
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => {
          const isFilled = i < fullStars;
          const isHalf = i === fullStars && hasHalfStar;

          return (
            <span key={i} className="relative inline-block">
              <Star
                size={size}
                className={
                  isFilled
                    ? "fill-[#DDA133] text-[#DDA133]"
                    : isHalf
                    ? "text-[#DDA133]"
                    : "text-[#E5DFD3] fill-transparent"
                }
              />
              {isHalf && (
                <span className="absolute inset-0 overflow-hidden w-1/2">
                  <Star size={size} className="fill-[#DDA133] text-[#DDA133]" />
                </span>
              )}
            </span>
          );
        })}
      </div>
      <span className="text-xs font-bold text-[#143D2B]">{rating.toFixed(1)}</span>
      {showCount && reviewsCount && (
        <span className="text-[11px] text-[#7A8E84]">({reviewsCount})</span>
      )}
    </div>
  );
}
