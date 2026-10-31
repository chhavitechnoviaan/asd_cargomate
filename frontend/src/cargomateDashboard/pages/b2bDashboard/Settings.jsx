import React, { useState, useEffect } from "react";
import AccountProfile from "../../../components/AccountProfile";

import {
  getAccountSummary,
  getActivity,
  getSettings,
  updateNotifications,
  updateSecurity,
} from "../../api/SettingsApi";

import API from "../../api/axios";

import {
  Globe,
  Calendar,
  LayoutGrid,
  MapPin,
  Sliders,
  ChevronRight,
  Key,
  LogOut,
  ShieldAlert,
  Bell,
  HelpCircle,
  Building2,
  Mail,
  Phone,
  CreditCard,
  ToggleLeft,
  ToggleRight,
  FileText,
  Upload,
  User,
  Briefcase,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";


const REQUIRED_KYC_DOCUMENTS = [
  {
    type: "GST Certificate",
    title: "GST Certificate",
    required: true,
  },
  {
    type: "IEC Certificate",
    title: "Import Export Code (IEC) Certificate",
    required: true,
  },
  {
    type: "PAN Card",
    title: "PAN Card",
    required: true,
  },
  {
    type: "Company Registration",
    title: "Company Registration Certificate",
    required: true,
  },
  {
    type: "Address Proof",
    title: "Business Address Proof",
    required: true,
  },
  {
    type: "Authorized Signatory ID",
    title: "Authorized Signatory ID Proof",
    required: false,
  },
];


export default function SettingsDashboard({initialTab="General",showAccountProfile=false}) {

  const [activeTab, setActiveTab] = useState(initialTab);

  const [settings, setSettings] = useState({});
  const [activity, setActivity] = useState([]);
  const [accountSummary, setAccountSummary] = useState({});

  // =========================
  // KYC STATE
  // =========================

  const [selectedDocuments, setSelectedDocuments] = useState({});
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");


  // =========================
  // FETCH SETTINGS
  // =========================

  const fetchSettings = async () => {

    try {

      const res = await getSettings();

      console.log("Settings:", res.data);

      setSettings(res.data.data || {});

    } catch (err) {

      console.error("Settings Error:", err);

    }

  };


  // =========================
  // FETCH ACTIVITY
  // =========================

  const fetchActivity = async () => {

    try {

      const res = await getActivity();

      console.log("Activity:", res.data);

      setActivity(res.data.data || []);

    } catch (err) {

      console.error("Activity Error:", err);

    }

  };


  // =========================
  // FETCH ACCOUNT SUMMARY
  // =========================

  const fetchAccountSummary = async () => {

    try {

      const res = await getAccountSummary();

      console.log("Account Summary:", res.data);

      setAccountSummary(res.data.data || {});

    } catch (err) {

      console.error("Account Summary Error:", err);

    }

  };


  // =========================
  // INITIAL API CALL
  // =========================

  useEffect(() => {

    fetchSettings();
    fetchActivity();
    fetchAccountSummary();

  }, []);


  // =========================
  // TABS
  // =========================

  const tabs = [
    "General",
    "Company Profile",
    "KYC Documents",
    "Security",
    "Billing",
    "Notifications"
  ];


  // =========================
  // KYC HELPERS
  // =========================

  const handleFileChange = (documentType, file) => {
    if (!file) return;

    setSelectedDocuments((prev) => ({
      ...prev,
      [documentType]: file,
    }));
  };

  const getKycStatusStyle = () => {
    switch (accountSummary?.user?.kycStatus) {
      case "Verified":
        return "bg-green-100 text-green-700 border-green-200";

      case "Rejected":
        return "bg-red-100 text-red-700 border-red-200";

      case "Re-upload Required":
        return "bg-orange-100 text-orange-700 border-orange-200";

      case "Under Review":
        return "bg-blue-100 text-blue-700 border-blue-200";

      case "Submitted":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";

      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const handleUploadDocuments = async () => {
    const files = Object.values(selectedDocuments);

    if (!files.length) {
      setUploadMessage("Please select at least one document.");
      return;
    }

    try {
      setUploading(true);
      setUploadMessage("");

      const formData = new FormData();

      Object.entries(selectedDocuments).forEach(([documentType, file]) => {
        formData.append("documents", file);
        formData.append("documentTypes", documentType);

        const doc = REQUIRED_KYC_DOCUMENTS.find(
          (item) => item.type === documentType
        );

        formData.append("documentTitles", doc?.title || documentType);
      });

      const response = await API.post("/settings/kyc-documents", formData);

      if (response.data?.status === 1) {
        setUploadMessage(
          response.data.message || "Documents uploaded successfully."
        );

        setSelectedDocuments({});

        await fetchAccountSummary();
      } else {
        setUploadMessage(
          response.data?.message || "Failed to upload documents."
        );
      }
    } catch (error) {
      console.error("KYC upload failed:", error);

      setUploadMessage(
        error?.response?.data?.message || "Failed to upload documents."
      );
    } finally {
      setUploading(false);
    }
  };

  const handleSubmitKYC = async () => {
    try {
      setUploadMessage("");

      const requiredDocuments = REQUIRED_KYC_DOCUMENTS.filter(
        (doc) => doc.required
      );

      const uploadedDocuments = accountSummary?.user?.kycDocuments || [];

      const missingDocuments = requiredDocuments.filter(
        (req) => !uploadedDocuments.some((up) => up.type === req.type)
      );

      if (missingDocuments.length > 0) {
        setUploadMessage(
          `Please upload: ${missingDocuments.map((d) => d.title).join(", ")}`
        );
        return;
      }

      const response = await API.post("/settings/kyc-submit");

      console.log("KYC submit response:", response.data);

      if (response.data?.status === 1) {
        setUploadMessage(
          response.data?.message || "KYC submitted successfully."
        );

        await fetchAccountSummary();

        return;
      }

      setUploadMessage(response.data?.message || "Failed to submit KYC.");

    } catch (error) {
      console.error("KYC submit failed:", error);

      console.log("Error response:", error?.response?.data);

      setUploadMessage(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to submit KYC."
      );
    }
  };


  return (

    <div className="min-h-screen overflow-y-auto bg-slate-50 text-slate-800  p-6">


      {/* =====================================
          HEADER
      ===================================== */}

      <div className="mb-6 mt-10">

        <h1 className="text-2xl font-bold text-slate-900">
          Settings
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          Manage your account, preferences and system configuration.
        </p>

      </div>


      {/* =====================================
          TABS
      ===================================== */}

      <div className="border-b border-slate-200 mb-6 overflow-x-auto">

        <div className="flex whitespace-nowrap">

          {tabs.map((tab) => (

            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                pb-3 px-5 text-sm font-medium
                border-b-2 transition-colors
                ${
                  activeTab === tab
                    ? "border-blue-600 text-blue-600 font-semibold"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }
              `}
            >
              {tab}
            </button>

          ))}

        </div>

      </div>


      {/* =====================================
          GENERAL
      ===================================== */}

      {activeTab === "General" && showAccountProfile && <AccountProfile embedded />}
      {activeTab === "General" && (

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


          {/* ACCOUNT SUMMARY */}

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">

            <h3 className="font-bold text-sm text-slate-900 mb-5">
              Account Summary
            </h3>


            <div className="flex items-center gap-4 border-b border-slate-100 pb-5 mb-5">

              <div className="w-14 h-14 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-lg">

                {accountSummary?.user?.name
                  ?.split(" ")
                  .map(word => word[0])
                  .join("")
                  .toUpperCase()
                }

              </div>


              <div>

                <h4 className="font-bold text-base text-slate-900">
                  {accountSummary?.user?.name || "-"}
                </h4>

                <p className="text-xs text-slate-400 font-medium">
                  {accountSummary?.user?.roleId?.name || "-"}
                </p>

                <p className="text-xs text-blue-600 mt-0.5 font-medium">
                  {accountSummary?.user?.email || "-"}
                </p>

              </div>

            </div>


            <div className="space-y-3.5 text-xs">


              <div className="flex justify-between items-center">

                <span className="text-slate-400 font-medium flex items-center gap-1.5">
                  <Sliders size={14} />
                  User ID
                </span>

                <span className="font-bold text-slate-800">
                  {accountSummary?.user?._id?.slice(-6) || "-"}
                </span>

              </div>


              <div className="flex justify-between items-center">

                <span className="text-slate-400 font-medium flex items-center gap-1.5">
                  <ShieldAlert size={14} />
                  Role
                </span>

                <span className="font-bold text-slate-800">
                  {accountSummary?.user?.roleId?.name || "-"}
                </span>

              </div>


              <div className="flex justify-between items-center pt-2 border-t border-slate-50">

                <span className="text-slate-400 font-medium flex items-center gap-1.5">
                  <Key size={14} />
                  Password
                </span>


                <div className="flex items-center gap-3">

                  <span className="font-bold text-slate-800 tracking-widest">
                    ••••••••
                  </span>

                  <button
                    onClick={() => setActiveTab("Security")}
                    className="text-blue-600 font-bold hover:underline"
                  >
                    Change
                  </button>

                </div>

              </div>

            </div>

          </div>


          {/* QUICK ACTIONS */}

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">

            <h3 className="font-bold text-sm text-slate-900 mb-4">
              Quick Actions
            </h3>


            <div className="space-y-1">


              <QuickActionRow
                icon={<Key size={16} className="text-slate-500" />}
                label="Change Password"
                onClick={() => setActiveTab("Security")}
              />


              <QuickActionRow
                icon={<LayoutGrid size={16} className="text-slate-500" />}
                label="Manage API Keys"
              />


              <QuickActionRow
                icon={<LogOut size={16} className="text-rose-500" />}
                label="Log Out"
                isDanger
              />

            </div>

          </div>

        </div>

      )}


      {/* =====================================
          COMPANY PROFILE
      ===================================== */}

      {activeTab === "Company Profile" && (

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">


          {/* COMPANY DETAILS */}

          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-5 shadow-sm">

            <h3 className="font-bold text-sm text-slate-900 mb-5">
              Company Details
            </h3>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">


              <ProfileItem
                icon={<User size={15} />}
                label="Full Name"
                value={accountSummary?.user?.name}
              />


              <ProfileItem
                icon={<Mail size={15} />}
                label="Email"
                value={accountSummary?.user?.email}
              />


              <ProfileItem
                icon={<Phone size={15} />}
                label="Phone"
                value={accountSummary?.user?.phone}
              />


              <ProfileItem
                icon={<Briefcase size={15} />}
                label="Designation"
                value={accountSummary?.user?.designation}
              />


              <ProfileItem
                icon={<Building2 size={15} />}
                label="Company Name"
                value={accountSummary?.user?.companyName}
              />


              <ProfileItem
                icon={<Building2 size={15} />}
                label="Company Type"
                value={accountSummary?.user?.businessType}
              />


              <ProfileItem
                icon={<FileText size={15} />}
                label="GST Number"
                value={
                  accountSummary?.user?.gstNumber ||
                  accountSummary?.user?.gstin
                }
              />


              <ProfileItem
                icon={<FileText size={15} />}
                label="Import Export ID"
                value={accountSummary?.user?.importExportId}
              />


              <ProfileItem
                icon={<MapPin size={15} />}
                label="Country"
                value={accountSummary?.user?.country}
              />


              <ProfileItem
                icon={<MapPin size={15} />}
                label="City"
                value={accountSummary?.user?.city}
              />


              <ProfileItem
                icon={<MapPin size={15} />}
                label="Address"
                value={accountSummary?.user?.address}
              />


              <ProfileItem
                icon={<Globe size={15} />}
                label="Account Type"
                value={accountSummary?.user?.accountType}
              />

            </div>

          </div>


          {/* RIGHT SIDE */}

          <div className="space-y-6">


            {/* BUSINESS SUMMARY */}

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">

              <h3 className="font-bold text-sm text-slate-900 mb-4">
                Business Summary
              </h3>


              <div className="space-y-3">

                <SummaryRow
                  label="Plan"
                  value={accountSummary?.user?.plan}
                />

                <SummaryRow
                  label="Status"
                  value={accountSummary?.user?.accountStatus}
                />

                <SummaryRow
                  label="Profile Completion"
                  value={
                    accountSummary?.user?.profileCompletion != null
                      ? `${accountSummary.user.profileCompletion}%`
                      : "-"
                  }
                />

              </div>

            </div>


            {/* VERIFICATION */}

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">

              <h3 className="font-bold text-sm text-slate-900 mb-4">
                Verification Status
              </h3>


              <div className="space-y-3">

                <VerificationRow
                  label="Email"
                  verified={accountSummary?.user?.emailVerified}
                />

                <VerificationRow
                  label="Phone"
                  verified={accountSummary?.user?.phoneVerified}
                />

                <VerificationRow
                  label="GST"
                  verified={accountSummary?.user?.gstVerified}
                />

              </div>

            </div>

          </div>

        </div>

      )}


      {/* =====================================
          KYC DOCUMENTS
      ===================================== */}

      {activeTab === "KYC Documents" && (

        <div className="space-y-6">

          {/* KYC STATUS */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

              <div>
                <h3 className="font-bold text-sm text-slate-900">
                  KYC Verification Status
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Your business verification status
                </p>
              </div>

              <span
                className={`px-4 py-2 rounded-full border text-xs font-semibold ${getKycStatusStyle()}`}
              >
                {accountSummary?.user?.kycStatus || "Not Submitted"}
              </span>

            </div>

            {accountSummary?.user?.kycStatus === "Verified" && (
              <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-700 font-semibold text-sm flex items-center gap-1.5">
                  <CheckCircle2 size={16} /> Your KYC has been successfully verified.
                </p>
                {accountSummary?.user?.kycVerifiedAt && (
                  <p className="text-xs text-green-600 mt-1">
                    Verified on: {new Date(accountSummary.user.kycVerifiedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            )}

            {accountSummary?.user?.kycStatus === "Rejected" && (
              <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700 font-semibold text-sm">
                  Your KYC has been rejected.
                </p>

                {accountSummary?.user?.kycRejectionReasons?.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs font-semibold text-slate-700">Rejection Reasons:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      {accountSummary.user.kycRejectionReasons.map((reason, index) => (
                        <li key={index} className="text-xs text-red-600">{reason}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {accountSummary?.user?.kycRejectionNote && (
                  <div className="mt-3">
                    <p className="text-xs font-semibold text-slate-700">Admin Note:</p>
                    <p className="text-xs text-red-600 mt-1">{accountSummary.user.kycRejectionNote}</p>
                  </div>
                )}
              </div>
            )}

            {accountSummary?.user?.kycStatus === "Re-upload Required" && (
              <div className="mt-4 bg-orange-50 border border-orange-200 rounded-lg p-4">
                <p className="text-orange-700 font-semibold text-sm flex items-center gap-1.5">
                  <AlertTriangle size={16} /> Some KYC documents require re-upload.
                </p>

                {accountSummary?.user?.kycRejectionReasons?.length > 0 && (
                  <ul className="list-disc pl-5 mt-2">
                    {accountSummary.user.kycRejectionReasons.map((reason, index) => (
                      <li key={index} className="text-xs text-orange-600">{reason}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

          </div>

          {/* KYC DOCUMENTS LIST */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">

            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-sm text-slate-900">KYC Documents</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Upload the documents required for business verification.
                </p>
              </div>

              <span className="text-xs text-slate-500">
                {accountSummary?.user?.kycDocuments?.length || 0} uploaded
              </span>
            </div>

            <div className="space-y-3">
              {REQUIRED_KYC_DOCUMENTS.map((requiredDocument) => {
                const uploadedDocument = accountSummary?.user?.kycDocuments?.find(
                  (document) => document.type === requiredDocument.type
                );

                return (
                  <div key={requiredDocument.type} className="border border-slate-200 rounded-xl p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                      <div>
                        <div className="flex items-center gap-2">
                          <FileText size={15} className="text-slate-500" />
                          <p className="font-semibold text-xs text-slate-800">{requiredDocument.title}</p>
                          {requiredDocument.required && (
                            <span className="text-[10px] text-red-500 font-semibold">Required</span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-2">
                          {uploadedDocument ? "Document uploaded" : "Not uploaded"}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {uploadedDocument?.url && (
                          <a
                            href={uploadedDocument.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-2 text-xs font-semibold text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50"
                          >
                            View
                          </a>
                        )}

                        <label className="cursor-pointer px-3 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg">
                          <Upload size={13} className="inline mr-1" />
                          {uploadedDocument ? "Replace" : "Choose File"}
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
                            className="hidden"
                            onChange={(event) =>
                              handleFileChange(requiredDocument.type, event.target.files?.[0])
                            }
                          />
                        </label>
                      </div>

                    </div>

                    {selectedDocuments[requiredDocument.type] && (
                      <div className="mt-3 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
                        <p className="text-xs text-blue-700">
                          Selected: <span className="font-semibold">{selectedDocuments[requiredDocument.type].name}</span>
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {Object.keys(selectedDocuments).length > 0 && (
              <div className="mt-5">
                <button
                  type="button"
                  onClick={handleUploadDocuments}
                  disabled={uploading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white px-4 py-3 rounded-xl text-sm font-semibold"
                >
                  {uploading ? "Uploading Documents..." : "Upload Selected Documents"}
                </button>
              </div>
            )}

            {uploadMessage && (
              <p className="text-sm text-center mt-3 text-slate-600">{uploadMessage}</p>
            )}

            {(() => {
              const requiredDocuments = REQUIRED_KYC_DOCUMENTS.filter((doc) => doc.required);
              const uploadedDocuments = accountSummary?.user?.kycDocuments || [];

              const allRequiredUploaded = requiredDocuments.every((req) =>
                uploadedDocuments.some((up) => up.type === req.type)
              );

              return (
                accountSummary?.user?.kycStatus !== "Verified" &&
                accountSummary?.user?.kycStatus !== "Submitted" && (
                  <div className="mt-5">
                    <button
                      type="button"
                      onClick={handleSubmitKYC}
                      disabled={!allRequiredUploaded}
                      className={`w-full px-4 py-3 rounded-xl text-sm font-semibold text-white ${
                        allRequiredUploaded
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-gray-300 cursor-not-allowed"
                      }`}
                    >
                      {allRequiredUploaded ? "Submit KYC for Verification" : "Upload All Required Documents First"}
                    </button>

                    {!allRequiredUploaded && (
                      <p className="text-xs text-slate-500 text-center mt-2">
                        Please upload all required documents before submitting your KYC.
                      </p>
                    )}
                  </div>
                )
              );
            })()}

          </div>

        </div>

      )}


      {/* =====================================
          SECURITY
      ===================================== */}

      {activeTab === "Security" && (

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


          {/* SECURITY INFORMATION */}

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">

            <h3 className="font-bold text-sm text-slate-900 mb-5">
              Security
            </h3>


            <div>


              <SettingRow
                icon={<Mail size={16} className="text-slate-500" />}
                title="Email Address"
                desc={accountSummary?.user?.email || "Not available"}
                control={
                  <button className="text-blue-600 font-bold text-xs">
                    Change
                  </button>
                }
              />


              <div className="border-t border-slate-100" />


              <SettingRow
                icon={<Phone size={16} className="text-slate-500" />}
                title="Mobile Number"
                desc={accountSummary?.user?.phone || "Not available"}
                control={
                  <button className="text-blue-600 font-bold text-xs">
                    Change
                  </button>
                }
              />


              <div className="border-t border-slate-100" />


              <SettingRow
                icon={<Key size={16} className="text-slate-500" />}
                title="Password"
                desc="Your password is securely protected."
                control={
                  <button className="text-blue-600 font-bold text-xs">
                    Change
                  </button>
                }
              />

            </div>

          </div>


          {/* SECURITY SETTINGS */}

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">

            <h3 className="font-bold text-sm text-slate-900 mb-5">
              Security Settings
            </h3>




            <div className="border-t border-slate-100" />


            <SettingRow
              icon={<Calendar size={16} className="text-slate-500" />}
              title="Session Timeout"
              desc="Automatically sign out after inactivity."
              control={
                <span className="text-xs font-bold text-slate-700">
                  {settings?.sessionTimeout || 30} min
                </span>
              }
            />

          </div>

        </div>

      )}


      {/* =====================================
          BILLING
      ===================================== */}

      {activeTab === "Billing" && (

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


          {/* BILLING DETAILS */}

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">

            <h3 className="font-bold text-sm text-slate-900 mb-5">
              Billing Details
            </h3>


            <div className="space-y-4">


              <SummaryRow
                label="Company Name"
                value={
                  settings?.companyName ||
                  accountSummary?.user?.companyName
                }
              />


              <SummaryRow
                label="Billing Email"
                value={
                  settings?.billingEmail ||
                  accountSummary?.user?.email
                }
              />


              <SummaryRow
                label="GST Number"
                value={
                  settings?.gstNumber ||
                  accountSummary?.user?.gstNumber ||
                  accountSummary?.user?.gstin
                }
              />


              <SummaryRow
                label="Currency"
                value={settings?.currency}
              />

            </div>

          </div>


          {/* CURRENT PLAN */}

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">

            <h3 className="font-bold text-sm text-slate-900 mb-5">
              Current Plan
            </h3>


            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-[11px] text-slate-400">
                    Current Plan
                  </p>

                  <h3 className="text-base font-bold text-slate-900 mt-1">
                    {accountSummary?.user?.plan || "Free"}
                  </h3>

                </div>


                <CreditCard
                  size={24}
                  className="text-blue-600"
                />

              </div>


              <div className="mt-5">

                <p className="text-[11px] text-slate-400">
                  Plan Expiry
                </p>

                <p className="text-xs font-bold text-slate-700 mt-1">

                  {accountSummary?.user?.planExpiry
                    ? new Date(
                        accountSummary.user.planExpiry
                      ).toLocaleDateString()
                    : "Not available"}

                </p>

              </div>

            </div>

          </div>

        </div>

      )}


      {/* =====================================
          NOTIFICATIONS
      ===================================== */}

      {activeTab === "Notifications" && (

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


          {/* NOTIFICATION SETTINGS */}

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">

            <h3 className="font-bold text-sm text-slate-900 mb-5">
              Notification Preferences
            </h3>


            <NotificationRow
              title="Email Notifications"
              desc="Receive important updates through email."
              value={settings?.emailNotification}
              onChange={async () => {

                try {

                  const res =
                    await updateNotifications({

                      emailNotification:
                        !settings?.emailNotification,

                      pushNotification:
                        settings?.pushNotification,

                      smsNotification:
                        settings?.smsNotification

                    });

                  setSettings(
                    res.data.data || {}
                  );

                } catch (err) {

                  console.error(err);

                }

              }}
            />


            <div className="border-t border-slate-100" />


            <NotificationRow
              title="Push Notifications"
              desc="Receive notifications inside the application."
              value={settings?.pushNotification}
              onChange={async () => {

                try {

                  const res =
                    await updateNotifications({

                      emailNotification:
                        settings?.emailNotification,

                      pushNotification:
                        !settings?.pushNotification,

                      smsNotification:
                        settings?.smsNotification

                    });

                  setSettings(
                    res.data.data || {}
                  );

                } catch (err) {

                  console.error(err);

                }

              }}
            />


            <div className="border-t border-slate-100" />


            <NotificationRow
              title="SMS Notifications"
              desc="Receive important updates through SMS."
              value={settings?.smsNotification}
              onChange={async () => {

                try {

                  const res =
                    await updateNotifications({

                      emailNotification:
                        settings?.emailNotification,

                      pushNotification:
                        settings?.pushNotification,

                      smsNotification:
                        !settings?.smsNotification

                    });

                  setSettings(
                    res.data.data || {}
                  );

                } catch (err) {

                  console.error(err);

                }

              }}
            />

          </div>


          {/* NOTIFICATION SUMMARY */}

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">

            <h3 className="font-bold text-sm text-slate-900 mb-5">
              Notification Summary
            </h3>


            <div className="space-y-4">

              <SummaryRow
                label="Email"
                value={
                  settings?.emailNotification
                    ? "Enabled"
                    : "Disabled"
                }
              />

              <SummaryRow
                label="Push"
                value={
                  settings?.pushNotification
                    ? "Enabled"
                    : "Disabled"
                }
              />

              <SummaryRow
                label="SMS"
                value={
                  settings?.smsNotification
                    ? "Enabled"
                    : "Disabled"
                }
              />

            </div>

          </div>

        </div>

      )}


      {/* =====================================
          FOOTER
      ===================================== */}

      <div className="flex justify-between items-center text-[11px] text-slate-400 font-medium mt-8 pt-4 border-t border-slate-200">

        <span className="flex items-center gap-1">

          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>

          All changes are automatically saved.

        </span>


        <button className="flex items-center gap-1 hover:text-slate-600 font-semibold">

          <HelpCircle size={14} />

          Help Center

        </button>

      </div>

    </div>

  );

}


/* =====================================================
   SETTING ROW
===================================================== */

function SettingRow({
  icon,
  title,
  desc,
  control
}) {

  return (

    <div className="flex items-center justify-between py-4 gap-4">

      <div className="flex items-start gap-3 min-w-0">

        <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 shrink-0">

          {icon}

        </div>


        <div className="min-w-0">

          <h4 className="text-xs font-bold text-slate-900">
            {title}
          </h4>

          <p className="text-[11px] text-slate-400 mt-0.5">
            {desc}
          </p>

        </div>

      </div>


      <div className="shrink-0">
        {control}
      </div>

    </div>

  );

}


/* =====================================================
   PROFILE ITEM
===================================================== */

function ProfileItem({
  icon,
  label,
  value
}) {

  return (

    <div className="flex items-start gap-3">

      <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg text-slate-500">

        {icon}

      </div>


      <div>

        <p className="text-[10px] text-slate-400 font-semibold">
          {label}
        </p>

        <p className="text-xs text-slate-800 font-bold mt-1">
          {value || "-"}
        </p>

      </div>

    </div>

  );

}


/* =====================================================
   SUMMARY ROW
===================================================== */

function SummaryRow({
  label,
  value
}) {

  return (

    <div className="flex justify-between items-center gap-4 text-xs">

      <span className="text-slate-400 font-medium">
        {label}
      </span>

      <span className="text-slate-800 font-bold text-right">
        {value || "-"}
      </span>

    </div>

  );

}


/* =====================================================
   VERIFICATION ROW
===================================================== */

function VerificationRow({
  label,
  verified
}) {

  return (

    <div className="flex justify-between items-center">

      <span className="text-xs font-medium text-slate-600">
        {label}
      </span>

      <span
        className={`text-xs font-bold ${
          verified
            ? "text-emerald-600"
            : "text-slate-400"
        }`}
      >
        {verified
          ? "✓ Verified"
          : "Not Verified"}
      </span>

    </div>

  );

}


/* =====================================================
   NOTIFICATION ROW
===================================================== */

function NotificationRow({
  title,
  desc,
  value,
  onChange
}) {

  return (

    <div className="flex items-center justify-between py-4 gap-4">

      <div className="flex items-start gap-3">

        <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg">

          <Bell
            size={16}
            className="text-slate-500"
          />

        </div>


        <div>

          <h4 className="text-xs font-bold text-slate-900">
            {title}
          </h4>

          <p className="text-[11px] text-slate-400 mt-0.5">
            {desc}
          </p>

        </div>

      </div>


      <button onClick={onChange}>

        {value ? (

          <ToggleRight
            size={30}
            className="text-blue-600"
          />

        ) : (

          <ToggleLeft
            size={30}
            className="text-slate-300"
          />

        )}

      </button>

    </div>

  );

}


/* =====================================================
   QUICK ACTION
===================================================== */

function QuickActionRow({
  icon,
  label,
  isDanger = false,
  onClick
}) {

  return (

    <div
      onClick={onClick}
      className="flex items-center justify-between py-2.5 px-2 rounded-lg hover:bg-slate-50 cursor-pointer group transition-colors"
    >

      <div className="flex items-center gap-3">

        <div
          className={`p-1.5 rounded-md ${
            isDanger
              ? "bg-rose-50"
              : "bg-slate-50 border border-slate-100"
          }`}
        >

          {icon}

        </div>


        <span
          className={`text-xs font-bold ${
            isDanger
              ? "text-rose-600"
              : "text-slate-700"
          }`}
        >
          {label}
        </span>

      </div>


      <ChevronRight
        size={14}
        className="text-slate-300 group-hover:text-slate-500"
      />

    </div>

  );

}