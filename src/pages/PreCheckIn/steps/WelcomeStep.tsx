import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Hash, User, CalendarDays, Sparkles } from 'lucide-react';
import { usePreCheckIn } from '@/contexts/PreCheckInContext';

const welcomeSchema = z.object({
  bookingNumber: z.string().min(5, 'Booking number required'),
  guestName: z.string().min(2, 'Guest name required'),
});

interface WelcomeStepProps {
  onNext: () => void;
}

export function WelcomeStep({ onNext }: WelcomeStepProps) {
  const { preCheckInData, updatePreCheckInData } = usePreCheckIn();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(welcomeSchema),
    defaultValues: {
      bookingNumber: preCheckInData.bookingNumber,
      guestName: preCheckInData.guestName,
    },
  });

  const onSubmit = (data: any) => {
    updatePreCheckInData({
      ...data,
      roomType: 'Ocean View Suite', // Mock data
      checkInDate: '2025-01-15', // Mock data
      checkOutDate: '2025-01-18', // Mock data
    });
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-8 shadow-sm max-w-2xl mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-neutral-900 mb-3">
          Welcome to TERRA Suites
        </h1>
        <p className="text-xl text-neutral-600">
          Complete your pre-check-in for a seamless arrival
        </p>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { icon: '⚡', title: 'Skip the Line', desc: 'No front desk wait' },
          { icon: '🔑', title: 'Digital Key', desc: 'Instant room access' },
          { icon: '🤖', title: 'AI-Powered', desc: 'Perfect room match' },
        ].map((benefit, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 + 0.3 }}
            className="text-center p-4 bg-neutral-50 rounded-xl"
          >
            <div className="text-3xl mb-2">{benefit.icon}</div>
            <div className="font-semibold text-neutral-900 text-sm mb-1">{benefit.title}</div>
            <div className="text-xs text-neutral-600">{benefit.desc}</div>
          </motion.div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Booking Number */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">
            Booking Number *
          </label>
          <div className="relative">
            <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="e.g., TRS-ABC123"
              {...register('bookingNumber')}
              className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none transition-all ${
                errors.bookingNumber
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-neutral-300 focus:border-primary-500'
              }`}
            />
          </div>
          {errors.bookingNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.bookingNumber.message}</p>
          )}
        </div>

        {/* Guest Name */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">
            Guest Name *
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="John Smith"
              {...register('guestName')}
              className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none transition-all ${
                errors.guestName
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-neutral-300 focus:border-primary-500'
              }`}
            />
          </div>
          {errors.guestName && (
            <p className="mt-1 text-sm text-red-600">{errors.guestName.message}</p>
          )}
        </div>

        {/* Info Box */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <div className="flex items-start gap-3">
            <CalendarDays className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-900">
              <strong>Pre-check-in takes about 5 minutes.</strong> You'll be able to select your
              perfect room, upload documents, and receive your digital key instantly.
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold text-lg rounded-xl transition-all"
        >
          Start Pre-Check-In
        </button>
      </form>
    </motion.div>
  );
}
