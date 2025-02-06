import React from "react";
import { Input } from "@/components/ui/input";
import { Module } from "@/app/interface/module";

interface SearchAndFilterProps {
  modules: Module[];
  onFilterChange: (filteredModules: Module[]) => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  modules,
  onFilterChange,
}) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("");

  // Get unique categories from modules
  const categories = React.useMemo(() => {
    const uniqueCategories = new Set(modules.map((module) => module.category));
    return Array.from(uniqueCategories);
  }, [modules]);

  // Filter modules based on search term and category
  React.useEffect(() => {
    const filtered = modules.filter((module) => {
      const matchesSearch =
        module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        module.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        !selectedCategory || module.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    onFilterChange(filtered);
  }, [searchTerm, selectedCategory, modules, onFilterChange]);

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="w-full sm:w-48">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
