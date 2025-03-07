"use client";

import React, { useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance";
import withAuth from "@/components/auth/withAuth";
import { useRouter } from "next/navigation";
import CategorySelect from "@/components/monitor/CategorySelect";
import { ImageProp } from "@/app/interface/labs";

const CreateLabPage = () => {
  const router = useRouter();
  const [labName, setLabName] = useState<string>("");
  const [labDescription, setLabDescription] = useState<string>("");
  const [labPoint, setLabPoint] = useState<number>(0);
  const [labCategory, setLabCategory] = useState<string>("");
  const [imageName, setImageName] = useState<string | null>(null);
  const [imageId, setImageId] = useState<number>(0);
  const [images, setImages] = useState<ImageProp[]>([]);

  // Fetch available images on component mount
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axiosInstance.get("/lab-image");
        setImages(response.data);
      } catch (error) {
        console.error("Error fetching images:", error);
        alert("Failed to load images.");
      }
    };

    fetchImages();
  }, []);

  const handlePointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/^0+/, "");
    setLabPoint(value === "" ? 0 : parseInt(value, 10));
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!labName || !labDescription || !labPoint || !labCategory) {
      alert("Please fill in all required fields.");
      return;
    }

    const labData = {
      name: labName,
      description: labDescription,
      point: labPoint,
      isReady: true,
    };

    try {
      const response = await axiosInstance.post("/lab", labData);
      console.log("Lab created successfully:", response.data);
      alert("Lab created successfully!");

      // Reset form fields after successful submission
      setLabName("");
      setLabDescription("");
      setLabPoint(0);
      setLabCategory("");
      setImageName(null);
    } catch (error) {
      console.error("Error creating lab:", error);
      alert("Failed to create lab.");
    }
  };

  const handleManageImages = () => {
    router.push("create-lab/image-management");
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLabCategory(e.target.value);
  };

  return (
    <div className="flex flex-col h-full bg-gray-100">
      <main className="py-8">
        <div className="text-gray-700 max-w-5xl mx-auto p-6">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Basic Configuration
          </h1>
          <p className="mb-4 text-center text-xl">
            Create the lab with a customized environment from your preferred
            choices.
          </p>
          <form onSubmit={handleSave} className="space-y-6">
            {/* Lab Name */}
            <div>
              <label
                className="block text-gray-700 text-xl font-bold"
                htmlFor="labName"
              >
                Lab Name
              </label>
              <input
                type="text"
                id="labName"
                placeholder="Enter your lab's name"
                value={labName}
                onChange={(e) => setLabName(e.target.value)}
                className="mt-2 p-2 w-full border border-gray-300 rounded-xl"
                required
              />
            </div>

            {/* Lab Description */}
            <div>
              <label
                className="block text-gray-700 text-xl font-bold"
                htmlFor="labDescription"
              >
                Lab Description
              </label>
              <textarea
                id="labDescription"
                value={labDescription}
                placeholder="Describe about your lab"
                onChange={(e) => setLabDescription(e.target.value)}
                className="mt-2 p-2 w-full border border-gray-300 rounded-xl"
                rows={4}
                required
              />
            </div>

            {/* Lab Points */}
            <div>
              <label
                className="block text-gray-700 text-xl font-bold"
                htmlFor="labPoint"
              >
                Lab Points
              </label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="0"
                pattern="[0-9]*"
                id="labPoint"
                value={labPoint || ""}
                onChange={handlePointChange}
                min="0"
                className="mt-2 p-2 w-full border border-gray-300 rounded-xl"
                required
              />
            </div>

            {/* Type of attack */}
            <CategorySelect
              name="category"
              value={labCategory}
              onChange={handleCategoryChange}
            />

            {/* Lab's image */}
            <div className="mt-8 pt-6">
              <h2 className="text-2xl font-bold mb-2 text-center">
                Choose your lab’s image
              </h2>
              <p className="text-xl text-gray-600 mb-4 text-center">
                Choose the image of your choice to generate the playground.
              </p>
              <div className="grid grid-row-2 gap-4">
                <div>
                  <label className="block text-xl font-bold mb-1">
                    Image <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-xl p-2"
                    value={imageName || ""}
                    onChange={(e) => {
                      const selectedImage = images.find(
                        (image) => image.imageName === e.target.value,
                      );
                      if (selectedImage) {
                        setImageName(selectedImage.imageName);
                        setImageId(selectedImage.id);
                      }
                    }}
                    disabled={images.length === 0}
                  >
                    <option value="">Select an image</option>
                    {images.map((image) => (
                      <option key={image.id} value={image.imageName}>
                        {image.imageName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Button to go to image management page */}
              <div className="mt-8 text-center justify-self-start">
                <button
                  onClick={handleManageImages}
                  className="px-6 py-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700"
                >
                  Manage Images
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => console.log("Cancel clicked")}
                className="px-6 py-2 border border-gray-300 rounded-2xl bg-white hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700"
              >
                Create Lab
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default withAuth(CreateLabPage);
