"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import withAuth from "@/components/auth/withAuth";
import axiosInstance from "@/api/axiosInstance";
import LoadingScreen from "@/components/utils/LoadingScreen";
import ErrorPage from "@/components/utils/ErrorPage";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Lab {
  name: string;
  category: string;
  creatorName: string;
  solved: number;
  rating: number;
}

const LabsTable: React.FC = () => {
  // Fetch Labs data
  const {
    data: labs,
    isLoading,
    error,
  } = useQuery<Lab[]>({
    queryKey: ["labs"],
    queryFn: async (): Promise<Lab[]> => {
      // const response = await axiosInstance.get("/api/labs");
      // return response.data;

      // Mock data for now
      return new Array(5).fill({
        name: "Web Application for SQL Injection",
        category: "Injection",
        creatorName: "Mr. Injection",
        solved: 12,
        rating: 4.8,
      });
    },
  });

  return (
    <div className="w-full">
      <div className="rounded-md">
        <Table>
          <TableHeader className="bg-gray-200">
            <TableRow>
              <TableHead>Lab&apos;s Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Creator</TableHead>
              <TableHead>Solved</TableHead>
              <TableHead>Rating</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {labs?.map((lab, index) => (
              <TableRow key={index}>
                <TableCell>{lab.name}</TableCell>
                <TableCell>{lab.category}</TableCell>
                <TableCell>{lab.creatorName}</TableCell>
                <TableCell>{lab.solved}</TableCell>
                <TableCell>{lab.rating.toFixed(1)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default withAuth(LabsTable);
