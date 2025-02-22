
import { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Building2, FileText, Buildings, Store } from "lucide-react";
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
      title: "New Business Permit",
      description: "Apply for a new business permit for your establishment",
      icon: Building2,
      type: "new_business",
    },
    {
      title: "Annual Business Permit",
      description: "Renew your existing business permit",
      icon: FileText,
      type: "annual",
    },
    {
      title: "Occupancy Permit",
      description: "Get an occupancy permit for your establishment",
      icon: Buildings,
      type: "occupancy",
    },
    {
      title: "Special Permit",
      description: "Apply for special permits and certifications",
      icon: Store,
      type: "special",
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
