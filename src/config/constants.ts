export const APP_NAME = 'Glimmora';
export const APP_VERSION = '2.0.0';
export const APP_TAGLINE = 'Grounded in Luxury';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  DASHBOARD: '/dashboard',
  ROOMS: '/rooms',
  BOOKING: '/booking',
  PROFILE: '/profile',
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    VERIFY_EMAIL: '/auth/verify-email',
  },
  ROOMS: {
    LIST: '/rooms',
    DETAIL: (id: string) => `/rooms/${id}`,
    AVAILABILITY: '/rooms/availability',
  },
  BOOKINGS: {
    CREATE: '/bookings',
    LIST: '/bookings',
    DETAIL: (id: string) => `/bookings/${id}`,
    CANCEL: (id: string) => `/bookings/${id}/cancel`,
  },
} as const;

export const QUERY_KEYS = {
  ROOMS: 'rooms',
  ROOM_DETAIL: 'room-detail',
  BOOKINGS: 'bookings',
  BOOKING_DETAIL: 'booking-detail',
  USER: 'user',
} as const;

export const CONTACT_INFO = {
  address: {
    street: '1250 Ocean Boulevard',
    city: 'Santa Monica',
    state: 'California',
    zip: '90401',
    country: 'United States',
  },
  phone: '+1 (310) 555-2847',
  email: 'reservations@terrasuites.com',
  website: 'www.terrasuites.com',
  hours: {
    frontDesk: '24/7',
    checkIn: '3:00 PM',
    checkOut: '11:00 AM',
  },
  social: {
    instagram: 'https://instagram.com/terrasuites',
    facebook: 'https://facebook.com/terrasuites',
    twitter: '@terrasuites',
    linkedin: 'https://linkedin.com/company/terra-suites',
  },
} as const;

export const ABOUT_TEXT = 'TERRA Suites embodies the perfect balance of modern luxury and natural tranquility. Nestled along the California coast, our boutique property offers thoughtfully designed spaces where contemporary elegance meets organic materials and mindful hospitality. Each stay is crafted to ground you in comfort while elevating your experience through personalized service and sustainable luxury.';
