import { useState } from "react";
import { FaPlane } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

import {
  FiX,
  FiTruck,
  FiCalendar,
  FiChevronDown,
  FiInfo,
  FiWifi,
  FiMapPin,
  FiBox,
  FiCheck,
  FiDownload,
  FiAlertTriangle,
  FiEdit3,
  FiLink2,
  FiArrowLeft,
  FiSave,
  FiPlus,
  FiCopy,
  FiStar,
  FiTrendingUp,
  FiDatabase,
  FiAlertCircle,
  FiAnchor,
  FiCpu,
  FiHash,
  FiGift,
  FiMap,
  FiFile,
  FiPackage,
  FiRadio,
  FiFileText,
  FiUsers,
  FiBookmark,
  FiClipboard,
  FiBarChart2,
  FiCreditCard,
  FiBell,
  FiHelpCircle,
  FiSettings,
  FiChevronRight,
  FiShare2,
  FiSend,
  FiClock,
  FiDollarSign,
  FiAward,
  FiShoppingCart,
  FiFolder,
  FiPercent,
  FiShield,
  FiZap,
  FiEye,
  FiCheckCircle,
  FiExternalLink,
  FiUploadCloud,
  FiPhone,
  FiSearch,
  FiMail,
  FiSun,
  FiUser,
  FiGlobe,
  FiMessageSquare,
} from "react-icons/fi";

const summaryCards = [
  { label: "Total Insights", value: 25, sub: "Key Takeaways", icon: HiSparkles, color: "text-green-600 bg-green-50" },
  { label: "Growth Insights", value: 12, sub: "Positive Indicators", subLink: true, icon: FiTrendingUp, color: "text-green-600 bg-green-50" },
  { label: "Market Insights", value: 6, sub: "Market Intelligence", icon: FiSun, color: "text-purple-600 bg-purple-50" },
  { label: "Risk Insights", value: 5, sub: "Risk & Alerts", icon: FiShield, color: "text-orange-600 bg-orange-50" },
  { label: "Actionable Insights", value: 8, sub: "Recommended actions", icon: FiCopy, color: "text-blue-600 bg-blue-50" },
];
 
const filterTabs = ["Total Insights (25)", "Growth (12)", "Market (6)", "Risk (5)", "Actionable (8)"];


const insights = [
  {
    icon: HiSparkles,
    color: "text-green-600 bg-green-50",
    title: "Global trade value is predicted to grow by 12.6% in next 3 months.",
    desc: "Growth driven by Electronics, Machinery & Pharmaceuticals.",
    category: "Growth",
    categoryColor: "text-green-600",
    impact: "High",
    impactColor: "text-green-600",
    date: "25 Apr 2025",
  },
  {
    icon: FiTrendingUp,
    color: "text-green-600 bg-green-50",
    title: "USA, India and Germany are the top growth markets.",
    desc: "Strong import demand expected in Q2 & Q3.",
    category: "Growth",
    categoryColor: "text-green-600",
    impact: "High",
    impactColor: "text-green-600",
    date: "24 Apr 2025",
  },
  {
    icon: FiTrendingUp,
    color: "text-green-600 bg-green-50",
    title: "853 new HS codes show emerging demand with low competition.",
    desc: "High export potential across multiple product categories.",
    category: "Market",
    categoryColor: "text-purple-600",
    impact: "Medium",
    impactColor: "text-orange-500",
    date: "23 Apr 2025",
  },
  {
    icon: HiSparkles,
    color: "text-purple-600 bg-purple-50",
    title: "Freight cost likely to decrease by 6-8% on major Asia-Europe routes.",
    desc: "Improvement due to easing fuel prices and higher vessel availability.",
    category: "Market",
    categoryColor: "text-purple-600",
    impact: "Medium",
    impactColor: "text-orange-500",
    date: "23 Apr 2025",
  },
  {
    icon: FiShield,
    color: "text-orange-600 bg-orange-50",
    title: "23 suppliers flagged for risk due to financial instability.",
    desc: "High credit risk and geopolitical exposure detected.",
    category: "Risk",
    categoryColor: "text-red-600",
    impact: "High",
    impactColor: "text-red-600",
    date: "22 Apr 2025",
  },
  {
    icon: FiShield,
    color: "text-orange-600 bg-orange-50",
    title: "Geopolitical tensions affecting 12 countries may impact trade.",
    desc: "Monitor policy changes and cross-border compliance.",
    category: "Risk",
    categoryColor: "text-red-600",
    impact: "High",
    impactColor: "text-red-600",
    date: "22 Apr 2025",
  },
  {
    icon: HiSparkles,
    color: "text-orange-600 bg-orange-50",
    title: "Increase in green energy solutions trade opportunities.",
    desc: "Rising demand for solar, wind, and EV components.",
    category: "Actionable",
    categoryColor: "text-blue-600",
    impact: "High",
    impactColor: "text-green-600",
    date: "22 Apr 2025",
  },
  {
    icon: FiCopy,
    color: "text-blue-600 bg-blue-50",
    title: "Diversify suppliers in critical sectors to reduce risk.",
    desc: "Focus on alternate sourcing in Electronics & Chemicals.",
    category: "Actionable",
    categoryColor: "text-blue-600",
    impact: "Medium",
    impactColor: "text-orange-500",
    date: "21 Apr 2025",
  },
];
 

