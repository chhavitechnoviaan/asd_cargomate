import { useState } from "react";
import { Truck, Search, Filter, Calendar, FileText, CheckCircle2, XCircle, Copy, Info } from "lucide-react";

const initialShipments = [
  { id: "REQ-2505-0001", company: "Global Exports Pvt. Ltd.", email: "info@globalexports.com", route: "India → USA", submittedOn: "16 May 2025, 10:30 AM", shipmentType: "", status: "Pending Review", action: "Review", statusColor: "yellow" },
  { id: "REQ-2505-0002", company: "Oceanic Traders Pvt. Ltd.", email: "contact@oceanic.com", route: "India → USA", submittedOn: "16 May 2025, 9:15AM", shipmentType: "", status: "Pending Review", action: "Continue Review", statusColor: "blue" },
  { id: "REQ-2505-0003", company: "Prime Shipping Co.", email: "hello@primeshipping.com", route: "India → UK", submittedOn: "15 May 2025, 12:20 PM", shipmentType: "Export", status: "Pending Review", action: "View Details", statusColor: "green" },
  { id: "REQ-2505-0004", company: "Global Exports Pvt. Ltd.", email: "info@globalexports.com", route: "India → USA", submittedOn: "15 May 2025, 11:45 AM", shipmentType: "Export", status: "Pending Review", action: "View Details", statusColor: "red" },
  { id: "REQ-2505-0005", company: "Brighton Logistics", email: "ops@brightonlog.com", route: "India → Canada", submittedOn: "14 May 2025, 3:30 PM", shipmentType: "Export", status: "Pending Review", action: "Review", statusColor: "yellow" },
  { id: "REQ-2505-0006", company: "Oceanic Traders Pvt. Ltd.", email: "contact@oceanic.com", route: "India → Australia", submittedOn: "14 May 2025, 01:20 AM", shipmentType: "Export", status: "Pending Review", action: "Continue Review", statusColor: "blue" },
  { id: "REQ-2505-0007", company: "Prime Shipping Co.", email: "hello@primeshipping.com", route: "India → Germany", submittedOn: "13 May 2025, 10:10 AM", shipmentType: "Export", status: "Pending Review", action: "View Details", statusColor: "green" },
  { id: "REQ-2505-0008", company: "Global Exports Pvt. Ltd.", email: "info@globalexports.com", route: "India → Singapore", submittedOn: "12 May 2025, 05:00 PM", shipmentType: "Export", status: "Pending Review", action: "View Details", statusColor: "red" },
];

const stats = [
  { icon: Truck, iconColor: "text-gray-500", bg: "bg-gray-100", label: "Total Shipment", value: "56", sub: "All time" },
  { icon: Calendar, iconColor: "text-orange-500", bg: "bg-orange-50", label: "Pending Review", value: "28", sub: "Request" },
  { icon: FileText, iconColor: "text-purple-500", bg: "bg-purple-50", label: "In review", value: "18", sub: "request" },
  { icon: CheckCircle2, iconColor: "text-green-500", bg: "bg-green-50", label: "Accepted", value: "72", sub: "Shipments" },
  { icon: XCircle, iconColor: "text-red-500", bg: "bg-red-50", label: "Rejected", value: "38", sub: "Shipments" },
];

const statusColorMap = {
  yellow: "text-yellow-600 bg-yellow-50",
  blue: "text-blue-600 bg-blue-50",
  green: "text-green-600 bg-green-50",
  red: "text-red-600 bg-red-50",
};

