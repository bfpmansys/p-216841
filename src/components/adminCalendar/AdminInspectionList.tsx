
import React from "react";
import { format } from "date-fns";
import { Inspection } from "@/models/InspectionData";

interface AdminInspectionListProps {
  title: string;
  titleColor: string;
  inspections: Inspection[];
}

export const AdminInspectionList: React.FC<AdminInspectionListProps> = ({
  title,
  titleColor,
  inspections,
}) => {
  return (
    <div className="flex flex-col w-full mb-6">
      <div 
        className="font-bold text-center" 
        style={{ color: titleColor }}
      >
        {title}
      </div>
      <div className="bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)] flex w-full flex-col items-stretch mt-4 pt-2 rounded-[15px] max-md:max-w-full overflow-hidden">
        <div className="flex w-full max-w-full items-stretch gap-2 px-4 font-semibold text-center justify-between">
          <div className="w-1/4">Date</div>
          <div className="w-1/4">Time</div>
          <div className="w-2/4">Establishment</div>
        </div>
        <div className="border shrink-0 h-0.5 mt-2 border-black border-solid w-full" />
        
        {inspections.length > 0 ? (
          <div className="max-h-[250px] overflow-y-auto">
            {inspections.map((inspection) => (
              <div key={inspection.id} className="border-b border-[rgba(0,0,0,0.2)] last:border-b-0">
                <div className="flex items-center gap-2 p-3 hover:bg-gray-50 transition-colors">
                  <div className="w-1/4 text-sm">{format(inspection.date, "MMM d, yyyy")}</div>
                  <div className="w-1/4 text-sm">{inspection.time}</div>
                  <div className="w-2/4 text-sm text-left">{inspection.establishment}</div>
                  <button className="shrink-0">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/605c382ffc624f65b1b13358f5877fd8/506676dae56d47803459506d89d7b4084147aeda24fe67b79961a573639ceb51?placeholderIfAbsent=true"
                      alt="More options"
                      className="w-5 h-5 object-contain"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 text-center text-gray-500">No inspections scheduled</div>
        )}
      </div>
    </div>
  );
};
