import React from "react";

export const MonthlyStats = () => {
  return (
    <section className="mt-10">
      <h2 className="text-black text-2xl font-semibold text-center mb-10">
        TOTAL INSPECTIONS FOR THE MONTH
      </h2>
      <div className="relative">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/605c382ffc624f65b1b13358f5877fd8/4c755930cc8489d9c0ff85a725840947cb227631a6090338cb93bf51cfcde9af?placeholderIfAbsent=true"
          alt="Monthly Statistics Chart"
          className="aspect-[2.4] object-contain w-full self-center max-w-screen-lg max-md:max-w-full"
        />
        <div className="mt-8 space-y-4">
          <div className="flex items-center gap-4 text-2xl text-black font-medium ml-[95px] max-md:ml-2.5">
            <div className="bg-[rgba(242,124,34,1)] w-[39px] h-[37px] rounded-[50%]" />
            <span>Priority Inspections</span>
          </div>
          <div className="flex items-center gap-4 text-2xl text-black font-medium ml-[95px] max-md:ml-2.5">
            <div className="bg-[rgba(255,189,89,1)] w-[39px] h-[37px] rounded-[50%]" />
            <span>Assigned Establishments</span>
          </div>
        </div>
      </div>
    </section>
  );
};