"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import withAuth from "@/components/auth/withAuth";
import axiosInstance from "@/api/axiosInstance";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Student } from "@/app/interface/student";

const StudentsTable: React.FC = () => {
  const {
    data: students,
    isLoading,
    error,
  } = useQuery<Student[]>({
    queryKey: ["students"],
    queryFn: async (): Promise<Student[]> => {
      const response = await axiosInstance.get("/student");
      return response.data;
      // return new Array(5).fill({
      //   studentid: "6401XXXX",
      //   firstname: "Arthur",
      //   lastname: "Excalibur",
      //   solvedlabs: 8,
      //   score: 1200,
      // });
    },
  });

  return (
    <div className="w-full">
      <div className="rounded-md">
        <Table>
          <TableHeader className="bg-gray-200">
            <TableRow>
              <TableHead>Student ID</TableHead>
              <TableHead>Firstname</TableHead>
              <TableHead>Lastname</TableHead>
              <TableHead>Solved Labs</TableHead>
              <TableHead>Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students?.map((student, index) => (
              <TableRow key={student.id}>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.user.firstName}</TableCell>
                <TableCell>{student.user.lastName}</TableCell>
                <TableCell>{student.solved_lab.length | 0}</TableCell>
                <TableCell>{student.score | 0}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default withAuth(StudentsTable);