"use client";
import React, { useState } from "react";
import axiosInstance from "@/api/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import UserTable from "@/components/users-management/UserTable";
import SearchBar from "@/components/ui/SearchBar";
import BulkAddUsers from "@/components/users-management/BulkAddUsers";
import Pagination from "@/components/users-management/Pagination";
import { UserProfile } from "@/app/interface/userProfile";
import AllowedUserTable from "@/components/users-management/AllowedUserTable";
import { AllowedUser } from "@/app/interface/pre-login-user";
import ToggleButtonGroup from "@/components/users-management/ToggleButtonGroup";

const UserManagementPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [allowedUsersCurrentPage, setAllowedUsersCurrentPage] = useState(1);
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

  const filteredUsers = users.filter((user: UserProfile) => {
    const searchTermLower = searchTerm.toLowerCase();

    const basicSearch =
      user.firstName.toLowerCase().includes(searchTermLower) ||
      user.lastName.toLowerCase().includes(searchTermLower) ||
      user.email.split("@")[0].includes(searchTermLower);

    const roleSearch =
      (searchTermLower === "student" && user.role === "student") ||
      (searchTermLower === "supervisor" && user.role === "supervisor");

    return basicSearch || roleSearch;
  });

  const filterAllowedUsers = allowedUsers.filter(
    (user: AllowedUser) =>
      user.email.toLowerCase().includes(searchTerm) ||
      user.role.toLowerCase().includes(searchTerm),
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const totalAllowedPages = Math.ceil(filterAllowedUsers.length / usersPerPage);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage,
  );

  const paginatedAllowedUsers = filterAllowedUsers.slice(
    (allowedUsersCurrentPage - 1) * usersPerPage,
    allowedUsersCurrentPage * usersPerPage,
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
    setAllowedUsersCurrentPage(1);
  };

  // const handleSelectUser = (id: number) => {
  //   setSelectedUsers((prev) =>
  //     prev.includes(id)
  //       ? prev.filter((userId) => userId !== id)
  //       : [...prev, id],
  //   );
  // };

  // const handleDeleteSelected = async () => {
  //   await axiosInstance.post("/user/delete", { userIds: selectedUsers });
  //   setSelectedUsers([]);
  // };

  const handleDeleteAllowedUser = async (email: string) => {
    try {
      await axiosInstance.delete(`/user/pre-login/${email}`);
      setAllowedUsers((prev) => prev.filter((user) => user.email !== email));
    } catch (error) {
      console.error("Error deleting allowed user:", error);
    }
  };

  // Handle page changes for both tables
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAllowedUsersPageChange = (page: number) => {
    setAllowedUsersCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">User Management</h1>
        <div className="mb-4">
          <span className="text-xl">Total Users: {totalUsers}</span>
        </div>
        <div className="mb-4">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="flex flex-row justify-between">
          <ToggleButtonGroup
            options={[
              { label: "All Users", value: false },
              { label: "Allowed emails list", value: true },
            ]}
            selectedValue={showAllowedUsers}
            onSelect={(value) => {
              setShowAllowedUsers(value);
              // Reset pagination when switching views
              setCurrentPage(1);
              setAllowedUsersCurrentPage(1);
            }}
          />
          <button
            onClick={() => setIsBulkAddOpen(true)}
            className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add allow account +
          </button>
        </div>
        {showAllowedUsers ? (
          <>
            <AllowedUserTable
              allowedUsers={paginatedAllowedUsers}
              onDeleteUser={handleDeleteAllowedUser}
            />
            <div className="mt-4">
              <Pagination
                currentPage={allowedUsersCurrentPage}
                totalPages={totalAllowedPages}
                onPageChange={handleAllowedUsersPageChange}
              />
            </div>
          </>
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
                onPageChange={handlePageChange}
              />
            </div>
            {/* {selectedUsers.length > 0 && (
              <button
                onClick={handleDeleteSelected}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete Selected
              </button>
            )} */}
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
