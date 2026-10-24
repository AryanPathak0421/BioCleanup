import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Check, Sparkles } from 'lucide-react';
import Rating from '../Rating/Rating';
import { useNavigation } from '../../context/NavigationContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function ProductCard({ product }) {
  const { navigateTo, setQuickViewProduct } = useNavigation();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [isAdding, setIsAdding] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product, 1, true);
    setTimeout(() => setIsAdding(false), 800);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div 
      onClick={() => navigateTo('product', { productId: product.id })}
      className="product-card group cursor-pointer flex flex-col justify-between"
    >
      {/* Top Media Area */}
      <div className="relative w-full aspect-[4/5] bg-gradient-to-b from-[#F7F5F0] to-[#EFECE5] overflow-hidden flex items-center justify-center p-3">
        
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
          {product.isBestSeller && (
            <span className="badge badge-leaf shadow-xs">
              <Sparkles size={11} className="text-emerald-700" />
              Best Seller
            </span>
          )}
          {product.discount > 0 && (
            <span className="badge badge-terracotta shadow-xs">
              {product.discount}% OFF
            </span>
          )}
          {product.isComingSoonImage && (
            <span className="badge badge-gold shadow-xs">
              New Launch
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition shadow-xs ${
            isFavorited 
              ? 'bg-rose-50 text-rose-500 hover:bg-rose-100' 
              : 'bg-white/90 text-[#475850] hover:bg-white hover:text-rose-500'
          }`}
          aria-label="Wishlist"
          title={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={18} className={isFavorited ? "fill-rose-500" : ""} />
        </button>

        {/* Product Image */}
        <div className="w-full h-full flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>

        {/* Quick View Button (desktop hover) */}
        <div className="absolute inset-x-3 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 hidden sm:block">
          <button
            onClick={handleQuickView}
            className="w-full py-2.5 rounded-full bg-[#143D2B]/90 hover:bg-[#143D2B] text-white backdrop-blur-md text-xs font-bold tracking-wider flex items-center justify-center gap-1.5 shadow-md transition"
          >
            <Eye size={15} /> Quick View
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3 bg-white">
        
        <div>
          {/* Category & Net Vol */}
          <div className="flex items-center justify-between text-xs text-[#7A8E84] mb-1.5">
            <span className="font-semibold text-emerald-800 tracking-wide uppercase text-[11px]">
              {product.category}
            </span>
            <span className="bg-[#FAF8F3] px-2 py-0.5 rounded-full border border-[#E5DFD3] text-[11px] font-medium text-[#475850]">
              {product.netVol}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-display font-bold text-base sm:text-lg text-[#143D2B] group-hover:text-emerald-700 transition leading-snug line-clamp-1">
            {product.name}
          </h3>

          {/* Subtitle / flavour */}
          <p className="text-xs text-[#5C6E64] font-medium mt-0.5 line-clamp-1">
            {product.subtitle}
          </p>

          {/* Star Rating */}
          <div className="mt-2">
            <Rating rating={product.rating} reviewsCount={product.reviewsCount} />
          </div>
        </div>

        {/* Price & Add to Cart Action */}
        <div className="pt-3 border-t border-[#F2ECE1] flex items-center justify-between gap-2 mt-auto">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg sm:text-xl font-extrabold text-[#143D2B]">
                ₹{product.price}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-[#7A8E84] line-through font-medium">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-700 font-semibold">
              Save ₹{product.originalPrice - product.price}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock || isAdding}
            className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
              isAdding
                ? 'bg-emerald-600 text-white'
                : 'bg-[#143D2B] hover:bg-[#20593E] text-white shadow-xs'
            }`}
          >
            {isAdding ? (
              <>
                <Check size={14} className="stroke-[3]" /> Added
              </>
            ) : (
              <>
                <ShoppingBag size={14} /> Add
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
