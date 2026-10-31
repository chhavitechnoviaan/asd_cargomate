import { useState } from "react";
import { FaPlus, FaCircleCheck, FaArrowUpRightFromSquare, FaBuilding, FaXmark } from "react-icons/fa6";
import { useEffect } from "react";
import API from "../../api/axios"; 

const initialSchemes = [
  { id: 1, title: "Export Promotion Capital Goods", code: "EPCG- 2024", status: "Active", desc: "Scheme allows import of capital goods at zero customs duty for pre-production and post production", benefits: ["Zero customs duty", "Export obligation required", "Valid for 6 years"], applicants: 245 },
  { id: 2, title: "Export Promotion Capital Goods", code: "EPCG- 2024", status: "Active", desc: "Scheme allows import of capital goods at zero customs duty for pre-production and post production", benefits: ["Zero customs duty", "Export obligation required", "Valid for 6 years"], applicants: 245 },
  { id: 3, title: "Export Promotion Capital Goods", code: "EPCG- 2024", status: "Active", desc: "Scheme allows import of capital goods at zero customs duty for pre-production and post production", benefits: ["Zero customs duty", "Export obligation required", "Valid for 6 years"], applicants: 245 },
  { id: 4, title: "Export Promotion Capital Goods.", code: "EPCG- 2024", status: "Active", desc: "Scheme allows import of capital goods at zero customs duty for pre-production and post production", benefits: ["Zero customs duty", "Export obligation required", "Valid for 6 years"], applicants: 245 },
];

function AddSchemeModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ title: "", code: "", hsCode: "", destinationCountry: "", fobValue: "", status: "Active", desc: "", benefits: "", applicants: "" });
  const [errors, setErrors] = useState({});
  const set = (k, v) => { setForm(p => ({ ...p, [k]: v })); setErrors(p => ({ ...p, [k]: "" })); };

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.code.trim()) e.code = "Code is required";
    if (!form.desc.trim()) e.desc = "Description is required";
    return e;
  };

  const handleAdd = async () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
  
    try {
      await API.post("/dgft", {
        name: form.title,
        code: form.code,
        year: new Date().getFullYear(),
        description: form.desc,
        benefits: form.benefits
          .split(",")
          .map(b => b.trim())
          .filter(Boolean),
        status: form.status.toLowerCase(),
        applicantsCount: Number(form.applicants || 0),
        hsCode: form.hsCode,
        destinationCountry: form.destinationCountry,
        fobValue: form.fobValue
      });
  
      onClose();
      window.location.reload();
  
    } catch (err) {
      console.log(err);
      alert("Error creating scheme");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-semibold text-gray-800">Add New Scheme</h3>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <FaXmark />
          </button>
        </div>
        <div className="flex flex-col gap-4 mb-6">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Scheme Title</label>
            <input className={`w-full border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all ${errors.title ? "border-red-400" : "border-gray-200"}`}
              placeholder="Enter scheme title" value={form.title} onChange={e => set("title", e.target.value)} />
            {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Scheme Code</label>
            <input className={`w-full border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all ${errors.code ? "border-red-400" : "border-gray-200"}`}
              placeholder="e.g. EPCG- 2024" value={form.code} onChange={e => set("code", e.target.value)} />
            {errors.code && <p className="text-xs text-red-500 mt-1">{errors.code}</p>}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">HS Code</label>
            <input className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all"
              placeholder="Enter HS code" value={form.hsCode} onChange={e => set("hsCode", e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Destination Country</label>
            <input className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all"
              placeholder="Enter destination country" value={form.destinationCountry} onChange={e => set("destinationCountry", e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">FOB Value + Currency</label>
            <input className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all"
              placeholder="e.g. 5000 USD" value={form.fobValue} onChange={e => set("fobValue", e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Status</label>
            <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 bg-white transition-all"
              value={form.status} onChange={e => set("status", e.target.value)}>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Description</label>
            <textarea className={`w-full border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 resize-none transition-all ${errors.desc ? "border-red-400" : "border-gray-200"}`}
              rows={3} placeholder="Enter scheme description" value={form.desc} onChange={e => set("desc", e.target.value)} />
            {errors.desc && <p className="text-xs text-red-500 mt-1">{errors.desc}</p>}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Key Benefits (comma separated)</label>
            <input className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all"
              placeholder="e.g. Zero customs duty, Valid for 6 years" value={form.benefits} onChange={e => set("benefits", e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Applicants</label>
            <input type="number" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all"
              placeholder="Number of applicants" value={form.applicants} onChange={e => set("applicants", e.target.value)} />
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 px-4 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 font-medium transition-colors">Cancel</button>
          <button onClick={handleAdd} className="flex-1 px-4 py-2.5 text-sm text-white bg-teal-500 rounded-xl hover:bg-teal-600 font-medium transition-colors">Add Scheme</button>
        </div>
      </div>
    </div>
  );
}

function SchemeCard({ scheme }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-sm sm:text-base font-bold text-gray-800 leading-snug">{scheme.name}</h3>
          <p className="text-xs text-gray-400 mt-0.5">{scheme.code}</p>
        </div>
        <span className={`text-xs px-2.5 py-1 rounded-lg font-medium flex-shrink-0 ${scheme.status === "active" ? "bg-teal-100 text-teal-600" : "bg-gray-100 text-gray-500"}`}>
          {scheme.status}
        </span>
      </div>

      <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{scheme.description}</p>

      <div>
        <p className="text-xs font-bold text-gray-800 mb-1.5">Key Benefits:</p>
        <div className="flex flex-col gap-1">
          {scheme.benefits.map((b, i) => (
            <div key={i} className="flex items-center gap-2">
              <FaCircleCheck className="text-teal-500 text-xs flex-shrink-0" />
              <span className="text-xs text-gray-600">{b}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-gray-100 pt-3 mt-auto">
        <p className="text-xs text-gray-500">Applicants: <span className="font-semibold text-gray-700">{scheme.applicantsCount}</span></p>
        <button className="flex items-center gap-1.5 text-xs text-teal-500 hover:text-teal-600 font-medium transition-colors">
          View Details <FaArrowUpRightFromSquare className="text-xs" />
        </button>
      </div>
    </div>
  );
}

export default function DGFTSchemes() {
  const [schemes, setSchemes] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchSchemes = async () => {
    try {
      const res = await API.get("/dgft");
      setSchemes(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSchemes();
  }, []);

  const handleAdd = (scheme) => setSchemes(prev => [...prev, scheme]);

  const [stats, setStats] = useState({
    totalSchemes: 0,
    activeSchemes: 0,
    totalApplicants: 0,
    benefitsClaimed: 0
  });

const fetchStats = async () => {
  const res = await API.get("/dgft/stats");
  setStats(res.data.data);
};

useEffect(() => {
  fetchStats();
}, []);

  const totalSchemes = schemes.length;
  const activeSchemes = schemes.filter(s => s.status === "Active").length;
  const totalApplicants = schemes.reduce((sum, s) => sum + s.applicants, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      {showModal && <AddSchemeModal onClose={() => setShowModal(false)} onAdd={handleAdd} />}

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="flex items-start justify-between mb-5 gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">DGFT Schemes</h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">Government schemes list, benefits and policies</p>
          </div>
          <button onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors shadow-sm whitespace-nowrap">
            <FaPlus className="text-xs" /> Add Schemes
          </button>
        </div>

        {/* INFO BANNER */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-5 flex items-start gap-3">
          <FaBuilding className="text-blue-400 text-base flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs sm:text-sm font-semibold text-blue-600 mb-0.5">About DGFT Schemes</p>
            <p className="text-xs text-blue-500 leading-relaxed">The Directorate General of Foreign Trade (DGFT) operates various schemes to promote Indian exports and support manufacturers with duty benefits and incentives.</p>
          </div>
        </div>

        {/* SCHEMES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          {schemes.map(scheme => (
            <SchemeCard key={scheme.id} scheme={scheme} />
          ))}
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {[
            { label: "Total Schemes", value: stats.totalSchemes },
            { label: "Active Schemes", value: stats.activeSchemes },
            { label: "Total Applicants", value: (stats.totalApplicants || 0).toLocaleString() },
            { label: "Benefits Claimed", value: stats.benefitsClaimed },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <p className="text-xs text-gray-400 mb-1">{label}</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-800">{value}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}