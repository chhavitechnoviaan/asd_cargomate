
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
} from "react-icons/fi";

export default function DownloadReportModal({ onClose,setValue , value }) {


  return (
    <ModalShell>
      <div className="flex items-start justify-between">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
          Download Report
        </h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <FiX size={20} />
        </button>
      </div>
      <p className="text-sm text-gray-500 mt-1">
        Your report is ready to download as a PDF.
      </p>
 
      <div className="mt-5">
        <label className="block text-sm font-semibold text-gray-900 mb-1.5">
          File Name
        </label>
        <input 
         type="text"
         onChange={(e) => setValue(e.target.value)}
         value={value}
         placeholder="Enter file name"
         className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-500 bg-gray-50" />
         
      </div>
 
      <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-end">
        <button onClick={onClose} className="order-2 sm:order-1 border border-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-full">
          Cancel
        </button>
        <button className="order-1 sm:order-2 bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium px-5 py-2.5 rounded-full">
          Download PDF
        </button>
      </div>
    </ModalShell>
  );
}