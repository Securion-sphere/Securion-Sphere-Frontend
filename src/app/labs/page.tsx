"use client";

import React, { useState } from "react";
import LabDetail from "../components/LabDetail";
import Labs, { Lab } from "../components/Labs";

const labs: Lab[] = [
  {
    name: "Web Application for SQL Injection",
    category: "Injection",
    creator: "Mr. Injection",
    solved: true,
    points: 100,
  },
  {
    name: "XSS is on the way!",
    category: "Injection",
    creator: "Mr. Injection",
    solved: false,
    points: 100,
  },
  {
    name: "Let's try IDOR",
    category: "Access Control",
    creator: "Mr. Injection",
    solved: false,
    points: 100,
  },
  {
    name: "Business Logic on alert!",
    category: "Business Logic",
    creator: "Mr. Injection",
    solved: true,
    points: 100,
  },
  {
    name: "Basic cookie misconfiguration",
    category: "Misconfiguration",
    creator: "Mr. Injection",
    solved: false,
    points: 100,
  },
];

const LabsPage: React.FC = () => {
  const [selectedLab, setSelectedLab] = useState<Lab>(labs[0]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <main className="flex-grow flex">
        <div className="w-full flex">
          {/* Left Panel - Lab Details */}
          <div className="flex-1">
            <LabDetail selectedLab={selectedLab} />
          </div>

          {/* Right Panel - All Available Labs */}
          <div className="flex-1">
            <Labs labs={labs} onLabSelect={setSelectedLab} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default LabsPage;
