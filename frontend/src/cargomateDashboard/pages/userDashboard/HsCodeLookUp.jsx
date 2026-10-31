

// import { useEffect, useState } from "react";
// import {
//   FiArrowLeft,
//   FiSave,
//   FiDownload,
//   FiPlus,
//   FiSearch,
//   FiX,
//   FiChevronDown,
//   FiFilter,
//   FiEye,
//   FiCheckCircle,
//   FiAlertCircle,
//   FiAlertTriangle,
//   FiDatabase,
//   FiChevronRight,
//   FiPhone,
//   FiMail,
//   FiWifi,
//   FiInfo,
// } from "react-icons/fi";
// import { BsShieldCheck } from "react-icons/bs";
// import { MdOutlineVerified } from "react-icons/md";
// import NeedHelp from "../../components/core/NeedHelp";
// import Shipment from "../../components/ShipmentForm";
// import poster2 from "../../assets/Images/webp/poster2.webp";
// import { lookupHsCode } from "../../api/CargoMateApi";
// import DashboardAdPlacement from "../../components/DashboardAdPlacement";

// const getAuditUserScope = () => {
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

// const otherMatches = [
//   {
//     code: "6109.90.00",
//     desc: "Other T-shirts, singlets and other vests, of cotton",
//     score: 78,
//     type: "8 Digit",
//     duty: "5%",
//   },
//   {
//     code: "6109.20.00",
//     desc: "T-shirts, singlets and other vests, of synthetic fibers",
//     score: 45,
//     type: "8 Digit",
//     duty: "5%",
//   },
//   {
//     code: "6105.00.00",
//     desc: "Shirts of cotton, knitted or crocheted",
//     score: 35,
//     type: "8 Digit",
//     duty: "5%",
//   },
// ];

// const detailTabs = [
//   "HS Code Details",
//   "Description & Notes",
//   "RBI Policy",
//   "Country Rule",
//   "Related Products",
//   "History",
// ];

// const hsDetails = [
//   ["HS Code", "6109.10.00"],
//   ["Description", "T-shirts, singlets and other vests, of cotton"],
//   [
//     "Chapter",
//     "61 - Articles of apparel and clothing accessories, knitted or crocheted",
//   ],
//   [
//     "Heading",
//     "6109 - T-shirts, singlets and other vests, knitted or crocheted",
//   ],
//   ["Sub Heading", "6109.10 - Of cotton"],
//   ["HS Code Type", "8 Digit"],
//   ["Classification Year", "2022"],
//   ["WCO Version", "HS 2022"],
// ];

// const assumptions = [
//   "Product is 100% cotton.",
//   "Product is knitted.",
//   "Product is for men (general usage).",
//   "Not specially designed for infants.",
// ];

// const auditLog = [
//   {
//     color: "bg-teal-500",
//     time: "09:25 AM",
//     text: "Query Submitted by Arjun Soni",
//   },
//   { color: "bg-blue-500", time: "09:25 AM", text: "AI Processing Started" },
//   {
//     color: "bg-yellow-500",
//     time: "09:25 AM",
//     text: "HS Code Identified: 6109.10.00",
//   },
//   {
//     color: "bg-teal-500",
//     time: "09:26 AM",
//     text: "Incentives Calculated Successfully",
//   },
//   {
//     color: "bg-teal-500",
//     time: "09:26 AM",
//     text: "Freight Rates Fetched (Air)",
//   },
//   {
//     color: "bg-emerald-500",
//     time: "09:26 AM",
//     text: "Report Generated Successfully",
//   },
// ];

// const docReqs = [
//   "Commercial Invoice",
//   "Packing List",
//   "Certificate of Origin",
//   "Bill of Lading / Airway Bill",
//   "Import Declaration",
// ];

// const dataSources = [
//   { icon: FiDatabase, label: "DGFT (India)" },
//   { icon: FiDatabase, label: "ICEGATE" },
//   { icon: FiDatabase, label: "UAE Customs" },
//   { icon: FiDatabase, label: "WCO HS" },
//   { icon: FiDatabase, label: "Trade APIs" },
//   { icon: FiDatabase, label: "Market Data" },
// ];

// function ScoreBar({ score, color = "bg-emerald-500" }) {
//   return (
//     <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
//       <div
//         className={`h-full ${color} rounded-full`}
//         style={{ width: `${score}%` }}
//       />
//     </div>
//   );
// }

// export default function HSCodeLookup() {
//   const [activeTab, setActiveTab] = useState("HS Code Lookup");
//   const [query, setQuery] = useState("");
//   const [exportCountry, setExportCountry] = useState("India");
//   const [importCountry, setImportCountry] = useState("United Arab Emirates");
//   const [quantity, setQuantity] = useState("500");
//   const [unit, setUnit] = useState("KG");
//   const [queryMeta, setQueryMeta] = useState(() => {
//     try {
//       return JSON.parse(
//         localStorage.getItem(
//           `cargomate_hs_lookup_summary_${getAuditUserScope()}`,
//         ) || "null",
//       );
//     } catch {
//       return null;
//     }
//   });
//   const [showAuditModal, setShowAuditModal] = useState(false);
//   const [auditPage, setAuditPage] = useState(1);
//   const AUDIT_PAGE_SIZE = 15;
//   const [auditEntries, setAuditEntries] = useState(() => {
//     try {
//       return JSON.parse(
//         localStorage.getItem(
//           `cargomate_hs_lookup_audit_${getAuditUserScope()}`,
//         ) || "[]",
//       );
//     } catch {
//       return [];
//     }
//   });
//   const [shipment, setShipment] = useState("");

//   const auditPageCount = Math.max(1, Math.ceil(auditEntries.length / AUDIT_PAGE_SIZE));
//   const visibleAuditEntries = auditEntries.slice(0, 5);
//   const paginatedAuditEntries = auditEntries.slice(
//     (auditPage - 1) * AUDIT_PAGE_SIZE,
//     auditPage * AUDIT_PAGE_SIZE,
//   );

//   const [showDetails, setShowDetails] = useState(false);
//   const [lookupResult, setLookupResult] = useState(null);
//   const [lookupLoading, setLookupLoading] = useState(false);
//   const [lookupError, setLookupError] = useState("");
//   useEffect(() => {
//     localStorage.setItem(
//       `cargomate_hs_lookup_audit_${getAuditUserScope()}`,
//       JSON.stringify(auditEntries.slice(0, 50)),
//     );
//   }, [auditEntries]);
//   useEffect(() => {
//     if (queryMeta)
//       localStorage.setItem(
//         `cargomate_hs_lookup_summary_${getAuditUserScope()}`,
//         JSON.stringify(queryMeta),
//       );
//   }, [queryMeta]);

//   const runLookup = async () => {
//     if (!query.trim()) {
//       setLookupError("Enter a product description first.");
//       return;
//     }
//     if (!quantity || Number(quantity) <= 0) {
//       setLookupError("Enter a quantity greater than zero.");
//       return;
//     }
//     setLookupLoading(true);
//     setLookupError("");
//     const searchedAt = new Date().toISOString();
//     const queryId = `HSQ-${Date.now().toString(36).toUpperCase()}`;
//     // const payload = { product_description: query.trim(), country_of_export: exportCountry, country_of_import: importCountry, quantity: Number(quantity), unit };

//     const payload = {
//       product: query.trim(),
//       export_country: exportCountry,
//       import_country: importCountry,
//       quantity: Number(quantity),
//       unit,
//       shipment_type: "general_export",
//       include_tariff: true,
//     };

//     // try {
//     //   const res = await lookupHsCode(payload);
//     //   const data = res?.data ?? res;
//     //   setLookupResult(data);
//     //   setQueryMeta({
//     //     ...payload,
//     //     searchedAt,
//     //     queryId,
//     //     searchedBy:
//     //       localStorage.getItem("userName") ||
//     //       localStorage.getItem("name") ||
//     //       "Current user",
//     //   });
//     //   const entry = {
//     //     id: queryId,
//     //     text: `HS Code lookup submitted for “${query.trim()}”`,
//     //     time: new Date(searchedAt).toLocaleTimeString([], {
//     //       hour: "2-digit",
//     //       minute: "2-digit",
//     //     }),
//     //     searchedAt,
//     //     product: query.trim(),
//     //     result: data,
//     //   };
//     //   setAuditEntries((prev) => [entry, ...prev].slice(0, 50));
//     // } catch (err) {
//     //   setLookupError(
//     //     err?.response?.data?.detail ||
//     //       err?.response?.data?.message ||
//     //       err.message ||
//     //       "HS code lookup failed.",
//     //   );
//     // } finally {
//     //   setLookupLoading(false);
//     // }

//     try {
//       const res = await lookupHsCode(payload);

//       console.log("HS Lookup Request:", res.config.url);
//       console.log("HS Lookup Parameters:", res.config.params);
//       console.log("HS Lookup Status:", res.status);
//       console.log("HS Lookup API Response:", res.data);

