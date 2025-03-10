
import { Inspection } from "@/models/InspectionData";
import React from "react";

interface AdminMapProps {
  inspections: Inspection[];
}

export const AdminMap: React.FC<AdminMapProps> = ({ inspections }) => {
  return (
    <div className="flex flex-col shadow-[1px_2px_2px_rgba(0,0,0,0.25)] relative min-h-[300px] w-full text-[11px] text-white">
      {/* Display dynamic markers */}
      {inspections.map((inspection, index) => (
        <div 
          key={inspection.id}
          className="absolute flex flex-col items-center"
          style={{ 
            left: `${(index * 15) + 20}%`, 
            top: `${(index * 10) + 40}%`,
            zIndex: 10
          }}
        >
          <div 
            className={`${inspection.isPriority ? 'bg-[rgba(255,0,0,1)]' : 'bg-[rgba(254,98,63,1)]'} px-2 py-1 rounded-[10px] mb-1 whitespace-nowrap text-xs`}
          >
            {inspection.location.name}
          </div>
        </div>
      ))}
    </div>
  );
};
