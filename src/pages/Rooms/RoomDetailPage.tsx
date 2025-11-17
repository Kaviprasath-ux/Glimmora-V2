import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Maximize2, Eye, Bed, Check } from 'lucide-react';
import { getRoomBySlug } from '@/data/roomsData';
import { Button, Card } from '@/components/ui';
import { formatCurrency } from '@/utils/helpers/format';
import { useBookingStore } from '@/stores/bookingStore';

export const RoomDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { startBooking } = useBookingStore();
  const [selectedImage, setSelectedImage] = useState(0);

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
    // Initialize booking with default dates (today + 1 day check-in, +2 days check-out)
    const checkIn = new Date();
    checkIn.setDate(checkIn.getDate() + 1);
    const checkOut = new Date();
    checkOut.setDate(checkOut.getDate() + 3);

    startBooking(
      room,
      checkIn,
      checkOut,
      { adults: 2, children: 0, infants: 0 }
    );

    navigate('/booking/review');
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
              <div className="relative h-96 rounded-lg overflow-hidden mb-4">
                <img
                  src={room.images[selectedImage]}
                  alt={`${room.name} - Image ${selectedImage + 1}`}
                  className="w-full h-full object-cover"
                />
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
              <h1 className="text-3xl font-bold text-neutral-900 mb-4">{room.name}</h1>

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

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-neutral-900 mb-3">
                  About This Room
                </h2>
                <p className="text-neutral-700 leading-relaxed">{room.description}</p>
              </div>

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
              <Card padding="lg">
                <div className="mb-6">
                  <div className="text-3xl font-bold text-neutral-900 mb-1">
                    {formatCurrency(room.price)}
                    <span className="text-lg font-normal text-neutral-600">/night</span>
                  </div>
                  <p className="text-sm text-neutral-600">Taxes and fees included</p>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={handleBookNow}
                  className="mb-4"
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
                        <span className="font-bold text-primary-600">
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
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
