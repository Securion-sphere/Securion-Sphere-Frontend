import React from "react";

interface LoadingProps {
  size?: "small" | "medium" | "large";
  message?: string;
}

const sizeClasses = {
  small: "h-6 w-6",
  medium: "h-8 w-8",
  large: "h-12 w-12",
};

const Loading: React.FC<LoadingProps> = ({ size = "medium", message }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div
        className={`animate-spin rounded-full border-4 border-t-transparent border-gray-300 ${sizeClasses[size]}`}
      ></div>
      {message && <p className="text-sm text-gray-500">{message}</p>}
    </div>
  );
};

export default Loading;
