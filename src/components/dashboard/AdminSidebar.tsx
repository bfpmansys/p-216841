
import React from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/650ba195e9eb752a28edadd1d548ef0d00eaf505",
    alt: "Dashboard",
    path: "/admin-dashboard",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/6210b29240e3d51c3247dc2c375c181b24943751",
    alt: "Reports",
    path: "/admin-users",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/7dc62d2588273c7462ee81fa75cbec9a385b0ebb",
    alt: "Inspections",
    path: "/admin-establishments",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/1af91563ab3e10d65c8f428f1763ea795224aeea",
    alt: "Establishments",
    path: "/admin-applications",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/ecff8cb331df371386bf302825fa0b4bee39f31a",
    alt: "Nav Item",
    path: "/admin-calendar",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/fa3d9fa010659ecae92dba82e652fe6f905c82de",
    alt: "Nav Item",
    path: "/admin-messages",
  },
];

export const AdminSidebar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="w-[106px] shadow-[5px_4px_4px_rgba(0,0,0,0.25)] h-[calc(100vh_-_116px)] fixed bg-white left-0 max-sm:hidden">
      {navItems.map((item, index) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={index}
            to={item.path}
            className={`h-[69px] flex items-center justify-center transition-colors ${
              isActive ? "bg-orange-100" : "hover:bg-gray-100"
            }`}
            aria-label={item.alt}
          >
            <img src={item.icon} className="w-[26px] h-[26px]" alt={item.alt} />
          </Link>
        );
      })}
    </nav>
  );
};