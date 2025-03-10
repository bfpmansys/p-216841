import React, { useState } from "react";
import { MoreVertical, ArrowRight, ExternalLink, X, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface EstablishmentCardProps {
  name: string;
  status: "REGISTERED" | "UNREGISTERED";
  applicationType?: string;
  dtiNumber: string;
}

export const EstablishmentCard: React.FC<EstablishmentCardProps> = ({
  name,
  status,
  applicationType,
  dtiNumber,
}) => {
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleApplyClick = () => {
    setShowApplicationModal(true);
  };
  
  const handleRegisterClick = () => {
    // Add the skipUpload=true parameter
    navigate(`/ApplicationForm?type=new&title=Register Establishment&name=${encodeURIComponent(name)}&dtiNumber=${encodeURIComponent(dtiNumber)}&skipUpload=true`);
  };

  const handleApplicationSelect = (applicationType: string) => {
    toast({
      title: "Application Type Selected",
      description: `You selected: ${applicationType}`,
    });
    
    // Close the modal
    setShowApplicationModal(false);
    
    // Determine the application type parameter to use in the URL
    let typeParam = "clearance"; // Default
    
    if (applicationType.includes("FSEC")) {
      typeParam = "clearance";
    } else if (applicationType.includes("Occupancy")) {
      typeParam = "occupancy";
    } else if (applicationType.includes("Business")) {
      typeParam = "business";
    }
    
    // Navigate to the ApplicationForm.tsx component with the appropriate type parameter
    setTimeout(() => {
      navigate(`/ApplicationForm?type=${typeParam}`);
    }, 300); // Small delay to allow toast to be seen
  };

  return (
    <article className="bg-white rounded-lg shadow-md p-4 relative">
      <div className="flex justify-between items-start mb-1">
        <div>
          <div className={`text-white text-xs font-bold px-2 py-1 rounded inline-block ${status === "REGISTERED" ? "bg-[#FE623F]" : "bg-[#FE623F]"} whitespace-nowrap`}>
            {status}
          </div>
        </div>
        <div className="flex items-center">
          <button className="p-1 text-gray-500">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>
      
      <div className="mt-2">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-gray-500 text-sm mt-0.5">
          Application Type: {applicationType || "------"}
        </p>
      </div>
      
      <div className="flex justify-between items-center mt-4">
        <span className="text-gray-700 font-medium">{dtiNumber}</span>
        
        {status === "UNREGISTERED" ? (
          <button className="bg-[#FE623F] text-white px-3 py-1.5 rounded flex items-center gap-1 text-sm"  onClick={handleRegisterClick}>
            Register Establishment
            <ExternalLink size={16} />
          </button>
        ) : (
          <div className="flex flex-col gap-2 items-end">
            <button 
              className="bg-[#FE623F] text-white px-3 py-1.5 rounded flex items-center gap-1 text-sm"
              onClick={handleApplyClick}
            >
              Apply for Certification
              <ArrowRight size={16} />
            </button>
            <button className="bg-[#FE623F] text-white px-3 py-1.5 rounded flex items-center gap-1 text-sm">
              View Est. Information
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Application Type Selection Modal */}
      {showApplicationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-3xl mx-4">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-center w-full">SELECT APPLICATION TYPE</h2>
                <button 
                  onClick={() => setShowApplicationModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="border-t border-gray-200 my-4"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <button 
                  className="bg-white border border-gray-200 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center"
                  onClick={() => handleApplicationSelect("Fire Safety Evaluation Clearance (FSEC)")}
                >
                  <FileText className="w-12 h-12 mb-2 text-[#FE623F]" />
                  <h3 className="font-bold">Fire Safety Evaluation Clearance (FSEC)</h3>
                  <p className="text-sm text-gray-500 mt-1">Apply for evaluation</p>
                </button>
                
                <button 
                  className="bg-white border border-gray-200 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center"
                  onClick={() => handleApplicationSelect("Fire Safety Inspection Certificate (FSIC for Occupancy Permit)")}
                >
                  <FileText className="w-12 h-12 mb-2 text-[#FE623F]" />
                  <h3 className="font-bold">Fire Safety Inspection Certificate (FSIC for Occupancy Permit)</h3>
                  <p className="text-sm text-gray-500 mt-1">Apply for occupancy permit</p>
                </button>
                
                <button 
                  className="bg-white border border-gray-200 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center"
                  onClick={() => handleApplicationSelect("Fire Safety Inspection Certificate (FSIC for Business Permit)")}
                >
                  <FileText className="w-12 h-12 mb-2 text-[#FE623F]" />
                  <h3 className="font-bold">Fire Safety Inspection Certificate (FSIC for Business Permit)</h3>
                  <p className="text-sm text-gray-500 mt-1">Apply for business certificate</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};