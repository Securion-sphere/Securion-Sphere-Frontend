"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import config from '@/config'

interface AuthContextType {
  user: any;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  const login = async (token: string) => {
    // Save token in local storage or cookie
    localStorage.setItem('jwt', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // Fetch the user data
    try {
      const { data } = await axios.get(`${config.apiBaseUrl}/user/profile`);
      setUser(data);
    } catch (error) {
      console.error("Failed to fetch user", error);
    }
  };

  const logout = () => {
    localStorage.removeItem('jwt');
    setUser(null);
    // Optionally call backend logout endpoint
  };

  // Check if user is already logged in when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      login(token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
