"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { mockModules } from "@/app/data/mockModules";
import withAuth from "@/app/components/auth/withAuth";
import { Module } from "@/app/types/module";

const LearningModules = () => {
  const router = useRouter();
  const [modules, setModules] = useState<Module[]>(mockModules);
  const [selectedModule, setSelectedModule] = useState<number | null>(null);

  const handleEdit = (moduleId: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    router.push(`/monitor/learning-modules/edit/${moduleId}`);
  };

  const handleDelete = (moduleId: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    setModules(modules.filter((module) => module.id !== moduleId));
    alert(`Deleted module with ID: ${moduleId}`);
  };

  const handleModuleClick = (moduleId: number) => {
    const learningModule = modules.find((mod) => mod.id === moduleId);
    if (learningModule) {
      router.push(
        `/monitor/view-pdf?pdfUrl=${encodeURIComponent(learningModule.pdfUrl)}`,
      );
    }
  };

  const handleUploadNewMaterial = () => {
    router.push("/monitor/learning-modules/upload");
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-700">Learning Modules</h1>
          <p className="text-gray-600 mt-2">Welcome to the Learning Modules</p>
        </div>
        <button
          onClick={handleUploadNewMaterial}
          className="px-6 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-colors duration-200 flex items-center"
        >
          <span className="mr-2">+</span> Upload New Material
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <div
            key={module.id}
            onClick={() => handleModuleClick(module.id)}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden cursor-pointer flex flex-col"
          >
            {/* Card Header */}
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                {module.title}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {module.description}
              </p>
            </div>

            {/* Card Footer with Actions */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end mt-auto">
              <button
                onClick={(e) => handleEdit(module.id, e)}
                className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors duration-200"
              >
                Edit Module
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default withAuth(LearningModules);
