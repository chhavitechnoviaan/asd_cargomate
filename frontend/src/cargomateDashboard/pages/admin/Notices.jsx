import React, { useState, useEffect } from "react";
import { 
  FiSearch, FiPlus, FiEdit2, FiTrash2, FiEye, FiCheck, FiX, 
  FiUpload, FiCalendar, FiClock, FiUsers, FiFilter, FiAlertCircle 
} from "react-icons/fi";
import { Megaphone } from "lucide-react";
import Swal from "sweetalert2";
import API from "../../api/axios";
import defaultShipImg from "../../assets/Images/webp/shipmentImg.webp";

export default function NoticesSection({ setShowNotice }) {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [audienceFilter, setAudienceFilter] = useState("all");

  // Create / Edit Modal State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    subtitle: "Shipping Guidelines",
    description: "",
    details: "",
    targetAudience: "all",
    status: "published",
    scheduleDate: new Date().toISOString().split("T")[0],
    file: null
  });
  const [preview, setPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Preview Modal (how user/dealer sees it)
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
    setIsFormOpen(true);
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
    setIsFormOpen(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      Swal.fire({ icon: "warning", title: "Required Fields", text: "Please provide a title and description." });
      return;
    }

    try {
      setSubmitting(true);
      const formData = new FormData();
      formData.append("title", form.title.trim());
      formData.append("subtitle", form.subtitle.trim());
      formData.append("description", form.description.trim());
      formData.append("details", form.details.trim());
      formData.append("targetAudience", form.targetAudience);
      formData.append("status", form.status);
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
        setIsFormOpen(false);
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

  // Filtered notices
  const filteredNotices = notices.filter((n) => {
    if (statusFilter !== "all") {
      if (statusFilter === "published" && (!n.isActive || n.status !== "published")) return false;
      if (statusFilter === "draft" && (n.isActive && n.status === "published")) return false;
    }
    if (audienceFilter !== "all" && n.targetAudience !== audienceFilter && n.targetAudience !== "all") {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = n.title?.toLowerCase().includes(q);
      const matchDesc = n.description?.toLowerCase().includes(q);
      const matchSub = n.subtitle?.toLowerCase().includes(q);
      return matchTitle || matchDesc || matchSub;
    }
    return true;
  });

  const activeCount = notices.filter((n) => n.status === "published" && n.isActive).length;
  const draftCount = notices.filter((n) => n.status !== "published" || !n.isActive).length;

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-teal-600" /> Notice & Broadcast Management
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Create, publish, and manage top-bar banner announcements for Users and Dealers.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-all shadow-sm shrink-0"
        >
          <FiPlus className="w-4 h-4" /> Create New Notice
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 block">Total Notices</span>
            <span className="text-2xl font-bold text-slate-800 block mt-1">{notices.length}</span>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Megaphone className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 block">Active Broadcasts</span>
            <span className="text-2xl font-bold text-emerald-600 block mt-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
              {activeCount}
            </span>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <FiCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 block">Draft / Inactive</span>
            <span className="text-2xl font-bold text-slate-500 block mt-1">{draftCount}</span>
          </div>
          <div className="p-3 bg-slate-100 text-slate-500 rounded-xl">
            <FiClock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 block">Audience Reach</span>
            <span className="text-sm font-bold text-slate-800 block mt-1">Users & Dealers</span>
          </div>
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <FiUsers className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white border border-slate-200/80 rounded-xl shadow-sm p-5 space-y-4">
        
        {/* Filters Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <FiSearch className="absolute left-3 top-3 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search notices by title or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-teal-500"
            />
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg px-3 py-2 focus:outline-none focus:border-teal-500"
            >
              <option value="all">All Status</option>
              <option value="published">Active / Published</option>
              <option value="draft">Drafts</option>
            </select>

            {/* Audience Filter */}
            <select
              value={audienceFilter}
              onChange={(e) => setAudienceFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg px-3 py-2 focus:outline-none focus:border-teal-500"
            >
              <option value="all">All Audiences</option>
              <option value="user">Users (Customers)</option>
              <option value="dealer">Dealers (Vendors)</option>
            </select>
          </div>
        </div>

        {/* Notices Table */}
        {loading ? (
          <div className="py-12 text-center text-xs text-slate-400">Loading notices...</div>
        ) : filteredNotices.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-400 space-y-2">
            <FiAlertCircle className="w-8 h-8 mx-auto text-slate-300" />
            <p>No notices found matching current filters.</p>
            <button
              onClick={handleOpenCreate}
              className="px-4 py-2 bg-teal-700 text-white text-xs font-bold rounded-lg shadow-sm"
            >
              Create New Notice
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="pb-3 font-bold">Notice Title</th>
                  <th className="pb-3 font-bold">Popup Subtitle</th>
                  <th className="pb-3 font-bold">Target Audience</th>
                  <th className="pb-3 font-bold">Status</th>
                  <th className="pb-3 font-bold">Schedule</th>
                  <th className="pb-3 text-right font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {filteredNotices.map((n) => {
                  const isLive = n.status === "published" && n.isActive;
                  return (
                    <tr key={n._id} className="hover:bg-slate-50/70 transition-colors">
                      {/* Notice Title */}
                      <td className="py-3.5 pr-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                            <Megaphone className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block truncate max-w-[220px]" title={n.title}>
                              {n.title}
                            </span>
                            <span className="text-[11px] text-slate-400 truncate max-w-[260px] block" title={n.description}>
                              {n.description}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Popup Subtitle */}
                      <td className="py-3.5 text-slate-600 font-semibold">
                        {n.subtitle || "Shipping Guidelines"}
                      </td>

                      {/* Target Audience */}
                      <td className="py-3.5">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100">
                          {n.targetAudience === "all" ? "All Users & Dealers" : n.targetAudience}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          isLive 
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                            : "bg-slate-100 text-slate-500 border border-slate-200"
                        }`}>
                          {isLive ? "Live / Published" : "Draft"}
                        </span>
                      </td>

                      {/* Schedule */}
                      <td className="py-3.5 text-slate-500 text-[11px]">
                        {n.scheduleDate ? new Date(n.scheduleDate).toLocaleDateString() : "Immediate"}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Toggle */}
                          <button
                            onClick={() => handleToggle(n._id)}
                            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors ${
                              n.isActive
                                ? "bg-amber-50 text-amber-700 hover:bg-amber-100"
                                : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                            }`}
                          >
                            {n.isActive ? "Unpublish" : "Publish"}
                          </button>

                          {/* Preview as User */}
                          <button
                            onClick={() => setPreviewModalNotice(n)}
                            className="p-1.5 text-slate-600 hover:text-teal-700 hover:bg-slate-100 rounded-md border border-slate-200"
                            title="Preview popup modal"
                          >
                            <FiEye className="w-3.5 h-3.5" />
                          </button>

                          {/* Edit */}
                          <button
                            onClick={() => handleOpenEdit(n)}
                            className="p-1.5 text-slate-600 hover:text-teal-700 hover:bg-slate-100 rounded-md border border-slate-200"
                            title="Edit notice"
                          >
                            <FiEdit2 className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => handleDelete(n._id)}
                            className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md border border-slate-200"
                            title="Delete notice"
                          >
                            <FiTrash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* ========================================================= */}
      {/* CREATE / EDIT MODAL */}
      {/* ========================================================= */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                {editingId ? "Edit Notice" : "Create New Broadcast Notice"}
              </h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs font-medium">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Notice Banner Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Important Shipping Notice"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Popup Subtitle (Graphic Header)</label>
                  <input
                    type="text"
                    placeholder="e.g. Shipping Guidelines"
                    value={form.subtitle}
                    onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Target Audience</label>
                  <select
                    value={form.targetAudience}
                    onChange={(e) => setForm({ ...form, targetAudience: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-teal-500 bg-white"
                  >
                    <option value="all">All (Users & Dealers)</option>
                    <option value="user">User / Customer Only</option>
                    <option value="dealer">Dealer / B2B Only</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Banner Description *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Summary shown on the top bar strip..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg p-3 text-xs focus:outline-none focus:border-teal-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Popup Detailed Guidelines (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="Additional details shown inside the popup modal..."
                  value={form.details}
                  onChange={(e) => setForm({ ...form, details: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg p-3 text-xs focus:outline-none focus:border-teal-500"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-teal-500 bg-white"
                  >
                    <option value="published">Published (Live)</option>
                    <option value="draft">Draft (Saved only)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Schedule Date</label>
                  <input
                    type="date"
                    value={form.scheduleDate}
                    onChange={(e) => setForm({ ...form, scheduleDate: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Banner Vessel Image (Optional)</label>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer flex items-center gap-2 px-3 py-2 border border-dashed border-slate-300 rounded-lg hover:border-teal-500 text-slate-600 transition-colors">
                    <FiUpload className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-semibold">
                      {form.file ? form.file.name : "Upload Image"}
                    </span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  </label>
                  {preview && (
                    <div className="relative w-16 h-10 rounded border overflow-hidden">
                      <img src={preview} alt="preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-bold transition-colors shadow-sm disabled:opacity-50"
                >
                  {submitting ? "Saving..." : editingId ? "Update Notice" : "Publish Notice"}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* USER / DEALER POPUP LIVE PREVIEW MODAL (Screenshot 1) */}
      {/* ========================================================= */}
      {previewModalNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                {previewModalNotice.title || "Important Shipping Notice"}
              </h3>
              <button
                onClick={() => setPreviewModalNotice(null)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 rounded-xl overflow-hidden shadow-md border border-slate-200 flex flex-col sm:flex-row bg-[#0b1f3a] text-white">
              <div className="p-6 sm:w-1/2 flex flex-col justify-center space-y-3 relative z-10">
                <div className="inline-block">
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
                    <span>{previewModalNotice.subtitle?.split(" ")[0] || "Shipping"}</span>
                    <span className="text-[#00d2c4] block">
                      {previewModalNotice.subtitle?.split(" ").slice(1).join(" ") || "Guidelines"}
                    </span>
                  </h2>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  {previewModalNotice.description}
                </p>
                {previewModalNotice.details && (
                  <p className="text-[11px] text-slate-300/80 leading-relaxed pt-1 border-t border-slate-700/60">
                    {previewModalNotice.details}
                  </p>
                )}
              </div>

              <div className="sm:w-1/2 relative min-h-[160px] sm:min-h-full overflow-hidden">
                <img
                  src={previewModalNotice.image ? (previewModalNotice.image.startsWith("http") ? previewModalNotice.image : `http://localhost:8000${previewModalNotice.image}`) : defaultShipImg}
                  alt="Vessel"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0b1f3a] via-transparent to-transparent sm:block hidden" />
              </div>
            </div>

            <div className="mt-5 flex justify-center">
              <button
                onClick={() => setPreviewModalNotice(null)}
                className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl"
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

