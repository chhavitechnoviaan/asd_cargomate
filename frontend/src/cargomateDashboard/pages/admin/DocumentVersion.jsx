import { LuFileStack } from "react-icons/lu";

const versions = [
  { version: "v3.0", current: true, uploadedOn: "20 May 2025", uploadedBy: "Arjun Soni", status: "Under Review", badge: "bg-orange-100 text-orange-600", remarks: "Updated invoice and value terms" },
  { version: "v2.0", current: false, uploadedOn: "20 May 2025", uploadedBy: "Arjun Soni", status: "Rejected", badge: "bg-red-100 text-red-500", remarks: "Incorrect Hs code and terms" },
  { version: "v1.0", current: false, uploadedOn: "20 May 2025", uploadedBy: "Arjun Soni", status: "Replaced", badge: "bg-cyan-100 text-cyan-600", remarks: "Initial version uploaded" },
];

const history = [
  { date: "20 May 2025", desc: "Document sent for review", status: "Under Review", badge: "bg-orange-100 text-orange-600", by: "Arjun Soni", dot: "bg-purple-500" },
  { date: "22 May 2025", desc: "Rejected dur incorrect HS Code", status: "Rejected", badge: "bg-red-100 text-red-500", by: "Arjun Soni", dot: "bg-purple-500" },
  { date: "19 May 2025", desc: "Document sent for review", status: "Replaced", badge: "bg-cyan-100 text-cyan-600", by: "Arjun Soni", dot: "bg-purple-500" },
];

export default function DocumentsVersion() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 flex justify-center">
      <div className="w-full max-w-3xl bg-white rounded-2xl border border-gray-200 p-5 sm:p-8">
        <div className="flex items-start gap-3 mb-6">
          <div className="w-11 h-11 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 shrink-0">
            <LuFileStack size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Documents Version</h1>
            <p className="text-sm text-gray-500">Track document version and track history</p>
          </div>
        </div>

        <div className="border border-gray-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <p className="text-sm font-semibold text-gray-900">Commercial Invoice Pdf.</p>
            <p className="text-xs text-gray-400">Document Id- DOC-0550-0206</p>
          </div>
          <div className="text-sm text-gray-500">
            Document Version <span className="text-gray-900 font-medium">v3.0</span>
          </div>
          <div className="text-sm text-gray-500">
            Current Status
            <span className="block px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-600 mt-1 w-fit">Under Review</span>
          </div>
          <div className="text-sm text-gray-500">
            Last Updated <span className="block text-gray-900 font-medium">20 May 2025</span>
          </div>
        </div>

        <div className="border border-gray-200 rounded-xl overflow-x-auto mb-4">
          <table className="w-full min-w-[600px] text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-200">
                <th className="p-3 font-medium">Version</th>
                <th className="p-3 font-medium">Uploaded On</th>
                <th className="p-3 font-medium">Uploaded By</th>
                <th className="p-3 font-medium">Status</th>
                <th className="p-3 font-medium">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {versions.map((v) => (
                <tr key={v.version} className="border-b border-gray-100 last:border-0">
                  <td className="p-3">
                    {v.current ? (
                      <span className="text-purple-600 font-medium">{v.version} Current</span>
                    ) : (
                      <span className="text-gray-700">{v.version}</span>
                    )}
                  </td>
                  <td className="p-3 text-gray-500">{v.uploadedOn}</td>
                  <td className="p-3 text-gray-500">{v.uploadedBy}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${v.badge}`}>{v.status}</span>
                  </td>
                  <td className="p-3 text-gray-500">{v.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border border-gray-200 rounded-xl p-4">
          <p className="text-purple-600 text-sm font-semibold mb-4">Review History</p>
          <div className="space-y-4">
            {history.map((h, i) => (
              <div key={i} className="flex gap-3">
                <span className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${h.dot}`} />
                <div className="flex flex-wrap items-center gap-2">
                  <div>
                    <p className="text-sm text-gray-900">{h.date}</p>
                    <p className="text-xs text-gray-400">{h.desc}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${h.badge}`}>{h.status}</span>
                  <span className="text-xs text-gray-400">Reviwed by {h.by}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}