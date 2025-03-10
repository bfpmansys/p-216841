interface InspectionsListProps {
  months: string[];
}

export const InspectionsList = ({ months }: InspectionsListProps) => {
  return (
    <div className="bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-full max-w-full mt-[19px] p-5 rounded-2xl">
      <div className="text-black text-xl font-semibold mb-3">
        SEE TOTAL INSPECTIONS
      </div>
      
      <div className="w-full">
        {months.map((month, index) => (
          <div key={index} className="flex justify-between items-center mb-3">
            <span className="text-base text-black">{month}</span>
            <div className="bg-[rgba(254,98,63,1)] text-xs text-white font-medium py-1.5 px-4 rounded-lg cursor-pointer hover:bg-[rgba(254,78,43,1)]">
              see &gt;
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};