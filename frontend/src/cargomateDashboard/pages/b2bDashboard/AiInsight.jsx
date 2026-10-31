import React, { useState } from "react";
import ReactCountryFlag from "react-country-flag";
import {
  CalendarDays,
  Download,
  ChevronDown,
  Lightbulb,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  Zap,
  Sparkles,
  Square,
  Users,
  ShieldAlert,
  MapPin,
  Box,
  Plus,
  Minus,
  RotateCw,
  Info,
  HelpCircle,
} from "lucide-react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ExportReport from "../../components/b2bComponent/ExportReport";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from "recharts";

const HEADING = "text-[#07156B]";

const COUNTRY_CODES = { USA: "US", India: "IN", Germany: "DE", Vietnam: "VN", Mexico: "MX", Poland: "PL" };

function Flag({ country, size = 13 }) {
  return (
    <ReactCountryFlag
      countryCode={COUNTRY_CODES[country] || "US"}
      svg
      style={{ width: size, height: size, borderRadius: "2px" }}
    />
  );
}

function ConfidenceBadge({ level }) {
  const styles = {
    High: "bg-green-100 text-green-600",
    Medium: "bg-amber-100 text-amber-600",
    Low: "bg-slate-100 text-slate-500",
  };
  return <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${styles[level]}`}>{level}</span>;
}

const KPI_STATS = [
  { title: "Top Insight", desc: "Electronics & Electrical category showing highest growth potential.", link: "View Details", icon: Lightbulb, bg: "bg-blue-50", color: "text-blue-500" },
  { title: "Growth Opportunities", value: "356", desc: "High potential opportunities", link: "View Opportunities", icon: TrendingUp, bg: "bg-emerald-50", color: "text-emerald-500" },
  { title: "Risk Alerts", value: "18", desc: "High risk alerts detected", link: "View Alerts", icon: AlertTriangle, bg: "bg-rose-50", color: "text-rose-500" },
  { title: "Market Predictions", value: "6", desc: "Key predictions for next months", link: "View Predictions", icon: BarChart3, bg: "bg-teal-50", color: "text-teal-500" },
  { title: "AI Confidence Score", value: "92%", desc: "Overall AI model accuracy", link: "Learn More", icon: CheckCircle2, bg: "bg-blue-50", color: "text-blue-500" },
  { title: "Data Signals Analyzed", value: "2.4M+", desc: "Trade events & signals", link: "View Data Coverage", icon: Zap, bg: "bg-purple-50", color: "text-purple-500" },
];

const TABS = ["Smart Summary", "Opportunity Insights", "Market Predictions", "Risk Insights", "Price Insights"];

const SMART_SUMMARY = [
  { icon: Sparkles, bg: "bg-emerald-50", color: "text-emerald-600", text: "Global trade value is predicted to grow by 12.6% in next 3 months, driven by Electronics, Machinery & Pharmaceuticals." },
  { icon: Square, bg: "bg-emerald-50", color: "text-emerald-600", text: "USA, India and Germany are the top growth markets with strong import demand." },
  { icon: Square, bg: "bg-emerald-50", color: "text-emerald-600", text: "853 new HS codes show emerging demand with low competition." },
  { icon: Sparkles, bg: "bg-purple-50", color: "text-purple-600", text: "Freight cost likely to decrease by 6-8% on major Asia-Europe routes." },
  { icon: ShieldAlert, bg: "bg-rose-50", color: "text-rose-600", text: "23 suppliers flagged for risk due to financial instability or geopolitical exposure." },
];

const GROWTH_OPPORTUNITIES = [
  { rank: 1, name: "Smart Phones (8517)", score: 92 },
  { rank: 2, name: "Lithium Batteries (8507)", score: 89 },
  { rank: 3, name: "Industrial Robots (8479)", score: 87 },
  { rank: 4, name: "Solar Panels (8541)", score: 84 },
  { rank: 5, name: "Medical Devices (9018)", score: 82 },
];

const HEATMAP_COUNTRIES = [
  { id: "russia", color: "#EF4444", points: "583,60 650,42 750,45 850,50 950,70 972,90 950,120 850,125 700,120 600,110" },
  { id: "china", color: "#F59E0B", points: "708,120 760,103 830,108 875,140 860,180 820,200 760,190 715,160" },
  { id: "usa", color: "#10B981", points: "153,130 200,114 260,118 314,130 300,160 280,181 220,175 170,160" },
  { id: "brazil", color: "#3B82F6", points: "294,236 330,230 370,240 406,260 400,300 380,344 340,330 300,300 290,260" },
  { id: "iran", color: "#F87171", points: "622,150 645,139 675,150 670,175 645,181 625,170" },
];

const HEATMAP_LEGEND = [
  { label: "Very High", color: "#EF4444" },
  { label: "High", color: "#F87171" },
  { label: "Medium", color: "#F59E0B" },
  { label: "Low", color: "#10B981" },
  { label: "Very Low / Stable", color: "#3B82F6" },
  { label: "No Data", color: "#CBD5E1" },
];

const MARKET_PREDICTIONS = [
  { name: "Electronics & Electrical", growth: "15.8%", up: true, confidence: "High" },
  { name: "Machinery & Parts", growth: "12.4%", up: true, confidence: "High" },
  { name: "Pharmaceuticals", growth: "10.7%", up: true, confidence: "Medium" },
  { name: "Textiles & Apparel", growth: "6.6%", up: true, confidence: "Medium" },
  { name: "Metals & Minerals", growth: "-2.3%", up: false, confidence: "Low" },
];

const RADAR_AXES = ["Political", "Economic", "Regulatory", "Security", "Supply Chain", "Compliance"];
const RADAR_DATA = RADAR_AXES.map((axis, i) => ({
  axis,
  A: [70, 60, 55, 65, 70, 60][i],
  B: [50, 70, 60, 40, 55, 65][i],
  C: [60, 45, 70, 55, 40, 50][i],
  D: [40, 55, 45, 60, 50, 45][i],
  E: [65, 50, 40, 70, 60, 55][i],
}));
const RADAR_SERIES = [
  { key: "A", color: "#14B8A6" },
  { key: "B", color: "#EC4899" },
  { key: "C", color: "#F97316" },
  { key: "D", color: "#FACC15" },
  { key: "E", color: "#EF4444" },
];
const RADAR_LEGEND = [
  { label: "High (70-100)", color: "#EF4444" },
  { label: "Medium (40-69)", color: "#F59E0B" },
  { label: "Low (0-39)", color: "#10B981" },
];

const PRICE_TRENDS = [
  { name: "Crude Oil (2709)", prediction: "-4.2%", up: false, confidence: "High", trend: [8, 6, 7, 5, 4, 3] },
  { name: "Copper (7403)", prediction: "+5.6%", up: true, confidence: "Medium", trend: [3, 4, 4, 5, 6, 7] },
  { name: "Aluminium (7601)", prediction: "+3.1%", up: true, confidence: "Medium", trend: [4, 4, 5, 5, 6, 6] },
  { name: "Wheat (1001)", prediction: "-2.0%", up: false, confidence: "Medium", trend: [7, 6, 6, 5, 5, 4] },
  { name: "Plastic Resin (3901)", prediction: "+1.8%", up: true, confidence: "Low", trend: [4, 5, 4, 5, 6, 6] },
];

const RECOMMENDED_ACTIONS = [
  { icon: Box, bg: "bg-purple-50", color: "text-purple-600", text: "Explore 128 high potential opportunities in Electronics & Machinery categories.", link: "View Opportunities" },
  { icon: Users, bg: "bg-emerald-50", color: "text-emerald-600", text: "Consider sourcing from Vietnam, Mexico & Poland for better cost advantage.", link: "View Suppliers" },
  { icon: TrendingDown, bg: "bg-teal-50", color: "text-teal-600", text: "Hedge against price volatility in metals & energy commodities.", link: "View Price Insights" },
  { icon: ShieldAlert, bg: "bg-rose-50", color: "text-rose-600", text: "Monitor 18 high risk countries and diversify your supply chain.", link: "View Risk Alerts" },
  { icon: MapPin, bg: "bg-orange-50", color: "text-orange-600", text: "Focus on emerging markets in Africa & LATAM for expansion.", link: "View Markets" },
];

function SectionCard({ children, className = "" }) {
  return (
    <div className={`bg-white border border-slate-100 rounded-2xl p-4 shadow-xs ${className}`}>
      {children}
    </div>
  );
}

function ViewAllHeader({ title }) {
  return (
    <div className="flex justify-between items-center mb-3">
      <h3 className={`font-bold text-sm ${HEADING}`}>{title}</h3>
      <button className="text-blue-600 text-[11px] font-bold shrink-0">View All</button>
    </div>
  );
}

export default function AIInsightsDashboard() {
  const [activeTab, setActiveTab] = useState("Smart Summary");
   const [shipmentStartDate, setShipmentStartDate] = useState(null);
    const [shipmentEndDate, setShipmentEndDate] = useState(null);
     const [dateRange, setDateRange] = useState(false)
     const [exportReport, setExportReport] = useState(false)

  return (
    <div className="min-h-screen w-full overflow-y-auto bg-[#F8FAFC] text-slate-600  antialiased pt-10">
      <div className="max-w-[1400px] mx-auto p-3 sm:p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">
          <div>
            <h1 className={`text-xl sm:text-2xl font-bold tracking-tight ${HEADING}`}>AI Insights</h1>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
              AI-powered insights to help make smarter trade decisions.
            </p>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:flex-none">
                         <DatePicker
                           selected={shipmentStartDate}
                           onChange={(dates) => {
                             const [start, end] = dates;
                             setShipmentStartDate(start);
                             setShipmentEndDate(end);
                           }}
                           startDate={shipmentStartDate}
                           endDate={shipmentEndDate}
                           selectsRange
                           dateFormat="dd MMM yyyy"
                           placeholderText="01 Apr 2025 - 24 Apr 2025"
                           className={`bg-white border border-slate-200 text-[11px] sm:text-xs font-semibold pl-3 pr-9 py-2 rounded-xl shadow-xs hover:bg-slate-50 transition whitespace-nowrap outline-none cursor-pointer ${HEADING}`}
                         />
                         <CalendarDays
                           size={14}
                           className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                         />
                       </div>
                       <button onClick={() => setExportReport(true)} className={`flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-slate-200 text-[11px] sm:text-xs font-semibold px-3 sm:px-4 py-2 rounded-xl shadow-xs hover:bg-slate-50 transition whitespace-nowrap ${HEADING}`}>
                         <Download size={14} className="text-slate-400" />
                         Export Report
                       </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 mb-5">
          {KPI_STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white border border-slate-100 p-3.5 rounded-2xl shadow-xs hover:shadow-md transition duration-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${stat.bg} ${stat.color}`}>
                    <Icon size={15} />
                  </div>
                  <h4 className={`text-[12px] font-bold ${HEADING}`}>{stat.title}</h4>
                </div>
                {stat.value && <div className={`text-lg font-black mb-1 ${HEADING}`}>{stat.value}</div>}
                <p className="text-[11px] text-slate-500 leading-snug mb-2">{stat.desc}</p>
                {/* <button className="text-blue-600 text-[11px] font-bold">{stat.link} →</button> */}
              </div>
            );
          })}
        </div>

        <div className="border-b border-slate-200 mb-5">
          <div className="flex gap-5 sm:gap-7 overflow-x-auto scrollbar-none">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2.5 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors relative ${
                  activeTab === tab ? "text-blue-600" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab}
                {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 rounded-full" />}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-5">
         {activeTab === "Smart Summary" &&  ( <SectionCard>
            <div className="flex items-center gap-1.5 mb-1">
              <Sparkles size={14} className="text-blue-500" />
              <h3 className={`font-bold text-sm ${HEADING}`}>AI Smart Summary</h3>
            </div>
            <p className="text-[11px] text-slate-400 mb-3">Key takeaways based on AI analysis of global trade data.</p>
            <div className="space-y-3">
              {SMART_SUMMARY.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i} className="flex items-start gap-2.5 pb-3 border-b border-slate-50 last:border-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${s.bg} ${s.color}`}>
                      <Icon size={14} />
                    </div>
                    <p className="text-[11px] text-slate-600 font-medium leading-snug">{s.text}</p>
                  </div>
                );
              })}
            </div>
            {/* <button className="text-blue-600 text-xs font-bold mt-2">View Full AI Summary →</button> */}
          </SectionCard> )}

        {activeTab ===  "Opportunity Insights"  && ( <SectionCard>
            <ViewAllHeader title="Top Growth Opportunities (AI Score)" />
            <div className="space-y-3">
              {GROWTH_OPPORTUNITIES.map((o, i) => (
                <div key={i} className="flex items-center justify-between text-[12px]">
                  <span className="font-semibold text-slate-700">{o.rank}. {o.name}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-14 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${o.score}%` }} />
                    </div>
                    <span className={`font-bold w-6 text-right ${HEADING}`}>{o.score}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-3 mt-4">
              <h4 className={`font-bold text-[12px] mb-1 ${HEADING}`}>Why these opportunities?</h4>
              <p className="text-[11px] text-slate-500 leading-snug">
                High demand growth, low competition, favorable market conditions & supplier availability.
              </p>
            </div>
          </SectionCard> )}

          {activeTab ===  "Opportunity Insights"  && ( <SectionCard>
            <div className="flex justify-between items-center mb-3">
              <h3 className={`font-bold text-sm ${HEADING}`}>AI Opportunity Heatmap</h3>
              <button className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold text-slate-600 shrink-0">
                Countries <ChevronDown size={12} className="text-slate-400" />
              </button>
            </div>
            <div className="relative h-[260px] sm:h-[300px] bg-slate-50 rounded-xl overflow-hidden border border-slate-100">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg"
                alt="world map"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: "grayscale(1) brightness(0) invert(0.85)" }}
              />
              <svg viewBox="0 0 1000 500" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
                {HEATMAP_COUNTRIES.map((c) => (
                  <polygon key={c.id} points={c.points} fill={c.color} opacity={0.92} />
                ))}
              </svg>
              <div className="absolute bottom-2 left-2 bg-white/95 rounded-lg p-2 shadow border border-slate-100">
                <span className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Risk Level</span>
                <div className="space-y-0.5">
                  {HEATMAP_LEGEND.map((l, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[9px] text-slate-500 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: l.color }} />
                      {l.label}
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute bottom-2 right-2 flex flex-col gap-1">
                <button className="w-6 h-6 bg-white rounded-md shadow flex items-center justify-center text-slate-500">
                  <Plus size={12} />
                </button>
                <button className="w-6 h-6 bg-white rounded-md shadow flex items-center justify-center text-slate-500">
                  <Minus size={12} />
                </button>
                <button className="w-6 h-6 bg-white rounded-md shadow flex items-center justify-center text-slate-500">
                  <RotateCw size={11} />
                </button>
              </div>
            </div>
          </SectionCard> )}

        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-5">
        {activeTab === "Market Predictions" && ( <SectionCard>
            <ViewAllHeader title="Market Prediction (Next 3 Months)" />
            <div className="overflow-x-auto">
              <table className="w-full text-[11px] min-w-[280px]">
                <thead>
                  <tr className="text-[9px] text-slate-400 uppercase font-bold">
                    <th className="text-left pb-2 font-bold">Category</th>
                    <th className="text-center pb-2 font-bold">Trend</th>
                    <th className="text-right pb-2 font-bold">Growth</th>
                    <th className="text-right pb-2 pl-3 font-bold">Confidence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {MARKET_PREDICTIONS.map((m, i) => (
                    <tr key={i}>
                      <td className={`py-2.5 font-semibold whitespace-nowrap ${HEADING}`}>{m.name}</td>
                      <td className="py-2.5 text-center">
                        {m.up ? (
                          <TrendingUp size={14} className="text-emerald-500 inline" />
                        ) : (
                          <TrendingDown size={14} className="text-rose-500 inline" />
                        )}
                      </td>
                      <td className={`py-2.5 text-right font-bold whitespace-nowrap ${m.up ? "text-emerald-500" : "text-rose-500"}`}>
                        {m.up ? "▲" : "▼"} {m.growth}
                      </td>
                      <td className="py-2.5 text-right pl-3"><ConfidenceBadge level={m.confidence} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>)} 

         {activeTab === "Risk Insights" && ( <SectionCard>
            <h3 className={`font-bold text-sm mb-3 ${HEADING}`}>AI Risk Radar</h3>
            <div className="h-[240px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={RADAR_DATA} outerRadius="75%">
                  <PolarGrid stroke="#E2E8F0" />
                  <PolarAngleAxis dataKey="axis" tick={{ fill: "#94a3b8", fontSize: 9 }} />
                  {RADAR_SERIES.map((s) => (
                    <Radar key={s.key} dataKey={s.key} stroke={s.color} fill={s.color} fillOpacity={0.25} strokeWidth={1.5} />
                  ))}
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-3 justify-center mt-2">
              {RADAR_LEGEND.map((l, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[10px] text-slate-500 font-semibold">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: l.color }} />
                  {l.label}
                </div>
              ))}
            </div>
          </SectionCard> )}

         {activeTab === "Price Insights" && (  <SectionCard>
            <ViewAllHeader title="Price Trend Insights (AI)" />
            <div className="overflow-x-auto">
              <table className="w-full text-[11px] min-w-[300px]">
                <thead>
                  <tr className="text-[9px] text-slate-400 uppercase font-bold">
                    <th className="text-left pb-2 font-bold">Product</th>
                    <th className="text-center pb-2 font-bold">Trend</th>
                    <th className="text-right pb-2 font-bold">Prediction</th>
                    <th className="text-right pb-2 pl-3 font-bold">Confidence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {PRICE_TRENDS.map((p, i) => (
                    <tr key={i}>
                      <td className={`py-2.5 font-semibold whitespace-nowrap ${HEADING}`}>{p.name}</td>
                      <td className="py-2.5 w-16">
                        <ResponsiveContainer width="100%" height={22}>
                          <LineChart data={p.trend.map((v) => ({ v }))}>
                            <Line type="monotone" dataKey="v" stroke={p.up ? "#10B981" : "#EF4444"} strokeWidth={1.5} dot={false} />
                          </LineChart>
                        </ResponsiveContainer>
                      </td>
                      <td className={`py-2.5 text-right font-bold whitespace-nowrap ${p.up ? "text-emerald-500" : "text-rose-500"}`}>
                        {p.up ? "▲" : "▼"} {p.prediction}
                      </td>
                      <td className="py-2.5 text-right pl-3"><ConfidenceBadge level={p.confidence} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard> )}
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-1.5 mb-3">
            <Sparkles size={15} className="text-blue-500" />
            <h3 className={`font-bold text-sm ${HEADING}`}>AI Recommended Actions</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {RECOMMENDED_ACTIONS.map((a, i) => {
              const Icon = a.icon;
              return (
                <div key={i} className="bg-white border border-slate-100 rounded-2xl p-3.5 shadow-xs">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2.5 ${a.bg} ${a.color}`}>
                    <Icon size={16} />
                  </div>
                  <p className="text-[11px] text-slate-600 font-medium leading-snug mb-2.5">{a.text}</p>
                  {/* <button className="text-blue-600 text-[11px] font-bold">{a.link} →</button> */}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-t border-slate-200 pt-3 pb-2">
          <span className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium">
            <Info size={12} /> All data is updated daily. Last updated on 24 Apr 2025, 09:30 AM
          </span>
          <span className="flex items-center gap-1.5 text-[10px] text-slate-500 font-semibold cursor-pointer">
            <HelpCircle size={12} /> Help Center
          </span>
        </div>
      </div>

       {exportReport && (
                  <ExportReport onClose={() => setExportReport(false)} />
                )}

    </div>
  );
}