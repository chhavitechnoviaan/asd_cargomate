
  // // import { useEffect, useState } from "react";
  // // import {
  // //   FiArrowLeft,
  // //   FiSave,
  // //   FiDownload,
  // //   FiPlus,
  // //   FiCopy,
  // //   FiChevronRight,
  // //   FiExternalLink,
  // //   FiDatabase,
  // //   FiPhone,
  // //   FiMail,
  // //   FiCheckCircle,
  // //   FiXCircle,
  // //   FiShare2,
  // //   FiBookmark,
  // //   FiMessageSquare,
  // //   FiInfo,
  // //   FiAlertTriangle,
  // //   FiAlertCircle,
  // //   FiBell,
  // //   FiGrid,
  // //   FiX,
  // // } from "react-icons/fi";
  // // import {
  // //   MdOutlineAccountBalance,
  // //   MdOutlineLocationOn,
  // //   MdOutlineOpenInNew,
  // // } from "react-icons/md";
  // // import { BsGraphUpArrow } from "react-icons/bs";
  // // import Shipment from "../../components/ShipmentForm";
  // // import poster2 from "../../assets/Images/webp/poster2.webp";
  // // import DashboardAdPlacement from "../../components/DashboardAdPlacement";
  // // import { estimateIncentives, calculateMeis } from "../../api/CargoMateApi";

  // // const breakdownRows = [
  // //   {
  // //     scheme: "RoDTEP",
  // //     fullName: "Remission of Duties or Taxes on Exported Products",
  // //     type: "Central",
  // //     typeColor: "bg-emerald-100 text-emerald-700",
  // //     applicableOn: "Export Value",
  // //     rate: "4%",
  // //     benefit: "₹4,992",
  // //     eligibility: "Eligible",
  // //     eligible: true,
  // //   },
  // //   {
  // //     scheme: "Drawbacks",
  // //     fullName: "",
  // //     type: "Central",
  // //     typeColor: "bg-emerald-100 text-emerald-700",
  // //     applicableOn: "Export Value",
  // //     rate: "0.5%",
  // //     benefit: "₹624",
  // //     eligibility: "Eligible",
  // //     eligible: true,
  // //   },
  // //   // {
  // //   //   scheme: "State Incentive – Tamil Nadu",
  // //   //   fullName: "Export Promotion Policy",
  // //   //   type: "State",
  // //   //   typeColor: "bg-orange-100 text-orange-600",
  // //   //   applicableOn: "Export Value",
  // //   //   rate: "2%",
  // //   //   benefit: "₹2,496",
  // //   //   eligibility: "Eligible",
  // //   //   eligible: true,
  // //   // },
  // //   // {
  // //   //   scheme: "IGST Refund (on Exports)",
  // //   //   fullName: "",
  // //   //   type: "Central",
  // //   //   typeColor: "bg-emerald-100 text-emerald-700",
  // //   //   applicableOn: "Tax Paid",
  // //   //   rate: "0%",
  // //   //   benefit: "₹0",
  // //   //   eligibility: "Not Applicable",
  // //   //   eligible: false,
  // //   // },
  // // ];

  // // const auditLog = [
  // //   {
  // //     color: "bg-teal-500",
  // //     time: "09:25 AM",
  // //     text: "Search Submitted by Arjun Soni",
  // //   },
  // //   { color: "bg-teal-500", time: "09:25 AM", text: "Data Validated" },
  // //   { color: "bg-teal-500", time: "09:25 AM", text: "Incentives Matched" },
  // //   { color: "bg-teal-500", time: "09:25 AM", text: "Result Generated" },
  // //   { color: "bg-teal-500", time: "09:25 AM", text: "Report Saved" },
  // // ];

  // // const assumptions = [
  // //   "Product is 100% cotton, knitted, for men.",
  // //   "Shipment value and details provided are correct.",
  // //   "Export under HS code 6109.10.00.",
  // //   "Input Tax Credit is available.",
  // //   "Rates are as per current notifications and may change.",
  // // ];

  // // const dataSources = [
  // //   { icon: FiDatabase, label: "DGFT (India)" },
  // //   { icon: FiDatabase, label: "Trade APIs" },
  // //   { icon: FiDatabase, label: "ICEGATE" },
  // //   { icon: FiBell, label: "Notifications" },
  // //   { icon: FiGrid, label: "State Export Policies" },
  // //   { icon: FiDatabase, label: "Public Schemes Database" },
  // // ];

  // // const emptySearch = {
  // //   hsCode: "",
  // //   product: "",
  // //   origin: "",
  // //   destination: "",
  // //   value: "",
  // //   quantity: "",
  // //   meis_rate_pct: "10",
  // // };

  // // function SearchPopup({ onClose, onSubmit, initial }) {
  // //   const [form, setForm] = useState(initial);
  // //   const [error, setError] = useState("");

  // //   function handleChange(e) {
  // //     setForm({ ...form, [e.target.name]: e.target.value });
  // //     if (error) setError("");
  // //   }

  // //   function handleSubmit(e) {
  // //     e.preventDefault();
  // //     if (!form.hsCode.trim()) {
  // //       setError("HS Code is required");
  // //       return;
  // //     }
  // //     onSubmit(form);
  // //   }

  // //   const fields = [
  // //     {
  // //       name: "hsCode",
  // //       label: "HS Code",
  // //       placeholder: "e.g. 6109.10.00",
  // //       required: true,
  // //     },
  // //     {
  // //       name: "product",
  // //       label: "Product",
  // //       placeholder: "e.g. T-shirts, singlets and other vests, of cotton",
  // //     },
  // //     { name: "origin", label: "Origin Country", placeholder: "e.g. India" },
  // //     {
  // //       name: "destination",
  // //       label: "Destination Country",
  // //       placeholder: "e.g. United Arab Emirates (UAE)",
  // //     },
  // //     { name: "value", label: "Shipment Value", placeholder: "e.g. ₹1,24,680" },
  // //     { name: "quantity", label: "Quantity", placeholder: "e.g. 500" },
  // //     {
  // //       name: "meis_rate_pct",
  // //       label: "MEIS Rate (%)",
  // //       placeholder: "e.g. 10",
  // //       type: "number",
  // //     },
  // //   ];

  // //   return (
  // //     <div
  // //       className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
  // //       onClick={onClose}
  // //     >
  // //       <form
  // //         onSubmit={handleSubmit}
  // //         onClick={(e) => e.stopPropagation()}
  // //         className="bg-white rounded-xl border border-gray-200 shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto "
  // //       >
  // //         <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-gray-100">
  // //           <div className="flex items-center gap-2">
  // //             <div className="w-9 h-9 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
  // //               <FiDatabase className="text-blue-500 text-base" />
  // //             </div>
  // //             <div>
  // //               <p className="text-sm font-semibold text-gray-900">Your Search</p>
  // //               <p className="text-[11px] text-gray-500">
  // //                 Enter shipment details to check applicable incentives.
  // //               </p>
  // //             </div>
  // //           </div>
  // //           <button
  // //             type="button"
  // //             onClick={onClose}
  // //             aria-label="Close"
  // //             className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100"
  // //           >
  // //             <FiX size={16} />
  // //           </button>
  // //         </div>

  // //         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 sm:px-5 py-4">
  // //           {fields.map(({ name, label, placeholder, required, type }) => (
  // //             <div
  // //               key={name}
  // //               className={name === "product" ? "sm:col-span-2" : ""}
  // //             >
  // //               <label
  // //                 htmlFor={name}
  // //                 className="block text-[10px] text-gray-400 font-medium mb-1"
  // //               >
  // //                 {label}
  // //                 {required && <span className="text-red-400"> *</span>}
  // //               </label>
  // //               <input
  // //                 id={name}
  // //                 name={name}
  // //                 type={type || "text"}
  // //                 min={type === "number" ? "0" : undefined}
  // //                 step={type === "number" ? "any" : undefined}
  // //                 value={form[name] ?? ""}
  // //                 required={required || name === "meis_rate_pct"}
  // //                 onChange={handleChange}
  // //                 placeholder={placeholder}
  // //                 autoFocus={name === "hsCode"}
  // //                 className={`w-full border rounded-lg px-3 py-2 text-xs font-semibold text-gray-800 placeholder:font-normal placeholder:text-gray-400 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 ${
  // //                   name === "hsCode" && error
  // //                     ? "border-red-300"
  // //                     : "border-gray-200"
  // //                 }`}
  // //               />
  // //               {name === "hsCode" && error && (
  // //                 <p className="text-[10px] text-red-500 mt-1">{error}</p>
  // //               )}
  // //             </div>
  // //           ))}
  // //         </div>

  // //         <div className="flex items-center justify-end gap-2 px-4 sm:px-5 py-3 border-t border-gray-100">
  // //           <button
  // //             type="button"
  // //             onClick={onClose}
  // //             className="border border-gray-200 bg-white text-gray-700 text-xs font-medium px-4 py-2 rounded-lg hover:bg-gray-50"
  // //           >
  // //             Cancel
  // //           </button>
  // //           <button
  // //             type="submit"
  // //             className="bg-teal-500 hover:bg-teal-600 text-white text-xs font-semibold px-4 py-2 rounded-lg"
  // //           >
  // //             Submit
  // //           </button>
  // //         </div>
  // //       </form>
  // //     </div>
  // //   );
  // // }

  // // const getIncentiveUserScope = () => {
  // //   for (const key of ["userId", "user_id", "email", "userEmail"]) {
  // //     const value = localStorage.getItem(key);
  // //     if (value) return value.toLowerCase().replace(/[^a-z0-9_-]/g, "_");
  // //   }
  // //   for (const key of ["currentUser", "user", "userInfo"]) {
  // //     try {
  // //       const value = JSON.parse(localStorage.getItem(key) || "null");
  // //       if (value?.id || value?._id || value?.email)
  // //         return String(value.id || value._id || value.email)
  // //           .toLowerCase()
  // //           .replace(/[^a-z0-9_-]/g, "_");
  // //     } catch {}
  // //   }
  // //   return "current_user";
  // // };

  // // const readMetric = (source, keys) => {
  // //   if (!source) return null;
  // //   for (const key of keys) {
  // //     const parts = key.split(".");
  // //     let value = source;
  // //     for (const part of parts) value = value?.[part];
  // //     if (
  // //       value !== undefined &&
  // //       value !== null &&
  // //       value !== "" &&
  // //       Number.isFinite(Number(value))
  // //     )
  // //       return Number(value);
  // //   }
  // //   return null;
  // // };
  // // const formatINR = (value) =>
  // //   value == null
  // //     ? "—"
  // //     : new Intl.NumberFormat("en-IN", {
  // //         style: "currency",
  // //         currency: "INR",
  // //         maximumFractionDigits: 2,
  // //       }).format(value);
  // // const makeReportId = () =>
  // //   `INC-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

  // // export default function IncentiveChecker() {
  // //   const [copied, setCopied] = useState(false);
  // //   const [showPopup, setShowPopup] = useState(true);
  // //   const [showDetails, setShowDetails] = useState(false);
  // //   const [search, setSearch] = useState(emptySearch);
  // //   const [shipment, setShipment] = useState("");
  // //   const [activeTab, setActiveTab] = useState("Incentive Checker");
  // //   const [apiResults, setApiResults] = useState(null);
  // //   const [apiLoading, setApiLoading] = useState(false);
  // //   const [apiError, setApiError] = useState("");
  // //   // Keep Report Information hidden until the user completes a search in this session.
  // //   const [hasSearched, setHasSearched] = useState(false);
  // //   const [reportInfo, setReportInfo] = useState(() => {
  // //     try {
  // //       const saved = JSON.parse(
  // //         localStorage.getItem(
  // //           `cargomate_incentive_reports_${getIncentiveUserScope()}`,
  // //         ) || "[]",
  // //       );
  // //       return saved[0] || null;
  // //     } catch {
  // //       return null;
  // //     }
  // //   });
  // //   const [auditEntries, setAuditEntries] = useState(() => {
  // //     try {
  // //       return JSON.parse(
  // //         localStorage.getItem(
  // //           `cargomate_incentive_audit_${getIncentiveUserScope()}`,
  // //         ) || "[]",
  // //       );
  // //     } catch {
  // //       return [];
  // //     }
  // //   });

  // //   useEffect(() => {
  // //     localStorage.setItem(
  // //       `cargomate_incentive_audit_${getIncentiveUserScope()}`,
  // //       JSON.stringify(auditEntries.slice(0, 50)),
  // //     );
  // //   }, [auditEntries]);

  // //   const runIncentiveCheck = async (data) => {
  // //     setApiLoading(true);
  // //     setApiError("");
  // //     setApiResults(null);
  // //     const numericValue = Number(
  // //       String(data.value || "").replace(/[^0-9.]/g, ""),
  // //     );
  // //     const numericQuantity = Number(
  // //       String(data.quantity || "").replace(/[^0-9.]/g, ""),
  // //     );
  // //     const numericMeisRate = Number(data.meis_rate_pct);
  // //     if (!Number.isFinite(numericValue) || numericValue <= 0) {
  // //       setApiError("Enter a valid Shipment Value greater than zero.");
  // //       setApiLoading(false);
  // //       return;
  // //     }
  // //     if (!Number.isFinite(numericQuantity) || numericQuantity <= 0) {
  // //       setApiError("Enter a valid Quantity greater than zero.");
  // //       setApiLoading(false);
  // //       return;
  // //     }
  // //     if (!Number.isFinite(numericMeisRate) || numericMeisRate < 0) {
  // //       setApiError("Enter a valid MEIS Rate (%).");
  // //       setApiLoading(false);
  // //       return;
  // //     }
  // //     try {
  // //       const payload = {
  // //         hs_code: data.hsCode,
  // //         fob_value: Number(String(data.value || "").replace(/[^0-9.]/g, "")),
  // //         quantity: Number(String(data.quantity || "").replace(/[^0-9.]/g, "")),
  // //         meis_rate_pct: Number(data.meisRatePct || 0),
  // //       };

  // //       // Keep both endpoints as POST requests with JSON bodies.
  // //       const [estimate, meis] = await Promise.allSettled([
  // //         estimateIncentives(payload),
  // //         calculateMeis(payload),
  // //       ]);
  // //       const results = {
  // //         estimate:
  // //           estimate.status === "fulfilled"
  // //             ? (estimate.value?.data ?? estimate.value)
  // //             : null,
  // //         meis:
  // //           meis.status === "fulfilled" ? (meis.value?.data ?? meis.value) : null,
  // //       };
  // //       if (!results.estimate && !results.meis)
  // //         throw (
  // //           estimate.reason || meis.reason || new Error("Incentive APIs failed")
  // //         );
  // //       setApiResults(results);
  // //       const generatedAt = new Date().toISOString();
  // //       const report = {
  // //         id: makeReportId(),
  // //         generatedAt,
  // //         generatedBy:
  // //           localStorage.getItem("userName") ||
  // //           localStorage.getItem("name") ||
  // //           "Current user",
  // //         input: payload,
  // //         result: results,
  // //       };
  // //       setReportInfo(report);
  // //       setHasSearched(true);
  // //       try {
  // //         const reportKey = `cargomate_incentive_reports_${getIncentiveUserScope()}`;
  // //         const existingReports = JSON.parse(
  // //           localStorage.getItem(reportKey) || "[]",
  // //         );
  // //         localStorage.setItem(
  // //           reportKey,
  // //           JSON.stringify(
  // //             [
  // //               report,
  // //               ...existingReports.filter((item) => item.id !== report.id),
  // //             ].slice(0, 50),
  // //           ),
  // //         );
  // //       } catch (storageError) {
  // //         console.warn(
  // //           "Unable to persist incentive report locally",
  // //           storageError,
  // //         );
  // //       }
  // //       const entry = {
  // //         id: report.id,
  // //         time: new Date(generatedAt).toLocaleTimeString([], {
  // //           hour: "2-digit",
  // //           minute: "2-digit",
  // //         }),
  // //         text: `Incentive and MEIS estimate generated for ${data.product || data.hsCode}`,
  // //         createdAt: generatedAt,
  // //       };
  // //       setAuditEntries((prev) => [entry, ...prev].slice(0, 50));
  // //       if (estimate.status === "rejected" || meis.status === "rejected") {
  // //         setApiError(
  // //           [
  // //             estimate.status === "rejected"
  // //               ? `Incentive estimate failed: ${estimate.reason?.message || "request failed"}`
  // //               : "",
  // //             meis.status === "rejected"
  // //               ? `MEIS estimate failed: ${meis.reason?.message || "request failed"}`
  // //               : "",
  // //           ]
  // //             .filter(Boolean)
  // //             .join(" · "),
  // //         );
  // //       }
  // //     } catch (err) {
  // //       setApiError(
  // //         err?.response?.data?.detail ||
  // //           err?.response?.data?.message ||
  // //           err.message ||
  // //           "Unable to calculate incentives.",
  // //       );
  // //     } finally {
  // //       setApiLoading(false);
  // //     }
  // //   };

  // //   // function handleCopy() {
  // //   //   setCopied(true);
  // //   //   setTimeout(() => setCopied(false), 1500);
  // //   // }

  // //   const showView = () => {
  // //     setShowDetails(true);
  // //     setTimeout(() => {
  // //       document
  // //         .getElementById("sectionId")
  // //         ?.scrollIntoView({ behavior: "smooth", block: "center" });
  // //     }, 100);
  // //   };
  // //   const estimateBreakdown =
  // //     apiResults?.estimate?.breakdown ||
  // //     apiResults?.estimate?.schemes ||
  // //     apiResults?.estimate?.incentives ||
  // //     apiResults?.estimate?.data?.breakdown ||
  // //     apiResults?.estimate?.result?.breakdown ||
  // //     [];
  // //   const incentiveTotal = readMetric(apiResults?.estimate, [
  // //     "total_estimated_incentive",
  // //     "estimated_total_incentive_inr",
  // //     "total_incentive",
  // //     "total_incentive_inr",
  // //     "total_benefit",
  // //     "data.total_incentive",
  // //     "result.total_incentive",
  // //   ]);
  // //   const meisTotal = readMetric(apiResults?.meis, [
  // //     "estimated_total_meis_benefit",
  // //     "estimated_meis_benefit",
  // //     "total_meis_benefit",
  // //     "meis_benefit",
  // //     "total_benefit",
  // //     "estimated_benefit",
  // //     "data.total_meis_benefit",
  // //     "result.meis_benefit",
  // //   ]);

  // //   const handleDownloadPdf = () => {
  // //     if (!reportInfo) {
  // //       window.alert("Please run an incentive calculation before downloading the report.");
  // //       return;
  // //     }

  // //     const escapeHtml = (value) =>
  // //       String(value ?? "—").replace(/[&<>"']/g, (char) => ({
  // //         "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  // //       })[char]);

  // //     const report = reportInfo;
  // //     const reportSearch = search || emptySearch;
  // //     const result = report.result || apiResults || {};
  // //     const estimate = result.estimate || {};
  // //     const rows = estimate.breakdown || estimate.schemes || estimate.incentives ||
  // //       estimate.data?.breakdown || estimate.result?.breakdown || [];
  // //     const total = readMetric(estimate, [
  // //       "total_estimated_incentive", "estimated_total_incentive_inr",
  // //       "total_incentive", "total_incentive_inr", "total_benefit",
  // //       "data.total_incentive", "result.total_incentive",
  // //     ]);
  // //     const inputRows = [
  // //       ["HS Code", report.input?.hs_code || reportSearch.hsCode],
  // //       ["Product", reportSearch.product],
  // //       ["Origin Country", reportSearch.origin],
  // //       ["Destination Country", reportSearch.destination],
  // //       ["Shipment Value", report.input?.fob_value ?? reportSearch.value],
  // //       ["Quantity", report.input?.quantity ?? reportSearch.quantity],
  // //       ["MEIS Rate (%)", report.input?.meis_rate_pct ?? reportSearch.meis_rate_pct],
  // //     ];
  // //     const inputHtml = inputRows.map(([label, value]) =>
  // //       `<div class="field"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`
  // //     ).join("");
  // //     const tableRows = (Array.isArray(rows) ? rows : []).map((row) => {
  // //       const scheme = row.scheme || row.name || row.scheme_name || row.program || "Incentive scheme";
  // //       const type = row.type || row.scheme_type || row.category || "Central";
  // //       const applicable = row.applicableOn || row.applicable_on || row.basis || "Export Value";
  // //       const rate = row.rate ?? row.rate_pct ?? row.rate_percent ?? row.benefit_rate;
  // //       const rateText = rate == null || rate === "" ? "—" :
  // //         (typeof rate === "number" ? `${rate}%` : rate);
  // //       const benefit = readMetric(row, ["benefit", "estimated_benefit", "benefit_inr", "amount", "amount_inr", "value"]);
  // //       const eligibility = row.eligibility || row.status ||
  // //         (row.eligible === true ? "Eligible" : row.eligible === false ? "Not eligible" : "Not specified");
  // //       return `<tr><td><strong>${escapeHtml(scheme)}</strong><small>${escapeHtml(row.fullName || row.description || row.full_name || "")}</small></td><td>${escapeHtml(type)}</td><td>${escapeHtml(applicable)}</td><td>${escapeHtml(rateText)}</td><td>${escapeHtml(formatINR(benefit))}</td><td>${escapeHtml(String(eligibility).replaceAll("_", " "))}</td></tr>`;
  // //     }).join("");
  // //     const generatedOn = report.generatedAt ? new Date(report.generatedAt).toLocaleString() : new Date().toLocaleString();
  // //     const popup = window.open("", "_blank", "width=1000,height=750");
  // //     if (!popup) {
  // //       window.alert("Please allow pop-ups to generate your PDF report.");
  // //       return;
  // //     }
  // //     popup.document.open();
  // //     popup.document.write(`<!doctype html>
  // // <html><head><meta charset="utf-8"><title>${escapeHtml(report.id)} - Incentive Report</title>
  // // <style>
  // //   @page { size: A4 landscape; margin: 14mm; }
  // //   * { box-sizing: border-box; } body { font: 12px Arial, sans-serif; color: #172033; margin: 0; }
  // //   header { display:flex; justify-content:space-between; align-items:flex-start; border-bottom:2px solid #0d9488; padding-bottom:14px; margin-bottom:18px; }
  // //   h1 { font-size:22px; margin:0 0 5px; } .muted { color:#64748b; font-size:10px; }
  // //   .meta { text-align:right; font-size:10px; line-height:1.7; }
  // //   h2 { font-size:14px; margin:18px 0 9px; }
  // //   .fields { display:grid; grid-template-columns:repeat(4,1fr); gap:8px; }
  // //   .field { border:1px solid #e2e8f0; border-radius:6px; padding:9px; min-width:0; overflow-wrap:anywhere; }
  // //   .field span { display:block; color:#64748b; font-size:10px; margin-bottom:5px; }
  // //   .field strong { font-size:11px; } table { width:100%; border-collapse:collapse; margin-top:8px; }
  // //   th { background:#f1f5f9; color:#475569; font-size:10px; text-align:left; }
  // //   th,td { padding:9px 8px; border-bottom:1px solid #e2e8f0; vertical-align:top; }
  // //   td { font-size:10px; } small { display:block; color:#64748b; margin-top:3px; font-size:9px; }
  // //   tfoot td { font-weight:bold; color:#059669; font-size:12px; }
  // //   .notice { margin-top:14px; color:#64748b; font-size:9px; }
  // //   @media print { body { -webkit-print-color-adjust:exact; print-color-adjust:exact; } }
  // // </style></head><body>
  // // <header><div><h1>CargoMate — Incentive Report</h1><div class="muted">Export incentive estimate and scheme-wise breakdown</div></div>
  // // <div class="meta"><strong>Report ID:</strong> ${escapeHtml(report.id)}<br><strong>Generated:</strong> ${escapeHtml(generatedOn)}<br><strong>Generated by:</strong> ${escapeHtml(report.generatedBy || "Current user")}</div></header>
  // // <h2>Shipment Details</h2><div class="fields">${inputHtml}</div>
  // // <h2>Incentive Breakdown</h2>
  // // <table><thead><tr><th>Scheme / Program</th><th>Type</th><th>Applicable On</th><th>Rate / Benefit</th><th>Estimated Benefit (INR)</th><th>Eligibility</th></tr></thead>
  // // <tbody>${tableRows || '<tr><td colspan="6">No scheme-wise breakdown was returned by the API.</td></tr>'}</tbody>
  // // <tfoot><tr><td colspan="4" style="text-align:right">Total Estimated Incentive</td><td colspan="2">${escapeHtml(formatINR(total))}</td></tr></tfoot></table>
  // // <div class="notice">Estimates are indicative and subject to scheme rules and current government notifications. Verify with official sources before making business decisions.</div>
  // // <script>window.onload = () => { window.focus(); window.print(); };</script>
  // // </body></html>`);
  // //     popup.document.close();
  // //   };

  // //   return (
  // //     <div className=" bg-gray-50  flex-1 overflow-y-auto pt-14">
  // //       {activeTab === "Incentive Checker" && showPopup && (
  // //         <SearchPopup
  // //           initial={emptySearch}
  // //           onClose={() => setShowPopup(false)}
  // //           onSubmit={(data) => {
  // //             setSearch(data);
  // //             setShowPopup(false);
  // //             runIncentiveCheck(data);
  // //           }}
  // //         />
  // //       )}
  // //       {activeTab === "Incentive Checker" && (
  // //         <div>
  // //           {/* {(apiLoading || apiError || apiResults) && (
  // //             <div className="mx-4 sm:mx-6 mt-3 rounded-lg border bg-white p-3 text-xs">
  // //               {apiLoading && (
  // //                 <p className="text-blue-700">
  // //                   Calculating incentives from the live API…
  // //                 </p>
  // //               )}
  // //               {apiError && <p className="text-red-600">{apiError}</p>}
  // //               {apiResults && (
  // //                 <details>
  // //                   <summary className="font-semibold text-gray-800 mb-1 cursor-pointer">
  // //                     View raw API responses
  // //                   </summary>
  // //                   <pre className="max-h-48 overflow-auto whitespace-pre-wrap break-words text-gray-600">
  // //                     {JSON.stringify(apiResults, null, 2)}
  // //                   </pre>
  // //                 </details>
  // //               )}
  // //             </div>
  // //           )} */}
  // //           <div className=" border-gray-200 px-4 sm:px-6 py-3">
  // //             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
  // //               <div>
  // //                 <h1 className="text-xl font-bold text-gray-900">
  // //                   Incentive Checker
  // //                 </h1>
  // //                 <p className="text-xs text-gray-500 mt-0.5">
  // //                   Find applicable incentives and estimated benefits for your
  // //                   shipment.
  // //                 </p>
  // //               </div>
  // //               <div className="flex flex-wrap gap-2">
  // //                 {/* <button className="flex items-center gap-1.5 border border-gray-200 bg-white text-gray-700 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-gray-50">
  // //               <FiArrowLeft size={12} /> New Search
  // //             </button> */}
  // //                 {/* <button className="flex items-center gap-1.5 border border-gray-200 bg-white text-gray-700 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-gray-50">
  // //               <FiSave size={12} /> Save Report
  // //             </button>
  // //             <button className="flex items-center gap-1.5 border border-gray-200 bg-white text-gray-700 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-gray-50">
  // //               <FiDownload size={12} /> Download Report (PDF)
  // //             </button> */}
  // //                 <button
  // //                   type="button"
  // //                   onClick={() => setShowPopup(true)}
  // //                   className="flex items-center gap-1.5 border border-teal-500 bg-white hover:bg-teal-50 text-teal-700 text-xs font-semibold px-3 py-1.5 rounded-lg"
  // //                 >
  // //                   <FiDatabase size={12} /> Your Search
  // //                 </button>
  // //                 <button
  // //                   onClick={() => {
  // //                     setShipment("shipment");
  // //                     setActiveTab("");
  // //                   }}
  // //                   className="flex items-center gap-1.5 bg-teal-500 hover:bg-teal-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg"
  // //                 >
  // //                   <FiPlus size={12} /> Create Shipment
  // //                 </button>
  // //               </div>
  // //             </div>
  // //           </div>

  // //           <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6 py-4 grid grid-cols-1 xl:grid-cols-[1fr_290px] gap-4">
  // //             <div className="flex flex-col gap-4 min-w-0">
  // //               <div className="flex items-start gap-2 bg-teal-50 border border-teal-200 rounded-lg px-3 py-2.5 text-xs text-teal-800">
  // //                 <FiInfo
  // //                   size={14}
  // //                   className="text-teal-500 flex-shrink-0 mt-0.5"
  // //                 />
  // //                 This result is based on the data sources and assumptions listed
  // //                 below. Please review before making any trade decisions.
  // //               </div>

  // //               <div className="bg-white border border-gray-200 rounded-xl p-4">
  // //                 <div className="flex items-center gap-2 mb-3">
  // //                   <div className="w-9 h-9 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
  // //                     <FiDatabase className="text-blue-500 text-base" />
  // //                   </div>
  // //                   <p className="text-sm font-semibold text-gray-900">
  // //                     Your Search
  // //                   </p>
  // //                 </div>
  // //                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
  // //                   {[
  // //                     ["HS Code", search.hsCode],
  // //                     ["Product", search.product],
  // //                     ["Origin Country", search.origin],
  // //                     ["Destination Country", search.destination],
  // //                     ["Shipment Value", search.value],
  // //                     ["Quantity", search.quantity],
  // //                     ["MEIS Rate (%)", search.meis_rate_pct],
  // //                   ].map(([k, v]) => (
  // //                     <div key={k}>
  // //                       <p className="text-[10px] text-gray-400 font-medium mb-0.5">
  // //                         {k}
  // //                       </p>
  // //                       <p className="text-xs font-semibold text-gray-800 leading-tight">
  // //                         {v || "-"}
  // //                       </p>
  // //                     </div>
  // //                   ))}
  // //                 </div>
  // //                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-2 border-t border-gray-100">
  // //                   <p className="text-[10px] text-gray-400">
  // //                     Search ID: {reportInfo?.id || "Not generated yet"}{" "}
  // //                     &nbsp;•&nbsp;{" "}
  // //                     {reportInfo?.generatedAt
  // //                       ? new Date(reportInfo.generatedAt).toLocaleString()
  // //                       : "Run a calculation to generate a report"}{" "}
  // //                     &nbsp;•&nbsp; User:{" "}
  // //                     {reportInfo?.generatedBy ||
  // //                       localStorage.getItem("userName") ||
  // //                       localStorage.getItem("name") ||
  // //                       "Current user"}
  // //                   </p>
  // //                   <button
  // //                     onClick={showView}
  // //                     className="flex items-center gap-1.5 border border-gray-200 bg-white text-gray-600 text-[11px] font-medium px-3 py-1.5 rounded-lg hover:bg-gray-50 w-fit"
  // //                   >
  // //                     View Detail{" "}
  // //                   </button>
  // //                 </div>
  // //               </div>

  // //               <div className="bg-white border border-gray-200 rounded-xl p-4">
  // //                 <p className="text-sm font-semibold text-gray-800 mb-3">
  // //                   Estimated Total Incentive (INR)
  // //                 </p>
  // //                 <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4 items-center">
  // //                   <div>
  // //                     <p className="text-2xl font-bold text-gray-900">
  // //                       {formatINR(
  // //                         readMetric(apiResults?.estimate, [
  // //                           "total_estimated_incentive",
  // //                           "estimated_total_incentive_inr",
  // //                           "total_incentive",
  // //                           "total_incentive_inr",
  // //                           "total_benefit",
  // //                           "data.total_incentive",
  // //                           "result.total_incentive",
  // //                         ]),
  // //                       )}
  // //                     </p>
  // //                     <div className="mt-2 flex items-center gap-1.5">
  // //                       <span className="text-[11px] text-gray-500 font-medium">
  // //                         Total Incentive Rate
  // //                       </span>
  // //                       <span className="bg-teal-100 text-teal-700 text-[11px] font-semibold px-2 py-0.5 rounded-full">
  // //                         {readMetric(apiResults?.estimate, [
  // //                           "total_estimated_incentive",
  // //                           "incentive_rate_pct",
  // //                           "total_rate_pct",
  // //                           "rate_pct",
  // //                           "data.rate_pct",
  // //                         ]) != null
  // //                           ? `${readMetric(apiResults?.estimate, ["total_incentive_rate_pct", "incentive_rate_pct", "total_rate_pct", "rate_pct", "data.rate_pct"])}%`
  // //                           : "API estimate"}
  // //                       </span>
  // //                     </div>
  // //                   </div>
  // //                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
  // //                     <div className="border border-gray-100 rounded-xl p-3 flex items-start gap-3">
  // //                       <div className="w-9 h-9 bg-teal-50 rounded-full flex items-center justify-center flex-shrink-0">
  // //                         <MdOutlineAccountBalance className="text-teal-500 text-2xl" />
  // //                       </div>
  // //                       <div>
  // //                         <p className="text-[10px] text-gray-500 font-medium">
  // //                           Central Incentives
  // //                         </p>
  // //                         <p className="text-lg font-bold text-gray-900">
  // //                           {formatINR(
  // //                             readMetric(apiResults?.estimate, [
  // //                               "central_incentives",
  // //                               "central_incentive",
  // //                               "central_incentive_inr",
  // //                               "central_total",
  // //                               "data.central_incentive",
  // //                             ]),
  // //                           )}
  // //                         </p>
  // //                         {/* <p className="text-[10px] text-gray-400">
  // //                           From API response
  // //                         </p> */}
  // //                       </div>
  // //                     </div>
  // //                     <div className="border border-gray-100 rounded-xl p-3 flex items-start gap-3">
  // //                       <div className="w-9 h-9 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0">
  // //                         <MdOutlineLocationOn className="text-red-400 text-2xl" />
  // //                       </div>
  // //                       <div>
  // //                         <p className="text-[10px] text-gray-500 font-medium">
  // //                           State Incentives
  // //                         </p>
  // //                         <p className="text-lg font-bold text-gray-900">
  // //                           {formatINR(
  // //                             readMetric(apiResults?.estimate, [
  // //                               "state_incentives",
  // //                               "state_incentive",
  // //                               "state_incentive_inr",
  // //                               "state_total",
  // //                               "data.state_incentive",
  // //                             ]),
  // //                           )}
  // //                         </p>
  // //                           {/* <p className="text-[10px] text-gray-400">
  // //                             From API response
  // //                           </p> */}
  // //                       </div>
  // //                     </div>
  // //                     <div className="border border-gray-100 rounded-xl p-3 flex items-start gap-3">
  // //                       <div className="w-9 h-9 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
  // //                         <BsGraphUpArrow className="text-blue-400 text-2xl" />
  // //                       </div>
  // //                       <div>
  // //                         <p className="text-[10px] text-gray-500 font-medium">
  // //                           Estimated Total MEIS Benefit
  // //                         </p>
  // //                         <p className="text-lg font-bold text-gray-900">
  // //                           {formatINR(
  // //                             readMetric(apiResults?.meis, [
  // //                               "estimated_total_meis_benefit",
  // //                               "estimated_meis_benefit",
  // //                               "total_meis_benefit",
  // //                               "meis_benefit",
  // //                               "total_benefit",
  // //                               "estimated_benefit",
  // //                               "data.total_meis_benefit",
  // //                               "result.meis_benefit",
  // //                             ]),
  // //                           )}
  // //                         </p>
  // //                         {/* <p className="text-[10px] text-gray-400">
  // //                           Calculated by /incentive/meis
  // //                         </p> */}
  // //                       </div>
  // //                     </div>
  // //                   </div>
  // //                 </div>
  // //                 <p className="text-[10px] text-gray-400 mt-3">
  // //                   Incentives are subject to eligibility and compliance with
  // //                   applicable scheme conditions.
  // //                 </p>
  // //               </div>

  // //               {showDetails && (
  // //                 <div
  // //                   className="bg-white border border-gray-200 rounded-xl p-4"
  // //                   id="sectionId"
  // //                 >
  // //                   <div className=" flex justify-between items-center mb-3">
  // //                     <p className="text-base pl-3 font-semibold text-gray-800 ">
  // //                       Incentive Breakdown
  // //                     </p>
  // //                     {/* <button className="flex items-center  border border-gray-200 text-teal-600 text-xs font-medium px-2 py-2 rounded-lg hover:bg-teal-50  justify-center">
  // //                 View Scheme Details & Eligibility 
  // //               </button> */}
  // //                   </div>
  // //                   <div className="overflow-x-auto rounded-lg border border-gray-100">
  // //                     <table className="w-full min-w-[680px] border-collapse text-left">
  // //                       <thead>
  // //                         <tr className="bg-slate-50">
  // //                           {[
  // //                             "Scheme / Program",
  // //                             "Type",
  // //                             "Applicable On",
  // //                             "Rate / Benefit",
  // //                             "Estimated Benefit (INR)",
  // //                             "Eligibility",
  // //                           ].map((heading) => (
  // //                             <th
  // //                               key={heading}
  // //                               className="whitespace-nowrap px-3 py-3 text-[10px] font-semibold text-slate-500"
  // //                             >
  // //                               {heading}
  // //                             </th>
  // //                           ))}
  // //                         </tr>
  // //                       </thead>
  // //                       <tbody>
  // //                         {(Array.isArray(estimateBreakdown) ? estimateBreakdown : []).map((row, i) => {
  // //                           const schemeName = row.scheme || row.name || row.scheme_name || row.program || "Incentive scheme";
  // //                           const schemeDescription = row.fullName || row.description || row.full_name || "";
  // //                           const schemeType = row.type || row.scheme_type || row.category || "Central";
  // //                           const eligibilityRaw = row.eligibility || row.status || (row.eligible === true ? "Eligible" : row.eligible === false ? "Not eligible" : "Not specified");
  // //                           const isEligible = row.eligible === true || String(eligibilityRaw).toLowerCase() === "eligible";
  // //                           const rate = row.rate ?? row.rate_pct ?? row.rate_percent ?? row.benefit_rate;
  // //                           const rateLabel = rate === undefined || rate === null || rate === "" ? "—" : (typeof rate === "number" && !String(rate).includes("%") ? `${rate}%` : rate);
  // //                           const benefit = readMetric(row, ["benefit", "estimated_benefit", "benefit_inr", "amount", "amount_inr", "value"]);
  // //                           const typeClass = /state/i.test(String(schemeType))
  // //                             ? "bg-amber-50 text-amber-700"
  // //                             : "bg-emerald-50 text-emerald-700";

  // //                           return (
  // //                             <tr key={row.id || row.scheme_code || `${schemeName}-${i}`} className="border-t border-slate-100 hover:bg-slate-50/70">
  // //                               <td className="px-3 py-3 align-middle">
  // //                                 <p className="text-[11px] font-semibold text-slate-900">{schemeName}</p>
  // //                                 {schemeDescription && <p className="mt-0.5 max-w-[260px] text-[9px] leading-4 text-slate-400">{schemeDescription}</p>}
  // //                               </td>
  // //                               <td className="px-3 py-3 align-middle">
  // //                                 <span className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[9px] font-semibold ${typeClass}`}>
  // //                                   {schemeType}
  // //                                 </span>
  // //                               </td>
  // //                               <td className="whitespace-nowrap px-3 py-3 text-[10px] font-medium text-slate-600">
  // //                                 {row.applicableOn || row.applicable_on || row.basis || "Export Value"}
  // //                               </td>
  // //                               <td className="whitespace-nowrap px-3 py-3 text-[10px] font-semibold text-slate-800">{rateLabel}</td>
  // //                               <td className="whitespace-nowrap px-3 py-3 text-[10px] font-bold text-slate-900">{formatINR(benefit)}</td>
  // //                               <td className="px-3 py-3">
  // //                                 <span className={`inline-flex items-center gap-1 whitespace-nowrap text-[10px] font-semibold ${isEligible ? "text-emerald-600" : "text-slate-400"}`}>
  // //                                   {isEligible ? <FiCheckCircle size={12} /> : <FiXCircle size={12} />}
  // //                                   {String(eligibilityRaw).replaceAll("_", " ").replace(/^\w/, (c) => c.toUpperCase())}
  // //                                 </span>
  // //                               </td>
  // //                             </tr>
  // //                           );
  // //                         })}
  // //                         {!estimateBreakdown.length && (
  // //                           <tr className="border-t border-slate-100">
  // //                             <td colSpan={6} className="px-3 py-6 text-center text-[11px] text-slate-400">
  // //                               {apiResults?.estimate
  // //                                 ? "The API did not return a line-item breakdown. See the complete response in Report Information."
  // //                                 : "Run a calculation to view actual scheme-wise benefits."}
  // //                             </td>
  // //                           </tr>
  // //                         )}
  // //                       </tbody>
  // //                       <tfoot>
  // //                         <tr className="border-t border-slate-200 bg-white">
  // //                           <td colSpan={4} className="px-3 py-3 text-right text-[11px] font-bold text-slate-900">
  // //                             Total Estimated Incentive
  // //                           </td>
  // //                           <td colSpan={2} className="px-3 py-3 text-[12px] font-bold text-emerald-600">
  // //                             {formatINR(incentiveTotal)}
  // //                           </td>
  // //                         </tr>
  // //                       </tfoot>
  // //                     </table>
  // //                   </div>
  // //                 </div>
  // //               )}

  // //               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 min-w-0 mb-4">
  // //                 <div className="bg-white border border-gray-200 rounded-xl p-4  ">
  // //                   <p className="text-sm font-semibold text-gray-800 mb-3">
  // //                     Data Sources Used
  // //                   </p>
  // //                   <div className="grid grid-cols-2 gap-y-2 gap-x-3">
  // //                     {dataSources.map(({ icon: Icon, label }) => (
  // //                       <div
  // //                         key={label}
  // //                         className="flex min-w-0 items-start gap-1.5 text-xs leading-4 text-gray-600 break-words"
  // //                       >
  // //                         <Icon
  // //                           size={12}
  // //                           className="text-gray-400 flex-shrink-0"
  // //                         />
  // //                         <span className="min-w-0 break-words">{label}</span>
  // //                       </div>
  // //                     ))}
  // //                   </div>
  // //                   {/* <button className="mt-3 text-teal-500 text-xs font-medium hover:underline flex items-center gap-1">
  // //                 View All Sources <FiChevronRight size={12} />
  // //               </button> */}
  // //                 </div>

  // //                 <div className="bg-white border border-gray-200 rounded-xl p-4">
  // //                   <p className="text-sm font-semibold text-gray-800 mb-3">
  // //                     Assumptions
  // //                   </p>
  // //                   <ul className="flex flex-col gap-1.5">
  // //                     {assumptions.map((a, i) => (
  // //                       <li
  // //                         key={i}
  // //                         className="flex items-start gap-1.5 text-xs text-gray-600"
  // //                       >
  // //                         <span className="text-gray-400 mt-0.5 flex-shrink-0">
  // //                           •
  // //                         </span>{" "}
  // //                         {a}
  // //                       </li>
  // //                     ))}
  // //                   </ul>
  // //                 </div>

  // //                 <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col justify-between">
  // //                   <div>
  // //                     <p className="text-sm font-semibold text-gray-800 mb-2">
  // //                       Disclaimer
  // //                     </p>
  // //                     <p className="text-xs text-gray-600 leading-relaxed">
  // //                       Incentives are subject to change as per government
  // //                       notifications. Please verify with official sources before
  // //                       making any business decisions.
  // //                     </p>
  // //                     {/* <button className="mt-2 text-blue-500 text-xs font-medium hover:underline">Read Full Disclaimer</button> */}
  // //                   </div>
  // //                 </div>

  // //                 <div className="bg-white border border-gray-200 rounded-xl p-4">
  // //                   <p className="text-sm font-semibold text-gray-800 mb-1">
  // //                     Need Help?
  // //                   </p>
  // //                   <p className="text-xs text-gray-500 mb-2 pt-3">
  // //                     Our trade experts are here to help you.
  // //                   </p>
  // //                   <div className="flex items-center gap-1.5 text-xs pt-2 text-gray-600 mb-1">
  // //                     <FiPhone size={11} className="text-teal-500 " /> +91 22 1234
  // //                     5678
  // //                   </div>
  // //                   <div className="flex items-center gap-1.5 text-xs pt-2 text-gray-600 mb-3">
  // //                     <FiMail size={11} className="text-teal-500" />{" "}
  // //                     support@asdcargomate.com
  // //                   </div>
  // //                   {/* <button className="w-full border border-gray-200 text-gray-700 text-xs font-medium py-2 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-1.5">
  // //                   <FiMessageSquare size={12} /> Chat with Expert
  // //                 </button> */}
  // //                 </div>
  // //               </div>
  // //             </div>

  // //             <div className="flex flex-col gap-4">
  // //               <div className="bg-white border border-gray-200 rounded-xl p-4">
  // //                 <p className="text-sm font-semibold text-gray-900 mb-3">
  // //                   Result Summary
  // //                 </p>
  // //                 {[
  // //                   {
  // //                     icon: FiCheckCircle,
  // //                     iconColor: "text-teal-500",
  // //                     label: "Best Applicable Scheme",
  // //                     value:
  // //                       apiResults?.estimate?.best_scheme ||
  // //                       apiResults?.estimate?.best_applicable_scheme ||
  // //                       "See API result",
  // //                     valueColor: "",
  // //                   },
  // //                   {
  // //                     icon: FiAlertCircle,
  // //                     iconColor: "text-teal-500",
  // //                     label: "Total Incentive (INR)",
  // //                     value: formatINR(incentiveTotal),
  // //                     valueColor: "",
  // //                   },
  // //                   {
  // //                     icon: FiAlertTriangle,
  // //                     iconColor: "text-orange-400",
  // //                     label: "Estimated MEIS (INR)",
  // //                     value: formatINR(meisTotal),
  // //                     valueColor: "",
  // //                   },
  // //                   // {
  // //                   //   icon: FiInfo,
  // //                   //   iconColor: "text-blue-400",
  // //                   //   label: "Based On",
  // //                   //   value: apiResults?.estimate?.sources[0] ||
  // //                   //      "Live API calculation",
  // //                   //   valueColor: "",
  // //                   // },
  // //                   {
  // //   icon: FiInfo,
  // //   iconColor: "text-blue-400",
  // //   label: "Based On",
  // //   value: Array.isArray(apiResults?.estimate?.sources)
  // //     && apiResults.estimate.sources.length > 0
  // //       ? apiResults.estimate.sources.join(", ")
  // //       : "Live API calculation",
  // //   valueColor: "",
  // // },
  // //                   {
  // //                     icon: FiCheckCircle,
  // //                     iconColor: "text-emerald-500",
  // //                     label: "Input Tax Credit",
  // //                     value:
  // //                       apiResults?.estimate?.input_tax_credit ??
  // //                       apiResults?.estimate?.inputTaxCredit ??
  // //                       "Not supplied",
  // //                     valueColor: "",
  // //                   },
  // //                 ].map(({ icon: Icon, iconColor, label, value }, i) => (
  // //                   <div
  // //                     key={i}
  // //                     className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0 text-xs gap-2"
  // //                   >
  // //                     <div className="flex items-center gap-2 text-gray-500">
  // //                       <Icon size={13} className={iconColor} /> {label}
  // //                     </div>
  // //                     <span className="font-semibold text-gray-900 text-right">
  // //                       {value}
  // //                     </span>
  // //                   </div>
  // //                 ))}
  // //                 <button
  // //                   onClick={() => {
  // //                     setShipment("shipment");
  // //                     setActiveTab("");
  // //                   }}
  // //                   className="mt-3 w-full bg-teal-500 hover:bg-teal-600 text-white text-xs font-semibold py-2.5 rounded-xl"
  // //                 >
  // //                   Create Shipment
  // //                 </button>
  // //               </div>

  // //               {hasSearched && reportInfo && (
  // //                 <div className="bg-white border border-gray-200 rounded-xl p-4">
  // //                   <p className="text-sm font-semibold text-gray-900 mb-3">
  // //                     Report Information
  // //                   </p>
  // //                 {[
  // //                   ["Report ID", reportInfo?.id || "Not generated yet"],
  // //                   [
  // //                     "Generated On",
  // //                     reportInfo?.generatedAt
  // //                       ? new Date(reportInfo.generatedAt).toLocaleString()
  // //                       : "—",
  // //                   ],
  // //                   [
  // //                     "Generated By",
  // //                     reportInfo?.generatedBy ||
  // //                       localStorage.getItem("userName") ||
  // //                       localStorage.getItem("name") ||
  // //                       "Current user",
  // //                   ],
  // //                   ["Product", search.product || "—"],
  // //                   ["HS Code", search.hsCode || "—"],
  // //                   ["Shipment Value (INR)", search.value || "—"],
  // //                   [
  // //                     "Estimated Incentive (INR)",
  // //                     formatINR(
  // //                       readMetric(reportInfo?.result?.estimate, [
  // //                         "estimated_total_incentive",
  // //                         "estimated_total_incentive_inr",
  // //                         "total_incentive",
  // //                         "total_incentive_inr",
  // //                         "total_benefit",
  // //                         "data.total_incentive",
  // //                         "result.total_incentive",
  // //                       ]),
  // //                     ),
  // //                   ],
  // //                   [
  // //                     "Estimated MEIS Benefit (INR)",
  // //                     formatINR(
  // //                       readMetric(reportInfo?.result?.meis, [
  // //                         "estimated_total_meis_benefit",
  // //                         "estimated_meis_benefit",
  // //                         "total_meis_benefit",
  // //                         "meis_benefit",
  // //                         "total_benefit",
  // //                         "estimated_benefit",
  // //                         "data.total_meis_benefit",
  // //                         "result.meis_benefit",
  // //                       ]),
  // //                     ),
  // //                   ],
  // //                 ].map(([k, v]) => (
  // //                   <div
  // //                     key={k}
  // //                     className="flex justify-between py-1.5 text-[11px] border-b border-gray-100 last:border-0"
  // //                   >
  // //                     <span className="text-gray-500">{k}</span>
  // //                     <span className="text-gray-800 font-medium">{v}</span>
  // //                   </div>
  // //                 ))}
  // //                 {/* {reportInfo && (
  // //                   <details className="mt-3 text-[11px] text-gray-500">
  // //                     <summary className="cursor-pointer font-semibold">
  // //                       View complete calculation report
  // //                     </summary>
  // //                     <pre className="mt-2 max-h-48 overflow-auto whitespace-pre-wrap break-words rounded-lg bg-gray-50 p-2">
  // //                       {JSON.stringify(reportInfo, null, 2)}
  // //                     </pre>
  // //                   </details>
  // //                 )} */}
  // //                   <button
  // //                     type="button"
  // //                     onClick={handleDownloadPdf}
  // //                     className="mt-3 w-full flex items-center justify-center gap-2 border border-gray-200 bg-white text-teal-600 text-xs font-medium py-2 rounded-lg hover:bg-teal-50"
  // //                   >
  // //                     <FiDownload size={12} /> Download Report (PDF)
  // //                   </button>
  // //                 </div>
  // //               )}

  // //               <div className="bg-white border border-gray-200 rounded-xl p-4">
  // //                 <p className="text-sm font-semibold text-gray-900 mb-1">
  // //                   Save & Share
  // //                 </p>
  // //                 <p className="text-[11px] text-gray-500 mb-3">
  // //                   Save this report for future reference or share with your team.
  // //                 </p>
  // //                 <div className="grid grid-cols-2 gap-2">
  // //                   <button className="flex items-center justify-center gap-1 border border-gray-200 bg-white text-gray-700 text-[11px] font-medium py-2 rounded-lg hover:bg-gray-50">
  // //                     <FiBookmark size={14} /> Save to Saved Reports
  // //                   </button>
  // //                   <button className="flex items-center justify-center gap-1.5 border border-gray-200 bg-white text-gray-700 text-[11px] font-medium py-2 rounded-lg hover:bg-gray-50">
  // //                     <FiShare2 size={12} /> Share Report
  // //                   </button>
  // //                 </div>
  // //               </div>

  // //               <div className="bg-white border border-gray-200 rounded-xl p-4">
  // //                 <div className="flex items-center justify-between mb-3">
  // //                   <p className="text-sm font-semibold text-gray-900">
  // //                     Audit Log (This Search)
  // //                   </p>
  // //                   <span className="text-[10px] text-gray-400">
  // //                     {auditEntries.length} events
  // //                   </span>
  // //                 </div>
  // //                 {auditEntries.length ? (
  // //                   auditEntries.slice(0, 6).map((entry) => (
  // //                     <div
  // //                       key={entry.id}
  // //                       className="flex items-start gap-2 py-1.5 border-b border-gray-100 last:border-0"
  // //                     >
  // //                       <span className="w-2 h-2 rounded-full bg-teal-500 flex-shrink-0 mt-1" />
  // //                       <span className="text-[10px] text-gray-400 whitespace-nowrap">
  // //                         {entry.time}
  // //                       </span>
  // //                       <span className="text-[11px] text-gray-600">
  // //                         {entry.text}
  // //                       </span>
  // //                     </div>
  // //                   ))
  // //                 ) : (
  // //                   <p className="text-[11px] text-gray-400">
  // //                     Successful incentive searches will appear here.
  // //                   </p>
  // //                 )}
  // //               </div>
         
  // //             <DashboardAdPlacement location="User Dashboard - Incentive Checker" />

  // //             </div>
  // //           </div>

       
  // //         </div>
  // //       )}

  // //       {shipment === "shipment" && (
  // //         <div>
  // //           <Shipment
  // //             setActiveTab={setActiveTab}
  // //             setShipment={setShipment}
  // //             currentTab={"Incentive Checker"}
  // //           />
  // //         </div>
  // //       )}
  // //     </div>
  // //   );
  // // }


  
  // import { useEffect, useState } from "react";
  // import {
  //   FiArrowLeft,
  //   FiSave,
  //   FiDownload,
  //   FiPlus,
  //   FiCopy,
  //   FiChevronRight,
  //   FiExternalLink,
  //   FiDatabase,
  //   FiPhone,
  //   FiMail,
  //   FiCheckCircle,
  //   FiXCircle,
  //   FiShare2,
  //   FiBookmark,
  //   FiMessageSquare,
  //   FiInfo,
  //   FiAlertTriangle,
  //   FiAlertCircle,
  //   FiBell,
  //   FiGrid,
  //   FiX,
  // } from "react-icons/fi";
  // import {
  //   MdOutlineAccountBalance,
  //   MdOutlineLocationOn,
  //   MdOutlineOpenInNew,
  // } from "react-icons/md";
  // import { BsGraphUpArrow } from "react-icons/bs";
  // import Shipment from "../../components/ShipmentForm";
  // import poster2 from "../../assets/Images/webp/poster2.webp";
  // import DashboardAdPlacement from "../../components/DashboardAdPlacement";
  // import { estimateIncentives, calculateMeis } from "../../api/CargoMateApi";

  // const breakdownRows = [
  //   {
  //     scheme: "RoDTEP",
  //     fullName: "Remission of Duties or Taxes on Exported Products",
  //     type: "Central",
  //     typeColor: "bg-emerald-100 text-emerald-700",
  //     applicableOn: "Export Value",
  //     rate: "4%",
  //     benefit: "₹4,992",
  //     eligibility: "Eligible",
  //     eligible: true,
  //   },
  //   {
  //     scheme: "Drawbacks",
  //     fullName: "",
  //     type: "Central",
  //     typeColor: "bg-emerald-100 text-emerald-700",
  //     applicableOn: "Export Value",
  //     rate: "0.5%",
  //     benefit: "₹624",
  //     eligibility: "Eligible",
  //     eligible: true,
  //   },
  //   // {
  //   //   scheme: "State Incentive – Tamil Nadu",
  //   //   fullName: "Export Promotion Policy",
  //   //   type: "State",
  //   //   typeColor: "bg-orange-100 text-orange-600",
  //   //   applicableOn: "Export Value",
  //   //   rate: "2%",
  //   //   benefit: "₹2,496",
  //   //   eligibility: "Eligible",
  //   //   eligible: true,
  //   // },
  //   // {
  //   //   scheme: "IGST Refund (on Exports)",
  //   //   fullName: "",
  //   //   type: "Central",
  //   //   typeColor: "bg-emerald-100 text-emerald-700",
  //   //   applicableOn: "Tax Paid",
  //   //   rate: "0%",
  //   //   benefit: "₹0",
  //   //   eligibility: "Not Applicable",
  //   //   eligible: false,
  //   // },
  // ];

  // const auditLog = [
  //   {
  //     color: "bg-teal-500",
  //     time: "09:25 AM",
  //     text: "Search Submitted by Arjun Soni",
  //   },
  //   { color: "bg-teal-500", time: "09:25 AM", text: "Data Validated" },
  //   { color: "bg-teal-500", time: "09:25 AM", text: "Incentives Matched" },
  //   { color: "bg-teal-500", time: "09:25 AM", text: "Result Generated" },
  //   { color: "bg-teal-500", time: "09:25 AM", text: "Report Saved" },
  // ];

  // const assumptions = [
  //   "Product is 100% cotton, knitted, for men.",
  //   "Shipment value and details provided are correct.",
  //   "Export under HS code 6109.10.00.",
  //   "Input Tax Credit is available.",
  //   "Rates are as per current notifications and may change.",
  // ];

  // const dataSources = [
  //   { icon: FiDatabase, label: "DGFT (India)" },
  //   { icon: FiDatabase, label: "Trade APIs" },
  //   { icon: FiDatabase, label: "ICEGATE" },
  //   { icon: FiBell, label: "Notifications" },
  //   { icon: FiGrid, label: "State Export Policies" },
  //   { icon: FiDatabase, label: "Public Schemes Database" },
  // ];

  // const emptySearch = {
  //   hsCode: "",
  //   product: "",
  //   origin: "",
  //   destination: "",
  //   value: "",
  //   quantity: "",
  //   meis_rate_pct: "10",
  // };

  // function SearchPopup({ onClose, onSubmit, initial }) {
  //   const [form, setForm] = useState(initial);
  //   const [error, setError] = useState("");

  //   function handleChange(e) {
  //     setForm({ ...form, [e.target.name]: e.target.value });
  //     if (error) setError("");
  //   }

  //   function handleSubmit(e) {
  //     e.preventDefault();
  //     if (!form.hsCode.trim()) {
  //       setError("HS Code is required");
  //       return;
  //     }
  //     onSubmit(form);
  //   }

  //   const fields = [
  //     {
  //       name: "hsCode",
  //       label: "HS Code",
  //       placeholder: "e.g. 6109.10.00",
  //       required: true,
  //     },
  //     {
  //       name: "product",
  //       label: "Product",
  //       placeholder: "e.g. T-shirts, singlets and other vests, of cotton",
  //     },
  //     { name: "origin", label: "Origin Country", placeholder: "e.g. India" },
  //     {
  //       name: "destination",
  //       label: "Destination Country",
  //       placeholder: "e.g. United Arab Emirates (UAE)",
  //     },
  //     { name: "value", label: "Shipment Value", placeholder: "e.g. ₹1,24,680" },
  //     { name: "quantity", label: "Quantity", placeholder: "e.g. 500" },
  //     {
  //       name: "meis_rate_pct",
  //       label: "MEIS Rate (%)",
  //       placeholder: "e.g. 10",
  //       type: "number",
  //     },
  //   ];

  //   return (
  //     <div
  //       className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
  //       onClick={onClose}
  //     >
  //       <form
  //         onSubmit={handleSubmit}
  //         onClick={(e) => e.stopPropagation()}
  //         className="bg-white rounded-xl border border-gray-200 shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto "
  //       >
  //         <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-gray-100">
  //           <div className="flex items-center gap-2">
  //             <div className="w-9 h-9 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
  //               <FiDatabase className="text-blue-500 text-base" />
  //             </div>
  //             <div>
  //               <p className="text-sm font-semibold text-gray-900">Your Search</p>
  //               <p className="text-[11px] text-gray-500">
  //                 Enter shipment details to check applicable incentives.
  //               </p>
  //             </div>
  //           </div>
  //           <button
  //             type="button"
  //             onClick={onClose}
  //             aria-label="Close"
  //             className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100"
  //           >
  //             <FiX size={16} />
  //           </button>
  //         </div>

  //         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 sm:px-5 py-4">
  //           {fields.map(({ name, label, placeholder, required, type }) => (
  //             <div
  //               key={name}
  //               className={name === "product" ? "sm:col-span-2" : ""}
  //             >
  //               <label
  //                 htmlFor={name}
  //                 className="block text-[10px] text-gray-400 font-medium mb-1"
  //               >
  //                 {label}
  //                 {required && <span className="text-red-400"> *</span>}
  //               </label>
  //               <input
  //                 id={name}
  //                 name={name}
  //                 type={type || "text"}
  //                 min={type === "number" ? "0" : undefined}
  //                 step={type === "number" ? "any" : undefined}
  //                 value={form[name] ?? ""}
  //                 required={required || name === "meis_rate_pct"}
  //                 onChange={handleChange}
  //                 placeholder={placeholder}
  //                 autoFocus={name === "hsCode"}
  //                 className={`w-full border rounded-lg px-3 py-2 text-xs font-semibold text-gray-800 placeholder:font-normal placeholder:text-gray-400 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 ${
  //                   name === "hsCode" && error
  //                     ? "border-red-300"
  //                     : "border-gray-200"
  //                 }`}
  //               />
  //               {name === "hsCode" && error && (
  //                 <p className="text-[10px] text-red-500 mt-1">{error}</p>
  //               )}
  //             </div>
  //           ))}
  //         </div>

  //         <div className="flex items-center justify-end gap-2 px-4 sm:px-5 py-3 border-t border-gray-100">
  //           <button
  //             type="button"
  //             onClick={onClose}
  //             className="border border-gray-200 bg-white text-gray-700 text-xs font-medium px-4 py-2 rounded-lg hover:bg-gray-50"
  //           >
  //             Cancel
  //           </button>
  //           <button
  //             type="submit"
  //             className="bg-teal-500 hover:bg-teal-600 text-white text-xs font-semibold px-4 py-2 rounded-lg"
  //           >
  //             Submit
  //           </button>
  //         </div>
  //       </form>
  //     </div>
  //   );
  // }

  // const getIncentiveUserScope = () => {
  //   for (const key of ["userId", "user_id", "email", "userEmail"]) {
  //     const value = localStorage.getItem(key);
  //     if (value) return value.toLowerCase().replace(/[^a-z0-9_-]/g, "_");
  //   }
  //   for (const key of ["currentUser", "user", "userInfo"]) {
  //     try {
  //       const value = JSON.parse(localStorage.getItem(key) || "null");
  //       if (value?.id || value?._id || value?.email)
  //         return String(value.id || value._id || value.email)
  //           .toLowerCase()
  //           .replace(/[^a-z0-9_-]/g, "_");
  //     } catch {}
  //   }
  //   return "current_user";
  // };

  // const readMetric = (source, keys) => {
  //   if (!source) return null;
  //   for (const key of keys) {
  //     const parts = key.split(".");
  //     let value = source;
  //     for (const part of parts) value = value?.[part];
  //     if (
  //       value !== undefined &&
  //       value !== null &&
  //       value !== "" &&
  //       Number.isFinite(Number(value))
  //     )
  //       return Number(value);
  //   }
  //   return null;
  // };
  // const formatINR = (value) =>
  //   value == null
  //     ? "—"
  //     : new Intl.NumberFormat("en-IN", {
  //         style: "currency",
  //         currency: "INR",
  //         maximumFractionDigits: 2,
  //       }).format(value);
  // const makeReportId = () =>
  //   `INC-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

  // export default function IncentiveChecker() {
  //   const [copied, setCopied] = useState(false);
  //   const [showPopup, setShowPopup] = useState(true);
  //   const [showDetails, setShowDetails] = useState(false);
  //   const [search, setSearch] = useState(emptySearch);
  //   const [shipment, setShipment] = useState("");
  //   const [activeTab, setActiveTab] = useState("Incentive Checker");
  //   const [apiResults, setApiResults] = useState(null);
  //   const [apiLoading, setApiLoading] = useState(false);
  //   const [apiError, setApiError] = useState("");
  //   // Keep Report Information hidden until the user completes a search in this session.
  //   const [hasSearched, setHasSearched] = useState(false);
  //   const [reportInfo, setReportInfo] = useState(() => {
  //     try {
  //       const saved = JSON.parse(
  //         localStorage.getItem(
  //           `cargomate_incentive_reports_${getIncentiveUserScope()}`,
  //         ) || "[]",
  //       );
  //       return saved[0] || null;
  //     } catch {
  //       return null;
  //     }
  //   });
  //   const [auditEntries, setAuditEntries] = useState(() => {
  //     try {
  //       return JSON.parse(
  //         localStorage.getItem(
  //           `cargomate_incentive_audit_${getIncentiveUserScope()}`,
  //         ) || "[]",
  //       );
  //     } catch {
  //       return [];
  //     }
  //   });
  //   const [showAllAuditModal, setShowAllAuditModal] = useState(false);
  //   const [auditPage, setAuditPage] = useState(1);
  //   const AUDIT_PAGE_SIZE = 15;
  //   const auditPageCount = Math.max(1, Math.ceil(auditEntries.length / AUDIT_PAGE_SIZE));
  //   const paginatedAuditEntries = auditEntries.slice(
  //     (auditPage - 1) * AUDIT_PAGE_SIZE,
  //     auditPage * AUDIT_PAGE_SIZE,
  //   );

  //   useEffect(() => {
  //     localStorage.setItem(
  //       `cargomate_incentive_audit_${getIncentiveUserScope()}`,
  //       JSON.stringify(auditEntries.slice(0, 50)),
  //     );
  //   }, [auditEntries]);

  //   const runIncentiveCheck = async (data) => {
  //     setApiLoading(true);
  //     setApiError("");
  //     setApiResults(null);
  //     const numericValue = Number(
  //       String(data.value || "").replace(/[^0-9.]/g, ""),
  //     );
  //     const numericQuantity = Number(
  //       String(data.quantity || "").replace(/[^0-9.]/g, ""),
  //     );
  //     const numericMeisRate = Number(data.meis_rate_pct);
  //     if (!Number.isFinite(numericValue) || numericValue <= 0) {
  //       setApiError("Enter a valid Shipment Value greater than zero.");
  //       setApiLoading(false);
  //       return;
  //     }
  //     if (!Number.isFinite(numericQuantity) || numericQuantity <= 0) {
  //       setApiError("Enter a valid Quantity greater than zero.");
  //       setApiLoading(false);
  //       return;
  //     }
  //     if (!Number.isFinite(numericMeisRate) || numericMeisRate < 0) {
  //       setApiError("Enter a valid MEIS Rate (%).");
  //       setApiLoading(false);
  //       return;
  //     }
  //     try {
  //       const payload = {
  //         hs_code: data.hsCode,
  //         fob_value: Number(String(data.value || "").replace(/[^0-9.]/g, "")),
  //         quantity: Number(String(data.quantity || "").replace(/[^0-9.]/g, "")),
  //         meis_rate_pct: Number(data.meisRatePct || 0),
  //       };

  //       // Keep both endpoints as POST requests with JSON bodies.
  //       const [estimate, meis] = await Promise.allSettled([
  //         estimateIncentives(payload),
  //         calculateMeis(payload),
  //       ]);
  //       const results = {
  //         estimate:
  //           estimate.status === "fulfilled"
  //             ? (estimate.value?.data ?? estimate.value)
  //             : null,
  //         meis:
  //           meis.status === "fulfilled" ? (meis.value?.data ?? meis.value) : null,
  //       };
  //       if (!results.estimate && !results.meis)
  //         throw (
  //           estimate.reason || meis.reason || new Error("Incentive APIs failed")
  //         );
  //       setApiResults(results);
  //       const generatedAt = new Date().toISOString();
  //       const report = {
  //         id: makeReportId(),
  //         generatedAt,
  //         generatedBy:
  //           localStorage.getItem("userName") ||
  //           localStorage.getItem("name") ||
  //           "Current user",
  //         input: payload,
  //         result: results,
  //       };
  //       setReportInfo(report);
  //       setHasSearched(true);
  //       try {
  //         const reportKey = `cargomate_incentive_reports_${getIncentiveUserScope()}`;
  //         const existingReports = JSON.parse(
  //           localStorage.getItem(reportKey) || "[]",
  //         );
  //         localStorage.setItem(
  //           reportKey,
  //           JSON.stringify(
  //             [
  //               report,
  //               ...existingReports.filter((item) => item.id !== report.id),
  //             ].slice(0, 50),
  //           ),
  //         );
  //       } catch (storageError) {
  //         console.warn(
  //           "Unable to persist incentive report locally",
  //           storageError,
  //         );
  //       }
  //       const entry = {
  //         id: report.id,
  //         time: new Date(generatedAt).toLocaleTimeString([], {
  //           hour: "2-digit",
  //           minute: "2-digit",
  //         }),
  //         text: `Incentive and MEIS estimate generated for ${data.product || data.hsCode}`,
  //         createdAt: generatedAt,
  //       };
  //       setAuditEntries((prev) => [entry, ...prev].slice(0, 50));
  //       if (estimate.status === "rejected" || meis.status === "rejected") {
  //         setApiError(
  //           [
  //             estimate.status === "rejected"
  //               ? `Incentive estimate failed: ${estimate.reason?.message || "request failed"}`
  //               : "",
  //             meis.status === "rejected"
  //               ? `MEIS estimate failed: ${meis.reason?.message || "request failed"}`
  //               : "",
  //           ]
  //             .filter(Boolean)
  //             .join(" · "),
  //         );
  //       }
  //     } catch (err) {
  //       setApiError(
  //         err?.response?.data?.detail ||
  //           err?.response?.data?.message ||
  //           err.message ||
  //           "Unable to calculate incentives.",
  //       );
  //     } finally {
  //       setApiLoading(false);
  //     }
  //   };

  //   // function handleCopy() {
  //   //   setCopied(true);
  //   //   setTimeout(() => setCopied(false), 1500);
  //   // }

  //   const showView = () => {
  //     setShowDetails(true);
  //     setTimeout(() => {
  //       document
  //         .getElementById("sectionId")
  //         ?.scrollIntoView({ behavior: "smooth", block: "center" });
  //     }, 100);
  //   };
  //   const estimateBreakdown =
  //     apiResults?.estimate?.breakdown ||
  //     apiResults?.estimate?.schemes ||
  //     apiResults?.estimate?.incentives ||
  //     apiResults?.estimate?.data?.breakdown ||
  //     apiResults?.estimate?.result?.breakdown ||
  //     [];
  //   const incentiveTotal = readMetric(apiResults?.estimate, [
  //     "total_estimated_incentive",
  //     "estimated_total_incentive_inr",
  //     "total_incentive",
  //     "total_incentive_inr",
  //     "total_benefit",
  //     "data.total_incentive",
  //     "result.total_incentive",
  //   ]);
  //   const meisTotal = readMetric(apiResults?.meis, [
  //     "estimated_total_meis_benefit",
  //     "estimated_meis_benefit",
  //     "total_meis_benefit",
  //     "meis_benefit",
  //     "total_benefit",
  //     "estimated_benefit",
  //     "data.total_meis_benefit",
  //     "result.meis_benefit",
  //   ]);

  //   const handleDownloadPdf = () => {
  //     if (!reportInfo) {
  //       window.alert("Please run an incentive calculation before downloading the report.");
  //       return;
  //     }

  //     const escapeHtml = (value) =>
  //       String(value ?? "—").replace(/[&<>"']/g, (char) => ({
  //         "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  //       })[char]);

  //     const report = reportInfo;
  //     const reportSearch = search || emptySearch;
  //     const result = report.result || apiResults || {};
  //     const estimate = result.estimate || {};
  //     const rows = estimate.breakdown || estimate.schemes || estimate.incentives ||
  //       estimate.data?.breakdown || estimate.result?.breakdown || [];
  //     const total = readMetric(estimate, [
  //       "total_estimated_incentive", "estimated_total_incentive_inr",
  //       "total_incentive", "total_incentive_inr", "total_benefit",
  //       "data.total_incentive", "result.total_incentive",
  //     ]);
  //     const inputRows = [
  //       ["HS Code", report.input?.hs_code || reportSearch.hsCode],
  //       ["Product", reportSearch.product],
  //       ["Origin Country", reportSearch.origin],
  //       ["Destination Country", reportSearch.destination],
  //       ["Shipment Value", report.input?.fob_value ?? reportSearch.value],
  //       ["Quantity", report.input?.quantity ?? reportSearch.quantity],
  //       ["MEIS Rate (%)", report.input?.meis_rate_pct ?? reportSearch.meis_rate_pct],
  //     ];
  //     const inputHtml = inputRows.map(([label, value]) =>
  //       `<div class="field"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`
  //     ).join("");
  //     const tableRows = (Array.isArray(rows) ? rows : []).map((row) => {
  //       const scheme = row.scheme || row.name || row.scheme_name || row.program || "Incentive scheme";
  //       const type = row.type || row.scheme_type || row.category || "Central";
  //       const applicable = row.applicableOn || row.applicable_on || row.basis || "Export Value";
  //       const rate = row.rate ?? row.rate_pct ?? row.rate_percent ?? row.benefit_rate;
  //       const rateText = rate == null || rate === "" ? "—" :
  //         (typeof rate === "number" ? `${rate}%` : rate);
  //       const benefit = readMetric(row, ["benefit", "estimated_benefit", "benefit_inr", "amount", "amount_inr", "value"]);
  //       const eligibility = row.eligibility || row.status ||
  //         (row.eligible === true ? "Eligible" : row.eligible === false ? "Not eligible" : "Not specified");
  //       return `<tr><td><strong>${escapeHtml(scheme)}</strong><small>${escapeHtml(row.fullName || row.description || row.full_name || "")}</small></td><td>${escapeHtml(type)}</td><td>${escapeHtml(applicable)}</td><td>${escapeHtml(rateText)}</td><td>${escapeHtml(formatINR(benefit))}</td><td>${escapeHtml(String(eligibility).replaceAll("_", " "))}</td></tr>`;
  //     }).join("");
  //     const generatedOn = report.generatedAt ? new Date(report.generatedAt).toLocaleString() : new Date().toLocaleString();
  //     const popup = window.open("", "_blank", "width=1000,height=750");
  //     if (!popup) {
  //       window.alert("Please allow pop-ups to generate your PDF report.");
  //       return;
  //     }
  //     popup.document.open();
  //     popup.document.write(`<!doctype html>
  // <html><head><meta charset="utf-8"><title>${escapeHtml(report.id)} - Incentive Report</title>
  // <style>
  //   @page { size: A4 landscape; margin: 14mm; }
  //   * { box-sizing: border-box; } body { font: 12px Arial, sans-serif; color: #172033; margin: 0; }
  //   header { display:flex; justify-content:space-between; align-items:flex-start; border-bottom:2px solid #0d9488; padding-bottom:14px; margin-bottom:18px; }
  //   h1 { font-size:22px; margin:0 0 5px; } .muted { color:#64748b; font-size:10px; }
  //   .meta { text-align:right; font-size:10px; line-height:1.7; }
  //   h2 { font-size:14px; margin:18px 0 9px; }
  //   .fields { display:grid; grid-template-columns:repeat(4,1fr); gap:8px; }
  //   .field { border:1px solid #e2e8f0; border-radius:6px; padding:9px; min-width:0; overflow-wrap:anywhere; }
  //   .field span { display:block; color:#64748b; font-size:10px; margin-bottom:5px; }
  //   .field strong { font-size:11px; } table { width:100%; border-collapse:collapse; margin-top:8px; }
  //   th { background:#f1f5f9; color:#475569; font-size:10px; text-align:left; }
  //   th,td { padding:9px 8px; border-bottom:1px solid #e2e8f0; vertical-align:top; }
  //   td { font-size:10px; } small { display:block; color:#64748b; margin-top:3px; font-size:9px; }
  //   tfoot td { font-weight:bold; color:#059669; font-size:12px; }
  //   .notice { margin-top:14px; color:#64748b; font-size:9px; }
  //   @media print { body { -webkit-print-color-adjust:exact; print-color-adjust:exact; } }
  // </style></head><body>
  // <header><div><h1>CargoMate — Incentive Report</h1><div class="muted">Export incentive estimate and scheme-wise breakdown</div></div>
  // <div class="meta"><strong>Report ID:</strong> ${escapeHtml(report.id)}<br><strong>Generated:</strong> ${escapeHtml(generatedOn)}<br><strong>Generated by:</strong> ${escapeHtml(report.generatedBy || "Current user")}</div></header>
  // <h2>Shipment Details</h2><div class="fields">${inputHtml}</div>
  // <h2>Incentive Breakdown</h2>
  // <table><thead><tr><th>Scheme / Program</th><th>Type</th><th>Applicable On</th><th>Rate / Benefit</th><th>Estimated Benefit (INR)</th><th>Eligibility</th></tr></thead>
  // <tbody>${tableRows || '<tr><td colspan="6">No scheme-wise breakdown was returned by the API.</td></tr>'}</tbody>
  // <tfoot><tr><td colspan="4" style="text-align:right">Total Estimated Incentive</td><td colspan="2">${escapeHtml(formatINR(total))}</td></tr></tfoot></table>
  // <div class="notice">Estimates are indicative and subject to scheme rules and current government notifications. Verify with official sources before making business decisions.</div>
  // <script>window.onload = () => { window.focus(); window.print(); };</script>
  // </body></html>`);
  //     popup.document.close();
  //   };

  //   return (
  //     <div className=" bg-gray-50  flex-1 overflow-y-auto pt-14">
  //       {activeTab === "Incentive Checker" && showPopup && (
  //         <SearchPopup
  //           initial={emptySearch}
  //           onClose={() => setShowPopup(false)}
  //           onSubmit={(data) => {
  //             setSearch(data);
  //             setShowPopup(false);
  //             runIncentiveCheck(data);
  //           }}
  //         />
  //       )}
  //       {activeTab === "Incentive Checker" && (
  //         <div>
  //           {/* {(apiLoading || apiError || apiResults) && (
  //             <div className="mx-4 sm:mx-6 mt-3 rounded-lg border bg-white p-3 text-xs">
  //               {apiLoading && (
  //                 <p className="text-blue-700">
  //                   Calculating incentives from the live API…
  //                 </p>
  //               )}
  //               {apiError && <p className="text-red-600">{apiError}</p>}
  //               {apiResults && (
  //                 <details>
  //                   <summary className="font-semibold text-gray-800 mb-1 cursor-pointer">
  //                     View raw API responses
  //                   </summary>
  //                   <pre className="max-h-48 overflow-auto whitespace-pre-wrap break-words text-gray-600">
  //                     {JSON.stringify(apiResults, null, 2)}
  //                   </pre>
  //                 </details>
  //               )}
  //             </div>
  //           )} */}
  //           <div className=" border-gray-200 px-4 sm:px-6 py-3">
  //             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
  //               <div>
  //                 <h1 className="text-xl font-bold text-gray-900">
  //                   Incentive Checker
  //                 </h1>
  //                 <p className="text-xs text-gray-500 mt-0.5">
  //                   Find applicable incentives and estimated benefits for your
  //                   shipment.
  //                 </p>
  //               </div>
  //               <div className="flex flex-wrap gap-2">
  //                 {/* <button className="flex items-center gap-1.5 border border-gray-200 bg-white text-gray-700 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-gray-50">
  //               <FiArrowLeft size={12} /> New Search
  //             </button> */}
  //                 {/* <button className="flex items-center gap-1.5 border border-gray-200 bg-white text-gray-700 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-gray-50">
  //               <FiSave size={12} /> Save Report
  //             </button>
  //             <button className="flex items-center gap-1.5 border border-gray-200 bg-white text-gray-700 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-gray-50">
  //               <FiDownload size={12} /> Download Report (PDF)
  //             </button> */}
  //                 <button
  //                   type="button"
  //                   onClick={() => setShowPopup(true)}
  //                   className="flex items-center gap-1.5 border border-teal-500 bg-white hover:bg-teal-50 text-teal-700 text-xs font-semibold px-3 py-1.5 rounded-lg"
  //                 >
  //                   <FiDatabase size={12} /> Your Search
  //                 </button>
  //                 <button
  //                   onClick={() => {
  //                     setShipment("shipment");
  //                     setActiveTab("");
  //                   }}
  //                   className="flex items-center gap-1.5 bg-teal-500 hover:bg-teal-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg"
  //                 >
  //                   <FiPlus size={12} /> Create Shipment
  //                 </button>
  //               </div>
  //             </div>
  //           </div>

  //           <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6 py-4 grid grid-cols-1 xl:grid-cols-[1fr_290px] gap-4">
  //             <div className="flex flex-col gap-4 min-w-0">
  //               {/* <div className="flex items-start gap-2 bg-teal-50 border border-teal-200 rounded-lg px-3 py-2.5 text-xs text-teal-800">
  //                 <FiInfo
  //                   size={14}
  //                   className="text-teal-500 flex-shrink-0 mt-0.5"
  //                 />
  //                 This result is based on the data sources and assumptions listed
  //                 below. Please review before making any trade decisions.
  //               </div> */}

  //               <div className="bg-white border border-gray-200 rounded-xl p-4">
  //                 <div className="flex items-center gap-2 mb-3">
  //                   <div className="w-9 h-9 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
  //                     <FiDatabase className="text-blue-500 text-base" />
  //                   </div>
  //                   <p className="text-sm font-semibold text-gray-900">
  //                     Your Search
  //                   </p>
  //                 </div>
  //                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
  //                   {[
  //                     ["HS Code", search.hsCode],
  //                     ["Product", search.product],
  //                     ["Origin Country", search.origin],
  //                     ["Destination Country", search.destination],
  //                     ["Shipment Value", search.value],
  //                     ["Quantity", search.quantity],
  //                     ["MEIS Rate (%)", search.meis_rate_pct],
  //                   ].map(([k, v]) => (
  //                     <div key={k}>
  //                       <p className="text-[10px] text-gray-400 font-medium mb-0.5">
  //                         {k}
  //                       </p>
  //                       <p className="text-xs font-semibold text-gray-800 leading-tight">
  //                         {v || "-"}
  //                       </p>
  //                     </div>
  //                   ))}
  //                 </div>
  //                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-2 border-t border-gray-100">
  //                   <p className="text-[10px] text-gray-400">
  //                     Search ID: {reportInfo?.id || "Not generated yet"}{" "}
  //                     &nbsp;•&nbsp;{" "}
  //                     {reportInfo?.generatedAt
  //                       ? new Date(reportInfo.generatedAt).toLocaleString()
  //                       : "Run a calculation to generate a report"}{" "}
  //                     &nbsp;•&nbsp; User:{" "}
  //                     {reportInfo?.generatedBy ||
  //                       localStorage.getItem("userName") ||
  //                       localStorage.getItem("name") ||
  //                       "Current user"}
  //                   </p>
  //                   <button
  //                     onClick={showView}
  //                     className="flex items-center gap-1.5 border border-gray-200 bg-white text-gray-600 text-[11px] font-medium px-3 py-1.5 rounded-lg hover:bg-gray-50 w-fit"
  //                   >
  //                     View Detail{" "}
  //                   </button>
  //                 </div>
  //               </div>

  //               <div className="bg-white border border-gray-200 rounded-xl p-4">
  //                 <p className="text-sm font-semibold text-gray-800 mb-3">
  //                   Estimated Total Incentive (INR)
  //                 </p>
  //                 <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4 items-center">
  //                   <div>
  //                     <p className="text-2xl font-bold text-gray-900">
  //                       {formatINR(
  //                         readMetric(apiResults?.estimate, [
  //                           "total_estimated_incentive",
  //                           "estimated_total_incentive_inr",
  //                           "total_incentive",
  //                           "total_incentive_inr",
  //                           "total_benefit",
  //                           "data.total_incentive",
  //                           "result.total_incentive",
  //                         ]),
  //                       )}
  //                     </p>
  //                     <div className="mt-2 flex items-center gap-1.5">
  //                       <span className="text-[11px] text-gray-500 font-medium">
  //                         Total Incentive Rate
  //                       </span>
  //                       <span className="bg-teal-100 text-teal-700 text-[11px] font-semibold px-2 py-0.5 rounded-full">
  //                         {readMetric(apiResults?.estimate, [
  //                           "total_estimated_incentive",
  //                           "incentive_rate_pct",
  //                           "total_rate_pct",
  //                           "rate_pct",
  //                           "data.rate_pct",
  //                         ]) != null
  //                           ? `${readMetric(apiResults?.estimate, ["total_incentive_rate_pct", "incentive_rate_pct", "total_rate_pct", "rate_pct", "data.rate_pct"])}%`
  //                           : "API estimate"}
  //                       </span>
  //                     </div>
  //                   </div>
  //                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
  //                     <div className="border border-gray-100 rounded-xl p-3 flex items-start gap-3">
  //                       <div className="w-9 h-9 bg-teal-50 rounded-full flex items-center justify-center flex-shrink-0">
  //                         <MdOutlineAccountBalance className="text-teal-500 text-2xl" />
  //                       </div>
  //                       <div>
  //                         <p className="text-[10px] text-gray-500 font-medium">
  //                           Central Incentives
  //                         </p>
  //                         <p className="text-lg font-bold text-gray-900">
  //                           {formatINR(
  //                             readMetric(apiResults?.estimate, [
  //                               "central_incentives",
  //                               "central_incentive",
  //                               "central_incentive_inr",
  //                               "central_total",
  //                               "data.central_incentive",
  //                             ]),
  //                           )}
  //                         </p>
  //                         {/* <p className="text-[10px] text-gray-400">
  //                           From API response
  //                         </p> */}
  //                       </div>
  //                     </div>
  //                     <div className="border border-gray-100 rounded-xl p-3 flex items-start gap-3">
  //                       <div className="w-9 h-9 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0">
  //                         <MdOutlineLocationOn className="text-red-400 text-2xl" />
  //                       </div>
  //                       <div>
  //                         <p className="text-[10px] text-gray-500 font-medium">
  //                           State Incentives
  //                         </p>
  //                         <p className="text-lg font-bold text-gray-900">
  //                           {formatINR(
  //                             readMetric(apiResults?.estimate, [
  //                               "state_incentives",
  //                               "state_incentive",
  //                               "state_incentive_inr",
  //                               "state_total",
  //                               "data.state_incentive",
  //                             ]),
  //                           )}
  //                         </p>
  //                           {/* <p className="text-[10px] text-gray-400">
  //                             From API response
  //                           </p> */}
  //                       </div>
  //                     </div>
  //                     <div className="border border-gray-100 rounded-xl p-3 flex items-start gap-3">
  //                       <div className="w-9 h-9 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
  //                         <BsGraphUpArrow className="text-blue-400 text-2xl" />
  //                       </div>
  //                       <div>
  //                         <p className="text-[10px] text-gray-500 font-medium">
  //                           Estimated Total MEIS Benefit
  //                         </p>
  //                         <p className="text-lg font-bold text-gray-900">
  //                           {formatINR(
  //                             readMetric(apiResults?.meis, [
  //                               "estimated_total_meis_benefit",
  //                               "estimated_meis_benefit",
  //                               "total_meis_benefit",
  //                               "meis_benefit",
  //                               "total_benefit",
  //                               "estimated_benefit",
  //                               "data.total_meis_benefit",
  //                               "result.meis_benefit",
  //                             ]),
  //                           )}
  //                         </p>
  //                         {/* <p className="text-[10px] text-gray-400">
  //                           Calculated by /incentive/meis
  //                         </p> */}
  //                       </div>
  //                     </div>
  //                   </div>
  //                 </div>
  //                 <p className="text-[10px] text-gray-400 mt-3">
  //                   Incentives are subject to eligibility and compliance with
  //                   applicable scheme conditions.
  //                 </p>
  //               </div>

  //               {showDetails && (
  //                 <div
  //                   className="bg-white border border-gray-200 rounded-xl p-4"
  //                   id="sectionId"
  //                 >
  //                   <div className=" flex justify-between items-center mb-3">
  //                     <p className="text-base pl-3 font-semibold text-gray-800 ">
  //                       Incentive Breakdown
  //                     </p>
  //                     {/* <button className="flex items-center  border border-gray-200 text-teal-600 text-xs font-medium px-2 py-2 rounded-lg hover:bg-teal-50  justify-center">
  //                 View Scheme Details & Eligibility 
  //               </button> */}
  //                   </div>
  //                   <div className="overflow-x-auto rounded-lg border border-gray-100">
  //                     <table className="w-full min-w-[680px] border-collapse text-left">
  //                       <thead>
  //                         <tr className="bg-slate-50">
  //                           {[
  //                             "Scheme / Program",
  //                             "Type",
  //                             "Applicable On",
  //                             "Rate / Benefit",
  //                             "Estimated Benefit (INR)",
  //                             "Eligibility",
  //                           ].map((heading) => (
  //                             <th
  //                               key={heading}
  //                               className="whitespace-nowrap px-3 py-3 text-[10px] font-semibold text-slate-500"
  //                             >
  //                               {heading}
  //                             </th>
  //                           ))}
  //                         </tr>
  //                       </thead>
  //                       <tbody>
  //                         {(Array.isArray(estimateBreakdown) ? estimateBreakdown : []).map((row, i) => {
  //                           const schemeName = row.scheme || row.name || row.scheme_name || row.program || "Incentive scheme";
  //                           const schemeDescription = row.fullName || row.description || row.full_name || "";
  //                           const schemeType = row.type || row.scheme_type || row.category || "Central";
  //                           const eligibilityRaw = row.eligibility || row.status || (row.eligible === true ? "Eligible" : row.eligible === false ? "Not eligible" : "Not specified");
  //                           const isEligible = row.eligible === true || String(eligibilityRaw).toLowerCase() === "eligible";
  //                           const rate = row.rate ?? row.rate_pct ?? row.rate_percent ?? row.benefit_rate;
  //                           const rateLabel = rate === undefined || rate === null || rate === "" ? "—" : (typeof rate === "number" && !String(rate).includes("%") ? `${rate}%` : rate);
  //                           const benefit = readMetric(row, ["benefit", "estimated_benefit", "benefit_inr", "amount", "amount_inr", "value"]);
  //                           const typeClass = /state/i.test(String(schemeType))
  //                             ? "bg-amber-50 text-amber-700"
  //                             : "bg-emerald-50 text-emerald-700";

  //                           return (
  //                             <tr key={row.id || row.scheme_code || `${schemeName}-${i}`} className="border-t border-slate-100 hover:bg-slate-50/70">
  //                               <td className="px-3 py-3 align-middle">
  //                                 <p className="text-[11px] font-semibold text-slate-900">{schemeName}</p>
  //                                 {schemeDescription && <p className="mt-0.5 max-w-[260px] text-[9px] leading-4 text-slate-400">{schemeDescription}</p>}
  //                               </td>
  //                               <td className="px-3 py-3 align-middle">
  //                                 <span className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[9px] font-semibold ${typeClass}`}>
  //                                   {schemeType}
  //                                 </span>
  //                               </td>
  //                               <td className="whitespace-nowrap px-3 py-3 text-[10px] font-medium text-slate-600">
  //                                 {row.applicableOn || row.applicable_on || row.basis || "Export Value"}
  //                               </td>
  //                               <td className="whitespace-nowrap px-3 py-3 text-[10px] font-semibold text-slate-800">{rateLabel}</td>
  //                               <td className="whitespace-nowrap px-3 py-3 text-[10px] font-bold text-slate-900">{formatINR(benefit)}</td>
  //                               <td className="px-3 py-3">
  //                                 <span className={`inline-flex items-center gap-1 whitespace-nowrap text-[10px] font-semibold ${isEligible ? "text-emerald-600" : "text-slate-400"}`}>
  //                                   {isEligible ? <FiCheckCircle size={12} /> : <FiXCircle size={12} />}
  //                                   {String(eligibilityRaw).replaceAll("_", " ").replace(/^\w/, (c) => c.toUpperCase())}
  //                                 </span>
  //                               </td>
  //                             </tr>
  //                           );
  //                         })}
  //                         {!estimateBreakdown.length && (
  //                           <tr className="border-t border-slate-100">
  //                             <td colSpan={6} className="px-3 py-6 text-center text-[11px] text-slate-400">
  //                               {apiResults?.estimate
  //                                 ? "The API did not return a line-item breakdown. See the complete response in Report Information."
  //                                 : "Run a calculation to view actual scheme-wise benefits."}
  //                             </td>
  //                           </tr>
  //                         )}
  //                       </tbody>
  //                       <tfoot>
  //                         <tr className="border-t border-slate-200 bg-white">
  //                           <td colSpan={4} className="px-3 py-3 text-right text-[11px] font-bold text-slate-900">
  //                             Total Estimated Incentive
  //                           </td>
  //                           <td colSpan={2} className="px-3 py-3 text-[12px] font-bold text-emerald-600">
  //                             {formatINR(incentiveTotal)}
  //                           </td>
  //                         </tr>
  //                       </tfoot>
  //                     </table>
  //                   </div>
  //                 </div>
  //               )}

  //               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 min-w-0 mb-4">
  //                 <div className="bg-white border border-gray-200 rounded-xl p-4  ">
  //                   <p className="text-sm font-semibold text-gray-800 mb-3">
  //                     Data Sources Used
  //                   </p>
  //                   <div className="grid grid-cols-2 gap-y-2 gap-x-3">
  //                     {dataSources.map(({ icon: Icon, label }) => (
  //                       <div
  //                         key={label}
  //                         className="flex min-w-0 items-start gap-1.5 text-xs leading-4 text-gray-600 break-words"
  //                       >
  //                         <Icon
  //                           size={12}
  //                           className="text-gray-400 flex-shrink-0"
  //                         />
  //                         <span className="min-w-0 break-words">{label}</span>
  //                       </div>
  //                     ))}
  //                   </div>
  //                   {/* <button className="mt-3 text-teal-500 text-xs font-medium hover:underline flex items-center gap-1">
  //                 View All Sources <FiChevronRight size={12} />
  //               </button> */}
  //                 </div>

  //                 <div className="bg-white border border-gray-200 rounded-xl p-4">
  //                   <p className="text-sm font-semibold text-gray-800 mb-3">
  //                     Assumptions
  //                   </p>
  //                   <ul className="flex flex-col gap-1.5">
  //                     {assumptions.map((a, i) => (
  //                       <li
  //                         key={i}
  //                         className="flex items-start gap-1.5 text-xs text-gray-600"
  //                       >
  //                         <span className="text-gray-400 mt-0.5 flex-shrink-0">
  //                           •
  //                         </span>{" "}
  //                         {a}
  //                       </li>
  //                     ))}
  //                   </ul>
  //                 </div>

  //                 <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col justify-between">
  //                   <div>
  //                     <p className="text-sm font-semibold text-gray-800 mb-2">
  //                       Disclaimer
  //                     </p>
  //                     <p className="text-xs text-gray-600 leading-relaxed">
  //                       Incentives are subject to change as per government
  //                       notifications. Please verify with official sources before
  //                       making any business decisions.
  //                     </p>
  //                     {/* <button className="mt-2 text-blue-500 text-xs font-medium hover:underline">Read Full Disclaimer</button> */}
  //                   </div>
  //                 </div>

  //                 <div className="bg-white border border-gray-200 rounded-xl p-4">
  //                   <p className="text-sm font-semibold text-gray-800 mb-1">
  //                     Need Help?
  //                   </p>
  //                   <p className="text-xs text-gray-500 mb-2 pt-3">
  //                     Our trade experts are here to help you.
  //                   </p>
  //                   <div className="flex items-center gap-1.5 text-xs pt-2 text-gray-600 mb-1">
  //                     <FiPhone size={11} className="text-teal-500 " /> +91 22 1234
  //                     5678
  //                   </div>
  //                   <div className="flex items-center gap-1.5 text-xs pt-2 text-gray-600 mb-3">
  //                     <FiMail size={11} className="text-teal-500" />{" "}
  //                     support@asdcargomate.com
  //                   </div>
  //                   {/* <button className="w-full border border-gray-200 text-gray-700 text-xs font-medium py-2 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-1.5">
  //                   <FiMessageSquare size={12} /> Chat with Expert
  //                 </button> */}
  //                 </div>
  //               </div>
  //             </div>

  //             <div className="flex flex-col gap-4">
  //               <div className="bg-white border border-gray-200 rounded-xl p-4">
  //                 <p className="text-sm font-semibold text-gray-900 mb-3">
  //                   Result Summary
  //                 </p>
  //                 {[
  //                   {
  //                     icon: FiCheckCircle,
  //                     iconColor: "text-teal-500",
  //                     label: "Best Applicable Scheme",
  //                     value:
  //                       apiResults?.estimate?.best_scheme ||
  //                       apiResults?.estimate?.best_applicable_scheme ||
  //                       "See API result",
  //                     valueColor: "",
  //                   },
  //                   {
  //                     icon: FiAlertCircle,
  //                     iconColor: "text-teal-500",
  //                     label: "Total Incentive (INR)",
  //                     value: formatINR(incentiveTotal),
  //                     valueColor: "",
  //                   },
  //                   {
  //                     icon: FiAlertTriangle,
  //                     iconColor: "text-orange-400",
  //                     label: "Estimated MEIS (INR)",
  //                     value: formatINR(meisTotal),
  //                     valueColor: "",
  //                   },
  //                   // {
  //                   //   icon: FiInfo,
  //                   //   iconColor: "text-blue-400",
  //                   //   label: "Based On",
  //                   //   value: apiResults?.estimate?.sources[0] ||
  //                   //      "Live API calculation",
  //                   //   valueColor: "",
  //                   // },
  //                   {
  //   icon: FiInfo,
  //   iconColor: "text-blue-400",
  //   label: "Based On",
  //   value: Array.isArray(apiResults?.estimate?.sources)
  //     && apiResults.estimate.sources.length > 0
  //       ? apiResults.estimate.sources.join(", ")
  //       : "Live API calculation",
  //   valueColor: "",
  // },
  //                   {
  //                     icon: FiCheckCircle,
  //                     iconColor: "text-emerald-500",
  //                     label: "Input Tax Credit",
  //                     value:
  //                       apiResults?.estimate?.input_tax_credit ??
  //                       apiResults?.estimate?.inputTaxCredit ??
  //                       "Not supplied",
  //                     valueColor: "",
  //                   },
  //                 ].map(({ icon: Icon, iconColor, label, value }, i) => (
  //                   <div
  //                     key={i}
  //                     className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0 text-xs gap-2"
  //                   >
  //                     <div className="flex items-center gap-2 text-gray-500">
  //                       <Icon size={13} className={iconColor} /> {label}
  //                     </div>
  //                     <span className="font-semibold text-gray-900 text-right">
  //                       {value}
  //                     </span>
  //                   </div>
  //                 ))}
  //                 <button
  //                   onClick={() => {
  //                     setShipment("shipment");
  //                     setActiveTab("");
  //                   }}
  //                   className="mt-3 w-full bg-teal-500 hover:bg-teal-600 text-white text-xs font-semibold py-2.5 rounded-xl"
  //                 >
  //                   Create Shipment
  //                 </button>
  //               </div>

  //               {hasSearched && reportInfo && (
  //                 <div className="bg-white border border-gray-200 rounded-xl p-4">
  //                   <p className="text-sm font-semibold text-gray-900 mb-3">
  //                     Report Information
  //                   </p>
  //                 {[
  //                   ["Report ID", reportInfo?.id || "Not generated yet"],
  //                   [
  //                     "Generated On",
  //                     reportInfo?.generatedAt
  //                       ? new Date(reportInfo.generatedAt).toLocaleString()
  //                       : "—",
  //                   ],
  //                   [
  //                     "Generated By",
  //                     reportInfo?.generatedBy ||
  //                       localStorage.getItem("userName") ||
  //                       localStorage.getItem("name") ||
  //                       "Current user",
  //                   ],
  //                   ["Product", search.product || "—"],
  //                   ["HS Code", search.hsCode || "—"],
  //                   ["Shipment Value (INR)", search.value || "—"],
  //                   [
  //                     "Estimated Incentive (INR)",
  //                     formatINR(
  //                       readMetric(reportInfo?.result?.estimate, [
  //                         "estimated_total_incentive",
  //                         "estimated_total_incentive_inr",
  //                         "total_incentive",
  //                         "total_incentive_inr",
  //                         "total_benefit",
  //                         "data.total_incentive",
  //                         "result.total_incentive",
  //                       ]),
  //                     ),
  //                   ],
  //                   [
  //                     "Estimated MEIS Benefit (INR)",
  //                     formatINR(
  //                       readMetric(reportInfo?.result?.meis, [
  //                         "estimated_total_meis_benefit",
  //                         "estimated_meis_benefit",
  //                         "total_meis_benefit",
  //                         "meis_benefit",
  //                         "total_benefit",
  //                         "estimated_benefit",
  //                         "data.total_meis_benefit",
  //                         "result.meis_benefit",
  //                       ]),
  //                     ),
  //                   ],
  //                 ].map(([k, v]) => (
  //                   <div
  //                     key={k}
  //                     className="flex justify-between py-1.5 text-[11px] border-b border-gray-100 last:border-0"
  //                   >
  //                     <span className="text-gray-500">{k}</span>
  //                     <span className="text-gray-800 font-medium">{v}</span>
  //                   </div>
  //                 ))}
  //                 {/* {reportInfo && (
  //                   <details className="mt-3 text-[11px] text-gray-500">
  //                     <summary className="cursor-pointer font-semibold">
  //                       View complete calculation report
  //                     </summary>
  //                     <pre className="mt-2 max-h-48 overflow-auto whitespace-pre-wrap break-words rounded-lg bg-gray-50 p-2">
  //                       {JSON.stringify(reportInfo, null, 2)}
  //                     </pre>
  //                   </details>
  //                 )} */}
  //                   <button
  //                     type="button"
  //                     onClick={handleDownloadPdf}
  //                     className="mt-3 w-full flex items-center justify-center gap-2 border border-gray-200 bg-white text-teal-600 text-xs font-medium py-2 rounded-lg hover:bg-teal-50"
  //                   >
  //                     <FiDownload size={12} /> Download Report (PDF)
  //                   </button>
  //                 </div>
  //               )}

  //               <div className="bg-white border border-gray-200 rounded-xl p-4">
  //                 <p className="text-sm font-semibold text-gray-900 mb-1">
  //                   Save & Share
  //                 </p>
  //                 <p className="text-[11px] text-gray-500 mb-3">
  //                   Save this report for future reference or share with your team.
  //                 </p>
  //                 <div className="grid grid-cols-2 gap-2">
  //                   <button className="flex items-center justify-center gap-1 border border-gray-200 bg-white text-gray-700 text-[11px] font-medium py-2 rounded-lg hover:bg-gray-50">
  //                     <FiBookmark size={14} /> Save to Saved Reports
  //                   </button>
  //                   <button className="flex items-center justify-center gap-1.5 border border-gray-200 bg-white text-gray-700 text-[11px] font-medium py-2 rounded-lg hover:bg-gray-50">
  //                     <FiShare2 size={12} /> Share Report
  //                   </button>
  //                 </div>
  //               </div>

  //               <div className="bg-white border border-gray-200 rounded-xl p-4">
  //                 <div className="flex items-center justify-between mb-3 gap-2">
  //                   <p className="text-sm font-semibold text-gray-900">
  //                     Audit Log (This Search)
  //                   </p>
  //                   <div className="flex items-center gap-3">
  //                     <span className="text-[10px] text-gray-400">
  //                       {auditEntries.length} events
  //                     </span>
  //                     {auditEntries.length > 0 && (
  //                       <button
  //                         type="button"
  //                         onClick={() => { setAuditPage(1); setShowAllAuditModal(true); }}
  //                         className="text-[11px] font-semibold text-teal-700 hover:text-teal-900 whitespace-nowrap"
  //                       >View All</button>
  //                     )}
  //                   </div>
  //                 </div>
  //                 {auditEntries.length ? (
  //                   auditEntries.slice(0, 5).map((entry) => (
  //                     <div
  //                       key={entry.id}
  //                       className="flex items-start gap-2 py-1.5 border-b border-gray-100 last:border-0"
  //                     >
  //                       <span className="w-2 h-2 rounded-full bg-teal-500 flex-shrink-0 mt-1" />
  //                       <span className="text-[10px] text-gray-400 whitespace-nowrap">
  //                         {entry.time}
  //                       </span>
  //                       <span className="text-[11px] text-gray-600">{entry.text}</span>
  //                     </div>
  //                   ))
  //                 ) : (
  //                   <p className="text-[11px] text-gray-400">
  //                     Successful incentive searches will appear here.
  //                   </p>
  //                 )}
  //               </div>
         
  //             <DashboardAdPlacement location="User Dashboard - Incentive Checker" />

  //             </div>
  //           </div>

       
  //         </div>
  //       )}

  //       {showAllAuditModal && shipment !== "shipment" && (
  //         <div
  //           className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4"
  //           onClick={(event) => { if (event.target === event.currentTarget) setShowAllAuditModal(false); }}
  //         >
  //           <div className="w-full max-w-3xl max-h-[85vh] overflow-hidden rounded-2xl bg-white shadow-2xl">
  //             <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
  //               <div>
  //                 <h2 className="text-base font-bold text-gray-900">All Audit Logs</h2>
  //                 <p className="mt-1 text-xs text-gray-500">{auditEntries.length} total events · 15 logs per page</p>
  //               </div>
  //               <button type="button" onClick={() => setShowAllAuditModal(false)} aria-label="Close audit logs" className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900">
  //                 <FiX size={18} />
  //               </button>
  //             </div>
  //             <div className="max-h-[calc(85vh-145px)] overflow-y-auto px-5 py-3">
  //               {paginatedAuditEntries.length ? paginatedAuditEntries.map((entry) => (
  //                 <div key={entry.id} className="flex items-start gap-3 border-b border-gray-100 py-3 last:border-0">
  //                   <span className="mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-teal-500" />
  //                   <span className="w-32 flex-shrink-0 text-xs text-gray-400">{entry.time}</span>
  //                   <span className="text-sm text-gray-700 break-words">{entry.text}</span>
  //                 </div>
  //               )) : <p className="py-8 text-center text-sm text-gray-400">No audit logs available.</p>}
  //             </div>
  //             <div className="flex items-center justify-between gap-3 border-t border-gray-200 px-5 py-4">
  //               <span className="text-xs text-gray-500">Page {Math.min(auditPage, auditPageCount)} of {auditPageCount}</span>
  //               <div className="flex gap-2">
  //                 <button type="button" disabled={auditPage <= 1} onClick={() => setAuditPage((page) => Math.max(1, page - 1))} className="rounded-lg border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40">Previous</button>
  //                 <button type="button" disabled={auditPage >= auditPageCount} onClick={() => setAuditPage((page) => Math.min(auditPageCount, page + 1))} className="rounded-lg bg-teal-700 px-4 py-2 text-xs font-semibold text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-40">Next</button>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       )}

  //       {shipment === "shipment" && (
  //         <div>
  //           <Shipment
  //             setActiveTab={setActiveTab}
  //             setShipment={setShipment}
  //             currentTab={"Incentive Checker"}
  //           />
  //         </div>
  //       )}
  //     </div>
  //   );
  // }


  
  import { useEffect, useState } from "react";
  import {
    FiArrowLeft,
    FiSave,
    FiDownload,
    FiPlus,
    FiCopy,
    FiChevronRight,
    FiExternalLink,
    FiDatabase,
    FiPhone,
    FiMail,
    FiCheckCircle,
    FiXCircle,
    FiShare2,
    FiBookmark,
    FiMessageSquare,
    FiInfo,
    FiAlertTriangle,
    FiAlertCircle,
    FiBell,
    FiGrid,
    FiX,
  } from "react-icons/fi";
  import {
    MdOutlineAccountBalance,
    MdOutlineLocationOn,
    MdOutlineOpenInNew,
  } from "react-icons/md";
  import { BsGraphUpArrow } from "react-icons/bs";
  import Shipment from "../../components/ShipmentForm";
  import poster2 from "../../assets/Images/webp/poster2.webp";
  import DashboardAdPlacement from "../../components/DashboardAdPlacement";
  import { estimateIncentives, calculateMeis } from "../../api/CargoMateApi";

  const breakdownRows = [
    {
      scheme: "RoDTEP",
      fullName: "Remission of Duties or Taxes on Exported Products",
      type: "Central",
      typeColor: "bg-emerald-100 text-emerald-700",
      applicableOn: "Export Value",
      rate: "4%",
      benefit: "₹4,992",
      eligibility: "Eligible",
      eligible: true,
    },
    {
      scheme: "Drawbacks",
      fullName: "",
      type: "Central",
      typeColor: "bg-emerald-100 text-emerald-700",
      applicableOn: "Export Value",
      rate: "0.5%",
      benefit: "₹624",
      eligibility: "Eligible",
      eligible: true,
    },
    // {
    //   scheme: "State Incentive – Tamil Nadu",
    //   fullName: "Export Promotion Policy",
    //   type: "State",
    //   typeColor: "bg-orange-100 text-orange-600",
    //   applicableOn: "Export Value",
    //   rate: "2%",
    //   benefit: "₹2,496",
    //   eligibility: "Eligible",
    //   eligible: true,
    // },
    // {
    //   scheme: "IGST Refund (on Exports)",
    //   fullName: "",
    //   type: "Central",
    //   typeColor: "bg-emerald-100 text-emerald-700",
    //   applicableOn: "Tax Paid",
    //   rate: "0%",
    //   benefit: "₹0",
    //   eligibility: "Not Applicable",
    //   eligible: false,
    // },
  ];

  const auditLog = [
    {
      color: "bg-teal-500",
      time: "09:25 AM",
      text: "Search Submitted by Arjun Soni",
    },
    { color: "bg-teal-500", time: "09:25 AM", text: "Data Validated" },
    { color: "bg-teal-500", time: "09:25 AM", text: "Incentives Matched" },
    { color: "bg-teal-500", time: "09:25 AM", text: "Result Generated" },
    { color: "bg-teal-500", time: "09:25 AM", text: "Report Saved" },
  ];

  const assumptions = [
    "Product is 100% cotton, knitted, for men.",
    "Shipment value and details provided are correct.",
    "Export under HS code 6109.10.00.",
    "Input Tax Credit is available.",
    "Rates are as per current notifications and may change.",
  ];

  const dataSources = [
    { icon: FiDatabase, label: "DGFT (India)" },
    { icon: FiDatabase, label: "Trade APIs" },
    { icon: FiDatabase, label: "ICEGATE" },
    { icon: FiBell, label: "Notifications" },
    { icon: FiGrid, label: "State Export Policies" },
    { icon: FiDatabase, label: "Public Schemes Database" },
  ];

  const emptySearch = {
    hsCode: "",
    product: "",
    origin: "",
    destination: "",
    value: "",
    quantity: "",
    meis_rate_pct: "10",
  };

  function SearchPopup({ onClose, onSubmit, initial }) {
    const [form, setForm] = useState(initial);
    const [error, setError] = useState("");

    function handleChange(e) {
      setForm({ ...form, [e.target.name]: e.target.value });
      if (error) setError("");
    }

    function handleSubmit(e) {
      e.preventDefault();
      if (!form.hsCode.trim()) {
        setError("HS Code is required");
        return;
      }
      onSubmit(form);
    }

    const fields = [
      {
        name: "hsCode",
        label: "HS Code",
        placeholder: "e.g. 6109.10.00",
        required: true,
      },
      {
        name: "product",
        label: "Product",
        placeholder: "e.g. T-shirts, singlets and other vests, of cotton",
      },
      { name: "origin", label: "Origin Country", placeholder: "e.g. India" },
      {
        name: "destination",
        label: "Destination Country",
        placeholder: "e.g. United Arab Emirates (UAE)",
      },
      { name: "value", label: "Shipment Value", placeholder: "e.g. ₹1,24,680" },
      { name: "quantity", label: "Quantity", placeholder: "e.g. 500" },
      {
        name: "meis_rate_pct",
        label: "MEIS Rate (%)",
        placeholder: "e.g. 10",
        type: "number",
      },
    ];

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
        onClick={onClose}
      >
        <form
          onSubmit={handleSubmit}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-xl border border-gray-200 shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto "
        >
          <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                <FiDatabase className="text-blue-500 text-base" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Your Search</p>
                <p className="text-[11px] text-gray-500">
                  Enter shipment details to check applicable incentives.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100"
            >
              <FiX size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 sm:px-5 py-4">
            {fields.map(({ name, label, placeholder, required, type }) => (
              <div
                key={name}
                className={name === "product" ? "sm:col-span-2" : ""}
              >
                <label
                  htmlFor={name}
                  className="block text-[10px] text-gray-400 font-medium mb-1"
                >
                  {label}
                  {required && <span className="text-red-400"> *</span>}
                </label>
                <input
                  id={name}
                  name={name}
                  type={type || "text"}
                  min={type === "number" ? "0" : undefined}
                  step={type === "number" ? "any" : undefined}
                  value={form[name] ?? ""}
                  required={required || name === "meis_rate_pct"}
                  onChange={handleChange}
                  placeholder={placeholder}
                  autoFocus={name === "hsCode"}
                  className={`w-full border rounded-lg px-3 py-2 text-xs font-semibold text-gray-800 placeholder:font-normal placeholder:text-gray-400 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 ${
                    name === "hsCode" && error
                      ? "border-red-300"
                      : "border-gray-200"
                  }`}
                />
                {name === "hsCode" && error && (
                  <p className="text-[10px] text-red-500 mt-1">{error}</p>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end gap-2 px-4 sm:px-5 py-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="border border-gray-200 bg-white text-gray-700 text-xs font-medium px-4 py-2 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-teal-500 hover:bg-teal-600 text-white text-xs font-semibold px-4 py-2 rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }

  const getIncentiveUserScope = () => {
    for (const key of ["userId", "user_id", "email", "userEmail"]) {
      const value = localStorage.getItem(key);
      if (value) return value.toLowerCase().replace(/[^a-z0-9_-]/g, "_");
    }
    for (const key of ["currentUser", "user", "userInfo"]) {
      try {
        const value = JSON.parse(localStorage.getItem(key) || "null");
        if (value?.id || value?._id || value?.email)
          return String(value.id || value._id || value.email)
            .toLowerCase()
            .replace(/[^a-z0-9_-]/g, "_");
      } catch {}
    }
    return "current_user";
  };

  const readMetric = (source, keys) => {
    if (!source) return null;
    for (const key of keys) {
      const parts = key.split(".");
      let value = source;
      for (const part of parts) value = value?.[part];
      if (
        value !== undefined &&
        value !== null &&
        value !== "" &&
        Number.isFinite(Number(value))
      )
        return Number(value);
    }
    return null;
  };
  const formatINR = (value) =>
    value == null
      ? "—"
      : new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 2,
        }).format(value);
  const makeReportId = () =>
    `INC-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

  export default function IncentiveChecker() {
    const [copied, setCopied] = useState(false);
    const [showPopup, setShowPopup] = useState(true);
    const [showDetails, setShowDetails] = useState(false);
    const [search, setSearch] = useState(emptySearch);
    const [shipment, setShipment] = useState("");
    const [activeTab, setActiveTab] = useState("Incentive Checker");
    const [apiResults, setApiResults] = useState(null);
    const [apiLoading, setApiLoading] = useState(false);
    const [apiError, setApiError] = useState("");
    // Keep Report Information hidden until the user completes a search in this session.
    const [hasSearched, setHasSearched] = useState(false);
    const [reportInfo, setReportInfo] = useState(() => {
      try {
        const saved = JSON.parse(
          localStorage.getItem(
            `cargomate_incentive_reports_${getIncentiveUserScope()}`,
          ) || "[]",
        );
        return saved[0] || null;
      } catch {
        return null;
      }
    });
    const [auditEntries, setAuditEntries] = useState(() => {
      try {
        return JSON.parse(
          localStorage.getItem(
            `cargomate_incentive_audit_${getIncentiveUserScope()}`,
          ) || "[]",
        );
      } catch {
        return [];
      }
    });
    const [showAllAuditModal, setShowAllAuditModal] = useState(false);
    const [auditPage, setAuditPage] = useState(1);
    const AUDIT_PAGE_SIZE = 15;
    const auditPageCount = Math.max(1, Math.ceil(auditEntries.length / AUDIT_PAGE_SIZE));
    const paginatedAuditEntries = auditEntries.slice(
      (auditPage - 1) * AUDIT_PAGE_SIZE,
      auditPage * AUDIT_PAGE_SIZE,
    );

    useEffect(() => {
      localStorage.setItem(
        `cargomate_incentive_audit_${getIncentiveUserScope()}`,
        JSON.stringify(auditEntries.slice(0, 50)),
      );
    }, [auditEntries]);

    const runIncentiveCheck = async (data) => {
      setApiLoading(true);
      setApiError("");
      setApiResults(null);
      const numericValue = Number(
        String(data.value || "").replace(/[^0-9.]/g, ""),
      );
      const numericQuantity = Number(
        String(data.quantity || "").replace(/[^0-9.]/g, ""),
      );
      const numericMeisRate = Number(data.meis_rate_pct);
      if (!Number.isFinite(numericValue) || numericValue <= 0) {
        setApiError("Enter a valid Shipment Value greater than zero.");
        setApiLoading(false);
        return;
      }
      if (!Number.isFinite(numericQuantity) || numericQuantity <= 0) {
        setApiError("Enter a valid Quantity greater than zero.");
        setApiLoading(false);
        return;
      }
      if (!Number.isFinite(numericMeisRate) || numericMeisRate < 0) {
        setApiError("Enter a valid MEIS Rate (%).");
        setApiLoading(false);
        return;
      }
      try {
        const payload = {
          hs_code: data.hsCode,
          fob_value: Number(String(data.value || "").replace(/[^0-9.]/g, "")),
          quantity: Number(String(data.quantity || "").replace(/[^0-9.]/g, "")),
          meis_rate_pct: Number(data.meisRatePct || 0),
        };

        // Keep both endpoints as POST requests with JSON bodies.
        const [estimate, meis] = await Promise.allSettled([
          estimateIncentives(payload),
          calculateMeis(payload),
        ]);
        const results = {
          estimate:
            estimate.status === "fulfilled"
              ? (estimate.value?.data ?? estimate.value)
              : null,
          meis:
            meis.status === "fulfilled" ? (meis.value?.data ?? meis.value) : null,
        };
        if (!results.estimate && !results.meis)
          throw (
            estimate.reason || meis.reason || new Error("Incentive APIs failed")
          );
        setApiResults(results);
        const generatedAt = new Date().toISOString();
        const report = {
          id: makeReportId(),
          generatedAt,
          generatedBy:
            localStorage.getItem("userName") ||
            localStorage.getItem("name") ||
            "Current user",
          input: payload,
          result: results,
        };
        setReportInfo(report);
        setHasSearched(true);
        try {
          const reportKey = `cargomate_incentive_reports_${getIncentiveUserScope()}`;
          const existingReports = JSON.parse(
            localStorage.getItem(reportKey) || "[]",
          );
          localStorage.setItem(
            reportKey,
            JSON.stringify(
              [
                report,
                ...existingReports.filter((item) => item.id !== report.id),
              ].slice(0, 50),
            ),
          );
        } catch (storageError) {
          console.warn(
            "Unable to persist incentive report locally",
            storageError,
          );
        }
        const entry = {
          id: report.id,
          time: new Date(generatedAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          text: `Incentive and MEIS estimate generated for ${data.product || data.hsCode}`,
          createdAt: generatedAt,
        };
        setAuditEntries((prev) => [entry, ...prev].slice(0, 50));
        if (estimate.status === "rejected" || meis.status === "rejected") {
          setApiError(
            [
              estimate.status === "rejected"
                ? `Incentive estimate failed: ${estimate.reason?.message || "request failed"}`
                : "",
              meis.status === "rejected"
                ? `MEIS estimate failed: ${meis.reason?.message || "request failed"}`
                : "",
            ]
              .filter(Boolean)
              .join(" · "),
          );
        }
      } catch (err) {
        setApiError(
          err?.response?.data?.detail ||
            err?.response?.data?.message ||
            err.message ||
            "Unable to calculate incentives.",
        );
      } finally {
        setApiLoading(false);
      }
    };

    // function handleCopy() {
    //   setCopied(true);
    //   setTimeout(() => setCopied(false), 1500);
    // }

    const showView = () => {
      setShowDetails(true);
      setTimeout(() => {
        document
          .getElementById("sectionId")
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    };
    const estimateBreakdown =
      apiResults?.estimate?.breakdown ||
      apiResults?.estimate?.schemes ||
      apiResults?.estimate?.incentives ||
      apiResults?.estimate?.data?.breakdown ||
      apiResults?.estimate?.result?.breakdown ||
      [];
    const incentiveTotal = readMetric(apiResults?.estimate, [
      "total_estimated_incentive",
      "estimated_total_incentive_inr",
      "total_incentive",
      "total_incentive_inr",
      "total_benefit",
      "data.total_incentive",
      "result.total_incentive",
    ]);
    const meisTotal = readMetric(apiResults?.meis, [
      "estimated_total_meis_benefit",
      "estimated_meis_benefit",
      "total_meis_benefit",
      "meis_benefit",
      "total_benefit",
      "estimated_benefit",
      "data.total_meis_benefit",
      "result.meis_benefit",
    ]);

    const handleDownloadPdf = () => {
      if (!reportInfo) {
        window.alert("Please run an incentive calculation before downloading the report.");
        return;
      }

      const escapeHtml = (value) =>
        String(value ?? "—").replace(/[&<>"']/g, (char) => ({
          "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
        })[char]);

      const report = reportInfo;
      const reportSearch = search || emptySearch;
      const result = report.result || apiResults || {};
      const estimate = result.estimate || {};
      const rows = estimate.breakdown || estimate.schemes || estimate.incentives ||
        estimate.data?.breakdown || estimate.result?.breakdown || [];
      const total = readMetric(estimate, [
        "total_estimated_incentive", "estimated_total_incentive_inr",
        "total_incentive", "total_incentive_inr", "total_benefit",
        "data.total_incentive", "result.total_incentive",
      ]);
      const inputRows = [
        ["HS Code", report.input?.hs_code || reportSearch.hsCode],
        ["Product", reportSearch.product],
        ["Origin Country", reportSearch.origin],
        ["Destination Country", reportSearch.destination],
        ["Shipment Value", report.input?.fob_value ?? reportSearch.value],
        ["Quantity", report.input?.quantity ?? reportSearch.quantity],
        ["MEIS Rate (%)", report.input?.meis_rate_pct ?? reportSearch.meis_rate_pct],
      ];
      const inputHtml = inputRows.map(([label, value]) =>
        `<div class="field"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`
      ).join("");
      const tableRows = (Array.isArray(rows) ? rows : []).map((row) => {
        const scheme = row.scheme || row.name || row.scheme_name || row.program || "Incentive scheme";
        const type = row.type || row.scheme_type || row.category || "Central";
        const applicable = row.applicableOn || row.applicable_on || row.basis || "Export Value";
        const rate = row.rate ?? row.rate_pct ?? row.rate_percent ?? row.benefit_rate;
        const rateText = rate == null || rate === "" ? "—" :
          (typeof rate === "number" ? `${rate}%` : rate);
        const benefit = readMetric(row, ["benefit", "estimated_benefit", "benefit_inr", "amount", "amount_inr", "value"]);
        const eligibility = row.eligibility || row.status ||
          (row.eligible === true ? "Eligible" : row.eligible === false ? "Not eligible" : "Not specified");
        return `<tr><td><strong>${escapeHtml(scheme)}</strong><small>${escapeHtml(row.fullName || row.description || row.full_name || "")}</small></td><td>${escapeHtml(type)}</td><td>${escapeHtml(applicable)}</td><td>${escapeHtml(rateText)}</td><td>${escapeHtml(formatINR(benefit))}</td><td>${escapeHtml(String(eligibility).replaceAll("_", " "))}</td></tr>`;
      }).join("");
      const generatedOn = report.generatedAt ? new Date(report.generatedAt).toLocaleString() : new Date().toLocaleString();
      const popup = window.open("", "_blank", "width=1000,height=750");
      if (!popup) {
        window.alert("Please allow pop-ups to generate your PDF report.");
        return;
      }
      popup.document.open();
      popup.document.write(`<!doctype html>
  <html><head><meta charset="utf-8"><title>${escapeHtml(report.id)} - Incentive Report</title>
  <style>
    @page { size: A4 landscape; margin: 14mm; }
    * { box-sizing: border-box; } body { font: 12px Arial, sans-serif; color: #172033; margin: 0; }
    header { display:flex; justify-content:space-between; align-items:flex-start; border-bottom:2px solid #0d9488; padding-bottom:14px; margin-bottom:18px; }
    h1 { font-size:22px; margin:0 0 5px; } .muted { color:#64748b; font-size:10px; }
    .meta { text-align:right; font-size:10px; line-height:1.7; }
    h2 { font-size:14px; margin:18px 0 9px; }
    .fields { display:grid; grid-template-columns:repeat(4,1fr); gap:8px; }
    .field { border:1px solid #e2e8f0; border-radius:6px; padding:9px; min-width:0; overflow-wrap:anywhere; }
    .field span { display:block; color:#64748b; font-size:10px; margin-bottom:5px; }
    .field strong { font-size:11px; } table { width:100%; border-collapse:collapse; margin-top:8px; }
    th { background:#f1f5f9; color:#475569; font-size:10px; text-align:left; }
    th,td { padding:9px 8px; border-bottom:1px solid #e2e8f0; vertical-align:top; }
    td { font-size:10px; } small { display:block; color:#64748b; margin-top:3px; font-size:9px; }
    tfoot td { font-weight:bold; color:#059669; font-size:12px; }
    .notice { margin-top:14px; color:#64748b; font-size:9px; }
    @media print { body { -webkit-print-color-adjust:exact; print-color-adjust:exact; } }
  </style></head><body>
  <header><div><h1>CargoMate — Incentive Report</h1><div class="muted">Export incentive estimate and scheme-wise breakdown</div></div>
  <div class="meta"><strong>Report ID:</strong> ${escapeHtml(report.id)}<br><strong>Generated:</strong> ${escapeHtml(generatedOn)}<br><strong>Generated by:</strong> ${escapeHtml(report.generatedBy || "Current user")}</div></header>
  <h2>Shipment Details</h2><div class="fields">${inputHtml}</div>
  <h2>Incentive Breakdown</h2>
  <table><thead><tr><th>Scheme / Program</th><th>Type</th><th>Applicable On</th><th>Rate / Benefit</th><th>Estimated Benefit (INR)</th><th>Eligibility</th></tr></thead>
  <tbody>${tableRows || '<tr><td colspan="6">No scheme-wise breakdown was returned by the API.</td></tr>'}</tbody>
  <tfoot><tr><td colspan="4" style="text-align:right">Total Estimated Incentive</td><td colspan="2">${escapeHtml(formatINR(total))}</td></tr></tfoot></table>
  <div class="notice">Estimates are indicative and subject to scheme rules and current government notifications. Verify with official sources before making business decisions.</div>
  <script>window.onload = () => { window.focus(); window.print(); };</script>
  </body></html>`);
      popup.document.close();
    };

    return (
      <div className=" bg-gray-50  flex-1 overflow-y-auto pt-14">
        {activeTab === "Incentive Checker" && showPopup && (
          <SearchPopup
            initial={emptySearch}
            onClose={() => setShowPopup(false)}
            onSubmit={(data) => {
              setSearch(data);
              setShowPopup(false);
              runIncentiveCheck(data);
            }}
          />
        )}
        {activeTab === "Incentive Checker" && (
          <div>
            {/* {(apiLoading || apiError || apiResults) && (
              <div className="mx-4 sm:mx-6 mt-3 rounded-lg border bg-white p-3 text-xs">
                {apiLoading && (
                  <p className="text-blue-700">
                    Calculating incentives from the live API…
                  </p>
                )}
                {apiError && <p className="text-red-600">{apiError}</p>}
                {apiResults && (
                  <details>
                    <summary className="font-semibold text-gray-800 mb-1 cursor-pointer">
                      View raw API responses
                    </summary>
                    <pre className="max-h-48 overflow-auto whitespace-pre-wrap break-words text-gray-600">
                      {JSON.stringify(apiResults, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            )} */}
            <div className=" border-gray-200 px-4 sm:px-6 py-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    Incentive Checker
                  </h1>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Find applicable incentives and estimated benefits for your
                    shipment.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {/* <button className="flex items-center gap-1.5 border border-gray-200 bg-white text-gray-700 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-gray-50">
                <FiArrowLeft size={12} /> New Search
              </button> */}
                  {/* <button className="flex items-center gap-1.5 border border-gray-200 bg-white text-gray-700 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-gray-50">
                <FiSave size={12} /> Save Report
              </button>
              <button className="flex items-center gap-1.5 border border-gray-200 bg-white text-gray-700 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-gray-50">
                <FiDownload size={12} /> Download Report (PDF)
              </button> */}
                  <button
                    type="button"
                    onClick={() => setShowPopup(true)}
                    className="flex items-center gap-1.5 border border-teal-500 bg-white hover:bg-teal-50 text-teal-700 text-xs font-semibold px-3 py-1.5 rounded-lg"
                  >
                    <FiDatabase size={12} /> Your Search
                  </button>
                  <button
                    onClick={() => {
                      setShipment("shipment");
                      setActiveTab("");
                    }}
                    className="flex items-center gap-1.5 bg-teal-500 hover:bg-teal-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg"
                  >
                    <FiPlus size={12} /> Create Shipment
                  </button>
                </div>
              </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6 py-4 grid grid-cols-1 xl:grid-cols-[1fr_290px] gap-4">
              <div className="flex flex-col gap-4 min-w-0">
                {/* <div className="flex items-start gap-2 bg-teal-50 border border-teal-200 rounded-lg px-3 py-2.5 text-xs text-teal-800">
                  <FiInfo
                    size={14}
                    className="text-teal-500 flex-shrink-0 mt-0.5"
                  />
                  This result is based on the data sources and assumptions listed
                  below. Please review before making any trade decisions.
                </div> */}

                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-9 h-9 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                      <FiDatabase className="text-blue-500 text-base" />
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      Your Search
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
                    {[
                      ["HS Code", search.hsCode],
                      ["Product", search.product],
                      ["Origin Country", search.origin],
                      ["Destination Country", search.destination],
                      ["Shipment Value", search.value],
                      ["Quantity", search.quantity],
                      ["MEIS Rate (%)", search.meis_rate_pct],
                    ].map(([k, v]) => (
                      <div key={k}>
                        <p className="text-[10px] text-gray-400 font-medium mb-0.5">
                          {k}
                        </p>
                        <p className="text-xs font-semibold text-gray-800 leading-tight">
                          {v || "-"}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-2 border-t border-gray-100">
                    <p className="text-[10px] text-gray-400">
                      Search ID: {reportInfo?.id || "Not generated yet"}{" "}
                      &nbsp;•&nbsp;{" "}
                      {reportInfo?.generatedAt
                        ? new Date(reportInfo.generatedAt).toLocaleString()
                        : "Run a calculation to generate a report"}{" "}
                      &nbsp;•&nbsp; User:{" "}
                      {reportInfo?.generatedBy ||
                        localStorage.getItem("userName") ||
                        localStorage.getItem("name") ||
                        "Current user"}
                    </p>
                    <button
                      onClick={showView}
                      className="flex items-center gap-1.5 border border-gray-200 bg-white text-gray-600 text-[11px] font-medium px-3 py-1.5 rounded-lg hover:bg-gray-50 w-fit"
                    >
                      View Detail{" "}
                    </button>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <p className="text-sm font-semibold text-gray-800 mb-3">
                    Estimated Total Incentive (INR)
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4 items-center">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {formatINR(
                          readMetric(apiResults?.estimate, [
                            "total_estimated_incentive",
                            "estimated_total_incentive_inr",
                            "total_incentive",
                            "total_incentive_inr",
                            "total_benefit",
                            "data.total_incentive",
                            "result.total_incentive",
                          ]),
                        )}
                      </p>
                      <div className="mt-2 flex items-center gap-1.5">
                        <span className="text-[11px] text-gray-500 font-medium">
                          Total Incentive Rate
                        </span>
                        <span className="bg-teal-100 text-teal-700 text-[11px] font-semibold px-2 py-0.5 rounded-full">
                          {readMetric(apiResults?.estimate, [
                            "total_estimated_incentive",
                            "incentive_rate_pct",
                            "total_rate_pct",
                            "rate_pct",
                            "data.rate_pct",
                          ]) != null
                            ? `${readMetric(apiResults?.estimate, ["total_incentive_rate_pct", "incentive_rate_pct", "total_rate_pct", "rate_pct", "data.rate_pct"])}%`
                            : "API estimate"}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="border border-gray-100 rounded-xl p-3 flex items-start gap-3">
                        <div className="w-9 h-9 bg-teal-50 rounded-full flex items-center justify-center flex-shrink-0">
                          <MdOutlineAccountBalance className="text-teal-500 text-2xl" />
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-500 font-medium">
                            Central Incentives
                          </p>
                          <p className="text-lg font-bold text-gray-900">
                            {formatINR(
                              readMetric(apiResults?.estimate, [
                                "central_incentives",
                                "central_incentive",
                                "central_incentive_inr",
                                "central_total",
                                "data.central_incentive",
                              ]),
                            )}
                          </p>
                          {/* <p className="text-[10px] text-gray-400">
                            From API response
                          </p> */}
                        </div>
                      </div>
                      <div className="border border-gray-100 rounded-xl p-3 flex items-start gap-3">
                        <div className="w-9 h-9 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0">
                          <MdOutlineLocationOn className="text-red-400 text-2xl" />
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-500 font-medium">
                            State Incentives
                          </p>
                          <p className="text-lg font-bold text-gray-900">
                            {formatINR(
                              readMetric(apiResults?.estimate, [
                                "state_incentives",
                                "state_incentive",
                                "state_incentive_inr",
                                "state_total",
                                "data.state_incentive",
                              ]),
                            )}
                          </p>
                            {/* <p className="text-[10px] text-gray-400">
                              From API response
                            </p> */}
                        </div>
                      </div>
                      <div className="border border-gray-100 rounded-xl p-3 flex items-start gap-3">
                        <div className="w-9 h-9 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                          <BsGraphUpArrow className="text-blue-400 text-2xl" />
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-500 font-medium">
                            Estimated Total MEIS Benefit
                          </p>
                          <p className="text-lg font-bold text-gray-900">
                            {formatINR(
                              readMetric(apiResults?.meis, [
                                "estimated_total_meis_benefit",
                                "estimated_meis_benefit",
                                "total_meis_benefit",
                                "meis_benefit",
                                "total_benefit",
                                "estimated_benefit",
                                "data.total_meis_benefit",
                                "result.meis_benefit",
                              ]),
                            )}
                          </p>
                          {/* <p className="text-[10px] text-gray-400">
                            Calculated by /incentive/meis
                          </p> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-3">
                    Incentives are subject to eligibility and compliance with
                    applicable scheme conditions.
                  </p>
                </div>

                {showDetails && (
                  <div
                    className="bg-white border border-gray-200 rounded-xl p-4"
                    id="sectionId"
                  >
                    <div className=" flex justify-between items-center mb-3">
                      <p className="text-base pl-3 font-semibold text-gray-800 ">
                        Incentive Breakdown
                      </p>
                      {/* <button className="flex items-center  border border-gray-200 text-teal-600 text-xs font-medium px-2 py-2 rounded-lg hover:bg-teal-50  justify-center">
                  View Scheme Details & Eligibility 
                </button> */}
                    </div>
                    <div className="overflow-x-auto rounded-lg border border-gray-100">
                      <table className="w-full min-w-[680px] border-collapse text-left">
                        <thead>
                          <tr className="bg-slate-50">
                            {[
                              "Scheme / Program",
                              "Type",
                              "Applicable On",
                              "Rate / Benefit",
                              "Estimated Benefit (INR)",
                              "Eligibility",
                            ].map((heading) => (
                              <th
                                key={heading}
                                className="whitespace-nowrap px-3 py-3 text-[10px] font-semibold text-slate-500"
                              >
                                {heading}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {(Array.isArray(estimateBreakdown) ? estimateBreakdown : []).map((row, i) => {
                            const schemeName = row.scheme || row.name || row.scheme_name || row.program || "Incentive scheme";
                            const schemeDescription = row.fullName || row.description || row.full_name || "";
                            const schemeType = row.type || row.scheme_type || row.category || "Central";
                            const eligibilityRaw = row.eligibility || row.status || (row.eligible === true ? "Eligible" : row.eligible === false ? "Not eligible" : "Not specified");
                            const isEligible = row.eligible === true || String(eligibilityRaw).toLowerCase() === "eligible";
                            const rate = row.rate ?? row.rate_pct ?? row.rate_percent ?? row.benefit_rate;
                            const rateLabel = rate === undefined || rate === null || rate === "" ? "—" : (typeof rate === "number" && !String(rate).includes("%") ? `${rate}%` : rate);
                            const benefit = readMetric(row, ["benefit", "estimated_benefit", "benefit_inr", "amount", "amount_inr", "value"]);
                            const typeClass = /state/i.test(String(schemeType))
                              ? "bg-amber-50 text-amber-700"
                              : "bg-emerald-50 text-emerald-700";

                            return (
                              <tr key={row.id || row.scheme_code || `${schemeName}-${i}`} className="border-t border-slate-100 hover:bg-slate-50/70">
                                <td className="px-3 py-3 align-middle">
                                  <p className="text-[11px] font-semibold text-slate-900">{schemeName}</p>
                                  {schemeDescription && <p className="mt-0.5 max-w-[260px] text-[9px] leading-4 text-slate-400">{schemeDescription}</p>}
                                </td>
                                <td className="px-3 py-3 align-middle">
                                  <span className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[9px] font-semibold ${typeClass}`}>
                                    {schemeType}
                                  </span>
                                </td>
                                <td className="whitespace-nowrap px-3 py-3 text-[10px] font-medium text-slate-600">
                                  {row.applicableOn || row.applicable_on || row.basis || "Export Value"}
                                </td>
                                <td className="whitespace-nowrap px-3 py-3 text-[10px] font-semibold text-slate-800">{rateLabel}</td>
                                <td className="whitespace-nowrap px-3 py-3 text-[10px] font-bold text-slate-900">{formatINR(benefit)}</td>
                                <td className="px-3 py-3">
                                  <span className={`inline-flex items-center gap-1 whitespace-nowrap text-[10px] font-semibold ${isEligible ? "text-emerald-600" : "text-slate-400"}`}>
                                    {isEligible ? <FiCheckCircle size={12} /> : <FiXCircle size={12} />}
                                    {String(eligibilityRaw).replaceAll("_", " ").replace(/^\w/, (c) => c.toUpperCase())}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                          {!estimateBreakdown.length && (
                            <tr className="border-t border-slate-100">
                              <td colSpan={6} className="px-3 py-6 text-center text-[11px] text-slate-400">
                                {apiResults?.estimate
                                  ? "The API did not return a line-item breakdown. See the complete response in Report Information."
                                  : "Run a calculation to view actual scheme-wise benefits."}
                              </td>
                            </tr>
                          )}
                        </tbody>
                        <tfoot>
                          <tr className="border-t border-slate-200 bg-white">
                            <td colSpan={4} className="px-3 py-3 text-right text-[11px] font-bold text-slate-900">
                              Total Estimated Incentive
                            </td>
                            <td colSpan={2} className="px-3 py-3 text-[12px] font-bold text-emerald-600">
                              {formatINR(incentiveTotal)}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-3 sm:grid-cols-3 gap-3 min-w-0 mb-4">
                  <div className="bg-white border border-gray-200 rounded-xl p-4  ">
                    <p className="text-sm font-semibold text-gray-800 mb-3">
                      Data Sources Used
                    </p>
                    <div className="flex flex-col gap-2">
                      {(
                        apiResults?.estimate?.sources ||
                        apiResults?.estimate?.data?.sources ||
                        apiResults?.estimate?.result?.sources ||
                        []
                      ).length > 0 ? (
                        (
                          apiResults?.estimate?.sources ||
                          apiResults?.estimate?.data?.sources ||
                          apiResults?.estimate?.result?.sources ||
                          []
                        ).map((source, index) => (
                          <div
                            key={`${source}-${index}`}
                            className="flex min-w-0 items-start gap-2 text-xs leading-4 text-gray-600"
                          >
                            <FiDatabase
                              size={12}
                              className="mt-0.5 flex-shrink-0 text-gray-400"
                            />
                            <span className="min-w-0 break-words">
                              {String(source).replaceAll("_", " ")}
                            </span>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-gray-400">
                          No data sources were returned by the API.
                        </p>
                      )}
                    </div>
                    {/* <button className="mt-3 text-teal-500 text-xs font-medium hover:underline flex items-center gap-1">
                  View All Sources <FiChevronRight size={12} />
                </button> */}
                  </div>

                  

                  <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-800 mb-2">
                        Disclaimer
                      </p>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        Incentives are subject to change as per government
                        notifications. Please verify with official sources before
                        making any business decisions.
                      </p>
                      {/* <button className="mt-2 text-blue-500 text-xs font-medium hover:underline">Read Full Disclaimer</button> */}
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <p className="text-sm font-semibold text-gray-800 mb-1">
                      Need Help?
                    </p>
                    <p className="text-xs text-gray-500 mb-2 pt-3">
                      Our trade experts are here to help you.
                    </p>
                    <div className="flex items-center gap-1.5 text-xs pt-2 text-gray-600 mb-1">
                      <FiPhone size={11} className="text-teal-500 " /> +91 22 1234
                      5678
                    </div>
                    <div className="flex items-center gap-1.5 text-xs pt-2 text-gray-600 mb-3">
                      <FiMail size={11} className="text-teal-500" />{" "}
                      support@asdcargomate.com
                    </div>
                    {/* <button className="w-full border border-gray-200 text-gray-700 text-xs font-medium py-2 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-1.5">
                    <FiMessageSquare size={12} /> Chat with Expert
                  </button> */}
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-4 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 mb-3">
                      Breakdown
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
                      {estimateBreakdown.length > 0 ? (
                        estimateBreakdown.map((item, index) => {
                          const scheme = item.scheme || item.name || item.scheme_name || "Incentive scheme";
                          const eligibility = item.eligibility || "no_data";
                          const eligible = String(eligibility).toLowerCase() === "eligible";
                          const rate = item.rate_pct;
                          const benefit = item.estimated_benefit;
                          const detail = item.detail;

                          return (
                            <div
                              key={`${scheme}-${index}`}
                              className="rounded-lg border border-gray-100 bg-gray-50/70 p-3"
                            >
                              <div className="flex flex-wrap items-start justify-between gap-2">
                                <p className="text-xs font-semibold text-gray-800">
                                  {scheme}
                                </p>
                                <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                                  eligible
                                    ? "bg-emerald-50 text-emerald-700"
                                    : String(eligibility).toLowerCase() === "not_applicable"
                                      ? "bg-amber-50 text-amber-700"
                                      : "bg-gray-100 text-gray-600"
                                }`}>
                                  {String(eligibility).replaceAll("_", " ")}
                                </span>
                              </div>
                              <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-2 text-[11px]">
                                <div>
                                  <span className="block text-gray-400">Type</span>
                                  <span className="font-medium text-gray-700">{item.type || "—"}</span>
                                </div>
                                <div>
                                  <span className="block text-gray-400">Applicable On</span>
                                  <span className="font-medium text-gray-700">{item.applicable_on || "—"}</span>
                                </div>
                                <div>
                                  <span className="block text-gray-400">Rate</span>
                                  <span className="font-medium text-gray-700">
                                    {rate === null || rate === undefined || rate === "" ? "—" : `${rate}%`}
                                  </span>
                                </div>
                                <div>
                                  <span className="block text-gray-400">Estimated Benefit</span>
                                  <span className="font-semibold text-gray-800">
                                    {formatINR(benefit ?? 0)}
                                  </span>
                                </div>
                              </div>
                              {detail && (
                                <p className="mt-2 text-[11px] leading-4 text-gray-500">
                                  {detail}
                                </p>
                              )}
                            </div>
                          );
                        })
                      ) : (
                        <p className="text-xs text-gray-400">
                          No scheme breakdown was returned by the API.
                        </p>
                      )}
                    </div>
                  </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <p className="text-sm font-semibold text-gray-900 mb-3">
                    Result Summary
                  </p>
                  {[
                    {
                      icon: FiCheckCircle,
                      iconColor: "text-teal-500",
                      label: "Best Applicable Scheme",
                      value:
                        apiResults?.estimate?.best_scheme ||
                        apiResults?.estimate?.best_applicable_scheme ||
                        "See API result",
                      valueColor: "",
                    },
                    {
                      icon: FiAlertCircle,
                      iconColor: "text-teal-500",
                      label: "Total Incentive (INR)",
                      value: formatINR(incentiveTotal),
                      valueColor: "",
                    },
                    {
                      icon: FiAlertTriangle,
                      iconColor: "text-orange-400",
                      label: "Estimated MEIS (INR)",
                      value: formatINR(meisTotal),
                      valueColor: "",
                    },
                    // {
                    //   icon: FiInfo,
                    //   iconColor: "text-blue-400",
                    //   label: "Based On",
                    //   value: apiResults?.estimate?.sources[0] ||
                    //      "Live API calculation",
                    //   valueColor: "",
                    // },
                    {
    icon: FiInfo,
    iconColor: "text-blue-400",
    label: "Based On",
    value: Array.isArray(apiResults?.estimate?.sources)
      && apiResults.estimate.sources.length > 0
        ? apiResults.estimate.sources.join(", ")
        : "Live API calculation",
    valueColor: "",
  },
                    {
                      icon: FiCheckCircle,
                      iconColor: "text-emerald-500",
                      label: "Input Tax Credit",
                      value:
                        apiResults?.estimate?.input_tax_credit ??
                        apiResults?.estimate?.inputTaxCredit ??
                        "Not supplied",
                      valueColor: "",
                    },
                  ].map(({ icon: Icon, iconColor, label, value }, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0 text-xs gap-2"
                    >
                      <div className="flex items-center gap-2 text-gray-500">
                        <Icon size={13} className={iconColor} /> {label}
                      </div>
                      <span className="font-semibold text-gray-900 text-right">
                        {value}
                      </span>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      setShipment("shipment");
                      setActiveTab("");
                    }}
                    className="mt-3 w-full bg-teal-500 hover:bg-teal-600 text-white text-xs font-semibold py-2.5 rounded-xl"
                  >
                    Create Shipment
                  </button>
                </div>

                {hasSearched && reportInfo && (
                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <p className="text-sm font-semibold text-gray-900 mb-3">
                      Report Information
                    </p>
                  {[
                    ["Report ID", reportInfo?.id || "Not generated yet"],
                    [
                      "Generated On",
                      reportInfo?.generatedAt
                        ? new Date(reportInfo.generatedAt).toLocaleString()
                        : "—",
                    ],
                    [
                      "Generated By",
                      reportInfo?.generatedBy ||
                        localStorage.getItem("userName") ||
                        localStorage.getItem("name") ||
                        "Current user",
                    ],
                    ["Product", search.product || "—"],
                    ["HS Code", search.hsCode || "—"],
                    ["Shipment Value (INR)", search.value || "—"],
                    [
                      "Estimated Incentive (INR)",
                      formatINR(
                        readMetric(reportInfo?.result?.estimate, [
                          "estimated_total_incentive",
                          "estimated_total_incentive_inr",
                          "total_incentive",
                          "total_incentive_inr",
                          "total_benefit",
                          "data.total_incentive",
                          "result.total_incentive",
                        ]),
                      ),
                    ],
                    [
                      "Estimated MEIS Benefit (INR)",
                      formatINR(
                        readMetric(reportInfo?.result?.meis, [
                          "estimated_total_meis_benefit",
                          "estimated_meis_benefit",
                          "total_meis_benefit",
                          "meis_benefit",
                          "total_benefit",
                          "estimated_benefit",
                          "data.total_meis_benefit",
                          "result.meis_benefit",
                        ]),
                      ),
                    ],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="flex justify-between py-1.5 text-[11px] border-b border-gray-100 last:border-0"
                    >
                      <span className="text-gray-500">{k}</span>
                      <span className="text-gray-800 font-medium">{v}</span>
                    </div>
                  ))}
                  {/* {reportInfo && (
                    <details className="mt-3 text-[11px] text-gray-500">
                      <summary className="cursor-pointer font-semibold">
                        View complete calculation report
                      </summary>
                      <pre className="mt-2 max-h-48 overflow-auto whitespace-pre-wrap break-words rounded-lg bg-gray-50 p-2">
                        {JSON.stringify(reportInfo, null, 2)}
                      </pre>
                    </details>
                  )} */}
                    <button
                      type="button"
                      onClick={handleDownloadPdf}
                      className="mt-3 w-full flex items-center justify-center gap-2 border border-gray-200 bg-white text-teal-600 text-xs font-medium py-2 rounded-lg hover:bg-teal-50"
                    >
                      <FiDownload size={12} /> Download Report (PDF)
                    </button>
                  </div>
                )}

                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <p className="text-sm font-semibold text-gray-900 mb-1">
                    Save & Share
                  </p>
                  <p className="text-[11px] text-gray-500 mb-3">
                    Save this report for future reference or share with your team.
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="flex items-center justify-center gap-1 border border-gray-200 bg-white text-gray-700 text-[11px] font-medium py-2 rounded-lg hover:bg-gray-50">
                      <FiBookmark size={14} /> Save to Saved Reports
                    </button>
                    <button className="flex items-center justify-center gap-1.5 border border-gray-200 bg-white text-gray-700 text-[11px] font-medium py-2 rounded-lg hover:bg-gray-50">
                      <FiShare2 size={12} /> Share Report
                    </button>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3 gap-2">
                    <p className="text-sm font-semibold text-gray-900">
                      Audit Log (This Search)
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-gray-400">
                        {auditEntries.length} events
                      </span>
                      {auditEntries.length > 0 && (
                        <button
                          type="button"
                          onClick={() => { setAuditPage(1); setShowAllAuditModal(true); }}
                          className="text-[11px] font-semibold text-teal-700 hover:text-teal-900 whitespace-nowrap"
                        >View All</button>
                      )}
                    </div>
                  </div>
                  {auditEntries.length ? (
                    auditEntries.slice(0, 5).map((entry) => (
                      <div
                        key={entry.id}
                        className="flex items-start gap-2 py-1.5 border-b border-gray-100 last:border-0"
                      >
                        <span className="w-2 h-2 rounded-full bg-teal-500 flex-shrink-0 mt-1" />
                        <span className="text-[10px] text-gray-400 whitespace-nowrap">
                          {entry.time}
                        </span>
                        <span className="text-[11px] text-gray-600">{entry.text}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-[11px] text-gray-400">
                      Successful incentive searches will appear here.
                    </p>
                  )}
                </div>
         
              <DashboardAdPlacement location="User Dashboard - Incentive Checker" />

              </div>
            </div>

       
          </div>
        )}

        {showAllAuditModal && shipment !== "shipment" && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4"
            onClick={(event) => { if (event.target === event.currentTarget) setShowAllAuditModal(false); }}
          >
            <div className="w-full max-w-3xl max-h-[85vh] overflow-hidden rounded-2xl bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                <div>
                  <h2 className="text-base font-bold text-gray-900">All Audit Logs</h2>
                  <p className="mt-1 text-xs text-gray-500">{auditEntries.length} total events · 15 logs per page</p>
                </div>
                <button type="button" onClick={() => setShowAllAuditModal(false)} aria-label="Close audit logs" className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900">
                  <FiX size={18} />
                </button>
              </div>
              <div className="max-h-[calc(85vh-145px)] overflow-y-auto px-5 py-3">
                {paginatedAuditEntries.length ? paginatedAuditEntries.map((entry) => (
                  <div key={entry.id} className="flex items-start gap-3 border-b border-gray-100 py-3 last:border-0">
                    <span className="mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-teal-500" />
                    <span className="w-32 flex-shrink-0 text-xs text-gray-400">{entry.time}</span>
                    <span className="text-sm text-gray-700 break-words">{entry.text}</span>
                  </div>
                )) : <p className="py-8 text-center text-sm text-gray-400">No audit logs available.</p>}
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-gray-200 px-5 py-4">
                <span className="text-xs text-gray-500">Page {Math.min(auditPage, auditPageCount)} of {auditPageCount}</span>
                <div className="flex gap-2">
                  <button type="button" disabled={auditPage <= 1} onClick={() => setAuditPage((page) => Math.max(1, page - 1))} className="rounded-lg border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40">Previous</button>
                  <button type="button" disabled={auditPage >= auditPageCount} onClick={() => setAuditPage((page) => Math.min(auditPageCount, page + 1))} className="rounded-lg bg-teal-700 px-4 py-2 text-xs font-semibold text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-40">Next</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {shipment === "shipment" && (
          <div>
            <Shipment
              setActiveTab={setActiveTab}
              setShipment={setShipment}
              currentTab={"Incentive Checker"}
            />
          </div>
        )}
      </div>
    );
  }
