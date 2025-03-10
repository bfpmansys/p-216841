export type InspectionStatus = "FOR INSPECTION" | "INSPECTED" | "REJECTED";

export interface Establishment {
  inspectionNo: string;
  name: string;
  type: string;
  businessNature: string;
  owner: string;
  contactNumber: string;
  address: string;
  inspectionDate: string;
  status: InspectionStatus;
}
