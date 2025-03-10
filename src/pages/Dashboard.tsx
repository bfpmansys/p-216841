
import { FC, useState } from "react";
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";
import { QuickLinks } from "@/components/dashboard/QuickLinks";
import { UserInfoCard } from "@/components/dashboard/UserInfoCard";
import { WelcomeMessage } from "@/components/dashboard/WelcomeMessage";
import { EstablishmentCard } from "@/components/dashboard/EstablishmentCard";
import { ApplicationTypeModal } from "@/components/dashboard/ApplicationTypeModal";
import { Bell } from "lucide-react";
import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { WelcomeSection } from "@/components/dashboard/WelcomeSection";
import { EstablishmentList } from "@/components/dashboard/EstablishmentList";


const Dashboard: FC = () => {
  const userInfo = {
    name: "DIZON, SANDARAH",
    userId: "22-222145",
    establishmentCount: 3,
    lastLogin: "February 31, 2025",
  };

  return (
    <div className="min-h-screen bg-[#FFF8F1]">
      <Header />
      <Sidebar />

      <main className="pt-[136px] ml-[106px] p-5 max-sm:ml-0">
        <div className="flex justify-between items-center bg-[#fe623f] p-5 rounded-[16px_16px_0_0] max-sm:p-[15px]">
          <h1 className="text-white text-2xl font-bold">DASHBOARD</h1>
          <button>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/55f1fb04439a40c4832d8aa12152a0da7d6d8843"
              className="w-10 h-10"
              alt="Notifications"
            />
          </button>
        </div>

        <WelcomeSection userInfo={userInfo} />

        <div className="h-px bg-black mx-0 my-5" role="separator" />

        <EstablishmentList />
      </main>
    </div>
  );
};


export default Dashboard;
