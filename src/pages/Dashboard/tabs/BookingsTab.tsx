import { motion } from 'framer-motion';
import { useState } from 'react';
import { Calendar, Users, Download, Eye, Filter } from 'lucide-react';
import { format } from 'date-fns';

type BookingStatus = 'all' | 'upcoming' | 'past' | 'cancelled';

interface Booking {
  id: string;
  bookingNumber: string;
  roomType: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  status: 'confirmed' | 'completed' | 'cancelled';
  totalAmount: number;
}

export function BookingsTab() {
  const [filter, setFilter] = useState<BookingStatus>('all');

  const bookings: Booking[] = [
    {
      id: '1',
      bookingNumber: 'BK-2025-001234',
      roomType: 'Ocean View Suite',
      checkIn: new Date('2025-01-15'),
      checkOut: new Date('2025-01-18'),
      guests: 2,
      status: 'confirmed',
      totalAmount: 1200,
    },
    {
      id: '2',
      bookingNumber: 'BK-2024-009876',
      roomType: 'Deluxe Room',
      checkIn: new Date('2024-12-20'),
      checkOut: new Date('2024-12-23'),
      guests: 2,
      status: 'completed',
      totalAmount: 900,
    },
    {
      id: '3',
      bookingNumber: 'BK-2024-008765',
      roomType: 'Premium Suite',
      checkIn: new Date('2024-11-10'),
      checkOut: new Date('2024-11-13'),
      guests: 3,
      status: 'completed',
      totalAmount: 1500,
    },
    {
      id: '4',
      bookingNumber: 'BK-2024-007654',
      roomType: 'Standard Room',
      checkIn: new Date('2024-10-05'),
      checkOut: new Date('2024-10-08'),
      guests: 2,
      status: 'cancelled',
      totalAmount: 600,
    },
  ];

  const filteredBookings = bookings.filter((booking) => {
    if (filter === 'all') return true;
    if (filter === 'upcoming') return booking.status === 'confirmed';
    if (filter === 'past') return booking.status === 'completed';
    if (filter === 'cancelled') return booking.status === 'cancelled';
    return true;
  });

  const statusColors = {
    confirmed: 'bg-green-100 text-green-700',
    completed: 'bg-blue-100 text-blue-700',
    cancelled: 'bg-red-100 text-red-700',
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-2 flex-wrap"
      >
        {(['all', 'upcoming', 'past', 'cancelled'] as BookingStatus[]).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
              filter === status
                ? 'bg-primary-600 text-white'
                : 'bg-white border border-neutral-300 text-neutral-700 hover:border-neutral-400'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </motion.div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="border border-neutral-200 rounded-xl p-12 bg-white text-center"
          >
            <Calendar className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-neutral-900 mb-1">No bookings found</h3>
            <p className="text-sm text-neutral-500">No bookings match your current filter.</p>
          </motion.div>
        ) : (
          filteredBookings.map((booking, index) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 + 0.1 }}
              className="border border-neutral-200 rounded-xl p-6 bg-white"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4 pb-4 border-b border-neutral-100">
                <div>
                  <div className="text-xs text-neutral-500 mb-1">Booking Number</div>
                  <div className="font-semibold text-neutral-900">{booking.bookingNumber}</div>
                </div>
                <span className={`px-2.5 py-1 ${statusColors[booking.status]} text-xs font-medium rounded-lg capitalize`}>
                  {booking.status}
                </span>
              </div>

              {/* Room Info */}
              <div className="mb-4">
                <div className="text-sm font-semibold text-neutral-900">{booking.roomType}</div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="text-xs text-neutral-500 mb-1">Check-in</div>
                  <div className="text-sm font-medium text-neutral-900">
                    {format(booking.checkIn, 'MMM dd, yyyy')}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-neutral-500 mb-1">Check-out</div>
                  <div className="text-sm font-medium text-neutral-900">
                    {format(booking.checkOut, 'MMM dd, yyyy')}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-neutral-500 mb-1">Guests</div>
                  <div className="text-sm font-medium text-neutral-900">{booking.guests} Adults</div>
                </div>
              </div>

              {/* Total Amount */}
              <div className="mb-4 pb-4 border-b border-neutral-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-500">Total Amount</span>
                  <span className="text-lg font-bold text-neutral-900">
                    ${booking.totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button className="flex-1 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 text-sm">
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
                <button className="flex-1 py-2.5 bg-white border border-neutral-300 hover:border-neutral-400 text-neutral-900 font-medium rounded-lg transition-colors flex items-center justify-center gap-2 text-sm">
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
