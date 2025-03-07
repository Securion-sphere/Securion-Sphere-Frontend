"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";

interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: "supervisor" | "student";
  profileImg: string;
  firstName: string;
  lastName: string;
  // Add other user fields as needed
}

interface AuthContextType {
  user: UserProfile | null;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    router.push("/auth/login");
  }, [router]);

  const fetchUser = useCallback(async () => {
    try {
      const response = await axiosInstance.get<UserProfile>("/user/profile");
      setUser(response.data);
      return true;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return false;
    }
  }, []);

  const handleAuthCallback = useCallback(() => {
    const query = new URLSearchParams(window.location.search);
    const accessToken = query.get("accessToken");
    const refreshToken = query.get("refreshToken");
    const error = query.get("error");

    if (error) {
      console.error("Authentication error:", error);
      return false;
    }

    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // Clean URL without navigation
      const url = new URL(window.location.href);
      url.searchParams.delete("accessToken");
      url.searchParams.delete("refreshToken");
      window.history.replaceState({}, "", url.toString());

      return true;
    }

    return false;
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);

      try {
        // Check for auth callback parameters
        const isCallback = handleAuthCallback();

        // Verify existing or new tokens
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        if (!accessToken || !refreshToken) {
          throw new Error("No auth tokens found");
        }

        // Fetch user profile
        const success = await fetchUser();
        if (!success) {
          throw new Error("Failed to fetch user profile");
        }

        // If this was a callback and everything succeeded, redirect to home
        if (isCallback) {
          router.push("/");
        }
      } catch (error) {
        console.error("Auth initialization failed:", error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [handleAuthCallback, fetchUser, logout, router]);

  return (
    <AuthContext.Provider value={{ user, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
