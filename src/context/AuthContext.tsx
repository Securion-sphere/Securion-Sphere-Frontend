"use client";

import axiosInstance from "@/api/axiosInstance";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState, useRef } from "react";
import { UserProfile } from "@/app/interface/userProfile";

interface AuthContextType {
  user: UserProfile | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const router = useRouter();
  const isRefreshing = useRef(false);
  const refreshAttempts = useRef(0);
  const MAX_REFRESH_ATTEMPTS = 3;

  const fetchUser = async (skipRefresh: boolean = false) => {
    try {
      const response = await axiosInstance.get("/user/profile");
      setUser(response.data);
      refreshAttempts.current = 0;
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
        console.error("Failed to fetch user", error);
        await logout();
      }
    }
  };

  const refreshToken = async (): Promise<boolean> => {
    if (isRefreshing.current) return false;

    try {
      isRefreshing.current = true;
      refreshAttempts.current += 1;

      const response = await axiosInstance.post("/auth/refresh", {});
      localStorage.setItem("AccessToken", response.data.accessToken);
      localStorage.setItem("RefreshToken", response.data.refreshToken);

      return true;
    } catch (error) {
      console.error("Failed to refresh token", error);
      return false;
    } finally {
      isRefreshing.current = false;
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      localStorage.removeItem("AccessToken");
      localStorage.removeItem("RefreshToken");
      setUser(null);
      refreshAttempts.current = 0;
      router.push("/auth/login");
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const accessToken = query.get("accessToken");
    const refreshToken = query.get("refreshToken");
    const errorMessage = query.get("error");

    if (errorMessage) {
      alert("Your email is not authorized. Please contact your supervisor.");
      router.replace("/auth/login");
    } else if (accessToken && refreshToken) {
      localStorage.setItem("AccessToken", accessToken);
      localStorage.setItem("RefreshToken", refreshToken);
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
