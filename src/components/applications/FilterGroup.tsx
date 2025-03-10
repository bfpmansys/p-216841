import React from "react";
import { FilterOption } from "@/types/applications";

interface FilterGroupProps {
  filters: FilterOption[];
  onFilterChange: (filter: FilterOption) => void;
}

export const FilterGroup: React.FC<FilterGroupProps> = ({
  filters,
  onFilterChange,
}) => {
  return (
    <div className="flex items-center gap-5 mb-5 max-sm:flex-col max-sm:items-start">
      <div className="font-semibold text-base">FILTERS:</div>
      <div className="flex gap-5 flex-wrap">
        {filters.map((filter) => (
          <div
            key={filter.id}
            className="flex items-center gap-2.5 font-semibold text-sm cursor-pointer"
            onClick={() => onFilterChange(filter)}
          >
            <div
              className={`w-[30px] h-[30px] rounded-[5px] ${
                filter.isActive ? "bg-[#fe623f]" : "bg-gray-200"
              }`}
            />
            <div>{filter.label.replace(/_/g, " ")}</div>
          </div>
        ))}
      </div>
    </div>
  );
};