import React, { useState, useEffect } from "react";
import Image from "next/image";
import DockerButton from "./DockerButton";
import { Lab } from "../data/labs";
import { labDocker, LabDocker } from "../data/labDocker";

interface LabDetailProps {
  selectedLab: Lab;
  markAsSolved: (lab: Lab) => void;
}

const LabDetail: React.FC<LabDetailProps> = ({ selectedLab, markAsSolved }) => {
  const [flag, setFlag] = useState("");
  const [buttonStage, setButtonStage] = useState<string>("Spawn");
  const [isFlagCorrect, setIsFlagCorrect] = useState<boolean>(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false); // Track if submitted

  useEffect(() => {
    if (selectedLab.solved) {
      setButtonStage("Pwned");
    } else {
      setButtonStage("Spawn");
      setIsFlagCorrect(false);
      setHasSubmitted(false);
    }
  }, [selectedLab]);

  const handleSpawn = () => {
    console.log("Docker Spawn clicked");
  };

  const handlePlaying = () => {
    console.log("Playing stage clicked");
  };

  const handlePwned = () => {
    console.log("Pwned stage clicked");
  };

  const handleSubmitFlag = () => {
    setHasSubmitted(true);

    const selectedLabDocker = labDocker.find(
      (dockerLab: LabDocker) => dockerLab.name === selectedLab.name,
    );

    if (selectedLabDocker && flag === selectedLabDocker.flag) {
      setIsFlagCorrect(true);
      setButtonStage("Pwned");
      markAsSolved(selectedLab);
    } else {
      setIsFlagCorrect(false);
      alert("Incorrect flag, try again!");
    }
  };

  return (
    <div className="bg-gray-50 shadow overflow-hidden">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {selectedLab.name}
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
        <DockerButton
          lab={selectedLab}
          setStage={setButtonStage} // Pass the setStage function
          onSpawn={handleSpawn}
          onPlaying={handlePlaying}
          onPwned={handlePwned}
          currentStage={buttonStage}
        />
      </div>
      <div className="px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <div
                className={`w-full flex gap-5 border-2 rounded-md
                  ${
                    hasSubmitted
                      ? !isFlagCorrect
                        ? "border-red-500"
                        : "border-green-500"
                      : "border-gray-300"
                  }`}
              >
                <input
                  type="text"
                  className="p-3 shadow-sm w-full sm:text-sm bg-gray-50 rounded-md"
                  placeholder="Please submit your flag"
                  value={flag}
                  onChange={(e) => setFlag(e.target.value)}
                />
                <button
                  className="flex items-center px-4 py-2 text-white rounded-md"
                  onClick={handleSubmitFlag}
                >
                  <Image
                    src="/submit.svg"
                    alt="Submit"
                    width={25}
                    height={25}
                  />
                </button>
              </div>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default LabDetail;
