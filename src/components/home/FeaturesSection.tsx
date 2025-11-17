import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Sparkles, Leaf, Award, Brain } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Mindful Design',
    description: 'Every space is thoughtfully crafted to promote wellness and tranquility',
  },
  {
    icon: Sparkles,
    title: 'Premium Amenities',
    description: 'Luxury facilities and world-class service for an unforgettable stay',
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly',
    description: 'Sustainable luxury with natural materials and mindful practices',
  },
  {
    icon: Award,
    title: 'Award Winning',
    description: 'Recognized for excellence in hospitality and guest experience',
  },
];

export function FeaturesSection() {
  const { ref, controls } = useScrollAnimation();

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-white to-neutral-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-4xl md:text-5xl font-serif font-bold text-center mb-4 text-neutral-900"
          >
            Why Choose TERRA Suites?
          </motion.h2>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-xl text-neutral-600 text-center mb-16 max-w-2xl mx-auto"
          >
            Discover what makes our hotel the perfect choice for mindful travelers
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow"
                >
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                    <IconComponent className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-neutral-900">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
