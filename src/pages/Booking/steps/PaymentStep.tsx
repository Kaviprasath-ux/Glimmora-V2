import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { CreditCard, Lock, MapPin, Shield, CheckCircle, Calendar, User, Building2, ArrowRight } from 'lucide-react';
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
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
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
    setIsProcessing(true);

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

  // Watch fields for validation feedback
  const cardNumber = watch('cardNumber');
  const cardName = watch('cardName');
  const expiryDate = watch('expiryDate');
  const cvv = watch('cvv');
  const billingAddress = watch('billingAddress');
  const city = watch('city');
  const zipCode = watch('zipCode');
  const country = watch('country');

  const isFieldValid = (fieldName: string, value: any) => {
    return value && value.length > 0 && !errors[fieldName as keyof typeof errors];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-8 sm:p-10 border border-neutral-200 shadow-lg"
    >
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-primary-600 flex items-center justify-center shadow-md">
            <CreditCard className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900">Payment Details</h2>
          </div>
        </div>
        <p className="text-base text-neutral-600 font-medium">
          Your payment information is secure and encrypted
        </p>

        {/* Security Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-3 mt-5 px-4 py-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl"
        >
          <Shield className="w-5 h-5 text-green-600 flex-shrink-0" strokeWidth={2.5} />
          <div className="flex-1">
            <p className="text-sm font-bold text-green-900">Secure SSL Encrypted Payment</p>
            <p className="text-xs text-green-700 mt-0.5">256-bit encryption protects your data</p>
          </div>
        </motion.div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Card Number */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <label className="block text-sm font-semibold text-neutral-900 mb-2">
            Card Number <span className="text-red-500">*</span>
          </label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <CreditCard className={`w-5 h-5 transition-colors ${
                isFieldValid('cardNumber', cardNumber)
                  ? 'text-green-500'
                  : errors.cardNumber
                    ? 'text-red-500'
                    : 'text-neutral-400 group-focus-within:text-primary-600'
              }`} strokeWidth={2} />
            </div>
            <input
              type="text"
              {...register('cardNumber', {
                onChange: (e) => {
                  const formatted = formatCardNumber(e.target.value);
                  e.target.value = formatted;
                  setValue('cardNumber', formatted.replace(/\s/g, ''));
                }
              })}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className={`w-full pl-12 pr-12 py-4 border rounded-lg focus:outline-none focus:ring-2 transition-all font-medium ${
                errors.cardNumber
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20 bg-red-50'
                  : isFieldValid('cardNumber', cardNumber)
                    ? 'border-green-300 focus:border-green-500 focus:ring-green-500/20 bg-green-50'
                    : 'border-neutral-200 focus:border-primary-500 focus:ring-primary-500/20 bg-neutral-50'
              }`}
            />
            {isFieldValid('cardNumber', cardNumber) && (
              <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" strokeWidth={2} />
            )}
          </div>
          <AnimatePresence>
            {errors.cardNumber && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-2 text-sm text-red-600 font-medium"
              >
                {errors.cardNumber.message}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Name on Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-sm font-semibold text-neutral-900 mb-2">
            Name on Card <span className="text-red-500">*</span>
          </label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <User className={`w-5 h-5 transition-colors ${
                isFieldValid('cardName', cardName)
                  ? 'text-green-500'
                  : errors.cardName
                    ? 'text-red-500'
                    : 'text-neutral-400 group-focus-within:text-primary-600'
              }`} strokeWidth={2} />
            </div>
            <input
              type="text"
              {...register('cardName')}
              placeholder="JOHN DOE"
              className={`w-full pl-12 pr-12 py-4 border rounded-lg focus:outline-none focus:ring-2 transition-all font-medium uppercase ${
                errors.cardName
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20 bg-red-50'
                  : isFieldValid('cardName', cardName)
                    ? 'border-green-300 focus:border-green-500 focus:ring-green-500/20 bg-green-50'
                    : 'border-neutral-200 focus:border-primary-500 focus:ring-primary-500/20 bg-neutral-50'
              }`}
            />
            {isFieldValid('cardName', cardName) && (
              <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" strokeWidth={2} />
            )}
          </div>
          <AnimatePresence>
            {errors.cardName && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-2 text-sm text-red-600 font-medium"
              >
                {errors.cardName.message}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Expiry & CVV */}
        <div className="grid grid-cols-2 gap-6">
          {/* Expiry Date */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
          >
            <label className="block text-sm font-semibold text-neutral-900 mb-2">
              Expiry Date <span className="text-red-500">*</span>
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <Calendar className={`w-5 h-5 transition-colors ${
                  isFieldValid('expiryDate', expiryDate)
                    ? 'text-green-500'
                    : errors.expiryDate
                      ? 'text-red-500'
                      : 'text-neutral-400 group-focus-within:text-primary-600'
                }`} strokeWidth={2} />
              </div>
              <input
                type="text"
                {...register('expiryDate', {
                  onChange: (e) => {
                    const formatted = formatExpiryDate(e.target.value);
                    e.target.value = formatted;
                    setValue('expiryDate', formatted);
                  }
                })}
                placeholder="MM/YY"
                maxLength={5}
                className={`w-full pl-12 pr-12 py-4 border rounded-lg focus:outline-none focus:ring-2 transition-all font-medium ${
                  errors.expiryDate
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20 bg-red-50'
                    : isFieldValid('expiryDate', expiryDate)
                      ? 'border-green-300 focus:border-green-500 focus:ring-green-500/20 bg-green-50'
                      : 'border-neutral-200 focus:border-primary-500 focus:ring-primary-500/20 bg-neutral-50'
                }`}
              />
              {isFieldValid('expiryDate', expiryDate) && (
                <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" strokeWidth={2} />
              )}
            </div>
            <AnimatePresence>
              {errors.expiryDate && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-2 text-sm text-red-600 font-medium"
                >
                  {errors.expiryDate.message}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* CVV */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-sm font-semibold text-neutral-900 mb-2">
              CVV <span className="text-red-500">*</span>
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <Lock className={`w-5 h-5 transition-colors ${
                  isFieldValid('cvv', cvv)
                    ? 'text-green-500'
                    : errors.cvv
                      ? 'text-red-500'
                      : 'text-neutral-400 group-focus-within:text-primary-600'
                }`} strokeWidth={2} />
              </div>
              <input
                type="text"
                {...register('cvv')}
                placeholder="123"
                maxLength={4}
                className={`w-full pl-12 pr-12 py-4 border rounded-lg focus:outline-none focus:ring-2 transition-all font-medium ${
                  errors.cvv
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20 bg-red-50'
                    : isFieldValid('cvv', cvv)
                      ? 'border-green-300 focus:border-green-500 focus:ring-green-500/20 bg-green-50'
                      : 'border-neutral-200 focus:border-primary-500 focus:ring-primary-500/20 bg-neutral-50'
                }`}
              />
              {isFieldValid('cvv', cvv) && (
                <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" strokeWidth={2} />
              )}
            </div>
            <AnimatePresence>
              {errors.cvv && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-2 text-sm text-red-600 font-medium"
                >
                  {errors.cvv.message}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Billing Address */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="pt-6 border-t border-neutral-200"
        >
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-primary-600" strokeWidth={2.5} />
            <h3 className="text-lg font-bold text-neutral-900">Billing Address</h3>
          </div>

          {/* Street Address */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-neutral-900 mb-2">
              Street Address <span className="text-red-500">*</span>
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <MapPin className={`w-5 h-5 transition-colors ${
                  isFieldValid('billingAddress', billingAddress)
                    ? 'text-green-500'
                    : errors.billingAddress
                      ? 'text-red-500'
                      : 'text-neutral-400 group-focus-within:text-primary-600'
                }`} strokeWidth={2} />
              </div>
              <input
                type="text"
                {...register('billingAddress')}
                placeholder="123 Main Street"
                className={`w-full pl-12 pr-12 py-4 border rounded-lg focus:outline-none focus:ring-2 transition-all font-medium ${
                  errors.billingAddress
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20 bg-red-50'
                    : isFieldValid('billingAddress', billingAddress)
                      ? 'border-green-300 focus:border-green-500 focus:ring-green-500/20 bg-green-50'
                      : 'border-neutral-200 focus:border-primary-500 focus:ring-primary-500/20 bg-neutral-50'
                }`}
              />
              {isFieldValid('billingAddress', billingAddress) && (
                <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" strokeWidth={2} />
              )}
            </div>
            <AnimatePresence>
              {errors.billingAddress && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-2 text-sm text-red-600 font-medium"
                >
                  {errors.billingAddress.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* City, ZIP, Country */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* City */}
            <div>
              <label className="block text-sm font-semibold text-neutral-900 mb-2">
                City <span className="text-red-500">*</span>
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Building2 className={`w-5 h-5 transition-colors ${
                    isFieldValid('city', city)
                      ? 'text-green-500'
                      : errors.city
                        ? 'text-red-500'
                        : 'text-neutral-400 group-focus-within:text-primary-600'
                  }`} strokeWidth={2} />
                </div>
                <input
                  type="text"
                  {...register('city')}
                  placeholder="San Francisco"
                  className={`w-full pl-12 pr-12 py-4 border rounded-lg focus:outline-none focus:ring-2 transition-all font-medium ${
                    errors.city
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20 bg-red-50'
                      : isFieldValid('city', city)
                        ? 'border-green-300 focus:border-green-500 focus:ring-green-500/20 bg-green-50'
                        : 'border-neutral-200 focus:border-primary-500 focus:ring-primary-500/20 bg-neutral-50'
                  }`}
                />
                {isFieldValid('city', city) && (
                  <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" strokeWidth={2} />
                )}
              </div>
              <AnimatePresence>
                {errors.city && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-2 text-sm text-red-600 font-medium"
                  >
                    {errors.city.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* ZIP Code */}
            <div>
              <label className="block text-sm font-semibold text-neutral-900 mb-2">
                ZIP Code <span className="text-red-500">*</span>
              </label>
              <div className="relative group">
                <input
                  type="text"
                  {...register('zipCode')}
                  placeholder="94102"
                  className={`w-full px-4 py-4 border rounded-lg focus:outline-none focus:ring-2 transition-all font-medium ${
                    errors.zipCode
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20 bg-red-50'
                      : isFieldValid('zipCode', zipCode)
                        ? 'border-green-300 focus:border-green-500 focus:ring-green-500/20 bg-green-50'
                        : 'border-neutral-200 focus:border-primary-500 focus:ring-primary-500/20 bg-neutral-50'
                  }`}
                />
                {isFieldValid('zipCode', zipCode) && (
                  <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" strokeWidth={2} />
                )}
              </div>
              <AnimatePresence>
                {errors.zipCode && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-2 text-sm text-red-600 font-medium"
                  >
                    {errors.zipCode.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-semibold text-neutral-900 mb-2">
                Country <span className="text-red-500">*</span>
              </label>
              <div className="relative group">
                <select
                  {...register('country')}
                  className={`w-full px-4 py-4 border rounded-lg focus:outline-none focus:ring-2 transition-all font-medium appearance-none ${
                    errors.country
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20 bg-red-50'
                      : isFieldValid('country', country)
                        ? 'border-green-300 focus:border-green-500 focus:ring-green-500/20 bg-green-50'
                        : 'border-neutral-200 focus:border-primary-500 focus:ring-primary-500/20 bg-neutral-50'
                  }`}
                >
                  <option value="">Select Country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="AU">Australia</option>
                </select>
                {isFieldValid('country', country) && (
                  <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" strokeWidth={2} />
                )}
              </div>
              <AnimatePresence>
                {errors.country && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-2 text-sm text-red-600 font-medium"
                  >
                    {errors.country.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isProcessing}
          whileHover={{ scale: isProcessing ? 1 : 1.01 }}
          whileTap={{ scale: isProcessing ? 1 : 0.99 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`w-full py-5 bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg rounded-lg transition-all shadow-lg flex items-center justify-center gap-3 group ${
            isProcessing ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Processing Payment...</span>
            </>
          ) : (
            <>
              <Lock className="w-5 h-5 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
              <span>Complete Booking</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
            </>
          )}
        </motion.button>

        {/* Terms & Conditions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <p className="text-sm text-neutral-600 font-medium">
            By completing this booking, you agree to our{' '}
            <span className="text-primary-600 font-semibold">Terms & Conditions</span>
          </p>
        </motion.div>
      </form>
    </motion.div>
  );
}
