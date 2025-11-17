import { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Search, Star, Mail, Phone, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export function GuestsTab() {
  const { guests } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGuests = guests.filter(
    (guest) =>
      guest.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Guests</h1>
          <p className="text-neutral-600">Manage guest profiles and information</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-primary-400 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Guests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGuests.map((guest) => (
          <motion.div
            key={guest.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-bold text-primary-700">
                  {guest.fullName.charAt(0)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-neutral-900 truncate">
                    {guest.fullName}
                  </h3>
                  {guest.vipStatus && (
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 flex-shrink-0" />
                  )}
                </div>
                <p className="text-xs text-neutral-500">
                  Member since {new Date(guest.joinedDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <Mail className="w-4 h-4 text-neutral-400" />
                <span className="truncate">{guest.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <Phone className="w-4 h-4 text-neutral-400" />
                <span>{guest.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <Globe className="w-4 h-4 text-neutral-400" />
                <span>{guest.nationality}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-200">
              <div>
                <p className="text-xs text-neutral-500 mb-1">Total Bookings</p>
                <p className="text-xl font-bold text-neutral-900">{guest.totalBookings}</p>
              </div>
              <div>
                <p className="text-xs text-neutral-500 mb-1">Total Spent</p>
                <p className="text-xl font-bold text-primary-600">
                  ${guest.totalSpent.toLocaleString()}
                </p>
              </div>
            </div>

            {guest.vipStatus && (
              <div className="mt-4 px-3 py-2 bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 rounded-lg">
                <p className="text-xs font-semibold text-yellow-800 text-center">
                  ⭐ VIP Member
                </p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {filteredGuests.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm">
          <p className="text-neutral-500">No guests found</p>
        </div>
      )}
    </div>
  );
}
