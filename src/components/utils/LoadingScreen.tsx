import React from "react";
import { Spinner } from "@/components/ui/spinner";

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Spinner size="page" />
    </div>
  );
};

export default LoadingScreen;
