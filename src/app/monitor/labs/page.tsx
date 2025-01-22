"use client";
import React from "react";
import withAuth from "@/components/auth/withAuth";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import StatisticCard from "@/components/monitor/StatisticCard";
import LabsTable from "@/components/monitor/LabsTable";

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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Statistics Cards Section */}
          <StatisticCard
            topic="Labs"
            score={labSize}
            color="white"
            imagePath="/assets/statistics/labs.png"
          />
          {/* Labs Table */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <h3 className="text-xl font-semibold text-gray-800 px-6 py-4 border-b">
              All Labs
            </h3>
            <LabsTable />
          </div>
      </div>
    </div>
  );
};

export default withAuth(Dashboard);