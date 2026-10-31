import ModalShell from "./ModalShell";
import { useState } from "react";

 
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

const dataSources = [
  "All Sources",
  "My Shipments",
  "Shipment Tracking",
  "Cost Breakdown",
  "Vendor Recommendations",
  "Documents Center",
];

export default function DataSourceModal({ onClose }) {
  const [selected, setSelected] = useState("All Sources");
 
  const handleApply = async () => {
    try {
      const response = await fetch("https://api.example.com/data-source", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dataSource: selected }),
      });
      const result = await response.json();
      console.log("Data source applied:", result);
      onClose();
    } catch (error) {
      console.error("Failed to apply data source:", error);
    }
  };
 
  return (
    <ModalShell width="max-w-xs">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center shrink-0">
            <FiFolder size={14} />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900">Data Source</h2>
            <p className="text-xs text-gray-500">Choose data source</p>
          </div>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <FiX size={18} />
        </button>
      </div>
 
      <div className="mt-4 space-y-3">
        {dataSources.map((source) => (
          <label key={source} className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="radio"
              name="dataSource"
              checked={selected === source}
              onChange={() => setSelected(source)}
              className="w-4 h-4 accent-teal-500"
            />
            <span className="text-sm text-gray-700">{source}</span>
          </label>
        ))}
      </div>
 
      <div className="mt-5 flex gap-2">
        <button
          onClick={() => setSelected("All Sources")}
          className="border border-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg"
        >
          Reset
        </button>
        <button
          onClick={handleApply}
          className="flex-1 bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium px-4 py-2 rounded-full"
        >
          Apply
        </button>
      </div>
    </ModalShell>
  );
}