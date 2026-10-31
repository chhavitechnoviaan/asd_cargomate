import { useState } from "react";
import { Building2 } from "lucide-react";

export default function CompanyIntelligence({ onClose }) {
  const [companyName, setCompanyName] = useState("Global Exports Pvt. Ltd.");
  const [result, setResult] = useState({
    tradeActivity: "High",
    riskLevel: "Low",
    lastUpdated: "20 May, 2025",
  });
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/company-intelligence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyName }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl p-4 sm:p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0">
          <Building2 className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Company Intelligence</h2>
          <p className="text-sm text-gray-500">Get insight and trade intelligence about compnanies</p>
        </div>
      </div>

      <label className="block text-sm font-semibold text-gray-900 mb-1">Company Name</label>
      <input
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-600 mb-5"
      />

      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-900">Trade Activity</span>
          <span className="text-xs font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full">
            {result.tradeActivity}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-900">Risk level</span>
          <span className="text-xs font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full">
            {result.riskLevel}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-900">Last Updated</span>
          <span className="text-sm text-gray-500">{result.lastUpdated}</span>
        </div>
      </div>

      <button
        onClick={onClose}
        className="px-6 py-2 rounded-full border border-gray-300 text-gray-700 text-sm hover:bg-gray-50"
      >
        Close
      </button>
    </div>
  );
}