import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, Plus, Sparkles, Coffee, Check } from 'lucide-react';
import { DrinkBase, CartItem } from '../types';
import { DRINK_BASES } from '../data/coffeeData';

interface SelectionMenuProps {
  onAddToCart: (item: CartItem) => void;
  onCustomizeDrink: (drink: DrinkBase) => void;
}

export const SelectionMenu: React.FC<SelectionMenuProps> = ({
  onAddToCart,
  onCustomizeDrink,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilterTag, setActiveFilterTag] = useState<string>('all');
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'filter', label: 'Filter' },
    { id: 'espresso', label: 'Espresso' },
    { id: 'cold', label: 'Cold Brew' },
    { id: 'specialty', label: 'Specialty' },
    { id: 'bakery', label: 'Pastries' },
  ];

  const filterTags = ['all', 'Single-Origin', 'Plant-Based', 'Zero Sugar', 'Customer Favorite'];

  const filteredItems = DRINK_BASES.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTag = activeFilterTag === 'all' || item.tags.includes(activeFilterTag);

    return matchesCategory && matchesSearch && matchesTag;
  });

  const handleQuickAdd = (drink: DrinkBase) => {
    onAddToCart({
      id: `${drink.id}-${Date.now()}`,
      name: drink.name,
      price: drink.basePrice,
      quantity: 1,
      details: [
        'Standard 12oz',
        drink.category === 'bakery' ? 'Freshly baked today' : 'House Barista recipe'
      ],
      image: drink.image
    });

    setRecentlyAddedId(drink.id);
    setTimeout(() => setRecentlyAddedId(null), 1500);
  };

  return (
    <section className="py-4 sm:py-6 lg:py-12 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
      
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-6 mb-4 sm:mb-6">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-parchment-50">
            Seasonal Menu
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-parchment-300 max-w-xl">
            Single-origin roasts, signature drinks, and fresh pastries.
          </p>
        </div>

        {/* Live Search Input */}
        <div className="relative w-full md:min-w-[280px] md:w-auto">
          <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-parchment-300 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search beans, notes, brews..."
            className="w-full bg-obsidian-900 border border-obsidian-800 rounded-full pl-9 sm:pl-10 pr-3.5 py-1.5 sm:py-2 text-[11px] sm:text-xs text-parchment-100 placeholder:text-parchment-300 focus:outline-none focus:border-crema-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-parchment-300 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Category Tabs with Smooth Spring Pill */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 mb-2 sm:mb-4 scrollbar-none">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`relative px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-medium rounded-full whitespace-nowrap transition-colors ${
                isSelected ? 'text-obsidian-950 font-semibold' : 'text-parchment-200 bg-obsidian-900/60 hover:text-parchment-50 border border-obsidian-800'
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="menuActiveCategory"
                  className="absolute inset-0 bg-crema-400 rounded-full"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Quick Tag Filters */}
      <div className="flex items-center gap-1.5 sm:gap-2 mb-4 sm:mb-8 text-xs overflow-x-auto pb-1 scrollbar-none">
        <span className="text-[10px] sm:text-[11px] font-sans text-parchment-300 flex items-center gap-1 shrink-0">
          <SlidersHorizontal className="w-3 h-3" />
          Filter:
        </span>
        {filterTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveFilterTag(tag)}
            className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg text-[10px] sm:text-[11px] font-sans transition-colors shrink-0 ${
              activeFilterTag === tag
                ? 'bg-crema-500/20 text-crema-400 border border-crema-500/40'
                : 'bg-obsidian-900 text-parchment-300 hover:text-parchment-200 border border-obsidian-800/80'
            }`}
          >
            {tag === 'all' ? 'All' : tag}
          </button>
        ))}
      </div>

      {/* Animated Product Grid - 2 cols on mobile, 3 cols on tablet, 4 on desktop */}
      <motion.div 
        layout
        className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 lg:gap-6"
      >
        <AnimatePresence>
          {filteredItems.map((drink) => {
            const isJustAdded = recentlyAddedId === drink.id;
            return (
              <motion.div
                key={drink.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-obsidian-900/90 border border-obsidian-800/90 rounded-2xl sm:rounded-3xl overflow-hidden hover:border-obsidian-700 transition-all duration-300 group flex flex-col justify-between shadow-lg"
              >
                {/* Image Section */}
                <div className="relative h-32 sm:h-44 lg:h-48 w-full overflow-hidden bg-obsidian-950">
                  <img
                    src={drink.image}
                    alt={drink.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/20 to-transparent" />
                  
                  {/* Price Tag Badge */}
                  <div className="absolute bottom-2 left-2.5 sm:bottom-3 sm:left-4">
                    <span className="font-sans text-xs sm:text-base font-bold text-parchment-50 bg-obsidian-950/80 backdrop-blur-md px-2 py-0.5 sm:px-3 sm:py-1 rounded-full border border-white/10 shadow-sm">
                      ${drink.basePrice.toFixed(2)}
                    </span>
                  </div>

                  {/* Nutrition stats */}
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex gap-1">
                    {drink.caffeineMg > 0 && (
                      <span className="text-[9px] sm:text-[10px] font-sans px-1.5 py-0.2 sm:px-2 sm:py-0.5 rounded-full bg-obsidian-950/80 backdrop-blur-md text-crema-400 border border-crema-500/20">
                        {drink.caffeineMg}mg
                      </span>
                    )}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xs sm:text-base lg:text-lg font-bold text-parchment-50 group-hover:text-crema-400 transition-colors line-clamp-2 min-h-[1.75rem] sm:min-h-0 leading-snug">
                      {drink.name}
                    </h3>
                    <p className="mt-1 sm:mt-2 text-[10px] sm:text-xs text-parchment-300 line-clamp-2 leading-relaxed">
                      {drink.description}
                    </p>

                    {/* Tag Pills */}
                    <div className="flex flex-wrap gap-1 mt-2 sm:mt-3">
                      {drink.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-[8px] sm:text-[10px] font-sans px-1.5 py-0.2 sm:px-2 sm:py-0.5 rounded-md bg-obsidian-800/80 text-parchment-200 border border-obsidian-700 truncate max-w-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-3 sm:mt-5 pt-2.5 sm:pt-4 border-t border-obsidian-800/80 flex items-center gap-1.5 sm:gap-2">
                    {drink.category !== 'bakery' && (
                      <button
                        onClick={() => onCustomizeDrink(drink)}
                        className="flex-1 py-1.5 sm:py-2 px-1.5 sm:px-3 rounded-lg sm:rounded-xl bg-obsidian-800 hover:bg-obsidian-700 text-parchment-200 text-[10px] sm:text-xs font-medium border border-obsidian-700 transition-colors flex items-center justify-center gap-1 group-hover:border-crema-500/30"
                      >
                        <Sparkles className="w-3 h-3 text-crema-400 shrink-0" />
                        <span className="hidden sm:inline">Customize</span>
                        <span className="sm:hidden">Edit</span>
                      </button>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.94 }}
                      onClick={() => handleQuickAdd(drink)}
                      className={`py-1.5 sm:py-2 px-2.5 sm:px-3.5 rounded-lg sm:rounded-xl font-medium text-[10px] sm:text-xs transition-all flex items-center justify-center gap-1 shrink-0 ${
                        drink.category === 'bakery' ? 'flex-1' : ''
                      } ${
                        isJustAdded
                          ? 'bg-emerald-500 text-obsidian-950 font-bold'
                          : 'bg-crema-400 hover:bg-crema-500 text-obsidian-950 font-semibold'
                      }`}
                      title="Quick Add to Bag"
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-3 h-3 stroke-[3] shrink-0" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3 h-3 stroke-[3] shrink-0" />
                          <span>Add</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-16 bg-obsidian-900 border border-obsidian-800 rounded-3xl mt-6">
          <Coffee className="w-10 h-10 text-parchment-300 mx-auto mb-3 opacity-40" />
          <h3 className="font-serif text-base font-semibold text-parchment-100">No matching creations found</h3>
          <p className="text-xs text-parchment-300 mt-1 max-w-sm mx-auto">
            Try adjusting your search query or reset the filter tags to see all seasonal roasts.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setActiveFilterTag('all'); }}
            className="mt-4 px-4 py-2 rounded-full text-xs bg-crema-500 text-obsidian-950 font-semibold"
          >
            Reset Filters
          </button>
        </div>
      )}

    </section>
  );
};
