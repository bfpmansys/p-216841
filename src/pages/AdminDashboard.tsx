import { AdminCategorizationCard } from "@/components/dashboard/AdminCategorizationCard";
import { AdminDashboardHeader } from "@/components/dashboard/AdminDashboardHeader";
import { AdminEstablishmentCard } from "@/components/dashboard/AdminEstablishmentCard";
import { AdminHeader } from "@/components/dashboard/AdminHeader";
import { AdminInspectionCard } from "@/components/dashboard/AdminInspectionCard";
import { AdminInspectorsCard } from "@/components/dashboard/AdminInspectorsCard";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import React from "react";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-white">
      <AdminHeader />
      <AdminSidebar />
      <main className="ml-[106px] p-10 max-md:p-5">
        <AdminDashboardHeader />
        <AdminEstablishmentCard />
        <AdminInspectionCard />
        <AdminCategorizationCard />
        <AdminInspectorsCard />
      </main>
    </div>
  );
};

export default AdminDashboard;
