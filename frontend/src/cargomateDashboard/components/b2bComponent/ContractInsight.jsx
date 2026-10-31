import React from "react";
import { Copy, FileText, IndianRupee, AlertTriangle } from "lucide-react";

const insights = [
  {
    icon: FileText,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-500",
    cardBg: "bg-blue-50",
    value: "842",
    valueColor: "text-blue-600",
    title: "Active Contracts",
    subtitle: "Currently Active",
  },
  {
    icon: IndianRupee,
    iconBg: "bg-green-100",
    iconColor: "text-green-500",
    cardBg: "bg-green-50",
    value: "₹2,845.60 Cr",
    valueColor: "text-green-600",
    title: "Total Value",
    subtitle: "Total Value of active contracts",
  },
  {
    icon: AlertTriangle,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-500",
    cardBg: "bg-orange-50",
    value: "96",
    valueColor: "text-orange-500",
    title: "Expiring Soon",
    subtitle: "Contracts expiring in next 60 days",
  },
];

export default function ContractsInsights({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-start sm:items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl my-4 sm:my-0 flex flex-col max-h-[80vh]">
        <div className="flex items-start gap-3 p-4 sm:p-6 shrink-0">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
            <Copy className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900">Contracts Insights</h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-0.5">Detailed overview of your contracts</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {insights.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className={`rounded-xl p-4 ${item.cardBg}`}>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${item.iconBg}`}>
                    <Icon className={`w-5 h-5 ${item.iconColor}`} />
                  </div>
                  <p className={`text-2xl font-bold ${item.valueColor}`}>{item.value}</p>
                  <p className="text-sm font-medium text-gray-900 mt-1">{item.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.subtitle}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-end px-4 sm:px-6 py-4 border-t border-gray-100 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-medium rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}