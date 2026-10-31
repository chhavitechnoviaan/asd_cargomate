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
} from "react-icons/fi";
 
import ModalShell from "./ModalShell";


function UploadDropzone({ files, onFilesAdded }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);
 
  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    onFilesAdded(Array.from(e.dataTransfer.files));
  };
 
  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current.click()}
        className={`border-2 border-dashed rounded-xl py-8 flex flex-col items-center justify-center text-center px-4 cursor-pointer ${
          dragging ? "border-teal-400 bg-teal-50" : "border-gray-200"
        }`}
      >
        <FiUploadCloud size={24} className="text-gray-700 mb-2" />
        <p className="text-sm font-medium text-gray-700">
          Drag &amp; Drop files here or browse
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Supported formats: PDF, JPG, PNG (Max size 5 MB)
        </p>
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => onFilesAdded(Array.from(e.target.files))}
        />
      </div>
      {files.length > 0 && (
        <div className="mt-3 space-y-1.5">
          {files.map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-xs text-gray-600 border border-gray-100 rounded-lg px-3 py-1.5"
            >
              <FiPaperclip size={12} className="text-gray-400 shrink-0" />
              <span className="truncate">{f.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
 

export default function CertificateOfOrigin({ onClose }) {
  const [formData, setFormData] = useState({
    certificateNumber: "",
    certificateDate: "",
    shipmentReference: "",
    issuingChamber: "",
    countryOrigin: "",
    countryDestination: "",
    remarks: "",
  });
  const [files, setFiles] = useState([]);
 
  const updateField = (key, value) =>
    setFormData((prev) => ({ ...prev, [key]: value }));
 
  const addFiles = (newFiles) => setFiles((prev) => [...prev, ...newFiles]);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => payload.append(key, value));
      files.forEach((file) => payload.append("documents", file));
 
      const response = await fetch("https://api.example.com/certificate-of-origin", {
        method: "POST",
        body: payload,
      });
      const result = await response.json();
      console.log("Certificate generated:", result);
      onClose();
    } catch (error) {
      console.error("Failed to generate certificate:", error);
    }
  };
 
  return (
    <ModalShell width="max-w-lg">
      <div className="flex flex-col max-h-[85vh]">
        <div className="flex items-start justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center shrink-0">
              <FiFileText size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Certificate of Origin</h2>
              <p className="text-xs sm:text-sm text-gray-500">
                Create &amp; Download certificate of origin for your shipment
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <FiX size={20} />
          </button>
        </div>

        <div className="overflow-y-auto pr-1">
          <form onSubmit={handleSubmit}>
            <p className="text-sm font-bold text-gray-900 mt-5 mb-3">Basic information</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                  Certificate Number <span className="text-amber-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.certificateNumber}
                    onChange={(e) => updateField("certificateNumber", e.target.value)}
                    placeholder="Enter certificate Number"
                    className="w-full border border-gray-200 rounded-lg pl-3 pr-9 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <FiFileText className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                  Certificate Date <span className="text-amber-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.certificateDate}
                    onChange={(e) => updateField("certificateDate", e.target.value)}
                    placeholder="Select Date"
                    className="w-full border border-gray-200 rounded-lg pl-3 pr-9 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <FiCalendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                  Shipment Refrence <span className="text-amber-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.shipmentReference}
                  onChange={(e) => updateField("shipmentReference", e.target.value)}
                  placeholder="Enter Refrence (optional)"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                  Issuing Chamber <span className="text-amber-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.issuingChamber}
                    onChange={(e) => updateField("issuingChamber", e.target.value)}
                    className="w-full appearance-none border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select issuing character</option>
                    <option>FIEO</option>
                    <option>Local Chamber of Commerce</option>
                  </select>
                  <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={14} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                  Country of origin <span className="text-amber-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.countryOrigin}
                  onChange={(e) => updateField("countryOrigin", e.target.value)}
                  placeholder="Enter certificate Number"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                  Country of destination <span className="text-amber-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.countryDestination}
                    onChange={(e) => updateField("countryDestination", e.target.value)}
                    className="w-full appearance-none border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select Country</option>
                    <option>UAE</option>
                    <option>Germany</option>
                    <option>United States</option>
                  </select>
                  <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={14} />
                </div>
              </div>
            </div>

            <p className="text-sm font-bold text-gray-900 mt-5 mb-3">Additional Information</p>

            <textarea
              value={formData.remarks}
              onChange={(e) => updateField("remarks", e.target.value)}
              placeholder="Enter any Remarks"
              rows={3}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
            />

            <div className="flex items-center justify-between mt-4 mb-1.5">
              <label className="text-sm font-semibold text-gray-900">
                Upload documentation (optional)
              </label>
              <span className="text-xs text-gray-400">{files.length}/300</span>
            </div>
            <UploadDropzone files={files} onFilesAdded={addFiles} />

            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-between">
              <button
                type="button"
                onClick={onClose}
                className="border border-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg"
              >
                Generate certificate
              </button>
            </div>
          </form>
        </div>
      </div>
    </ModalShell>
  );
}