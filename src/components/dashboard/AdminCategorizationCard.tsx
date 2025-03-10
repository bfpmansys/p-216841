import React from "react";

export const AdminCategorizationCard: React.FC = () => {
  return (
    <section className="shadow-[0_4px_4px_rgba(0,0,0,0.25)] bg-white mt-5 p-10 rounded-2xl max-sm:p-5">
      <h2 className="text-black text-xl font-bold text-center mb-10 max-sm:text-lg">
        ESTABLISHMENT CATEGORIZATION
      </h2>
      <div className="flex justify-between gap-5 max-md:flex-col max-md:items-center">
        <div className="text-white text-xl font-bold text-center w-[318px] bg-[#f00] p-[25px] rounded-[20px] max-sm:w-full">
          RESIDENTIAL 50
        </div>
        <div className="text-white text-xl font-bold text-center w-[318px] bg-[#fe623f] p-[25px] rounded-[20px] max-sm:w-full">
          COMMERCIAL 50
        </div>
        <div className="text-white text-xl font-bold text-center w-[318px] bg-[#dcae1f] p-[25px] rounded-[20px] max-sm:w-full">
          INDUSTRIAL 50
        </div>
      </div>
    </section>
  );
};
