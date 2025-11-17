import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Clock, Plane, Briefcase, Car } from 'lucide-react';
import { usePreCheckIn } from '@/contexts/PreCheckInContext';

const travelSchema = z.object({
  arrivalTime: z.string().min(1, 'Arrival time required'),
  flightNumber: z.string().optional(),
  purpose: z.enum(['business', 'leisure', 'event', 'other']),
  transportationNeeded: z.boolean(),
});

interface TravelDetailsStepProps {
  onNext: () => void;
}

export function TravelDetailsStep({ onNext }: TravelDetailsStepProps) {
  const { preCheckInData, updatePreCheckInData } = usePreCheckIn();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(travelSchema),
    defaultValues: preCheckInData.travelDetails,
  });

  const onSubmit = (data: any) => {
    updatePreCheckInData({ travelDetails: data });
    onNext();
  };

  const transportationNeeded = watch('transportationNeeded');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-8 shadow-sm"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-neutral-900 mb-2">Travel Details</h2>
        <p className="text-neutral-600">Help us prepare for your arrival</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Arrival Time */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">
            Expected Arrival Time *
          </label>
          <div className="relative">
            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="time"
              {...register('arrivalTime')}
              className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none transition-all ${
                errors.arrivalTime ? 'border-red-300' : 'border-neutral-300 focus:border-primary-500'
              }`}
            />
          </div>
          {errors.arrivalTime && (
            <p className="mt-1 text-sm text-red-600">{errors.arrivalTime.message}</p>
          )}
        </div>

        {/* Flight Number */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">
            Flight Number (Optional)
          </label>
          <div className="relative">
            <Plane className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="e.g., UA1234"
              {...register('flightNumber')}
              className="w-full pl-12 pr-4 py-4 border-2 border-neutral-300 rounded-xl focus:outline-none focus:border-primary-500 transition-all"
            />
          </div>
        </div>

        {/* Travel Purpose */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-3">
            Purpose of Visit *
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: 'business', label: 'Business', icon: Briefcase },
              { value: 'leisure', label: 'Leisure', icon: '🏖️' },
              { value: 'event', label: 'Event', icon: '🎉' },
              { value: 'other', label: 'Other', icon: '📍' },
            ].map((purpose) => (
              <label
                key={purpose.value}
                className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  watch('purpose') === purpose.value
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-neutral-300 hover:border-primary-300'
                }`}
              >
                <input
                  type="radio"
                  value={purpose.value}
                  {...register('purpose')}
                  className="sr-only"
                />
                <div className="flex items-center gap-3">
                  {typeof purpose.icon === 'string' ? (
                    <span className="text-2xl">{purpose.icon}</span>
                  ) : (
                    <purpose.icon className="w-6 h-6" />
                  )}
                  <span className="font-semibold">{purpose.label}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Transportation */}
        <div>
          <label className="flex items-start gap-3 p-4 border-2 border-neutral-300 rounded-xl cursor-pointer hover:border-primary-300 transition-all">
            <input
              type="checkbox"
              {...register('transportationNeeded')}
              className="mt-1 w-5 h-5 text-primary-600 rounded"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 font-semibold text-neutral-900 mb-1">
                <Car className="w-5 h-5" />
                Airport Transportation
              </div>
              <p className="text-sm text-neutral-600">
                I need transportation from the airport to the hotel
              </p>
            </div>
          </label>
        </div>

        {transportationNeeded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="p-4 bg-primary-50 border border-primary-200 rounded-xl"
          >
            <p className="text-sm text-primary-900">
              <strong>Transportation arranged!</strong> Our concierge will contact you 24 hours before arrival with details.
            </p>
          </motion.div>
        )}

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
