import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="product-card p-4 flex flex-col gap-3">
      <div className="w-full aspect-[4/5] skeleton rounded-2xl" />
      <div className="flex justify-between items-center mt-2">
        <div className="w-20 h-4 skeleton" />
        <div className="w-12 h-4 skeleton rounded-full" />
      </div>
      <div className="w-3/4 h-5 skeleton" />
      <div className="w-1/2 h-3.5 skeleton" />
      <div className="flex justify-between items-center mt-3 pt-3 border-t border-[#F2ECE1]">
        <div className="w-16 h-6 skeleton" />
        <div className="w-20 h-8 skeleton rounded-full" />
      </div>
    </div>
  );
}
