import React from "react";
import { useToast } from "@/hooks/use-toast";

interface InspectionCardProps {
  title: string;
  establishments: string[];
  isPriority?: boolean;
}

export const InspectionCard: React.FC<InspectionCardProps> = ({
  title,
  establishments,
  isPriority = false,
}) => {
  const { toast } = useToast();

  const handleSeeClick = (establishment: string) => {
    toast({
      title: `Viewing ${establishment}`,
      description: `Opening details for ${establishment} inspection`,
    });
  };

  return (
    <div className="bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)] flex grow items-start gap-5 flex-wrap justify-between w-full pt-[18px] pb-[63px] px-4 rounded-2xl max-md:max-w-full max-md:mt-10">
      <div className="text-black text-xl font-semibold w-[351px]">
        <span className={isPriority ? "text-[rgba(255,0,0,1)]" : "text-black"}>
          {title}
        </span>
        <br />
        <ul>
          {establishments.map((establishment, index) => (
            <li key={index}>
              <span className="font-normal text-base">{establishment}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="text-xs text-white font-medium mt-[63px] max-md:mt-10">
        {establishments.map((establishment, index) => (
          <button
            key={index}
            onClick={() => handleSeeClick(establishment)}
            className="z-10 bg-[rgba(254,98,63,1)] pb-2.5 px-4 rounded-lg mb-2 cursor-pointer hover:bg-[rgba(254,78,43,1)] transition-colors block"
          >
            see &gt;
          </button>
        ))}
      </div>
    </div>
  );
};
