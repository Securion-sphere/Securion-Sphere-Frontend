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
            {userProfile.profileImg ? (
              <Image
                src={userProfile.profileImg}
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
              Student ID: {userProfile.email ? userProfile.email.split("@")[0] : "N/A"}
            </p>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {userProfile.student && (
            <>
              <StatisticCard
                topic="Labs Solved"
                score={userProfile.student.solvedLab.length}
                color="white"
                imagePath="/assets/statistics/students.jpg"
              />
              <StatisticCard
                topic="Points"
                score={userProfile.student.score}
                color="white"
                imagePath="/assets/statistics/labs.png"
              />
            </>
          )}
        </div>

        {/* Solved Labs Table */}
        {userProfile.student && (
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
                {userProfile.student.solvedLab.length > 0 ? (
                  userProfile.student.solvedLab.map((solvedLab, index) => (
                    <tr key={index} className="border-t border-gray-200">
                      <td className="py-2 px-4">{solvedLab.lab.name}</td>
                      <td className="py-2 px-4">
                        {new Date(solvedLab.dateSolved).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="py-4 px-4" colSpan={2}>No labs solved yet.</td>
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
