import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Clock, Droplet, Scale, Thermometer, CheckCircle2, Sparkles, Beaker, HelpCircle, AlertTriangle } from 'lucide-react';
import { BrewMethod } from '../types';
import { BREW_METHODS } from '../data/coffeeData';

export const BrewGuideTab: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<BrewMethod>(BREW_METHODS[0]);
  const [coffeeGrams, setCoffeeGrams] = useState<number>(selectedMethod.defaultCoffeeGrams);
  const [ratioMultiplier, setRatioMultiplier] = useState<number>(16.6); // 1:16.6
  const [troubleshootTaste, setTroubleshootTaste] = useState<'sour' | 'bitter' | 'channel' | 'sweet'>('sour');
  
  // Timer State
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync grams when switching methods
  useEffect(() => {
    setCoffeeGrams(selectedMethod.defaultCoffeeGrams);
    setIsRunning(false);
    setElapsedSeconds(0);
  }, [selectedMethod]);

  // Timer loop
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds((prev) => {
          if (prev >= selectedMethod.totalTimeSeconds) {
            setIsRunning(false);
            return selectedMethod.totalTimeSeconds;
          }
          return prev + 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, selectedMethod.totalTimeSeconds]);

  const waterGrams = Math.round(coffeeGrams * ratioMultiplier);

  // Determine current active step
  let accumulatedTime = 0;
  let activeStepIndex = 0;
  for (let i = 0; i < selectedMethod.steps.length; i++) {
    accumulatedTime += selectedMethod.steps[i].durationSeconds;
    if (elapsedSeconds < accumulatedTime) {
      activeStepIndex = i;
      break;
    }
    if (i === selectedMethod.steps.length - 1) {
      activeStepIndex = i;
    }
  }

  const progressPercent = Math.min(100, (elapsedSeconds / selectedMethod.totalTimeSeconds) * 100);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <section className="py-4 sm:py-6 lg:py-12 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
      
      {/* Editorial Header */}
      <div className="text-center max-w-xl mx-auto mb-4 sm:mb-6">
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-parchment-50">
          Brew Guide & Timer
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-parchment-300">
          Ratios and pulse-pour timers for manual brewing.
        </p>
      </div>

      {/* Method Selector Tabs with Smooth Spring Pill */}
      <div className="flex justify-center mb-4 sm:mb-8 max-w-full overflow-x-auto px-1 no-scrollbar">
        <div className="inline-flex p-1 sm:p-1.5 rounded-full bg-obsidian-900 border border-obsidian-800 shrink-0">
          {BREW_METHODS.map((method) => {
            const isSelected = selectedMethod.id === method.id;
            return (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method)}
                className={`relative px-3 sm:px-6 py-1.5 sm:py-2.5 rounded-full text-[11px] sm:text-sm font-medium transition-colors shrink-0 whitespace-nowrap ${
                  isSelected ? 'text-obsidian-950 font-semibold' : 'text-parchment-200 hover:text-white'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="brewMethodPill"
                    className="absolute inset-0 bg-crema-400 rounded-full"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{method.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-start">
        
        {/* LEFT COLUMN: Interactive Ratio Calculator (5 Cols) */}
        <div className="lg:col-span-5 space-y-4 sm:space-y-6">
          <div className="bg-obsidian-900 border border-obsidian-800 rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 shadow-soft-float">
            <h3 className="font-serif text-base sm:text-lg font-bold text-parchment-50 mb-0.5 sm:mb-1">
              {selectedMethod.name}
            </h3>
            <p className="text-[11px] sm:text-xs text-parchment-300 mb-4 sm:mb-6 leading-relaxed">
              {selectedMethod.tagline}
            </p>

            {/* Quick Parameters Specs */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2 py-2 sm:py-3 px-2 sm:px-4 rounded-xl sm:rounded-2xl bg-obsidian-950/80 border border-obsidian-800/80 text-center mb-4 sm:mb-6">
              <div>
                <span className="text-[9px] sm:text-[10px] font-sans text-parchment-300 block flex items-center justify-center gap-1">
                  <Scale className="w-3 h-3 text-crema-400" /> Grind
                </span>
                <span className="text-[11px] sm:text-xs font-semibold text-parchment-100 mt-0.5 block truncate">
                  {selectedMethod.grindSize.split(' ')[0]}
                </span>
              </div>
              <div className="border-x border-obsidian-800">
                <span className="text-[9px] sm:text-[10px] font-sans text-parchment-300 block flex items-center justify-center gap-1">
                  <Thermometer className="w-3 h-3 text-rose-400" /> Temp
                </span>
                <span className="text-[11px] sm:text-xs font-semibold text-parchment-100 mt-0.5 block">
                  {selectedMethod.waterTemp.split(' ')[0]}
                </span>
              </div>
              <div>
                <span className="text-[9px] sm:text-[10px] font-sans text-parchment-300 block flex items-center justify-center gap-1">
                  <Clock className="w-3 h-3 text-emerald-400" /> Time
                </span>
                <span className="text-[11px] sm:text-xs font-semibold text-parchment-100 mt-0.5 block">
                  {Math.floor(selectedMethod.totalTimeSeconds / 60)}m {selectedMethod.totalTimeSeconds % 60}s
                </span>
              </div>
            </div>

            {/* Coffee Dose Slider */}
            <div className="space-y-2.5 sm:space-y-4 mb-4 sm:mb-6">
              <div className="flex justify-between items-center text-xs">
                <span className="text-parchment-300 font-sans text-[10px] sm:text-xs uppercase tracking-wider">
                  Coffee Dose (Dry Grounds)
                </span>
                <span className="text-sm sm:text-base font-bold font-sans text-crema-400">
                  {coffeeGrams} grams
                </span>
              </div>
              <input
                type="range"
                min="12"
                max="40"
                step="1"
                value={coffeeGrams}
                onChange={(e) => setCoffeeGrams(Number(e.target.value))}
                className="w-full h-1.5 sm:h-2 bg-obsidian-800 rounded-lg appearance-none cursor-pointer accent-crema-400"
              />
            </div>

            {/* Brew Ratio Presets */}
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              <span className="text-[10px] sm:text-xs text-parchment-300 font-sans uppercase tracking-wider block">
                Extraction Strength Ratio
              </span>
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                {[
                  { ratio: 15, ratioStr: '1:15', label: 'Bold' },
                  { ratio: 16.6, ratioStr: '1:16.6', label: 'Balanced' },
                  { ratio: 17, ratioStr: '1:17', label: 'Delicate' },
                ].map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => setRatioMultiplier(preset.ratio)}
                    className={`py-1.5 sm:py-2 px-1 sm:px-2 rounded-lg sm:rounded-xl border transition-all text-center flex flex-col items-center justify-center ${
                      ratioMultiplier === preset.ratio
                        ? 'bg-crema-500/20 border-crema-500 text-crema-400 font-semibold'
                        : 'bg-obsidian-850 border-obsidian-800 text-parchment-300 hover:border-obsidian-700'
                    }`}
                  >
                    <span className="text-[11px] sm:text-xs font-sans font-semibold">{preset.ratioStr}</span>
                    <span className="text-[9px] sm:text-[10px] text-parchment-400 font-sans">{preset.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Live Calculated Yield Result */}
            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-obsidian-850 to-obsidian-800 border border-obsidian-700 flex items-center justify-between">
              <div>
                <span className="text-[10px] sm:text-[11px] font-sans text-parchment-300 block">
                  Required Water Volume
                </span>
                <span className="text-lg sm:text-xl font-bold font-sans text-parchment-50">
                  {waterGrams} ml (g)
                </span>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-crema-500/15 border border-crema-500/30 flex items-center justify-center">
                <Droplet className="w-4 h-4 sm:w-5 sm:h-5 text-crema-400" />
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: Live Interactive Brew Stopwatch & Steps (7 Cols) */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-6">
          <div className="bg-obsidian-900 border border-obsidian-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-soft-float">
            
            {/* Stopwatch Hero Ring */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 pb-4 sm:pb-6 border-b border-obsidian-800">
              
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 flex items-center justify-center shrink-0">
                {/* SVG Progress Ring */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="44"
                    className="stroke-obsidian-800"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="44"
                    className="stroke-crema-400"
                    strokeWidth="8"
                    strokeDasharray={276.46}
                    initial={{ strokeDashoffset: 276.46 }}
                    style={{ strokeDashoffset: 276.46 }}
                    animate={{
                      strokeDashoffset: 276.46 - (276.46 * progressPercent) / 100,
                    }}
                    transition={{ ease: 'linear', duration: 0.3 }}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>

                <div className="absolute text-center">
                  <span className="font-sans text-xl sm:text-2xl lg:text-3xl font-bold text-parchment-50 tracking-wider">
                    {formatTime(elapsedSeconds)}
                  </span>
                  <span className="block text-[9px] sm:text-[10px] font-sans text-parchment-300">
                    / {formatTime(selectedMethod.totalTimeSeconds)}
                  </span>
                </div>
              </div>

              {/* Stopwatch Controls */}
              <div className="flex flex-col gap-2.5 sm:gap-3 w-full sm:w-auto">
                <div className="flex items-center gap-2 sm:gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsRunning(!isRunning)}
                    className={`flex-1 sm:flex-initial py-2 sm:py-3 px-4 sm:px-6 rounded-xl sm:rounded-2xl font-semibold text-xs flex items-center justify-center gap-1.5 sm:gap-2 shadow-lg transition-colors ${
                      isRunning
                        ? 'bg-amber-500 text-obsidian-950 hover:bg-amber-400'
                        : 'bg-crema-400 text-obsidian-950 hover:bg-crema-500'
                    }`}
                  >
                    {isRunning ? (
                      <>
                        <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                        <span>{elapsedSeconds > 0 ? 'Resume' : 'Start Timer'}</span>
                      </>
                    )}
                  </motion.button>

                  <button
                    onClick={() => {
                      setIsRunning(false);
                      setElapsedSeconds(0);
                    }}
                    className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-obsidian-850 hover:bg-obsidian-800 text-parchment-300 hover:text-white border border-obsidian-700 transition-colors"
                    title="Reset Timer"
                  >
                    <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </div>

                <div className="text-[10px] sm:text-[11px] font-sans text-parchment-300 text-center sm:text-left">
                  {elapsedSeconds >= selectedMethod.totalTimeSeconds ? (
                    <span className="text-emerald-400 font-semibold flex items-center justify-center sm:justify-start gap-1">
                      <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Complete! Enjoy.
                    </span>
                  ) : (
                    <span>Phase: Step {activeStepIndex + 1} of {selectedMethod.steps.length}</span>
                  )}
                </div>
              </div>

            </div>

            {/* Step-by-Step Pulse Pour Timeline */}
            <div className="mt-6 space-y-4">
              <h4 className="font-serif text-sm font-semibold tracking-wider text-crema-400">
                Calibrated Pour Steps & Target Water Weight
              </h4>
              
              <div className="space-y-3">
                {selectedMethod.steps.map((step, idx) => {
                  const isActive = idx === activeStepIndex && isRunning;
                  const isDone = elapsedSeconds >= selectedMethod.steps.slice(0, idx + 1).reduce((s, st) => s + st.durationSeconds, 0);
                  const scaledTargetWater = Math.round((step.targetWaterGrams / selectedMethod.defaultWaterGrams) * waterGrams);

                  return (
                    <div
                      key={step.title}
                      className={`p-4 rounded-2xl border transition-all ${
                        isActive
                          ? 'bg-crema-500/10 border-crema-500/70 shadow-sm'
                          : isDone
                          ? 'bg-obsidian-850/40 border-emerald-500/30 opacity-75'
                          : 'bg-obsidian-850/60 border-obsidian-800/80'
                      }`}
                    >
                      <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-1.5 sm:gap-2 mb-1.5">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-sans font-bold shrink-0 ${
                            isDone 
                              ? 'bg-emerald-500/20 text-emerald-400' 
                              : isActive 
                              ? 'bg-crema-400 text-obsidian-950' 
                              : 'bg-obsidian-800 text-parchment-300'
                          }`}>
                            {idx + 1}
                          </span>
                          <h5 className={`font-serif text-xs font-semibold leading-tight ${isActive ? 'text-crema-300' : 'text-parchment-100'}`}>
                            {step.title}
                          </h5>
                        </div>

                        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                          <span className="text-[10px] sm:text-[11px] font-sans text-parchment-300 whitespace-nowrap">
                            {step.durationSeconds}s
                          </span>
                          {scaledTargetWater > 0 && (
                            <span className="text-[10px] sm:text-[11px] font-sans px-1.5 sm:px-2 py-0.5 rounded bg-obsidian-950 text-crema-400 border border-obsidian-700 whitespace-nowrap">
                              <span className="hidden xs:inline">Scale: </span>{scaledTargetWater}g
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-xs text-parchment-300 pl-7 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* SECTION: Interactive Extraction Troubleshooting Matrix */}
      <div className="mt-8 sm:mt-12 bg-obsidian-900 border border-obsidian-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 shadow-soft-float">
        <div className="max-w-xl mb-6">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1 rounded-md bg-crema-500/10 text-crema-400">
              <Sparkles className="w-3.5 h-3.5 text-crema-400" />
            </span>
            <span className="text-[10px] sm:text-xs font-sans uppercase tracking-wider text-crema-400">
              Sensory Calibration Lab
            </span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-parchment-50">
            Extraction Troubleshooting Matrix
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-parchment-300">
            How does your finished cup taste on your palate? Select your sensory diagnosis below to dial in your grind and water parameters.
          </p>
        </div>

        {/* Diagnostic Taste Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-6">
          {[
            { id: 'sour', label: 'Sour / Thin / Sharp', badge: 'Under-Extracted', color: 'border-amber-500/40' },
            { id: 'bitter', label: 'Bitter / Dry / Astringent', badge: 'Over-Extracted', color: 'border-rose-500/40' },
            { id: 'channel', label: 'Hollow / Muddy / Weak', badge: 'Water Channeling', color: 'border-sky-500/40' },
            { id: 'sweet', label: 'Sweet / Floral / Vibrant', badge: 'Golden Cup (19–21%)', color: 'border-emerald-500/40' },
          ].map((diag) => {
            const isSelected = troubleshootTaste === diag.id;
            return (
              <button
                key={diag.id}
                onClick={() => setTroubleshootTaste(diag.id as any)}
                className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border text-left transition-all relative ${
                  isSelected
                    ? 'bg-crema-500/15 border-crema-500 shadow-sm'
                    : 'bg-obsidian-950/60 border-obsidian-800 hover:border-obsidian-700'
                }`}
              >
                <span className={`text-[9px] sm:text-[10px] font-sans px-1.5 py-0.5 rounded block w-fit mb-1.5 ${
                  isSelected ? 'bg-crema-500/20 text-crema-300' : 'bg-obsidian-850 text-parchment-400'
                }`}>
                  {diag.badge}
                </span>
                <span className={`text-xs sm:text-sm font-semibold block ${isSelected ? 'text-parchment-50' : 'text-parchment-200'}`}>
                  {diag.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Diagnostic Results Card */}
        <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-obsidian-950/80 border border-obsidian-800/80">
          {troubleshootTaste === 'sour' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-amber-400">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <h4 className="font-serif text-sm sm:text-base font-bold text-parchment-50">
                  Diagnosis: Under-Extraction (Low Dissolved Solids)
                </h4>
              </div>
              <p className="text-xs text-parchment-300 leading-relaxed">
                Organic acids extract first, while sweet sugars and complex lipids require more contact time and heat. Your coffee tastes sour, sharp, or lemon-juice like because water passed through too fast or wasn't hot enough.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-obsidian-800 text-xs">
                <div className="p-2.5 rounded-lg bg-obsidian-900 border border-obsidian-800">
                  <span className="font-sans text-[10px] text-crema-400 block uppercase">1. Adjust Grind Size</span>
                  <span className="text-parchment-100 font-semibold mt-0.5 block">Grind 1–2 clicks finer</span>
                  <span className="text-[10px] text-parchment-400">Increases surface area & contact resistance.</span>
                </div>
                <div className="p-2.5 rounded-lg bg-obsidian-900 border border-obsidian-800">
                  <span className="font-sans text-[10px] text-rose-400 block uppercase">2. Water Temperature</span>
                  <span className="text-parchment-100 font-semibold mt-0.5 block">Raise temp to 94°C – 96°C</span>
                  <span className="text-[10px] text-parchment-400">Higher thermal energy dissolves deep sucrose.</span>
                </div>
                <div className="p-2.5 rounded-lg bg-obsidian-900 border border-obsidian-800">
                  <span className="font-sans text-[10px] text-emerald-400 block uppercase">3. Pour Technique</span>
                  <span className="text-parchment-100 font-semibold mt-0.5 block">Extend bloom to 45 seconds</span>
                  <span className="text-[10px] text-parchment-400">Ensures 100% saturation of dry core particles.</span>
                </div>
              </div>
            </div>
          )}

          {troubleshootTaste === 'bitter' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-rose-400">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <h4 className="font-serif text-sm sm:text-base font-bold text-parchment-50">
                  Diagnosis: Over-Extraction (Astringent Tannin Liberation)
                </h4>
              </div>
              <p className="text-xs text-parchment-300 leading-relaxed">
                Water has washed past the sweet middle compounds and begun dissolving heavy polyphenols, chlorogenic lactones, and bitter cellulose. It leaves a drying, sandpaper-like sensation on the back of your tongue.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-obsidian-800 text-xs">
                <div className="p-2.5 rounded-lg bg-obsidian-900 border border-obsidian-800">
                  <span className="font-sans text-[10px] text-crema-400 block uppercase">1. Adjust Grind Size</span>
                  <span className="text-parchment-100 font-semibold mt-0.5 block">Grind 1–2 clicks coarser</span>
                  <span className="text-[10px] text-parchment-400">Reduces micro-fine migration and extraction rate.</span>
                </div>
                <div className="p-2.5 rounded-lg bg-obsidian-900 border border-obsidian-800">
                  <span className="font-sans text-[10px] text-rose-400 block uppercase">2. Water Temperature</span>
                  <span className="text-parchment-100 font-semibold mt-0.5 block">Lower temp to 90°C – 92°C</span>
                  <span className="text-[10px] text-parchment-400">Less aggressive extraction of heavy bitter tannins.</span>
                </div>
                <div className="p-2.5 rounded-lg bg-obsidian-900 border border-obsidian-800">
                  <span className="font-sans text-[10px] text-emerald-400 block uppercase">3. Pour Technique</span>
                  <span className="text-parchment-100 font-semibold mt-0.5 block">Pour faster with fewer pulses</span>
                  <span className="text-[10px] text-parchment-400">Shortens total brew time by 20–30 seconds.</span>
                </div>
              </div>
            </div>
          )}

          {troubleshootTaste === 'channel' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sky-400">
                <HelpCircle className="w-4 h-4 shrink-0" />
                <h4 className="font-serif text-sm sm:text-base font-bold text-parchment-50">
                  Diagnosis: Micro-Channeling (Uneven Water Flow)
                </h4>
              </div>
              <p className="text-xs text-parchment-300 leading-relaxed">
                Water found paths of least resistance through cracks in the coffee bed. Some grounds were over-extracted while dry pockets remained untouched, creating an erratic cup that tastes both sour and bitter simultaneously.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-obsidian-800 text-xs">
                <div className="p-2.5 rounded-lg bg-obsidian-900 border border-obsidian-800">
                  <span className="font-sans text-[10px] text-crema-400 block uppercase">1. Coffee Bed Leveling</span>
                  <span className="text-parchment-100 font-semibold mt-0.5 block">Tap dripper flat before pour</span>
                  <span className="text-[10px] text-parchment-400">Eliminates air pockets and uneven mounds.</span>
                </div>
                <div className="p-2.5 rounded-lg bg-obsidian-900 border border-obsidian-800">
                  <span className="font-sans text-[10px] text-sky-400 block uppercase">2. Bloom Agitation</span>
                  <span className="text-parchment-100 font-semibold mt-0.5 block">Gentle swirl during bloom</span>
                  <span className="text-[10px] text-parchment-400">Ensures 100% water dispersion through bed depth.</span>
                </div>
                <div className="p-2.5 rounded-lg bg-obsidian-900 border border-obsidian-800">
                  <span className="font-sans text-[10px] text-emerald-400 block uppercase">3. Pouring Stream</span>
                  <span className="text-parchment-100 font-semibold mt-0.5 block">Keep kettle stream vertical</span>
                  <span className="text-[10px] text-parchment-400">Never pour directly onto the outer paper edges.</span>
                </div>
              </div>
            </div>
          )}

          {troubleshootTaste === 'sweet' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <h4 className="font-serif text-sm sm:text-base font-bold text-parchment-50">
                  Diagnosis: The Golden Cup Sweet Spot (19%–21% Extraction Yield)
                </h4>
              </div>
              <p className="text-xs text-parchment-300 leading-relaxed">
                Perfection! Your brew parameters have achieved full harmonic balance. The juicy malic fruit acidity is balanced by cane sugar sweetness, finishing with a lingering jasmine or cocoa aftertaste.
              </p>
              <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300 font-sans flex items-center justify-between">
                <span>✓ TDS Target Met: 1.35% – 1.45%</span>
                <span>Lock this recipe for this origin!</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SECTION: Water Chemistry & Extraction Science */}
      <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6">
        <div className="p-4 sm:p-6 rounded-2xl bg-obsidian-900 border border-obsidian-800 space-y-2 shadow-soft-float">
          <div className="w-8 h-8 rounded-xl bg-crema-500/10 border border-crema-500/30 flex items-center justify-center text-crema-400">
            <Droplet className="w-4 h-4" />
          </div>
          <h4 className="font-serif text-sm sm:text-base font-bold text-parchment-50">
            Magnesium (Mg²⁺) Ions
          </h4>
          <p className="text-[11px] sm:text-xs text-parchment-300 leading-relaxed">
            Magnesium binds strongly to oxygen compounds in floral terpenes and fruit acids, pulling crisp bergamot and peach notes into the cup without adding harsh bitterness.
          </p>
        </div>

        <div className="p-4 sm:p-6 rounded-2xl bg-obsidian-900 border border-obsidian-800 space-y-2 shadow-soft-float">
          <div className="w-8 h-8 rounded-xl bg-crema-500/10 border border-crema-500/30 flex items-center justify-center text-crema-400">
            <Scale className="w-4 h-4" />
          </div>
          <h4 className="font-serif text-sm sm:text-base font-bold text-parchment-50">
            Calcium (Ca²⁺) Balance
          </h4>
          <p className="text-[11px] sm:text-xs text-parchment-300 leading-relaxed">
            Calcium emphasizes tactile mouthfeel, body, and heavy chocolate creaminess. We balance calcium at a 1:2 ratio to magnesium for maximum sensory clarity.
          </p>
        </div>

        <div className="p-4 sm:p-6 rounded-2xl bg-obsidian-900 border border-obsidian-800 space-y-2 shadow-soft-float">
          <div className="w-8 h-8 rounded-xl bg-crema-500/10 border border-crema-500/30 flex items-center justify-center text-crema-400">
            <Beaker className="w-4 h-4" />
          </div>
          <h4 className="font-serif text-sm sm:text-base font-bold text-parchment-50">
            Bicarbonate Buffer (pH 7.0)
          </h4>
          <p className="text-[11px] sm:text-xs text-parchment-300 leading-relaxed">
            A small buffer (40 ppm) prevents acidic sourness while preventing excess alkaline neutralizers from flattening delicate Geisha florality.
          </p>
        </div>
      </div>

    </section>
  );
};
