import { useState } from "react";
import { FiFileText, FiSearch, FiDownload, FiX, FiArrowUp, FiArrowDown } from "react-icons/fi";
import ReactCountryFlag from "react-country-flag";

const countries = [
  { name: "China", code: "CN", value: "₹63.45 Cr", change: "-12.4%" },
  { name: "UK", code: "GB", value: "₹38.20 Cr", change: "-9.6%" },
  { name: "Japan", code: "JP", value: "₹26.10 Cr", change: "-7.8%" },
  { name: "Russia", code: "RU", value: "₹18.35 Cr", change: "-6.4%" },
  { name: "South Korea", code: "KR", value: "₹14.80 Cr", change: "-5.7%" },
  { name: "Brazil", code: "BR", value: "₹12.60 Cr", change: "-4.9%" },
  { name: "France", code: "FR", value: "₹10.75 Cr", change: "-4.1%" },
  { name: "Italy", code: "IT", value: "₹9.30 Cr", change: "-3.6%" },
  { name: "Spain", code: "ES", value: "₹80.20 Cr", change: "-3.2%" },
  { name: "Netherlands", code: "NL", value: "₹7.65 Cr", change: "-2.8%" },
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

export default function AllDecliningCountriesModal({ onClose }) {
  const [search, setSearch] = useState("");
  const filtered = countries.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  const columns = [
    {
      key: "name",
      label: "Country",
      align: "left",
      render: (v, row) => (
        <span className="flex items-center gap-2 font-medium text-gray-900">
          <ReactCountryFlag countryCode={row.code} svg style={{ width: "1.2em", height: "1.2em" }} />
          {v}
        </span>
      ),
    },
    { key: "value", label: "Trade Value (INR)", align: "center" },
    { key: "change", label: "Change (%)", align: "right", render: (v) => <TrendChip value={v} positive={false} /> },
  ];

  return (
    <Modal
      onClose={onClose}
      title="All Declining Countries"
      subtitle="Countries with declining trade value."
      icon={<FiFileText className="text-blue-500" size={20} />}
      iconBg="bg-blue-50"
      maxWidth="max-w-4xl"
    >
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Countries..."
            className="input pl-9"
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 whitespace-nowrap">
          <FiDownload size={14} /> Export
        </button>
      </div>

      <DataTable columns={columns} rows={filtered} minWidth="600px" />

      <div className="flex justify-end mt-5">
        <button onClick={onClose} className="px-5 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 font-medium">
          Close
        </button>
      </div>
    </Modal>
  );
}