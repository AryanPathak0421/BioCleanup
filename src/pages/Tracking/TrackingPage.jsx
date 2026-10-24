import React, { useState } from 'react';
import { 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Package, 
  ShieldCheck, 
  RefreshCw,
  PhoneCall,
  Calendar,
  Sparkles
} from 'lucide-react';
import { useOrders } from '../../context/OrderContext';
import { useNavigation } from '../../context/NavigationContext';
import { useToast } from '../../context/ToastContext';

export default function TrackingPage() {
  const { orders, getOrderById } = useOrders();
  const { pageParams, navigateTo } = useNavigation();
  const { showToast } = useToast();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const orderId = pageParams?.orderId || orders[0]?.id;
  const order = getOrderById(orderId) || orders[0];

  const handleRefreshPing = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('Live Courier Pinged', 'Courier is on schedule with clean EV van delivery.', 'info');
    }, 800);
  };

  if (!order) {
    return (
      <div className="container py-16 text-center">
        <h2 className="text-xl font-bold">No orders to track</h2>
        <button onClick={() => navigateTo('shop')} className="btn btn-primary mt-4">Shop Products</button>
      </div>
    );
  }

  // Tracking timeline steps
  const steps = [
    { title: "Order Placed", desc: "Received at BioCleanup fulfillment hub", done: order.statusStep >= 0 },
    { title: "Confirmed", desc: "Verified payment & quality batch allocation", done: order.statusStep >= 1 },
    { title: "Packed in Eco-Kraft Carton", desc: "Sealed with water-activated starch tape", done: order.statusStep >= 2 },
    { title: "Shipped", desc: "En route via Electric Delivery Fleet", done: order.statusStep >= 3, current: order.statusStep === 3 },
    { title: "Out for Delivery", desc: "Driver assigned for final doorstep drop", done: order.statusStep >= 4, current: order.statusStep === 4 },
    { title: "Delivered", desc: "Handed over safely with zero carbon footprint", done: order.statusStep >= 5, current: order.statusStep === 5 }
  ];

  return (
    <div className="container py-8 md:py-12 pb-24 max-w-4xl">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E5DFD3] gap-4 mb-8">
        <div>
          <span className="badge badge-leaf mb-1">Live Parcel Tracking</span>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#143D2B]">
            Tracking Order {order.id}
          </h1>
          <p className="text-xs text-[#7A8E84] mt-0.5">
            Carrier: {order.carrier} • AWB: {order.trackingNumber}
          </p>
        </div>

        <button
          onClick={handleRefreshPing}
          disabled={isRefreshing}
          className="btn btn-secondary btn-sm self-start sm:self-auto flex items-center gap-1.5"
        >
          <RefreshCw size={14} className={isRefreshing ? "animate-spin" : ""} />
          Refresh Status
        </button>
      </div>

      {/* Main Tracking Card */}
      <div className="bg-white rounded-3xl border border-[#E5DFD3] p-6 sm:p-10 shadow-sm space-y-10">
        
        {/* Status Highlight Banner */}
        <div className="p-4 sm:p-6 rounded-2xl bg-[#FAF8F3] border border-[#E5DFD3] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-800 text-white flex items-center justify-center">
              <Truck size={24} />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">
                Current Status
              </span>
              <h3 className="text-lg font-display font-bold text-[#143D2B]">
                {order.status}
              </h3>
              <p className="text-xs text-[#7A8E84]">Estimated Arrival: <strong className="text-[#143D2B]">{order.estimatedDelivery}</strong></p>
            </div>
          </div>

          <div className="bg-white px-3.5 py-2 rounded-xl border border-[#E5DFD3] text-xs font-semibold text-[#143D2B]">
            Fleet: Zero-Emission Electric Van
          </div>
        </div>

        {/* Timeline Graphic */}
        <div>
          <h3 className="font-display font-bold text-base text-[#143D2B] mb-6">
            Shipment Progress
          </h3>

          <div className="relative pl-6 sm:pl-8 border-l-2 border-emerald-800/30 ml-4 sm:ml-6 space-y-8">
            {steps.map((st, idx) => {
              const isFinished = st.done;
              const isCurrent = st.current;

              return (
                <div key={idx} className="relative">
                  {/* Circle marker */}
                  <div 
                    className={`absolute -left-[31px] sm:-left-[39px] top-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      isFinished
                        ? 'bg-[#143D2B] border-[#143D2B] text-white shadow-xs'
                        : isCurrent
                        ? 'bg-[#DDA133] border-white text-white ring-4 ring-[#DDA133]/20 animate-pulse'
                        : 'bg-white border-[#E5DFD3] text-[#7A8E84]'
                    }`}
                  >
                    {isFinished ? (
                      <CheckCircle2 size={14} className="stroke-[3]" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-current" />
                    )}
                  </div>

                  {/* Content text */}
                  <div>
                    <h4 className={`text-sm font-bold ${
                      isFinished || isCurrent ? 'text-[#143D2B]' : 'text-[#7A8E84]'
                    }`}>
                      {st.title} {isCurrent && <span className="badge badge-gold text-[10px] ml-2">Active</span>}
                    </h4>
                    <p className="text-xs text-[#5C6E64] mt-0.5">{st.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Delivery Details & Package Contents */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[#E5DFD3]">
          
          {/* Destination */}
          <div className="bg-[#FAF8F3] p-5 rounded-2xl border border-[#E5DFD3] space-y-2">
            <span className="text-xs font-bold text-[#7A8E84] flex items-center gap-1.5 uppercase tracking-wider">
              <MapPin size={14} className="text-emerald-700" /> Delivery Address
            </span>
            <p className="text-xs font-bold text-[#143D2B]">{order.address?.fullName}</p>
            <p className="text-xs text-[#5C6E64] leading-relaxed">
              {order.address?.street}, {order.address?.city}, {order.address?.state} - {order.address?.pincode}
            </p>
            <p className="text-xs text-[#7A8E84]">Contact: +91 {order.address?.phone}</p>
          </div>

          {/* Package Info */}
          <div className="bg-[#FAF8F3] p-5 rounded-2xl border border-[#E5DFD3] space-y-2">
            <span className="text-xs font-bold text-[#7A8E84] flex items-center gap-1.5 uppercase tracking-wider">
              <Package size={14} className="text-emerald-700" /> Package Contents
            </span>
            <p className="text-xs text-[#143D2B] font-bold">
              {order.items?.length || 0} Bio Formulations (Securely Sealed)
            </p>
            <div className="flex flex-col gap-1 text-xs text-[#5C6E64]">
              {order.items?.map((it, i) => (
                <span key={i}>• {it.product?.name} (Qty: {it.quantity})</span>
              ))}
            </div>
          </div>

        </div>

        {/* Customer Helpline */}
        <div className="p-4 rounded-2xl bg-[#EBF5EE] border border-emerald-200 flex items-center justify-between text-xs text-emerald-950">
          <span className="flex items-center gap-2">
            <PhoneCall size={16} className="text-emerald-800" />
            Questions regarding this delivery? Our eco-concierge is here to help.
          </span>
          <button
            onClick={() => navigateTo('contact')}
            className="text-xs font-bold text-emerald-800 hover:underline shrink-0"
          >
            Contact Helpdesk →
          </button>
        </div>

      </div>
    </div>
  );
}
