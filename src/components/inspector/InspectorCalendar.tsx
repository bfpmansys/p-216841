
import React, { useState, useMemo } from "react";
import { InspectorHeader } from "./InspectorHeader";
import { InspectorSidebar } from "./InspectorSidebar";
import { InspectionList } from "./InspectionList";
import { InspectorMap } from "./InspectorMap";
import { InspectorLegend } from "./InspectorLegend";
import { Calendar } from "./Calendar";
import { format } from "date-fns";
import { mockInspections } from "@/models/InspectionData";

export const InspectorCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  // Filter inspections based on the selected date
  const filteredInspections = useMemo(() => {
    return {
      priority: mockInspections.filter(inspection => 
        format(inspection.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd') && 
        inspection.isPriority
      ),
      scheduled: mockInspections.filter(inspection => 
        format(inspection.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd') && 
        !inspection.isPriority
      )
    };
  }, [selectedDate]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="bg-white overflow-hidden min-h-screen">
      <div className="bg-[rgba(255,236,219,1)] flex-1 rounded-2xl overflow-hidden">
        <div className="p-4 md:p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-2/5">
              <div className="flex flex-col">
                <div className="font-bold text-center text-lg mb-4">ASSIGNED TO YOU</div>
                <div className="mt-6">
                  <InspectionList
                    title="PRIORITY INSPECTIONS"
                    titleColor="rgba(255,0,0,1)"
                    inspections={filteredInspections.priority}
                  />
                  <InspectionList
                    title="SCHEDULED INSPECTIONS"
                    titleColor="rgba(254,98,63,1)"
                    inspections={filteredInspections.scheduled}
                  />
                </div>
              </div>
            </div>
              
            <div className="w-full lg:w-3/5">
              <div className="flex flex-col">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="w-full lg:w-1/2">
                    <Calendar 
                      selectedDate={selectedDate} 
                      onDateSelect={handleDateSelect} 
                    />
                  </div>
                </div>
                <InspectorLegend />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
