import { useState } from "react";
import { FiX, FiMenu } from "react-icons/fi";

const storageBreakdown = [
  { label: "Invoices", pct: "50.0%", color: "bg-blue-600" },
  { label: "Certificates", pct: "29.2%", color: "bg-blue-400" },
  { label: "Others", pct: "20.8%", color: "bg-gray-300" },
];

const storageByCategory = [
  { category: "Invoices", used: "1.2 GB", files: 245, pct: "50%" },
  { category: "Certificates", used: "0.7 GB", files: 142, pct: "29.2%" },
  { category: "Packing Lists", used: "0.3 GB", files: 68, pct: "12.5%" },
  { category: "Reports", used: "0.1 GB", files: 32, pct: "4.2%" },
  { category: "Others", used: "0.1 GB", files: 28, pct: "4.1%" },
];

const usageTrend = [
  { date: "19 Apr", value: 0.9 },
  { date: "20 Apr", value: 1.4 },
  { date: "21 Apr", value: 1.7 },
  { date: "22 Apr", value: 2.0 },
  { date: "23 Apr", value: 2.1 },
  { date: "24 Apr", value: 2.0 },
  { date: "25 Apr", value: 2.4 },
];

function UsageTrendChart() {
  const max = 3;
  return (
    <div>
      <div className="flex items-end justify-between h-32 gap-2">
        {usageTrend.map((point) => (
          <div key={point.date} className="flex-1 flex flex-col items-center justify-end h-full">
            <div
              className="w-1.5 bg-blue-500 rounded-full"
              style={{ height: `${(point.value / max) * 100}%` }}
            />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-2 text-[10px] text-gray-400">
        {usageTrend.map((point) => (
          <span key={point.date} className="flex-1 text-center">
            {point.date}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function StorageDetailsModal({ onClose }) {
  const donutStyle = {
    background: "conic-gradient(#2563eb 0% 24%, #e5e7eb 24% 100%)",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl mt-4 sm:mt-10 p-4 sm:p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center shrink-0">
              <FiMenu size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Storage details</h2>
              <p className="text-sm text-gray-500">
                Detailed overview of your document storage
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 shrink-0">
            <FiX size={20} />
          </button>
        </div>

        <p className="text-sm font-bold text-gray-900 mt-5 mb-3">Storage overview</p>
        <div className="flex items-center gap-4">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center shrink-0"
            style={donutStyle}
          >
            <div className="w-14 h-14 rounded-full bg-white flex flex-col items-center justify-center">
              <span className="text-xs font-bold text-gray-900">2.4 GB</span>
              <span className="text-[8px] text-gray-400">of 10 GB used</span>
            </div>
          </div>
          <div className="space-y-1.5 flex-1 text-xs">
            {storageBreakdown.map((s) => (
              <div key={s.label} className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full shrink-0 ${s.color}`} />
                <span className="text-gray-600">{s.label}</span>
                <span className="text-gray-900 font-medium ml-auto">{s.pct}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-5">
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-500">Total Storage</p>
            <p className="text-lg font-bold text-gray-900 mt-1">10 GB</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-500">Used Storage</p>
            <p className="text-lg font-bold text-gray-900 mt-1">2.4 GB</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-500">Total Invoices</p>
            <p className="text-lg font-bold text-gray-900 mt-1">7.6 GB</p>
          </div>
        </div>

        <p className="text-sm font-bold text-gray-900 mt-5 mb-2">Storage by Category</p>
        <div className="overflow-x-auto">
          <div className="min-w-[380px]">
            <div className="grid grid-cols-4 text-xs font-semibold text-gray-400 pb-2">
              <span>Category</span>
              <span>Used Storage</span>
              <span>Files</span>
              <span>Percentage</span>
            </div>
            <div className="divide-y divide-gray-100">
              {storageByCategory.map((row) => (
                <div key={row.category} className="grid grid-cols-4 py-2 text-sm">
                  <span className="text-gray-900">{row.category}</span>
                  <span className="text-gray-700">{row.used}</span>
                  <span className="text-gray-700">{row.files}</span>
                  <span className="text-gray-700">{row.pct}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-sm font-bold text-gray-900 mt-5 mb-3">
          Storage usage overtime
        </p>
        <UsageTrendChart />

        <div className="flex justify-end mt-5">
          <button
            onClick={onClose}
            className="border border-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

  