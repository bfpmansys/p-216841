
import { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Home, Building2, FileText, Building, Store } from "lucide-react";
import { useNavigate } from "react-router-dom";
interface ApplicationTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApplicationTypeModal: FC<ApplicationTypeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();

  const applicationTypes = [
    {
      title: "Fire Safety Inspection Certificate (FSIC For Occupancy Permit)",
      description: "Apply for Occupancy Permit",
      icon: Home,
      type: "occupancy",
    },
    {
      title: "Fire Safety Inspection Certificate (FSIC For Business Permit)",
      description: "Apply for Business Certificate",
      icon: Building2,
      type: "business",
    },
    {
      title: "Fire Safety Evaluation Clearance (FSEC)",
      description: "Apply for Evaluation",
      icon: FileText,
      type: "clearance",
    },
    {
      title: "OTHERS",
      description: "Apply for Other Certificates",
      icon: FileText,
      type: "others",
    },
  ];

  const handleSelectType = (type: string) => {
    navigate(`/dashboard/apply/${type}`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-4">
            Select Application Type
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          {applicationTypes.map((type) => (
            <button
              key={type.type}
              onClick={() => handleSelectType(type.type)}
              className="flex flex-col items-center p-6 bg-[#FFF5F2] rounded-lg hover:bg-[#FFE5E0] transition-colors text-center group"
            >
              <type.icon
                size={40}
                className="text-[#FF6347] mb-4 group-hover:scale-110 transition-transform"
              />
              <h3 className="font-semibold text-lg mb-2">{type.title}</h3>
              <p className="text-sm text-gray-600">{type.description}</p>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
