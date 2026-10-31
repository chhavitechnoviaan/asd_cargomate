import { FiUsers, FiFilter, FiArrowUp, FiArrowDown } from "react-icons/fi";

const partners = [
  { name: "Techno trade LLC", value: "₹145.60 Cr", growth: "28.4%" },
  { name: "Global Supplies Inc.", value: "₹112.45 Cr", growth: "19.7%" },
  { name: "Prime Exports Ltd.", value: "₹98.30 Cr", growth: "16.3%" },
  { name: "Maxwell Industries", value: "₹74.25 Cr", growth: "13.8%" },
  { name: "Vision Exim Pvt. Ltd.", value: "₹56.10 Cr", growth: "8.6%" },
];

const distribution = [
  { name: "USA", pct: "28.6%", color: "#3b82f6" },
  { name: "China", pct: "18.9%", color: "#22c55e" },
  { name: "Germany", pct: "14.2%", color: "#ef4444" },
  { name: "UAE", pct: "12.1%", color: "#a855f7" },
  { name: "Others", pct: "8.7%", color: "#cbd5e1" },
];

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

export default function PartnerAnalysis() {
  return (
    <div className="bg-white rounded-xl shadow-sm w-full max-w-4xl p-5 sm:p-6 flex flex-col max-h-[90vh]">
      <div className="flex items-center gap-3 mb-5 shrink-0">
        <div className="w-11 h-11 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
          <FiUsers className="text-purple-500" size={20} />
        </div>
        <div>
          <h2 className="font-medium text-gray-900">Partner Analysis</h2>
          <p className="text-xs text-gray-500">Analyze performance of trading partners.</p>
        </div>
      </div>

      <div className="overflow-y-auto pr-1">
        <div className="flex flex-wrap gap-3 mb-5">
          <button className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 whitespace-nowrap">This Month</button>
          <button className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 whitespace-nowrap">All Countries</button>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 whitespace-nowrap">
            <FiFilter size={14} /> Filters
          </button>
        </div>

        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-gray-900">Top Partners by Trade Value</h3>
          <button className="text-sm text-blue-600 font-medium">View All</button>
        </div>

        <table className="w-full text-sm mb-6">
          <thead>
            <tr className="text-gray-500 text-xs uppercase">
              <th className="text-left font-medium pb-2">Partner</th>
              <th className="text-center font-medium pb-2">Trade Vlaue(DNR)</th>
              <th className="text-right font-medium pb-2">Growth (%)</th>
            </tr>
          </thead>
          <tbody>
            {partners.map((p) => (
              <tr key={p.name} className="border-t border-gray-100">
                <td className="py-2.5 text-left text-gray-800">{p.name}</td>
                <td className="py-2.5 text-center text-gray-800">{p.value}</td>
                <td className="py-2.5 text-right"><TrendChip value={p.growth} positive /></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_auto] gap-5 items-center">
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Partner Distribution by Country</h3>
            <div className="flex items-center gap-6 flex-wrap">
              <DonutChart size={150} centerTop="Total" centerBottom="100%" segments={distribution.map((d) => ({ value: parseFloat(d.pct), color: d.color }))} />
              <ul className="space-y-1.5">
                {distribution.map((d) => (
                  <li key={d.name} className="flex items-center gap-2 text-sm">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                    <span className="text-gray-700">{d.name} ({d.pct})</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border border-gray-100 rounded-lg p-4 min-w-[180px]">
            <p className="text-sm text-gray-500 mb-1">New Partners Added</p>
            <p className="text-xl font-medium text-gray-900 mb-1">18</p>
            <TrendChip value="5 vs last month" positive />
          </div>

          <div className="border border-gray-100 rounded-lg p-4 min-w-[180px]">
            <p className="text-sm text-gray-500 mb-1">Active Partners</p>
            <p className="text-xl font-medium text-gray-900 mb-1">245</p>
            <TrendChip value="12 vs last month" positive />
          </div>
        </div>
      </div>
    </div>
  );
}