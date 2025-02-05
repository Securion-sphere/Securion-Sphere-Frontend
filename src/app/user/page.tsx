"use client";

import { useEffect, useState } from "react";
import axiosInstant from "@/api/axiosInstance";
import { UserProfile } from "@/app/interface/userProfile";
import UserProfileContent from "@/components/user/UserProfile";

const UserProfilePage = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axiosInstant.get("/user/profile");
        setUserProfile(response.data);
      } catch (err) {
        setError("Failed to load user profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;
  if (!userProfile) return <div className="text-center">No user profile found.</div>;

  return <UserProfileContent userProfile={userProfile} />;
};

export default UserProfilePage;