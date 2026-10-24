import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';
import { products } from '../data/products';

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('biocleanup_wishlist');
      return saved ? JSON.parse(saved) : ['floor-cleaner-lime', 'hand-wash-orange'];
    } catch {
      return ['floor-cleaner-lime', 'hand-wash-orange'];
    }
  });

  const { showToast } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem('biocleanup_wishlist', JSON.stringify(wishlist));
    } catch {
      // localStorage may fail in restricted sandboxes
    }
  }, [wishlist]);

  const toggleWishlist = (productId) => {
    const product = products.find((p) => p.id === productId);
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from Wishlist', `${product ? product.name : 'Item'} removed.`, 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to Wishlist', `${product ? product.name : 'Item'} added to your favorites.`, 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  const clearWishlist = () => setWishlist([]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
        wishlistCount: wishlist.length
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