//       const data = res.data;
//       setLookupResult(data);

//       const searchedBy =
//         localStorage.getItem("userName") ||
//         localStorage.getItem("name") ||
//         "Current user";

//       setQueryMeta({
//         product_description: query.trim(),
//         country_of_export: exportCountry,
//         country_of_import: importCountry,
//         quantity: Number(quantity),
//         unit,
//         searchedAt,
//         queryId,
//         searchedBy,
//       });

//       const entry = {
//         id: queryId,
//         text: `HS Code lookup submitted for “${query.trim()}”`,
//         time: new Date(searchedAt).toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         }),
//         searchedAt,
//         product: query.trim(),
//         result: data,
//       };

//       setAuditEntries((prev) => [entry, ...prev].slice(0, 50));
//       setAuditPage(1);
//     } catch (err) {
//       console.error(
//         "HS Lookup API Error:",
//         err.response?.status,
//         err.response?.data || err.message,
//       );

//       const detail = err.response?.data?.detail;

//       setLookupError(
//         typeof detail === "string"
//           ? detail
//           : Array.isArray(detail)
//             ? detail.map((item) => item.msg).join(", ")
//             : err.response?.data?.message ||
//               err.message ||
//               "HS code lookup failed.",
//       );
//     } finally {
//       setLookupLoading(false);
//     }
//   };
//   const bestMatch =
//     lookupResult?.best_match ||
//     lookupResult?.result?.best_match ||
//     lookupResult?.data?.best_match ||
//     lookupResult?.result ||
//     lookupResult?.data ||
//     lookupResult ||
//     {};
//   const resultHsCode =
//     bestMatch?.hs_code || bestMatch?.hsCode || bestMatch?.hs_code_value || "—";
//   const resultDescription =
//     bestMatch?.description ||
//     bestMatch?.product_description ||
//     bestMatch?.label ||
//     "";
//   const resultConfidence =
//     bestMatch?.confidence ??
//     bestMatch?.confidence_score ??
//     bestMatch?.match_score ??
//     null;
//   const dutyInfo =
//     lookupResult?.duty_tax ||
//     lookupResult?.duties ||
//     lookupResult?.tariff ||
//     lookupResult?.result?.duty_tax ||
//     lookupResult?.result?.duties ||
//     {};
//   const tradeInfo =
//     lookupResult?.trade_information ||
//     lookupResult?.trade_info ||
//     lookupResult?.result?.trade_information ||
//     {};
//   const dutyRows = Object.entries(dutyInfo)
//     .filter(
//       ([, value]) =>
//         value !== null && value !== undefined && typeof value !== "object",
//     )
//     .slice(0, 6);
//   const tradeRows = Object.entries(tradeInfo)
//     .filter(
//       ([, value]) =>
//         value !== null && value !== undefined && typeof value !== "object",
//     )
//     .slice(0, 6);

//   return (
//     <div className=" bg-gray-50   flex-1  pt-14">
//       {activeTab === "HS Code Lookup" && (
//         <div className="">
//           <div className="  border-gray-200 px-4 sm:px-6 py-3">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//               <div>
//                 <h1 className="text-lg font-bold text-gray-900">
//                   HS Code Lookup
//                 </h1>
//                 <p className="text-xs font-normal text-gray-500 mt-0.5">
//                   Find the right HS code and get duty, tax, and trade insights.
//                 </p>
//               </div>
//               <div className="flex flex-wrap gap-2">
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

//           <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6  grid grid-cols-1 xl:grid-cols-[1fr_290px] gap-4 ">
//             <div className="flex flex-col gap-4 min-w-0">
//               <div className="bg-white border border-gray-200 rounded-xl p-4">
//                 <p className="text-xs sm:text-sm font-bold   mb-2">
//                   Enter Product Description
//                 </p>
//                 <div className="flex gap-2">
//                   <div className="relative flex-1">
//                     <input
//                       value={query}
//                       onChange={(e) => setQuery(e.target.value)}
//                       className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 pr-8 focus:outline-none focus:ring-1 focus:ring-teal-400"
//                       placeholder="e.g. Cotton T-shirt 100% cotton, knitted, for men"
//                     />
//                     {query && (
//                       <button
//                         onClick={() => setQuery("")}
//                         className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                       >
//                         <FiX size={14} />
//                       </button>
//                     )}
//                   </div>
//                   <button
//                     onClick={runLookup}
//                     disabled={lookupLoading}
//                     className="bg-[#008B7D] text-white text-sm font-semibold px-5 py-2 rounded-lg flex items-center gap-1.5 disabled:opacity-60"
//                   >
//                     <FiSearch size={14} />{" "}
//                     {lookupLoading ? "Searching…" : "Search"}
//                   </button>
//                 </div>

//                 {/* {lookupError && (
//                   <div
//                     role="alert"
//                     className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700"
//                   >
//                     {lookupError}
//                   </div>
//                 )}
//                 {lookupResult && (
//                   <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-800">
//                     <p className="font-semibold">Live lookup completed</p>
//                     <p className="mt-1">
//                       Your Query Summary and Audit Log have been updated with
//                       this search.
//                     </p>
//                     <details className="mt-2">
//                       <summary className="cursor-pointer font-semibold">
//                         View raw API response
//                       </summary>
//                       <pre className="mt-2 max-h-48 overflow-auto whitespace-pre-wrap break-words text-gray-700">
//                         {JSON.stringify(lookupResult, null, 2)}
//                       </pre>
//                     </details>
//                   </div>
//                 )} */}
//                 <div className="mt-3">
//                   <p className="text-xs sm:text-sm font-bold  mb-2">
//                     Additional Details (Optional)
//                   </p>
//                   <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
//                     <div>
//                       <label className="text-xs text-[#9CA3AF] font-bold mb-1 block">
//                         Country of Export
//                       </label>
//                       <div className="flex items-center justify-between border border-gray-200 rounded-lg px-3 py-2 text-sm text-[#1E293B] cursor-pointer hover:border-gray-300 bg-white">
//                         <input
//                           value={exportCountry}
//                           onChange={(e) => setExportCountry(e.target.value)}
//                           aria-label="Country of export"
//                           className="w-full outline-none bg-transparent"
//                         />
//                       </div>
//                     </div>
//                     <div>
//                       <label className="text-xs text-[#9CA3AF] font-bold mb-1 block">
//                         Country of Import
//                       </label>
//                       <div className="flex items-center justify-between border border-gray-200 rounded-lg px-3 py-2 text-sm text-[#1E293B] cursor-pointer hover:border-gray-300 bg-white">
//                         <input
//                           value={importCountry}
//                           onChange={(e) => setImportCountry(e.target.value)}
//                           aria-label="Country of import"
//                           className="w-full outline-none bg-transparent"
//                         />
//                       </div>
//                     </div>
//                     <div>
//                       <label className="text-xs text-[#9CA3AF] font-bold mb-1 block">
//                         Quantity
//                       </label>
//                       <div className="flex gap-1">
//                         <input
//                           type="number"
//                           min="0.001"
//                           step="any"
//                           value={quantity}
//                           onChange={(e) => setQuantity(e.target.value)}
//                           aria-label="Quantity"
//                           className="flex-1 min-w-0 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-teal-400"
//                         />
//                         <select
//                           value={unit}
//                           onChange={(e) => setUnit(e.target.value)}
//                           aria-label="Quantity unit"
//                           className="border border-gray-200 rounded-lg px-2 py-2 text-xs bg-white"
//                         >
//                           <option>KG</option>
//                           <option>PCS</option>
//                           <option>TON</option>
//                           <option>MT</option>
//                           <option>UNIT</option>
//                         </select>
//                       </div>
//                     </div>
//                     <div className="flex items-end">
//                       <button
//                         onClick={runLookup}
//                         disabled={lookupLoading}
//                         className="w-full flex items-center justify-center gap-1.5 border border-gray-200 rounded-lg px-2 py-2 text-sm font-bold text-[#008B7D] hover:bg-gray-50 disabled:opacity-60"
//                       >
//                         {lookupLoading ? "Searching…" : "Search"}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-white border border-gray-200 rounded-xl p-4">
//                 <p className="text-xs sm:text-sm font-bold text-gray-800 mb-3">
//                   Best HS Code Match
//                 </p>
//                 {lookupResult ? (
//                   <div className="border border-gray-200 rounded-xl p-4 bg-[#F3FBF9]">
//                     <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
//                       <div>
//                         <p className="text-xs text-[#22222299] font-bold mb-1">
//                           HS Code
//                         </p>
//                         <span className="text-sm font-bold text-gray-900">
//                           {String(resultHsCode)}
//                         </span>
//                         <p className="text-[10px] text-[#22222299] font-medium mt-1">
//                           {resultDescription}
//                         </p>
//                       </div>
//                       <div>
//                         <p className="text-xs text-[#22222299] font-bold mb-1">
//                           Match Score
//                         </p>
//                         <p className="text-sm font-bold text-gray-900">
//                           {resultConfidence == null
//                             ? "Not supplied"
//                             : `${Math.round(Number(resultConfidence) <= 1 ? Number(resultConfidence) * 100 : Number(resultConfidence))}%`}
//                         </p>
//                         {resultConfidence != null && (
//                           <ScoreBar
//                             score={Math.max(
//                               0,
//                               Math.min(
//                                 100,
//                                 Math.round(
//                                   Number(resultConfidence) <= 1
//                                     ? Number(resultConfidence) * 100
//                                     : Number(resultConfidence),
//                                 ),
//                               ),
//                             )}
//                           />
//                         )}
//                       </div>
//                       <div>
//                         <p className="text-xs text-[#22222299] font-bold mb-1">
//                           HS Code Type
//                         </p>
//                         <p className="text-sm font-semibold text-gray-800">
//                           {bestMatch?.hs_code_type ||
//                             bestMatch?.type ||
//                             "Not supplied"}
//                         </p>
//                       </div>
//                       <div>
//                         <p className="text-xs text-[#22222299] font-bold mb-1">
//                           Confidence
//                         </p>
//                         <div className="flex items-center gap-1 text-emerald-500">
//                           <MdOutlineVerified size={16} />
//                           <span className="text-sm font-semibold">
//                             {resultConfidence == null ? "HIGH" : "HIGH"}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="rounded-xl border border-dashed border-gray-200 p-7 text-center text-xs text-gray-400">
//                     Submit a product search to display the actual API
//                     classification here.
//                   </div>
//                 )}
//               </div>

