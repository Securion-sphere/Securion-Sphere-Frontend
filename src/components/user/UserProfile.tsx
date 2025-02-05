import { UserProfile } from "@/app/interface/userProfile";
import { Lab } from "@/app/interface/labs";
import Image from "next/image";
import StatisticCard from "@/components/monitor/StatisticCard";

interface UserProfileContentProps {
  userProfile: UserProfile;
}

const UserProfileContent = ({ userProfile }: UserProfileContentProps) => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Main Content Container */}
      <div className="max-w-5xl mx-auto p-6">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col sm:flex-row items-center sm:space-x-6">
          {/* Profile Image */}
          <div className="w-[120px] h-[120px] rounded-full overflow-hidden bg-gray-300 flex-shrink-0 flex items-center justify-center">
            {userProfile.profile_img ? (
              <Image
                src={userProfile.profile_img}
                alt={`${userProfile.firstName} ${userProfile.lastName}`}
                width={120}
                height={120}
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-3xl font-bold">
                {userProfile.firstName[0].toUpperCase()}
              </span>
            )}
          </div>

          {/* User Info */}
          <div className="mt-4 sm:mt-0">
            <h1 className="text-2xl font-bold">
              {userProfile.firstName} {userProfile.lastName}
            </h1>
            {userProfile.nickName && (
              <p className="text-gray-500">Nickname: {userProfile.nickName}</p>
            )}
            <p className="text-gray-600">Email: {userProfile.email}</p>
            <p className="text-gray-600">
              Student ID:{" "}
              {userProfile.email ? userProfile.email.split("@")[0] : "N/A"}
            </p>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatisticCard
            topic="Labs Solved"
            score={userProfile.student.solved_lab.length}
            color="white"
            imagePath="/assets/statistics/students.jpg"
          />
          <StatisticCard
            topic="Points"
            score={userProfile.student.score}
            color="white"
            imagePath="/assets/statistics/labs.png"
          />
          <StatisticCard
            topic="Assigned Labs"
            score={
              userProfile.supervisor ? userProfile.supervisor.labs.length : 0
            }
            color="white"
            imagePath="/assets/statistics/labs.png"
          />
        </div>

        {/* Solved Labs Table */}
        <div className="mt-8 bg-white rounded-xl shadow-md overflow-hidden">
          <h2 className="bg-[#003465] text-white px-4 py-2 text-lg font-semibold">
            Solved Labs
          </h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="text-left px-4 py-2">Lab Name</th>
                <th className="text-left px-4 py-2">Date Solved</th>
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
                  <td className="py-4 px-4" colSpan={2}>
                    No labs solved yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Supervisor Assigned Labs */}
        {userProfile.supervisor && (
          <div className="mt-8 bg-white rounded-xl shadow-md overflow-hidden">
            <h2 className="bg-[#003465] text-white px-4 py-2 text-lg font-semibold">
              Supervisor Assigned Labs
            </h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="text-left px-4 py-2">Lab Name</th>
                </tr>
              </thead>
              <tbody>
                {userProfile.supervisor.labs.length > 0 ? (
                  userProfile.supervisor.labs.map((lab: Lab, index: number) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="px-4 py-2">{lab.name}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="px-4 py-4">No labs assigned.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfileContent;