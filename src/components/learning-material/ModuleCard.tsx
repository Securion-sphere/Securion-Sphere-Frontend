import React from 'react';
import { Module } from '@/app/interface/module';

interface ModuleCardProps {
  module: Module;
  onCardClick: (moduleId: number) => void;
  actionButton: {
    label: string;
    onClick: (moduleId: number, e: React.MouseEvent) => void;
  };
}

const ModuleCard: React.FC<ModuleCardProps> = ({ 
  module, 
  onCardClick, 
  actionButton 
}) => {
  return (
    <div
      onClick={() => onCardClick(module.id)}
      className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden cursor-pointer flex flex-col group"
    >
      {/* Card Header */}
      <div
        className={`p-6 relative flex-grow ${
          module.imagePresignedUrl ? "bg-cover bg-center" : ""
        }`}
        style={
          module.imagePresignedUrl
            ? { backgroundImage: `url(${module.imagePresignedUrl})` }
            : {}
        }
      >
        {module.imagePresignedUrl && (
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl transition-all duration-300 group-hover:bg-opacity-75" />
        )}
        <h2
          className={`text-xl font-semibold mb-2 line-clamp-2 ${
            module.imagePresignedUrl
              ? "text-white relative z-10"
              : "text-gray-800"
          }`}
        >
          {module.title}
        </h2>
        <p
          className={`text-gray-600 mb-4 line-clamp-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
            module.imagePresignedUrl
              ? "text-white relative z-10"
              : "text-gray-600"
          }`}
        >
          {module.description}
        </p>
      </div>

      {/* Enhanced Footer with Category and Action Button */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between mt-auto">
        <div className="flex items-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-200 text-gray-700">
            {module.category}
          </span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            actionButton.onClick(module.id, e);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors duration-200"
        >
          {actionButton.label}
        </button>
      </div>
    </div>
  );
};

export default ModuleCard;