import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CreditCard, Lock, MapPin } from 'lucide-react';
import { useBooking } from '@/contexts/BookingContext';

const paymentSchema = z.object({
  cardNumber: z.string().regex(/^\d{16}$/, 'Card number must be 16 digits'),
  cardName: z.string().min(3, 'Name on card is required'),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Format: MM/YY'),
  cvv: z.string().regex(/^\d{3,4}$/, 'CVV must be 3 or 4 digits'),
  billingAddress: z.string().min(5, 'Billing address is required'),
  city: z.string().min(2, 'City is required'),
  zipCode: z.string().min(5, 'ZIP code is required'),
  country: z.string().min(2, 'Country is required'),
});

interface PaymentStepProps {
  onNext: () => void;
}

export function PaymentStep({ onNext }: PaymentStepProps) {
  const { bookingData, updateBookingData } = useBooking();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(paymentSchema),
    defaultValues: bookingData.payment,
  });

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  const onSubmit = async (data: any) => {
    // Simulate payment processing
    const bookingNumber = `TRS-${Date.now().toString(36).toUpperCase()}`;

    updateBookingData({
      payment: data,
      bookingNumber,
    });

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-8 shadow-sm"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-neutral-900 mb-2">Payment Details</h2>
        <p className="text-neutral-600">Your payment information is secure and encrypted</p>

        {/* Security Badge */}
        <div className="flex items-center gap-2 mt-4 px-4 py-2 bg-green-50 border border-green-200 rounded-lg inline-flex">
          <Lock className="w-4 h-4 text-green-600" />
          <span className="text-sm text-green-700 font-medium">Secure SSL Encrypted Payment</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Card Number */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">
            Card Number *
          </label>
          <div className="relative">
            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              {...register('cardNumber')}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              onChange={(e) => {
                const formatted = formatCardNumber(e.target.value);
                e.target.value = formatted;
                setValue('cardNumber', formatted.replace(/\s/g, ''));
              }}
              className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none transition-all ${
                errors.cardNumber
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-neutral-300 focus:border-primary-500'
              }`}
            />
          </div>
          {errors.cardNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.cardNumber.message}</p>
          )}
        </div>

        {/* Name on Card */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">
            Name on Card *
          </label>
          <input
            type="text"
            {...register('cardName')}
            placeholder="JOHN DOE"
            className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none transition-all uppercase ${
              errors.cardName
                ? 'border-red-300 focus:border-red-500'
                : 'border-neutral-300 focus:border-primary-500'
            }`}
          />
          {errors.cardName && (
            <p className="mt-1 text-sm text-red-600">{errors.cardName.message}</p>
          )}
        </div>

        {/* Expiry & CVV */}
        <div className="grid grid-cols-2 gap-6">
          {/* Expiry Date */}
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">
              Expiry Date *
            </label>
            <input
              type="text"
              {...register('expiryDate')}
              placeholder="MM/YY"
              maxLength={5}
              onChange={(e) => {
                const formatted = formatExpiryDate(e.target.value);
                e.target.value = formatted;
                setValue('expiryDate', formatted);
              }}
              className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none transition-all ${
                errors.expiryDate
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-neutral-300 focus:border-primary-500'
              }`}
            />
            {errors.expiryDate && (
              <p className="mt-1 text-sm text-red-600">{errors.expiryDate.message}</p>
            )}
          </div>

          {/* CVV */}
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">
              CVV *
            </label>
            <input
              type="text"
              {...register('cvv')}
              placeholder="123"
              maxLength={4}
              className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none transition-all ${
                errors.cvv
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-neutral-300 focus:border-primary-500'
              }`}
            />
            {errors.cvv && (
              <p className="mt-1 text-sm text-red-600">{errors.cvv.message}</p>
            )}
          </div>
        </div>

        {/* Billing Address */}
        <div className="pt-6 border-t border-neutral-200">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Billing Address</h3>

          {/* Street Address */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-neutral-700 mb-2">
              Street Address *
            </label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                {...register('billingAddress')}
                placeholder="123 Main Street"
                className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none transition-all ${
                  errors.billingAddress
                    ? 'border-red-300 focus:border-red-500'
                    : 'border-neutral-300 focus:border-primary-500'
                }`}
              />
            </div>
            {errors.billingAddress && (
              <p className="mt-1 text-sm text-red-600">{errors.billingAddress.message}</p>
            )}
          </div>

          {/* City, ZIP, Country */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* City */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                City *
              </label>
              <input
                type="text"
                {...register('city')}
                placeholder="San Francisco"
                className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none transition-all ${
                  errors.city
                    ? 'border-red-300 focus:border-red-500'
                    : 'border-neutral-300 focus:border-primary-500'
                }`}
              />
              {errors.city && (
                <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
              )}
            </div>

            {/* ZIP Code */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                ZIP Code *
              </label>
              <input
                type="text"
                {...register('zipCode')}
                placeholder="94102"
                className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none transition-all ${
                  errors.zipCode
                    ? 'border-red-300 focus:border-red-500'
                    : 'border-neutral-300 focus:border-primary-500'
                }`}
              />
              {errors.zipCode && (
                <p className="mt-1 text-sm text-red-600">{errors.zipCode.message}</p>
              )}
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Country *
              </label>
              <select
                {...register('country')}
                className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none transition-all ${
                  errors.country
                    ? 'border-red-300 focus:border-red-500'
                    : 'border-neutral-300 focus:border-primary-500'
                }`}
              >
                <option value="">Select</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="UK">United Kingdom</option>
                <option value="AU">Australia</option>
              </select>
              {errors.country && (
                <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold text-lg rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <Lock className="w-5 h-5" />
          Complete Booking
        </button>

        <p className="text-center text-sm text-neutral-600">
          By completing this booking, you agree to our Terms & Conditions
        </p>
      </form>
    </motion.div>
  );
}
