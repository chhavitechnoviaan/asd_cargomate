import { useState } from "react";
import { Filter, RotateCcw } from "lucide-react";

const emptyFilters = {
  requestId: "",
  companyUser: "",
  shipmentType: "",
  status: "",
  route: "",
  submittedOnStart: "",
  submittedOnEnd: "",
  dueForReview: "",
  reviewTime: "",
  riskScore: "",
  compliance: "",
  documentUploaded: "",
  allRiskScore: "",
  createdBy: "",
  sortBy: "",
  sortOrder: "",
};

const fieldConfig = [
  ["requestId", "Request ID", "Enter Request ID", "input"],
  ["companyUser", "Company / User", "Select Company & User"],
  ["shipmentType", "Shipment Type", "SelectShipment Type"],
  ["status", "Status", "Select Status"],
  ["route", "Route", "Select Route"],
  ["submittedOnStart", "Submited On", "Select Start Date"],
  ["submittedOnEnd", "Submited On", "Select Start Date"],
  ["dueForReview", "Due For Review", "Select Due For Review"],
  ["reviewTime", "Reviw Time", "Select Review Time"],
  ["riskScore", "Risk Score", "Select Risk Score"],
  ["compliance", "Compliance", "Select Compliance"],
  ["documentUploaded", "Document Uploaded", "Select Document Uploaded"],
  ["allRiskScore", "All Risk Score", "Select All Risk Score"],
  ["createdBy", "Created By", "Select Created By"],
  ["sortBy", "Sort By", "Select Sort By"],
  ["sortOrder", "Sort Order", "Select Order By"],
];

export default function FilterRequests({ onClose, onApply }) {
  const [filters, setFilters] = useState(emptyFilters);

  const handleChange = (field) => (e) => setFilters({ ...filters, [field]: e.target.value });

  const handleApply = async () => {
    try {
      const res = await fetch("/api/requests/filter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filters),
      });
      const data = await res.json();
      if (onApply) onApply(data);
    } catch (err) {
      if (onApply) onApply(filters);
    }
  };

  const clearAll = () => setFilters(emptyFilters);

  const selectClass = "w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-500";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center gap-2 mb-6">
          <Filter className="w-5 h-5 text-indigo-600" />
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Filter Requests</h2>
            <p className="text-sm text-gray-500">Apply filters to narrow down shipment requests.</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {fieldConfig.map(([key, label, placeholder]) => (
            <div key={key}>
              <label className="block text-sm font-semibold text-gray-900 mb-1">{label}</label>
              <select value={filters[key]} onChange={handleChange(key)} className={selectClass}>
                <option value="">{placeholder}</option>
              </select>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <button
            onClick={clearAll}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-800 font-semibold text-sm"
          >
            <RotateCcw className="w-4 h-4" /> Clear All
          </button>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="flex items-center gap-2 px-6 py-2 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-700  whitespace-nowrap"
            >
              <Filter className="w-4 h-4" /> Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}