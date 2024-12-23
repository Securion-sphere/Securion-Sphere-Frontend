import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Lab, SolvedLab } from "@/interfaces/labs";
import { useQuery } from "@tanstack/react-query";
import { useLabsStore } from "@/hooks/useLabsStore";
import axiosInstance from "@/api/axiosInstance";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableSkeleton from "@/components/utils/tableSkeleton";
import ErrorPage from "@/components/utils/ErrorPage";

interface LabsProps {
  onLabSelect: (lab: Lab) => void;
}

const fetchLabsData = async (): Promise<Lab[]> => {
  const [labResponse, userProfileResponse] = await Promise.all([
    axiosInstance.get<Lab[]>("/lab"),
    axiosInstance.get<{ student: { solved_lab: SolvedLab[] } }>(
      "/user/profile",
    ),
  ]);

  const labsData = labResponse.data;
  const solvedMachines = userProfileResponse.data.student.solved_lab;

  return labsData.map((lab: Lab) => ({
    ...lab,
    solved: solvedMachines.some(
      (solvedLab: SolvedLab) => solvedLab.labId === lab.id,
    ),
  }));
};

const Labs: React.FC<LabsProps> = ({ onLabSelect }) => {
  const { labs, setLabs, selectedLab, setSelectedLab } = useLabsStore();

  const { data, isLoading, isError, refetch } = useQuery<Lab[]>({
    queryKey: ["labs"],
    queryFn: fetchLabsData,
  });

  const [isTimeout, setIsTimeout] = useState(false); // Track timeout state

  // Set a timeout of 5 seconds
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsTimeout(true);
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (labs.length > 0 && !selectedLab) {
      setSelectedLab(labs[0]);
    }
  }, [labs, selectedLab, setSelectedLab]);

  const handleLabSelect = (lab: Lab) => {
    setSelectedLab(lab);
    onLabSelect(lab);
  };

  if (isError && isTimeout) {
    return (
      <div className="flex-grow">
        <ErrorPage
          message="We couldn't load the labs."
          heightMode="500px"
          onRetry={refetch}
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <TableSkeleton
        columns={["Lab's Name", "Category", "Creator", "Solved", "Points"]}
        rows={5}
      />
    );
  }

  return (
    <div className="bg-gray-50 shadow overflow-hidden h-full">
      <div className="border-t border-gray-200 max-h-full overflow-y-scroll">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Lab&apos;s Name</TableHead>
              <TableHead className="text-center">Category</TableHead>
              <TableHead className="text-center">Creator</TableHead>
              <TableHead className="text-center">Solved</TableHead>
              <TableHead className="text-center">Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((lab: Lab, index: number) => (
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
