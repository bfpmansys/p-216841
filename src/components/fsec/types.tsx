
export interface FormSectionProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    className?: string;
  }
  
  export interface InputFieldProps {
    label: string;
    required?: boolean;
    placeholder?: string;
    type?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
  }
 
  export interface FSECFormData {
    applicationType: string;
    tradeName: string;
    establishmentName: string;
    ownerName: string;
    representativeName: string;
    dtiNumber?: string;
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
  
  export interface UploadedFile {
    file: File;
    preview?: string;
  }

  export type Profile = {
    id: string;
    first_name: string;
    last_name: string;
    middle_name?: string;
    birthday?: string;
    created_at?: string;
    updated_at?: string;
    signature: string; // Add the signature property
  };