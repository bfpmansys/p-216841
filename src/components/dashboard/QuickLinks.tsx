
import { FC } from "react";
import { FileText, Building2, ClipboardList, Inbox } from "lucide-react";

export const QuickLinks: FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-lg">QUICK LINKS</h2>
      <div className="space-y-2">
        <button className="w-full flex items-center gap-2 p-3 bg-[#FF6347] text-white rounded-lg hover:bg-[#FF6347]/90 transition-colors">
          <FileText size={20} />
          <span>APPLICATION</span>
        </button>
        <button className="w-full flex items-center gap-2 p-3 bg-[#FF6347] text-white rounded-lg hover:bg-[#FF6347]/90 transition-colors">
          <Building2 size={20} />
          <span>ESTABLISHMENT</span>
        </button>
        <button className="w-full flex items-center gap-2 p-3 bg-[#FF6347] text-white rounded-lg hover:bg-[#FF6347]/90 transition-colors">
          <ClipboardList size={20} />
          <span>REQUIREMENTS</span>
        </button>
        <button className="w-full flex items-center gap-2 p-3 bg-[#FF6347] text-white rounded-lg hover:bg-[#FF6347]/90 transition-colors">
          <Inbox size={20} />
          <span>INBOX</span>
        </button>
      </div>
    </div>
  );
};
