"use client";
import React from "react";
import withAuth from "@/components/auth/withAuth";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import LoadingScreen from "@/components/utils/LoadingScreen";
import ErrorPage from "@/components/utils/ErrorPage";
import StatisticCard from "@/components/monitor/StatisticCard";
import LabsTable from "@/components/monitor/LabsTable";
import StudentsTable from "@/components/monitor/StudentsTable";

interface Lab {
  name: string;
  category: string;
  creatorName: string;
  solved: number;
  rating: number;
}

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Statistics Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatisticCard
            topic="Labs"
            score={12}
            color="white"
            imagePath="/assets/statistics/labs.png"
          />
          <StatisticCard
            topic="Students"
            score={60}
            color="white"
            imagePath="/assets/statistics/students.jpg"
          />
          <StatisticCard
            topic="Learning Modules"
            score={23}
            color="white"
            imagePath="/assets/statistics/learning.jpg"
          />
        </div>

        {/* Tables Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Labs Table */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <h3 className="text-xl font-semibold text-gray-800 px-6 py-4 border-b">
              Top Labs
            </h3>
            <LabsTable />
          </div>

          {/* Students Table */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <h3 className="text-xl font-semibold text-gray-800 px-6 py-4 border-b">
              Top Students
            </h3>
            <StudentsTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Dashboard);
