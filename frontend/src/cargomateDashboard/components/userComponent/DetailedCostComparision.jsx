import { useState } from "react";
import {
  FiX,
  FiDollarSign,
  FiCalendar,
  FiFilter,
  FiGrid,
  FiPackage,
  FiPieChart,
  FiTrendingUp,
  FiChevronLeft,
  FiChevronRight,
  FiInfo,
  FiDownload,
} from "react-icons/fi";

const shipments = [
  { id: "PLN- 2025- 04-18-000095", mode: "Sea Freight", modeColor: "bg-green-50 text-green-600", route: "Nhava Sheva → Singapore", transit: "11 Days", cost: "₹22,400", tag: "Lowest", tagColor: "bg-green-50 text-green-600" },
  { id: "PLN- 2025- 04-20-000101", mode: "Air Freight", modeColor: "bg-blue-50 text-blue-600", route: "Delhi → Frankfurt", transit: "4 Days", cost: "₹24,150" },
  { id: "PLN- 2025- 04-21-000104", mode: "Sea Freight", modeColor: "bg-green-50 text-green-600", route: "Chennai → Rotterdam", transit: "13 Days", cost: "₹25,300" },
  { id: "PLN- 2025- 04-22-000109", mode: "Road Freight", modeColor: "bg-orange-50 text-orange-600", route: "Mumbai → Bangalore", transit: "2 Days", cost: "₹23,750" },
  { id: "PLN- 2025- 04-19-000098", mode: "Air Freight", modeColor: "bg-blue-50 text-blue-600", route: "Mumbai → Dubai", transit: "3 Days", cost: "₹26,450" },
  { id: "PLN- 2025- 04-17-000092", mode: "Sea Freight", modeColor: "bg-green-50 text-green-600", route: "Kolkata → Hamburg", transit: "15 Days", cost: "₹27,800" },
  { id: "PLN- 2025- 04-16-000090", mode: "Sea Freight", modeColor: "bg-green-50 text-green-600", route: "Nhava Sheva → New York", transit: "18 Days", cost: "₹29,900" },
  { id: "PLN- 2025- 04-12-000087", mode: "Air Freight", modeColor: "bg-blue-50 text-blue-600", route: "Delhi → Los Angeles", transit: "5 Days", cost: "₹31,200", tag: "Highest", tagColor: "bg-red-50 text-red-600" },
];

const costBreakdown = [
  { label: "Ocean Freight", value: "₹15,200" },
  { label: "Port Charges (Origin)", value: "₹1,800" },
  { label: "Port Charges (Destination)", value: "₹2,200" },
  { label: "Customs Duty & Taxes", value: "₹1,950" },
  { label: "Documentation Charges", value: "₹650" },
  { label: "Insurance", value: "₹750" },
  { label: "Other Charges", value: "₹1,850" },
];

const modeComparison = [
  { label: "Sea Freight", value: "₹24,600", pct: "(42%)", color: "bg-green-500" },
  { label: "Road Freight", value: "₹27,600", pct: "(33%)", color: "bg-orange-400" },
  { label: "Air Freight", value: "₹22,750", pct: "(25%)", color: "bg-blue-500" },
];

const tabs = [
  { key: "comparison", label: "Cost Comparison", icon: FiGrid },
  { key: "shipment", label: "By Shipment", icon: FiPackage },
  { key: "mode", label: "By Mode", icon: FiPieChart },
  { key: "trend", label: "Trend Analysis", icon: FiTrendingUp },
];

