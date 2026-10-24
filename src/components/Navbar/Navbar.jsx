import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  Sparkles, 
  Leaf, 
  ShieldCheck, 
  ChevronDown 
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function Navbar() {
  const { currentPage, navigateTo, setIsSearchOpen, isMobileMenuOpen, setIsMobileMenuOpen } = useNavigation();
  const { totalCount, subtotal, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop All' },
    { id: 'about', label: 'Our Story' },
    { id: 'sustainability', label: 'Sustainability' },
    { id: 'account', label: 'My Orders' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Announcement Bar */}
      <div 
        style={{ 
          background: 'linear-gradient(90deg, #0D291D 0%, #143D2B 50%, #20593E 100%)',
          color: '#FAF8F3' 
        }} 
        className="text-[11px] sm:text-xs py-2 px-3 text-center font-medium tracking-wide flex items-center justify-center gap-2 overflow-hidden shadow-inner w-full"
      >
        <span className="flex items-center gap-1.5 opacity-90 truncate">
          <Sparkles size={12} className="text-emerald-300 shrink-0" />
          <span className="font-semibold text-emerald-200">100% Plant-Derived</span>
        </span>
        <span className="opacity-40">•</span>
        <span className="truncate">Free Shipping &gt; ₹499</span>
        <span className="opacity-40 hidden sm:inline">•</span>
        <span className="hidden sm:inline bg-emerald-800/80 text-emerald-200 px-2 py-0.5 rounded-full text-[10px] font-bold border border-emerald-600/40">
          CODE: BIOFIRST (-15%)
        </span>
      </div>

      {/* Main Navbar */}
      <nav 
        className={`w-full transition-all duration-300 ${
          isScrolled 
            ? 'glass-nav shadow-sm py-3' 
            : 'bg-[#FAF8F3]/95 backdrop-blur-md border-b border-[#E5DFD3]/70 py-4'
        }`}
      >
        <div className="container flex items-center justify-between">
          
          {/* Left: Mobile Menu Button & Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-emerald-950 hover:bg-emerald-50 transition"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Logo */}
            <button 
              onClick={() => navigateTo('home')} 
              className="flex items-center text-left group"
            >
              <img 
                src="/images/biocleanup-logo.jpg" 
                alt="BioCleanup - Pure & Powerful" 
                className="h-9 sm:h-11 object-contain hover:scale-105 transition-transform duration-200 rounded-lg"
              />
            </button>
          </div>

          {/* Center: Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 font-medium text-[15px] text-[#2F3E36]">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => navigateTo(link.id)}
                  className={`px-4 py-2 rounded-full transition-all duration-200 relative ${
                    isActive
                      ? 'text-[#143D2B] font-bold bg-[#EBF5EE]'
                      : 'hover:text-[#143D2B] hover:bg-[#FAF8F3]/80'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#143D2B]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: Actions (Search, Wishlist, Account, Cart) */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/80 hover:bg-white text-[#475850] border border-[#E5DFD3] text-sm shadow-xs transition group"
              title="Search products (Ctrl+K)"
            >
              <Search size={17} className="text-[#6E8276] group-hover:text-[#143D2B] transition" />
              <span className="hidden md:inline text-xs font-medium text-[#7A8E84]">Search clean products...</span>
              <kbd className="hidden lg:inline text-[10px] bg-[#FAF8F3] px-1.5 py-0.5 rounded text-[#7A8E84] border border-[#E5DFD3]">
                ⌘K
              </kbd>
            </button>

            {/* Wishlist */}
            <button
              onClick={() => navigateTo('wishlist')}
              className="relative p-2.5 rounded-full text-[#2F3E36] hover:bg-emerald-50/80 transition"
              aria-label="Wishlist"
              title="My Wishlist"
            >
              <Heart size={20} className={wishlistCount > 0 ? "fill-rose-500 text-rose-500" : ""} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[11px] font-bold flex items-center justify-center shadow-xs animate-scale">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Account */}
            <button
              onClick={() => navigateTo('account')}
              className="hidden sm:flex p-2.5 rounded-full text-[#2F3E36] hover:bg-emerald-50/80 transition"
              aria-label="User Account"
              title="My Account & Orders"
            >
              <User size={20} />
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2.5 bg-[#143D2B] hover:bg-[#20593E] text-white px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full shadow-md shadow-emerald-950/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag size={18} />
                {totalCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 w-4.5 h-4.5 rounded-full bg-[#DDA133] text-[#0D291D] text-[10px] font-extrabold flex items-center justify-center shadow-xs">
                    {totalCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-bold tracking-tight">
                ₹{subtotal}
              </span>
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[96px] z-40 bg-[#FAF8F3]/95 backdrop-blur-lg border-t border-[#E5DFD3] flex flex-col justify-between p-6 animate-slide-up overflow-y-auto">
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase font-bold tracking-wider text-[#7A8E84] px-4 py-1">
              Menu Navigation
            </span>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => navigateTo(link.id)}
                className={`text-left text-lg font-semibold px-4 py-3 rounded-2xl transition flex items-center justify-between ${
                  currentPage === link.id
                    ? 'bg-[#EBF5EE] text-[#143D2B]'
                    : 'text-[#2F3E36] hover:bg-white'
                }`}
              >
                {link.label}
                <span className="text-sm opacity-40">→</span>
              </button>
            ))}

            <div className="border-t border-[#E5DFD3] my-2 pt-3 flex flex-col gap-2">
              <button
                onClick={() => navigateTo('wishlist')}
                className="text-left text-base font-medium px-4 py-2.5 rounded-xl hover:bg-white flex items-center justify-between text-[#2F3E36]"
              >
                <span className="flex items-center gap-2">
                  <Heart size={18} className="text-rose-500" /> Wishlist
                </span>
                <span className="text-xs font-bold bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full">
                  {wishlistCount} items
                </span>
              </button>

              <button
                onClick={() => navigateTo('account')}
                className="text-left text-base font-medium px-4 py-2.5 rounded-xl hover:bg-white flex items-center justify-between text-[#2F3E36]"
              >
                <span className="flex items-center gap-2">
                  <User size={18} className="text-emerald-700" /> Account &amp; Order History
                </span>
                <span className="text-xs text-[#7A8E84]">Manage</span>
              </button>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#E5DFD3] shadow-xs mt-6">
            <div className="flex items-center gap-2 text-xs font-bold text-[#143D2B] mb-1">
              <ShieldCheck size={16} className="text-emerald-600" />
              100% Satisfaction Guarantee
            </div>
            <p className="text-xs text-[#7A8E84]">
              Clean home, zero toxic residue. 7-day hassle-free replacement on any leakage or transit damage.
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
