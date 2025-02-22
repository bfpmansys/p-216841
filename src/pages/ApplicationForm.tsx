
import { FC, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft } from "lucide-react";

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

const ApplicationForm: FC = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    establishmentName: "",
    ownerName: "",
    representativeName: "",
    tradeName: "",
    occupancyType: "",
    totalFloorArea: "",
    numberOfStoreys: "",
    unitNo: "",
    buildingName: "",
    streetName: "",
    barangay: "",
    landline: "",
    contactNumber: "",
    signature: null as File | null,
  });

  const getFormTitle = () => {
    switch (type) {
      case "new_business":
        return "NEW BUSINESS PERMIT";
      case "annual":
        return "ANNUAL BUSINESS PERMIT";
      case "occupancy":
        return "OCCUPANCY PERMIT";
      case "special":
        return "SPECIAL PERMIT";
      default:
        return "PERMIT APPLICATION";
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData((prev) => ({ ...prev, signature: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Store form data in localStorage for now, we'll implement the full submission later
    localStorage.setItem('applicationFormData', JSON.stringify(formData));
    navigate(`/dashboard/apply/${type}/requirements`);
  };

  return (
    <div className="min-h-screen bg-[#FFF5F2]">
      <div className="bg-[#FF6347] px-6 py-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-white flex items-center gap-2 mb-2"
        >
          <ChevronLeft size={20} />
          <span>Back</span>
        </button>
        <h1 className="text-white text-xl font-semibold">{getFormTitle()}</h1>
      </div>

      <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="space-y-1 mb-6">
            <h2 className="font-semibold text-lg">APPLICATION FORM</h2>
            <div className="flex gap-2 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#FF6347] text-white flex items-center justify-center">1</div>
                <span>Fill out the Form</span>
              </div>
              <div className="flex items-center gap-2 opacity-50">
                <div className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center">2</div>
                <span>Upload the Requirements</span>
              </div>
              <div className="flex items-center gap-2 opacity-50">
                <div className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center">3</div>
                <span>Confirm and Submit</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <h3 className="font-semibold">GENERAL INFORMATION</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="establishmentName">Name of Establishment *</Label>
                  <Input
                    id="establishmentName"
                    name="establishmentName"
                    required
                    value={formData.establishmentName}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="ownerName">Name of Owner *</Label>
                  <Input
                    id="ownerName"
                    name="ownerName"
                    required
                    value={formData.ownerName}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="representativeName">Name of Representative</Label>
                  <Input
                    id="representativeName"
                    name="representativeName"
                    value={formData.representativeName}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="tradeName">Trade Name</Label>
                  <Input
                    id="tradeName"
                    name="tradeName"
                    value={formData.tradeName}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="occupancyType">Type of Occupancy *</Label>
                  <Input
                    id="occupancyType"
                    name="occupancyType"
                    required
                    value={formData.occupancyType}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="totalFloorArea">Total Floor Area (m²) *</Label>
                  <Input
                    id="totalFloorArea"
                    name="totalFloorArea"
                    type="number"
                    required
                    value={formData.totalFloorArea}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="numberOfStoreys">No. of Storey *</Label>
                  <Input
                    id="numberOfStoreys"
                    name="numberOfStoreys"
                    type="number"
                    required
                    value={formData.numberOfStoreys}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">EXACT ADDRESS</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="unitNo">Unit no., Block no./ Building Name / Street Name</Label>
                  <Input
                    id="unitNo"
                    name="streetName"
                    value={formData.streetName}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="barangay">Barangay *</Label>
                  <select
                    id="barangay"
                    name="barangay"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                    value={formData.barangay}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Barangay</option>
                    {VALENZUELA_BARANGAYS.map((barangay) => (
                      <option key={barangay} value={barangay}>
                        {barangay}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-2">
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Region: National Capital Region NCR</p>
                    <p className="text-sm text-gray-600 mb-2">Province: METRO MANILA</p>
                    <p className="text-sm text-gray-600">City: Valenzuela City</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">CONTACT DETAILS</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="landline">Landline</Label>
                  <Input
                    id="landline"
                    name="landline"
                    value={formData.landline}
                    onChange={handleInputChange}
                    placeholder="(000) 000-0000"
                  />
                </div>
                <div>
                  <Label htmlFor="contactNumber">Contact Number</Label>
                  <Input
                    id="contactNumber"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    placeholder="09XX XXX XXXX"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">ADDITIONAL DETAILS</h3>
              <div>
                <Label htmlFor="signature">Upload Signature (over Printed Name)</Label>
                <Input
                  id="signature"
                  name="signature"
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-[#FF6347] text-white px-6 py-2 rounded-lg hover:bg-[#FF6347]/90 transition-colors"
              >
                PROCEED
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
