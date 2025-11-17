import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';
import { ROUTES, APP_NAME } from '@/config/constants';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';

export const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Animated Hero Section with Booking Widget */}
      <HeroSection />

      {/* Animated Features Section */}
      <FeaturesSection />

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
