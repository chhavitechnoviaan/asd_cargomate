
import { useState, useMemo } from "react";
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

const templates = [
  { name: "Commercial Invoice Template", tag: "Invoice", tagColor: "bg-blue-50 text-blue-600", fileType: "PDF" },
  { name: "Packing List Template", tag: "Packing List", tagColor: "bg-green-50 text-green-600", fileType: "Excel" },
  { name: "Certificate of origin Template", tag: "Certificate", tagColor: "bg-sky-50 text-sky-600", fileType: "PDF" },
  { name: "Airway Bill Template", tag: "Airway Bill", tagColor: "bg-purple-50 text-purple-600", fileType: "PDF" },
  { name: "Delivery Note Template", tag: "Delivery Note", tagColor: "bg-orange-50 text-orange-600", fileType: "PDF" },
  { name: "Proforma Invoice Template", tag: "Invoice", tagColor: "bg-blue-50 text-blue-600", fileType: "PDF" },
  { name: "Insurance Certificate Template", tag: "Certificate", tagColor: "bg-sky-50 text-sky-600", fileType: "PDF" },
  { name: "Weight List Template", tag: "Packing List", tagColor: "bg-green-50 text-green-600", fileType: "Excel" },
  { name: "Inspection Report Template", tag: "Report", tagColor: "bg-amber-50 text-amber-600", fileType: "PDF" },
];
 
const categories = ["All Categories", ...Array.from(new Set(templates.map((t) => t.tag)))];

export default function AllDocumentsTemplateModal({ onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All Categories");
 
  const filteredTemplates = useMemo(() => {
    return templates.filter((t) => {
      const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = category === "All Categories" || t.tag === category;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, category]);
 
  return (
    <ModalShell width="max-w-lg">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center shrink-0">
            <FiFileText size={18} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">All Documents Template</h2>
            <p className="text-sm text-gray-500">
              Browse and use pre-built templates to create documents faster
            </p>
          </div>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 shrink-0">
          <FiX size={20} />
        </button>
      </div>
 
      <div className="mt-5 flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search templates..."
            className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="relative">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full sm:w-auto appearance-none border border-gray-200 rounded-lg pl-3 pr-8 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <FiChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
        </div>
      </div>
 
      <div className="mt-4 overflow-x-auto">
        <div className="min-w-[420px]">
          <div className="grid grid-cols-[1.6fr_1fr_1fr_0.8fr] text-xs font-semibold text-gray-400 px-1 pb-2">
            <span>Template Name</span>
            <span>Refrence ID</span>
            <span>Uploaded on</span>
            <span>Actions</span>
          </div>
          <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
            {filteredTemplates.map((t) => (
              <div
                key={t.name}
                className="grid grid-cols-[1.6fr_1fr_1fr_0.8fr] items-center px-1 py-3 gap-2"
              >
                <span className="text-sm font-semibold text-gray-900">{t.name}</span>
                <span className={`w-fit text-xs font-medium px-2.5 py-1 rounded-full ${t.tagColor}`}>
                  {t.tag}
                </span>
                <span className="w-fit text-xs font-medium px-2.5 py-1 rounded-full bg-red-50 text-red-600">
                  {t.fileType}
                </span>
                <div className="flex items-center gap-3 text-gray-500">
                  <button type="button">
                    <FiEye size={15} />
                  </button>
                  <button type="button">
                    <FiDownload size={15} />
                  </button>
                </div>
              </div>
            ))}
            {filteredTemplates.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-6">
                No templates found.
              </p>
            )}
          </div>
        </div>
      </div>
 
      <div className="mt-5 flex justify-end">
        <button
          onClick={onClose}
          className="border border-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-lg"
        >
          Close
        </button>
      </div>
    </ModalShell>
  );
}