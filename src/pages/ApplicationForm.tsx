import { FC, useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft } from "lucide-react";

import { ProgressBar } from "@/components/fsec/ProgressBar";
import { FormSection } from "@/components/fsec/FormSection";
import { InputField } from "@/components/fsec/InputField";
import { MapLocation } from "@/components/fsec/MapLocation";
import { SignatureUpload } from "@/components/fsec/SignatureUpload";
import { RequirementsUpload } from "@/components/fsec/RequirementsUpload";
import { ConfirmationPage } from "@/components/fsec/ConfirmationPage";
import { FSECFormData } from "@/components/fsec/types";
import { useToast } from "@/hooks/use-toast";

import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";
import ApplicationSummary from "@/components/fsec/ApplicationSummary";
import React from "react";

const VALENZUELA_BARANGAYS = [
  "Arkong Bato",
  "Balangkas",
  "Bignay",
  "Bisig",
  "Canumay East",
  "Canumay West",
  "Coloong",
  "Dalandanan",
  "Gen. T. de Leon",
  "Isla",
  "Karuhatan",
  "Lawang Bato",
  "Lingunan",
  "Mabolo",
  "Malanday",
  "Malinta",
  "Mapulang Lupa",
  "Marulas",
  "Maysan",
  "Palasan",
  "Pariancillo Villa",
  "Paso de Blas",
  "Pasolo",
  "Poblacion",
  "Pulo",
  "Punturin",
  "Rincon",
  "Tagalag",
  "Ugong",
  "Viente Reales",
  "Wawang Pulo"
];

// Get today's date in YYYY-MM-DD format
const today = new Date().toISOString().split("T")[0];
const dummyImage = new File([""], "dummy.jpg", { type: "image/jpeg" });

