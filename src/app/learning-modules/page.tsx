"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import withAuth from "@/components/auth/withAuth";
import { Module } from "@/app/interface/module";
import { fetchData } from "@/api/axiosInstance"; // Assuming fetchData is already defined in axiosInstance

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
          <div
            key={module.id}
            onClick={() => handleModuleClick(module.id)}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden cursor-pointer flex flex-col group"
          >
            {/* Card Header */}
            <div
              className={`p-6 relative flex-grow ${module.imagePresignedUrl ? "bg-cover bg-center" : ""}`}
              style={module.imagePresignedUrl ? { backgroundImage: `url(${module.imagePresignedUrl})` } : {}}
            >
              {module.imagePresignedUrl && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl transition-all duration-300 group-hover:bg-opacity-75" />
              )}
              <h2
                className={`text-xl font-semibold mb-2 line-clamp-2 ${module.imagePresignedUrl ? "text-white relative z-10" : "text-gray-800"}`}
              >
                {module.title}
              </h2>
              {/* Card Description (hidden initially) */}
              <p
                className={`text-gray-600 mb-4 line-clamp-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${module.imagePresignedUrl ? "text-white relative z-10" : "text-gray-600"}`}
              >
                {module.description}
              </p>
            </div>

            {/* Card Footer with Actions */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end mt-auto">
              <button
                onClick={() => handleModuleClick(module.id)}
                className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors duration-200"
              >
                Learn
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default withAuth(LearningModules);
