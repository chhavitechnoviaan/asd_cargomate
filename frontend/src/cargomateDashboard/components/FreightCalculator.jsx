import ModalShell from "./userComponent/ModalShell";
import Field from "./userComponent/Field";
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


export default function FreightCalculatorModal({ onClose }) {
  return (
    <ModalShell width="max-w-lg ">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FiTruck size={20} className="text-gray-900" />
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            Freight Calculator
          </h2>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <FiX size={20} />
        </button>
      </div>
      <p className="text-sm text-gray-500 mt-1">
        Calculate estimated freight cost for your shipment.
      </p>
 
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Origin" placeholder="Enter origin city or port" />
        <Field label="Destination" placeholder="Enter destination city or port" />
        <Field label="Select shipment type" placeholder="Select shipment type" select />
        <Field label="Weight (kg)" placeholder="Enter weight in kg" />
        <Field label="Volume (CBM)" placeholder="Enter volume in CBM" />
        <Field label="Incoterms" placeholder="Select Incoterms" select />
      </div>
 
      <div className="mt-5 bg-cyan-50 rounded-xl p-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-teal-600">
            Estimated Freight Cost
          </p>
          <p className="text-2xl font-bold text-gray-900 mt-1">₹0.00</p>
        </div>
        <FiTruck size={32} className="text-gray-400" />
      </div>
 
      <div className="mt-3 flex items-start gap-1.5 text-xs text-gray-500">
        <FiInfo size={14} className="mt-0.5 shrink-0" />
        <p>
          This is an estimated cost. Actual cost may vary based on carrier and
          market conditions.
        </p>
      </div>
 
      <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-end">
        <button onClick={onClose} className="order-2 sm:order-1 border border-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-full">
          Cancel
        </button>
        <button className="order-1 sm:order-2 bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium px-5 py-2.5 rounded-full">
          Calculate
        </button>
      </div>
    </ModalShell>
  );
}