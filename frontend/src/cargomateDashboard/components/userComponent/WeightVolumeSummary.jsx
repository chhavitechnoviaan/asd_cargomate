import { useState } from "react";

export default function WeightVolumeSummaryModal({ onClose }) {
  const rows = [
    { label: "Gross Weight", value: "520 Kg" },
    { label: "Net Weight", value: "500 Kg" },
    { label: "Total Volume", value: "3.2 CBM" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-6">
      <div className="w-full max-w-xs bg-white rounded-2xl shadow-2xl p-5">
        <div className="space-y-2.5">
          {rows.map((r) => (
            <div key={r.label} className="flex items-center justify-between">
              <span className="text-sm text-gray-700">{r.label}</span>
              <span className="text-sm font-semibold text-gray-900">{r.value}</span>
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-700 mt-4">Remarks</p>
        <p className="text-sm text-gray-400 mt-1">Handle with care...</p>

        <button
          onClick={onClose}
          className="w-full mt-5 bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold py-2.5 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
}