export default function AllShipments() {
  const [shipments] = useState(initialShipments);
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All Shipments");
  const [selected, setSelected] = useState(initialShipments[2]);

  const filtered = shipments.filter((s) => {
    const term = search.toLowerCase();
    const matchesSearch =
      s.id.toLowerCase().includes(term) ||
      s.company.toLowerCase().includes(term) ||
      s.email.toLowerCase().includes(term);
    const matchesStatus =
      statusFilter === "All Shipments" ||
      (statusFilter === "Pending Reviews" && s.statusColor === "yellow") ||
      (statusFilter === "In reviews" && s.statusColor === "blue") ||
      (statusFilter === "Accepted" && s.statusColor === "green") ||
      (statusFilter === "Rejected" && s.statusColor === "red");
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">All Shipments</h2>
            <p className="text-sm text-gray-500">View and manage all shipments request across different statuses.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
          {stats.map((s) => {
            const Icon = s.icon; 
            return (
              <div key={s.label} className="border border-gray-100 rounded-lg p-3 flex items-center justify-center gap-5">
                <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center mb-2`}>
                  <Icon className={`w-4 h-4 ${s.iconColor}`} />
                </div>
                <div> 
                    <p className="text-xs font-medium text-gray-500">{s.label}</p>
                    <p className="text-lg font-bold text-gray-900">{s.value}</p>
                    <p className="text-xs font-medium text-gray-500">{s.sub}</p>
                </div>
              
              </div>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Request ID, Company, Email,Route..."
              className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 text-sm"
            />
          </div>
          <div className="relative">
            <button
              onClick={() => setShowFilter((v) => !v)}
              className="flex items-center gap-2 border border-purple-300 rounded-lg px-4 py-2.5 text-sm text-gray-700 w-full sm:w-auto justify-center"
            >
              <Filter className="w-4 h-4 text-purple-500" /> Filter By Status
            </button>
            {showFilter && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-52">
                {["All Shipments", "Pending Reviews", "In reviews", "Accepted", "Rejected"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setStatusFilter(opt);
                      setShowFilter(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                      statusFilter === opt ? "text-purple-600 font-medium" : "text-gray-700"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-700 whitespace-nowrap">
            <Calendar className="w-4 h-4" /> Search Date Range
          </button>
        </div>

        <div className="overflow-x-auto border border-gray-100 rounded-xl">
          <div className="min-w-[900px]">
            <div className="grid grid-cols-6 bg-gray-50 px-4 py-3 text-xs font-bold text-gray-900">
              <span>Request ID</span>
              <span>Company / User</span>
              <span className="text-center ">Route</span>
              <span className="text-center">Submitted On</span>
              <span className="text-center">Status</span>
              <span className="text-right  ">Actions</span>
            </div>
            {filtered.map((s) => (
              <div
                key={s.id}
                onClick={() => setSelected(s)}
                className="grid grid-cols-6 items-center px-4 py-3 border-t border-gray-100 cursor-pointer hover:bg-gray-50"
              >
                <span className="text-xs text-blue-600 font-medium">{s.id}</span>
                <div>
                  <p className="text-xs text-gray-800  font-medium">{s.company}</p>
                  <p className="text-xs text-gray-400 font-medium">{s.email}</p>
                </div>
                <span className="text-xs text-center text-gray-500 font-medium">{s.route}</span>
                <span className="text-xs text-gray-500 font-medium">{s.submittedOn}</span>
                <span className={`text-xs text-center px-2 py-1 rounded-full w-fit font-medium ${statusColorMap[s.statusColor]}`}>
                  {s.status}
                </span>
                <button className="text-xs border border-gray-300 rounded-lg font-medium px-2 py-1.5 whitespace-nowrap">
                  {s.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selected && (
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 h-fit">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-lg font-bold text-gray-900">Shipments Details</h3>
            <span className="text-xs text-green-600 bg-green-50 px-3 py-1 rounded-full">Accepted</span>
          </div>
          <p className="font-bold text-gray-900 mb-4">{selected.id}</p>

          <p className="text-xs text-gray-400 font-medium">User/ Company</p>
          <p className="font-semibold text-gray-900">{selected.company}</p>
          <p className="text-xs text-gray-500 mb-4">{selected.email}</p>

          <p className="text-xs text-gray-400 font-medium">Route</p>
          <p className="text-sm text-gray-800 mb-4">{selected.route}</p>

          <p className="text-xs text-gray-400 font-medium">Shipment Type</p>
          <p className="text-sm text-gray-800 mb-4">Export</p>

          <p className="text-xs text-gray-400 font-medium">Status</p>
          <span className="text-xs text-green-600 bg-green-50 px-3 py-1 rounded-full inline-block mb-1">
            Accepted
          </span>
          <p className="text-xs text-gray-500 mb-4 font-medium">This Shipment request has been approved and accepted</p>

          <p className="text-xs text-gray-400 font-medium">Documents</p>
          <p className="text-sm text-gray-800 mb-4">7 Documents Uploaded</p>

          <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-blue-50 text-blue-600 font-medium text-sm mb-4">
            <Copy className="w-4 h-4" /> View Documents
          </button>

          <div className="border border-gray-100 rounded-lg p-3 mb-4">
            <p className="text-sm font-semibold text-gray-900 mb-2">Quick Information</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className="text-gray-400 font-medium">All Risk Score</p>
                <p className="font-bold text-green-600">Low (18/100)</p>
              </div>
              <div>
                <p className="text-gray-400 font-medium">Compliance</p>
                <p className="font-bold text-green-600">Eligible (92%)</p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2 bg-purple-50 rounded-lg px-4 py-3">
            <Info className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm text-purple-600 font-medium">This Shipment has been approved.</p>
              <p className="text-xs text-gray-500 font-medium">
                You can view full details or download all related documents.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}