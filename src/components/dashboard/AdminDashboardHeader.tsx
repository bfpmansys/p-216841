import React from "react";

export const AdminDashboardHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center bg-[#fe623f] p-5 rounded-[16px_16px_0_0]">
      <h1 className="text-white text-2xl font-bold max-sm:text-xl">
        DASHBOARD
      </h1>
      <button aria-label="Notifications">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/55f1fb04439a40c4832d8aa12152a0da7d6d8843"
          className="w-10 h-10"
          alt="Notification"
        />
      </button>
    </div>
  );
};
