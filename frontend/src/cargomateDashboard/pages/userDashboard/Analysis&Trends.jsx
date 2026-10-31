import { useState } from "react";
import { FiDownload, FiFilter, FiChevronDown, FiSettings } from "react-icons/fi";
import { MdOutlineLocalShipping, MdOutlineCurrencyRupee, MdOutlineAccessTime, MdOutlineDirectionsCar, MdOutlinePeople, MdOutlineWarning, MdOutlineCheckCircle, MdOutlineInfo } from "react-icons/md";
import { BsCircleFill, BsArrowUpShort, BsArrowDownShort } from "react-icons/bs";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
  BarChart, Bar, PieChart, Pie, Cell
} from "recharts";

const shipmentOverTimeData = [
  { date: "19 Apr", current: 12, prev: 8 },
  { date: "20 Apr", current: 28, prev: 18 },
  { date: "21 Apr", current: 18, prev: 22 },
  { date: "22 Apr", current: 20, prev: 15 },
  { date: "23 Apr", current: 16, prev: 20 },
  { date: "24 Apr", current: 22, prev: 17 },
  { date: "25 Apr", current: 10, prev: 12 },
];

const transitTrendData = [
  { date: "19 Apr", val: 3.2 },
  { date: "20 Apr", val: 3.8 },
  { date: "21 Apr", val: 3.5 },
  { date: "22 Apr", val: 4.0 },
  { date: "23 Apr", val: 3.9 },
  { date: "24 Apr", val: 4.2 },
  { date: "25 Apr", val: 4.5 },
];

const onTimeDeliveryData = [
  { date: "19 Apr", val: 3.5 },
  { date: "20 Apr", val: 3.8 },
  { date: "21 Apr", val: 4.0 },
  { date: "22 Apr", val: 3.9 },
  { date: "23 Apr", val: 4.1 },
  { date: "24 Apr", val: 4.3 },
  { date: "25 Apr", val: 4.6 },
];

const shipmentBarData = [
  { date: "19 Apr", val: 9000 },
  { date: "20 Apr", val: 17000 },
  { date: "21 Apr", val: 8000 },
  { date: "22 Apr", val: 14000 },
  { date: "23 Apr", val: 13000 },
  { date: "24 Apr", val: 19000 },
  { date: "25 Apr", val: 15000 },
];

const modeData = [
  { name: "Air Freight", value: 62, color: "#3b82f6" },
  { name: "Sea Freight", value: 74, color: "#10b981" },
  { name: "Road Freight", value: 16, color: "#f59e0b" },
  { name: "Others", value: 4, color: "#ef4444" },
];

const spendData = [
  { name: "Freight Charges", value: 12.45, color: "#3b82f6" },
  { name: "Surcharges & Fees", value: 4.32, color: "#10b981" },
  { name: "Customs", value: 3.21, color: "#f59e0b" },
  { name: "Insurance", value: 2.15, color: "#8b5cf6" },
];

const statusData = [
  { name: "Delivered", value: 96, color: "#10b981" },
  { name: "In Transit", value: 32, color: "#3b82f6" },
  { name: "Pending", value: 18, color: "#f59e0b" },
  { name: "Delayed", value: 10, color: "#ef4444" },
];

const origins = [
  { name: "Tirupur, India (IN)", count: 68, pct: "43.6%", color: "#3b82f6", width: "90%" },
  { name: "Mumbai, India (IN)", count: 34, pct: "21.8%", color: "#3b82f6", width: "45%" },
  { name: "Delhi, India (IN)", count: 22, pct: "14.1%", color: "#6366f1", width: "30%" },
  { name: "Bangalore, India (IN)", count: 18, pct: "11.5%", color: "#6366f1", width: "24%" },
];

