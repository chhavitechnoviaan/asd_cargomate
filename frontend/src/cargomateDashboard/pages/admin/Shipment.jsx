import { useState, useRef } from "react";
import {
  FaDownload, FaPlus, FaMagnifyingGlass, FaChevronLeft, FaChevronRight,
  FaShip, FaCheck, FaFileLines, FaBoxOpen, FaCircleExclamation,
  FaUserShield, FaMoneyBill, FaChevronDown, FaCalendar, FaCloudArrowUp,
  FaXmark, FaLightbulb, FaStar, FaClock, FaChartLine, FaUsers, FaBolt
} from "react-icons/fa6";
import { useEffect } from "react";
import API from "../../api/axios";
import PendingReview  from "./PendingReview"
import AIModulesBackendScope from "./AiModules";

const Toggle = ({ checked, onChange }) => (
  <div onClick={() => onChange(!checked)}
    className={`relative w-10 h-6 rounded-full cursor-pointer flex-shrink-0 transition-all duration-200 ${checked ? "bg-teal-500" : "bg-gray-300"}`}>
    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${checked ? "left-5" : "left-1"}`} />
  </div>
);



const allRows = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  sb: "SB2025-00321",
  bol: "BOL: MSCU9823441",
  exporter: "Sunfresh Export Pvt Ltd",
  iec: "IEC: 0514092847",
  origin: "HYD ICD – Hamburg, DE",
  hsCode: "6109.10",
  carrier: "MSC",
  mode: "Sea FCL",
  etd: "ETD: 18 Apr 2026",
  eta: "ETA: 12 May 2026",
  status: ["In Transit", "Delivered", "Pending Docs", "Custom Hold"][i % 4],
}));

const ROWS_PER_PAGE = 11;

const statusStyle = (s) => {
  if (s === "In Transit") return "bg-teal-100 text-teal-600";
  if (s === "Delivered") return "bg-green-100 text-green-600";
  if (s === "Pending Docs") return "bg-yellow-100 text-yellow-600";
  if (s === "Custom Hold") return "bg-red-100 text-red-500";
  return "bg-gray-100 text-gray-500";
};

const STEPS = ["Exporter Details", "Cargo Info", "Route & carrier", "Documents"];

function StepSidebar({ currentStep }) {
  return (
    <div className="bg-teal-50 rounded-2xl p-4 sm:p-5 w-full lg:w-56 flex-shrink-0">
      <p className="text-sm font-bold text-gray-800 mb-4">Create Booking</p>
      <div className="flex flex-row lg:flex-col gap-2 lg:gap-0">
        {STEPS.map((s, i) => {
          const done = i < currentStep;
          const active = i === currentStep;
          return (
            <div key={s} className="flex items-start gap-3 lg:mb-4">
              <div className="flex flex-col items-center flex-shrink-0">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${done ? "bg-teal-500 border-teal-500 text-white" : active ? "bg-white border-teal-500 text-teal-500" : "bg-white border-gray-300 text-gray-400"}`}>
                  {done ? <FaCheck className="text-xs" /> : i + 1}
                </div>
                {i < STEPS.length - 1 && <div className={`w-0.5 h-6 mt-1 hidden lg:block ${done ? "bg-teal-500" : "bg-gray-200"}`} />}
              </div>
              <div className="hidden lg:block min-w-0">
                <p className={`text-xs font-semibold ${active || done ? "text-gray-800" : "text-gray-400"}`}>{s}</p>
                <p className="text-xs text-gray-400">Step {i + 1} to 4</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Step1({ form, set, onNext }) {
  const [errors, setErrors] = useState({});
  const validate = () => {
    const e = {};
    if (!form.companyName.trim()) e.companyName = "Required";
    if (!form.iec1.trim()) e.iec1 = "Required";
    if (!form.contactPerson.trim()) e.contactPerson = "Required";
    if (!form.mobile.trim()) e.mobile = "Required";
    return e;
  };
  const handleNext = () => { const e = validate(); if (Object.keys(e).length) { setErrors(e); return; } onNext(); };
  const inp = "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all";
  const err = (k) => errors[k] ? "border-red-400" : "";
  return (
    <div className="flex-1 min-w-0">
      <h2 className="text-base font-bold text-gray-800 mb-0.5">Exporter Details</h2>
      <p className="text-xs text-gray-400 mb-5">Enter exporter / shipper information</p>
      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Company Name</label>
          <input className={`${inp} ${err("companyName")}`} placeholder="Company Name" value={form.companyName} onChange={e => { set("companyName", e.target.value); setErrors(p => ({...p, companyName: ""})); }} />
          {errors.companyName && <p className="text-xs text-red-500 mt-1">{errors.companyName}</p>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">IEC Number</label>
            <input className={`${inp} ${err("iec1")}`} placeholder="Type IEC Num..." value={form.iec1} onChange={e => { set("iec1", e.target.value); setErrors(p => ({...p, iec1: ""})); }} />
            {errors.iec1 && <p className="text-xs text-red-500 mt-1">{errors.iec1}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">IEC Number</label>
            <input className={inp} placeholder="Type IEC Num..." value={form.iec2} onChange={e => set("iec2", e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Contact Person</label>
            <input className={`${inp} ${err("contactPerson")}`} placeholder="Type Name" value={form.contactPerson} onChange={e => { set("contactPerson", e.target.value); setErrors(p => ({...p, contactPerson: ""})); }} />
            {errors.contactPerson && <p className="text-xs text-red-500 mt-1">{errors.contactPerson}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Mobile Number</label>
            <input className={`${inp} ${err("mobile")}`} placeholder="Type Mobile Number" value={form.mobile} onChange={e => { set("mobile", e.target.value); setErrors(p => ({...p, mobile: ""})); }} />
            {errors.mobile && <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>}
          </div>
        </div>
        <div className="flex justify-end mt-2">
          <button onClick={handleNext} className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-2.5 rounded-xl text-sm font-medium transition-colors">Next</button>
        </div>
      </div>
    </div>
  );
}

function Step2({ form, set, onNext }) {
  const inp = "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all";
  return (
    <div className="flex-1 min-w-0">
      <h2 className="text-base font-bold text-gray-800 mb-0.5">Cargo Info</h2>
      <p className="text-xs text-gray-400 mb-5">Enter Cargo Information</p>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">HS Code</label>
            <input className={inp} placeholder="e.g 6109.10" value={form.hsCode} onChange={e => set("hsCode", e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Commodity</label>
            <input className={inp} placeholder="Product Discription" value={form.commodity} onChange={e => set("commodity", e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Gross Weight (kg)</label>
            <input className={inp} placeholder="0.00" type="number" value={form.grossWeight} onChange={e => set("grossWeight", e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">No of Packages</label>
            <input className={inp} placeholder="Type IEC Num..." value={form.packages} onChange={e => set("packages", e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Invoice Value (USD)</label>
            <input className={inp} placeholder="Type Name" value={form.invoiceValue} onChange={e => set("invoiceValue", e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Incoterms</label>
            <select className={inp} value={form.incoterms} onChange={e => set("incoterms", e.target.value)}>
              <option value="">Type Mobile Number</option>
              <option>FOB</option><option>CIF</option><option>EXW</option><option>DDP</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Packing Type</label>
            <select className={inp} value={form.packingType} onChange={e => set("packingType", e.target.value)}>
              <option>Cartons</option><option>Pallets</option><option>Drums</option><option>Bags</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end mt-2">
          <button onClick={onNext} className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-2.5 rounded-xl text-sm font-medium transition-colors">Next</button>
        </div>
      </div>
    </div>
  );
}

function Step3({ form, set, onNext }) {
  const inp = "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all";
  const [selectedCarrier, setSelectedCarrier] = useState("MSC");
  const carriers = [
    { name: "MSC", price: "$1,090 USD", inr: "= ₹90,072 INR", transit: "30 days", ontime: "91%", reliability: "4.5/5", chosen: "68%", recommended: true, best: true },
    { name: "Mearks Line", price: "$1,240 USD", inr: "= ₹1,02000 INR", transit: "28 days", ontime: "94%", reliability: "4.6/5", chosen: null },
    { name: "CMA CGM", price: "$1,420 USD", inr: "= ₹1,02000 INR", transit: "28 days", ontime: "94%", reliability: "4.6/5", chosen: null },
  ];
  return (
    <div className="flex-1 min-w-0">
      <h2 className="text-base font-bold text-gray-800 mb-0.5">Route and Shipment Details</h2>
      <p className="text-xs text-gray-400 mb-5">Enter Route and Shipment Details</p>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Origin Port</label>
            <input className={inp} placeholder="e.g 6109.10" value={form.originPort} onChange={e => set("originPort", e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Destination Port</label>
            <input className={inp} placeholder="Product Discription" value={form.destPort} onChange={e => set("destPort", e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Shipment Mode</label>
            <input className={inp} placeholder="0.00" value={form.shipmentMode} onChange={e => set("shipmentMode", e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Preferred ETD</label>
            <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2.5 gap-2 focus-within:border-teal-500 transition-all">
              <input className="flex-1 text-sm outline-none" placeholder="25-04-2026" value={form.etd} onChange={e => set("etd", e.target.value)} />
              <FaCalendar className="text-gray-400 text-sm" />
            </div>
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Preferred Carrier (optional)</label>
          <select className={inp} value={form.carrier} onChange={e => set("carrier", e.target.value)}>
            <option value="">Let AI recommend best rate</option>
            <option>MSC</option><option>Mearks Line</option><option>CMA CGM</option>
          </select>
        </div>

        <div className="border border-gray-100 rounded-2xl p-4 bg-gray-50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FaBolt className="text-teal-500" />
              <div>
                <p className="text-sm font-bold text-gray-800">AI Freight Quote- Smart Recommendation</p>
                <p className="text-xs text-gray-400">Based on <span className="text-teal-500 font-medium">HYD ICD → Hamburg</span> • See FCL • 20 ft</p>
              </div>
            </div>
            <button onClick={onNext} className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">Next</button>
          </div>

          <div className="bg-white border-2 border-teal-400 rounded-2xl p-4 mb-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">M SC</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-800">MSC</span>
                    <span className="text-xs bg-teal-100 text-teal-600 px-2 py-0.5 rounded-full">Recommended by AI</span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs bg-teal-50 text-teal-600 px-2 py-0.5 rounded-full font-medium">Best Price</span>
                    <span className="text-xs bg-teal-50 text-teal-600 px-2 py-0.5 rounded-full font-medium">Great Reliability</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-800">$1,090 USD</p>
                <p className="text-xs text-gray-400">= ₹90,072 INR</p>
                <div className="flex gap-2 mt-1">
                  <button className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1">Book Now <FaChevronRight className="text-xs" /></button>
                  <button className="border border-teal-500 text-teal-500 px-3 py-1.5 rounded-lg text-xs font-medium">View Details</button>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-xs">
              {[["Transit Time", "30 days", <FaClock className="text-teal-500" />], ["On-time Performance", "91%", <FaChartLine className="text-teal-500" />], ["Reliability Score", "4.5/5", <FaStar className="text-yellow-400" />], ["Choose by users", "68%", <FaUsers className="text-teal-500" />]].map(([label, val, icon]) => (
                <div key={label} className="flex items-center gap-1.5 bg-gray-50 rounded-lg px-2 py-1">
                  {icon}<div><p className="text-gray-400 text-xs">{label}</p><p className="font-semibold text-gray-700">{val}</p></div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {carriers.slice(1).map(c => (
              <div key={c.name} className="bg-white border border-gray-100 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                      <FaShip className="text-blue-400 text-sm" />
                    </div>
                    <span className="text-sm font-bold text-gray-800">{c.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-orange-500">{c.price}</p>
                    <p className="text-xs text-gray-400">{c.inr}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-3 text-xs">
                  <div className="flex items-center gap-1"><FaClock className="text-teal-500 text-xs" /><span className="text-gray-500">Transit Time</span><span className="font-semibold text-gray-700">{c.transit}</span></div>
                  <div className="flex items-center gap-1"><FaChartLine className="text-teal-500 text-xs" /><span className="text-gray-500">On-time Performance</span><span className="font-semibold text-gray-700">{c.ontime}</span></div>
                </div>
                <div className="flex items-center gap-1 text-xs mb-3">
                  <FaStar className="text-yellow-400 text-xs" /><span className="text-gray-500">Reliability Score</span><span className="font-semibold text-gray-700">{c.reliability}</span>
                </div>
                <button className="w-full border border-teal-500 text-teal-500 rounded-xl py-2 text-xs font-medium flex items-center justify-center gap-1 hover:bg-teal-50 transition-colors">
                  View Detail <FaChevronRight className="text-xs" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-teal-50 border border-teal-100 rounded-2xl p-4 flex items-start gap-3">
          <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
            <FaLightbulb className="text-white text-sm" />
          </div>
          <div>
            <p className="text-sm font-bold text-teal-600 mb-1">AI Insight</p>
            <p className="text-xs text-gray-600">You save <span className="font-bold text-gray-800">₹13,000</span> with <span className="text-teal-600 font-bold">MSC</span> compared to Mearsk</p>
            <p className="text-xs text-gray-600">Transit <span className="text-teal-600 font-semibold">2 days</span> longer but cost is <span className="text-teal-600 font-semibold">15% lower</span></p>
            <p className="text-xs text-gray-700 mt-1">👉 <span className="font-bold">Recommended choice : MSC</span></p>
          </div>
        </div>

        <p className="text-xs text-gray-400 flex items-center gap-1"><FaCheck className="text-teal-400 text-xs" /> All quotes are AI-powered recommendation based on price, reliability, transit & historical performance</p>
      </div>
    </div>
  );
}

function Step4({ onSaveDraft, onConfirm }) {
  const fileRef = useRef();
  const [uploadedFiles, setUploadedFiles] = useState({});
  const docSlots = ["Commercial Invoice", "Packing List", "Letter of Credit(Optional)"];
  const requiredDocs = [
    { name: "Commercial Invoice", icon: <FaFileLines className="text-blue-400" />, tag: "Required", tagColor: "bg-red-100 text-red-500" },
    { name: "Packing List", icon: <FaBoxOpen className="text-orange-400" />, tag: "Required", tagColor: "bg-red-100 text-red-500" },
    { name: "Certificate of Origin", icon: <FaUsers className="text-teal-400" />, tag: "If FTA claimed", tagColor: "bg-yellow-100 text-yellow-600" },
    { name: "Quality Certificate", icon: <FaFileLines className="text-purple-400" />, tag: "Required", tagColor: "bg-red-100 text-red-500" },
  ];

  const handleDrop = (e, slot) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) setUploadedFiles(p => ({ ...p, [slot]: file }));
  };

  const handleFileChange = (e, slot) => {
    const file = e.target.files[0];
    if (file) setUploadedFiles(p => ({ ...p, [slot]: file }));
  };

  return (
    <div className="flex-1 min-w-0">
      <h2 className="text-base font-bold text-gray-800 mb-5">Required Documents</h2>
      <div className="flex flex-col gap-3 mb-5">
        {requiredDocs.map(d => (
          <div key={d.name} className="flex items-center justify-between border border-gray-100 rounded-xl px-4 py-3 bg-white">
            <div className="flex items-center gap-3">
              {d.icon}
              <span className="text-sm text-gray-700">{d.name}</span>
            </div>
            <span className={`text-xs px-2.5 py-1 rounded-lg font-medium ${d.tagColor}`}>{d.tag}</span>
          </div>
        ))}
      </div>

      <div
        onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) setUploadedFiles(p => ({...p, general: f})); }}
        onDragOver={e => e.preventDefault()}
        onClick={() => fileRef.current.click()}
        className="border-2 border-dashed border-teal-400 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-teal-50/30 transition-all mb-5"
      >
        <FaCloudArrowUp className="text-teal-400 text-2xl mb-2" />
        <p className="text-sm font-medium text-gray-700">Drag & drop files here or click to browse</p>
        <p className="text-xs text-gray-400 mt-0.5">PDF, JPG, PNG (Max 10 MB each)</p>
      </div>
      <input ref={fileRef} type="file" className="hidden" onChange={e => { const f = e.target.files[0]; if (f) setUploadedFiles(p => ({...p, general: f})); }} />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        {docSlots.map(slot => (
          <div key={slot}
            onDrop={e => handleDrop(e, slot)}
            onDragOver={e => e.preventDefault()}
          >
            <p className="text-xs font-medium text-gray-600 mb-1.5">{slot}</p>
            <div className="border border-gray-200 rounded-xl px-3 py-2.5 flex items-center gap-2 bg-gray-50 cursor-pointer hover:border-teal-400 transition-all"
              onClick={() => { const inp = document.createElement("input"); inp.type = "file"; inp.onchange = e => handleFileChange(e, slot); inp.click(); }}>
              <FaFileLines className="text-blue-400 text-sm flex-shrink-0" />
              {uploadedFiles[slot] ? (
                <div className="flex items-center gap-1 flex-1 min-w-0">
                  <span className="text-xs text-gray-600 truncate flex-1">{uploadedFiles[slot].name}</span>
                  <FaCheck className="text-teal-500 text-xs flex-shrink-0" />
                </div>
              ) : (
                <span className="text-xs text-gray-400">Upload file</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-end gap-3 mb-5">
        <button onClick={onSaveDraft} className="w-full sm:w-auto px-6 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 font-medium transition-colors">Save as Draft</button>
        <button onClick={onConfirm} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors">
          Review & Confirm <FaChevronRight className="text-xs" />
        </button>
      </div>

      <div className="bg-teal-50 border border-teal-100 rounded-2xl p-4 flex items-start gap-3">
        <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
          <FaLightbulb className="text-white text-sm" />
        </div>
        <div>
          <p className="text-sm font-bold text-teal-600 mb-1">AI Insight</p>
          <p className="text-xs text-gray-600">You save <span className="font-bold text-gray-800">₹13,000</span> with <span className="text-teal-600 font-bold">MSC</span> compared to Mearsk</p>
          <p className="text-xs text-gray-600">Transit <span className="text-teal-600 font-semibold">2 days</span> longer but cost is <span className="text-teal-600 font-semibold">15% lower</span></p>
          <p className="text-xs text-gray-700 mt-1">👉 <span className="font-bold">Recommended choice : MSC</span></p>
        </div>
      </div>
    </div>
  );
}

function NewBookingPage({ onCancel }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    companyName: "", iec1: "", iec2: "", contactPerson: "", mobile: "",
    hsCode: "", commodity: "", grossWeight: "", packages: "", invoiceValue: "", incoterms: "", packingType: "Cartons",
    originPort: "", destPort: "", shipmentMode: "", etd: "", carrier: "",
  });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const next = () => setStep(s => Math.min(3, s + 1));

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">New Booking</h1>
            <p className="text-xs text-gray-400 mt-0.5">AI-Powered Freight Booking in 4 Easy Steps</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 font-medium transition-colors">Save as Draft</button>
            <button className="px-4 py-2 text-sm text-white bg-teal-500 hover:bg-teal-600 rounded-xl font-medium transition-colors">Review & Confirm</button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <StepSidebar currentStep={step} />
            {step === 0 && <Step1 form={form} set={set} onNext={next} />}
            {step === 1 && <Step2 form={form} set={set} onNext={next} />}
            {step === 2 && <Step3 form={form} set={set} onNext={next} />}
            {step === 3 && <Step4 onSaveDraft={() => {}} onConfirm={onCancel} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Shipment() {
  const [showBooking, setShowBooking] = useState(false);
  const [shipments, setShipments] = useState([]);
  const [pendingReview, setPendingReview ] = useState(false)
  const [stats, setStats] = useState({
    total: 0,
    inTransit: 0,
    delivered: 0,
    pendingDocs: 0,
    customHold: 0,
    revenue: 0
  });
  const [searchError, setSearchError] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [modeFilter, setModeFilter] = useState("All Modes");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
   

  const statsData = [
    { label: "Total Shipment", value: stats.total },
    { label: "In Transit", value: stats.inTransit },
    { label: "Delivered", value: stats.delivered },
    { label: "Pending Docs", value: stats.pendingDocs },
    { label: "Custom Hold", value: stats.customHold },
    { label: "Revenue(₹)", value: stats.revenue }
  ];

 

  const handleSearch = (val) => {
    setSearch(val);
    setSearchError(val.length === 1 ? "Enter at least 2 characters" : "");
    setPage(1);
  };

  const filtered = shipments.filter((s) => {
    const q = search.toLowerCase();
  
    const matchSearch =
      search.length >= 2
        ? s.sbNumber?.toLowerCase().includes(q) ||
          s.exporter?.companyName?.toLowerCase().includes(q)
        : true;
  
    const matchStatus =
      statusFilter === "All Status" || s.status === statusFilter;
  
    const matchMode =
      modeFilter === "All Modes" || s.route?.mode === modeFilter;
  
    return matchSearch && matchStatus && matchMode;
  });

  const totalPages = Math.ceil(filtered.length / ROWS_PER_PAGE);
  const pageItems = filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  useEffect(() => {
    fetchShipments();
    fetchStats();
  }, []);
  
  const fetchShipments = async () => {
    try {
      const res = await API.get("/shipments");
      setShipments(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  
  const fetchStats = async () => {
    try {
      const res = await API.get("/shipments/stats");
      setStats(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {showBooking ? (
        <NewBookingPage onCancel={() => setShowBooking(false)} />
      ) : (
        <div className="min-h-screen bg-gray-50  ">
           {!pendingReview && (
             <div className="max-w-7xl mx-auto mb-4 ">

              <div className="flex items-start justify-between mb-5 gap-3">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Shipment</h1>
                  <p className="text-[0.8rem] sm:text-sm text-gray-400 mt-1">Government schemes list, benefits and policies</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button onClick={() => {setPendingReview(true)
                        
                  }} className="flex items-center gap-2 border border-teal-500 text-gray-600 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium hover:bg-gray-50 transition-colors whitespace-nowrap">
                    Request
                  </button>
                  <button className="flex items-center gap-2 border border-gray-200 text-gray-600 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium hover:bg-gray-50 transition-colors whitespace-nowrap">
                    <FaDownload className="text-xs" /> Export CSV
                  </button>
                  <button onClick={() => setShowBooking(true)}
                    className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors whitespace-nowrap">
                    New Booking
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-5">
                {statsData.map(s => (
                  <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 sm:p-4 flex flex-col gap-2">
                    <p className="text-xs text-gray-400">{s.label}</p>
                    <div className="flex items-center justify-between">
                      <p className={`text-lg sm:text-2xl font-bold ${s.color}`}>{s.value}</p>
                      {s.icon}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row gap-3 mb-2">
                  <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2.5 gap-2 focus-within:border-teal-500 transition-all flex-1">
                    <FaMagnifyingGlass className="text-gray-400 text-sm flex-shrink-0" />
                    <input className="flex-1 text-sm outline-none bg-transparent" placeholder="Search by SB No., exporter"
                      value={search} onChange={e => handleSearch(e.target.value)} />
                  </div>
                  <select className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 bg-white transition-all"
                    value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}>
                    <option>All Status</option><option>In Transit</option><option>Delivered</option><option>Pending Docs</option><option>Custom Hold</option>
                  </select>
                  <select className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 bg-white transition-all"
                    value={modeFilter} onChange={e => { setModeFilter(e.target.value); setPage(1); }}>
                    <option>All Modes</option><option>Sea FCL</option><option>Air</option><option>Land</option>
                  </select>
                  <select className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 bg-white transition-all">
                    <option>This Month</option><option>Last Month</option><option>This Year</option>
                  </select>
                </div>
                {searchError && <p className="text-xs text-red-500 mb-2 px-1">{searchError}</p>}

                <div className="overflow-x-auto mt-4">
                  <table className="w-full min-w-[700px]">
                    <thead>
                      <tr className="bg-teal-50">
                        {["SB / AWB NO.", "EXPORTER", "ORIGIN - DESTINATION", "HS CODE", "CARRIER", "MODE", "ETD/ETA", "STATUS", "ACTIONS"].map((h, i) => (
                          <th key={h} className={`text-left text-xs font-semibold text-teal-600 px-3 py-3 ${i === 0 ? "rounded-l-xl" : ""} ${i === 8 ? "rounded-r-xl" : ""}`}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {pageItems.length === 0 ? (
                        <tr><td colSpan={9} className="text-center text-sm text-gray-400 py-10">No results found</td></tr>
                      ) : pageItems.map(row => (
                        <tr key={row._id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="px-3 py-3">
                            <p className="text-xs font-semibold text-gray-800">{row.sbNumber}</p>
                            <p className="text-xs text-gray-400">{row.bol}</p>
                          </td>
                          <td className="px-3 py-3">
                            <p className="text-xs font-semibold text-gray-800">{row.exporter?.companyName}</p>
                            <p className="text-xs text-gray-400">{row.exporter?.iecNumber}</p>
                          </td>
                          <td className="text-xs text-gray-600 px-3 py-3">{row.route?.origin}</td>
                          <td className="px-3 py-3"><span className="text-xs bg-teal-100 text-teal-600 px-2 py-1 rounded-lg font-medium">{row.cargo?.hsCode?.hsCode}</span></td>
                          <td className="text-xs text-gray-700 px-3 py-3">{row.route?.carrier}</td>
                          <td className="text-xs text-gray-700 px-3 py-3">{row.route?.mode}</td>
                          <td className="px-3 py-3 flex">
                            <p className="text-xs text-gray-600">{new Date(row.etd).toLocaleDateString()}</p>
                            <p className="text-xs text-gray-400">{new Date(row.eta).toLocaleDateString()}</p>
                          </td>
                          <td className="px-3 py-3"><span className={`text-xs px-2.5 py-1 rounded-lg font-medium whitespace-nowrap ${statusStyle(row.status)}`}>{row.status}</span></td>
                          <td className="px-3 py-3"><button className="text-teal-500 hover:text-teal-600 text-xs font-medium">View</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-4">
                  <p className="text-xs text-gray-400">Showing 1 to {pageItems.length} of {filtered.length.toLocaleString()},999 result</p>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                      className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition-colors">
                      <FaChevronLeft className="text-xs" />
                    </button>
                    {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => i + 1).map(p => (
                      <button key={p} onClick={() => setPage(p)}
                        className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${page === p ? "bg-teal-500 text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>{p}</button>
                    ))}
                    <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                      className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition-colors">
                      <FaChevronRight className="text-xs" />
                    </button>
                  </div>
                </div>
              </div>
            </div> 
          
          )}


        {!pendingReview && (
          <AIModulesBackendScope />
        )} 

      {pendingReview && (
        <PendingReview setPendingReview={setPendingReview}  />
      )}

      
    </div>
    
  )}
</>
  );
}