import React, { useState, useEffect } from "react";
import Image from "next/image";
import DockerButton from "./DockerButton";
import { Lab } from "@/app/interface/labs";
import axiosInstance from "@/api/axiosInstance";
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
  }, [selectedLab]);

  const handleSpawn = async () => {
    try {
      await axiosInstance
        .get("/user/profile")
        .then(async (userProfile) => {
          await axiosInstance
            .get("/actived-lab/get-instance")
            .then(async (userLabResponse) => {
              console.log("UserLab: ", userLabResponse);
              const userLab: LabDocker = userLabResponse.data;
              if (userLab) {
                await axiosInstance
                  .delete("/actived-lab", {
                    data: { userId: userProfile.data.id },
                  })
                  .catch(() => {
                    console.error("Error cannot delete actived lab");
                  });
              }

              const spawnLabResponse = await axiosInstance.post(
                "/actived-lab",
                {
                  labId: selectedLab.id,
                  userId: userProfile.data.id,
                },
              );
              let spawnLab: LabDocker = spawnLabResponse.data;

              setLabDockerData(spawnLab);
            })
            .catch(async (err) => {
              console.error("Error fetching lab instance");
              const spawnLabResponse = await axiosInstance.post(
                "/actived-lab",
                {
                  labId: selectedLab.id,
                  userId: userProfile.data.id,
                },
              );
              let spawnLab: LabDocker = spawnLabResponse.data;

              setLabDockerData(spawnLab);
            });
        })
        .catch(() => {
          console.error("Error fetching user profile");
        });
    } catch (err) {
      console.error("Error spawning lab:", err);
    }
  };

  const handleSubmitFlag = async () => {
    setHasSubmitted(true);

    try {
      const userResponse = await axiosInstance.get("/user/profile");
      const userProfile: UserProfile = userResponse.data;

      if (userProfile.id) {
        const flagResponse = await axiosInstance.post(
          "/actived-lab/submit-flag",
          {
            userId: userProfile.id,
            flag: flag,
          },
        );

        if (flagResponse.data.msg == "Flag is correct") {
          setIsFlagCorrect(true);
          setButtonStage("Pwned");
          await axiosInstance
            .delete("/actived-lab", {
              data: { userId: userProfile.id },
            })
            .catch(() => {
              console.error("Error cannot delete actived lab");
            });
          markAsSolved(selectedLab); // Notify parent component that the lab is solved
        } else {
          setIsFlagCorrect(false);
          alert("Incorrect flag, try again!");
        }
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
          setStage={setButtonStage}
          onSpawn={handleSpawn}
          onPlaying={() => {}}
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