export default function AISmartSummary({ onClose }) {
  const [activeTab, setActiveTab] = useState(filterTabs[0]);
 
  return (
    <div className="fixed inset-0 z-50 bg-black/80 overflow-y-auto p-3 sm:p-6 flex items-start justify-center">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl mt-2 sm:mt-6 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gray-200 shrink-0" />
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                AI Smart Summary
              </h2>
              <p className="text-sm text-gray-500">
                Detailed key takeaways based on AI analysis of global trade data.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button className="inline-flex items-center gap-2 border border-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg">
              <FiDownload size={14} />
              Export
            </button>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <FiX size={20} />
            </button>
          </div>
        </div>
 
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {summaryCards.map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.label} className="border border-gray-200 rounded-xl p-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${c.color}`}>
                  <Icon size={14} />
                </div>
                <p className="text-xl font-extrabold text-gray-900 mt-2">{c.value}</p>
                <p className="text-xs text-gray-500">{c.label}</p>
                {c.subLink ? (
                  <p className="text-xs text-blue-600 underline mt-0.5">{c.sub}</p>
                ) : (
                  <p className="text-xs text-gray-400 mt-0.5">{c.sub}</p>
                )}
              </div>
            );
          })}
        </div>
 
        <div className="mt-5 flex flex-wrap gap-2">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-sm font-medium px-4 py-1.5 rounded-full border ${
                activeTab === tab
                  ? "bg-blue-50 text-blue-600 border-blue-200"
                  : "bg-white text-gray-600 border-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
 
        <div className="mt-5 overflow-x-auto">
          <div className="min-w-[640px]">
            <div className="grid grid-cols-[1fr_120px_120px_120px] bg-gray-50 rounded-t-lg px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase">
              <span>Insights</span>
              <span>Category</span>
              <span>Impact</span>
              <span>Date</span>
            </div>
            <div className="divide-y divide-gray-100">
              {insights.map((i) => {
                const Icon = i.icon;
                return (
                  <div
                    key={i.title}
                    className="grid grid-cols-[1fr_120px_120px_120px] px-4 py-3 items-start"
                  >
                    <div className="flex gap-3 pr-4">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${i.color}`}>
                        <Icon size={13} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{i.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{i.desc}</p>
                      </div>
                    </div>
                    <span className={`text-sm font-medium ${i.categoryColor}`}>{i.category}</span>
                    <span className={`text-sm font-medium ${i.impactColor}`}>{i.impact}</span>
                    <span className="text-sm text-gray-500">{i.date}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
 
        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="border border-gray-200 text-gray-700 text-sm font-medium px-6 py-2.5 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}