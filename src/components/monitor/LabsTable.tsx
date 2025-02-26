"use client";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

const LabsTable: React.FC = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // Category filter state
  const pathname = usePathname();

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

  // Extract unique categories from labs data
  const categories = labs
    ? Array.from(new Set(labs.map((lab) => lab.category)))
    : [];

  // Filter Labs based on search term and selected category
  const filteredLabs = labs?.filter(
    (lab) =>
      lab.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "" || lab.category === selectedCategory),
  );

  // Mutation for updating the isReady status
  const toggleLabStatus = useMutation({
    mutationFn: async ({ id, isReady }: { id: number; isReady: boolean }) => {
      await axiosInstance.patch(`/lab/${id}`, { isReady });
    },
    onMutate: async ({ id, isReady }) => {
      await queryClient.cancelQueries({ queryKey: ["labs"] });
      const previousLabs = queryClient.getQueryData<Lab[]>(["labs"]);
      queryClient.setQueryData<Lab[]>(["labs"], (oldLabs) =>
        oldLabs?.map((lab) => (lab.id === id ? { ...lab, isReady } : lab)),
      );
      return { previousLabs };
    },
    onError: (err, variables, context) => {
      console.error("Error updating lab status:", err);
      if (context?.previousLabs) {
        queryClient.setQueryData(["labs"], context.previousLabs);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["labs"] });
    },
  });

  return (
    <div className="w-full">
      {/* Search and Filter Inputs */}
      {pathname === "/monitor/labs" && (
        <div className="p-4 flex gap-4">
          <Input
            type="text"
            placeholder="Search by lab name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-48 p-2 border rounded-xl"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Table */}
      <div className="rounded-xl">
        <Table>
          <TableHeader className="bg-[#EBEBEB]">
            <TableRow>
              <TableHead>Lab&apos;s Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-center">Points</TableHead>
              <TableHead className="text-center">Solved</TableHead>
              <TableHead className="text-center">Close/Open</TableHead>
              <TableHead className="text-center">Edit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLabs?.map((lab) => (
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
                <TableCell className="px-10 text-center">
                  {lab.solvedBy.length}
                </TableCell>
                <TableCell className="px-10 text-center">
                  <Switch
                    checked={lab.isReady}
                    onCheckedChange={(checked) =>
                      toggleLabStatus.mutate({ id: lab.id, isReady: checked })
                    }
                  />
                </TableCell>
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
