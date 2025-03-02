import React from "react";

export const Header = () => {
  return (
    <header className="bg-white flex w-full gap-5 font-semibold text-center flex-wrap justify-between pt-[19px] pb-[11px] px-[41px] border-2 border-solid border-black max-md:pt-[19px] max-md:pb-[11px] max-md:px-5">
      <div className="flex gap-[21px] items-center">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/1b9ad9b0902d48399c0d5508a8068157/2465bec764fe8ffeea08e3cb6186c001ada9290d76b9b182e94549cd3d8d8a12"
          alt="V-FIRE Logo"
          className="aspect-[0.76] object-contain w-[65px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
        />
        <div className="flex items-center gap-1.5">
          <div className="text-[#ff0000] text-4xl max-sm:text-[28px]">
            V-FIRE
          </div>
          <div className="text-black text-xl max-sm:text-base">INSPECT</div>
        </div>
      </div>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/1b9ad9b0902d48399c0d5508a8068157/2e6bc086d506d5afe20d36de5e49ff28a10c7c94601d2ba7fecd34057717e67a"
        alt="User Profile"
        className="aspect-[1] object-contain w-[50px]"
      />
    </header>
  );
};
