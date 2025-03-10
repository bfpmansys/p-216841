import React from "react";

export const Sidebar: React.FC = () => {
  return (
    <aside className="fixed w-[106px] h-[908px] shadow-[5px_4px_4px_rgba(0,0,0,0.25)] bg-white left-0 top-[116px] max-sm:hidden">
      <nav className="flex flex-col items-center gap-[50px] pt-[95px]">
        <div className="flex justify-center items-center w-[106px] h-[69px]">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/650ba195e9eb752a28edadd1d548ef0d00eaf505"
            className="w-[23px] h-[23px]"
            alt="Dashboard"
          />
        </div>
        <div className="flex justify-center items-center w-[106px] h-[69px]">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/fa3d9fa010659ecae92dba82e652fe6f905c82de"
            className="w-[23px] h-[23px]"
            alt="Menu"
          />
        </div>
        <div className="flex justify-center items-center w-[106px] h-[69px]">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d541fde572a992b87cbb8bbb265156b65149af88"
            className="w-[23px] h-[23px]"
            alt="Settings"
          />
        </div>
        <div className="flex justify-center items-center w-[106px] h-[69px]">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a2f69d7c6e9409aedfb8ae435e8d7534032d5883"
            className="w-[23px] h-[23px]"
            alt="Profile"
          />
        </div>
      </nav>
    </aside>
  );
};