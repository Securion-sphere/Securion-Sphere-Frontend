import React from "react";
import { UserProfile } from "@/app/interface/userProfile";
import Image from "next/image";

interface UserTableProps {
  users: UserProfile[];
  selectedUsers: number[];
  onSelectUser: (id: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  selectedUsers,
  onSelectUser,
}) => {
  return (
    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
      <thead className="bg-gray-200">
        <tr>
          <th className="px-4 py-2">Select</th>
          <th className="px-4 py-2">Student ID</th>
          <th className="px-4 py-2">First Name</th>
          <th className="px-4 py-2">Last Name</th>
          <th className="px-4 py-2">Profile Image</th>
          <th className="px-4 py-2">Score</th>
          <th className="px-4 py-2">Solved Labs</th>
          <th className="px-4 py-2">Role</th>
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} className="border-b">
            <td className="px-4 py-2">
              <input
                type="checkbox"
                checked={selectedUsers.includes(user.id)}
                onChange={() => onSelectUser(user.id)}
              />
            </td>
            <td className="px-4 py-2">{user.email.split("@")[0]}</td>
            <td className="px-4 py-2">{user.firstName}</td>
            <td className="px-4 py-2">{user.lastName}</td>
            <td className="px-4 py-2">
              <Image
                src={user.profile_img}
                alt="Profile"
                className="w-10 h-10 rounded-full"
                width={50}
                height={50}
              />
            </td>
            <td className="px-4 py-2">{user.student?.score || 0}</td>
            <td className="px-4 py-2">
              {user.student?.solved_lab.length || 0}
            </td>
            <td className="px-4 py-2">
              {user.supervisor ? "Supervisor" : "Student"}
            </td>
            <td className="px-4 py-2">
              <button className="text-blue-500 hover:text-blue-700">
                Info
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
