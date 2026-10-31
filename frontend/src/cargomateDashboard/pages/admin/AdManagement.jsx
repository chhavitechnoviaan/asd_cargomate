import React, { useEffect, useMemo, useState } from "react";
import { Megaphone, Plus, Pencil, Trash2, X, Image as ImageIcon, ExternalLink, RefreshCw } from "lucide-react";
import API from "../../api/axios";

const AD_LOCATIONS = [
  {
    label: "User Dashboard - AI & Trade Tools",
    options: [
      ["User Dashboard - AI Chatbot", "AI Chatbot"],
      ["User Dashboard - AI CargoMate Assistant", "AI CargoMate Assistant"],
      ["User Dashboard - HS Code Lookup", "HS Code Lookup"],
      ["User Dashboard - Incentive Checker", "Incentive Checker"],
      ["User Dashboard - Freight Calculator", "Freight Calculator"],
      ["User Dashboard - Shipment Planning", "Shipment Planning"],
      ["User Dashboard - Saved", "Saved"],
    ],
  },
  {
    label: "User Dashboard - Account & Support",
    options: [
      ["User Dashboard - Subscription", "Subscription"],
      ["User Dashboard - Notifications", "Notifications"],
      ["User Dashboard - Help & Support", "Help & Support"],
    ],
  },
  {
    label: "B2B Dashboard",
    options: [["B2B Dashboard - Dashboard", "Dashboard"]],
  },
  {
    label: "B2B Dashboard - Intelligence",
    options: [
      ["B2B Dashboard - AI Chatbot", "AI Chatbot"],
      ["B2B Dashboard - Import Intelligence", "Import Intelligence"],
      ["B2B Dashboard - Export Intelligence", "Export Intelligence"],
      ["B2B Dashboard - HS code Intelligence", "HS code Intelligence"],
      ["B2B Dashboard - Shipment Database", "Shipment Database"],
      ["B2B Dashboard - Risk Analysis", "Risk Analysis"],
      ["B2B Dashboard - Ai Insight", "Ai Insight"],
    ],
  },
  {
    label: "B2B Dashboard - Manage",
    options: [
      ["B2B Dashboard - Shipments", "Shipments"],
      ["B2B Dashboard - Documents", "Documents"],
      ["B2B Dashboard - Invoices", "Invoices"],
    ],
  },
  {
    label: "B2B Dashboard - Reports & Tools",
    options: [
      ["B2B Dashboard - Reports", "Reports"],
      ["B2B Dashboard - Alert Notifications", "Alert Notifications"],
    ],
  },
  {
    label: "B2B Dashboard - System",
    options: [["B2B Dashboard - Settings", "Settings"]],
  },
];

const API_ORIGIN = (import.meta.env.VITE_API_URL || "http://localhost:8000/api").replace(/\/api\/?$/, "");

