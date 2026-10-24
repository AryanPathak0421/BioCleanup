import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Tag, 
  Truck,
  Sparkles
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNavigation } from '../../context/NavigationContext';

export default function CartDrawer() {
  const { 
    cartItems, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    subtotal, 
    originalSubtotal,
    productSavings,
    couponDiscount,
    shipping, 
    grandTotal, 
    appliedCoupon, 
    applyCoupon, 
    removeCoupon, 
    couponError,
    freeShippingThreshold,
    isFreeShipping
  } = useCart();

  const { navigateTo } = useNavigation();
  const [couponCodeInput, setCouponCodeInput] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (applyCoupon(couponCodeInput)) {
      setCouponCodeInput('');
    }
  };

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    navigateTo('checkout');
  };

  const handleGoToFullCart = () => {
    setIsCartOpen(false);
    navigateTo('cart');
  };

  return (
    <div className="overlay-backdrop flex justify-end">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-slide-right z-50 border-l border-[#E5DFD3]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#E5DFD3] flex items-center justify-between bg-[#FAF8F3]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#143D2B] text-white flex items-center justify-center">
              <ShoppingBag size={16} />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-[#143D2B]">
                Your Shopping Bag
              </h3>
              <span className="text-xs text-[#7A8E84]">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)} items selected
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-full text-[#7A8E84] hover:bg-[#E5DFD3]/60 transition"
            aria-label="Close Cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="bg-[#EBF5EE] px-5 py-3 border-b border-[#DEF0E3]">
          <div className="flex items-center justify-between text-xs font-semibold text-[#143D2B] mb-1.5">
            <span className="flex items-center gap-1.5">
              <Truck size={14} className="text-emerald-700" />
              {isFreeShipping ? (
                <span className="text-emerald-800 font-bold">🎉 You unlocked FREE Shipping!</span>
              ) : (
                <span>Add <strong>₹{amountNeededForFreeShipping}</strong> more for Free Shipping</span>
              )}
            </span>
            <span className="text-[11px] text-[#5C6E64]">{freeShippingProgress}%</span>
          </div>
          <div className="w-full bg-[#D4EAD9] h-2 rounded-full overflow-hidden">
            <div 
              className="bg-[#143D2B] h-full rounded-full transition-all duration-500"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Items List or Empty State */}
        <div className="p-5 flex-1 overflow-y-auto divide-y divide-[#F2ECE1]">
          {cartItems.length === 0 ? (
            <div className="py-16 text-center flex flex-col items-center justify-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#FAF8F3] border border-[#E5DFD3] flex items-center justify-center text-[#7A8E84]">
                <ShoppingBag size={30} />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="font-display font-bold text-lg text-[#143D2B]">Your Bag is Empty</h4>
                <p className="text-xs text-[#7A8E84] max-w-xs">
                  Experience pure, plant-powered cleanliness without toxins. Add our best-selling cleaners to your bag!
                </p>
              </div>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigateTo('shop');
                }}
                className="btn btn-primary btn-sm mt-2"
              >
                Explore Collection
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.product.id} className="py-4 flex gap-4 items-center group">
                <div 
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('product', { productId: item.product.id });
                  }}
                  className="w-18 h-20 rounded-2xl bg-[#FAF8F3] border border-[#E5DFD3] p-1.5 flex items-center justify-center shrink-0 cursor-pointer overflow-hidden"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-full object-contain group-hover:scale-105 transition"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 
                        onClick={() => {
                          setIsCartOpen(false);
                          navigateTo('product', { productId: item.product.id });
                        }}
                        className="text-sm font-bold text-[#143D2B] hover:text-emerald-700 cursor-pointer line-clamp-1 transition"
                      >
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-[#7A8E84]">
                        {item.product.subtitle} • {item.product.netVol}
                      </p>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-[#7A8E84] hover:text-rose-600 p-1 transition"
                      title="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-[#E5DFD3] rounded-full bg-[#FAF8F3] px-2 py-1 gap-2.5">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="text-[#475850] hover:text-[#143D2B] transition p-0.5"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-xs font-bold text-[#143D2B] w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="text-[#475850] hover:text-[#143D2B] transition p-0.5"
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <span className="text-sm font-extrabold text-[#143D2B]">
                        ₹{item.product.price * item.quantity}
                      </span>
                      {item.product.originalPrice > item.product.price && (
                        <span className="text-[10px] text-[#7A8E84] line-through block">
                          ₹{item.product.originalPrice * item.quantity}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer with Coupon & Order Summary */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-[#E5DFD3] bg-[#FAF8F3] flex flex-col gap-3">
            
            {/* Coupon Code Input */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#EBF5EE] border border-emerald-300 text-xs text-emerald-900">
                  <div className="flex items-center gap-2">
                    <Tag size={15} className="text-emerald-700" />
                    <div>
                      <span className="font-bold">{appliedCoupon.code}</span> applied:
                      <span className="text-emerald-700 font-semibold ml-1">
                        -₹{couponDiscount}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs font-bold text-rose-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={couponCodeInput}
                      onChange={(e) => setCouponCodeInput(e.target.value)}
                      placeholder="Coupon: BIOFIRST"
                      className="w-full text-xs uppercase px-3.5 py-2.5 rounded-xl bg-white border border-[#E5DFD3] focus:outline-none focus:border-[#143D2B]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#143D2B] hover:bg-[#20593E] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && (
                <span className="text-[11px] text-rose-600 font-medium mt-1 block">
                  {couponError}
                </span>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="flex flex-col gap-1.5 text-xs text-[#5C6E64] pt-2 border-t border-[#E5DFD3]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#143D2B]">₹{subtotal}</span>
              </div>

              {productSavings > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Product Discount</span>
                  <span>-₹{productSavings}</span>
                </div>
              )}

              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Coupon Discount ({appliedCoupon?.code})</span>
                  <span>-₹{couponDiscount}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-emerald-700 font-bold uppercase text-[11px]">Free</span>
                  ) : (
                    <span className="font-semibold text-[#143D2B]">₹{shipping}</span>
                  )}
                </span>
              </div>

              <div className="flex justify-between text-sm font-extrabold text-[#143D2B] pt-2 border-t border-[#E5DFD3]">
                <span>Total Amount</span>
                <span className="text-base text-emerald-900">₹{grandTotal}</span>
              </div>
              <span className="text-[10px] text-[#7A8E84]">
                Inclusive of all taxes &amp; GST
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={handleProceedCheckout}
                className="w-full btn btn-primary py-3 rounded-2xl flex items-center justify-center gap-2 text-sm font-bold shadow-lg"
              >
                Proceed to Checkout <ArrowRight size={16} />
              </button>

              <button
                onClick={handleGoToFullCart}
                className="w-full text-center text-xs font-bold text-[#143D2B] hover:underline py-1"
              >
                View Detailed Cart Page →
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#7A8E84] pt-1">
              <ShieldCheck size={14} className="text-emerald-700" />
              <span>Safe &amp; Encrypted 256-Bit SSL Checkout</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
