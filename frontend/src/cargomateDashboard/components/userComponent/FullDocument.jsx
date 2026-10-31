import { useState, useMemo } from "react";
import {
  FiX,
  FiFileText,
  FiFile,
  FiSearch,
  FiFilter,
  FiEye,
  FiDownload,
  FiInfo,
} from "react-icons/fi";

const documents = [
  { name: "Commercial Invoice", ref: "INV-2025-0424.pdf", type: "Commercial", typeColor: "bg-green-50 text-green-600", date: "24 Apr 2025", time: "09:15 AM", size: "245 KB", category: "Commercial" },
  { name: "Packing List", ref: "PL-2025-0424.pdf", type: "Commercial", typeColor: "bg-green-50 text-green-600", date: "24 Apr 2025", time: "09:15 AM", size: "180 KB", category: "Packing" },
  { name: "Bill of Lading", ref: "BL-2025-0424.pdf", type: "Transport", typeColor: "bg-purple-50 text-purple-600", date: "23 Apr 2025", time: "09:15 AM", size: "320 KB", category: "Transport" },
  { name: "Sea Waybill", ref: "SB-2025-0424.pdf", type: "Transport", typeColor: "bg-purple-50 text-purple-600", date: "23 Apr 2025", time: "09:15 AM", size: "210 KB", category: "Transport" },
  { name: "Export Declaration", ref: "ED-2025-0424.pdf", type: "Customs", typeColor: "bg-blue-50 text-blue-600", date: "20 Apr 2025", time: "09:15 AM", size: "150 KB", category: "Customs" },
  { name: "Import Declaration", ref: "ID-2025-0424.pdf", type: "Customs", typeColor: "bg-blue-50 text-blue-600", date: "20 Apr 2025", time: "09:15 AM", size: "160 KB", category: "Customs" },
  { name: "Packing Certificate", ref: "PC-2025-0424.pdf", type: "Packing", typeColor: "bg-orange-50 text-orange-600", date: "19 Apr 2025", time: "09:15 AM", size: "115 KB", category: "Packing" },
];

const categoryCounts = [
  { name: "Commercial", count: 3 },
  { name: "Transport", count: 3 },
  { name: "Customs", count: 2 },
  { name: "Packing", count: 1 },
  { name: "Insurance", count: 1 },
  { name: "Certificates", count: 1 },
  { name: "Other", count: 1 },
];




export default function FullDocumentsModal({ onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Documents");

  const filteredDocs = useMemo(() => {
    return documents.filter((d) => {
      const matchesSearch =
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.ref.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        activeCategory === "All Documents" || d.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl mt-4 sm:mt-10 p-4 sm:p-6">
        <div className="flex items-start justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center shrink-0">
              <FiFileText size={18} />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Full Documents</h2>
              <p className="text-sm text-gray-500">PLN-2025-04-24-000123</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 shrink-0">
            <FiX size={20} />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4">
          <p className="text-sm text-gray-500">
            View and download all documents related to this shipment.
          </p>
          <div className="flex gap-2 shrink-0">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search documents..."
                className="border border-gray-200 rounded-lg pl-8 pr-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 w-44 sm:w-56"
              />
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 border border-gray-200 text-sm text-gray-700 px-3 py-2 rounded-lg"
            >
              <FiFilter size={14} />
              Filter
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-4">
          <div className="space-y-1">
            <button
              onClick={() => setActiveCategory("All Documents")}
              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold ${
                activeCategory === "All Documents"
                  ? "bg-teal-50 text-teal-700"
                  : "text-gray-700"
              }`}
            >
              <FiFileText size={15} className="text-teal-600" />
              All Documents (12)
            </button>
            {categoryCounts.map((c) => (
              <button
                key={c.name}
                onClick={() => setActiveCategory(c.name)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm ${
                  activeCategory === c.name
                    ? "bg-teal-50 text-teal-700 font-semibold"
                    : "text-gray-700"
                }`}
              >
                <span>{c.name}</span>
                <span className="text-gray-400">({c.count})</span>
              </button>
            ))}
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[560px]">
              <div className="grid grid-cols-[1.6fr_0.9fr_1fr_0.7fr_0.7fr] text-xs font-semibold text-gray-500 px-2 pb-2">
                <span>Document Name</span>
                <span>Type</span>
                <span>Uploaded On</span>
                <span>Size</span>
                <span>Actions</span>
              </div>
              <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
                {filteredDocs.map((d) => (
                  <div
                    key={d.ref}
                    className="grid grid-cols-[1.6fr_0.9fr_1fr_0.7fr_0.7fr] items-center px-2 py-3 gap-2"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <FiFile size={16} className="text-gray-400 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{d.name}</p>
                        <p className="text-xs text-gray-400 truncate">{d.ref}</p>
                      </div>
                    </div>
                    <span className={`w-fit text-xs font-medium px-2.5 py-1 rounded-full ${d.typeColor}`}>
                      {d.type}
                    </span>
                    <div className="text-xs text-gray-500">
                      <p>{d.date}</p>
                      <p>{d.time}</p>
                    </div>
                    <span className="text-xs text-gray-500">{d.size}</span>
                    <div className="flex items-center gap-3 text-gray-500">
                      <button type="button">
                        <FiEye size={15} />
                      </button>
                      <button type="button">
                        <FiDownload size={15} />
                      </button>
                    </div>
                  </div>
                ))}
                {filteredDocs.length === 0 && (
                  <p className="text-sm text-gray-400 text-center py-6">
                    No documents found.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-teal-50 rounded-xl p-3 flex items-start gap-2">
          <FiInfo size={15} className="text-teal-600 mt-0.5 shrink-0" />
          <p className="text-sm text-gray-600">
            Can't find a document? Contact your logistics provider or admin
            for assistance.
          </p>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:justify-end">
          <button className="order-2 sm:order-1 inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-lg">
            <FiDownload size={15} />
            Download All
          </button>
          <button
            onClick={onClose}
            className="order-1 sm:order-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

