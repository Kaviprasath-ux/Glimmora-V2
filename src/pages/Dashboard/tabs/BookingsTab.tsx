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
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-8 shadow-sm"
      >
        <h2 className="text-3xl font-bold text-neutral-900 mb-2">My Bookings</h2>
        <p className="text-neutral-600">View and manage all your reservations</p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-6 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-neutral-600" />
          <h3 className="font-semibold text-neutral-900">Filter Bookings</h3>
        </div>
        <div className="flex gap-3 flex-wrap">
          {(['all', 'upcoming', 'past', 'cancelled'] as BookingStatus[]).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === status
                  ? 'bg-primary-600 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-12 shadow-sm text-center"
          >
            <Calendar className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-neutral-900 mb-2">No bookings found</h3>
            <p className="text-neutral-600">No bookings match your current filter.</p>
          </motion.div>
        ) : (
          filteredBookings.map((booking, index) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="text-sm text-neutral-600 mb-1">Booking Number</div>
                  <div className="font-bold text-lg text-neutral-900">{booking.bookingNumber}</div>
                </div>
                <span className={`px-3 py-1 ${statusColors[booking.status]} text-sm font-medium rounded-full capitalize`}>
                  {booking.status}
                </span>
              </div>

              {/* Room Info */}
              <div className="mb-6">
                <div className="text-sm text-neutral-600 mb-1">Room Type</div>
                <div className="font-semibold text-neutral-900 text-lg">{booking.roomType}</div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-neutral-50 rounded-xl mb-6">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-primary-600 mt-0.5" />
                  <div>
                    <div className="text-sm text-neutral-600">Check-in</div>
                    <div className="font-semibold text-neutral-900">
                      {format(booking.checkIn, 'MMM dd, yyyy')}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-primary-600 mt-0.5" />
                  <div>
                    <div className="text-sm text-neutral-600">Check-out</div>
                    <div className="font-semibold text-neutral-900">
                      {format(booking.checkOut, 'MMM dd, yyyy')}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-primary-600 mt-0.5" />
                  <div>
                    <div className="text-sm text-neutral-600">Guests</div>
                    <div className="font-semibold text-neutral-900">{booking.guests} Adults</div>
                  </div>
                </div>
              </div>

              {/* Total Amount */}
              <div className="mb-6 p-4 bg-primary-50 border border-primary-200 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-700 font-medium">Total Amount</span>
                  <span className="text-2xl font-bold text-primary-600">
                    ${booking.totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button className="flex-1 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2">
                  <Eye className="w-5 h-5" />
                  View Details
                </button>
                <button className="flex-1 py-3 bg-white border-2 border-neutral-300 hover:border-primary-500 text-neutral-900 font-semibold rounded-xl transition-all flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />
                  Download Invoice
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
