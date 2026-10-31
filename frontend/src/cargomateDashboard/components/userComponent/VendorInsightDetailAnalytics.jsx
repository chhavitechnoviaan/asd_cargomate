import { FiX, FiUsers, FiCalendar, FiDownload, FiPackage, FiClock, FiAlertTriangle, FiInfo, FiStar, FiCheckCircle, FiAward, FiTruck } from "react-icons/fi";

const vendorTypeColors = { "Freight Forwarder": "#3b82f6", "Transporter (Local)": "#8b5cf6", "Customs Broker": "#10b981", Others: "#cbd5e1" };

const distribution = [
  { type: "Freight Forwarder", vendors: 12, share: "50%" },
  { type: "Transporter (Local)", vendors: 6, share: "25%" },
  { type: "Customs Broker", vendors: 3, share: "13%" },
  { type: "Others", vendors: 3, share: "12%" },
];

const performance = [
  { type: "Freight Forwarder", vendor: 12, shipments: 26, onTime: 78, issue: "12%" },
  { type: "Transporter (Local)", vendor: 6, shipments: 12, onTime: 55, issue: "17%" },
  { type: "Customs Broker", vendor: 3, shipments: 6, onTime: 90, issue: "10%" },
  { type: "Others", vendor: 3, shipments: 4, onTime: 40, issue: "25%" },
];

const vendors = [
  { name: "Global Freight Solutions", type: "Freight Forwarder", shipment: 10, onTime: "90%", transit: "5.2 Days", rating: 4.5, issues: 1 },
  { name: "Oceanic Logstics", type: "Freight Forwarder", shipment: 8, onTime: "88%", transit: "6.1 Days", rating: 4.4, issues: 1 },
  { name: "Speedy Transport", type: "Transporter (Local)", shipment: 6, onTime: "83%", transit: "2.3 Days", rating: 5, issues: 1 },
  { name: "SafeWay Customs", type: "Custom Broker", shipment: 4, onTime: "100%", transit: "1.8 Days", rating: 5, issues: 0 },
  { name: "QuickMove Transport", type: "Transporter (Local)", shipment: 4, onTime: "75%", transit: "2.7 Days", rating: 5, issues: 1 },
  { name: "Others (Various)", type: "Others", shipment: 4, onTime: "75%", transit: "3.5 Days", rating: 5, issues: 2 },
];

const typeStyle = {
  "Freight Forwarder": "bg-blue-50 text-blue-600",
  "Transporter (Local)": "bg-purple-50 text-purple-600",
  "Custom Broker": "bg-emerald-50 text-emerald-600",
  Others: "bg-gray-100 text-gray-500",
};

function Stars({ value }) {
  return (
    <div className="flex items-center gap-0.5 justify-center text-amber-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <FiStar key={i} size={13} fill={i < Math.round(value) ? "#fbbf24" : "none"} />
      ))}
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

// segments: [{ value, color }]
function DonutChart({ segments, centerTop, centerBottom, size = 160 }) {
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  let cumulative = 0;
  const stops = segments
    .map((seg) => {
      const start = (cumulative / total) * 360;
      cumulative += seg.value;
      const end = (cumulative / total) * 360;
      return `${seg.color} ${start}deg ${end}deg`;
    })
    .join(", ");

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <div className="w-full h-full rounded-full" style={{ background: `conic-gradient(${stops})` }} />
      <div
        className="absolute rounded-full bg-white flex flex-col items-center justify-center"
        style={{ top: "18%", left: "18%", right: "18%", bottom: "18%" }}
      >
        {centerTop && <span className="text-xs text-gray-500">{centerTop}</span>}
        {centerBottom && <span className="text-sm sm:text-base font-medium text-gray-900 text-center">{centerBottom}</span>}
      </div>
    </div>
  );
}

