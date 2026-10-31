import { useState, useRef } from "react";
import {
  FaPlus, FaMagnifyingGlass, FaPen, FaFileImport, FaPaperPlane,
  FaChevronDown, FaXmark, FaRobot, FaShield, FaCircleCheck,
  FaChevronRight, FaAngleDown, FaEye, FaTrash
} from "react-icons/fa6";
import API from "../../api/axios";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

const ActionMenu = ({ onView, onDelete }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(o => !o)}
        className="border border-gray-200 rounded-lg px-2 py-1 text-gray-500 hover:bg-gray-50 transition-colors"
      >
        <FaAngleDown className="text-xs" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-100 rounded-lg shadow-lg z-20 overflow-hidden">
            <button
              onClick={() => { setOpen(false); onView && onView(); }}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-600 hover:bg-gray-50"
            >
              <FaEye className="text-xs" /> View
            </button>
            <button
              onClick={() => { setOpen(false); onDelete && onDelete(); }}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-500 hover:bg-red-50"
            >
              <FaTrash className="text-xs" /> Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const Toggle = ({ checked, onChange }) => (
  <div onClick={() => onChange(!checked)}
    className={`relative w-10 h-6 rounded-full cursor-pointer flex-shrink-0 transition-all duration-200 ${checked ? "bg-teal-500" : "bg-gray-300"}`}>
    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${checked ? "left-5" : "left-1"}`} />
  </div>
);

const initialRows = [
  { id: 1, hsCode: "8471.30", name: "Portable automatic data processing machines", category: "Electronics", importDuty: "0%", exportRestriction: "None" },
  { id: 2, hsCode: "6109.30", name: "T-shirt singlets and other vests, of cotton", category: "Electronics", importDuty: "12%", exportRestriction: "Certificate required" },
  { id: 3, hsCode: "6109.30", name: "T-shirt singlets and other vests, of cotton", category: "Electronics", importDuty: "12%", exportRestriction: "Certificate required" },
  { id: 4, hsCode: "6109.30", name: "T-shirt singlets and other vests, of cotton", category: "Electronics", importDuty: "30%", exportRestriction: "None" },
  { id: 5, hsCode: "6109.30", name: "T-shirt singlets and other vests, of cotton", category: "Electronics", importDuty: "5%", exportRestriction: "None" },
  { id: 6, hsCode: "6109.30", name: "T-shirt singlets and other vests, of cotton", category: "Electronics", importDuty: "0%", exportRestriction: "None" },
  { id: 7, hsCode: "6109.30", name: "T-shirt singlets and other vests, of cotton", category: "Electronics", importDuty: "6%", exportRestriction: "None" },
  { id: 8, hsCode: "8471.30", name: "Portable automatic data processing machines", category: "Electronics", importDuty: "0%", exportRestriction: "None" },
  { id: 9, hsCode: "6109.30", name: "T-shirt singlets and other vests, of cotton", category: "Electronics", importDuty: "5%", exportRestriction: "None" },
  { id: 10, hsCode: "6109.30", name: "T-shirt singlets and other vests, of cotton", category: "Electronics", importDuty: "8%", exportRestriction: "Certificate required" },
];

const ITEMS_PER_PAGE = 7;

const countryRules = [
  { country: "🇦🇪 United Arab Emirates", status: "Allowed", statusColor: "bg-teal-100 text-teal-600", docs: "Certificate of Origin, Invoice, Packing list", restriction: "None", updated: "May 20, 2024" },
  { country: "🇻🇳 Vietnam", status: "Restricted", statusColor: "bg-orange-100 text-orange-500", docs: "Invoice, Packing List, Import License", restriction: "Import license required", updated: "May 18, 2024" },
  { country: "🇩🇪 Germany", status: "Allowed", statusColor: "bg-teal-100 text-teal-600", docs: "Invoice, Packing List, Import License", restriction: "None", updated: "May 15, 2024" },
  { country: "🇨🇳 China", status: "Banned", statusColor: "bg-red-100 text-red-500", docs: "Invoice, Packing List, Import License", restriction: "Prohibited under national policy", updated: "May 10, 2024" },
];

// const incentiveRules = [
//   { hsCode: "-", dest_country:"-" , fob_value:"-",  currency:"-", status: "Allowed", statusColor: "bg-teal-100 text-teal-600", docs: "Certificate of Origin, Invoice, Packing list"  },
//   { hsCode: "-",  dest_country: "-",fob_value:"-", currency:"",status: "Restricted", statusColor: "bg-orange-100 text-orange-500", docs: "Invoice, Packing List, Import License" },
//   { hsCode: "-", dest_country: "-", fob_value:"-", currency:"-",   status: "Allowed", statusColor: "bg-teal-100 text-teal-600", docs: "Invoice, Packing List, Import License" },
//   { hsCode: "-",dest_country: "-", fob_value : "-", currency:"", status: "Banned", statusColor: "bg-red-100 text-red-500", docs: "Invoice, Packing List, Import License",  },
// ];

const relatedCodes = [
  { code: "090889990", name: "Coffee, not roasted", match: "92% match" },
  { code: "090889990", name: "Coffee, Roasted", match: "90% match" },
  { code: "099889990", name: "Coffee, Decaffeinated", match: "88% match" },
];

function HSRulesPage({ onAddClick, refreshKey }) {
  const [search, setSearch] = useState("");
  const [searchError, setSearchError] = useState("");
  const [rows, setRows] = useState([]);
const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const handleSearch = (val) => {
    setSearch(val);
    if (val.length === 1) setSearchError("Enter at least 2 characters to search");
    else setSearchError("");
  };

  useEffect(() => {
    fetchHS();
  }, [page, search, refreshKey]);
  
  const fetchHS = async () => {
    try {
      const res = await API.get(`/hs?search=${search}&page=${page}&limit=7`);
      setRows(res.data.data);
      setTotal(res.data.total);
    } catch (err) {
      console.log(err);
    }
  };


  const filtered = rows.filter(r =>
    search.length >= 2
      ? r.hsCode.toLowerCase().includes(search.toLowerCase()) || r.name.toLowerCase().includes(search.toLowerCase())
      : true
  );

const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  const pageItems = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">HS Rules</h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">Product classification rules and import/export guidelines</p>
          </div>
          <button onClick={onAddClick}
            className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors shadow-sm whitespace-nowrap">
            <FaPlus className="text-xs" /> Add HS Code
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5">
          <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2.5 gap-2 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/10 transition-all mb-1">
            <FaMagnifyingGlass className="text-gray-400 text-sm flex-shrink-0" />
            <input
              className="flex-1 text-sm outline-none bg-transparent"
              placeholder="Search by HS Code or Commodity Name"
              value={search}
              onChange={e => handleSearch(e.target.value)}
            />
          </div>
          {searchError && <p className="text-xs text-red-500 mb-2 px-1">{searchError}</p>}

          <div className="overflow-x-auto mt-4">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="bg-teal-50">
                  <th className="text-left text-xs font-semibold text-teal-600 px-3 py-3 rounded-l-xl">HS CODE</th>
                  <th className="text-left text-xs font-semibold text-teal-600 px-3 py-3">COMMODITY NAME</th>
                  <th className="text-left text-xs font-semibold text-teal-600 px-3 py-3">CATEGORY</th>
                   <th className="text-left text-xs font-semibold text-teal-600 px-3 py-3">Product desc..</th>
                  <th className="text-left text-xs font-semibold text-teal-600 px-3 py-3">IMPORT DUTY</th>
                  <th className="text-left text-xs font-semibold text-teal-600 px-3 py-3">EXPORT RESTRICTIONS</th>
                  <th className="text-center text-xs font-semibold text-teal-600 px-3 py-3 rounded-r-xl">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.length === 0 ? (
                  <tr><td colSpan={6} className="text-center text-sm text-gray-400 py-10">No results found</td></tr>
                ) : pageItems.map((row) => (
                  <tr key={row._id} className="border-t border-gray-100">
                    <td className="text-sm text-gray-700 px-3 py-3 font-medium">{row.hsCode}</td>
                    <td className="text-xs sm:text-sm text-gray-600 px-3 py-3 max-w-[180px]">{row.productName}</td>
                    <td className="px-3 py-3">
                      <span className="text-xs bg-purple-100 text-purple-600 px-2.5 py-1 rounded-lg font-medium">{row.category?.name || "-"}</span>
                    </td>
                      <td className="text-sm text-center text-gray-700 px-3 py-3">--</td>
                    <td className="text-sm text-gray-700 px-3 py-3">{row.tradeInfo?.importDuty + "%" || "-"}</td>
                    <td className="px-3 py-3">
                      <span className={`text-xs whitespace-nowrap px-2.5 py-1 rounded-lg font-medium ${row.exportRestriction === "None" ? "bg-teal-100 text-teal-600" : "bg-orange-100 text-orange-500"}`}>
                        {row.tradeInfo?.restrictedItem ? "Restricted" : "None"}
                      </span>
                    </td>
                    <td className="text-center px-3 py-3">
                    <button
  onClick={() => onAddClick(row)}
  className="text-teal-500"
>
  Edit
</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 0 && (
            <div className="flex items-center justify-end gap-2 mt-4 flex-wrap">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                className="px-4 py-2 text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 disabled:opacity-40 font-medium transition-colors">
                Preview
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setPage(p)}
                  className={`w-9 h-9 rounded-xl text-sm font-medium transition-colors ${page === p ? "bg-teal-500 text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                  {p}
                </button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className="px-4 py-2 text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 disabled:opacity-40 font-medium transition-colors">
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AddHSCodePage({ onCancel, editData, onSuccess}) {
  const csvRef = useRef();
  const [showSavedBanner, setShowSavedBanner] = useState(false);
  const [categories, setCategories] = useState([]);
  const [industries, setIndustries] = useState([]);
  
  const [form, setForm] = useState({
    hsCodeNumber: "878686768768",
    productDesc: "",
    productName: "",
    productCategories: "",
    countries: ["India", "UAE"],
    industry: "",
    riskLevel: "",
    status: true,
    importDuty: "5.00",
    exportDuty: "5.00",
    gstTax: "18.00",
    customsClearanceTime: "2-3 days",
    tradeVolumeLevel: "High",
    restrictedItem: true,
    licenseRequired: true,
  });

  const set = (key, val) => setForm(p => ({ ...p, [key]: val }));

  const handleSaveDraft = () => {
    setShowSavedBanner(true);
    setTimeout(() => setShowSavedBanner(false), 3000);
  };

  useEffect(() => {
    if (editData) {
      setForm({
        hsCodeNumber: editData.hsCode,
        productName: editData.productName,
        productDesc: editData.description,
        productCategories: editData.category?._id || "",
        industry: editData.industry?._id || "",
        importDuty: editData.tradeInfo?.importDuty || "",
        exportDuty: editData.tradeInfo?.exportDuty || "",
        gstTax: editData.tradeInfo?.gst || "",
        restrictedItem: editData.tradeInfo?.restrictedItem || false,
        licenseRequired: editData.tradeInfo?.licenseRequired || false,
        status: editData.status === "active",
      });
    }
  }, [editData]);

  const handleSubmit = async () => {
    try {
      // ✅ DEBUG (IMPORTANT)
      console.log("🔥 SUBMIT CLICKED");
      console.log("FORM DATA:", form);
  
      const payload = {
        hsCode: form.hsCodeNumber,
        productName: form.productName,
        description: form.productDesc,
      
        category: form.productCategories || undefined,
        industry: form.industry || undefined,
      
        riskLevel: form.riskLevel?.toLowerCase(),
      
        status: form.status ? "active" : "inactive",
      
        tradeInfo: {
          importDuty: Number(form.importDuty) || 0,
          exportDuty: Number(form.exportDuty) || 0,
          gst: Number(form.gstTax) || 0,
          restrictedItem: form.restrictedItem,
          licenseRequired: form.licenseRequired,
        }
      };
      console.log("FINAL PAYLOAD:", payload);  // 🔥 MUST CHECK
  
      if (editData) {
        await API.put(`/hs/${editData._id}`, payload);
      } else {
        await API.post("/hs", payload);
      }
  
      toast.success("Saved successfully");
      onSuccess && onSuccess();
      onCancel();
  
    } catch (err) {
      console.log("❌ FULL ERROR:", err);
    
      console.log("❌ RESPONSE:", err.response?.data);  // 🔥 MOST IMPORTANT
    
      toast.error(err.response?.data?.message || "Error saving HS Code");
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchIndustries();
  }, []);
  
  const fetchCategories = async () => {
    try {
      const res = await API.get("/master/categories"); // ✅ correct API
      setCategories(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchIndustries = async () => {
    try {
      const res = await API.get("/master/categories");
  
      const industryCategory = res.data.data.find(
        (c) => c.key === "industry"
      );
  
      if (!industryCategory) {
        console.log("❌ Industry category not found");
        return;
      }
  
      const itemsRes = await API.get(
        `/master/items/${industryCategory._id}`
      );
  
      console.log("INDUSTRIES:", itemsRes.data.data); 
      console.log("CATEGORY ID:", form.productCategories);
console.log("INDUSTRY ID:", form.industry);
console.log("ALL CATEGORIES:", res.data.data);
console.log("FOUND INDUSTRY CATEGORY:", industryCategory);// ✅ CHECK
  
      setIndustries(itemsRes.data.data || []);
  
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">

        <div className="flex  flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Add Hs Code</h1>
            <p className="text-xs text-gray-400 mt-0.5">Add hs code.</p>
          </div>
          <div className="flex items-center sm:flex-row flex-col gap-2">
            <button onClick={() => csvRef.current.click()}
              className="flex items-center gap-2 border border-gray-200 text-gray-600 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium hover:bg-gray-50 transition-colors whitespace-nowrap">
              <FaFileImport className="text-sm" /> Import CSV
            </button>
            <input ref={csvRef} type="file" accept=".csv" className="hidden" />
            <button className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors whitespace-nowrap">
              <FaPlus className="text-xs" /> Add HS Code
            </button>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-4">

          <div className="flex-1 flex flex-col gap-4 min-w-0">

            {/* SECTION 1 - Basic HS Code Details */}
            <div className="bg-white rounded-2xl border-2 border-teal-400 p-4 sm:p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-800 mb-4">Basic HS Code Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">HS Code Number</label>
                  <input className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all"
                    placeholder="878686768768" value={form.hsCodeNumber || ""}
                    onChange={(e) => set("hsCodeNumber", e.target.value)} />
                  <p className="text-xs text-gray-400 mt-1">Enter 8 or 10 digit HS code number</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Product Description</label>
                  <textarea className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 resize-none transition-all"
                    rows={4} placeholder="Enter Product description users materials , etc"
                    value={form.productDesc} onChange={e => set("productDesc", e.target.value)} />
                  <p className="text-xs text-gray-400 mt-1">Detailed description helps in accurate classification</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Product Name</label>
                  <input className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all"
                    placeholder="Enter Product Name" value={form.productName} onChange={e => set("productName", e.target.value)} />
                  <p className="text-xs text-gray-400 mt-1">Use common name for easier identification</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Country Applicability</label>
                  <div className="border border-gray-200 rounded-xl px-3 py-2.5 flex flex-wrap gap-1.5 items-center focus-within:border-teal-500 transition-all">
                    {form.countries?.map(c => (
                      <span key={c} className="flex items-center gap-1 bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-lg">
                        {c}
                        <button onClick={() => set("countries", form.countries.filter(x => x !== c))} className="text-gray-400 hover:text-gray-600">
                          <FaXmark className="text-xs" />
                        </button>
                      </span>
                    ))}
                    <span className="text-xs text-teal-500 cursor-pointer">+12</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Select countries where this HS code is applicable</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Product categories</label>
                  <select
  value={form.productCategories || ""}
  onChange={(e) => set("productCategories", e.target.value)}
>
  <option value="">Select Category</option>

  {categories.map((c) => (
    <option key={c._id} value={c._id}>   {/* ✅ ONLY _id */}
      {c.name}
    </option>
  ))}
</select>
                  <p className="text-xs text-gray-400 mt-1">Search and select product category</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Risk Level</label>
                  <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 bg-white transition-all"
                    value={form.riskLevel} onChange={e => set("riskLevel", e.target.value)}>
                    <option value="">Select Risk level</option>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Industry</label>
                  <select
  value={form.industry || ""}
  onChange={(e) => set("industry", e.target.value)}
>
  <option value="">Select Industry</option>

  {industries.map((i) => (
    <option key={i._id} value={i._id}>   {/* ✅ ONLY _id */}
      {i.name}
    </option>
  ))}
</select>
                  <p className="text-xs text-gray-400 mt-1">Choose applicable Industry</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Status</label>
                  <div className="flex items-center gap-2 mt-2">
                    <Toggle checked={form.status} onChange={v => set("status", v)} />
                    <span className="text-sm text-gray-600">{form.status ? "Active" : "Inactive"}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Inactive codes won't be visible</p>
                </div>
              </div>
            </div>

            {/* SECTION 2 - Trade Information */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-800 mb-4">Trade Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Import Duty</label>
                  <input className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all"
                    value={form.importDuty} onChange={e => set("importDuty", e.target.value)} />
                  <p className="text-xs text-gray-400 mt-1">Enter import duty percentage</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Export Duty (%)</label>
                  <input className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all"
                    value={form.exportDuty} onChange={e => set("exportDuty", e.target.value)} />
                  <p className="text-xs text-gray-400 mt-1">Enter export duty percentage</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">GST/Tax (%)</label>
                  <input className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all"
                    value={form.gstTax} onChange={e => set("gstTax", e.target.value)} />
                  <p className="text-xs text-gray-400 mt-1">Use common name for easier identification</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Restricted Item</label>
                    <div className="flex items-center gap-2 mt-2">
                      <Toggle checked={form.restrictedItem} onChange={v => set("restrictedItem", v)} />
                      <span className="text-sm text-gray-600">{form.restrictedItem ? "yes" : "no"}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">disable if item is not restricted</p>
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">License Required</label>
                    <div className="flex items-center gap-2 mt-2">
                      <Toggle checked={form.licenseRequired} onChange={v => set("licenseRequired", v)} />
                      <span className="text-sm text-gray-600">{form.licenseRequired ? "yes" : "no"}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">disable if license is not restricted</p>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Customs Clearance Time</label>
                  <input className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all"
                    value={form.customsClearanceTime} onChange={e => set("customsClearanceTime", e.target.value)} />
                  <p className="text-xs text-gray-400 mt-1">Average time for customs clearance</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Trade Volume Level</label>
                  <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 bg-white transition-all"
                    value={form.tradeVolumeLevel} onChange={e => set("tradeVolumeLevel", e.target.value)}>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                  <p className="text-xs text-gray-400 mt-1">Expected trade volume for this HS code</p>
                </div>
              </div>
            </div>

            {/* SECTION 3 - AI Trade Insights */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <FaRobot className="text-teal-500 text-sm" />
                  <h2 className="text-sm font-semibold text-gray-800">AI Trade Insights</h2>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex items-center gap-1.5 border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-600 font-medium">
                    <FaShield className="text-gray-400 text-xs" /> Risk : Low
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">AI Confidence Score</p>
                    <p className="text-2xl font-bold text-gray-800">92%</p>
                    <div className="w-32 h-2 bg-gray-100 rounded-full mt-1">
                      <div className="w-[92%] h-2 bg-teal-500 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-teal-600 font-medium mb-1">This HS Code has high export demand in UAE, Vietnam, and Germany.</p>
              <p className="text-xs text-gray-400 mb-3">Consider focusing on quality certifications to increase market share</p>
              <p className="text-xs font-semibold text-gray-500 mb-2">Suggested Related HS Codes</p>
              <div className="flex flex-wrap gap-3">
                {relatedCodes.map((r, i) => (
                  <div key={r.code + i} className="border border-gray-100 rounded-xl p-2.5 bg-gray-50 min-w-[120px]">
                    <p className="text-xs font-semibold text-gray-700">{r.code}</p>
                    <p className="text-xs text-gray-400">{r.productName}</p>
                    <p className="text-xs text-teal-500 font-medium mt-1">{r.match}</p>
                  </div>
                ))}
                <div className="border border-gray-100 rounded-xl p-2.5 bg-gray-50 min-w-[120px] flex flex-col items-center justify-center cursor-pointer hover:bg-teal-50 transition-colors">
                  <FaPlus className="text-teal-500 mb-1" />
                  <p className="text-xs text-teal-500 font-medium">View More</p>
                  <p className="text-xs text-gray-400">12 more suggestion</p>
                </div>
              </div>
            </div>

            {/* SECTION 4 - Country Rules & Compliance */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-800 mb-4">Country Rules & Compliance</h2>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left text-xs font-semibold text-gray-500 px-3 py-3 rounded-l-xl">Country</th>
                      {/* <th className="text-left text-xs font-semibold text-gray-500 px-3 py-3 rounded-l-xl">Hs code</th>
                      <th className="text-left text-xs font-semibold text-gray-500 px-3 py-3 rounded-l-xl">Origin country</th>
                      <th className="text-left text-xs font-semibold text-gray-500 px-3 py-3 rounded-l-xl">Destination country</th> */}
                      

                      <th className="text-left text-xs font-semibold text-gray-500 px-3 py-3">Import Status</th>
                      <th className="text-left text-xs font-semibold text-gray-500 px-3 py-3">Required Documents</th>
                      <th className="text-left text-xs font-semibold text-gray-500 px-3 py-3">Restrictions</th>
                      <th className="text-left text-xs font-semibold text-gray-500 px-3 py-3">Last Updated</th>
                      <th className="text-right text-xs font-semibold text-gray-500 px-3 py-3 rounded-r-xl">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {countryRules.map((c, i) => (
                      <tr key={c.country} className="border-t border-gray-100">
                        <td className="text-sm text-gray-700 px-3 py-3">{c.country}</td>
                          {/* <td className="text-sm text-gray-700 px-3 py-3">-</td>
                          <td className="text-sm text-gray-700 px-3 py-3">-</td>
                          <td className="text-sm text-gray-700 px-3 py-3">-</td> */}
                        <td className="px-3 py-3">
                          <span className={`text-xs px-2.5 py-1 rounded-lg font-medium ${c.statusColor}`}>{c.status}</span>
                        </td>
                        <td className="text-xs text-gray-500 px-3 py-3 max-w-[160px]">{c.docs}</td>
                        <td className="text-xs text-gray-500 px-3 py-3">{c.restriction}</td>
                        <td className="text-xs text-gray-500 px-3 py-3 whitespace-nowrap">{c.updated}</td>
                        <td className="text-right px-3 py-3">
                          <ActionMenu
                            onView={() => console.log("View country rule", c)}
                            onDelete={() => console.log("Delete country rule", c)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between mt-3 px-1">
                <p className="text-xs text-gray-400">Showing 4 of 4 countries</p>
                <button className="text-xs text-teal-500 hover:text-teal-600 font-medium">View all</button>
              </div>
            </div>
            
              {/* <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-800 mb-4">Incentives Rules</h2>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left text-xs font-semibold text-gray-500 px-3 py-3 rounded-l-xl">Hs code</th>
                      <th className="text-left text-xs font-semibold text-gray-500 px-3 py-3 rounded-l-xl">Destination country</th>
                      
                      <th className="text-left text-xs font-semibold text-gray-500 px-3 py-3"> Fob value </th>
                       <th className="text-left text-xs font-semibold text-gray-500 px-3 py-3">  Currency</th>

                      <th className="text-right text-xs font-semibold text-gray-500 px-3 py-3"> Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {incentiveRules.map((c, i) => (
                      <tr key={i} className="border-t border-gray-100">
                      
                          <td className="text-sm text-gray-700 px-3 py-3 text-left">{c.hsCode ?? "-"}</td>
                          <td className="text-sm text-gray-700 px-3 py-3">{c.dest_country ?? "-"}</td>
                          <td className="text-sm text-gray-700 px-3 py-3">{c.fob_value ?? "-"}</td>
                          <td className="text-sm text-gray-700 px-3 py-3">{c.currency ?? "-"}</td>

                        <td className="text-right px-3 py-3">
                          <ActionMenu
                            onView={() => console.log("View incentive rule", c)}
                            onDelete={() => console.log("Delete incentive rule", c)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div> */}

            {/* BOTTOM ACTIONS */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white rounded-2xl border border-gray-100 px-4 sm:px-5 py-4 shadow-sm">
              <button onClick={onCancel} className="w-full sm:w-auto px-6 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 font-medium transition-colors">
                Cancel
              </button>
              <div className="flex gap-2 w-full sm:w-auto">
                <button onClick={handleSaveDraft}
                  className="flex-1 sm:flex-none px-6 py-2.5 text-sm text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 font-medium transition-colors">
                  Save Draft
                </button>
                <button  onClick={handleSubmit} className="flex-1 sm:flex-none flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors">
                  <FaPaperPlane className="text-xs" /> Publish HS Code
                </button>
              </div>
            </div>

          </div>

        

        </div>
      </div>
    </div>
  );
}

export default function HSRules() {
  const [showAdd, setShowAdd] = useState(false);
  const [editData, setEditData] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => setRefreshKey(prev => prev + 1);

  return showAdd ? (
    <AddHSCodePage
    editData={editData}
    onCancel={() => {
      setShowAdd(false);
      setEditData(null);
    }}
    onSuccess={refresh} // ✅ correct
  />
  ) : (
    <HSRulesPage
      refreshKey={refreshKey}
      onAddClick={(data) => {
        setEditData(data || null);
        setShowAdd(true);
      }}
    />
  );
}