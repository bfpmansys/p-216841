import React, { useState } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (term: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="flex items-center w-[454px] bg-white p-[15px] rounded-[7px] max-md:w-[300px] max-sm:w-full shadow-sm border border-gray-100">
      <Search className="w-[18px] h-[18px] mr-3 text-gray-400" />
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search users..."
        className="text-base text-gray-700 font-medium w-full border-none outline-none placeholder:text-gray-400"
        aria-label="Search users"
      />
    </div>
  );
};