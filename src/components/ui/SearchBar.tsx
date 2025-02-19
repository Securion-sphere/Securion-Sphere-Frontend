import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [term, setTerm] = useState("");

  const handleSearch = () => {
    onSearch(term);
  };

  return (
    <div className="flex">
      <input
        type="text"
        placeholder="Search"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="border p-2 rounded-l w-full"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded-r"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;