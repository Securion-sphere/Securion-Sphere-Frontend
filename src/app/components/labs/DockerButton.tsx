import React, { useState, useEffect } from "react";
import { CirclePlay, CircleStop, CircleCheck } from "lucide-react";
import { Lab } from "@/app/data/labs";
import { LabDocker, labDocker } from "@/app/data/labDocker";

interface DockerButtonProps {
  lab: Lab;
  onSpawn: () => void;
  onPlaying: () => void;
  onPwned: () => void;
  currentStage: string;
  setStage: (stage: string) => void; // Prop to externally update stage
}

const DockerButton: React.FC<DockerButtonProps> = ({
  lab,
  onSpawn,
  onPlaying,
  onPwned,
  currentStage,
  setStage,
}) => {
  const [stage, setLocalStage] = useState<string>(currentStage); // Use local stage state
  const [copied, setCopied] = useState<boolean>(false);

  const selectedLabDocker = labDocker.find(
    (dockerLab) => dockerLab.name === lab.name,
  ) || { name: "Test", ip: "localhost", port: 80 };

  useEffect(() => {
    setLocalStage(currentStage);
  }, [currentStage]);

  const handleStopClick = () => {
    setLocalStage("Spawn");
    setStage("Spawn");
  };

  const handleClick = () => {
    switch (stage) {
      case "Spawn":
        setLocalStage("Playing");
        setStage("Playing"); // Notify parent about the stage change
        onSpawn();
        break;
      case "Playing":
        let content = `${selectedLabDocker.ip}:${selectedLabDocker.port}`;
        navigator.clipboard.writeText(content);
        onPlaying();

        setCopied(true);
        setTimeout(() => setCopied(false), 4000); // "Copied to clipboard" notification
        break;
      case "Pwned":
        onPwned();
        break;
      default:
        setLocalStage("Spawn");
        setStage("Spawn"); // Notify parent about the stage change
    }
  };

  const getButtonText = () => {
    switch (stage) {
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
            <div className="flex w-full gap-7 text-sm justify-around">
              <div>
                <div className="text-base">{selectedLabDocker.ip}</div>
                <div className="font-light text-gray-400">IP address</div>
              </div>
              <div>
                <div className="text-base">{selectedLabDocker.port}</div>
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
      <button onClick={handleClick} className="w-full inline-flex items-center">
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
