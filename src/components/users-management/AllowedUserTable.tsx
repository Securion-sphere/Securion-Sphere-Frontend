import { AllowedUser } from "@/app/interface/pre-login-user";
import React from "react";

interface AllowedUserTableProps {
  allowedUsers: AllowedUser[];
  onDeleteUser: (email: string) => void;
}

const AllowedUserTable: React.FC<AllowedUserTableProps> = ({ allowedUsers, onDeleteUser }) => {
  return (
    <div className="overflow-x-auto bg-white shadow rounded-xl border">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-gray-900 uppercase">Email</th>
            <th className="px-6 py-3 text-left text-gray-900 uppercase">Role</th>
            <th className="px-6 py-3 text-left text-gray-900 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {allowedUsers.map((user) => (
            <tr key={user.email}>
              <td className="px-6 py-4 text-md text-gray-900">{user.email}</td>
              <td className="px-6 py-4 text-md text-gray-900">{user.role}</td>
              <td className="px-6 py-4 text-md">
                <button
                  onClick={() => onDeleteUser(user.email)}
                  className="p-2 rounded-xl text-white bg-red-500 hover:bg-red-900 cursor-pointer"
                >
                  Remove
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
