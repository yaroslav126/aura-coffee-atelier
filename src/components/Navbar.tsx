import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, ShoppingBag, MapPin, Compass, BookOpen, Sparkles, Menu as MenuIcon, X } from 'lucide-react';
import { TabType } from '../types';

import { AnimatedLogoCup } from './AnimatedLogoCup';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
}) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isLogoHovered, setIsLogoHovered] = React.useState(false);
  const hoverTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleLogoEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsLogoHovered(true);
  };

  const handleLogoLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setIsLogoHovered(false);
    }, 140);
  };

  const handleNameEnter = () => {
    // Only keep docked if currently docked at the left from hovering the logo
    if (isLogoHovered && hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  };

  const handleNameLeave = () => {
    if (isLogoHovered) {
      handleLogoLeave();
    }
  };

  const navItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'customizer', label: 'Customizer', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'menu', label: 'Menu', icon: <Coffee className="w-3.5 h-3.5" /> },
    { id: 'brew-guide', label: 'Brew Guide', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'locations', label: 'Locations', icon: <MapPin className="w-3.5 h-3.5" /> },
    { id: 'story', label: 'Story', icon: <Compass className="w-3.5 h-3.5" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-obsidian-950/90 backdrop-blur-md border-b border-obsidian-800/80 transition-all select-none">
      <div className="w-full relative pl-1.5 sm:pl-2 pr-3 sm:pr-5 lg:pr-8">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20 relative">
          
          {/* 1. Left Corner Logo Cup - Placed with a very small, refined gap from the border without container borders */}
          <div 
            onClick={() => {
              setActiveTab('customizer');
              window.scrollTo({ top: 0, behavior: 'instant' });
            }}
            onMouseEnter={handleLogoEnter}
            onMouseLeave={handleLogoLeave}
            className="flex items-center cursor-pointer z-40 py-1 pr-1 group"
            title="AURA Coffee Atelier - Tap to craft your cup"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-start transition-transform duration-300 ease-out group-hover:scale-110 active:scale-95">
              <AnimatedLogoCup isHovered={isLogoHovered} />
            </div>
          </div>

          {/* 2. Brand Name "AURA" - Centered by default, slides to the logo when hovering logo */}
          <motion.div
            onClick={() => {
              setActiveTab('customizer');
              window.scrollTo({ top: 0, behavior: 'instant' });
            }}
            onMouseEnter={handleNameEnter}
            onMouseLeave={handleNameLeave}
            className="absolute z-30 cursor-pointer py-1"
            initial={false}
            animate={
              isLogoHovered
                ? {
                    left: '2.85rem',
                    x: 0,
                  }
                : {
                    left: '50%',
                    x: '-50%',
                  }
            }
            transition={{
              type: 'spring',
              stiffness: 280,
              damping: 26,
              mass: 0.85,
            }}
          >
            <span className="font-serif text-base sm:text-xl lg:text-2xl tracking-[0.22em] text-parchment-50 font-bold uppercase transition-colors duration-300 hover:text-crema-400">
              AURA
            </span>
          </motion.div>

          {/* 3. Right Cluster: Desktop Nav Tabs + Cart Bag + Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 z-20">
            {/* Desktop Navigation Tabs */}
            <div className="hidden xl:flex items-center">
              <nav className="flex items-center space-x-0.5 bg-obsidian-900/80 border border-obsidian-800 p-1 rounded-full shadow-inner">
                {navItems.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`relative px-2.5 xl:px-3 py-1.5 text-[11px] xl:text-xs font-medium rounded-full transition-colors flex items-center gap-1 xl:gap-1.5 whitespace-nowrap ${
                        isActive ? 'text-obsidian-950 font-semibold' : 'text-parchment-200 hover:text-parchment-50'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeTabPill"
                          className="absolute inset-0 bg-gradient-to-r from-crema-400 to-crema-500 rounded-full shadow-sm"
                          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-1 xl:gap-1.5">
                        {item.icon}
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Shopping Cart Button with Animated Badge */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full bg-obsidian-850 hover:bg-obsidian-800 border border-obsidian-700/80 text-parchment-100 transition-colors shadow-sm"
              aria-label="View order bag"
            >
              <ShoppingBag className="w-5 h-5 text-crema-400" />
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-crema-500 text-obsidian-950 font-bold text-[10px] rounded-full flex items-center justify-center font-sans shadow-md"
                >
                  {cartCount}
                </motion.span>
              )}
            </motion.button>

            {/* Mobile / Tablet Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="xl:hidden p-2 rounded-lg bg-obsidian-850 text-parchment-200 hover:text-white transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className="xl:hidden py-4 border-t border-obsidian-800 space-y-1.5"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm flex items-center gap-3 transition-colors ${
                  activeTab === item.id
                    ? 'bg-crema-500/15 text-crema-400 font-semibold border border-crema-500/30'
                    : 'text-parchment-200 hover:bg-obsidian-900'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </header>
  );
};
