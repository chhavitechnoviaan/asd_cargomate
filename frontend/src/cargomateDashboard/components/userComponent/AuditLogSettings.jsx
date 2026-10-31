import { useState } from "react";
import ModalShell from "./ModalShell";
 
import {
  FiX,FiUser ,
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

import { FaShip, FaAnchor } from "react-icons/fa";



const activityRows = [
  { key: "userLogin", icon: FiUser, title: "User login", desc: "Track user login and log out activities" },
  { key: "shipmentActivities", icon: FiFileText, title: "Shipment activities", desc: "Track shipment creation, updates and changes" },
  { key: "documentsDownload", icon: FiFileText, title: "Documents Download", desc: "Track document downloads and export" },
  { key: "reportsExport", icon: FiFileText, title: "Reports Export", desc: "Track report generation and export" },
  { key: "failedLoginAttempts", icon: FiAlertTriangle, title: "Failed Login Attempts", desc: "Track all failed login attempts" },
];

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`w-10 h-5 rounded-full flex items-center px-0.5 transition-colors ${
        checked ? "bg-green-500 justify-end" : "bg-gray-300 justify-start"
      }`}
    >
      <span className="w-4 h-4 bg-white rounded-full" />
    </button>
  );
}

export default function AuditLogSettingsModal({ onClose }) {
  const [formData, setFormData] = useState({
    userLogin: true,
    shipmentActivities: true,
    documentsDownload: true,
    reportsExport: true,
    failedLoginAttempts: true,
    retentionDays: "90 Days",
    emailCriticalEvents: true,
    notifyAdminFailedAttempts: true,
  });
 


  const updateField = (key, value) =>
    setFormData((prev) => ({ ...prev, [key]: value }));
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://api.example.com/audit-log-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log("Settings saved:", result);
      onClose();
    } catch (error) {
      console.error("Failed to save settings:", error);
    }
  };
 
  return (
    <ModalShell width="max-w-lg">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center shrink-0">
            <FiSettings size={18} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Audit Log Settings</h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Configure audit tracking and retention
            </p>
          </div>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <FiX size={20} />
        </button>
      </div>
 
      <form onSubmit={handleSubmit}>
        <p className="text-sm font-bold text-gray-900 mt-5 mb-2">Activity Tracking</p>
        <div className="space-y-4">
          {activityRows.map((row) => {
            const Icon = row.icon;
            return (
              <div key={row.key} className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <Icon size={16} className="text-gray-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{row.title}</p>
                    <p className="text-xs text-gray-500">{row.desc}</p>
                  </div>
                </div>
                <Toggle
                  checked={formData[row.key]}
                  onChange={(val) => updateField(row.key, val)}
                />
              </div>
            );
          })}
        </div>
 
        <p className="text-sm font-bold text-gray-900 mt-6 mb-2">Retention Policy</p>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <label className="text-sm text-gray-500 shrink-0">Keep logs for</label>
          <div className="relative w-full">
            <select
              value={formData.retentionDays}
              onChange={(e) => updateField("retentionDays", e.target.value)}
              className="w-full appearance-none border border-gray-200 rounded-lg px-3.5 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option>30 Days</option>
              <option>90 Days</option>
              <option>180 Days</option>
              <option>1 Year</option>
            </select>
            <FiChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
          </div>
        </div>
 
        <p className="text-sm font-bold text-gray-900 mt-6 mb-2">Notifications</p>
        <div className="space-y-3">
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.emailCriticalEvents}
              onChange={(e) => updateField("emailCriticalEvents", e.target.checked)}
              className="mt-0.5 w-4 h-4 accent-green-600"
            />
            <div>
              <p className="text-sm font-semibold text-gray-900">Email on critical events</p>
              <p className="text-xs text-gray-500">Send email when critical actions are performed</p>
            </div>
          </label>
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.notifyAdminFailedAttempts}
              onChange={(e) => updateField("notifyAdminFailedAttempts", e.target.checked)}
              className="mt-0.5 w-4 h-4 accent-green-600"
            />
            <div>
              <p className="text-sm font-semibold text-gray-900">Notify admin for failed attempts</p>
              <p className="text-xs text-gray-500">Send email for failed login attempts</p>
            </div>
          </label>
        </div>
 
        <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="order-2 sm:order-1 border border-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="order-1 sm:order-2 bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg"
          >
            Save Settings
          </button>
        </div>
      </form>
    </ModalShell>
  );
}