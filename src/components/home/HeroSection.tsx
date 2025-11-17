import { motion } from 'framer-motion';
import { useState } from 'react';
import { MapPin, Calendar, Users, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function HeroSection() {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    destination: '',
    dates: '',
    guests: 1,
  });

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
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            Discover Your Perfect
            <br />
            Stay Anywhere
          </h1>

          {/* Subheadline - Gray/White Text */}
          <p className="text-lg sm:text-xl md:text-2xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed">
            Book unique stays powered by AI - your gateway to personalized luxury and seamless hospitality
          </p>

          {/* Search Widget - Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-2 border border-white/20 shadow-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                {/* Search Destination Dropdown */}
                <button className="w-full px-6 py-4 text-left bg-white/5 hover:bg-white/10 rounded-xl transition-all group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-white/70" />
                      <div>
                        <div className="text-xs text-white/60 mb-0.5">Location</div>
                        <div className="text-white font-medium">Search destination</div>
                      </div>
                    </div>
                    <ChevronDown className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                  </div>
                </button>

                {/* Date Destination Dropdown */}
                <button className="w-full px-6 py-4 text-left bg-white/5 hover:bg-white/10 rounded-xl transition-all group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-white/70" />
                      <div>
                        <div className="text-xs text-white/60 mb-0.5">Dates</div>
                        <div className="text-white font-medium">Select dates</div>
                      </div>
                    </div>
                    <ChevronDown className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                  </div>
                </button>

                {/* Guest Dropdown */}
                <button className="w-full px-6 py-4 text-left bg-white/5 hover:bg-white/10 rounded-xl transition-all group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-white/70" />
                      <div>
                        <div className="text-xs text-white/60 mb-0.5">Guests</div>
                        <div className="text-white font-medium">1 guest</div>
                      </div>
                    </div>
                    <ChevronDown className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                  </div>
                </button>

                {/* Explore Button - White */}
                <motion.button
                  onClick={() => navigate('/rooms')}
                  className="px-8 py-4 bg-white hover:bg-neutral-100 text-neutral-900 font-semibold text-lg rounded-xl transition-all flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
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
