import React from "react";
import { UserProfile } from "@/app/interface/userProfile";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  
  return (
    <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
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
            <td className="px-4 py-2 align-middle">
              <div className="flex items-center justify-center">
                <input
                  className="w-5 h-5"
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => onSelectUser(user.id)}
                />
              </div>
            </td>
            <td className="px-4 py-2 text-center">
              {user.email.split("@")[0]}
            </td>
            <td className="px-4 py-2">{user.firstName}</td>
            <td className="px-4 py-2">{user.lastName}</td>
            <td className="px-4 py-2 flex justify-center items-center">
              <Image
                src={user.profileImg}
                alt="Profile"
                className="w-10 h-10 rounded-full"
                width={50}
                height={50}
              />
            </td>
            <td className="px-4 py-2 text-center">
              {user.student?.score || 0}
            </td>
            <td className="px-4 py-2 text-center">
              {user.student?.solvedLab.length || 0}
            </td>
            <td className="px-4 py-2 text-center">
              {user.role === "supervisor" ? "Supervisor" : "Student"}
            </td>
            <td className="px-4 py-2 align-middle">
              <div className="flex items-center justify-center">
                <button
                  className="py-2 px-3 rounded-xl text-white bg-blue-500 hover:bg-blue-700"
                  onClick={() =>
                    router.push(`/monitor/users-management/user/${user.id}`)
                  }
                >
                  Info
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;