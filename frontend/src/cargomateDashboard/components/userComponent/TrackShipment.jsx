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
import { FaShip, FaAnchor } from "react-icons/fa";

export default function TrackShipmentModal({ onClose }) {
  const steps = [
    { label: "Booked", date: "24 Apr 2025", icon: FiMapPin, state: "done" },
    { label: "In Transit", date: "25 Apr 2025", icon: FaShip, state: "done" },
    { label: "Arriving", date: "02 May 2025", icon: FaShip, state: "pending" },
    { label: "Delivered", date: "05 May 2025", icon: FiCheck, state: "pending" },
  ];
 
  const details = [
    { label: "Carrier", value: "Maersk Line" },
    { label: "Vessel / Flight", value: "MAERSK HOUSTON / 2506W" },
    { label: "Container / BL No.", value: "MSKU1234567 / BOL-2025-0424" },
    { label: "ETD", value: "25 Apr 2025" },
    { label: "ETA", value: "02 May 2025" },
    { label: "Current Location", value: "Arabian Sea" },
  ];
 
  return (
    <ModalShell width="max-w-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
            <FiWifi size={16} />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900">
              Track Shipment
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              View real-time updates and shipment status.
            </p>
          </div>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <FiX size={20} />
        </button>
      </div>
 
      <div className="mt-4 bg-gray-50 rounded-xl px-4 py-3 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500">Shipment ID</p>
          <p className="text-sm font-bold text-gray-900">
            PLN-2025-04-24-000123
          </p>
        </div>
        <span className="bg-teal-100 text-teal-700 text-xs font-semibold px-3 py-1 rounded-full">
          In Transit
        </span>
      </div>
 
      <div className="mt-5 flex items-start justify-between">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="flex items-center flex-1">
              <div className="flex flex-col items-center text-center flex-1">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center ${
                    s.state === "done"
                      ? "bg-teal-500 text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <Icon size={14} />
                </div>
                <p
                  className={`text-xs font-semibold mt-1.5 ${
                    s.state === "done" ? "text-teal-600" : "text-gray-400"
                  }`}
                >
                  {s.label}
                </p>
                <p className="text-[10px] text-gray-400">{s.date}</p>
              </div>
              {i < steps.length - 1 && (
                <span className="text-gray-300 text-xs mb-6">→</span>
              )}
            </div>
          );
        })}
      </div>
 
      <div className="mt-5">
        <p className="text-sm font-bold text-gray-900 mb-2">Latest Update</p>
        <div className="bg-teal-50 rounded-xl p-3 flex gap-3">
          <div className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center shrink-0">
            <FaAnchor size={13} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-bold text-gray-900">
                Vessel Departed
              </p>
              <span className="bg-teal-100 text-teal-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                Sea Freight
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Vessel has departed from Nhava Sheva Port, India.
            </p>
            <p className="text-xs sm:text-sm font-semibold text-gray-700 mt-1">
              25 Apr 2025, 08:30 AM
            </p>
          </div>
        </div>
      </div>
 
      <div className="mt-5">
        <p className="text-sm font-bold text-gray-900 mb-2">
          Shipment Details
        </p>
        <div className="space-y-2">
          {details.map((d) => (
            <div key={d.label} className="flex items-center justify-between">
              <span className="text-xs sm:text-sm text-gray-500">
                {d.label}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-gray-900 text-right">
                {d.value}
              </span>
            </div>
          ))}
        </div>
      </div>
 
      <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center">
        <button className="inline-flex items-center justify-center gap-2 border border-teal-500 text-teal-600 text-sm font-medium px-5 py-2.5 rounded-full">
          <FiDownload size={16} />
          Download Documents
        </button>
        <button
          onClick={onClose}
          className="bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium px-6 py-2.5 rounded-full"
        >
          Close
        </button>
      </div>
    </ModalShell>
  );
}