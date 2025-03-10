import React from "react";
import { Calendar, Eye } from "lucide-react";
import { Application } from "@/types/applications";

interface ApplicationsTableProps {
  applications: Application[];
  onSort: (column: string) => void;
  onSchedule: (application: Application) => void;
  onViewDetails: (application: Application) => void;
}

export const ApplicationsTable: React.FC<ApplicationsTableProps> = ({
  applications,
  onSort,
  onSchedule,
  onViewDetails,
}) => {
  const columns = [
    { key: "applicationNo", label: "APPLICATION NO." },
    { key: "date", label: "DATE" },
    { key: "time", label: "TIME" },
    { key: "establishmentName", label: "ESTABLISHMENT NAME" },
    { key: "establishmentOwner", label: "ESTABLISHMENT OWNER" },
    { key: "establishmentType", label: "ESTABLISHMENT TYPE" },
    { key: "contactNo", label: "CONTACT NO." },
    { key: "status", label: "STATUS" },
    { key: "actions", label: "ACTIONS" },
  ];

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "UNSCHEDULED":
        return "bg-gray-500";
      case "FOR_INSPECTION":
        return "bg-blue-500";
      case "INSPECTED":
        return "bg-green-500";
      case "REJECTED":
        return "bg-red-500";
      case "FOR_ISSUANCE":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="shadow-[5px_4px_4px_rgba(0,0,0,0.25)] bg-white rounded-[10px]">
      <div className="grid grid-cols-[40px_1fr_1fr_1fr_1.5fr_1.5fr_1fr_1fr_1fr_100px] font-semibold text-base bg-white p-[15px] rounded-[10px_10px_0_0] max-md:text-sm max-md:grid-cols-[40px_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_80px] max-sm:text-xs max-sm:grid-cols-[40px_1fr_1fr_1fr] max-sm:overflow-x-auto">
        <div />
        {columns.map((column) => (
          <div
            key={column.key}
            className="flex items-center gap-[5px] cursor-pointer"
            onClick={() => onSort(column.key)}
          >
            <span>{column.label}</span>
            {column.key !== "actions" && (
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/04eabecb3d2e31b1a728997bcaa96b57b0fc6006"
                alt="Sort"
                className="w-5 h-5"
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-col">
        {applications.map((application) => (
          <div
            key={application.id}
            className="grid grid-cols-[40px_1fr_1fr_1fr_1.5fr_1.5fr_1fr_1fr_1fr_100px] font-semibold text-base p-[15px] border-t border-gray-200 max-md:text-sm max-md:grid-cols-[40px_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_80px] max-sm:text-xs max-sm:grid-cols-[40px_1fr_1fr_1fr] max-sm:overflow-x-auto"
          >
            <input
              type="checkbox"
              className="w-4 h-[15px] border border-solid border-black"
            />
            <div>{application.applicationNo}</div>
            <div>{application.date}</div>
            <div>{application.time}</div>
            <div>{application.establishmentName}</div>
            <div>{application.establishmentOwner}</div>
            <div>{application.establishmentType}</div>
            <div>{application.contactNo}</div>
            <div>
              <span className={`${getStatusColor(application.status)} text-white text-xs px-2 py-1 rounded-full`}>
                {application.status.replace(/_/g, " ")}
              </span>
            </div>
            <div className="flex items-center gap-2.5 justify-center">
              <button 
                onClick={() => onSchedule(application)}
                className="bg-[#FE623F] text-white p-1.5 rounded-full"
                title="Schedule Inspection"
              >
                <Calendar className="h-4 w-4" />
              </button>
              <button 
                onClick={() => onViewDetails(application)}
                className="bg-[#FE623F] text-white p-1.5 rounded-full"
                title="View Details"
              >
                <Eye className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
