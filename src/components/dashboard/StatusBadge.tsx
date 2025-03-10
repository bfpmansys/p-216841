import { useState } from "react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  initialStatus?: "on-duty" | "off-duty";
  className?: string;
}

export const StatusBadge = ({ initialStatus = "on-duty", className }: StatusBadgeProps) => {
  const [status, setStatus] = useState<"on-duty" | "off-duty">(initialStatus);

  const toggleStatus = () => {
    setStatus(status === "on-duty" ? "off-duty" : "on-duty");
  };

  return (
    <div
      className={cn(
        "bg-[rgba(148,133,129,0.7)] border flex items-stretch gap-[7px] text-sm text-white font-bold text-center px-2.5 py-[5px] rounded-[30px] border-white border-solid cursor-pointer transition-all duration-300",
        className,
      )}
      onClick={toggleStatus}
    >
      <div className="grow">
        {status === "on-duty" ? "ON DUTY" : "OFF DUTY"}
      </div>
      <div
        className={cn(
          "flex w-[25px] shrink-0 h-[25px] rounded-[50%] transition-colors duration-300",
          status === "on-duty" ? "bg-[rgba(27,240,52,1)]" : "bg-red-500",
        )}
      />
    </div>
  );
};