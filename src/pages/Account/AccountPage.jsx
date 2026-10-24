import React, { useState } from 'react';
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  Settings, 
  LogOut, 
  Truck, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Edit3, 
  Plus, 
  ArrowRight 
} from 'lucide-react';
import { useOrders } from '../../context/OrderContext';
import { useWishlist } from '../../context/WishlistContext';
import { useNavigation } from '../../context/NavigationContext';
import { useToast } from '../../context/ToastContext';

export default function AccountPage() {
  const { orders } = useOrders();
  const { wishlistCount } = useWishlist();
  const { navigateTo } = useNavigation();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState('overview'); // overview, orders, addresses, profile, settings

  // Profile data
  const [profile, setProfile] = useState({
    name: 'Arjun Verma',
    email: 'arjun.verma@example.com',
    phone: '+91 98765 43210',
    memberSince: 'July 2026',
    greenImpactPoints: 480 // Equivalent bottles diverted
  });

  // Saved addresses
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      title: 'Home (Default)',
      fullName: 'Arjun Verma',
      street: 'Flat 402, Green Meadows, 14th Main, HSR Layout Sector 2',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560102',
      phone: '+91 98765 43210'
    },
    {
      id: 2,
      title: 'Studio Office',
      fullName: 'Arjun Verma',
      street: 'Co-Work Hub, 80 Feet Road, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038',
      phone: '+91 98765 43210'
    }
  ]);

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status !== 'Delivered').length;
  const deliveredOrders = orders.filter((o) => o.status === 'Delivered').length;

  const handleSaveProfile = (e) => {
    e.preventDefault();
    showToast('Profile Updated', 'Your customer information was saved successfully.', 'success');
  };

  const handleLogout = () => {
    showToast('Logged Out', 'You have been safely signed out of your session.', 'info');
    navigateTo('home');
  };

  return (
    <div className="container py-8 md:py-12 pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E5DFD3] gap-4 mb-8">
        <div>
          <span className="badge badge-leaf mb-1">Customer Green Hub</span>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#143D2B]">
            Welcome Back, {profile.name}
          </h1>
          <p className="text-xs text-[#7A8E84] mt-0.5">
            Member since {profile.memberSince} • Bio-Purity Level: Conscious Guardian
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar Navigation */}
        <aside className="lg:col-span-3 bg-white rounded-3xl border border-[#E5DFD3] p-4 shadow-xs space-y-1">
          {[
            { id: 'overview', label: 'Dashboard Overview', icon: User },
            { id: 'orders', label: 'My Orders', icon: Package, badge: totalOrders },
            { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
            { id: 'profile', label: 'Profile Details', icon: Edit3 },
            { id: 'settings', label: 'Preferences & Security', icon: Settings }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition text-left ${
                  isActive
                    ? 'bg-[#143D2B] text-white shadow-xs'
                    : 'text-[#475850] hover:bg-[#FAF8F3]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon size={16} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#EBF5EE] text-[#143D2B]'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2 border-t border-[#F2ECE1] mt-2">
            <button
              onClick={() => navigateTo('wishlist')}
              className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold text-[#475850] hover:bg-[#FAF8F3] transition text-left"
            >
              <div className="flex items-center gap-2.5">
                <Heart size={16} className="text-rose-500" />
                <span>My Wishlist</span>
              </div>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                {wishlistCount}
              </span>
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition text-left"
            >
              <LogOut size={16} />
              <span>Log Out</span>
            </button>
          </div>
        </aside>

        {/* Right Tab Content */}
        <main className="lg:col-span-9 bg-white rounded-3xl border border-[#E5DFD3] p-6 sm:p-8 shadow-xs">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-[#FAF8F3] p-4 rounded-2xl border border-[#E5DFD3]">
                  <span className="text-[10px] font-bold uppercase text-[#7A8E84]">Total Orders</span>
                  <p className="font-display font-extrabold text-2xl text-[#143D2B] mt-1">{totalOrders}</p>
                </div>

                <div className="bg-[#FAF8F3] p-4 rounded-2xl border border-[#E5DFD3]">
                  <span className="text-[10px] font-bold uppercase text-emerald-800">Pending Dispatch</span>
                  <p className="font-display font-extrabold text-2xl text-emerald-900 mt-1">{pendingOrders}</p>
                </div>

                <div className="bg-[#FAF8F3] p-4 rounded-2xl border border-[#E5DFD3]">
                  <span className="text-[10px] font-bold uppercase text-[#7A8E84]">Delivered Safe</span>
                  <p className="font-display font-extrabold text-2xl text-[#143D2B] mt-1">{deliveredOrders}</p>
                </div>

                <div className="bg-[#FAF8F3] p-4 rounded-2xl border border-[#E5DFD3]">
                  <span className="text-[10px] font-bold uppercase text-rose-700">Wishlist Items</span>
                  <p className="font-display font-extrabold text-2xl text-rose-800 mt-1">{wishlistCount}</p>
                </div>
              </div>

              {/* Eco Impact Score Box */}
              <div className="p-5 rounded-3xl bg-gradient-to-r from-[#143D2B] to-[#20593E] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-emerald-300">
                    <Sparkles size={28} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">Your Environmental Footprint</h3>
                    <p className="text-xs text-emerald-100/80">
                      By choosing BioCleanup plant-derived cleaners, you prevented ~3.4kg of toxic chemicals from entering Indian waterways.
                    </p>
                  </div>
                </div>
                <div className="bg-white/20 px-4 py-2 rounded-2xl text-center shrink-0">
                  <span className="text-xl font-extrabold block">{profile.greenImpactPoints} pts</span>
                  <span className="text-[10px] text-emerald-200 uppercase font-semibold">Green Points</span>
                </div>
              </div>

              {/* Recent Orders Preview */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-bold text-base text-[#143D2B]">
                    Recent Order History
                  </h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-bold text-emerald-800 hover:underline"
                  >
                    View All Orders →
                  </button>
                </div>

                <div className="space-y-4">
                  {orders.slice(0, 2).map((order) => (
                    <div key={order.id} className="p-4 rounded-2xl border border-[#E5DFD3] bg-[#FAF8F3] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-extrabold text-[#143D2B]">{order.id}</span>
                          <span className="badge badge-leaf text-[10px]">{order.status}</span>
                        </div>
                        <p className="text-xs text-[#7A8E84] mt-0.5">
                          {order.date} • {order.items?.length || 0} Products • Total: ₹{order.total}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigateTo('tracking', { orderId: order.id })}
                          className="btn btn-primary btn-sm text-xs py-2 px-3 flex items-center gap-1.5"
                        >
                          <Truck size={13} /> Track Order
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MY ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h3 className="font-display font-bold text-lg text-[#143D2B] pb-3 border-b border-[#F2ECE1]">
                All Purchases &amp; Invoices
              </h3>

              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="p-5 rounded-3xl border border-[#E5DFD3] bg-[#FAF8F3] space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E5DFD3]">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-[#143D2B] text-sm">{order.id}</h4>
                          <span className={`badge text-[10px] ${
                            order.status === 'Delivered' ? 'badge-leaf' : 'badge-gold'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <span className="text-xs text-[#7A8E84]">Placed on {order.date} via {order.paymentMethod}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigateTo('tracking', { orderId: order.id })}
                          className="btn btn-primary btn-sm text-xs py-2 px-3 flex items-center gap-1.5"
                        >
                          <Truck size={13} /> Track
                        </button>
                        <button
                          onClick={() => showToast('Receipt Downloaded', `Invoice for ${order.id} generated.`, 'info')}
                          className="btn btn-secondary btn-sm text-xs py-2 px-3"
                        >
                          Invoice
                        </button>
                      </div>
                    </div>

                    {/* Ordered Items Row */}
                    <div className="space-y-3">
                      {order.items?.map((it, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-3">
                            <img
                              src={it.product?.image}
                              alt={it.product?.name}
                              className="w-10 h-12 object-contain bg-white rounded-lg p-1 border border-[#E5DFD3]"
                            />
                            <div>
                              <p className="font-bold text-[#143D2B]">{it.product?.name}</p>
                              <span className="text-[11px] text-[#7A8E84]">Qty: {it.quantity}</span>
                            </div>
                          </div>
                          <span className="font-extrabold text-[#143D2B]">
                            ₹{(it.product?.price || it.price) * it.quantity}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-[#E5DFD3] flex justify-between items-center text-xs">
                      <span className="text-[#7A8E84]">Carrier: {order.carrier}</span>
                      <span className="font-extrabold text-sm text-[#143D2B]">Paid: ₹{order.total}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#F2ECE1]">
                <h3 className="font-display font-bold text-lg text-[#143D2B]">
                  Delivery Addresses
                </h3>
                <button
                  onClick={() => showToast('Address Form', 'Add new address modal initiated.', 'info')}
                  className="btn btn-primary btn-sm text-xs flex items-center gap-1"
                >
                  <Plus size={14} /> Add New Address
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <div key={addr.id} className="p-5 rounded-2xl border border-[#E5DFD3] bg-[#FAF8F3] flex flex-col justify-between gap-3">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#143D2B]">{addr.title}</span>
                        <span className="text-[10px] text-emerald-800 font-semibold bg-emerald-100 px-2 py-0.5 rounded-full">Active</span>
                      </div>
                      <p className="text-xs font-bold text-[#2F3E36] mt-2">{addr.fullName}</p>
                      <p className="text-xs text-[#5C6E64] mt-1 leading-relaxed">
                        {addr.street}, {addr.city}, {addr.state} - {addr.pincode}
                      </p>
                      <p className="text-xs text-[#7A8E84] mt-1">Phone: {addr.phone}</p>
                    </div>

                    <div className="pt-3 border-t border-[#E5DFD3] flex gap-2">
                      <button
                        onClick={() => showToast('Edit Address', 'Address ready for modification.', 'info')}
                        className="text-xs font-bold text-emerald-800 hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PROFILE */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-6 max-w-lg">
              <h3 className="font-display font-bold text-lg text-[#143D2B] pb-3 border-b border-[#F2ECE1]">
                Personal Profile
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-[#475850] block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-[#E5DFD3] bg-[#FAF8F3]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#475850] block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-[#E5DFD3] bg-[#FAF8F3]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#475850] block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-[#E5DFD3] bg-[#FAF8F3]"
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-sm text-xs">
                Save Profile Changes
              </button>
            </form>
          )}

          {/* TAB 5: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-lg">
              <h3 className="font-display font-bold text-lg text-[#143D2B] pb-3 border-b border-[#F2ECE1]">
                Notification &amp; Green Preferences
              </h3>

              <div className="space-y-3 text-xs font-semibold text-[#2F3E36]">
                <label className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F3] border border-[#E5DFD3]">
                  <span>SMS Shipment Tracking Updates</span>
                  <input type="checkbox" defaultChecked className="accent-emerald-800 w-4 h-4" />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F3] border border-[#E5DFD3]">
                  <span>Weekly Green Living &amp; Home Detox Tips</span>
                  <input type="checkbox" defaultChecked className="accent-emerald-800 w-4 h-4" />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F3] border border-[#E5DFD3]">
                  <span>Promotional Coupon Alerts</span>
                  <input type="checkbox" defaultChecked className="accent-emerald-800 w-4 h-4" />
                </label>
              </div>

              <button
                type="button"
                onClick={() => showToast('Preferences Updated', 'Settings saved.', 'success')}
                className="btn btn-primary btn-sm text-xs"
              >
                Save Preferences
              </button>
            </div>
          )}

        </main>

      </div>
    </div>
  );
}
