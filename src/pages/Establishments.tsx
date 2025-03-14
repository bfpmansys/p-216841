import { useState } from "react";
import { EstablishmentsTable } from "@/components/establishments/EstablishmentsTable";
import { SearchBar } from "@/components/establishments/SearchBar";
import { Establishment } from "@/types/establishment";
import { InsSidebar } from "@/components/dashboard/InsSidebar";
import { InsHeader } from "@/components/dashboard/InsHeader";

const Establishments = () => {
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
    <div className="bg-white overflow-hidden">
          <InsHeader />
          <main className="flex w-full max-w-[1392px] mx-auto items-stretch gap-[40px_41px] flex-wrap max-md:max-w-full">
            <InsSidebar />
            <div className="bg-[rgba(255,236,219,1)] grow shrink-0 basis-0 w-fit my-auto pb-[115px] rounded-2xl max-md:max-w-full max-md:pb-[100px]">
              <div className="bg-[rgba(254,98,63,1)] flex items-stretch gap-[40px_100px] text-2xl text-white font-bold whitespace-nowrap text-center flex-wrap pl-20 pr-[31px] py-[22px] rounded-[16px_16px_0px_0px] mt-10 max-md:max-w-full max-md:px-5">
                <div>ASSIGNED ESTABLISHMENTS</div>
              </div>
              
              <SearchBar onSearch={setSearchQuery} />
              <EstablishmentsTable establishments={filteredEstablishments} />
            </div>
          </main>
        </div>
      );
};

export default Establishments;
