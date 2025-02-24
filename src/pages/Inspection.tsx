import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Inspection {
  id: string;
  fsic_no: string;
  date_of_inspection: string;
  attending_inspector: string;
  valid_until: string;
  status: string;
  created_at: string;
  application_id: string;
  establishment_name: string;
  application_type: string;
}

const Inspection: FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: inspections, isLoading } = useQuery({
    queryKey: ['inspections'],
    queryFn: async () => {
      const { data, error } = await supabase
        .rpc('get_inspections_with_details', undefined, {
          count: 'exact'
        });
      
      if (error) throw error;
      return data as Inspection[];
    }
  });

  return (
    <div className="min-h-screen bg-[#FFF5F2]">
      <div className="bg-[#FF6347] px-6 py-4">
        <button
          onClick={() => navigate('/dashboard')}
          className="text-white flex items-center gap-2 mb-2"
        >
          <ChevronLeft size={20} />
          <span>Back</span>
        </button>
        <h1 className="text-white text-xl font-semibold">FOR INSPECTION</h1>
      </div>

      <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <div className="flex flex-1 gap-4 w-full">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  type="text"
                  placeholder="Search by Establishment Name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <button className="px-4 py-2 bg-gray-100 rounded-lg flex items-center gap-2">
                <Filter size={20} />
                <span>Filter</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left">INSPECTION NO.</th>
                  <th className="py-3 px-4 text-left">FSIC NO.</th>
                  <th className="py-3 px-4 text-left">ESTABLISHMENT NAME</th>
                  <th className="py-3 px-4 text-left">APPLICATION TYPE</th>
                  <th className="py-3 px-4 text-left">ATTENDING INSPECTOR</th>
                  <th className="py-3 px-4 text-left">DATE OF INSPECTION</th>
                  <th className="py-3 px-4 text-left">VALID UNTIL</th>
                  <th className="py-3 px-4 text-left">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="text-center py-4">Loading...</td>
                  </tr>
                ) : inspections?.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-4">No inspections found</td>
                  </tr>
                ) : (
                  inspections?.map((inspection) => (
                    <tr key={inspection.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{inspection.fsic_no}</td>
                      <td className="py-3 px-4">{inspection.establishment_name}</td>
                      <td className="py-3 px-4">{inspection.application_type}</td>
                      <td className="py-3 px-4">
                        {new Date(inspection.date_of_inspection).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">{inspection.attending_inspector}</td>
                      <td className="py-3 px-4">
                        {new Date(inspection.valid_until).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          inspection.status === 'inspected' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {inspection.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inspection;