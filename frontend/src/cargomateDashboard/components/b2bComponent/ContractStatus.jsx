import React from "react";
import { Copy } from "lucide-react";

const summaryCards = [
  { label: "Total Contracts", value: "1,268", dotColor: null },
  { label: "Active", value: "842(66.4%)", dotColor: "bg-green-500" },
  { label: "Expiring Soon", value: "96 (7.6%)", dotColor: "bg-orange-500" },
  { label: "Expired", value: "42 (3.3%)", dotColor: "bg-red-500" },
  { label: "Terminated", value: "18 (1.4%)", dotColor: "bg-blue-500" },
  { label: "Draft", value: "270 (21.3%)", dotColor: "bg-purple-500" },
];

const tableRows = [
  { type: "Active", dotColor: "bg-green-500", count: 842, percentage: "66.4%", description: "Contracts that are currently active and in effect." },
  { type: "Expiring Soon", dotColor: "bg-orange-500", count: 96, percentage: "7.6%", description: "Contracts nearing expiration within the next 30 days." },
  { type: "Expired", dotColor: "bg-red-500", count: 42, percentage: "3.3%", description: "Contracts that have expired and are no longer active." },
  { type: "Terminated", dotColor: "bg-blue-500", count: 18, percentage: "1.4%", description: "Contracts that were terminated before expiration." },
  { type: "Draft", dotColor: null, count: 270, percentage: "21.3%", description: "Contracts in draft stage and not yet finalized." },
];

export default function ContractsByStatus({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-start sm:items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl my-4 sm:my-0 flex flex-col max-h-[80vh]">
        <div className="flex items-start justify-between gap-3 p-4 sm:p-6 shrink-0">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
              <Copy className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-gray-900">Contracts by Status</h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                Detailed overview of all contracts by their current status.
              </p>
            </div>
          </div>
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shrink-0"
          >
            This Month
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
            {summaryCards.map((card) => (
              <div key={card.label} className="border border-gray-100 rounded-lg p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  {card.dotColor && <span className={`w-2 h-2 rounded-full ${card.dotColor}`} />}
                  <p className="text-xs text-gray-500">{card.label}</p>
                </div>
                <p className="text-base sm:text-lg font-bold text-gray-900">{card.value}</p>
              </div>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 rounded-l-lg">DOCUMENT TYPE</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">COUNT</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">PERCENTAGE (%)</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 rounded-r-lg">DESCRIPTION</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row) => (
                  <tr key={row.type} className="border-b border-gray-50">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        {row.dotColor && <span className={`w-2 h-2 rounded-full ${row.dotColor}`} />}
                        <span className="text-sm font-medium text-gray-900 whitespace-nowrap">{row.type}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700">{row.count}</td>
                    <td className="px-4 py-4 text-sm text-gray-700">{row.percentage}</td>
                    <td className="px-4 py-4 text-sm text-gray-500 min-w-[220px]">{row.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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