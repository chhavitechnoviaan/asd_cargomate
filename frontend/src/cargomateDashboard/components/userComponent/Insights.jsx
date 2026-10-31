import { useState } from "react";
import {
  FiX,
  FiFileText,
  FiCalendar,
  FiCheckSquare,
  FiArrowUp,
  FiBarChart2,
  FiInfo,
  FiDownload,
} from "react-icons/fi";

const modeDistribution = [
  { label: "Sea Freight", value: 74, pct: "47.4%", count: "(73)", color: "bg-teal-500" },
  { label: "Air Freight", value: 62, pct: "28.6%", count: "(44)", color: "bg-blue-500" },
  { label: "Road Freight", value: 16, pct: "16.2%", count: "(25)", color: "bg-orange-400" },
  { label: "Rail Freight", value: 16, pct: "7.8%", count: "(12)", color: "bg-purple-500" },
];

const delayReasons = [
  { label: "Custom Clearance", value: 4, pct: "(40%)" },
  { label: "Documentation", value: 3, pct: "(30%)" },
  { label: "Weather Condition", value: 2, pct: "(20%)" },
  { label: "Miscellaneous", value: 1, pct: "(10%)" },
];


export default function  InsightsModal({ onClose }) {
  const modeDonut = {
    background:
      "conic-gradient(#14b8a6 0% 47.4%, #3b82f6 47.4% 76%, #fb923c 76% 92.2%, #a855f7 92.2% 100%)",
  };
  const delayDonut = {
    background:
      "conic-gradient(#3b82f6 0% 40%, #ef4444 40% 70%, #fbbf24 70% 90%, #9ca3af 90% 100%)",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl mt-4 sm:mt-10 p-4 sm:p-6">
        <div className="flex items-start justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center shrink-0">
              <FiFileText size={18} />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Insights</h2>
              <p className="text-sm text-gray-500">
                Detailed Performance insights for shipments
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 shrink-0">
            <FiX size={20} />
          </button>
        </div>

        <div className="flex justify-end mt-4">
          <button className="inline-flex items-center gap-2 border border-gray-200 text-sm text-gray-700 px-3.5 py-2 rounded-lg">
            <FiCalendar size={14} />
            18 Apr 2025 - 25 Apr 2025
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="border border-gray-100 rounded-xl p-4">
            <div className="flex items-start gap-2">
              <FiCheckSquare size={16} className="text-teal-600 mt-0.5 shrink-0" />
              <p className="text-sm font-bold text-gray-900">
                shipments increased by 18.5% compared to last week.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 bg-teal-50 text-teal-700 text-xs font-medium px-3 py-1.5 rounded-full mt-3">
              <FiArrowUp size={12} />
              You've shipped 24 more shipments
            </span>

            <div className="flex items-center justify-between mt-4">
              <div>
                <p className="text-xs font-semibold text-gray-500">Shipment Overview</p>
                <div className="flex gap-6 mt-2">
                  <div>
                    <p className="text-xs text-gray-400">This week</p>
                    <p className="text-lg font-bold text-teal-600">154</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Last week</p>
                    <p className="text-lg font-bold text-gray-900">130</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">Increase</p>
                <div className="flex items-center gap-1.5">
                  <p className="text-lg font-bold text-teal-600">18.5%</p>
                  <FiBarChart2 size={20} className="text-teal-500" />
                </div>
              </div>
            </div>

            <div className="mt-3 bg-teal-50 rounded-lg px-3 py-2">
              <p className="text-xs text-teal-700">
                ★ Great work Your volume is growing consistently
              </p>
            </div>
          </div>

          <div className="border border-gray-100 rounded-xl p-4">
            <div className="flex items-start gap-2">
              <FiCheckSquare size={16} className="text-teal-600 mt-0.5 shrink-0" />
              <p className="text-sm font-bold text-gray-900">
                Average transit time improved by 0.8 days Great job Keep it up
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1.5 rounded-full mt-3">
              <FiArrowUp size={12} />
              Faster deliveries leads to happier customer
            </span>

            <div className="flex items-center justify-between mt-4">
              <div>
                <p className="text-xs font-semibold text-gray-500">Transit time Overview</p>
                <div className="flex gap-6 mt-2">
                  <div>
                    <p className="text-xs text-gray-400">This week (Avg)</p>
                    <p className="text-lg font-bold text-blue-600">4.2 days</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Last week (Avg)</p>
                    <p className="text-lg font-bold text-gray-900">5.0 days</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">Improvement</p>
                <div className="flex items-center gap-1.5">
                  <p className="text-lg font-bold text-blue-600">0.8 days</p>
                  <FiBarChart2 size={20} className="text-blue-500" />
                </div>
              </div>
            </div>

            <div className="mt-3 bg-blue-50 rounded-lg px-3 py-2">
              <p className="text-xs text-blue-700">
                ★ Keep optimising your route to improve more
              </p>
            </div>
          </div>

          <div className="border border-gray-100 rounded-xl p-4">
            <div className="flex items-start gap-2">
              <FiCheckSquare size={16} className="text-teal-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-bold text-gray-900">
                  Sea Freight Shipment are the highest at 47.4%
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Consider optimizing air freight.
                </p>
              </div>
            </div>

            <p className="text-xs font-semibold text-gray-500 mt-4 mb-2">
              Shipment mode distribution
            </p>
            <div className="flex items-center gap-4">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center shrink-0"
                style={modeDonut}
              >
                <div className="w-11 h-11 rounded-full bg-white flex flex-col items-center justify-center">
                  <span className="text-xs font-bold text-gray-900">156</span>
                  <span className="text-[8px] text-gray-400">Total</span>
                </div>
              </div>
              <div className="space-y-1 flex-1 min-w-0 text-xs">
                {modeDistribution.map((m) => (
                  <div key={m.label} className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${m.color}`} />
                    <span className="text-gray-600 truncate">{m.label}</span>
                    <span className="text-gray-900 font-medium ml-auto">{m.pct}</span>
                    <span className="text-gray-400">{m.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 bg-orange-50 rounded-lg px-3 py-2">
              <p className="text-xs text-orange-700">
                ★ Sea Freight is your primary mode. Review air freight opportunities
              </p>
            </div>
          </div>

          <div className="border border-gray-100 rounded-xl p-4">
            <div className="flex items-start gap-2">
              <FiCheckSquare size={16} className="text-teal-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-bold text-gray-900">10 Shipments were delayed</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  check delay reasons in shipment tracking
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-2">Delay Overview</p>
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={delayDonut}
                >
                  <div className="w-11 h-11 rounded-full bg-white flex flex-col items-center justify-center">
                    <span className="text-xs font-bold text-gray-900">10</span>
                    <span className="text-[7px] text-gray-400">TOTAL DELAYED</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-2">Delay Reasons</p>
                <div className="space-y-1 text-xs">
                  {delayReasons.map((d) => (
                    <div key={d.label} className="flex items-center justify-between">
                      <span className="text-gray-600 truncate">{d.label}</span>
                      <span className="text-gray-900 font-medium">{d.value}</span>
                      <span className="text-gray-400">{d.pct}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-3 bg-red-50 rounded-lg px-3 py-2">
              <p className="text-xs text-red-700">
                ★ Taking action on recurring issues to reduce future delays
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-teal-50 rounded-xl p-3 flex items-start gap-2">
          <FiInfo size={15} className="text-teal-600 mt-0.5 shrink-0" />
          <p className="text-sm text-gray-600">
            These insights are based on your shipment data for the selected
            item period
          </p>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:justify-end">
          <button className="order-2 sm:order-1 inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-lg">
            <FiDownload size={15} />
            Export report
          </button>
          <button
            onClick={onClose}
            className="order-1 sm:order-2 bg-teal-400 hover:bg-teal-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

  