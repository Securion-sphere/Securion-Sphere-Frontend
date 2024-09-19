import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import DockerButton from "./DockerButton";
import { Lab, LabDocker } from "@/app/modules/interface/labs";
import FlagSubmission from "@/app/pages/labs/FlagSubmission";
import useLabDocker from "@/app/modules/hooks/labs/useLabDocker";
import useFlagSubmission from "@/app/modules/hooks/labs/useFlagSubmission";

interface LabDetailProps {
  selectedLab: Lab;
  markAsSolved: (lab: Lab) => void;
}

const LabDetail: React.FC<LabDetailProps> = ({ selectedLab, markAsSolved }) => {
  const { labDockerData, handleSpawn } = useLabDocker(selectedLab);
  const { flag, setFlag, handleSubmitFlag, isFlagCorrect, hasSubmitted } =
    useFlagSubmission(selectedLab, markAsSolved);

  const [buttonStage, setButtonStage] = useState<string>("Spawn");

  useEffect(() => {
    if (selectedLab.solved) {
      setButtonStage("Pwned");
    } else {
      setButtonStage("Spawn");
    }
  }, [selectedLab]);

  const handlePlaying = () => {
    // Define what should happen when in 'Playing' state
  };

  const handlePwned = () => {
    // Define what should happen when in 'Pwned' state
  };

  return (
    <div className="bg-gray-50 shadow overflow-hidden h-full">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {selectedLab.name}
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          {selectedLab.description}
        </p>
      </div>
      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
        <DockerButton
          lab={selectedLab}
          labDockerData={labDockerData}
          onSpawn={handleSpawn}
          onPlaying={handlePlaying}
          onPwned={handlePwned}
          currentStage={buttonStage}
          setStage={setButtonStage}
        />
      </div>
      <FlagSubmission
        flag={flag}
        setFlag={setFlag}
        handleSubmitFlag={handleSubmitFlag}
        isFlagCorrect={isFlagCorrect}
        hasSubmitted={hasSubmitted}
      />
    </div>
  );
};

export default LabDetail;
