import { useState } from "react";
import { HiSparkles } from "react-icons/hi2";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  CartesianGrid,
} from "recharts";
import { PopupShell, PopupTabs, StatCard, SectionCard, DonutLegend, CHART_COLORS } from "./PopupUI";

const TABS = ["Overview", "Business Performance", "Partner analysis", "Trade Insights", "Market Intelligence"];

const growthTrend = [
  { month: "Feb", value: 12 },
  { month: "Mar", value: 15 },
  { month: "Apr", value: 14 },
  { month: "May", value: 17 },
  { month: "Jun", value: 24 },
];

const regionData = [
  { label: "Asia", value: 42.5 },
  { label: "Europe", value: 25.7 },
  { label: "North America", value: 16.3 },
  { label: "South America", value: 5.7 },
  { label: "Africa", value: 5.7 },
];

const opportunities = [
  "Rising demand in Southeast Asia",
  "Growth in renewable energy sector",
  "E-commerce logistics expansion",
  "Technology driven supply",
  "Green logistics solution",
];

const competitiveData = [
  { x: 12, y: 22, color: CHART_COLORS[0] },
  { x: 22, y: 48, color: CHART_COLORS[1] },
  { x: 30, y: 65, color: CHART_COLORS[3] },
  { x: 35, y: 30, color: CHART_COLORS[2] },
];

export default function MarketIntelligencePopup({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("Market Intelligence");

//   if (!isOpen) return null;

  return (
    <PopupShell>
      <PopupTabs tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} onClose={onClose} />

      <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 max-h-[80vh] overflow-y-auto ">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900">Market Intelligence overview</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <StatCard label="Market Growth" value="17.6%" change="2.3%" />
          <StatCard label="Market Opportunities" value="24" change="4" />
          <StatCard label="Active Competitors" value="12" change="1" />
          <StatCard label="Market Risk Index" value="3.2 / 5" change="0.3" changeColor="text-red-500" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
          <SectionCard title="Market Growth Trend">
            <div className="h-40 sm:h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={growthTrend}>
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={{ stroke: "#e5e7eb" }} tickLine={false} />
                  <YAxis
                    tick={{ fontSize: 11, fill: "#9ca3af" }}
                    axisLine={{ stroke: "#e5e7eb" }}
                    tickLine={false}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <Line type="monotone" dataKey="value" stroke="#5eead4" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>

          <SectionCard title="Market Share by Region">
            <div className="flex items-center gap-4">
              <div className="w-28 h-28 sm:w-32 sm:h-32 shrink-0 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={regionData} dataKey="value" innerRadius="65%" outerRadius="100%" stroke="none">
                      {regionData.map((_, i) => (
                        <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[10px] text-gray-500">Total</span>
                  <span className="text-xs font-semibold text-gray-900">100%</span>
                </div>
              </div>
              <DonutLegend items={regionData} />
            </div>
          </SectionCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
          <SectionCard title="Emerging Opportunities">
            <div className="space-y-2">
              {opportunities.map((item) => (
                <div
                  key={item}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-center text-sm font-medium text-gray-800"
                >
                  {item}
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Competitive Landscape">
            <div className="h-48 sm:h-56">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 10, bottom: 0, left: -10 }}>
                  <CartesianGrid stroke="#f3f4f6" />
                  <XAxis
                    type="number"
                    dataKey="x"
                    domain={[0, 40]}
                    tick={{ fontSize: 11, fill: "#9ca3af" }}
                    tickFormatter={(v) => `${v}%`}
                    axisLine={{ stroke: "#e5e7eb" }}
                    tickLine={false}
                  />
                  <YAxis
                    type="number"
                    dataKey="y"
                    domain={[0, 100]}
                    tick={{ fontSize: 11, fill: "#9ca3af" }}
                    tickFormatter={(v) => `${v}%`}
                    axisLine={{ stroke: "#e5e7eb" }}
                    tickLine={false}
                  />
                  {competitiveData.map((point, i) => (
                    <Scatter key={i} data={[point]} fill={point.color} />
                  ))}
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>
        </div>

        <div className="bg-teal-50 border border-teal-100 rounded-lg p-3 sm:p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3 min-w-0">
              <HiSparkles className="text-teal-500 mt-0.5 shrink-0" size={18} />
              <div>
                <p className="text-sm font-semibold text-gray-900">Market showing strong growth and new opportunities.</p>
                <p className="text-xs sm:text-sm text-green-600 font-medium">Stay Ahead with data-driven insights.</p>
              </div>
            </div>
            <div className="hidden sm:flex w-14 h-14 rounded-lg bg-gradient-to-br from-teal-100 to-teal-50 items-center justify-center shrink-0">
              <HiSparkles className="text-teal-500" size={24} />
            </div>
          </div>
          <div className="flex items-center gap-2 pt-2 border-t border-teal-100">
            <HiSparkles className="text-teal-500" size={14} />
            <p className="text-sm font-semibold text-gray-900">Market Intelligence Summary</p>
          </div>
        </div>
      </div>
    </PopupShell>
  );
}