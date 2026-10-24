import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { products } from '../../data/products';
import Rating from '../Rating/Rating';

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, navigateTo } = useNavigation();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const popularSearches = [
    "Floor Cleaner",
    "Toilet Cleaner",
    "Hand Wash",
    "Lime Dish Wash",
    "10X Max",
    "pH Balanced"
  ];

  const filteredProducts = query.trim()
    ? products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.ingredients.some((ing) => ing.toLowerCase().includes(query.toLowerCase())) ||
        p.shortDesc.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSelectProduct = (productId) => {
    setIsSearchOpen(false);
    navigateTo('product', { productId });
  };

  const handleSearchTagClick = (tag) => {
    setQuery(tag);
  };

  return (
    <div className="overlay-backdrop flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24">
      <div 
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-[#E5DFD3] overflow-hidden animate-slide-up flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div className="p-4 sm:p-5 border-b border-[#E5DFD3] flex items-center gap-3 bg-[#FAF8F3]">
          <Search size={22} className="text-[#143D2B]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search floor cleaner, hand wash, lime dish wash..."
            className="w-full bg-transparent text-base sm:text-lg font-medium text-[#143D2B] placeholder-[#7A8E84] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-[#7A8E84] hover:bg-[#E5DFD3]/50 transition"
            >
              <X size={18} />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs font-bold text-[#7A8E84] hover:text-[#143D2B] px-2.5 py-1 rounded-full bg-white border border-[#E5DFD3] transition"
          >
            ESC
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto">
          {/* Default State: Popular tags */}
          {!query.trim() && (
            <div className="flex flex-col gap-5">
              <div>
                <span className="text-xs uppercase font-bold text-[#7A8E84] flex items-center gap-1.5 mb-3 tracking-wider">
                  <TrendingUp size={14} className="text-emerald-700" /> Popular Searches
                </span>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleSearchTagClick(tag)}
                      className="px-3.5 py-1.5 rounded-full bg-[#FAF8F3] hover:bg-[#EBF5EE] text-[#143D2B] text-xs font-semibold border border-[#E5DFD3] hover:border-emerald-500 transition"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#E5DFD3] pt-4">
                <span className="text-xs uppercase font-bold text-[#7A8E84] mb-3 block tracking-wider">
                  Featured Eco Formulations
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {products.slice(0, 4).map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleSelectProduct(item.id)}
                      className="p-3 rounded-2xl border border-[#E5DFD3] hover:border-emerald-600/40 hover:bg-[#FAF8F3] transition cursor-pointer flex items-center gap-3"
                    >
                      <div className="w-12 h-12 rounded-xl bg-[#FAF8F3] p-1 flex items-center justify-center shrink-0">
                        <img src={item.image} alt={item.name} className="h-full object-contain" />
                      </div>
                      <div className="overflow-hidden">
                        <h4 className="text-xs font-bold text-[#143D2B] truncate">{item.name}</h4>
                        <p className="text-[11px] text-[#7A8E84] truncate">{item.subtitle}</p>
                        <span className="text-xs font-extrabold text-[#143D2B] mt-0.5 block">₹{item.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Results State */}
          {query.trim() && filteredProducts.length > 0 && (
            <div className="flex flex-col gap-3">
              <span className="text-xs text-[#7A8E84] font-medium">
                Found <strong className="text-[#143D2B]">{filteredProducts.length}</strong> clean products
              </span>
              <div className="flex flex-col divide-y divide-[#F2ECE1]">
                {filteredProducts.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelectProduct(item.id)}
                    className="py-3 px-2 rounded-xl hover:bg-[#FAF8F3] transition cursor-pointer flex items-center justify-between gap-4 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl bg-white border border-[#E5DFD3] p-1.5 flex items-center justify-center shrink-0">
                        <img src={item.image} alt={item.name} className="h-full object-contain" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                          {item.category} • {item.netVol}
                        </span>
                        <h4 className="text-sm font-bold text-[#143D2B] group-hover:text-emerald-700 transition">
                          {item.name}
                        </h4>
                        <p className="text-xs text-[#5C6E64] line-clamp-1">{item.subtitle}</p>
                        <div className="mt-1">
                          <Rating rating={item.rating} reviewsCount={item.reviewsCount} size={12} />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-base font-extrabold text-[#143D2B]">
                        ₹{item.price}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-[#EBF5EE] text-[#143D2B] flex items-center justify-center group-hover:bg-[#143D2B] group-hover:text-white transition">
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {query.trim() && filteredProducts.length === 0 && (
            <div className="py-12 text-center flex flex-col items-center justify-center gap-3">
              <div className="w-14 h-14 rounded-full bg-[#FAF8F3] border border-[#E5DFD3] flex items-center justify-center text-[#7A8E84]">
                <Search size={24} />
              </div>
              <h4 className="text-base font-bold text-[#143D2B]">No clean products found</h4>
              <p className="text-xs text-[#7A8E84] max-w-sm">
                We couldn't find any formulation matching "{query}". Try checking your spelling or search for "floor", "toilet", "lime", or "hand wash".
              </p>
              <button
                onClick={() => setQuery('')}
                className="mt-2 text-xs font-bold text-emerald-700 hover:underline"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
