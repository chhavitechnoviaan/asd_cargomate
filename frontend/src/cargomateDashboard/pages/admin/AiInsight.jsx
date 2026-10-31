import { Globe, Zap, TrendingUp, Wifi, ShoppingCart, DollarSign, ArrowUpRight } from "lucide-react";

const insights = [
  {
    icon: Zap,
    iconColor: "text-blue-500",
    bg: "bg-blue-50",
    label: "Top Growing Market",
    title: "UAE",
    desc: "Growth increased by 24.6% this month",
    stat: "+26.6%",
    statLabel: "vs last month",
  },
  {
    icon: TrendingUp,
    iconColor: "text-orange-500",
    bg: "bg-orange-50",
    label: "High Demand Product",
    title: "UAE",
    desc: "Demand increased by 22% compared to last month",
    stat: "+22%",
    statLabel: "vs last month",
  },
  {
    icon: Wifi,
    iconColor: "text-green-500",
    bg: "bg-green-50",
    label: "Best Shipping Routes",
    title: "Mumbai - Dubai",
    desc: "Most efficient route with 98% on time delivery",
    stat: "98%",
    statLabel: "on time delivery",
  },
  {
    icon: ShoppingCart,
    iconColor: "text-pink-500",
    bg: "bg-purple-50",
    label: "Highest Converting Category",
    title: "Electronics",
    desc: "conversion rate increased by 18% this month",
    stat: "+18%",
    statLabel: "vs last month",
  },
  {
    icon: DollarSign,
    iconColor: "text-green-600",
    bg: "bg-emerald-50",
    label: "Revenue Opportunity",
    title: "Canada Market",
    desc: "High potential market with 32% growth opportunity",
    stat: "+32%",
    statLabel: "Growth opportunity",
  },
];

export default function AIInsights({ onClose }) {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-4 sm:p-6">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
            <Globe className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">AI Insights</h2>
            <p className="text-sm text-gray-500">Key insights and recommendations</p>
          </div>
        </div>
        <span className="text-xs font-medium text-green-600">Active</span>
      </div>

      <div className="space-y-3">
        {insights.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className={`flex items-center justify-between gap-3 rounded-xl px-4 py-3 ${item.bg}`}
            >
              <div className="flex items-start gap-3 min-w-0">
                <Icon className={`w-4 h-4 mt-1 shrink-0 ${item.iconColor}`} />
                <div className="min-w-0">
                  <p className="text-xs text-gray-500">{item.label}</p>
                  <p className="font-bold text-gray-900 truncate">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="flex items-center gap-1 justify-end text-green-600 font-semibold text-sm">
                  {item.stat}
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
                <p className="text-xs text-gray-500">{item.statLabel}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={onClose}
          className="px-6 py-2 rounded-full border border-green-200 text-green-600 text-sm bg-green-50 hover:bg-green-100"
        >
          Close
        </button>
      </div>
    </div>
  );
}