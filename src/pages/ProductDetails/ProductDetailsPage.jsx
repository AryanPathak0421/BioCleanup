import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  ShoppingBag, 
  Share2, 
  ShieldCheck, 
  Sparkles, 
  Truck, 
  RotateCcw, 
  Check, 
  ChevronRight, 
  AlertTriangle,
  Leaf,
  Plus,
  Minus,
  MessageSquare,
  ThumbsUp
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import { products } from '../../data/products';
import { mockReviews } from '../../data/reviews';
import Rating from '../../components/Rating/Rating';
import ProductCard from '../../components/ProductCard/ProductCard';

export default function ProductDetailsPage() {
  const { pageParams, navigateTo } = useNavigation();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState('description');
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);

  const product = products.find((p) => p.id === pageParams?.productId) || products[0];
  const isFavorited = isInWishlist(product.id);

  // Reviews matching this product
  const productReviews = mockReviews.filter((r) => r.productId === product.id);

  // Related products from same category or complementary
  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, true);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, false);
    navigateTo('checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link Copied', 'Product link copied to your clipboard.', 'info');
    }
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReviewAuthor || !newReviewComment) {
      showToast('Missing Fields', 'Please fill in your name and comment.', 'error');
      return;
    }
    showToast('Review Submitted!', 'Thank you! Your verified review will appear after approval.', 'success');
    setIsWriteReviewOpen(false);
    setNewReviewAuthor('');
    setNewReviewTitle('');
    setNewReviewComment('');
  };

  return (
    <div className="pb-24 pt-6">
      <div className="container">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-[#7A8E84] mb-6 overflow-x-auto whitespace-nowrap">
          <button onClick={() => navigateTo('home')} className="hover:text-[#143D2B]">Home</button>
          <ChevronRight size={12} />
          <button onClick={() => navigateTo('shop')} className="hover:text-[#143D2B]">Shop</button>
          <ChevronRight size={12} />
          <button 
            onClick={() => navigateTo('shop', { category: product.categoryId })}
            className="hover:text-[#143D2B]"
          >
            {product.category}
          </button>
          <ChevronRight size={12} />
          <span className="font-semibold text-[#143D2B] truncate">{product.name}</span>
        </nav>

        {/* Product Main Showcase Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-[#E5DFD3] shadow-xs">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {/* Primary Image Viewport */}
            <div className="relative w-full aspect-[4/5] bg-gradient-to-b from-[#F9F7F1] to-[#EFECE5] rounded-3xl border border-[#E5DFD3] flex items-center justify-center p-6 overflow-hidden group">
              
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 items-start">
                {product.isBestSeller && (
                  <span className="badge badge-leaf">
                    <Sparkles size={11} className="text-emerald-700" />
                    Best Seller
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="badge badge-terracotta">
                    {product.discount}% OFF
                  </span>
                )}
              </div>

              {/* Action buttons on image */}
              <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#475850] hover:text-[#143D2B] flex items-center justify-center shadow-xs transition"
                  title="Share product"
                >
                  <Share2 size={16} />
                </button>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center shadow-xs transition ${
                    isFavorited
                      ? 'bg-rose-50 text-rose-500'
                      : 'bg-white/90 hover:bg-white text-[#475850] hover:text-rose-500'
                  }`}
                  title={isFavorited ? "Saved to wishlist" : "Add to wishlist"}
                >
                  <Heart size={18} className={isFavorited ? "fill-rose-500" : ""} />
                </button>
              </div>

              {/* Main Product Image */}
              <img
                src={product.images[selectedImageIndex] || product.image}
                alt={product.name}
                className="max-h-[90%] max-w-[90%] object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#E5DFD3] text-[11px] font-bold text-[#143D2B]">
                Front Packaging &amp; Label
              </div>
            </div>

            {/* Thumbnail switcher */}
            <div className="flex items-center gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 rounded-2xl p-1.5 bg-[#FAF8F3] border-2 transition overflow-hidden flex items-center justify-center ${
                    selectedImageIndex === idx
                      ? 'border-[#143D2B] shadow-sm'
                      : 'border-[#E5DFD3] hover:border-emerald-600/40'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="h-full object-contain" />
                </button>
              ))}
              <div className="text-xs text-[#7A8E84] pl-2">
                <p className="font-semibold text-[#143D2B]">High Resolution Label</p>
                <p>Authentic BioCleanup Certified Packaging</p>
              </div>
            </div>
          </div>

          {/* Right Column: Product Purchasing Info */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-6">
            
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="badge badge-leaf">{product.category}</span>
                <span className="text-xs text-[#7A8E84] font-semibold">Net Vol: {product.netVol}</span>
              </div>

              <h1 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#143D2B] leading-tight">
                {product.name}
              </h1>

              <p className="text-sm font-semibold text-emerald-800">
                {product.subtitle}
              </p>

              {/* Star rating & reviews badge */}
              <div className="flex items-center gap-3 pt-1">
                <Rating rating={product.rating} reviewsCount={product.reviewsCount} size={18} />
                <span className="text-xs text-[#7A8E84]">•</span>
                <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                  <Check size={14} className="stroke-[3]" /> Verified Formulation
                </span>
              </div>

              {/* Price Block */}
              <div className="flex items-baseline gap-3 p-4 rounded-2xl bg-[#FAF8F3] border border-[#E5DFD3] mt-2">
                <span className="font-display font-extrabold text-3xl text-[#143D2B]">
                  ₹{product.price}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-[#7A8E84] line-through font-medium">
                    ₹{product.originalPrice}
                  </span>
                )}
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full ml-auto">
                  Save ₹{product.originalPrice - product.price} ({product.discount}% OFF)
                </span>
              </div>
              <span className="text-[11px] text-[#7A8E84] -mt-1 font-medium">
                {product.mrpText}
              </span>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-[#475850] leading-relaxed mt-2">
                {product.shortDesc}
              </p>

              {/* Key Bullet Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                {product.keyPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-2 text-xs text-[#2F3E36]">
                    <Check size={15} className="text-emerald-700 shrink-0 mt-0.5 stroke-[3]" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Purchase Control Zone */}
            <div className="pt-6 border-t border-[#E5DFD3] flex flex-col gap-4">
              
              <div className="flex items-center gap-3">
                {/* Quantity Controls */}
                <div className="flex items-center border border-[#E5DFD3] rounded-full bg-[#FAF8F3] px-3 py-2 gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-base font-bold text-[#475850] hover:text-[#143D2B]"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-sm font-extrabold text-[#143D2B] w-6 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-base font-bold text-[#475850] hover:text-[#143D2B]"
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className="btn btn-primary flex-1 py-3 text-sm font-bold shadow-lg"
                >
                  <ShoppingBag size={18} /> Add to Cart (₹{product.price * quantity})
                </button>
              </div>

              {/* Buy Now CTA */}
              <button
                onClick={handleBuyNow}
                className="btn btn-accent w-full py-3 text-sm font-bold shadow-md"
              >
                Instant Buy Now
              </button>

              {/* Trust badges footer */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[11px] text-[#5C6E64]">
                <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-[#FAF8F3]">
                  <Truck size={16} className="text-emerald-700" />
                  <span>Free Shipping &gt; ₹499</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-[#FAF8F3]">
                  <RotateCcw size={16} className="text-emerald-700" />
                  <span>7-Day Replacement</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-[#FAF8F3]">
                  <ShieldCheck size={16} className="text-emerald-700" />
                  <span>100% Non-Toxic</span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* In-Depth Specifications Tabs */}
        <div className="mt-12 bg-white rounded-3xl border border-[#E5DFD3] p-6 sm:p-10 shadow-xs">
          
          {/* Tab Navigation */}
          <div className="flex border-b border-[#E5DFD3] overflow-x-auto gap-2 sm:gap-6 pb-2">
            {[
              { id: 'description', label: 'Full Description' },
              { id: 'ingredients', label: '100% Ingredients' },
              { id: 'directions', label: 'Directions for Use' },
              { id: 'caution', label: 'Safety & Caution' },
              { id: 'reviews', label: `Customer Reviews (${product.reviewsCount})` },
              { id: 'shipping', label: 'Shipping & Returns' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-xs sm:text-sm font-bold py-2.5 px-3 rounded-full transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-[#143D2B] text-white'
                    : 'text-[#5C6E64] hover:text-[#143D2B] hover:bg-[#FAF8F3]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Description */}
          {activeTab === 'description' && (
            <div className="py-6 space-y-4 text-xs sm:text-sm text-[#475850] leading-relaxed max-w-3xl">
              <h3 className="font-display font-bold text-lg text-[#143D2B]">
                About {product.name}
              </h3>
              <p>{product.shortDesc}</p>
              <p>
                Unlike generic chemical floor cleaners that rely heavily on harsh petrochemical surfactants 
                and synthetic benzene colors, BioCleanup uses plant-derived active cleansing agents. 
                It safely dislodges sticky oil stains, mud, footprints, and grease without stripping 
                the protective sealants of luxury Italian marble, vitrified granite, or polished hardwood.
              </p>
              <div className="bg-[#FAF8F3] p-4 rounded-2xl border border-[#E5DFD3] mt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#143D2B] mb-2">
                  Packaging Verification
                </h4>
                <div className="flex flex-wrap gap-4 text-xs text-[#7A8E84]">
                  <span><strong>Barcode:</strong> {product.barcode}</span>
                  <span><strong>Origin:</strong> Made in India</span>
                  <span><strong>Net Quantity:</strong> {product.netVol}</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Ingredients */}
          {activeTab === 'ingredients' && (
            <div className="py-6 space-y-4 max-w-3xl">
              <h3 className="font-display font-bold text-lg text-[#143D2B]">
                Clean &amp; Transparent Ingredient Declaration
              </h3>
              <p className="text-xs sm:text-sm text-[#475850]">
                Every component printed on the BioCleanup label is disclosed with complete honesty:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {product.ingredients.map((ing, i) => (
                  <div key={i} className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#FAF8F3] border border-[#E5DFD3]">
                    <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                      <Leaf size={14} />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#143D2B]">{ing}</span>
                      <span className="text-[11px] text-[#7A8E84] block">Eco &amp; biodegradable active</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Directions for Use */}
          {activeTab === 'directions' && (
            <div className="py-6 space-y-4 max-w-3xl">
              <h3 className="font-display font-bold text-lg text-[#143D2B]">
                Step-by-Step Directions
              </h3>
              <div className="flex flex-col gap-4 pt-2">
                {product.directions.map((step, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-[#FAF8F3] border border-[#E5DFD3]">
                    <div className="w-8 h-8 rounded-full bg-[#143D2B] text-white text-xs font-extrabold flex items-center justify-center shrink-0">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A8E84]">Step {i + 1}</h4>
                      <p className="text-sm font-semibold text-[#143D2B] mt-0.5">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Caution */}
          {activeTab === 'caution' && (
            <div className="py-6 space-y-4 max-w-3xl">
              <div className="p-4 rounded-2xl bg-[#FDF1ED] border border-[#D35E35]/30 flex items-start gap-3">
                <AlertTriangle size={20} className="text-[#D35E35] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#D35E35]">Safety Caution</h4>
                  <p className="text-xs sm:text-sm text-[#475850] mt-1 leading-relaxed">
                    {product.caution}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 5: Customer Reviews */}
          {activeTab === 'reviews' && (
            <div className="py-6 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E5DFD3]">
                <div>
                  <h3 className="font-display font-bold text-lg text-[#143D2B]">Customer Feedback</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Rating rating={product.rating} reviewsCount={product.reviewsCount} size={16} />
                    <span className="text-xs text-[#7A8E84]">Based on {product.reviewsCount} reviews</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsWriteReviewOpen(true)}
                  className="btn btn-primary btn-sm flex items-center gap-1.5"
                >
                  <MessageSquare size={14} /> Write a Review
                </button>
              </div>

              {/* Review Cards */}
              <div className="flex flex-col divide-y divide-[#F2ECE1]">
                {productReviews.length > 0 ? (
                  productReviews.map((rev) => (
                    <div key={rev.id} className="py-4 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#143D2B]">{rev.author}</span>
                          {rev.verified && (
                            <span className="badge badge-leaf text-[9px] py-0.5 px-2">
                              Verified Buyer
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-[#7A8E84]">{rev.date}</span>
                      </div>
                      <Rating rating={rev.rating} showCount={false} size={13} />
                      <h5 className="text-xs font-bold text-[#143D2B]">{rev.title}</h5>
                      <p className="text-xs text-[#5C6E64] leading-relaxed">{rev.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-[#7A8E84] py-4">No reviews yet for this variant. Be the first to review!</p>
                )}
              </div>
            </div>
          )}

          {/* Tab 6: Shipping */}
          {activeTab === 'shipping' && (
            <div className="py-6 space-y-4 text-xs sm:text-sm text-[#475850] max-w-2xl">
              <h4 className="font-bold text-[#143D2B]">Pan-India Shipping Policy</h4>
              <p>• Orders dispatched within 24 hours of payment confirmation.</p>
              <p>• Free express delivery across India on all cart orders above ₹499.</p>
              <p>• 7-Day transit damage guarantee: In the rare event of bottle leak during courier shipping, we dispatch an immediate replacement without questions asked.</p>
            </div>
          )}

        </div>

        {/* Related Products Carousel */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="badge badge-leaf mb-2">Pairs Naturally With</span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#143D2B]">
                Complementary Clean Essentials
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

      </div>

      {/* Write a Review Modal */}
      {isWriteReviewOpen && (
        <div className="overlay-backdrop flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-[#E5DFD3] flex flex-col gap-4 animate-slide-up">
            <h3 className="font-display font-bold text-lg text-[#143D2B]">
              Share Your Experience
            </h3>
            <form onSubmit={handleReviewSubmit} className="flex flex-col gap-3">
              <div>
                <label className="text-xs font-bold text-[#475850] block mb-1">Your Name</label>
                <input
                  type="text"
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  placeholder="e.g. Radhika Sharma"
                  className="w-full text-xs p-2.5 rounded-xl border border-[#E5DFD3] focus:border-[#143D2B]"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#475850] block mb-1">Star Rating</label>
                <select
                  value={newReviewRating}
                  onChange={(e) => setNewReviewRating(Number(e.target.value))}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#E5DFD3]"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5 / 5)</option>
                  <option value={4}>⭐⭐⭐⭐ (4 / 5)</option>
                  <option value={3}>⭐⭐⭐ (3 / 5)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#475850] block mb-1">Headline</label>
                <input
                  type="text"
                  value={newReviewTitle}
                  onChange={(e) => setNewReviewTitle(e.target.value)}
                  placeholder="e.g. Super fresh fragrance!"
                  className="w-full text-xs p-2.5 rounded-xl border border-[#E5DFD3]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#475850] block mb-1">Review</label>
                <textarea
                  rows={3}
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  placeholder="Tell others what you loved about this formulation..."
                  className="w-full text-xs p-2.5 rounded-xl border border-[#E5DFD3]"
                  required
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsWriteReviewOpen(false)}
                  className="btn btn-secondary flex-1 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary flex-1 text-xs"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sticky Bottom Action Bar for Mobile */}
      <div className="lg:hidden fixed bottom-14 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#E5DFD3] p-3 flex items-center justify-between gap-3 shadow-lg">
        <div className="flex flex-col">
          <span className="text-[10px] text-[#7A8E84] font-semibold uppercase">Total</span>
          <span className="text-base font-extrabold text-[#143D2B]">₹{product.price * quantity}</span>
        </div>
        <div className="flex items-center gap-2 flex-1 justify-end">
          <button
            onClick={handleAddToCart}
            className="btn btn-primary btn-sm flex-1 text-xs py-2.5"
          >
            Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            className="btn btn-accent btn-sm flex-1 text-xs py-2.5"
          >
            Buy Now
          </button>
        </div>
      </div>

    </div>
  );
}
