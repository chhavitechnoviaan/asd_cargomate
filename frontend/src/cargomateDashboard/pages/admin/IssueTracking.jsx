import { useState } from "react";
import { LuFileCog, LuTrash2 } from "react-icons/lu";

const initialIssues = [
  { type: "Document Pending", details: "Commercial invoice missing", raisedOn: "24 Apr 2025", status: "Open", badge: "text-gray-600" },
  { type: "Payment Pending", details: "Outstanding Charges", raisedOn: "24 Apr 2025", status: "Open", badge: "text-gray-600" },
  { type: "Customs Issues", details: "HS Code Verification Required", raisedOn: "24 Apr 2025", status: "In Progress", badge: "text-gray-600" },
  { type: "Delay", details: "Vessel delayed by 2 days", raisedOn: "24 Apr 2025", status: "Open", badge: "text-gray-600" },
];

export default function IssuingTracking() {
  const [issues, setIssues] = useState(initialIssues);

  const handleDelete = (index) => {
    setIssues((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 flex justify-center">
      <div className="w-full max-w-4xl bg-white rounded-2xl border border-gray-200 p-5 sm:p-8">
        <div className="flex items-start gap-3 mb-6">
          <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center text-green-500 shrink-0">
            <LuFileCog size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Issuing Tracking</h1>
            <p className="text-sm text-gray-500">Multiple can be linked to a shipment.</p>
          </div>
        </div>

        <div className="border border-gray-200 rounded-xl overflow-x-auto">
          <table className="w-full min-w-[650px] text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-200">
                <th className="p-4 font-medium">Issue Type</th>
                <th className="p-4 font-medium">Issue Details</th>
                <th className="p-4 font-medium">Raised on</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue, i) => (
                <tr key={i} className="border-b border-gray-100 last:border-0">
                  <td className="p-4 text-gray-700">{issue.type}</td>
                  <td className="p-4 text-gray-500">{issue.details}</td>
                  <td className="p-4 text-gray-500">{issue.raisedOn}</td>
                  <td className="p-4 text-gray-500">{issue.status}</td>
                  <td className="p-4">
                    <button onClick={() => handleDelete(i)} className="text-red-500">
                      <LuTrash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {issues.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-400">
                    No issues found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}