import { AllowedUser } from "@/app/interface/pre-login-user";
import React from "react";

interface AllowedUserTableProps {
  allowedUsers: AllowedUser[];
  onDeleteUser: (email: string) => void;
}

const AllowedUserTable: React.FC<AllowedUserTableProps> = ({ allowedUsers, onDeleteUser }) => {
  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {allowedUsers.map((user) => (
            <tr key={user.email}>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.email}</td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.role}</td>
              <td className="px-6 py-4 text-sm font-medium">
                <button
                  onClick={() => onDeleteUser(user.email)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllowedUserTable;
