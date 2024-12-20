"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { mockModules } from "@/app/data/mockModules";
import withAuth from "@/app/components/auth/withAuth";
import { Module } from "@/app/types/module";

const ViewPDF = () => {
  const searchParams = useSearchParams();
  const [currentModule, setCurrentModule] = useState<Module | null>(null);
  
  useEffect(() => {
    const pdfUrl = searchParams.get('pdfUrl');
    if (pdfUrl) {
      // Find the module that matches the PDF URL
      const learning_module = mockModules.find(mod => mod.pdfUrl === decodeURIComponent(pdfUrl));
      if (learning_module) {
        setCurrentModule(learning_module);
      }
    }
  }, [searchParams]);

  if (!currentModule) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading material...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">{currentModule.title}</h1>
          <p className="mt-2 text-gray-600">{currentModule.description}</p>
        </div>
      </div>

      {/* PDF Viewer Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <iframe
            src={currentModule.pdfUrl}
            className="w-full h-[calc(100vh-300px)] border-0"
            title={`PDF viewer for ${currentModule.title}`}
          />
        </div>

        {/* Navigation Controls */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-200"
          >
            Back to Modules
          </button>
          
          {/* Optional: Download button */}
          <a
            href={currentModule.pdfUrl}
            download
            className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors duration-200"
          >
            Download PDF
          </a>
        </div>
      </div>
    </div>
  );
};

export default withAuth(ViewPDF);