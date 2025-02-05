"use client";
import React, { useState } from "react";
import axiosInstance from "@/api/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import UserTable from "@/components/users-management/UserTable";
import SearchBar from "@/components/users-management/SearchBar";
import BulkAddUsers from "@/components/users-management/BulkAddUsers";
import Pagination from "@/components/users-management/Pagination";
import { UserProfile } from "@/app/interface/userProfile";
import AllowedUserTable from "@/components/users-management/AllowedUserTable";
import { AllowedUser } from "@/app/interface/pre-login-user";

const UserManagementPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [isBulkAddOpen, setIsBulkAddOpen] = useState(false);
  const [showAllowedUsers, setShowAllowedUsers] = useState(false);
  const [allowedUsers, setAllowedUsers] = useState<AllowedUser[]>([]);
  const usersPerPage = 10;

  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axiosInstance.get("/user");
      return response.data;
    },
  });

  const filteredUsers = users.filter(
    (user: UserProfile) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.split("@")[0].includes(searchTerm),
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage,
  );

  const { data: totalUsers = 0 } = useQuery({
    queryKey: ["totalUsers"],
    queryFn: async () => {
      const response = await axiosInstance.get("/user/count");
      return response.data.count || 0;
    },
  });

  const fetchAllowedUsers = async () => {
    const response = await axiosInstance.get("user/pre-login");
    return response.data;
  };

  React.useEffect(() => {
    if (showAllowedUsers) {
      fetchAllowedUsers().then(setAllowedUsers);
    }
  }, [showAllowedUsers]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleSelectUser = (id: number) => {
    setSelectedUsers((prev) =>
      prev.includes(id)
        ? prev.filter((userId) => userId !== id)
        : [...prev, id],
    );
  };

  const handleDeleteSelected = async () => {
    await axiosInstance.post("/user/delete", { userIds: selectedUsers });
    setSelectedUsers([]);
  };

  const handleDeleteAllowedUser = async (email: string) => {
    try {
      await axiosInstance.delete(`/user/pre-login/${email}`);
      setAllowedUsers((prev) =>
        prev.filter((user) => user.email !== email)
      );
    } catch (error) {
      console.error("Error deleting allowed user:", error);
    }
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
        <button
          onClick={() => setIsBulkAddOpen(true)}
          className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Users
        </button>
        <button
          onClick={() => setShowAllowedUsers(!showAllowedUsers)}
          className="mb-4 bg-gray-500 text-white px-4 py-2 rounded ml-4"
        >
          {showAllowedUsers ? "Show All Users" : "Show Allowed Users"}
        </button>

        {showAllowedUsers ? (
          <AllowedUserTable
            allowedUsers={allowedUsers}
            onDeleteUser={handleDeleteAllowedUser}
          />
        ) : (
          <>
            <UserTable
              users={paginatedUsers}
              selectedUsers={selectedUsers}
              onSelectUser={(id) =>
                setSelectedUsers((prev) =>
                  prev.includes(id)
                    ? prev.filter((uid) => uid !== id)
                    : [...prev, id],
                )
              }
            />
            <div className="mt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
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
          </>
        )}
        <BulkAddUsers
          isOpen={isBulkAddOpen}
          onClose={() => setIsBulkAddOpen(false)}
        />
      </div>
    </div>
  );
};

export default UserManagementPage;
