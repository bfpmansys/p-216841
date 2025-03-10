import { FC, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, FileText, Check } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { FSECFormData } from "@/components/fsec/types";

interface ApplicationSummaryProps {
  formData: FSECFormData;
  setFormData: React.Dispatch<React.SetStateAction<FSECFormData>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  onPrevious?: () => void; // Added onPrevious prop
}

interface ApplicationSummary {
  establishmentName: string;
  ownerName: string;
  representativeName: string;
  tradeName: string;
  occupancyType: string;
  totalFloorArea: string;
  numberOfStoreys: string;
  streetName: string;
  barangay: string;
  landline: string;
  contactNumber: string;
}

interface UploadedFile {
  id: string;
  name: string;
  type: string;
}

const ApplicationSummary: FC<ApplicationSummaryProps> = ({ 
  formData, 
  setFormData, 
  setCurrentStep,
  onPrevious 
}) => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const [localFormData, setLocalFormData] = useState<ApplicationSummary | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  useEffect(() => {
    const savedFormData = localStorage.getItem('applicationFormData');
    const savedFiles = localStorage.getItem('applicationFiles');
    
    if (savedFormData) {
      setLocalFormData(JSON.parse(savedFormData));
    }
    if (savedFiles) {
      setUploadedFiles(JSON.parse(savedFiles));
    }
  }, []);

  const getApplicationTypeTitle = () => {
    switch (type) {
      case "new_business":
        return "New Business Permit";
      case "annual":
        return "Annual Business Permit";
      case "occupancy":
        return "Occupancy Permit";
      case "special":
        return "Special Permit";
      default:
        return "Permit Application";
    }
  };

  // Handle previous button click with fallback
  const handlePrevious = () => {
    if (onPrevious) {
      onPrevious(); // Use the provided onPrevious function
    } else {
      setCurrentStep(3); // Fallback to direct step change
    }
  };

  const handleSubmit = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); 
      // TODO: Implement actual submission to database
      toast({
        title: "Application Submitted",
        description: "Your application has been successfully submitted",
      });
      // Clear stored data
      localStorage.removeItem('applicationFormData');
      localStorage.removeItem('applicationFiles');
      // Navigate back to dashboard
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!localFormData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#FFF5F2]">
      <div className="bg-[#FF6347] px-6 py-4">
        <button
          onClick={handlePrevious}
          className="text-white flex items-center gap-2 mb-2"
        >
          <ChevronLeft size={20} />
          <span>Back</span>
        </button>
        <h1 className="text-white text-xl font-semibold">APPLICATION SUMMARY</h1>
      </div>

      <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="space-y-1 mb-6">
            <h2 className="font-semibold text-lg">REVIEW APPLICATION</h2>
            <div className="flex gap-2 text-sm text-gray-500">
              <div className="flex items-center gap-2 opacity-50">
                <div className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center">1</div>
                <span>Fill out the Form</span>
              </div>
              <div className="flex items-center gap-2 opacity-50">
                <div className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center">2</div>
                <span>Upload the Requirements</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#FF6347] text-white flex items-center justify-center">3</div>
                <span>Confirm and Submit</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-4">{getApplicationTypeTitle()}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">General Information</h4>
                    <div className="space-y-2">
                      <p><span className="text-gray-500">Establishment:</span> {localFormData.establishmentName}</p>
                      <p><span className="text-gray-500">Owner:</span> {localFormData.ownerName}</p>
                      {localFormData.representativeName && (
                        <p><span className="text-gray-500">Representative:</span> {localFormData.representativeName}</p>
                      )}
                      {localFormData.tradeName && (
                        <p><span className="text-gray-500">Trade Name:</span> {localFormData.tradeName}</p>
                      )}
                      <p><span className="text-gray-500">Occupancy Type:</span> {localFormData.occupancyType}</p>
                      <p><span className="text-gray-500">Floor Area:</span> {localFormData.totalFloorArea} m²</p>
                      <p><span className="text-gray-500">No. of Storeys:</span> {localFormData.numberOfStoreys}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Address & Contact Details</h4>
                    <div className="space-y-2">
                      <p><span className="text-gray-500">Address:</span> {localFormData.streetName}</p>
                      <p><span className="text-gray-500">Barangay:</span> {localFormData.barangay}</p>
                      <p><span className="text-gray-500">City:</span> Valenzuela City</p>
                      <p><span className="text-gray-500">Province:</span> METRO MANILA</p>
                      <p><span className="text-gray-500">Region:</span> National Capital Region NCR</p>
                      {localFormData.landline && (
                        <p><span className="text-gray-500">Landline:</span> {localFormData.landline}</p>
                      )}
                      {localFormData.contactNumber && (
                        <p><span className="text-gray-500">Mobile:</span> {localFormData.contactNumber}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">Uploaded Requirements</h4>
                <div className="space-y-2">
                  {uploadedFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center gap-3 p-2 bg-white rounded"
                    >
                      <FileText size={20} className="text-gray-400" />
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-gray-500">{file.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="bg-[#FF6347] text-white px-6 py-2 rounded-lg hover:bg-[#FF6347]/90 transition-colors flex items-center gap-2"
              >
                <span>SUBMIT APPLICATION</span>
                <Check size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationSummary;