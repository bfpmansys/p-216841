import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { InspectionsList } from "@/components/dashboard/InspectionsList";
import { MonthlyChart } from "@/components/dashboard/MonthlyChart";
import { InsSidebar } from "@/components/dashboard/InsSidebar";
import { InsHeader } from "@/components/dashboard/InsHeader";

const InspectorDashboard = () => {
  const priorityInspections = ["Edge Ent.", "Edge Residence"];
  const assignedInspections = ["Edge Ent.", "Edge Residence"];
  const months = [
    "March 2025",
    "February 2025",
    "January 2025",
    "December 2024",
  ];

  return (
    <div className="bg-white overflow-hidden">
      <InsHeader />
      <main className="flex w-full max-w-[1392px] mx-auto items-stretch gap-[40px_41px] flex-wrap max-md:max-w-full">
        <InsSidebar />
        <div className="bg-[rgba(255,236,219,1)] grow shrink-0 basis-0 w-fit my-auto pb-[115px] rounded-2xl max-md:max-w-full max-md:pb-[100px] mt-10">
          <div className="bg-[rgba(254,98,63,1)] flex items-stretch gap-[40px_100px] text-2xl text-white font-bold whitespace-nowrap text-center flex-wrap pl-20 pr-[31px] py-[22px] rounded-[16px_16px_0px_0px] max-md:max-w-full max-md:px-5">
            <div>DASHBOARD</div>
          </div>

          <div className="flex w-full flex-col items-stretch mt-[19px] px-[39px] max-md:max-w-full max-md:px-5">
            <div className="flex w-full gap-5 flex-wrap justify-between max-md:max-w-full max-md:mr-2">
              <div className="text-black text-xl font-semibold mt-[13px]">
                GOOD DAY, Inspector Darah!
                <br />
                <span className="font-normal text-base">Assigned to you, </span>
              </div>
              <StatusBadge initialStatus="on-duty" />
            </div>

            <div className="w-full mt-6 md:mt-[35px]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <DashboardCard
                  title="PRIORITY INSPECTIONS"
                  items={priorityInspections}
                  isPriority
                />
                <DashboardCard
                  title="ASSIGNED INSPECTIONS"
                  items={assignedInspections}
                />
              </div>
            </div>

            <InspectionsList months={months} />
            <MonthlyChart />
          </div>
        </div>
      </main>
    </div>
  );
};

export default InspectorDashboard;