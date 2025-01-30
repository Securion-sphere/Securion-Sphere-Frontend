"use client";
import React, { useState, useEffect } from "react";
import axiosInstance from "@/api/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import UserTable from "@/components/users-management/UserTable";
import SearchBar from "@/components/users-management/SearchBar";
import BulkAddUsers from "@/components/users-management/BulkAddUsers";
import Pagination from "@/components/users-management/Pagination";

const UserManagementPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const usersPerPage = 10;

  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users", currentPage, searchTerm],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/user?page=${currentPage}&limit=${usersPerPage}&search=${searchTerm}`
      );
      return response.data;
    },
  });

  const {
    data: totalUsers = 0,
  } = useQuery({
    queryKey: ["totalUsers"],
    queryFn: async () => {
      const response = await axiosInstance.get("/user/count");
      return response.data.count || 0;
    },
  });

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleDeleteSelected = async () => {
    await axiosInstance.post("/user/delete", { userIds: selectedUsers });
    setSelectedUsers([]);
    // Refetch users after deletion
    // You can use queryClient.invalidateQueries(['users']) if using React Query
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">User Management</h1>
        <div className="mb-4">
          <span className="text-lg">Total Students: {totalUsers}</span>
        </div>
        <div className="mb-4">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="mb-4">
          <BulkAddUsers />
        </div>
        <UserTable
          users={users}
          selectedUsers={selectedUsers}
          onSelectUser={(id) => setSelectedUsers([...selectedUsers, id])}
        />
        <div className="mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalUsers / usersPerPage)}
            onPageChange={setCurrentPage}
          />
        </div>
        {selectedUsers.length > 0 && (
          <button
            onClick={handleDeleteSelected}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete Selected
          </button>
        )}
      </div>
    </div>
  );
};

export default UserManagementPage;