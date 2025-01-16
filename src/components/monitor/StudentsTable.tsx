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

interface Student {
  studentid: string;
  firstname: string;
  lastname: string;
  solvedlabs: number;
  score: number;
}

const StudentsTable: React.FC = () => {
  // Fetch Labs data
  const {
    data: students,
    isLoading,
    error,
  } = useQuery<Student[]>({
    queryKey: ["students"],
    queryFn: async (): Promise<Student[]> => {
      // const response = await axiosInstance.get("/api/labs");
      // return response.data;
      return new Array(5).fill({
        studentid: "6401XXXX",
        firstname: "Arthur",
        lastname: "Excalibur",
        solvedlabs: 8,
        score: 1200,
      });
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
              <TableRow key={index}>
                <TableCell>{student.studentid}</TableCell>
                <TableCell>{student.firstname}</TableCell>
                <TableCell>{student.lastname}</TableCell>
                <TableCell>{student.solvedlabs}</TableCell>
                <TableCell>{student.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default withAuth(StudentsTable);
