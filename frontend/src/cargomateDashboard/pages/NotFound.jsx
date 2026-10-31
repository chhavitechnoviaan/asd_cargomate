import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiHome, FiSearch } from "react-icons/fi";
import { FaPlane } from "react-icons/fa";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gray-50  flex items-center justify-center px-4 overflow-hidden">
     

      <div className="nf-pulse absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#0A2540]/10" />
      <div className="nf-pulse absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-[#0A2540]/5" style={{ animationDelay: "1.5s" }} />

      <div className="relative bg-white border border-gray-200 rounded-2xl shadow-sm w-full max-w-lg p-6 sm:p-10 text-center">
        {/* <div className="nf-rise relative h-10 mb-2 flex items-center justify-center">
          <FaPlane className="nf-fly text-[#0A2540]" size={26} />
        </div> */}

        <h1 className="nf-rise nf-float text-7xl sm:text-8xl font-extrabold text-[#0A2540] leading-none" style={{ animationDelay: ".1s" }}>
          404
        </h1>

        <h2 className="nf-rise text-xl sm:text-2xl font-bold text-gray-900 mt-4" style={{ animationDelay: ".2s" }}>
          Shipment Not Found
        </h2>
        <p className="nf-rise text-sm text-gray-500 mt-2" style={{ animationDelay: ".3s" }}>
          Looks like this page took a wrong route. The page you are looking for does not exist or has been moved.
        </p>

        <div className="nf-rise flex flex-col sm:flex-row gap-3 mt-7 justify-center" style={{ animationDelay: ".4s" }}>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-1.5 border border-gray-200 bg-white text-gray-700 text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-gray-50"
          >
            <FiArrowLeft size={14} /> Go Back
          </button>
          <Link
            to="/"
            className="flex items-center justify-center gap-1.5 bg-[#0A2540] hover:bg-[#0A2540]/90 text-white text-sm font-medium px-5 py-2.5 rounded-lg"
          >
            <FiHome size={14} /> Back to Home
          </Link>
        </div>

        <p className="nf-rise flex items-center justify-center gap-1.5 text-xs text-gray-400 mt-6" style={{ animationDelay: ".5s" }}>
          <FiSearch size={12} /> Check the URL or use the sidebar to find what you need.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
