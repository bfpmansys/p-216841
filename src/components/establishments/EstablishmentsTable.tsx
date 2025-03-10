import { Establishment } from "@/types/establishment";
import { StatusBadge } from "./StatusBadge";


interface EstablishmentsTableProps {
  establishments: Establishment[];
}

export const EstablishmentsTable = ({
  establishments,
}: EstablishmentsTableProps) => {
  const columns = [
    { label: "INSPECTION NO", key: "inspectionNo" },
    { label: "ESTABLISHMENT NAME", key: "name" },
    { label: "EST TYPE", key: "type" },
    { label: "BUSINESS NATURE", key: "businessNature" },
    { label: "ESTABLISHMENT OWNER", key: "owner" },
    { label: "CONTACT NUMBER", key: "contactNumber" },
    { label: "BUSINESS ADDRESS", key: "address" },
    { label: "INSPECTION DATE", key: "inspectionDate" },
    { label: "STATUS", key: "status" },
    { label: "ACTIONS", key: "actions" },
  ];

  // Responsive table for small screens
  const renderMobileTable = () => {
    return (
      <div className="hidden max-md:block">
        {establishments.map((establishment, index) => (
          <div key={index} className="bg-white mb-4 rounded-lg shadow overflow-hidden">
            <div className="bg-[#FE623F] text-white p-3 font-semibold flex justify-between items-center">
              <span>{establishment.name}</span>
              <StatusBadge status={establishment.status} className="text-xs" />
            </div>
            <div className="p-3 space-y-2">
              <div className="grid grid-cols-2 gap-1">
                <div className="text-gray-500 text-xs">INSPECTION NO:</div>
                <div className="text-xs font-medium">{establishment.inspectionNo}</div>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <div className="text-gray-500 text-xs">TYPE:</div>
                <div className="text-xs font-medium">{establishment.type}</div>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <div className="text-gray-500 text-xs">BUSINESS NATURE:</div>
                <div className="text-xs font-medium">{establishment.businessNature}</div>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <div className="text-gray-500 text-xs">OWNER:</div>
                <div className="text-xs font-medium">{establishment.owner}</div>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <div className="text-gray-500 text-xs">CONTACT:</div>
                <div className="text-xs font-medium">{establishment.contactNumber}</div>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <div className="text-gray-500 text-xs">ADDRESS:</div>
                <div className="text-xs font-medium">{establishment.address}</div>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <div className="text-gray-500 text-xs">INSPECTION DATE:</div>
                <div className="text-xs font-medium">{establishment.inspectionDate}</div>
              </div>
            </div>
            <div className="border-t border-gray-100 p-3 flex justify-end">
              <button className="bg-[#FE623F] text-white rounded-full w-8 h-8 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 7.25V21.75M7.5 14.5H22.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-[#FFECDB] p-5 rounded-2xl shadow max-md:p-3 max-md:bg-transparent max-md:shadow-none">
      {/* Desktop table */}
      <div className="max-md:hidden overflow-auto rounded-lg">
        <table className="min-w-full">
          <thead>
            <tr className="bg-[#FFECDB] border-b border-black">
              {columns.map((column) => (
                <th key={column.key} className="text-left p-3 font-semibold text-sm">
                  <div className="flex items-center gap-[5px]">
                    <span>{column.label}</span>
                    {column.key !== "actions" && (
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/04eabecb3d2e31b1a728997bcaa96b57b0fc6006"
                        alt="Sort"
                        className="w-4 h-4 opacity-60 cursor-pointer"
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {establishments.map((establishment, index) => (
              <tr 
                key={index} 
                className="bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="p-3 text-sm">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span>{establishment.inspectionNo}</span>
                  </div>
                </td>
                <td className="p-3 text-sm font-medium">{establishment.name}</td>
                <td className="p-3 text-sm">{establishment.type}</td>
                <td className="p-3 text-sm">{establishment.businessNature}</td>
                <td className="p-3 text-sm">{establishment.owner}</td>
                <td className="p-3 text-sm">{establishment.contactNumber}</td>
                <td className="p-3 text-sm">{establishment.address}</td>
                <td className="p-3 text-sm">{establishment.inspectionDate}</td>
                <td className="p-3">
                  <StatusBadge status={establishment.status} className="text-xs" />
                </td>
                <td className="p-3">
                  <button className="bg-[#FE623F] text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-[#E55535] transition-colors">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 5V19M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile table */}
      {renderMobileTable()}
    </div>
  );
};
