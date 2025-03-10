import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, LogOut, Settings, Menu, X } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";

export const AdminHeader: FC = () => {
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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

    return (
      <div className="bg-white w-full pt-4 pb-3 md:pt-[19px] md:pb-[11px] px-5 md:px-[61px] border-2 border-solid border-[rgba(128,128,128,0.5)] max-sm:px-5 max-sm:py-0">
        {/* Everything aligned to the right */}
      <div className="flex items-center gap-6">
        {/* Mobile Menu Toggle Button */}
        <button className="hidden max-sm:block" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo and Company Name - Now on the right */}
        <div 
          onClick={() => navigate("/")} 
          className="flex items-center gap-1 cursor-pointer"
        >
          <img src="/images/logo.png" alt="Logo" className="h-12" />
          <span className="text-2xl font-bold text-red-600 max-sm:text-base max-sm:hidden">V-FIRE</span>
          <span className="text-1xl font-bold text-black max-sm:text-base max-sm:hidden">INSPECT</span>
        </div>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition">
            <User className="w-5 h-5 text-gray-600" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 mt-2 shadow-lg">
            <DropdownMenuItem onClick={() => navigate("/dashboard/profile")}>
              <Settings className="w-4 h-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout} disabled={isLoading}>
              <LogOut className="w-4 h-4 mr-2" />
              {isLoading ? "Logging out..." : "Logout"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Mobile Menu - When Open */}
      {isMenuOpen && (
        <div className="fixed top-[116px] left-0 right-0 bg-white shadow-md z-20 py-4 sm:hidden">
          <nav className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-3">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/650ba195e9eb752a28edadd1d548ef0d00eaf505"
                className="w-[23px] h-[23px]"
                alt="Dashboard"
              />
              <span>Dashboard</span>
            </div>
            <div className="flex items-center gap-3">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/fa3d9fa010659ecae92dba82e652fe6f905c82de"
                className="w-[23px] h-[23px]"
                alt="Menu"
              />
              <span>Menu</span>
            </div>
            <div className="flex items-center gap-3">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d541fde572a992b87cbb8bbb265156b65149af88"
                className="w-[23px] h-[23px]"
                alt="Settings"
              />
              <span>Settings</span>
            </div>
            <div className="flex items-center gap-3">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/a2f69d7c6e9409aedfb8ae435e8d7534032d5883"
                className="w-[23px] h-[23px]"
                alt="Profile"
              />
              <span>Profile</span>
            </div>
          </nav>
        </div>
      )}
      </div>
    );
  };