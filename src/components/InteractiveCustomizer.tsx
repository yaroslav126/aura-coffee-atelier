import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Flame, 
  Snowflake, 
  Plus, 
  Check, 
  Layers, 
  Droplets,
  Gauge
} from 'lucide-react';
import { 
  DrinkBase, 
  CoffeeOrigin, 
  MilkOption, 
  TempOption, 
  SyrupOption,
  CartItem 
} from '../types';
import { DRINK_BASES, COFFEE_ORIGINS } from '../data/coffeeData';

interface InteractiveCustomizerProps {
  onAddToCart: (item: CartItem) => void;
  initialDrink?: DrinkBase | null;
}

export const InteractiveCustomizer: React.FC<InteractiveCustomizerProps> = ({
  onAddToCart,
  initialDrink,
}) => {
  const [selectedBase, setSelectedBase] = useState<DrinkBase>(
    initialDrink || DRINK_BASES[1] // Default to Silken Oat Flat White
  );
  const [selectedOrigin, setSelectedOrigin] = useState<CoffeeOrigin>(COFFEE_ORIGINS[0]);
  const [size, setSize] = useState<'8oz Small' | '12oz Standard' | '16oz Grand'>('12oz Standard');
  const [milk, setMilk] = useState<MilkOption>('Oat (Oatly Barista)');
  const [milkRatio, setMilkRatio] = useState<number>(selectedBase.defaultMilkRatio);
  const [temperature, setTemperature] = useState<TempOption>('Steaming Hot (65°C)');
  const [sweetness, setSweetness] = useState<'0% Unsweetened' | '25% Subtle' | '50% Balanced' | '100% Rich'>('0% Unsweetened');
  const [syrup, setSyrup] = useState<SyrupOption>('None');
  const [extraShot, setExtraShot] = useState<boolean>(false);
  const [foamLevel, setFoamLevel] = useState<'None' | 'Velvet Microfoam' | 'Extra Cloud Foam'>('Velvet Microfoam');
  const [isAdded, setIsAdded] = useState(false);

  // Sync when initial drink changes
  React.useEffect(() => {
    if (initialDrink) {
      setSelectedBase(initialDrink);
      setMilkRatio(initialDrink.defaultMilkRatio);
      if (!initialDrink.supportsMilk) {
        setMilk('None (Black)');
      }
    }
  }, [initialDrink]);

  // Dynamic price calculation
  const sizeMultiplier = size === '8oz Small' ? 0.9 : size === '16oz Grand' ? 1.25 : 1.0;
  const syrupCost = syrup !== 'None' ? 0.75 : 0;
  const shotCost = extraShot ? 1.25 : 0;
  const originPremium = selectedOrigin.roastLevel === 'Light' ? 0.50 : 0; // Geisha micro-lot premium
  const totalPrice = ((selectedBase.basePrice * sizeMultiplier) + syrupCost + shotCost + originPremium);

  // Live Sensory & Nutritional stats
  const liveCalories = Math.round(
    (selectedBase.calories * sizeMultiplier) +
    (milk !== 'None (Black)' ? (milkRatio / 100) * 80 : 0) +
    (sweetness === '25% Subtle' ? 20 : sweetness === '50% Balanced' ? 45 : sweetness === '100% Rich' ? 90 : 0)
  );

  const liveCaffeine = Math.round(
    selectedBase.caffeineMg + (extraShot ? 75 : 0)
  );

  const handleAdd = () => {
    const details = [
      `${size}`,
      `${selectedOrigin.name} (${selectedOrigin.roastLevel})`,
      selectedBase.supportsMilk ? `${milk} (${milkRatio}% milk)` : 'Black extraction',
      `${temperature}`,
      sweetness !== '0% Unsweetened' ? `Sweetness: ${sweetness}` : 'Unsweetened',
      syrup !== 'None' ? `Syrup: ${syrup}` : null,
      extraShot ? 'Extra Ristretto Shot (+1.25)' : null,
      foamLevel !== 'None' ? foamLevel : null
    ].filter(Boolean) as string[];

    onAddToCart({
      id: `${selectedBase.id}-${Date.now()}`,
      name: `Custom ${selectedBase.name}`,
      price: Number(totalPrice.toFixed(2)),
      quantity: 1,
      details,
      image: selectedBase.image,
      customization: {
        baseDrink: selectedBase,
        origin: selectedOrigin,
        size,
        milk,
        milkRatio,
        temperature,
        sweetness,
        syrup,
        extraShot,
        foamLevel
      }
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const isIced = temperature.includes('Ice') || temperature.includes('Chilled');

  return (
    <section className="py-4 sm:py-6 lg:py-12 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
      
      {/* Editorial Header */}
      <div className="mb-4 sm:mb-6 text-center max-w-xl mx-auto">
        <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-parchment-50">
          Craft Your Cup
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-parchment-300 font-sans">
          Origin, milk ratio, and brew temperature.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-start">
        
        {/* LEFT COLUMN: The Interactive Animated Cup Visualizer (5 Cols) */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 self-start space-y-4 z-20">
          <div className="bg-obsidian-900 border border-obsidian-800 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-soft-float relative overflow-hidden max-h-[calc(100vh-7rem)] overflow-y-auto overscroll-contain scrollbar-none">
            
            {/* Visualizer Background Glow */}
            <div 
              className="absolute -top-24 -left-24 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none transition-colors duration-700"
              style={{ backgroundColor: selectedOrigin.colorHex }}
            />
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-1.5 sm:gap-2 z-30">
              <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-sans bg-obsidian-800 text-parchment-200 border border-obsidian-700">
                {liveCalories} kcal
              </span>
              <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-sans bg-obsidian-800 text-crema-400 border border-crema-500/20">
                {liveCaffeine} mg
              </span>
            </div>

            {/* Interactive Ceramic Coffee Cup & Saucer Simulation */}
            <div className="h-56 sm:h-64 lg:h-76 w-full flex flex-col items-center justify-center relative py-2 sm:py-3">
              
              {/* Animated Floating Steam for Hot Drinks */}
              {!isIced && (
                <div className="absolute top-1 sm:top-2 flex gap-3 sm:gap-4 pointer-events-none z-30">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{
                        y: [-3, -38],
                        opacity: [0, 0.65, 0],
                        scaleX: [1, 1.4, 0.8],
                        x: [0, (i - 1) * 8]
                      }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        delay: i * 0.6,
                        ease: "easeOut"
                      }}
                      className="w-1.5 sm:w-2 h-10 sm:h-14 bg-gradient-to-t from-parchment-200/50 via-parchment-100/25 to-transparent rounded-full filter blur-[2px]"
                    />
                  ))}
                </div>
              )}

              {/* Cup and Handle Assembly */}
              <div className="relative flex items-center justify-center mb-0.5 sm:mb-1 scale-90 sm:scale-95 lg:scale-100 transition-transform">
                
                {/* Ceramic Cup Body with Rounded Barista Silhouette */}
                <div className="relative w-44 sm:w-52 lg:w-56 h-38 sm:h-44 lg:h-48 rounded-b-[55px] sm:rounded-b-[70px] rounded-t-xl sm:rounded-t-2xl bg-gradient-to-b from-[#2E2016] via-[#23170F] to-[#18100A] p-2 sm:p-2.5 border-t-3 sm:border-t-4 border-crema-400/40 border-x sm:border-x-2 border-b-3 sm:border-b-4 border-[#3D2C1F] shadow-2xl overflow-hidden flex flex-col justify-end">
                  
                  {/* Matte Ceramic Glaze Highlight & Rim Texture */}
                  <div className="absolute inset-x-0 top-0 h-3 sm:h-4 bg-gradient-to-r from-white/5 via-white/20 to-white/5 rounded-t-xl pointer-events-none z-20 border-b border-black/30" />
                  <div className="absolute inset-y-0 left-2 sm:left-3 w-2 sm:w-3 bg-gradient-to-r from-white/10 to-transparent rounded-full pointer-events-none z-20" />
                  <div className="absolute inset-y-0 right-2 sm:right-3 w-1.5 sm:w-2 bg-gradient-to-l from-white/5 to-transparent rounded-full pointer-events-none z-20" />

                  {/* Floating Ice Cubes if Iced */}
                  {isIced && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-x-0 top-6 sm:top-8 z-20 flex justify-center gap-2 pointer-events-none"
                    >
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{
                            y: [0, -4, 0],
                            rotate: [0, 5, -4, 0]
                          }}
                          transition={{
                            duration: 2.8 + i * 0.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-white/35 backdrop-blur-md border border-white/50 shadow-inner"
                        />
                      ))}
                    </motion.div>
                  )}

                  {/* Inner Ceramic Cup Well (Holds the Liquid) */}
                  <div className="relative w-full h-full rounded-b-[45px] sm:rounded-b-[58px] rounded-t-lg bg-[#140C07] overflow-hidden flex flex-col justify-end shadow-cup-inner">
                    
                    {/* Layer 3: Foam / Crema Head with Velvet Art Tone */}
                    {foamLevel !== 'None' && selectedBase.supportsMilk && (
                      <motion.div
                        animate={{
                          height: foamLevel === 'Extra Cloud Foam' ? 28 : 18,
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className="w-full bg-gradient-to-b from-[#FBF8F1] via-[#F3E8D7] to-[#DECAB1] rounded-t-md relative z-10 shadow-sm border-b border-[#C8B095]/40 overflow-hidden"
                      >
                        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center items-center opacity-30">
                          <div className="w-12 h-1.5 rounded-full bg-[#B8906B]/50 blur-[0.5px]" />
                        </div>
                      </motion.div>
                    )}

                    {/* Layer 2: Steamed Milk / Oat Emulsion */}
                    {selectedBase.supportsMilk && milkRatio > 0 && (
                      <motion.div
                        animate={{
                          height: `${Math.min(60, (milkRatio / 100) * 90)}px`,
                        }}
                        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                        className="w-full bg-gradient-to-b from-[#EFE5D5] via-[#E2D2BC] to-[#B38B65] relative shadow-inner"
                      >
                        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle,_#fff_10%,_transparent_20%)] bg-[size:6px_6px]" />
                      </motion.div>
                    )}

                    {/* Layer 1: Single-Origin Espresso Extraction */}
                    <motion.div
                      animate={{
                        height: selectedBase.category === 'filter' 
                          ? '115px' 
                          : `${Math.max(40, 100 - (milkRatio / 100) * 55)}px`,
                        backgroundColor: selectedOrigin.colorHex,
                      }}
                      transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                      className="w-full rounded-b-[42px] sm:rounded-b-[54px] relative overflow-hidden"
                    >
                      {/* Liquid Swirl Wave */}
                      <motion.div
                        animate={{ x: [-15, 0, -15] }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute -top-2 inset-x-0 h-3 bg-white/15 rounded-full blur-[1px]"
                      />
                    </motion.div>

                  </div>

                </div>

                {/* Ceramic Cup Handle on Right Side */}
                <div className="w-7 sm:w-8 lg:w-9 h-22 sm:h-26 lg:h-28 -ml-1 rounded-r-[26px] sm:rounded-r-[32px] border-3 sm:border-4 border-l-0 border-[#3D2C1F] bg-gradient-to-r from-transparent to-[#281B12] shadow-lg flex items-center justify-center">
                  <div className="w-3 sm:w-4 h-12 sm:h-16 rounded-r-[14px] sm:rounded-r-[18px] bg-obsidian-900 border-l border-[#3D2C1F]/40 shadow-inner" />
                </div>

              </div>

              {/* Ceramic Saucer Plate Underneath */}
              <div className="relative w-52 sm:w-60 lg:w-64 h-4 sm:h-5 mt-[-5px] rounded-[50%] bg-gradient-to-b from-[#38281C] via-[#2A1D14] to-[#160E08] border border-[#4E3929]/70 shadow-saucer-shadow flex items-center justify-center">
                {/* Saucer Inner Ring indentation */}
                <div className="w-28 sm:w-36 h-2 sm:h-2.5 rounded-[50%] border border-[#4E3929]/60 bg-[#1F150E]/60 shadow-inner" />
              </div>

            </div>

            {/* Sensory Flavor Radar Indicators */}
            <div className="mt-3 pt-3 border-t border-obsidian-800 space-y-2 sm:space-y-3">
              <div className="flex items-center justify-between text-xs text-parchment-200">
                <span className="font-sans text-crema-400 text-[11px] sm:text-xs flex items-center gap-1.5">
                  <Gauge className="w-3.5 h-3.5" />
                  Terroir Profile
                </span>
                <span className="text-parchment-300 text-[10px] sm:text-[11px] font-sans">
                  {selectedOrigin.elevation}
                </span>
              </div>

              {/* Progress bars for Acidity, Body, Sweetness */}
              <div className="grid grid-cols-3 sm:grid-cols-1 gap-2 sm:gap-2 text-[10px] sm:text-xs">
                <div>
                  <div className="flex justify-between text-[10px] sm:text-[11px] text-parchment-300 mb-0.5 sm:mb-1">
                    <span className="truncate">Acidity</span>
                    <span className="font-sans text-crema-400">{selectedOrigin.acidity}/5</span>
                  </div>
                  <div className="w-full h-1 sm:h-1.5 bg-obsidian-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(selectedOrigin.acidity / 5) * 100}%` }}
                      transition={{ duration: 0.5 }}
                      className="h-full bg-amber-400 rounded-full"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] sm:text-[11px] text-parchment-300 mb-0.5 sm:mb-1">
                    <span className="truncate">Body</span>
                    <span className="font-sans text-crema-400">{selectedOrigin.body}/5</span>
                  </div>
                  <div className="w-full h-1 sm:h-1.5 bg-obsidian-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(selectedOrigin.body / 5) * 100}%` }}
                      transition={{ duration: 0.5 }}
                      className="h-full bg-crema-500 rounded-full"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] sm:text-[11px] text-parchment-300 mb-0.5 sm:mb-1">
                    <span className="truncate">Sweetness</span>
                    <span className="font-sans text-crema-400">{selectedOrigin.sweetness}/5</span>
                  </div>
                  <div className="w-full h-1 sm:h-1.5 bg-obsidian-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(selectedOrigin.sweetness / 5) * 100}%` }}
                      transition={{ duration: 0.5 }}
                      className="h-full bg-rose-400 rounded-full"
                    />
                  </div>
                </div>
              </div>

              {/* Flavor Note Tags */}
              <div className="flex flex-wrap gap-1 pt-1">
                {selectedOrigin.flavorNotes.map((note) => (
                  <span
                    key={note}
                    className="text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-md bg-obsidian-800/90 text-parchment-200 border border-obsidian-700 font-sans"
                  >
                    • {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Price & Add to Bag Primary CTA */}
            <div className="mt-3 sm:mt-5 pt-3 sm:pt-4 border-t border-obsidian-800 flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] sm:text-[11px] text-parchment-300 block font-sans">Price</span>
                <span className="text-lg sm:text-2xl font-bold font-sans text-parchment-50">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAdd}
                disabled={isAdded}
                className={`flex-1 py-2.5 sm:py-3.5 px-4 sm:px-6 rounded-xl sm:rounded-2xl font-sans font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 sm:gap-2 shadow-lg ${
                  isAdded
                    ? 'bg-emerald-500 text-obsidian-950 shadow-emerald-500/20'
                    : 'bg-gradient-to-r from-crema-400 to-crema-600 text-obsidian-950 hover:brightness-105 shadow-crema-500/20'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                    <span>Add to Bag</span>
                  </>
                )}
              </motion.button>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Control Matrix (7 Cols) */}
        <div className="lg:col-span-7 space-y-3 sm:space-y-4 lg:space-y-6">

          {/* STEP 1: Select Drink Base */}
          <div className="bg-obsidian-900 border border-obsidian-800 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5">
            <label className="text-[11px] sm:text-xs font-sans uppercase tracking-wider text-crema-400 block mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
              <Layers className="w-3.5 h-3.5" />
              1. Drink Base
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
              {DRINK_BASES.filter(d => d.category !== 'bakery').map((drink) => {
                const isSelected = selectedBase.id === drink.id;
                return (
                  <button
                    key={drink.id}
                    onClick={() => {
                      setSelectedBase(drink);
                      setMilkRatio(drink.defaultMilkRatio);
                    }}
                    className={`text-left p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border transition-all relative ${
                      isSelected
                        ? 'bg-crema-500/10 border-crema-500/60 shadow-inner'
                        : 'bg-obsidian-850/60 border-obsidian-800 hover:border-obsidian-700 text-parchment-200'
                    }`}
                  >
                    <p className={`text-[11px] sm:text-xs font-semibold leading-tight line-clamp-2 min-h-[1.75rem] sm:min-h-0 ${isSelected ? 'text-crema-400' : 'text-parchment-100'}`}>
                      {drink.name}
                    </p>
                    <p className="text-[10px] sm:text-[11px] font-sans text-parchment-300 mt-0.5 sm:mt-1">
                      ${drink.basePrice.toFixed(2)}
                    </p>
                    {isSelected && (
                      <motion.div
                        layoutId="selectedBaseCheck"
                        className="absolute top-2 right-2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-crema-400"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: Micro-Lot Single-Origin Bean Selection */}
          <div className="bg-obsidian-900 border border-obsidian-800 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5">
            <label className="text-[11px] sm:text-xs font-sans uppercase tracking-wider text-crema-400 block mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
              <Flame className="w-3.5 h-3.5" />
              2. Single-Origin
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {COFFEE_ORIGINS.map((origin) => {
                const isSelected = selectedOrigin.id === origin.id;
                return (
                  <div
                    key={origin.id}
                    onClick={() => setSelectedOrigin(origin)}
                    className={`p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-obsidian-800/90 border-crema-500 shadow-md'
                        : 'bg-obsidian-850/40 border-obsidian-800 hover:border-obsidian-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1.5">
                      <h4 className={`font-serif text-xs sm:text-sm font-semibold leading-snug line-clamp-2 sm:line-clamp-1 ${isSelected ? 'text-parchment-50' : 'text-parchment-200'}`}>
                        {origin.name}
                      </h4>
                      <span className="text-[9px] sm:text-[10px] font-sans px-1.5 sm:px-2 py-0.5 rounded-full bg-obsidian-950 text-crema-400 border border-obsidian-700 shrink-0">
                        {origin.roastLevel}
                      </span>
                    </div>
                    <p className="text-[10px] sm:text-xs text-parchment-300 mt-0.5 sm:mt-1 line-clamp-1">
                      {origin.region}, {origin.country}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1.5 sm:mt-2">
                      {origin.flavorNotes.slice(0, 3).map(n => (
                        <span key={n} className="text-[8px] sm:text-[9px] font-sans px-1.5 py-0.2 rounded bg-obsidian-900 text-parchment-300">
                          {n}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP 3: Milk & Ratio */}
          {selectedBase.supportsMilk && (
            <div className="bg-obsidian-900 border border-obsidian-800 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-[11px] sm:text-xs font-sans uppercase tracking-wider text-crema-400 flex items-center gap-1.5 sm:gap-2">
                  <Droplets className="w-3.5 h-3.5" />
                  3. Milk & Ratio
                </label>
                <span className="font-sans text-[11px] sm:text-xs text-parchment-200">
                  {milkRatio}%
                </span>
              </div>

              {/* Milk Type Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
                {[
                  { value: 'Oat (Oatly Barista)', label: 'Oat' },
                  { value: 'Whole', label: 'Whole' },
                  { value: 'Almond', label: 'Almond' },
                  { value: 'None (Black)', label: 'Black' }
                ].map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => {
                      setMilk(value as MilkOption);
                      if (value === 'None (Black)') setMilkRatio(0);
                      else if (milkRatio === 0) setMilkRatio(60);
                    }}
                    className={`py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-medium border text-center transition-all truncate ${
                      milk === value
                        ? 'bg-crema-500/15 border-crema-500 text-crema-400 font-semibold'
                        : 'bg-obsidian-850 border-obsidian-800 text-parchment-200 hover:border-obsidian-700'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Ratio Slider with Live Physics */}
              {milk !== 'None (Black)' && (
                <div className="pt-1">
                  <div className="flex justify-between text-[10px] sm:text-[11px] text-parchment-300 mb-1 sm:mb-1.5">
                    <span>Less milk</span>
                    <span>More milk</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="85"
                    value={milkRatio}
                    onChange={(e) => setMilkRatio(Number(e.target.value))}
                    className="w-full h-1.5 sm:h-2 bg-obsidian-800 rounded-lg appearance-none cursor-pointer accent-crema-400"
                  />
                </div>
              )}
            </div>
          )}

          {/* STEP 4: Temperature & Size */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
            
            {/* Temperature Style */}
            <div className="bg-obsidian-900 border border-obsidian-800 rounded-2xl sm:rounded-3xl p-3.5 sm:p-4">
              <label className="text-[11px] sm:text-xs font-sans uppercase tracking-wider text-crema-400 block mb-2 flex items-center gap-1.5">
                {isIced ? <Snowflake className="w-3.5 h-3.5" /> : <Flame className="w-3.5 h-3.5" />}
                Temperature
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-1.5">
                {[
                  { value: 'Steaming Hot (65°C)', label: 'Hot (65°C)' },
                  { value: 'Gentle Warm (55°C)', label: 'Warm (55°C)' },
                  { value: 'Over Hand-cut Ice', label: 'Iced' },
                  { value: 'Nitro Draft Chilled', label: 'Cold Draft' },
                ].map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => setTemperature(value as TempOption)}
                    className={`w-full text-left py-1.5 sm:py-2 px-2 sm:px-2.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs leading-tight border transition-all ${
                      temperature === value
                        ? 'bg-crema-500/15 border-crema-500 text-crema-400 font-medium'
                        : 'bg-obsidian-850 border-obsidian-800 text-parchment-200'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Cup Sizing */}
            <div className="bg-obsidian-900 border border-obsidian-800 rounded-2xl sm:rounded-3xl p-3.5 sm:p-4">
              <label className="text-[11px] sm:text-xs font-sans uppercase tracking-wider text-crema-400 block mb-2">
                Cup Size
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-1 gap-1.5">
                {[
                  { value: '8oz Small', label: '8 oz' },
                  { value: '12oz Standard', label: '12 oz' },
                  { value: '16oz Grand', label: '16 oz' },
                ].map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => setSize(value as any)}
                    className={`w-full text-center sm:text-left py-1.5 sm:py-2 px-2.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs border transition-all whitespace-nowrap ${
                      size === value
                        ? 'bg-crema-500/15 border-crema-500 text-crema-400 font-medium'
                        : 'bg-obsidian-850 border-obsidian-800 text-parchment-200'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* STEP 5: Sweetness, Syrups & Foam */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4">
            
            {/* Sweetness */}
            <div className="bg-obsidian-900 border border-obsidian-800 rounded-2xl sm:rounded-3xl p-3.5 sm:p-4">
              <label className="text-[11px] sm:text-xs font-sans uppercase tracking-wider text-crema-400 block mb-2">
                Sweetness
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-1.5">
                {[
                  { value: '0% Unsweetened', label: '0%' },
                  { value: '25% Subtle', label: '25%' },
                  { value: '50% Balanced', label: '50%' },
                  { value: '100% Rich', label: '100%' },
                ].map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => setSweetness(value as any)}
                    className={`w-full text-center sm:text-left py-1.5 sm:py-2 px-2.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs border transition-all whitespace-nowrap ${
                      sweetness === value
                        ? 'bg-crema-500/15 border-crema-500 text-crema-400 font-medium'
                        : 'bg-obsidian-850 border-obsidian-800 text-parchment-200'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Syrups */}
            <div className="bg-obsidian-900 border border-obsidian-800 rounded-2xl sm:rounded-3xl p-3.5 sm:p-4">
              <label className="text-[11px] sm:text-xs font-sans uppercase tracking-wider text-crema-400 block mb-2">
                Syrup
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-1.5">
                {[
                  { value: 'None', label: 'None' },
                  { value: 'Bourbon Vanilla', label: 'Vanilla' },
                  { value: 'Salted Brown Demerara', label: 'Brown Sugar' },
                  { value: 'Cardamom Honey', label: 'Honey' },
                ].map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => setSyrup(value as SyrupOption)}
                    className={`w-full py-1.5 sm:py-2 px-2 sm:px-2.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs border transition-all flex items-center justify-between gap-1 ${
                      syrup === value
                        ? 'bg-crema-500/15 border-crema-500 text-crema-400 font-medium'
                        : 'bg-obsidian-850 border-obsidian-800 text-parchment-200'
                    }`}
                  >
                    <span className="truncate">{label}</span>
                    {value !== 'None' && <span className="text-[9px] text-crema-400 font-sans shrink-0">+0.75</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Foam Texture */}
            <div className="bg-obsidian-900 border border-obsidian-800 rounded-2xl sm:rounded-3xl p-3.5 sm:p-4">
              <label className="text-[11px] sm:text-xs font-sans uppercase tracking-wider text-crema-400 block mb-2">
                Foam
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-1 gap-1.5">
                {[
                  { value: 'None', label: 'None' },
                  { value: 'Velvet Microfoam', label: 'Microfoam' },
                  { value: 'Extra Cloud Foam', label: 'Cloud' },
                ].map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => setFoamLevel(value as any)}
                    className={`w-full text-center sm:text-left py-1.5 sm:py-2 px-1.5 sm:px-2.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs border transition-all whitespace-nowrap ${
                      foamLevel === value
                        ? 'bg-crema-500/15 border-crema-500 text-crema-400 font-medium'
                        : 'bg-obsidian-850 border-obsidian-800 text-parchment-200'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* STEP 6: Extra Shot */}
          <div className="bg-obsidian-900 border border-obsidian-800 rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div>
              <span className="text-[11px] sm:text-xs font-sans uppercase tracking-wider text-crema-400 block mb-0.5">
                Extra Shot
              </span>
              <p className="text-[10px] sm:text-xs text-parchment-300">
                Double ristretto pull (+75mg caffeine)
              </p>
            </div>
            <button
              onClick={() => setExtraShot(!extraShot)}
              className={`w-full sm:w-auto px-3.5 py-2 rounded-lg sm:rounded-xl text-xs font-sans font-medium border transition-all text-center ${
                extraShot
                  ? 'bg-crema-500 text-obsidian-950 border-crema-400 font-semibold shadow-sm'
                  : 'bg-obsidian-850 border-obsidian-700 text-parchment-200 hover:border-obsidian-600'
              }`}
            >
              {extraShot ? '✓ Added (+$1.25)' : '+ Add Shot (+$1.25)'}
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
