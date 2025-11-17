import { apiClient } from '../client';
import { API_ENDPOINTS } from '@/config/constants';
import type { Room, RoomFilters } from '../types/room.types';
import type { ApiResponse, PaginatedResponse } from '../types/common.types';

export const roomService = {
  getRooms: async (filters?: RoomFilters) => {
    const { data } = await apiClient.get<ApiResponse<PaginatedResponse<Room>>>(
      API_ENDPOINTS.ROOMS.LIST,
      { params: filters }
    );
    return data.data;
  },

  getRoomById: async (id: string) => {
    const { data } = await apiClient.get<ApiResponse<Room>>(
      API_ENDPOINTS.ROOMS.DETAIL(id)
    );
    return data.data;
  },

  checkAvailability: async (roomId: string, checkIn: string, checkOut: string) => {
    const { data } = await apiClient.get<ApiResponse<{ available: boolean }>>(
      API_ENDPOINTS.ROOMS.AVAILABILITY,
      { params: { roomId, checkIn, checkOut } }
    );
    return data.data;
  },
};
