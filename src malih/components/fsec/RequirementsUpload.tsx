
import React from 'react';
import { FSECFormData } from './types';
import { useToast } from "@/hooks/use-toast";
import { FilePlus, Eye, Trash2 } from 'lucide-react';

const REQUIREMENTS = [
  {
    id: 'architectural',
    title: 'Architectural Documents',
    description: 'Upload architectural plans and documents'
  },
  {
    id: 'civil',
    title: 'Civil/Structural Documents',
    description: 'Upload civil and structural engineering documents'
  },
  {
    id: 'mechanical',
    title: 'Mechanical Documents',
    description: 'Upload mechanical engineering documents'
  },
  {
    id: 'electrical',
    title: 'Electrical Documents',
    description: 'Upload electrical engineering documents'
  },
  {
    id: 'fire_protection',
    title: 'Fire Protection Plan',
    description: 'Upload fire protection system plans'
  },
  {
    id: 'electronics',
    title: 'Electronics Documents',
    description: 'Upload electronics and communications documents'
  },
  {
    id: 'licenses',
    title: 'Photocopies of valid licenses of involved professional',
    description: 'Upload professional license documents'
  },
  {
    id: 'compliance',
    title: 'Fire Safety Compliant Report',
    description: 'Upload compliance documentation'
  },
  {
    id: 'cost_estimate',
    title: '1 Set of estimated cost of the building to be constructed / renovated / modified',
    description: 'Upload cost estimation documents'
  }
];

interface RequirementsUploadProps {
  formData: FSECFormData;
  setFormData: React.Dispatch<React.SetStateAction<FSECFormData>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

export const RequirementsUpload: React.FC<RequirementsUploadProps> = ({
  formData,
  setFormData,
  setCurrentStep
}) => {
  const { toast } = useToast();

  const handleFileUpload = (requirementId: string, files: FileList) => {
    const newFiles = Array.from(files);
    
    setFormData(prev => ({
      ...prev,
      uploadedFiles: {
        ...prev.uploadedFiles,
        [requirementId]: [...(prev.uploadedFiles[requirementId] || []), ...newFiles]
      }
    }));
    
    toast({
      title: "Success",
      description: `${newFiles.length} document(s) uploaded successfully`,
    });
  };

  const handleDeleteFile = (requirementId: string, fileIndex: number) => {
    setFormData(prev => {
      const updatedFiles = [...(prev.uploadedFiles[requirementId] || [])];
      updatedFiles.splice(fileIndex, 1);
      
      return {
        ...prev,
        uploadedFiles: {
          ...prev.uploadedFiles,
          [requirementId]: updatedFiles
        }
      };
    });

    toast({
      title: "Success",
      description: "Document removed successfully",
    });
  };

  const handleViewFile = (file: File) => {
    const url = URL.createObjectURL(file);
    window.open(url, '_blank');
  };

  const getUploadedFilesCount = () => {
    return Object.values(formData.uploadedFiles || {}).reduce((total, files) => 
      total + (files ? files.length : 0), 0
    );
  };

  const uploadedCount = getUploadedFilesCount();
  const maxFiles = 9;
const limitedCount = Math.min(uploadedCount, maxFiles);
const progress = (limitedCount / maxFiles) * 100;


  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Upload Requirements Progress</h3>
        <div className="h-2 bg-gray-200 rounded-full">
          <div 
            className="h-full bg-[#FE623F] rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm mt-2">
          {uploadedCount} files uploaded across {REQUIREMENTS.length} fields requirements
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {REQUIREMENTS.map((requirement) => (
          <div 
            key={requirement.id}
            className="bg-white p-4 rounded-lg shadow"
          >
            <h4 className="font-semibold">{requirement.title}</h4>
            <p className="text-sm text-gray-600 mb-4">{requirement.description}</p>
            
            {formData.uploadedFiles?.[requirement.id]?.length > 0 && (
              <div className="mb-4">
                {formData.uploadedFiles[requirement.id].map((file, index) => (
                  <div key={index} className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span className="truncate max-w-[200px]">{file.name}</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewFile(file)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteFile(requirement.id, index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex items-center">
              <input
                type="file"
                id={requirement.id}
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => {
                  if (e.target.files?.length) {
                    handleFileUpload(requirement.id, e.target.files);
                  }
                }}
                multiple
              />
              <label
                htmlFor={requirement.id}
                className="flex items-center cursor-pointer text-[#FE623F] hover:text-[#ff4721]"
              >
                <FilePlus className="w-4 h-4 mr-1" />
                Upload Files
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={() => setCurrentStep(1)}
          className="px-6 py-2 text-[#FFF] border rounded-lg bg-[#626262] hover:bg-[#FE623F] transition-all"
        >
          PREVIOUS
        </button>
        <button 
  onClick={() => {
    // Get missing fields where no file is uploaded
    const missingFields = REQUIREMENTS.filter(req => 
      !formData.uploadedFiles[req.id] || formData.uploadedFiles[req.id].length === 0
    );

    if (missingFields.length > 0) {
      toast({
        title: "Error",
        description: "Please upload a file for all required fields.",
        variant: "destructive",
      });
      return; // Stop the function if validation fails
    }

    // If all required files are uploaded, proceed to the next step
    setCurrentStep(prev => prev + 1);
  }} 
  className="bg-[#FE623F] text-white font-bold px-6 py-3 rounded-xl"
>
  Next
</button>

      </div>
    </div>
  );
};