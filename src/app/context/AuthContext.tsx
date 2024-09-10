"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import config from '@/config';

interface AuthContextType {
  user: any;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  // Fetch the user data
  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`${config.apiBaseUrl}/user/profile`, {
        withCredentials: true,
      });
      setUser(data);
    } catch (error) {
      console.error("Failed to fetch user", error);
      setUser(null);
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${config.apiBaseUrl}/auth/logout`, {}, {
        withCredentials: true,
      });
      setUser(null);
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  // Check if user is logged in when the component mounts
  useEffect(() => {
    fetchUser(); // Fetch the user on initial load
  }, []);

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
