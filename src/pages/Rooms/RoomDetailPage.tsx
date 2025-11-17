import { useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Users,
  Maximize2,
  Eye,
  Bed,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Star,
  Award,
  Sparkles
} from 'lucide-react';
import { getRoomBySlug } from '@/data/roomsData';
import { Button, Card } from '@/components/ui';
import { formatCurrency } from '@/utils/helpers/format';

export const RoomDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(0);

  const room = getRoomBySlug(slug || '');

  if (!room) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <Card className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Room Not Found</h2>
          <p className="text-neutral-600 mb-6">
            The room you're looking for doesn't exist or has been removed.
          </p>
          <Button variant="primary" onClick={() => navigate('/rooms')}>
            Back to Rooms
          </Button>
        </Card>
      </div>
    );
  }

  const handleBookNow = () => {
    // Navigate to booking page with room slug and search params
    const params = new URLSearchParams();
    params.set('room', room.slug);
    if (searchParams.get('checkIn')) params.set('checkIn', searchParams.get('checkIn')!);
    if (searchParams.get('checkOut')) params.set('checkOut', searchParams.get('checkOut')!);
    params.set('adults', searchParams.get('adults') || '1');
    params.set('children', searchParams.get('children') || '0');
    navigate(`/booking?${params.toString()}`);
  };

  const openLightbox = (index: number) => {
    setLightboxImage(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setLightboxImage((prev) => (prev + 1) % room.images.length);
  };

  const prevImage = () => {
    setLightboxImage((prev) => (prev - 1 + room.images.length) % room.images.length);
  };

  const getCategoryBadgeColor = (category?: string) => {
    switch (category) {
      case 'standard':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'deluxe':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'suite':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'presidential':
        return 'bg-rose-100 text-rose-700 border-rose-200';
      default:
        return 'bg-neutral-100 text-neutral-700 border-neutral-200';
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          leftIcon={<ArrowLeft size={20} />}
          onClick={() => navigate('/rooms')}
          className="mb-6"
        >
          Back to Rooms
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Room Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div>
              {/* Main Image */}
              <div
                className="relative h-96 rounded-lg overflow-hidden mb-4 cursor-pointer group"
                onClick={() => openLightbox(selectedImage)}
              >
                <img
                  src={room.images[selectedImage]}
                  alt={`${room.name} - Image ${selectedImage + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 px-4 py-2 rounded-lg">
                    <span className="text-sm font-medium text-neutral-900">Click to view fullscreen</span>
                  </div>
                </div>
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-5 gap-2">
                {room.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? 'border-primary-600 ring-2 ring-primary-200'
                        : 'border-transparent hover:border-neutral-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${room.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Room Info */}
            <Card padding="lg">
              {/* Category Badge & Title */}
              <div className="mb-4">
                {room.category && (
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold capitalize border mb-3 ${getCategoryBadgeColor(room.category)}`}>
                    {room.category === 'presidential' && <Award size={16} />}
                    {room.category === 'suite' && <Sparkles size={16} />}
                    {room.category}
                  </div>
                )}
                <h1 className="text-3xl font-bold text-neutral-900">{room.name}</h1>

                {/* Rating */}
                {room.rating && (
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1.5 text-amber-500">
                      <Star size={20} fill="currentColor" />
                      <span className="text-lg font-bold text-neutral-900">{room.rating.toFixed(1)}</span>
                    </div>
                    {room.reviewCount && (
                      <span className="text-neutral-600">
                        ({room.reviewCount} {room.reviewCount === 1 ? 'review' : 'reviews'})
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-6 mb-6 pb-6 border-b border-neutral-200">
                <div className="flex items-center gap-2 text-neutral-700">
                  <Users size={20} className="text-primary-600" />
                  <span>Up to {room.maxGuests} Guests</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-700">
                  <Maximize2 size={20} className="text-primary-600" />
                  <span>{room.size} sq ft</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-700">
                  <Eye size={20} className="text-primary-600" />
                  <span>{room.view}</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-700">
                  <Bed size={20} className="text-primary-600" />
                  <span>{room.bedType}</span>
                </div>
              </div>

              {/* Short Description */}
              {room.shortDescription && (
                <div className="mb-6 p-4 bg-primary-50 rounded-lg border border-primary-100">
                  <p className="text-neutral-800 font-medium italic">{room.shortDescription}</p>
                </div>
              )}

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-neutral-900 mb-3">
                  About This Room
                </h2>
                <p className="text-neutral-700 leading-relaxed">{room.description}</p>
              </div>

              {/* Features */}
              {room.features && room.features.length > 0 && (
                <div className="mb-6 pb-6 border-b border-neutral-200">
                  <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                    Room Features
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {room.features.map((feature) => (
                      <span
                        key={feature}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-50 to-primary-100 text-primary-800 rounded-lg text-sm font-medium border border-primary-200"
                      >
                        <Sparkles size={14} />
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Amenities */}
              <div>
                <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                  Amenities
                </h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {room.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-2 text-neutral-700"
                    >
                      <Check size={18} className="text-green-600 flex-shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Policies */}
            <Card padding="lg">
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                Booking Policies
              </h2>
              <div className="space-y-3 text-neutral-700">
                <div>
                  <strong className="text-neutral-900">Check-in:</strong> After 3:00 PM
                </div>
                <div>
                  <strong className="text-neutral-900">Check-out:</strong> Before 11:00 AM
                </div>
                <div>
                  <strong className="text-neutral-900">Cancellation:</strong> Free
                  cancellation up to 24 hours before check-in
                </div>
                <div>
                  <strong className="text-neutral-900">Pets:</strong> Not allowed
                </div>
                <div>
                  <strong className="text-neutral-900">Smoking:</strong> Non-smoking room
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Booking Card (Sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card padding="lg" className="border-2 border-primary-200">
                <div className="mb-6">
                  <div className="text-3xl font-bold text-neutral-900 mb-1">
                    {formatCurrency(room.price)}
                    <span className="text-lg font-normal text-neutral-600">/night</span>
                  </div>
                  {room.rating && (
                    <div className="flex items-center gap-1.5 text-amber-500 mt-2">
                      <Star size={16} fill="currentColor" />
                      <span className="text-sm font-semibold text-neutral-900">{room.rating.toFixed(1)}</span>
                      {room.reviewCount && (
                        <span className="text-xs text-neutral-600">({room.reviewCount})</span>
                      )}
                    </div>
                  )}
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={handleBookNow}
                  className="mb-4 shadow-lg hover:shadow-xl transition-shadow"
                >
                  Book Now
                </Button>

                <div className="border-t border-neutral-200 pt-4 mt-4">
                  <h3 className="font-semibold text-neutral-900 mb-3">
                    Price Breakdown
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Base Price (per night)</span>
                      <span className="text-neutral-900 font-medium">
                        {formatCurrency(room.price)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Taxes (12%)</span>
                      <span className="text-neutral-900">
                        {formatCurrency(room.price * 0.12)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Service Fee (5%)</span>
                      <span className="text-neutral-900">
                        {formatCurrency(room.price * 0.05)}
                      </span>
                    </div>
                    <div className="border-t border-neutral-200 pt-2 mt-2">
                      <div className="flex justify-between">
                        <span className="font-semibold text-neutral-900">
                          Total per night
                        </span>
                        <span className="font-bold text-primary-600 text-lg">
                          {formatCurrency(room.price * 1.17)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-neutral-200">
                  <p className="text-xs text-neutral-600 text-center">
                    Free cancellation before check-in • No prepayment needed
                  </p>
                </div>

                {/* Availability Badge */}
                {room.available !== false && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 text-green-700 justify-center">
                      <Check size={16} />
                      <span className="text-sm font-medium">Available Now</span>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Image Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <X size={24} />
            </button>

            {/* Image Counter */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium">
              {lightboxImage + 1} / {room.images.length}
            </div>

            {/* Previous Button */}
            {room.images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              >
                <ChevronLeft size={32} />
              </button>
            )}

            {/* Next Button */}
            {room.images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              >
                <ChevronRight size={32} />
              </button>
            )}

            {/* Image */}
            <motion.img
              key={lightboxImage}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              src={room.images[lightboxImage]}
              alt={`${room.name} - Image ${lightboxImage + 1}`}
              className="max-h-[90vh] max-w-[90vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Thumbnail Navigation */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2 max-w-[90vw] overflow-x-auto px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg">
              {room.images.map((image, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxImage(index);
                  }}
                  className={`relative h-16 w-24 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                    lightboxImage === index
                      ? 'border-white ring-2 ring-white/50'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
