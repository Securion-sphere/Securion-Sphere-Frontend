import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import { Lab, LabDocker } from "@/interfaces/labs";

const useLabDocker = (selectedLab: Lab) => {
  const [labDockerData, setLabDockerData] = useState<LabDocker | null>(null);

  const { mutate: spawnLab } = useMutation({
    mutationFn: async (userId: number) => {
      // Fetch user profile
      const userProfileResponse = await axiosInstance.get("/user/profile");
      const userProfile = userProfileResponse.data;

      // Delete existing lab instance
      await axiosInstance.delete("/actived-lab", { data: { userId } });

      // Create new lab instance
      const spawnLabResponse = await axiosInstance.post("/actived-lab", {
        labId: selectedLab.id,
        userId: userProfile.id,
      });
      return spawnLabResponse.data;
    },
    onSuccess: (data) => {
      setLabDockerData(data);
    },
    onError: (error) => {
      console.error("Error fetching lab instance:", error);
    },
  });

  const handleSpawn = async () => {
    try {
      const userProfileResponse = await axiosInstance.get("/user/profile");
      const userProfile = userProfileResponse.data;
      spawnLab(userProfile.id);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  return { labDockerData, handleSpawn };
};

export default useLabDocker;
