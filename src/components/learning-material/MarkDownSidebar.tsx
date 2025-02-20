import React from 'react';
import { Header } from '@/app/interface/markdown';

interface MarkdownSidebarProps {
  headers: Header[];
}

const MarkdownSidebar: React.FC<MarkdownSidebarProps> = ({ headers }) => {
  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-64 p-4 bg-gray-50 border-r border-gray-200">
      <ul>
        {headers.map((header) => (
          <li
            key={header.id}
            className={`mb-2 cursor-pointer hover:text-blue-600 ${
              header.level === 1 ? 'font-bold' : 'pl-4'
            }`}
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