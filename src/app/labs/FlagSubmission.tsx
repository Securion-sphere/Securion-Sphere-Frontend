import React from "react";
import Image from "next/image";

interface FlagSubmissionProps {
  flag: string;
  setFlag: (flag: string) => void;
  handleSubmitFlag: () => void;
  isFlagCorrect: boolean;
  hasSubmitted: boolean;
}

const FlagSubmission: React.FC<FlagSubmissionProps> = ({
  flag,
  setFlag,
  handleSubmitFlag,
  isFlagCorrect,
  hasSubmitted,
}) => {
  return (
    <div className="px-4 py-5 sm:p-0">
      <dl className="sm:divide-y sm:divide-gray-200">
        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <div
              className={`w-full flex gap-5 border-2 rounded-md ${
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
                <Image src="/submit.svg" alt="Submit" width={25} height={25} />
              </button>
            </div>
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default FlagSubmission;
