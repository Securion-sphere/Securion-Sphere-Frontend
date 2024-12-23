import React, { useState } from "react";
import { CirclePlay, CircleStop, CircleCheck } from "lucide-react";
import { useDockerStore } from "@/hooks/useDockerStore";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import { UserProfile } from "@/interfaces/userProfile";

interface DockerButtonProps {
  labId: number;
  currentStage: string;
  setStage: (stage: string) => void;
}

const DockerButton: React.FC<DockerButtonProps> = ({
  labId,
  currentStage,
  setStage,
}) => {
  const { labDockerData, setLabDockerData, stopLabInstance } = useDockerStore();
  const [copied, setCopied] = useState(false);

  const fetchUserProfile = async (): Promise<UserProfile> => {
    const response = await axiosInstance.get("/user/profile");
    return response.data;
  };

  const {
    data: userProfile,
    isError,
    isLoading,
  } = useQuery<UserProfile, Error>({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
  });

  const handleSpawn = async () => {
    if (!userProfile) return;
    try {
      const response = await axiosInstance.post("/actived-lab", {
        labId,
        userId: userProfile.id,
      });
      setLabDockerData(response.data);
      setStage("Playing");
    } catch (error) {
      console.error("Error spawning lab:", error);
    }
  };

  const handleStopClick = async () => {
    if (!userProfile) return;
    if (userProfile.id) {
      await stopLabInstance(userProfile.id.toString());
      setStage("Spawn");
    }
  };

  const handleCopyIpPort = () => {
    if (labDockerData) {
      const content = `${labDockerData.ip}:${labDockerData.port}`;
      navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 4000);
    }
  };

  const getButtonText = () => {
    switch (currentStage) {
      case "Playing":
        return (
          <div className="w-full h-full text-white flex gap-5 justify-start items-center px-8 py-4 font-medium rounded-full shadow-sm bg-gray-600 hover:bg-gray-700">
            <div
              className="h-full text-white cursor-pointer"
              onClick={handleStopClick}
            >
              <CircleStop
                strokeWidth={2}
                className="w-12 h-full hover:text-red-500"
              />
            </div>
            <div
              className="flex w-full gap-7 text-sm justify-around"
              onClick={handleCopyIpPort}
            >
              <div>
                <div className="text-base">{labDockerData?.ip}</div>
                <div className="font-light text-gray-400">IP address</div>
              </div>
              <div>
                <div className="text-base">{labDockerData?.port}</div>
                <div className="font-light text-gray-400">Ports</div>
              </div>
            </div>
          </div>
        );
      case "Pwned":
        return (
          <div className="w-full h-full text-white flex gap-5 justify-start items-center px-8 py-3 font-medium rounded-full shadow-sm bg-green-500 hover:bg-green-600">
            <CircleCheck strokeWidth={2} className="w-12 h-full" />
            Congratulations, You pwned this lab!
          </div>
        );
      default:
        return (
          <div className="w-full h-full text-white flex gap-5 justify-start items-center px-8 py-3 font-medium rounded-full shadow-sm bg-blue-600 hover:bg-blue-700">
            <CirclePlay strokeWidth={2} className="w-12 h-full" />
            Docker Spawn
          </div>
        );
    }
  };

  return (
    <div>
      <button onClick={handleSpawn} className="w-full inline-flex items-center">
        {getButtonText()}
      </button>
      {copied && (
        <span className="text-sm text-green-600 ml-2">
          Copied to clipboard!
        </span>
      )}
    </div>
  );
};

export default DockerButton;
