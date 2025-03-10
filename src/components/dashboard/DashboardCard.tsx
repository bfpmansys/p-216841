
interface DashboardCardProps {
  title: string;
  items: string[];
  isPriority?: boolean;
}

export const DashboardCard = ({
  title,
  items,
  isPriority = false,
}: DashboardCardProps) => {
  return (
    <div className="bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)] flex flex-col w-full pt-[18px] pb-6 px-5 rounded-2xl max-md:max-w-full">
      <div className="text-black text-xl font-semibold mb-3">
        <span className={isPriority ? "text-[rgba(255,0,0,1)]" : "text-black"}>
          {title}
        </span>
      </div>
      
      <div className="w-full">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-center mb-3">
            <span className="font-normal text-base text-black">{item}</span>
            <div className="bg-[rgba(254,98,63,1)] text-xs text-white font-medium py-1.5 px-4 rounded-lg cursor-pointer hover:bg-[rgba(254,78,43,1)]">
              see &gt;
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
