

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
function PartyFields({ prefix, data, onChange }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm text-gray-700 mb-1">
          Company Name<span className="text-amber-500">*</span>
        </label>
        <input
          type="text"
          value={data.companyName}
          onChange={(e) => onChange(prefix, "companyName", e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-700 mb-1">Contact Person</label>
        <input
          type="text"
          value={data.contactPerson}
          onChange={(e) => onChange(prefix, "contactPerson", e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Phone Number<span className="text-amber-500">*</span>
          </label>
          <input
            type="text"
            value={data.phoneNumber}
            onChange={(e) => onChange(prefix, "phoneNumber", e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Email Address<span className="text-amber-500">*</span>
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => onChange(prefix, "email", e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm text-gray-700 mb-1">Address</label>
        <input
          type="text"
          value={data.address}
          onChange={(e) => onChange(prefix, "address", e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">City</label>
          <input
            type="text"
            value={data.city}
            onChange={(e) => onChange(prefix, "city", e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Country</label>
          <input
            type="text"
            value={data.country}
            onChange={(e) => onChange(prefix, "country", e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm text-gray-700 mb-1">Postal Code</label>
        <input
          type="text"
          value={data.postalCode}
          onChange={(e) => onChange(prefix, "postalCode", e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>
    </div>
  );
}
 
export default function EditPartiesInformationModal({ onClose }) {
  const emptyParty = {
    companyName: "",
    contactPerson: "",
    phoneNumber: "",
    email: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
  };
 
  const [formData, setFormData] = useState({
    exporter: { ...emptyParty },
    importer: { ...emptyParty },
  });
 
  const updateField = (party, key, value) =>
    setFormData((prev) => ({
      ...prev,
      [party]: { ...prev[party], [key]: value },
    }));
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://api.example.com/shipments/parties-information", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log("Parties information updated:", result);
      onClose();
    } catch (error) {
      console.error("Failed to update parties information:", error);
    }
  };
 
  return (
    <ModalShell width="max-w-md">
      <h2 className="text-xl font-bold text-gray-900">Edit Parties Information</h2>
      <p className="text-sm text-gray-500 mt-1">
        Update exporter and importer information.
      </p>
 
      <form onSubmit={handleSubmit}>
        <p className="text-sm font-bold text-gray-900 mt-5 mb-3">
          Exporter (Ship From)
        </p>
        <PartyFields prefix="exporter" data={formData.exporter} onChange={updateField} />
 
        <p className="text-sm font-bold text-gray-900 mt-6 mb-3">
          Importer (Ship To)
        </p>
        <PartyFields prefix="importer" data={formData.importer} onChange={updateField} />
 
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
 