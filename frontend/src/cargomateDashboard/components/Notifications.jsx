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
import { FaRupeeSign } from "react-icons/fa";
const notifications = [
  {
    id: 1,
    icon: FiCheck,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    title: "Shipment PLN-2025-04-24-000123 updated",
    time: "2m ago",
    desc: "Your shipment is now in Transit to Dubai, UAE.",
    tag: "Shipment Update",
    tagBg: "bg-green-100",
    tagColor: "text-green-700",
    dot: "bg-green-500",
  },
  {
    id: 2,
    icon: FiFileText,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    title: "New document uploaded successfully",
    time: "15m ago",
    desc: "Commercial Invoice for shipment PLN-2025-04-24-000123",
    tag: "Document",
    tagBg: "bg-blue-100",
    tagColor: "text-blue-700",
    dot: "bg-blue-500",
  },
  {
    id: 3,
    icon: FaRupeeSign,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    title: "Incentive eligibility verified",
    time: "45m ago",
    desc: "You are eligible for RoDTEP benefit for shipment",
    tag: "Incentive",
    tagBg: "bg-purple-100",
    tagColor: "text-purple-700",
    dot: "bg-purple-500",
  },
  {
    id: 4,
    icon: FiAlertTriangle,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    title: "Action required: Missing document",
    time: "1h ago",
    desc: "Packing List is missing for shipment PLN-2025-04-20-000112",
    tag: "Action Required",
    tagBg: "bg-orange-100",
    tagColor: "text-orange-700",
    dot: "bg-orange-500",
  },
  {
    id: 5,
    icon: FiSend,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    title: "Freight quote received",
    time: "2h ago",
    desc: "New freight quote received for Mumbai → Dubai",
    tag: "Freight Update",
    tagBg: "bg-blue-100",
    tagColor: "text-blue-700",
    dot: "bg-blue-500",
  },
];

export default function NotificationsModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-6">
      <div className="w-full max-w-md sm:max-w-lg bg-white rounded-2xl shadow-2xl flex flex-col max-h-[80vh]">
        <div className="p-4 sm:p-6 shrink-0">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center shrink-0">
                <FiBell size={18} />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-gray-900">
                  Notifications
                </h2>
                <p className="text-xs text-gray-500">
                  Stay updated with the latest activities.
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 shrink-0"
            >
              <FiX size={20} />
            </button>
          </div>
 
          <div className="mt-4">
            <span className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 text-xs font-medium px-3 py-1.5 rounded-full">
              All
              <span className="bg-teal-600 text-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                12
              </span>
            </span>
          </div>
        </div>

        <div className="overflow-y-auto px-4 sm:px-6 pb-4 sm:pb-6 pr-1">
          <div className="space-y-3">
            {notifications.map((n) => {
              const Icon = n.icon;
              return (
                <div
                  key={n.id}
                  className="border border-gray-100 rounded-xl p-3 flex gap-3"
                >
                  <div
                    className={`w-8 h-8 rounded-full ${n.iconBg} ${n.iconColor} flex items-center justify-center shrink-0`}
                  >
                    <Icon size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-semibold text-gray-900">
                        {n.title}
                      </p>
                      <span className="text-[11px] text-gray-400 whitespace-nowrap shrink-0">
                        {n.time}
                      </span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
                      {n.desc}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span
                        className={`${n.tagBg} ${n.tagColor} text-[11px] font-medium px-2.5 py-1 rounded-full`}
                      >
                        {n.tag}
                      </span>
                      <span className={`w-1.5 h-1.5 rounded-full ${n.dot}`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}