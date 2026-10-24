import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export default function ContactPage() {
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      showToast('Incomplete Form', 'Please fill in your name, email, and message.', 'error');
      return;
    }
    showToast('Message Sent!', 'Our eco concierge team will reply within 4 business hours.', 'success');
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  const faqs = [
    {
      q: "Is BioCleanup Floor Cleaner safe for pets who lick the floor?",
      a: "Yes, 100%! BioCleanup Floor Cleaner is formulated with plant-derived surfactants and pure lime oils. Once mopped, it dries streak-free and non-sticky within 2 minutes without leaving toxic pesticide or phenyl residues."
    },
    {
      q: "Does BioCleanup Toilet Cleaner have the suffocating smell of hydrochloric acid?",
      a: "No. Unlike harsh store-bought cleaners that produce toxic choking acid vapors, BioCleanup utilizes an optimized buffered formulation infused with natural mint extract. It disinfects 99.9% of bacteria and dissolves stubborn scale while smelling clean and invigorating."
    },
    {
      q: "What is your free shipping policy?",
      a: "We offer complimentary express shipping on all orders totaling ₹499 or more across India. For orders below ₹499, a nominal delivery fee of ₹49 applies."
    },
    {
      q: "What happens if a bottle leaks during courier transit?",
      a: "We pack every order with double-sealed caps and biodegradable padding. However, in the rare case of transit damage, simply take a photo and WhatsApp us at +91 800-BIO-CLEAN. We dispatch a fresh replacement immediately."
    }
  ];

  return (
    <div className="container py-8 md:py-12 pb-24 max-w-5xl">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-12">
        <span className="badge badge-leaf mb-2">We Are Here For You</span>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#143D2B]">
          Get in Touch with BioCleanup
        </h1>
        <p className="text-xs sm:text-sm text-[#5C6E64] mt-2">
          Have questions about our botanical ingredients, corporate gifting, or wholesale orders?
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-[#FAF8F3] border border-[#E5DFD3] flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-[#EBF5EE] text-[#143D2B] flex items-center justify-center shrink-0">
              <Phone size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#143D2B]">Customer Helpline</h4>
              <p className="text-xs text-[#7A8E84] mt-0.5">Mon - Sat: 9:00 AM - 7:00 PM</p>
              <p className="text-sm font-extrabold text-emerald-800 mt-1">+91 800-BIO-CLEAN</p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#FAF8F3] border border-[#E5DFD3] flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-[#EBF5EE] text-[#143D2B] flex items-center justify-center shrink-0">
              <Mail size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#143D2B]">Email Inquiries</h4>
              <p className="text-xs text-[#7A8E84] mt-0.5">Response guaranteed in 4 hours</p>
              <p className="text-sm font-extrabold text-emerald-800 mt-1">care@biocleanup.in</p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#FAF8F3] border border-[#E5DFD3] flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-[#EBF5EE] text-[#143D2B] flex items-center justify-center shrink-0">
              <MapPin size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#143D2B]">Innovation HQ</h4>
              <p className="text-xs text-[#5C6E64] mt-1 leading-relaxed">
                BioCleanup Natural Innovations Pvt. Ltd.<br />
                Eco-Hub Tower, 5th Floor, Outer Ring Road, Bellandur, Bengaluru 560103
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#E5DFD3] shadow-xs">
          <h3 className="font-display font-bold text-xl text-[#143D2B] mb-4">
            Send Us a Message
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-[#475850] block mb-1">Your Full Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Meera Nambiar"
                className="w-full text-xs p-3 rounded-xl border border-[#E5DFD3] bg-[#FAF8F3] focus:border-[#143D2B]"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#475850] block mb-1">Email Address *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full text-xs p-3 rounded-xl border border-[#E5DFD3] bg-[#FAF8F3] focus:border-[#143D2B]"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#475850] block mb-1">Mobile (Optional)</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+91 9876543210"
                  className="w-full text-xs p-3 rounded-xl border border-[#E5DFD3] bg-[#FAF8F3] focus:border-[#143D2B]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#475850] block mb-1">How can we assist you? *</label>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Write your feedback, question, or wholesale inquiry here..."
                className="w-full text-xs p-3 rounded-xl border border-[#E5DFD3] bg-[#FAF8F3] focus:border-[#143D2B]"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg w-full flex items-center justify-center gap-2 shadow-lg"
            >
              Submit Inquiry <Send size={16} />
            </button>
          </form>
        </div>

      </div>

      {/* Frequently Asked Questions */}
      <div className="mt-16 bg-white p-6 sm:p-10 rounded-3xl border border-[#E5DFD3] shadow-xs">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="badge badge-leaf mb-2">Instant Answers</span>
          <h3 className="font-display font-extrabold text-2xl text-[#143D2B]">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-3 max-w-3xl mx-auto">
          {faqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={i}
                className="p-4 rounded-2xl border border-[#E5DFD3] bg-[#FAF8F3] transition cursor-pointer"
                onClick={() => setOpenFaq(isOpen ? null : i)}
              >
                <div className="flex items-center justify-between font-bold text-xs sm:text-sm text-[#143D2B]">
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
                {isOpen && (
                  <p className="text-xs text-[#5C6E64] mt-3 pt-3 border-t border-[#E5DFD3] leading-relaxed">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
