import { Target, Compass, Rocket } from "lucide-react";
import globeShipImage from "../assets/globe-ship.jpg";

const tabs = [
  { icon: Target, label: "Our Purpose" },
  { icon: Compass, label: "Our Direction" },
  { icon: Rocket, label: "Our Ambition" },
];

export default function WhoWeAre() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 sm:py-16">
      <p className="text-xs font-semibold text-blue-600 uppercase">
        Company Story
      </p>
      <h2 className="mt-1 text-xl sm:text-2xl font-bold text-gray-900">
        Built for a Complex World of Logistics
      </h2>
      <p className="mt-2 text-sm text-gray-500 max-w-2xl">
        ASD CargoMate was built to simplify the complexity of global
        logistics, helping businesses of every size discover better routes,
        compare rates, and ship with confidence using real-time, AI-driven
        intelligence.
      </p>

      <div className="mt-6 rounded-2xl overflow-hidden relative h-48 sm:h-56">
        <img
          src={globeShipImage}
          alt="Global shipping network"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="mt-6 flex items-center gap-4">
        {tabs.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-1.5 text-xs text-gray-500">
            <Icon className="w-4 h-4 text-blue-600" />
            {label}
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <p className="text-sm font-bold text-gray-900">Vision</p>
          <p className="mt-1 text-xs text-gray-500">
            To become the world's most trusted AI-powered logistics
            intelligence platform, connecting businesses and markets
            seamlessly across borders.
          </p>
        </div>
        <div>
          <p className="text-sm font-bold text-gray-900">Mission</p>
          <p className="mt-1 text-xs text-gray-500">
            To simplify global shipping through smart insights, automation,
            and transparent, real-time data for every stakeholder in the
            trade chain.
          </p>
        </div>
      </div>
    </div>
  );
}
