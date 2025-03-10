import React from "react";

interface UserInfo {
  name: string;
  userId: string;
  establishmentCount: number;
  lastLogin: string;
}

interface WelcomeSectionProps {
  userInfo: UserInfo;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({ userInfo }) => {
  return (
    <section className="flex justify-between bg-[#ffecdb] p-10 max-md:flex-col max-md:gap-5 max-sm:p-5">
      <div className="max-w-[467px]">
        <h2 className="text-2xl font-bold mb-5">GOOD DAY!</h2>
        <p className="text-[17px]">
          We're thrilled to present our improved Establishment Portal designed
          with ease. Experience a seamless journey as you access your
          establishment information, inspection schedules and compliance updates
          all at your fingertips
        </p>
      </div>
      <div className="max-w-[454px] max-md:mt-5">
        <h3 className="text-2xl font-bold mb-5">{userInfo.name}</h3>
        <div className="text-xl">
          <div>
            <span>User ID Number: </span>
            <span className="font-bold">{userInfo.userId}</span>
          </div>
          <div>No. of Establishment : {userInfo.establishmentCount}</div>
          <div>
            <span>Last Log In: </span>
            <span className="font-bold">{userInfo.lastLogin}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
