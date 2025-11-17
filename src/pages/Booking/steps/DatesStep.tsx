import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calendar, Plus, Minus, CheckCircle } from 'lucide-react';
import { useBooking } from '@/contexts/BookingContext';
import { format } from 'date-fns';

const datesSchema = z.object({
  checkIn: z.string().min(1, 'Check-in date is required'),
  checkOut: z.string().min(1, 'Check-out date is required'),
}).refine(data => {
  if (data.checkIn && data.checkOut) {
    return new Date(data.checkOut) > new Date(data.checkIn);
  }
  return true;
}, {
  message: 'Check-out must be after check-in',
  path: ['checkOut'],
});

interface DatesStepProps {
  onNext: () => void;
}

export function DatesStep({ onNext }: DatesStepProps) {
  const { bookingData, updateBookingData, calculateTotal } = useBooking();
  const { nights } = calculateTotal();

  // Check if dates are pre-filled
  const hasPreFilledDates = bookingData.checkIn && bookingData.checkOut;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(datesSchema),
    defaultValues: {
      checkIn: bookingData.checkIn,
      checkOut: bookingData.checkOut,
    },
  });

  const onSubmit = (data: any) => {
    updateBookingData({
      checkIn: data.checkIn,
      checkOut: data.checkOut,
    });
    onNext();
  };

  const updateGuests = (type: 'adults' | 'children', change: number) => {
    const current = bookingData.guests[type];
    const newValue = Math.max(type === 'adults' ? 1 : 0, Math.min(bookingData.room!.maxGuests, current + change));

    updateBookingData({
      guests: {
        ...bookingData.guests,
        [type]: newValue,
      },
    });
  };

  const today = new Date().toISOString().split('T')[0];
  const checkInDate = watch('checkIn');
  const minCheckOut = checkInDate || today;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-8 shadow-sm"
    >
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-neutral-900 mb-2">
          {hasPreFilledDates ? 'Confirm Your Dates' : 'Select Your Dates'}
        </h2>
        <p className="text-neutral-600">
          {hasPreFilledDates
            ? 'Your dates are pre-filled from your search. You can modify them if needed.'
            : 'Choose your check-in and check-out dates, and number of guests'
          }
        </p>
      </div>

      {/* Pre-filled Confirmation Card */}
      {hasPreFilledDates && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl"
        >
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-green-900 mb-2">Dates from Your Search</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-green-700 font-medium mb-1">Check-in</div>
                  <div className="text-green-900 font-semibold">
                    {format(new Date(bookingData.checkIn), 'EEEE, MMM dd, yyyy')}
                  </div>
                </div>
                <div>
                  <div className="text-green-700 font-medium mb-1">Check-out</div>
                  <div className="text-green-900 font-semibold">
                    {format(new Date(bookingData.checkOut), 'EEEE, MMM dd, yyyy')}
                  </div>
                </div>
              </div>
              <div className="mt-2 text-sm text-green-700">
                <strong>{nights}</strong> {nights === 1 ? 'night' : 'nights'} •
                <strong className="ml-1">{bookingData.guests.adults + bookingData.guests.children}</strong> guests
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Date Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Check-in */}
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">
              Check-in Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="date"
                min={today}
                {...register('checkIn')}
                className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none transition-all ${
                  errors.checkIn
                    ? 'border-red-300 focus:border-red-500'
                    : hasPreFilledDates
                      ? 'border-green-300 focus:border-green-500 bg-green-50'
                      : 'border-neutral-300 focus:border-primary-500'
                }`}
              />
            </div>
            {errors.checkIn && (
              <p className="mt-1 text-sm text-red-600">{errors.checkIn.message}</p>
            )}
          </div>

          {/* Check-out */}
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">
              Check-out Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="date"
                min={minCheckOut}
                {...register('checkOut')}
                className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none transition-all ${
                  errors.checkOut
                    ? 'border-red-300 focus:border-red-500'
                    : hasPreFilledDates
                      ? 'border-green-300 focus:border-green-500 bg-green-50'
                      : 'border-neutral-300 focus:border-primary-500'
                }`}
              />
            </div>
            {errors.checkOut && (
              <p className="mt-1 text-sm text-red-600">{errors.checkOut.message}</p>
            )}
          </div>
        </div>

        {/* Guest Selection */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-4">
            Number of Guests
          </label>
          <div className="space-y-4">
            {/* Adults */}
            <div className={`flex items-center justify-between p-4 rounded-xl ${
              hasPreFilledDates ? 'bg-green-50 border-2 border-green-200' : 'bg-neutral-50'
            }`}>
              <div>
                <div className="font-semibold text-neutral-900">Adults</div>
                <div className="text-sm text-neutral-600">Age 13+</div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => updateGuests('adults', -1)}
                  disabled={bookingData.guests.adults <= 1}
                  className="w-10 h-10 rounded-full border-2 border-neutral-300 flex items-center justify-center hover:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-semibold text-lg">
                  {bookingData.guests.adults}
                </span>
                <button
                  type="button"
                  onClick={() => updateGuests('adults', 1)}
                  disabled={bookingData.guests.adults + bookingData.guests.children >= bookingData.room!.maxGuests}
                  className="w-10 h-10 rounded-full border-2 border-neutral-300 flex items-center justify-center hover:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Children */}
            <div className={`flex items-center justify-between p-4 rounded-xl ${
              hasPreFilledDates ? 'bg-green-50 border-2 border-green-200' : 'bg-neutral-50'
            }`}>
              <div>
                <div className="font-semibold text-neutral-900">Children</div>
                <div className="text-sm text-neutral-600">Age 0-12</div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => updateGuests('children', -1)}
                  disabled={bookingData.guests.children <= 0}
                  className="w-10 h-10 rounded-full border-2 border-neutral-300 flex items-center justify-center hover:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-semibold text-lg">
                  {bookingData.guests.children}
                </span>
                <button
                  type="button"
                  onClick={() => updateGuests('children', 1)}
                  disabled={bookingData.guests.adults + bookingData.guests.children >= bookingData.room!.maxGuests}
                  className="w-10 h-10 rounded-full border-2 border-neutral-300 flex items-center justify-center hover:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          <p className="mt-2 text-sm text-neutral-600">
            Maximum {bookingData.room!.maxGuests} guests for this room
          </p>
        </div>

        {/* Continue Button */}
        <button
          type="submit"
          className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold text-lg rounded-xl transition-all"
        >
          {hasPreFilledDates ? 'Confirm & Continue' : 'Continue to Guest Information'}
        </button>
      </form>
    </motion.div>
  );
}
