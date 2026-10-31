import { useState } from "react";
import API from "../../api/axios";
import {
  X,
  XCircle,
  AlertTriangle,
  Briefcase,
  Ban,
} from "lucide-react";

const rejectionReasonsList = [
  "Document is unclear",
  "Document has expired",
  "Name does not match",
  "DOB mismatch",
  "Invalid format",
  "Incomplete",
  "Address mismatch",
  "Tax ID failed",
  "Identity failed",
  "Photo failed",
  "Other",
];

export default function RejectKYCModal({
  applicant,
  onClose,
  onRejected,
}) {
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const toggleReason = (reason) => {
    setSelectedReasons((prev) =>
      prev.includes(reason)
        ? prev.filter((r) => r !== reason)
        : [...prev, reason]
    );
  };

  const isValid =
    selectedReasons.length > 0 &&
    note.trim().length > 0;

  const handleReject = async (e) => {
  e.preventDefault();

  if (!isValid || !applicant?._id) return;

  setSubmitting(true);

  try {
    const response = await API.patch(
      `/vendors/${applicant._id}/kyc/reject`,
      {
        reasons: selectedReasons,
        note: note.trim(),
      }
    );

    const data = response.data;

    if (data?.status !== 1) {
      throw new Error(
        data?.message || "Failed to reject KYC"
      );
    }

    if (onRejected) {
      onRejected(data.data);
    }

    onClose();
  } catch (err) {
    console.error("Reject KYC failed", err);

    alert(
      err?.response?.data?.message ||
        err?.message ||
        "Failed to reject KYC"
    );
  } finally {
    setSubmitting(false);
  }
};
  const initials = applicant?.name
    ? applicant.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  return (
    <div className="fixed inset-0 bg-slate-500/40 flex items-start sm:items-center justify-center p-2 sm:p-6 z-[70]">
      <form
        onSubmit={handleReject}
        className="bg-white w-full max-w-2xl rounded-2xl sm:rounded-3xl shadow-xl my-4 sm:my-0 flex flex-col max-h-[80vh]"
      >
        <div className="flex items-start justify-between gap-3 p-4 sm:p-6 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <XCircle size={20} className="text-red-500" />

            <h2 className="text-base sm:text-lg font-bold text-gray-900">
              Reject KYC Verification
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        </div>

        <p className="text-xs text-gray-500 px-4 sm:px-6 pt-4 shrink-0">
          Please select a reason and provide feedback for this rejection.
        </p>

        <div className="p-4 sm:p-6 space-y-5 overflow-y-auto">
          <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl p-4">
            <AlertTriangle
              size={16}
              className="text-red-500 mt-0.5 shrink-0"
            />

            <p className="text-xs text-gray-700">
              <span className="font-semibold text-gray-900">
                KYC will be marked as Rejected.
              </span>{" "}
              The user will be notified to resubmit valid documentation.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-indigo-50 rounded-xl p-4">
            <div className="w-9 h-9 rounded-full bg-indigo-600 text-white font-semibold text-sm flex items-center justify-center shrink-0">
              {initials}
            </div>

            <div>
              <p className="font-semibold text-gray-900 text-sm">
                {applicant?.name || "-"}
              </p>

              <p className="text-xs text-gray-600 flex items-center gap-1.5 mt-0.5">
                <Briefcase size={13} />

                {applicant?.companyName || applicant?.email || "-"}
              </p>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-800">
              Rejection Reasons{" "}
              <span className="text-red-500">*</span>
            </label>

            <div className="flex flex-wrap gap-2 mt-3">
              {rejectionReasonsList.map((reason) => {
                const selected =
                  selectedReasons.includes(reason);

                return (
                  <button
                    type="button"
                    key={reason}
                    onClick={() =>
                      toggleReason(reason)
                    }
                    className={`text-xs font-medium rounded-full px-3.5 py-1.5 border transition-colors ${
                      selected
                        ? "bg-indigo-50 border-indigo-400 text-indigo-700"
                        : "bg-white border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    {reason}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-800">
              Mandatory Rejection Note{" "}
              <span className="text-red-500">*</span>
            </label>

            <textarea
              value={note}
              maxLength={500}
              onChange={(e) =>
                setNote(e.target.value)
              }
              placeholder="Provide detailed feedback to the user on why their submission was rejected and what needs correction..."
              className="mt-3 w-full h-28 resize-none border border-gray-300 rounded-xl p-3.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
            />

            <p className="text-[11px] text-gray-400 text-right mt-1">
              {note.length}/500
            </p>
          </div>
        </div>

        <div className="border-t border-gray-100 p-4 sm:p-6 flex flex-col sm:flex-row justify-end gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="border border-gray-300 text-gray-700 font-medium text-sm rounded-lg px-4 py-2 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={!isValid || submitting}
            className={`flex items-center justify-center gap-2 font-medium text-sm rounded-lg px-4 py-2 ${
              isValid
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <Ban size={15} />

            {submitting
              ? "Rejecting..."
              : "Reject KYC"}
          </button>
        </div>
      </form>
    </div>
  );
}