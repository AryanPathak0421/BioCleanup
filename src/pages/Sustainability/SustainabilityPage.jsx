import React from 'react';
import { 
  Recycle, 
  Droplet, 
  Leaf, 
  Sun, 
  HeartHandshake, 
  ArrowRight, 
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

export default function SustainabilityPage() {
  const { navigateTo } = useNavigation();

  return (
    <div className="pb-24">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#143D2B] via-[#1E5138] to-[#0D291D] text-white py-16 md:py-24">
        <div className="container max-w-4xl text-center flex flex-col items-center gap-6">
          <div className="badge badge-leaf bg-emerald-900/60 text-emerald-300 border-emerald-600/50">
            Planet First Philosophy
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-white leading-tight">
            Nurturing Nature, <br />
            <span className="font-serif italic font-normal text-emerald-300">
              Drop by Cleansing Drop.
            </span>
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/80 leading-relaxed max-w-2xl">
            True hygiene cannot create an ecological wasteland. Learn how BioCleanup is re-engineering 
            cleaning supply chains from regenerative botanical farming to circular zero-waste packaging.
          </p>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="container -mt-10">
        <div className="bg-white rounded-3xl border border-[#E5DFD3] p-6 sm:p-8 md:p-10 shadow-xl grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-[#F2ECE1]">
          <div>
            <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#143D2B]">
              120,000+
            </span>
            <p className="text-xs text-[#7A8E84] font-semibold uppercase tracking-wider mt-1">
              PCR Bottles Diverted
            </p>
          </div>
          <div>
            <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#143D2B]">
              4.8M L
            </span>
            <p className="text-xs text-[#7A8E84] font-semibold uppercase tracking-wider mt-1">
              Greywater Kept Toxin-Free
            </p>
          </div>
          <div>
            <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#143D2B]">
              100%
            </span>
            <p className="text-xs text-[#7A8E84] font-semibold uppercase tracking-wider mt-1">
              Renewable Energy Plants
            </p>
          </div>
          <div>
            <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#143D2B]">
              Zero
            </span>
            <p className="text-xs text-[#7A8E84] font-semibold uppercase tracking-wider mt-1">
              Petrochemical Runoff
            </p>
          </div>
        </div>
      </section>

      {/* 5 Core Sustainability Pillars */}
      <section className="container py-16 md:py-24 space-y-16">
        
        {/* Sourcing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="badge badge-leaf">Pillar 1</span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#143D2B]">
              Regenerative &amp; Ethical Botanical Sourcing
            </h2>
            <p className="text-xs sm:text-sm text-[#475850] leading-relaxed">
              We partner directly with organic citrus farmers across Maharashtra and Karnataka to harvest 
              pure lime and sweet orange oils. By upcycling surplus citrus rinds that would otherwise rot in 
              agricultural waste heaps, we extract nature's most potent grease-dissolving bio-solvents.
            </p>
            <ul className="space-y-2 text-xs text-[#2F3E36] font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-700" /> Fair trade pricing guaranteed to local farm cooperatives
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-700" /> Cold-pressed extraction without synthetic chemical solvents
              </li>
            </ul>
          </div>

          <div className="bg-[#FAF8F3] p-8 rounded-3xl border border-[#E5DFD3] flex items-center justify-center">
            <img
              src="/images/products/hand-wash-orange.jpg"
              alt="BioCleanup Orange Hand Wash"
              className="max-h-72 object-contain drop-shadow-md"
            />
          </div>
        </div>

        {/* Packaging */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="bg-[#FAF8F3] p-8 rounded-3xl border border-[#E5DFD3] flex items-center justify-center order-2 md:order-1">
            <img
              src="/images/products/toilet-cleaner-mint.jpg"
              alt="BioCleanup Mint Toilet Cleaner"
              className="max-h-72 object-contain drop-shadow-md"
            />
          </div>

          <div className="space-y-4 order-1 md:order-2">
            <span className="badge badge-terracotta">Pillar 2</span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#143D2B]">
              100% Recyclable Polymers &amp; Reduced Waste
            </h2>
            <p className="text-xs sm:text-sm text-[#475850] leading-relaxed">
              Conventional cleaner bottles take over 450 years to degrade in landfills. 
              BioCleanup bottles are constructed using high-density recyclable polymers. Our labels are printed 
              with non-metallic water-based inks so automated recycling sensors can easily process and pelletize them.
            </p>
            <ul className="space-y-2 text-xs text-[#2F3E36] font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-700" /> Plastic-neutral certification across operations
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-700" /> Corrugated shipping boxes sealed with kraft paper tape
              </li>
            </ul>
          </div>
        </div>

        {/* Community Initiatives */}
        <div className="bg-gradient-to-br from-[#FAF8F3] to-[#EBF5EE] p-8 sm:p-12 rounded-3xl border border-[#E5DFD3] text-center max-w-3xl mx-auto space-y-4">
          <span className="badge badge-gold">Community Action</span>
          <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#143D2B]">
            The Clean Waterways Initiative
          </h3>
          <p className="text-xs sm:text-sm text-[#5C6E64] leading-relaxed">
            For every 5 bottles of BioCleanup purchased, we sponsor the restoration and mechanical weeding of 
            1,000 liters of urban lake water in partnership with green lake revitalization trusts across Bengaluru, 
            Hyderabad, and Chennai.
          </p>

          <button
            onClick={() => navigateTo('shop')}
            className="btn btn-primary btn-lg mt-2 inline-flex items-center gap-2"
          >
            Support the Mission — Shop Now <ArrowRight size={16} />
          </button>
        </div>

      </section>

    </div>
  );
}
