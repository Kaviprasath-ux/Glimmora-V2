import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { usePreCheckIn } from '@/contexts/PreCheckInContext';

const personalInfoSchema = z.object({
  email: z.string().email('Valid email required'),
  phone: z.string().min(10, 'Valid phone number required'),
  address: z.string().min(5, 'Address required'),
  city: z.string().min(2, 'City required'),
  zipCode: z.string().min(5, 'ZIP code required'),
  country: z.string().min(2, 'Country required'),
});

interface PersonalInfoStepProps {
  onNext: () => void;
}

export function PersonalInfoStep({ onNext }: PersonalInfoStepProps) {
  const { preCheckInData, updatePreCheckInData } = usePreCheckIn();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: preCheckInData.personalInfo,
  });

  const onSubmit = (data: any) => {
    updatePreCheckInData({ personalInfo: data });
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-8 shadow-sm"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-neutral-900 mb-2">Personal Information</h2>
        <p className="text-neutral-600">Please confirm your contact details</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="email"
              {...register('email')}
              className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none transition-all ${
                errors.email ? 'border-red-300' : 'border-neutral-300 focus:border-primary-500'
              }`}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">
            Phone Number *
          </label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="tel"
              {...register('phone')}
              className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none transition-all ${
                errors.phone ? 'border-red-300' : 'border-neutral-300 focus:border-primary-500'
              }`}
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">
            Street Address *
          </label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              {...register('address')}
              className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none transition-all ${
                errors.address ? 'border-red-300' : 'border-neutral-300 focus:border-primary-500'
              }`}
            />
          </div>
          {errors.address && (
            <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">
              City *
            </label>
            <input
              type="text"
              {...register('city')}
              className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none transition-all ${
                errors.city ? 'border-red-300' : 'border-neutral-300 focus:border-primary-500'
              }`}
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">
              ZIP Code *
            </label>
            <input
              type="text"
              {...register('zipCode')}
              className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none transition-all ${
                errors.zipCode ? 'border-red-300' : 'border-neutral-300 focus:border-primary-500'
              }`}
            />
            {errors.zipCode && (
              <p className="mt-1 text-sm text-red-600">{errors.zipCode.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">
              Country *
            </label>
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 z-10" />
              <select
                {...register('country')}
                className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none transition-all appearance-none bg-white ${
                  errors.country ? 'border-red-300' : 'border-neutral-300 focus:border-primary-500'
                }`}
              >
                <option value="">Select</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="UK">United Kingdom</option>
                <option value="AU">Australia</option>
              </select>
            </div>
            {errors.country && (
              <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold text-lg rounded-xl transition-all"
        >
          Continue
        </button>
      </form>
    </motion.div>
  );
}
