"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/api/axiosInstance";
import config from "@/config";

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [moduleName, setModuleName] = useState("");
  const [moduleDescription, setModuleDescription] = useState("");
  const [moduleCategory, setModuleCategory] = useState("");
  const [customBackground, setCustomBackground] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      const acceptedMarkdownTypes = [
        "text/markdown",
        "text/x-markdown",
        "text/md",
        "text/plain",
      ];

      const isMarkdownExtension = selectedFile.name
        .toLowerCase()
        .endsWith(".md");

      if (
        selectedFile.type === "application/pdf" ||
        acceptedMarkdownTypes.includes(selectedFile.type) ||
        isMarkdownExtension
      ) {
        setError(null);
        setFile(selectedFile);
      } else {
        setError("Only .pdf and .md files are allowed.");
        setFile(null);
      }
    }
  };

  const handleBackgroundChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith("image/")) {
        setError("Only image files are allowed for background.");
        setCustomBackground(null);
      } else {
        setError(null);
        setCustomBackground(selectedFile);
      }
    }
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    if (!moduleName || !moduleDescription || !moduleCategory) {
      setError(
        "Please provide a name description and category for the module.",
      );
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("title", moduleName);
    formData.append("description", moduleDescription);
    formData.append("category", moduleCategory);
    formData.append("file", file);

    if (customBackground) {
      formData.append("image", customBackground);
    }

    try {
      const response = await axiosInstance.post(
        `${config.apiBaseUrl}/learning-material`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.status === 201) {
        router.push("/monitor/learning-modules");
      } else {
        setError("File upload failed. Please try again.");
      }
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "An error occurred while uploading. Please try again.",
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    router.push("/monitor/learning-modules");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Upload Learning Material</h1>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Module Name */}
        <div>
          <label
            className="block text-gray-700 font-bold text-xl"
            htmlFor="moduleName"
          >
            Module Name
          </label>
          <input
            type="text"
            id="moduleName"
            placeholder="Enter your module's name"
            value={moduleName}
            onChange={(e) => setModuleName(e.target.value)}
            className="mt-2 p-2 w-full border border-gray-300 rounded-xl"
            required
          />
        </div>

        {/* Module Description */}
        <div>
          <label
            className="block text-gray-700 font-bold text-xl"
            htmlFor="moduleDescription"
          >
            Module Description
          </label>
          <textarea
            id="moduleDescription"
            placeholder="Describe about this module"
            value={moduleDescription}
            onChange={(e) => setModuleDescription(e.target.value)}
            className="mt-2 p-2 w-full border border-gray-300 rounded-xl"
            rows={4}
            required
          />
        </div>

        {/* Module Category */}
        <div>
          <label
            className="block text-gray-700 font-bold text-xl"
            htmlFor="moduleCategory"
          >
            Module Category
          </label>
          <input
            type="text"
            id="moduleCategory"
            placeholder="Enter your module's Category"
            value={moduleCategory}
            onChange={(e) => setModuleCategory(e.target.value)}
            className="mt-2 p-2 w-full border border-gray-300 rounded-xl"
            required
          />
        </div>

        {/* Background Image */}
        <div>
          <label
            className="block text-gray-700 font-bold text-xl"
            htmlFor="customBackground"
          >
            Custom Background (Optional)
          </label>
          <input
            type="file"
            id="customBackground"
            onChange={handleBackgroundChange}
            accept="image/*"
            className="mt-2"
          />
        </div>

        {/* File Input */}
        <div>
          <label
            className="block text-gray-700 font-bold text-xl"
            htmlFor="file"
          >
            Choose a file (.pdf or .md only)
          </label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            accept=".pdf,.md"
            className="mt-2"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={isUploading}
            className="px-6 py-2 bg-blue-600 text-white text-xl font-bold rounded-xl hover:bg-blue-700 disabled:opacity-50"
          >
            {isUploading ? "Uploading..." : "Save"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-500 text-white rounded-xl text-xl font-bold hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadPage;
