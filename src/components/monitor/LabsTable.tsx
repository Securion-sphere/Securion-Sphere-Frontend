"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import withAuth from "@/components/auth/withAuth";
import axiosInstance from "@/api/axiosInstance";
import { Lab } from "@/app/interface/labs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const LabsTable: React.FC = () => {
  // Fetch Labs data
  const {
    data: labs,
    isLoading,
    error,
  } = useQuery<Lab[]>({
    queryKey: ["labs"],
    queryFn: async (): Promise<Lab[]> => {
      const response = await axiosInstance.get("/lab");
      return response.data;

      // Mock data for now
      // return new Array(5).fill({
      //   name: "Web Application for SQL Injection",
      //   category: "Injection",
      //   creatorName: "Mr. Injection",
      //   solved: 12,
      //   rating: 4.8,
      // });
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
              <TableHead>Points</TableHead>
              <TableHead>Solved</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {labs?.map((lab, index) => (
              <TableRow key={lab.id}>
                <TableCell>
                  <Link
                    href={`/edit-lab/${lab.id}`}
                    className="hover:text-blue-600"
                  >
                    {lab.name}
                  </Link>
                </TableCell>
                <TableCell>{lab.category}</TableCell>
                <TableCell>{lab.creatorName}</TableCell>
                <TableCell>{lab.point}</TableCell>
                <TableCell>{lab.solved}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default withAuth(LabsTable);