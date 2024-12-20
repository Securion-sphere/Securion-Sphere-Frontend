"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import LabDetail from "@/components/labs/LabDetail";
import Labs from "@/components/labs/Labs";
import withAuth from "@/components/auth/withAuth";
import { useLabsStore } from "@/hooks/useLabsStore";
import { Lab } from "@/interfaces/labs";

const LabsPage: React.FC = () => {
  const { selectedLab, setSelectedLab, fetchLabs } = useLabsStore();
  const [isLabDetailVisible, setLabDetailVisible] = useState(false);

  const toggleLabDetail = () => {
    setLabDetailVisible(!isLabDetailVisible);
  };

  const markLabAsSolved = (lab: Lab) => {
    lab.solved = true; // Mark the lab as solved
    setSelectedLab({ ...lab }); // Update the selected lab in the store
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow flex flex-col lg:flex-row">
        {/* Left Panel - Lab Details */}
        {isLabDetailVisible && selectedLab && (
          <div className="flex-1 basis-full lg:basis-1/3 lg:block">
            <LabDetail
              selectedLab={selectedLab}
              markAsSolved={markLabAsSolved}
            />
          </div>
        )}
        {/* Right Panel - Labs List */}
        <div
          className={`flex-1 ${
            isLabDetailVisible ? "hidden lg:block lg:basis-2/3" : "basis-full"
          } transition-all`}
        >
          <div className="w-full">
            <Image
              src="/all_labs.png"
              alt="All Labs"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <Labs
            onLabSelect={(lab) => {
              setSelectedLab(lab);
              if (!isLabDetailVisible) toggleLabDetail();
            }}
          />
        </div>
      </main>

      {/* Toggle Button for Small Screens */}
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
