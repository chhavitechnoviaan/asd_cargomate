

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


function EditableRow({ label, value, onChange }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-2">
      <span className="text-sm font-semibold text-gray-500">{label}</span>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="text-sm font-bold text-gray-900 text-left sm:text-right bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-teal-400 rounded px-1 -mr-1"
      />
    </div>
  );
}

export default function EditGoodsInformationModal({ onClose }) {
  const [formData, setFormData] = useState({
    productDescription: "T-shirts, singlets and other vests, of cotton HS Code → 6109.10.00",
    hsCode: "6109.10.00",
    quantity: "500 kg",
    value: "₹124,680",
    incoterm: "FOB",
    packagingType: "Cartons",
    noOfPackages: "25",
    marksNumbers: "ASD/TSHIRT/S00/2025",
  });
 
  const updateField = (key, value) =>
    setFormData((prev) => ({ ...prev, [key]: value }));
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://api.example.com/shipments/goods-information", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log("Goods information updated:", result);
      onClose();
    } catch (error) {
      console.error("Failed to update goods information:", error);
    }
  };
 
  const fields = [
    { key: "productDescription", label: "Product Description" },
    { key: "hsCode", label: "HS Code" },
    { key: "quantity", label: "Quantity" },
    { key: "value", label: "Value (INR)" },
    { key: "incoterm", label: "Incoterm" },
    { key: "packagingType", label: "Packaging Type" },
    { key: "noOfPackages", label: "No. of Packages" },
    { key: "marksNumbers", label: "Marks & Numbers" },
  ];
 
  return (
    <ModalShell width="max-w-lg">
      <h2 className="text-xl font-bold text-gray-900">Edit Goods Information</h2>
      <p className="text-sm text-gray-500 mt-1">
        Update your shipment product details before proceeding.
      </p>
 
      <form onSubmit={handleSubmit}>
        <div className="mt-4 divide-y divide-gray-100">
          {fields.map((f) => (
            <EditableRow
              key={f.key}
              label={f.label}
              value={formData[f.key]}
              onChange={(e) => updateField(f.key, e.target.value)}
            />
          ))}
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
            Save Changes
          </button>
        </div>
      </form>
    </ModalShell>
  );
}