import { motion } from 'framer-motion';
import { useState } from 'react';
import { Calendar, MapPin, Users, ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const roomTypes = ['All Suites', 'Deluxe', 'Executive', 'Presidential', 'Ocean View'];

export function HeroSection() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState('All Suites');
  const [searchData, setSearchData] = useState({
    location: 'Santa Monica, California',
    checkIn: '',
    checkOut: '',
    guests: 1,
    rooms: 1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-neutral-900">
      {/* Background with Parallax */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1920&q=80')`,
          }}
          initial={{ scale: 1 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 20, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="flex justify-center mb-6">
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4 text-primary-400 animate-pulse" />
            <span className="text-white text-sm font-medium">AI-Powered Hospitality</span>
          </motion.div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white text-center mb-6 leading-tight tracking-tight"
        >
          Find Your Perfect
          <br />
          <span className="bg-gradient-to-r from-primary-400 via-primary-300 to-primary-400 bg-clip-text text-transparent">
            Sanctuary
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl md:text-2xl text-white/90 text-center mb-12 max-w-3xl mx-auto px-4"
        >
          Experience the perfect balance of modern luxury and natural tranquility
        </motion.p>

        {/* Booking Widget */}
        <motion.div variants={itemVariants} className="max-w-6xl mx-auto px-4">
          {/* Room Type Filters */}
          <div className="flex gap-2 sm:gap-3 mb-6 justify-center flex-wrap">
            {roomTypes.map((type) => (
              <motion.button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 sm:px-6 py-2.5 rounded-full font-medium text-xs sm:text-sm transition-all ${
                  selectedType === type
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                    : 'bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {type}
              </motion.button>
            ))}
          </div>

          {/* Search Widget - Glassmorphism */}
          <motion.div
            className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-6 md:p-8"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Location */}
              <div className="relative group">
                <label className="block text-sm font-semibold text-neutral-700 mb-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-primary-500 transition-colors" />
                  <input
                    type="text"
                    placeholder="Where to?"
                    value={searchData.location}
                    onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Check-in */}
              <div className="relative group">
                <label className="block text-sm font-semibold text-neutral-700 mb-2">Check-in</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-primary-500 transition-colors" />
                  <input
                    type="date"
                    value={searchData.checkIn}
                    onChange={(e) => setSearchData({ ...searchData, checkIn: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Check-out */}
              <div className="relative group">
                <label className="block text-sm font-semibold text-neutral-700 mb-2">Check-out</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-primary-500 transition-colors" />
                  <input
                    type="date"
                    value={searchData.checkOut}
                    onChange={(e) => setSearchData({ ...searchData, checkOut: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Guests */}
              <div className="relative group">
                <label className="block text-sm font-semibold text-neutral-700 mb-2">Guests</label>
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-primary-500 transition-colors" />
                  <input
                    type="text"
                    value={`${searchData.guests} guest, ${searchData.rooms} room`}
                    readOnly
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-neutral-200 cursor-pointer hover:border-primary-300 transition-all"
                  />
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                </div>
              </div>
            </div>

            {/* Search Button */}
            <motion.button
              onClick={() => navigate('/rooms')}
              className="w-full py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              Search Suites
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1, repeat: Infinity, repeatType: 'reverse' }}
        >
          <ChevronDown className="w-8 h-8 text-white/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}
