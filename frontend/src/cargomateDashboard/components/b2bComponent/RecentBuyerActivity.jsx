import { History, ShoppingBag, Eye, Truck, User, TrendingUp, X } from "lucide-react";

const activities = [
  { icon: ShoppingBag, color: "text-blue-500", text: "Amazon Europe S.à r.l. placed a new order", link: "SHP-2025-1045", time: "2h ago" },
  { icon: Eye, color: "text-pink-500", text: "Walmart Inc. updated product interest in", link: "Electronics category", time: "2h ago" },
  { icon: Truck, color: "text-orange-500", text: "Carrefour SA imported new shipment", link: "SHP-2025-1037", time: "2h ago" },
  { icon: User, color: "text-gray-700", text: "New buyer Delta Trading Co. from", link: "Vietnam registered", time: "2h ago" },
  { icon: TrendingUp, color: "text-red-500", text: "Metro AG increased import volume by", link: "15%", time: "2h ago" },
];

export default function RecentBuyerActivityModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-teal-500 flex items-center justify-center shrink-0">
              <History className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Recent Buyer Activity</h2>
              <p className="text-sm text-gray-500">Stay updated with the latest actions from your buyer</p>
            </div>
          </div>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="space-y-5">
          {activities.map((a, i) => {
            const Icon = a.icon;
            return (
              <div key={i} className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <Icon className={`w-4 h-4 mt-1 shrink-0 ${a.color}`} />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900">{a.text}</p>
                    <p className="text-sm text-green-600 underline">{a.link}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-400 shrink-0">{a.time}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}