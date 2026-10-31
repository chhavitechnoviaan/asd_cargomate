import { useState } from "react";
import { Download, Search, Filter, X } from "lucide-react";

const shipments = [
  { id: "IMP-2025-2504-86", hsCode: "8471.30", product: "Electrical Machinery & Equipment", importer: "ABC Imports Pvt. Ltd.", exporter: "Global Tech Inc.", origin: "USA", destination: "Nhava Sheva (Mumbai)", port: "24 Apr 2025", shipDate: "24 Apr 2025", value: "₹412.50 Cr", status: "CLEARED" },
  { id: "IMP-2025-2504-85", hsCode: "8479.89", product: "Machinery & Mechanical Appliances", importer: "Global Industries Inc.", exporter: "TechWorld Pte.", origin: "UAE", destination: "Mundra (Gujarat)", port: "24 Apr 2025", shipDate: "24 Apr 2025", value: "₹286.40 Cr", status: "CLEARED" },
  { id: "IMP-2025-2504-84", hsCode: "9018.90", product: "Optical, Medical & Precision Instruments", importer: "Omega Traders Ltd.", exporter: "Nippon Techno LLC", origin: "Germany", destination: "Chennai", port: "23 Apr 2025", shipDate: "23 Apr 2025", value: "₹201.20 Cr", status: "IN TRANSIT" },
  { id: "IMP-2025-2504-83", hsCode: "7208.39", product: "Iron & Steel", importer: "Shiva Exports", exporter: "Bao Steel International", origin: "China", destination: "Nhava Sheva (Mumbai)", port: "22 Apr 2025", shipDate: "23 Apr 2025", value: "₹178.10 Cr", status: "CLEARED" },
  { id: "IMP-2025-2504-82", hsCode: "3907.60", product: "Plastics & Articles", importer: "Omega Exports Pvt. Ltd.", exporter: "Gravantech GmbH", origin: "Bangladesh", destination: "Kolkata", port: "22 Apr 2025", shipDate: "23 Apr 2025", value: "₹167.60 Cr", status: "PENDING" },
  { id: "IMP-2025-2504-81", hsCode: "2710.19", product: "Mineral Fuels & Oils", importer: "Prime Exports Ltd.", exporter: "Petro Global FZE", origin: "Singapore", destination: "Hazira (Surat)", port: "21 Apr 2025", shipDate: "21 Apr 2025", value: "₹154.30 Cr", status: "CLEARED" },
  { id: "IMP-2025-2504-80", hsCode: "3004.90", product: "Pharmaceutical Products", importer: "Medicare Imports", exporter: "BioHealth Ltd.", origin: "Switzerland", destination: "Chennai", port: "20 Apr 2025", shipDate: "20 Apr 2025", value: "₹142.80 Cr", status: "IN TRANSIT" },
  { id: "IMP-2025-2504-79", hsCode: "8411.99", product: "Turbojets, Propellers & Parts", importer: "Aero Imports Pvt. Ltd.", exporter: "AeroTech Solutions", origin: "France", destination: "Nhava Sheva (Mumbai)", port: "20 Apr 2025", shipDate: "20 Apr 2025", value: "₹142.80 Cr", status: "PENDING" },
  { id: "IMP-2025-2504-78", hsCode: "8703.23", product: "Vehicles, Parts & Accessories", importer: "Auto Imports Co.", exporter: "Toyota Tsusho", origin: "Japan", destination: "Mundra (Gujarat)", port: "19 Apr 2025", shipDate: "19 Apr 2025", value: "₹118.40 Cr", status: "CLEARED" },
  { id: "IMP-2025-2504-77", hsCode: "8542.31", product: "Electronic Goods & Components", importer: "Electro Imports", exporter: "Samsung Electronics", origin: "South Korea", destination: "Kolkata", port: "19 Apr 2025", shipDate: "19 Apr 2025", value: "₹105.70 Cr", status: "CLEARED" },
];

const statusColor = {
  CLEARED: "text-green-600",
  "IN TRANSIT": "text-blue-600",
  PENDING: "text-red-500",
};

export default function AllImportShipmentsModal({ onClose }) {
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState("25 Apr 2025 - 26 Apr 2025");

  const filtered = shipments.filter((s) => {
    const term = search.toLowerCase();
    return (
      s.id.toLowerCase().includes(term) ||
      s.importer.toLowerCase().includes(term) ||
      s.exporter.toLowerCase().includes(term) ||
      s.product.toLowerCase().includes(term)
    );
  });

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 w-full max-w-7xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-teal-500 flex items-center justify-center shrink-0">
              <Download className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">All Import Shipments</h2>
              <p className="text-sm text-gray-500">Detailed list of all recent import shipments.</p>
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
              placeholder="Search shipments by BL number, importer, exporter, or product..."
              className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 text-sm"
            />
          </div>
          <input
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-700 whitespace-nowrap"
          />
          <button className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-700 whitespace-nowrap">
            <Filter className="w-4 h-4" /> Filters
          </button>
          <button className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-700 whitespace-nowrap">
            Export
          </button>
        </div>

        <div className="overflow-x-auto border border-gray-100 rounded-xl">
          <div className="min-w-[1400px]">
            <div className="grid grid-cols-10 bg-gray-50 px-3 py-3 text-xs font-bold text-gray-700">
              <span>Shipment ID</span>
              <span>HD Code</span>
              <span>Product Description</span>
              <span>Importer</span>
              <span>Exporter</span>
              <span>Country of Origin</span>
              <span>Destination Country</span>
              <span>Port of Arrival</span>
              <span>Ship Date</span>
              <span>Value (INR) / Status</span>
            </div>
            {filtered.map((s) => (
              <div key={s.id} className="grid grid-cols-10 items-center px-3 py-3 border-t border-gray-50 text-xs">
                <span className="text-blue-600 font-medium">{s.id}</span>
                <span className="text-gray-500">{s.hsCode}</span>
                <span className="text-gray-800 pr-2">{s.product}</span>
                <span className="text-gray-500">{s.importer}</span>
                <span className="text-gray-500">{s.exporter}</span>
                <span className="text-gray-500">{s.origin}</span>
                <span className="text-gray-500">{s.destination}</span>
                <span className="text-gray-500">{s.port}</span>
                <span className="text-gray-500">{s.shipDate}</span>
                <div className="flex flex-col">
                  <span className="text-gray-900 font-medium">{s.value}</span>
                  <span className={`font-semibold ${statusColor[s.status]}`}>{s.status}</span>
                </div>
              </div>
            ))}
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