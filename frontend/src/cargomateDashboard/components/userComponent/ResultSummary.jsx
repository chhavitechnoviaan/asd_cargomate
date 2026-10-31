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
} from "react-icons/fi";


export default function ResultSummaryModal({ onClose }) {
  const rows = [
    { label: "Overall Status", value: "Eligible", icon: FiCheckCircle, green: true },
    { label: "Total Incentive Value", value: "₹8,112" },
    { label: "Estimated Duty Savings", value: "₹2,450" },
    { label: "Compliance Score", value: "96%" },
    { label: "Required Documents", value: "6 / 8" },
    { label: "Missing Information", value: "None" },
  ];
 
  return (
    <ModalShell width="max-w-xs">
      <div className="flex items-center gap-2">
        <FiBarChart2 size={16} className="text-teal-600" />
        <h2 className="text-base font-bold text-gray-900">Result Summary</h2>
      </div>
      <p className="text-xs text-gray-500 mt-1">
        Review the overall analysis and calculation results.
      </p>
 
      <div className="mt-4 space-y-2.5">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between text-sm">
            <span className="text-gray-500">{r.label}</span>
            <span
              className={`font-semibold flex items-center gap-1.5 ${
                r.green ? "text-green-600" : "text-gray-900"
              }`}
            >
              {r.icon && <r.icon size={14} className="text-green-500" />}
              {r.value}
            </span>
          </div>
        ))}
      </div>
 
      <button
        onClick={onClose}
        className="w-full mt-5 border border-gray-200 text-gray-700 text-sm font-medium py-2.5 rounded-lg"
      >
        Close
      </button>
    </ModalShell>
  );
}