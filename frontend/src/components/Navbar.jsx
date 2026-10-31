import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const links = [
  "Home",
  "About",
  "AI Module",
  "Pricing",
  "Resources",
  "Contact Us",
];

export default function Navbar({
  activePage,
  onNavigate,
  onLoginClick,
  onSignupClick,
}) {
  const [open, setOpen] = useState(false);

  const handleClick = (link) => {
    onNavigate(link);
    setOpen(false);
  };

  return (
    <div className="sticky top-0 z-50 w-full px-1 sm:px-2 pt-0">
      <nav className="w-full bg-white/70 backdrop-blur-xl border border-white/60 rounded-2xl shadow-lg">
        
        {/* ================= MAIN NAVBAR ================= */}
        <div className="w-full flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 h-[65px] sm:h-[70px] lg:h-[75px] max-w-screen-2xl mx-auto gap-4">

          {/* ================= LOGO ================= */}
          <button
            onClick={() => handleClick("Home")}
            className="shrink-0"
          >
            <Logo />
          </button>


          {/* ================= DESKTOP NAVIGATION ================= */}
          <div className="hidden xl:flex items-center gap-7 2xl:gap-8 text-[15px] font-medium tracking-wide">

            {links.map((link) => (
              <button
                key={link}
                onClick={() => handleClick(link)}
                className={`relative whitespace-nowrap transition-colors duration-200 ${
                  activePage === link
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {link}

                {/* ACTIVE UNDERLINE */}
                {activePage === link && (
                  <span className="absolute left-0 right-0 -bottom-1 h-[2px] bg-blue-600 rounded-full" />
                )}
              </button>
            ))}

          </div>


          {/* ================= DESKTOP AUTH BUTTONS ================= */}
          <div className="hidden xl:flex items-center gap-3 shrink-0">

            {/* LOGIN */}
            <button
              onClick={onLoginClick}
              className="text-sm font-medium text-gray-700 border border-gray-300 rounded-lg px-4 py-2 hover:border-[#0A2540] hover:bg-[#0A2540] hover:text-white transition-all duration-200"
            >
              Login
            </button>

            {/* GET STARTED */}
            <button
              onClick={onSignupClick}
              className="text-sm font-semibold text-white bg-[#0A2540] rounded-lg px-5 py-2 hover:bg-[#12395d] transition-all duration-200 shadow-sm"
            >
              Get Started
            </button>

          </div>


          {/* ================= MOBILE MENU BUTTON ================= */}
          <button
            onClick={() => setOpen(!open)}
            className="xl:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
            aria-label="Toggle menu"
          >
            {open ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

        </div>


        {/* ================= MOBILE MENU ================= */}
        <div
          className={`xl:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white/90 rounded-b-2xl ${
            open
              ? "max-h-[500px] opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col px-5 sm:px-6 py-4 gap-2 border-t border-gray-100">

            {/* MOBILE LINKS */}
            {links.map((link) => (
              <button
                key={link}
                onClick={() => handleClick(link)}
                className={`text-sm text-left px-3 py-2.5 rounded-lg transition-all duration-200 ${
                  activePage === link
                    ? "text-blue-600 bg-blue-50 font-semibold"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                {link}
              </button>
            ))}


            {/* MOBILE AUTH BUTTONS */}
            <div className="flex gap-3 mt-3 pt-3 border-t border-gray-100">

              {/* LOGIN */}
              <button
                onClick={() => {
                  onLoginClick();
                  setOpen(false);
                }}
                className="flex-1 text-sm font-medium text-gray-700 border border-[#0A2540] rounded-lg px-4 py-2.5 hover:bg-[#0A2540] hover:text-white transition-all duration-200"
              >
                Login
              </button>


              {/* GET STARTED */}
              <button
                onClick={() => {
                  onSignupClick();
                  setOpen(false);
                }}
                className="flex-1 text-sm font-semibold text-white bg-[#0A2540] rounded-lg px-4 py-2.5 hover:bg-[#12395d] transition-all duration-200"
              >
                Get Started
              </button>

            </div>

          </div>
        </div>

      </nav>
    </div>
  );
}