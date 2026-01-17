// Authentication Context for Railway Ticket Reservation System
// Manages user login state with localStorage persistence

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Omit<User, 'id' | 'isAdmin'> & { password: string }) => Promise<boolean>;
  logout: () => void;
  toggleAdminMode: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'railway_user';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEY);
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAdmin(parsedUser.isAdmin || false);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...user, isAdmin }));
    }
  }, [user, isAdmin]);

  // Mock login - accepts any valid email format with any password
  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Basic validation
    if (!email || !password) {
      return false;
    }

    // Check if email format is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return false;
    }

    // Create mock user from email
    const mockUser: User = {
      id: `user_${Date.now()}`,
      fullName: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      email,
      mobile: '9876543210',
      isAdmin: false,
    };

    setUser(mockUser);
    setIsAdmin(false);
    return true;
  };

  // Mock register
  const register = async (userData: Omit<User, 'id' | 'isAdmin'> & { password: string }): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newUser: User = {
      id: `user_${Date.now()}`,
      fullName: userData.fullName,
      email: userData.email,
      mobile: userData.mobile,
      isAdmin: false,
    };

    setUser(newUser);
    setIsAdmin(false);
    return true;
  };

  // Logout
  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  // Toggle admin mode (for demo purposes)
  const toggleAdminMode = () => {
    if (user) {
      setIsAdmin(prev => !prev);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin,
        login,
        register,
        logout,
        toggleAdminMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
