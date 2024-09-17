"use client";

import React, { useState } from "react";
import LabDetail from "../components/labs/LabDetail";
import Labs from "../components/labs/Labs";
import { Lab, labs } from "../interface/labs";
import withAuth from "../components/auth/withAuth";

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
      <main className="flex-grow flex flex-col lg:flex-row">
        {/* Left Panel - Lab Details (Responsive toggle) */}
        {isLabDetailVisible && (
          <div className="flex-1 basis-full lg:basis-1/3 lg:block">
            <LabDetail
              selectedLab={selectedLab}
              markAsSolved={markLabAsSolved}
            />
          </div>
        )}
        {/* Right Panel - All Available Labs */}
        <div
          className={`flex-1 ${
            isLabDetailVisible ? "hidden lg:block lg:basis-2/3" : "basis-full"
          } transition-all`}
        >
          <Labs
            labs={labs}
            onLabSelect={(lab) => {
              setSelectedLab(lab);
              if (!isLabDetailVisible) toggleLabDetail(); // Ensure panel visibility is updated
            }}
          />
        </div>
      </main>

      {/* Button to show/hide lab details on smaller screens */}
      <button
        onClick={toggleLabDetail}
        className="block lg:hidden fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg"
      >
        {isLabDetailVisible ? "Hide Details" : "Show Details"}
      </button>
    </div>
  );
};

export default withAuth(LabsPage);
