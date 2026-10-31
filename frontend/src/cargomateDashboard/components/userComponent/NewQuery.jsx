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
  FiUser,
  FiGlobe,
  FiMessageSquare,
} from "react-icons/fi";

import { FaPlane } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

export default function NewQueryModal({ onClose }) {
  const [formData, setFormData] = useState({
    exportImport: "Export",
    transportMode: "Air Freight",
    origin: "Tirupur , india",
    destination: "Dubai,UAE",
    productName: "Cotton T - shirt",
    hsCode: "6109.10.00",
    quantity: "500",
    weight: "500",
  });
 
  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://api.example.com/queries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log("Query created:", result);
      onClose();
    } catch (error) {
      console.error("Failed to submit query:", error);
    }
  };
 
  return (
    <ModalShell>
      <div className="flex items-start justify-between">
        {/* <h2 className="text-lg sm:text-xl font-bold text-gray-900">
          New Query
        </h2> */}
         <h2 className="text-lg sm:text-xl font-bold text-gray-900">
          Product details
        </h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <FiX size={20} />
        </button>
      </div>
      <p className="text-sm text-gray-500 mt-1">
        Enter your shipment details to get AI-powered trade insights and
        recommendations.
      </p>
 
      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">
              Export / Import
            </label>
            <div className="relative">
              <select
                value={formData.exportImport}
                onChange={handleChange("exportImport")}
                className="w-full appearance-none border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option>Export</option>
                <option>Import</option>
              </select>
              <FiChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
            </div>
          </div>
 
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">
              Transport Mode
            </label>
            <div className="relative">
              <FaPlane className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <select
                value={formData.transportMode}
                onChange={handleChange("transportMode")}
                className="w-full appearance-none border border-gray-200 rounded-lg pl-9 pr-9 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option>Air Freight</option>
                <option>Sea Freight</option>
                <option>Road Freight</option>
              </select>
              <FiChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
            </div>
          </div>
        </div>
 
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">
              Origin (From)
            </label>
            <div className="relative">
              <FiMapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <input
                type="text"
                value={formData.origin}
                onChange={handleChange("origin")}
                className="w-full border border-gray-200 rounded-lg pl-9 pr-9 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <FiChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
            </div>
          </div>
 
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">
              Destination (To)
            </label>
            <div className="relative">
              <FiMapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <input
                type="text"
                value={formData.destination}
                onChange={handleChange("destination")}
                className="w-full border border-gray-200 rounded-lg pl-9 pr-9 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <FiChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
            </div>
          </div>
        </div>
 
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">
              Product Name
            </label>
            <div className="relative">
              <FiBox className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <input
                type="text"
                value={formData.productName}
                onChange={handleChange("productName")}
                className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>
 
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">
              HS Code <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={formData.hsCode}
              onChange={handleChange("hsCode")}
              className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
 
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">
              Quantity
            </label>
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <span className="pl-3.5 pr-2 text-gray-400">
                <FiHash size={14} />
              </span>
              <input
                type="text"
                value={formData.quantity}
                onChange={handleChange("quantity")}
                className="w-full py-2.5 text-sm text-gray-700 focus:outline-none"
              />
              <span className="px-3.5 text-sm text-gray-400 border-l border-gray-200 py-2.5">
                Pieces
              </span>
            </div>
          </div>
 
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">
              Weight (Kg)
            </label>
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <span className="pl-3.5 pr-2 text-gray-400">
                <FiBox size={14} />
              </span>
              <input
                type="text"
                value={formData.weight}
                onChange={handleChange("weight")}
                className="w-full py-2.5 text-sm text-gray-700 focus:outline-none"
              />
              <span className="px-3.5 text-sm text-gray-400 border-l border-gray-200 py-2.5">
                Kg
              </span>
            </div>
          </div>
        </div>
 
        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="w-full border border-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg"
          >
            Create Query
          </button>
        </div>
      </form>

    </ModalShell>
  );
}