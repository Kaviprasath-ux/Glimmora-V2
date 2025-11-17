import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { RoomModal } from '@/components/admin/RoomModal';
import { Plus, Search, Edit, ChevronLeft, ChevronRight } from 'lucide-react';

export function RoomsTab() {
  const { rooms } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');

  const itemsPerPage = 12;

  const filteredRooms = rooms.filter(room => {
    const matchesSearch =
      room.roomNumber.includes(searchQuery) ||
      room.roomType.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || room.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRooms = filteredRooms.slice(startIndex, endIndex);

  const handleCreateRoom = () => {
    setSelectedRoom(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleEditRoom = (room: any) => {
    setSelectedRoom(room);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return { text: 'Available', color: 'text-green-700 bg-green-50 border-green-200' };
      case 'occupied': return { text: 'Occupied', color: 'text-red-700 bg-red-50 border-red-200' };
      case 'cleaning': return { text: 'Cleaning', color: 'text-yellow-700 bg-yellow-50 border-yellow-200' };
      case 'maintenance': return { text: 'Maintenance', color: 'text-orange-700 bg-orange-50 border-orange-200' };
      default: return { text: status, color: 'text-neutral-700 bg-neutral-50 border-neutral-200' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Room Inventory</h1>
          <p className="text-neutral-600">Manage room availability and pricing ({filteredRooms.length} rooms)</p>
        </div>
        <button
          onClick={handleCreateRoom}
          className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Room
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search by room number or type..."
                className="w-full pl-10 pr-4 py-3 border-2 border-neutral-300 rounded-xl focus:outline-none focus:border-primary-500"
              />
            </div>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-3 border-2 border-neutral-300 rounded-xl focus:outline-none focus:border-primary-500"
          >
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="cleaning">Cleaning</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentRooms.map((room, index) => {
          const statusInfo = getStatusText(room.status);

          return (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.03 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all"
            >
              {/* Room Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-primary-400 to-primary-600 relative">
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusInfo.color}`}>
                    {statusInfo.text}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => handleEditRoom(room)}
                    className="p-2 bg-white/90 rounded-lg hover:bg-white transition-colors"
                  >
                    <Edit className="w-4 h-4 text-neutral-900" />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
                  <div className="text-white">
                    <div className="text-2xl font-bold">Room {room.roomNumber}</div>
                    <div className="text-sm">Floor {room.floor}</div>
                  </div>
                </div>
              </div>

              {/* Room Details */}
              <div className="p-4">
                <h3 className="font-bold text-neutral-900 mb-2">{room.roomType}</h3>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-primary-600">
                    ${room.pricePerNight}
                  </span>
                  <span className="text-sm text-neutral-600">per night</span>
                </div>

                {/* Features */}
                <div className="space-y-2 mb-4">
                  {room.features.slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="text-xs text-neutral-600 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary-600 rounded-full" />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Current Guest */}
                {room.currentGuest && (
                  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs text-blue-700 font-semibold">Current Guest</p>
                    <p className="text-sm text-blue-900">{room.currentGuest}</p>
                  </div>
                )}

                {/* Last Cleaned */}
                {room.lastCleaned && (
                  <p className="text-xs text-neutral-500 mb-4">
                    Cleaned: {new Date(room.lastCleaned).toLocaleString()}
                  </p>
                )}

                {/* Room Info */}
                <div className="text-xs text-neutral-600 space-y-1 mb-4">
                  <div>• {room.bedType}</div>
                  <div>• Max {room.maxOccupancy} guests</div>
                </div>
              </div>
            </motion.div>
          );
        })}
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

      {/* Stats Summary */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-neutral-900 mb-4">Room Status Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">
              {rooms.filter(r => r.status === 'available').length}
            </div>
            <div className="text-sm text-neutral-600">Available</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">
              {rooms.filter(r => r.status === 'occupied').length}
            </div>
            <div className="text-sm text-neutral-600">Occupied</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">
              {rooms.filter(r => r.status === 'cleaning').length}
            </div>
            <div className="text-sm text-neutral-600">Cleaning</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">
              {rooms.filter(r => r.status === 'maintenance').length}
            </div>
            <div className="text-sm text-neutral-600">Maintenance</div>
          </div>
        </div>
      </div>

      {/* Room Modal */}
      <RoomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        room={selectedRoom}
        mode={modalMode}
      />
    </div>
  );
}
