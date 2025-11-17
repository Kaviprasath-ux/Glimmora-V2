import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Search, Menu } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { MobileMenu } from './MobileMenu';
import { SearchOverlay } from './SearchOverlay';
import { UserDropdown } from './UserDropdown';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  // Handle scroll for sticky header
  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 20);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Rooms', path: '/rooms' },
    { name: 'Amenities', path: '/amenities' },
    { name: 'Pre-Check-In', path: '/pre-checkin', highlight: true },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-white'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-neutral-900">
                Glimmora
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="relative px-4 py-2 group"
                  >
                    <span
                      className={`relative ${
                        link.highlight
                          ? 'text-primary-600 font-semibold'
                          : isActive
                          ? 'text-neutral-900 font-medium'
                          : 'text-neutral-700 hover:text-neutral-900'
                      } transition-colors`}
                    >
                      {link.name}

                      {/* Animated dot for Pre-Check-In */}
                      {link.highlight && (
                        <motion.span
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute -top-1 -right-2 w-2 h-2 bg-primary-600 rounded-full"
                        />
                      )}
                    </span>

                    {/* Active underline */}
                    {isActive && !link.highlight && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}

                    {/* Hover underline */}
                    {!isActive && !link.highlight && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-300 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                    )}

                    {/* Pre-Check-In highlight underline */}
                    {link.highlight && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600"
                        animate={{ scaleX: [0.8, 1, 0.8] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-10 h-10 flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-all"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Desktop Auth Buttons or User Dropdown */}
              {isAuthenticated ? (
                <div className="hidden lg:block">
                  <UserDropdown />
                </div>
              ) : (
                <div className="hidden lg:flex items-center gap-3">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-neutral-700 hover:text-neutral-900 font-medium transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all shadow-sm hover:shadow-md"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden w-10 h-10 flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-all"
                aria-label="Menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-20" />

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
