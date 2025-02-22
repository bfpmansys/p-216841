
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, LogOut, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";

export const DashboardNavbar: FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <img
          src="/lovable-uploads/29214100-233c-41db-bd47-373ba4fa4cb3.png"
          alt="V-Fire Logo"
          className="h-8"
        />
        <span className="text-xl font-bold text-[#FF0000]">V-FIRE INSPECT</span>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
          <User className="w-5 h-5 text-gray-600" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => navigate("/dashboard/profile")}>
            <Settings className="w-4 h-4 mr-2" />
            Edit Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout} disabled={isLoading}>
            <LogOut className="w-4 h-4 mr-2" />
            {isLoading ? "Logging out..." : "Logout"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};
