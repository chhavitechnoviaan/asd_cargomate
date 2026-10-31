import { useState } from "react";
import { Globe } from "lucide-react";

const countries = [
  { name: "Canada", revenue: "$28.6M", share: "22.4%", color: "bg-blue-500" },
  { name: "Brazil", revenue: "$28.6M", share: "25.9%", color: "bg-green-500" },
  { name: "India", revenue: "$28.6M", share: "22.4%", color: "bg-orange-400", italic: true },
  { name: "Australia", revenue: "$28.6M", share: "22.4%", color: "bg-pink-500" },
  { name: "Germany", revenue: "$28.6M", share: "22.4%", color: "bg-teal-400" },
  { name: "China", revenue: "$28.6M", share: "22.4%", color: "bg-indigo-500" },
];

export default function AllCountries({ onClose }) {
  const [data] = useState(countries);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-4 sm:p-6">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
            <Globe className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">All Countries</h2>
            <p className="text-sm text-gray-500">Revenue by all Countries</p>
          </div>
        </div>
        <span className="text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
          Active
        </span>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[500px]">
          <div className="grid grid-cols-3 bg-green-50/70 rounded-xl px-4 py-3 mb-2">
            <span className="text-sm text-gray-700">Countries</span>
            <span className="text-sm text-gray-700">Revenue</span>
            <span className="text-sm text-gray-700">Share</span>
          </div>

          {data.map((c) => (
            <div
              key={c.name}
              className="grid grid-cols-3 items-center px-4 py-3 border-b border-gray-100"
            >
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${c.color}`} />
                <span className={`text-sm text-gray-700 ${c.italic ? "italic" : ""}`}>
                  {c.name}
                </span>
              </div>
              <span className="text-sm text-gray-500">{c.revenue}</span>
              <span className="text-sm text-gray-500">{c.share}</span>
            </div>
          ))}

          <div className="grid grid-cols-3 items-center px-4 py-3">
            <span className="text-sm font-medium text-gray-900">Total revenue</span>
            <span className="text-sm text-gray-700">$28.6M</span>
            <span className="text-sm text-gray-700">100%</span>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={onClose}
          className="px-6 py-2 rounded-full border border-gray-300 text-gray-700 text-sm hover:bg-gray-50"
        >
          Close
        </button>
      </div>
    </div>
  );
}