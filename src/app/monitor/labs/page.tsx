"use client";
import React from "react";
import withAuth from "@/components/auth/withAuth";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import StatisticCard from "@/components/monitor/StatisticCard";
import LabsTable from "@/components/monitor/LabsTable";

const LabDashboard: React.FC = () => {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="p-6 space-y-6">
        {/* Statistics Cards Section */}
        <StatisticCard
          topic="Labs"
          score={labSize}
          color="white"
          imagePath="/assets/statistics/labs.png"
        />
        {/* Labs Table */}
        <div className="bg-white shadow-lg rounded-xl overflow-hidden p-4">
          <h3 className="text-xl font-semibold text-gray-800">All Labs</h3>
          <LabsTable />
        </div>
      </main>
    </div>
  );
};

export default withAuth(LabDashboard);
