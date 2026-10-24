import React, { useState } from 'react';
import { X, Heart, ShoppingBag, ArrowRight, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import Rating from '../Rating/Rating';

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, navigateTo } = useNavigation();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!quickViewProduct) return null;

  const isFavorited = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    setAdded(true);
    addToCart(quickViewProduct, qty, true);
    setTimeout(() => setAdded(false), 800);
  };

  const handleBuyNow = () => {
    addToCart(quickViewProduct, qty, false);
    setQuickViewProduct(null);
    navigateTo('checkout');
  };

  const handleViewFullProduct = () => {
    const id = quickViewProduct.id;
    setQuickViewProduct(null);
    navigateTo('product', { productId: id });
  };

  return (
    <div className="overlay-backdrop flex items-center justify-center p-4 sm:p-6 z-50">
      <div 
        className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-[#E5DFD3] overflow-hidden animate-slide-up relative flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 border border-[#E5DFD3] flex items-center justify-center text-[#475850] hover:text-[#143D2B] shadow-xs transition"
        >
          <X size={18} />
        </button>

        {/* Left: Product Image Box */}
        <div className="w-full md:w-1/2 bg-[#FAF8F3] p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-[#E5DFD3] relative">
          <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
            <span className="badge badge-leaf">
              <Sparkles size={11} className="text-emerald-700" />
              100% Bio-Active
            </span>
            {quickViewProduct.discount > 0 && (
              <span className="badge badge-terracotta">
                {quickViewProduct.discount}% OFF
              </span>
            )}
          </div>

          <div className="w-full h-64 md:h-80 flex items-center justify-center p-4">
            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              className="max-h-full max-w-full object-contain drop-shadow-md"
            />
          </div>

          <span className="text-[11px] font-semibold text-[#7A8E84] mt-2">
            Net Volume: {quickViewProduct.netVol}
          </span>
        </div>

        {/* Right: Info and Action */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center justify-between text-xs text-[#7A8E84] mb-1">
              <span className="font-bold text-emerald-800 uppercase tracking-wider">
                {quickViewProduct.category}
              </span>
              <button
                onClick={() => toggleWishlist(quickViewProduct.id)}
                className="flex items-center gap-1 text-xs font-semibold hover:text-rose-600 transition"
              >
                <Heart size={16} className={isFavorited ? "fill-rose-500 text-rose-500" : ""} />
                {isFavorited ? 'Saved' : 'Save'}
              </button>
            </div>

            <h3 className="font-display font-bold text-xl sm:text-2xl text-[#143D2B] leading-tight">
              {quickViewProduct.name}
            </h3>

            <p className="text-xs font-medium text-[#5C6E64] mt-1">
              {quickViewProduct.subtitle}
            </p>

            <div className="mt-2.5">
              <Rating rating={quickViewProduct.rating} reviewsCount={quickViewProduct.reviewsCount} />
            </div>

            {/* Price block */}
            <div className="flex items-baseline gap-2.5 mt-4 p-3 rounded-2xl bg-[#FAF8F3] border border-[#E5DFD3]">
              <span className="text-2xl font-extrabold text-[#143D2B]">
                ₹{quickViewProduct.price}
              </span>
              {quickViewProduct.originalPrice > quickViewProduct.price && (
                <span className="text-sm text-[#7A8E84] line-through font-medium">
                  ₹{quickViewProduct.originalPrice}
                </span>
              )}
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full ml-auto">
                {quickViewProduct.discount}% OFF
              </span>
            </div>

            <p className="text-xs text-[#5C6E64] mt-3 leading-relaxed">
              {quickViewProduct.shortDesc}
            </p>

            {/* Key benefits list */}
            <div className="mt-4 flex flex-col gap-1.5">
              {quickViewProduct.keyPoints?.slice(0, 3).map((pt, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-[#2F3E36]">
                  <Check size={14} className="text-emerald-600 shrink-0 stroke-[3]" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-6 pt-4 border-t border-[#F2ECE1] flex flex-col gap-3">
            <div className="flex items-center gap-3">
              {/* Quantity */}
              <div className="flex items-center border border-[#E5DFD3] rounded-full bg-[#FAF8F3] px-3 py-1.5 gap-3">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="text-sm font-bold text-[#475850] hover:text-[#143D2B]"
                >
                  -
                </button>
                <span className="text-xs font-bold text-[#143D2B] w-4 text-center">
                  {qty}
                </span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="text-sm font-bold text-[#475850] hover:text-[#143D2B]"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={added}
                className="btn btn-primary flex-1 py-2.5 text-xs font-bold"
              >
                {added ? (
                  <>
                    <Check size={14} /> Added to Bag
                  </>
                ) : (
                  <>
                    <ShoppingBag size={14} /> Add to Cart
                  </>
                )}
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              className="btn btn-accent w-full py-2.5 text-xs font-bold"
            >
              Instant Buy Now (₹{quickViewProduct.price * qty})
            </button>

            <button
              onClick={handleViewFullProduct}
              className="text-center text-xs font-bold text-emerald-800 hover:underline pt-1 flex items-center justify-center gap-1"
            >
              Inspect Complete Label, Directions &amp; Ingredients →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
