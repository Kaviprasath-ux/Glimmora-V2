import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import {
  Calendar,
  User,
  Sparkles,
  FileText,
  CheckCircle,
  ArrowRight,
  Monitor
} from 'lucide-react';

const steps = [
  {
    number: 1,
    title: 'Access Pre-Check-In',
    description: 'Receive a link 24 hours before arrival to start your seamless check-in process',
    icon: Calendar,
    mockup: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    highlight: 'Email or SMS notification',
  },
  {
    number: 2,
    title: 'Personal Information',
    description: 'Securely provide your details with our encrypted form system',
    icon: User,
    mockup: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80',
    highlight: 'Auto-fill from profile',
  },
  {
    number: 3,
    title: 'AI Room Selection',
    description: 'Our AI analyzes your preferences to recommend the perfect suite for you',
    icon: Sparkles,
    mockup: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&q=80',
    highlight: 'Personalized recommendations',
  },
  {
    number: 4,
    title: 'Upload Documents',
    description: 'Securely upload ID and payment information for express check-in',
    icon: FileText,
    mockup: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80',
    highlight: 'Drag & drop upload',
  },
  {
    number: 5,
    title: 'Ready to Arrive',
    description: 'Walk straight to your room - your digital key is already active',
    icon: CheckCircle,
    mockup: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    highlight: 'Skip the front desk',
  },
];

export function PreCheckInShowcase() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section ref={ref} className="py-20 sm:py-28 bg-gradient-to-b from-neutral-900 to-neutral-800 text-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
            <Monitor className="w-4 h-4 text-primary-400" />
            <span className="text-white text-sm font-medium">Pre-Check-In Experience</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Skip the Line,
            <br />
            <span className="bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent">
              Start Relaxing Sooner
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto">
            Complete your check-in online before you arrive and walk straight to your room
          </p>
        </motion.div>

        {/* Interactive Steps */}
        <div className="max-w-7xl mx-auto">
          {/* Desktop Mockup Display */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="relative">
              {/* Browser Window Frame */}
              <div className="bg-neutral-800 rounded-t-2xl px-6 py-4 flex items-center gap-2 border-b border-neutral-700">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 ml-6 bg-neutral-700 rounded-lg px-4 py-2 text-sm text-white/60">
                  terrasuites.com/pre-checkin
                </div>
              </div>

              {/* Mockup Content */}
              <div className="relative bg-white rounded-b-2xl overflow-hidden aspect-video">
                <motion.img
                  key={activeStep}
                  src={steps[activeStep].mockup}
                  alt={steps[activeStep].title}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                />

                {/* Overlay Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-primary-500 flex items-center justify-center">
                      {(() => {
                        const Icon = steps[activeStep].icon;
                        return <Icon className="w-6 h-6 text-white" />;
                      })()}
                    </div>
                    <div>
                      <div className="text-sm text-white/60 font-medium">Step {steps[activeStep].number} of 5</div>
                      <h3 className="text-2xl font-bold text-white">{steps[activeStep].title}</h3>
                    </div>
                  </div>
                  <p className="text-white/80 text-lg mb-2">{steps[activeStep].description}</p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/20 border border-primary-400/30">
                    <Sparkles className="w-4 h-4 text-primary-400" />
                    <span className="text-sm text-primary-300 font-medium">{steps[activeStep].highlight}</span>
                  </div>
                </div>
              </div>

              {/* Decorative Glow */}
              <div className="absolute -inset-px bg-gradient-to-r from-primary-500/50 to-primary-600/50 rounded-2xl blur-xl -z-10 opacity-50" />
            </div>
          </motion.div>

          {/* Step Navigation */}
          <div className="grid grid-cols-5 gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === index;

              return (
                <motion.button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className={`relative p-6 rounded-2xl transition-all duration-300 ${
                    isActive
                      ? 'bg-primary-500 shadow-2xl shadow-primary-500/30'
                      : 'bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10'
                  }`}
                >
                  {/* Step Number Badge */}
                  <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    isActive ? 'bg-white text-primary-600' : 'bg-primary-500 text-white'
                  }`}>
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto ${
                    isActive ? 'bg-white/20' : 'bg-white/5'
                  }`}>
                    <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-white/60'}`} />
                  </div>

                  {/* Title */}
                  <h4 className={`text-sm font-semibold text-center ${
                    isActive ? 'text-white' : 'text-white/70'
                  }`}>
                    {step.title}
                  </h4>

                  {/* Active Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-white rounded-full"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-16"
          >
            <motion.button
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-neutral-900 font-semibold text-lg rounded-xl hover:bg-neutral-100 transition-all group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try Pre-Check-In Demo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <p className="text-white/60 text-sm mt-4">No booking required • Takes 2 minutes</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
