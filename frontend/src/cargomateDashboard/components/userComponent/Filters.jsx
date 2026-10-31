import { useState, useEffect } from "react";
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

const quickRanges = ["Today", "Yesterday", "This Week", "Last 7 Days", "This Month", "Last Month", "This Quarter", "Custom"];



function SelectField({ label, value, options }) {
  return (
    <div>
      <label className="block text-xs text-gray-500 mb-1">{label}</label>
      <div className="relative">
        <select
          defaultValue={value}
          className="w-full appearance-none border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option>{value}</option>
          {options && options.map((o) => <option key={o}>{o}</option>)}
        </select>
        <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
      </div>
    </div>
  );
}

export default function FiltersModal({ onClose }) {
  const [formData, setFormData] = useState({
    dataRange: "25 Apr 2025 - 25 Apr 2025",
    comparisonPeriod: "18 Apr 2025 - 24 Apr 2025",
    quickSelect: "This Month",
    user: "All Users",
    modules: "All Modules",
    actions: "All Actions",
    statusTags: ["Delivered", "In Transit"],
    shipmentMode: "All Modules",
    serviceType: "All Service Type",
    entityType: "All Entity Type",
    currency: "INR (₹)",
    dataGrouping: "Daily",
  });
 
  const removeTag = (tag) =>
    setFormData((prev) => ({
      ...prev,
      statusTags: prev.statusTags.filter((t) => t !== tag),
    }));
 
  const handleApply = async () => {
    try {
      const response = await fetch("https://api.example.com/filters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log("Filters applied:", result);
      onClose();
    } catch (error) {
      console.error("Failed to apply filters:", error);
    }
  };
 
  return (
    <ModalShell width="max-w-3xl">
      <div className="flex flex-col max-h-[80vh]">
        <div className="flex items-start justify-between pb-4 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-100 shrink-0" />
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Filters</h2>
              <p className="text-xs sm:text-sm text-gray-500">
                Refine your analytics data by applying filters.
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <FiX size={20} />
          </button>
        </div>

        <div className="overflow-y-auto pr-1">
          <p className="text-base font-bold text-gray-900 mt-5 mb-3">General Filters</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Data Range</label>
              <div className="relative">
                <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                <input
                  type="text"
                  defaultValue={formData.dataRange}
                  className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Comparison Period</label>
              <input
                type="text"
                defaultValue={formData.comparisonPeriod}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-4 mb-2">Quick Select</p>
          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <select className="appearance-none border border-gray-200 rounded-lg pl-3 pr-8 py-2 text-sm text-gray-500 focus:outline-none">
                <option>Select a range</option>
              </select>
              <FiChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
            </div>
            {quickRanges.map((r) => (
              <button
                key={r}
                type="button"
                className={`text-sm px-3.5 py-2 rounded-lg border ${
                  r === formData.quickSelect
                    ? "border-teal-500 text-teal-600 bg-teal-50"
                    : "border-gray-200 text-gray-700"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
            <SelectField label="User" value={formData.user} />
            <SelectField label="Modules" value={formData.modules} />
            <SelectField label="Actions" value={formData.actions} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">User</label>
              <div className="flex flex-wrap items-center gap-2 border border-gray-200 rounded-lg px-2 py-1.5">
                {formData.statusTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 bg-teal-50 text-teal-600 text-xs font-medium px-2 py-1 rounded"
                  >
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)}>
                      <FiX size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
            <SelectField label="Shipment Mode" value={formData.shipmentMode} />
            <SelectField label="Service Type" value={formData.serviceType} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            <SelectField label="Entity Type" value={formData.entityType} />
            <SelectField label="Currency" value={formData.currency} />
            <SelectField label="Data Grouping" value={formData.dataGrouping} />
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-end">
            <button
              onClick={onClose}
              className="order-2 sm:order-1 border border-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="order-1 sm:order-2 inline-flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg"
            >
              <FiCheck size={16} />
              Apply filters
            </button>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}