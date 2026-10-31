
import ModalShell from "./ModalShell";



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
  FiPaperclip,
} from "react-icons/fi";

const riskRows = [
  { label: "Geopolitical tensions affecting 12 countries", level: "High", color: "text-red-500" },
  { label: "Supply chain disruptions in critical sectors", level: "High", color: "text-red-500" },
  { label: "Trade restrictions & compliance changes", level: "Medium", color: "text-blue-600" },
  { label: "Currency volatility in key markets", level: "Medium", color: "text-blue-600" },
  { label: "Raw material price volatility", level: "Low", color: "text-green-600" },
];



export default function RiskInsightsModal({ onClose }) {
  return (
    <ModalShell>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center shrink-0">
            <FiShield size={18} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Risk Insights</h2>
            <p className="text-sm text-gray-500">
              Key risks and alerts impacting global trade.
            </p>
          </div>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 shrink-0">
          <FiX size={20} />
        </button>
      </div>
 
      <div className="mt-5 space-y-3.5">
        {riskRows.map((r) => (
          <div key={r.label} className="flex items-center justify-between">
            <span className="text-sm text-gray-900">{r.label}</span>
            <span className={`text-sm font-semibold ${r.color}`}>{r.level}</span>
          </div>
        ))}
      </div>
 
      <div className="mt-5 bg-red-50 rounded-full px-4 py-3 flex items-center gap-2.5">
        <FiShield size={16} className="text-red-500 shrink-0" />
        <span className="text-sm font-bold text-gray-900">18</span>
        <span className="text-sm text-gray-400">High risk alerts detected</span>
      </div>
    </ModalShell>
  );
}