
import { FC, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";

export const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isLoginPage = location.pathname === "/login" || location.pathname === "/register";

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="flex justify-between items-center h-[116px] bg-white px-10 py-0 border-2 border-solid border-black max-md:px-5 max-md:py-0 max-sm:h-20 max-sm:px-[15px] max-sm:py-0">
      <Link to="/" className="flex items-center gap-5">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/28ec74ab6861245638ef0138e32ba7d04a5dc53e"
          alt="V-Fire Logo"
          className="w-[65px] h-[86px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] max-sm:w-[45px] max-sm:h-[60px]"
          loading="lazy"
        />
        <span className="text-2xl font-semibold text-[red] max-sm:hidden">
          V-FIRE INSPECT
        </span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-[50px] max-md:gap-[30px]">
        <button
          onClick={() => scrollToSection("home")}
          className="text-2xl font-semibold text-black max-md:text-xl"
        >
          HOME
        </button>
        <button
          onClick={() => scrollToSection("faqs")}
          className="text-2xl font-semibold text-black max-md:text-xl"
        >
          FAQS
        </button>
        <button
          onClick={() => scrollToSection("about")}
          className="text-2xl font-semibold text-black max-md:text-xl"
        >
          ABOUT
        </button>
        {!isLoginPage && (
          <Link
            to="/login"
            className="text-xl font-semibold text-white bg-[#FE623F] px-5 py-2.5 rounded-[15px]"
          >
            LOG IN
          </Link>
        )}
      </nav>

      {/* Mobile Navigation Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden"
        aria-label="Toggle menu"
      >
        <Menu size={24} />
      </button>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-[80px] bg-white z-50 md:hidden">
          <nav className="flex flex-col items-center gap-8 pt-8">
            <button
              onClick={() => scrollToSection("home")}
              className="text-2xl font-semibold text-black"
            >
              HOME
            </button>
            <button
              onClick={() => scrollToSection("faqs")}
              className="text-2xl font-semibold text-black"
            >
              FAQS
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-2xl font-semibold text-black"
            >
              ABOUT
            </button>
            {!isLoginPage && (
              <Link
                to="/login"
                className="text-xl font-semibold text-white bg-[#FE623F] px-5 py-2.5 rounded-[15px]"
                onClick={() => setIsMenuOpen(false)}
              >
                LOG IN
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};
