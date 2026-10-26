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

  const navItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'customizer', label: 'Customizer', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'menu', label: 'Menu', icon: <Coffee className="w-4 h-4" /> },
    { id: 'brew-guide', label: 'Brew Guide', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'locations', label: 'Locations', icon: <MapPin className="w-4 h-4" /> },
    { id: 'story', label: 'Story', icon: <Compass className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-obsidian-950/90 backdrop-blur-md border-b border-obsidian-800/80 transition-all">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
          
          {/* Brand Identity - Placed at Left Corner, Independent from Text Column Borders */}
          <div 
            onClick={() => setActiveTab('customizer')}
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
            className="flex items-center gap-2.5 sm:gap-3.5 cursor-pointer group shrink-0 select-none"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-obsidian-900 border border-obsidian-800/80 p-0.5 shadow-sm transition-all duration-300 ease-out group-hover:border-crema-500/50 group-hover:shadow-[0_0_12px_rgba(217,142,58,0.2)] group-hover:scale-105 transform-gpu [transform:translateZ(0)] [backface-visibility:hidden] shrink-0 flex items-center justify-center overflow-hidden">
              <AnimatedLogoCup isHovered={isLogoHovered} />
            </div>
            <div>
              <span className="font-serif text-base sm:text-xl tracking-wider text-parchment-50 font-bold uppercase transition-colors duration-300 group-hover:text-crema-400">
                AURA
              </span>
            </div>
          </div>

          {/* Desktop Navigation Tabs - Centered with Smooth Spring Pill */}
          <div className="hidden lg:flex flex-1 justify-center px-4">
            <nav className="flex items-center space-x-0.5 xl:space-x-1 bg-obsidian-900/80 border border-obsidian-800 p-1 xl:p-1.5 rounded-full shadow-inner">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative px-2.5 xl:px-4 py-1.5 xl:py-2 text-[11px] xl:text-xs font-medium rounded-full transition-colors flex items-center gap-1 xl:gap-1.5 whitespace-nowrap ${
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

          {/* Quick Actions (Cart, Mobile Toggle) */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Shopping Cart Button with Animated Badge */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full bg-obsidian-850 hover:bg-obsidian-800 border border-obsidian-700/80 text-parchment-100 transition-colors"
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

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg bg-obsidian-850 text-parchment-200 hover:text-white"
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
            className="lg:hidden py-4 border-t border-obsidian-800 space-y-1.5"
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
