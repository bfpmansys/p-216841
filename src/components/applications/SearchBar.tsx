import React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="flex justify-end mb-5">
      <div className="relative w-[454px] max-md:w-full">
        <input
          type="text"
          placeholder="Search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-[42px] bg-white pl-10 pr-[15px] py-0 rounded-[7px] border-[none] outline-none shadow-sm"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Search className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};