import React, { useState } from 'react';
import { Leaf, ShieldCheck, Heart, Truck, Sparkles, Send, ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useToast } from '../../context/ToastContext';

export default function Footer() {
  const { navigateTo } = useNavigation();
  const { showToast } = useToast();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Invalid Email', 'Please provide a valid email address.', 'error');
      return;
    }
    showToast('Subscribed!', 'Welcome to the BioCleanup Green Family. 15% discount code sent!', 'success');
    setEmail('');
  };

  return (
    <footer className="bg-[#0D291D] text-[#FAF8F3] pt-16 pb-8 border-t border-[#1C4D37] mt-auto">
      <div className="container">
        
        {/* Top Feature Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 border-b border-emerald-900/60">
          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-emerald-950/40 border border-emerald-800/30">
            <div className="w-12 h-12 rounded-xl bg-emerald-800/50 flex items-center justify-center text-emerald-300">
              <Leaf size={24} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">100% Plant-Derived</h4>
              <p className="text-xs text-emerald-200/70">Naturally active enzymes &amp; citrus</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-emerald-950/40 border border-emerald-800/30">
            <div className="w-12 h-12 rounded-xl bg-emerald-800/50 flex items-center justify-center text-emerald-300">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Zero Toxic Fumes</h4>
              <p className="text-xs text-emerald-200/70">Safe for kids, babies &amp; pets</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-emerald-950/40 border border-emerald-800/30">
            <div className="w-12 h-12 rounded-xl bg-emerald-800/50 flex items-center justify-center text-emerald-300">
              <Truck size={24} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Free &amp; Fast Shipping</h4>
              <p className="text-xs text-emerald-200/70">On orders above ₹499 across India</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-emerald-950/40 border border-emerald-800/30">
            <div className="w-12 h-12 rounded-xl bg-emerald-800/50 flex items-center justify-center text-emerald-300">
              <Sparkles size={24} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Recyclable Packaging</h4>
              <p className="text-xs text-emerald-200/70">Protecting oceans &amp; waterways</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12">
          
          {/* Brand Info & Newsletter */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white">
                <Leaf size={20} className="-rotate-12" />
              </div>
              <span className="text-2xl font-bold font-display text-white">
                Bio<span className="text-emerald-400">Cleanup</span>
              </span>
            </div>

            <p className="text-sm text-emerald-100/75 leading-relaxed max-w-sm">
              BioCleanup creates pure, high-performance cleaning essentials powered by nature. 
              Our formulations eliminate 99.9% of germs without toxic vapors, phthalates, or harsh 
              synthetic residues.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col gap-2 max-w-sm">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                Join the Clean Living Movement
              </span>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="bg-emerald-950/80 border border-emerald-800/60 rounded-full px-4 py-2.5 text-xs text-white placeholder-emerald-300/40 focus:outline-none focus:border-emerald-400 flex-1"
                />
                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-400 text-[#0D291D] font-bold px-4 py-2.5 rounded-full text-xs flex items-center gap-1.5 transition"
                >
                  Join <ArrowRight size={14} />
                </button>
              </div>
              <span className="text-[11px] text-emerald-300/60">
                Get 15% off code + weekly natural home detox tips.
              </span>
            </form>
          </div>

          {/* Clean Range */}
          <div className="flex flex-col gap-3">
            <h5 className="text-sm font-bold tracking-wider uppercase text-emerald-300 font-display">
              Pure Products
            </h5>
            <ul className="flex flex-col gap-2 text-sm text-emerald-100/70">
              <li>
                <button onClick={() => navigateTo('shop', { category: 'floor-surface' })} className="hover:text-white transition">
                  Floor Cleaner (Lime)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', { category: 'toilet-bathroom' })} className="hover:text-white transition">
                  Toilet Cleaner (Mint 500ml)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', { category: 'personal-care' })} className="hover:text-white transition">
                  Hand Wash (Orange pH 5.5)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', { category: 'kitchen-utensils' })} className="hover:text-white transition">
                  Dish Wash (Lime Oil 200ml)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', { category: 'toilet-bathroom' })} className="hover:text-white transition">
                  Toilet Cleaner 10X Max
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-white text-emerald-400 font-semibold transition">
                  View Full Catalog →
                </button>
              </li>
            </ul>
          </div>

          {/* Brand & Sustainability */}
          <div className="flex flex-col gap-3">
            <h5 className="text-sm font-bold tracking-wider uppercase text-emerald-300 font-display">
              Our Vision
            </h5>
            <ul className="flex flex-col gap-2 text-sm text-emerald-100/70">
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white transition">
                  Our Founding Story
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('sustainability')} className="hover:text-white transition">
                  100% Recyclable Polymers
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('sustainability')} className="hover:text-white transition">
                  Waterways Protection Pledge
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white transition">
                  Ingredients Transparency
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white transition">
                  Quality Certifications
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="flex flex-col gap-3">
            <h5 className="text-sm font-bold tracking-wider uppercase text-emerald-300 font-display">
              Support &amp; Orders
            </h5>
            <ul className="flex flex-col gap-2.5 text-sm text-emerald-100/70">
              <li>
                <button onClick={() => navigateTo('account')} className="hover:text-white transition">
                  Track Your Package
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('account')} className="hover:text-white transition">
                  Order History &amp; Invoices
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-white transition">
                  Shipping &amp; Delivery Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-white transition">
                  7-Day Transit Replacement
                </button>
              </li>
              <li className="pt-2 text-xs flex items-center gap-2 text-emerald-300">
                <Phone size={14} /> +91 800-BIO-CLEAN
              </li>
              <li className="text-xs flex items-center gap-2 text-emerald-300">
                <Mail size={14} /> care@biocleanup.in
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-6 border-t border-emerald-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-200/60">
          <p>© 2026 BioCleanup Natural Innovations Pvt. Ltd. Made with ❤️ in India.</p>
          <div className="flex items-center gap-4">
            <span>Secure 256-Bit SSL Checkout</span>
            <span>•</span>
            <span>UPI / RuPay / Cards / COD</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
