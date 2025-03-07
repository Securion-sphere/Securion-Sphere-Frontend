import React, { useState, useEffect } from "react";
import Image from "next/image";
import DockerButton from "./DockerButton";
import { Lab } from "@/app/interface/labs";
import axiosInstance from "@/utils/axiosInstance";
import { UserProfile } from "@/app/interface/userProfile";
import { LabDocker } from "@/app/interface/labDocker";

interface LabDetailProps {
  selectedLab: Lab;
  markAsSolved: (lab: Lab) => boolean;
}

const LabDetail: React.FC<LabDetailProps> = ({ selectedLab, markAsSolved }) => {
  const [flag, setFlag] = useState("");
  const [buttonStage, setButtonStage] = useState<string>("Spawn");
  const [isFlagCorrect, setIsFlagCorrect] = useState<boolean>(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [labDockerData, setLabDockerData] = useState<LabDocker | null>(null);

  useEffect(() => {
    if (markAsSolved(selectedLab)) {
      setButtonStage("Pwned");
    } else {
      setButtonStage("Spawn");
      setIsFlagCorrect(false);
      setHasSubmitted(false);
    }
  }, [markAsSolved, selectedLab]);

  const handleSpawn = async () => {
    try {
      // Fetch and spawn lab instance as usual
      const spawnLabResponse = await axiosInstance.post("/actived-lab", {
        labId: selectedLab.id,
      });
      const spawnLab: LabDocker = spawnLabResponse.data;
      setLabDockerData(spawnLab);
    } catch (err) {
      console.error("An error occurred while handling the lab spawn:", err);
    }
  };

  const handleStop = async () => {
    try {
      await axiosInstance.delete("/actived-lab");
      setLabDockerData(null); // Clear the labDockerData when stopping
    } catch (err) {
      console.log("Error: Cannot destroy instance");
    }
  };

  const handleSubmitFlag = async () => {
    setHasSubmitted(true);

    try {
      const flagResponse = await axiosInstance.post(
        "/actived-lab/submit-flag",
        {
          flag: flag,
        },
      );

      if (flagResponse.data.msg === "Flag is correct") {
        setIsFlagCorrect(true);
        setButtonStage("Pwned");
        await axiosInstance.delete("/actived-lab").catch(() => {
          console.error("Error cannot delete active lab");
        });
        markAsSolved(selectedLab);
      } else {
        setIsFlagCorrect(false);
        alert("Incorrect flag, try again!");
      }
    } catch (err) {
      console.error("Error submitting flag:", err);
      alert("An error occurred while submitting the flag.");
    }
  };

  return (
    <div className="bg-gray-50 shadow overflow-hidden">
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
          setLabDockerData={setLabDockerData} // Pass setter to DockerButton
          setStage={setButtonStage}
          onSpawn={handleSpawn}
          onStop={handleStop}
          onPwned={() => {}}
          currentStage={buttonStage}
        />
      </div>
      <div className="px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <div
                className={`w-full flex gap-5 border-2 rounded-xl ${
                  hasSubmitted
                    ? !isFlagCorrect
                      ? "border-red-500"
                      : "border-green-500"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="text"
                  className="p-3 shadow-sm w-full sm:text-sm bg-gray-50 rounded-xl"
                  placeholder="Please submit your flag"
                  value={flag}
                  onChange={(e) => setFlag(e.target.value)}
                />
                <button
                  className="flex items-center px-4 py-2 text-white rounded-xl"
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
