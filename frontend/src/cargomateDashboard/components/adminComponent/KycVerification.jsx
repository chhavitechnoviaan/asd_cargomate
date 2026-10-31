import { useEffect, useMemo, useState } from "react";
import API from "../../api/axios";
import {
  X,
  UserCheck,
  Building2,
  Mail,
  Smartphone,
  Clock,
  IdCard,
  Landmark,
  MapPin,
  CheckCircle2,
  CheckCheck,
} from "lucide-react";

import RejectKYCModal from "./RejectKycVerification";

const fallbackDocuments = [
  {
    id: "identity",
    icon: IdCard,
    color: "text-blue-600 bg-blue-50",
    label: "Identity Proof",
    title: "Identity Document",
    subtitle: "No document uploaded",
    status: "Not Uploaded",
    previewUrl: "",
  },
  {
    id: "business",
    icon: Landmark,
    color: "text-indigo-600 bg-indigo-50",
    label: "Business/Tax ID",
    title: "Business Document",
    subtitle: "No document uploaded",
    status: "Not Uploaded",
    previewUrl: "",
  },
  {
    id: "address",
    icon: MapPin,
    color: "text-teal-600 bg-teal-50",
    label: "Address Proof",
    title: "Address Document",
    subtitle: "No document uploaded",
    status: "Not Uploaded",
    previewUrl: "",
  },
];

