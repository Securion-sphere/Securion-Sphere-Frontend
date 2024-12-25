"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { mockModules } from "@/app/data/mockModules";
import withAuth from "@/components/auth/withAuth";

// Dynamically import PDF viewer to avoid SSR issues
const PDFViewer = dynamic(() => import("@/components/viewer/PDFViewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 flex items-center justify-center">
      Loading PDF viewer...
    </div>
  ),
});

// Dynamically import Markdown viewer
const MarkdownViewer = dynamic(
  () => import("@/components/viewer/MarkdownViewer"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-96 flex items-center justify-center">
        Loading Markdown viewer...
      </div>
    ),
  },
);

const ModuleViewer = () => {
  const params = useParams();
  const [module, setModule] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const moduleId = Number(params.moduleId);
    const currentModule = mockModules.find((mod) => mod.id === moduleId);

    if (currentModule) {
      setModule(currentModule);
    } else {
      setError("Module not found");
    }
    setLoading(false);
  }, [params.moduleId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !module) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
        <p className="text-gray-600">{error || "Module not found"}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-700">{module.title}</h1>
        <p className="text-gray-600 mt-2">{module.description}</p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6">
        {module.fileUrl?.endsWith(".pdf") ? (
          <PDFViewer fileUrl={module.fileUrl} />
        ) : module.fileUrl?.endsWith(".md") ? (
          <MarkdownViewer fileUrl={module.fileUrl} />
        ) : (
          <div className="text-center text-gray-600">
            Unsupported file format
          </div>
        )}
      </div>
    </div>
  );
};

export default withAuth(ModuleViewer);
