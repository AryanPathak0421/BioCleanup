import React from 'react';
import { Home, Store, Search, Heart, ShoppingBag } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function MobileBottomBar() {
  const { currentPage, navigateTo, setIsSearchOpen } = useNavigation();
  const { totalCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-lg border-t border-[#E5DFD3] shadow-lg py-2 px-3 flex items-center justify-around">
      <button
        onClick={() => navigateTo('home')}
        className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition ${
          currentPage === 'home' ? 'text-[#143D2B] font-bold' : 'text-[#7A8E84]'
        }`}
      >
        <Home size={19} />
        <span className="text-[10px] tracking-tight">Home</span>
      </button>

      <button
        onClick={() => navigateTo('shop')}
        className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition ${
          currentPage === 'shop' ? 'text-[#143D2B] font-bold' : 'text-[#7A8E84]'
        }`}
      >
        <Store size={19} />
        <span className="text-[10px] tracking-tight">Shop</span>
      </button>

      <button
        onClick={() => setIsSearchOpen(true)}
        className="flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl text-[#7A8E84] hover:text-[#143D2B] transition"
      >
        <Search size={19} />
        <span className="text-[10px] tracking-tight">Search</span>
      </button>

      <button
        onClick={() => navigateTo('wishlist')}
        className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl relative transition ${
          currentPage === 'wishlist' ? 'text-[#143D2B] font-bold' : 'text-[#7A8E84]'
        }`}
      >
        <div className="relative">
          <Heart size={19} className={wishlistCount > 0 ? "fill-rose-500 text-rose-500" : ""} />
          {wishlistCount > 0 && (
            <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
        </div>
        <span className="text-[10px] tracking-tight">Wishlist</span>
      </button>

      <button
        onClick={() => setIsCartOpen(true)}
        className="flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl relative text-[#143D2B] transition"
      >
        <div className="relative">
          <ShoppingBag size={19} />
          {totalCount > 0 && (
            <span className="absolute -top-1.5 -right-2.5 w-4.5 h-4.5 rounded-full bg-[#143D2B] text-white text-[9px] font-bold flex items-center justify-center">
              {totalCount}
            </span>
          )}
        </div>
        <span className="text-[10px] tracking-tight font-semibold">Cart</span>
      </button>
    </div>
  );
}
