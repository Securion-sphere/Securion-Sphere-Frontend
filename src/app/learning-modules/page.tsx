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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <div
            key={module.id}
            onClick={() => handleModuleClick(module.id)}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden cursor-pointer flex flex-col"
          >
            {/* Card Header */}
            <div
              className={`p-6 relative ${
                module.image ? "bg-cover bg-center" : ""
              }`}
              style={
                module.image ? { backgroundImage: `url(${module.image})` } : {}
              }
            >
              {module.image && (
                <div className="absolute inset-0 bg-black bg-opacity-30 rounded-2xl" />
              )}
              <h2
                className={`text-xl font-semibold mb-2 line-clamp-2 ${
                  module.image ? "text-white relative z-10" : "text-gray-800"
                }`}
              >
                {module.title}
              </h2>
              <p
                className={`text-gray-600 mb-4 line-clamp-3 ${
                  module.image ? "text-white relative z-10" : "text-gray-600"
                }`}
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
