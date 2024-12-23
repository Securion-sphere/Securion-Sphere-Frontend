import React, { useState } from "react";
import Image from "next/image";
import DockerButton from "./DockerButton";
import axiosInstance from "@/api/axiosInstance";
import { useLabsStore } from "@/hooks/useLabsStore";

const LabDetail: React.FC = () => {
  const [flag, setFlag] = useState("");
  const [isFlagCorrect, setIsFlagCorrect] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const {
    selectedLab,
    labDockerData,
    buttonStage,
    setLabDockerData,
    setButtonStage,
    markLabAsSolved,
  } = useLabsStore();

  if (!selectedLab) {
    return <p className="text-center text-gray-500">No lab selected.</p>;
  }

  const handleSpawn = async () => {
    try {
      const userProfileResponse = await axiosInstance.get("/user/profile");
      const userId = userProfileResponse.data.id;

      // Check for existing active lab
      const activeLabResponse = await axiosInstance
        .get("/actived-lab/get-instance")
        .catch(() => null);
      const activeLab = activeLabResponse?.data;

      if (activeLab) {
        await axiosInstance.delete("/actived-lab", {
          data: { userId },
        });
      }

      // Spawn new lab
      const spawnLabResponse = await axiosInstance.post("/actived-lab", {
        labId: selectedLab.id,
        userId,
      });
      setLabDockerData(spawnLabResponse.data);
      setButtonStage("Playing");
    } catch (err) {
      console.error("Error spawning lab:", err);
    }
  };

  const handleSubmitFlag = async () => {
    setHasSubmitted(true);

    try {
      const userProfileResponse = await axiosInstance.get("/user/profile");
      const userId = userProfileResponse.data.id;

      const flagResponse = await axiosInstance.post(
        "/actived-lab/submit-flag",
        {
          userId,
          flag,
        },
      );

      if (flagResponse.data.msg === "Flag is correct") {
        setIsFlagCorrect(true);
        setButtonStage("Pwned");
        await axiosInstance.delete("/actived-lab", { data: { userId } });
        markLabAsSolved(selectedLab.id.toString()); // Mark lab as solved
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
          labId={selectedLab.id}
          setStage={setButtonStage}
          currentStage={buttonStage}
        />
      </div>
      <div className="px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <div
                className={`w-full flex gap-5 border-2 rounded-md ${
                  hasSubmitted
                    ? isFlagCorrect
                      ? "border-green-500"
                      : "border-red-500"
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
