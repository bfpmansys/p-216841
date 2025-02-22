
import { FC } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const ApplicationSummary: FC = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FFF5F2]">
      <div className="bg-[#FF6347] px-6 py-4">
        <button
          onClick={() => navigate(`/dashboard/apply/${type}/requirements`)}
          className="text-white flex items-center gap-2 mb-2"
        >
          <ChevronLeft size={20} />
          <span>Back</span>
        </button>
        <h1 className="text-white text-xl font-semibold">APPLICATION SUMMARY</h1>
      </div>

      <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <p>Application summary page - To be implemented</p>
        </div>
      </div>
    </div>
  );
};

export default ApplicationSummary;
