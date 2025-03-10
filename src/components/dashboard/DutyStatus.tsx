
import React, { useState } from "react";

export const DutyStatus = () => {
  const [isOnDuty, setIsOnDuty] = useState(true);

  const toggleDutyStatus = () => {
    setIsOnDuty(!isOnDuty);
  };

  return (
    <div className="text-sm text-white font-bold text-center">
      <button
        onClick={toggleDutyStatus}
        className="bg-[rgba(148,133,129,0.7)] border flex items-stretch gap-[7px] px-2.5 py-[5px] rounded-[30px] border-white border-solid w-full hover:bg-[rgba(148,133,129,0.9)] transition-colors cursor-pointer"
      >
        {isOnDuty ? (
          <>
            <div className="grow">ON DUTY</div>
            <div className="bg-[rgba(27,240,52,1)] flex w-[25px] shrink-0 h-[25px] rounded-[50%]" />
          </>
        ) : (
          <>
            <div className="bg-[rgba(255,0,0,1)] flex w-[25px] shrink-0 h-[25px] rounded-[50%]" />
            <div className="grow">OFF DUTY</div>
          </>
        )}
      </button>
    </div>
  );
};