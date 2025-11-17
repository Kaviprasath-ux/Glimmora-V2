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
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-10 leading-[1.08] tracking-tight">
            <span className="drop-shadow-[0_8px_32px_rgba(0,0,0,0.9)]">
              Discover Your Perfect
            </span>
            <br />
            <span className="bg-gradient-to-r from-white via-primary-100 to-primary-300 bg-clip-text text-transparent drop-shadow-[0_8px_32px_rgba(0,0,0,0.9)]">
              Stay Anywhere
            </span>
          </h1>

          {/* Subheadline - Gray/White Text */}
          <p className="text-lg sm:text-xl md:text-2xl text-white/95 mb-20 max-w-3xl mx-auto leading-relaxed font-light drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
            Book unique stays powered by AI - your gateway to personalized luxury and seamless hospitality
          </p>

          {/* Search Widget - Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 22, delay: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-2xl rounded-[2rem] p-4 border border-white/30 shadow-[0_24px_80px_rgba(0,0,0,0.5),_0_0_0_1px_rgba(255,255,255,0.1)_inset]">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Check-in Date */}
                <div className="relative group">
                  <label className="block text-xs font-medium text-white/70 mb-1.5 px-6 pt-2">Check-in</label>
                  <input
                    type="date"
                    value={searchData.checkIn}
                    onChange={(e) => setSearchData({ ...searchData, checkIn: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-6 py-4 bg-white/5 hover:bg-white/15 rounded-[1.25rem] transition-all duration-300 text-white placeholder-white/50 border border-white/20 focus:border-white/50 focus:bg-white/20 focus:outline-none focus:shadow-[0_8px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
                  />
                </div>

                {/* Check-out Date */}
                <div className="relative group">
                  <label className="block text-xs font-medium text-white/70 mb-1.5 px-6 pt-2">Check-out</label>
                  <input
                    type="date"
                    value={searchData.checkOut}
                    onChange={(e) => setSearchData({ ...searchData, checkOut: e.target.value })}
                    min={searchData.checkIn || new Date().toISOString().split('T')[0]}
                    className="w-full px-6 py-4 bg-white/5 hover:bg-white/15 rounded-[1.25rem] transition-all duration-300 text-white placeholder-white/50 border border-white/20 focus:border-white/50 focus:bg-white/20 focus:outline-none focus:shadow-[0_8px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
                  />
                </div>

                {/* Guests Dropdown */}
                <div className="relative group">
                  <label className="block text-xs font-medium text-white/70 mb-1.5 px-6 pt-2">Guests</label>
                  <button
                    type="button"
                    onClick={() => setShowGuestsDropdown(!showGuestsDropdown)}
                    className="w-full px-6 py-4 text-left bg-white/5 hover:bg-white/15 rounded-[1.25rem] transition-all duration-300 border border-white/20 focus:border-white/50 focus:bg-white/20 focus:outline-none focus:shadow-[0_8px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-white/80" />
                        <div className="text-white font-medium">
                          {searchData.adults + searchData.children} {searchData.adults + searchData.children === 1 ? 'guest' : 'guests'}
                        </div>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-white/80 transition-transform duration-300 ${showGuestsDropdown ? 'rotate-180' : ''}`} />
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
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                        className="absolute top-full left-0 right-0 mt-3 bg-white rounded-[1.5rem] shadow-[0_24px_48px_rgba(0,0,0,0.2),_0_0_0_1px_rgba(0,0,0,0.05)] border border-neutral-200/50 p-6 z-20"
                      >
                        {/* Adults */}
                        <div className="flex items-center justify-between mb-5 pb-5 border-b border-neutral-200">
                          <div>
                            <div className="font-semibold text-neutral-900 text-base">Adults</div>
                            <div className="text-sm text-neutral-500 mt-0.5">Age 13+</div>
                          </div>
                          <div className="flex items-center gap-4">
                            <motion.button
                              type="button"
                              onClick={() => setSearchData({ ...searchData, adults: Math.max(1, searchData.adults - 1) })}
                              disabled={searchData.adults <= 1}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="w-9 h-9 rounded-full border-2 border-neutral-300 flex items-center justify-center hover:border-primary-500 hover:bg-primary-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                            >
                              <Minus className="w-4 h-4 text-neutral-700" />
                            </motion.button>
                            <span className="w-8 text-center font-semibold text-neutral-900 text-lg">
                              {searchData.adults}
                            </span>
                            <motion.button
                              type="button"
                              onClick={() => setSearchData({ ...searchData, adults: searchData.adults + 1 })}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="w-9 h-9 rounded-full border-2 border-neutral-300 flex items-center justify-center hover:border-primary-500 hover:bg-primary-50 transition-all duration-200"
                            >
                              <Plus className="w-4 h-4 text-neutral-700" />
                            </motion.button>
                          </div>
                        </div>

                        {/* Children */}
                        <div className="flex items-center justify-between mb-5">
                          <div>
                            <div className="font-semibold text-neutral-900 text-base">Children</div>
                            <div className="text-sm text-neutral-500 mt-0.5">Age 0-12</div>
                          </div>
                          <div className="flex items-center gap-4">
                            <motion.button
                              type="button"
                              onClick={() => setSearchData({ ...searchData, children: Math.max(0, searchData.children - 1) })}
                              disabled={searchData.children <= 0}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="w-9 h-9 rounded-full border-2 border-neutral-300 flex items-center justify-center hover:border-primary-500 hover:bg-primary-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                            >
                              <Minus className="w-4 h-4 text-neutral-700" />
                            </motion.button>
                            <span className="w-8 text-center font-semibold text-neutral-900 text-lg">
                              {searchData.children}
                            </span>
                            <motion.button
                              type="button"
                              onClick={() => setSearchData({ ...searchData, children: searchData.children + 1 })}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="w-9 h-9 rounded-full border-2 border-neutral-300 flex items-center justify-center hover:border-primary-500 hover:bg-primary-50 transition-all duration-200"
                            >
                              <Plus className="w-4 h-4 text-neutral-700" />
                            </motion.button>
                          </div>
                        </div>

                        <motion.button
                          onClick={() => setShowGuestsDropdown(false)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-3.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-[1rem] hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.2)]"
                        >
                          Done
                        </motion.button>
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
                  className="px-10 py-5 bg-gradient-to-br from-white to-neutral-50 hover:from-neutral-50 hover:to-white text-neutral-900 font-bold text-lg rounded-[1.25rem] transition-all duration-300 flex items-center justify-center gap-2 mt-auto shadow-[0_12px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)] border border-white/50"
                  whileHover={{ scale: 1.06, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
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
