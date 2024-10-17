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
      if (!accessToken) {
        router.push('/auth/login');
        return;
      }
  
      await axios.get(`${config.apiBaseUrl}/user/profile`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then(response => {
        setUser(response.data);
      }).catch(async (error) => {
        if (error.response?.status === 401) {
          await refreshToken();
          fetchUser();
        } else {
          console.error('Failed to fetch user', error);
          setUser(null);
          router.push('/auth/login');
        }
      });
    } catch (error) {
      console.error('Failed to fetch user', error);
      setUser(null);
      router.push('/auth/login');
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const accessToken = query.get('accessToken');
    const refreshToken = query.get('refreshToken');
  
    if (accessToken && refreshToken) {
      localStorage.setItem('AccessToken', accessToken);
      localStorage.setItem('RefreshToken', refreshToken);
      router.replace("/");
      fetchUser();
    } else {
      fetchUser();
    }
  }, []);
  
  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem('RefreshToken');
      if (!refreshToken) {
        throw new Error('No refresh token found');
      }
  
      const response = await axios.post(
        `${config.apiBaseUrl}/auth/refresh`,
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
          withCredentials: true,
        }
      );
      
      const newAccessToken = response.data.accessToken;
      const newRefreshToken = response.data.refreshToken;
      localStorage.setItem('AccessToken', newAccessToken);
      localStorage.setItem('RefreshToken', newRefreshToken);
    } catch (error) {
      console.error('Failed to refresh token', error);
      logout();
    }
  };  
  
  const logout = async () => {
    try {
      await axios.post(
        `${config.apiBaseUrl}/auth/logout`, 
        {}, 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
          },
          withCredentials: true,  // Ensures cookies are sent if needed
        }
      );
  
      // Clear tokens and user data on successful logout
      localStorage.removeItem("AccessToken");
      localStorage.removeItem("RefreshToken");
      setUser(null);
  
      // Redirect to login page
      router.push('/auth/login');
    } catch (error) {
      console.error("Failed to logout", error);
      // Optionally handle logout failure, e.g., show an alert or fallback behavior
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
