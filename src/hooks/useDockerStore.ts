import { create } from "zustand";
import axiosInstance from "@/api/axiosInstance";

interface DockerState {
  labDockerData: { id: number; ip: string; port: number } | null;
  setLabDockerData: (data: { id: number; ip: string; port: number }) => void;
  stopLabInstance: (userId: string) => Promise<void>;
}

export const useDockerStore = create<DockerState>((set) => ({
  labDockerData: null,
  setLabDockerData: (data) => set({ labDockerData: data }),

  stopLabInstance: async (userId) => {
    try {
      await axiosInstance.delete("/actived-lab", { data: { userId } });
    } catch (error) {
      console.error("Error stopping lab instance:", error);
    }
  },
}));
