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
  FiUser,FiGlobe, 
  FiMessageSquare,
} from "react-icons/fi";




export default function TradeInformationModal({ onClose }) {
  const details = [
    { label: "Export Country", value: "India" },
    { label: "Import Country", value: "United States" },
    { label: "Trade Type", value: "Export" },
    { label: "Incoterm", value: "FOB" },
    { label: "Mode of Transport", value: "Sea" },
    { label: "Currency", value: "USD" },
  ];
 
  return (
    <ModalShell width="max-w-xs">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2 text-teal-600 underline decoration-teal-600">
          <FiGlobe size={16} />
          <h2 className="text-base font-bold">View Trade Information</h2>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 shrink-0">
          <FiX size={16} />
        </button>
      </div>
 
      <p className="text-sm font-bold text-gray-900 mt-4 mb-2">Trade Details</p>
      <div className="space-y-1.5">
        {details.map((d) => (
          <div key={d.label} className="flex text-sm">
            <span className="text-gray-500 w-36 shrink-0">{d.label}</span>
            <span className="text-gray-500 mr-1">:</span>
            <span className="text-gray-900 font-medium">{d.value}</span>
          </div>
        ))}
      </div>
    </ModalShell>
  );
}