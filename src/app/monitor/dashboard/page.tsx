"use client";
import React from "react";
import withAuth from "@/components/auth/withAuth";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import StatisticCard from "@/components/monitor/StatisticCard";
import LabsTable from "@/components/monitor/LabsTable";
import StudentsTable from "@/components/monitor/StudentsTable";

const Dashboard: React.FC = () => {
  const {
    data: labSize = 0,
    isLoading: isLabsLoading,
    error: labsError,
  } = useQuery<number>({
    queryKey: ["labSize"],
    queryFn: async (): Promise<number> => {
      const response = await axiosInstance.get("/lab");
      return response.data.length;
    },
  });

  const {
    data: studentSize = 0,
    isLoading: isStudentsLoading,
    error: studentsError,
  } = useQuery<number>({
    queryKey: ["studentSize"],
    queryFn: async (): Promise<number> => {
      const response = await axiosInstance.get("/student");
      return response.data.length;
    },
  });

  const {
    data: learningMaterial = 0,
    isLoading: islearningMaterialLoading,
    error: learningMaterialError,
  } = useQuery<number>({
    queryKey: ["learningMaterial"],
    queryFn: async (): Promise<number> => {
      const response = await axiosInstance.get("/learning-material");
      return response.data.length;
    },
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Dashboard Section */}
      <main className="p-6 space-y-5">
        {/* Statistics Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatisticCard
            topic="Labs"
            score={labSize}
            color="white"
            imagePath="/assets/statistics/labs.png"
          />
          <StatisticCard
            topic="Students"
            score={studentSize}
            color="white"
            imagePath="/assets/statistics/students.jpg"
          />
          <StatisticCard
            topic="Learning Modules"
            score={learningMaterial}
            color="white"
            imagePath="/assets/statistics/learning.jpg"
          />
        </div>

        {/* Tables Section */}
        <div className="grid grid-flow-col grid-rows-3 gap-5">
          {/* Labs Table */}
          <div className="bg-white shadow-lg rounded-xl overflow-hidden p-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              All Labs
            </h3>
            <LabsTable />
          </div>

          {/* Students Table */}
          <div className="bg-white shadow-lg rounded-xl overflow-hidden p-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Top Students
            </h3>
            <StudentsTable />
          </div>
        </div>
      </main>
    </div>
  );
};

export default withAuth(Dashboard);
