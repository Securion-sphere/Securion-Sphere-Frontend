import React from "react";
import { Header } from "@/app/interface/markdown";

interface MarkdownSidebarProps {
  headers: Header[];
  isVisible: boolean;
}

const MarkdownSidebar: React.FC<MarkdownSidebarProps> = ({
  headers,
  isVisible,
}) => {
  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 128; // Adjust based on your navbar's height
      const yOffset =
        element.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({ top: yOffset, behavior: "smooth" });
    }
  };

  const getIndentClass = (level: number) => {
    switch (level) {
      case 1:
        return "";
      case 2:
        return "pl-4";
      case 3:
        return "pl-8";
      default:
        return "pl-12";
    }
  };

  return (
    <div
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 overflow-y-auto bg-gray-50 border-r border-gray-200 p-4 shadow-lg transition-transform duration-300 ${
        isVisible ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <h2 className="text-lg font-bold mt-16">Table of Contents</h2>
      <hr className="my-4 border border-gray-300" />
      <ul className="space-y-2">
        {headers.map((header) => (
          <li
            key={header.id}
            className={`cursor-pointer transition-all duration-200 ${
              header.level === 1
                ? "text-lg font-bold text-gray-900"
                : header.level === 2
                ? "text-md font-bold text-gray-900"
                : "text-sm text-gray-700"
            } ${getIndentClass(header.level)} hover:text-blue-600`}
            onClick={() => handleClick(header.id)}
          >
            {header.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MarkdownSidebar;
