import { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users,
  Maximize2,
  Star,
  Grid3x3,
  List,
  SlidersHorizontal,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  CheckCircle
} from 'lucide-react';
import { rooms } from '@/data/roomsData';
import { Button, Card } from '@/components/ui';
import { formatCurrency } from '@/utils/helpers/format';
import type { Room } from '@/api/types/booking.types';
import { RoomsSearchWidget, SearchData } from '@/components/rooms/RoomsSearchWidget';

type ViewMode = 'grid' | 'list';
type SortOption = 'price-low' | 'price-high' | 'rating' | 'popularity';

export const RoomsPage = () => {
  const navigate = useNavigate();
  const resultsRef = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();

  // View and filter state
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Search data from widget
  const [searchData, setSearchData] = useState<SearchData>({
    checkIn: searchParams.get('checkIn') || '',
    checkOut: searchParams.get('checkOut') || '',
    adults: parseInt(searchParams.get('adults') || '1'),
    children: parseInt(searchParams.get('children') || '0'),
  });

  // Filter state
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('popularity');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // Get unique amenities and categories from all rooms
  const allAmenities = useMemo(() => {
    const amenitiesSet = new Set<string>();
    rooms.forEach(room => {
      room.amenities.forEach(amenity => amenitiesSet.add(amenity));
    });
    return Array.from(amenitiesSet).sort();
  }, []);

  const categories = ['standard', 'deluxe', 'suite', 'presidential'];

  // Calculate nights for availability check
  const nights = useMemo(() => {
    if (!searchData.checkIn || !searchData.checkOut) return 0;
    const checkIn = new Date(searchData.checkIn);
    const checkOut = new Date(searchData.checkOut);
    return Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
  }, [searchData.checkIn, searchData.checkOut]);

  // Check if room is available (mock logic - in real app would check database)
  const isRoomAvailable = (room: Room) => {
    // If no dates selected, show all rooms
    if (!searchData.checkIn || !searchData.checkOut) return true;

    // Mock availability logic: 80% of rooms are available for any given date
    // In production, this would check against actual bookings
    const roomHash = room.id.charCodeAt(0) + searchData.checkIn.charCodeAt(0);
    return roomHash % 5 !== 0; // 80% availability rate
  };

  // Filter and sort rooms
  const filteredAndSortedRooms = useMemo(() => {
    let filtered = rooms.filter((room) => {
      // Availability filter (most important!)
      if (!isRoomAvailable(room)) return false;

      // Price range filter
      if (room.price < priceRange[0] || room.price > priceRange[1]) return false;

      // Category filter
      if (selectedCategories.length > 0 && room.category) {
        if (!selectedCategories.includes(room.category)) return false;
      }

      // Guest count filter
      const totalGuests = searchData.adults + searchData.children;
      if (room.maxGuests < totalGuests) return false;

      // Amenities filter
      if (selectedAmenities.length > 0) {
        const hasAllAmenities = selectedAmenities.every(amenity =>
          room.amenities.includes(amenity)
        );
        if (!hasAllAmenities) return false;
      }

      return true;
    });

    // Sort rooms
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'popularity':
          return (b.reviewCount || 0) - (a.reviewCount || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [priceRange, selectedCategories, selectedAmenities, searchData, sortBy]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredAndSortedRooms.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRooms = filteredAndSortedRooms.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [priceRange, selectedCategories, selectedAmenities, searchData, sortBy, itemsPerPage]);

  // Scroll to results when page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSearch = (data: SearchData) => {
    setSearchData(data);
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const clearFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedCategories([]);
    setSelectedAmenities([]);
  };

  const getCategoryBadgeColor = (category?: string) => {
    switch (category) {
      case 'standard':
        return 'bg-blue-100 text-blue-700';
      case 'deluxe':
        return 'bg-purple-100 text-purple-700';
      case 'suite':
        return 'bg-amber-100 text-amber-700';
      case 'presidential':
        return 'bg-rose-100 text-rose-700';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const hasSearchDates = searchData.checkIn && searchData.checkOut;

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-4xl font-bold text-neutral-900 mb-3">Available Suites</h1>
          <p className="text-lg text-neutral-600">
            {filteredAndSortedRooms.length} {filteredAndSortedRooms.length === 1 ? 'room' : 'rooms'} available
            {hasSearchDates && nights > 0 && ` for ${nights} ${nights === 1 ? 'night' : 'nights'}`}
          </p>
        </motion.div>

        {/* Search Widget */}
        <div className="mb-6">
          <RoomsSearchWidget onSearch={handleSearch} />
        </div>

        {/* Controls Bar */}
        <div ref={resultsRef} className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          {/* Left side - Filter toggle and results count */}
          <div className="flex items-center gap-4">
            <Button
              variant="secondary"
              leftIcon={<SlidersHorizontal size={18} />}
              onClick={() => setShowFilters(!showFilters)}
            >
              Filters
              {(selectedCategories.length + selectedAmenities.length > 0) && (
                <span className="ml-2 bg-primary-600 text-white text-xs px-2 py-0.5 rounded-full">
                  {selectedCategories.length + selectedAmenities.length}
                </span>
              )}
            </Button>
            <span className="text-sm text-neutral-600">
              {filteredAndSortedRooms.length} {filteredAndSortedRooms.length === 1 ? 'room' : 'rooms'} available
            </span>
          </div>

          {/* Right side - Sort, Items per page, and View mode */}
          <div className="flex items-center gap-3 flex-wrap">
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="px-3 py-2 border border-neutral-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value={6}>6 per page</option>
              <option value={9}>9 per page</option>
              <option value={12}>12 per page</option>
              <option value={24}>24 per page</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-4 py-2 border border-neutral-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="popularity">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="p-2"
              >
                <Grid3x3 size={18} />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="p-2"
              >
                <List size={18} />
              </Button>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6"
          >
            <Card padding="lg" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-neutral-900">Filters</h3>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear All
                </Button>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-3">
                  Price Range: {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
                </label>
                <div className="flex gap-4">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="50"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="flex-1"
                  />
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="50"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="flex-1"
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-3">
                  Room Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => toggleCategory(category)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                        selectedCategories.includes(category)
                          ? 'bg-primary-600 text-white'
                          : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Amenities */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-3">
                  Amenities
                </label>
                <div className="flex flex-wrap gap-2">
                  {allAmenities.slice(0, 12).map(amenity => (
                    <button
                      key={amenity}
                      onClick={() => toggleAmenity(amenity)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        selectedAmenities.includes(amenity)
                          ? 'bg-primary-600 text-white'
                          : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                      }`}
                    >
                      {amenity}
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Active Filters Tags */}
        {(selectedCategories.length > 0 || selectedAmenities.length > 0) && (
          <div className="mb-6 flex flex-wrap gap-2">
            {selectedCategories.map(category => (
              <span
                key={category}
                className="inline-flex items-center gap-2 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
              >
                <span className="capitalize">{category}</span>
                <button onClick={() => toggleCategory(category)}>
                  <X size={14} />
                </button>
              </span>
            ))}
            {selectedAmenities.map(amenity => (
              <span
                key={amenity}
                className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
              >
                {amenity}
                <button onClick={() => toggleAmenity(amenity)}>
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Pagination Info */}
        {filteredAndSortedRooms.length > 0 && (
          <div className="mb-4 text-sm text-neutral-600">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredAndSortedRooms.length)} of {filteredAndSortedRooms.length} rooms
          </div>
        )}

        {/* Room Grid/List */}
        <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
          {paginatedRooms.map((room, index) => (
            <RoomCard
              key={room.id}
              room={room}
              viewMode={viewMode}
              index={index}
              searchData={searchData}
              nights={nights}
              navigate={navigate}
              getCategoryBadgeColor={getCategoryBadgeColor}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredAndSortedRooms.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-neutral-600 text-lg mb-4">
              No rooms found matching your criteria
            </p>
            <Button variant="primary" onClick={clearFilters}>
              Clear Filters
            </Button>
          </motion.div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            {/* Page info for mobile */}
            <div className="text-sm text-neutral-600 sm:hidden">
              Page {currentPage} of {totalPages}
            </div>

            {/* Pagination buttons */}
            <div className="flex items-center gap-2">
              {/* First page */}
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="p-2"
              >
                <ChevronsLeft size={18} />
              </Button>

              {/* Previous page */}
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2"
              >
                <ChevronLeft size={18} />
              </Button>

              {/* Page numbers */}
              <div className="flex items-center gap-1">
                {getPageNumbers().map((page, index) => (
                  page === '...' ? (
                    <span key={`ellipsis-${index}`} className="px-3 py-2 text-neutral-400">
                      ...
                    </span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page as number)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === page
                          ? 'bg-primary-600 text-white'
                          : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-300'
                      }`}
                    >
                      {page}
                    </button>
                  )
                ))}
              </div>

              {/* Next page */}
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2"
              >
                <ChevronRight size={18} />
              </Button>

              {/* Last page */}
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="p-2"
              >
                <ChevronsRight size={18} />
              </Button>
            </div>

            {/* Page info for desktop */}
            <div className="hidden sm:block text-sm text-neutral-600">
              Page {currentPage} of {totalPages}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// Separate RoomCard component for cleaner code
interface RoomCardProps {
  room: Room;
  viewMode: ViewMode;
  index: number;
  searchData: SearchData;
  nights: number;
  navigate: (path: string) => void;
  getCategoryBadgeColor: (category?: string) => string;
}

const RoomCard = ({ room, viewMode, index, searchData, nights, navigate, getCategoryBadgeColor }: RoomCardProps) => {
  const totalPrice = nights > 0 ? room.price * nights : room.price;
  const hasSearchDates = searchData.checkIn && searchData.checkOut;

  const handleClick = () => {
    // Pass search params to room detail
    const params = new URLSearchParams();
    if (searchData.checkIn) params.set('checkIn', searchData.checkIn);
    if (searchData.checkOut) params.set('checkOut', searchData.checkOut);
    params.set('adults', searchData.adults.toString());
    params.set('children', searchData.children.toString());
    navigate(`/rooms/${room.slug}?${params.toString()}`);
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
      >
        <Card
          padding="none"
          className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
          onClick={handleClick}
        >
          <div className="flex flex-col sm:flex-row">
            {/* Image */}
            <div className="relative sm:w-80 h-64 sm:h-auto overflow-hidden flex-shrink-0">
              <img
                src={room.images[0]}
                alt={room.name}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
              {room.category && (
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold capitalize ${getCategoryBadgeColor(room.category)}`}>
                  {room.category}
                </div>
              )}
              {hasSearchDates && (
                <div className="absolute top-4 right-4 px-3 py-1.5 bg-green-500 text-white rounded-full shadow-lg flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-semibold">Available</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 p-6 flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-2xl font-semibold text-neutral-900 mb-1">
                    {room.name}
                  </h3>
                  {room.rating && (
                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star size={16} fill="currentColor" />
                        <span className="font-semibold text-neutral-900">{room.rating.toFixed(1)}</span>
                      </div>
                      {room.reviewCount && (
                        <span className="text-neutral-600">({room.reviewCount} reviews)</span>
                      )}
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-neutral-900">
                    {formatCurrency(room.price)}
                  </div>
                  <div className="text-sm text-neutral-600">per night</div>
                </div>
              </div>

              <p className="text-neutral-600 mb-4 flex-1">
                {room.shortDescription || room.description.substring(0, 150) + '...'}
              </p>

              {/* Room Features */}
              <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-neutral-600">
                <div className="flex items-center gap-1">
                  <Users size={16} />
                  <span>{room.maxGuests} Guests</span>
                </div>
                <div className="flex items-center gap-1">
                  <Maximize2 size={16} />
                  <span>{room.size} sq ft</span>
                </div>
              </div>

              {/* Total Price Info */}
              {hasSearchDates && nights > 0 && (
                <div className="mb-4 p-3 bg-primary-50 rounded-lg border border-primary-100">
                  <div className="text-sm text-primary-700">
                    Total for {nights} {nights === 1 ? 'night' : 'nights'}
                  </div>
                  <div className="text-2xl font-bold text-primary-900">
                    ${totalPrice.toFixed(0)}
                  </div>
                </div>
              )}

              {/* Features Tags */}
              {room.features && room.features.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {room.features.map((feature) => (
                    <span
                      key={feature}
                      className="text-xs px-2 py-1 bg-primary-50 text-primary-700 rounded font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }

  // Grid view
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card
        padding="none"
        className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer h-full flex flex-col"
        onClick={handleClick}
      >
        {/* Room Image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={room.images[0]}
            alt={room.name}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
            <span className="text-sm font-semibold text-neutral-900">
              {formatCurrency(room.price)}/night
            </span>
          </div>
          {room.category && (
            <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold capitalize ${getCategoryBadgeColor(room.category)}`}>
              {room.category}
            </div>
          )}
          {hasSearchDates && (
            <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-green-500 text-white rounded-full shadow-lg flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4" />
              <span className="text-xs font-semibold">Available</span>
            </div>
          )}
        </div>

        {/* Room Details */}
        <div className="p-5 flex flex-col flex-1">
          <div className="mb-2">
            <h3 className="text-xl font-semibold text-neutral-900 mb-1">
              {room.name}
            </h3>
            {room.rating && (
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star size={14} fill="currentColor" />
                  <span className="font-semibold text-neutral-900">{room.rating.toFixed(1)}</span>
                </div>
                {room.reviewCount && (
                  <span className="text-neutral-600">({room.reviewCount})</span>
                )}
              </div>
            )}
          </div>

          <p className="text-neutral-600 text-sm mb-4 line-clamp-2 flex-1">
            {room.shortDescription || room.description}
          </p>

          {/* Room Features */}
          <div className="flex items-center gap-3 mb-4 text-xs text-neutral-600">
            <div className="flex items-center gap-1">
              <Users size={14} />
              <span>{room.maxGuests}</span>
            </div>
            <div className="flex items-center gap-1">
              <Maximize2 size={14} />
              <span>{room.size} ft²</span>
            </div>
          </div>

          {/* Total Price Info */}
          {hasSearchDates && nights > 0 && (
            <div className="mb-4 p-3 bg-primary-50 rounded-lg border border-primary-100">
              <div className="text-xs text-primary-700">
                Total for {nights} {nights === 1 ? 'night' : 'nights'}
              </div>
              <div className="text-xl font-bold text-primary-900">
                ${totalPrice.toFixed(0)}
              </div>
            </div>
          )}

          {/* Features/Amenities Preview */}
          <div className="flex flex-wrap gap-2 mb-4">
            {(room.features || room.amenities.slice(0, 3)).slice(0, 3).map((item) => (
              <span
                key={item}
                className="text-xs px-2 py-1 bg-neutral-100 text-neutral-700 rounded"
              >
                {item}
              </span>
            ))}
            {room.amenities.length > 3 && (
              <span className="text-xs px-2 py-1 bg-primary-100 text-primary-700 rounded font-medium">
                +{room.amenities.length - 3} more
              </span>
            )}
          </div>

          {/* View Details Button */}
          <Button
            variant="primary"
            fullWidth
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            View Details
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};
