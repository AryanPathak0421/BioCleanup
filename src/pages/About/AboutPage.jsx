import React from 'react';
import { Leaf, ShieldCheck, Heart, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

export default function AboutPage() {
  const { navigateTo } = useNavigation();

  return (
    <div className="pb-24">
      {/* Brand Hero */}
      <section className="bg-gradient-to-b from-[#143D2B] to-[#0D291D] text-white py-16 md:py-24">
        <div className="container max-w-4xl text-center flex flex-col items-center gap-6">
          <div className="badge badge-leaf bg-emerald-900/60 text-emerald-300 border-emerald-600/50">
            Pure &amp; Powerful
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-white leading-tight">
            Clean Homes Shouldn’t Come at the Cost of <br />
            <span className="font-serif italic font-normal text-emerald-300">
              Your Health &amp; Our Planet.
            </span>
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/80 leading-relaxed max-w-2xl">
            Born out of frustration with toxic phenyls and caustic bleaching agents, BioCleanup 
            was engineered to provide hospital-grade 99.9% germ disinfection powered strictly by nature.
          </p>
        </div>
      </section>

      {/* 1. OUR STORY */}
      <section className="container py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="badge badge-leaf">Our Genesis</span>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-[#143D2B]">
              The Awakening: Why We Banned Chlorine &amp; Phthalates
            </h2>
            <p className="text-xs sm:text-sm text-[#475850] leading-relaxed">
              Every day across India, millions of homes mop floors with harsh petrochemical cocktails. 
              The resulting suffocating fumes cause wheezing in toddlers, skin rashes on pets, and severe 
              migraines in homemakers. 
            </p>
            <p className="text-xs sm:text-sm text-[#475850] leading-relaxed">
              In 2024, our team of green biochemists set out to challenge the cleaning industry dogma: 
              <em>"If it doesn't burn your nose, it doesn't kill germs."</em> 
              Through meticulous bio-fermentation, we proved that concentrated real lime oil, citric actives, 
              and plant-derived glucosides outperform caustic hydrochloric acids while remaining safe enough to touch.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs font-bold text-[#143D2B]">
              <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-emerald-700" /> Non-Corrosive</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-emerald-700" /> 100% Biodegradable</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-emerald-700" /> Cruelty-Free</span>
            </div>
          </div>

          <div className="lg:col-span-6 relative flex justify-center">
            <div className="w-full max-w-md aspect-square bg-[#FAF8F3] rounded-3xl border border-[#E5DFD3] p-8 shadow-xl flex items-center justify-center">
              <img
                src="/images/products/floor-cleaner-lime.jpg"
                alt="BioCleanup Lime Floor Cleaner"
                className="max-h-[85%] object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. OUR PHILOSOPHY & PROMISE */}
      <section className="bg-[#FAF8F3] py-16 md:py-24 border-y border-[#E5DFD3]">
        <div className="container">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="badge badge-terracotta mb-2">Our Guiding North Star</span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#143D2B]">
              The BioCleanup Purity Pillars
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-[#E5DFD3] shadow-xs flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Leaf size={24} />
              </div>
              <h3 className="font-display font-bold text-xl text-[#143D2B]">1. Honest Transparency</h3>
              <p className="text-xs sm:text-sm text-[#5C6E64] leading-relaxed">
                No secret chemical jargon. Every single active ingredient is listed plainly on our 
                bottles so conscious families know exactly what touches their living spaces.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#E5DFD3] shadow-xs flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <ShieldCheck size={24} />
              </div>
              <h3 className="font-display font-bold text-xl text-[#143D2B]">2. Clinical Efficacy</h3>
              <p className="text-xs sm:text-sm text-[#5C6E64] leading-relaxed">
                Organic does not mean weak. Our formulations undergo strict microbiological testing 
                to ensure verified 99.9% pathogen elimination on floors, bowls, and cookware.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#E5DFD3] shadow-xs flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Heart size={24} />
              </div>
              <h3 className="font-display font-bold text-xl text-[#143D2B]">3. Waterway Stewardship</h3>
              <p className="text-xs sm:text-sm text-[#5C6E64] leading-relaxed">
                When you wash dishes or rinse floors, what goes down the drain matters. Our formulations 
                safely break down into harmless organic matter without poisoning local lakes and marine ecosystems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. QUALITY COMMITMENT */}
      <section className="container py-16 md:py-24">
        <div className="bg-white rounded-3xl border border-[#E5DFD3] p-8 sm:p-12 shadow-sm text-center max-w-3xl mx-auto flex flex-col items-center gap-6">
          <span className="badge badge-gold">Certified Quality</span>
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-[#143D2B]">
            Our Zero-Compromise Guarantee
          </h2>
          <p className="text-xs sm:text-sm text-[#5C6E64] leading-relaxed">
            Every batch of BioCleanup is crafted under strict quality protocols in ISO-certified clean facilities. 
            If you or your family don't fall in love with the pure freshness of our cleaners, we will gladly replace 
            or refund your order.
          </p>

          <button
            onClick={() => navigateTo('shop')}
            className="btn btn-primary btn-lg flex items-center gap-2 mt-2"
          >
            Explore The Range <ArrowRight size={18} />
          </button>
        </div>
      </section>

    </div>
  );
}
