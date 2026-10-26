import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Sparkles, CheckCircle2, AlertCircle, Send, ShieldAlert, Calendar, Coffee, Award, Users, Wifi, HeartHandshake } from 'lucide-react';
import { LOCATIONS } from '../data/coffeeData';
import { submitReservation } from '../services/apiClient';

export const LocationsHoursTab: React.FC = () => {
  const [selectedLocationId, setSelectedLocationId] = useState<string>(LOCATIONS[0].id);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    time: '10:00 AM',
    guests: 2,
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error';
    text: string;
    code?: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);

    // Basic client validation
    if (!formData.name || !formData.email || !formData.phone) {
      setStatusMessage({ type: 'error', text: 'Please complete all required fields.' });
      setLoading(false);
      return;
    }

    const res = await submitReservation({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      locationId: selectedLocationId,
      date: formData.date,
      time: formData.time,
      guests: Number(formData.guests),
      notes: formData.notes,
    });

    setLoading(false);
    if (res.success) {
      setStatusMessage({
        type: 'success',
        text: res.message,
        code: res.reservationCode,
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: new Date().toISOString().split('T')[0],
        time: '10:00 AM',
        guests: 2,
        notes: '',
      });
    } else {
      setStatusMessage({
        type: 'error',
        text: res.message || 'Failed to confirm reservation.',
      });
    }
  };

  const selectedLocation = LOCATIONS.find(l => l.id === selectedLocationId) || LOCATIONS[0];

  return (
    <section className="py-4 sm:py-6 lg:py-12 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
      
      {/* Editorial Header */}
      <div className="text-center max-w-xl mx-auto mb-4 sm:mb-6">
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-parchment-50">
          Locations & Hours
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-parchment-300">
          Visit our tasting rooms for espresso flights and manual brews.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-start">
        
        {/* LEFT COLUMN: Location Details & Hours (6 Cols) */}
        <div className="lg:col-span-6 space-y-3 sm:space-y-6">
          
          {/* Location Toggle Cards */}
          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            {LOCATIONS.map((loc) => {
              const isSelected = selectedLocationId === loc.id;
              return (
                <div
                  key={loc.id}
                  onClick={() => setSelectedLocationId(loc.id)}
                  className={`p-2.5 sm:p-4 rounded-2xl sm:rounded-3xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-obsidian-900 border-crema-500 shadow-soft-float'
                      : 'bg-obsidian-900/60 border-obsidian-800 hover:border-obsidian-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1 sm:mb-2 gap-1">
                    <span className="inline-flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-sans bg-emerald-950 border border-emerald-500/30 text-emerald-400 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {loc.currentStatus}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-sans text-parchment-300 hidden xs:inline shrink-0">{loc.neighborhood.split(' ')[0]}</span>
                  </div>
                  <h4 className="font-serif text-xs sm:text-base font-bold text-parchment-50 line-clamp-2 leading-tight">{loc.name}</h4>
                  <p className="text-[10px] sm:text-xs text-parchment-300 mt-0.5 sm:mt-1 line-clamp-2 sm:line-clamp-1 leading-tight">{loc.address}</p>
                </div>
              );
            })}
          </div>

          {/* Selected Location Showcase Card */}
          <div className="bg-obsidian-900 border border-obsidian-800 rounded-2xl sm:rounded-3xl overflow-hidden shadow-soft-float">
            <div className="relative h-36 sm:h-52 lg:h-56 w-full">
              <img
                src={selectedLocation.image}
                alt={selectedLocation.name}
                className="w-full h-full object-cover brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/20 to-transparent" />
              <div className="absolute bottom-2.5 sm:bottom-4 left-3.5 sm:left-6 right-3.5 sm:right-6">
                <h3 className="font-serif text-base sm:text-xl font-bold text-parchment-50">
                  {selectedLocation.name}
                </h3>
                <p className="text-[10px] sm:text-xs text-crema-400 font-sans mt-0.5 truncate">
                  {selectedLocation.tagline}
                </p>
              </div>
            </div>

            <div className="p-3.5 sm:p-6 space-y-3 sm:space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4 text-xs">
                
                {/* Hours Box */}
                <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-obsidian-950/80 border border-obsidian-800/80 space-y-1.5 sm:space-y-2">
                  <div className="flex items-center gap-1.5 text-crema-400 font-sans font-semibold text-[11px] sm:text-xs">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Operating Hours</span>
                  </div>
                  <div className="space-y-1 text-[11px] sm:text-xs text-parchment-200">
                    <div className="flex justify-between">
                      <span className="text-parchment-300">Mon–Fri:</span>
                      <span className="font-sans">{selectedLocation.hours.weekdays}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-parchment-300">Sat–Sun:</span>
                      <span className="font-sans text-crema-300">{selectedLocation.hours.weekends}</span>
                    </div>
                  </div>
                </div>

                {/* Contact & Inquiries Box */}
                <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-obsidian-950/80 border border-obsidian-800/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-crema-400 font-sans font-semibold text-[11px] sm:text-xs flex items-center gap-1.5">
                      <Send className="w-3.5 h-3.5 text-sky-400" />
                      <span>Direct Contact & Work</span>
                    </span>
                    <span className="text-[9px] font-sans px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center gap-1">
                      <ShieldAlert className="w-2.5 h-2.5 text-amber-400" /> Anti-AI
                    </span>
                  </div>
                  <div className="space-y-1.5 text-[11px] sm:text-xs">
                    <a
                      href="https://t.me/Slava_Dev_bot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-crema-300 hover:text-white flex items-center gap-1.5 font-sans transition-colors group"
                      title="Open Telegram Bot for Work Requests"
                    >
                      <span className="p-1 rounded-md bg-sky-500/20 text-sky-400 border border-sky-500/30 group-hover:scale-105 transition-transform">
                        <Send className="w-3 h-3" />
                      </span>
                      <span className="font-semibold underline underline-offset-2">Telegram: @Slava_Dev_bot</span>
                    </a>
                    <p className="text-[10px] sm:text-[11px] font-sans text-emerald-400 flex items-center gap-1 pt-0.5">
                      <Clock className="w-3 h-3 shrink-0" />
                      <span>Answering client messages in 24 hours</span>
                    </p>
                  </div>
                </div>

              </div>

              {/* Atelier Features List */}
              <div>
                <span className="text-[10px] sm:text-xs font-sans uppercase tracking-wider text-parchment-300 block mb-1.5 sm:mb-2">
                  Room Features & Equipment
                </span>
                <div className="grid grid-cols-2 gap-1.5 sm:gap-2 text-[10px] sm:text-xs">
                  {selectedLocation.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-1.5 text-parchment-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-crema-400 shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Interactive Reservation Form (6 Cols) */}
        <div className="lg:col-span-6">
          <div className="bg-obsidian-900 border border-obsidian-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-soft-float">
            
            <div className="flex items-center gap-1.5 mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-crema-400" />
              <span className="text-[10px] sm:text-xs font-sans uppercase tracking-widest text-crema-400">
                Omakase Table Booking
              </span>
            </div>

            <h3 className="font-serif text-lg sm:text-2xl font-bold text-parchment-50 mb-1 sm:mb-2">
              Reserve a Cupping Seat
            </h3>
            <p className="text-[11px] sm:text-xs text-parchment-300 mb-4 sm:mb-6 leading-relaxed">
              Book a sensory table reservation or private barista cupping flight at {selectedLocation.name}. Experience curated micro-lots and terroir flights with our head roaster.
            </p>

            {statusMessage && (
              <div
                className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 text-xs flex items-start gap-2.5 ${
                  statusMessage.type === 'success'
                    ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-200'
                    : 'bg-rose-950/60 border border-rose-500/40 text-rose-200'
                }`}
              >
                {statusMessage.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-semibold text-[11px] sm:text-xs">{statusMessage.text}</p>
                  {statusMessage.code && (
                    <p className="mt-0.5 font-sans text-[10px] sm:text-[11px] text-emerald-400">
                      Confirmation Code: {statusMessage.code}
                    </p>
                  )}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[10px] sm:text-xs font-sans text-parchment-300 uppercase mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-obsidian-950 border border-obsidian-800 rounded-lg sm:rounded-xl px-3 py-2 text-xs text-parchment-100 placeholder:text-parchment-400 focus:outline-none focus:border-crema-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] sm:text-xs font-sans text-parchment-300 uppercase mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-obsidian-950 border border-obsidian-800 rounded-lg sm:rounded-xl px-3 py-2 text-xs text-parchment-100 placeholder:text-parchment-400 focus:outline-none focus:border-crema-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-sans text-parchment-300 uppercase mb-1.5">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-obsidian-950 border border-obsidian-800 rounded-xl px-3.5 py-2.5 text-xs text-parchment-100 placeholder:text-parchment-400 focus:outline-none focus:border-crema-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans text-parchment-300 uppercase mb-1.5">
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-obsidian-950 border border-obsidian-800 rounded-xl px-3 py-2.5 text-xs text-parchment-100 focus:outline-none focus:border-crema-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans text-parchment-300 uppercase mb-1.5">
                    Party Size
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                    className="w-full bg-obsidian-950 border border-obsidian-800 rounded-xl px-3 py-2.5 text-xs text-parchment-100 focus:outline-none focus:border-crema-500"
                  >
                    {[1, 2, 3, 4, 6, 8].map(n => (
                      <option key={n} value={n}>{n} Guests</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-sans text-parchment-300 uppercase mb-1.5">
                  Tasting Session Time
                </label>
                <div className="grid grid-cols-2 xs:grid-cols-4 gap-1.5 sm:gap-2">
                  {['9:30 AM', '11:00 AM', '2:30 PM', '4:30 PM'].map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setFormData({ ...formData, time: t })}
                      className={`py-1.5 sm:py-2 text-[11px] sm:text-xs font-sans rounded-lg sm:rounded-xl border text-center transition-all ${
                        formData.time === t
                          ? 'bg-crema-500/20 border-crema-500 text-crema-400 font-semibold'
                          : 'bg-obsidian-950 border-obsidian-800 text-parchment-300 hover:border-obsidian-700'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-sans text-parchment-300 uppercase mb-1.5">
                  Special Notes / Dietary Preferences (Optional)
                </label>
                <textarea
                  rows={2}
                  maxLength={160}
                  placeholder="e.g. Interested in Geisha pour-over flights or oat milk pairings..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-obsidian-950 border border-obsidian-800 rounded-xl p-3 text-xs text-parchment-100 placeholder:text-parchment-300 focus:outline-none focus:border-crema-500 resize-none"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-crema-400 to-crema-600 text-obsidian-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-105 transition-all shadow-md mt-2 text-center"
              >
                <span className="truncate">{loading ? 'Validating & Securing...' : 'Confirm Tasting Reservation'}</span>
              </motion.button>

            </form>

            {/* Site Info & Developer Work Inquiries Space */}
            <div className="mt-5 p-3.5 sm:p-4 rounded-2xl bg-obsidian-950/80 border border-obsidian-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-sans text-[10px] sm:text-[11px] uppercase tracking-wider text-crema-400 font-semibold flex items-center gap-1.5">
                  <Send className="w-3.5 h-3.5 text-sky-400" />
                  <span>Site Creator & Work Requests</span>
                </span>
                <span className="text-[9px] sm:text-[10px] font-sans text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Answering in 24 hours
                </span>
              </div>
              <p className="text-[11px] text-parchment-300 leading-relaxed font-sans">
                For custom website development, production engineering, or project commissions:
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 font-sans text-[11px]">
                <a
                  href="https://t.me/Slava_Dev_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-crema-500/10 border border-crema-500/30 text-crema-300 hover:text-white hover:bg-crema-500/20 transition-all font-semibold"
                >
                  <Send className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>Telegram Bot: @Slava_Dev_bot</span>
                </a>
                <span className="inline-flex items-center gap-1 text-[10px] text-amber-300/90 font-sans">
                  <ShieldAlert className="w-3 h-3 text-amber-400 shrink-0" />
                  <span>Anti-AI Protected • No Scrape</span>
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* SECTION: The Omakase Cupping Flight Experience */}
      <div className="mt-8 sm:mt-12 bg-obsidian-900 border border-obsidian-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 shadow-soft-float">
        <div className="max-w-2xl mb-6">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1 rounded-md bg-crema-500/10 text-crema-400">
              <Sparkles className="w-3.5 h-3.5 text-crema-400" />
            </span>
            <span className="text-[10px] sm:text-xs font-sans uppercase tracking-wider text-crema-400">
              Curated Sensory Experience
            </span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-parchment-50">
            The 3-Course Cupping Flight
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-parchment-300">
            When you reserve a seat at our cupping bar, our head barista guides you through a progressive multi-origin extraction tasting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6">
          <div className="p-4 sm:p-6 rounded-2xl bg-obsidian-950/80 border border-obsidian-800/80 space-y-2">
            <div className="flex items-center justify-between text-xs font-sans text-crema-400">
              <span>Course 01</span>
              <span className="px-2 py-0.5 rounded bg-obsidian-900 border border-obsidian-800 text-[10px]">Apertif</span>
            </div>
            <h4 className="font-serif text-sm sm:text-base font-bold text-parchment-50">
              Cascara Sparkling Palate Cleanser
            </h4>
            <p className="text-[11px] sm:text-xs text-parchment-300 leading-relaxed">
              Cold-steeped organic coffee fruit husk effervesced with mountain spring water and yuzu zest to prime your sensory palate.
            </p>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-obsidian-950/80 border border-obsidian-800/80 space-y-2">
            <div className="flex items-center justify-between text-xs font-sans text-crema-400">
              <span>Course 02</span>
              <span className="px-2 py-0.5 rounded bg-obsidian-900 border border-obsidian-800 text-[10px]">Terroir Duo</span>
            </div>
            <h4 className="font-serif text-sm sm:text-base font-bold text-parchment-50">
              Side-by-Side Single-Origin Extraction
            </h4>
            <p className="text-[11px] sm:text-xs text-parchment-300 leading-relaxed">
              Compare high-altitude Guji Geisha against Washed Pink Bourbon pulled on our custom Slayer Steam LP pressure-profile group heads.
            </p>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-obsidian-950/80 border border-obsidian-800/80 space-y-2">
            <div className="flex items-center justify-between text-xs font-sans text-crema-400">
              <span>Course 03</span>
              <span className="px-2 py-0.5 rounded bg-obsidian-900 border border-obsidian-800 text-[10px]">Harmonic Finish</span>
            </div>
            <h4 className="font-serif text-sm sm:text-base font-bold text-parchment-50">
              Velvet Microfoam & Citrus Mist
            </h4>
            <p className="text-[11px] sm:text-xs text-parchment-300 leading-relaxed">
              Single-origin ristretto paired with warm textured oat emulsion and expressed organic Valencia orange oil aromatics.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION: Weekly Community Workshops & Public Cupping */}
      <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-obsidian-900 border border-obsidian-800 space-y-3 shadow-soft-float">
          <div className="flex items-center gap-2 text-crema-400">
            <Calendar className="w-4 h-4" />
            <span className="text-[10px] sm:text-xs font-sans uppercase tracking-wider">Public Cupping Session</span>
          </div>
          <h4 className="font-serif text-base sm:text-lg font-bold text-parchment-50">
            Saturday Morning Public Cupping (10:00 AM)
          </h4>
          <p className="text-xs text-parchment-300 leading-relaxed">
            Free for all coffee enthusiasts. Taste the latest green arrivals before they launch on the retail bar. Learn standard SCA cupping score protocol with our roastmasters.
          </p>
          <div className="pt-2 text-[11px] font-sans text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Complimentary admission • Walk-ins & reservations welcome</span>
          </div>
        </div>

        <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-obsidian-900 border border-obsidian-800 space-y-3 shadow-soft-float">
          <div className="flex items-center gap-2 text-crema-400">
            <Users className="w-4 h-4" />
            <span className="text-[10px] sm:text-xs font-sans uppercase tracking-wider">Barista Lab Masterclass</span>
          </div>
          <h4 className="font-serif text-base sm:text-lg font-bold text-parchment-50">
            Wednesday Evening Milk Science (6:00 PM)
          </h4>
          <p className="text-xs text-parchment-300 leading-relaxed">
            Small group masterclass covering milk steaming dynamics, whirlpool vortex creation, microfoam tactile density, and tulip/rosetta latte art fundamentals.
          </p>
          <div className="pt-2 text-[11px] font-sans text-crema-400 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" />
            <span>Includes 250g single-origin retail bag & barista certificate</span>
          </div>
        </div>
      </div>

      {/* SECTION: Visitor Guidelines & Amenities */}
      <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6">
        <div className="p-4 sm:p-6 rounded-2xl bg-obsidian-900 border border-obsidian-800 space-y-2 shadow-soft-float">
          <div className="w-8 h-8 rounded-xl bg-crema-500/10 border border-crema-500/30 flex items-center justify-center text-crema-400">
            <Wifi className="w-4 h-4" />
          </div>
          <h5 className="font-serif text-sm sm:text-base font-bold text-parchment-50">
            Gigabit Fiber & Acoustic Workspaces
          </h5>
          <p className="text-[11px] sm:text-xs text-parchment-300 leading-relaxed">
            Both locations provide high-speed WiFi and quiet booths equipped with USB-C charging for creative studio work and reading.
          </p>
        </div>

        <div className="p-4 sm:p-6 rounded-2xl bg-obsidian-900 border border-obsidian-800 space-y-2 shadow-soft-float">
          <div className="w-8 h-8 rounded-xl bg-crema-500/10 border border-crema-500/30 flex items-center justify-center text-crema-400">
            <HeartHandshake className="w-4 h-4" />
          </div>
          <h5 className="font-serif text-sm sm:text-base font-bold text-parchment-50">
            Dog-Friendly Patio & Garden Terrace
          </h5>
          <p className="text-[11px] sm:text-xs text-parchment-300 leading-relaxed">
            Our outdoor garden patio and skylight terrace welcome well-behaved companions, with fresh water bowls and shaded seating.
          </p>
        </div>

        <div className="p-4 sm:p-6 rounded-2xl bg-obsidian-900 border border-obsidian-800 space-y-2 shadow-soft-float">
          <div className="w-8 h-8 rounded-xl bg-crema-500/10 border border-crema-500/30 flex items-center justify-center text-crema-400">
            <Coffee className="w-4 h-4" />
          </div>
          <h5 className="font-serif text-sm sm:text-base font-bold text-parchment-50">
            Zero-Waste Canister Refill Discount
          </h5>
          <p className="text-[11px] sm:text-xs text-parchment-300 leading-relaxed">
            Bring your own whole-bean tin or canister and receive an instant $2.00 deduction on all fresh roastery bean refills.
          </p>
        </div>
      </div>

      {/* Hidden developer credentials & Anti-AI mark */}
      <div
        className="hidden pointer-events-none"
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
        data-protection-notice="Machine learning model training and automated scraping strictly forbidden. Inquiries: @Slava_Dev_bot"
      />
    </section>
  );
};
