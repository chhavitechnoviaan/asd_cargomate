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

import ModalShell from "./ModalShell";
const schemes = [
  { name: "RoDTEP", type: "Central", benefit: "₹4,992", status: "Eligible" },
  { name: "MEIS", type: "Central", benefit: "₹624", status: "Eligible" },
  { name: "State Incentive (Tamil Nadu)", type: "State", benefit: "₹2,496", status: "Eligible" },
  { name: "IGST Refund", type: "Central", benefit: "₹0", status: "Not Applicable" },
];
 
const eligibilityChecklist = [
  "IEC Verified",
  "GST Registered",
  "Shipping Bill Uploaded",
  "HS Code Valid",
  "Product Eligible",
  "Export Value Eligible",
];
 
const benefitSummary = [
  { label: "RoDTEP", value: "₹4,992" },
  { label: "MEIS", value: "₹624" },
  { label: "State Incentive", value: "₹2,496" },
];
 
const requiredDocuments = [
  "Shipping Bill",
  "Commercial Invoice",
  "Packing List",
  "Bill of Lading",
  "GST Certificate",
  "Export Declaration",
];
 
const remarks = [
  "All mandatory export documents have been verified.",
  "Estimated incentives are calculated using current DGFT & State policies.",
  "Final approval is subject to government verification.",
];
 

export default function ViewShipmentEligibility({ onClose }) {
  return (
    <ModalShell width="max-w-lg">
      <div className="flex flex-col max-h-[85vh]">
        <div className="flex items-start justify-between shrink-0">
          <div className="flex items-center gap-2">
            <FiPackage size={16} className="text-gray-900" />
            <div>
              <h2 className="text-base font-bold text-gray-900">
                View Shipment Eligibility
              </h2>
              <p className="text-xs text-gray-500">
                Review applicable incentive schemes and eligibility details for
                this shipment.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700">
              <FiDownload size={14} />
              Download
            </button>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <FiX size={18} />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto pr-1">
          <div className="mt-4 border border-blue-200 rounded-xl p-4">
            <p className="text-sm font-bold text-gray-900 flex items-center gap-1.5 mb-3">
              <FiPackage size={14} />
              Shipment Summary
            </p>
            <div className="grid grid-cols-2 gap-y-2.5 text-sm">
              <span className="text-gray-500">Shipment ID</span>
              <span className="font-semibold text-gray-900">SHP-2026-001245</span>
              <span className="text-gray-500">Product</span>
              <span className="font-semibold text-gray-900">Cotton T-Shirts</span>
              <span className="text-gray-500">Destination</span>
              <span className="font-semibold text-gray-900">Germany</span>
              <span className="text-gray-500">Shipment Date</span>
              <span className="font-semibold text-gray-900">15 Jul 2026</span>
              <span className="text-gray-500">Exporter</span>
              <span className="font-semibold text-gray-900">Arjun Soni</span>
              <span className="text-gray-500">HS Code</span>
              <span className="font-semibold text-gray-900">6109.10.00</span>
              <span className="text-gray-500">Export Value</span>
              <span className="font-semibold text-gray-900">₹1,24,800</span>
              <span className="text-gray-500">Status</span>
              <span className="font-semibold text-green-600">Completed</span>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm font-bold text-gray-900 mb-2">Applicable Schemes</p>
            <div className="border border-gray-100 rounded-xl overflow-hidden">
              <div className="grid grid-cols-4 bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-500">
                <span className="col-span-2">Scheme</span>
                <span>Benefit</span>
                <span>Status</span>
              </div>
              {schemes.map((s) => (
                <div
                  key={s.name}
                  className="grid grid-cols-4 px-3 py-2.5 text-sm border-t border-gray-100 items-center"
                >
                  <div className="col-span-2">
                    <p className="font-semibold text-gray-900">{s.name}</p>
                    <p className="text-xs text-gray-400">{s.type}</p>
                  </div>
                  <span className="text-gray-900">{s.benefit}</span>
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                      s.status === "Eligible" ? "text-green-600" : "text-gray-400"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        s.status === "Eligible" ? "bg-green-500" : "bg-gray-300"
                      }`}
                    />
                    {s.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div className="border border-gray-100 rounded-xl p-4">
              <p className="text-sm font-bold text-gray-900 flex items-center gap-1.5 mb-3">
                <FiCheckCircle size={14} className="text-green-500" />
                Eligibility Checklist
              </p>
              <div className="space-y-2">
                {eligibilityChecklist.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-700">
                    <FiCheckCircle size={14} className="text-green-500 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-gray-100 rounded-xl p-4">
              <p className="text-sm font-bold text-gray-900 flex items-center gap-1.5 mb-3">
                <FiDollarSign size={14} className="text-amber-500" />
                Benefit Summary
              </p>
              <div className="space-y-2">
                {benefitSummary.map((b) => (
                  <div key={b.label} className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{b.label}</span>
                    <span className="font-semibold text-gray-900">{b.value}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between text-sm border-t border-gray-100 pt-2 mt-2">
                  <span className="text-gray-500">Total Estimated Benefit</span>
                  <span className="font-bold text-gray-900">₹8,420</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 border border-gray-100 rounded-xl p-4">
            <p className="text-sm font-bold text-gray-900 flex items-center gap-1.5 mb-3">
              <FiFileText size={14} />
              Required Documents
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {requiredDocuments.map((doc) => (
                <div key={doc} className="flex items-center gap-2 text-sm text-gray-700">
                  <FiCheckCircle size={14} className="text-green-500 shrink-0" />
                  {doc}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 border border-gray-100 rounded-xl p-4">
            <p className="text-sm font-bold text-gray-900 flex items-center gap-1.5 mb-3">
              <FiEdit3 size={14} />
              Remarks
            </p>
            <ul className="space-y-1.5">
              {remarks.map((r) => (
                <li key={r} className="text-sm text-gray-600 flex gap-1.5">
                  <span>•</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          <button className="w-full mt-4 bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold py-2.5 rounded-lg">
            Download Report
          </button>

          <div className="mt-3 flex flex-col sm:flex-row gap-2">
            <button className="flex-1 border border-gray-200 text-gray-700 text-sm font-medium py-2.5 rounded-lg">
              Save Report
            </button>
            <button className="flex-1 inline-flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 rounded-lg">
              <FiMessageSquare size={14} />
              Chat with Expert
            </button>
            <button
              onClick={onClose}
              className="flex-1 border border-gray-200 text-gray-700 text-sm font-medium py-2.5 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}