function getImageUrl(image) {
  if (!image) return "";
  if (/^https?:\/\//i.test(image)) return image;
  return `${API_ORIGIN}${image.startsWith("/") ? "" : "/"}${image}`;
}

function formatDate(date) {
  if (!date) return "—";
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? String(date) : parsed.toLocaleDateString();
}

function StatusBadge({ status }) {
  const active = status === "active";
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${active ? "bg-emerald-50 text-emerald-700" : status === "paused" ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-600"}`}>
      {status || "draft"}
    </span>
  );
}

function NewPostForm({ onCancel, onCreated }) {
  const [formData, setFormData] = useState({
    location: "User Dashboard - AI Chatbot",
    postText: "",
    subPostText: "",
    targetStartDate: new Date().toISOString().slice(0, 10),
    linkUrl: "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!file) {
      setPreview("");
      return undefined;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    if (!file) {
      setError("Please select an ad image.");
      return;
    }
    if (formData.linkUrl.trim()) {
      try {
        const url = new URL(formData.linkUrl.trim());
        if (!["http:", "https:"].includes(url.protocol)) throw new Error("invalid");
      } catch {
        setError("Please enter a valid link starting with https:// or http://.");
        return;
      }
    }

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => payload.append(key, value));
    payload.append("file", file);

    try {
      setSubmitting(true);
      const response = await API.post("/ads", payload);
      if (response.data?.status !== 1) throw new Error(response.data?.message || "Ad could not be saved.");
      onCreated(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Could not save ad. Check the backend server.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-10">
      <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-3xl flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Add New Ad</h1>
            <p className="mt-1 text-sm text-slate-500">Choose a dashboard location and create an image ad.</p>
          </div>
          <button type="button" onClick={onCancel} aria-label="Close form" className="rounded-full p-2 text-slate-500 hover:bg-slate-100">
            <X size={20} />
          </button>
        </div>

        {error && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

        <div className="flex flex-col gap-2">
          <label htmlFor="ad-location" className="text-sm font-bold text-slate-800">Enter ad location <span className="text-red-500">*</span></label>
          <select id="ad-location" name="location" required value={formData.location} onChange={handleChange} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
            {AD_LOCATIONS.map((group) => (
              <optgroup key={group.label} label={group.label}>
                {group.options.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </optgroup>
            ))}
          </select>
          <p className="text-xs text-slate-500">The ad will only appear in the dashboard section selected here.</p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-slate-800">Ad Image <span className="text-red-500">*</span></label>
          <label className="flex min-h-40 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-5 text-center hover:border-indigo-400">
            {preview ? (
              <img src={preview} alt="Ad preview" className="max-h-52 max-w-full rounded-lg object-contain" />
            ) : (
              <>
                <ImageIcon size={30} className="text-slate-400" />
                <span className="font-semibold text-slate-700">Click to upload an image</span>
                <span className="text-xs text-slate-500">JPG, PNG, WEBP or GIF · Max 10 MB</span>
              </>
            )}
            <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="sr-only" onChange={(event) => setFile(event.target.files?.[0] || null)} />
            {file && <span className="text-xs font-medium text-slate-600">{file.name}</span>}
          </label>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="post-text" className="text-sm font-bold text-slate-800">Post Text <span className="text-red-500">*</span></label>
          <textarea id="post-text" name="postText" required maxLength={1000} value={formData.postText} onChange={handleChange} placeholder="Enter the main text to show below the ad image" rows={3} className="w-full rounded-xl border border-slate-300 p-4 text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="sub-post-text" className="text-sm font-bold text-slate-800">Sub Post Text <span className="font-normal text-slate-400">(Optional)</span></label>
          <textarea id="sub-post-text" name="subPostText" maxLength={500} value={formData.subPostText} onChange={handleChange} placeholder="Add supporting text shown below the main post text" rows={2} className="w-full rounded-xl border border-slate-300 p-4 text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="target-start-date" className="text-sm font-bold text-slate-800">Target Start Date <span className="text-red-500">*</span></label>
            <input id="target-start-date" type="date" name="targetStartDate" required value={formData.targetStartDate} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="link-url" className="text-sm font-bold text-slate-800">Link URL <span className="font-normal text-slate-400">(Optional)</span></label>
            <input id="link-url" type="url" name="linkUrl" value={formData.linkUrl} onChange={handleChange} placeholder="https://example.com/offer" className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" />
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
          <button type="button" onClick={onCancel} className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50">Cancel</button>
          <button type="submit" disabled={submitting} className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60">{submitting ? "Saving Ad..." : "Publish Ad"}</button>
        </div>
      </form>
    </div>
  );
}

export default function AdManagement() {
  const [ads, setAds] = useState([]);
  const [view, setView] = useState("list");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAds = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await API.get("/ads", { params: { limit: 100 } });
      setAds(Array.isArray(response.data?.data) ? response.data.data : []);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load ads. Check that the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadAds(); }, []);

  const handleDelete = async (ad) => {
    if (!window.confirm("Delete this ad? This action cannot be undone.")) return;
    try {
      await API.delete(`/ads/${ad._id}`);
      setAds((prev) => prev.filter((item) => item._id !== ad._id));
    } catch (err) {
      setError(err.response?.data?.message || "Could not delete ad.");
    }
  };

  const handleCreated = (ad) => {
    setAds((prev) => [ad, ...prev]);
    setView("list");
  };

  const activeCount = useMemo(() => ads.filter((ad) => ad.status === "active").length, [ads]);

  if (view === "form") return <NewPostForm onCancel={() => setView("list")} onCreated={handleCreated} />;

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pink-100"><Megaphone className="text-pink-500" size={22} /></div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 sm:text-2xl">Ad Management</h1>
            <p className="text-sm text-slate-500">Manage and monitor dashboard ad campaigns.</p>
            <p className="mt-1 text-xs text-slate-500">{ads.length} total ads · {activeCount} active</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button onClick={loadAds} className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"><RefreshCw size={15} /> Refresh</button>
          <button onClick={() => setView("form")} className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"><Plus size={16} /> Add new ads</button>
        </div>
      </div>

      {error && <div role="alert" className="mt-5 flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"><span>{error}</span><button onClick={() => setError("")} aria-label="Dismiss"><X size={16} /></button></div>}

      <h2 className="mb-4 mt-8 text-lg font-bold text-slate-900">Recent Ads</h2>
      {loading ? (
        <div className="rounded-2xl border border-slate-200 p-10 text-center text-sm text-slate-500">Loading ads from server…</div>
      ) : ads.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center">
          <ImageIcon className="mx-auto mb-3 text-slate-400" size={32} />
          <p className="font-semibold text-slate-800">No ads created yet</p>
          <p className="mt-1 text-sm text-slate-500">Select “Add new ads” to upload your first campaign.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead className="bg-slate-50">
                <tr>
                  {["Ad / Post", "Image", "Location", "Target Start Date", "Status", "Link", "Action"].map((label) => <th key={label} className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">{label}</th>)}
                </tr>
              </thead>
              <tbody>
                {ads.map((ad) => (
                  <tr key={ad._id} className="border-t border-slate-100 align-middle">
                    <td className="max-w-xs px-5 py-4"><p className="font-semibold text-slate-800">{ad.postText || ad.title || "Ad"}</p>{ad.subPostText && <p className="mt-1 line-clamp-2 text-xs text-slate-500">{ad.subPostText}</p>}</td>
                    <td className="px-5 py-4">{ad.image ? <img src={getImageUrl(ad.image)} alt={ad.title || "Ad"} className="h-14 w-24 rounded-lg border border-slate-200 object-cover" /> : <span className="text-xs text-slate-400">No image</span>}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{ad.location || ad.placement || "—"}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{formatDate(ad.targetStartDate || ad.startDate)}</td>
                    <td className="px-5 py-4"><StatusBadge status={ad.status} /></td>
                    <td className="px-5 py-4">{(ad.linkUrl || ad.redirectUrl) ? <a href={ad.linkUrl || ad.redirectUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:underline">Open <ExternalLink size={13} /></a> : <span className="text-sm text-slate-400">—</span>}</td>
                    <td className="px-5 py-4"><button onClick={() => handleDelete(ad)} aria-label="Delete ad" className="rounded-lg p-2 text-red-500 hover:bg-red-50"><Trash2 size={16} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
