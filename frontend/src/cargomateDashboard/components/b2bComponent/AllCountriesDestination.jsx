import { useState } from "react";
import { Download, Search, Filter, X } from "lucide-react";
import ReactCountryFlag from "react-country-flag";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const countries = [
  { code: "US", name: "USA", value: "₹512.40 Cr", share: "25.9%", change: "15.6%", up: true },
  { code: "AE", name: "UAE", value: "₹302.80 Cr", share: "15.3%", change: "11.2%", up: true },
  { code: "CN", name: "China", value: "₹268.40 Cr", share: "13.6%", change: "9.4%", up: true },
  { code: "DE", name: "Germany", value: "₹208.40 Cr", share: "10.5%", change: "0.8%", up: false },
  { code: "BD", name: "Bangladesh", value: "₹268.40 Cr", share: "13.6%", change: "6.3%", up: true },
  { code: "NL", name: "Netherlands", value: "₹268.40 Cr", share: "13.6%", change: "4.1%", up: true },
  { code: "JP", name: "Japan", value: "₹68.20 Cr", share: "3.4%", change: "7.8%", up: true },
  { code: "SG", name: "Singapore", value: "₹45.60 Cr", share: "2.3%", change: "5.6%", up: true },
  { code: "KR", name: "South Korea", value: "₹32.10 Cr", share: "1.6%", change: "1.2%", up: false },
  { code: "AU", name: "Australia", value: "₹20.10 Cr", share: "1.0%", change: "3.6%", up: true },
];

const pieData = [
  { value: 25, color: "#3b82f6" },
  { value: 25, color: "#ef4444" },
  { value: 25, color: "#22c55e" },
  { value: 25, color: "#a855f7" },
];

export default function AllCountriesOfDestinationModal({ onClose }) {
  const [search, setSearch] = useState("");
  const filtered = countries.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-teal-500 flex items-center justify-center shrink-0">
              <Download className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">All Countries of Destination</h2>
              <p className="text-sm text-gray-500">Detailed list of countries by import value.</p>
            </div>
          </div>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Countries..."
              className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 text-sm"
            />
          </div>
          <button className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-700 whitespace-nowrap">
            <Filter className="w-4 h-4" /> Filters
          </button>
          <button className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-700 whitespace-nowrap">
            Export
          </button>
        </div>

        <div className="border border-gray-100 rounded-lg p-4 mb-4 flex flex-col sm:flex-row items-center gap-6">
          <div>
            <p className="text-sm text-gray-500">Total Import Value</p>
            <p className="text-2xl font-bold text-gray-900">₹1,976.85 Cr</p>
            <p className="text-xs text-gray-400">Across 25 Countries</p>
          </div>
          <div className="w-24 h-24 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" innerRadius={30} outerRadius={45}>
                  {pieData.map((d, i) => (
                    <Cell key={i} fill={d.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div>
            <p className="text-sm text-gray-500">
              Top 6 Countries <span className="text-blue-600 font-bold">76.3%</span>
            </p>
            <p className="text-sm text-gray-500">
              Other Countries <span className="text-gray-900 font-bold">23.7%</span>
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            <div className="grid grid-cols-5 bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-700 rounded-lg">
              <span>#</span>
              <span>Country</span>
              <span>Import Value</span>
              <span>Share</span>
              <span>Change vs last month</span>
            </div>
            {filtered.map((c, idx) => (
              <div key={c.name} className="grid grid-cols-5 items-center px-3 py-3 border-b border-gray-50">
                <span className="text-sm text-gray-500">{idx + 1}</span>
                <div className="flex items-center gap-2">
                  <ReactCountryFlag countryCode={c.code} svg style={{ width: "1.2em", height: "1.2em" }} />
                  <span className="text-sm text-gray-900">{c.name}</span>
                </div>
                <span className="text-sm text-gray-800">{c.value}</span>
                <span className="text-sm text-gray-500">{c.share}</span>
                <span className={`text-sm font-medium ${c.up ? "text-green-600" : "text-red-500"}`}>
                  {c.up ? "▲" : "▼"} {c.change}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}