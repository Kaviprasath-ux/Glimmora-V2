import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { GuestModal } from '@/components/admin/GuestModal';
import { Search, Download, Star, Mail, Phone, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';

export function GuestsTab() {
  const { guests } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const itemsPerPage = 12;

  const filteredGuests = guests.filter(guest =>
    guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guest.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredGuests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentGuests = filteredGuests.slice(startIndex, endIndex);

  const handleViewGuest = (guest: any) => {
    setSelectedGuest(guest);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Guest Database</h1>
          <p className="text-neutral-600">Manage guest profiles and history ({filteredGuests.length} guests)</p>
        </div>
        <button className="px-6 py-3 border-2 border-neutral-300 hover:border-primary-500 text-neutral-900 font-semibold rounded-xl transition-all flex items-center gap-2">
          <Download className="w-5 h-5" />
          Export
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search guests by name or email..."
            className="w-full pl-10 pr-4 py-3 border-2 border-neutral-300 rounded-xl focus:outline-none focus:border-primary-500"
          />
        </div>
      </div>

      {/* Guests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentGuests.map((guest, index) => (
          <motion.div
            key={guest.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer"
            onClick={() => handleViewGuest(guest)}
          >
            {/* Guest Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-bold text-lg">
                    {guest.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900">{guest.name}</h3>
                  {guest.vipStatus && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">
                      <Star className="w-3 h-3 fill-current" />
                      VIP
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <Mail className="w-4 h-4" />
                <span className="truncate">{guest.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <Phone className="w-4 h-4" />
                {guest.phone}
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <Calendar className="w-4 h-4" />
                Member since {format(new Date(guest.memberSince), 'MMM yyyy')}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-neutral-200">
              <div className="text-center">
                <div className="text-lg font-bold text-primary-600">{guest.loyaltyPoints}</div>
                <div className="text-xs text-neutral-600">Points</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-neutral-900">{guest.totalBookings}</div>
                <div className="text-xs text-neutral-600">Bookings</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">${guest.totalSpent}</div>
                <div className="text-xs text-neutral-600">Spent</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    currentPage === pageNum
                      ? 'bg-primary-600 text-white'
                      : 'border border-neutral-300 hover:bg-neutral-50'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Guest Statistics */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-neutral-900 mb-4">Guest Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600">{guests.length}</div>
            <div className="text-sm text-neutral-600">Total Guests</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">
              {guests.filter(g => g.vipStatus).length}
            </div>
            <div className="text-sm text-neutral-600">VIP Guests</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">
              {guests.reduce((sum, g) => sum + g.totalBookings, 0)}
            </div>
            <div className="text-sm text-neutral-600">Total Bookings</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">
              ${guests.reduce((sum, g) => sum + g.totalSpent, 0).toLocaleString()}
            </div>
            <div className="text-sm text-neutral-600">Total Revenue</div>
          </div>
        </div>
      </div>

      {/* Guest Modal */}
      {selectedGuest && (
        <GuestModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          guest={selectedGuest}
        />
      )}
    </div>
  );
}
