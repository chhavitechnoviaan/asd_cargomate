import { getSession, clearSession } from "../../lib/auth";
import React from "react";
import { useState, useRef, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LuLogOut } from "react-icons/lu";
// import ProfileDropdown from "../components/ProfileDropdown";
import { CgProfile } from "react-icons/cg";
import logo from '../assets/Images/logo.png'
import { RxCross1 } from "react-icons/rx";

const Navbar = ({show, setShow}) => {
    const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const isLoggedIn = !!getSession()?.token;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
 

  const handleLogout = () => {
    clearSession();
    navigate("/login");
    setOpen(false);
    toast.success("Logout successfully ");
  };

  const onDashboard = () => {
    navigate("/admin-dashboard");
    setMobileMenuOpen(false);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Features ", path: "/#" },
    { name: "Pricing", path: "/#" },
    { name: "Resources", path: "/#" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="z-20 shadow-lg  sticky top-0">
      <div className="">
        <nav className="  mx-auto   bg-white/40  transparent  rounded-2xl   backdrop-blur-xl">
          <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 h-[65px] sm:h-[70px] lg:h-[75px] max-w-screen-2xl mx-auto">
            <NavLink to="/" className="flex-shrink-0 text-black duration-200">
              <img
                src={logo}
                className="object-contain w-36 36"
              />
            </NavLink>

            <div className="hidden lg:flex items-center gap-8 text-[16px] font-medium tracking-wide">
              {navItems.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.path}
                  className={({ isActive }) =>
                    `relative inline-block text-black transition-colors duration-200 
                        after:content-[''] after:absolute after:left-0 after:bottom-0 
                        after:h-[2px] after:bg-green-700  after:transition-all after:duration-300 
                        ${
                          isActive
                            ? " text-gray-700"
                            : " hover:text-[0F766E] "
                        }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
            {/* {!isLoggedIn && ( */}
                <NavLink
                  to="/admin-login"
                  className="hidden sm:block px-4 py-2  hover:bg-[#0A2540] hover:text-white border border-[#0A2540]   text-[#0A2540]  rounded-lg cursor-pointer "
                >
                  Login
                </NavLink>
              {/* )} */}

              {/* {!isLoggedIn && ( */}
              <button  
                            onClick={() => navigate('/signup')}
                            className="hidden sm:block px-4 py-2 bg-[#0A2540]  text-white rounded-lg cursor-pointer"
                            >
                            Get Started
                            </button>
                {/* <NavLink
                  to="/signup"
                  className="hidden sm:block px-4 py-2 bg-[#0A2540] hover:bg-blue-700 text-white rounded-lg  cursor-pointer"
                > */}
                 
                {/* </NavLink> */}
              {/* )} */}
              

              {/* <div className="hidden lg:block">
                <div className="flex justify-center gap-3  ">
                  {isLoggedIn && (
                    <>
                      <CgProfile className="w-7 h-7" />
                      <ProfileDropdown handleLogout={handleLogout} />
                    </>
                  )}
                </div>
              </div> */}

              {/* cross and show button  */}
              {!mobileMenuOpen && (
                <button
                  className="lg:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
                  onClick={() => setMobileMenuOpen((prev) => !prev)}
                >
                  <span className="w-5 h-0.5 bg-gray-700 rounded transition-all duration-300" />
                  <span className="w-5 h-0.5 bg-gray-700 rounded transition-all duration-300" />
                  <span className="w-5 h-0.5 bg-gray-700 rounded transition-all duration-300" />
                </button>
              )}

              {mobileMenuOpen && (
                <button onClick={() => setMobileMenuOpen((prev) => !prev)}>
                  <RxCross1 className="text-2xl block lg:hidden" />
                </button>
              )}
            </div>
          </div>

          <div
            className={[
              "lg:hidden overflow-hidden   transition-all duration-300 ease-in-out bg-white rounded-b-2xl",
              mobileMenuOpen
                ? "max-h-[400px] opacity-100"
                : "max-h-0 opacity-0",
            ].join(" ")}
          >
            <div className="flex flex-col px-6 py-4 gap-4 text-[15px] font-medium border-t border-gray-100">
              {navItems.map((item, index) => (
                <button key={index}> 
              <NavLink
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `text-gray-800 transition-all duration-100 ${
                    isActive ? "text-gray-700" : "hover:text-[#0A2540]"
                  }`
                }
              >
               
                {({ isActive }) => ( 
                  <span className={`inline-block  ${isActive ? "border-[#0A2540] duration-100 transform-all" : ""}`}>
                    {item.name}
                  </span>
                )}
              </NavLink></button> ))}              


              <div className="flex flex-col items-start gap-3 mb-1 ">
                <button
                  className="hover:text-white text-[#30A2540] bg-white  hover:bg-[#0A2540] border border-[#0A2540] px-3 py-2  rounded-lg "
                  onClick={onDashboard}
                >
                  Dashboard
                </button>

                {isLoggedIn && (
                  <button
                    className="text-white bg-[#0A2540] px-3 py-2  rounded-lg "
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>

            <div className="flex    flex-col items-start ml-6  mb-1 gap-3 pb-5">
              {!isLoggedIn && (
                <NavLink
                  onClick={() => {
                    setMobileMenuOpen((prev) => !prev);
                  }}
                  to="/signup"
                  className="sm:hidden w-40 text-center block  px-4 py-2 bg-[#0A2540] hover:bg-[#0A2540] text-white rounded-lg  cursor-pointer"
                >
                  Get Started
                </NavLink>
              )}
              {/* {!isLoggedIn && (
                <NavLink
                  onClick={() => {
                    setMobileMenuOpen((prev) => !prev);
                  }}
                  to="/admin-login"
                  className="sm:hidden w-40 px-4 py-2  hover:bg-[#0A2540] hover:text-white border border-[#0A2540]   text-[#0A2540]  rounded-lg cursor-pointer "
                >
                  Login
                </NavLink>
              )} */}

             
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
