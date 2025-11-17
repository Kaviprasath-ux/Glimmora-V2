import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, Users, Mail, Phone, Download, Home } from 'lucide-react';
import { useBooking } from '@/contexts/BookingContext';
import { format } from 'date-fns';

export function ConfirmationStep() {
  const navigate = useNavigate();
  const { bookingData, calculateTotal } = useBooking();
  const { subtotal, tax, serviceFee, total, nights } = calculateTotal();

  useEffect(() => {
    // Confetti animation or celebration effect could go here
    console.log('Booking confirmed!', bookingData);
  }, [bookingData]);

  if (!bookingData.room || !bookingData.bookingNumber) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-16 h-16 text-green-600" />
        </motion.div>

        <h1 className="text-4xl font-bold text-neutral-900 mb-2">Booking Confirmed!</h1>
        <p className="text-xl text-neutral-600 mb-4">
          Your reservation has been successfully processed
        </p>
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-100 rounded-full">
          <span className="text-sm text-neutral-600">Booking Number:</span>
          <span className="text-lg font-bold text-primary-600">{bookingData.bookingNumber}</span>
        </div>
      </motion.div>

      {/* Booking Details Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6"
      >
        {/* Room Image */}
        <div className="relative h-48">
          <img
            src={bookingData.room.images[0]}
            alt={bookingData.room.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-6">
            <h2 className="text-2xl font-bold text-white">{bookingData.room.name}</h2>
          </div>
        </div>

        {/* Details Grid */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Check-in/out */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <div className="text-sm text-neutral-600 mb-1">Check-in & Check-out</div>
                <div className="font-semibold text-neutral-900">
                  {format(new Date(bookingData.checkIn), 'MMM dd, yyyy')} - {format(new Date(bookingData.checkOut), 'MMM dd, yyyy')}
                </div>
                <div className="text-sm text-neutral-600">{nights} {nights === 1 ? 'night' : 'nights'}</div>
              </div>
            </div>

            {/* Guests */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <div className="text-sm text-neutral-600 mb-1">Guests</div>
                <div className="font-semibold text-neutral-900">
                  {bookingData.guests.adults} {bookingData.guests.adults === 1 ? 'Adult' : 'Adults'}
                  {bookingData.guests.children > 0 && `, ${bookingData.guests.children} ${bookingData.guests.children === 1 ? 'Child' : 'Children'}`}
                </div>
              </div>
            </div>

            {/* Guest Info */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <div className="text-sm text-neutral-600 mb-1">Email</div>
                <div className="font-semibold text-neutral-900">{bookingData.guestInfo.email}</div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <div className="text-sm text-neutral-600 mb-1">Phone</div>
                <div className="font-semibold text-neutral-900">{bookingData.guestInfo.phone}</div>
              </div>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="border-t border-neutral-200 pt-6">
            <h3 className="font-semibold text-neutral-900 mb-4">Payment Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-neutral-700">
                <span>${bookingData.room.price} x {nights} {nights === 1 ? 'night' : 'nights'}</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-neutral-700">
                <span>Service Fee</span>
                <span>${serviceFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-neutral-700">
                <span>Taxes</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-neutral-900 pt-2 border-t border-neutral-200">
                <span>Total Paid</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Next Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-primary-50 border border-primary-200 rounded-2xl p-6 mb-6"
      >
        <h3 className="font-bold text-primary-900 mb-3">What's Next?</h3>
        <ul className="space-y-2 text-primary-800">
          <li className="flex items-start gap-2">
            <span className="font-bold mt-0.5">•</span>
            <span>Confirmation email sent to {bookingData.guestInfo.email}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold mt-0.5">•</span>
            <span>You'll receive a pre-check-in link 24 hours before arrival</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold mt-0.5">•</span>
            <span>Complete pre-check-in online to skip the front desk</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold mt-0.5">•</span>
            <span>Your digital room key will be activated upon pre-check-in</span>
          </li>
        </ul>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <button
          onClick={() => {
            // Download confirmation PDF
            alert('Downloading confirmation...');
          }}
          className="flex-1 py-4 bg-white border-2 border-neutral-300 hover:border-primary-500 text-neutral-900 font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <Download className="w-5 h-5" />
          Download Confirmation
        </button>

        <button
          onClick={() => navigate('/')}
          className="flex-1 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <Home className="w-5 h-5" />
          Return to Home
        </button>
      </motion.div>
    </div>
  );
}