//               <div className="bg-white border border-gray-200 rounded-xl p-4">
//                 <p className="text-xs sm:text-sm  font-bold text-gray-800 mb-3">
//                   Other Possible Matches
//                 </p>
//                 {lookupResult &&
//                   (Array.isArray(
//                     lookupResult?.alternatives ||
//                       lookupResult?.matches ||
//                       lookupResult?.result?.matches,
//                   ) ? (
//                     <div className="overflow-x-auto">
//                       <table className="w-full min-w-[540px]">
//                         <thead>
//                           <tr className="bg-gray-50">
//                             {[
//                               "HS Code",
//                               "Description",
//                               "Match Score",
//                               "HS Code Type",
//                               "Applicable Duty (UAE)",
//                               "Action",
//                             ].map((h, i) => (
//                               <th
//                                 key={h}
//                                 className={`text-left text-xs font-medium  px-3 py-2.5 ${i === 0 ? "rounded-l-lg" : ""} ${i === 5 ? "rounded-r-lg" : ""}`}
//                               >
//                                 {h}
//                               </th>
//                             ))}
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {(
//                             lookupResult?.alternatives ||
//                             lookupResult?.matches ||
//                             lookupResult?.result?.matches ||
//                             []
//                           ).map((row, i) => (
//                             <tr key={i} className="border-t border-gray-100">
//                               <td className="px-3 py-3 text-xs font-semibold text-gray-800">
//                                 {row.code || row.hs_code || row.hsCode || "—"}
//                               </td>
//                               <td className="px-3 py-3 text-xs text-gray-600 max-w-[180px]">
//                                 {row.desc ||
//                                   row.description ||
//                                   row.product_description ||
//                                   "—"}
//                               </td>
//                               <td className="px-3 py-3">
//                                 <div className="flex items-center gap-2">
//                                   <span className="text-xs text-gray-700">
//                                     {row.score ??
//                                       row.confidence ??
//                                       row.confidence_score ??
//                                       "—"}
//                                     {(row.score ??
//                                       row.confidence ??
//                                       row.confidence_score) != null
//                                       ? "%"
//                                       : ""}
//                                   </span>
//                                   <ScoreBar
//                                     score={Math.max(
//                                       0,
//                                       Math.min(
//                                         100,
//                                         Number(
//                                           row.score ??
//                                             row.confidence ??
//                                             row.confidence_score ??
//                                             0,
//                                         ) <= 1
//                                           ? Number(
//                                               row.score ??
//                                                 row.confidence ??
//                                                 row.confidence_score ??
//                                                 0,
//                                             ) * 100
//                                           : Number(
//                                               row.score ??
//                                                 row.confidence ??
//                                                 row.confidence_score ??
//                                                 0,
//                                             ),
//                                       ),
//                                     )}
//                                     color={
//                                       Number(
//                                         row.score ??
//                                           row.confidence ??
//                                           row.confidence_score ??
//                                           0,
//                                       ) > 70
//                                         ? "bg-emerald-500"
//                                         : Number(
//                                               row.score ??
//                                                 row.confidence ??
//                                                 row.confidence_score ??
//                                                 0,
//                                             ) > 40
//                                           ? "bg-yellow-400"
//                                           : "bg-orange-400"
//                                     }
//                                   />
//                                 </div>
//                               </td>
//                               <td className="px-3 py-3 text-xs text-gray-600">
//                                 {row.type || row.hs_code_type || "—"}
//                               </td>
//                               <td className="px-3 py-3 text-xs text-gray-600">
//                                 {row.duty ||
//                                   row.applicable_duty ||
//                                   row.duty_rate ||
//                                   "—"}
//                               </td>
//                               <td className="px-3 py-3">
//                                 <button
//                                   onClick={() => {
//                                     setShowDetails(true);
//                                     setTimeout(() => {
//                                       document
//                                         .getElementById("sectionId")
//                                         ?.scrollIntoView({
//                                           behavior: "smooth",
//                                           block: "start",
//                                         });
//                                     }, 100);
//                                   }}
//                                   className="border border-gray-200 text-[#155DFC] text-[11px] font-medium px-3 py-1 rounded-lg hover:bg-gray-50"
//                                 >
//                                   View Details
//                                 </button>
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   ) : (
//                     <p className="text-xs text-gray-400 py-3">
//                       {lookupResult
//                         ? "No Other Possible Matches Found."
//                         : "Alternative matches will appear after a successful search."}
//                     </p>
//                   ))}
//                 {/* {lookupResult && (
//                   <div className="flex flex-col sm:flex-row sm:justify-between mt-3 gap-1">
//                     <p className="text-[10px] text-gray-400 flex items-center gap-1">
//                       <FiInfo size={11} /> Classification is a reference; verify
//                       it with official customs guidance.
//                     </p>
//                     <p className="text-[10px] text-gray-400">
//                       Source: live lookup API
//                     </p>
//                   </div>
//                 )} */}
//               </div>

//               {showDetails && (
//                 <div
//                   className="bg-white border border-gray-200 rounded-xl p-4"
//                   id="sectionId"
//                 >
//                   <div className="flex overflow-x-auto border-b border-gray-200 mb-4 gap-0">
//                     {detailTabs.map((tab) => (
//                       <button
//                         key={tab}
//                         // onClick={() => setActiveTab(tab)}
//                         className={`px-3 py-2 text-xs  font-medium whitespace-nowrap border-b-2 -mb-px transition-colors
//                     ${activeTab === tab ? "border-teal-500 text-[#0D9488]" : "border-transparent text-gray-700"}`}
//                       >
//                         {tab}
//                       </button>
//                     ))}
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-4">
//                     <div>
//                       {hsDetails.map(([k, v]) => (
//                         <div
//                           key={k}
//                           className="flex py-2 border-b border-gray-100 last:border-0 text-xs gap-4"
//                         >
//                           <span className="text-[#64748B] font-medium w-36 flex-shrink-0">
//                             {k}
//                           </span>
//                           <span className="text-gray-800 font-medium">{v}</span>
//                         </div>
//                       ))}

//                       <img src={poster2} className="w-full max-h-36" />
//                     </div>

//                     <div className="flex flex-col gap-3">
//                       <div className="bg-[#F2FAF8] border border-[#F2FAF8] rounded-xl p-3">
//                         <p className="flex items-center gap-1.5 text-xs font-bold text-[#065F46] mb-1.5">
//                           <FiAlertCircle size={13} className="text-[#047857]" />{" "}
//                           AI Insight
//                         </p>
//                         <p className="text-xs text-[#047857] leading-relaxed">
//                           This product falls under Chapter 61 as it is a knitted
//                           garment. Since it is made of 100% cotton and is a
//                           T-shirt, it classifies under 6109.10.00.
//                         </p>
//                       </div>

//                       <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
//                         <p className="flex items-center gap-1.5 text-xs font-bold text-blue-800 mb-2">
//                           <FiInfo size={13} className="text-blue-500" />{" "}
//                           Assumptions
//                         </p>
//                         <ul className="flex flex-col gap-1">
//                           {assumptions.map((a, i) => (
//                             <li
//                               key={i}
//                               className="flex items-start gap-1.5 text-xs text-blue-800"
//                             >
//                               <span className="mt-0.5 text-blue-400">•</span>{" "}
//                               {a}
//                             </li>
//                           ))}
//                         </ul>
//                       </div>

//                       <div className="bg-orange-50 border border-orange-200 rounded-xl p-3">
//                         <p className="flex items-center gap-1.5 text-xs font-bold text-orange-700 mb-1">
//                           <FiAlertTriangle
//                             size={13}
//                             className="text-orange-500"
//                           />{" "}
//                           Disclaimer
//                         </p>
//                         <p className="text-xs text-orange-800 leading-relaxed">
//                           All results are for reference only. Please verify with
//                           official sources before making any business decisions.
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//               <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
//                 {/* Data sources */}
//                 <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
//                   <div className="mb-4 flex items-center gap-3">
//                     <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
//                       <FiDatabase size={19} />
//                     </span>
//                     <div>
//                       <h3 className="text-sm font-semibold text-slate-900">
//                         Data Sources Used
//                       </h3>
//                       <p className="mt-0.5 text-xs text-slate-500">
//                         Connected trade information sources
//                       </p>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-2 gap-2.5">
//                     {[
//                       "DGFT (India)",
//                       "ICEGATE",
//                       "Shipping Lines",
//                       "Customs (UAE)",
//                       "Trade APIs",
//                       "Market Data",
//                     ].map((source) => (
//                       <div
//                         key={source}
//                         className="flex min-w-0 items-center gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2.5 text-xs font-medium text-slate-700"
//                       >
//                         <FiDatabase
//                           className="shrink-0 text-teal-600"
//                           size={14}
//                         />
//                         <span className="min-w-0 leading-4">{source}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </section>

//                 {/* Live connection status */}
//                 <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
//                   <div className="mb-4 flex items-center gap-3">
//                     <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
//                       <FiWifi size={19} />
//                     </span>
//                     <div>
//                       <h3 className="text-sm font-semibold text-slate-900">
//                         Connected To Live Data
//                       </h3>
//                       <p className="mt-0.5 text-xs text-slate-500">
//                         Trade intelligence connection
//                       </p>
//                     </div>
//                   </div>

//                   <p className="text-sm leading-6 text-slate-600">
//                     Trade information can be retrieved from connected services
//                     to support your shipment research.
//                   </p>

//                   <div className="mt-5 flex items-center justify-between gap-3 rounded-xl border border-emerald-100 bg-emerald-50 px-3.5 py-3">
//                     <div className="flex min-w-0 items-center gap-2">
//                       <span className="relative flex h-2.5 w-2.5 shrink-0">
//                         <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
//                         <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
//                       </span>
//                       <span className="text-sm font-semibold text-emerald-800">
//                         Connected
//                       </span>
//                     </div>
//                     <span className="text-xs text-emerald-700">Status</span>
//                   </div>
//                 </section>

//                 {/* Help card gets full row width to avoid squeezed text */}
//                 <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:col-span-2">
//                   <div className="mb-2 flex items-center gap-3">
//                     <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
//                       <FiPhone size={18} />
//                     </span>
//                     <div>
//                       <h3 className="text-sm font-semibold text-slate-900">
//                         Need Help?
//                       </h3>
//                       <p className="mt-0.5 text-xs text-slate-500">
//                         Our trade experts are here to help you.
//                       </p>
//                     </div>
//                   </div>
//                   <div className="min-w-0">
//                     <NeedHelp
//                       mobile={"+91 22 1234 5678"}
//                       para={"Our trade experts are here to help you."}
//                       heading={"Need help?"}
//                     />
//                   </div>
//                 </section>
//               </div>
//             </div>

//             <div className="flex flex-col gap-1">
//               <div className="bg-white border border-gray-200 rounded-xl p-4">
//                 <p className="text-sm font-semibold text-gray-800 mb-3">
//                   Query Summary
//                 </p>
//                 {[
//                   ["Product", queryMeta?.product_description || query || "—"],
//                   [
//                     "Export Country",
//                     queryMeta?.country_of_export || exportCountry || "—",
//                   ],
//                   [
//                     "Import Country",
//                     queryMeta?.country_of_import || importCountry || "—",
//                   ],
//                   [
//                     "Quantity",
//                     `${queryMeta?.quantity ?? quantity ?? "—"} ${queryMeta?.unit || unit || ""}`.trim(),
//                   ],
//                   ["Query ID", queryMeta?.queryId || "Not searched yet"],
//                   [
//                     "Searched On",
//                     queryMeta?.searchedAt
//                       ? new Date(queryMeta.searchedAt).toLocaleString()
//                       : "Not searched yet",
//                   ],
//                   [
//                     "Searched By",
//                     queryMeta?.searchedBy ||
//                       localStorage.getItem("userName") ||
//                       localStorage.getItem("name") ||
//                       "Current user",
//                   ],
//                 ].map(([k, v]) => (
//                   <div
//                     key={k}
//                     className="flex justify-between py-1.5 border-b border-gray-100 last:border-0 text-xs gap-2"
//                   >
//                     <span className="font-medium flex-shrink-0">{k}</span>
//                     <span className="text-gray-800 font-medium text-right">
//                       {v}
//                     </span>
//                   </div>
//                 ))}
//               </div>

//               <DashboardAdPlacement location="User Dashboard - HS Code Lookup" />

//               <div className="bg-white border border-gray-200 rounded-xl p-4">
//                 <p className="text-sm font-semibold text-gray-800 mb-3">
//                   Duty & Tax
//                 </p>
//                 {dutyRows.length ? (
//                   dutyRows.map(([key, value]) => (
//                     <div
//                       key={key}
//                       className="flex justify-between text-xs py-1.5 border-b border-gray-100 last:border-0 gap-3"
//                     >
//                       <span className="capitalize text-gray-500">
//                         {key.replaceAll("_", " ")}
//                       </span>
//                       <span className="text-gray-800 font-medium text-right">
//                         {String(value)}
//                       </span>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-xs text-gray-400">
//                     Duty and tax details were not found.
//                   </p>
//                 )}
//               </div>

//               <div className="bg-white border border-gray-200 rounded-xl p-4">
//                 <p className="text-sm font-semibold text-gray-800 mb-3">
//                   Trade Information
//                 </p>
//                 {tradeRows.length ? (
//                   tradeRows.map(([key, value]) => (
//                     <div
//                       key={key}
//                       className="flex justify-between py-1.5 border-b border-gray-100 last:border-0 text-xs gap-3"
//                     >
//                       <span className="capitalize text-gray-500">
//                         {key.replaceAll("_", " ")}
//                       </span>
//                       <span className="font-medium text-right text-gray-800">
//                         {String(value)}
//                       </span>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-xs text-gray-400">
//                     No trade restrictions or preferences were found.
//                   </p>
//                 )}
//               </div>

//               <div className="bg-white rounded-xl border border-gray-200 p-4">
//                 <div className="flex items-center justify-between mb-3">
//                   <div>
//                     <p className="text-sm font-semibold text-gray-800">Audit Log</p>
//                     <p className="text-[11px] text-gray-400 mt-0.5">
//                       {auditEntries.length} {auditEntries.length === 1 ? "log" : "logs"} recorded
//                     </p>
//                   </div>
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setAuditPage(1);
//                       setShowAuditModal(true);
//                     }}
//                     className="text-teal-600 text-xs font-semibold hover:underline"
//                   >
//                     View All
//                   </button>
//                 </div>
//                 {auditEntries.length ? (
//                   visibleAuditEntries.map((entry, index) => (
//                     <div
//                       key={entry.id || `${entry.searchedAt || entry.time || "audit"}-${index}`}
//                       className="flex gap-2 py-2 border-b border-gray-100 last:border-0"
//                     >
//                       <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0 mt-1" />
//                       <span className="flex-1 text-xs font-medium text-gray-600 break-words">
//                         {entry.text}
//                       </span>
//                       <span className="text-xs text-gray-400 whitespace-nowrap">
//                         {entry.time || (entry.searchedAt ? new Date(entry.searchedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "—")}
//                       </span>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-xs text-gray-400 py-2">
//                     Your successful searches will appear here.
//                   </p>
//                 )}
//                 {auditEntries.length > 5 && (
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setAuditPage(1);
//                       setShowAuditModal(true);
//                     }}
//                     className="mt-3 w-full rounded-lg border border-gray-200 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50"
//                   >
//                     View all {auditEntries.length} logs
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {showAuditModal && (
//         <div
//           className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-3 sm:p-6"
//           role="dialog"
//           aria-modal="true"
//           aria-labelledby="hs-audit-modal-title"
//           onMouseDown={(event) => {
//             if (event.target === event.currentTarget) setShowAuditModal(false);
//           }}
//         >
//           <div className="flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
//             <div className="flex items-center justify-between gap-4 border-b border-gray-100 px-5 py-4 sm:px-6">
//               <div>
//                 <h2 id="hs-audit-modal-title" className="text-base font-bold text-gray-900">
//                   HS Code Lookup Audit Log
//                 </h2>
//                 <p className="mt-1 text-xs text-gray-500">
//                   {auditEntries.length} {auditEntries.length === 1 ? "record" : "records"} · 15 records per page
//                 </p>
//               </div>
//               <button
//                 type="button"
//                 onClick={() => setShowAuditModal(false)}
//                 aria-label="Close audit log"
//                 className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
//               >
//                 <FiX size={18} />
//               </button>
//             </div>

//             <div className="flex-1 overflow-y-auto px-5 py-2 sm:px-6">
//               {auditEntries.length ? (
//                 paginatedAuditEntries.map((entry, index) => (
//                   <div
//                     key={entry.id || `${entry.searchedAt || entry.time || "audit-modal"}-${index}`}
//                     className="flex gap-3 border-b border-gray-100 py-3 last:border-0"
//                   >
//                     <span className="mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-teal-500" />
//                     <div className="min-w-0 flex-1">
//                       <p className="break-words text-sm font-medium text-gray-700">{entry.text || "HS Code lookup activity"}</p>
//                       {entry.product && (
//                         <p className="mt-1 text-xs text-gray-500">Product: {entry.product}</p>
//                       )}
//                       {entry.searchedAt && (
//                         <p className="mt-1 text-[11px] text-gray-400">{new Date(entry.searchedAt).toLocaleString()}</p>
//                       )}
//                     </div>
//                     <span className="whitespace-nowrap text-xs text-gray-400">
//                       {entry.time || (entry.searchedAt ? new Date(entry.searchedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "—")}
//                     </span>
//                   </div>
//                 ))
//               ) : (
//                 <div className="py-12 text-center text-sm text-gray-400">No audit logs available yet.</div>
//               )}
//             </div>

//             <div className="flex flex-col gap-3 border-t border-gray-100 bg-gray-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
//               <p className="text-xs text-gray-500">
//                 {auditEntries.length ? `Showing ${(auditPage - 1) * AUDIT_PAGE_SIZE + 1}–${Math.min(auditPage * AUDIT_PAGE_SIZE, auditEntries.length)} of ${auditEntries.length} logs` : "Showing 0 logs"}
//               </p>
//               <div className="flex items-center justify-between gap-2 sm:justify-end">
//                 <button
//                   type="button"
//                   onClick={() => setAuditPage((page) => Math.max(1, page - 1))}
//                   disabled={auditPage === 1 || auditEntries.length === 0}
//                   className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
//                 >
//                   Previous
//                 </button>
//                 <span className="whitespace-nowrap text-xs font-medium text-gray-600">
//                   Page {auditPage} of {auditPageCount}
//                 </span>
//                 <button
//                   type="button"
//                   onClick={() => setAuditPage((page) => Math.min(auditPageCount, page + 1))}
//                   disabled={auditPage >= auditPageCount || auditEntries.length === 0}
//                   className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
//                 >
//                   Next
//                 </button>
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
//             currentTab={"HS Code Lookup"}
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
  FiSearch,
  FiX,
  FiChevronDown,
  FiFilter,
  FiEye,
  FiCheckCircle,
  FiAlertCircle,
  FiAlertTriangle,
  FiDatabase,
  FiChevronRight,
  FiPhone,
  FiMail,
  FiWifi,
  FiInfo,
} from "react-icons/fi";
import { BsShieldCheck } from "react-icons/bs";
import { MdOutlineVerified } from "react-icons/md";
import NeedHelp from "../../components/core/NeedHelp";
import Shipment from "../../components/ShipmentForm";
import poster2 from "../../assets/Images/webp/poster2.webp";
import { lookupHsCode } from "../../api/CargoMateApi";
import DashboardAdPlacement from "../../components/DashboardAdPlacement";

const getAuditUserScope = () => {
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

const otherMatches = [
  {
    code: "6109.90.00",
    desc: "Other T-shirts, singlets and other vests, of cotton",
    score: 78,
    type: "8 Digit",
    duty: "5%",
  },
  {
    code: "6109.20.00",
    desc: "T-shirts, singlets and other vests, of synthetic fibers",
    score: 45,
    type: "8 Digit",
    duty: "5%",
  },
  {
    code: "6105.00.00",
    desc: "Shirts of cotton, knitted or crocheted",
    score: 35,
    type: "8 Digit",
    duty: "5%",
  },
];

const detailTabs = [
  "HS Code Details",
  "Description & Notes",
  "RBI Policy",
  "Country Rule",
  "Related Products",
  "History",
];

const hsDetails = [
  ["HS Code", "6109.10.00"],
  ["Description", "T-shirts, singlets and other vests, of cotton"],
  [
    "Chapter",
    "61 - Articles of apparel and clothing accessories, knitted or crocheted",
  ],
  [
    "Heading",
    "6109 - T-shirts, singlets and other vests, knitted or crocheted",
  ],
  ["Sub Heading", "6109.10 - Of cotton"],
  ["HS Code Type", "8 Digit"],
  ["Classification Year", "2022"],
  ["WCO Version", "HS 2022"],
];

const assumptions = [
  "Product is 100% cotton.",
  "Product is knitted.",
  "Product is for men (general usage).",
  "Not specially designed for infants.",
];

const auditLog = [
  {
    color: "bg-teal-500",
    time: "09:25 AM",
    text: "Query Submitted by Arjun Soni",
  },
  { color: "bg-blue-500", time: "09:25 AM", text: "AI Processing Started" },
  {
    color: "bg-yellow-500",
    time: "09:25 AM",
    text: "HS Code Identified: 6109.10.00",
  },
  {
    color: "bg-teal-500",
    time: "09:26 AM",
    text: "Incentives Calculated Successfully",
  },
  {
    color: "bg-teal-500",
    time: "09:26 AM",
    text: "Freight Rates Fetched (Air)",
  },
  {
    color: "bg-emerald-500",
    time: "09:26 AM",
    text: "Report Generated Successfully",
  },
];

const docReqs = [
  "Commercial Invoice",
  "Packing List",
  "Certificate of Origin",
  "Bill of Lading / Airway Bill",
  "Import Declaration",
];

const dataSources = [
  { icon: FiDatabase, label: "DGFT (India)" },
  { icon: FiDatabase, label: "ICEGATE" },
  { icon: FiDatabase, label: "UAE Customs" },
  { icon: FiDatabase, label: "WCO HS" },
  { icon: FiDatabase, label: "Trade APIs" },
  { icon: FiDatabase, label: "Market Data" },
];

function ScoreBar({ score, color = "bg-emerald-500" }) {
  return (
    <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
      <div
        className={`h-full ${color} rounded-full`}
        style={{ width: `${score}%` }}
      />
    </div>
  );
}

export default function HSCodeLookup() {
  const [activeTab, setActiveTab] = useState("HS Code Lookup");
  const [query, setQuery] = useState("");
  const [exportCountry, setExportCountry] = useState("India");
  const [importCountry, setImportCountry] = useState("United Arab Emirates");
  const [quantity, setQuantity] = useState("500");
  const [unit, setUnit] = useState("KG");
  const [queryMeta, setQueryMeta] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem(
          `cargomate_hs_lookup_summary_${getAuditUserScope()}`,
        ) || "null",
      );
    } catch {
      return null;
    }
  });
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [auditPage, setAuditPage] = useState(1);
  const AUDIT_PAGE_SIZE = 15;
  const [auditEntries, setAuditEntries] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem(
          `cargomate_hs_lookup_audit_${getAuditUserScope()}`,
        ) || "[]",
      );
    } catch {
      return [];
    }
  });
  const [shipment, setShipment] = useState("");

  const auditPageCount = Math.max(1, Math.ceil(auditEntries.length / AUDIT_PAGE_SIZE));
  const visibleAuditEntries = auditEntries.slice(0, 5);
  const paginatedAuditEntries = auditEntries.slice(
    (auditPage - 1) * AUDIT_PAGE_SIZE,
    auditPage * AUDIT_PAGE_SIZE,
  );

  const [showDetails, setShowDetails] = useState(false);
  const [lookupResult, setLookupResult] = useState(null);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupError, setLookupError] = useState("");
  useEffect(() => {
    localStorage.setItem(
      `cargomate_hs_lookup_audit_${getAuditUserScope()}`,
      JSON.stringify(auditEntries.slice(0, 50)),
    );
  }, [auditEntries]);
  useEffect(() => {
    if (queryMeta)
      localStorage.setItem(
        `cargomate_hs_lookup_summary_${getAuditUserScope()}`,
        JSON.stringify(queryMeta),
      );
  }, [queryMeta]);

  const runLookup = async () => {
    if (!query.trim()) {
      setLookupError("Enter a product description first.");
      return;
    }
    if (!quantity || Number(quantity) <= 0) {
      setLookupError("Enter a quantity greater than zero.");
      return;
    }
    setLookupLoading(true);
    setLookupError("");
    const searchedAt = new Date().toISOString();
    const queryId = `HSQ-${Date.now().toString(36).toUpperCase()}`;
    // const payload = { product_description: query.trim(), country_of_export: exportCountry, country_of_import: importCountry, quantity: Number(quantity), unit };

    const payload = {
      product: query.trim(),
      export_country: exportCountry,
      import_country: importCountry,
      quantity: Number(quantity),
      unit,
      shipment_type: "general_export",
      include_tariff: true,
    };

    // try {
    //   const res = await lookupHsCode(payload);
    //   const data = res?.data ?? res;
    //   setLookupResult(data);
    //   setQueryMeta({
    //     ...payload,
    //     searchedAt,
    //     queryId,
    //     searchedBy:
    //       localStorage.getItem("userName") ||
    //       localStorage.getItem("name") ||
    //       "Current user",
    //   });
    //   const entry = {
    //     id: queryId,
    //     text: `HS Code lookup submitted for “${query.trim()}”`,
    //     time: new Date(searchedAt).toLocaleTimeString([], {
    //       hour: "2-digit",
    //       minute: "2-digit",
    //     }),
    //     searchedAt,
    //     product: query.trim(),
    //     result: data,
    //   };
    //   setAuditEntries((prev) => [entry, ...prev].slice(0, 50));
    // } catch (err) {
    //   setLookupError(
    //     err?.response?.data?.detail ||
    //       err?.response?.data?.message ||
    //       err.message ||
    //       "HS code lookup failed.",
    //   );
    // } finally {
    //   setLookupLoading(false);
    // }

    try {
      const res = await lookupHsCode(payload);

      console.log("HS Lookup Request:", res.config.url);
      console.log("HS Lookup Parameters:", res.config.params);
      console.log("HS Lookup Status:", res.status);
      console.log("HS Lookup API Response:", res.data);

      const data = res.data;
      setLookupResult(data);

      const searchedBy =
        localStorage.getItem("userName") ||
        localStorage.getItem("name") ||
        "Current user";

      setQueryMeta({
        product_description: query.trim(),
        country_of_export: exportCountry,
        country_of_import: importCountry,
        quantity: Number(quantity),
        unit,
        searchedAt,
        queryId,
        searchedBy,
      });

      const entry = {
        id: queryId,
        text: `HS Code lookup submitted for “${query.trim()}”`,
        time: new Date(searchedAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        searchedAt,
        product: query.trim(),
        result: data,
      };

      setAuditEntries((prev) => [entry, ...prev].slice(0, 50));
      setAuditPage(1);
    } catch (err) {
      console.error(
        "HS Lookup API Error:",
        err.response?.status,
        err.response?.data || err.message,
      );

      const detail = err.response?.data?.detail;

      setLookupError(
        typeof detail === "string"
          ? detail
          : Array.isArray(detail)
            ? detail.map((item) => item.msg).join(", ")
            : err.response?.data?.message ||
              err.message ||
              "HS code lookup failed.",
      );
    } finally {
      setLookupLoading(false);
    }
  };
  const bestMatch =
    lookupResult?.best_match ||
    lookupResult?.result?.best_match ||
    lookupResult?.data?.best_match ||
    lookupResult?.result ||
    lookupResult?.data ||
    lookupResult ||
    {};
  const resultHsCode =
    bestMatch?.hs_code || bestMatch?.hsCode || bestMatch?.hs_code_value || "—";
  const resultDescription =
    bestMatch?.description ||
    bestMatch?.product_description ||
    bestMatch?.label ||
    "";
  const resultConfidence =
    bestMatch?.confidence ??
    bestMatch?.confidence_score ??
    bestMatch?.match_score ??
    null;
  const dutyInfo =
    lookupResult?.duty_tax ||
    lookupResult?.duties ||
    lookupResult?.tariff ||
    lookupResult?.result?.duty_tax ||
    lookupResult?.result?.duties ||
    {};
  const tradeInfo =
    lookupResult?.trade_information ||
    lookupResult?.trade_info ||
    lookupResult?.result?.trade_information ||
    {};
  const dutyRows = Object.entries(dutyInfo)
    .filter(
      ([, value]) =>
        value !== null && value !== undefined && typeof value !== "object",
    )
    .slice(0, 6);
  const tradeRows = Object.entries(tradeInfo)
    .filter(
      ([, value]) =>
        value !== null && value !== undefined && typeof value !== "object",
    )
    .slice(0, 6);

  return (
    <div className=" bg-gray-50   flex-1  pt-14">
      {activeTab === "HS Code Lookup" && (
        <div className="">
          <div className="  border-gray-200 px-4 sm:px-6 py-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h1 className="text-lg font-bold text-gray-900">
                  HS Code Lookup
                </h1>
                <p className="text-xs font-normal text-gray-500 mt-0.5">
                  Find the right HS code and get duty, tax, and trade insights.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
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

          <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6  grid grid-cols-1 xl:grid-cols-[1fr_290px] gap-4 ">
            <div className="flex flex-col gap-4 min-w-0">
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-xs sm:text-sm font-bold   mb-2">
                  Enter Product Description
                </p>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 pr-8 focus:outline-none focus:ring-1 focus:ring-teal-400"
                      placeholder="e.g. Cotton T-shirt 100% cotton, knitted, for men"
                    />
                    {query && (
                      <button
                        onClick={() => setQuery("")}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <FiX size={14} />
                      </button>
                    )}
                  </div>
                  <button
                    onClick={runLookup}
                    disabled={lookupLoading}
                    className="bg-[#008B7D] text-white text-sm font-semibold px-5 py-2 rounded-lg flex items-center gap-1.5 disabled:opacity-60"
                  >
                    <FiSearch size={14} />{" "}
                    {lookupLoading ? "Searching…" : "Search"}
                  </button>
                </div>

                {/* {lookupError && (
                  <div
                    role="alert"
                    className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700"
                  >
                    {lookupError}
                  </div>
                )}
                {lookupResult && (
                  <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-800">
                    <p className="font-semibold">Live lookup completed</p>
                    <p className="mt-1">
                      Your Query Summary and Audit Log have been updated with
                      this search.
                    </p>
                    <details className="mt-2">
                      <summary className="cursor-pointer font-semibold">
                        View raw API response
                      </summary>
                      <pre className="mt-2 max-h-48 overflow-auto whitespace-pre-wrap break-words text-gray-700">
                        {JSON.stringify(lookupResult, null, 2)}
                      </pre>
                    </details>
                  </div>
                )} */}
                <div className="mt-3">
                  <p className="text-xs sm:text-sm font-bold  mb-2">
                    Additional Details (Optional)
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <div>
                      <label className="text-xs text-[#9CA3AF] font-bold mb-1 block">
                        Country of Export
                      </label>
                      <div className="flex items-center justify-between border border-gray-200 rounded-lg px-3 py-2 text-sm text-[#1E293B] cursor-pointer hover:border-gray-300 bg-white">
                        <input
                          value={exportCountry}
                          onChange={(e) => setExportCountry(e.target.value)}
                          aria-label="Country of export"
                          className="w-full outline-none bg-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-[#9CA3AF] font-bold mb-1 block">
                        Country of Import
                      </label>
                      <div className="flex items-center justify-between border border-gray-200 rounded-lg px-3 py-2 text-sm text-[#1E293B] cursor-pointer hover:border-gray-300 bg-white">
                        <input
                          value={importCountry}
                          onChange={(e) => setImportCountry(e.target.value)}
                          aria-label="Country of import"
                          className="w-full outline-none bg-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-[#9CA3AF] font-bold mb-1 block">
                        Quantity
                      </label>
                      <div className="flex gap-1">
                        <input
                          type="number"
                          min="0.001"
                          step="any"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                          aria-label="Quantity"
                          className="flex-1 min-w-0 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-teal-400"
                        />
                        <select
                          value={unit}
                          onChange={(e) => setUnit(e.target.value)}
                          aria-label="Quantity unit"
                          className="border border-gray-200 rounded-lg px-2 py-2 text-xs bg-white"
                        >
                          <option>KG</option>
                          <option>PCS</option>
                          <option>TON</option>
                          <option>MT</option>
                          <option>UNIT</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex items-end">
                      <button
                        onClick={runLookup}
                        disabled={lookupLoading}
                        className="w-full flex items-center justify-center gap-1.5 border border-gray-200 rounded-lg px-2 py-2 text-sm font-bold text-[#008B7D] hover:bg-gray-50 disabled:opacity-60"
                      >
                        {lookupLoading ? "Searching…" : "Search"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-xs sm:text-sm font-bold text-gray-800 mb-3">
                  Best HS Code Match
                </p>
                {lookupResult ? (
                  <div className="border border-gray-200 rounded-xl p-4 bg-[#F3FBF9]">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-[#22222299] font-bold mb-1">
                          HS Code
                        </p>
                        <span className="text-sm font-bold text-gray-900">
                          {String(resultHsCode)}
                        </span>
                        <p className="text-[10px] text-[#22222299] font-medium mt-1">
                          {resultDescription}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-[#22222299] font-bold mb-1">
                          Match Score
                        </p>
                        <p className="text-sm font-bold text-gray-900">
                          {resultConfidence == null
                            ? "Not supplied"
                            : `${Math.round(Number(resultConfidence) <= 1 ? Number(resultConfidence) * 100 : Number(resultConfidence))}%`}
                        </p>
                        {resultConfidence != null && (
                          <ScoreBar
                            score={Math.max(
                              0,
                              Math.min(
                                100,
                                Math.round(
                                  Number(resultConfidence) <= 1
                                    ? Number(resultConfidence) * 100
                                    : Number(resultConfidence),
                                ),
                              ),
                            )}
                          />
                        )}
                      </div>
                      <div>
                        <p className="text-xs text-[#22222299] font-bold mb-1">
                          HS Code Type
                        </p>
                        <p className="text-sm font-semibold text-gray-800">
                          {bestMatch?.hs_code_type ||
                            bestMatch?.type ||
                            "Not supplied"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-[#22222299] font-bold mb-1">
                          Confidence
                        </p>
                        <div className="flex items-center gap-1 text-emerald-500">
                          <MdOutlineVerified size={16} />
                          <span className="text-sm font-semibold">
                            {resultConfidence == null ? "HIGH" : "HIGH"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-gray-200 p-7 text-center text-xs text-gray-400">
                    Submit a product search to display the actual API
                    classification here.
                  </div>
                )}
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-xs sm:text-sm  font-bold text-gray-800 mb-3">
                  Other Possible Matches
                </p>
                {lookupResult &&
                  (Array.isArray(
                    lookupResult?.other_matches ||
                      lookupResult?.alternatives ||
                      lookupResult?.matches ||
                      lookupResult?.result?.other_matches ||
                      lookupResult?.result?.matches ||
                      lookupResult?.data?.other_matches,
                  ) ? (
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[540px]">
                        <thead>
                          <tr className="bg-gray-50">
                            {[
                              "HS Code",
                              "Description",
                              "Match Score",
                              "HS Code Type",
                              "Applicable Duty (UAE)",
                              "Action",
                            ].map((h, i) => (
                              <th
                                key={h}
                                className={`text-left text-xs font-medium  px-3 py-2.5 ${i === 0 ? "rounded-l-lg" : ""} ${i === 5 ? "rounded-r-lg" : ""}`}
                              >
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {(
                            lookupResult?.other_matches ||
                            lookupResult?.alternatives ||
                            lookupResult?.matches ||
                            lookupResult?.result?.other_matches ||
                            lookupResult?.result?.matches ||
                            lookupResult?.data?.other_matches ||
                            []
                          ).map((row, i) => (
                            <tr key={i} className="border-t border-gray-100">
                              <td className="px-3 py-3 text-xs font-semibold text-gray-800">
                                {row.code || row.hs_code || row.hsCode || "—"}
                              </td>
                              <td className="px-3 py-3 text-xs text-gray-600 max-w-[180px]">
                                {row.desc ||
                                  row.description ||
                                  row.product_description ||
                                  "—"}
                              </td>
                              <td className="px-3 py-3">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-gray-700">
                                    {row.match_pct ??
                                      row.score ??
                                      row.confidence ??
                                      row.confidence_score ??
                                      "—"}
                                    {(row.match_pct ??
                                      row.score ??
                                      row.confidence ??
                                      row.confidence_score) != null
                                      ? "%"
                                      : ""}
                                  </span>
                                  <ScoreBar
                                    score={Math.max(
                                      0,
                                      Math.min(
                                        100,
                                        Number(
                                          row.match_pct ??
                                            row.score ??
                                            row.confidence ??
                                            row.confidence_score ??
                                            0,
                                        ) <= 1
                                          ? Number(
                                              row.match_pct ??
                                                row.score ??
                                                row.confidence ??
                                                row.confidence_score ??
                                                0,
                                            ) * 100
                                          : Number(
                                              row.match_pct ??
                                                row.score ??
                                                row.confidence ??
                                                row.confidence_score ??
                                                0,
                                            ),
                                      ),
                                    )}
                                    color={
                                      Number(
                                        row.score ??
                                          row.confidence ??
                                          row.confidence_score ??
                                          0,
                                      ) > 70
                                        ? "bg-emerald-500"
                                        : Number(
                                              row.match_pct ??
                                                row.score ??
                                                row.confidence ??
                                                row.confidence_score ??
                                                0,
                                            ) > 40
                                          ? "bg-yellow-400"
                                          : "bg-orange-400"
                                    }
                                  />
                                </div>
                              </td>
                              <td className="px-3 py-3 text-xs text-gray-600">
                                {row.type || row.hs_code_type || "—"}
                              </td>
                              <td className="px-3 py-3 text-xs text-gray-600">
                                {(row.applicable_duty_pct != null
                                    ? `${row.applicable_duty_pct}%`
                                    : row.duty ||
                                      row.applicable_duty ||
                                      row.duty_rate ||
                                      "—")}
                              </td>
                              <td className="px-3 py-3">
                                <button
                                  onClick={() => {
                                    setShowDetails(true);
                                    setTimeout(() => {
                                      document
                                        .getElementById("sectionId")
                                        ?.scrollIntoView({
                                          behavior: "smooth",
                                          block: "start",
                                        });
                                    }, 100);
                                  }}
                                  className="border border-gray-200 text-[#155DFC] text-[11px] font-medium px-3 py-1 rounded-lg hover:bg-gray-50"
                                >
                                  View Details
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-xs text-gray-400 py-3">
                      {lookupResult
                        ? "No Other Possible Matches Found."
                        : "Alternative matches will appear after a successful search."}
                    </p>
                  ))}
                {/* {lookupResult && (
                  <div className="flex flex-col sm:flex-row sm:justify-between mt-3 gap-1">
                    <p className="text-[10px] text-gray-400 flex items-center gap-1">
                      <FiInfo size={11} /> Classification is a reference; verify
                      it with official customs guidance.
                    </p>
                    <p className="text-[10px] text-gray-400">
                      Source: live lookup API
                    </p>
                  </div>
                )} */}
              </div>

              {showDetails && (
                <div
                  className="bg-white border border-gray-200 rounded-xl p-4"
                  id="sectionId"
                >
                  <div className="flex overflow-x-auto border-b border-gray-200 mb-4 gap-0">
                    {detailTabs.map((tab) => (
                      <button
                        key={tab}
                        // onClick={() => setActiveTab(tab)}
                        className={`px-3 py-2 text-xs  font-medium whitespace-nowrap border-b-2 -mb-px transition-colors
                    ${activeTab === tab ? "border-teal-500 text-[#0D9488]" : "border-transparent text-gray-700"}`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-4">
                    <div>
                      {hsDetails.map(([k, v]) => (
                        <div
                          key={k}
                          className="flex py-2 border-b border-gray-100 last:border-0 text-xs gap-4"
                        >
                          <span className="text-[#64748B] font-medium w-36 flex-shrink-0">
                            {k}
                          </span>
                          <span className="text-gray-800 font-medium">{v}</span>
                        </div>
                      ))}

                      <img src={poster2} className="w-full max-h-36" />
                    </div>

                    <div className="flex flex-col gap-3">
                      <div className="bg-[#F2FAF8] border border-[#F2FAF8] rounded-xl p-3">
                        <p className="flex items-center gap-1.5 text-xs font-bold text-[#065F46] mb-1.5">
                          <FiAlertCircle size={13} className="text-[#047857]" />{" "}
                          AI Insight
                        </p>
                        <p className="text-xs text-[#047857] leading-relaxed">
                          This product falls under Chapter 61 as it is a knitted
                          garment. Since it is made of 100% cotton and is a
                          T-shirt, it classifies under 6109.10.00.
                        </p>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                        <p className="flex items-center gap-1.5 text-xs font-bold text-blue-800 mb-2">
                          <FiInfo size={13} className="text-blue-500" />{" "}
                          Assumptions
                        </p>
                        <ul className="flex flex-col gap-1">
                          {assumptions.map((a, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-1.5 text-xs text-blue-800"
                            >
                              <span className="mt-0.5 text-blue-400">•</span>{" "}
                              {a}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-orange-50 border border-orange-200 rounded-xl p-3">
                        <p className="flex items-center gap-1.5 text-xs font-bold text-orange-700 mb-1">
                          <FiAlertTriangle
                            size={13}
                            className="text-orange-500"
                          />{" "}
                          Disclaimer
                        </p>
                        <p className="text-xs text-orange-800 leading-relaxed">
                          All results are for reference only. Please verify with
                          official sources before making any business decisions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
                {/* Data sources */}
                <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                      <FiDatabase size={19} />
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">
                        Data Sources Used
                      </h3>
                      <p className="mt-0.5 text-xs text-slate-500">
                        Connected trade information sources
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {(() => {
                      const sources =
                        lookupResult?.sources ||
                        lookupResult?.result?.hs_details?.sources ||
                        lookupResult?.data?.hs_details?.sources ||
                        lookupResult?.sources ||
                        lookupResult?.result?.sources ||
                        lookupResult?.data?.sources ||
                        [];
                      return Array.isArray(sources) && sources.length > 0 ? (
                        sources.map((source, index) => (
                          <div
                            key={`${source}-${index}`}
                            className="flex min-w-0 items-center gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2.5 text-xs font-medium text-slate-700"
                          >
                            <FiDatabase
                              className="shrink-0 text-teal-600"
                              size={14}
                            />
                            <span className="min-w-0 break-words leading-4">
                              {String(source).replaceAll("_", " ")}
                            </span>
                          </div>
                        ))
                      ) : (
                        <p className="col-span-full text-xs text-slate-400">
                          Data sources will appear after a successful lookup.
                        </p>
                      );
                    })()}
                  </div>
                </section>

                {/* Live connection status */}
                <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                      <FiWifi size={19} />
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">
                        Connected To Live Data
                      </h3>
                      <p className="mt-0.5 text-xs text-slate-500">
                        Trade intelligence connection
                      </p>
                    </div>
                  </div>

                  <p className="text-sm leading-6 text-slate-600">
                    Trade information can be retrieved from connected services
                    to support your shipment research.
                  </p>

                  <div className="mt-5 flex items-center justify-between gap-3 rounded-xl border border-emerald-100 bg-emerald-50 px-3.5 py-3">
                    <div className="flex min-w-0 items-center gap-2">
                      <span className="relative flex h-2.5 w-2.5 shrink-0">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                      </span>
                      <span className="text-sm font-semibold text-emerald-800">
                        Connected
                      </span>
                    </div>
                    <span className="text-xs text-emerald-700">Status</span>
                  </div>
                </section>

                {/* Help card gets full row width to avoid squeezed text */}
                <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:col-span-2">
                  <div className="mb-2 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                      <FiPhone size={18} />
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">
                        Need Help?
                      </h3>
                      <p className="mt-0.5 text-xs text-slate-500">
                        Our trade experts are here to help you.
                      </p>
                    </div>
                  </div>
                  <div className="min-w-0">
                    <NeedHelp
                      mobile={"+91 22 1234 5678"}
                      para={"Our trade experts are here to help you."}
                      heading={"Need help?"}
                    />
                  </div>
                </section>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-sm font-semibold text-gray-800 mb-3">
                  Query Summary
                </p>
                {[
                  ["Product", queryMeta?.product_description || query || "—"],
                  [
                    "Export Country",
                    queryMeta?.country_of_export || exportCountry || "—",
                  ],
                  [
                    "Import Country",
                    queryMeta?.country_of_import || importCountry || "—",
                  ],
                  [
                    "Quantity",
                    `${queryMeta?.quantity ?? quantity ?? "—"} ${queryMeta?.unit || unit || ""}`.trim(),
                  ],
                  ["Query ID", queryMeta?.queryId || "Not searched yet"],
                  [
                    "Searched On",
                    queryMeta?.searchedAt
                      ? new Date(queryMeta.searchedAt).toLocaleString()
                      : "Not searched yet",
                  ],
                  [
                    "Searched By",
                    queryMeta?.searchedBy ||
                      localStorage.getItem("userName") ||
                      localStorage.getItem("name") ||
                      "Current user",
                  ],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex justify-between py-1.5 border-b border-gray-100 last:border-0 text-xs gap-2"
                  >
                    <span className="font-medium flex-shrink-0">{k}</span>
                    <span className="text-gray-800 font-medium text-right">
                      {v}
                    </span>
                  </div>
                ))}
              </div>

              <DashboardAdPlacement location="User Dashboard - HS Code Lookup" />

              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-sm font-semibold text-gray-800 mb-3">
                  Duty & Tax
                </p>
                {dutyRows.length ? (
                  dutyRows.map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between text-xs py-1.5 border-b border-gray-100 last:border-0 gap-3"
                    >
                      <span className="capitalize text-gray-500">
                        {key.replaceAll("_", " ")}
                      </span>
                      <span className="text-gray-800 font-medium text-right">
                        {String(value)}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-400">
                    Duty and tax details were not found.
                  </p>
                )}
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-sm font-semibold text-gray-800 mb-3">
                  Trade Information
                </p>
                {tradeRows.length ? (
                  tradeRows.map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between py-1.5 border-b border-gray-100 last:border-0 text-xs gap-3"
                    >
                      <span className="capitalize text-gray-500">
                        {key.replaceAll("_", " ")}
                      </span>
                      <span className="font-medium text-right text-gray-800">
                        {String(value)}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-400">
                    No trade restrictions or preferences were found.
                  </p>
                )}
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Audit Log</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      {auditEntries.length} {auditEntries.length === 1 ? "log" : "logs"} recorded
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setAuditPage(1);
                      setShowAuditModal(true);
                    }}
                    className="text-teal-600 text-xs font-semibold hover:underline"
                  >
                    View All
                  </button>
                </div>
                {auditEntries.length ? (
                  visibleAuditEntries.map((entry, index) => (
                    <div
                      key={entry.id || `${entry.searchedAt || entry.time || "audit"}-${index}`}
                      className="flex gap-2 py-2 border-b border-gray-100 last:border-0"
                    >
                      <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0 mt-1" />
                      <span className="flex-1 text-xs font-medium text-gray-600 break-words">
                        {entry.text}
                      </span>
                      <span className="text-xs text-gray-400 whitespace-nowrap">
                        {entry.time || (entry.searchedAt ? new Date(entry.searchedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "—")}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-400 py-2">
                    Your successful searches will appear here.
                  </p>
                )}
                {auditEntries.length > 5 && (
                  <button
                    type="button"
                    onClick={() => {
                      setAuditPage(1);
                      setShowAuditModal(true);
                    }}
                    className="mt-3 w-full rounded-lg border border-gray-200 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50"
                  >
                    View all {auditEntries.length} logs
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {showAuditModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="hs-audit-modal-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setShowAuditModal(false);
          }}
        >
          <div className="flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between gap-4 border-b border-gray-100 px-5 py-4 sm:px-6">
              <div>
                <h2 id="hs-audit-modal-title" className="text-base font-bold text-gray-900">
                  HS Code Lookup Audit Log
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  {auditEntries.length} {auditEntries.length === 1 ? "record" : "records"} · 15 records per page
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAuditModal(false)}
                aria-label="Close audit log"
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
              >
                <FiX size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-2 sm:px-6">
              {auditEntries.length ? (
                paginatedAuditEntries.map((entry, index) => (
                  <div
                    key={entry.id || `${entry.searchedAt || entry.time || "audit-modal"}-${index}`}
                    className="flex gap-3 border-b border-gray-100 py-3 last:border-0"
                  >
                    <span className="mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-teal-500" />
                    <div className="min-w-0 flex-1">
                      <p className="break-words text-sm font-medium text-gray-700">{entry.text || "HS Code lookup activity"}</p>
                      {entry.product && (
                        <p className="mt-1 text-xs text-gray-500">Product: {entry.product}</p>
                      )}
                      {entry.searchedAt && (
                        <p className="mt-1 text-[11px] text-gray-400">{new Date(entry.searchedAt).toLocaleString()}</p>
                      )}
                    </div>
                    <span className="whitespace-nowrap text-xs text-gray-400">
                      {entry.time || (entry.searchedAt ? new Date(entry.searchedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "—")}
                    </span>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center text-sm text-gray-400">No audit logs available yet.</div>
              )}
            </div>

            <div className="flex flex-col gap-3 border-t border-gray-100 bg-gray-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <p className="text-xs text-gray-500">
                {auditEntries.length ? `Showing ${(auditPage - 1) * AUDIT_PAGE_SIZE + 1}–${Math.min(auditPage * AUDIT_PAGE_SIZE, auditEntries.length)} of ${auditEntries.length} logs` : "Showing 0 logs"}
              </p>
              <div className="flex items-center justify-between gap-2 sm:justify-end">
                <button
                  type="button"
                  onClick={() => setAuditPage((page) => Math.max(1, page - 1))}
                  disabled={auditPage === 1 || auditEntries.length === 0}
                  className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>
                <span className="whitespace-nowrap text-xs font-medium text-gray-600">
                  Page {auditPage} of {auditPageCount}
                </span>
                <button
                  type="button"
                  onClick={() => setAuditPage((page) => Math.min(auditPageCount, page + 1))}
                  disabled={auditPage >= auditPageCount || auditEntries.length === 0}
                  className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
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
            currentTab={"HS Code Lookup"}
          />
        </div>
      )}
    </div>
  );
}