const destinations = [
  { name: "Dubai, UAE (AE)", count: 72, pct: "46.2%", color: "#3b82f6", width: "90%" },
  { name: "Singapore (SG)", count: 28, pct: "17.9%", color: "#3b82f6", width: "38%" },
  { name: "Doha, Qatar (QA)", count: 20, pct: "12.8%", color: "#6366f1", width: "28%" },
  { name: "Jeddah, Saudi Arabia (SA)", count: 16, pct: "10.3%", color: "#6366f1", width: "22%" },
];

const carriers = [
  { name: "IndiGo Cargo / Emirates SkyCargo", shipments: 46, onTime: "95.7%", avgTransit: 3.6, costPerShip: "₹14,820" },
  { name: "Maersk Line", shipments: 38, onTime: "90.3%", avgTransit: 5.1, costPerShip: "₹13,950" },
  { name: "MSC Mediterranean Shipping", shipments: 32, onTime: "91.2%", avgTransit: 4.8, costPerShip: "₹15,310" },
  { name: "DTDC Express", shipments: 20, onTime: "88.0%", avgTransit: 1.8, costPerShip: "₹6,240" },
  { name: "Blue Dart Express", shipments: 20, onTime: "92.5%", avgTransit: 1.6, costPerShip: "₹5,780" },
];

const insights = [
  { color: "bg-teal-100", iconColor: "text-teal-600", title: "Shipments increased by 18.5% compared to last week.", sub: "You've shipped 24 more shipments.", icon: <MdOutlineCheckCircle size={18} /> },
  { color: "bg-blue-100", iconColor: "text-blue-600", title: "Average transit time improved by 0.8 days.", sub: "Great job! Keep it up.", icon: <MdOutlineAccessTime size={18} /> },
  { color: "bg-orange-100", iconColor: "text-orange-500", title: "Sea Freight shipments are the highest at 47.4%.", sub: "Consider optimizing air freight.", icon: <MdOutlineLocalShipping size={18} /> },
  { color: "bg-red-100", iconColor: "text-red-500", title: "10 shipments were delayed.", sub: "Check delay reasons in Shipment Tracking.", icon: <MdOutlineWarning size={18} /> },
];

const tabs = ["Overview", "Shipments", "Spend & Cost", "Vendors", "Performance", "Compliance"];

const statCards = [
  { label: "Total Shipments", value: "156", change: "+18.5%", up: true, sub: "vs 18 - 24 Apr 2025", icon: <MdOutlineLocalShipping size={20} className="text-blue-500" />, bg: "bg-blue-50", changeColor: "text-green-600" },
  { label: "Total Spend (INR)", value: "₹24.86L", change: "+12.7%", up: true, sub: "vs 18 - 24 Apr 2025", icon: <MdOutlineCurrencyRupee size={20} className="text-green-500" />, bg: "bg-green-50", changeColor: "text-green-600" },
  { label: "On-Time Delivery", value: "92.6%", change: "+4.3%", up: true, sub: "vs 18 - 24 Apr 2025", icon: <MdOutlineAccessTime size={20} className="text-purple-500" />, bg: "bg-purple-50", changeColor: "text-green-600" },
  { label: "Avg Transit Time", value: "4.2 Days", change: "+0.8 Days", up: true, sub: "vs 18 - 24 Apr", icon: <MdOutlineDirectionsCar size={20} className="text-orange-400" />, bg: "bg-orange-50", changeColor: "text-orange-500" },
  { label: "Cost per Shipment", value: "₹15,938", change: "-6.4%", up: false, sub: "vs 18 - 24 Apr 2025", icon: <MdOutlineCurrencyRupee size={20} className="text-blue-400" />, bg: "bg-blue-50", changeColor: "text-red-500" },
  { label: "Active Vendors", value: "24", change: "+14.3%", up: true, sub: "vs 18 - 24 Apr 2025", icon: <MdOutlinePeople size={20} className="text-pink-500" />, bg: "bg-pink-50", changeColor: "text-green-600" },
];

function Card({ children, className = "" }) {
  return <div className={`bg-white rounded-xl border border-gray-100 shadow-sm ${className}`}>{children}</div>;
}

