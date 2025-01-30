"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosInstant from "@/api/axiosInstance";
import { UserProfile } from "@/app/interface/userProfile";
import Image from "next/image";

const UserProfilePage = () => {
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchUserProfile = async () => {
      try {
        const response = await axiosInstant.get(`/user/profile/${id}`);
        setUserProfile(response.data);
      } catch (err) {
        setError("Failed to load user profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [id]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  if (!userProfile)
    return <div className="text-center">No user profile found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Profile Card */}
      <div className="bg-white shadow-lg rounded-xl p-6 flex space-x-6">
        <div className="w-1/3">
          <Image
            src={userProfile.profile_img}
            alt={`${userProfile.firstName} ${userProfile.lastName}`}
            className="w-full h-auto object-cover rounded-full"
            width={200}
            height={200}
          />
        </div>

        <div className="flex-grow">
          <h1 className="text-3xl font-semibold">
            {userProfile.firstName} {userProfile.lastName}
          </h1>

          {userProfile.nickName && (
            <p className="text-xl text-gray-500">
              Nickname: {userProfile.nickName}
            </p>
          )}

          <p className="text-lg text-gray-700">Email: {userProfile.email}</p>

          <p className="text-lg text-gray-700">
            Student ID:{" "}
            {userProfile.email ? userProfile.email.split("@")[0] : "N/A"}
          </p>

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-2xl font-semibold mb-4">Student Information</h2>
            <p>
              <strong>Year:</strong> {userProfile.student.year}
            </p>
            <p>
              <strong>Score:</strong> {userProfile.student.score}
            </p>
            <p>
              <strong>Total Solved Labs:</strong>{" "}
              {userProfile.student.solved_lab.length}
            </p>
          </div>
        </div>
      </div>

      {/* Solved Labs Table */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Solved Labs</h2>
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">Lab Name</th>
              <th className="py-2 px-4 text-left">Date Solved</th>
            </tr>
          </thead>
          <tbody>
            {userProfile.student.solved_lab.length > 0 ? (
              userProfile.student.solved_lab.map((solvedLab, index) => (
                <tr key={index} className="border-t border-gray-200">
                  <td className="py-2 px-4">{solvedLab.lab.name}</td>
                  <td className="py-2 px-4">
                    {new Date(solvedLab.dateSolved).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-2 px-4" colSpan={2}>
                  No labs solved yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Supervisor Assigned Labs Table */}
      {userProfile.supervisor && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">
            Supervisor Assigned Labs
          </h2>
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left">Lab Name</th>
              </tr>
            </thead>
            <tbody>
              {userProfile.supervisor.labs.map((lab, index) => (
                <tr key={index} className="border-t border-gray-200">
                  <td className="py-2 px-4">{lab.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
