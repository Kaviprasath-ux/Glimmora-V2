import { useState } from 'react';
import { X, Calendar, Users, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '@/contexts/AdminContext';
import type { Booking } from '@/contexts/AdminContext';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking?: Booking;
  mode: 'create' | 'edit';
}

export function BookingModal({ isOpen, onClose, booking, mode }: BookingModalProps) {
  const { addBooking, updateBooking, rooms, guests } = useAdmin();

  const [formData, setFormData] = useState({
    guestName: booking?.guestName || '',
    guestEmail: booking?.guestEmail || '',
    roomType: booking?.roomType || 'Standard Room',
    roomNumber: booking?.roomNumber || '',
    checkIn: booking?.checkIn || '',
    checkOut: booking?.checkOut || '',
    guests: booking?.guests || 2,
    status: booking?.status || 'confirmed',
    totalAmount: booking?.totalAmount || 0,
    paymentStatus: booking?.paymentStatus || 'pending',
    preCheckinCompleted: booking?.preCheckinCompleted || false,
    specialRequests: booking?.specialRequests || '',
  });

  const roomTypes = ['Standard Room', 'Deluxe Suite', 'Ocean View Room', 'Executive Suite', 'Presidential Suite'];
  const availableRooms = rooms.filter(r => r.status === 'available' && r.roomType === formData.roomType);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'create') {
      addBooking(formData);
    } else {
      updateBooking(booking!.id, formData);
    }

    onClose();
  };

  const handleChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-2xl shadow-2xl z-50 max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-2xl font-bold text-neutral-900">
                {mode === 'create' ? 'Create New Booking' : 'Edit Booking'}
              </h2>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-neutral-100 transition-colors"
              >
                <X className="w-5 h-5 text-neutral-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Guest Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-5 h-5 text-primary-600" />
                  <h3 className="text-lg font-bold text-neutral-900">Guest Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      Guest Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.guestName}
                      onChange={(e) => handleChange('guestName', e.target.value)}
                      className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-primary-400 focus:bg-white transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.guestEmail}
                      onChange={(e) => handleChange('guestEmail', e.target.value)}
                      className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-primary-400 focus:bg-white transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
              </div>

              {/* Room Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign className="w-5 h-5 text-primary-600" />
                  <h3 className="text-lg font-bold text-neutral-900">Room Details</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      Room Type *
                    </label>
                    <select
                      required
                      value={formData.roomType}
                      onChange={(e) => handleChange('roomType', e.target.value)}
                      className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-primary-400 focus:bg-white transition-all"
                    >
                      {roomTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      Room Number *
                    </label>
                    <select
                      required
                      value={formData.roomNumber}
                      onChange={(e) => handleChange('roomNumber', e.target.value)}
                      className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-primary-400 focus:bg-white transition-all"
                    >
                      <option value="">Select Room</option>
                      {availableRooms.map(room => (
                        <option key={room.id} value={room.roomNumber}>
                          {room.roomNumber} - ${room.pricePerNight}/night
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      Number of Guests *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      max="6"
                      value={formData.guests}
                      onChange={(e) => handleChange('guests', parseInt(e.target.value))}
                      className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-primary-400 focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      Total Amount ($) *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.totalAmount}
                      onChange={(e) => handleChange('totalAmount', parseFloat(e.target.value))}
                      className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-primary-400 focus:bg-white transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-5 h-5 text-primary-600" />
                  <h3 className="text-lg font-bold text-neutral-900">Dates</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      Check-In Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.checkIn}
                      onChange={(e) => handleChange('checkIn', e.target.value)}
                      className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-primary-400 focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      Check-Out Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.checkOut}
                      onChange={(e) => handleChange('checkOut', e.target.value)}
                      className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-primary-400 focus:bg-white transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Booking Status */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-neutral-900">Booking Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      Booking Status *
                    </label>
                    <select
                      required
                      value={formData.status}
                      onChange={(e) => handleChange('status', e.target.value)}
                      className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-primary-400 focus:bg-white transition-all"
                    >
                      <option value="confirmed">Confirmed</option>
                      <option value="checked-in">Checked In</option>
                      <option value="checked-out">Checked Out</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      Payment Status *
                    </label>
                    <select
                      required
                      value={formData.paymentStatus}
                      onChange={(e) => handleChange('paymentStatus', e.target.value)}
                      className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-primary-400 focus:bg-white transition-all"
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="refunded">Refunded</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-lg">
                  <input
                    type="checkbox"
                    id="preCheckin"
                    checked={formData.preCheckinCompleted}
                    onChange={(e) => handleChange('preCheckinCompleted', e.target.checked)}
                    className="w-5 h-5 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="preCheckin" className="text-sm font-semibold text-neutral-700 cursor-pointer">
                    Pre-check-in completed
                  </label>
                </div>
              </div>

              {/* Special Requests */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-neutral-900">Special Requests</h3>
                <textarea
                  value={formData.specialRequests}
                  onChange={(e) => handleChange('specialRequests', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-primary-400 focus:bg-white transition-all resize-none"
                  placeholder="Enter any special requests or notes..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
                >
                  {mode === 'create' ? 'Create Booking' : 'Update Booking'}
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
