import { useState } from "react";
import { FiX, FiBell, FiMail, FiRefreshCw, FiTrendingUp } from "react-icons/fi";

const types = [
  { label: "Alerts", icon: FiBell, color: "text-red-500" },
  { label: "Messages", icon: FiMail, color: "text-blue-500" },
  { label: "Updates", icon: FiRefreshCw, color: "text-green-500" },
  { label: "Notifications", icon: FiBell, color: "text-purple-500" },
  { label: "Activities", icon: FiTrendingUp, color: "text-orange-500" },
];

export default function AllTypesModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-xs bg-white rounded-2xl shadow-2xl mt-4 sm:mt-10 p-5">
        <div className="flex items-start justify-between">
          <h2 className="text-2xl font-extrabold text-gray-900">All Types</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <FiX size={20} />
          </button>
        </div>

        <div className="mt-5 space-y-5">
          {types.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.label}
                type="button"
                className="w-full flex items-center gap-3 text-left"
              >
                <Icon size={20} className={t.color} />
                <span className="text-base font-semibold text-gray-900">{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

