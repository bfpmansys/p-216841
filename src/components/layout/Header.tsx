import { FC } from "react";
import { Link } from "react-router-dom";

export const Header: FC = () => {
  return (
    <header className="flex justify-between items-center h-[116px] bg-white px-10 py-0 border-2 border-solid border-black max-md:px-5 max-md:py-0 max-sm:h-20 max-sm:px-[15px] max-sm:py-0">
      <div className="flex items-center gap-5">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/28ec74ab6861245638ef0138e32ba7d04a5dc53e"
          alt="V-Fire Logo"
          className="w-[65px] h-[86px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] max-sm:w-[45px] max-sm:h-[60px]"
          loading="lazy"
        />
        <span className="text-2xl font-semibold text-[red] max-sm:text-xl">
          V-FIRE INSPECT
        </span>
      </div>

      <nav className="flex items-center gap-[50px] max-md:gap-[30px] max-sm:hidden">
        <Link
          to="/"
          className="text-2xl font-semibold text-black max-md:text-xl"
        >
          HOME
        </Link>
        <Link
          to="/faqs"
          className="text-2xl font-semibold text-black max-md:text-xl"
        >
          FAQS
        </Link>
        <Link
          to="/about"
          className="text-2xl font-semibold text-black max-md:text-xl"
        >
          ABOUT
        </Link>
        <button className="text-xl font-semibold text-white bg-[#FE623F] px-5 py-2.5 rounded-[15px]">
          LOG IN
        </button>
      </nav>
    </header>
  );
};
