'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { getMockModuleById } from "@/app/data/mockModules";
import { Module } from '@/app/types/module';

const EditModulePage = ({ params }: { params: { id: number } }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [currentFile, setCurrentFile] = useState<string>('');
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const [newFile, setNewFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Use mock data in development
      const learning_module = getMockModuleById(Number(params.id));
      if (learning_module) {
        setTitle(learning_module.title);
        setDescription(learning_module.description);
        setCurrentFile(learning_module.pdfUrl);
        setBackgroundImage(learning_module.image)
      } else {
        setError("Module not found");
      }
      setIsLoading(false);
    } else {
      // Use real API in production
      fetchModuleData();
    }
  }, [params.id]);

  const fetchModuleData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_NESTJS_API}/modules/${params.id}`
      );
      const moduleData: Module = response.data;

      setTitle(moduleData.title);
      setDescription(moduleData.description);
      setCurrentFile(moduleData.pdfUrl);
      setBackgroundImage(moduleData.image)
    } catch (err) {
      setError("Failed to load module data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf' && selectedFile.type !== 'text/markdown') {
        setError('Only .pdf and .md files are allowed.');
        setNewFile(null);
      } else {
        setError(null);
        setNewFile(selectedFile);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      if (newFile) {
        formData.append('file', newFile);
      }

      await axios.put(
        `${process.env.NEXT_PUBLIC_NESTJS_API}/modules/${params.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      router.push('/monitor/learning-modules');
    } catch (err) {
      setError('Failed to update module');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_NESTJS_API}/modules/${params.id}`);
      router.push('/monitor/learning-modules');
    } catch (err) {
      setError('Failed to delete module');
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
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

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-gray-700 mb-2 font-bold text-xl" htmlFor="title">
            Module Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 mb-2 font-bold text-xl" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows={4}
            required
          />
        </div>

        {/* Current File */}
        {currentFile && (
          <div className="p-4 bg-gray-50 rounded-md">
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
          <label className="block text-gray-700 mb-2 font-bold text-xl" htmlFor="file">
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
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/monitor/learning-modules')}
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
            <p className="mb-6">Are you sure you want to delete this module? This action cannot be undone.</p>
            <div className="flex space-x-4">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
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
