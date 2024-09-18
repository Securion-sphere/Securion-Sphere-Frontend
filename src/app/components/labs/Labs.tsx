import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Lab } from "@/app/interface/labs";
import axiosInstance from "@/api/axiosInstance";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

interface LabsProps {
  labs: Lab[];
  onLabSelect: (lab: Lab) => void;
}

const Labs: React.FC<LabsProps> = ({ onLabSelect }) => {
  const [labs, setLabs] = useState<Lab[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLab, setSelectedLab] = useState<Lab | null>(null);

  const getLabs = useCallback(async () => {
    try {
      // Fetch labs data
      const labResponse = await axiosInstance.get("/lab");
      const labsData = labResponse.data;

      // Fetch user profile to get solved machines
      const userProfileResponse = await axiosInstance.get("/user/profile");
      const solvedMachines = userProfileResponse.data.solved_machine;

      // Mark labs as solved if their id exists in solved_machine
      const updatedLabs = labsData.map((lab: Lab) => {
        const isSolved = solvedMachines.some(
          (solvedLab: Lab) => solvedLab.id === lab.id,
        );
        return {
          ...lab,
          solved: isSolved, // Add solved property to each lab
        };
      });

      setLabs(updatedLabs);
      if (updatedLabs.length > 0) {
        setSelectedLab(updatedLabs[0]);
      }
    } catch (error) {
      console.error("Error fetching labs or user profile:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Call the memoized getLabs function inside useEffect
  useEffect(() => {
    getLabs();
  }, [getLabs]);

  const handleLabSelect = (lab: Lab) => {
    setSelectedLab(lab);
    onLabSelect(lab);
  };

  return (
    <div className="bg-gray-50 shadow overflow-hidden h-full">
      <div className="w-full">
        <Image
          src="/all_labs.png"
          alt="All Labs"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
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
            {isLoading
              ? // Show skeleton loaders while the data is being fetched
                [...Array(5)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton className="w-[150px] h-[20px] rounded-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="w-[120px] h-[20px] rounded-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="w-[100px] h-[20px] rounded-full" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Skeleton className="w-[50px] h-[20px] rounded-full" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Skeleton className="w-[50px] h-[20px] rounded-full" />
                    </TableCell>
                  </TableRow>
                ))
              : labs.map((lab, index) => (
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
