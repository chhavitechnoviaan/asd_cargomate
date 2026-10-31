import { useState } from "react";
import { FiX } from "react-icons/fi";

const statuses = [
  { label: "Overdue", color: "bg-red-500" },
  { label: "Due Soon", color: "bg-orange-400" },
  { label: "Paid", color: "bg-green-500" },
  { label: "Completed", color: "bg-blue-500" },
  { label: "Pending", color: "bg-pink-500" },
  { label: "Cancelled", color: "bg-gray-400" },
];

export default function AllStatusModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-xs bg-white rounded-2xl shadow-2xl mt-4 sm:mt-10 p-5">
        <div className="flex items-start justify-between">
          <h2 className="text-2xl font-extrabold text-gray-900">All Status</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <FiX size={20} />
          </button>
        </div>

        <div className="mt-5 space-y-5">
          {statuses.map((s) => (
            <button
              key={s.label}
              type="button"
              className="w-full flex items-center gap-3 text-left"
            >
              <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${s.color}`} />
              <span className="text-base font-semibold text-gray-900">{s.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

