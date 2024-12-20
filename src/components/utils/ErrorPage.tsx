import React from "react";

interface ErrorPageProps {
  message?: string;
  onRetry?: () => void;
  heightMode?: "fit" | "fullscreen" | string; // Allow "fit", "fullscreen", or custom height
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  message = "Something went wrong. Please try again later.",
  onRetry,
  heightMode = "fullscreen",
}) => {
  const heightClass =
    heightMode === "fit"
      ? "h-auto"
      : heightMode === "fullscreen"
        ? "min-h-screen"
        : "";

  const customHeightStyle =
    heightMode !== "fit" && heightMode !== "fullscreen"
      ? { height: heightMode } // Apply custom height if specified
      : {};

  return (
    <div
      className={`flex items-center justify-center bg-gray-50 ${heightClass}`}
      style={customHeightStyle}
    >
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-semibold text-gray-700">{message}</h1>
        <p className="font-normal text-gray-700">Please try again later</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 shadow-md transition-all"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorPage;
