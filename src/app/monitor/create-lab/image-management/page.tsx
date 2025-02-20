"use client";

import React, { useState, useEffect } from "react";
import axiosInstance from "@/api/axiosInstance";
import withAuth from "@/components/auth/withAuth";
import SearchBar from "@/components/ui/SearchBar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ImageProp {
  id: number;
  image_name: string;
}

const ImageUploadModal = ({ onUploadSuccess }: { onUploadSuccess: (newImage: ImageProp) => void }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageName, setImageName] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);

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

      onUploadSuccess(response.data);
      alert("Image uploaded successfully!");
      setSelectedFile(null);
      setImageName("");
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Image upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <DialogContent className="sm:max-w-md bg-white">
      <DialogHeader>
        <DialogTitle>Upload Docker Image</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Image Name</label>
          <input
            type="text"
            value={imageName}
            onChange={(e) => setImageName(e.target.value)}
            placeholder="Enter image name"
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Select .tar File</label>
          <input
            type="file"
            accept=".tar"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded-lg p-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          />
        </div>
        <Button
          onClick={handleUpload}
          disabled={!selectedFile || isUploading || !imageName.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
        >
          {isUploading ? "Uploading..." : "Upload Image"}
        </Button>
      </div>
    </DialogContent>
  );
};

const ImageManagementPage = () => {
  const [images, setImages] = useState<ImageProp[]>([]);
  const [filteredImages, setFilteredImages] = useState<ImageProp[]>([]);

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
        image.image_name.toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  const handleUploadSuccess = (newImage: ImageProp) => {
    setImages([...images, newImage]);
    setFilteredImages([...images, newImage]);
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Are you sure you want to delete this image?");
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
      <div className="flex flex-col justify-between">
        <h1 className="text-2xl font-bold mb-4">Image Management</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-700 rounded-xl text-white text-xl font-semibold w-1/4 h-12">
              <Plus className="w-6 h-6" />
              Add Image
            </Button>
          </DialogTrigger>
          <ImageUploadModal onUploadSuccess={handleUploadSuccess} />
        </Dialog>
      </div>

      <div>
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
                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(image.id)}
                        className="bg-red-500 hover:bg-red-600 text-white rounded-xl"
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="px-6 py-4 text-center text-gray-500">
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