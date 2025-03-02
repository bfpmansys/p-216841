
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

export interface InputFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
}
