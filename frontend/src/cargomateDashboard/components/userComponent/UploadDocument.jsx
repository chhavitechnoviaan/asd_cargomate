import { useState, useRef } from "react";
import { FiUpload, FiUploadCloud, FiChevronDown, FiPaperclip, FiX } from "react-icons/fi";

export default function UploadDocumentModal({ onClose }) {
  const [formData, setFormData] = useState({
    documentType: "",
    remarks: "",
  });
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const updateField = (key, value) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const addFiles = (newFiles) => setFiles((prev) => [...prev, ...newFiles]);

  const removeFile = (index) =>
    setFiles((prev) => prev.filter((_, i) => i !== index));

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    addFiles(Array.from(e.dataTransfer.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      payload.append("documentType", formData.documentType);
      payload.append("remarks", formData.remarks);
      files.forEach((file) => payload.append("documents", file));

      const response = await fetch("https://api.example.com/documents/upload", {
        method: "POST",
        body: payload,
      });
      const result = await response.json();
      console.log("Document uploaded:", result);
      onClose();
    } catch (error) {
      console.error("Failed to upload document:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl mt-4 sm:mt-10">
        <div className="p-4 sm:p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <FiUpload size={20} className="text-gray-900" />
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                Upload Document
              </h2>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <FiX size={20} />
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-1.5">
            Upload relevant documents for your shipment.
          </p>

          <form onSubmit={handleSubmit}>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              className={`mt-5 border-2 border-dashed rounded-xl py-10 flex flex-col items-center justify-center text-center px-4 ${
                dragging ? "border-teal-400 bg-teal-50" : "border-gray-200 bg-teal-50/40"
              }`}
            >
              <FiUploadCloud size={32} className="text-gray-700 mb-3" />
              <p className="text-sm font-semibold text-gray-900">
                Drag &amp; Drop files here
              </p>
              <p className="text-xs text-gray-400 mt-1">or</p>
              <button
                type="button"
                onClick={() => inputRef.current.click()}
                className="mt-3 bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold px-5 py-2 rounded-lg"
              >
                Browse Files
              </button>
              <p className="text-xs text-gray-400 mt-3">
                Supported formats: PDF, JPG, PNG (Max 5 MB)
              </p>
              <input
                ref={inputRef}
                type="file"
                multiple
                className="hidden"
                onChange={(e) => addFiles(Array.from(e.target.files))}
              />
            </div>

            {files.length > 0 && (
              <div className="mt-3 space-y-1.5">
                {files.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-2 text-xs text-gray-600 border border-gray-100 rounded-lg px-3 py-1.5"
                  >
                    <span className="flex items-center gap-2 truncate">
                      <FiPaperclip size={12} className="text-gray-400 shrink-0" />
                      <span className="truncate">{f.name}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFile(i)}
                      className="text-gray-400 hover:text-gray-600 shrink-0"
                    >
                      <FiX size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <label className="block text-sm font-semibold text-gray-900 mt-5 mb-1.5">
              Document Type
            </label>
            <div className="relative">
              <select
                value={formData.documentType}
                onChange={(e) => updateField("documentType", e.target.value)}
                className="w-full appearance-none border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Select document type</option>
                <option>Commercial Invoice</option>
                <option>Packing List</option>
                <option>Bill of Lading</option>
                <option>Certificate of Origin</option>
              </select>
              <FiChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
            </div>

            <label className="block text-sm font-semibold text-gray-900 mt-4 mb-1.5">
              Remarks (Optional)
            </label>
            <input
              type="text"
              value={formData.remarks}
              onChange={(e) => updateField("remarks", e.target.value)}
              placeholder="Add any additional notes..."
              className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />

            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                className="order-2 sm:order-1 border border-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="order-1 sm:order-2 bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg"
              >
                Upload Document
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

