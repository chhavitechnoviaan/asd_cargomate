import { TrendingUp, User, ShoppingBag, Truck, X } from "lucide-react";

const stats = [
  { icon: User, color: "text-blue-500", value: "128", label: "New Buyers This Month" },
  { icon: ShoppingBag, color: "text-green-500", value: "356", label: "Orders Placed This Month" },
  { icon: Truck, color: "text-orange-500", value: "289", label: "Shipments This Month" },
  { icon: TrendingUp, color: "text-red-500", value: "18%", label: "Avg. Import Growth" },
];

const rows = [
  { buyer: "Amazon Europe S.à r.l.", sub: "SHP-2025-1045", category: "Electronics", type: "New Order", typeColor: "text-blue-600", date: "24 Apr 2025 · 2h ago" },
  { buyer: "Walmart Inc.", sub: "Import Volume", category: "General Goods", type: "Interest Update", typeColor: "text-green-600", date: "24 Apr 2025 · 2h ago" },
  { buyer: "Carrefour SA", sub: "SHP-2025-1045", category: "Home & Living", type: "New Shipment", typeColor: "text-purple-600", date: "24 Apr 2025 · 2h ago" },
  { buyer: "Delta Trading Co.", sub: "Vietnam", category: "Industrial", type: "New Buyer", typeColor: "text-orange-500", date: "24 Apr 2025 · 2h ago" },
  { buyer: "Metro AG", sub: "Import Volume", category: "General Goods", type: "Volume Increase", typeColor: "text-green-600", date: "24 Apr 2025 · 2h ago" },
];

export default function BuyerActivityInsightsModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-teal-500 flex items-center justify-center shrink-0">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Buyer Activity Insights</h2>
              <p className="text-sm text-gray-500">Detailed insights and trends of buyer activities.</p>
            </div>
          </div>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="border border-gray-100 rounded-lg p-3">
                <Icon className={`w-4 h-4 mb-1 ${s.color}`} />
                <p className="text-lg font-bold text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            );
          })}
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            <div className="grid grid-cols-4 pb-2 text-sm text-gray-500 border-b border-gray-100">
              <span>Activity/Buyer</span>
              <span>Category</span>
              <span>type</span>
              <span>Date</span>
            </div>
            {rows.map((r, i) => (
              <div key={i} className="grid grid-cols-4 items-center py-3 border-b border-gray-50">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{r.buyer}</p>
                  <p className="text-sm text-blue-500">{r.sub}</p>
                </div>
                <span className="text-sm text-blue-500">{r.category}</span>
                <span className={`text-sm font-medium ${r.typeColor}`}>{r.type}</span>
                <span className="text-sm text-gray-500">{r.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}