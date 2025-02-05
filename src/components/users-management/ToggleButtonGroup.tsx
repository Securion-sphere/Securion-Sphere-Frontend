import React from "react";

interface ToggleButtonGroupProps {
  options: { label: string; value: boolean }[];
  selectedValue: boolean;
  onSelect: (value: boolean) => void;
}

const ToggleButtonGroup: React.FC<ToggleButtonGroupProps> = ({
  options,
  selectedValue,
  onSelect,
}) => {
  return (
    <div className="flex mb-4">
      {options.map((option) => (
        <button
          key={option.label}
          onClick={() => onSelect(option.value)}
          className={`${
            selectedValue === option.value
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-700"
          } px-4 py-2 border border-spacing-1 border-blue-500`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default ToggleButtonGroup;
