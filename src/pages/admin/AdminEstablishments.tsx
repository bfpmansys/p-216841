import { useState } from "react";
import { EstablishmentsTable } from "@/components/establishments/EstablishmentsTable";
import { SearchBar } from "@/components/establishments/SearchBar";
import { Establishment } from "@/types/establishment";
import { InsSidebar } from "@/components/dashboard/InsSidebar";
import { InsHeader } from "@/components/dashboard/InsHeader";
import { AdminHeader } from "@/components/dashboard/AdminHeader";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";

const AdminEstablishments = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const establishments: Establishment[] = [
    {
      inspectionNo: "25-0001",
      name: "Dizon Aquino Eiram James Ent.",
      type: "Industrial",
      businessNature: "Educational Occupancy",
      owner: "Sandarah Dizon",
      contactNumber: "0123456789",
      address: "123 Lovable St., Malinta, Valenzuela City",
      inspectionDate: "March, 3, 2025, 11:00 am",
      status: "FOR INSPECTION",
    },
    {
      inspectionNo: "25-0001",
      name: "Dizon Aquino Eiram James Ent.",
      type: "Industrial",
      businessNature: "Educational Occupancy",
      owner: "Sandarah Dizon",
      contactNumber: "0123456789",
      address: "123 Lovable St., Malinta, Valenzuela City",
      inspectionDate: "March, 5, 2025, 12:00am",
      status: "INSPECTED",
    },
    {
      inspectionNo: "25-0001",
      name: "Dizon Aquino Eiram James Ent.",
      type: "Industrial",
      businessNature: "Educational Occupancy",
      owner: "Sandarah Dizon",
      contactNumber: "0123456789",
      address: "123 Lovable St., Malinta, Valenzuela City",
      inspectionDate: "March, 5, 2025, 12:00am",
      status: "REJECTED",
    },
  ];

  const filteredEstablishments = establishments.filter(
    (est) =>
      est.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      est.inspectionNo.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-white">
            <AdminHeader />
            <AdminSidebar />
            <main className="ml-[106px] p-10 max-md:p-5">
            <div className="bg-[#fe623f] p-5 rounded-[16px_16px_0_0]">
              <h1 className="text-white text-2xl font-bold max-sm:text-xl">ESTABLISHMENTS</h1>
            </div>
            <div className="shadow-[0_4px_4px_rgba(0,0,0,0.25)] bg-white mt-5 p-10 rounded-2xl">
              <SearchBar onSearch={setSearchQuery} />
              <EstablishmentsTable establishments={filteredEstablishments} />
            </div>
            </main>
          </div>
        );
  };

export default AdminEstablishments;