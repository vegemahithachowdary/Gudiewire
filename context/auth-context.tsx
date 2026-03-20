'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/lib/types';
import { CURRENT_USER } from '@/lib/mock-data';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (phone: string, otp: string) => Promise<void>;
  signup: (email: string, phone: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking if user is logged in (checking localStorage or session)
    const timer = setTimeout(() => {
      const storedUser = localStorage.getItem('gigshield_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const login = async (phone: string, otp: string) => {
    setIsLoading(true);
    try {
      // Simulate OTP verification
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, this would validate with backend
      if (otp === '000000' || otp === '123456') {
        const user = {
          ...CURRENT_USER,
          phone,
        };
        setUser(user);
        localStorage.setItem('gigshield_user', JSON.stringify(user));
      } else {
        throw new Error('Invalid OTP');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, phone: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate signup
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newUser: User = {
        ...CURRENT_USER,
        id: `user_${Date.now()}`,
        email,
        phone,
        profileComplete: false,
      };

      setUser(newUser);
      localStorage.setItem('gigshield_user', JSON.stringify(newUser));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gigshield_user');
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('gigshield_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
