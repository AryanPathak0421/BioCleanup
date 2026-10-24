import React from 'react';
import { PackageOpen, ArrowRight } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

export default function EmptyState({
  icon: Icon = PackageOpen,
  title = "No items found",
  description = "Explore our organic, plant-powered home hygiene range.",
  actionText = "Browse Products",
  onAction,
  actionTarget = "shop"
}) {
  const { navigateTo } = useNavigation();

  const handleAction = () => {
    if (onAction) {
      onAction();
    } else {
      navigateTo(actionTarget);
    }
  };

  return (
    <div className="py-16 px-4 text-center flex flex-col items-center justify-center gap-4 bg-white rounded-3xl border border-[#E5DFD3] max-w-lg mx-auto shadow-xs">
      <div className="w-20 h-20 rounded-full bg-[#FAF8F3] border border-[#E5DFD3] flex items-center justify-center text-[#143D2B] shadow-inner">
        <Icon size={36} className="text-[#4E7D59]" />
      </div>

      <div className="flex flex-col gap-1.5 max-w-sm">
        <h3 className="font-display font-bold text-xl text-[#143D2B]">{title}</h3>
        <p className="text-xs text-[#5C6E64] leading-relaxed">{description}</p>
      </div>

      <button
        onClick={handleAction}
        className="btn btn-primary btn-sm mt-2 flex items-center gap-2"
      >
        {actionText} <ArrowRight size={14} />
      </button>
    </div>
  );
}
