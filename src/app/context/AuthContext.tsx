"use client";

import axios from "axios";
import config from "@/config";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: any;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  const fetchUser = async () => {
    try {
      const accessToken = localStorage.getItem("AccessToken");
      if (!accessToken) return;

      // Fetch user profile with access token from localStorage
      const { data } = await axios.get(`${config.apiBaseUrl}/user/profile`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setUser(data);
    } catch (error) {
      console.error("Failed to fetch user", error);
      setUser(null);
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const accessToken = query.get('accessToken');
    const refreshToken = query.get('refreshToken');
  
    if (accessToken && refreshToken) {
      // Store tokens in localStorage
      localStorage.setItem('AccessToken', accessToken);
      localStorage.setItem('RefreshToken', refreshToken);
  
      // Remove the query params from the URL
      router.replace("/");
  
      // Fetch the user data now that the tokens are stored
      fetchUser();
    } else {
      // If no tokens found in URL, fetch the user based on existing localStorage tokens
      fetchUser();
    }
  }, []);  
  
  const logout = async () => {
    try {
      // Implement your logout logic
      localStorage.removeItem("AccessToken");
      localStorage.removeItem("RefreshToken");
      setUser(null);
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

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
