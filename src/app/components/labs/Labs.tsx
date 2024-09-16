import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Lab } from "@/app/data/labs";
import axiosInstance from "@/api/axiosInstance";

interface LabsProps {
  labs: Lab[];
  onLabSelect: (lab: Lab) => void;
}

const Labs: React.FC<LabsProps> = ({ onLabSelect }) => {
  const [labs, setLabs] = useState<Lab[]>([]);
  const [selectedLab, setSelectedLab] = useState<Lab>(labs[0]);

  useEffect(() => {
    const getLabs = async () => {
      try {
        const res = await axiosInstance.get("/lab");
        setLabs(res.data);
        if (res.data.length > 0) {
          setSelectedLab(res.data[0]);
        }
      } catch (error) {
        console.error("Error fetching labs:", error);
      }
    };

    getLabs();
  }, []);

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
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className="text-sm font-medium">
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                Lab&apos;s name
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                Creator
              </th>
              <th className="px-6 py-3 text-center font-medium text-gray-500 uppercase tracking-wider">
                Solved
              </th>
              <th className="px-6 py-3 text-center font-medium text-gray-500 uppercase tracking-wider">
                Points
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-50 divide-y divide-gray-200">
            {labs.map((lab, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => handleLabSelect(lab)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {lab.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {lab.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {lab.creator}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                  {lab.solved ? (
                    <span className="text-green-500">✓</span>
                  ) : (
                    <span className="text-gray-500">-</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-blue-500">
                  {lab.point}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Labs;
