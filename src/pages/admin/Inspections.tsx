import React from "react";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { AdminHeader } from "@/components/dashboard/AdminHeader";

const Inspections = () => {
  return (
    <div className="min-h-screen bg-white">
      <AdminHeader />
      <AdminSidebar />
      <main className="ml-[106px] p-10 max-md:p-5">
        <div className="bg-[#fe623f] p-5 rounded-[16px_16px_0_0]">
          <h1 className="text-white text-2xl font-bold max-sm:text-xl">INSPECTIONS</h1>
        </div>
        <div className="shadow-[0_4px_4px_rgba(0,0,0,0.25)] bg-white mt-5 p-10 rounded-2xl">
          <h2 className="text-black text-xl font-bold">Inspections Page</h2>
          <p className="mt-4">Manage and view all inspections here.</p>
        </div>
      </main>
    </div>
  );
};

export default Inspections;