import React from "react";
import { cn } from "@/lib/utils";

const tabs = ["ALL", "EST. OWNERS", "FIRE INSPECTOR", "ADMIN"];

interface FilterTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const FilterTabs: React.FC<FilterTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex max-sm:w-full max-sm:overflow-x-auto" role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab}
          role="tab"
          aria-selected={tab === activeTab}
          onClick={() => onTabChange(tab)}
          className={cn(
            "font-bold text-base px-5 py-[5px] transition-colors",
            tab === activeTab
              ? "text-white bg-[#FE623F]"
              : "text-white bg-[rgba(254,98,63,0.34)] hover:bg-[rgba(254,98,63,0.5)]"
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};
