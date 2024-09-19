import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Lab } from "@/interfaces/labs";
import axiosInstance from "@/api/axiosInstance";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import LoadingTable from "@/components/loading/LoadingTable";

interface LabsProps {
  onLabSelect: (lab: Lab) => void;
}

const fetchLabsData = async () => {
  const labResponse = await axiosInstance.get("/lab");
  const labsData = labResponse.data;

  const userProfileResponse = await axiosInstance.get("/user/profile");
  const solvedMachines = userProfileResponse.data.solved_machine;

  return labsData.map((lab: Lab) => {
    const isSolved = solvedMachines.some(
      (solvedLab: Lab) => solvedLab.id === lab.id,
    );
    return { ...lab, solved: isSolved };
  });
};

const Labs: React.FC<LabsProps> = ({ onLabSelect }) => {
  const [selectedLab, setSelectedLab] = useState<Lab | null>(null);

  const headers = ["Lab's Name", "Category", "Creator", "Solved", "Points"];
  const rowCount = 5;

  const {
    data: labs = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["fetchingLabs"],
    queryFn: fetchLabsData,
  });

  const handleLabSelect = (lab: Lab) => {
    setSelectedLab(lab);
    onLabSelect(lab);
  };

  if (isLoading) {
    return (
      <div className="bg-gray-50 shadow overflow-hidden">
        <LoadingTable header={headers} row={rowCount} />
      </div>
    );
  }

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="bg-gray-50 shadow overflow-hidden">
      <div className="border-t border-gray-200 max-h-full overflow-y-scroll">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((head, index) => (
                <TableHead key={index} className="text-center">
                  {head}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {labs.map((lab: Lab, index: number) => (
              <TableRow
                key={index}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleLabSelect(lab)}
              >
                <TableCell>{lab.name}</TableCell>
                <TableCell>{lab.category}</TableCell>
                <TableCell>{lab.creatorName}</TableCell>
                <TableCell className="text-center">
                  {lab.solved ? (
                    <span className="text-green-500">✓</span>
                  ) : (
                    <span className="text-gray-500">-</span>
                  )}
                </TableCell>
                <TableCell className="text-center text-blue-500">
                  {lab.point}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Labs;
