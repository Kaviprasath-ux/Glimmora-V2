import { Link } from 'react-router-dom';
import { ArrowRight, Star, MapPin, Calendar } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { ROUTES, APP_NAME, APP_TAGLINE } from '@/config/constants';

export const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative min-h-[80vh] sm:min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/70 via-neutral-900/50 to-primary-900/60"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 drop-shadow-2xl animate-fade-in">
              {APP_TAGLINE}
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-white/95 mb-10 drop-shadow-lg max-w-3xl mx-auto leading-relaxed">
              Experience the perfect balance of modern design and natural beauty.
              Thoughtfully crafted spaces for mindful travelers seeking authentic luxury.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={ROUTES.ROOMS}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all duration-300 font-medium text-lg hover:scale-105 hover:shadow-2xl"
              >
                Explore Rooms
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/50 text-white rounded-lg hover:bg-white/20 transition-all duration-300 font-medium text-lg hover:scale-105"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/70 rounded-full"></div>
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
