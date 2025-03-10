import React from "react";

export const AdminInspectorsCard: React.FC = () => {
  return (
    <section className="shadow-[0_4px_4px_rgba(0,0,0,0.25)] bg-white mt-5 p-10 rounded-2xl max-sm:p-5">
      <h2 className="text-black text-xl font-semibold text-center mb-10 max-sm:text-lg">
        LISTS OF INSPECTORS - ON DUTY
      </h2>
      <div className="text-black text-xl font-semibold">
        Inspectors On Duty : 10
      </div>
      <button className="text-black text-base w-[117px] text-center mt-[-30px] bg-[rgba(254,98,63,0.5)] ml-[340px] p-1.5 rounded-[20px] max-sm:w-full">
        View All &gt;
      </button>
    </section>
  );
};