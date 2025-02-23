import React from "react";

interface QuickLinkItemProps {
  icon: string;
  title: string;
}

const QuickLinkItem: React.FC<QuickLinkItemProps> = ({ icon, title }) => (
  <div className="flex items-center gap-[17px] mb-[23px] max-sm:mb-[15px]">
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

export const QuickLinks = () => {
  const links = [
    {
      icon: "./images/icons/applicationIcon.png",
      title: "APPLICATION",
    },
    {
      icon: "./images/icons/establishmentIcon.png",
      title: "ESTABLISHMENT",
    },
    {
      icon: "./images/icons/inboxIcon.png",
      title: "INBOX",
    },
  ];

  return (
    <div className="w-3/12 max-md:w-full max-md:mb-10">
      <h2 className="text-xl font-bold mb-[23px]">QUICK LINKS</h2>
      {links.map((link, index) => (
        <QuickLinkItem key={index} {...link} />
      ))}
    </div>
  );
};