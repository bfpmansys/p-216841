import React from "react";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { AdminHeader } from "@/components/dashboard/AdminHeader";
import { UserAccountsTable } from "./users/UserAccountTable";

const Reports = () => {
  return (
    <div className="min-h-screen bg-white">
      <AdminHeader />
      <AdminSidebar />
      <main className="ml-[106px] p-10 max-md:p-5">
        <UserAccountsTable />
      </main>
    </div>
  );
};

export default Reports;