import { motion } from 'framer-motion';
import { useState } from 'react';
import { Upload, Image, Trash2, Search, Grid3x3, List, Eye } from 'lucide-react';

interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video';
  size: string;
  uploadedAt: string;
  category: string;
}

export function MediaManagerTab() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Mock media files
  const [mediaFiles] = useState<MediaFile[]>([
    {
      id: '1',
      name: 'hotel-exterior.jpg',
      url: '/images/hotel-exterior.jpg',
      type: 'image',
      size: '2.4 MB',
      uploadedAt: '2024-11-15',
      category: 'Hotel',
    },
    {
      id: '2',
      name: 'pool-view.jpg',
      url: '/images/pool-view.jpg',
      type: 'image',
      size: '1.8 MB',
      uploadedAt: '2024-11-14',
      category: 'Amenities',
    },
    {
      id: '3',
      name: 'deluxe-suite.jpg',
      url: '/images/deluxe-suite.jpg',
      type: 'image',
      size: '2.1 MB',
      uploadedAt: '2024-11-13',
      category: 'Rooms',
    },
  ]);

  const categories = ['all', 'Hotel', 'Rooms', 'Amenities', 'Events'];

  const filteredMedia = mediaFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || file.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Media Manager</h1>
          <p className="text-neutral-600">Manage photos and videos ({filteredMedia.length} files)</p>
        </div>
        <button className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Upload Media
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search media files..."
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

          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-neutral-100 text-neutral-700'
              }`}
            >
              <Grid3x3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-neutral-100 text-neutral-700'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Upload Zone */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border-2 border-dashed border-neutral-300 hover:border-primary-500 transition-all cursor-pointer">
        <div className="text-center">
          <Upload className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-neutral-900 mb-2">Drop files here to upload</h3>
          <p className="text-neutral-600 mb-4">or click to browse</p>
          <p className="text-sm text-neutral-500">Supported: JPG, PNG, GIF, MP4 (Max 10MB)</p>
        </div>
      </div>

      {/* Media Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMedia.map((file, index) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group"
            >
              <div className="relative h-48 bg-neutral-100 flex items-center justify-center">
                <Image className="w-16 h-16 text-neutral-300" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button className="p-2 bg-white rounded-lg hover:bg-neutral-100 transition-colors">
                    <Eye className="w-5 h-5 text-neutral-900" />
                  </button>
                  <button className="p-2 bg-white rounded-lg hover:bg-red-50 text-red-600 transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-neutral-900 mb-1 truncate">{file.name}</h4>
                <div className="flex items-center justify-between text-xs text-neutral-600">
                  <span>{file.size}</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md">{file.category}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Size</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Uploaded</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {filteredMedia.map((file, index) => (
                <motion.tr
                  key={file.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-neutral-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Image className="w-10 h-10 text-neutral-400" />
                      <span className="font-medium text-neutral-900">{file.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                      {file.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-700">{file.size}</td>
                  <td className="px-6 py-4 text-sm text-neutral-700">{file.uploadedAt}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Stats */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-neutral-900 mb-4">Storage Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-neutral-900">{mediaFiles.length}</div>
            <div className="text-sm text-neutral-600">Total Files</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">8.3 MB</div>
            <div className="text-sm text-neutral-600">Total Size</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{mediaFiles.filter(f => f.type === 'image').length}</div>
            <div className="text-sm text-neutral-600">Images</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">{mediaFiles.filter(f => f.type === 'video').length}</div>
            <div className="text-sm text-neutral-600">Videos</div>
          </div>
        </div>
      </div>
    </div>
  );
}
