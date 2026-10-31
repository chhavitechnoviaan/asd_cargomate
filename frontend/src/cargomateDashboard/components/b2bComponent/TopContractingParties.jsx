import React from "react";
import { Copy } from "lucide-react";

const parties = [
  { name: "Shenzhen Tech Co.", value: "₹125.45 Cr", barColor: "bg-blue-500", widthPct: 90, contracts: 28, percentage: "28.35%" },
  { name: "KraussMaffei GmbH", value: "₹98.76 Cr", barColor: "bg-green-500", widthPct: 75, contracts: 22, percentage: "22.32%" },
  { name: "Reliance Industries", value: "₹76.32 Cr", barColor: "bg-purple-500", widthPct: 58, contracts: 18, percentage: "17.25%" },
  { name: "Toyota Tsusho", value: "₹64.18 Cr", barColor: "bg-orange-500", widthPct: 49, contracts: 15, percentage: "14.49%" },
  { name: "LG Electronics", value: "₹48.25 Cr", barColor: "bg-yellow-400", widthPct: 37, contracts: 12, percentage: "10.91%" },
  { name: "Sumitomo Corporation", value: "₹32.40 Cr", barColor: "bg-cyan-400", widthPct: 25, contracts: 9, percentage: "7.31%" },
  { name: "Hewlett Packard Enterprise", value: "₹22.15 Cr", barColor: "bg-pink-500", widthPct: 17, contracts: 6, percentage: "5.01%" },
  { name: "Bajaj Processpack Ltd.", value: "₹18.60 Cr", barColor: "bg-amber-700", widthPct: 14, contracts: 5, percentage: "4.21%" },
];

export default function TopContractingParties({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-start sm:items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl my-4 sm:my-0 flex flex-col max-h-[80vh]">
        <div className="flex items-start gap-3 p-4 sm:p-6 shrink-0">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
            <Copy className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900">Top Contracting Parties By Value</h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-0.5">All contracting parties ranked by total contract value</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-auto px-4 sm:px-6 pb-4">
          <table className="w-full min-w-[650px] border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 rounded-l-lg">PARTY NAME</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">CONTRACT VALUE</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">NUMBER OF CONTRACT</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 rounded-r-lg">PERCENTAGE OF TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {parties.map((party) => (
                <tr key={party.name} className="border-b border-gray-50">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">{party.name}</td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-1.5 min-w-[130px]">
                      <span className="text-sm font-semibold text-gray-900">{party.value}</span>
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${party.barColor}`}
                          style={{ width: `${party.widthPct}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">{party.contracts}</td>
                  <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{party.percentage}</td>
                </tr>
              ))}
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