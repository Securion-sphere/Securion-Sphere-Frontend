"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import withAuth from "@/components/auth/withAuth";
import { Lab } from "@/app/interface/labs";

const EditLabPage = ({ params }: { params: { lab_id: number } }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const labId = params.lab_id;

  // Fetch lab data
  const { data: lab, isLoading, error } = useQuery<Lab>({
    queryKey: ["lab", labId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/lab/${labId}`);
      return response.data;
    },
    enabled: !!labId,
  });

  // Initialize form state with lab data
  const [formData, setFormData] = useState<Partial<Lab>>({
    name: lab?.name || "",
    description: lab?.description || "",
    category: lab?.category || "",
  });

  // Update form data whenever lab data changes
  useEffect(() => {
    if (lab) {
      setFormData({
        name: lab.name,
        description: lab.description,
        category: lab.category,
      });
    }
  }, [lab]);

  // Update lab mutation
  const updateLabMutation = useMutation({
    mutationFn: async (updatedLab: Partial<Lab>) => {
      await axiosInstance.patch(`/lab/${labId}`, updatedLab);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lab", labId] });
      alert("Lab updated successfully");
      router.push("/monitor/labs");
    },
    onError: (error) => {
      console.error("Update error:", error);
      alert("Failed to update lab. Please try again.");
    },
  });

  // Delete lab mutation
  const deleteLabMutation = useMutation({
    mutationFn: async () => {
      await axiosInstance.delete(`/lab/${labId}`);
    },
    onSuccess: () => {
      alert("Lab deleted successfully");
      router.push("/monitor/labs");
    },
    onError: (error) => {
      console.error("Delete error:", error);
      alert("Failed to delete lab. Please try again.");
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    updateLabMutation.mutate(formData);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this lab?")) {
      deleteLabMutation.mutate();
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading lab data</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Edit Lab</h1>
      {lab && (
        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-2">Lab Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
              rows={5}
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>
          <div className="flex space-x-4 mt-4">
            <button
              onClick={handleUpdate}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Update Lab
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete Lab
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default withAuth(EditLabPage);