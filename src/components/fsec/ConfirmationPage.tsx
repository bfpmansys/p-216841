
import React from 'react';
import { FSECFormData } from './types';
import { FormSection } from './FormSection';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Eye, PenSquare } from 'lucide-react';

// Define REQUIREMENTS constant
const REQUIREMENTS = [
  { id: 'requirement1', title: 'Requirement 1' },
  { id: 'requirement2', title: 'Requirement 2' },
  // Add other requirements as needed
];

interface ConfirmationPageProps {
  formData: FSECFormData;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

export const ConfirmationPage: React.FC<ConfirmationPageProps> = ({
  formData,
  setCurrentStep,
}) => {
  const { toast } = useToast();

  const handleSubmit = async () => {
    try {
      let signatureFilePath = '';
  
      console.log("Starting submission...");
  
      // ✅ Upload signature file
      if (formData.signature) {
        console.log("Uploading signature file...");
        const { data: signatureData, error: signatureError } = await supabase.storage
          .from('requirements')
          .upload(`signatures/${crypto.randomUUID()}-${formData.signature.name}`, formData.signature);
  
        if (signatureError) {
          console.error("Signature upload error:", signatureError);
          throw new Error("Failed to upload signature");
        }
  
        signatureFilePath = signatureData.path; // ✅ Save path
        console.log("Signature uploaded successfully:", signatureFilePath);
      }
  
      // ✅ Create application record
      console.log("Inserting application record...");
      const { data, error: applicationError } = await supabase
        .from('applications')
        .insert({
          application_type: "FSEC",
          establishment_name: formData.establishmentName,
          owner_name: formData.ownerName,
          representative_name: formData.representativeName,
          trade_name: formData.tradeName,
          occupancy_type: formData.occupancyType,
          number_of_storeys: parseInt(formData.storeyCount),
          total_floor_area: parseFloat(formData.floorArea),
          building_name: formData.address,
          region: formData.region,
          province: formData.province,
          city: formData.city,
          barangay: formData.barangay,
          landline: formData.landline,
          contact_number: formData.contactNumber,
          signature: signatureFilePath, // ✅ Store signature path
        })
        .select("id")
        .single();
  
      if (applicationError || !data) {
        console.error("Application insertion error:", applicationError);
        throw new Error("Failed to insert application record");
      }
  
      const applicationId = data.id;
      console.log("Application submitted successfully with ID:", applicationId);
  
      // ✅ Upload requirement files
      console.log("Uploading requirement files...");
      await Promise.all(
        Object.entries(formData.uploadedFiles).map(async ([type, files]) => {
          return Promise.all(
            files.map(async (file) => {
              const { data: fileData, error: fileError } = await supabase.storage
                .from('requirements')
                .upload(`application_requirements/${crypto.randomUUID()}-${file.name}`, file);
  
              if (fileError) {
                console.error("File upload error:", fileError);
                throw new Error(`Failed to upload ${file.name}`);
              }
  
              console.log(`File uploaded successfully: ${file.name}`, fileData.path);
  
              return supabase
                .from('application_requirements')
                .insert({
                  application_id: applicationId,
                  requirement_type: type,
                  file_url: fileData.path,
                  file_name: file.name,
                });
            })
          );
        })
      );
  
      console.log("All requirement files uploaded successfully!");
  
      toast({
        title: "Success",
        description: "Your FSEC application has been submitted successfully!",
      });
  
      // ✅ Redirect to dashboard
      window.location.href = '/dashboard';
    } catch (error) {
      console.error("Submission error:", error.message || error);
      toast({
        title: "Error",
        description: `Failed to submit application. ${error.message || "Please try again."}`,
        variant: "destructive",
      });
    }
  };
  

  

  const renderEditableField = (label: string, value: string, step: number) => (
    <div className="flex justify-between items-center py-2">
      <div>
        <span className="font-semibold">{label}:</span>
        <span className="ml-2">{value}</span>
      </div>
      <button
        onClick={() => setCurrentStep(step)}
        className="text-[#FE623F] hover:text-[#ff4721]"
      >
        <PenSquare className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <FormSection title="Application Summary" subtitle="Review your application details">
        {renderEditableField("Establishment Name", formData.establishmentName, 1)}
        {renderEditableField("Owner Name", formData.ownerName, 1)}
        {renderEditableField("Representative Name", formData.representativeName, 1)}
        {renderEditableField("Trade Name", formData.tradeName || "N/A", 1)}
        {renderEditableField("Occupancy Type", formData.occupancyType, 1)}
        {renderEditableField("Floor Area", formData.floorArea, 1)}
        {renderEditableField("Storey Count", formData.storeyCount, 1)}
      </FormSection>

      <FormSection title="Location Details">
        {renderEditableField("Address", formData.address, 1)}
        {renderEditableField("Barangay", formData.barangay, 1)}
        {renderEditableField("City", formData.city, 1)}
        {renderEditableField("Province", formData.province, 1)}
        {renderEditableField("Region", formData.region, 1)}
      </FormSection>

      <FormSection title="Contact Information">
        {renderEditableField("Contact Number", formData.contactNumber, 1)}
        {renderEditableField("Landline", formData.landline || "N/A", 1)}
      </FormSection>

      <FormSection title="Uploaded Requirements">
        {Object.entries(formData.uploadedFiles).map(([type, files]) => (
          <div key={type} className="mb-4">
            <h4 className="font-semibold mb-2">
              {REQUIREMENTS.find(r => r.id === type)?.title}
            </h4>
            <div className="space-y-2">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="truncate max-w-[300px]">{file.name}</span>
                  <button
                    onClick={() => {
                      const url = URL.createObjectURL(file);
                      window.open(url, '_blank');
                    }}
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
        <button
          onClick={() => setCurrentStep(2)}
          className="text-[#FE623F] hover:text-[#ff4721] flex items-center mt-4"
        >
          <PenSquare className="w-4 h-4 mr-1" />
          Edit Requirements
        </button>
      </FormSection>

      <div className="flex justify-between mt-6">
        <button
          onClick={() => setCurrentStep(2)}
          className="px-6 py-2 text-[#FE623F] border border-[#FE623F] rounded-lg hover:bg-[#FE623F] hover:text-white transition-colors"
        >
          Previous
        </button>
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-[#FE623F] text-white rounded-lg hover:bg-[#ff4721] transition-colors"
        >
          Submit Application
        </button>
      </div>
    </div>
  );
};