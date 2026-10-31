import { useState } from "react";
import { FiTrendingUp } from "react-icons/fi";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { PopupShell, PopupTabs, StatCard, SectionCard, DonutLegend, CHART_COLORS } from "./PopupUI";

const TABS = ["Overview", "Business Performance", "Partner analysis", "Trade Insights", "Market Intelligence"];

const trendData = [
  { month: "Feb", value: 1400 },
  { month: "Mar", value: 1800 },
  { month: "Apr", value: 1200 },
  { month: "May", value: 2300 },
  { month: "Jun", value: 1700 },
];

const categoryData = [
  { label: "Asia", value: 35.6 },
  { label: "Europe", value: 24.8 },
  { label: "North East", value: 18.7 },
  { label: "America", value: 12.9 },
  { label: "Africa", value: 8.0 },
];

const metrics = [
  { label: "On-Time Shipments", value: 97.2, change: "2.6%", bar: "bg-green-500" },
  { label: "Shipment Accuracy", value: 98.6, change: "1.9%", bar: "bg-red-400" },
  { label: "Document Compliance", value: 99.1, change: "1.4%", bar: "bg-blue-500" },
  { label: "Repeat Business Rate", value: 81.3, change: "3.8%", bar: "bg-green-500" },
  { label: "Customer Satisfaction", value: 96, display: "4.8 / 5", change: "0.4", bar: "bg-red-400" },
];

const clients = [
  { name: "ABC Exports Pvt. Ltd.", amount: "₹245.30 Cr", change: "21.4%" },
  { name: "Global Supplies Inc.", amount: "₹198.60 Cr", change: "17.8%" },
  { name: "Omega Traders", amount: "₹162.75 Cr", change: "15.2%" },
  { name: "Shree Impex", amount: "₹148.20 Cr", change: "13.6%" },
  { name: "Prime Logistics LLP", amount: "₹126.80 Cr", change: "10.9%" },
];

export default function BusinessPerformancePopup({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("Business Performance");

  if (!isOpen) return null;

  return (
    <PopupShell>
      <PopupTabs tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} onClose={onClose} />

      <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900">Business Performance Overview</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <StatCard label="Total Revenue" value="₹2,487.65 Cr" change="18.4%" />
          <StatCard label="Total Shipments" value="8,542" change="12.8%" />
          <StatCard label="Active Clients" value="326" change="9.6%" />
          <StatCard label="Profit Margin" value="24.8%" change="3.4%" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
          <SectionCard title="Trade Value Trend (INR)">
            <div className="h-40 sm:h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                  <Line type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>

          <SectionCard title="Trade Value By Category">
            <div className="flex items-center gap-4">
              <div className="w-28 h-28 sm:w-32 sm:h-32 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={categoryData} dataKey="value" innerRadius="65%" outerRadius="100%" stroke="none">
                      {categoryData.map((_, i) => (
                        <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <DonutLegend items={categoryData} />
            </div>
          </SectionCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
          <SectionCard title="Performance Metrics">
            <div className="space-y-3">
              {metrics.map((m) => (
                <div key={m.label}>
                  <div className="flex items-center justify-between text-xs sm:text-sm mb-1">
                    <span className="text-gray-700">{m.label}</span>
                    <span className="text-gray-900 font-semibold">
                      {m.display || `${m.value}%`}{" "}
                      <span className={m.bar === "bg-red-400" ? "text-red-500" : "text-green-600"}>
                        ▲ {m.change}
                      </span>
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${m.bar}`} style={{ width: `${m.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Top Performing Clients">
            <div className="divide-y divide-gray-100">
              {clients.map((c) => (
                <div key={c.name} className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-800 truncate">{c.name}</span>
                  <div className="text-right shrink-0 ml-2">
                    <p className="text-sm font-semibold text-gray-900">{c.amount}</p>
                    <p className="text-xs font-medium text-green-600">▲ {c.change}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        <div className="flex items-center justify-between bg-blue-50 border border-blue-100 rounded-lg p-3 sm:p-4">
          <div className="flex items-start gap-3 min-w-0">
            <FiTrendingUp className="text-blue-500 mt-0.5 shrink-0" size={18} />
            <div>
              <p className="text-sm font-semibold text-gray-900">Recent Insights</p>
              <p className="text-xs sm:text-sm text-gray-600">Strong growth in revenue and shipment this month.</p>
              <p className="text-xs sm:text-sm text-green-600 font-medium">Your business performance is above target!</p>
            </div>
          </div>
          <div className="hidden sm:flex w-14 h-14 rounded-lg bg-gradient-to-br from-blue-100 to-blue-50 items-center justify-center shrink-0">
            <FiTrendingUp className="text-blue-500" size={24} />
          </div>
        </div>
      </div>
    </PopupShell>
  );
}