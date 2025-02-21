import React from "react";

interface CategorySelectProps {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({ name, value, onChange }) => {
  return (
    <div>
      <label className="block text-gray-800 font-medium mb-1">
        Category <span className="text-red-500">*</span>
      </label>
      <select
        name={name}
        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value}
        onChange={onChange}
      >
        <option value="">Choose a type of attack</option>
        <option value="Broken Access Control">Broken Access Control</option>
        <option value="OS Command Injection">OS Command Injection</option>
        <option value="XSS Injection">XSS Injection</option>
        <option value="SQL Injection">SQL Injection</option>
        <option value="SSTI">SSTI</option>
        <option value="Path traversal & File Inclusion">Path traversal & File Inclusion</option>
        <option value="Authentication">Authentication</option>
        <option value="File upload">File upload</option>
        <option value="Miscellaneous">Miscellaneous</option>
      </select>
    </div>
  );
};

export default CategorySelect;
