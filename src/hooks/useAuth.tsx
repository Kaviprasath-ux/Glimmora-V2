import { useState } from 'react';
import { User } from '@/api/types/auth.types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export function useAuth(): AuthState {
  // Mock authentication state
  // Set to false by default - will integrate real auth later
  const [isAuthenticated] = useState(false);

  // Mock user object
  const mockUser: User = {
    id: '1',
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=0052CC&color=fff',
    emailVerified: true,
    createdAt: new Date().toISOString(),
  };

  return {
    user: isAuthenticated ? mockUser : null,
    isAuthenticated,
  };
}
