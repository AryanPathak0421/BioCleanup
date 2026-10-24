import React from 'react';
import { Heart, ShoppingBag, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useNavigation } from '../../context/NavigationContext';
import { useToast } from '../../context/ToastContext';
import { products } from '../../data/products';
import EmptyState from '../../components/EmptyState/EmptyState';
import Rating from '../../components/Rating/Rating';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { navigateTo } = useNavigation();
  const { showToast } = useToast();

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  const handleAddAllToCart = () => {
    wishlistedProducts.forEach((p) => {
      addToCart(p, 1, false);
    });
    showToast('All Items Added!', `Added ${wishlistedProducts.length} favorites to your cart.`, 'success');
  };

  if (wishlistedProducts.length === 0) {
    return (
      <div className="container py-16">
        <EmptyState
          icon={Heart}
          title="Your Wishlist is Empty"
          description="Save your favorite bio & organic cleaning products here to easily order them anytime."
          actionText="Discover Formulations"
          actionTarget="shop"
        />
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-12 pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E5DFD3] gap-4 mb-8">
        <div>
          <span className="badge badge-leaf mb-1">Saved Favorites</span>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#143D2B]">
            My Wishlist ({wishlistedProducts.length})
          </h1>
          <p className="text-xs text-[#5C6E64] mt-0.5">
            Keep track of pure, sustainable home essentials you love.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleAddAllToCart}
            className="btn btn-primary btn-sm flex items-center gap-1.5"
          >
            <ShoppingBag size={14} /> Add All to Cart
          </button>
          <button
            onClick={clearWishlist}
            className="btn btn-outline btn-sm text-xs text-rose-600 hover:bg-rose-50 border-rose-200"
          >
            Clear Wishlist
          </button>
        </div>
      </div>

      {/* Grid of Wishlist Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistedProducts.map((product) => (
          <div
            key={product.id}
            className="product-card group flex flex-col justify-between"
          >
            <div className="relative aspect-[4/5] bg-gradient-to-b from-[#F7F5F0] to-[#EFECE5] p-3 flex items-center justify-center">
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 text-rose-500 hover:bg-white flex items-center justify-center shadow-xs transition"
                title="Remove"
              >
                <Trash2 size={15} />
              </button>

              <img
                src={product.image}
                alt={product.name}
                className="max-h-[85%] max-w-[85%] object-contain group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                onClick={() => navigateTo('product', { productId: product.id })}
              />
            </div>

            <div className="p-4 flex flex-col justify-between gap-3 flex-1 bg-white">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                  {product.category} • {product.netVol}
                </span>
                <h3 
                  onClick={() => navigateTo('product', { productId: product.id })}
                  className="font-display font-bold text-base text-[#143D2B] hover:text-emerald-700 cursor-pointer transition line-clamp-1 mt-0.5"
                >
                  {product.name}
                </h3>
                <p className="text-xs text-[#7A8E84] line-clamp-1">{product.subtitle}</p>
                <div className="mt-1">
                  <Rating rating={product.rating} reviewsCount={product.reviewsCount} size={13} />
                </div>
              </div>

              <div className="pt-3 border-t border-[#F2ECE1] flex items-center justify-between gap-2 mt-auto">
                <span className="text-base font-extrabold text-[#143D2B]">
                  ₹{product.price}
                </span>

                <button
                  onClick={() => addToCart(product, 1, true)}
                  className="btn btn-primary btn-sm text-xs py-2 px-3 flex items-center gap-1.5"
                >
                  <ShoppingBag size={13} /> Move to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
