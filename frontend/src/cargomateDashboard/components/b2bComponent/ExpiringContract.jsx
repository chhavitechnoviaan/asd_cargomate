import React from "react";

const expiringContracts = [
  { name: "Chemical Import Contract", id: "CTR-2025-1040", expiry: "11 Jan 2026", value: "₹125.50 Cr", status: "Active" },
  { name: "Packaging Material Supply", id: "CTR-2025-1041", expiry: "04 Feb 2026", value: "₹78.30 Cr", status: "Active" },
  { name: "Electronics Supply Agreement", id: "CTR-2025-1045", expiry: "31 Mar 2026", value: "₹210.75 Cr", status: "Active" },
  { name: "Machinery Import Contract", id: "CTR-2025-1044", expiry: "14 Mar 2026", value: "₹95.60 Cr", status: "Active" },
  { name: "Solar Panels Import", id: "CTR-2025-1037", expiry: "14 Nov 2025", value: "₹320.40 Cr", status: "Active" },
  { name: "IT Services Agreement", id: "CTR-2025-1051", expiry: "20 Apr 2026", value: "₹145.20 Cr", status: "Active" },
  { name: "Logistics Service Contract", id: "CTR-2025-1056", expiry: "27 May 2026", value: "₹68.90 Cr", status: "Active" },
  { name: "Facility Maintenance Agreement", id: "CTR-2025-1062", expiry: "15 Jul 2026", value: "₹54.10 Cr", status: "Active" },
];

export default function ExpiringContracts({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-start sm:items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl my-4 sm:my-0 flex flex-col max-h-[80vh]">
        <div className="p-4 sm:p-6 shrink-0">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Expiring Contracts</h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-0.5">All contracts that are expiring soon.</p>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-auto px-4 sm:px-6 pb-4">
          <table className="w-full min-w-[650px] border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 rounded-l-lg">Contract Name</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Contract ID</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Expiry Date</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Value(Cr)</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 rounded-r-lg">Status</th>
              </tr>
            </thead>
            <tbody>
              {expiringContracts.map((contract) => (
                <tr key={contract.id} className="border-b border-gray-50">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">{contract.name}</td>
                  <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{contract.id}</td>
                  <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{contract.expiry}</td>
                  <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{contract.value}</td>
                  <td className="px-4 py-4 text-sm font-medium text-blue-500 whitespace-nowrap">{contract.status}</td>
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