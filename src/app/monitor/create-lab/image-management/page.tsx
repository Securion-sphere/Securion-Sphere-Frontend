"use client";

import React, { useState, useEffect } from "react";
import axiosInstance from "@/api/axiosInstance";
import withAuth from "@/components/auth/withAuth";
import SearchBar from "@/components/ui/SearchBar";

interface imageProp {
  id: number;
  image_name: string;
}

const ImageManagementPage = () => {
    const [images, setImages] = useState<imageProp[]>([]);
    const [filteredImages, setFilteredImages] = useState<imageProp[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imageName, setImageName] = useState<string>("");
    const [isUploading, setIsUploading] = useState<boolean>(false);
  
    useEffect(() => {
      const fetchImages = async () => {
        try {
          const response = await axiosInstance.get("/lab-image");
          setImages(response.data);
          setFilteredImages(response.data);
        } catch (error) {
          console.error("Error fetching images:", error);
          alert("Failed to load images.");
        }
      };
  
      fetchImages();
    }, []);
  
    const handleSearch = (term: string) => {
      setFilteredImages(
        images.filter((image) =>
          image.image_name.toLowerCase().includes(term.toLowerCase()),
        ),
      );
    };
  
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.[0]) {
        setSelectedFile(e.target.files[0]);
      }
    };
  
    const handleUpload = async () => {
      if (!selectedFile || !imageName.trim()) {
        alert("Please provide an image name and select a file before uploading.");
        return;
      }
  
      const formData = new FormData();
      formData.append("image_name", imageName);
      formData.append("image", selectedFile);
  
      setIsUploading(true);
      try {
        const response = await axiosInstance.post("/lab-image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
        setImages([...images, response.data]);
        setFilteredImages([...images, response.data]);
        alert("Image uploaded successfully!");
      } catch (error) {
        console.error("Image upload failed:", error);
        alert("Image upload failed.");
      } finally {
        setIsUploading(false);
        setSelectedFile(null);
        setImageName("");
      }
    };
  
    const handleDelete = async (id: number) => {
      const confirmDelete = confirm(
        "Are you sure you want to delete this image?",
      );
      if (!confirmDelete) return;
  
      try {
        await axiosInstance.delete(`/lab-image/${id}`);
        const updatedImages = images.filter((image) => image.id !== id);
        setImages(updatedImages);
        setFilteredImages(updatedImages);
        alert("Image deleted successfully!");
      } catch (error) {
        console.error("Error deleting image:", error);
        alert("Failed to delete image.");
      }
    };
  
    return (
      <div className="p-6 flex flex-col space-y-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Image Management</h1>
  
        {/* File Upload */}
        <div className="mt-6">
          <label className="block text-xl font-bold mb-2">
            Upload .tar Docker Image File
          </label>
          <input
            type="text"
            value={imageName}
            onChange={(e) => setImageName(e.target.value)}
            placeholder="Enter image name"
            className="block w-full border border-gray-300 rounded-xl p-2 mb-2"
          />
          <input
            type="file"
            accept=".tar"
            onChange={handleFileChange}
            className="block w-full border border-gray-300 rounded-xl p-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          />
          <button
            onClick={handleUpload}
            disabled={!selectedFile || isUploading || !imageName.trim()}
            className={`mt-3 px-4 py-2 rounded-xl text-white ${
              isUploading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isUploading ? "Uploading..." : "Upload"}
          </button>
        </div>
  
        {/* Images Table */}
        <div>
          <label className="block text-xl font-bold mb-2">Images Table</label>
  
          {/* Search Bar */}
          <div className="mb-4">
            <SearchBar onSearch={handleSearch} />
          </div>
  
          <div className="overflow-x-auto bg-white shadow rounded-xl border">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-900 uppercase">
                    Image Name
                  </th>
                  <th className="px-6 py-3 text-left text-gray-900 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredImages.length > 0 ? (
                  filteredImages.map((image) => (
                    <tr key={image.id}>
                      <td className="px-6 py-4 text-md text-gray-900">
                        {image.image_name}
                      </td>
                      <td className="px-6 py-4 text-md">
                        <button
                          onClick={() => handleDelete(image.id)}
                          className="p-2 rounded-xl text-white bg-red-500 hover:bg-red-900 cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={2}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No images found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

export default withAuth(ImageManagementPage);
