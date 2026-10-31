import React, { useState } from "react";
import { Users, Download, SlidersHorizontal, Search } from "lucide-react";

const suppliersData = [
  { id: 1, initial: "A", color: "bg-blue-100 text-blue-600", name: "ABC Trading Co. Ltd.", location: "Mumbai, India", shipments: 845, value: "₹120.45 Cr", change: "18.2%" },
  { id: 2, initial: "G", color: "bg-green-100 text-green-600", name: "Global Industries Inc.", location: "Delhi, India", shipments: 712, value: "₹88.75 Cr", change: "12.2%" },
  { id: 3, initial: "O", color: "bg-purple-100 text-purple-600", name: "Omega Suppliers", location: "Ahmedabad, India", shipments: 655, value: "₹76.20 Cr", change: "11.4%" },
  { id: 4, initial: "P", color: "bg-orange-100 text-orange-600", name: "Prime Exports Ltd.", location: "Bengaluru, India", shipments: 582, value: "₹64.10 Cr", change: "9.5%" },
  { id: 5, initial: "S", color: "bg-green-100 text-green-600", name: "Shree Enterprises", location: "Pune, India", shipments: 498, value: "₹56.30 Cr", change: "8.7%" },
  { id: 6, initial: "V", color: "bg-purple-100 text-purple-600", name: "Velocity Traders", location: "Hyderabad, India", shipments: 421, value: "₹48.90 Cr", change: "7.6%" },
  { id: 7, initial: "R", color: "bg-orange-100 text-orange-600", name: "Reliable Imports", location: "Kolkata, India", shipments: 378, value: "₹41.25 Cr", change: "6.3%" },
  { id: 8, initial: "M", color: "bg-blue-100 text-blue-600", name: "Midas Global", location: "Chennai, India", shipments: 329, value: "₹37.80 Cr", change: "5.4%" },
  { id: 9, initial: "U", color: "bg-pink-100 text-pink-600", name: "Universal Suppliers", location: "Surat, India", shipments: 287, value: "₹33.60 Cr", change: "5.1%" },
  { id: 10, initial: "N", color: "bg-teal-100 text-teal-600", name: "Nexus Exports", location: "Jaipur, India", shipments: 256, value: "₹29.40 Cr", change: "4.2%" },
];

export default function AllSuppliers({ onClose }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSuppliers = suppliersData.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = async () => {
    try {
      const response = await fetch("/api/suppliers/export", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to export suppliers");
      }

      console.log("Suppliers exported");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start sm:items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl my-4 sm:my-0 flex flex-col max-h-[80vh]">
        <div className="flex items-start gap-3 p-4 sm:p-6 shrink-0">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900">All Suppliers</h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
              Detailed list of all suppliers based on import value.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 px-4 sm:px-6 pb-4 shrink-0">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search suppliers..."
              className="w-full text-sm rounded-lg border border-gray-200 pl-9 pr-4 py-2.5 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
            <button
              type="button"
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-auto px-4 sm:px-6 pb-4">
          <table className="w-full min-w-[650px] border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left text-xs font-semibold text-gray-500 px-3 py-3 rounded-l-lg">#</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-3 py-3">Supplier Name</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-3 py-3">Shipments</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-3 py-3">Import Value (INR)</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-3 py-3 rounded-r-lg">Change vs Last month</th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.map((supplier, index) => (
                <tr key={supplier.id} className="border-b border-gray-50">
                  <td className="px-3 py-4 text-sm text-gray-700">{index + 1}</td>
                  <td className="px-3 py-4">
                    <div className="flex items-center gap-3">
                      <span className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${supplier.color}`}>
                        {supplier.initial}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-gray-900 whitespace-nowrap">{supplier.name}</p>
                        <p className="text-xs text-gray-400">{supplier.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-700">{supplier.shipments}</td>
                  <td className="px-3 py-4 text-sm text-gray-700 whitespace-nowrap">{supplier.value}</td>
                  <td className="px-3 py-4 text-sm font-medium text-green-500 whitespace-nowrap">
                    ▲ {supplier.change}
                  </td>
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