



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



export default function SaveReportPopup({ onClose }) {
  const [reportName, setReportName] = useState("Export to Dubai Report");
 
  const handleSave = async () => {
    try {
      const response = await fetch("https://api.example.com/reports/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reportName }),
      });
      const result = await response.json();
      console.log("Report saved:", result);
      onClose();
    } catch (error) {
      console.error("Failed to save report:", error);
    }
  };
 
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 sm:p-6 overflow-y-auto "> 
     <div className="bg-white rounded-lg  px-3 py-2"> 
      <div className="flex items-start justify-between ">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
          Save Report
        </h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <FiX size={20} />
        </button>
      </div>
      <p className="text-sm text-gray-500 mt-1">
        Save this report for future reference.
      </p>
   </div>
     </div>
 
   
  );
}