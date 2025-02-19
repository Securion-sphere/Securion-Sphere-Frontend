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
              <TableHead className="text-center">Points</TableHead>
              <TableHead className="text-center">Solved</TableHead>
              {/* Add a new TableHead for the Edit column */}
              <TableHead className="text-center">Edit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {labs?.map((lab) => (
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
                <TableCell className="px-10 text-center">{lab.point}</TableCell>
                <TableCell className="px-10 text-center">{lab.solved}</TableCell>
                {/* Add the Edit button */}
                <TableCell className="px-10 text-center">
                  <Link
                    href={`/monitor/labs/edit-lab/${lab.id}`}
                    className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
                  >
                    Edit
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default withAuth(LabsTable);
