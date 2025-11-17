import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Mail, Phone, MessageSquare } from 'lucide-react';
import { useBooking } from '@/contexts/BookingContext';

const guestInfoSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  specialRequests: z.string().optional(),
});

interface GuestInfoStepProps {
  onNext: () => void;
}

export function GuestInfoStep({ onNext }: GuestInfoStepProps) {
  const { bookingData, updateBookingData } = useBooking();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(guestInfoSchema),
    defaultValues: bookingData.guestInfo,
  });

  const onSubmit = (data: any) => {
    updateBookingData({ guestInfo: data });
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-8 shadow-sm"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-neutral-900 mb-2">Your Information</h2>
        <p className="text-neutral-600">We'll use this information for your booking confirmation</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">
              First Name *
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                {...register('firstName')}
                placeholder="John"
                className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none transition-all ${
                  errors.firstName
                    ? 'border-red-300 focus:border-red-500'
                    : 'border-neutral-300 focus:border-primary-500'
                }`}
              />
            </div>
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">
              Last Name *
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                {...register('lastName')}
                placeholder="Doe"
                className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none transition-all ${
                  errors.lastName
                    ? 'border-red-300 focus:border-red-500'
                    : 'border-neutral-300 focus:border-primary-500'
                }`}
              />
            </div>
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="email"
              {...register('email')}
              placeholder="john.doe@example.com"
              className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none transition-all ${
                errors.email
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-neutral-300 focus:border-primary-500'
              }`}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
          <p className="mt-1 text-sm text-neutral-600">Confirmation will be sent to this email</p>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">
            Phone Number *
          </label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="tel"
              {...register('phone')}
              placeholder="+1 (555) 123-4567"
              className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none transition-all ${
                errors.phone
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-neutral-300 focus:border-primary-500'
              }`}
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        {/* Special Requests */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">
            Special Requests (Optional)
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-neutral-400" />
            <textarea
              {...register('specialRequests')}
              rows={4}
              placeholder="Any special requests or requirements? (e.g., early check-in, high floor, etc.)"
              className="w-full pl-12 pr-4 py-4 border-2 border-neutral-300 rounded-xl focus:outline-none focus:border-primary-500 transition-all resize-none"
            />
          </div>
        </div>

        {/* Continue Button */}
        <button
          type="submit"
          className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold text-lg rounded-xl transition-all"
        >
          Continue to Payment
        </button>
      </form>
    </motion.div>
  );
}
