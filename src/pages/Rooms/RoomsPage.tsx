import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Maximize2, Eye } from 'lucide-react';
import { rooms } from '@/data/roomsData';
import { Button, Card } from '@/components/ui';
import { formatCurrency } from '@/utils/helpers/format';

export const RoomsPage = () => {
  const navigate = useNavigate();
  const [priceRange, setPriceRange] = useState<'all' | 'budget' | 'mid' | 'luxury'>('all');

  const filteredRooms = rooms.filter((room) => {
    if (priceRange === 'all') return true;
    if (priceRange === 'budget') return room.price <= 200;
    if (priceRange === 'mid') return room.price > 200 && room.price <= 350;
    if (priceRange === 'luxury') return room.price > 350;
    return true;
  });

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-neutral-900 mb-3">Our Rooms & Suites</h1>
          <p className="text-lg text-neutral-600">
            Discover the perfect accommodation for your stay
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            <Button
              variant={priceRange === 'all' ? 'primary' : 'secondary'}
              onClick={() => setPriceRange('all')}
            >
              All Rooms
            </Button>
            <Button
              variant={priceRange === 'budget' ? 'primary' : 'secondary'}
              onClick={() => setPriceRange('budget')}
            >
              Budget (≤ $200)
            </Button>
            <Button
              variant={priceRange === 'mid' ? 'primary' : 'secondary'}
              onClick={() => setPriceRange('mid')}
            >
              Mid-Range ($200-$350)
            </Button>
            <Button
              variant={priceRange === 'luxury' ? 'primary' : 'secondary'}
              onClick={() => setPriceRange('luxury')}
            >
              Luxury ($350+)
            </Button>
          </div>
        </div>

        {/* Room Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
            <Card
              key={room.id}
              padding="none"
              className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => navigate(`/rooms/${room.slug}`)}
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
              </div>

              {/* Room Details */}
              <div className="p-5">
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  {room.name}
                </h3>
                <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
                  {room.description}
                </p>

                {/* Room Features */}
                <div className="flex items-center gap-4 mb-4 text-sm text-neutral-600">
                  <div className="flex items-center gap-1">
                    <Users size={16} />
                    <span>{room.maxGuests} Guests</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Maximize2 size={16} />
                    <span>{room.size} sq ft</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye size={16} />
                    <span>{room.view}</span>
                  </div>
                </div>

                {/* Amenities Preview */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {room.amenities.slice(0, 3).map((amenity) => (
                    <span
                      key={amenity}
                      className="text-xs px-2 py-1 bg-neutral-100 text-neutral-700 rounded"
                    >
                      {amenity}
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
                    navigate(`/rooms/${room.slug}`);
                  }}
                >
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredRooms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-neutral-600 text-lg">
              No rooms found in this price range
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
