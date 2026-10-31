

import { useState } from "react";
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


function YesNoRadio({ label, value, onChange }) {
  return (
    <div className="py-2">
      <p className="text-sm text-gray-900 mb-1.5">{label}</p>
      <div className="flex items-center gap-8">
        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <input
            type="radio"
            checked={value === "yes"}
            onChange={() => onChange("yes")}
            className="w-4 h-4 accent-teal-500"
          />
          Yes
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <input
            type="radio"
            checked={value === "no"}
            onChange={() => onChange("no")}
            className="w-4 h-4 accent-teal-500"
          />
          No
        </label>
      </div>
    </div>
  );
}
 
export default function EditAdditionalInformationModal({ onClose }) {
  const [formData, setFormData] = useState({
    insurance: "no",
    specialHandling: "no",
    temperatureControl: "no",
    dangerousGoods: "no",
    remarks: "Handle with care",
  });
 
  const updateField = (key, value) =>
    setFormData((prev) => ({ ...prev, [key]: value }));
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://api.example.com/shipments/additional-information", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log("Additional information updated:", result);
      onClose();
    } catch (error) {
      console.error("Failed to update additional information:", error);
    }
  };
 
  return (
    <ModalShell>
      <h2 className="text-xl font-bold text-gray-900">Edit Additional Information</h2>
      <p className="text-sm text-gray-500 mt-1">
        Update shipment handling and additional preferences.
      </p>
 
      <form onSubmit={handleSubmit}>
        <div className="mt-4 divide-y divide-gray-100">
          <YesNoRadio
            label="Insurance"
            value={formData.insurance}
            onChange={(v) => updateField("insurance", v)}
          />
          <YesNoRadio
            label="Special Handling"
            value={formData.specialHandling}
            onChange={(v) => updateField("specialHandling", v)}
          />
          <YesNoRadio
            label="Temperature Control"
            value={formData.temperatureControl}
            onChange={(v) => updateField("temperatureControl", v)}
          />
          <YesNoRadio
            label="Dangerous Goods"
            value={formData.dangerousGoods}
            onChange={(v) => updateField("dangerousGoods", v)}
          />
        </div>
 
        <label className="block text-sm text-gray-900 mt-4 mb-1.5">Remarks</label>
        <textarea
          value={formData.remarks}
          onChange={(e) => updateField("remarks", e.target.value)}
          rows={3}
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
        />
 
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
            Save Changes
          </button>
        </div>
      </form>
    </ModalShell>
  );
}