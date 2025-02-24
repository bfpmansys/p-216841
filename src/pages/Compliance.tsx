import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
const Compliance: FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { data: applications, isLoading } = useQuery({
    queryKey: ['compliance-applications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
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
        <h1 className="text-white text-xl font-semibold">FOR COMPLIANCE</h1>
      </div>
      <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
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
                  <th className="py-3 px-4 text-left">Establishment Name</th>
                  <th className="py-3 px-4 text-left">Application Type</th>
                  <th className="py-3 px-4 text-left">Date Submitted</th>
                  <th className="py-3 px-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={4} className="text-center py-4">Loading...</td>
                  </tr>
                ) : applications?.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-4">No pending applications found</td>
                  </tr>
                ) : (
                  applications?.map((application) => (
                    <tr key={application.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{application.establishment_name}</td>
                      <td className="py-3 px-4">{application.application_type}</td>
                      <td className="py-3 px-4">
                        {new Date(application.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                          Pending
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
export default Compliance;