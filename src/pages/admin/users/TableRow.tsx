import React, { useState } from "react";
import { Check, X, Trash2, Eye, Edit } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";

interface TableRowProps {
  id: string;
  name: string;
  email: string;
  business: string;
  status: string;
  userType: string;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, newStatus: string) => void;
}

export const TableRow: React.FC<TableRowProps> = ({
  id,
  name,
  email,
  business,
  status,
  userType,
  onDelete,
  onStatusChange,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleApprove = () => {
    onStatusChange(id, "Active");
    toast({
      title: "User approved",
      description: `${name} has been approved successfully.`,
    });
  };

  const handleReject = () => {
    onStatusChange(id, "Rejected");
    toast({
      title: "User rejected",
      description: `${name} has been rejected.`,
    });
  };

  const handleDelete = () => {
    onDelete(id);
    toast({
      title: "User deleted",
      description: `${name} has been deleted from the system.`,
      variant: "destructive",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // For establishment owners, we might have multiple businesses
  const businessList = userType === "EST. OWNERS" && isExpanded
    ? business.split(",").map((b) => b.trim())
    : [business];

  return (
    <>
      <div className="grid grid-cols-[40px_100px_200px_200px_300px_100px_1fr] items-center px-0 py-[15px] border-b-[#eee] border-b border-solid max-md:grid-cols-[40px_80px_150px_150px_200px_100px_1fr] max-md:text-sm max-sm:grid-cols-[40px_80px_120px_120px_150px_80px_1fr] max-sm:text-xs">
        <div className="flex justify-center">
          <input type="checkbox" aria-label={`Select ${name}`} />
        </div>
        <div className="px-2.5 py-0">{id}</div>
        <div className="px-2.5 py-0">{name}</div>
        <div className="px-2.5 py-0">{email}</div>
        <div className="px-2.5 py-0">
          {userType === "EST. OWNERS" && businessList.length > 1 ? (
            <div className="cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
              <span>{isExpanded ? "▼ " : "► "}</span>
              {businessList[0]} {!isExpanded && "+ more"}
            </div>
          ) : (
            business
          )}
        </div>
        <div className="flex justify-center">
          <span className={`px-2.5 py-1 rounded-[17px] text-xs font-bold ${getStatusColor(status)}`}>
            {status}
          </span>
        </div>
        <div className="px-2.5 py-0">
          <div className="flex gap-2.5 justify-center">
            {status === "Pending" && (
              <>
                <button
                  className="w-[30px] h-[30px] flex justify-center items-center bg-green-500 text-white rounded-[50%] hover:bg-green-600 transition-colors"
                  aria-label="Approve user"
                  onClick={handleApprove}
                >
                  <Check size={16} />
                </button>
                <button
                  className="w-[30px] h-[30px] flex justify-center items-center bg-red-500 text-white rounded-[50%] hover:bg-red-600 transition-colors"
                  aria-label="Reject user"
                  onClick={handleReject}
                >
                  <X size={16} />
                </button>
              </>
            )}
            <button
              className="w-[30px] h-[30px] flex justify-center items-center bg-[#FE623F] text-white rounded-[50%] hover:bg-[#e55737] transition-colors"
              aria-label="View details"
            >
              <Eye size={16} />
            </button>
            <button
              className="w-[30px] h-[30px] flex justify-center items-center bg-[#FE623F] text-white rounded-[50%] hover:bg-[#e55737] transition-colors"
              aria-label="Edit"
            >
              <Edit size={16} />
            </button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button
                  className="w-[30px] h-[30px] flex justify-center items-center bg-[#FE623F] text-white rounded-[50%] hover:bg-[#e55737] transition-colors"
                  aria-label="Delete user"
                >
                  <Trash2 size={16} />
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action will permanently delete the user '{name}' from the system. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
      
      {/* Expanded business list for establishment owners */}
      {userType === "EST. OWNERS" && isExpanded && businessList.length > 1 && (
        <div className="grid grid-cols-[40px_100px_200px_200px_300px_100px_1fr] items-center bg-gray-50 pl-[340px] max-md:grid-cols-[40px_80px_150px_150px_200px_100px_1fr] max-md:pl-[270px] max-sm:grid-cols-[40px_80px_120px_120px_150px_80px_1fr] max-sm:pl-[240px]">
          <div className="px-2.5 py-2 col-span-2">
            <div className="text-sm font-medium">Other businesses:</div>
            <ul className="list-disc pl-5 text-xs space-y-1 mt-1">
              {businessList.slice(1).map((b, idx) => (
                <li key={idx}>{b}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};
