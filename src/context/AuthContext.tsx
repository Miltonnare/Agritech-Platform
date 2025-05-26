import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import api from '../services/api';

interface User {
  email: string;
  name: string;
  dateJoined: string;
  phone?: string;
  location?: {
    address?: string;
    city?: string;
    country?: string;
  };
  role?: string;
  profileImage?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<User>;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<User>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (token) {
          const response = await api.get<User>('/auth/me');
          setUser(response.data);
        }
      } catch (error) {
        console.error('Error loading user:', error);
        // Clear tokens if there's an error
        localStorage.removeItem('auth_token');
        localStorage.removeItem('refresh_token');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const signUp = async (email: string, password: string, name: string): Promise<User> => {
    const response = await api.post<{ user: User; token: string; refreshToken: string }>('/auth/signup', {
      email,
      password,
      name
    });

    const { user: newUser, token, refreshToken } = response.data;
    
    // Store tokens
    localStorage.setItem('auth_token', token);
    localStorage.setItem('refresh_token', refreshToken);
    
    // Update state
    setUser(newUser);
    
    return newUser;
  };

  const login = async (email: string, password: string): Promise<User> => {
    const response = await api.post<{ user: User; token: string; refreshToken: string }>('/auth/login', {
      email,
      password
    });

    const { user: loggedInUser, token, refreshToken } = response.data;
    
    // Store tokens
    localStorage.setItem('auth_token', token);
    localStorage.setItem('refresh_token', refreshToken);
    
    // Update state
    setUser(loggedInUser);
    
    return loggedInUser;
  };

  const updateProfile = async (data: Partial<User>): Promise<User> => {
    const response = await api.patch<User>('/auth/profile', data);
    const updatedUser = response.data;
    
    // Update state
    setUser(updatedUser);
    
    return updatedUser;
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      // Clear tokens and state regardless of API call success
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      setUser(null);
    }
  };

  const value = {
    user,
    loading,
    signUp,
    login,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 