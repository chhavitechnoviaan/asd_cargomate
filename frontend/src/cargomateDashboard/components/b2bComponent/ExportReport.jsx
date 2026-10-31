import React, { useState } from "react";
import {
  LayoutGrid,
  Truck,
  TrendingUp,
  Users,
  FileText,
  FileSpreadsheet,
  Search,
  X,
} from "lucide-react";

const reportTypes = [
  { id: "dashboardSummary", label: "Dashboard Summary", icon: LayoutGrid, iconColor: "text-blue-500" },
  { id: "shipmentReport", label: "Shipment Report", icon: Truck, iconColor: "text-green-500" },
  { id: "tradeValueReport", label: "Trade Value Report", icon: TrendingUp, iconColor: "text-purple-500" },
  { id: "partnerReport", label: "Partner Report", icon: Users, iconColor: "text-orange-500" },
];

const formatTypes = [
  { id: "pdf", label: "PDF", icon: FileText, iconColor: "text-red-500" },
  { id: "excel", label: "Excel", icon: FileSpreadsheet, iconColor: "text-green-600" },
];

const initialFormState = {
  reportType: "dashboardSummary",
  format: "pdf",
  dateRange: "",
};

export default function ExportReport({ onClose }) {
  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleReportTypeChange = (id) => {
    setFormData((prev) => ({ ...prev, reportType: id }));
  };

  const handleFormatChange = (id) => {
    setFormData((prev) => ({ ...prev, format: id }));
  };

  const handleDateChange = (e) => {
    setFormData((prev) => ({ ...prev, dateRange: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/reports/export", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to export report");
      }

      const data = await response.json();
      console.log("Report exported:", data);
      if (onClose) onClose();
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start sm:items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl my-4 sm:my-0 flex flex-col max-h-[80vh]">
        <div className="flex items-start justify-between gap-3 p-4 sm:p-6 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">Export Report</h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
              Export your dashboard data in the format you need.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6"
        >
          {error && (
            <div className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Select Report Type</h3>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {reportTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = formData.reportType === type.id;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => handleReportTypeChange(type.id)}
                    className={`flex items-center gap-2 px-3 py-3 rounded-lg border text-sm text-gray-700 transition-colors ${
                      isSelected
                        ? "border-blue-500 ring-1 ring-blue-500"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${type.iconColor}`} />
                    <span className="truncate">{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Choose Format</h3>
              <div className="grid grid-cols-2 gap-3">
                {formatTypes.map((format) => {
                  const Icon = format.icon;
                  const isSelected = formData.format === format.id;
                  return (
                    <button
                      key={format.id}
                      type="button"
                      onClick={() => handleFormatChange(format.id)}
                      className={`flex items-center gap-2 px-3 py-3 rounded-lg border text-sm text-gray-700 transition-colors ${
                        isSelected
                          ? "border-blue-500 ring-1 ring-blue-500"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <span
                        className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 border ${
                          isSelected ? "bg-blue-500 border-blue-500" : "border-gray-300"
                        }`}
                      >
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-white" />
                        )}
                      </span>
                      <Icon className={`w-4 h-4 shrink-0 ${format.iconColor}`} />
                      <span className="truncate">{format.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Search Date Range</h3>
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={formData.dateRange}
                  onChange={handleDateChange}
                  placeholder="Search date..."
                  className="w-full text-sm rounded-lg border border-gray-200 pl-9 pr-4 py-2.5 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                />
              </div>
            </div>
          </div>
        </form>

        <div className="flex items-center justify-end px-4 sm:px-6 py-4 border-t border-gray-100 shrink-0">
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-5 py-2.5 text-sm font-medium rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors disabled:opacity-60"
          >
            {isSubmitting ? "Exporting..." : "Export Report"}
          </button>
        </div>
      </div>
    </div>
  );
}