function CostComparisonTab() {
  const [page, setPage] = useState(1);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1.6fr_1fr] gap-4">
      <div className="border border-gray-100 rounded-xl p-4">
        <p className="text-base font-bold text-gray-900 mb-3">
          Cost Comparison by Shipment
        </p>
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            <div className="grid grid-cols-5 text-xs font-semibold text-gray-500 px-1 pb-2">
              <span>Shipment ID</span>
              <span>Mode</span>
              <span>Origin → Destination</span>
              <span>Transit Time</span>
              <span>Estimated Cost</span>
            </div>
            <div className="divide-y divide-gray-100">
              {shipments.map((s) => (
                <div key={s.id} className="grid grid-cols-5 items-center px-1 py-3 gap-2">
                  <span className="text-sm text-gray-900">{s.id}</span>
                  <span className={`w-fit text-xs font-medium px-2.5 py-1 rounded-full ${s.modeColor}`}>
                    {s.mode}
                  </span>
                  <span className="text-sm text-gray-700">{s.route}</span>
                  <span className="text-sm text-gray-700">{s.transit}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-teal-600">{s.cost}</span>
                    {s.tag && (
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${s.tagColor}`}>
                        {s.tag}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3">
          <p className="text-xs text-gray-400">Showing 8 of 8 shipments</p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="text-gray-400 hover:text-gray-600"
            >
              <FiChevronLeft size={16} />
            </button>
            <span className="text-sm font-semibold text-gray-900">{page}</span>
            <button
              type="button"
              onClick={() => setPage((p) => p + 1)}
              className="text-gray-400 hover:text-gray-600"
            >
              <FiChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="border border-gray-100 rounded-xl p-4">
          <p className="text-base font-bold text-gray-900 mb-3">Cost Breakdown</p>
          <span className="inline-block bg-teal-50 text-teal-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-3">
            PLN- 2025- 04-18-000095
          </span>
          <div className="space-y-2">
            {costBreakdown.map((c) => (
              <div key={c.label} className="flex items-center justify-between text-sm">
                <span className="text-gray-500">{c.label}</span>
                <span className="text-gray-900 font-medium">{c.value}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
            <span className="text-sm font-bold text-gray-900">Total Estimated Cost</span>
            <span className="text-sm font-bold text-teal-600">₹22,400</span>
          </div>
        </div>

        <div className="border border-gray-100 rounded-xl p-4">
          <p className="text-base font-bold text-gray-900 mb-3">
            Cost Comparison by Mode
          </p>
          <div className="flex items-center gap-4">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center shrink-0"
              style={{
                background:
                  "conic-gradient(#22c55e 0% 42%, #fb923c 42% 75%, #3b82f6 75% 100%)",
              }}
            >
              <div className="w-14 h-14 rounded-full bg-white flex flex-col items-center justify-center">
                <span className="text-[9px] text-gray-400">Average Cost</span>
                <span className="text-xs font-bold text-gray-900">₹24,860</span>
              </div>
            </div>
            <div className="space-y-1.5 flex-1 min-w-0 text-sm">
              {modeComparison.map((m) => (
                <div key={m.label} className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${m.color}`} />
                  <span className="text-gray-700 truncate">{m.label}</span>
                  <span className="text-gray-900 font-medium ml-auto">{m.value}</span>
                  <span className="text-gray-400">{m.pct}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ByShipmentTab() {
  const [selectedShipment, setSelectedShipment] = useState(shipments[0].id);
  const shipment = shipments.find((s) => s.id === selectedShipment);

  return (
    <div className="border border-gray-100 rounded-xl p-4">
      <label className="block text-xs text-gray-500 mb-1.5">Select Shipment</label>
      <select
        value={selectedShipment}
        onChange={(e) => setSelectedShipment(e.target.value)}
        className="w-full sm:w-80 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
      >
        {shipments.map((s) => (
          <option key={s.id} value={s.id}>{s.id}</option>
        ))}
      </select>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-500">Mode</p>
          <p className="text-sm font-bold text-gray-900 mt-1">{shipment.mode}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-500">Route</p>
          <p className="text-sm font-bold text-gray-900 mt-1">{shipment.route}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-500">Transit Time</p>
          <p className="text-sm font-bold text-gray-900 mt-1">{shipment.transit}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-500">Estimated Cost</p>
          <p className="text-sm font-bold text-teal-600 mt-1">{shipment.cost}</p>
        </div>
      </div>
    </div>
  );
}

function ByModeTab() {
  return (
    <div className="border border-gray-100 rounded-xl p-4">
      <p className="text-base font-bold text-gray-900 mb-3">Average Cost by Mode</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {modeComparison.map((m) => (
          <div key={m.label} className="border border-gray-100 rounded-lg p-3">
            <span className={`w-2 h-2 rounded-full inline-block ${m.color}`} />
            <p className="text-sm font-semibold text-gray-900 mt-1.5">{m.label}</p>
            <p className="text-lg font-bold text-teal-600 mt-1">{m.value}</p>
            <p className="text-xs text-gray-400">Share {m.pct}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrendAnalysisTab() {
  const trend = [22400, 24150, 25300, 23750, 26450, 27800, 29900, 31200];
  const max = Math.max(...trend);

  return (
    <div className="border border-gray-100 rounded-xl p-4">
      <p className="text-base font-bold text-gray-900 mb-4">
        Cost Trend Across Shipments
      </p>
      <div className="flex items-end gap-2 h-40">
        {trend.map((v, i) => (
          <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
            <div
              className="w-full bg-teal-500 rounded-t"
              style={{ height: `${(v / max) * 100}%` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DetailedCostComparisonModal({ onClose }) {
  const [activeTab, setActiveTab] = useState("comparison");

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl mt-4 sm:mt-10 p-4 sm:p-6">
        <div className="flex items-start justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
              <FiDollarSign size={18} />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                Detailed Cost Comparison
              </h2>
              <p className="text-sm text-gray-500">
                Compare estimated costs across different shipment and modes
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 shrink-0">
            <FiX size={20} />
          </button>
        </div>

        <div className="mt-4 flex flex-col xl:flex-row xl:items-start gap-4">
          <div className="flex-1 border border-gray-100 rounded-xl p-4 flex flex-wrap gap-6">
            <div>
              <p className="text-xs text-gray-500">Average Estimated Cost (INR)</p>
              <p className="text-xl font-extrabold text-gray-900 mt-1">₹24,860</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Lowest Cost</p>
              <p className="text-xl font-extrabold text-green-600 mt-1">₹22,400</p>
              <p className="text-xs text-gray-400">Shipment ID: PLN - 2025 - 04 - 18 - 000095</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Highest Cost</p>
              <p className="text-xl font-extrabold text-red-500 mt-1">₹31,200</p>
              <p className="text-xs text-gray-400">Shipment ID: PLN - 2025 - 04 - 12 - 000087</p>
            </div>
          </div>

          <div className="flex flex-col gap-2 shrink-0">
            <button className="inline-flex items-center gap-2 border border-gray-200 text-sm text-gray-700 px-3.5 py-2 rounded-lg">
              <FiCalendar size={14} />
              18 Apr 2025 - 24 Apr 2025
            </button>
            <button className="inline-flex items-center gap-2 border border-gray-200 text-sm text-gray-700 px-3.5 py-2 rounded-lg">
              <FiFilter size={14} />
              Filters
            </button>
          </div>
        </div>

        <div className="mt-5 flex gap-2 sm:gap-6 border-b border-gray-100 overflow-x-auto">
          {tabs.map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`flex items-center gap-1.5 pb-3 text-sm font-semibold whitespace-nowrap border-b-2 ${
                  active
                    ? "text-teal-600 border-teal-600"
                    : "text-gray-500 border-transparent"
                }`}
              >
                <Icon size={15} />
                {t.label}
              </button>
            );
          })}
        </div>

        <div className="mt-4">
          {activeTab === "comparison" && <CostComparisonTab />}
          {activeTab === "shipment" && <ByShipmentTab />}
          {activeTab === "mode" && <ByModeTab />}
          {activeTab === "trend" && <TrendAnalysisTab />}
        </div>

        <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex-1 bg-blue-50 rounded-xl p-3 flex items-start gap-2">
            <FiInfo size={15} className="text-blue-500 mt-0.5 shrink-0" />
            <p className="text-sm text-gray-600">
              Costs are estimated and may vary based on real-time rates,
              additional charges, and market conditions.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button className="inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-lg">
              <FiDownload size={15} />
              Export Report
            </button>
            <button
              onClick={onClose}
              className="bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium px-6 py-2.5 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