export default function VendorInsightsDetailedAnalytics({ onClose }) {
  const columns = [
    { key: "name", label: "Vendor Name", align: "left", render: (v) => <span className="font-medium text-gray-900">{v}</span> },
    { key: "type", label: "Vendor Type", align: "left", render: (v) => <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeStyle[v]}`}>{v}</span> },
    { key: "shipment", label: "shipment", align: "center" },
    { key: "onTime", label: "On-Time Delivery", align: "center" },
    { key: "transit", label: "Avg. Transit Time", align: "center" },
    { key: "rating", label: "Rating", align: "center", render: (v) => <Stars value={v} /> },
    { key: "issues", label: "Issues", align: "right" },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start sm:items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-white w-full max-w-6xl rounded-lg shadow-xl my-4 sm:my-0 flex flex-col max-h-[80vh]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-6 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
              <FiUsers className="text-emerald-500" size={20} />
            </div>
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-medium text-gray-900">Vendor Insights - Detailed Analytics</h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Comprehensive performance insights of your vendor</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 flex-wrap">
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700">
              <FiCalendar size={14} /> 18 Apr 2025 - 24 Apr 2025
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium">
              <FiDownload size={14} /> Export Report
            </button>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <FiX size={20} />
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 space-y-5 overflow-y-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard bg="bg-blue-50" icon={<FiUsers className="text-blue-500" />} label="Total Vendors" value="24" sub="Active in this period" />
            <StatCard bg="bg-purple-50" icon={<FiPackage className="text-purple-500" />} label="Total Shipment" value="48" sub="Handled by vendors" />
            <StatCard bg="bg-emerald-50" icon={<FiClock className="text-emerald-500" />} label="On-Time Delivery" value="87%" sub="42 On-time shipment" up />
            <StatCard bg="bg-orange-50" icon={<FiAlertTriangle className="text-orange-500" />} label="Issue Rate" value="13%" sub="6 shipments with issues" down />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-4">
            <div className="border border-gray-100 rounded-lg p-4 sm:p-5">
              <h3 className="font-medium text-gray-900 mb-4">Vendor Distribution</h3>
              <div className="flex items-center gap-6 flex-wrap justify-center sm:justify-start">
                <DonutChart
                  size={140}
                  centerTop="Total"
                  centerBottom="24 Vendors"
                  segments={distribution.map((d) => ({ value: d.vendors, color: vendorTypeColors[d.type] }))}
                />
                <ul className="space-y-2">
                  {distribution.map((d) => (
                    <li key={d.type} className="flex items-center gap-2 text-sm">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: vendorTypeColors[d.type] }} />
                      <span className="text-gray-700">{d.type}</span>
                      <span className="font-medium text-gray-900">{d.vendors} ({d.share})</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border border-gray-100 rounded-lg p-4 sm:p-5 overflow-x-auto">
              <h3 className="font-medium text-gray-900 mb-4">Performance Overview</h3>
              <table className="w-full text-sm" style={{ minWidth: "500px" }}>
                <thead>
                  <tr className="text-gray-500 text-xs">
                    <th className="text-left font-medium pb-2">Vendor Type</th>
                    <th className="text-center font-medium pb-2">Vendor</th>
                    <th className="text-center font-medium pb-2">Shipments</th>
                    <th className="text-center font-medium pb-2">On-Time Delivery</th>
                    <th className="text-right font-medium pb-2">Issue Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {performance.map((p) => (
                    <tr key={p.type} className="border-t border-gray-100">
                      <td className="py-3 flex items-center gap-2 text-left">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: vendorTypeColors[p.type] }} />
                        {p.type}
                      </td>
                      <td className="text-center">{p.vendor}</td>
                      <td className="text-center">{p.shipments}</td>
                      <td className="text-center">
                        <div className="flex items-center gap-2 justify-center">
                          <div className="w-16 h-1.5 rounded-full bg-gray-200 overflow-hidden">
                            <div className="h-full bg-emerald-500" style={{ width: `${p.onTime}%` }} />
                          </div>
                        </div>
                      </td>
                      <td className="text-right">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${parseInt(p.issue) >= 20 ? "bg-red-50 text-red-500" : "bg-emerald-50 text-emerald-600"}`}>
                          {p.issue}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[66%_34%] gap-4">
            <div className="border border-gray-100 rounded-lg p-4 sm:p-5">
              <h3 className="font-medium text-gray-900 mb-4">Vendor Distribution</h3>
              <DataTable columns={columns} rows={vendors} minWidth="600px" />
            </div>
            <div className="border border-gray-100 rounded-lg p-4 sm:p-5">
              <h3 className="font-medium text-gray-900 mb-4">Insights &amp; Highlights</h3>
              <ul className="space-y-4">
                <Insight icon={<FiCheckCircle className="text-emerald-500" />} bg="bg-emerald-50" title="Freight Forwarders handel 50% of all shipments." sub="12 Vendors in this category" />
                <Insight icon={<FiAward className="text-purple-500" />} bg="bg-purple-50" title="Best Performance by Customs brokers with 90%" sub="on-time delivery" />
                <Insight icon={<FiTruck className="text-orange-500" />} bg="bg-orange-50" title="Transport (local) have the" sub="highest issue rate at 17%" />
                <Insight icon={<FiUsers className="text-blue-500" />} bg="bg-blue-50" title="Oceanic logistics is the top performer with 90%" sub="on-time delivery" />
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-emerald-50 rounded-lg p-4">
            <p className="flex items-start gap-2 text-sm text-gray-700">
              <FiInfo className="text-emerald-600 shrink-0 mt-0.5" />
              Tip: Work more with top- performing vendors like Oceanic Logistics and SafeWay Customs for better reliability
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 whitespace-nowrap">
                <FiDownload size={14} /> Download Report
              </button>
              <button onClick={onClose} className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium whitespace-nowrap">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ bg, icon, label, value, sub, up, down }) {
  return (
    <div className={`rounded-lg p-4 ${bg}`}>
      <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">{icon} {label}</div>
      <p className="text-xl sm:text-2xl font-medium text-gray-900">{value}</p>
      <p className={`text-xs mt-1 ${up ? "text-emerald-600" : down ? "text-red-500" : "text-gray-500"}`}>{sub}</p>
    </div>
  );
}

function Insight({ icon, bg, title, sub }) {
  return (
    <li className="flex items-start gap-3">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${bg}`}>{icon}</div>
      <p className="text-sm text-gray-700">
        {title} <span className="block text-gray-500">{sub}</span>
      </p>
    </li>
  );
}