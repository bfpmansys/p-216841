import React from "react";
import { EstablishmentCard } from "./EstablishmentCard";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const EstablishmentList: React.FC = () => {
  const navigate = useNavigate();

  const handleAddNewEstablishment = () => {
    navigate("/ApplicationForm?type=new&title=New Establishment Registration");
  };

  return (
    <section className="p-5 bg-[#FFF8F1]">
      <div className="flex justify-between items-center mb-6 max-sm:flex-col max-sm:gap-5">
        <h2 className="text-xl font-bold">ESTABLISHMENT INFORMATION</h2>
        <button
          className="flex items-center text-white font-bold bg-[#fe623f] px-4 py-2 rounded-[10px] max-sm:w-full max-sm:justify-center"
          onClick={handleAddNewEstablishment}
        >
          <Plus size={20} className="mr-2" />
          <span>ADD NEW ESTABLISHMENT</span>
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <EstablishmentCard
          name="Jian Studio"
          status="UNREGISTERED"
          dtiNumber="DTI NO. 25-37836"
        />
        <EstablishmentCard
          name="Dizon Enterprises"
          status="REGISTERED"
          applicationType="FIRE SAFETY INSPECTION CERTIFICATE (OCCUPANCY)"
          dtiNumber="DTI NO. 25-37836"
        />
      </div>

      <div className="text-right text-[15px] font-semibold mt-5">
        <button className="text-gray-700">view all &gt;</button>
      </div>
    </section>
  );
};
