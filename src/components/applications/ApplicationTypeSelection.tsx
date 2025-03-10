import React from "react";
import { ApplicationType } from "@/types/applications";

interface ApplicationTypeSelectorProps {
  selectedType: ApplicationType;
  onTypeChange: (type: ApplicationType) => void;
}

export const ApplicationTypeSelector: React.FC<ApplicationTypeSelectorProps> = ({
  selectedType,
  onTypeChange,
}) => {
  const types: { value: ApplicationType; label: string }[] = [
    { value: "FSIC_OCCUPANCY", label: "FIRE SAFETY INSPECTION CERTIFICATE (OCCUPANCY)" },
    { value: "FSEC", label: "FIRE SAFETY EVALUATION CLEARANCE" },
    { value: "FSIC_BUSINESS", label: "FIRE SAFETY INSPECTION CERTIFICATE (BUSINESS)" },
  ];

  return (
    <div className="flex items-center gap-5 mb-5 max-sm:flex-col max-sm:items-start">
      <div className="font-semibold text-base">Application Type:</div>
      <div className="relative">
        <select
          value={selectedType}
          onChange={(e) => onTypeChange(e.target.value as ApplicationType)}
          className="font-bold text-[15px] bg-white px-5 py-2.5 rounded-xl appearance-none pr-10 max-md:text-sm w-full"
        >
          {types.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>
    </div>
  );
};
