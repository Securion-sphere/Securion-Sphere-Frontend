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
            {students?.map((student, index) => (
              <TableRow key={student.id}>
                <TableCell className="px-5 text-center">{student.id}</TableCell>
                <TableCell className="px-5">{student.user.firstName}</TableCell>
                <TableCell className="px-5">{student.user.lastName}</TableCell>
                <TableCell className="px-10 text-center">
                  {student.solvedLab.length | 0}
                </TableCell>
                <TableCell className="px-10 text-center">
                  {student.score | 0}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default withAuth(StudentsTable);
