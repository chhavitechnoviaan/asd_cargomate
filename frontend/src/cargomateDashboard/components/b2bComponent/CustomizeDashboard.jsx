import React, { useState } from "react";
import { Settings, X, BarChart2, LineChart, CheckCircle2, Circle, RotateCcw } from "lucide-react";

const API_URL = "https://api.example.com/dashboard/widgets";

const kpiItems = [
  "Total Shipments",
  "Total Spend",
  "On-Time Delivery",
  "Avg Transit Time",
  "Cost per Shipment",
  "Active Vendors",
];

const chartItems = [
  "Shipment Over Time",
  "Shipments by Mode",
  "Transit Time Trend",
  "Spend by Category",
  "Monthly Shipment Trend",
  "Cost Trend",
];

function ToggleItem({ label, checked, onToggle }) {
  return (
    <button onClick={onToggle} className="flex items-center gap-2 text-left py-1">
      {checked ? (
        <CheckCircle2 size={18} className="text-blue-500 shrink-0" />
      ) : (
        <Circle size={18} className="text-gray-300 shrink-0" />
      )}
      <span className="text-sm text-gray-700">{label}</span>
    </button>
  );
}

export default function CustomizeDashboardPopup({ onClose }) {
  const [kpi, setKpi] = useState(kpiItems.reduce((a, k) => ({ ...a, [k]: true }), {}));
  const [charts, setCharts] = useState(chartItems.reduce((a, k) => ({ ...a, [k]: true }), {}));

  function toggleKpi(key) {
    setKpi((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function toggleChart(key) {
    setCharts((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function handleResetToDefault() {
    setKpi(kpiItems.reduce((a, k) => ({ ...a, [k]: true }), {}));
    setCharts(chartItems.reduce((a, k) => ({ ...a, [k]: true }), {}));
  }

  async function handleApplyChanges() {
    const payload = { kpiCards: kpi, charts: charts };
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl max-h-[90vh] overflow-y-auto p-5 sm:p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Settings size={20} className="text-slate-700" />
            <h2 className="text-lg font-semibold text-gray-900">Customize Dashboard</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>
        <p className="text-sm text-gray-400 mt-1">
          Choose the widgets you want to display on your dashboard.
        </p>

        <div className="mt-5">
          <div className="flex items-center gap-2 mb-2">
            <BarChart2 size={16} className="text-green-500" />
            <p className="font-medium text-gray-800">KPI Cards</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-1">
            {kpiItems.map((item) => (
              <ToggleItem key={item} label={item} checked={kpi[item]} onToggle={() => toggleKpi(item)} />
            ))}
          </div>
        </div>

        <div className="mt-5">
          <div className="flex items-center gap-2 mb-2">
            <LineChart size={16} className="text-pink-500" />
            <p className="font-medium text-gray-800">Charts</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-1">
            {chartItems.map((item) => (
              <ToggleItem key={item} label={item} checked={charts[item]} onToggle={() => toggleChart(item)} />
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-6">
          <button
            onClick={handleResetToDefault}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-teal-400 text-teal-500 text-sm"
          >
            <RotateCcw size={14} /> Reset to Default
          </button>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-5 py-2 rounded-full border border-gray-300 text-sm text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleApplyChanges}
              className="flex-1 sm:flex-none px-5 py-2 rounded-full bg-teal-400 text-sm text-white hover:bg-teal-500"
            >
              Apply Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}