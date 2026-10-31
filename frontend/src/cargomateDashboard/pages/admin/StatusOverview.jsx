import { LuUserRound, LuTruck, LuCircleCheck, LuFileText, LuCreditCard } from "react-icons/lu";

const rows = [
  { type: "Shipment Status", icon: LuTruck, iconColor: "text-gray-500", status: "In Transit", badge: "bg-pink-100 text-pink-600", updated: "24 Apr 2025", by: "Aarav Sharma" },
  { type: "Approval Status", icon: LuCircleCheck, iconColor: "text-green-500", status: "Approved", badge: "bg-orange-100 text-orange-600", updated: "24 Apr 2025", by: "Aarav Sharma" },
  { type: "Documents Status", icon: LuFileText, iconColor: "text-gray-400", status: "Pending", badge: "bg-blue-100 text-blue-600", updated: "24 Apr 2025", by: "Aarav Sharma" },
  { type: "Payment Status", icon: LuCreditCard, iconColor: "text-gray-400", status: "Partially Paid", badge: "bg-green-100 text-green-600", updated: "24 Apr 2025", by: "Aarav Sharma" },
];

export default function StatusOverview() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 flex justify-center">
      <div className="w-full max-w-4xl bg-white rounded-2xl border border-gray-200 p-5 sm:p-8">
        <div className="flex items-start gap-3 mb-6">
          <div className="w-11 h-11 rounded-full bg-purple-100 flex items-center justify-center text-purple-500 shrink-0">
            <LuUserRound size={22} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Status Overview</h1>
            <p className="text-sm text-gray-500">All status are tracked separately</p>
          </div>
        </div>

        <div className="border border-gray-200 rounded-2xl overflow-x-auto">
          <table className="w-full min-w-[600px] text-sm">
            <thead>
              <tr className="text-left text-gray-900 border-b border-gray-200">
                <th className="p-4 font-semibold">Status Type</th>
                <th className="p-4 font-semibold">Current Status</th>
                <th className="p-4 font-semibold">Last Updated</th>
                <th className="p-4 font-semibold">Updated By</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const Icon = r.icon;
                return (
                  <tr key={r.type} className="border-b border-gray-100 last:border-0">
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Icon className={r.iconColor} size={16} />
                        {r.type}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${r.badge}`}>{r.status}</span>
                    </td>
                    <td className="p-4 text-gray-500">{r.updated}</td>
                    <td className="p-4 text-gray-500">{r.by}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}