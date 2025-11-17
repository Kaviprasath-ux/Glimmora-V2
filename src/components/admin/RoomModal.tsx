import { useState } from 'react';
import { X, Hotel, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '@/contexts/AdminContext';
import type { Room } from '@/contexts/AdminContext';

interface RoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  room?: Room;
  mode: 'create' | 'edit';
}

export function RoomModal({ isOpen, onClose, room, mode }: RoomModalProps) {
  const { addRoom, updateRoom } = useAdmin();

  const [formData, setFormData] = useState({
    roomNumber: room?.roomNumber || '',
    roomType: room?.roomType || 'Standard Room',
    floor: room?.floor || 5,
    status: room?.status || 'available',
    pricePerNight: room?.pricePerNight || 150,
    maxOccupancy: room?.maxOccupancy || 2,
    bedType: room?.bedType || 'King Bed',
    features: room?.features?.join(', ') || 'WiFi, TV, Mini Bar',
  });

  const roomTypes = ['Standard Room', 'Deluxe Suite', 'Ocean View Room', 'Executive Suite', 'Presidential Suite'];
  const bedTypes = ['King Bed', 'Queen Bed', 'Twin Beds', 'Double Beds'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const roomData = {
      ...formData,
      features: formData.features.split(',').map(f => f.trim()),
    };

    if (mode === 'create') {
      addRoom(roomData);
    } else {
      updateRoom(room!.id, roomData);
    }

    onClose();
  };

  const handleChange = (field: string, value: string | number) => {
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
                {mode === 'create' ? 'Add New Room' : 'Edit Room'}
              </h2>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-neutral-100 transition-colors"
              >
                <X className="w-5 h-5 text-neutral-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Room Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-3">
                  <Hotel className="w-5 h-5 text-primary-600" />
                  <h3 className="text-lg font-bold text-neutral-900">Room Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      Room Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.roomNumber}
                      onChange={(e) => handleChange('roomNumber', e.target.value)}
                      disabled={mode === 'edit'}
                      className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-primary-400 focus:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="501"
                    />
                  </div>
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
                      Floor *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      max="50"
                      value={formData.floor}
                      onChange={(e) => handleChange('floor', parseInt(e.target.value))}
                      className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-primary-400 focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      Status *
                    </label>
                    <select
                      required
                      value={formData.status}
                      onChange={(e) => handleChange('status', e.target.value)}
                      className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-primary-400 focus:bg-white transition-all"
                    >
                      <option value="available">Available</option>
                      <option value="occupied">Occupied</option>
                      <option value="cleaning">Cleaning</option>
                      <option value="maintenance">Maintenance</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      Bed Type *
                    </label>
                    <select
                      required
                      value={formData.bedType}
                      onChange={(e) => handleChange('bedType', e.target.value)}
                      className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-primary-400 focus:bg-white transition-all"
                    >
                      {bedTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Pricing & Capacity */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign className="w-5 h-5 text-primary-600" />
                  <h3 className="text-lg font-bold text-neutral-900">Pricing & Capacity</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      Price Per Night ($) *
                    </label>
                    <input
                      type="number"
                      required
                      min="50"
                      step="10"
                      value={formData.pricePerNight}
                      onChange={(e) => handleChange('pricePerNight', parseFloat(e.target.value))}
                      className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-primary-400 focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      Max Occupancy *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      max="6"
                      value={formData.maxOccupancy}
                      onChange={(e) => handleChange('maxOccupancy', parseInt(e.target.value))}
                      className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-primary-400 focus:bg-white transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-neutral-900">Features</h3>
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Room Features (comma-separated) *
                  </label>
                  <textarea
                    required
                    value={formData.features}
                    onChange={(e) => handleChange('features', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-primary-400 focus:bg-white transition-all resize-none"
                    placeholder="WiFi, TV, Mini Bar, Ocean View"
                  />
                  <p className="mt-1 text-xs text-neutral-500">
                    Enter features separated by commas (e.g., WiFi, TV, Mini Bar)
                  </p>
                </div>
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
                  {mode === 'create' ? 'Add Room' : 'Update Room'}
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
