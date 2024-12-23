import React from "react";
import { Spinner } from "@/components/ui/spinner";

type SpinnerSize = "small" | "medium" | "large" | "page" | null | undefined;

interface LoadingScreenProps {
  size?: SpinnerSize;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ size = "page" }) => {
  return (
    <div className="flex items-center justify-center h-full bg-gray-50">
      <Spinner size={size} />
    </div>
  );
};

export default LoadingScreen;
