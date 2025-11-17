import { createContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '@/api/types/auth.types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, remember?: boolean) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('glimmora_user');
      const authToken = localStorage.getItem('glimmora_token');

      if (storedUser && authToken) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string, remember = false) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock validation - in production, call your API
    if (email && password.length >= 6) {
      const mockUser: User = {
        id: 'user-' + Math.random().toString(36).substr(2, 9),
        fullName: 'John Doe',
        email: email,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent('John Doe')}&background=0052CC&color=fff&size=200`,
        phone: '+1 (555) 123-4567',
        emailVerified: true,
        createdAt: new Date().toISOString(),
      };

      setUser(mockUser);

      // Store in localStorage
      localStorage.setItem('glimmora_user', JSON.stringify(mockUser));
      localStorage.setItem('glimmora_token', 'mock-token-' + Date.now());

      if (remember) {
        localStorage.setItem('glimmora_remember', 'true');
      }

      setIsLoading(false);

      // Redirect to home or dashboard
      navigate('/');
    } else {
      setIsLoading(false);
      throw new Error('Invalid credentials');
    }
  };

  const signup = async (data: SignupData) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockUser: User = {
      id: 'user-' + Math.random().toString(36).substr(2, 9),
      fullName: `${data.firstName} ${data.lastName}`,
      email: data.email,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.firstName + ' ' + data.lastName)}&background=0052CC&color=fff&size=200`,
      phone: data.phone,
      emailVerified: true,
      createdAt: new Date().toISOString(),
    };

    setUser(mockUser);
    localStorage.setItem('glimmora_user', JSON.stringify(mockUser));
    localStorage.setItem('glimmora_token', 'mock-token-' + Date.now());

    setIsLoading(false);

    // Redirect to home
    navigate('/');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('glimmora_user');
    localStorage.removeItem('glimmora_token');
    localStorage.removeItem('glimmora_remember');
    navigate('/');
  };

  const updateUser = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('glimmora_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      signup,
      logout,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}
