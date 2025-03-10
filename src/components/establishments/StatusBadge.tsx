
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "FOR INSPECTION":
        return "bg-[#FFA652] text-black";
      case "INSPECTED":
        return "bg-[#1BF034] text-black";
      case "REJECTED":
        return "bg-[#FF0000] text-white";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div
      className={cn(
        "font-bold text-center px-3 py-1.5 rounded-[17px] text-xs inline-block",
        getStatusStyles(status),
        className,
      )}
    >
      {status}
    </div>
  );
};
