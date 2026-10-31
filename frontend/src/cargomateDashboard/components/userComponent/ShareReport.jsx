

import ModalShell from "./ModalShell";
import { useState, useRef } from "react";
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

const shareOptions = [
  {
    icon: FiMail,
    color: "text-blue-600 bg-blue-50",
    title: "Email",
    desc: "Send the report directly via email.",
  },
  {
    icon: FiCopy,
    color: "text-green-600 bg-green-50",
    title: "Copy Link",
    desc: "Generate and copy a shareable link.",
  },
  {
    icon: FiFile,
    color: "text-red-600 bg-red-50",
    title: "Download PDF",
    desc: "Download a PDF copy of this report.",
  },
]

export default function ShareReportModal({ onClose }) {
  return (
    <ModalShell>
      <div className="flex items-start justify-between">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
          Share Report
        </h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <FiX size={20} />
        </button>
      </div>
      <p className="text-sm text-gray-500 mt-1">
        Choose how you'd like to share this report.
      </p>
 
      <div className="mt-5 space-y-2">
        {shareOptions.map((o) => {
          const Icon = o.icon;
          return (
            <button
              key={o.title}
              className="w-full flex items-center gap-3 border border-gray-100 rounded-xl p-3 hover:bg-gray-50 text-left"
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${o.color}`}>
                <Icon size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">{o.title}</p>
                <p className="text-xs text-gray-500">{o.desc}</p>
              </div>
              <FiChevronRight className="text-gray-400 shrink-0" size={16} />
            </button>
          );
        })}
      </div>
 
      <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-end">
        <button
          onClick={onClose}
          className="order-2 sm:order-1 border border-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-full"
        >
          Cancel
        </button>
        <button className="order-1 sm:order-2 bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium px-5 py-2.5 rounded-full">
          Share
        </button>
      </div>
    </ModalShell>
  );
}