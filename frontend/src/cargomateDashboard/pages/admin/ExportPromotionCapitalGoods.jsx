import { useState } from "react";
import { LuFileText, LuStar, LuCircleCheck, LuUserRound, LuCalendarDays } from "react-icons/lu";

const benefits = ["Zero Custom Duty", "Export obligation required", "Valid for 6 years"];

export default function ExportPromotionCapitalGoods({ onClose }) {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose();
  };

  if (!open) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="flex items-center gap-3 p-5 sm:p-6 border-b border-gray-200">
          <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 shrink-0">
            <LuFileText size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Export promotion captial goods</h1>
            <p className="text-xs text-gray-400">EPCG-2024</p>
          </div>
        </div>

        <div className="p-5 sm:p-6 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <LuFileText className="text-gray-400" size={16} />
            <p className="text-sm font-semibold text-gray-900">Scheme description</p>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">
            Scheme allow import of capital gods at zero customer duty for pre-production and post production
          </p>
        </div>

        <div className="p-5 sm:p-6 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <LuStar className="text-yellow-400" size={16} />
            <p className="text-sm font-semibold text-gray-900">Key Benefits</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-4 max-w-sm space-y-2">
            {benefits.map((b) => (
              <div key={b} className="flex items-center gap-2 text-sm text-gray-600">
                <LuCircleCheck className="text-green-500" size={16} />
                {b}
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 sm:p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LuUserRound className="text-purple-500" size={16} />
            <p className="text-sm font-semibold text-gray-900">Applicants</p>
          </div>
          <p className="text-sm text-gray-900">245</p>
        </div>

        <div className="p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LuCalendarDays className="text-blue-500" size={16} />
            <p className="text-sm font-semibold text-gray-900">Scheme validity</p>
          </div>
          <p className="text-sm text-gray-900">6 Years</p>
        </div>

        <div className="flex justify-end px-5 sm:px-6 pb-5 sm:pb-6">
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