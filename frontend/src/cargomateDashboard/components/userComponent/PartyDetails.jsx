import { useState } from "react";
import { FiX, FiBarChart2, FiTruck, FiShield } from "react-icons/fi";
import { FaPlane } from "react-icons/fa";

const parties = [
  {
    role: "EXPORTER / SHIPPER",
    roleColor: "text-green-600",
    borderColor: "border-green-200",
    icon: FiBarChart2,
    iconColor: "text-green-600 bg-green-50",
    name: "ASD Exports Pvt. Ltd.",
    fields: [
      { label: "GSTIN", value: "33AABCA1234B1Z5", valueColor: "text-green-600" },
      { label: "Contact Person", value: "Arjun Soni" },
      { label: "Email", value: "exports@asd.com" },
      { label: "Phone", value: "+91 98765 43210" },
      { label: "Address", value: "SIDCO Industrial Estate, Tirupur, Tamil Nadu 641602, India" },
    ],
  },
  {
    role: "IMPORTER / CONSIGNEE",
    roleColor: "text-blue-600",
    borderColor: "border-blue-200",
    icon: FiBarChart2,
    iconColor: "text-blue-600 bg-blue-50",
    name: "AYZ Trading LLC.",
    fields: [
      { label: "TRN", value: "100234567890001", valueColor: "text-blue-600" },
      { label: "Contact Person", value: "Ahmed Khan" },
      { label: "Email", value: "imports@ayz.ae" },
      { label: "Phone", value: "+971 50 123 4567" },
      { label: "Address", value: "Al Quoz Industrial Area, Dubai, United Arab Emirates" },
    ],
  },
  {
    role: "FREIGHT FORWARDER",
    roleColor: "text-gray-900",
    borderColor: "border-gray-200",
    icon: FiTruck,
    iconColor: "text-teal-600 bg-teal-50",
    name: "IndiGo Cargo.",
    fields: [
      { label: "Contact Person", value: "Cargo Operations" },
      { label: "Email", value: "cargo@goindigo.in" },
      { label: "Phone", value: "+91 124 4973838" },
      { label: "Office", value: "New Delhi, India" },
    ],
  },
  {
    role: "CARRIER",
    roleColor: "text-gray-900",
    borderColor: "border-gray-200",
    icon: FaPlane,
    iconColor: "text-teal-600 bg-teal-50",
    name: "Emirates SkyCargo",
    fields: [
      { label: "Airway Bill", value: "AWB-9931234589" },
      { label: "Flight", value: "EK-566" },
      { label: "Email", value: "skycargo@emirates.com" },
      { label: "Phone", value: "+971 600 555555" },
    ],
  },
  {
    role: "CUSTOMS BROKER",
    roleColor: "text-gray-900",
    borderColor: "border-gray-200",
    icon: FiShield,
    iconColor: "text-teal-600 bg-teal-50",
    name: "Dubai Customs Services",
    fields: [
      { label: "Broker ID", value: "DCS-987654" },
      { label: "Contact", value: "6B7280" },
      { label: "Phone", value: "+971 4 1234567" },
      { label: "Email", value: "info@dubacustoms.ae" },
    ],
  },
];

function PartyCard({ party }) {
  const Icon = party.icon;
  return (
    <div className={`border rounded-xl p-4 ${party.borderColor}`}>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${party.iconColor}`}>
          <Icon size={18} />
        </div>
        <div>
          <p className={`text-xs font-bold tracking-wide ${party.roleColor}`}>
            {party.role}
          </p>
          <p className="text-sm font-bold text-gray-900">{party.name}</p>
        </div>
      </div>

      <div className="mt-3 space-y-2">
        {party.fields.map((f) => (
          <div key={f.label} className="grid grid-cols-[100px_1fr] gap-2 text-sm">
            <span className="text-gray-400">{f.label}</span>
            <span className={`font-medium ${f.valueColor || "text-gray-900"}`}>
              {f.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PartyDetailsModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl mt-4 sm:mt-10 p-4 sm:p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Party Details</h2>
            <p className="text-sm text-gray-500 mt-1">
              Complete information of all parties involved in this shipment.
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 shrink-0">
            <FiX size={20} />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {parties.map((party) => (
            <PartyCard key={party.role} party={party} />
          ))}
        </div>
      </div>
    </div>
  );
}

