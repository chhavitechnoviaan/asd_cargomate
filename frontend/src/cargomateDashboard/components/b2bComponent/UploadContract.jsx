import React, { useState, useRef } from "react";
import { FilePlus2, Copy } from "lucide-react";

const initialFormState = {
  contractName: "",
  requestedId: "",
};

export default function UploadContracts({ onClose }) {
  const [formData, setFormData] = useState(initialFormState);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!selectedFile) {
      setError("Please select a contract file to upload");
      return;
    }

    setIsSubmitting(true);

    try {
      const uploadData = new FormData();
      uploadData.append("contractName", formData.contractName);
      uploadData.append("requestedId", formData.requestedId);
      uploadData.append("contractFile", selectedFile);

      const response = await fetch("/api/contracts/upload", {
        method: "POST",
        body: uploadData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload contract");
      }

      const data = await response.json();
      console.log("Contract uploaded:", data);
      setFormData(initialFormState);
      setSelectedFile(null);
      if (onClose) onClose();
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start sm:items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl my-4 sm:my-0 flex flex-col max-h-[80vh]">
        <div className="flex items-start gap-3 p-4 sm:p-6 shrink-0">
          <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center shrink-0">
            <FilePlus2 className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900">Upload Contracts</h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-0.5">Upload contract file and details</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4 space-y-4">
          {error && (
            <div className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1.5">Contract Name</label>
            <input
              type="text"
              name="contractName"
              value={formData.contractName}
              onChange={handleChange}
              placeholder="Enter Contract Name"
              className="w-full text-sm rounded-full border border-gray-200 px-4 py-2.5 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1.5">Requested Id</label>
            <input
              type="text"
              name="requestedId"
              value={formData.requestedId}
              onChange={handleChange}
              placeholder="Enter Requested Id"
              className="w-full text-sm rounded-full border border-gray-200 px-4 py-2.5 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1.5">Contract File</label>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-8 text-center transition-colors ${
                isDragging ? "border-purple-400 bg-purple-50" : "border-gray-200"
              }`}
            >
              <Copy className="w-6 h-6 text-purple-600" />
              {selectedFile ? (
                <p className="text-sm text-gray-700 font-medium">{selectedFile.name}</p>
              ) : (
                <p className="text-sm text-gray-600">Drag and Drop file here</p>
              )}
              <p className="text-sm text-gray-500">or</p>
              <button
                type="button"
                onClick={handleBrowseClick}
                className="px-4 py-2 text-sm font-medium text-purple-600 border border-purple-200 rounded-full hover:bg-purple-50 transition-colors"
              >
                Browse file
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
            <p className="text-xs text-gray-400 mt-2">PDF,DOC,DOCX (Max 10MB)</p>
          </div>
        </form>

        <div className="flex items-center justify-end gap-3 px-4 sm:px-6 py-4 border-t border-gray-100 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-medium rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-5 py-2.5 text-sm font-medium rounded-lg bg-purple-700 text-white hover:bg-purple-800 transition-colors disabled:opacity-60"
          >
            {isSubmitting ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
}