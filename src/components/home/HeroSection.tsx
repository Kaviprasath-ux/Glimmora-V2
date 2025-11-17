import { motion } from 'framer-motion';
import { useState } from 'react';
import { Calendar, MapPin, Users, ArrowRight, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const roomTypes = ['Hotels', 'Suites', 'Deluxe', 'Executive', 'Presidential'];

export function HeroSection() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState('Hotels');
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState({ adults: 1, rooms: 1 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const imageVariants = {
    hidden: { scale: 1.2, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const handleSearch = () => {
    navigate('/rooms');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0"
        initial="hidden"
        animate="visible"
        variants={imageVariants}
      >
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1920&q=80')`,
          }}
          initial={{ scale: 1 }}
          whileInView={{ scale: 1.05 }}
          transition={{ duration: 10, ease: 'linear' }}
          viewport={{ once: false }}
        />

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 container mx-auto px-4 py-32 max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            <span className="text-white text-sm font-medium">Modern Natural Luxury</span>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white text-center mb-6 leading-tight tracking-tight"
        >
          Find Your Perfect
          <br />
          <span className="text-primary-400">Sanctuary</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-white/90 text-center mb-12 max-w-3xl mx-auto"
        >
          Experience the perfect balance of modern luxury and natural tranquility
        </motion.p>

        {/* Booking Widget */}
        <motion.div
          variants={itemVariants}
          className="max-w-5xl mx-auto"
        >
          {/* Room Type Filters */}
          <div className="flex gap-3 mb-6 justify-center flex-wrap">
            {roomTypes.map((type) => (
              <motion.button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`
                  px-6 py-2.5 rounded-full font-medium text-sm transition-all
                  ${selectedType === type
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20'
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {type}
              </motion.button>
            ))}
          </div>

          {/* Search Widget - Glassmorphism */}
          <motion.div
            className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-8"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Location */}
              <div className="relative group">
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-primary-500 transition-colors" />
                  <input
                    type="text"
                    placeholder="Santa Monica, California"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Check-in Date */}
              <div className="relative group">
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Check-in Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-primary-500 transition-colors" />
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Check-out Date */}
              <div className="relative group">
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Check-out Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-primary-500 transition-colors" />
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Guests and Search Button */}
            <div className="flex flex-col md:flex-row gap-4 items-end">
              {/* Guests */}
              <div className="flex-1 relative group">
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Guests and Rooms
                </label>
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-primary-500 transition-colors" />
                  <input
                    type="text"
                    value={`${guests.adults} guest${guests.adults > 1 ? 's' : ''}, ${guests.rooms} room${guests.rooms > 1 ? 's' : ''}`}
                    readOnly
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all cursor-pointer"
                  />
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                </div>
              </div>

              {/* Search Button */}
              <motion.button
                onClick={handleSearch}
                className="w-full md:w-auto px-12 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Search
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1, repeat: Infinity, repeatType: 'reverse' }}
        >
          <ChevronDown className="w-8 h-8 text-white/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}
