"use client";

import React, { useState } from "react";
import LabDetail from "../components/labs/LabDetail";
import Labs from "../components/labs/Labs";
import { Lab, labs } from "../data/labs";

const LabsPage: React.FC = () => {
  const [selectedLab, setSelectedLab] = useState<Lab>(labs[0]);
  const [isLabDetailVisible, setLabDetailVisible] = useState<boolean>(false);

  // Function to toggle the visibility of the left panel
  const toggleLabDetail = () => {
    setLabDetailVisible(!isLabDetailVisible);
  };

  const markLabAsSolved = (lab: Lab) => {
    lab.solved = true;
    setSelectedLab({ ...lab });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow flex">
        <div className="flex w-full">
          {/* Left Panel - Lab Details */}
          {isLabDetailVisible && (
            <div className="flex-1 basis-1/3">
              <LabDetail
                selectedLab={selectedLab}
                markAsSolved={markLabAsSolved}
              />
            </div>
          )}

          {/* Right Panel - All Available Labs */}
          <div
            className={`flex-1 ${isLabDetailVisible ? "basis-2/3" : "basis-full"} transition-all`}
          >
            <Labs
              labs={labs}
              onLabSelect={(lab) => {
                setSelectedLab(lab);
                if (!isLabDetailVisible) toggleLabDetail(); // Ensure panel visibility is updated
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default LabsPage;
