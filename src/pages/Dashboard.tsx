
import { FC, useState } from "react";
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";
import { QuickLinks } from "@/components/dashboard/QuickLinks";
import { UserInfoCard } from "@/components/dashboard/UserInfoCard";
import { WelcomeMessage } from "@/components/dashboard/WelcomeMessage";
import { EstablishmentCard } from "@/components/dashboard/EstablishmentCard";
import { ApplicationTypeModal } from "@/components/dashboard/ApplicationTypeModal";
import { Bell } from "lucide-react";


const Dashboard: FC = () => {
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-['Poppins']">
      <div className="bg-white flex flex-col overflow-hidden pb-[47px]">
        <nav />
        <DashboardNavbar />
        <main className="bg-[#ffecdb] self-center flex w-full max-w-[1349px] flex-col mt-[39px] pb-10 rounded-2xl">
          <div className="bg-[#fe623f] flex justify-between items-center px-[29px] py-[22px] rounded-[16px_16px_0_0]">
            <div className="text-white text-2xl font-bold">DASHBOARD</div>
            <img
              src="/images/icons/bellIcon.png"
              alt="Bell Icon"
              className="aspect-[1] object-contain w-10"
            />
          </div>
          <div className="flex flex-col mt-[18px] px-8 py-0 max-md:px-5 max-md:py-0">
          <div className="flex justify-between w-full text-black px-10 py-5 max-md:flex-col max-md:gap-5">
            <WelcomeMessage />
            <UserInfoCard></UserInfoCard>
          </div>
            <hr className="border mx-0 my-[42px] border-solid border-black" />
            <div className="flex mt-[17px] px-8 py-0 max-md:flex-col max-md:px-5 max-md:py-0">
              <QuickLinks />
              
              <div className="w-9/12 pl-10 max-md:w-full">
                <div className="flex justify-between items-center px- py-0 flex-wrap gap-4 max-md:flex-col max-md:px-5">
                  <h2 className="text-xl font-bold">ESTABLISHMENT INFORMATION</h2>
                  <button 
                    onClick={() => setIsApplicationModalOpen(true)}
                    className="bg-[#FF6347] flex items-center gap-3 text-white px-4 py-2 rounded-lg text-sm hover:bg-[#FF6347]/90 transition-colors"
                  >
                    <img
                      src="/images/icons/addIcon.png"
                      alt="Add Icon"
                      className="w-5 h-5 object-contain"
                    />
                    APPLY ESTABLISHMENT
                  </button>
                </div>

                
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-lg"></h2>
                </div>
                <EstablishmentCard
                  status="UNREGISTERED"
                  name="Dizon Enterprises"
                  type="FIRE SAFETY EVALUATION CLEARANCE (FSEC)"
                  state="FOR COMPLIANCE"
                />
                <EstablishmentCard
                  status="UNREGISTERED"
                  name="Javier Enterprises"
                  type="FSIC FOR CERTIFICATE OF OCCUPANCY"
                  state="REJECTED"
                />
                <EstablishmentCard
                  status="REGISTERED"
                  name="Javier Enterprises"
                  type="FSIC FOR BUSINESS PERMIT"
                  state="FOR INSPECTION"
                />
              </div>
            </div>
          </div>
        </main>
      </div>

      <ApplicationTypeModal 
        isOpen={isApplicationModalOpen}
        onClose={() => setIsApplicationModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;
