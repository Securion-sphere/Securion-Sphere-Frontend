"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import withAuth from "@/components/auth/withAuth";
import axiosInstance from "@/utils/axiosInstance";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserProfile } from "@/app/interface/userProfile";

const StudentsTable: React.FC = () => {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery<UserProfile[]>({
    queryKey: ["students"],
    queryFn: async (): Promise<UserProfile[]> => {
      const response = await axiosInstance.get("/user");
      return response.data;
    },
  });

  // Filter only students and sort by score in descending order
  const students = (
    users?.filter((user) => user.role === "student") || []
  ).sort((a, b) => (b.student?.score ?? 0) - (a.student?.score ?? 0));

  return (
    <div className="w-full">
      <div className="rounded-xl">
        <Table>
          <TableHeader className="bg-[#EBEBEB]">
            <TableRow>
              <TableHead className="text-center">Student ID</TableHead>
              <TableHead>Firstname</TableHead>
              <TableHead>Lastname</TableHead>
              <TableHead className="text-center">Solved Labs</TableHead>
              <TableHead className="text-center">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.length > 0 ? (
              students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="px-5 text-center">
                    {student.email.split("@")[0]}
                  </TableCell>
                  <TableCell className="px-5">{student.firstName}</TableCell>
                  <TableCell className="px-5">{student.lastName}</TableCell>
                  <TableCell className="px-10 text-center">
                    {student.student?.solvedLab?.length ?? 0}
                  </TableCell>
                  <TableCell className="px-10 text-center">
                    {student.student?.score ?? 0}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  No students found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default withAuth(StudentsTable);
