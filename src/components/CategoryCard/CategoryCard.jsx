import React from 'react';
import { ArrowUpRight, Sparkles, ShieldCheck, Heart, Utensils, Leaf } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

const iconMap = {
  Sparkles: Sparkles,
  ShieldCheck: ShieldCheck,
  Heart: Heart,
  Utensils: Utensils,
  Leaf: Leaf
};

export default function CategoryCard({ category }) {
  const { navigateTo } = useNavigation();
  const IconComponent = iconMap[category.icon] || Sparkles;

  if (category.id === 'all') return null;

  return (
    <div
      onClick={() => navigateTo('shop', { category: category.id })}
      className="group relative rounded-3xl overflow-hidden cursor-pointer border border-[#E5DFD3] bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between"
      style={{ minHeight: '260px' }}
    >
      {/* Background soft tint */}
      <div 
        className="absolute inset-0 opacity-10 transition-opacity group-hover:opacity-20 pointer-events-none"
        style={{ backgroundColor: category.accent || '#143D2B' }}
      />

      {/* Top Header */}
      <div className="p-5 z-10 flex items-start justify-between">
        <div className="flex flex-col">
          <div className="w-10 h-10 rounded-2xl bg-[#FAF8F3] border border-[#E5DFD3] flex items-center justify-center text-[#143D2B] shadow-xs group-hover:bg-[#143D2B] group-hover:text-white transition-colors duration-300">
            <IconComponent size={20} />
          </div>
          <span className="text-[11px] font-bold text-[#7A8E84] mt-3 uppercase tracking-wider">
            {category.count} Products
          </span>
          <h3 className="font-display font-bold text-lg text-[#143D2B] mt-0.5 group-hover:text-emerald-800 transition">
            {category.name}
          </h3>
          <p className="text-xs text-[#5C6E64] mt-1 max-w-[180px]">
            {category.tagline}
          </p>
        </div>

        <div className="w-9 h-9 rounded-full bg-white border border-[#E5DFD3] flex items-center justify-center text-[#143D2B] shadow-xs group-hover:bg-[#143D2B] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
          <ArrowUpRight size={18} />
        </div>
      </div>

      {/* Image Preview */}
      <div className="relative h-32 w-full mt-auto flex items-end justify-center overflow-hidden px-4 pb-2">
        <img
          src={category.image}
          alt={category.name}
          className="h-28 object-contain object-bottom group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
      </div>
    </div>
  );
}
