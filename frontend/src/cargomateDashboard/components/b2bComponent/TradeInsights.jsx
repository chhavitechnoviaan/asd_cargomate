import { useState } from "react";
import { FiX, FiChevronDown, FiTrendingUp } from "react-icons/fi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { PopupShell, StatCard, SectionCard, DonutLegend, ListRow, CHART_COLORS } from "./PopupUI";
import DateFilterDropdown from "./DateFilterDropdown";

const trendData = [
  { month: "Feb", value: 1400 },
  { month: "Mar", value: 1800 },
  { month: "Apr", value: 1200 },
  { month: "May", value: 2300 },
  { month: "Jun", value: 1700 },
];

const categoryData = [
  { label: "Electronics", value: 35.6 },
  { label: "Textiles", value: 24.8 },
  { label: "Machinery", value: 18.7 },
  { label: "Chemicals", value: 12.9 },
  { label: "Others", value: 8.0 },
];

const exportMarkets = [
  { flag: "🇺🇸", name: "United States", amount: "₹452.30 Cr", change: "18.6%" },
  { flag: "🇩🇪", name: "Germany", amount: "₹312.75 Cr", change: "15.3%" },
  { flag: "🇬🇧", name: "United Kingdom", amount: "₹245.60 Cr", change: "13.2%" },
  { flag: "🇦🇪", name: "UAE", amount: "₹198.90 Cr", change: "11.7%" },
  { flag: "🇸🇬", name: "Singapore", amount: "₹156.40 Cr", change: "9.8%" },
];

const importSources = [
  { flag: "🇨🇳", name: "China", amount: "₹512.40 Cr", change: "19.4%" },
  { flag: "🇺🇸", name: "USA", amount: "₹312.80 Cr", change: "16.1%" },
  { flag: "🇩🇪", name: "Germany", amount: "₹245.30 Cr", change: "14.2%" },
  { flag: "🇯🇵", name: "Japan", amount: "₹198.50 Cr", change: "11.3%" },
  { flag: "🇰🇷", name: "South Korea", amount: "₹156.20 Cr", change: "9.8%" },
];

export default function TradeInsightsPopup({ isOpen, onClose, onRangeSelect }) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [range, setRange] = useState("This Month");

  if (!isOpen) return null;

  return (
    <PopupShell>
      <div className="flex items-center justify-between px-4 sm:px-6 pt-4 sm:pt-5">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900">Trade Insights Overview</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setFilterOpen((v) => !v)}
              className="flex items-center gap-1.5 border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
            >
              {range}
              <FiChevronDown size={14} />
            </button>
            {filterOpen && (
              <DateFilterDropdown
                onSelect={(val) => {
                  setRange(val);
                  setFilterOpen(false);
                  onRangeSelect && onRangeSelect(val);
                }}
                onClose={() => setFilterOpen(false)}
              />
            )}
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <FiX size={20} />
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <StatCard label="Total Trade Value" value="₹1,876.45 Cr" change="17.6%" />
          <StatCard label="Total Shipment" value="6,240" change="12.4%" />
          <StatCard label="Avg. Shipment Value" value="₹30.12 L" change="5.3%" />
          <StatCard label="Growth Rate" value="17.6%" change="17.6%" />
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
          <SectionCard title="Top Export Market">
            <div className="divide-y divide-gray-100">
              {exportMarkets.map((item) => (
                <ListRow
                  key={item.name}
                  left={
                    <>
                      <span className="text-base">{item.flag}</span>
                      <span className="text-sm text-gray-800 truncate">{item.name}</span>
                    </>
                  }
                  right={item.amount}
                  rightSub={`▲ ${item.change}`}
                />
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Top Import Sources">
            <div className="divide-y divide-gray-100">
              {importSources.map((item) => (
                <ListRow
                  key={item.name}
                  left={
                    <>
                      <span className="text-base">{item.flag}</span>
                      <span className="text-sm text-gray-800 truncate">{item.name}</span>
                    </>
                  }
                  right={item.amount}
                  rightSub={`▲ ${item.change}`}
                />
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