import { Link } from "react-router-dom";

interface SidebarItemProps {
  src: string;
  alt: string;
  to: string;
  className?: string;
}

const SidebarItem = ({ src, alt, to, className }: SidebarItemProps) => (
  <Link to={to} className="flex justify-center w-full">
    <img
      src={src}
      alt={alt}
      className={`aspect-[1] object-contain w-[26px] hover:scale-110 transition-transform duration-200 ${className || ""}`}
    />
  </Link>
);

export const InsSidebar = () => {
  const sidebarItems = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/605c382ffc624f65b1b13358f5877fd8/bb52de9905fd7e0ca64c7027c4f83980d49d43e059815c1e2ff38c5eef7dd031?placeholderIfAbsent=true",
      alt: "Dashboard Icon",
      to: "/inspector-dashboard",
      className: "w-[26px]"
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/605c382ffc624f65b1b13358f5877fd8/8c01c470db67db006f47581c575924ffcc9bd3959c2f2deaac3c2daacbef6094?placeholderIfAbsent=true",
      alt: "Establishments Icon",
      to: "/establishments",
      className: "w-[26px] mt-[29px]"
    },
    {
      src: "./images/icons/calendarIcon.png",
      alt: "Calendar Icon",
      to: "/ins-calendar",
      className: "w-[26px] mt-[29px]"
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/605c382ffc624f65b1b13358f5877fd8/de3c21b63fab617fb8dcf8f56fa14a5e18f4288575386306ca7ffeb24d1b6d02?placeholderIfAbsent=true",
      alt: "Calendar Icon",
      to: "/calendar",
      className: "w-[25px] mt-10"
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/605c382ffc624f65b1b13358f5877fd8/526b5c58b7cc17424b8873b28d161f76db6e1d5aa8a8f932ff3e43ad6512ab7b?placeholderIfAbsent=true",
      alt: "Messages Icon",
      to: "/messages",
      className: "w-[23px] mt-[47px] max-md:mt-10"
    }
  ];
  
  const activeItem = sidebarItems[0]; // Default active item is Dashboard
  
  return (
    <aside className="bg-white shadow-[5px_4px_4px_rgba(0,0,0,0.25)] flex flex-col items-center pt-[140px] pb-9 max-md:hidden max-md:pt-[100px] w-[80px]">
      <div className="bg-[rgba(255,236,219,1)] self-stretch flex flex-col items-center justify-center px-[21px] py-[22px] max-md:px-5">
        <SidebarItem 
          src={activeItem.src}
          alt={activeItem.alt}
          to={activeItem.to}
        />
      </div>
      
      <div className="flex flex-col items-center w-full flex-1 justify-between">
        <div className="flex flex-col items-center w-full">
          {sidebarItems.slice(1, 5).map((item, index) => (
            <SidebarItem 
              key={index}
              src={item.src}
              alt={item.alt}
              to={item.to}
              className={item.className}
            />
          ))}
        </div>
        
        <div className="flex flex-col items-center w-full">
          {sidebarItems.slice(5).map((item, index) => (
            <SidebarItem 
              key={index}
              src={item.src}
              alt={item.alt}
              to={item.to}
              className={item.className}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};
