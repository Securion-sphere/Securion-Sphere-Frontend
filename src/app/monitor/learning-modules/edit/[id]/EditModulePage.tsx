"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/api/axiosInstance";
import { Module } from "@/app/interface/module";
import { fetchData } from "@/api/axiosInstance";
import config from "@/config";

const EditModulePage = ({ params }: { params: { id: number } }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Form states
  const [learning_module, setLearning_module] = useState<Module>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [currentFile, setCurrentFile] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const [backgroundOption, setBackgroundOption] = useState("default");
  const [newBackgroundImage, setNewBackgroundImage] = useState<File | null>(
    null,
  );
  const [newFile, setNewFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchModuleData = async () => {
      try {
        const response = await fetchData<Module>(
          `${config.apiBaseUrl}/learning-material/${params.id}`,
        );
        const module_data = response;
        setLearning_module(module_data);
        setTitle(module_data.title);
        setDescription(module_data.description);
        setCategory(module_data.category);
        setCurrentFile(module_data.filePresignedUrl);
        setBackgroundImage(module_data.imagePresignedUrl);
      } catch (error) {
        console.error("Error fetching module:", error);
        setError("Module not found");
      } finally {
        setIsLoading(false);
      }
    };

    fetchModuleData();
  }, [params.id]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      const acceptedMarkdownTypes = [
        "text/markdown",
        "text/x-markdown",
        "text/md",
        "text/plain", // Some systems may upload .md files as text/plain
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
        setNewFile(selectedFile);
      } else {
        setError("Only .pdf and .md files are allowed.");
        setNewFile(null);
      }
    }
  };

  const handleBackgroundChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setNewBackgroundImage(selectedFile);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      if (newFile) {
        formData.append("file", newFile);
      }
      if (backgroundOption === "custom" && newBackgroundImage) {
        formData.append("image", newBackgroundImage);
      }

      await axiosInstance.patch(
        `${config.apiBaseUrl}/learning-material/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      router.push("/monitor/learning-modules");
    } catch (err) {
      setError("Failed to update module");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(
        `${config.apiBaseUrl}/learning-material/${params.id}`,
      );
      router.push("/monitor/learning-modules");
    } catch (err) {
      setError("Failed to delete module");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Edit Learning Module</h1>
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="px-4 py-2 bg-red-500 text-white rounded-2xl hover:bg-red-600"
        >
          Delete Module
        </button>
      </div>

      {/* Card Header */}
      <div className="bg-white mb-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden cursor-pointer flex flex-col">
        <div
          className={`p-6 relative ${
            backgroundImage ? "bg-cover bg-center" : ""
          }`}
          style={
            backgroundImage
              ? { backgroundImage: `url(${backgroundImage})` }
              : {}
          }
        >
          {backgroundImage && (
            <div className="absolute inset-0 bg-black bg-opacity-30 rounded-2xl" />
          )}
          <h2
            className={`text-xl font-semibold mb-2 line-clamp-2 ${
              backgroundImage ? "text-white relative z-10" : "text-gray-800"
            }`}
          >
            {title}
          </h2>
          <p
            className={`text-gray-600 mb-4 line-clamp-3 ${
              backgroundImage ? "text-white relative z-10" : "text-gray-600"
            }`}
          >
            {description}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 mt-6">
        {/* Title */}
        <div>
          <label
            className="block text-gray-700 mb-2 font-bold text-xl"
            htmlFor="title"
          >
            Module Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-xl"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label
            className="block text-gray-700 mb-2 font-bold text-xl"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-xl"
            rows={4}
            required
          />
        </div>

        {/* Category */}
        <div>
          <label
            className="block text-gray-700 mb-2 font-bold text-xl"
            htmlFor="category"
          >
            Module Category
          </label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-xl"
            required
          />
        </div>

        {/* Background Options */}
        <div>
          <label className="block text-gray-700 font-bold text-xl">
            Background Image
          </label>
          <div className="flex flex-col mt-2">
            <select
              value={backgroundOption}
              onChange={(e) => setBackgroundOption(e.target.value)}
              className="p-2 border border-gray-300 rounded-xl"
            >
              <option value="default">Use Current Background</option>
              <option value="custom">Upload New Background</option>
            </select>

            {backgroundOption === "custom" && (
              <input
                type="file"
                onChange={handleBackgroundChange}
                accept="image/*"
                className="mt-2"
              />
            )}
          </div>
        </div>

        {/* Current File */}
        {currentFile && (
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="font-medium">Current File:</p>
            <a
              href={currentFile}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              View Current File
            </a>
          </div>
        )}

        {/* New File Upload */}
        <div>
          <label
            className="block text-gray-700 mb-2 font-bold text-xl"
            htmlFor="file"
          >
            Upload New File (Optional)
          </label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            accept=".pdf,.md"
            className="w-full"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/monitor/learning-modules")}
            className="px-6 py-2 bg-gray-500 text-white rounded-xl hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Delete Module</h3>
            <p className="mb-6">
              Are you sure you want to delete this module? This action cannot be
              undone.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-xl hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditModulePage;
