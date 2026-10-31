import { useState,useEffect } from "react";
import { AlertTriangle, Search, X } from "lucide-react";
import { getRecentAlerts } from "../../api/ShipmentApi";
/*const alerts = [
  { title: "New sanctions imposed on Russia. US adds 120+ entities to sanction list.", region: "Russia", date: "22 Apr 2025", risk: "High", status: "Active" },
  { title: "Red Sea shipping disruptions. Multiple attacks reported near Bab-el-Mandeb.", region: "Red Sea", date: "22 Apr 2025", risk: "High", status: "Active" },
  { title: "Export restrictions on rare earth materials. China tightens export controls.", region: "China", date: "22 Apr 2025", risk: "High", status: "Active" },
  { title: "Banking restrictions in Iran. International transactions may be affected.", region: "France", date: "22 Apr 2025", risk: "High", status: "Active" },
  { title: "Port congestion in Rotterdam causing shipment delays.", region: "Iran", date: "22 Apr 2025", risk: "High", status: "Monitoring" },
  { title: "New customs inspection rules implemented in UAE.", region: "Netherlands", date: "22 Apr 2025", risk: "High", status: "Monitoring" },
  { title: "Strike announced at Hamburg Port affecting cargo movement.", region: "UAE", date: "22 Apr 2025", risk: "High", status: "Monitoring" },
];*/

export default function RecentHighRiskAlertsModal({ onClose }) {
  const [search, setSearch] = useState("");
  const [alerts, setAlerts] = useState([]);
const [loading, setLoading] = useState(true);
 
useEffect(() => {
  const fetchAlerts = async () => {
    try {
      const res = await getRecentAlerts();

      setAlerts(res.data?.data || []);
    } catch (error) {
      console.error("Failed to fetch alerts:", error);
      setAlerts([]);
    } finally {
      setLoading(false);
    }
  };

  fetchAlerts();
}, []);

const filtered = alerts.filter((a) => {
  const title = a.title || "";
  const message = a.message || "";
  const shipmentId = a.shipment?.sbNumber || "";

  const searchText = `
    ${title}
    ${message}
    ${shipmentId}
  `.toLowerCase();

  return searchText.includes(search.toLowerCase());
});

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-teal-500 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Recent High Risk Alerts</h2>
              <p className="text-sm text-gray-500">Latest trade risks, sanctions, disruptions and compliance alerts.</p>
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
              placeholder="Search alerts by country, region, keyword..."
              className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 text-sm"
            />
          </div>
          <button className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-700 whitespace-nowrap">
            Export
          </button>
        </div>

        <div className="overflow-x-auto border border-gray-100 rounded-lg">
          <div className="min-w-[700px]">
            <div className="grid grid-cols-4 bg-gray-50 px-4 py-3 text-sm font-bold text-gray-700">
              <span>Alert Title</span>
              <span>Shipment</span>
              <span>Date</span>
              <span>Risk Level</span>
            </div>
            {filtered.map((a, i) => { 
              const riskLevel =
  a.type === "Critical"
    ? "High"
    : a.type === "Warning"
    ? "Medium"
    : "Low";
    return (
              <div key={i} className="grid grid-cols-4 items-center px-4 py-3 border-t border-gray-50">
                <span className="text-sm text-gray-800 pr-2">{a.title}</span>
                <span className="text-sm text-gray-500"> {a.shipment?.sbNumber || "-"}</span>
                <span className="text-sm text-gray-500">{a.createdAt ? new Date(a.createdAt).toLocaleDateString("en-GB", {day: "2-digit",month: "short",year: "numeric",}) : "-"}</span>
                <div className="flex flex-col gap-1">
                  <span className={`text-sm font-medium ${riskLevel === "High" ? "text-red-500" : riskLevel === "Medium" ? "text-yellow-600" : "text-blue-500"}`}>{a.riskLevel}</span>
                  <span className="text-xs font-medium text-slate-500">{a.type || "-"}</span>
                </div>
              </div>
            );})}
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