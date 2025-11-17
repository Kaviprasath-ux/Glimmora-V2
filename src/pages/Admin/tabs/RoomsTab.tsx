import { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

export function RoomsTab() {
  const { rooms, updateRoomStatus } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.type.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || room.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const styles = {
      available: 'bg-green-100 text-green-700',
      occupied: 'bg-blue-100 text-blue-700',
      maintenance: 'bg-red-100 text-red-700',
      cleaning: 'bg-yellow-100 text-yellow-700',
    };
    return styles[status as keyof typeof styles] || styles.available;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Rooms</h1>
          <p className="text-neutral-600">Manage room inventory and status</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by room number or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-primary-400 focus:bg-white transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-neutral-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-primary-400 focus:bg-white transition-all"
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="maintenance">Maintenance</option>
              <option value="cleaning">Cleaning</option>
            </select>
          </div>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredRooms.map((room) => (
          <motion.div
            key={room.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-neutral-900">#{room.number}</h3>
                <p className="text-sm text-neutral-500">Floor {room.floor}</p>
              </div>
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadge(
                  room.status
                )}`}
              >
                {room.status}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div>
                <p className="text-sm font-semibold text-neutral-900">{room.type}</p>
                <p className="text-lg font-bold text-primary-600">${room.price}/night</p>
              </div>

              <div>
                <p className="text-xs text-neutral-500 mb-2">Amenities:</p>
                <div className="flex flex-wrap gap-1">
                  {room.amenities.slice(0, 3).map((amenity, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-neutral-100 text-neutral-600 rounded"
                    >
                      {amenity}
                    </span>
                  ))}
                  {room.amenities.length > 3 && (
                    <span className="px-2 py-1 text-xs bg-neutral-100 text-neutral-600 rounded">
                      +{room.amenities.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <select
              value={room.status}
              onChange={(e) => updateRoomStatus(room.id, e.target.value as typeof room.status)}
              className="w-full text-sm px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-primary-400"
            >
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="maintenance">Maintenance</option>
              <option value="cleaning">Cleaning</option>
            </select>
          </motion.div>
        ))}
      </div>

      {filteredRooms.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm">
          <p className="text-neutral-500">No rooms found</p>
        </div>
      )}
    </div>
  );
}
