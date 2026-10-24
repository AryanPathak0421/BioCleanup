import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CreditCard, 
  Smartphone, 
  Building, 
  Banknote, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Lock, 
  Truck,
  Sparkles,
  QrCode
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useOrders } from '../../context/OrderContext';
import { useNavigation } from '../../context/NavigationContext';
import { useToast } from '../../context/ToastContext';

export default function CheckoutPage() {
  const { cartItems, subtotal, couponDiscount, shipping, grandTotal, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const { navigateTo } = useNavigation();
  const { showToast } = useToast();

  const [step, setStep] = useState(1); // 1: Info & Shipping, 2: Payment, 3: Review
  const [isProcessing, setIsProcessing] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: 'Arjun Verma',
    email: 'arjun.verma@example.com',
    phone: '9876543210',
    street: 'Flat 402, Green Meadows, 14th Main, HSR Layout',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560102',
    landmark: 'Near BDA Complex'
  });

  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking' | 'cod'
  const [upiId, setUpiId] = useState('arjun@okhdfcbank');
  const [cardData, setCardData] = useState({
    number: '4532 •••• •••• 8821',
    holder: 'ARJUN VERMA',
    expiry: '09/29',
    cvv: '•••'
  });

  if (cartItems.length === 0) {
    navigateTo('cart');
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!formData.fullName || !formData.email || !formData.phone || !formData.street || !formData.pincode) {
        showToast('Required Fields', 'Please complete the shipping details.', 'error');
        return;
      }
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (step === 2) {
      setStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleConfirmOrder = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const order = placeOrder({
        items: cartItems,
        total: grandTotal,
        subtotal,
        discount: couponDiscount,
        shipping,
        address: formData,
        paymentMethod: paymentMethod === 'upi' ? 'UPI (Google Pay/PhonePe)' : paymentMethod === 'card' ? 'Credit/Debit Card' : paymentMethod === 'netbanking' ? 'Net Banking' : 'Cash on Delivery (COD)'
      });

      clearCart();
      setIsProcessing(false);
      showToast('Order Successful!', `Your order ${order.id} has been placed.`, 'success');
      navigateTo('confirmation', { orderId: order.id });
    }, 1500);
  };

  return (
    <div className="container py-8 md:py-12 pb-24">
      {/* Checkout Progress Stepper */}
      <div className="max-w-2xl mx-auto mb-10">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 bg-[#E5DFD3] -z-10" />
          <div 
            className="absolute top-1/2 left-0 -translate-y-1/2 h-1 bg-[#143D2B] transition-all duration-300 -z-10"
            style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
          />

          <div className="flex flex-col items-center gap-1.5">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition ${
              step >= 1 ? 'bg-[#143D2B] text-white' : 'bg-white border-2 border-[#E5DFD3] text-[#7A8E84]'
            }`}>
              1
            </div>
            <span className="text-[11px] font-bold text-[#143D2B]">Shipping</span>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition ${
              step >= 2 ? 'bg-[#143D2B] text-white' : 'bg-white border-2 border-[#E5DFD3] text-[#7A8E84]'
            }`}>
              2
            </div>
            <span className="text-[11px] font-bold text-[#143D2B]">Payment</span>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition ${
              step === 3 ? 'bg-[#143D2B] text-white' : 'bg-white border-2 border-[#E5DFD3] text-[#7A8E84]'
            }`}>
              3
            </div>
            <span className="text-[11px] font-bold text-[#143D2B]">Confirm</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Main Step Form Area */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-[#E5DFD3] p-6 sm:p-8 shadow-xs">
          
          {/* STEP 1: Shipping Details */}
          {step === 1 && (
            <form onSubmit={handleNextStep} className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#F2ECE1]">
                <h3 className="font-display font-bold text-xl text-[#143D2B]">
                  1. Contact &amp; Delivery Address
                </h3>
                <span className="text-xs text-emerald-800 font-semibold flex items-center gap-1">
                  <Lock size={12} /> SSL 256-Bit Encrypted
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#475850] block mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full text-xs p-3 rounded-xl border border-[#E5DFD3] focus:border-[#143D2B] bg-[#FAF8F3]"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#475850] block mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full text-xs p-3 rounded-xl border border-[#E5DFD3] focus:border-[#143D2B] bg-[#FAF8F3]"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-[#475850] block mb-1">Phone Number (For Delivery SMS) *</label>
                  <div className="flex">
                    <span className="p-3 bg-[#E5DFD3]/50 text-xs font-bold border border-r-0 border-[#E5DFD3] rounded-l-xl text-[#475850]">
                      +91
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full text-xs p-3 rounded-r-xl border border-[#E5DFD3] focus:border-[#143D2B] bg-[#FAF8F3]"
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-[#475850] block mb-1">Flat / House No. / Street / Locality *</label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    className="w-full text-xs p-3 rounded-xl border border-[#E5DFD3] focus:border-[#143D2B] bg-[#FAF8F3]"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#475850] block mb-1">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full text-xs p-3 rounded-xl border border-[#E5DFD3] focus:border-[#143D2B] bg-[#FAF8F3]"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#475850] block mb-1">State *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full text-xs p-3 rounded-xl border border-[#E5DFD3] focus:border-[#143D2B] bg-[#FAF8F3]"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#475850] block mb-1">PIN Code *</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="w-full text-xs p-3 rounded-xl border border-[#E5DFD3] focus:border-[#143D2B] bg-[#FAF8F3]"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#475850] block mb-1">Landmark (Optional)</label>
                  <input
                    type="text"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleInputChange}
                    className="w-full text-xs p-3 rounded-xl border border-[#E5DFD3] focus:border-[#143D2B] bg-[#FAF8F3]"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg flex items-center gap-2"
                >
                  Continue to Payment <ArrowRight size={16} />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Payment UI */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#F2ECE1]">
                <h3 className="font-display font-bold text-xl text-[#143D2B]">
                  2. Select Payment Mode
                </h3>
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-emerald-800 font-bold hover:underline flex items-center gap-1"
                >
                  <ArrowLeft size={13} /> Edit Address
                </button>
              </div>

              {/* Payment Method Selector Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3.5 rounded-2xl border flex flex-col items-center gap-2 transition ${
                    paymentMethod === 'upi'
                      ? 'border-[#143D2B] bg-[#EBF5EE] text-[#143D2B] shadow-xs'
                      : 'border-[#E5DFD3] bg-white text-[#5C6E64] hover:bg-[#FAF8F3]'
                  }`}
                >
                  <Smartphone size={22} className={paymentMethod === 'upi' ? "text-emerald-800" : ""} />
                  <span className="text-xs font-bold">UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3.5 rounded-2xl border flex flex-col items-center gap-2 transition ${
                    paymentMethod === 'card'
                      ? 'border-[#143D2B] bg-[#EBF5EE] text-[#143D2B] shadow-xs'
                      : 'border-[#E5DFD3] bg-white text-[#5C6E64] hover:bg-[#FAF8F3]'
                  }`}
                >
                  <CreditCard size={22} className={paymentMethod === 'card' ? "text-emerald-800" : ""} />
                  <span className="text-xs font-bold">Credit/Debit</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3.5 rounded-2xl border flex flex-col items-center gap-2 transition ${
                    paymentMethod === 'netbanking'
                      ? 'border-[#143D2B] bg-[#EBF5EE] text-[#143D2B] shadow-xs'
                      : 'border-[#E5DFD3] bg-white text-[#5C6E64] hover:bg-[#FAF8F3]'
                  }`}
                >
                  <Building size={22} className={paymentMethod === 'netbanking' ? "text-emerald-800" : ""} />
                  <span className="text-xs font-bold">Net Banking</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3.5 rounded-2xl border flex flex-col items-center gap-2 transition ${
                    paymentMethod === 'cod'
                      ? 'border-[#143D2B] bg-[#EBF5EE] text-[#143D2B] shadow-xs'
                      : 'border-[#E5DFD3] bg-white text-[#5C6E64] hover:bg-[#FAF8F3]'
                  }`}
                >
                  <Banknote size={22} className={paymentMethod === 'cod' ? "text-emerald-800" : ""} />
                  <span className="text-xs font-bold">Cash on Del.</span>
                </button>
              </div>

              {/* UPI Sub-view */}
              {paymentMethod === 'upi' && (
                <div className="p-5 rounded-2xl bg-[#FAF8F3] border border-[#E5DFD3] flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-36 h-36 bg-white p-2.5 rounded-2xl border border-[#E5DFD3] shadow-xs flex flex-col items-center justify-center shrink-0">
                    <QrCode size={100} className="text-[#143D2B]" />
                    <span className="text-[9px] font-bold text-[#7A8E84] mt-1">Scan to Pay ₹{grandTotal}</span>
                  </div>
                  <div className="flex flex-col gap-2.5 flex-1">
                    <h4 className="text-sm font-bold text-[#143D2B]">Pay with any UPI App</h4>
                    <p className="text-xs text-[#7A8E84]">
                      Scan the QR code or enter your VPA / UPI ID below to receive an instant approval request:
                    </p>
                    <div className="flex gap-2 mt-1">
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="text-xs p-2.5 rounded-xl border border-[#E5DFD3] flex-1 bg-white font-medium"
                      />
                      <button type="button" className="btn btn-secondary btn-sm text-xs">Verify</button>
                    </div>
                    <div className="flex items-center gap-3 pt-1 text-[11px] text-[#7A8E84]">
                      <span>Supports: Google Pay • PhonePe • Paytm • CRED</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Card Sub-view */}
              {paymentMethod === 'card' && (
                <div className="p-5 rounded-2xl bg-[#FAF8F3] border border-[#E5DFD3] space-y-4">
                  <div>
                    <label className="text-xs font-bold text-[#475850] block mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardData.number}
                      onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#E5DFD3] bg-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-[#475850] block mb-1">Expiry MM/YY</label>
                      <input
                        type="text"
                        value={cardData.expiry}
                        onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                        className="w-full text-xs p-2.5 rounded-xl border border-[#E5DFD3] bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#475850] block mb-1">CVV</label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardData.cvv}
                        onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                        className="w-full text-xs p-2.5 rounded-xl border border-[#E5DFD3] bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* COD Sub-view */}
              {paymentMethod === 'cod' && (
                <div className="p-5 rounded-2xl bg-[#EBF5EE] border border-emerald-300 text-xs text-emerald-950 space-y-2">
                  <h4 className="font-bold flex items-center gap-1.5">
                    <CheckCircle2 size={16} className="text-emerald-700" /> Cash on Delivery Available
                  </h4>
                  <p>
                    Pay cash or via UPI to the delivery executive when the parcel reaches your doorstep. 
                    Please keep exact change of ₹{grandTotal} ready.
                  </p>
                </div>
              )}

              <div className="pt-4 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn btn-outline btn-sm text-xs"
                >
                  ← Back to Address
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="btn btn-primary btn-lg flex items-center gap-2"
                >
                  Review Order <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Review and Place Order */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-[#F2ECE1]">
                <h3 className="font-display font-bold text-xl text-[#143D2B]">
                  3. Review Order &amp; Place Confirmation
                </h3>
              </div>

              {/* Delivery Destination Summary */}
              <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E5DFD3] flex justify-between items-start">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A8E84] mb-1">
                    Delivering To:
                  </h4>
                  <p className="text-xs font-extrabold text-[#143D2B]">{formData.fullName}</p>
                  <p className="text-xs text-[#5C6E64] mt-0.5">{formData.street}, {formData.city}, {formData.state} - {formData.pincode}</p>
                  <p className="text-xs text-[#7A8E84] mt-0.5">Phone: +91 {formData.phone}</p>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-xs font-bold text-emerald-800 hover:underline"
                >
                  Change
                </button>
              </div>

              {/* Payment Summary */}
              <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E5DFD3] flex justify-between items-center">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A8E84] mb-0.5">
                    Payment Option:
                  </h4>
                  <span className="text-xs font-extrabold text-[#143D2B] uppercase">
                    {paymentMethod === 'upi' ? 'UPI / QR Payment' : paymentMethod === 'card' ? 'Credit Card' : paymentMethod === 'netbanking' ? 'Net Banking' : 'Cash on Delivery'}
                  </span>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="text-xs font-bold text-emerald-800 hover:underline"
                >
                  Change
                </button>
              </div>

              {/* Confirm CTA */}
              <div className="pt-4 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={handleConfirmOrder}
                  disabled={isProcessing}
                  className="btn btn-primary btn-lg w-full flex items-center justify-center gap-2 text-base font-bold shadow-xl py-3.5"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Securing &amp; Placing Order...
                    </>
                  ) : (
                    <>
                      Place Clean Order (₹{grandTotal}) <ArrowRight size={18} />
                    </>
                  )}
                </button>
                <p className="text-center text-[11px] text-[#7A8E84]">
                  By clicking Place Order, you confirm acceptance of BioCleanup's clean green delivery terms.
                </p>
              </div>

            </div>
          )}

        </div>

        {/* Right Summary Column */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-[#E5DFD3] p-6 shadow-sm flex flex-col gap-4 sticky top-24">
          <h4 className="font-display font-bold text-base text-[#143D2B] pb-3 border-b border-[#F2ECE1]">
            Items in Order ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
          </h4>

          <div className="flex flex-col gap-3 max-h-60 overflow-y-auto divide-y divide-[#F2ECE1]">
            {cartItems.map((item) => (
              <div key={item.product.id} className="pt-2 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <img src={item.product.image} alt={item.product.name} className="w-10 h-12 object-contain" />
                  <div>
                    <span className="font-bold text-[#143D2B] block line-clamp-1">{item.product.name}</span>
                    <span className="text-[10px] text-[#7A8E84]">Qty: {item.quantity}</span>
                  </div>
                </div>
                <span className="font-bold text-[#143D2B]">₹{item.product.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-[#E5DFD3] flex flex-col gap-1.5 text-xs text-[#5C6E64]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-[#143D2B]">₹{subtotal}</span>
            </div>
            {couponDiscount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Coupon Savings</span>
                <span>-₹{couponDiscount}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping Fee</span>
              <span>{shipping === 0 ? <strong className="text-emerald-700">FREE</strong> : `₹${shipping}`}</span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-[#143D2B] pt-2 border-t border-[#E5DFD3]">
              <span>Payable</span>
              <span className="text-lg text-emerald-950">₹{grandTotal}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
