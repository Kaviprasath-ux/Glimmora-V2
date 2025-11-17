import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Sparkles,
  Shield,
  Leaf,
  Clock,
  Award,
  Wifi
} from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'AI Room Selection',
    description: 'Intelligent recommendations powered by machine learning to find your perfect suite',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Shield,
    title: 'Secure Booking',
    description: 'Bank-level encryption and secure payment processing for peace of mind',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly',
    description: 'Sustainable luxury with natural materials and carbon-neutral operations',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Clock,
    title: '24/7 Concierge',
    description: 'Round-the-clock AI-assisted service for all your needs',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Award,
    title: 'Award Winning',
    description: 'Recognized for excellence in hospitality and innovative technology',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Wifi,
    title: 'Smart Rooms',
    description: 'IoT-enabled suites with voice control and personalized settings',
    color: 'from-indigo-500 to-purple-500',
  },
];

export function FeaturesGrid() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-24 sm:py-32 bg-gradient-to-b from-white via-neutral-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary-50 text-primary-600 font-semibold text-sm uppercase tracking-wider mb-6">
            Why Choose Us
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
            Experience the Future of
            <br />
            <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400 bg-clip-text text-transparent">
              Hospitality
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Cutting-edge technology meets timeless luxury in every aspect of your stay
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.1 }}
                whileHover={{ y: -12, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className="group"
              >
                <div className="relative bg-white rounded-3xl p-9 shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] transition-all duration-500 border border-neutral-100 overflow-hidden h-full">
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                  {/* Icon */}
                  <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} p-3.5 mb-7 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                    <Icon className="w-full h-full text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-neutral-900 mb-4 group-hover:text-primary-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed text-base">
                    {feature.description}
                  </p>

                  {/* Decorative Element */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-100/20 to-transparent rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
