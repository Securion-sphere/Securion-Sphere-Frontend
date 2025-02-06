"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import withAuth from "@/components/auth/withAuth";
import { Module } from "@/app/interface/module";
import { fetchData } from "@/api/axiosInstance"; // Assuming fetchData is already defined in axiosInstance
import ModuleCard from "@/components/learning-material/ModuleCard";

const LearningModules = () => {
  const router = useRouter();
  const [modules, setModules] = useState<Module[]>([]);
  const [selectedModule, setSelectedModule] = useState<number | null>(null);

  // Fetch modules data from API on component mount
  useEffect(() => {
    const getModules = async () => {
      try {
        const fetchedModules = await fetchData<Module[]>("/learning-material"); // Use axiosInstance to fetch data
        setModules(fetchedModules); // Set the fetched modules into state
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    };

    getModules();
  }, []);

  const handleModuleClick = (moduleId: number) => {
    const learningModule = modules.find((mod) => mod.id === moduleId);
    if (learningModule) {
      router.push(`/learning-modules/viewer/${moduleId}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-700">Learning Modules</h1>
          <p className="text-gray-600 mt-2">Welcome to the Learning Modules</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <ModuleCard
            key={module.id}
            module={module}
            onCardClick={handleModuleClick}
            actionButton={{
              label: "learn",
              onClick: handleModuleClick,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default withAuth(LearningModules);
