import React from "react";

interface EstablishmentCardProps {
  status: "ACTIVE" | "INACTIVE";
  name: string;
  type: string;
  state: string;
}

export const EstablishmentCard: React.FC<EstablishmentCardProps> = ({
  status,
  name,
  type,
  state,
}) => {
  return (
    <div className="bg-white relative mb-5 px-[30px] py-[18px] rounded-[10px] max-sm:px-5 max-sm:py-[15px]">
      <div className="absolute bg-[#fe623f] text-white text-base font-bold px-[21px] py-[5px] rounded-[10px] left-[17px] -top-3">
        {status}
      </div>
      <div className="flex justify-between items-center">
        <div>
          <div className="text-xl font-semibold mb-1">{name}</div>
          <div className="text-base font-normal ml-[13px]">{type}</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-xl font-semibold">{state}</div>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/1b9ad9b0902d48399c0d5508a8068157/00cae3e474798867d2108791802fffa16a59ae13fb2a28da3e08f13d407de656"
            alt="Status Icon"
            className="w-[34px] h-[34px]"
          />
        </div>
      </div>
    </div>
  );
};
