import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShieldCheck, 
  Tag, 
  Truck, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNavigation } from '../../context/NavigationContext';
import EmptyState from '../../components/EmptyState/EmptyState';

export default function CartPage() {
  const { 
    cartItems, 
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
  const [couponCode, setCouponCode] = useState('');

  const amountNeeded = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApply = (e) => {
    e.preventDefault();
    if (applyCoupon(couponCode)) {
      setCouponCode('');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container py-16">
        <EmptyState
          icon={ShoppingBag}
          title="Your Shopping Bag is Empty"
          description="Looks like you haven't added any clean, plant-powered essentials to your cart yet."
          actionText="Start Shopping"
          actionTarget="shop"
        />
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-12 pb-24">
      <div className="flex items-center justify-between pb-6 border-b border-[#E5DFD3] mb-8">
        <div>
          <span className="badge badge-leaf mb-1">Your Selected Essentials</span>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#143D2B]">
            Shopping Bag ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} Items)
          </h1>
        </div>
        <button
          onClick={() => navigateTo('shop')}
          className="text-xs font-bold text-emerald-800 hover:underline"
        >
          ← Continue Shopping
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Cart Items Table */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Free Shipping Progress Card */}
          <div className="p-4 rounded-2xl bg-[#EBF5EE] border border-[#DEF0E3]">
            <div className="flex items-center justify-between text-xs font-semibold text-[#143D2B] mb-2">
              <span className="flex items-center gap-1.5">
                <Truck size={16} className="text-emerald-700" />
                {isFreeShipping ? (
                  <strong className="text-emerald-800">🎉 Congratulations! You have unlocked FREE Express Shipping!</strong>
                ) : (
                  <span>Add <strong>₹{amountNeeded}</strong> more to qualify for <strong>FREE Delivery</strong></span>
                )}
              </span>
              <span className="text-xs font-bold text-emerald-800">{progressPercent}%</span>
            </div>
            <div className="w-full bg-[#D4EAD9] h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-[#143D2B] h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="bg-white rounded-3xl border border-[#E5DFD3] p-4 sm:p-6 shadow-xs divide-y divide-[#F2ECE1]">
            {cartItems.map((item) => (
              <div key={item.product.id} className="py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                
                <div className="flex items-center gap-4">
                  <div 
                    onClick={() => navigateTo('product', { productId: item.product.id })}
                    className="w-20 h-24 rounded-2xl bg-[#FAF8F3] border border-[#E5DFD3] p-1.5 flex items-center justify-center shrink-0 cursor-pointer"
                  >
                    <img src={item.product.image} alt={item.product.name} className="h-full object-contain" />
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                      {item.product.category} • {item.product.netVol}
                    </span>
                    <h3 
                      onClick={() => navigateTo('product', { productId: item.product.id })}
                      className="font-display font-bold text-base text-[#143D2B] hover:text-emerald-700 cursor-pointer transition line-clamp-1"
                    >
                      {item.product.name}
                    </h3>
                    <p className="text-xs text-[#7A8E84] mt-0.5">{item.product.subtitle}</p>
                    <span className="text-xs font-extrabold text-[#143D2B] mt-1 block">
                      ₹{item.product.price} each
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#F2ECE1]">
                  {/* Quantity */}
                  <div className="flex items-center border border-[#E5DFD3] rounded-full bg-[#FAF8F3] px-3 py-1.5 gap-3">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="text-xs font-bold text-[#475850] hover:text-[#143D2B]"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-xs font-extrabold text-[#143D2B] w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="text-xs font-bold text-[#475850] hover:text-[#143D2B]"
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right min-w-[70px]">
                    <span className="text-base font-extrabold text-[#143D2B]">
                      ₹{item.product.price * item.quantity}
                    </span>
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-[#7A8E84] hover:text-rose-600 p-1.5 transition"
                    title="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#E5DFD3] flex items-center justify-between text-xs text-[#5C6E64]">
            <span className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-emerald-700" />
              100% Biodegradable &amp; Leakage Protection Guarantee
            </span>
            <span className="text-emerald-800 font-bold hidden sm:inline">Dispatches in 24 Hours</span>
          </div>

        </div>

        {/* Right Column: Order Summary Card */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-[#E5DFD3] p-6 shadow-sm flex flex-col gap-5 sticky top-24">
          <h3 className="font-display font-bold text-lg text-[#143D2B] pb-3 border-b border-[#F2ECE1]">
            Order Summary
          </h3>

          {/* Coupon Code */}
          <div>
            <label className="text-xs font-bold text-[#475850] block mb-1.5">
              Have a Promo Coupon?
            </label>
            {appliedCoupon ? (
              <div className="p-3 rounded-2xl bg-[#EBF5EE] border border-emerald-300 flex items-center justify-between text-xs text-emerald-900">
                <div className="flex items-center gap-2">
                  <Tag size={16} className="text-emerald-700" />
                  <div>
                    <span className="font-bold">{appliedCoupon.code}</span> applied:
                    <span className="font-semibold text-emerald-800 ml-1">
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
              <form onSubmit={handleApply} className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="e.g. BIOFIRST (-15%)"
                  className="w-full text-xs uppercase px-3 py-2.5 rounded-xl border border-[#E5DFD3] focus:border-[#143D2B] focus:outline-none"
                />
                <button
                  type="submit"
                  className="btn btn-primary btn-sm py-2 px-4 text-xs font-bold"
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
            <div className="flex flex-wrap gap-1.5 mt-2 text-[10px] text-[#7A8E84]">
              <span>Try:</span>
              <button onClick={() => applyCoupon('BIOFIRST')} className="text-emerald-700 font-bold underline">BIOFIRST</button>
              <span>•</span>
              <button onClick={() => applyCoupon('CLEAN50')} className="text-emerald-700 font-bold underline">CLEAN50</button>
            </div>
          </div>

          {/* Cost Line Items */}
          <div className="flex flex-col gap-2.5 text-xs text-[#5C6E64] pt-3 border-t border-[#F2ECE1]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-[#143D2B]">₹{subtotal}</span>
            </div>

            {productSavings > 0 && (
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>Product Discount Savings</span>
                <span>-₹{productSavings}</span>
              </div>
            )}

            {couponDiscount > 0 && (
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>Coupon ({appliedCoupon?.code})</span>
                <span>-₹{couponDiscount}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Shipping &amp; Handling</span>
              <span>
                {shipping === 0 ? (
                  <span className="text-emerald-700 font-bold uppercase text-[11px]">Free</span>
                ) : (
                  <span className="font-semibold text-[#143D2B]">₹{shipping}</span>
                )}
              </span>
            </div>

            <div className="flex justify-between text-base font-extrabold text-[#143D2B] pt-3 border-t border-[#E5DFD3]">
              <span>Grand Total</span>
              <span className="text-xl text-emerald-950">₹{grandTotal}</span>
            </div>
            <span className="text-[10px] text-[#7A8E84]">
              MRP includes all taxes and GST.
            </span>
          </div>

          {/* Primary CTA */}
          <button
            onClick={() => navigateTo('checkout')}
            className="btn btn-primary btn-lg w-full flex items-center justify-center gap-2 shadow-xl text-sm font-bold"
          >
            Proceed to Checkout <ArrowRight size={18} />
          </button>

          <div className="pt-2 text-center text-[11px] text-[#7A8E84] flex items-center justify-center gap-2">
            <ShieldCheck size={14} className="text-emerald-700" />
            <span>Guaranteed Safe Checkout</span>
          </div>

        </div>

      </div>
    </div>
  );
}
