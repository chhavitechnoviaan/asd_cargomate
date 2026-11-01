import React, { useState, useEffect } from "react";
import { 
  FiSearch, FiPlus, FiEdit2, FiTrash2, FiEye, FiCheck, FiX, 
  FiUpload, FiCalendar, FiClock, FiUsers, FiFilter, FiAlertCircle,
  FiArrowLeft, FiImage, FiSend, FiGlobe, FiRadio
} from "react-icons/fi";
import { Megaphone } from "lucide-react";
import Swal from "sweetalert2";
import API from "../../api/axios";
import defaultShipImg from "../../assets/Images/webp/shipmentImg.webp";

export default function NoticesSection({ mode: parentMode, setMode: setParentMode }) {
  const [internalMode, setInternalMode] = useState("list");
  const mode = parentMode !== undefined ? parentMode : internalMode;
  const setMode = (newMode) => {
    setInternalMode(newMode);
    if (setParentMode) setParentMode(newMode);
  };

  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [audienceFilter, setAudienceFilter] = useState("all");

  // Create / Edit State
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: "Important Shipping Notice",
    subtitle: "Shipping Guidelines",
    description: "Please review the latest shipping guidelines before booking your next shipment.",
    details: "Ensure all consignee details, hazardous goods declarations, and export shipping documents comply with current maritime customs clearance standards.",
    targetAudience: "all",
    status: "published",
    scheduleDate: new Date().toISOString().split("T")[0],
    file: null
  });
  const [preview, setPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Quick Table Preview Modal (Eye icon in table)
  const [previewModalNotice, setPreviewModalNotice] = useState(null);

  const fetchNotices = async () => {
    try {
      setLoading(true);
      const res = await API.get("/notices");
      if (res.data?.status) {
        setNotices(res.data.data || []);
      }
    } catch (err) {
      console.error("Error fetching notices:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleOpenCreate = () => {
    setEditingId(null);
    setForm({
      title: "Important Shipping Notice",
      subtitle: "Shipping Guidelines",
      description: "Please review the latest shipping guidelines before booking your next shipment.",
      details: "Ensure all consignee details, hazardous goods declarations, and export shipping documents comply with current maritime customs clearance standards.",
      targetAudience: "all",
      status: "published",
      scheduleDate: new Date().toISOString().split("T")[0],
      file: null
    });
    setPreview(null);
    setMode("create");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenEdit = (n) => {
    setEditingId(n._id);
    setForm({
      title: n.title || "",
      subtitle: n.subtitle || "Shipping Guidelines",
      description: n.description || "",
      details: n.details || "",
      targetAudience: n.targetAudience || "all",
      status: n.status || "published",
      scheduleDate: n.scheduleDate ? new Date(n.scheduleDate).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
      file: null
    });
    setPreview(n.image ? (n.image.startsWith("http") ? n.image : `http://localhost:8000${n.image}`) : null);
    setMode("edit");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setForm({ ...form, file: null });
    setPreview(null);
  };

  const handleSubmit = async (e, overrideStatus) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      Swal.fire({ icon: "warning", title: "Required Fields", text: "Please provide a notice title and description." });
      return;
    }

    const currentStatus = overrideStatus || form.status;

    try {
      setSubmitting(true);
      const formData = new FormData();
      formData.append("title", form.title.trim());
      formData.append("subtitle", form.subtitle.trim());
      formData.append("description", form.description.trim());
      formData.append("details", form.details.trim());
      formData.append("targetAudience", form.targetAudience);
      formData.append("status", currentStatus);
      formData.append("scheduleDate", form.scheduleDate);
      if (form.file) {
        formData.append("image", form.file);
      }

      let res;
      if (editingId) {
        res = await API.put(`/notices/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      } else {
        res = await API.post("/notices", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      }

      if (res.data?.status) {
        Swal.fire({
          icon: "success",
          title: editingId ? "Notice Updated" : "Notice Published",
          text: res.data.message || "Saved successfully.",
          timer: 1500,
          showConfirmButton: false
        });
        setMode("list");
        fetchNotices();
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || err.message || "Failed to save notice"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete Notice?",
      text: "This notice will be permanently removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete"
    });

    if (confirm.isConfirmed) {
      try {
        const res = await API.delete(`/notices/${id}`);
        if (res.data?.status) {
          Swal.fire({ icon: "success", title: "Deleted", timer: 1200, showConfirmButton: false });
          fetchNotices();
        }
      } catch (err) {
        Swal.fire({ icon: "error", title: "Failed", text: err.message });
      }
    }
  };

  const handleToggle = async (id) => {
    try {
      const res = await API.patch(`/notices/${id}/toggle`);
      if (res.data?.status) {
        fetchNotices();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredNotices = notices.filter(n => {
    const matchQuery = searchQuery === "" || 
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchStatus = statusFilter === "all" || n.status === statusFilter;
    const matchAudience = audienceFilter === "all" || n.targetAudience === audienceFilter;

    return matchQuery && matchStatus && matchAudience;
  });

  const totalNotices = notices.length;
  const publishedNotices = notices.filter(n => n.status === "published").length;
  const draftNotices = notices.filter(n => n.status === "draft").length;
  const scheduledNotices = notices.filter(n => n.status === "scheduled").length;

  // -------------------------------------------------------------
  // FULL PAGE VIEW: CREATE OR EDIT NOTICE (NO POPUP!)
  // -------------------------------------------------------------
  if (mode === "create" || mode === "edit") {
    const isEdit = mode === "edit";
    return (
      <div className="space-y-6 pb-12 max-w-7xl mx-auto">
        {/* Navigation Breadcrumb & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMode("list")}
              className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-600 transition-colors flex items-center justify-center cursor-pointer"
              title="Back to Notices List"
            >
              <FiArrowLeft size={18} />
            </button>
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-teal-600 uppercase tracking-wider">
                <span>Notices</span>
                <span>/</span>
                <span>{isEdit ? "Edit Notice" : "Create Notice"}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mt-0.5">
                {isEdit ? "Edit Broadcast Notice" : "Create New Broadcast Notice"}
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                Configure top-bar notification banner and detailed guidelines for customers & dealers.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              type="button"
              onClick={() => setMode("list")}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, "draft")}
              disabled={submitting}
              className="px-4 py-2 border border-teal-600 text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              Save as Draft
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, "published")}
              disabled={submitting}
              className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs sm:text-sm font-semibold shadow-sm transition-colors flex items-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <FiSend size={15} />
                  <span>{isEdit ? "Update & Publish" : "Publish Notice"}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 2-Column Responsive Form & Live Real-Time Previews */}
        <form onSubmit={(e) => handleSubmit(e)} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Form Details (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Basic Info Card */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-5">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                <Megaphone className="w-5 h-5 text-teal-600" />
                <h2 className="font-bold text-gray-900 text-base">Notice Information</h2>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Notice Banner Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Important Shipping Notice"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
                />
                <p className="text-[11px] text-gray-400 mt-1">
                  Displays in bold on the top banner bar and modal header.
                </p>
              </div>

              {/* Subtitle / Graphic Header */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Popup Subtitle (Graphic Header)
                </label>
                <input
                  type="text"
                  value={form.subtitle}
                  onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                  placeholder="e.g. Shipping Guidelines"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
                />
                <p className="text-[11px] text-gray-400 mt-1">
                  Appears as the large overlay headline over the shipping graphic.
                </p>
              </div>

              {/* Target Audience Pill Selector */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  Target Audience Reach <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: "all", label: "All Users & Dealers", desc: "Visible to everyone", icon: FiGlobe },
                    { id: "customers", label: "Customers Only", desc: "Exporters & Importers", icon: FiUsers },
                    { id: "dealers", label: "Dealers / Vendors", desc: "B2B Partner network", icon: FiRadio },
                  ].map((aud) => {
                    const Icon = aud.icon;
                    const isSelected = form.targetAudience === aud.id;
                    return (
                      <button
                        type="button"
                        key={aud.id}
                        onClick={() => setForm({ ...form, targetAudience: aud.id })}
                        className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                          isSelected
                            ? "border-teal-500 bg-teal-50/60 ring-2 ring-teal-500/20"
                            : "border-gray-200 bg-gray-50/50 hover:bg-gray-50 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Icon className={`w-4 h-4 ${isSelected ? "text-teal-600" : "text-gray-400"}`} />
                          <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                            isSelected ? "border-teal-600 bg-teal-600" : "border-gray-300 bg-white"
                          }`}>
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                        </div>
                        <div>
                          <p className={`text-xs font-semibold ${isSelected ? "text-teal-900" : "text-gray-800"}`}>
                            {aud.label}
                          </p>
                          <p className="text-[10px] text-gray-500 mt-0.5">{aud.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Banner Description */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Banner Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Please review the latest shipping guidelines before booking your next shipment."
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all leading-relaxed"
                />
                <p className="text-[11px] text-gray-400 mt-1">
                  Short notice summary that appears in the top navigation bar next to the megaphone.
                </p>
              </div>

              {/* Popup Detailed Guidelines */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Popup Detailed Guidelines (Optional)
                </label>
                <textarea
                  rows={4}
                  value={form.details}
                  onChange={(e) => setForm({ ...form, details: e.target.value })}
                  placeholder="Ensure all consignee details, hazardous goods declarations, and export shipping documents comply with current maritime customs clearance standards."
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all leading-relaxed"
                />
                <p className="text-[11px] text-gray-400 mt-1">
                  Extended instructions shown in the modal popup when the user clicks "View".
                </p>
              </div>
            </div>

            {/* Publication Settings Card */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                <FiCalendar className="w-5 h-5 text-teal-600" />
                <h2 className="font-bold text-gray-900 text-base">Schedule & Visibility</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Publication Status
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
                  >
                    <option value="published">Published (Live on Dashboard)</option>
                    <option value="draft">Draft (Hidden / Pending)</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Schedule Date
                  </label>
                  <input
                    type="date"
                    value={form.scheduleDate}
                    onChange={(e) => setForm({ ...form, scheduleDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Graphic Upload & Live Real-Time Previews (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Graphic Upload Card */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <FiImage className="w-5 h-5 text-teal-600" />
                  <h2 className="font-bold text-gray-900 text-base">Notice Banner Graphic</h2>
                </div>
                {preview && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer"
                  >
                    Use Default Graphic
                  </button>
                )}
              </div>

              {/* Graphic Preview */}
              <div className="relative w-full h-44 rounded-xl overflow-hidden border border-gray-200 bg-slate-900 group">
                <img
                  src={preview || defaultShipImg}
                  alt="Notice Graphic Preview"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-sky-950/80 via-blue-900/40 to-transparent p-4 flex flex-col justify-end text-white">
                  <span className="text-[11px] font-bold text-cyan-300 uppercase tracking-widest">
                    {form.title || "Notice Headline"}
                  </span>
                  <h3 className="text-lg font-bold leading-tight mt-0.5 text-white">
                    {form.subtitle || "Shipping Guidelines"}
                  </h3>
                </div>
              </div>

              {/* File input button */}
              <div>
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 hover:border-teal-500 rounded-xl p-4 bg-gray-50/50 hover:bg-teal-50/20 cursor-pointer transition-colors">
                  <FiUpload className="w-6 h-6 text-gray-400 mb-1.5" />
                  <span className="text-xs font-semibold text-gray-700">
                    {form.file ? form.file.name : "Upload Custom Graphic Image"}
                  </span>
                  <span className="text-[10px] text-gray-400 mt-0.5">
                    PNG, JPG, or WEBP (Recommended 800x400)
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Real-Time Live Preview Simulator */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <FiEye className="w-5 h-5 text-teal-600" />
                  <h2 className="font-bold text-gray-900 text-base">Live Real-Time Preview</h2>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full">
                  What Users See
                </span>
              </div>

              {/* Preview 1: Top Navigation Banner */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-600">1. Top Navigation Bar Banner:</p>
                <div className="bg-[#e6f7f6] border border-[#a2e0dc] rounded-xl p-3 flex items-center justify-between gap-3 shadow-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                      <Megaphone className="w-4 h-4 text-teal-700" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-gray-900 truncate">
                        {form.title || "Important Shipping Notice"}
                      </h4>
                      <p className="text-[11px] text-gray-600 truncate mt-0.5">
                        {form.description || "Please review the latest shipping guidelines before booking your next shipment."}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="bg-[#00897B] hover:bg-[#00796B] text-white text-xs font-semibold px-4 py-1.5 rounded-lg shadow-xs shrink-0 cursor-default"
                  >
                    View
                  </button>
                </div>
              </div>

              {/* Preview 2: User Modal View */}
              <div className="space-y-2 pt-2">
                <p className="text-xs font-semibold text-gray-600">2. Modal Click Preview:</p>
                <div className="border border-gray-200 rounded-xl overflow-hidden shadow-xs bg-white">
                  <div className="p-3.5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <span className="text-xs font-bold text-gray-900 truncate">
                      {form.title || "Important Shipping Notice"}
                    </span>
                    <FiX size={14} className="text-gray-400" />
                  </div>

                  <div className="relative w-full h-32 bg-slate-900">
                    <img
                      src={preview || defaultShipImg}
                      alt="Notice Graphic"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0d3455]/90 via-[#0d3455]/60 to-transparent p-4 flex flex-col justify-center text-white">
                      <h3 className="text-base font-black text-white leading-tight">
                        {form.subtitle || "Shipping Guidelines"}
                      </h3>
                      <p className="text-[11px] text-gray-200 mt-1 line-clamp-2 max-w-xs leading-snug">
                        {form.description || "Please review the latest shipping guidelines before booking your next shipment."}
                      </p>
                    </div>
                  </div>

                  {form.details && (
                    <div className="p-3 bg-gray-50 border-t border-gray-100 text-[11px] text-gray-600 leading-relaxed">
                      {form.details}
                    </div>
                  )}

                  <div className="p-3 border-t border-gray-100 flex justify-end">
                    <div className="bg-[#00897B] text-white text-[11px] font-semibold px-4 py-1.5 rounded-lg text-center cursor-default">
                      Close
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }

  // -------------------------------------------------------------
  // LIST VIEW: ALL NOTICES TABLE & CONTROLS
  // -------------------------------------------------------------
  return (
    <div className="space-y-6">
      {/* Header & New Notice Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shrink-0">
            <Megaphone className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Notice & Broadcast Management</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Create, publish, and manage top-bar banners and popup notices for customers and dealers.
            </p>
          </div>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors shadow-sm self-start sm:self-auto cursor-pointer"
        >
          <FiPlus size={16} />
          <span>Create New Notice</span>
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-500">Total Notices</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{totalNotices}</h3>
          </div>
          <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-sm">
            {totalNotices}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-emerald-600">Published (Live)</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{publishedNotices}</h3>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <FiCheck size={18} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-blue-600">Scheduled</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{scheduledNotices}</h3>
          </div>
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <FiClock size={18} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-500">Audience Reach</p>
            <h3 className="text-sm font-bold text-gray-900 mt-1.5">Users & Dealers</h3>
          </div>
          <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
            <FiUsers size={18} />
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-96">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search notices by title or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 focus:outline-none focus:ring-1 focus:ring-teal-500"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
          </select>

          <select
            value={audienceFilter}
            onChange={(e) => setAudienceFilter(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 focus:outline-none focus:ring-1 focus:ring-teal-500"
          >
            <option value="all">All Audiences</option>
            <option value="all">All Users & Dealers</option>
            <option value="customers">Customers Only</option>
            <option value="dealers">Dealers Only</option>
          </select>
        </div>
      </div>

      {/* Notices Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500 flex flex-col items-center justify-center gap-2">
            <div className="w-6 h-6 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-medium">Loading broadcast notices...</span>
          </div>
        ) : filteredNotices.length === 0 ? (
          <div className="p-12 text-center text-gray-500 space-y-3">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-400">
              <Megaphone size={20} />
            </div>
            <p className="text-sm font-semibold text-gray-700">No notices found</p>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              No notices match your filter criteria. Click the button below to create your first broadcast notice.
            </p>
            <button
              onClick={handleOpenCreate}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-600 text-white rounded-lg text-xs font-semibold hover:bg-teal-700 transition-colors cursor-pointer"
            >
              <FiPlus size={14} /> Create Notice
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                  <th className="py-3.5 px-4">Notice Title & Info</th>
                  <th className="py-3.5 px-4">Audience</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Schedule</th>
                  <th className="py-3.5 px-4 text-center">Live Switch</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredNotices.map((n) => (
                  <tr key={n._id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 shrink-0">
                          <Megaphone className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 max-w-xs sm:max-w-md">
                          <p className="font-bold text-gray-900 truncate">{n.title}</p>
                          <p className="text-xs text-gray-500 truncate mt-0.5">{n.description}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                        {n.targetAudience === "dealers" ? "Dealers Only" : n.targetAudience === "customers" ? "Customers Only" : "All Users & Dealers"}
                      </span>
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                        n.status === "published"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : n.status === "scheduled"
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "bg-gray-100 text-gray-600 border border-gray-200"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          n.status === "published" ? "bg-emerald-500" : n.status === "scheduled" ? "bg-blue-500" : "bg-gray-400"
                        }`} />
                        {n.status === "published" ? "Live / Published" : n.status === "scheduled" ? "Scheduled" : "Draft"}
                      </span>
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap text-xs text-gray-600">
                      {n.scheduleDate ? new Date(n.scheduleDate).toLocaleDateString() : "Immediate"}
                    </td>

                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      <button
                        onClick={() => handleToggle(n._id)}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                          n.status === "published"
                            ? "bg-amber-50 text-amber-700 hover:bg-amber-100"
                            : "bg-teal-50 text-teal-700 hover:bg-teal-100"
                        }`}
                      >
                        {n.status === "published" ? "Unpublish" : "Publish"}
                      </button>
                    </td>

                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setPreviewModalNotice(n)}
                          className="p-1.5 text-gray-500 hover:text-teal-600 hover:bg-teal-50 rounded-md transition-colors cursor-pointer"
                          title="Preview User View"
                        >
                          <FiEye size={15} />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(n)}
                          className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors cursor-pointer"
                          title="Edit Notice (Go to Full Page)"
                        >
                          <FiEdit2 size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(n._id)}
                          className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                          title="Delete Notice"
                        >
                          <FiTrash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* QUICK TABLE PREVIEW MODAL (Only when clicking Eye icon in list) */}
      {previewModalNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100">
            <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-teal-600" />
                <h3 className="text-base font-bold text-gray-900">
                  {previewModalNotice.title || "Notice Details"}
                </h3>
              </div>
              <button
                onClick={() => setPreviewModalNotice(null)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <FiX size={18} />
              </button>
            </div>

            <div className="relative w-full h-48 bg-slate-900 overflow-hidden">
              <img
                src={previewModalNotice.image ? (previewModalNotice.image.startsWith("http") ? previewModalNotice.image : `http://localhost:8000${previewModalNotice.image}`) : defaultShipImg}
                alt="Notice Banner Graphic"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-sky-950/85 via-blue-900/50 to-transparent p-6 flex flex-col justify-center text-white">
                <h2 className="text-2xl font-black text-white leading-tight">
                  {previewModalNotice.subtitle || "Shipping Guidelines"}
                </h2>
                <p className="text-xs text-sky-100 mt-2 line-clamp-2 max-w-sm">
                  {previewModalNotice.description}
                </p>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Notice Description</p>
                <p className="text-xs sm:text-sm text-gray-800 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100">
                  {previewModalNotice.description}
                </p>
              </div>

              {previewModalNotice.details && (
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Detailed Guidelines</p>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100 whitespace-pre-line">
                    {previewModalNotice.details}
                  </p>
                </div>
              )}
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setPreviewModalNotice(null)}
                className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs sm:text-sm font-semibold transition-colors shadow-xs cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
