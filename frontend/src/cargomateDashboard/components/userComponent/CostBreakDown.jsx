import { useState } from "react";
import ModalShell from "./ModalShell";
 
import {
  FiX,FiUser ,
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
  FiMail,FiBriefcase ,
  FiSun,
} from "react-icons/fi";


const chargeGroups = [
  {
    key: "ocean",
    title: "Ocean Freight",
    amount: "$2,450.00",
    color: "text-teal-600 bg-teal-50",
    items: [
      { label: "Basic Ocean Freight", desc: "Nhava Sheva Singapore", amount: "$2,100.00" },
      { label: "BAF (Bunker Adjustment Factor)", desc: "Apr 2025", amount: "$180.00" },
      { label: "CAF (Currency Adjustment Factor)", desc: "Apr 2025", amount: "$170.00" },
    ],
  },
  {
    key: "destination",
    title: "Charges at Destination",
    amount: "$1,120.00",
    color: "text-orange-600 bg-orange-50",
    items: [
      { label: "Handling Charges", desc: "At Hong Kong Port", amount: "$450.00" },
      { label: "Documentation Fee", desc: "BL, Docs, Admin", amount: "$120.00" },
      { label: "Port Charges", desc: "Hong Kong", amount: "$280.00" },
      { label: "Terminal Charges", desc: "Hong Kong", amount: "$280.00" },
    ],
  },
  {
    key: "origin",
    title: "Charges at Origin",
    amount: "$850.00",
    color: "text-blue-600 bg-blue-50",
    items: [
      { label: "Handling Charges", desc: "At Nhava Sheva Port", amount: "$450.00" },
      { label: "Documentation Fee", desc: "BL, Docs, Admin", amount: "$120.00" },
      { label: "Port Charges", desc: "Nhava Sheva", amount: "$280.00" },
    ],
  },
];
 

const costSummary = [
  { label: "Ocean Freight", value: "$2,450.00", pct: "41.9%", color: "bg-green-500" },
  { label: "Charges at Destination", value: "$1,120.00", pct: "19.2%", color: "bg-orange-400" },
  { label: "Charges at Origin", value: "$850.00", pct: "14.5%", color: "bg-blue-500" },
];

export default function CostBreakdownModal({ onClose }) {
  const [expanded, setExpanded] = useState({ ocean: true, destination: true, origin: true });
 
  const toggleGroup = (key) =>
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
 
  const donutStyle = {
    background: `conic-gradient(#22c55e 0% 41.9%, #fb923c 41.9% 61.1%, #3b82f6 61.1% 75.6%, #e5e7eb 75.6% 100%)`,
  };
 
  return (
    <ModalShell width="max-w-4xl">
      <div className="flex items-start justify-between pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center shrink-0">
            <FiBriefcase size={17} />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Cost Breakdown</h2>
            <p className="text-sm text-gray-500">PLN - 2025 - 04 - 24 - 000123</p>
          </div>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 shrink-0">
          <FiX size={20} />
        </button>
      </div>
 
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4">
        <div className="space-y-4">
          <div className="bg-teal-50 rounded-xl p-4">
            <p className="text-sm font-semibold text-gray-700">
              Total Estimated Cost (USD)
            </p>
            <p className="text-3xl font-extrabold text-teal-600 mt-1">$ 5,842.75</p>
            <p className="text-xs text-gray-500 mt-1">All charges are in USD</p>
          </div>
 
          <div className="border border-gray-100 rounded-xl p-4">
            <p className="text-sm font-bold text-gray-900 mb-3">Cost Summary</p>
            <div className="flex items-center gap-4">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center shrink-0"
                style={donutStyle}
              >
                <div className="w-14 h-14 rounded-full bg-white flex flex-col items-center justify-center">
                  <span className="text-[9px] text-gray-400">Total</span>
                  <span className="text-xs font-bold text-gray-900">$5,842.75</span>
                </div>
              </div>
              <div className="space-y-1.5 flex-1 min-w-0">
                {costSummary.map((c) => (
                  <div key={c.label} className="flex items-center gap-1.5 text-xs">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${c.color}`} />
                    <span className="text-gray-600 truncate">{c.label}</span>
                    <span className="text-gray-900 font-medium ml-auto shrink-0">
                      {c.value}
                    </span>
                    <span className="text-gray-400 shrink-0">{c.pct}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
 
          <div className="border border-gray-100 rounded-xl p-4">
            <p className="text-sm font-bold text-gray-900 mb-3">
              Payment &amp; Currency Details
            </p>
            <div className="grid grid-cols-2 gap-y-2.5 text-sm">
              <span className="text-gray-500">Currency</span>
              <span className="text-gray-900 font-medium">USD - US Dollar</span>
              <span className="text-gray-500">Exchange Rate (1 USD)</span>
              <span className="text-gray-900 font-medium">₹83.20</span>
              <span className="text-gray-500">Payment Terms</span>
              <span className="text-gray-900 font-medium">Prepaid</span>
              <span className="text-gray-500">Payment Due Date</span>
              <span className="text-gray-900 font-medium">20 Apr 2025</span>
            </div>
            <div className="mt-3 bg-blue-50 rounded-lg p-2.5 flex items-start gap-2">
              <FiInfo size={13} className="text-blue-500 mt-0.5 shrink-0" />
              <p className="text-xs text-gray-600">
                Exchange rate is subject to change at the time of payment.
              </p>
            </div>
          </div>
        </div>
 
        <div className="border border-gray-100 rounded-xl p-4">
          <p className="text-base font-bold text-gray-900 flex items-center gap-2 mb-3">
            <FiFileText size={16} className="text-teal-600" />
            Detailed Cost Breakdown
          </p>
          <div className="hidden sm:grid grid-cols-[1.4fr_1.4fr_0.8fr] text-xs font-semibold text-gray-400 px-1 pb-2">
            <span>Charge Type</span>
            <span>Description</span>
            <span className="text-right">Amount (USD)</span>
          </div>
          <div className="space-y-3">
            {chargeGroups.map((g) => (
              <div key={g.key}>
                <button
                  type="button"
                  onClick={() => toggleGroup(g.key)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold ${g.color}`}
                >
                  <span>{g.title}</span>
                  <span className="flex items-center gap-2">
                    {g.amount}
                    <FiChevronDown
                      size={14}
                      className={`transition-transform ${expanded[g.key] ? "rotate-180" : ""}`}
                    />
                  </span>
                </button>
                {expanded[g.key] && (
                  <div className="mt-1 space-y-1">
                    {g.items.map((item) => (
                      <div
                        key={item.label}
                        className="grid grid-cols-1 sm:grid-cols-[1.4fr_1.4fr_0.8fr] gap-1 px-3 py-1.5 text-sm"
                      >
                        <span className="text-gray-700">{item.label}</span>
                        <span className="text-gray-500">{item.desc}</span>
                        <span className="text-gray-900 sm:text-right">{item.amount}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
 
      <div className="mt-4 bg-amber-50 rounded-xl p-3 flex items-start gap-2">
        <FiInfo size={15} className="text-amber-500 mt-0.5 shrink-0" />
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-900">Important Note:</span>{" "}
          These are estimated cost and may vary based on actuals, exchange rate
          fluctuations, and additional charges
        </p>
      </div>
 
      <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:justify-end">
        <button className="order-2 sm:order-1 inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-lg">
          <FiDownload size={15} />
          Download Breakdown
        </button>
        <button
          onClick={onClose}
          className="order-1 sm:order-2 bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg"
        >
          Close
        </button>
      </div>
    </ModalShell>
  );
}
 