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
} from "react-icons/fi";

export default function Field({ label, placeholder, select }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-900 mb-1.5">
        {label}
      </label>
      {select ? (
        <div className="relative">
          <select className="w-full appearance-none border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500">
            <option>{placeholder}</option>
          </select>
          <FiChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
        </div>
      ) : (
        <input
          type="text"
          placeholder={placeholder}
          className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      )}
    </div>
  );
}