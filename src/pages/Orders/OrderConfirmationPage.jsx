import React from 'react';
import { CheckCircle2, Truck, ArrowRight, Download, Package, Sparkles } from 'lucide-react';
import { useOrders } from '../../context/OrderContext';
import { useNavigation } from '../../context/NavigationContext';
import { useToast } from '../../context/ToastContext';

export default function OrderConfirmationPage() {
  const { orders, getOrderById } = useOrders();
  const { pageParams, navigateTo } = useNavigation();
  const { showToast } = useToast();

  const order = getOrderById(pageParams?.orderId) || orders[0];

  const handleDownloadInvoice = () => {
    showToast('Invoice Downloaded', `Tax invoice for ${order.id} downloaded successfully.`, 'info');
  };

  if (!order) {
    return (
      <div className="container py-16 text-center">
        <h2 className="text-xl font-bold">No recent order found</h2>
        <button onClick={() => navigateTo('shop')} className="btn btn-primary mt-4">Browse Catalog</button>
      </div>
    );
  }

  return (
    <div className="container py-12 md:py-16 max-w-3xl pb-28">
      
      {/* Top Success Banner */}
      <div className="bg-white rounded-3xl border border-[#E5DFD3] p-8 md:p-10 shadow-sm text-center flex flex-col items-center gap-4">
        
        <div className="w-20 h-20 rounded-full bg-[#EBF5EE] border-4 border-white shadow-md flex items-center justify-center text-emerald-700 animate-scale">
          <CheckCircle2 size={42} className="stroke-[2.5]" />
        </div>

        <div className="flex flex-col gap-1">
          <span className="badge badge-leaf self-center">Order Confirmed</span>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#143D2B] mt-1">
            Order Placed Successfully!
          </h1>
          <p className="text-xs sm:text-sm text-[#5C6E64] max-w-md mx-auto mt-1">
            Thank you for choosing BioCleanup's pure, plant-powered hygiene solutions. 
            A confirmation receipt has been sent to your registered email.
          </p>
        </div>

        {/* Quick Order Info Pill Box */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full bg-[#FAF8F3] p-4 rounded-2xl border border-[#E5DFD3] mt-3 text-left">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#7A8E84]">Order ID</span>
            <p className="text-xs font-extrabold text-[#143D2B]">{order.id}</p>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-[#7A8E84]">Date</span>
            <p className="text-xs font-semibold text-[#143D2B]">{order.date}</p>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-[#7A8E84]">Total Paid</span>
            <p className="text-xs font-extrabold text-[#143D2B]">₹{order.total}</p>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-[#7A8E84]">Est. Delivery</span>
            <p className="text-xs font-bold text-emerald-800">{order.estimatedDelivery}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-4 w-full">
          <button
            onClick={() => navigateTo('tracking', { orderId: order.id })}
            className="btn btn-primary btn-lg flex items-center gap-2 flex-1 sm:flex-initial"
          >
            <Truck size={18} /> Track Shipment Live
          </button>

          <button
            onClick={handleDownloadInvoice}
            className="btn btn-secondary flex items-center gap-2 flex-1 sm:flex-initial text-xs"
          >
            <Download size={15} /> Download Invoice
          </button>
        </div>

      </div>

      {/* Ordered Items Preview */}
      <div className="bg-white rounded-3xl border border-[#E5DFD3] p-6 sm:p-8 shadow-xs mt-8">
        <h3 className="font-display font-bold text-lg text-[#143D2B] pb-3 border-b border-[#F2ECE1] flex items-center gap-2">
          <Package size={18} /> Order Package Items ({order.items?.length || 0})
        </h3>

        <div className="divide-y divide-[#F2ECE1] pt-2">
          {order.items?.map((item, index) => (
            <div key={index} className="py-3.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <img
                  src={item.product?.image}
                  alt={item.product?.name}
                  className="w-12 h-14 object-contain bg-[#FAF8F3] p-1 rounded-xl border border-[#E5DFD3]"
                />
                <div>
                  <h4 className="font-bold text-[#143D2B]">{item.product?.name}</h4>
                  <p className="text-[11px] text-[#7A8E84]">{item.product?.subtitle}</p>
                  <span className="text-[10px] text-emerald-800 font-semibold">Qty: {item.quantity}</span>
                </div>
              </div>

              <span className="font-extrabold text-[#143D2B] text-sm">
                ₹{(item.product?.price || item.price) * item.quantity}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-[#E5DFD3] flex items-center justify-between">
          <button
            onClick={() => navigateTo('shop')}
            className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1"
          >
            ← Continue Shopping More Products
          </button>
          <button
            onClick={() => navigateTo('account')}
            className="text-xs font-bold text-[#143D2B] hover:underline"
          >
            Go to My Account &amp; Order History →
          </button>
        </div>
      </div>

    </div>
  );
}
