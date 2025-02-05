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
          <TableHeader className="bg-[#EBEBEB]">
            <TableRow>
              <TableHead>Lab&apos;s Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Creator</TableHead>
              <TableHead className="text-center">Points</TableHead>
              <TableHead className="text-center">Solved</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {labs?.map((lab, index) => (
              <TableRow key={lab.id}>
                <TableCell className="px-5">
                  <Link
                    href={`/monitor/labs/edit-lab/${lab.id}`}
                    className="underline underline-offset-4 hover:text-blue-600"
                  >
                    {lab.name}
                  </Link>
                </TableCell>
                <TableCell className="px-5">{lab.category}</TableCell>
                <TableCell className="px-5">{lab.creatorName}</TableCell>
                <TableCell className="px-10 text-center">{lab.point}</TableCell>
                <TableCell className="px-10 text-center">{lab.solved}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default withAuth(LabsTable);