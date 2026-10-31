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
 

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`w-10 h-5 rounded-full flex items-center px-0.5 transition-colors ${
        checked ? "bg-teal-500 justify-end" : "bg-gray-300 justify-start"
      }`}
    >
      <span className="w-4 h-4 bg-white rounded-full" />
    </button>
  );
}

export default function SharePlan({ onClose }) {
  const [formData, setFormData] = useState({
    shareMethod: "email",
    emails: "",
    teamMember: "",
    shareableLinkEnabled: false,
    message: "",
    permissions: "View Only",
  });
 
  const updateField = (key, value) =>
    setFormData((prev) => ({ ...prev, [key]: value }));
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://api.example.com/shipment-plan/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log("Plan shared:", result);
      onClose();
    } catch (error) {
      console.error("Failed to share plan:", error);
    }
  };
 
  return (
    <ModalShell>
      <div className="flex flex-col">
        <div className="flex items-start justify-between pb-4 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Share Plan</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Share this shipment plan with your team or partners.
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 shrink-0">
            <FiX size={20} />
          </button>
        </div>

        <div className="pr-1">
          <form onSubmit={handleSubmit}>
            <p className="text-sm font-bold text-gray-900 mt-4 mb-2">Latest Update</p>
            <div className="border border-gray-100 rounded-xl p-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                <FiCopy size={15} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900">Shipment Plan</p>
                <p className="text-xs text-gray-500">PLN-2025-04-24-000123</p>
                <p className="text-xs text-gray-500">Nhava Sheva (IN) → Dubai (AE)</p>
              </div>
              {/* <button
                type="button"
                className="inline-flex items-center gap-1.5 border border-gray-200 text-xs font-medium text-gray-700 px-3 py-1.5 rounded-lg shrink-0"
              >
                <FiEye size={12} />
                Preview Plan
              </button> */}
            </div>

            <p className="text-sm font-bold text-gray-900 mt-5 mb-2">Share With</p>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="shareMethod"
                checked={formData.shareMethod === "email"}
                onChange={() => updateField("shareMethod", "email")}
                className="w-4 h-4 accent-teal-500"
              />
              <span className="text-sm font-semibold text-gray-900">Email</span>
            </label>
            <input
              type="text"
              value={formData.emails}
              onChange={(e) => updateField("emails", e.target.value)}
              placeholder="Enter email addresses (comma separated)"
              className="w-full mt-2 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <p className="text-xs text-gray-400 mt-1">
              You can add multiple email addresses
            </p>

            <label className="flex items-center gap-2 cursor-pointer mt-4">
              <input
                type="radio"
                name="shareMethod"
                checked={formData.shareMethod === "team"}
                onChange={() => updateField("shareMethod", "team")}
                className="w-4 h-4 accent-teal-500"
              />
              <span className="text-sm font-semibold text-gray-900">Team Member</span>
            </label>
            <div className="relative mt-2">
              <select
                value={formData.teamMember}
                onChange={(e) => updateField("teamMember", e.target.value)}
                className="w-full appearance-none border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Select team member</option>
                <option>Arjun Soni</option>
                <option>Priya Mehta</option>
              </select>
              <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={14} />
            </div>

            <div className="flex items-center justify-between mt-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="shareMethod"
                  checked={formData.shareMethod === "link"}
                  onChange={() => updateField("shareMethod", "link")}
                  className="w-4 h-4 accent-teal-500"
                />
                <span className="text-sm font-semibold text-gray-900">Shareable Link</span>
              </label>
              <Toggle
                checked={formData.shareableLinkEnabled}
                onChange={(val) => updateField("shareableLinkEnabled", val)}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1 ml-6">
              Anyone with the link can view the plan
            </p>

            <label className="block text-sm font-semibold text-gray-900 mt-5 mb-1.5">
              Message (Optional)
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => updateField("message", e.target.value)}
              placeholder="Add a message (optional)..."
              rows={3}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
            />

            <div className="flex items-center gap-1.5 mt-5 mb-1.5">
              <label className="text-sm font-semibold text-gray-900">Permissions</label>
              <FiInfo size={13} className="text-gray-400" />
            </div>
            <div className="relative">
              <select
                value={formData.permissions}
                onChange={(e) => updateField("permissions", e.target.value)}
                className="w-full appearance-none border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option>View Only</option>
                <option>Can Edit</option>
                <option>Can Comment</option>
              </select>
              <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={14} />
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Recipients can only view the plan
            </p>

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
                Share Plan
              </button>
            </div>
          </form>
        </div>
      </div>
    </ModalShell>
  );
}