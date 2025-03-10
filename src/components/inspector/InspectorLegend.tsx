
import React from "react";

export const InspectorLegend: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-2 mt-4">
      <div className="bg-white flex items-center gap-3 px-4 py-3 rounded-lg shadow-sm">
        <div className="bg-[rgba(255,0,0,1)] w-5 h-5 rounded-full flex-shrink-0" />
        <div className="font-semibold text-sm">
          ASSIGNED PRIORITY INSPECTIONS
        </div>
      </div>
      <div className="bg-white flex items-center gap-3 px-4 py-3 rounded-lg shadow-sm">
        <div className="bg-[rgba(254,98,63,1)] w-5 h-5 rounded-full flex-shrink-0" />
        <div className="font-semibold text-sm">
          ASSIGNED INSPECTIONS
        </div>
      </div>
    </div>
  );
};
