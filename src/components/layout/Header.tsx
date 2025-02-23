
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
    <header className="flex justify-between items-center h-20 bg-white px-8 border-b border-gray-300 shadow-sm max-md:px-5 max-md:py-0 max-sm:h-20 max-sm:px-[15px] max-sm:py-0">
      <Link to="/" className="flex items-center gap-1">
        <img src="/images/logo.png" alt="Logo" className="h-12" />
        <span className="text-2xl font-bold text-red-600 max-sm:text-base max-sm:hidden">V-FIRE</span>
        <span className="text-1xl font-bold text-black max-sm:text-base max-sm:hidden">INSPECT</span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-[50px] max-md:gap-[30px]">
        <button
          onClick={() => scrollToSection("home")}
          className="text-1xl font-semibold text-black max-md:text-xl"
        >
          HOME
        </button>
        <button
          onClick={() => scrollToSection("faqs")}
          className="text-1xl font-semibold text-black max-md:text-xl"
        >
          FAQS
        </button>
        <button
          onClick={() => scrollToSection("about")}
          className="text-1xl font-semibold text-black max-md:text-xl"
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
              className="text-1xl font-semibold text-black"
            >
              HOME
            </button>
            <button
              onClick={() => scrollToSection("faqs")}
              className="text-1xl font-semibold text-black"
            >
              FAQS
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-1xl font-semibold text-black"
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
