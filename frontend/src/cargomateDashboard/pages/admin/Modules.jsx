import { useState, useRef } from "react";
import { FiTrash2, FiUpload, FiSearch, FiX, FiPackage } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { BsBoxSeam } from "react-icons/bs";
import API from "../../api/axios";
import { useEffect } from "react";

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative inline-flex items-center w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none flex-shrink-0 ${checked ? "bg-teal-400" : "bg-gray-300"}`}
    >
      <span className={`inline-block w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 ${checked ? "translate-x-6" : "translate-x-1"}`} />
    </button>
  );
}

const initialModules = [
  { id: 1, name: "Shipment Tracking", desc: "Real Time Shipment tracking and notification", enabled: false },
  { id: 2, name: "Invoice Managment", desc: "Real Time Shipment tracking and notification", enabled: false },
  { id: 3, name: "Vendor Management", desc: "Real Time Shipment tracking and notification", enabled: false },
  { id: 4, name: "Ads Module", desc: "Real Time Shipment tracking and notification", enabled: true },
  { id: 5, name: "AI Chatbot", desc: "Real Time Shipment tracking and notification", enabled: true },
  { id: 6, name: "Reports & Analytics", desc: "Real Time Shipment tracking and notification", enabled: false },
  { id: 7, name: "Email Automation", desc: "Real Time Shipment tracking and notification", enabled: false },
  { id: 8, name: "Mobile App Sync", desc: "Real Time Shipment tracking and notification", enabled: false },
  { id: 9, name: "Warehouse Integration", desc: "Real Time Shipment tracking and notification", enabled: false },
  { id: 10, name: "Multi-Currency Support", desc: "Handle transaction in multiple currencies", enabled: false },
];



export default function Modules() {
  const [modules, setModules] = useState([]);
  const [stats, setStats] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [dragOver, setDragOver] = useState(false);
  const [uploadForm, setUploadForm] = useState({ name: "", version: "", description: "", file: null });
  const fileRef = useRef();
  const [catalog, setCatalog] = useState([]);
 
  useEffect(() => {
    fetchModules();
    fetchStats();
  }, []);
  
  const fetchModules = async () => {
    const res = await API.get("/modules/installed");
    if (res.data.status) {
      setModules(res.data.data);
    }
  };
  
  const fetchStats = async () => {
    const res = await API.get("/modules/stats");
    if (res.data.status) {
      setStats(res.data.data);
    }
  };

  const toggleModule = async (id) => {
    await API.put(`/modules/toggle/${id}`);
    fetchModules();
    fetchStats();
  };

  const deleteModule = async (id) => {
    await API.delete(`/modules/${id}`);
    fetchModules();
    fetchStats();
  };

  const handleUploadChange = (key, value) => {
    setUploadForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleUploadChange("file", file);
  };

  const handleUploadModule = async () => {
    try {
      if (!uploadForm.name) {
        alert("Module name required");
        return;
      }
  
      const formData = new FormData();
  
      formData.append("name", uploadForm.name);
      formData.append("version", uploadForm.version);
      formData.append("description", uploadForm.description);
      formData.append("file", uploadForm.file); // ZIP
  
      await API.post("/modules/upload", formData);
  
      if (res.data.status) {
        // 🔥 reload modules
        fetchModules();
        fetchStats();
  
        // reset form
        setUploadForm({
          name: "",
          version: "",
          description: "",
          file: null,
        });
  
        setShowModal(false);
      }
    } catch (err) {
      console.log(err);
      alert("Upload failed");
    }
  };

  const fetchMarketplace = async () => {
    const res = await API.get("/modules/marketplace");
  
    if (res.data.status) {
      setCatalog(res.data.data);
    }
  };

  useEffect(() => {
    fetchModules();
    fetchStats();
    fetchMarketplace(); 
  }, []);

  const filteredCatalog = catalog.filter((m) => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase());
    if (filter === "All") return matchSearch;
    if (filter === "Premium") return matchSearch && m.premium;
    return matchSearch;
  });

  const enabled = modules.filter((m) => m.isEnabled).length;

  return (
    <div className="min-h-screen bg-gray-50 px-3 py-6 sm:px-6 sm:py-8">
      <div className="max-w-5xl mx-auto">

        <div className="flex items-start justify-between mb-5">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Modules</h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Install, enable, or disable feature modules</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-teal-400 hover:bg-teal-500 rounded-lg transition-colors flex-shrink-0"
          >
            <span>+ Upload Module</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Total Modules", value: stats.total },
            { label: "Installed", value: stats.installed },
            { label: "Enabled", value: stats.enabled },
            { label: "Available", value: stats.available },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4">
              <p className="text-xs text-gray-500">{s.label}</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((m) => (
            <div key={m._id} className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-start gap-3 mb-2">
                <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BsBoxSeam className="text-teal-500" size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{m.module?.name || "Unknown Module"}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{m.module?.description || "No description"}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs text-gray-500">Status</span>
                <Toggle
  checked={m.isEnabled}
  onChange={() => toggleModule(m._id)}
/>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex-1 py-1.5 text-sm border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                  Configure
                </button>
                <button
                  onClick={() => deleteModule(m._id)}
                  className="p-1.5 border border-gray-200 rounded-lg text-red-400 hover:bg-red-50 transition-colors"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-start justify-center z-50 p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-4">
            <div className="p-5 border-b border-gray-100 flex items-start justify-between">
              <div>
                <h2 className="text-base font-bold text-gray-800">Add New Module</h2>
                <p className="text-xs text-gray-500 mt-0.5">Install or upload modules to extent platform functionality</p>
              </div>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <FiX size={20} />
              </button>
            </div>

            <div className="p-5">
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="relative flex-1">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search"
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-300"
                  />
                </div>
                <div className="flex gap-2">
                  {["All", "Installed", "Available", "Premium"].map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`px-3 py-2 text-xs rounded-lg font-medium transition-colors flex items-center gap-1 ${filter === f ? "bg-teal-400 text-white" : "border border-gray-300 text-gray-600 hover:bg-gray-50"}`}
                    >
                      {f === "Premium" && <FaStar className="text-yellow-400" size={11} />}
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5 max-h-72 overflow-y-auto pr-1">
                {catalog.map((m) => (
                  <div key={m._id} className="border border-gray-200 rounded-xl p-3">
                    <div className="flex items-start gap-2 mb-2">
                      <div className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <BsBoxSeam className="text-teal-400" size={14} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-800">{m.name}</p>
                        <p className="text-[0.65rem] text-gray-400 mt-0.5 leading-tight">{m.desc}</p>
                      </div>
                    </div>
                    <span className={`inline-block text-xs px-2 py-0.5 rounded-full mb-2 font-medium ${m.premium ? "bg-yellow-100 text-yellow-600" : "bg-teal-50 text-teal-600"}`}>
                      {m.badge}
                    </span>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-400" size={11} />
                        <span className="text-xs text-gray-500">{m.rating} ({m.reviews})</span>
                      </div>
                      <button
  onClick={async () => {
    await API.post("/modules/install", {
      moduleId: m._id,
    });

    fetchModules();
    fetchStats();
  }}
  className="px-3 py-1 text-xs text-white bg-teal-400 rounded-lg"
>
  Install
</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4">
                <p className="text-sm font-semibold text-gray-800">Upload Custom Module</p>
                <p className="text-xs text-gray-500 mb-3">Upload and install your custom module (.zip file)</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 space-y-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Module Name</label>
                      <input
                        type="text"
                        value={uploadForm.name}
                        onChange={(e) => handleUploadChange("name", e.target.value)}
                        placeholder="Enter module name"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Version</label>
                      <input
                        type="text"
                        value={uploadForm.version}
                        onChange={(e) => handleUploadChange("version", e.target.value)}
                        placeholder="e.g 1.0.0"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Description</label>
                      <input
                        type="text"
                        value={uploadForm.description}
                        onChange={(e) => handleUploadChange("description", e.target.value)}
                        placeholder="Brief description about this module"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-300"
                      />
                    </div>
                  </div>
                  <div
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    className={`flex-1 border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-4 cursor-pointer transition-colors ${dragOver ? "border-teal-400 bg-teal-50" : "border-gray-300 bg-gray-50"}`}
                    onClick={() => fileRef.current.click()}
                  >
                    <FiUpload className="text-teal-400 mb-2" size={22} />
                    <p className="text-xs text-gray-500 text-center">
                      {uploadForm.file ? uploadForm.file.name : "Drag & Drop ZIP file here"}
                    </p>
                    {!uploadForm.file && <p className="text-xs text-gray-400 my-1">Or</p>}
                    {!uploadForm.file && (
                      <span className="text-xs border border-gray-300 rounded px-3 py-1 text-gray-600 hover:bg-white transition-colors">
                        Browse File
                      </span>
                    )}
                    <input
  ref={fileRef}
  type="file"
  accept=".zip"
  className="hidden"
  onChange={(e) => handleUploadChange("file", e.target.files[0])}
/>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-gray-100 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUploadModule}
                className="flex items-center gap-2 px-5 py-2 text-sm text-white bg-teal-400 hover:bg-teal-500 rounded-lg transition-colors"
              >
                <FiUpload size={14} />
                Upload Module
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
