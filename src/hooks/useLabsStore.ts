import { create } from "zustand";
import { Lab, SolvedLab } from "@/interfaces/labs";
import { LabDocker } from "@/interfaces/labDocker";
import axiosInstance from "@/api/axiosInstance";

interface LabsStore {
  labs: Lab[];
  selectedLab: Lab | null;
  labDockerData: LabDocker | null;
  buttonStage: string;
  setLabs: (labs: Lab[]) => void;
  setSelectedLab: (lab: Lab) => void;
  setLabDockerData: (dockerData: LabDocker | null) => void;
  setButtonStage: (stage: string) => void;
  markLabAsSolved: (labId: string) => void;
  fetchLabs: () => Promise<void>;
}

export const useLabsStore = create<LabsStore>((set) => ({
  labs: [],
  selectedLab: null,
  labDockerData: null,
  buttonStage: "Spawn",

  setLabs: (labs) => set({ labs }),
  setSelectedLab: (lab) => set({ selectedLab: lab }),
  setLabDockerData: (dockerData) => set({ labDockerData: dockerData }),
  setButtonStage: (stage) => set({ buttonStage: stage }),

  markLabAsSolved: (labId) =>
    set((state) => ({
      labs: state.labs.map((lab) =>
        lab.id.toString() === labId ? { ...lab, solved: true } : lab,
      ),
    })),

  fetchLabs: async () => {
    try {
      const labResponse = await axiosInstance.get("/lab");
      const labsData = labResponse.data;

      const userProfileResponse = await axiosInstance.get("/user/profile");
      const solvedLabs = userProfileResponse.data.student.solved_lab;

      const updatedLabs = labsData.map((lab: Lab) => ({
        ...lab,
        solved: solvedLabs.some(
          (solvedLab: SolvedLab) => solvedLab.labId === lab.id,
        ),
      }));

      set({ labs: updatedLabs });
      if (updatedLabs.length > 0) {
        set({ selectedLab: updatedLabs[0] });
      }
    } catch (error) {
      console.error("Error fetching labs:", error);
    }
  },
}));
