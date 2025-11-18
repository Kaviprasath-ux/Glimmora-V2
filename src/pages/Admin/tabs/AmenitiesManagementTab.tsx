import { motion } from 'framer-motion';
import { useState } from 'react';
import { useWebsiteContent } from '@/contexts/WebsiteContentContext';
import { Plus, Edit, Trash2, Eye, EyeOff, Search } from 'lucide-react';
import * as Icons from 'lucide-react';

export function AmenitiesManagementTab() {
  const { amenities, addAmenity, updateAmenity, deleteAmenity } = useWebsiteContent();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAmenity, setSelectedAmenity] = useState<any>(null);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');

  const categories = ['all', 'recreation', 'dining', 'services', 'wellness'];

  const filteredAmenities = amenities.filter(amenity => {
    const matchesSearch = amenity.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || amenity.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleCreate = () => {
    setSelectedAmenity(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleEdit = (amenity: any) => {
    setSelectedAmenity(amenity);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this amenity?')) {
      deleteAmenity(id);
    }
  };

  const toggleActive = (id: string, currentStatus: boolean) => {
    updateAmenity(id, { isActive: !currentStatus });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'recreation': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'dining': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'services': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'wellness': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-neutral-100 text-neutral-700 border-neutral-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Amenities Management</h1>
          <p className="text-neutral-600">Manage hotel amenities displayed on website ({filteredAmenities.length} amenities)</p>
        </div>
        <button
          onClick={handleCreate}
          className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Amenity
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
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search amenities..."
                className="w-full pl-10 pr-4 py-3 border-2 border-neutral-300 rounded-xl focus:outline-none focus:border-primary-500"
              />
            </div>
          </div>

          <div className="flex gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-4 py-2 rounded-lg font-medium capitalize transition-all ${
                  categoryFilter === cat
                    ? 'bg-primary-600 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Amenities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAmenities.map((amenity, index) => {
          const IconComponent = (Icons as any)[amenity.icon] || Icons.Star;

          return (
            <motion.div
              key={amenity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all ${
                !amenity.isActive ? 'opacity-60' : ''
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900">{amenity.name}</h3>
                    <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full border capitalize ${getCategoryColor(amenity.category)}`}>
                      {amenity.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-neutral-600 mb-4 line-clamp-3">
                {amenity.description}
              </p>

              {/* Details */}
              {amenity.hours && (
                <div className="mb-2">
                  <span className="text-xs font-semibold text-neutral-700">Hours:</span>
                  <span className="text-xs text-neutral-600 ml-2">{amenity.hours}</span>
                </div>
              )}
              {amenity.location && (
                <div className="mb-4">
                  <span className="text-xs font-semibold text-neutral-700">Location:</span>
                  <span className="text-xs text-neutral-600 ml-2">{amenity.location}</span>
                </div>
              )}

              {/* Features */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {amenity.features.slice(0, 3).map((feature, idx) => (
                    <span key={idx} className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded-md">
                      {feature}
                    </span>
                  ))}
                  {amenity.features.length > 3 && (
                    <span className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded-md">
                      +{amenity.features.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-neutral-200">
                <button
                  onClick={() => toggleActive(amenity.id, amenity.isActive)}
                  className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-all ${
                    amenity.isActive
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {amenity.isActive ? (
                    <span className="flex items-center justify-center gap-1">
                      <Eye className="w-4 h-4" />
                      Active
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-1">
                      <EyeOff className="w-4 h-4" />
                      Hidden
                    </span>
                  )}
                </button>
                <button
                  onClick={() => handleEdit(amenity)}
                  className="p-2 hover:bg-yellow-50 text-yellow-600 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(amenity.id)}
                  className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredAmenities.length === 0 && (
        <div className="text-center py-12">
          <p className="text-neutral-600">No amenities found. Create your first amenity!</p>
        </div>
      )}

      {/* Stats */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-neutral-900 mb-4">Amenities Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-neutral-900">{amenities.length}</div>
            <div className="text-sm text-neutral-600">Total</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">
              {amenities.filter(a => a.isActive).length}
            </div>
            <div className="text-sm text-neutral-600">Active</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-neutral-600">
              {amenities.filter(a => !a.isActive).length}
            </div>
            <div className="text-sm text-neutral-600">Hidden</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">
              {new Set(amenities.map(a => a.category)).size}
            </div>
            <div className="text-sm text-neutral-600">Categories</div>
          </div>
        </div>
      </div>

      {/* TODO: Add modal for create/edit */}
    </div>
  );
}
