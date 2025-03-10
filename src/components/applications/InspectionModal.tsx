import React, { useState } from "react";
import { X } from "lucide-react";
import { Application } from "@/types/applications";

interface InspectionModalProps {
  application: Application;
  onClose: () => void;
  onConfirm: (schedule: {
    date: string;
    time: string;
    inspector: string;
    isPriority: boolean;
    note: string;
  }) => void;
}

export const InspectionModal: React.FC<InspectionModalProps> = ({
  application,
  onClose,
  onConfirm,
}) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("11:00am-1pm");
  const [inspector, setInspector] = useState("SF02 Sandarah Dizon");
  const [isPriority, setIsPriority] = useState(false);
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    onConfirm({
      date,
      time,
      inspector,
      isPriority,
      note,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#FE623F] text-white py-4 px-6 flex justify-between items-center">
          <h2 className="text-xl font-bold">INSPECTION DETAILS</h2>
          <button onClick={onClose} className="text-white">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-2">{application.establishmentName}</h3>
          
          {/* Schedule section */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold">SET INSPECTION SCHEDULE</h4>
              <div className="flex items-center space-x-2">
                <span className="text-sm">Status:</span>
                <span className="bg-gray-500 text-white text-xs px-3 py-1 rounded-full">
                  {application.status}
                </span>
              </div>
            </div>
            
            <div className="bg-[#F9F5F1] rounded-xl p-4">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex items-center gap-2 bg-white rounded-md px-3 py-2 w-full md:w-auto">
                  <span className="text-gray-600">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                      <line x1="16" x2="16" y1="2" y2="6" />
                      <line x1="8" x2="8" y1="2" y2="6" />
                      <line x1="3" x2="21" y1="10" y2="10" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="November, 20, 2026"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="flex-1 outline-none"
                  />
                </div>
                
                <div className="flex items-center gap-2 bg-white rounded-md px-3 py-2 w-full md:w-auto">
                  <span className="text-gray-600">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="flex-1 outline-none"
                  />
                </div>
                
                <div className="flex items-center gap-2 bg-white rounded-md px-3 py-2 w-full">
                  <span className="text-gray-600">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </span>
                  <div className="flex-1 flex justify-between items-center">
                    <span>Assign Inspector:</span>
                    <div className="flex items-center gap-1">
                      <span>{inspector}</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Inspection Type */}
          <div className="mb-6">
            <h4 className="font-bold mb-2">INSPECTION TYPE : <span className="font-normal">FIRE SAFETY INSPECTION CERTIFICATE (OCCUPANCY)</span></h4>
          </div>

          {/* Two columns layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Left column: Establishment Details */}
            <div>
              <h4 className="text-[#FE623F] font-bold mb-2">Establishment Details :</h4>
              <div className="space-y-2">
                <div>
                  <span className="font-bold">Type of Establishment : </span>
                  <span>{application.establishmentType}</span>
                </div>
                <div>
                  <span className="font-bold">Type of Occupancy : </span>
                  <span>{application.typeOfOccupancy || "Educational"}</span>
                </div>
                <div>
                  <span className="font-bold">Total Floor Area (m2) : </span>
                  <span>{application.totalFloorArea || "50"}</span>
                </div>
                <div>
                  <span className="font-bold">No. of Story : </span>
                  <span>{application.noOfStory || "3"}</span>
                </div>
                <div>
                  <span className="font-bold">No. of Occupants : </span>
                  <span>{application.noOfOccupants || "100"}</span>
                </div>
              </div>
            </div>

            {/* Right column: Owner Details */}
            <div>
              <h4 className="text-[#FE623F] font-bold mb-2">Owner Details :</h4>
              <div className="space-y-2">
                <div>
                  <span className="font-bold">Name of Owner/Representative : </span>
                  <span>{application.establishmentOwner}</span>
                </div>
                <div>
                  <span className="font-bold">Email Address : </span>
                  <span>{application.emailAddress || "dddd@gmail.com"}</span>
                </div>
                <div>
                  <span className="font-bold">Contact No. : </span>
                  <span>{application.contactNo}</span>
                </div>
                <div>
                  <span className="font-bold">Telephone No. : </span>
                  <span>{application.telephoneNo || "01234567899"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Priority Checkbox */}
          <div className="mb-4 flex items-center gap-2">
            <input
              type="checkbox"
              id="priority"
              checked={isPriority}
              onChange={(e) => setIsPriority(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="priority" className="font-medium">Mark as Priority Inspection</label>
          </div>

          {/* Notes */}
          <div className="mb-6">
            <div className="mb-2">
              <label className="font-medium">Add Note :</label>
            </div>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full h-24 p-4 bg-[#F9F5F1] rounded-xl border-none resize-none outline-none"
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <button
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md font-medium"
              onClick={onClose}
            >
              VIEW RESULT
            </button>
            <button
              className="bg-[#FE623F] text-white px-6 py-2 rounded-md font-medium"
              onClick={handleSubmit}
            >
              CONFIRM
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};