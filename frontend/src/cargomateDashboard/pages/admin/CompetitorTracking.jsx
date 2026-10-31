import { useState } from "react";
import { LuRadar, LuUsers, LuClock, LuTrendingUp, LuCalendarClock } from "react-icons/lu";

export default function CompetitorTracking() {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 flex items-center justify-center">
      <div className="w-full max-w-sm bg-white rounded-2xl border border-gray-200 p-5 sm:p-6">
        <div className="flex items-start gap-3 mb-5">
          <div className="w-11 h-11 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 shrink-0">
            <LuRadar size={20} />
          </div>
          <div>
            <h1 className="text-base font-bold text-gray-900">Competitor Tracking</h1>
            <p className="text-xs text-gray-500">Track competitors and monitor their shipment activites.</p>
          </div>
        </div>

        <div className="space-y-3 mb-5">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <LuUsers className="text-gray-400" size={16} /> Track competitors
            </div>
            <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-pink-100 text-pink-600">12</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <LuClock className="text-gray-400" size={16} /> Recent activites
            </div>
            <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-red-100 text-red-500">8 Updates</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <LuTrendingUp className="text-gray-400" size={16} /> Market Moment
            </div>
            <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-green-100 text-green-600">Increasing</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <LuCalendarClock className="text-gray-400" size={16} /> Last updated
            </div>
            <span className="text-gray-900 font-medium">20 May 2025</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="flex-1 px-4 py-2 rounded-lg bg-blue-500 text-white text-sm font-medium">
            View Results
          </button>
          <button
            onClick={() => setOpen(false)}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}