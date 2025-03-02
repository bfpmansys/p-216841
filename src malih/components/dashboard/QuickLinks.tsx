import React from "react";
import { useNavigate } from "react-router-dom";



interface QuickLinkItemProps {
  icon: string;
  title: string;
  path: string;
}

const QuickLinkItem: React.FC<QuickLinkItemProps> = ({ icon, title, path }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="flex items-center gap-[17px] mb-[23px] max-sm:mb-[15px] cursor-pointer"
      onClick={() => navigate(path)}
    >
      <div className="bg-[#fe623f] w-[75px] h-[75px] flex items-center justify-center rounded-[20px] max-sm:w-[60px] max-sm:h-[60px]">
        <img
          src={icon}
          alt={title}
          className="w-10 h-10 max-sm:w-[30px] max-sm:h-[30px]"
        />
      </div>
      <div className="text-xl font-semibold max-sm:text-lg">{title}</div>
    </div>
  );
};

export const QuickLinks = () => {
  return (
    <section className="mr-16">
      <h2 className="text-xl font-bold mb-8">QUICK LINKS</h2>
      <div className="flex flex-col gap-6">
        {/* <QuickLinkItem
          icon="images/icons/applicationIcon.png"
          title="APPLICATION"
          path="/establishments"
        /> */}
        <QuickLinkItem 
          icon="images/icons/establishmentIcon.png"
          title="ESTABLISHMENT"
          path="/establishments"
        />
        <QuickLinkItem 
          icon="images/icons/inboxIcon.png"
          title="INBOX"
          path="/inbox"
        />
      </div>
    </section>
  );
};
