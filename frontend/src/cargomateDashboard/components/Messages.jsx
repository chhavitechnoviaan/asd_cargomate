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


const messages = [
  {
    id: 1,
    initials: "IC",
    name: "IndiGo Cargo",
    subject: "Freight Confirmation - PLN - 2025 - 04 - 24 - 000123",
    preview: "Dear Team, Your Booking has been confirmed for shipment",
    time: "10:30 AM",
    link: true,
    star: true,
    dot: true,
    active: true,
  },
  {
    id: 2,
    initials: "SC",
    name: "Sea Connect Logistics",
    subject: "Update Freight Quote",
    preview: "Please fing the updated freight quote for your refrence",
    time: "Yesterday",
    link: false,
    star: true,
    dot: true,
  },
  {
    id: 3,
    initials: "CB",
    name: "Custom Broker",
    subject: "Document Verification Update",
    preview: "Your documents for shipment PLN - 2025 - 04 - 24 - 0012...",
    time: "Yesterday",
    link: true,
    star: true,
    dot: true,
  },
  {
    id: 4,
    initials: "RD",
    name: "RoDTEP Department",
    subject: "Incentive Claim Approved",
    preview: "Your RoDTEP claim has been updated. Please find the details....",
    time: "23 Apr, 2025",
    link: false,
    star: true,
    dot: false,
  },
  {
    id: 5,
    initials: "EX",
    name: "Export Support Team",
    subject: "Export compliance update",
    preview: "important update regarding export compliance guidelines",
    time: "23 Apr, 2025",
    link: false,
    star: false,
    dot: false,
  },
];

export default function MessagesModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/80 p-3 sm:p-6">
      <div className="w-full max-w-md sm:max-w-2xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[80vh]">
        <div className="p-4 sm:p-6 shrink-0">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center shrink-0">
                <FiMail size={18} />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-gray-900">
                  Messages
                </h2>
                <p className="text-xs text-gray-500">
                  View and manage your emails.
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
 
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <span className="inline-flex items-center gap-2 text-teal-600 font-semibold text-xs sm:text-sm">
              Inbox
              <span className="bg-teal-600 text-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                8
              </span>
            </span>
            <button className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-medium px-4 py-2 rounded-full w-full sm:w-auto justify-center">
              <FiEdit3 size={14} />
              Compose Mail
            </button>
          </div>
 
          <div className="mt-4 relative">
            <input
              type="text"
              placeholder="Search emails..."
              className="w-full border border-gray-200 rounded-xl pl-4 pr-10 py-2.5 text-xs text-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <FiSearch
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
          </div>
        </div>

        <div className="overflow-y-auto px-4 sm:px-6 pb-4 sm:pb-6 pr-1">
          <div className="space-y-3">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`border border-gray-100 rounded-xl p-3 flex gap-3 ${
                  m.active ? "bg-gray-50" : ""
                }`}
              >
                <div className="w-9 h-9 rounded-full bg-teal-50 text-teal-700 font-bold text-xs flex items-center justify-center shrink-0">
                  {m.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                      {m.name}
                    </p>
                    <span className="text-[11px] text-gray-400 whitespace-nowrap shrink-0">
                      {m.time}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-gray-800 truncate">
                    {m.subject}
                  </p>
                  <div className="flex items-center justify-between gap-2 mt-0.5">
                    <p className="text-[11px] sm:text-xs text-gray-500 truncate">
                      {m.preview}
                    </p>
                    <div className="flex items-center gap-2 shrink-0">
                      {m.link && (
                        <FiLink2 size={13} className="text-gray-400" />
                      )}
                      <FiStar
                        size={13}
                        className={
                          m.star
                            ? "text-gray-900 fill-current"
                            : "text-gray-300"
                        }
                      />
                      {m.dot && (
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}