import { motion } from 'framer-motion';
import { Calendar, Users, Star } from 'lucide-react';
import { useBooking } from '@/contexts/BookingContext';
import { format } from 'date-fns';

export function BookingSummary() {
  const { bookingData, calculateTotal } = useBooking();
  const { subtotal, tax, serviceFee, total, nights } = calculateTotal();

  if (!bookingData.room) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-lg sticky top-24"
    >
      {/* Room Preview */}
      <div className="flex gap-4 mb-6">
        <img
          src={bookingData.room.images[0]}
          alt={bookingData.room.name}
          className="w-24 h-24 rounded-xl object-cover"
        />
        <div className="flex-1">
          <h3 className="font-bold text-lg text-neutral-900 mb-1">
            {bookingData.room.name}
          </h3>
          {bookingData.room.rating && (
            <div className="flex items-center gap-1 text-sm">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{bookingData.room.rating}</span>
              {bookingData.room.reviewCount && (
                <span className="text-neutral-600">({bookingData.room.reviewCount})</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Dates & Guests */}
      {bookingData.checkIn && bookingData.checkOut && (
        <div className="space-y-3 mb-6 pb-6 border-b border-neutral-200">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-neutral-600">
              <Calendar className="w-4 h-4" />
              <span>Check-in</span>
            </div>
            <span className="font-semibold">
              {format(new Date(bookingData.checkIn), 'MMM dd, yyyy')}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-neutral-600">
              <Calendar className="w-4 h-4" />
              <span>Check-out</span>
            </div>
            <span className="font-semibold">
              {format(new Date(bookingData.checkOut), 'MMM dd, yyyy')}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-neutral-600">
              <Users className="w-4 h-4" />
              <span>Guests</span>
            </div>
            <span className="font-semibold">
              {bookingData.guests.adults + bookingData.guests.children}
            </span>
          </div>
        </div>
      )}

      {/* Price Breakdown */}
      {nights > 0 && (
        <div className="space-y-3">
          <h4 className="font-semibold text-neutral-900">Price Details</h4>

          <div className="space-y-2 text-sm">
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
          </div>

          <div className="flex justify-between text-lg font-bold pt-3 border-t border-neutral-200">
            <span>Total</span>
            <span className="text-primary-600">${total.toFixed(2)}</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
