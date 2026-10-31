import { useState } from "react";
import {
  Download,
  Search,
  Filter,
  Zap,
  Cog,
  Circle,
  Hammer,
  Droplet,
  FlaskConical,
  Car,
  Cpu,
  Shirt,
  UtensilsCrossed,
  X,
} from "lucide-react";

const products = [
  { icon: Zap, name: "Electrical Machinery & Equipment", value: "₹412.50 Cr", share: 33.1, trend: [10, 25, 15, 30, 20, 35], changeUp: true, change: "18.6%" },
  { icon: Cog, name: "Machinery & Mechanical Appliances", value: "₹286.40 Cr", share: 23.0, trend: [10, 15, 12, 25, 18, 22], changeUp: true, change: "12.4%" },
  { icon: Circle, name: "Optical, Medical & Precision Instruments", value: "₹201.20 Cr", share: 16.1, trend: [8, 12, 10, 18, 14, 20], changeUp: true, change: "8.7%" },
  { icon: Hammer, name: "Iron & Steel", value: "₹178.10 Cr", share: 14.3, trend: [20, 10, 22, 12, 24, 14], changeUp: false, change: "2.3%" },
  { icon: Droplet, name: "Plastics & Articles", value: "₹167.60 Cr", share: 13.5, trend: [8, 14, 10, 16, 12, 18], changeUp: true, change: "6.1%" },
  { icon: FlaskConical, name: "Organic & Inorganic Chemicals", value: "₹142.30 Cr", share: 11.4, trend: [6, 10, 12, 14, 16, 18], changeUp: true, change: "7.8%" },
  { icon: Car, name: "Vehicles, Parts & Accessories", value: "₹128.90 Cr", share: 10.3, trend: [18, 8, 20, 10, 22, 12], changeUp: false, change: "1.6%" },
  { icon: Cpu, name: "Electronic Goods & Components", value: "₹118.70 Cr", share: 9.5, trend: [6, 12, 8, 14, 10, 16], changeUp: true, change: "5.2%" },
  { icon: Shirt, name: "Textiles & Made-ups", value: "₹95.40 Cr", share: 7.6, trend: [8, 14, 10, 12, 16, 12], changeUp: true, change: "3.4%" },
  { icon: UtensilsCrossed, name: "Food & Beverages", value: "₹82.30 Cr", share: 6.6, trend: [10, 6, 14, 8, 16, 14], changeUp: true, change: "4.7%" },
];

const Sparkline = ({ points, up }) => {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const w = 60;
  const h = 24;
  const path = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - ((p - min) / (max - min || 1)) * h;
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <path d={path} fill="none" stroke={up ? "#22c55e" : "#ef4444"} strokeWidth="1.5" />
    </svg>
  );
};

export default function AllImportProductsModal({ onClose }) {
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-teal-500 flex items-center justify-center shrink-0">
              <Download className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">All Import Products</h2>
              <p className="text-sm text-gray-500">Detailed list of top imported products</p>
            </div>
          </div>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Products..."
              className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 text-sm"
            />
          </div>
          <button className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-700 whitespace-nowrap">
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[650px]">
            <div className="grid grid-cols-5 bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-700 rounded-lg">
              <span>#</span>
              <span className="col-span-1">Product Name</span>
              <span>Import Value</span>
              <span>Trend</span>
              <span>Change</span>
            </div>
            {filtered.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div key={p.name} className="grid grid-cols-5 items-center px-3 py-3 border-b border-gray-50">
                  <span className="text-sm text-gray-500">{idx + 1}</span>
                  <div className="flex items-center gap-2 col-span-1">
                    <Icon className="w-4 h-4 text-gray-500 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm text-gray-900 truncate">{p.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-24 h-1.5 bg-gray-100 rounded-full">
                          <div className="h-1.5 bg-blue-500 rounded-full" style={{ width: `${p.share}%` }} />
                        </div>
                        <span className="text-xs text-gray-400">{p.share}%</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-800">{p.value}</span>
                  <Sparkline points={p.trend} up={p.changeUp} />
                  <span className={`text-sm font-medium ${p.changeUp ? "text-green-600" : "text-red-500"}`}>
                    {p.changeUp ? "▲" : "▼"} {p.change}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}