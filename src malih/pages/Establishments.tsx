import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";

const Establishments: FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: establishments, isLoading: establishmentsLoading } = useQuery({
    queryKey: ['establishments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('establishments')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const { data: inspections, isLoading: inspectionsLoading } = useQuery({
    queryKey: ['inspections'],
    queryFn: async () => {
      const { data, error } = await supabase
        .rpc('get_inspections_with_details', undefined, {
          count: 'exact'
        });
      
      if (error) throw error;
      return data;
    }
  });

  return (
    <div className="min-h-screen bg-white font-['Poppins']">
      {/* Dashboard Navbar */}
      <DashboardNavbar />
      <div className="max-w-[1440px] bg-white mx-auto my-0">
        <div className="px-10 py-5 max-sm:px-2.5 max-sm:py-2.5">
          <div className="flex items-center bg-[#FE623F] p-5 rounded-[16px_16px_0_0]">
        <button
          onClick={() => navigate('/dashboard')}
          className="text-white flex items-center gap-2 mb-2"
        >
          <ChevronLeft size={20} />
          <span></span>
        </button>
        <h1 className="text-white text-xl font-semibold">REGISTERED ESTABLISHMENTS</h1>
      </div>

      <div className="container mx-auto p-6 bg-[#FFECDB]">
        <div className="rounded-lg p-6 shadow-sm">
          <Tabs defaultValue="compliance" className="">
          <TabsList className="flex justify-center p-0 m-0 bg-[gray]-200 rounded-lg">
              <TabsTrigger 
                value="compliance" 
                className="px-8 data-[state=active]:bg-[#FF6347] data-[state=inactive]:bg-[#FEBCA5] data-[state=active]:text-white  data-[state=inactive]:text-white"
              >
                For Compliance
              </TabsTrigger>
              <TabsTrigger 
                value="inspection" 
                className="px-8 data-[state=active]:bg-[#FF6347] data-[state=inactive]:bg-[#FEBCA5] data-[state=active]:text-white  data-[state=inactive]:text-white"
              >
                For Inspection
              </TabsTrigger>
            </TabsList>

            <TabsContent value="compliance">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
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

              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-4 text-left">Application Number</th>
                      <th className="py-3 px-4 text-left">Establishment Name</th>
                      <th className="py-3 px-4 text-left">Application Type</th>
                      <th className="py-3 px-4 text-left">Date Of Application</th>
                      <th className="py-3 px-4 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {establishmentsLoading ? (
                      <tr>
                        <td colSpan={4} className="text-center py-4">Loading...</td>
                      </tr>
                    ) : establishments?.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="text-center py-4">No establishments found</td>
                      </tr>
                    ) : (
                      establishments?.map((establishment) => (
                        <tr key={establishment.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">{establishment.business_name}</td>
                          <td className="py-3 px-4">{establishment.business_type}</td>
                          <td className="py-3 px-4">{establishment.business_address}</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                              Active
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="inspection">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
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

              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-4 text-left">FSIC NO.</th>
                      <th className="py-3 px-4 text-left">Establishment Name</th>
                      <th className="py-3 px-4 text-left">Application Type</th>
                      <th className="py-3 px-4 text-left">Date of Inspection</th>
                      <th className="py-3 px-4 text-left">Attending Inspector</th>
                      <th className="py-3 px-4 text-left">Valid Until</th>
                      <th className="py-3 px-4 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inspectionsLoading ? (
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
            </TabsContent>
          </Tabs>
        </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Establishments;
