import { Link } from 'react-router-dom';
import { Hotel, Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/hooks';
import { Button } from '@/components/ui';
import { APP_NAME, ROUTES } from '@/config/constants';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to={ROUTES.HOME}
            className="flex items-center gap-2 text-primary-700 hover:text-primary-800 transition-colors"
          >
            <Hotel size={28} />
            <span className="text-xl font-serif font-bold">{APP_NAME}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to={ROUTES.ROOMS}
              className="text-neutral-700 hover:text-primary-600 transition-colors font-medium"
            >
              Rooms
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to={ROUTES.BOOKING}
                  className="text-neutral-700 hover:text-primary-600 transition-colors font-medium"
                >
                  My Bookings
                </Link>
                <Link
                  to={ROUTES.PROFILE}
                  className="text-neutral-700 hover:text-primary-600 transition-colors font-medium flex items-center gap-2"
                >
                  <User size={18} />
                  {user?.fullName}
                </Link>
                <Button onClick={handleLogout} variant="ghost" size="sm">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN}>
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to={ROUTES.SIGNUP}>
                  <Button size="sm">Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-neutral-700 hover:text-primary-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white">
          <div className="px-4 py-4 space-y-3">
            <Link
              to={ROUTES.ROOMS}
              className="block text-neutral-700 hover:text-primary-600 transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Rooms
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to={ROUTES.BOOKING}
                  className="block text-neutral-700 hover:text-primary-600 transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Bookings
                </Link>
                <Link
                  to={ROUTES.PROFILE}
                  className="block text-neutral-700 hover:text-primary-600 transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <Button onClick={handleLogout} variant="ghost" fullWidth>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  to={ROUTES.LOGIN}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button variant="ghost" fullWidth>
                    Login
                  </Button>
                </Link>
                <Link
                  to={ROUTES.SIGNUP}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button fullWidth>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
