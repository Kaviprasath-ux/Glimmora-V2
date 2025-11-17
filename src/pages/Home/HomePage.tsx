import { Link } from 'react-router-dom';
import { ArrowRight, Star, MapPin, Calendar } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { ROUTES, APP_NAME, APP_TAGLINE } from '@/config/constants';

export const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-primary-100 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-neutral-900 mb-6">
              {APP_TAGLINE}
            </h1>
            <p className="text-xl text-neutral-700 mb-8">
              Experience the perfect balance of modern design and natural beauty.
              Thoughtfully crafted spaces for mindful travelers seeking authentic luxury.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={ROUTES.ROOMS}>
                <Button size="lg" rightIcon={<ArrowRight size={20} />}>
                  Explore Rooms
                </Button>
              </Link>
              <Link to={ROUTES.SIGNUP}>
                <Button size="lg" variant="secondary">
                  Sign Up Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 mb-4">
              Why Choose {APP_NAME}?
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Discover what makes our hotel the perfect choice for your next
              getaway
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card padding="lg" variant="outlined" hoverable>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star size={32} className="text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  Thoughtfully Designed Spaces
                </h3>
                <p className="text-neutral-600">
                  Every suite blends modern comfort with natural elements,
                  creating a serene sanctuary for your stay
                </p>
              </div>
            </Card>

            <Card padding="lg" variant="outlined" hoverable>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin size={32} className="text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  Prime Location
                </h3>
                <p className="text-neutral-600">
                  Centrally located with easy access to major attractions and
                  business districts
                </p>
              </div>
            </Card>

            <Card padding="lg" variant="outlined" hoverable>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar size={32} className="text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  Easy Booking
                </h3>
                <p className="text-neutral-600">
                  Simple and secure online booking system for a hassle-free
                  experience
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
            Your Journey Begins Here
          </h2>
          <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
            Discover a place where modern luxury meets natural tranquility.
            Welcome to {APP_NAME}.
          </p>
          <Link to={ROUTES.ROOMS}>
            <Button
              size="lg"
              variant="secondary"
              rightIcon={<ArrowRight size={20} />}
            >
              View Available Rooms
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
