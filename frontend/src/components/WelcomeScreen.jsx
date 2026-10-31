import { User, Building2, ArrowRight } from "lucide-react";
import Logo from "./Logo";
import heroImage from "../assets/hero.png";

export default function WelcomeScreen({ onSelectUser, onSelectB2B }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="relative w-full h-56 sm:h-64 md:h-80 lg:h-96 overflow-hidden">
        <img
          src={heroImage}
          alt="Cargo logistics"
          className="absolute inset-0 w-full h-full object-cover object-[75%_38%]"
        />
        <div className="relative h-full max-w-7xl mx-auto flex flex-col items-start justify-center gap-2 sm:gap-3 md:gap-4 px-4 sm:px-6 lg:px-10">
          <Logo />
          <div className="max-w-[65%] sm:max-w-sm md:max-w-md">
            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold leading-tight sm:leading-snug">
              <span className="text-gray-900">Welcome to</span>
              <br />
              <span className="text-gray-900">ASD </span>
              <span className="text-blue-600">CARGOMATE</span>
            </h1>
            <p className="mt-1 sm:mt-2 text-xs sm:text-sm md:text-base text-gray-700">
              Smart solutions for seamless cargo management and global
              trade.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center px-4 py-8">
        <div className="w-full max-w-sm sm:max-w-md bg-white rounded-2xl shadow-md p-5 sm:p-6">
          <p className="mb-3 text-sm font-semibold text-gray-900">
            Select how you want to continue
          </p>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">User</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    For shippers, manage bookings and access shipment
                    services
                  </p>
                </div>
              </div>
              <button
                onClick={onSelectUser}
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg py-2.5 flex items-center justify-center gap-2"
              >
                Continue as User
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">B2B</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Manage your business, bulk operations, freight and
                    trade wholesale
                  </p>
                </div>
              </div>
              <button
                onClick={onSelectB2B}
                className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg py-2.5 flex items-center justify-center gap-2"
              >
                Continue as B2B
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
