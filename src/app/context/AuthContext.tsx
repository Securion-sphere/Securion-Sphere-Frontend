"use client";

import axios from "axios";
import config from "@/config";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState, useRef } from "react";

interface AuthContextType {
  user: any;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const isRefreshing = useRef(false);
  const refreshAttempts = useRef(0);
  const MAX_REFRESH_ATTEMPTS = 3;

  // Add development bypass flag
  const isDevelopmentBypass = process.env.NEXT_PUBLIC_DEV_AUTH_BYPASS === 'true';

  const fetchUser = async (skipRefresh: boolean = false) => {
    // If development bypass is enabled, skip user fetching
    if (isDevelopmentBypass) {
      setUser({ isDeveloper: true });
      return;
    }

    try {
      const accessToken = localStorage.getItem("AccessToken");
      if (!accessToken) {
        await logout();
        return;
      }

      const response = await axios.get(`${config.apiBaseUrl}/user/profile`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      
      setUser(response.data);
      // Reset refresh attempts on successful fetch
      refreshAttempts.current = 0;
      
    } catch (error: any) {
      if (error.response?.status === 401 && !skipRefresh) {
        // Only attempt refresh if we haven't exceeded max attempts
        if (refreshAttempts.current < MAX_REFRESH_ATTEMPTS) {
          const refreshSuccess = await refreshToken();
          if (refreshSuccess) {
            // Retry fetch with skipRefresh=true to prevent infinite loop
            return fetchUser(true);
          }
        }
        // If we get here, either refresh failed or we exceeded max attempts
        await logout();
      } else {
        console.error('Failed to fetch user', error);
        await logout();
      }
    }
  };

  const refreshToken = async (): Promise<boolean> => {
    // Prevent concurrent refresh attempts
    if (isRefreshing.current) {
      return false;
    }

    try {
      isRefreshing.current = true;
      refreshAttempts.current += 1;

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
      
      return true;
    } catch (error) {
      console.error('Failed to refresh token', error);
      return false;
    } finally {
      isRefreshing.current = false;
    }
  };

  const logout = async () => {
    try {
      const accessToken = localStorage.getItem('AccessToken');
      if (accessToken) {
        await axios.post(
          `${config.apiBaseUrl}/auth/logout`, 
          {}, 
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          }
        ).catch(error => {
          // Silently handle logout API errors
          console.error("Logout API error:", error);
        });
      }
    } finally {
      // Always clear local storage and state
      localStorage.removeItem("AccessToken");
      localStorage.removeItem("RefreshToken");
      setUser(null);
      refreshAttempts.current = 0;
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