function CardHeader({ title, dropdown = true }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-sm sm:text-[15px] font-bold text-[#0A2163]">{title}</h3>
      {dropdown && (
        <button className="flex items-center gap-1 text-xs text-gray-600 border border-gray-200 rounded-lg px-2.5 py-1.5 hover:bg-gray-50">
          Daily <FiChevronDown size={11} />
        </button>
      )}
    </div>
  );
}

export default function AnalyticsTrends() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="min-h-screen bg-gray-50  pt-12">
      <div className="max-w-full mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
          <div>
            <p className="text-sm text-gray-400 mb-3">Dashboard &rsaquo; Analytics &amp; Trends</p>
            <p className="text-xs sm:text-sm text-gray-500 mb-1">Track performance, identify trends, and make data-driven logistics decisions.</p>
            <h1 className="text-xl  font-bold text-gray-900">Analytics &amp; Trends</h1>
          </div>
          <div className="flex flex-wrap gap-2 items-start">
            <button className="flex items-center gap-1.5 text-xs  font-medium text-gray-700 border border-gray-300 rounded-lg px-3 py-2 bg-white hover:bg-gray-50 whitespace-nowrap">
              <MdOutlineInfo size={14} /> 25 Apr 2025 - 25 Apr 2025
            </button>
            <button className="flex items-center gap-1.5 text-xs  font-medium text-gray-700 border border-gray-300 rounded-lg px-3 py-2 bg-white hover:bg-gray-50">
              <FiFilter size={13} /> Filters
            </button>
            <button className="flex items-center gap-1.5 text-xs  font-semibold text-white bg-teal-500 hover:bg-teal-600 rounded-lg px-3 py-2 whitespace-nowrap">
              <FiDownload size={13} /> Export Report
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-5">
          {statCards.map((s, i) => (
            <Card key={i} className="p-3 sm:p-4">
              <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center mb-2`}>{s.icon}</div>
              <p className="text-xs text-gray-500 font-medium leading-tight mb-1">{s.label}</p>
              <div className="flex gap-2"> <p className="text-lg  font-bold text-gray-900 leading-tight">{s.value}</p>
              <div className="flex items-center  gap-0.5 mt-0.5">
                {s.up ? <BsArrowUpShort size={14} className={s.changeColor} /> : <BsArrowDownShort size={14} className={s.changeColor} />}
                <span className={`text-xs font-semibold ${s.changeColor}`}>{s.change}</span>
              </div> </div>
             
              <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>
            </Card>
          ))}
        </div>

        <div className="flex items-center gap-1 mb-5 border-b border-gray-200 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2.5 whitespace-nowrap border-b-2 transition-colors ${activeTab === tab ? "border-teal-500 text-teal-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
            >
              {tab}
            </button>
          ))}
          <div className="ml-auto flex-shrink-0 pb-1">
            <button className="flex items-center gap-1.5 text-xs font-medium text-gray-700 border border-gray-200 rounded-lg px-3 py-2 bg-white hover:bg-gray-50 whitespace-nowrap">
              <FiSettings size={12} /> Customize Dashboard
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <Card className="p-4">
            <CardHeader title="Shipment Over Time" />
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={shipmentOverTimeData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <XAxis dataKey="date" tick={{ fontSize: 9, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #e5e7eb" }} />
                <Line type="monotone" dataKey="current" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3, fill: "#3b82f6", strokeWidth: 0 }} />
                <Line type="monotone" dataKey="prev" stroke="#bfdbfe" strokeWidth={2} dot={{ r: 3, fill: "#bfdbfe", strokeWidth: 0 }} strokeDasharray="4 2" />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-2">
              <div className="flex items-center gap-1.5"><span className="w-5 h-0.5 bg-blue-500 inline-block rounded"></span><span className="text-xs text-gray-500">This Period</span></div>
              <div className="flex items-center gap-1.5"><span className="w-5 h-0.5 bg-blue-200 inline-block rounded"></span><span className="text-xs text-gray-500">Previous Period</span></div>
            </div>
          </Card>

          <Card className="p-4">
            <CardHeader title="Shipments by Mode" dropdown={false} />
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-shrink-0">
                <ResponsiveContainer width={130} height={130}>
                  <PieChart>
                    <Pie data={modeData} cx="50%" cy="50%" innerRadius={38} outerRadius={58} dataKey="value" paddingAngle={2}>
                      {modeData.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-lg font-bold text-gray-900">156</span>
                  <span className="text-xs text-gray-400">Total</span>
                </div>
              </div>
              <div className="space-y-1.5 w-full">
                {modeData.map((d, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <BsCircleFill size={8} style={{ color: d.color }} className="flex-shrink-0" />
                    <span className="text-xs font-medium text-gray-600">{d.name} {d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-gray-900">Top Origins</h3>
              <button className="flex items-center gap-1 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg px-2.5 py-1.5 hover:bg-gray-50">By Shipments <FiChevronDown size={11} /></button>
            </div>
            <div className="space-y-3">
              {origins.map((o, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-700 truncate max-w-[140px]">{o.name}</span>
                    <span className="text-xs font-semibold text-gray-800 ml-1 whitespace-nowrap">{o.count} ({o.pct})</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full"><div className="h-1.5 rounded-full" style={{ width: o.width, background: o.color }}></div></div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-gray-900">Top Destinations</h3>
              <button className="flex items-center gap-1 text-xs text-gray-600 border font-medium border-gray-200 rounded-lg px-2.5 py-1.5 hover:bg-gray-50">By Shipments <FiChevronDown size={11} /></button>
            </div>
            <div className="space-y-3">
              {destinations.map((d, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-700 truncate max-w-[140px]">{d.name}</span>
                    <span className="text-xs font-semibold text-gray-800 ml-1 whitespace-nowrap">{d.count} ({d.pct})</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full"><div className="h-1.5 rounded-full" style={{ width: d.width, background: d.color }}></div></div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <Card className="p-4">
            <CardHeader title="Transit Time Trend (Days)" />
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={transitTrendData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <XAxis dataKey="date" tick={{ fontSize: 9, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fill: "#9ca3af" }} axisLine={false} tickLine={false} domain={[1, 6]} ticks={[2, 4, 6]} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #e5e7eb" }} />
                <Line type="monotone" dataKey="val" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 3, fill: "#8b5cf6", strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="w-5 h-0.5 bg-purple-500 inline-block rounded"></span>
              <span className="text-xs text-gray-500">Average Transit Time (Days)</span>
            </div>
          </Card>

          <Card className="p-4">
            <CardHeader title="Spend by Category" dropdown={false} />
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-shrink-0">
                <ResponsiveContainer width={120} height={120}>
                  <PieChart>
                    <Pie data={spendData} cx="50%" cy="50%" innerRadius={35} outerRadius={55} dataKey="value" paddingAngle={2}>
                      {spendData.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-sm font-bold text-gray-900">₹24.86L</span>
                  <span className="text-[9px] text-gray-400">TOTAL</span>
                </div>
              </div>
              <div className="space-y-1.5 w-full">
                {spendData.map((d, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <BsCircleFill size={8} style={{ color: d.color }} className="flex-shrink-0" />
                    <span className="text-xs font-medium text-gray-600">{d.name} ₹{d.value}L</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <CardHeader title="Shipment Over Time" />
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={shipmentBarData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }} barSize={14}>
                <XAxis dataKey="date" tick={{ fontSize: 9, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fill: "#9ca3af" }} axisLine={false} tickLine={false} tickFormatter={v => v >= 1000 ? `${v / 1000}k` : v} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #e5e7eb" }} formatter={v => [`${(v / 1000).toFixed(0)}k`]} />
                <Bar dataKey="val" fill="#6366f1" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-4">
            <CardHeader title="Transit Time Trend (Days)" />
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={onTimeDeliveryData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <XAxis dataKey="date" tick={{ fontSize: 9, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fill: "#9ca3af" }} axisLine={false} tickLine={false} domain={[1, 6]} ticks={[2, 4, 6]} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #e5e7eb" }} />
                <Line type="monotone" dataKey="val" stroke="#14b8a6" strokeWidth={2} dot={{ r: 3, fill: "#14b8a6", strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="w-5 h-0.5 bg-teal-500 inline-block rounded"></span>
              <span className="text-xs text-gray-500">On-Time Delivery (%)</span>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr] gap-4 mb-5 ">
          <Card className="p-4 ">
            <h3 className="text-sm sm:text-[15px] font-bold text-gray-900 mb-4">Performance by Carrier (Top 5)</h3>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px]">
                <thead>
                  <tr className="border-b border-gray-100">
                    {["CARRIER", "SHIPMENTS", "ON-TIME DELIVERY", "AVG TRANSIT (DAYS)", "COST PER SHIP (INR)"].map((h, i) => (
                      <th key={i} className="text-left text-[10px] font-bold text-[#6B7280] pb-2 pr-3 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {carriers.map((c, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-3 pr-3 text-xs  text-gray-800 font-medium">{c.name}</td>
                      <td className="py-3 pr-3 text-xs text-center text-gray-700 font-semibold">{c.shipments}</td>
                      <td className="py-3 pr-3 text-xs text-center text-gray-700 font-semibold">{c.onTime}</td>
                      <td className="py-3 pr-3 text-xs text-center text-gray-700 font-semibold">{c.avgTransit}</td>
                      <td className="py-3 text-xs text-center text-gray-700 font-semibold">{c.costPerShip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4"> */}
            <Card className="p-4  flex flex-col items-center justify-start gap-7">
              <h3 className="text-sm sm:text-[15px] font-bold text-gray-900 mb-3">Shipment Status Overview</h3>
              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center gap-4">
                <div className="relative flex-shrink-0">
                  <ResponsiveContainer width={120} height={120}>
                    <PieChart>
                      <Pie data={statusData} cx="50%" cy="50%" innerRadius={38} outerRadius={56} dataKey="value" paddingAngle={2}>
                        {statusData.map((e, i) => <Cell key={i} fill={e.color} />)}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-lg font-bold text-gray-900">156</span>
                    <span className="text-xs text-gray-400">TOTAL</span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  {statusData.map((d, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <BsCircleFill size={8} style={{ color: d.color }} className="flex-shrink-0" />
                      <span className="text-xs text-gray-700">{d.name}</span>
                      <span className="text-xs font-semibold text-gray-800 ml-auto">{d.value} ({Math.round(d.value / 156 * 1000) / 10}%)</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
           
            <Card className="p-4  ">
              <div className="flex flex-col gap-6">
                  <h3 className="text-sm sm:text-[15px] font-bold text-gray-900 mb-3">Insights</h3>
              <div className="space-y-3 ">
                {insights.map((ins, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className={`w-7 h-7 rounded-full ${ins.color} ${ins.iconColor} flex items-center justify-center flex-shrink-0 mt-0.5`}>{ins.icon}</div>
                    <div>
                      <p className="text-xs font-semibold text-gray-800 leading-snug">{ins.title}</p>
                      <p className="text-xs text-gray-500">{ins.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div>
                 <button className="mt-4 w-full border border-teal-500 text-teal-600 text-xs  font-bold rounded-lg py-2.5 hover:bg-teal-50 transition-colors">View All Insights</button> </div>
               </div>
            
            </Card>
          {/* </div> */}
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3">
          <div className="flex items-center gap-2">
            <MdOutlineInfo size={15} className="text-blue-400 flex-shrink-0" />
            <p className="text-xs text-gray-500">All data is based on shipments where actuals are available. Last updated: 25 Apr 2025, 09:30 AM (IST).</p>
          </div>
          <p className="text-xs text-gray-400 whitespace-nowrap">Data is refreshed every 30 minutes.</p>
        </div>

      </div>
    </div>
  );
}