import React from "react";
import { InspectorCalendar } from "@/components/inspector/InspectorCalendar";
import { InsHeader } from "@/components/dashboard/InsHeader";
import { InsSidebar } from "@/components/dashboard/InsSidebar";

const InsCalendar = () => {
  return (
    <div className="bg-white overflow-hidden">
      <InsHeader />
      <main className="flex w-full max-w-[1392px] mx-auto items-stretch gap-[40px_41px] flex-wrap max-md:max-w-full">
          <InsSidebar />
          <div className="bg-[rgba(255,236,219,1)] grow shrink-0 basis-0 w-fit my-auto pb-[115px] rounded-2xl max-md:max-w-full max-md:pb-[100px]">
            <div className="bg-[rgba(254,98,63,1)] flex items-stretch gap-[40px_100px] text-2xl text-white font-bold whitespace-nowrap text-center flex-wrap pl-20 pr-[31px] py-[22px] rounded-[16px_16px_0px_0px] mt-10 max-md:max-w-full max-md:px-5">
              <div>CALENDAR</div>
            </div>
            <InspectorCalendar />
          </div>
      </main>
    </div>
  );
};

export default InsCalendar;