const ApplicationForm: React.FC = () => {
  // Get the application type from URL parameters
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title") || "Application Form";
  const establishmentName = searchParams.get("name") || "";
  const dtiNumber = searchParams.get("dtiNumber") || "";
  const applicationType = searchParams.get("type") || "clearance"; // Default to clearance if no type specified
  const skipUpload = searchParams.get("skipUpload") === "true"; // New parameter to skip document upload
  
  const [currentStep, setCurrentStep] = useState(1);
  
  // Properly define handlePrevious
  const handlePrevious = () => {
    if (currentStep === 3 && skipUpload) {
      // Skip the upload documents step and go directly to step 1
      setCurrentStep(1);
    } else {
      // Normal previous behavior
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Customize title based on application type
  const getFormTitle = () => {
    switch(applicationType) {
      case "occupancy":
        return "FIRE SAFETY INSPECTION CERTIFICATE (FSIC FOR OCCUPANCY PERMIT)";
      case "business":
        return "FIRE SAFETY INSPECTION CERTIFICATE (FSIC FOR BUSINESS PERMIT)";
      case "clearance":
        return "FIRE SAFETY EVALUATION CLEARANCE (FSEC)";
      case "others":
        return "OTHER FIRE SAFETY CERTIFICATES";
      case "new":
        return title || "REGISTER ESTABLISHMENT";
      default:
        return "REGISTER ESTABLISHMENT";
    }
  };

  // Get form subtitle
  const getFormSubtitle = () => {
    return `APPLICATION FORM : ${getFormTitle()}`;
  };

  const { toast } = useToast();
  const [formData, setFormData] = useState<FSECFormData>({
    applicationType: applicationType,
    establishmentName: establishmentName, // Initialize with URL parameter
    ownerName: "",
    representativeName: "",
    tradeName: "",
    occupancyType: "",
    floorArea: "",
    storeyCount: "",
    address: "",
    region: "National Capital Region (NCR)",
    province: "Metro Manila",
    city: "Valenzuela",
    barangay: "",
    mapLocation: null,
    landline: "",
    contactNumber: "",
    signature: dummyImage,
    date: today,
    dtiNumber: dtiNumber, // Initialize dtiNumber with URL parameter
    uploadedFiles: {},
  });
  
  const handleInputChange = (field: keyof FSECFormData) => 
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let value: string = event.target.value;
  
      // Ensure numeric fields are always positive numbers
      if (["floorArea", "storeyCount"].includes(field)) {
        const numValue = Number(value);
        if (isNaN(numValue) || numValue < 1) {
          value = ""; // Prevent NaN and negative values
        } else {
          value = numValue.toString(); // Store as string
        }
      }
  
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
  };
    
  const handleLocationChange = (lat: number, lng: number) => {
    setFormData(prev => ({
      ...prev,
      mapLocation: `${lat},${lng}`
    }));
  };

  const [signature, setSignature] = useState<File | null>(null);

  const handleSignatureUpload = (file: File) => {
    setSignature(file);
    setFormData((prev) => ({
      ...prev,
      signature: file,
    }));
    console.log("Uploaded Signature:", file); // Debugging log
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    // Required fields validation
    const requiredFields = [
      "establishmentName",
      "ownerName",
      "representativeName",
      "occupancyType",
      "floorArea",
      "storeyCount",
      "address",
      "barangay",
      "contactNumber",
      "date",
    ];
  
    const missingFields = requiredFields.filter(
      (field) => !formData[field as keyof FSECFormData]
    );
  
    if (missingFields.length > 0) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
  
    // Validate Signature File
    if (!(formData.signature instanceof File)) {
      toast({
        title: "Error",
        description: "Invalid signature file. Please upload again.",
        variant: "destructive",
      });
      return;
    }
    
    // Validate file size (max 5MB)
    if (formData.signature.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "Signature file must not exceed 5MB.",
        variant: "destructive",
      });
      return;
    }
  
    // If validation passes, proceed to next step
    // Skip document upload step if skipUpload is true
    if (skipUpload) {
      setCurrentStep(3); // Skip to confirmation page (step 3)
    } else {
      setCurrentStep(2); // Go to document upload page (step 2)
    }
    window.scrollTo(0, 0);
  };
  
  // Compute full address for map
  const fullAddress = `${formData.address}, ${formData.barangay}, ${formData.city}, Philippines`;

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <form onSubmit={handleSubmit}>
            <FormSection
              title="GENERAL INFORMATION"
              subtitle="Type in the required information"
            >
              <InputField
                label="Name of Establishment"
                required
                value={formData.establishmentName}
                onChange={handleInputChange("establishmentName")}
              />
              
              {/* Always show DTI Number field, disabled if it was passed via URL */}
              <InputField
                label="DTI Registration Number"
                value={formData.dtiNumber || ""}
                onChange={handleInputChange("dtiNumber")}
                disabled={!!dtiNumber} // Disable if dtiNumber was provided via URL
              />
              
              <div className="flex gap-5 max-md:flex-col max-md:gap-2.5">
                <InputField
                  label="Name of Owner"
                  required
                  value={formData.ownerName}
                  onChange={handleInputChange("ownerName")}
                />
                <InputField
                  label="Name of Representative"
                  required
                  value={formData.representativeName}
                  onChange={handleInputChange("representativeName")}
                />
                <InputField
                  label="Trade name"
                  required
                  value={formData.tradeName}
                  onChange={handleInputChange("tradeName")}
                />
              </div>
              <div className="flex gap-5 max-md:flex-col max-md:gap-2.5">
                <InputField
                  label="Type of Occupancy (Business Nature)"
                  required
                  value={formData.occupancyType}
                  onChange={handleInputChange("occupancyType")}
                />
                
                <InputField
                  label="Total Floor Area (m²)"
                  required
                  type="number"
                  value={formData.floorArea.toString()} // Convert to string
                  onChange={handleInputChange("floorArea")}
                />

                <InputField
                  label="No of Storey"
                  required
                  type="number"
                  value={formData.storeyCount.toString()} // Convert to string
                  onChange={handleInputChange("storeyCount")}
                />
              </div>
            </FormSection>

            <FormSection
              title="EXACT ADDRESS"
              subtitle="Type in the required information"
            >
              <div className="flex gap-5 max-md:flex-col max-md:gap-2.5">
                <InputField
                  label="Region"
                  required
                  value={formData.region}
                  onChange={handleInputChange("region")}
                  disabled
                />
                <InputField
                  label="Province"
                  required
                  value={formData.province}
                  onChange={handleInputChange("province")}
                  disabled
                />
              </div>
              <div className="flex gap-5 max-md:flex-col max-md:gap-2.5">
                <InputField
                  label="City"
                  required
                  value={formData.city}
                  onChange={handleInputChange("city")}
                  disabled
                />
                <div className="flex-1 mb-5">
                  <div className="text-base mb-[5px]">
                    <span>Barangay</span>
                    <span className="text-[#f00]">*</span>
                  </div>
                  <select
                    value={formData.barangay}
                    onChange={(e) => handleInputChange("barangay")({ target: { value: e.target.value } } as any)}
                    className="w-full bg-transparent outline-none"
                  >
                    <option value="">Select Barangay</option>
                    {VALENZUELA_BARANGAYS.map(barangay => (
                      <option key={barangay} value={barangay}>
                        {barangay}
                      </option>
                    ))}
                  </select>
                  <div className="h-px bg-black mt-[5px]" />
                </div>
              </div>
              
              <InputField
                label="Unit no., Block no./ Building Name / Street Name"
                required
                value={formData.address}
                onChange={handleInputChange("address")}
              />
              
              <div className="mt-5">
                <div className="text-base mb-[5px]">
                  <span>Map Location</span>
                  <span className="text-[#f00]">*</span>
                </div>
                <MapLocation
                  address={fullAddress}
                  onLocationChange={handleLocationChange}
                />
              </div>
            </FormSection>

            <div className="flex gap-[30px] mt-5 max-md:flex-col">
              <FormSection
                title="CONTACT DETAILS"
                subtitle="Type in the owner / representative of your contact information"
                className="flex-1"
              >
                <div className="flex gap-5 max-md:flex-col max-md:gap-2.5">
                  <InputField
                    label="Landline"
                    value={formData.landline}
                    onChange={handleInputChange("landline")}
                  />
                  <InputField
                    label="Contact Number"
                    required
                    value={formData.contactNumber}
                    onChange={handleInputChange("contactNumber")}
                  />
                </div>
              </FormSection>

              <FormSection title="ADDITIONAL DETAILS" className="flex-1">
                <SignatureUpload onFileSelected={handleSignatureUpload} />

                <div className="mt-5">
                <InputField disabled
                  label="Date"
                  required
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange("date")}
                />
              </div>
              </FormSection>
            </div>

            <div className="button flex justify-end bg-[#FFECDB] p-5 rounded-2xl max-md:p-[15px]">
              <button
                type="submit"
                className="bg-[#FE623F] text-white font-bold text-base px-6 py-3 rounded-xl shadow-md hover:bg-[#e6552e] transition-all"
              >
                PROCEED
              </button>
            </div>
          </form>
        );
      case 2:
        return (
          <RequirementsUpload
            formData={formData}
            setFormData={setFormData}
            setCurrentStep={setCurrentStep}
            onPrevious={handlePrevious} // Pass the handlePrevious function
          />
        );
      case 3:
        return (
          <ConfirmationPage
            formData={formData}
            setCurrentStep={setCurrentStep}
            onPrevious={handlePrevious} // Pass the handlePrevious function
          />
        );
      case 4:
        return (
          <ApplicationSummary
            formData={formData}
            setFormData={setFormData}
            setCurrentStep={setCurrentStep}
            onPrevious={handlePrevious} // Pass the handlePrevious function
          />
        );
      default:
        return null;
    }
  };

  const navigate = useNavigate();
  
  // Update the progress bar to reflect skipping a step
  const getProgressStepCount = () => {
    return skipUpload ? 3 : 4; // Total number of steps (3 if skipping upload, 4 otherwise)
  };
  
  return (
    <div className="min-h-screen bg-white font-['Poppins']">
      {/* Dashboard Navbar */}
      <DashboardNavbar />
      <div className="max-w-[1440px] bg-white mx-auto my-0">
        <main className="px-10 py-5 max-sm:px-2.5 max-sm:py-2.5">
          <div className="flex items-center bg-[#FE623F] p-5 rounded-[16px_16px_0_0]">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-white text-3xl font-bold"
          >
            <ChevronLeft size={30} className="text-white" />
          </button>

            <h1 className="text-white text-2xl font-bold max-sm:text-xl mx-auto text-center ">
              {getFormTitle()}
            </h1>
          </div>

          <div className="bg-[#FFECDB] p-5 max-md:p-[15px]">
            <h2 className="text-base font-bold mb-5">
              {getFormSubtitle()}
            </h2>

            {/* Pass totalSteps prop to ProgressBar based on whether we're skipping upload */}
            <ProgressBar 
              currentStep={currentStep} 
              totalSteps={getProgressStepCount()}
            />

            {renderStep()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ApplicationForm;