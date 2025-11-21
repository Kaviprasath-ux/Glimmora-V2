import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Menu } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { MobileMenu } from './MobileMenu';
import { SearchOverlay } from './SearchOverlay';
import { UserDropdown } from './UserDropdown';
import logo from '@/assets/logo.png';

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
    { name: 'Pre-Check-In', path: '/pre-checkin' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-neutral-200/80'
            : 'bg-white border-b border-neutral-200'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group relative z-10">
              <motion.img
                src={logo}
                alt="Glimmora"
                className="h-10 w-auto"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="relative px-5 py-2.5 group"
                  >
                    <span
                      className={`relative text-sm font-semibold tracking-wide ${
                        isActive
                          ? 'text-neutral-900'
                          : 'text-neutral-600 hover:text-neutral-900'
                      } transition-colors duration-200`}
                    >
                      {link.name}
                    </span>

                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-2 right-2 h-1 bg-primary-600 rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}

                    {/* Hover indicator */}
                    {!isActive && (
                      <span className="absolute bottom-0 left-2 right-2 h-1 bg-primary-200 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              {/* Search Button */}
              <motion.button
                onClick={() => setIsSearchOpen(true)}
                className="w-11 h-11 flex items-center justify-center text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-xl transition-all"
                aria-label="Search"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Search className="w-5 h-5" strokeWidth={2} />
              </motion.button>

              {/* Desktop Auth Buttons or User Dropdown */}
              {isAuthenticated ? (
                <div className="hidden lg:block">
                  <UserDropdown />
                </div>
              ) : (
                <div className="hidden lg:flex items-center gap-2">
                  <Link
                    to="/login"
                    className="px-5 py-2.5 text-neutral-700 hover:text-neutral-900 font-semibold text-sm rounded-xl hover:bg-neutral-100 transition-all"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-sm rounded-xl transition-all shadow-sm hover:shadow-md"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden w-11 h-11 flex items-center justify-center text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-xl transition-all"
                aria-label="Menu"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Menu className="w-6 h-6" strokeWidth={2} />
              </motion.button>
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
