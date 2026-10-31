import { useState } from "react";
import { FiAnchor, FiSearch, FiFilter, FiDownload, FiX, FiArrowUp, FiArrowDown } from "react-icons/fi";

const ports = [
  { name: "Nhava Sheva (Mumbai)", loc: "Maharashtra, India", bg: "bg-blue-50", shipments: "2,895", value: "₹412.50 Cr", share: "33.1%", change: "18.2%" },
  { name: "Mundra (Gujarat)", loc: "Gujarat, India", bg: "bg-orange-50", shipments: "1,745", value: "₹286.40 Cr", share: "23.0%", change: "12.2%" },
  { name: "Chennai", loc: "Tamil Naidu, India", bg: "bg-emerald-50", shipments: "1,055", value: "₹201.20 Cr", share: "16.1%", change: "11.4%" },
  { name: "Kolkata", loc: "West Bengal, India", bg: "bg-purple-50", shipments: "955", value: "₹124.10 Cr", share: "10.0%", change: "9.5%" },
  { name: "Haziea", loc: "Gujarat, India", bg: "bg-amber-50", shipments: "642", value: "₹86.75 Cr", share: "7.0%", change: "8.7%" },
  { name: "Cochin", loc: "Kerala, India", bg: "bg-teal-50", shipments: "398", value: "₹54.30 Cr", share: "4.4%", change: "7.6%" },
  { name: "Vizag", loc: "Andhra Pradesh, India", bg: "bg-pink-50", shipments: "322", value: "₹52.60 Cr", share: "3.4%", change: "6.3%" },
  { name: "Paradip", loc: "Odisha, India", bg: "bg-purple-50", shipments: "245", value: "₹33.10 Cr", share: "2.7%", change: "5.4%" },
  { name: "Tuticorin", loc: "Tamil Naidu, India", bg: "bg-blue-50", shipments: "210", value: "₹25.80 Cr", share: "2.1%", change: "5.1%" },
  { name: "Delhi ICD", loc: "Delhi, India", bg: "bg-orange-50", shipments: "185", value: "₹25.80 Cr", share: "1.5%", change: "4.2%" },
];

function Modal({ icon, iconBg, title, subtitle, headerRight, onClose, children, maxWidth = "max-w-5xl" }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-start sm:items-center justify-center p-2 sm:p-4 z-50">
      <div className={`bg-white w-full ${maxWidth} rounded-lg shadow-xl my-4 sm:my-0 flex flex-col max-h-[90vh]`}>
        <div className="flex items-start sm:items-center justify-between gap-3 p-4 sm:p-6 border-b border-gray-100 shrink-0">
          <div className="flex items-start sm:items-center gap-3 min-w-0">
            {icon && (
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0 ${iconBg}`}>
                {icon}
              </div>
            )}
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-medium text-gray-900 truncate">{title}</h2>
              {subtitle && <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{subtitle}</p>}
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {headerRight}
            {onClose && (
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <FiX size={20} />
              </button>
            )}
          </div>
        </div>
        <div className="p-4 sm:p-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

// columns: [{ key, label, align: "left" | "center" | "right", render }]
function DataTable({ columns, rows, minWidth = "700px" }) {
  return (
    <div className="w-full overflow-x-auto border border-gray-100 rounded-lg">
      <table className="w-full text-sm" style={{ minWidth }}>
        <thead>
          <tr className="bg-gray-50">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-4 py-3 font-medium text-gray-500 text-xs uppercase tracking-wide whitespace-nowrap text-${col.align || "center"}`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-gray-100 hover:bg-gray-50">
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={`px-4 py-3 whitespace-nowrap text-gray-800 text-${col.align || "center"}`}
                >
                  {col.render ? col.render(row[col.key], row, i) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TrendChip({ value, positive = true, bg = false }) {
  const color = positive ? "text-green-600" : "text-red-500";
  const wrap = bg
    ? `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
        positive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"
      }`
    : `inline-flex items-center gap-1 text-sm font-medium ${color}`;
  return (
    <span className={wrap}>
      {positive ? <FiArrowUp size={12} /> : <FiArrowDown size={12} />}
      {value}
    </span>
  );
}

export default function AllPortsOfArrivalModal({ onClose }) {
  const [search, setSearch] = useState("");
  const filtered = ports.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  const columns = [
    {
      key: "sr",
      label: "#",
      align: "left",
      render: (_, __, i) => <span className="text-gray-500">{i + 1}</span>,
    },
    {
      key: "name",
      label: "Port Name",
      align: "left",
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <span className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${row.bg}`}>
            <FiAnchor className="text-gray-600" size={15} />
          </span>
          <div>
            <p className="font-medium text-gray-900">{row.name}</p>
            <p className="text-xs text-gray-500">{row.loc}</p>
          </div>
        </div>
      ),
    },
    { key: "shipments", label: "Shipments", align: "center" },
    { key: "value", label: "Import Value (INR)", align: "center" },
    { key: "share", label: "%Share", align: "center" },
    {
      key: "change",
      label: "Change vs Last month",
      align: "right",
      render: (v) => <TrendChip value={v} positive />,
    },
  ];

  return (
    <Modal
      onClose={onClose}
      icon={<FiAnchor className="text-blue-500" size={20} />}
      iconBg="bg-blue-50"
      title="All Ports of Arrival"
      subtitle="Detailed list of all ports used for imports."
      maxWidth="max-w-5xl"
    >
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search ports..."
            className="input pl-9"
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 whitespace-nowrap">
          <FiFilter size={14} /> Filters
        </button>
        <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 whitespace-nowrap">
          <FiDownload size={14} /> Export
        </button>
      </div>

      <DataTable columns={columns} rows={filtered} minWidth="750px" />

      <div className="flex justify-end mt-5">
        <button onClick={onClose} className="px-5 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 font-medium">
          Close
        </button>
      </div>
    </Modal>
  );
}