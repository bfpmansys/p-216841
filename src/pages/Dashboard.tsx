
import { FC, useState } from "react";
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";
import { QuickLinks } from "@/components/dashboard/QuickLinks";
import { UserInfoCard } from "@/components/dashboard/UserInfoCard";
import { ApplicationTypeModal } from "@/components/dashboard/ApplicationTypeModal";
import { Bell } from "lucide-react";

const Dashboard: FC = () => {
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <DashboardNavbar />
      
      <div className="bg-[#FF6347] px-6 py-4 flex justify-between items-center">
        <h1 className="text-white text-xl font-semibold">DASHBOARD</h1>
        <button className="text-white">
          <Bell size={24} />
        </button>
      </div>

      <main className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-6">
          <UserInfoCard />
        </div>
        
        <div className="md:col-span-2 space-y-6">
          <div className="bg-[#FFF5F2] p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">ESTABLISHMENT INFORMATION</h2>
              <button 
                onClick={() => setIsApplicationModalOpen(true)}
                className="bg-[#FF6347] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#FF6347]/90 transition-colors"
              >
                + APPLY NEW ESTABLISHMENT
              </button>
            </div>
            <p className="text-gray-600">No establishments found.</p>
          </div>
          <QuickLinks />
        </div>
      </main>

      <ApplicationTypeModal 
        isOpen={isApplicationModalOpen}
        onClose={() => setIsApplicationModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;
