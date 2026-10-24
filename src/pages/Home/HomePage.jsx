import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Leaf, 
  Droplet, 
  Recycle, 
  CheckCircle2, 
  XCircle, 
  HeartHandshake, 
  Truck, 
  Award,
  ChevronRight,
  Zap
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { products, categories } from '../../data/products';
import { brandTestimonials } from '../../data/reviews';
import ProductCard from '../../components/ProductCard/ProductCard';
import CategoryCard from '../../components/CategoryCard/CategoryCard';

export default function HomePage() {
  const { navigateTo } = useNavigation();
  const [activeTab, setActiveTab] = useState('all');

  const filteredFeatured = activeTab === 'all'
    ? products.slice(0, 8)
    : products.filter(p => p.categoryId === activeTab || (activeTab === 'bestsellers' && p.isBestSeller));

  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-20 w-full overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 md:pt-16 pb-12 bg-gradient-to-b from-[#FAF8F3] via-[#F3EFE6]/60 to-[#FAF8F3] w-full">
        {/* Subtle decorative circles */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-[500px] h-[300px] bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-center">
            
            {/* Left Column: Headlines & CTAs */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left items-center lg:items-start">
              
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EBF5EE] border border-[#DEF0E3] text-[#143D2B] text-xs font-bold uppercase tracking-wider shadow-xs">
                <Sparkles size={14} className="text-emerald-700 animate-spin-slow" />
                Next-Generation Clean Living
              </div>

              <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-[#143D2B] tracking-tight leading-[1.12]">
                Pure. Natural. <br />
                <span className="font-serif italic font-normal text-emerald-800">
                  Better for You.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#475850] max-w-xl leading-relaxed">
                Discover thoughtfully crafted organic products made with clean ingredients and a commitment to a healthier planet. Experience hospital-grade 99.9% germ protection without choking chemical fumes.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2 w-full sm:w-auto">
                <button
                  onClick={() => navigateTo('shop')}
                  className="btn btn-primary btn-lg w-full sm:w-auto shadow-xl"
                >
                  Shop Now <ArrowRight size={18} />
                </button>

                <button
                  onClick={() => navigateTo('sustainability')}
                  className="btn btn-secondary btn-lg w-full sm:w-auto"
                >
                  Explore Collection
                </button>
              </div>

              {/* Metrics / Trust Counters */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#E5DFD3] w-full max-w-lg">
                <div>
                  <span className="font-display font-extrabold text-2xl sm:text-3xl text-[#143D2B]">
                    99.9%
                  </span>
                  <p className="text-[11px] text-[#7A8E84] font-semibold uppercase tracking-wider mt-0.5">
                    Germ Elimination
                  </p>
                </div>
                <div>
                  <span className="font-display font-extrabold text-2xl sm:text-3xl text-[#143D2B]">
                    100%
                  </span>
                  <p className="text-[11px] text-[#7A8E84] font-semibold uppercase tracking-wider mt-0.5">
                    Plant Derived
                  </p>
                </div>
                <div>
                  <span className="font-display font-extrabold text-2xl sm:text-3xl text-[#143D2B]">
                    0%
                  </span>
                  <p className="text-[11px] text-[#7A8E84] font-semibold uppercase tracking-wider mt-0.5">
                    Toxic Vapors
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column: Premium Hero Product Composition */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              
              <div className="relative w-full max-w-[440px] aspect-[4/5] bg-gradient-to-tr from-[#EBF5EE] via-white to-[#F9F7F1] rounded-3xl p-6 shadow-2xl border border-[#E5DFD3] flex flex-col items-center justify-center group overflow-hidden">
                
                {/* Floating Eco Badge */}
                <div className="absolute top-5 left-5 z-20 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-200/80 shadow-sm flex items-center gap-2 text-xs font-bold text-[#143D2B]">
                  <Leaf size={14} className="text-emerald-600" />
                  <span>Enriched with Pure Lime &amp; Mint</span>
                </div>

                {/* Floating Price Pill */}
                <div className="absolute bottom-5 right-5 z-20 bg-[#143D2B] text-white px-4 py-2 rounded-2xl shadow-lg flex flex-col items-end">
                  <span className="text-[10px] text-emerald-200 uppercase font-semibold">Starting From</span>
                  <span className="text-lg font-extrabold font-display leading-tight">₹80 Only</span>
                </div>

                {/* Product Image Stage */}
                <div className="w-full h-full flex items-center justify-center p-2">
                  <img
                    src="/images/products/floor-cleaner-lime.jpg"
                    alt="BioCleanup Pure & Powerful Floor Cleaner"
                    className="max-h-[85%] max-w-[85%] object-contain group-hover:scale-105 transition-transform duration-700 drop-shadow-xl"
                  />
                </div>

                {/* Micro Label Pill */}
                <div className="absolute bottom-5 left-5 z-20 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#E5DFD3] text-[11px] font-bold text-[#475850]">
                  MRP ₹90 • 200ml
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* OFFICIAL BRAND SHOWCASE BANNER */}
      <section className="container">
        <div className="relative rounded-3xl overflow-hidden border border-[#E5DFD3] shadow-md bg-gradient-to-r from-emerald-900 to-teal-950 group">
          <img
            src="/images/biocleanup-hero-banner.jpg"
            alt="BioCleanup - Pure & Powerful 100% Natural Actives"
            className="w-full h-auto object-cover object-center group-hover:scale-[1.01] transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-transparent flex items-end p-4 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-3">
              <div className="text-white">
                <span className="badge badge-leaf bg-white/20 text-emerald-200 border-white/30 text-[10px]">
                  Certified Pure Formulation
                </span>
                <p className="text-xs sm:text-sm text-emerald-100 font-semibold mt-1">
                  100% Natural Actives • Kills 99.9% Germs • Eco Friendly
                </p>
              </div>
              <button
                onClick={() => navigateTo('shop')}
                className="btn btn-primary bg-white hover:bg-emerald-50 text-[#143D2B] text-xs font-bold px-5 py-2.5 rounded-full shadow-lg shrink-0"
              >
                Shop Full Clean Range →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST SECTION */}
      <section className="container">
        <div className="bg-white rounded-3xl border border-[#E5DFD3] p-6 sm:p-8 md:p-10 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#F2ECE1]">
            
            <div className="flex flex-col items-center text-center gap-3 pt-4 sm:pt-0">
              <div className="w-12 h-12 rounded-2xl bg-[#EBF5EE] text-[#143D2B] flex items-center justify-center">
                <Leaf size={24} />
              </div>
              <h4 className="text-sm font-bold text-[#143D2B]">100% Natural Ingredients</h4>
              <p className="text-xs text-[#7A8E84]">Real citrus, mint oils &amp; bio-surfactants</p>
            </div>

            <div className="flex flex-col items-center text-center gap-3 pt-4 sm:pt-0 sm:pl-4">
              <div className="w-12 h-12 rounded-2xl bg-[#EBF5EE] text-[#143D2B] flex items-center justify-center">
                <ShieldCheck size={24} />
              </div>
              <h4 className="text-sm font-bold text-[#143D2B]">Carefully Sourced</h4>
              <p className="text-xs text-[#7A8E84]">Purity tested against harsh synthetics</p>
            </div>

            <div className="flex flex-col items-center text-center gap-3 pt-4 sm:pt-0 sm:pl-4">
              <div className="w-12 h-12 rounded-2xl bg-[#EBF5EE] text-[#143D2B] flex items-center justify-center">
                <Recycle size={24} />
              </div>
              <h4 className="text-sm font-bold text-[#143D2B]">Eco-Friendly Packaging</h4>
              <p className="text-xs text-[#7A8E84]">100% recyclable bottles &amp; low carbon</p>
            </div>

            <div className="flex flex-col items-center text-center gap-3 pt-4 sm:pt-0 sm:pl-4">
              <div className="w-12 h-12 rounded-2xl bg-[#EBF5EE] text-[#143D2B] flex items-center justify-center">
                <Truck size={24} />
              </div>
              <h4 className="text-sm font-bold text-[#143D2B]">Fast Delivery</h4>
              <p className="text-xs text-[#7A8E84]">Pan-India dispatch via green logistics</p>
            </div>

            <div className="flex flex-col items-center text-center gap-3 pt-4 sm:pt-0 sm:pl-4 col-span-2 md:col-span-1">
              <div className="w-12 h-12 rounded-2xl bg-[#EBF5EE] text-[#143D2B] flex items-center justify-center">
                <Award size={24} />
              </div>
              <h4 className="text-sm font-bold text-[#143D2B]">Secure Payments</h4>
              <p className="text-xs text-[#7A8E84]">UPI, cards, NetBanking &amp; COD supported</p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. CATEGORIES SECTION */}
      <section className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="badge badge-leaf mb-2">Clean Formulations</div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#143D2B]">
              Shop by Bio-Category
            </h2>
            <p className="text-sm text-[#5C6E64] mt-1 max-w-lg">
              Tailored plant-powered solutions for every zone of your living space.
            </p>
          </div>

          <button
            onClick={() => navigateTo('shop')}
            className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 group self-start md:self-auto"
          >
            Explore All Categories <ArrowRight size={14} className="group-hover:translate-x-1 transition" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.filter(c => c.id !== 'all' && c.id !== 'eco-essentials').map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS GRID */}
      <section className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="badge badge-gold mb-2">Curated Formulations</div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#143D2B]">
              Featured Botanical Cleaners
            </h2>
            <p className="text-sm text-[#5C6E64] mt-1">
              Top rated by conscious families, pet parents, and green homes across India.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${
                activeTab === 'all'
                  ? 'bg-[#143D2B] text-white shadow-xs'
                  : 'bg-white text-[#475850] hover:bg-[#FAF8F3] border border-[#E5DFD3]'
              }`}
            >
              All Cleaners
            </button>
            <button
              onClick={() => setActiveTab('floor-surface')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${
                activeTab === 'floor-surface'
                  ? 'bg-[#143D2B] text-white shadow-xs'
                  : 'bg-white text-[#475850] hover:bg-[#FAF8F3] border border-[#E5DFD3]'
              }`}
            >
              Floors
            </button>
            <button
              onClick={() => setActiveTab('toilet-bathroom')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${
                activeTab === 'toilet-bathroom'
                  ? 'bg-[#143D2B] text-white shadow-xs'
                  : 'bg-white text-[#475850] hover:bg-[#FAF8F3] border border-[#E5DFD3]'
              }`}
            >
              Toilet &amp; Bath
            </button>
            <button
              onClick={() => setActiveTab('personal-care')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${
                activeTab === 'personal-care'
                  ? 'bg-[#143D2B] text-white shadow-xs'
                  : 'bg-white text-[#475850] hover:bg-[#FAF8F3] border border-[#E5DFD3]'
              }`}
            >
              Hand &amp; Body
            </button>
            <button
              onClick={() => setActiveTab('kitchen-utensils')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${
                activeTab === 'kitchen-utensils'
                  ? 'bg-[#143D2B] text-white shadow-xs'
                  : 'bg-white text-[#475850] hover:bg-[#FAF8F3] border border-[#E5DFD3]'
              }`}
            >
              Kitchen
            </button>
          </div>
        </div>

        {/* Product Cards Grid: 4 cols desktop, 3 cols tablet, 2 cols mobile */}
        <div className="product-grid">
          {filteredFeatured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => navigateTo('shop')}
            className="btn btn-outline btn-lg"
          >
            View Complete Shop Catalog (8 Formulations)
          </button>
        </div>
      </section>

      {/* 5. WHY BIOCLEANUP COMPARISON SECTION */}
      <section className="container">
        <div className="bg-[#FAF8F3] rounded-3xl border border-[#E5DFD3] p-6 sm:p-10 md:p-14">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <span className="badge badge-leaf mb-2">The Honest Difference</span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#143D2B]">
              BioCleanup vs. Chemical Cleaners
            </h2>
            <p className="text-sm text-[#5C6E64] mt-2">
              Why thousands of families are throwing out corrosive bleach bottles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* BioCleanup Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-600 shadow-md flex flex-col gap-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-bl-xl tracking-wider">
                Better Choice
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Leaf size={22} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-[#143D2B]">BioCleanup Products</h3>
                  <span className="text-xs text-emerald-700 font-semibold">100% Plant &amp; Bio Active</span>
                </div>
              </div>

              <ul className="flex flex-col gap-3.5 text-xs sm:text-sm text-[#2F3E36]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>99.9% Germ Shield:</strong> Uses real lime, orange, and organic plant acids.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Safe for Barefoot &amp; Pets:</strong> Dries streak-free without poisonous residues.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Zero Suffocating Vapors:</strong> Refreshing aromatherapy citrus notes.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Waterway Safe:</strong> 100% biodegradable greywater friendly.</span>
                </li>
              </ul>
            </div>

            {/* Conventional Cleaners Card */}
            <div className="bg-[#FAF8F3] rounded-3xl p-6 sm:p-8 border border-[#E5DFD3] flex flex-col gap-5 opacity-90">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                  <XCircle size={22} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-[#475850]">Conventional Cleaners</h3>
                  <span className="text-xs text-rose-700 font-semibold">Corrosive Petrochemicals</span>
                </div>
              </div>

              <ul className="flex flex-col gap-3.5 text-xs sm:text-sm text-[#5C6E64]">
                <li className="flex items-start gap-2.5">
                  <XCircle size={18} className="text-rose-600 shrink-0 mt-0.5" />
                  <span>Raw hydrochloric acid, caustic soda, synthetic benzene dyes.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle size={18} className="text-rose-600 shrink-0 mt-0.5" />
                  <span>Choking chlorine gas causes respiratory coughing and eye stinging.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle size={18} className="text-rose-600 shrink-0 mt-0.5" />
                  <span>Sticky chemical film damages vitrified tile glazes over time.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle size={18} className="text-rose-600 shrink-0 mt-0.5" />
                  <span>Contaminates municipal wastewater and groundwater supplies.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 6. VERIFIED TESTIMONIALS */}
      <section className="container">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="badge badge-terracotta mb-2">Voices of Trust</span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#143D2B]">
            Loved by Experts &amp; Families
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {brandTestimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E5DFD3] shadow-xs flex flex-col justify-between"
            >
              <p className="text-xs sm:text-sm text-[#475850] italic leading-relaxed">
                "{t.text}"
              </p>

              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-[#F2ECE1]">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-emerald-600"
                />
                <div>
                  <h4 className="text-xs font-bold text-[#143D2B]">{t.name}</h4>
                  <p className="text-[11px] text-[#7A8E84]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. SUSTAINABILITY CALLOUT BANNER */}
      <section className="container">
        <div 
          style={{ background: 'linear-gradient(135deg, #143D2B 0%, #0D291D 100%)' }}
          className="rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="flex flex-col gap-3 max-w-xl text-center md:text-left">
            <span className="badge badge-leaf bg-emerald-900/80 text-emerald-300 border-emerald-700/50 self-center md:self-start">
              Our Planet Pledge
            </span>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-white">
              Recycling Over 100,000 Plastic Bottles Every Quarter.
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
              Every BioCleanup bottle is moulded from post-consumer recycled polymer and 
              biodegrades cleanly into harmless minerals once rinsed down the drain.
            </p>
          </div>

          <button
            onClick={() => navigateTo('sustainability')}
            className="btn bg-white hover:bg-emerald-50 text-[#143D2B] font-bold text-sm px-6 py-3.5 rounded-full shadow-lg shrink-0"
          >
            Read Our Eco Impact Report →
          </button>
        </div>
      </section>

    </div>
  );
}
