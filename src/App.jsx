import React from 'react';
import { ToastProvider } from './context/ToastContext';
import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { NavigationProvider, useNavigation } from './context/NavigationContext';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import MobileBottomBar from './components/Navbar/MobileBottomBar';
import CartDrawer from './components/Drawer/CartDrawer';
import SearchModal from './components/Search/SearchModal';
import QuickViewModal from './components/Modal/QuickViewModal';
import ToastContainer from './components/Toast/ToastContainer';

import HomePage from './pages/Home/HomePage';
import ShopPage from './pages/Shop/ShopPage';
import ProductDetailsPage from './pages/ProductDetails/ProductDetailsPage';
import CartPage from './pages/Cart/CartPage';
import CheckoutPage from './pages/Checkout/CheckoutPage';
import OrderConfirmationPage from './pages/Orders/OrderConfirmationPage';
import TrackingPage from './pages/Tracking/TrackingPage';
import WishlistPage from './pages/Wishlist/WishlistPage';
import AccountPage from './pages/Account/AccountPage';
import AboutPage from './pages/About/AboutPage';
import SustainabilityPage from './pages/Sustainability/SustainabilityPage';
import ContactPage from './pages/Contact/ContactPage';

function AppContent() {
  const { currentPage } = useNavigation();

  return (
    <div className="flex flex-col min-h-screen w-full max-w-full overflow-x-hidden">
      <Navbar />

      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'shop' && <ShopPage />}
        {currentPage === 'product' && <ProductDetailsPage />}
        {currentPage === 'cart' && <CartPage />}
        {currentPage === 'checkout' && <CheckoutPage />}
        {currentPage === 'confirmation' && <OrderConfirmationPage />}
        {currentPage === 'tracking' && <TrackingPage />}
        {currentPage === 'wishlist' && <WishlistPage />}
        {currentPage === 'account' && <AccountPage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'sustainability' && <SustainabilityPage />}
        {currentPage === 'contact' && <ContactPage />}
      </main>

      <Footer />
      <MobileBottomBar />

      {/* Global Modals & Slide-overs */}
      <CartDrawer />
      <SearchModal />
      <QuickViewModal />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <WishlistProvider>
        <CartProvider>
          <OrderProvider>
            <NavigationProvider>
              <AppContent />
            </NavigationProvider>
          </OrderProvider>
        </CartProvider>
      </WishlistProvider>
    </ToastProvider>
  );
}
