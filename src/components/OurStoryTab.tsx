import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Flame, 
  Thermometer, 
  ChevronDown, 
  Clock, 
  Sparkles,
  Compass
} from 'lucide-react';
import { COFFEE_ORIGINS } from '../data/coffeeData';

export const OurStoryTab: React.FC = () => {
  const [activeRoastPhase, setActiveRoastPhase] = useState<number>(1);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const roastPhases = [
    {
      step: 1,
      title: 'Drying & Equilibrium',
      tempRange: '100°C – 155°C',
      timeRange: '0:00 – 4:00 min',
      color: 'from-amber-200/20 to-amber-400/10',
      badge: 'Moisture Evaporation',
      description: 'Raw green coffee beans contain 10–12% internal moisture. Gentle recirculating convection airflow slowly heats the core without scorching the delicate outer silver-skin, shifting the bean color from jade green to golden straw.',
      chemicalNotes: 'Chlorophyll degradation, cellular moisture equilibrium, initial pressure buildup.'
    },
    {
      step: 2,
      title: 'The Maillard Reaction',
      tempRange: '155°C – 195°C',
      timeRange: '4:00 – 8:30 min',
      color: 'from-crema-500/25 to-amber-600/15',
      badge: 'Aroma Synthesis',
      description: 'As temperature passes 160°C, amino acids fuse with reducing sugars in a cascade of hundreds of complex aromatic reactions. This creates furans, pyrazines, and ketones that produce deep caramel, toasted macadamia, and red fruit aromatics.',
      chemicalNotes: 'Melanoidin synthesis, sugar caramelization, complex aromatic lipid liberation.'
    },
    {
      step: 3,
      title: 'First Crack & Development',
      tempRange: '196°C – 208°C',
      timeRange: '8:30 – 10:15 min',
      color: 'from-rose-500/20 to-crema-500/20',
      badge: 'Terroir Unlocking',
      description: 'Internal steam and CO2 pressure reach critical mass, producing an audible acoustic snap as cell walls expand. We terminate heat within 75–90 seconds of first crack (14–16% development ratio) to lock in vibrant citric & malic fruit acids without bitter roast carbon.',
      chemicalNotes: 'Cell wall structural expansion, organic acid crystallization, zero roast defect.'
    }
  ];

  const timelineMilestones = [
    {
      year: '2019',
      title: 'The Guji Highland Expedition',
      location: 'Oromia, Ethiopia',
      description: 'Founded after a 6-week cupping journey across smallholder estates in the Guji highlands. We pledged a direct-trade charter guaranteeing 2.8× Fair Trade prices straight to independent washing station millers.'
    },
    {
      year: '2021',
      title: 'Clean-Air Convection Roasting',
      location: 'Precision Atelier Lab',
      description: 'Decommissioned traditional open-flame drum roasters in favor of a custom single-burner Loring S35. The recirculating hot-air closed loop eliminated 80% of greenhouse emissions while completely removing charred bean defects.'
    },
    {
      year: '2023',
      title: 'The Kyoto 16-Hour Drip Wall',
      location: 'Flagship Tasting Bar',
      description: 'Engineered an architectural 6-tower borosilicate cold-drip system. Drops of remineralized mountain water extract slow single-origin lots at 4°C, unlocking wine-like sweetness with zero bitterness.'
    },
    {
      year: '2025',
      title: '100% Closed-Loop Circularity',
      location: 'Global Supply Chain',
      description: 'Eliminated single-use packaging with deposit borosilicate glass bottles and tins. 100% of our spent coffee grounds are converted into nutrient-dense organic compost for community botanical gardens.'
    }
  ];

  const storyFaqs = [
    {
      q: 'Why does Aura roast lighter than traditional commercial roasteries?',
      a: 'Dark commercial roasting burns away terroir so that inferior green coffees taste uniformly charred and bitter. By roasting single-origin micro-lots light-to-medium in recirculating convection air, we preserve the unique organic acids, floral terpenes, and delicate terroir of each micro-lot.'
    },
    {
      q: 'What is the ideal "rest window" for freshly roasted beans?',
      a: 'Freshly roasted coffee needs time to degas trapped carbon dioxide. For filter and pour-over, the peak flavor window begins at day 5–7 post-roast and extends through day 28. For espresso extraction at 9 bars, we recommend resting beans 10–14 days for optimal crema density without harsh carbonation.'
    },
    {
      q: 'How does water remineralization affect the taste in your cup?',
      a: 'Coffee is 98.6% water. If water has high bicarbonate, it destroys fruit acidity; if water is stripped distilled, it tastes sour and hollow. We pass all brew water through reverse osmosis, then re-introduce exact balances of magnesium (which binds to floral aromatics) and calcium (which enhances creamy mouthfeel) at 120–140 ppm TDS.'
    },
    {
      q: 'How does Direct Trade differ from standard Fair Trade certification?',
      a: 'Fair Trade sets a baseline floor price that often covers little more than production costs. Aura Direct Trade pays smallholder farmers directly at 2.8× to 4× the C-market price, conducts transparent harvest visits, and pays quality bonuses for lots cupping above 88+ points.'
    }
  ];

  return (
    <section className="py-4 sm:py-6 lg:py-12 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-8 sm:space-y-12 lg:space-y-16">
      
      {/* Hero Section */}
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-obsidian-900 border border-obsidian-800 p-5 sm:p-10 lg:p-12 shadow-soft-float">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-crema-500/15 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-2xl relative z-10">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <span className="p-1 sm:p-1.5 rounded-lg bg-crema-500/10 border border-crema-500/30 text-crema-400">
              <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </span>
            <span className="text-[10px] sm:text-xs font-sans uppercase tracking-widest text-crema-400">
              Terroir, Science & Extraction
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-parchment-50 leading-tight">
            Rooted in Soil. Calibrated by Science.
          </h1>
          <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-parchment-200 leading-relaxed font-sans">
            Exceptional coffee is an agricultural craft before it is a beverage. We source high-altitude micro-lots directly from single-estate cultivators, roasting each batch with convection airflow to celebrate origin, elevation, and terroir.
          </p>
        </div>
      </div>

      {/* Sourcing Transparency Index: Our Micro-Lot Partners */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
          <span className="text-[10px] sm:text-xs font-sans uppercase tracking-widest text-crema-400 block mb-1 sm:mb-2">
            Direct Trade Transparency
          </span>
          <h2 className="font-serif text-xl sm:text-3xl font-bold text-parchment-50">
            Our Micro-Lot Partners
          </h2>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-parchment-300">
            We purchase 100% of our green coffee directly from smallholder cooperatives and single-estate producers at a minimum of 2.8× Fair Trade prices.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {COFFEE_ORIGINS.map((origin) => (
            <div
              key={origin.id}
              className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-obsidian-900 border border-obsidian-800 flex flex-col justify-between hover:border-obsidian-700 transition-all shadow-soft-float group"
            >
              <div>
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="text-[10px] sm:text-xs font-sans px-2 py-0.5 rounded bg-obsidian-800 text-crema-400 border border-crema-500/20">
                    {origin.elevation}
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-sans text-parchment-300">
                    {origin.country}
                  </span>
                </div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-parchment-50 group-hover:text-crema-400 transition-colors">
                  {origin.name}
                </h3>
                <p className="text-[11px] sm:text-xs text-parchment-300 mt-0.5 sm:mt-1">
                  {origin.region}
                </p>
                
                <div className="mt-3 pt-3 sm:mt-4 sm:pt-4 border-t border-obsidian-800 space-y-2">
                  <div className="text-[10px] sm:text-[11px] text-parchment-300">
                    <span className="block text-parchment-400 font-sans">Process</span>
                    <span className="text-parchment-100 font-medium">{origin.process}</span>
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-parchment-300">
                    <span className="block text-parchment-400 font-sans">Primary Aromatics</span>
                    <span className="text-crema-300 font-medium">{origin.flavorNotes.join(' • ')}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 sm:mt-6 sm:pt-4 border-t border-obsidian-800 flex items-center justify-between text-[10px] sm:text-[11px] font-sans text-emerald-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> 100% Direct Trade
                </span>
                <span className="text-parchment-400">SCA 89+</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Roasting Science: The 3 Roasting Phases */}
      <div className="bg-obsidian-900 border border-obsidian-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 shadow-soft-float">
        <div className="max-w-2xl mb-6 sm:mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1 rounded-md bg-crema-500/10 text-crema-400">
              <Flame className="w-3.5 h-3.5 text-crema-400" />
            </span>
            <span className="text-[10px] sm:text-xs font-sans uppercase tracking-wider text-crema-400">
              Thermal Curve Calibration
            </span>
          </div>
          <h2 className="font-serif text-xl sm:text-3xl font-bold text-parchment-50">
            The Convection Roasting Process
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-parchment-300">
            Unlike conductive iron drums that scorch bean surfaces with direct flame contact, our single-pass convection roaster uses superheated air to penetrate the dense bean core uniformly.
          </p>
        </div>

        {/* Phase Selectors */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6">
          {roastPhases.map((phase) => {
            const isSelected = activeRoastPhase === phase.step;
            return (
              <button
                key={phase.step}
                onClick={() => setActiveRoastPhase(phase.step)}
                className={`p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border text-left transition-all relative overflow-hidden ${
                  isSelected
                    ? 'bg-crema-500/15 border-crema-500/60 shadow-inner'
                    : 'bg-obsidian-950/60 border-obsidian-800 hover:border-obsidian-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] sm:text-xs font-sans font-bold ${isSelected ? 'text-crema-400' : 'text-parchment-400'}`}>
                    Phase 0{phase.step}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-sans text-parchment-400 hidden sm:inline">
                    {phase.timeRange}
                  </span>
                </div>
                <h4 className={`font-serif text-xs sm:text-base font-semibold truncate ${isSelected ? 'text-parchment-50' : 'text-parchment-300'}`}>
                  {phase.title}
                </h4>
              </button>
            );
          })}
        </div>

        {/* Active Phase Deep Dive */}
        {(() => {
          const currentPhase = roastPhases.find((p) => p.step === activeRoastPhase) || roastPhases[0];
          return (
            <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-obsidian-950/80 border border-obsidian-800/80 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-8 space-y-2.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-sans bg-crema-500/20 text-crema-300 border border-crema-500/40">
                    {currentPhase.badge}
                  </span>
                  <span className="text-[11px] font-sans text-parchment-300 flex items-center gap-1">
                    <Thermometer className="w-3 h-3 text-rose-400" /> {currentPhase.tempRange}
                  </span>
                  <span className="text-[11px] font-sans text-parchment-300 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-400" /> {currentPhase.timeRange}
                  </span>
                </div>
                <h3 className="font-serif text-base sm:text-xl font-bold text-parchment-50">
                  Phase {currentPhase.step}: {currentPhase.title}
                </h3>
                <p className="text-xs text-parchment-300 leading-relaxed font-sans">
                  {currentPhase.description}
                </p>
                <div className="pt-2 border-t border-obsidian-800 text-[10px] sm:text-[11px] font-sans text-crema-400 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  <span>Chemistry: {currentPhase.chemicalNotes}</span>
                </div>
              </div>

              <div className="md:col-span-4 p-4 rounded-xl bg-obsidian-900 border border-obsidian-800 text-center space-y-2">
                <span className="text-[10px] font-sans uppercase text-parchment-400 block">Convection Metric</span>
                <span className="text-xl sm:text-2xl font-sans font-bold text-crema-400 block">
                  {currentPhase.step === 1 ? '100% Recirculated' : currentPhase.step === 2 ? '320+ Aromatics' : '0% Char Defects'}
                </span>
                <span className="text-[10px] text-parchment-300 block">
                  {currentPhase.step === 1 ? 'Closed-loop thermal airflow' : currentPhase.step === 2 ? 'Synthesized organic compounds' : 'Gentle acoustic development'}
                </span>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Sourcing Transparency & Impact Numbers */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
        <div className="p-4 sm:p-6 rounded-2xl bg-obsidian-900 border border-obsidian-800 text-center">
          <span className="font-sans text-2xl sm:text-3xl font-bold text-crema-400 block">2.8×</span>
          <span className="text-[10px] sm:text-xs font-sans uppercase tracking-wider text-parchment-300 mt-1 block">Fair Trade Multiple</span>
          <p className="text-[10px] text-parchment-400 mt-1 hidden sm:block">Guaranteed floor price paid directly to smallholder farm owners.</p>
        </div>
        <div className="p-4 sm:p-6 rounded-2xl bg-obsidian-900 border border-obsidian-800 text-center">
          <span className="font-sans text-2xl sm:text-3xl font-bold text-emerald-400 block">100%</span>
          <span className="text-[10px] sm:text-xs font-sans uppercase tracking-wider text-parchment-300 mt-1 block">Direct Trade Traceable</span>
          <p className="text-[10px] text-parchment-400 mt-1 hidden sm:block">Every bag traceable to exact GPS micro-lot coordinates.</p>
        </div>
        <div className="p-4 sm:p-6 rounded-2xl bg-obsidian-900 border border-obsidian-800 text-center">
          <span className="font-sans text-2xl sm:text-3xl font-bold text-sky-400 block">89+</span>
          <span className="text-[10px] sm:text-xs font-sans uppercase tracking-wider text-parchment-300 mt-1 block">SCA Cupping Score</span>
          <p className="text-[10px] text-parchment-400 mt-1 hidden sm:block">Strict specialty grade benchmark verified by licensed Q-graders.</p>
        </div>
        <div className="p-4 sm:p-6 rounded-2xl bg-obsidian-900 border border-obsidian-800 text-center">
          <span className="font-sans text-2xl sm:text-3xl font-bold text-amber-400 block">0%</span>
          <span className="text-[10px] sm:text-xs font-sans uppercase tracking-wider text-parchment-300 mt-1 block">Single-Use Landfill</span>
          <p className="text-[10px] text-parchment-400 mt-1 hidden sm:block">100% reusable glass packaging and municipal compost recycling.</p>
        </div>
      </div>

      {/* The Atelier Milestone Timeline */}
      <div>
        <div className="text-center max-w-xl mx-auto mb-6 sm:mb-10">
          <span className="text-[10px] sm:text-xs font-sans uppercase tracking-widest text-crema-400 block mb-1">
            Chronology
          </span>
          <h2 className="font-serif text-xl sm:text-3xl font-bold text-parchment-50">
            Our Journey in Terroir
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-parchment-300">
            From mountain harvesting expeditions to an urban sensory atelier.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {timelineMilestones.map((item) => (
            <div
              key={item.year}
              className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-obsidian-900 border border-obsidian-800 space-y-2 hover:border-obsidian-700 transition-colors shadow-soft-float"
            >
              <div className="flex items-center justify-between">
                <span className="text-base sm:text-lg font-sans font-bold text-crema-400">
                  {item.year}
                </span>
                <span className="text-[10px] font-sans text-parchment-400 px-2 py-0.5 rounded bg-obsidian-950 border border-obsidian-800">
                  {item.location}
                </span>
              </div>
              <h3 className="font-serif text-sm sm:text-base font-bold text-parchment-50">
                {item.title}
              </h3>
              <p className="text-xs text-parchment-300 leading-relaxed font-sans">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Sourcing & Roasting FAQ */}
      <div className="bg-obsidian-900 border border-obsidian-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 shadow-soft-float">
        <div className="max-w-xl mb-6">
          <span className="text-[10px] sm:text-xs font-sans uppercase tracking-widest text-crema-400 block mb-1">
            Knowledge Base
          </span>
          <h2 className="font-serif text-xl sm:text-3xl font-bold text-parchment-50">
            Frequently Asked Sourcing Questions
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-parchment-300">
            Everything you need to know about our sourcing ethics, bean storage, and extraction science.
          </p>
        </div>

        <div className="space-y-3">
          {storyFaqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={faq.q}
                className="rounded-xl sm:rounded-2xl border border-obsidian-800 bg-obsidian-950/60 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full p-3.5 sm:p-4 text-left flex items-center justify-between gap-3 hover:text-crema-400 transition-colors"
                >
                  <span className="font-serif text-xs sm:text-sm font-semibold text-parchment-100">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-crema-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="p-3.5 sm:p-4 pt-0 text-xs text-parchment-300 leading-relaxed border-t border-obsidian-800/60 font-sans">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
};
