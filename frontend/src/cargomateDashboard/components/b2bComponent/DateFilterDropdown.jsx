import { useEffect } from "react";

const ranges = ["This Week", "This Month", "Last Month", "This Quarter", "This Year"];

export default function DateFilterDropdown({ onSelect = () => {}, onClose = () => {} }) {
  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  return (
    <div className="absolute right-0 top-full z-50 mt-2 w-44 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
      {ranges.map((range) => (
        <button
          type="button"
          key={range}
          onClick={() => { onSelect(range); onClose(); }}
          className="block w-full rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-700"
        >
          {range}
        </button>
      ))}
    </div>
  );
}
