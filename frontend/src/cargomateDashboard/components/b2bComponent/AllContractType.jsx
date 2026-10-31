import React from "react";
import { Copy } from "lucide-react";

const contractTypes = [
  { type: "Purchase", dotColor: "bg-blue-500", barColor: "bg-blue-500", count: 612, percentage: "48.2%" },
  { type: "Supply", dotColor: "bg-green-500", barColor: "bg-green-500", count: 412, percentage: "32.5%" },
  { type: "Service", dotColor: "bg-orange-500", barColor: "bg-orange-500", count: 158, percentage: "12.3%" },
  { type: "Other", dotColor: "bg-blue-500", barColor: "bg-blue-500", count: 86, percentage: "6.9%" },
];

export default function AllContractsType({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-start sm:items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl my-4 sm:my-0 flex flex-col max-h-[80vh]">
        <div className="flex items-start gap-3 p-4 sm:p-6 shrink-0">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
            <Copy className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900">All Contracts Type</h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-0.5">Detailed overview of all contracts types.</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-auto px-4 sm:px-6 pb-4">
          <table className="w-full min-w-[500px] border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 rounded-l-lg">TYPE</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">CONTRACTS</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 rounded-r-lg">PERCENTAGE (%)</th>
              </tr>
            </thead>
            <tbody>
              {contractTypes.map((row) => (
                <tr key={row.type} className="border-b border-gray-50">
                  <td className="px-4 py-5">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${row.dotColor}`} />
                      <span className="text-sm font-medium text-gray-900 whitespace-nowrap">{row.type}</span>
                    </div>
                  </td>
                  <td className="px-4 py-5 text-sm text-gray-500 whitespace-nowrap">
                    {row.count} <span className="text-gray-400">({row.percentage})</span>
                  </td>
                  <td className="px-4 py-5">
                    <div className="flex flex-col gap-1.5 min-w-[140px]">
                      <span className="text-sm font-semibold text-gray-900">{row.percentage}</span>
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${row.barColor}`}
                          style={{ width: row.percentage }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
              <tr>
                <td className="px-4 py-5 text-sm font-bold text-gray-900">Total</td>
                <td className="px-4 py-5 text-sm font-bold text-gray-900 whitespace-nowrap">1,268 (100%)</td>
                <td className="px-4 py-5"></td>
              </tr>
            </tbody>
          </table>
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