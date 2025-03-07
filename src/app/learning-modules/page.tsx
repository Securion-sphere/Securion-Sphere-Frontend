"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import withAuth from "@/components/auth/withAuth";
import { Module } from "@/app/interface/module";
import { fetchData } from "@/utils/axiosInstance";
import ModuleCard from "@/components/learning-material/ModuleCard";
import SearchAndFilter from "@/components/learning-material/SearchAndFilter";

const LearningModules = () => {
  const router = useRouter();
  const [modules, setModules] = useState<Module[]>([]);
  const [filteredModules, setFilteredModules] = useState<Module[]>([]);

  // Fetch modules data from API on component mount
  useEffect(() => {
    const getModules = async () => {
      try {
        const fetchedModules = await fetchData<Module[]>("/learning-material");
        setModules(fetchedModules);
        setFilteredModules(fetchedModules); // Initialize filtered modules with all modules
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

      <SearchAndFilter modules={modules} onFilterChange={setFilteredModules} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModules.map((module) => (
          <ModuleCard
            key={module.id}
            module={module}
            onCardClick={handleModuleClick}
            actionButton={{
              label: "Learn",
              onClick: handleModuleClick,
            }}
          />
        ))}
      </div>

      {filteredModules.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No modules found matching your search criteria
        </div>
      )}
    </div>
  );
};

export default withAuth(LearningModules);
