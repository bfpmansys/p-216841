
import React from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";

interface CalendarProps {
  onDateSelect: (date: Date) => void;
  selectedDate: Date;
}

export const Calendar: React.FC<CalendarProps> = ({ onDateSelect, selectedDate }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-2 mb-6">
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={(date) => date && onDateSelect(date)}
        className="mx-auto"
        classNames={{
          day_selected: "bg-[rgba(254,98,63,1)] text-white",
          day_today: "font-bold border border-[rgba(254,98,63,1)]",
        }}
        footer={
          <div className="text-sm text-center mt-2 font-semibold">
            {format(selectedDate, "PPP")}
          </div>
        }
      />
    </div>
  );
};
