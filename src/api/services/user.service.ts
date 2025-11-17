import { apiClient } from '../client';
import type { User } from '../types/auth.types';
import type { UpdateUserData, ChangePasswordData } from '../types/user.types';
import type { ApiResponse } from '../types/common.types';

export const userService = {
  getProfile: async () => {
    const { data } = await apiClient.get<ApiResponse<User>>('/users/profile');
    return data.data;
  },

  updateProfile: async (userData: UpdateUserData) => {
    const { data } = await apiClient.patch<ApiResponse<User>>(
      '/users/profile',
      userData
    );
    return data.data;
  },

  changePassword: async (passwordData: ChangePasswordData) => {
    const { data } = await apiClient.post<ApiResponse<void>>(
      '/users/change-password',
      passwordData
    );
    return data;
  },
};
