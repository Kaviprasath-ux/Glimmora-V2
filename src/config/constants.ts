export const APP_NAME = 'Glimmora Hotel';
export const APP_VERSION = '2.0.0';

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
