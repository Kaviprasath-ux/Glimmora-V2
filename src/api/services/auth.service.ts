import { apiClient } from '../client';
import { API_ENDPOINTS } from '@/config/constants';
import type {
  LoginCredentials,
  SignupData,
  AuthResponse,
  RefreshTokenResponse,
} from '../types/auth.types';
import type { ApiResponse } from '../types/common.types';

export const authService = {
  login: async (credentials: LoginCredentials) => {
    const { data } = await apiClient.post<ApiResponse<AuthResponse>>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    return data.data;
  },

  signup: async (signupData: SignupData) => {
    const { data } = await apiClient.post<ApiResponse<AuthResponse>>(
      API_ENDPOINTS.AUTH.SIGNUP,
      signupData
    );
    return data.data;
  },

  logout: async () => {
    const { data } = await apiClient.post<ApiResponse<void>>(
      API_ENDPOINTS.AUTH.LOGOUT
    );
    return data;
  },

  refreshToken: async () => {
    const { data } = await apiClient.post<ApiResponse<RefreshTokenResponse>>(
      API_ENDPOINTS.AUTH.REFRESH
    );
    return data.data;
  },

  verifyEmail: async (token: string) => {
    const { data } = await apiClient.post<ApiResponse<void>>(
      API_ENDPOINTS.AUTH.VERIFY_EMAIL,
      { token }
    );
    return data;
  },
};
