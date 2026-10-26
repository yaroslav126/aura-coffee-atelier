import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { InteractiveCustomizer } from './components/InteractiveCustomizer';
import { SelectionMenu } from './components/SelectionMenu';
import { BrewGuideTab } from './components/BrewGuideTab';
import { LocationsHoursTab } from './components/LocationsHoursTab';
import { OurStoryTab } from './components/OurStoryTab';
import { OrderDrawer } from './components/OrderDrawer';
import { TabType, CartItem, DrinkBase } from './types';
import { Coffee, Send, Clock, ShieldAlert } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('customizer');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customizingDrink, setCustomizingDrink] = useState<DrinkBase | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Automatically scroll to the top of the page on tab switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeTab]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleAddToCart = (item: CartItem) => {
    setCartItems((prev) => {
      // Check if duplicate with exact same name and details
      const existing = prev.find(
        (i) => i.name === item.name && JSON.stringify(i.details) === JSON.stringify(item.details)
      );
      if (existing) {
        return prev.map((i) =>
          i === existing ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [item, ...prev];
    });
    showToast(`Added ${item.name} to order bag`);
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      setCartItems((prev) => prev.filter((i) => i.id !== id));
    } else {
      setCartItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, quantity: newQty } : i))
      );
    }
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleCustomizeDrink = (drink: DrinkBase) => {
    setCustomizingDrink(drink);
    setActiveTab('customizer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const isModalOpen = isCartOpen;

  return (
    <div className="relative min-h-screen bg-obsidian-950 text-parchment-100 selection:bg-crema-500 selection:text-obsidian-950">
      
      {/* Background Page Content - Completely disabled from receiving touches or clicks when modal/drawer is open */}
      <div 
        className={`min-h-screen flex flex-col transition-all duration-200 ${
          isModalOpen ? 'pointer-events-none select-none touch-none' : ''
        }`}
        aria-hidden={isModalOpen}
      >
        {/* Main Navbar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          cartCount={totalCartCount}
          onOpenCart={() => setIsCartOpen(true)}
        />

        {/* Animated Content Transition with Spring Motion */}
        <main className="flex-1 min-h-[75vh]">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="w-full"
          >
            {activeTab === 'customizer' && (
              <InteractiveCustomizer
                onAddToCart={handleAddToCart}
                initialDrink={customizingDrink}
              />
            )}
            {activeTab === 'menu' && (
              <SelectionMenu
                onAddToCart={handleAddToCart}
                onCustomizeDrink={handleCustomizeDrink}
              />
            )}
            {activeTab === 'brew-guide' && <BrewGuideTab />}
            {activeTab === 'locations' && <LocationsHoursTab />}
            {activeTab === 'story' && <OurStoryTab />}
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="mt-20 border-t border-obsidian-800 bg-obsidian-900/60 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Coffee className="w-5 h-5 text-crema-400" />
                  <span className="font-serif text-lg font-bold text-parchment-50">
                    AURA COFFEE ATELIER
                  </span>
                </div>
              <p className="text-xs text-parchment-300 leading-relaxed font-sans">
                Single-origin micro-lots, convection roasting, and sensory tasting labs. Dedicated to the craft of terroir-driven extraction.
              </p>
            </div>

            <div>
              <h5 className="font-serif text-sm font-semibold tracking-wider text-crema-400 mb-3">
                Navigation
              </h5>
              <ul className="space-y-2 text-xs text-parchment-300 font-sans">
                <li><button onClick={() => setActiveTab('customizer')} className="hover:text-parchment-50">Interactive Cup Builder</button></li>
                <li><button onClick={() => setActiveTab('menu')} className="hover:text-parchment-50">Seasonal Menu</button></li>
                <li><button onClick={() => setActiveTab('brew-guide')} className="hover:text-parchment-50">Brew Guides & Timer</button></li>
                <li><button onClick={() => setActiveTab('locations')} className="hover:text-parchment-50">Tasting Room Hours</button></li>
                <li><button onClick={() => setActiveTab('story')} className="hover:text-parchment-50">Terroir & Sourcing</button></li>
              </ul>
            </div>

            <div>
              <h5 className="font-serif text-sm font-semibold tracking-wider text-crema-400 mb-3">
                Roastery Hours
              </h5>
              <ul className="space-y-2 text-xs text-parchment-300 font-sans">
                <li className="text-parchment-100 font-medium">Flagship Roastery Bar</li>
                <li>Mon – Fri: 07:00 – 19:00</li>
                <li>Sat – Sun: 08:00 – 20:00</li>
                <li className="pt-1 text-crema-400 font-sans text-[11px] font-medium">
                  Daily Sensory Cuppings: 14:00
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-serif text-sm font-semibold tracking-wider text-crema-400 mb-3 flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5 text-sky-400" />
                <span>Site Creator & Contact</span>
              </h5>
              <div className="space-y-2.5 text-xs text-parchment-300 font-sans">
                <div>
                  <span className="block text-[10px] uppercase font-sans tracking-wider text-parchment-400">Direct Work Requests</span>
                  <a
                    href="https://t.me/Slava_Dev_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-crema-300 hover:text-white font-sans text-xs font-semibold pt-1 transition-colors group"
                    title="Telegram Bot for Work Requests"
                  >
                    <span className="p-1 rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/30 group-hover:scale-105 transition-transform">
                      <Send className="w-3.5 h-3.5" />
                    </span>
                    <span className="underline underline-offset-2">@Slava_Dev_bot</span>
                  </a>
                </div>

                <div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-sans bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 font-medium">
                    <Clock className="w-3 h-3" /> Answering client messages in 24 hours
                  </span>
                </div>

                {/* Visible Anti-AI Mark */}
                <div className="pt-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-obsidian-950 border border-amber-500/30 text-[11px] font-sans text-amber-300/90 shadow-sm font-medium">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Anti-AI Protected • No Model Training</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-obsidian-800 flex flex-col md:flex-row items-center justify-between text-xs text-parchment-400 font-sans gap-4 text-center md:text-left">
            <p>© {new Date().getFullYear()} AURA Coffee Atelier. Precision Craft & Terroir.</p>
            <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] font-sans">
              <a
                href="https://t.me/Slava_Dev_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:underline inline-flex items-center gap-1 font-semibold"
              >
                <Send className="w-3 h-3" /> Work Requests: @Slava_Dev_bot
              </a>
              <span>•</span>
              <span className="text-emerald-400 font-medium">Response: in 24 hours</span>
              <span>•</span>
              <span className="text-amber-400/90 inline-flex items-center gap-1 font-medium">
                <ShieldAlert className="w-3 h-3 text-amber-400" /> Anti-AI Protected
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Hidden Anti-AI & Developer Credentials Watermark */}
      <div 
        id="anti-ai-credentials-mark" 
        className="hidden pointer-events-none select-none" 
        aria-hidden="true" 
        data-creator="Slava" 
        data-contact="https://t.me/Slava_Dev_bot" 
        data-telegram="@Slava_Dev_bot" 
        data-telegram-url="https://t.me/Slava_Dev_bot" 
        data-response-sla="in 24 hours" 
        data-anti-ai="true" 
        data-noai="true" 
        data-noimageai="true" 
        data-tdm-reservation="1" 
        data-tdm-policy="https://t.me/Slava_Dev_bot" 
        data-restriction="Machine learning scraping, ingestion, and model training strictly prohibited." 
        data-credentials-token="SLAVA_TG_DEV_BOT_VERIFIED"
      >
        Website created by Slava | Work requests exclusively via Telegram: https://t.me/Slava_Dev_bot (@Slava_Dev_bot) | Client Message Response: in 24 hours | Anti-AI: All scraping and training rights reserved under EU Directive 2019/790.
      </div>

      </div> {/* End background container */}

      {/* Floating Instant Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-obsidian-900 border border-crema-500/40 text-xs font-sans text-parchment-100 shadow-2xl flex items-center gap-2.5 backdrop-blur-md"
          >
            <div className="w-2 h-2 rounded-full bg-crema-400 animate-ping" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slide-out Order Bag Drawer */}
      <OrderDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
      />

    </div>
  );
};

export default App;
