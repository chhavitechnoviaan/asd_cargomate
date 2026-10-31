import { FiX, FiArrowUp } from "react-icons/fi";

export const CHART_COLORS = ["#3b82f6", "#22c55e", "#ef4444", "#a855f7", "#9ca3af"];

export function PopupShell({ children, maxWidth = "max-w-3xl" }) {
  return (
    <div className="fixed inset-0 z-20 flex  items-center justify-center bg-black/60 p-2 sm:p-4 overflow-y-auto">
      <div className={`w-full ${maxWidth} bg-white rounded-xl shadow-xl my-4 sm:my-0`}>
        {children}
      </div>
    </div>
  );
}

export function PopupTabs({ tabs, activeTab, onTabChange, onClose }) {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 px-4 sm:px-6 pt-4">
      <div className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`whitespace-nowrap pb-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? "text-teal-600 border-teal-600"
                : "text-gray-500 border-transparent hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <button
        onClick={onClose}
        className="ml-3 mb-3 shrink-0 text-gray-400 hover:text-gray-600"
      >
        <FiX size={20} />
      </button>
    </div>
  );
}

export function StatCard({ label, value, change, changeColor = "text-green-600" }) {
  return (
    <div className="border border-gray-200 rounded-lg p-3 sm:p-4">
      <p className="text-xs sm:text-sm text-gray-500">{label}</p>
      <p className="text-lg sm:text-xl font-semibold text-gray-900 mt-1">{value}</p>
      <div className={`flex items-center gap-1 text-xs mt-2 ${changeColor}`}>
        <FiArrowUp size={12} />
        <span className="font-medium">{change}</span>
        <span className="text-gray-400">vs last month</span>
      </div>
    </div>
  );
}

export function SectionCard({ title, children, className = "" }) {
  return (
    <div className={`border border-gray-200 rounded-lg p-3 sm:p-4 ${className}`}>
      <p className="text-sm font-semibold text-gray-800 mb-3">{title}</p>
      {children}
    </div>
  );
}

export function DonutLegend({ items }) {
  return (
    <div className="flex flex-col gap-2 justify-center">
      {items.map((item, i) => (
        <div key={item.label} className="flex items-center gap-2 text-xs sm:text-sm">
          <span
            className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }}
          />
          <span className="text-gray-700">
            {item.label} ({item.value}%)
          </span>
        </div>
      ))}
    </div>
  );
}

export function ListRow({ left, leftSub, right, rightSub, rightColor = "text-green-600" }) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-2 min-w-0">{left}</div>
      <div className="text-right shrink-0 ml-2">
        <p className="text-sm font-semibold text-gray-900">{right}</p>
        <p className={`text-xs font-medium ${rightColor}`}>{rightSub}</p>
      </div>
    </div>
  );
}