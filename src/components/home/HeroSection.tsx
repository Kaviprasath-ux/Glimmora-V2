import { motion } from 'framer-motion';
import { useState } from 'react';
import { Users, ChevronDown, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function HeroSection() {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    checkIn: '',
    checkOut: '',
    adults: 1,
    children: 0,
  });
  const [showGuestsDropdown, setShowGuestsDropdown] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <img
            src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1920&q=80"
            alt="Luxury Hotel Room"
            className="w-full h-full object-cover"
          />
          {/* Dark Overlay - 50% black */}
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>
      </div>

      {/* Content - Centered */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          {/* Main Headline - Large White Text */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-[1.1] tracking-tight drop-shadow-2xl">
            Discover Your Perfect
            <br />
            <span className="bg-gradient-to-r from-white via-white to-primary-200 bg-clip-text text-transparent">
              Stay Anywhere
            </span>
          </h1>

          {/* Subheadline - Gray/White Text */}
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-16 max-w-4xl mx-auto leading-relaxed font-light">
            Book unique stays powered by AI - your gateway to personalized luxury and seamless hospitality
          </p>

          {/* Search Widget - Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-3 border border-white/30 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                {/* Check-in Date */}
                <div className="relative">
                  <label className="block text-xs text-white/60 mb-1 px-6 pt-2">Check-in</label>
                  <input
                    type="date"
                    value={searchData.checkIn}
                    onChange={(e) => setSearchData({ ...searchData, checkIn: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-6 py-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all text-white placeholder-white/50 border border-white/10 focus:border-white/40 focus:bg-white/15 focus:outline-none focus:shadow-lg"
                  />
                </div>

                {/* Check-out Date */}
                <div className="relative">
                  <label className="block text-xs text-white/60 mb-1 px-6 pt-2">Check-out</label>
                  <input
                    type="date"
                    value={searchData.checkOut}
                    onChange={(e) => setSearchData({ ...searchData, checkOut: e.target.value })}
                    min={searchData.checkIn || new Date().toISOString().split('T')[0]}
                    className="w-full px-6 py-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all text-white placeholder-white/50 border border-white/10 focus:border-white/40 focus:bg-white/15 focus:outline-none focus:shadow-lg"
                  />
                </div>

                {/* Guests Dropdown */}
                <div className="relative">
                  <label className="block text-xs text-white/60 mb-1 px-6 pt-2">Guests</label>
                  <button
                    type="button"
                    onClick={() => setShowGuestsDropdown(!showGuestsDropdown)}
                    className="w-full px-6 py-4 text-left bg-white/5 hover:bg-white/10 rounded-2xl transition-all group border border-white/10 focus:border-white/40 focus:bg-white/15 focus:outline-none focus:shadow-lg"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-white/70" />
                        <div className="text-white font-medium">
                          {searchData.adults + searchData.children} {searchData.adults + searchData.children === 1 ? 'guest' : 'guests'}
                        </div>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-white/70 transition-transform ${showGuestsDropdown ? 'rotate-180' : ''}`} />
                    </div>
                  </button>

                  {/* Guests Dropdown Menu */}
                  {showGuestsDropdown && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setShowGuestsDropdown(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.15)] border border-neutral-100 p-5 z-20"
                      >
                        {/* Adults */}
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <div className="font-semibold text-neutral-900">Adults</div>
                            <div className="text-sm text-neutral-600">Age 13+</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => setSearchData({ ...searchData, adults: Math.max(1, searchData.adults - 1) })}
                              disabled={searchData.adults <= 1}
                              className="w-8 h-8 rounded-full border-2 border-neutral-300 flex items-center justify-center hover:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                              <Minus className="w-4 h-4 text-neutral-900" />
                            </button>
                            <span className="w-6 text-center font-semibold text-neutral-900">
                              {searchData.adults}
                            </span>
                            <button
                              type="button"
                              onClick={() => setSearchData({ ...searchData, adults: searchData.adults + 1 })}
                              className="w-8 h-8 rounded-full border-2 border-neutral-300 flex items-center justify-center hover:border-primary-500 transition-all"
                            >
                              <Plus className="w-4 h-4 text-neutral-900" />
                            </button>
                          </div>
                        </div>

                        {/* Children */}
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-neutral-900">Children</div>
                            <div className="text-sm text-neutral-600">Age 0-12</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => setSearchData({ ...searchData, children: Math.max(0, searchData.children - 1) })}
                              disabled={searchData.children <= 0}
                              className="w-8 h-8 rounded-full border-2 border-neutral-300 flex items-center justify-center hover:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                              <Minus className="w-4 h-4 text-neutral-900" />
                            </button>
                            <span className="w-6 text-center font-semibold text-neutral-900">
                              {searchData.children}
                            </span>
                            <button
                              type="button"
                              onClick={() => setSearchData({ ...searchData, children: searchData.children + 1 })}
                              className="w-8 h-8 rounded-full border-2 border-neutral-300 flex items-center justify-center hover:border-primary-500 transition-all"
                            >
                              <Plus className="w-4 h-4 text-neutral-900" />
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={() => setShowGuestsDropdown(false)}
                          className="w-full mt-4 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl"
                        >
                          Done
                        </button>
                      </motion.div>
                    </>
                  )}
                </div>

                {/* Explore Button - White */}
                <motion.button
                  onClick={() => {
                    const params = new URLSearchParams();
                    if (searchData.checkIn) params.set('checkIn', searchData.checkIn);
                    if (searchData.checkOut) params.set('checkOut', searchData.checkOut);
                    params.set('adults', searchData.adults.toString());
                    params.set('children', searchData.children.toString());
                    navigate(`/rooms?${params.toString()}`);
                  }}
                  className="px-8 py-5 bg-white hover:bg-neutral-50 text-neutral-900 font-bold text-lg rounded-2xl transition-all flex items-center justify-center gap-2 mt-auto shadow-xl hover:shadow-2xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  Explore
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator (Optional) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
        >
          <ChevronDown className="w-8 h-8 text-white/70" />
        </motion.div>
      </div>
    </section>
  );
}
