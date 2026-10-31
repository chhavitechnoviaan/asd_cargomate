import { useState } from "react";
import { FiX, FiSave, FiFileText, FiShare2, FiCopy, FiChevronDown } from "react-icons/fi";

const menuItems = [
  { label: "Save Draft", icon: FiSave },
  { label: "Save & Download PDF", icon: FiFileText },
  { label: "Share Plan", icon: FiShare2 },
  { label: "Duplicate Plan", icon: FiCopy },
];



export default function SavePlanModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-xs bg-white rounded-2xl shadow-2xl mt-4 sm:mt-10 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <h2 className="text-lg font-bold text-gray-900">Save Plan</h2>
            <FiChevronDown size={16} className="text-gray-900" />
          </div>
          <button onClick={onClose} className="text-gray-900 hover:text-gray-600">
            <FiX size={22} />
          </button>
        </div>

        <div className="mt-5 space-y-4">
          {menuItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                type="button"
                className={`w-full flex items-center gap-3 text-left ${i === 2 ? "mt-2" : ""}`}
              >
                <Icon size={18} className="text-gray-700 shrink-0" />
                <span className="text-base font-semibold text-gray-900">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

