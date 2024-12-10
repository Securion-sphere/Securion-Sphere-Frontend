'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const UploadPage = () => {
    const [file, setFile] = useState<File | null>(null);
    const [moduleName, setModuleName] = useState('');
    const [moduleDescription, setModuleDescription] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const router = useRouter();
  
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = event.target.files?.[0];
      if (selectedFile) {
        // Check file type
        if (selectedFile.type !== 'application/pdf' && selectedFile.type !== 'text/markdown') {
          setError('Only .pdf and .md files are allowed.');
          setFile(null);
        } else {
          setError(null);
          setFile(selectedFile);
        }
      }
    };
  
    const handleSave = async (event: React.FormEvent) => {
      event.preventDefault();
  
      if (!file) {
        setError('Please select a file to upload.');
        return;
      }
  
      if (!moduleName || !moduleDescription) {
        setError('Please provide a name and description for the module.');
        return;
      }
  
      setIsUploading(true);
  
      const formData = new FormData();
      formData.append('file', file);
      formData.append('moduleName', moduleName);
      formData.append('moduleDescription', moduleDescription);
  
      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          // Redirect to the learning modules page or show success message
          router.push('/monitor/learning-modules');
        } else {
          setError('File upload failed. Please try again.');
        }
      } catch (error) {
        setError('An error occurred while uploading. Please try again.');
      } finally {
        setIsUploading(false);
      }
    };
  
    const handleCancel = () => {
      // Redirect to the learning modules page without saving
      router.push('/monitor/learning-modules');
    };
  
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Upload Learning Material</h1>
  
        <form onSubmit={handleSave} className="space-y-6">
          {/* Module Name */}
          <div>
            <label className="block text-gray-700" htmlFor="moduleName">
              Module Name
            </label>
            <input
              type="text"
              id="moduleName"
              value={moduleName}
              onChange={(e) => setModuleName(e.target.value)}
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>
  
          {/* Module Description */}
          <div>
            <label className="block text-gray-700" htmlFor="moduleDescription">
              Module Description
            </label>
            <textarea
              id="moduleDescription"
              value={moduleDescription}
              onChange={(e) => setModuleDescription(e.target.value)}
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              rows={4}
              required
            />
          </div>
  
          {/* File Input */}
          <div>
            <label className="block text-gray-700" htmlFor="file">
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
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isUploading ? 'Uploading...' : 'Save'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  };

export default UploadPage;
