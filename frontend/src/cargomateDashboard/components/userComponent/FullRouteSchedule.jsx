import ModalShell from "./ModalShell";
import Field from "./Field";
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
import { FaPlane } from "react-icons/fa";
const routeTimeline = [
  { icon: FiClock, label: "26 Apr", status: "Departure", sub: "Tirupur, India" },
  { icon: FaPlane, label: "In Transit", status: "3-5 Days", sub: "" },
  { icon: FiClock, label: "30 Apr", status: "Arrival", sub: "Dubai, UAE" },
  { icon: FiCopy, label: "Delivery", status: "To be Confirmed", sub: "" },
];
export default function FullRouteScheduleModal({ onClose }) {
  const details = [
    { label: "Mode", value: "Air Freight" },
    { label: "Carrier (To be Confirmed)", value: "IndiGo Cargo/Emirates SkyCargo" },
    { label: "Estimated Departure", value: "26 Apr 2025" },
    { label: "Estimated Arrival", value: "30 Apr 2025" },
    { label: "Transit Time", value: "3-5 Days" },
  ];
 
  return (
    <ModalShell width="max-w-lg">
      <div className="flex items-start justify-between">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
          Full Route &amp; Schedule
        </h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 shrink-0">
          <FiX size={20} />
        </button>
      </div>
 
      <div className="mt-5 flex items-start justify-between">
        <div className="flex items-start gap-1.5">
          <FiMapPin size={15} className="text-blue-600 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-gray-900">Tirupura, India (IN)</p>
            <p className="text-xs text-gray-400">Departure</p>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center mt-2">
          <span className="border-t border-dashed border-gray-300 flex-1" />
          <FaPlane className="text-blue-600 mx-2 rotate-90 sm:rotate-0" size={14} />
          <span className="border-t border-dashed border-gray-300 flex-1" />
        </div>
        <div className="flex items-start gap-1.5 text-right">
          <div>
            <p className="text-sm font-semibold text-gray-900">Dubai, UAE (AE)</p>
            <p className="text-xs text-gray-400">Arrival</p>
          </div>
          <FiMapPin size={15} className="text-blue-600 mt-0.5" />
        </div>
      </div>
 
      <div className="mt-4 bg-blue-50 rounded-xl p-3 flex items-start gap-2">
        <FiInfo size={15} className="text-blue-500 mt-0.5 shrink-0" />
        <p className="text-sm text-gray-600">
          Schedule is indicative and may change. Please confirm with carrier.
        </p>
      </div>
 
      <div className="mt-4 space-y-2.5">
        {details.map((d) => (
          <div key={d.label} className="flex items-center justify-between">
            <span className="text-sm text-gray-500">{d.label}</span>
            <span className="text-sm font-bold text-gray-900">{d.value}</span>
          </div>
        ))}
      </div>
 
      <div className="mt-6 flex items-start justify-between">
        {routeTimeline.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={s.label + i} className="flex items-center flex-1">
              <div className="flex flex-col items-center text-center flex-1">
                <Icon size={16} className="text-blue-600" />
                <span className="w-2 h-2 rounded-full bg-blue-600 mt-1" />
                <p className="text-xs font-bold text-gray-900 mt-1.5">{s.label}</p>
                <p className="text-xs text-gray-400">{s.status}</p>
                {s.sub && <p className="text-xs text-gray-400">{s.sub}</p>}
              </div>
              {i < routeTimeline.length - 1 && (
                <span className="border-t border-dashed border-gray-300 flex-1 -mt-6" />
              )}
            </div>
          );
        })}
      </div>
 
      <div className="mt-6 flex justify-end">
        <button
          onClick={onClose}
          className="border border-blue-500 text-blue-600 text-sm font-semibold px-6 py-2.5 rounded-lg"
        >
          Close
        </button>
      </div>
    </ModalShell>
  );
}