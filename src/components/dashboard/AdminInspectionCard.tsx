import React, { useState } from "react";

export const AdminInspectionCard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("January");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <section className="shadow-[0_4px_4px_rgba(0,0,0,0.25)] bg-white mt-5 p-10 rounded-2xl max-sm:p-5">
      <div className="flex items-center gap-5 mt-10 max-sm:flex-col max-sm:items-start">
        <div className="text-black text-xl font-semibold">
          No. of Inspections of Month of :
        </div>
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-black text-xl flex items-center gap-2.5 bg-[rgba(254,98,63,0.5)] px-[30px] py-2.5 rounded-[20px]"
            aria-haspopup="listbox"
            aria-expanded={isOpen}
          >
            <span>{selectedMonth}</span>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/54424cbf86210932eaf9f77df840dcaadaa111f6"
              className="w-[23px] h-[15px]"
              alt="Dropdown"
            />
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 w-full mt-1 bg-white border rounded-lg shadow-lg z-10">
              {months.map((month) => (
                <button
                  key={month}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  onClick={() => {
                    setSelectedMonth(month);
                    setIsOpen(false);
                  }}
                >
                  {month}
                </button>
              ))}
            </div>
          )}

          <div className="text-xl mt-5">
            <div>Residential : 20</div>
            <div>Commercial : 20</div>
            <div>Industrial : 20</div>
          </div>
        </div>
      </div>
    </section>
  );
};