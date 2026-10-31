import { useState } from "react";
import { LuX } from "react-icons/lu";

export default function DenyQuotation({ onClose, onSubmit, setDeny }) {
  const [open, setOpen] = useState(true);
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const maxLength = 500;

  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose();
    setDeny(false)
  };

  const handleChange = (e) => {
    setReason(e.target.value.slice(0, maxLength));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/api/quotations/deny", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason }),
      });
      if (!response.ok) throw new Error("Request failed");
      const data = await response.json();
      if (onSubmit) onSubmit(data);
      
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="bg-gray-50 flex items-center justify-center rounded-lg">
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white rounded-2xl border border-gray-200 p-5 sm:p-8">
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-500 shrink-0">
              <LuX size={22} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Deny Quotation</h1>
              <p className="text-sm text-gray-500">Please provide a reason for denying this quotation.</p>
            </div>
          </div>
          <button type="button" onClick={handleClose} className="text-gray-400">
            <LuX size={18} />
          </button>
        </div>

        <label className="block text-sm font-semibold text-gray-700 mb-2">Reason / Notes*</label>
        <div className="relative">
          <textarea
            value={reason}
            onChange={handleChange}
            rows={5}
            placeholder="Enter reason for denying quotation"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm outline-none focus:ring-2 focus:ring-red-100 resize-none"
          />
          <span className="absolute bottom-3 right-4 text-xs text-gray-400">{reason.length}/{maxLength}</span>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={handleClose}
            className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting || reason.trim().length === 0}
            className="px-5 py-2 rounded-lg bg-red-500 text-white text-sm font-semibold disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}