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

import { FaShip, FaAnchor } from "react-icons/fa";

import ModalShell from "./ModalShell";
export default function BookShipmentModal({ onClose }) {
  const [formData, setFormData] = useState({
    preferredCarrier: "All Entity Type",
    requestedETD: "30 Apr 2025",
    containerType: "40ft Standard",
    incoterm: "FOB (Exporter)",
    specialInstructions: "",
    referenceNumber: "",
  });
 
  const updateField = (key, value) =>
    setFormData((prev) => ({ ...prev, [key]: value }));
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://api.example.com/shipments/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log("Shipment booked:", result);
      onClose();
    } catch (error) {
      console.error("Failed to book shipment:", error);
    }
  };
 
  const summary = [
    { label: "Shipment ID", value: "PLN-2025-04-24-000123" },
    { label: "Route", value: "Nhava Sheva (IN) → Dubai (AE)" },
    { label: "Mode", value: "Sea Freight (FCL)" },
    { label: "Commodity", value: "Apparel & Accessories" },
    { label: "Total Estimated Cost", value: "₹24,860" },
    { label: "Estimated Transit Time", value: "18–22 Days" },
  ];
 
  return (
    <ModalShell width="max-w-lg">
      <div className="flex flex-col">
        <div className="flex items-start justify-between pb-4 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
              <FiTruck size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Book Shipment</h2>
              <p className="text-sm text-gray-500">
                Confirm your shipment details and proceed to booking.
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 shrink-0">
            <FiX size={20} />
          </button>
        </div>

        <div className="pr-1">
          <p className="text-sm font-bold text-gray-900 mt-4 mb-2">Shipment Summary</p>
          <div className="bg-gray-50 rounded-xl p-4 space-y-2.5">
            {summary.map((s) => (
              <div key={s.label} className="flex items-center justify-between gap-3">
                <span className="text-sm text-gray-500">{s.label}</span>
                <span className="text-sm font-semibold text-gray-900 text-right">
                  {s.value}
                </span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <p className="text-sm font-bold text-gray-900 mt-5 mb-3">Booking Details</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Preferred Carrier</label>
                <div className="relative">
                  <select
                    value={formData.preferredCarrier}
                    onChange={(e) => updateField("preferredCarrier", e.target.value)}
                    className="w-full appearance-none border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option>All Entity Type</option>
                    <option>Maersk Line</option>
                    <option>MSC</option>
                  </select>
                  <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={14} />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Requested ETD</label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.requestedETD}
                    onChange={(e) => updateField("requestedETD", e.target.value)}
                    className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Container Type</label>
                <div className="relative">
                  <select
                    value={formData.containerType}
                    onChange={(e) => updateField("containerType", e.target.value)}
                    className="w-full appearance-none border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option>40ft Standard</option>
                    <option>20ft Standard</option>
                    <option>40ft High Cube</option>
                  </select>
                  <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={14} />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Incoterm</label>
                <div className="relative">
                  <select
                    value={formData.incoterm}
                    onChange={(e) => updateField("incoterm", e.target.value)}
                    className="w-full appearance-none border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option>FOB (Exporter)</option>
                    <option>CIF</option>
                    <option>EXW</option>
                  </select>
                  <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={14} />
                </div>
              </div>
            </div>

            <p className="text-sm font-bold text-gray-900 mt-5 mb-3">
              Additional Information (Optional)
            </p>

            <label className="block text-xs text-gray-500 mb-1">Special Instructions</label>
            <textarea
              value={formData.specialInstructions}
              onChange={(e) => updateField("specialInstructions", e.target.value)}
              placeholder="Type any special instructions..."
              rows={3}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
            />

            <label className="block text-xs text-gray-500 mt-4 mb-1">
              Reference (PO / Contract No.)
            </label>
            <input
              type="text"
              value={formData.referenceNumber}
              onChange={(e) => updateField("referenceNumber", e.target.value)}
              placeholder="Enter reference number"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />

            <div className="mt-4 bg-blue-50 rounded-xl p-3 flex items-start gap-2">
              <FiInfo size={15} className="text-blue-500 mt-0.5 shrink-0" />
              <p className="text-sm text-gray-600">
                By proceeding, you agree to our{" "}
                <span className="text-teal-600 font-medium">Terms &amp; Conditions</span> and{" "}
                <span className="text-teal-600 font-medium">Booking Policy.</span>
              </p>
            </div>

            <div className="mt-5 flex flex-col sm:flex-row gap-3 sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                className="order-2 sm:order-1 border border-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="order-1 sm:order-2 inline-flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg"
              >
                <FiTruck size={16} />
                Proceed to Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </ModalShell>
  );
}