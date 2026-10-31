import { LuFileText, LuPackage, LuShip, LuAnchor, LuTruck, LuCircleCheck, LuDownload } from "react-icons/lu";
import {
  FaPlus, FaMagnifyingGlass, FaXmark, FaChevronDown,
  FaStar, FaTruck, FaBoxOpen, FaWarehouse, FaFileContract
} from "react-icons/fa6";

const timelineSteps = [
  { title: "Booking Confirmed", date: "10 Apr 2026", time: "09:45 AM", icon: LuFileText, done: true },
  { title: "Picked Up", date: "12 Apr 2026", time: "11:20 AM", icon: LuPackage, done: true },
  { title: "Departed", date: "18 Apr 2026", time: "03:30 PM", icon: LuShip, done: true },
  { title: "In Transit", date: "20 Apr 2026", time: "04:30 PM", icon: LuAnchor, done: true },
  { title: "Arrived at destination", date: "", time: "", icon: LuTruck, done: false },
  { title: "Delivered", date: "", time: "", icon: LuCircleCheck, done: false },
];

const documents = [
  { name: "Commercial Invoice.pdf", size: "245KB", color: "text-red-500" },
  { name: "Packing List.pdf", size: "180KB", color: "text-green-500" },
  { name: "Bill of Lading.pdf", size: "210KB", color: "text-red-500" },
  { name: "Certificate of Origin.pdf", size: "150KB", color: "text-green-500" },
  { name: "Insurance Certificate.pdf", size: "175KB", color: "text-orange-500" },
];

export default function ShipmentDetails({onClose}) {
  return (
    <div className=" bg-gray-50  flex justify-center  rounded-2xl">
      <div className="w-full max-w-5xl bg-white rounded-2xl border border-gray-200 p-5 sm:p-8 flex flex-col max-h-[80vh]">
        <div className="flex justify-between items-start"> 
        <div className="flex flex-wrap items-center gap-3 mb-6 shrink-0">
          <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
            <LuFileText size={20} />
          </div>
          <h1 className="text-xl font-bold text-gray-900">Shipment Details - SB2025-00321</h1>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600">In Transit</span>
        </div>
        <div> <button onClick={onClose}> <FaXmark className="text-lg"/></button></div>
        </div>
        <div className="overflow-y-auto pr-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm mb-6">
            <div className="flex justify-between sm:block">
              <p className="font-semibold text-gray-900">SB/AWB No.</p>
              <p className="text-gray-500 sm:mt-1">SB2025-00321<br />BOL:MSCU9823441</p>
            </div>
            <div className="flex justify-between sm:block">
              <p className="font-semibold text-gray-900">ETA/ETD</p>
              <p className="text-gray-500 sm:mt-1">ETD: 18 APR 2026<br />ETA: 12 MAY 2026</p>
            </div>
            <div className="flex justify-between sm:block">
              <p className="font-semibold text-gray-900">Exporter</p>
              <p className="text-gray-500 sm:mt-1">Sunfresh Export Pvt Ltd<br />IEC: 0514092847</p>
            </div>
            <div className="flex justify-between sm:block">
              <p className="font-semibold text-gray-900">Status</p>
              <p className="text-green-600 sm:mt-1 font-medium">In Transit</p>
            </div>
            <div className="flex justify-between sm:block">
              <p className="font-semibold text-gray-900">Origin- Destination</p>
              <p className="text-gray-500 sm:mt-1">HYD ICD-Hamburg, DE</p>
            </div>
            <div className="flex justify-between sm:block">
              <p className="font-semibold text-gray-900">Created On</p>
              <p className="text-gray-500 sm:mt-1">10 Apr 2026, 09:45 AM</p>
            </div>
            <div className="flex justify-between sm:block">
              <p className="font-semibold text-gray-900">HS Code</p>
              <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-600">6109.10</span>
            </div>
            <div className="flex justify-between sm:block">
              <p className="font-semibold text-gray-900">Last Updated</p>
              <p className="text-gray-500 sm:mt-1">20 Apr 2026, 04:30 AM</p>
            </div>
            <div className="flex justify-between sm:block">
              <p className="font-semibold text-gray-900">Carrier</p>
              <p className="text-gray-500 sm:mt-1">MSC</p>
            </div>
            <div className="flex justify-between sm:block">
              <p className="font-semibold text-gray-900">Created By</p>
              <p className="text-gray-500 sm:mt-1">Ramesh Kumar</p>
            </div>
            <div className="flex justify-between sm:block">
              <p className="font-semibold text-gray-900">Mode</p>
              <p className="text-gray-500 sm:mt-1">Sea FCL</p>
            </div>
            <div className="flex justify-between sm:block">
              <p className="font-semibold text-gray-900">Updated By</p>
              <p className="text-gray-500 sm:mt-1">System</p>
            </div>
          </div>

          <div className="border border-gray-200 rounded-2xl p-4 sm:p-6 mb-6">
            <p className="text-sm font-semibold text-gray-900 mb-6">Shipment Timeline</p>
            <div className="overflow-x-auto">
              <div className="flex items-start justify-between gap-2 min-w-[640px] sm:min-w-0">
                {timelineSteps.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.title} className="flex flex-col items-center text-center flex-1 relative">
                      {i !== timelineSteps.length - 1 && (
                        <span className="absolute top-6 left-1/2 w-full h-px border-t-2 border-dashed border-gray-200 -z-0" />
                      )}
                      <div
                        className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                          step.done ? "bg-green-100 text-green-600" : "bg-white border-2 border-gray-200 text-gray-300"
                        }`}
                      >
                        <Icon size={20} />
                      </div>
                      <p className="text-xs font-semibold text-gray-900">{step.title}</p>
                      {step.date && (
                        <p className="text-[11px] text-gray-400 mt-1">
                          {step.date}<br />{step.time}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-3">Shipment Information</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Commodity</span>
                  <span className="text-gray-900">Mens/Womens Cotton T-Shirts</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Package</span>
                  <span className="text-gray-900">1000 Cartons</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Gross Weight</span>
                  <span className="text-gray-900">12000 KGS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Net Weight</span>
                  <span className="text-gray-900">11500 KGS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Vessel/Voyage</span>
                  <span className="text-gray-900">MSC AMSTERDAM / 123W</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Port of Loading</span>
                  <span className="text-gray-900">HYD ICD, India</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Port of Discharge</span>
                  <span className="text-gray-900">Hamburg, Germany</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Freight Terms</span>
                  <span className="text-gray-900">FOB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Payment Terms</span>
                  <span className="text-gray-900">LC at Sight</span>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-900 mb-3">Documents</p>
              <div className="space-y-3">
                {documents.map((doc) => (
                  <div key={doc.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <LuFileText className={doc.color} size={16} />
                      {doc.name}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400">{doc.size}</span>
                      <button className="text-green-600 font-medium">View</button>
                      <button className="text-gray-400">
                        <LuDownload size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}