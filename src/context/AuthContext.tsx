"use client";

import axios from "axios";
import config from "@/config";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState, useRef } from "react";
import { UserProfile } from "@/app/interface/userProfile";

interface AuthContextType {
  user: UserProfile | null;
  logout: () => void;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const isRefreshing = useRef(false);
  const refreshAttempts = useRef(0);
  const MAX_REFRESH_ATTEMPTS = 3;

  const clearError = () => setError(null);

  const handleAuthError = (errorMessage: string) => {
    setError(errorMessage);
    router.push('/auth/login');
  };

  const fetchUser = async (skipRefresh: boolean = false) => {
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
      refreshAttempts.current = 0;
      clearError();
      
    } catch (error: any) {
      if (error.response?.status === 401 && !skipRefresh) {
        if (refreshAttempts.current < MAX_REFRESH_ATTEMPTS) {
          const refreshSuccess = await refreshToken();
          if (refreshSuccess) {
            return fetchUser(true);
          }
        }
        await logout();
      } else {
        console.error('Failed to fetch user', error);
        await logout();
      }
    }
  };

  const refreshToken = async (): Promise<boolean> => {
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
          console.error("Logout API error:", error);
        });
      }
    } finally {
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
    const authError = query.get('error');
  
    if (accessToken && refreshToken) {
      localStorage.setItem('AccessToken', accessToken);
      localStorage.setItem('RefreshToken', refreshToken);
      router.replace("/");
      fetchUser();
    } else if (authError === 'unauthorized') {
      handleAuthError("Your email is not registered in the system. Please contact your supervisor.");
    } else {
      fetchUser();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, logout, error, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};