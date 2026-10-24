import React, { useState, useMemo, useEffect } from 'react';
import { 
  Filter, 
  SlidersHorizontal, 
  X, 
  Grid3X3, 
  Grid2X2, 
  List, 
  ChevronDown, 
  Check, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { products, categories } from '../../data/products';
import ProductCard from '../../components/ProductCard/ProductCard';
import EmptyState from '../../components/EmptyState/EmptyState';
import { useNavigation } from '../../context/NavigationContext';

export default function ShopPage() {
  const { pageParams } = useNavigation();

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState(pageParams?.category || 'all');
  const [maxPrice, setMaxPrice] = useState(300);
  const [minRating, setMinRating] = useState(0);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [onlyBestSeller, setOnlyBestSeller] = useState(false);
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);
  const [selectedVolume, setSelectedVolume] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'compact'

  useEffect(() => {
    if (pageParams?.category) {
      setSelectedCategory(pageParams.category);
    }
  }, [pageParams]);

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category
      if (selectedCategory !== 'all' && p.categoryId !== selectedCategory) {
        return false;
      }
      // Max price
      if (p.price > maxPrice) {
        return false;
      }
      // Min rating
      if (minRating > 0 && p.rating < minRating) {
        return false;
      }
      // Stock
      if (onlyInStock && !p.inStock) {
        return false;
      }
      // Best seller
      if (onlyBestSeller && !p.isBestSeller) {
        return false;
      }
      // Discounted
      if (onlyDiscounted && (!p.discount || p.discount <= 0)) {
        return false;
      }
      // Volume
      if (selectedVolume !== 'all' && p.netVol !== selectedVolume) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isComingSoonImage ? 1 : 0) - (a.isComingSoonImage ? 1 : 0);
      // default: popular
      return (b.reviewsCount || 0) - (a.reviewsCount || 0);
    });
  }, [selectedCategory, maxPrice, minRating, onlyInStock, onlyBestSeller, onlyDiscounted, selectedVolume, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setMaxPrice(300);
    setMinRating(0);
    setOnlyInStock(false);
    setOnlyBestSeller(false);
    setOnlyDiscounted(false);
    setSelectedVolume('all');
    setSortBy('popular');
  };

  const hasActiveFilters = selectedCategory !== 'all' || maxPrice < 300 || minRating > 0 || onlyInStock || onlyBestSeller || onlyDiscounted || selectedVolume !== 'all';

  return (
    <div className="container py-8 md:py-12 pb-24">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-[#E5DFD3] gap-4">
        <div>
          <div className="badge badge-leaf mb-2">Sustainable Home Cleaners</div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#143D2B]">
            All Bio Formulations
          </h1>
          <p className="text-xs sm:text-sm text-[#5C6E64] mt-1">
            Plant-powered, biodegradable, and safe for bare feet, toddlers, and pets.
          </p>
        </div>

        {/* Action Controls for Mobile Filter & Sort */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-[#E5DFD3] text-xs font-bold text-[#143D2B] shadow-xs"
          >
            <SlidersHorizontal size={15} />
            Filters {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-emerald-600"></span>}
          </button>

          {/* Sort By Dropdown */}
          <div className="relative flex items-center">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-[#E5DFD3] rounded-full px-4 py-2.5 pr-8 text-xs font-bold text-[#143D2B] focus:outline-none focus:border-[#143D2B] shadow-xs cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">New Launches</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 text-[#7A8E84] pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Main Layout: Sidebar Filters + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-8">
        
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block lg:col-span-1 space-y-6 bg-white p-6 rounded-3xl border border-[#E5DFD3] shadow-xs h-fit sticky top-24">
          <div className="flex items-center justify-between pb-4 border-b border-[#F2ECE1]">
            <span className="font-display font-bold text-base text-[#143D2B] flex items-center gap-2">
              <Filter size={16} /> Filters
            </span>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-[11px] font-bold text-rose-600 hover:underline flex items-center gap-1"
              >
                <RotateCcw size={12} /> Reset
              </button>
            )}
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A8E84] mb-3">
              Categories
            </h4>
            <div className="flex flex-col gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-left text-xs font-semibold px-3 py-2 rounded-xl transition flex items-center justify-between ${
                    selectedCategory === cat.id
                      ? 'bg-[#EBF5EE] text-[#143D2B] font-bold'
                      : 'text-[#475850] hover:bg-[#FAF8F3]'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="text-[10px] text-[#7A8E84] font-normal">
                    {cat.id === 'all' ? products.length : cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="pt-4 border-t border-[#F2ECE1]">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A8E84]">
                Max Price
              </h4>
              <span className="text-xs font-extrabold text-[#143D2B]">₹{maxPrice}</span>
            </div>
            <input
              type="range"
              min="80"
              max="300"
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-emerald-800 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#7A8E84] mt-1 font-semibold">
              <span>₹80</span>
              <span>₹300</span>
            </div>
          </div>

          {/* Rating Filter */}
          <div className="pt-4 border-t border-[#F2ECE1]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A8E84] mb-2.5">
              Minimum Rating
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {[0, 4.5, 4.8, 5.0].map((rate) => (
                <button
                  key={rate}
                  onClick={() => setMinRating(rate)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition border ${
                    minRating === rate
                      ? 'bg-[#143D2B] text-white border-[#143D2B]'
                      : 'bg-[#FAF8F3] text-[#475850] border-[#E5DFD3] hover:bg-white'
                  }`}
                >
                  {rate === 0 ? 'All' : `${rate}★ & Above`}
                </button>
              ))}
            </div>
          </div>

          {/* Volume */}
          <div className="pt-4 border-t border-[#F2ECE1]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A8E84] mb-2.5">
              Bottle Volume
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {['all', '200ml', '500ml', '1000ml'].map((vol) => (
                <button
                  key={vol}
                  onClick={() => setSelectedVolume(vol)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition border ${
                    selectedVolume === vol
                      ? 'bg-[#143D2B] text-white border-[#143D2B]'
                      : 'bg-[#FAF8F3] text-[#475850] border-[#E5DFD3] hover:bg-white'
                  }`}
                >
                  {vol === 'all' ? 'All Sizes' : vol}
                </button>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="pt-4 border-t border-[#F2ECE1] space-y-2.5">
            <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-[#2F3E36]">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-800 accent-emerald-800"
              />
              <span>In Stock Only</span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-[#2F3E36]">
              <input
                type="checkbox"
                checked={onlyBestSeller}
                onChange={(e) => setOnlyBestSeller(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-800 accent-emerald-800"
              />
              <span>Best Sellers Only</span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-[#2F3E36]">
              <input
                type="checkbox"
                checked={onlyDiscounted}
                onChange={(e) => setOnlyDiscounted(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-800 accent-emerald-800"
              />
              <span>Discount Offers Only</span>
            </label>
          </div>

        </aside>

        {/* Product Grid Area */}
        <main className="lg:col-span-3 flex flex-col gap-6">
          
          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 p-3 rounded-2xl bg-white border border-[#E5DFD3] text-xs">
              <span className="font-bold text-[#7A8E84]">Active Filters:</span>
              
              {selectedCategory !== 'all' && (
                <span className="bg-[#EBF5EE] text-[#143D2B] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                  {categories.find(c => c.id === selectedCategory)?.name}
                  <button onClick={() => setSelectedCategory('all')}><X size={12} /></button>
                </span>
              )}

              {maxPrice < 300 && (
                <span className="bg-[#EBF5EE] text-[#143D2B] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                  Under ₹{maxPrice}
                  <button onClick={() => setMaxPrice(300)}><X size={12} /></button>
                </span>
              )}

              {minRating > 0 && (
                <span className="bg-[#EBF5EE] text-[#143D2B] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                  {minRating}★+
                  <button onClick={() => setMinRating(0)}><X size={12} /></button>
                </span>
              )}

              {selectedVolume !== 'all' && (
                <span className="bg-[#EBF5EE] text-[#143D2B] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                  {selectedVolume}
                  <button onClick={() => setSelectedVolume('all')}><X size={12} /></button>
                </span>
              )}

              {onlyBestSeller && (
                <span className="bg-[#EBF5EE] text-[#143D2B] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                  Best Seller
                  <button onClick={() => setOnlyBestSeller(false)}><X size={12} /></button>
                </span>
              )}

              <button
                onClick={resetFilters}
                className="text-xs text-rose-600 font-bold hover:underline ml-auto"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Products Count Header */}
          <div className="flex items-center justify-between text-xs text-[#7A8E84]">
            <span>
              Showing <strong className="text-[#143D2B]">{filteredProducts.length}</strong> of {products.length} formulations
            </span>
          </div>

          {/* Products Result Grid */}
          {filteredProducts.length === 0 ? (
            <EmptyState
              title="No Products Match These Filters"
              description="Try adjusting your maximum price range, resetting ratings, or exploring another category."
              actionText="Reset All Filters"
              onAction={resetFilters}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

        </main>

      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="overlay-backdrop flex justify-end lg:hidden">
          <div 
            className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between animate-slide-right z-50 p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E5DFD3]">
                <h3 className="font-display font-bold text-lg text-[#143D2B]">Filters</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 rounded-full text-[#7A8E84]"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Category */}
              <div className="py-4 border-b border-[#E5DFD3]">
                <h4 className="text-xs font-bold uppercase text-[#7A8E84] mb-2">Category</h4>
                <div className="flex flex-col gap-1">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`text-left text-xs font-semibold p-2 rounded-xl ${
                        selectedCategory === cat.id ? 'bg-[#EBF5EE] text-[#143D2B] font-bold' : 'text-[#475850]'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="py-4 border-b border-[#E5DFD3]">
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span>Max Price</span>
                  <span>₹{maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="300"
                  step="10"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-emerald-800"
                />
              </div>

              {/* Toggles */}
              <div className="py-4 space-y-3 text-xs font-semibold">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(e) => setOnlyInStock(e.target.checked)}
                    className="accent-emerald-800"
                  />
                  <span>In Stock Only</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={onlyBestSeller}
                    onChange={(e) => setOnlyBestSeller(e.target.checked)}
                    className="accent-emerald-800"
                  />
                  <span>Best Sellers Only</span>
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E5DFD3] flex gap-3">
              <button
                onClick={resetFilters}
                className="btn btn-secondary flex-1 text-xs"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="btn btn-primary flex-1 text-xs"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
