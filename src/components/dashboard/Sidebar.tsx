import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Home, PieChart, TrendingUp, Building, Bell, Settings, LogOut } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


export const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { icon: Home, path: "/", label: "Dashboard" },
    { icon: PieChart, path: "/inspections", label: "Inspections" },
    { icon: TrendingUp, path: "/reports", label: "Reports" },
    { icon: Building, path: "/establishments", label: "Establishments" },
    { icon: Bell, path: "/notifications", label: "Notifications" },
    { icon: Settings, path: "/settings", label: "Settings" },
    { icon: LogOut, path: "/logout", label: "Logout" },
  ];

  // Mobile hamburger menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  

  return (
    <>
      {/* Mobile hamburger menu button - only visible on mobile */}
      <button 
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md md:hidden" 
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        <Menu size={24} />
      </button>

      {/* Main sidebar - hidden on mobile unless menu is open */}
      <nav className={`bg-[#1A1F2C] text-white h-screen flex flex-col w-[70px] items-center py-8 md:block ${isMobileMenuOpen ? 'fixed inset-y-0 left-0 z-40' : 'hidden'} md:fixed md:inset-y-0 md:left-0 md:z-40 md:flex`}>
        <TooltipProvider>
          <div className="flex flex-col items-center space-y-8">
            {menuItems.map((item, index) => (
              <div key={index} className="relative group w-full">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link 
                      to={item.path} 
                      className="flex items-center justify-center h-12 w-full relative group hover:bg-[#F2FCE2]/10 transition-colors"
                      aria-label={item.label}
                    >
                      <item.icon size={24} strokeWidth={1.5} className="text-[#8E9196] group-hover:text-white transition-colors" />
                      
                      {/* Hover overlay that shows the text label */}
                      <div className="absolute left-full ml-2 bg-[#1A1F2C] text-white text-sm rounded py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block">
                        {item.label}
                      </div>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="bg-[#1A1F2C] text-white border-none">
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              </div>
            ))}
          </div>
        </TooltipProvider>
      </nav>
    </>
  );
  
};
