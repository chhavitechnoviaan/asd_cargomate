import React, { useState, useEffect } from "react";
import { FiX, FiPlus, FiEdit2, FiTrash2, FiEye, FiCheck, FiUpload, FiCalendar, FiUsers } from "react-icons/fi";
import { Megaphone } from "lucide-react";
import Swal from "sweetalert2";
import API from "../../api/axios";

export default function NoticeManagementModal({ isOpen, onClose }) {
  const [activeSubTab, setActiveSubTab] = useState("list"); // "list" | "form"
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State
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
    if (isOpen) {
      fetchNotices();
    }
  }, [isOpen]);

  const handleOpenCreate = () => {
    setEditingId(null);
    setForm({
      title: "Important Shipping Notice",
      subtitle: "Shipping Guidelines",
      description: "Please review the latest shipping guidelines before booking your next shipment.",
      details: "",
      targetAudience: "all",
      status: "published",
      scheduleDate: new Date().toISOString().split("T")[0],
      file: null
    });
    setPreview(null);
    setActiveSubTab("form");
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
    setActiveSubTab("form");
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
      Swal.fire({ icon: "warning", title: "Missing Fields", text: "Title and description are required." });
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
          text: res.data.message || "Operation successful.",
          timer: 1500,
          showConfirmButton: false
        });
        setActiveSubTab("list");
        await fetchNotices();
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
      text: "This notice will no longer be visible to users or dealers.",
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-teal-50 text-teal-600 rounded-lg">
              <Megaphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Notice & Banner Management</h3>
              <p className="text-xs text-slate-400">Broadcast important guidelines to users and dealers</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch: All Notices | Create / Edit */}
        <div className="flex items-center justify-between gap-3 mt-4 border-b border-slate-100 pb-3">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setActiveSubTab("list")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                activeSubTab === "list"
                  ? "bg-teal-700 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              All Notices ({notices.length})
            </button>
            <button
              type="button"
              onClick={handleOpenCreate}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
                activeSubTab === "form" && !editingId
                  ? "bg-teal-700 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <FiPlus className="w-3.5 h-3.5" /> Create Notice
            </button>
          </div>

          {activeSubTab === "form" && editingId && (
            <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded">
              Editing Notice
            </span>
          )}
        </div>

        {/* CONTENT */}
        {activeSubTab === "list" ? (
          <div className="mt-4 space-y-3">
            {loading ? (
              <div className="py-12 text-center text-xs text-slate-400">Loading notices...</div>
            ) : notices.length === 0 ? (
              <div className="py-10 text-center text-xs text-slate-400 space-y-2">
                <p>No notices created yet.</p>
                <button
                  onClick={handleOpenCreate}
                  className="px-4 py-2 bg-teal-700 text-white text-xs font-bold rounded-lg"
                >
                  Create First Notice
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {notices.map((n) => (
                  <div
                    key={n._id}
                    className="border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-slate-900 truncate">{n.title}</h4>
                        <span
                          className={`text-[9px] font-bold px-2 py-0.2 rounded-full uppercase ${
                            n.status === "published" && n.isActive
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-slate-200 text-slate-600"
                          }`}
                        >
                          {n.status === "published" && n.isActive ? "Active / Published" : "Draft"}
                        </span>
                        <span className="text-[9px] font-semibold bg-blue-50 text-blue-700 px-2 py-0.2 rounded">
                          Audience: {n.targetAudience}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-1">{n.description}</p>
                      <span className="text-[10px] text-slate-400 block">
                        Schedule: {n.scheduleDate ? new Date(n.scheduleDate).toLocaleDateString() : "Immediate"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <button
                        onClick={() => handleToggle(n._id)}
                        className={`text-xs px-2.5 py-1 rounded-md font-semibold transition-colors ${
                          n.isActive
                            ? "bg-amber-50 text-amber-700 hover:bg-amber-100"
                            : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                        }`}
                      >
                        {n.isActive ? "Unpublish" : "Publish"}
                      </button>
                      <button
                        onClick={() => handleOpenEdit(n)}
                        className="p-1.5 text-slate-600 hover:text-teal-700 hover:bg-white rounded-md border border-slate-200"
                        title="Edit"
                      >
                        <FiEdit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(n._id)}
                        className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md border border-slate-200"
                        title="Delete"
                      >
                        <FiTrash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* FORM TAB: CREATE / EDIT */
          <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs font-medium">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Banner Title *</label>
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
                placeholder="Brief summary shown on the top bar..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full border border-slate-200 rounded-lg p-3 text-xs focus:outline-none focus:border-teal-500"
              ></textarea>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Full Detailed Guidelines (Optional)</label>
              <textarea
                rows={2}
                placeholder="Detailed explanation inside the popup..."
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
                  <option value="published">Published (Visible)</option>
                  <option value="draft">Draft (Hidden)</option>
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

            {/* Image Upload */}
            <div>
              <label className="block text-slate-700 font-bold mb-1">Popup Banner Image (Optional)</label>
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

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setActiveSubTab("list")}
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
        )}

      </div>
    </div>
  );
}

