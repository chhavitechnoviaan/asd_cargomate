import { useState } from "react";
import { LuFileText, LuInfo, LuMapPin, LuStar, LuTruck, LuMail, LuPhone, LuGlobe } from "react-icons/lu";

const details = [
  { label: "Type", icon: LuInfo, iconColor: "text-blue-500", value: "Shipping Partner", valueColor: "text-blue-600" },
  { label: "Location", icon: LuMapPin, iconColor: "text-red-500", value: "US", valueColor: "text-gray-700" },
  { label: "Rating", icon: LuStar, iconColor: "text-yellow-400", value: "4.8/5 (128 reviews)", valueColor: "text-gray-700" },
  { label: "Active Shipment", icon: LuTruck, iconColor: "text-pink-400", value: "32", valueColor: "text-gray-700" },
  { label: "Email", icon: LuMail, iconColor: "text-orange-400", value: "contact@globallog.com", valueColor: "text-blue-500 underline" },
  { label: "Phone", icon: LuPhone, iconColor: "text-gray-500", value: "1234567890", valueColor: "text-gray-700" },
  { label: "Website", icon: LuGlobe, iconColor: "text-green-500", value: "1234567890", valueColor: "text-gray-700" },
];

export default function GlobalLogicInc({ onClose }) {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose();
  };

  if (!open) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 shrink-0">
              <LuFileText size={20} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Global Logistic Inc.</h1>
              <p className="text-xs text-blue-500 underline">contact@globallog.com</p>
            </div>
          </div>
          <span className="text-sm font-medium text-green-600">Active</span>
        </div>

        <div>
          {details.map((d) => {
            const Icon = d.icon;
            return (
              <div key={d.label} className="flex items-center justify-between px-5 sm:px-6 py-3 border-b border-gray-100 text-sm">
                <div className="flex items-center gap-2 text-gray-500">
                  <Icon className={d.iconColor} size={16} />
                  {d.label}
                </div>
                <span className={d.valueColor}>{d.value}</span>
              </div>
            );
          })}
        </div>

        <div className="flex justify-end px-5 sm:px-6 py-5">
          <button
            onClick={handleClose}
            className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

