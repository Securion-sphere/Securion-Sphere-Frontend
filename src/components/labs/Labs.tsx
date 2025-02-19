import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Lab, SolvedLab } from "@/app/interface/labs";
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
      const labResponse = await axiosInstance.get("/lab");
      const labsData = labResponse.data;
      const userProfileResponse = await axiosInstance.get("/user/profile");
      const userProfile = userProfileResponse.data;
      
      let solvedLabs = [];
      if (userProfile.student) {
        solvedLabs = userProfile.student.solved_lab;
      }
      
      const updatedLabs = labsData.map((lab: Lab) => {
        const isSolved = solvedLabs.some(
          (solvedLab: SolvedLab) => solvedLab.labId === lab.id
        );
        return { ...lab, solved: isSolved };
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

  useEffect(() => {
    getLabs();
  }, [getLabs]);

  const handleLabSelect = (lab: Lab) => {
    setSelectedLab(lab);
    onLabSelect(lab);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
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
      <div className="border-t border-gray-200 max-h-full overflow-y-auto">
        <Table className="w-full border border-gray-200">
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="text-left px-4 py-2">Lab&apos;s Name</TableHead>
              <TableHead className="text-left px-4 py-2">Category</TableHead>
              <TableHead className="text-center px-4 py-2">Solved</TableHead>
              <TableHead className="text-center px-4 py-2">Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading
              ? [...Array(5)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton className="w-[150px] h-[20px] rounded-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="w-[120px] h-[20px] rounded-full" />
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
                    className="cursor-pointer hover:bg-gray-50 transition"
                    onClick={() => handleLabSelect(lab)}
                  >
                    <TableCell className="px-4 py-2 font-medium">
                      {lab.name}
                    </TableCell>
                    <TableCell className="px-4 py-2">{lab.category}</TableCell>
                    <TableCell className="text-center px-4 py-2">
                      {lab.solved ? (
                        <span className="text-green-500">✓</span>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center px-4 py-2 text-blue-500">
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
