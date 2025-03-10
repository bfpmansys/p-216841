
import React, { useState, useMemo } from "react";
import { Calendar } from "./Calendar";
import { format } from "date-fns";
import { mockInspections } from "@/models/InspectionData";
import { AdminInspectionList } from "./AdminInspectionList";
import { AdminLegend } from "./AdminLegend";

export const AdminCalendar: React.FC = () => {
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
    <div className="overflow-hidden min-h-screen">
      <div className="bg-[rgba(255,236,219,1)] flex-1 rounded-2xl overflow-hidden">
        <div className="p-4 md:p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-2/5">
              <div className="flex flex-col">
                <div className="font-bold text-center text-lg mb-4">ASSIGNED INSPECTIONS</div>
                <div className="mt-6">
                  <AdminInspectionList
                    title="PRIORITY INSPECTIONS"
                    titleColor="rgba(255,0,0,1)"
                    inspections={filteredInspections.priority}
                  />
                  <AdminInspectionList
                    title="SCHEDULED INSPECTIONS"
                    titleColor="rgba(254,98,63,1)"
                    inspections={filteredInspections.scheduled}
                  />
                </div>
              </div>
            </div>
              
            <div className="w-full lg:w-3/5">
              <div className="flex flex-col">
                <div className="w-full">
                  <Calendar 
                    selectedDate={selectedDate} 
                    onDateSelect={handleDateSelect} 
                  />
                </div>
                <AdminLegend />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
