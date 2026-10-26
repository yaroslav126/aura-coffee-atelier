import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle2, Clock } from 'lucide-react';
import { CartItem } from '../types';
import { submitOrder, clientSanitize } from '../services/apiClient';

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onClearCart: () => void;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onClearCart,
}) => {
  const [orderType, setOrderType] = useState<'pickup' | 'dine-in' | 'barista-counter'>('pickup');
  const [tipPercent, setTipPercent] = useState<number>(15);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<{
    orderId: string;
    message: string;
    estimatedMinutes: number;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Stop background from reacting to touches or scrolling when payment drawer is open
  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    const prevTouchAction = document.body.style.touchAction;

    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    const handleTouchMove = (e: TouchEvent) => {
      const panel = document.getElementById('order-drawer-panel');
      if (!panel || !panel.contains(e.target as Node)) {
        if (e.cancelable) {
          e.preventDefault();
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      const panel = document.getElementById('order-drawer-panel');
      if (!panel || !panel.contains(e.target as Node)) {
        e.stopPropagation();
      }
    };

    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.touchAction = prevTouchAction;
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, [isOpen]);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.0825;
  const tipAmount = (subtotal * tipPercent) / 100;
  const total = subtotal + tax + tipAmount;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    if (!customerName.trim() || !customerPhone.trim()) {
      setErrorMessage('Please provide your name and phone number for pickup notification.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    const res = await submitOrder({
      items,
      orderType,
      customerName: clientSanitize(customerName),
      customerPhone: clientSanitize(customerPhone),
      pickupTime: 'Within 8-12 minutes',
      tipPercent,
      totalAmount: Number(total.toFixed(2)),
    });

    setLoading(false);

    if (res.success && res.orderId) {
      setCompletedOrder({
        orderId: res.orderId,
        message: res.message,
        estimatedMinutes: 8,
      });
      onClearCart();
    } else {
      setErrorMessage(res.message || 'Checkout could not be processed.');
    }
  };

  const handleReset = () => {
    setCompletedOrder(null);
    setCustomerName('');
    setCustomerPhone('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          
          {/* Backdrop - Blocks all touch events to background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            onTouchStart={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
            onTouchMove={(e) => {
              if (e.cancelable) e.preventDefault();
              e.stopPropagation();
            }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity touch-none pointer-events-auto"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex">
            <motion.div
              id="order-drawer-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="w-screen max-w-full sm:max-w-md bg-obsidian-900 border-l border-obsidian-800 p-4 sm:p-6 flex flex-col justify-between shadow-2xl relative pointer-events-auto touch-pan-y"
            >
              
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-obsidian-800">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-crema-400" />
                  <h3 className="font-serif text-lg font-bold text-parchment-50">
                    Your Order
                  </h3>
                  <span className="text-xs font-sans px-2 py-0.5 rounded-full bg-obsidian-800 text-crema-400">
                    {items.reduce((s, i) => s + i.quantity, 0)} items
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg bg-obsidian-850 hover:bg-obsidian-800 text-parchment-300 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Order Completed Receipt View */}
              {completedOrder ? (
                <div className="flex-1 py-8 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-parchment-50">
                    Order Confirmed!
                  </h4>
                  <p className="text-xs text-parchment-300 max-w-xs">
                    {completedOrder.message}
                  </p>

                  <div className="w-full p-4 rounded-2xl bg-obsidian-950 border border-obsidian-800 text-left space-y-2 font-sans text-xs">
                    <div className="flex justify-between">
                      <span className="text-parchment-400">Order ID:</span>
                      <span className="text-crema-400 font-bold">{completedOrder.orderId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-parchment-400">Fulfillment:</span>
                      <span className="text-parchment-100 uppercase">{orderType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-parchment-400">Est. Brew Time:</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> ~{completedOrder.estimatedMinutes} mins
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 w-full">
                    <button
                      onClick={handleReset}
                      className="w-full py-3 rounded-2xl bg-crema-400 hover:bg-crema-500 text-obsidian-950 font-bold text-xs uppercase tracking-wider transition-colors"
                    >
                      Done / Close Order Bag
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Items List */}
                  <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-1">
                    {items.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center py-12">
                        <ShoppingBag className="w-12 h-12 text-parchment-400 opacity-30 mb-3" />
                        <p className="text-sm font-semibold text-parchment-100">Your bag is empty</p>
                        <p className="text-xs text-parchment-300 mt-1 max-w-[200px]">
                          Select creations from our interactive cup builder or menu.
                        </p>
                      </div>
                    ) : (
                      items.map((item) => (
                        <div
                          key={item.id}
                          className="p-3.5 rounded-2xl bg-obsidian-950/70 border border-obsidian-800/80 flex items-start justify-between gap-3"
                        >
                          <div className="flex-1">
                            <h4 className="font-serif text-xs font-bold text-parchment-100">{item.name}</h4>
                            <p className="font-sans text-xs text-crema-400 mt-0.5">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                            {item.details && (
                              <div className="mt-1 space-y-0.5">
                                {item.details.map((d, idx) => (
                                  <p key={idx} className="text-[10px] text-parchment-400">
                                    • {d}
                                  </p>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-1.5 bg-obsidian-850 border border-obsidian-700 rounded-lg p-1">
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:text-white text-parchment-300"
                              title="Decrease"
                            >
                              {item.quantity === 1 ? <Trash2 className="w-3.5 h-3.5 text-rose-400" /> : <Minus className="w-3.5 h-3.5" />}
                            </button>
                            <span className="font-sans text-xs px-1 text-parchment-100 font-bold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:text-white text-parchment-300"
                              title="Increase"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Checkout Form & Summary */}
                  {items.length > 0 && (
                    <form onSubmit={handleCheckout} className="pt-4 border-t border-obsidian-800 space-y-3">
                      
                      {/* Order Type Toggle */}
                      <div className="grid grid-cols-3 gap-1 p-1 bg-obsidian-950 rounded-xl border border-obsidian-800 text-[10px] sm:text-[11px] font-sans">
                        {(['pickup', 'dine-in', 'barista-counter'] as const).map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setOrderType(type)}
                            className={`py-1.5 px-0.5 rounded-lg uppercase transition-colors truncate ${
                              orderType === type
                                ? 'bg-crema-500/20 text-crema-400 font-bold border border-crema-500/30'
                                : 'text-parchment-400 hover:text-parchment-200'
                            }`}
                          >
                            {type.split('-')[0]}
                          </button>
                        ))}
                      </div>

                      {/* Guest Details */}
                      <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 text-xs">
                        <input
                          type="text"
                          required
                          placeholder="Your Name *"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="bg-obsidian-950 border border-obsidian-800 rounded-xl px-3 py-2 text-parchment-100 placeholder:text-parchment-400 focus:outline-none focus:border-crema-500 text-xs min-w-0"
                        />
                        <input
                          type="tel"
                          required
                          placeholder="Phone (for SMS) *"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          className="bg-obsidian-950 border border-obsidian-800 rounded-xl px-3 py-2 text-parchment-100 placeholder:text-parchment-400 focus:outline-none focus:border-crema-500 text-xs min-w-0"
                        />
                      </div>

                      {/* Barista Tip Selector */}
                      <div>
                        <div className="flex justify-between text-[11px] font-sans text-parchment-300 mb-1">
                          <span>Barista Care Tip:</span>
                          <span className="text-crema-400 font-bold">${tipAmount.toFixed(2)}</span>
                        </div>
                        <div className="grid grid-cols-4 gap-1.5">
                          {[0, 10, 15, 20].map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setTipPercent(t)}
                              className={`py-1 text-[11px] font-sans rounded-lg border transition-colors ${
                                tipPercent === t
                                  ? 'bg-crema-500/20 border-crema-500 text-crema-400 font-bold'
                                  : 'bg-obsidian-950 border-obsidian-800 text-parchment-400'
                              }`}
                            >
                              {t === 0 ? 'No tip' : `${t}%`}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Price Breakdown */}
                      <div className="pt-2 text-xs font-sans space-y-1 text-parchment-300 border-t border-obsidian-800/80">
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tax (8.25%):</span>
                          <span>${tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-parchment-50 font-bold text-sm pt-1 border-t border-obsidian-800">
                          <span>Total:</span>
                          <span className="text-crema-400 font-sans">${total.toFixed(2)}</span>
                        </div>
                      </div>

                      {errorMessage && (
                        <p className="text-[11px] text-rose-400 font-sans">{errorMessage}</p>
                      )}

                      {/* Checkout Button */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-crema-400 to-crema-600 hover:brightness-105 text-obsidian-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
                      >
                        {loading ? 'Processing...' : `Pay $${total.toFixed(2)}`}
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <div className="flex items-center justify-center gap-1.5 text-[10px] font-sans text-emerald-400 pt-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Encrypted & Verified</span>
                      </div>

                    </form>
                  )}
                </>
              )}

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
