import { X, User, Mail, Phone, MapPin, Star, Calendar, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '@/contexts/AdminContext';
import { format } from 'date-fns';

interface GuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  guest: any;
}

export function GuestModal({ isOpen, onClose, guest }: GuestModalProps) {
  const { bookings } = useAdmin();

  // Get guest's booking history
  const guestBookings = bookings.filter(b =>
    b.guestEmail === guest.email
  ).slice(0, 5); // Show last 5 bookings

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
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl bg-white rounded-2xl shadow-2xl z-50 max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-br from-primary-600 to-primary-700 text-white px-6 py-6 rounded-t-2xl">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold">{guest.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{guest.name}</h2>
                    {guest.vipStatus && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-400 text-yellow-900 text-sm font-semibold rounded-full mt-1">
                        <Star className="w-4 h-4 fill-current" />
                        VIP Guest
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-bold text-neutral-900 mb-4">Contact Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-xl">
                    <Mail className="w-5 h-5 text-primary-600" />
                    <div>
                      <p className="text-xs text-neutral-600">Email</p>
                      <p className="text-sm font-semibold text-neutral-900">{guest.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-xl">
                    <Phone className="w-5 h-5 text-primary-600" />
                    <div>
                      <p className="text-xs text-neutral-600">Phone</p>
                      <p className="text-sm font-semibold text-neutral-900">{guest.phone}</p>
                    </div>
                  </div>
                  {guest.address && (
                    <div className="col-span-2 flex items-center gap-3 p-4 bg-neutral-50 rounded-xl">
                      <MapPin className="w-5 h-5 text-primary-600" />
                      <div>
                        <p className="text-xs text-neutral-600">Address</p>
                        <p className="text-sm font-semibold text-neutral-900">{guest.address}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Guest Statistics */}
              <div>
                <h3 className="text-lg font-bold text-neutral-900 mb-4">Guest Statistics</h3>
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
                    <Star className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-600">{guest.loyaltyPoints}</div>
                    <div className="text-xs text-neutral-600">Loyalty Points</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 border-2 border-green-200 rounded-xl">
                    <Calendar className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-600">{guest.totalBookings}</div>
                    <div className="text-xs text-neutral-600">Total Bookings</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 border-2 border-purple-200 rounded-xl">
                    <DollarSign className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-purple-600">${guest.totalSpent}</div>
                    <div className="text-xs text-neutral-600">Total Spent</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
                    <User className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                    <div className="text-sm font-bold text-yellow-600">
                      {format(new Date(guest.memberSince), 'MMM yyyy')}
                    </div>
                    <div className="text-xs text-neutral-600">Member Since</div>
                  </div>
                </div>
              </div>

              {/* Preferences */}
              {guest.preferences && (
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-3">Preferences</h3>
                  <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl">
                    <p className="text-sm text-neutral-700">{guest.preferences}</p>
                  </div>
                </div>
              )}

              {/* Recent Bookings */}
              <div>
                <h3 className="text-lg font-bold text-neutral-900 mb-4">Recent Bookings</h3>
                {guestBookings.length > 0 ? (
                  <div className="space-y-3">
                    {guestBookings.map(booking => (
                      <div
                        key={booking.id}
                        className="p-4 border-2 border-neutral-200 rounded-xl hover:border-primary-300 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-neutral-900">{booking.bookingNumber}</p>
                            <p className="text-sm text-neutral-600">
                              {booking.roomType} • Room {booking.roomNumber}
                            </p>
                            <p className="text-xs text-neutral-500 mt-1">
                              {format(new Date(booking.checkIn), 'MMM dd')} - {format(new Date(booking.checkOut), 'MMM dd, yyyy')}
                            </p>
                          </div>
                          <div className="text-right">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                booking.status === 'confirmed'
                                  ? 'bg-green-100 text-green-700'
                                  : booking.status === 'checked-in'
                                  ? 'bg-blue-100 text-blue-700'
                                  : booking.status === 'checked-out'
                                  ? 'bg-neutral-100 text-neutral-700'
                                  : 'bg-red-100 text-red-700'
                              }`}
                            >
                              {booking.status}
                            </span>
                            <p className="text-sm font-bold text-neutral-900 mt-2">${booking.totalAmount}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-neutral-500">
                    No booking history found
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-neutral-200">
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-semibold rounded-xl transition-all"
                >
                  Close
                </button>
                <button className="flex-1 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all">
                  Send Message
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
