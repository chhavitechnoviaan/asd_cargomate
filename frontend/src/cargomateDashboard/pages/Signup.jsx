import { FiChevronRight } from "react-icons/fi";
import { TbBuildingStore, TbUserCircle } from "react-icons/tb";
import { BsPerson } from "react-icons/bs";
import ship from "../assets/Images/ship.png";
import logo from "../assets/Images/logo.png";
import { useState } from "react";
import UserAuth from "../Auth/UserAuth";
import B2BAuth from "../Auth/B2BAuth";
import { useNavigate } from "react-router-dom";




const loginOptions = [
  {
    icon: TbBuildingStore,
    title: "B2b login/signup",
    desc: "Manage your business account.",
      path: '/b2b-auth'
    // path
  },
  {
    icon: TbUserCircle,
    title: "User login/signup",
    desc: "Access your account.",
     path: '/user-auth'
  },
];

export default function Signup() {
  const [open, setOpen] = useState("");
  const navigate = useNavigate();

  // console.log('oepn', open )
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 md:p-10">
      <div className="w-full max-w-3xl border p-2  bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* LEFT IMAGE */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-4 sm:p-0 mt-10 sm:mt-0">
          <div className="h-full sm:h-96 w-full max-w-sm rounded-lg  flex items-center justify-center bg-white p-4">
            <img
              src={ship}
              className="rotate-90 max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-full md:w-1/2 flex flex-col justify-center  py-8">
          {/* LOGO */}
          <div className="flex items-center gap-2 mb-8 justify-center mt-4 sm:mt-0">
            <img src={logo} className="object-contain w-36  " />
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col gap-4">
            {loginOptions.map(({ icon: Icon, title, desc,  path }) => (
              <button
                key={title} 
                onClick={() => {navigate(path)}}
                className="flex items-center gap-4 w-full border border-gray-200 hover:border-teal-400 hover:bg-teal-50 rounded-2xl px-4 py-4 transition-all group"
              >
                <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-teal-100">
                  <Icon size={20} className="text-teal-600" />
                </div>

                <div className="flex-1 text-left">
                  <p className="text-sm sm:text-base font-semibold text-gray-900">
                    {title}
                  </p>
                  <p className="text-xs text-gray-400">{desc}</p>
                </div>

                <FiChevronRight className="text-gray-400 group-hover:text-teal-500" />
              </button>
            ))}
          </div>

          {/* {open === "User login/signup" && <UserAuth />}

          {open === "B2b login/signup" && <B2BAuth /> } */}


        </div>
      </div>
    </div>
  );
}
