import React from "react";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { AdminHeader } from "@/components/dashboard/AdminHeader";
import { AdminCalendar } from "@/components/adminCalendar/AdminCalendar";

const AdCalendar = () => {
  return (
    <div className="min-h-screen bg-white">
      <AdminHeader />
      <AdminSidebar />
      <main className="ml-[106px] p-10 max-md:p-5">
        <div className="bg-[#fe623f] p-5 rounded-[16px_16px_0_0]">
          <h1 className="text-white text-2xl font-bold max-sm:text-xl">CALENDAR</h1>
        </div>
        <div className="shadow-[0_4px_4px_rgba(0,0,0,0.25)] bg-[rgba(255,236,219,1)]  mt-5 p-10 rounded-2xl">
            <AdminCalendar />
        </div>
      </main>
    </div>
  );
};

export default AdCalendar;