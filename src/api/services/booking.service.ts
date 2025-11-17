import { apiClient } from '../client';
import { API_ENDPOINTS } from '@/config/constants';
import type { Booking, CreateBookingData } from '../types/booking.types';
import type { ApiResponse, PaginatedResponse } from '../types/common.types';

export const bookingService = {
  createBooking: async (bookingData: CreateBookingData) => {
    const { data } = await apiClient.post<ApiResponse<Booking>>(
      API_ENDPOINTS.BOOKINGS.CREATE,
      bookingData
    );
    return data.data;
  },

  getBookings: async () => {
    const { data } = await apiClient.get<
      ApiResponse<PaginatedResponse<Booking>>
    >(API_ENDPOINTS.BOOKINGS.LIST);
    return data.data;
  },

  getBookingById: async (id: string) => {
    const { data } = await apiClient.get<ApiResponse<Booking>>(
      API_ENDPOINTS.BOOKINGS.DETAIL(id)
    );
    return data.data;
  },

  cancelBooking: async (id: string) => {
    const { data } = await apiClient.post<ApiResponse<Booking>>(
      API_ENDPOINTS.BOOKINGS.CANCEL(id)
    );
    return data.data;
  },
};