export default function KYCVerificationModal({
  applicant,
  onClose,
  onApprove,
  onReject,
}) {
  const [submitting, setSubmitting] =
    useState(false);

  const [rejectKyc, setRejectKyc] =
    useState(false);

  const documents = useMemo(() => {
    if (
      applicant?.kycDocuments?.length
    ) {
      return applicant.kycDocuments.map(
        (doc, index) => {
          let icon = IdCard;
          let color =
            "text-blue-600 bg-blue-50";

          const type =
            doc.type?.toLowerCase() || "";

          if (
            type.includes("business") ||
            type.includes("tax") ||
            type.includes("pan")
          ) {
            icon = Landmark;
            color =
              "text-indigo-600 bg-indigo-50";
          }

          if (
            type.includes("address")
          ) {
            icon = MapPin;
            color =
              "text-teal-600 bg-teal-50";
          }

          return {
            id: doc._id || index,
            icon,
            color,
            label:
              doc.type || "Document",
            title:
              doc.title || "Document",
            subtitle:
              doc.type || "Uploaded Document",
            status: "Uploaded Successfully",
            previewUrl: doc.url || "",
          };
        }
      );
    }

    return fallbackDocuments;
  }, [applicant]);

  const [activeDocId, setActiveDocId] =
    useState(documents[0]?.id);

  useEffect(() => {
    setActiveDocId(documents[0]?.id);
  }, [documents]);

  const activeDoc =
    documents.find(
      (doc) => doc.id === activeDocId
    ) || documents[0];

 const handleApprove = async (e) => {
  e.preventDefault();

  if (!applicant?._id) return;

  setSubmitting(true);

  try {
    const response = await API.patch(
      `/vendors/${applicant._id}/kyc/approve`
    );

    const updatedUser =
      response.data?.data || response.data;

    if (onApprove && updatedUser) {
      onApprove(updatedUser);
    }

    alert(
      response.data?.message ||
        "KYC approved successfully"
    );

    onClose();
  } catch (err) {
    console.error(
      "Approve KYC failed",
      err.response?.data || err
    );

    alert(
      err.response?.data?.message ||
        err.message ||
        "Failed to approve KYC"
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

  const submittedOn =
    applicant?.createdAt
      ? new Date(
          applicant.createdAt
        ).toLocaleString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "-";

  return (
    <>
      <div className="fixed inset-0 bg-slate-500/40 flex items-start sm:items-center justify-center p-2 sm:p-6 overflow-y-auto z-50">
        <form
          onSubmit={handleApprove}
          className="bg-white w-full max-w-6xl rounded-2xl sm:rounded-3xl shadow-xl my-4 sm:my-0 max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-start justify-between gap-3 p-4 sm:p-6 border-b border-gray-100">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <UserCheck size={22} />
              </div>

              <div>
                <h2 className="text-base sm:text-xl font-bold text-gray-900">
                  KYC Verification
                </h2>

                <p className="text-xs text-gray-500 mt-1 max-w-md">
                  Review user identity documents
                  and verification details.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border ${
                  applicant?.kycStatus ===
                  "Verified"
                    ? "bg-green-50 text-green-700 border-green-100"
                    : applicant?.kycStatus ===
                      "Rejected"
                    ? "bg-red-50 text-red-700 border-red-100"
                    : "bg-amber-50 text-amber-700 border-amber-100"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current" />

                {applicant?.kycStatus ||
                  "Pending Review"}
              </span>

              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-5">
            <div className="border border-gray-200 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 text-sm">
                  Applicant Details
                </h3>

                <span className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                  B2B USER
                </span>
              </div>

              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-600 font-semibold flex items-center justify-center">
                  {initials}
                </div>

                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {applicant?.name || "-"}
                  </p>

                  <p className="text-xs text-gray-500">
                    {applicant?.companyName ||
                      applicant?.email ||
                      "-"}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Building2
                    size={16}
                    className="text-gray-400 mt-0.5"
                  />

                  <div>
                    <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wide">
                      Company
                    </p>

                    <p className="text-xs font-medium text-gray-900">
                      {applicant?.companyName ||
                        "-"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail
                    size={16}
                    className="text-gray-400 mt-0.5"
                  />

                  <div>
                    <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wide">
                      Email
                    </p>

                    <p className="text-xs font-medium text-gray-900 break-all">
                      {applicant?.email || "-"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Smartphone
                    size={16}
                    className="text-gray-400 mt-0.5"
                  />

                  <div>
                    <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wide">
                      Mobile
                    </p>

                    <p className="text-xs font-medium text-gray-900">
                      {applicant?.phone || "-"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 mt-5 pt-4 flex items-start gap-3">
                <Clock
                  size={16}
                  className="text-gray-400 mt-0.5"
                />

                <div>
                  <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wide">
                    Submitted On
                  </p>

                  <p className="text-xs font-medium text-gray-900">
                    {submittedOn}
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-2xl p-5">
              <h3 className="font-semibold text-gray-900 text-sm mb-4">
                Required Documents Checklist
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {documents.map((doc) => {
                  const Icon = doc.icon;

                  return (
                    <button
                      type="button"
                      key={doc.id}
                      onClick={() =>
                        setActiveDocId(
                          doc.id
                        )
                      }
                      className="text-left border border-gray-200 hover:border-emerald-300 rounded-xl p-4 min-h-[180px] flex flex-col transition-colors"
                    >
                      <div className="flex items-center justify-between mb-8">
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center ${doc.color}`}
                        >
                          <Icon size={18} />
                        </div>

                        {doc.previewUrl ? (
                          <CheckCircle2
                            size={18}
                            className="text-emerald-500"
                          />
                        ) : null}
                      </div>

                      <div className="mt-auto">
                        <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wide">
                          {doc.label}
                        </p>

                        <p className="text-xs font-semibold text-gray-900 mt-0.5">
                          {doc.title}
                        </p>

                        <p
                          className={`text-xs font-medium mt-1 ${
                            doc.previewUrl
                              ? "text-emerald-600"
                              : "text-gray-400"
                          }`}
                        >
                          {doc.status}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 text-sm">
                Document Review
              </h3>

              <span className="hidden sm:inline text-xs text-gray-400">
                Select a document to inspect
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-4">
              <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
                {documents.map((doc) => {
                  const Icon = doc.icon;

                  const active =
                    doc.id === activeDoc?.id;

                  return (
                    <button
                      type="button"
                      key={doc.id}
                      onClick={() =>
                        setActiveDocId(
                          doc.id
                        )
                      }
                      className={`shrink-0 w-56 md:w-full flex items-center gap-3 rounded-xl border px-3 py-3 text-left transition-colors ${
                        active
                          ? "bg-emerald-50 border-emerald-200"
                          : "bg-white border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center ${doc.color}`}
                      >
                        <Icon size={18} />
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-gray-900">
                          {doc.label}
                        </p>

                        <p className="text-xs text-gray-500">
                          {doc.subtitle}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="bg-slate-900 rounded-xl overflow-hidden min-h-[320px]">
                <div className="h-full min-h-[320px] flex items-center justify-center p-4">
                  {activeDoc?.previewUrl ? (
                    activeDoc.previewUrl
                      .toLowerCase()
                      .includes(".pdf") ? (
                      <iframe
                        src={activeDoc.previewUrl}
                        title={
                          activeDoc.title
                        }
                        className="w-full h-[400px] rounded-lg bg-white"
                      />
                    ) : (
                      <img
                        src={activeDoc.previewUrl}
                        alt={
                          activeDoc.title
                        }
                        className="max-h-[400px] max-w-full rounded-lg object-contain"
                      />
                    )
                  ) : (
                    <div className="text-center text-gray-400">
                      {activeDoc && (
                        <activeDoc.icon
                          size={35}
                          className="mx-auto mb-3"
                        />
                      )}

                      <p className="text-sm font-medium">
                        No document uploaded
                      </p>

                      <p className="text-xs mt-1">
                        {activeDoc?.title}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 p-4 sm:p-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <button
              onClick={() =>
                setRejectKyc(true)
              }
              type="button"
              className="order-2 sm:order-1 border border-red-200 text-red-600 font-medium rounded-lg px-4 py-2.5 hover:bg-red-50 text-sm"
            >
              Reject KYC
            </button>

            <div className="order-1 sm:order-2 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={onClose}
                className="border border-gray-300 text-gray-700 font-medium rounded-lg px-4 py-2.5 hover:bg-gray-50 text-sm"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-semibold rounded-lg px-4 py-2.5 flex items-center justify-center gap-2 text-sm"
              >
                <CheckCheck size={16} />

                {submitting
                  ? "Approving..."
                  : "Approve KYC"}
              </button>
            </div>
          </div>
        </form>
      </div>

      {rejectKyc && (
        <RejectKYCModal
          applicant={applicant}
          onClose={() =>
            setRejectKyc(false)
          }
          onRejected={(updatedUser) => {
            if (onReject) {
              onReject(updatedUser);
            }

            setRejectKyc(false);
            onClose();
          }}
        />
      )}
    </>
  );
}