import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';
import { products } from '../data/products';
import { validCoupons } from '../data/coupons';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('biocleanup_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    // Default initial demonstration items
    const p1 = products.find((p) => p.id === 'floor-cleaner-lime');
    const p2 = products.find((p) => p.id === 'hand-wash-orange');
    return [
      { product: p1, quantity: 2 },
      { product: p2, quantity: 1 }
    ].filter(item => item.product);
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const { showToast } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem('biocleanup_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  const addToCart = (product, quantity = 1, openDrawer = true) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    showToast('Added to Cart', `${product.name} (${quantity} unit${quantity > 1 ? 's' : ''}) added.`, 'success');
    if (openDrawer) {
      setIsCartOpen(true);
    }
  };

  const removeFromCart = (productId) => {
    const item = cartItems.find((i) => i.product.id === productId);
    setCartItems((prev) => prev.filter((i) => i.product.id !== productId));
    if (item) {
      showToast('Item Removed', `${item.product.name} removed from your bag.`, 'info');
    }
  };

  const updateQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: Math.min(newQty, 50) } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (codeStr) => {
    setCouponError('');
    if (!codeStr || !codeStr.trim()) {
      setCouponError('Please enter a coupon code.');
      return false;
    }
    const cleanCode = codeStr.trim().toUpperCase();
    const coupon = validCoupons.find((c) => c.code === cleanCode);

    if (!coupon) {
      setCouponError(`Invalid coupon "${cleanCode}". Try BIOFIRST or CLEAN50`);
      showToast('Coupon Invalid', 'Please enter a valid coupon code.', 'error');
      return false;
    }

    if (subtotal < coupon.minOrder) {
      const msg = `Minimum order of ₹${coupon.minOrder} required for ${coupon.code}.`;
      setCouponError(msg);
      showToast('Minimum Order Required', msg, 'error');
      return false;
    }

    setAppliedCoupon(coupon);
    showToast('Coupon Applied!', `${coupon.code} activated successfully.`, 'success');
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError('');
    showToast('Coupon Removed', 'Coupon code has been detached.', 'info');
  };

  // Calculations
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.product.price || 0) * item.quantity,
    0
  );

  const originalSubtotal = cartItems.reduce(
    (sum, item) => sum + (item.product.originalPrice || item.product.price) * item.quantity,
    0
  );

  const productSavings = originalSubtotal - subtotal;

  let couponDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percentage') {
      couponDiscount = Math.round((subtotal * appliedCoupon.value) / 100);
    } else if (appliedCoupon.type === 'flat') {
      couponDiscount = Math.min(appliedCoupon.value, subtotal);
    }
  }

  const freeShippingThreshold = 499;
  const isFreeShipping = subtotal >= freeShippingThreshold || appliedCoupon?.type === 'free_shipping';
  const shipping = subtotal === 0 ? 0 : isFreeShipping ? 0 : 49;
  const grandTotal = Math.max(0, subtotal - couponDiscount + shipping);
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        couponError,
        subtotal,
        originalSubtotal,
        productSavings,
        couponDiscount,
        shipping,
        grandTotal,
        totalCount,
        freeShippingThreshold,
        isFreeShipping
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
