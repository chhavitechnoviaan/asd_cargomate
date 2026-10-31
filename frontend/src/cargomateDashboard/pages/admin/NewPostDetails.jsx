import { useState, useRef } from "react";
import { UploadCloud } from "lucide-react";

export default function NewPostDetails({ onClose }) {
  const [form, setForm] = useState({
    postText: "Get ready for summer! Special beach offers are here.",
    targetStartDate: "20 May 2025",
    linkUrl: "",
  });
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleFile = (f) => {
    if (f) setFile(f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("postText", form.postText);
    fd.append("targetStartDate", form.targetStartDate);
    fd.append("linkUrl", form.linkUrl);
    if (file) fd.append("file", file);
    try {
      await fetch("/api/posts", { method: "POST", body: fd });
      if (onClose) onClose();
    } catch (err) {}
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 w-full max-w-sm max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4">New Post Details</h2>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current.click()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer mb-4 ${
            dragging ? "border-blue-400 bg-blue-50" : "border-gray-200"
          }`}
        >
          <UploadCloud className="w-6 h-6 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-700 mb-1">Drag & Upload file here.</p>
          <p className="text-xs text-gray-400 mb-2">or</p>
          <span className="text-sm text-blue-600 font-semibold border border-blue-200 rounded-full px-4 py-1.5 inline-block">
            Browse Files
          </span>
          <p className="text-xs text-gray-400 mt-2">PDF,PNG,JPG up to 100 mb.</p>
          {file && <p className="text-xs text-gray-600 mt-2">{file.name}</p>}
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={(e) => handleFile(e.target.files[0])}
            className="hidden"
          />
        </div>

        <label className="block text-sm font-semibold text-gray-900 mb-1">Post Text</label>
        <textarea
          value={form.postText}
          onChange={handleChange("postText")}
          rows={3}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-600 mb-4"
        />

        <label className="block text-sm font-semibold text-gray-900 mb-1">Target Start Date</label>
        <input
          value={form.targetStartDate}
          onChange={handleChange("targetStartDate")}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-600 mb-4"
        />

        <label className="block text-sm font-semibold text-gray-900 mb-1">Link URL</label>
        <input
          value={form.linkUrl}
          onChange={handleChange("linkUrl")}
          placeholder="Link URL"
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-600 mb-6"
        />

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-full border border-gray-300 text-gray-700 text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700"
          >
            Confirmed Post
          </button>
        </div>
      </form>
    </div>
  );
}