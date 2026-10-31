import React from "react";
import { CalendarDays, X } from "lucide-react";

const dateOptions = [
  "Today",
  "Yesterday",
  "This Week",
  "Last Week",
  "This Quarter",
  "Last Quarter",
  "This Year",
  "Last Year",
  "Custom Range",
];

export default function DateRangeModal({
  isOpen,
  onClose,
  onSelect,
}) {
//   if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[20] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="
          relative
          w-full
          max-w-[325px]
          sm:max-w-[360px]
          bg-white
          rounded-2xl
          shadow-2xl
          border border-slate-100
          overflow-hidden
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 pt-5 pb-3">
          <div className="flex items-center gap-2.5">
            <CalendarDays
              size={19}
              className="text-blue-600"
            />

            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900">
                Select Date Range
              </h2>

              <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5">
                Choose a date range
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              p-1.5
              rounded-lg
              text-slate-500
              hover:bg-slate-100
              hover:text-slate-900
              transition
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* Options */}
        <div className="px-3 sm:px-4 pb-4">
          {dateOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onSelect(option)}
              className="
                w-full
                text-left
                px-3
                sm:px-4
                py-2.5
                sm:py-3
                rounded-lg
                text-sm
                sm:text-[15px]
                font-semibold
                text-slate-800
                hover:bg-slate-50
                hover:text-blue-600
                active:bg-slate-100
                transition
              "
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}