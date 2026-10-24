import React, { createContext, useContext, useState, useEffect } from 'react';
import { products } from '../data/products';

const OrderContext = createContext(null);

const initialOrders = [
  {
    id: "BIO-84920",
    date: "2026-10-22",
    status: "Shipped",
    statusStep: 3, // 0: Placed, 1: Confirmed, 2: Packed, 3: Shipped, 4: Out for Delivery, 5: Delivered
    paymentMethod: "UPI (Google Pay)",
    total: 310,
    items: [
      {
        product: products[0], // Floor Cleaner Lime
        quantity: 2,
        price: 90
      },
      {
        product: products[1], // Toilet Cleaner Mint
        quantity: 1,
        price: 90
      }
    ],
    address: {
      fullName: "Arjun Verma",
      phone: "+91 98765 43210",
      street: "Flat 402, Green Meadows, 14th Main, HSR Layout",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560102"
    },
    trackingNumber: "ECOM-BLR-849201",
    carrier: "BlueDart Express Eco-Fleet",
    estimatedDelivery: "26 Oct 2026",
    timeline: [
      { title: "Order Placed", date: "22 Oct, 10:30 AM", done: true },
      { title: "Confirmed", date: "22 Oct, 11:15 AM", done: true },
      { title: "Packed in Eco-Kraft Carton", date: "22 Oct, 03:45 PM", done: true },
      { title: "Shipped via Electric Van", date: "23 Oct, 09:20 AM", current: true, done: true },
      { title: "Out for Delivery", date: "Expected 26 Oct", done: false },
      { title: "Delivered", date: "Expected 26 Oct", done: false }
    ]
  },
  {
    id: "BIO-73119",
    date: "2026-10-10",
    status: "Delivered",
    statusStep: 5,
    paymentMethod: "Credit Card (HDFC)",
    total: 230,
    items: [
      {
        product: products[2], // Hand Wash Orange
        quantity: 1,
        price: 110
      },
      {
        product: products[4], // Toilet Cleaner 10X
        quantity: 1,
        price: 120
      }
    ],
    address: {
      fullName: "Arjun Verma",
      phone: "+91 98765 43210",
      street: "Flat 402, Green Meadows, 14th Main, HSR Layout",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560102"
    },
    trackingNumber: "DEL-731192-EXP",
    carrier: "Delhivery Surface",
    estimatedDelivery: "14 Oct 2026",
    timeline: [
      { title: "Order Placed", date: "10 Oct, 04:10 PM", done: true },
      { title: "Confirmed", date: "10 Oct, 05:00 PM", done: true },
      { title: "Packed in Eco-Kraft Carton", date: "11 Oct, 10:00 AM", done: true },
      { title: "Shipped", date: "11 Oct, 02:30 PM", done: true },
      { title: "Out for Delivery", date: "14 Oct, 08:45 AM", done: true },
      { title: "Delivered", date: "14 Oct, 01:25 PM", done: true }
    ]
  }
];

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('biocleanup_orders');
      return saved ? JSON.parse(saved) : initialOrders;
    } catch {
      return initialOrders;
    }
  });

  const [activeTrackingOrder, setActiveTrackingOrder] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('biocleanup_orders', JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  const placeOrder = (orderDetails) => {
    const newOrderId = `BIO-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date();
    const estDate = new Date();
    estDate.setDate(estDate.getDate() + 3);

    const newOrder = {
      id: newOrderId,
      date: now.toISOString().split('T')[0],
      status: "Confirmed",
      statusStep: 1,
      paymentMethod: orderDetails.paymentMethod || "UPI",
      total: orderDetails.total,
      subtotal: orderDetails.subtotal,
      discount: orderDetails.discount,
      shipping: orderDetails.shipping,
      items: orderDetails.items,
      address: orderDetails.address,
      trackingNumber: `BD-IN-${Math.floor(100000 + Math.random() * 900000)}`,
      carrier: "BioCleanup Green Logistics (EV Fleet)",
      estimatedDelivery: estDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      timeline: [
        { title: "Order Placed", date: "Just now", done: true },
        { title: "Confirmed", date: "Payment verified", current: true, done: true },
        { title: "Packed in Eco-Kraft Carton", date: "Pending dispatch", done: false },
        { title: "Shipped via Electric Van", date: "In queue", done: false },
        { title: "Out for Delivery", date: "Upcoming", done: false },
        { title: "Delivered", date: "Upcoming", done: false }
      ]
    };

    setOrders((prev) => [newOrder, ...prev]);
    setActiveTrackingOrder(newOrder);
    return newOrder;
  };

  const getOrderById = (id) => orders.find((o) => o.id === id);

  return (
    <OrderContext.Provider
      value={{
        orders,
        placeOrder,
        getOrderById,
        activeTrackingOrder,
        setActiveTrackingOrder
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
