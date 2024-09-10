import React, { useState } from "react";
import Image from "next/image";
import { Lab } from "./Labs"; // Adjust path if needed

interface LabDetailProps {
  selectedLab: Lab;
}

const LabDetail: React.FC<LabDetailProps> = ({ selectedLab }) => {
  const [stage, setStage] = useState<"initial" | "playing" | "pwned">(
    "initial",
  );
  const [flag, setFlag] = useState("");
  const [isFlagCorrect, setIsFlagCorrect] = useState(false);

  // Dummy flag for demonstration; replace with your validation logic
  const correctFlag = "correct-flag";

  const handleButtonClick = () => {
    if (stage === "initial") {
      setStage("playing");
    } else if (stage === "playing") {
      setStage("pwned");
    }
  };

  const handleSubmitFlag = () => {
    if (flag === correctFlag) {
      setIsFlagCorrect(true);
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden h-full">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {selectedLab.name}
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
        {stage === "initial" && (
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={handleButtonClick}
          >
            Docker Spawn
          </button>
        )}
        {stage === "playing" && (
          <div>
            <p className="text-sm text-gray-500">
              IP and Port to play: 192.168.1.100:8080
            </p>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-2"
              onClick={handleButtonClick}
            >
              Proceed to Pwned Stage
            </button>
          </div>
        )}
        {stage === "pwned" && (
          <div>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-2"
              onClick={handleSubmitFlag}
            >
              Submit Flag
            </button>
            {isFlagCorrect && (
              <p className="text-green-500 mt-2">
                Congratulations, You pwned this lab!
              </p>
            )}
          </div>
        )}
        <div className="flex gap-5">
          <input
            type="text"
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md mt-2"
            placeholder="Please submit your flag"
            value={flag}
            onChange={(e) => setFlag(e.target.value)}
          />
          <button
            type="button"
            onClick={handleSubmitFlag}
            className="inline-flex items-center justify-center p-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white"
          >
            <Image src="/submit.svg" alt="Submit" width={25} height={25} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LabDetail;
