
export interface FSECFormData {
  tradeName: string;
  establishmentName: string;
  ownerName: string;
  representativeName: string;
  occupancyType: string;
  floorArea: string;
  storeyCount: string;
  address: string;
  region: string;
  province: string;
  city: string;
  barangay: string;
  mapLocation: string;
  landline: string;
  contactNumber: string;
  signature: File | null;
  date: string;
  uploadedFiles: Record<string, File[]>;
}
