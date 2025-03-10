export type ApplicationStatus =
  | "UNSCHEDULED"
  | "FOR_INSPECTION"
  | "INSPECTED"
  | "REJECTED"
  | "FOR_ISSUANCE";

export type ApplicationType = 
  | "FSIC_OCCUPANCY" 
  | "FSEC" 
  | "FSIC_BUSINESS";

export interface Application {
  id: string;
  applicationNo: string;
  date: string;
  time: string;
  establishmentName: string;
  establishmentOwner: string;
  establishmentType: string;
  contactNo: string;
  status: ApplicationStatus;
  // Additional details for inspection modal
  emailAddress?: string;
  typeOfOccupancy?: string;
  totalFloorArea?: string;
  noOfStory?: string;
  noOfOccupants?: string;
  telephoneNo?: string;
}

export interface FilterOption {
  id: string;
  label: string;
  value: ApplicationStatus;
  isActive?: boolean;
}

export interface InspectionSchedule {
  date: string;
  time: string;
  inspector: string;
  isPriority: boolean;
  note?: string;
}
