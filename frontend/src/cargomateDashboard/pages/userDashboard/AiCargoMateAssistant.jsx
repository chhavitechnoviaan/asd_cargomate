import { getSession } from "../../../lib/auth";
import {reportRequest} from "../../../lib/accountApi";
import {successAlert,errorAlert} from "../../../lib/alerts";
// import React, { useEffect, useState, useTransition } from 'react'
// import axios from "axios"
// import {
//   FiArrowLeft,
//   FiSave,
//   FiDownload,
//   FiPlus,
//   FiInfo,
//   FiCopy,
//   FiStar,
//   FiDatabase,
//   FiAlertCircle,
//   FiAnchor,
//   FiCpu,
//   FiHash,
//   FiGift,
//   FiTruck,
//   FiMap,
//   FiPackage,
//   FiRadio,
//   FiFileText,
//   FiUsers,
//   FiBookmark,
//   FiClipboard,
//   FiBarChart2,
//   FiCreditCard,
//   FiBell,
//   FiHelpCircle,
//   FiSettings,
//   FiChevronRight,
//   FiShare2,
//   FiSend,
//   FiCheck,
//   FiClock,
//   FiDollarSign,
//   FiX,
// } from "react-icons/fi";
// import { FiPhone } from "react-icons/fi";
// import { BsAirplane } from "react-icons/bs";
// import { MdOutlineRocketLaunch } from "react-icons/md";
// import NeedHelp from '../../components/core/NeedHelp';
// import chat from '../../assets/Images/webp/chat.webp';
// import Shipment from '../../components/ShipmentForm';
// import DownloadReportModal from '../../components/userComponent/DownloadReport';
// import NewQueryModal from '../../components/userComponent/NewQuery';
// import SaveReportModal from '../../components/userComponent/SaveReport';
// import SaveReportPopup from '../../components/userComponent/SaveReportPopup';
// import ShareReportModal from '../../components/userComponent/ShareReport';
// import poster from "../../assets/Images/webp/poster3.webp"
// import poster2 from "../../assets/Images/webp/poster2.webp"
// import ProductDetails from '../../components/userComponent/ProductDetails';
// import DashboardAdPlacement from '../../components/DashboardAdPlacement';

// // Converts API values (including objects and arrays) into safe readable UI text.
// // Keep this at module scope so both the component JSX and response mappers can use it.
// const readableValue = (value) => {
//   if (value === null || value === undefined || value === "") return "—";
//   if (Array.isArray(value)) {
//     if (value.length === 0) return "—";
//     return value
//       .map((item) => {
//         if (item === null || item === undefined) return "";
//         if (typeof item === "object") {
//           const name = item.name || item.label || item.title;
//           const status = item.status || item.value;
//           if (name && status) return `${name}: ${readableValue(status)}`;
//           if (name) return String(name);
//           return Object.entries(item)
//             .map(([key, nested]) => `${key.replaceAll("_", " ")}: ${readableValue(nested)}`)
//             .join(" · ");
//         }
//         return String(item);
//       })
//       .filter(Boolean)
//       .join(", ");
//   }
//   if (typeof value === "object") {
//     return Object.entries(value)
//       .map(([key, nested]) => `${key.replaceAll("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}: ${readableValue(nested)}`)
//       .join(" · ");
//   }
//   return String(value);
// };

// const recCards = [
//   {
//     label: "HS Code",
//     main: "6109.10.00",
//     sub: "T-shirts, singlets and other vests, of cotton",
//     rows: [
//       ["IGST Rate (India)", "12%"],
//       ["UAE Customs Duty", "5%"],
//     ],
//     link: "View HS Code Details",
//   },
//   {
//     label: "Incentive",
//     main: "₹8,420",
//     mainColor: "text-emerald-600",
//     sub: "Total Incentive Value",
//     rows: [
//       ["RoDTEP", "₹3,420"],
//       ["MEIS", "₹5,000"],
//       ["State Incentive (TN)", "₹0"],
//     ],
//     link: "View Incentive Details",
//   },
//   {
//     label: "Freight",
//     routeLabel: "Route",
//     route: "Tirupur → Dubai",
//     rows: [
//       ["Mode", "Air Freight"],
//       ["Est. Freight Cost", ""],
//     ],
//     freightCost: "₹24,860",
//     link: "View Freight Breakdown",
//   },
//   {
//     label: "Landed Cost",
//     main: "₹1,24,680",
//     sub: "Total Landed Cost",
//     rows: [
//       ["Product Cost", "₹76,230"],
//       ["Freight & Insurance", "₹24,860"],
//       ["Duties & Taxes", "₹13,590"],
//       ["Other Charges", "₹9,99"],
//     ],
//     link: "View Cost Breakdown",
//   },
// ];

// const analysisTabs = [
//   "HS Code Analysis",
//   "Incentive Analysis",
//   "Freight Analysis",
//   "Landed Cost Breakdown",
//   "Compliance & Documents",
//   "Market Insights",
// ];

// const resultSummary = [
//   {
//     icon: BsAirplane,
//     label: "Best Mode",
//     value: "Air Freight",
//     iconColor: "text-teal-500",
//   },
//   {
//     icon: BsAirplane,
//     label: "Recommended Route",
//     value: "Tirupur, India → Dubai, UAE",
//     iconColor: "text-blue-500",
//     small: true,
//   },
//   {
//     icon: FiClock,
//     label: "Est. Transit Time",
//     value: "3 – 5 Days",
//     iconColor: "text-yellow-500",
//   },
//   {
//     icon: FiDollarSign,
//     label: "Total Landed Cost (Est.)",
//     value: "₹1,24,680",
//     iconColor: "text-red-500",
//   },
//   {
//     icon: FiGift,
//     label: "Total Incentive (Est.)",
//     value: "₹8,420",
//     iconColor: "text-emerald-500",
//     valueColor: "text-emerald-600",
//   },
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

// const tabContent = {
//   "HS Code Analysis": {
//     left: [
//       ["HS Code", "6109.10.00"],
//       ["Description", "T-shirts, singlets and other vests, of cotton"],
//       ["Classification Basis", "Chapter 61, Note 7, Section XI"],
//       ["IGST (India)", "12%"],
//       ["UAE Customs Duty", "5%"],
//       ["Applicable Cess", "NA"],
//     ],
//     insight:
//       "This HS code covers cotton T-shirts. Ensure accurate declaration of fabric composition and HS classification to avoid customs delays.",
//     assumption:
//       "Product is 100% cotton, knitted. Shipment weight is 500kg. Prices and duties are based on current available data and may change.",
//     disclaimer:
//       "All results are for reference only. Please verify with official government and customs sources before making business decisions.",

//     buttonText: "Create Shipment ",
//   },
//   "Incentive Analysis": {
//     left: [
//       ["RoDTEP", "₹3,420"],
//       ["MEIS", "₹5,000"],
//       ["State Incentive (TN)", "₹0"],
//       ["Total Incentive", "₹8,420"],
//     ],
//     insight:
//       "RoDTEP scheme replaces MEIS for most textile exports. Verify eligibility and current rates before filing.",
//     assumption:
//       "Product is 100% cotton, knitted. Shipment weight is 500kg. Prices and duties are based on current available data and may change.",
//     disclaimer:
//       "All results are for reference only. Please verify with official government and customs sources before making business decisions.",

//     buttonText: "Create Shipment ",
//   },
//   "Freight Analysis": {
//     left: [
//       ["Route", "Tirupur → Dubai, UAE"],
//       ["Mode", "Air Freight"],
//       ["Est. Freight Cost", "₹24,860"],
//       ["Transit Time", "3–5 Days"],
//     ],
//     insight:
//       "Air freight is fastest but costlier. Consider sea freight for large volumes to reduce landed cost significantly.",
//     assumption:
//       "Product is 100% cotton, knitted. Shipment weight is 500kg. Prices and duties are based on current available data and may change.",
//     disclaimer:
//       "All results are for reference only. Please verify with official government and customs sources before making business decisions.",

//     buttonText: "Create Shipment ",
//   },
//   "Landed Cost Breakdown": {
//     left: [
//       ["Product Cost", "₹76,230"],
//       ["Freight & Insurance", "₹24,860"],
//       ["Duties & Taxes", "₹13,590"],
//       ["Other Charges", "₹9,99"],
//       ["Total Landed Cost", "₹1,24,680"],
//     ],
//     insight:
//       "Total landed cost is ₹1,24,680. Duties and taxes account for ~11% of landed cost.",
//     assumption:
//       "Product is 100% cotton, knitted. Shipment weight is 500kg. Prices and duties are based on current available data and may change.",
//     disclaimer:
//       "All results are for reference only. Please verify with official government and customs sources before making business decisions.",

//     buttonText: "Create Shipment ",
//   },
//   "Compliance & Documents": {
//     left: [
//       ["Certificate of Origin", "Required"],
//       ["GSP Form A", "Recommended"],
//       ["Packing List", "Required"],
//       ["Commercial Invoice", "Required"],
//       ["Airway Bill", "Required"],
//     ],
//     insight:
//       "Ensure all documents are prepared and verified before shipment to avoid customs clearance delays at Dubai port.",
//     assumption:
//       "Product is 100% cotton, knitted. Shipment weight is 500kg. Prices and duties are based on current available data and may change.",
//     disclaimer:
//       "All results are for reference only. Please verify with official government and customs sources before making business decisions.",
//     buttonText: "Create Shipment",
//   },
//   "Market Insights": {
//     left: [
//       ["UAE Market Demand", "High"],
//       ["Avg. Selling Price (UAE)", "AED 18–24 / piece"],
//       ["Key Competitors", "Bangladesh, China"],
//       ["India Market Share", "14.2%"],
//     ],
//     insight:
//       "India's textile exports to UAE are growing. Leverage FTA benefits and competitive pricing to gain market share.",
//     assumption:
//       "Product is 100% cotton, knitted. Shipment weight is 500kg. Prices and duties are based on current available data and may change.",
//     disclaimer:
//       "All results are for reference only. Please verify with official government and customs sources before making business decisions.",

//     buttonText: "Create Shipment",
//   },
// };

// const assistantApiBaseURL = (
//   import.meta.env.VITE_AI_API_BASE_URL ||
//   import.meta.env.VITE_CARGOMATE_API_URL ||
//   "https://ai-service-nb69.onrender.com/api/api"
// ).replace(/\/+$/, "");

// const formatINR = (value, currency = "INR") => {
//   if (value === null || value === undefined || value === "") return "—";
//   const amount = Number(value);
//   if (!Number.isFinite(amount)) return String(value);
//   try {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: currency || "INR",
//       maximumFractionDigits: 2,
//     }).format(amount);
//   } catch {
//     return `${currency || "INR"} ${amount.toLocaleString("en-IN")}`;
//   }
// };

// const getAssistantView = (result) => {
//   if (!result) return null;
//   const recommended = result.recommended || {};
//   const analysis = result.analysis || {};
//   const summary = result.result_summary || {};
//   const currency = result.currency || summary.currency || "INR";
//   const hs = recommended.hs_code || {};
//   const incentive = recommended.incentive || {};
//   const freight = recommended.freight || {};
//   const landed = recommended.landed_cost || {};
//   const hsFields = analysis.hs_code?.fields || {};
//   const incentiveFields = analysis.incentive?.fields || {};
//   const freightFields = analysis.freight?.fields || {};
//   const landedFields = analysis.landed_cost?.fields || {};
//   const compliance = analysis.compliance_documents || {};
//   const market = analysis.market_insights || {};

//   const cards = [
//     {
//       label: "HS Code",
//       main: hs.hs_code_dotted || hs.hs_code || hsFields.hs_code || "—",
//       sub: hs.description || hsFields.description || "Recommended product classification",
//       rows: [
//         ["IGST Rate (India)", (hs.igst_pct ?? hsFields.igst_india_pct) != null ? `${hs.igst_pct ?? hsFields.igst_india_pct}%` : "—"],
//         ["Destination Customs Duty", (hs.dest_customs_duty_pct ?? hsFields.dest_customs_duty_pct) != null ? `${hs.dest_customs_duty_pct ?? hsFields.dest_customs_duty_pct}%` : "—"],
//       ],
//       link: "View HS Code Details",
//     },
//     {
//       label: "Incentive",
//       main: formatINR(incentive.total ?? incentiveFields.total_incentive ?? summary.total_incentive, currency),
//       mainColor: "text-emerald-600",
//       sub: "Total Incentive Value",
//       rows: [
//         ["RoDTEP", formatINR(incentive.rodtep ?? incentiveFields.rodtep, currency)],
//         ["Duty Drawback", formatINR(incentive.drawback ?? incentiveFields.drawback, currency)],
//         ["State Incentive", formatINR(incentive.state_incentive ?? incentiveFields.state_incentive, currency)],
//       ],
//       link: "View Incentive Details",
//     },
//     {
//       label: "Freight",
//       routeLabel: "Route",
//       route: freight.route || freightFields.route || summary.recommended_route || "—",
//       rows: [
//         ["Mode", freight.mode || freightFields.mode || summary.best_mode || "—"],
//         ["Est. Freight Cost", formatINR(freight.est_cost ?? freightFields.est_freight_cost, currency)],
//         ["Transit Time", `${freightFields.transit_time || summary.est_transit_time_days || "—"}${(freightFields.transit_time || summary.est_transit_time_days) ? " days" : ""}`],
//       ],
//       freightCost: formatINR(freight.est_cost ?? freightFields.est_freight_cost, currency),
//       link: "View Freight Breakdown",
//     },
//     {
//       label: "Landed Cost",
//       main: formatINR(landed.total ?? landedFields.total_landed_cost ?? summary.total_landed_cost, currency),
//       sub: "Total Landed Cost",
//       rows: [
//         ["Product Cost", formatINR(landed.product_cost ?? landedFields.product_cost, currency)],
//         ["Freight & Insurance", formatINR(landed.freight_and_insurance ?? landedFields.freight_and_insurance, currency)],
//         ["Duties & Taxes", formatINR(landed.duties_and_taxes ?? landedFields.duties_and_taxes, currency)],
//         ["Other Charges", formatINR(landed.other_charges ?? landedFields.other_charges, currency)],
//       ],
//       link: "View Cost Breakdown",
//     },
//   ];

//   // Render nested API values as readable text instead of React's "[object Object]".
//   const readableValue = (value) => {
//     if (value === null || value === undefined || value === "") return "—";
//     if (Array.isArray(value)) {
//       return value.map((item) => {
//         if (item && typeof item === "object") {
//           const name = item.name || item.label || item.title || "";
//           const status = item.status || item.value || "";
//           return [name, status].filter(Boolean).join(": ") || JSON.stringify(item);
//         }
//         return String(item);
//       }).join(", ");
//     }
//     if (typeof value === "object") {
//       return Object.entries(value)
//         .map(([key, nestedValue]) => `${key.replaceAll("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}: ${readableValue(nestedValue)}`)
//         .join(" · ");
//     }
//     return String(value);
//   };

//   const prettifyKey = (key) => key.replaceAll("_", " ").replace(/\b\w/g, (c) => c.toUpperCase());

//   const getSection = (section, fallbackInsight) => {
//     const fields = section?.fields || {};
//     const rows = Object.entries(fields)
//       .filter(([key]) => key !== "notes")
//       .map(([key, value]) => [prettifyKey(key), readableValue(value)]);

//     // Some API versions return notes beside fields; expose each note as its own row.
//     const notes = section?.notes || fields.notes || (section === analysis.incentive ? (result.notes || incentive.notes) : null);
//     if (notes && typeof notes === "object" && !Array.isArray(notes)) {
//       Object.entries(notes).forEach(([key, value]) => {
//         const label = `Note — ${prettifyKey(key)}`;
//         const existingIndex = rows.findIndex(([rowLabel]) => rowLabel.toLowerCase() === label.toLowerCase());
//         if (existingIndex >= 0) rows[existingIndex] = [label, readableValue(value)];
//         else rows.push([label, readableValue(value)]);
//       });
//     }

//     return {
//       left: rows,
//       insight: section?.ai_insight || fallbackInsight || "No additional insight returned by the API.",
//       assumption: readableValue(section?.assumptions || result.assumptions) !== "—"
//         ? readableValue(section?.assumptions || result.assumptions)
//         : "No assumptions were provided by the API.",
//       disclaimer: section?.disclaimer || result.disclaimer || "Indicative result. Verify official sources before making trade decisions.",
//       buttonText: "Create Shipment",
//     };
//   };

//   const tabData = {
//     "HS Code Analysis": getSection(analysis.hs_code, "Review the recommended HS classification and applicable taxes."),
//     "Incentive Analysis": getSection(analysis.incentive, "Review the incentive values and eligibility before claiming."),
//     "Freight Analysis": getSection(analysis.freight, "Compare freight cost and transit time before booking."),
//     "Landed Cost Breakdown": getSection(analysis.landed_cost, "Review all components included in the estimated landed cost."),
//     "Compliance & Documents": {
//       ...getSection(compliance, "Check the document requirements before shipping."),
//       left: [
//         ...(Array.isArray(compliance.fields?.documents)
//           ? compliance.fields.documents.map((doc) => [doc.name || "Document", doc.status || "Check requirement"])
//           : []),
//         ...(compliance.fields?.export_policy_hint
//           ? [["Export Policy Hint", readableValue(compliance.fields.export_policy_hint)]]
//           : []),
//         ...getSection(compliance, "").left.filter(([label]) => label !== "Documents" && label !== "Export Policy Hint"),
//       ],
//     },
//     "Market Insights": {
//       ...getSection(market, "Review market demand and competition for the selected product."),
//       left: Object.entries(market.fields || {}).map(([key, value]) => [prettifyKey(key), readableValue(value)]),
//     },
//   };

//   const resultSummaryItems = [
//     { icon: BsAirplane, label: "Best Mode", value: summary.best_mode || freight.mode || "—", iconColor: "text-teal-500" },
//     { icon: BsAirplane, label: "Recommended Route", value: summary.recommended_route || freight.route || "—", iconColor: "text-blue-500", small: true },
//     { icon: FiClock, label: "Est. Transit Time", value: summary.est_transit_time_days ? `${summary.est_transit_time_days} Days` : "—", iconColor: "text-yellow-500" },
//     { icon: FiDollarSign, label: "Total Landed Cost (Est.)", value: formatINR(summary.total_landed_cost ?? landed.total, currency), iconColor: "text-red-500" },
//     { icon: FiGift, label: "Total Incentive (Est.)", value: formatINR(summary.total_incentive ?? incentive.total, currency), iconColor: "text-emerald-500", valueColor: "text-emerald-600" },
//   ];
//   return { cards, tabData, resultSummaryItems, currency, dataSources: result.data_sources || result.sources || [], isEstimate: result.is_estimate, queryId: result.query_id, responseAssumptions: result.assumptions || [], responseDisclaimer: result.disclaimer || "" };
// };

// const AiCargoMateAssistant = () => {

//   const [activeTab, setActiveTab] = useState("AI CargoMate Assistant");
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [analysisTab, setAnalysisTab] = useState("HS Code Analysis");
//   const content = tabContent[analysisTab];
//   const [newQuery, setNewQuery] = useState(false)
//    const [showProductDetails, setShowProductDetails] = useState(false)
//   const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false)

//   const [saveReportPopup, setSaveReportPopup] = useState(false)
//   const [downloadReport, setDownloadReport] = useState(false)
//   const [shipment, setShipment] = useState("")
//   const [saveReport, setSaveReport] = useState(false)
//   const [shareReport, setShareReport] = useState(false)
//   const [dataSource, setDataSource] = useState(false)
//   const [queryText, setQueryText] = useState("Best shipment option for exporting 500kg cotton t-shirt from Tirupur to Dubai by air. Include HS code, duty, incentives and total landed cost")
//   const [productValue, setProductValue] = useState("5000")
//   const [currency, setCurrency] = useState("INR")
//   const [assistantResult, setAssistantResult] = useState(null)
//   const [analysisLoading, setAnalysisLoading] = useState(false)
//   const [analysisError, setAnalysisError] = useState("")
//   const liveView = getAssistantView(assistantResult)
//   const displayedCards = liveView?.cards || recCards
//   const displayedSummary = liveView?.resultSummaryItems || resultSummary
//   const displayedTabContent = liveView?.tabData?.[analysisTab] || content

//   const runAssistantAnalysis = async (event) => {
//     event?.preventDefault?.()
//     if (!queryText.trim()) {
//       setAnalysisError("Please enter a shipment query.")
//       return
//     }
//     setAnalysisLoading(true)
//     setAnalysisError("")
//     try {
//       const token = getSession()?.token
//       const response = await axios.get(`${assistantApiBaseURL}/assistant/analyze`, {
//         params: {
//           query: queryText.trim(),
//           product_value_inr: productValue === "" ? undefined : Number(productValue),
//           currency: currency.trim() || "INR",
//         },
//         timeout: 60000,
//         headers: {
//           Accept: "application/json",
//           ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         },
//       })
//       setAssistantResult(response.data)
//       setAnalysisTab("HS Code Analysis")
//     } catch (error) {
//       setAnalysisError(
//         error?.response?.data?.detail ||
//         error?.response?.data?.message ||
//         error?.message ||
//         "Unable to analyze this shipment. Please try again."
//       )
//     } finally {
//       setAnalysisLoading(false)
//     }
//   }

//   useEffect(() => {
//   // setNewQuery(true)
//   setShowProductDetails(true)
//   },[])
//   return (
//     <div className="flex-1 flex flex-col min-w-0 overflow-hidden pt-14">
//       {activeTab === "AI CargoMate Assistant" && (<div>

//         <main className="flex-1 overflow-y-auto bg-gray-50 p-3 sm:p-4 lg:p-5">
//           <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
//             <div>
//               <div className="flex items-center gap-2 flex-wrap">
//                 <h1 className="text-sm sm:text-lg font-bold text-gray-900">
//                   AI CargoMate Assistant
//                 </h1>
//                 <span className="flex items-center gap-1 bg-[#EEF2FF] text-[#4338CA] text-[10px] font-semibold px-2 py-0.5 rounded-full border border-[#EEF2FF]">
//                   <FiStar size={10} className="text-[#4338CA]" /> Core Module
//                 </span>
//               </div>
//               <p className="text-xs font-normal  text-gray-500 mt-0.5">
//                 Your AI trade assistant for smarter decisions
//               </p>
//             </div>
//             <div className="flex flex-wrap gap-2">
//               <button onClick={() => setShowProductDetails(true)} className="flex items-center gap-1.5 border border-gray-200 bg-white text-gray-700 text-xs  font-bold  px-3 py-1.5 rounded-lg hover:bg-gray-50">
//                 <FiArrowLeft size={13} /> New Query
//               </button>
//               <button onClick={saveCurrentReport} className="flex items-center gap-1.5 border border-gray-200 bg-white text-gray-700 text-xs  font-bold  px-3 py-1.5 rounded-lg hover:bg-gray-50">
//                 <FiSave size={13} /> Save Report
//               </button>
//               <button onClick={() => setDownloadReport(true)} className="flex items-center gap-1.5 border border-gray-200 bg-white text-gray-700 text-xs  font-bold  px-3 py-1.5 rounded-lg hover:bg-gray-50">
//                 <FiDownload size={13} /> Download Report (PDF)
//               </button>
//               <button onClick={() => {
//                 setShipment("shipment")
//                 setActiveTab("")
//               }} className="flex items-center gap-1.5 bg-[#0D9488] text-white text-xs font-bold px-3 py-1.5 rounded-lg">
//                 <FiPlus size={13} /> Create Shipment
//               </button>
//             </div>
//           </div>

//           {/* <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2.5 mb-4 text-xs font-medium text-blue-800">
//             <FiInfo
//               size={14}
//               className="text-blue-500 flex-shrink-0 mt-0.5"
//             />
//             This result is AI-generated based on the data sources and
//             assumptions listed below. Please review before making any trade
//             decisions.
//           </div> */}

//           <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-4">
//             <div className="flex flex-col gap-4">
//               <div className="bg-white rounded-xl border border-gray-200 p-4">
//                 <form onSubmit={runAssistantAnalysis} className="space-y-3">
//                   <div>
//                     <p className="text-sm font-bold text-gray-900">Analyze a Shipment</p>
//                     <p className="text-xs text-gray-500 mt-1">Enter a natural-language query to generate a live trade report from the /assistant/analyze API.</p>
//                   </div>
//                   <textarea
//                     value={queryText}
//                     onChange={(event) => setQueryText(event.target.value)}
//                     rows={3}
//                     className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-800 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
//                     placeholder="Describe product, weight, origin, destination and trade details..."
//                   />
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                     <label className="text-xs font-medium text-gray-600">
//                       Product Value
//                       <input type="number" min="0" value={productValue} onChange={(event) => setProductValue(event.target.value)} className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-800" placeholder="5000" />
//                     </label>
//                     <label className="text-xs font-medium text-gray-600">
//                       Currency
//                       <select value={currency} onChange={(event) => setCurrency(event.target.value)} className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-800">
//                         <option value="INR">INR (₹)</option>
//                         <option value="USD">USD ($)</option>
//                         <option value="AED">AED</option>
//                         <option value="EUR">EUR (€)</option>
//                       </select>
//                     </label>
//                   </div>
//                   {analysisError && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">{analysisError}</p>}
//                   <div className="flex flex-wrap items-center gap-3">
//                     <button type="submit" disabled={analysisLoading} className="rounded-lg bg-[#0D9488] px-4 py-2 text-xs font-semibold text-white disabled:opacity-60">
//                       {analysisLoading ? "Analyzing shipment..." : "Analyze Shipment"}
//                     </button>
//                     {assistantResult?.query_id && <span className="text-xs text-gray-500">Query ID: {assistantResult.query_id}</span>}
//                     {assistantResult?.is_estimate && <span className="text-xs text-amber-700">Includes AI estimates — verify before booking.</span>}
//                   </div>
//                 </form>
//               </div>

//               <div className="bg-white rounded-xl border border-gray-200 p-4">
//                 <p className="text-xs font-bold text-gray-900 mb-3 flex items-center gap-2">
//                   Your Query
//                 </p>
//                 <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
//                   <div className="flex items-start gap-3">
//                     <div className="w-9 h-9 bg-blue-50 rounded-full hidden sm:flex items-center justify-center flex-shrink-0">
//                       <FiMap className="text-blue-500 text-base" />
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <p className="text-xs font-medium text-gray-800 leading-relaxed">
//                         {assistantResult?.query?.raw || queryText}
//                       </p>
//                       <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-xs font-medium  text-gray-400">
//                         <span className="">
//                           Query ID:
//                           <span className="t">
//
//                             AIQ-2025-04-24-000123
//                           </span>
//                         </span>
//                         <span>• 24 Apr 2025, 09:25 AM</span>
//                         <span>• User: Arjun Soni</span>
//                       </div>
//                     </div>
//                     {/* <button className="flex-shrink-0 flex items-center text-xs gap-1 border border-gray-200 bg-white text-gray-500 text-[10px] px-2 py-1 rounded-md hover:bg-gray-50">
//                       <FiCopy size={14} /> Copy Query
//                     </button> */}
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-white rounded-xl border border-gray-200 p-4">
//                 <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
//                   <p className="text-xs sm:text-sm  font-bold text-gray-900 flex items-center gap-2">
//                     <FiStar className="text-teal-500 text-base" /> AI Recommended Summary
//                   </p>
//                   <div className="flex gap-3">
//                     <button
//                       type="button"
//                       onClick={() => setDataSource(true)}
//                       className="flex items-center gap-1 text-xs text-blue-500 font-medium hover:underline"
//                       aria-label={`View all ${Array.isArray(liveView?.dataSources) ? liveView.dataSources.length : 0} data sources`}
//                     >
//                       <FiDatabase size={12} /> Data Sources ({Array.isArray(liveView?.dataSources) ? liveView.dataSources.length : 0})
//                     </button>
//                     <button className="flex items-center gap-1 text-xs font-medium text-gray-400">
//                       <FiAlertCircle size={12} /> Disclaimer
//                     </button>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
//                   {displayedCards.map((card, i) => (
//                     <div
//                       key={i}
//                       className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex flex-col"
//                     >
//                       <p className="text-xs text-[#222222] font-medium mb-1">
//                         {card.label}
//                       </p>
//                       {card.route ? (
//                         <>
//                           <p className="text-[11px] font-bold text-gray-800 mb-0.5">
//                             Route
//                           </p>
//                           <p className="text-sm font-bold text-gray-900 mb-2">
//                             {card.route}
//                           </p>
//                         </>
//                       ) : (
//                         <>
//                           <p
//                             className={`text-base font-bold mb-1 ${card.mainColor || "text-gray-900"
//                               }`}
//                           >
//                             {card.main}
//                           </p>
//                           <p className="text-xs font-medium  text-gray-500 mb-2 leading-tight">
//                             {card.sub}
//                           </p>
//                         </>
//                       )}
//                       <div className="flex flex-col gap-1 flex-1">
//                         {card.rows.map(([k, v], j) => (
//                           <div
//                             key={j}
//                             className="flex justify-between text-xs"
//                           >
//                             <span className="text-gray-500 text-xs font-medium">
//                               {k}
//                             </span>
//                             <span className="text-gray-800   text-xs font-medium">
//                               {v}
//                             </span>
//                           </div>
//                         ))}
//                         {card.freightCost && (
//                           <p className="text-base font-bold text-gray-900 mt-1">
//                             {card.freightCost}
//                           </p>
//                         )}
//                       </div>
//                       <button type="button" onClick={() => {
//                         const targetTab = card.label === "HS Code"
//                           ? "HS Code Analysis"
//                           : card.label === "Incentive"
//                             ? "Incentive Analysis"
//                             : card.label === "Freight"
//                               ? "Freight Analysis"
//                               : "Landed Cost Breakdown";

//                         // Keep the assistant view visible, select the matching analysis tab,
//                         // then scroll to Detailed AI Analysis after React has rendered it.
//                         setActiveTab("AI CargoMate Assistant");
//                         setAnalysisTab(targetTab);
//                         setShowDetailedAnalysis(true);
//                         window.setTimeout(() => {
//                           document.getElementById("sectionId")?.scrollIntoView({
//                             behavior: "smooth",
//                             block: "start",
//                           });
//                         }, 180);
//                       }} className="text-teal-500 text-xs font-medium text-left mt-2 hover:underline">
//                         {card.link}
//                       </button>
//                       <button onClick={() => {
//                         setShipment("shipment")
//                         setActiveTab("")
//                       }} className="mt-2 w-full border border-teal-500 text-teal-500 text-xs    font-semibold py-1.5 rounded-lg hover:bg-teal-50">
//                         Create Shipment
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {showDetailedAnalysis && <div id="sectionId" className="bg-white rounded-xl border border-gray-200 p-4 w-full min-w-0 xl:w-[calc(100%+316px)]">
//                 <p className="text-sm  font-bold text-gray-900 mb-3 flex items-center gap-2">
//                   <FiClipboard className="text-teal-500 text-base" /> Detailed AI Analysis
//                 </p>

//                 <div className="flex flex-wrap gap-1 border-b border-gray-200 mb-5 sm:mb-8 pb-0">
//                   {analysisTabs.map((tab) => (
//                     <button
//                       key={tab}
//                       onClick={() => setAnalysisTab(tab)}
//                       className={`px-3 py-2 text-xs font-bold whitespace-normal text-left border-b-2 -mb-px transition-colors
//                             ${analysisTab === tab
//                           ? "border-teal-500 text-teal-500"
//                           : "border-transparent text-gray-500 hover:text-gray-700"
//                         }`}
//                     >
//                       {tab}
//                     </button>
//                   ))}
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
//                   <div>
//                     {displayedTabContent.left.map(([k, v], i) => (
//                       <div
//                         key={i}
//                         className="flex justify-between space-y-2 py-2 border-b border-gray-100 last:border-0 text-xs"
//                       >
//                         <span className="text-gray-500  font-medium text-xs">
//                           {k}
//                         </span>

//                         <span
//                           className={`font-medium text-xs text-right max-w-[55%] ${k === "Total Landed Cost" ||
//                               k === "Total Incentive"
//                               ? "text-teal-600"
//                               : "text-gray-800"
//                             }`}
//                         >
//                           {v}
//                         </span>
//                       </div>
//                     ))}

//                   </div>

//                   <div className="space-y-5">
//                     <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
//                       <p className="flex items-center gap-1.5 text-sm font-bold text-emerald-800 mb-2">
//                         <FiStar size={12} className="text-emerald-500" />
//                         AI Insight
//                       </p>

//                       <p className="text-xs font-normal text-emerald-900 leading-relaxed">
//                         {displayedTabContent.insight}
//                       </p>
//                     </div>

//                     <div className="bg-[#DBDBDB] border border-gray-200 rounded-lg p-3">
//                       <p className="flex items-center gap-1.5 t text-sm font-bold text-gray-700 mb-2">
//                         <FiClipboard size={12} />
//                         Assumptions
//                       </p>

//                       <p className="text-xs font-normal text-gray-600 leading-relaxed">
//                         {displayedTabContent.assumption}
//                       </p>
//                     </div>

//                     <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
//                       <p className="flex items-center gap-1.5 text-sm font-bold text-orange-700 mb-2">
//                         <FiAlertCircle size={12} />
//                         Disclaimer
//                       </p>

//                       <p className="text-xs font-normal text-orange-800 leading-relaxed">
//                         {displayedTabContent.disclaimer}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>}

//               {liveView && (
//                 <div className="mt-4 bg-white rounded-xl border border-gray-200 p-4">
//                   <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
//                     <p className="text-sm font-bold text-gray-900">Report Sources & Metadata</p>
//                     {liveView.isEstimate !== undefined && (
//                       <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${liveView.isEstimate ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}>
//                         {liveView.isEstimate ? "AI estimate included" : "Grounded result"}
//                       </span>
//                     )}
//                   </div>
//                   {liveView.queryId && <div className="flex justify-between gap-4 py-1.5 text-xs"><span className="text-gray-500">Query ID</span><span className="text-right text-gray-800 break-all">{liveView.queryId}</span></div>}
//                   {liveView.dataSources?.length > 0 && <div className="py-1.5 text-xs"><p className="text-gray-500 mb-1">Data Sources</p><div className="flex flex-wrap gap-1.5">{liveView.dataSources.map((source, index) => <span key={`${source}-${index}`} className="rounded-md bg-gray-100 px-2 py-1 text-gray-700">{String(source).replaceAll("_", " ")}</span>)}</div></div>}
//                   {liveView.responseAssumptions?.length > 0 && <div className="mt-2 text-xs"><p className="text-gray-500 mb-1">Overall Assumptions</p><ul className="list-disc pl-4 space-y-1 text-gray-700">{liveView.responseAssumptions.map((item, index) => <li key={index}>{readableValue(item)}</li>)}</ul></div>}
//                   {liveView.responseDisclaimer && <p className="mt-3 border-t border-gray-100 pt-3 text-xs leading-relaxed text-orange-800">{liveView.responseDisclaimer}</p>}
//                 </div>
//               )}

//             </div>

//             <div className="flex flex-col gap-4">
//               <div className="bg-white rounded-xl border border-gray-200 p-4">
//                 <p className="text-sm sm:text-base font-bold text-gray-900 mb-3">
//                   Result Summary
//                 </p>
//                 {displayedSummary.map(
//                   (
//                     {
//                       icon: Icon,
//                       label,
//                       value,
//                       iconColor,
//                       small,
//                       valueColor,
//                     },
//                     i,
//                   ) => (
//                     <div
//                       key={i}
//                       className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0 text-xs font-medium"
//                     >
//                       <div
//                         className={`flex items-center text-xs font-medium gap-2 text-gray-500`}
//                       >
//                         <Icon size={14} className={iconColor} /> {label}
//                       </div>
//                       <span
//                         className={`font-medium text-right max-w-[50%] ${valueColor || "text-gray-900"
//                           } ${small ? "text-xs font-medium " : "text-xs font-medium"}`}
//                       >
//                         {value}
//                       </span>
//                     </div>
//                   ),
//                 )}
//                 <button onClick={() => {
//                   setShipment("shipment")
//                   setActiveTab("")
//                 }} className="mt-3 w-full bg-[#0D9488] text-white text-sm   font-semibold py-2.5 rounded-xl">
//                   Create Shipment
//                 </button>
//               </div>
//               <div >
//                 <DashboardAdPlacement location="User Dashboard - AI CargoMate Assistant" />
//               </div>

//               <div className="bg-white rounded-xl border border-gray-200 p-4">
//                 <p className="text-sm  font-bold   text-gray-900 mb-3">
//                   Report Information
//                 </p>
//                 {[
//                   ["Report ID", "AIR-2025-04-24-000123"],
//                   ["Generated On", "24 Apr 2025, 09:25 AM"],
//                   ["Generated By", "Arjun Soni"],
//                   ["Plan", "Pro Plan"],
//                   ["AI Model Version", "v2.1.0"],
//                 ].map(([k, v]) => (
//                   <div
//                     key={k}
//                     className="flex justify-between py-1.5 text-[11px]"
//                   >
//                     <span className="text-gray-500 text-xs  font-medium">
//                       {k}
//                     </span>
//                     <span className="text-gray-800  text-xs font-medium">
//                       {v}
//                     </span>
//                   </div>
//                 ))}
//                 {/* <button onClick={() => setDownloadReport(true)} className="mt-3 w-full flex items-center justify-center gap-2 border text-sm  border-gray-200 bg-white text-gray-700 t s font-medium py-2 rounded-lg hover:bg-gray-50">
//                   <FiDownload size={13} /> Download Report (PDF)
//                 </button> */}
//               </div>

//               {/* <div className="bg-white rounded-xl border border-gray-200 p-4">
//                 <div className="flex items-center justify-between mb-3">
//                   <p className="text-sm  font-bold text-gray-900">
//                     Audit Log
//                   </p>
//                   <button className="text-teal-500 text-xs font-medium hover:underline">
//                     View All
//                   </button>
//                 </div>
//                 {auditLog.map((entry, i) => (
//                   <div
//                     key={i}
//                     className="flex  gap-2 py-1.5 border-b border-gray-100 last:border-0"
//                   >
//                     <span
//                       className={`w-2 h-2 rounded-full bg-green-500 flex-shrink-0 mt-1`}
//                     />

//                     <span className=" flex-1 text-xs font-medium   text-gray-600">
//                       {entry.text}
//                     </span>
//                     <span className="text-xs text-left text-gray-400 whitespace-nowrap">
//                       {entry.time}
//                     </span>
//                   </div>
//                 ))}
//               </div> */}
//               <div>

//               </div>
//             </div>

//           </div>

//           {/* Full-width horizontal ad: spans beneath both the main report and the right sidebar. */}
//           <div className="w-full min-w-0 mt-4 mb-2">
//             <DashboardAdPlacement
//               location="User Dashboard - AI CargoMate Assistant"
//               layout="banner"
//               slot="banner"
//               intervalMs={5000}
//             />
//           </div>

//                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-3">
//             <div className="bg-white  flex flex-col justify-center gap-10 rounded-xl border border-gray-200  px-3 py-4">
//               <div className=' flex flex-row items-center justify-between'>
//                 <h3 className="text-xs  font-bold text-gray-900 ">
//                   Data Sources Used
//                 </h3>
//                 <button onClick={() => setDataSource(true)} className=" text-teal-500 text-xs  font-medium hover:underline">
//                   View All Sources
//                 </button>
//               </div>

//               <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
//                 {Array.isArray(liveView?.dataSources) && liveView.dataSources.length > 0 ? (
//                   liveView.dataSources.map((source, index) => {
//                     const sourceLabel = String(source ?? "")
//                       .replaceAll("_", " ")
//                       .replace(/\s+/g, " ")
//                       .trim();
//                     return sourceLabel ? (
//                       <div key={`${sourceLabel}-${index}`} className="flex min-w-0 items-start gap-2 text-gray-700" title={sourceLabel}>
//                         <FiDatabase size={14} className="mt-0.5 shrink-0" />
//                         <span className="break-words">{sourceLabel}</span>
//                       </div>
//                     ) : null;
//                   })
//                 ) : (
//                   <p className="col-span-full text-gray-500">
//                     Run shipment analysis to see the data sources returned by the API.
//                   </p>
//                 )}
//               </div>

//             </div>

//             <div className="bg-white rounded-xl border border-gray-200 p-4">
//               <h3 className="text-xs  font-bold text-gray-900 mb-4">
//                 Connected To Live Data
//               </h3>

//               <p className="text-xs  text-[#64748B] leading-relaxed mb-4">
//                 All modules are connected to backend systems and databases for
//                 real-time, accurate information.
//               </p>

//               <div className="inline-flex items-center gap-2 px-3 py-1.5    b0">
//                 <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
//                 <span className="text-xs sm:text-sm font-medium text-emerald-700">
//                   Connected
//                 </span>
//               </div>
//             </div>

//             <div className="bg-white flex rounded-xl border border-gray-200 px-4">

//               <NeedHelp mobile={"+91 22 1234 5678"} para={" Our trade experts are here to help you."} heading={"Need help ?"} />

//             </div>

//           </div>

//         </main></div>)}

//       <div className='fixed right-5 bottom-5'>
//         <img src={chat} />
//       </div>

//       {shipment === "shipment" && (
//         <div>
//           <Shipment setActiveTab={setActiveTab} setShipment={setShipment} currentTab={"AI CargoMate Assistant"}
            // prefill={assistantResult} />
//         </div>
//       )
//       }

//       {downloadReport && (<DownloadReportModal onClose={() => setDownloadReport(false)} />)}
//       {/* {newQuery && (<NewQueryModal onClose={() => setNewQuery(false)} />)} */}
//       {showProductDetails && (<ProductDetails onClose={() => setShowProductDetails(false)} /> )}
//       {saveReportPopup && (<SaveReportPopup onClose={() => setSaveReportPopup(false)} />)}
//       {saveReport && (<SaveReportModal onClose={() => setSaveReport(false)} />)}
//       {shareReport && (<ShareReportModal onClose={() => setShareReport(false)} />)}
//       {dataSource && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4" onClick={() => setDataSource(false)}>
//           <div
//             role="dialog"
//             aria-modal="true"
//             aria-labelledby="data-sources-modal-title"
//             className="w-full max-w-lg rounded-xl bg-white p-5 shadow-2xl"
//             onClick={(event) => event.stopPropagation()}
//           >
//             <div className="mb-4 flex items-center justify-between gap-3">
//               <div>
//                 <h2 id="data-sources-modal-title" className="text-base font-bold text-gray-900">All Data Sources Used</h2>
//                 <p className="mt-1 text-xs text-gray-500">Sources returned by the shipment analysis API.</p>
//               </div>
//               <button
//                 type="button"
//                 onClick={() => setDataSource(false)}
//                 aria-label="Close data sources"
//                 className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
//               >
//                 <FiX size={18} />
//               </button>
//             </div>
//             <div className="max-h-[60vh] space-y-2 overflow-y-auto">
//               {Array.isArray(liveView?.dataSources) && liveView.dataSources.length > 0 ? (
//                 liveView.dataSources.map((source, index) => {
//                   const sourceLabel = String(source ?? "")
//                     .replaceAll("_", " ")
//                     .replace(/\s+/g, " ")
//                     .trim();
//                   return sourceLabel ? (
//                     <div key={`${sourceLabel}-${index}`} className="flex items-start gap-3 rounded-lg border border-gray-200 p-3 text-sm text-gray-700">
//                       <FiDatabase size={16} className="mt-0.5 shrink-0 text-teal-600" />
//                       <span className="break-words">{sourceLabel}</span>
//                     </div>
//                   ) : null;
//                 })
//               ) : (
//                 <p className="rounded-lg bg-gray-50 p-4 text-sm text-gray-500">No data sources returned yet. Run shipment analysis first.</p>
//               )}
//             </div>
//             <div className="mt-5 flex justify-end">
//               <button type="button" onClick={() => setDataSource(false)} className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700">Close</button>
//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   )
// }

// export default AiCargoMateAssistant

import React, { useEffect, useState, useTransition } from "react";

import axios from "axios";

import {
  FiArrowLeft,
  FiSave,
  FiDownload,
  FiPlus,
  FiInfo,
  FiCopy,
  FiStar,
  FiDatabase,
  FiAlertCircle,
  FiAnchor,
  FiCpu,
  FiHash,
  FiGift,
  FiTruck,
  FiMap,
  FiPackage,
  FiRadio,
  FiFileText,
  FiUsers,
  FiBookmark,
  FiClipboard,
  FiBarChart2,
  FiCreditCard,
  FiBell,
  FiHelpCircle,
  FiSettings,
  FiChevronRight,
  FiShare2,
  FiSend,
  FiCheck,
  FiClock,
  FiDollarSign,
  FiX,
} from "react-icons/fi";

import { FiPhone } from "react-icons/fi";

import { BsAirplane } from "react-icons/bs";

import { MdOutlineRocketLaunch } from "react-icons/md";

import NeedHelp from "../../components/core/NeedHelp";

import chat from "../../assets/Images/webp/chat.webp";

import Shipment from "../../components/ShipmentForm";

import DownloadReportModal from "../../components/userComponent/DownloadReport";

import NewQueryModal from "../../components/userComponent/NewQuery";

import SaveReportModal from "../../components/userComponent/SaveReport";

import SaveReportPopup from "../../components/userComponent/SaveReportPopup";

import ShareReportModal from "../../components/userComponent/ShareReport";

import poster from "../../assets/Images/webp/poster3.webp";

import poster2 from "../../assets/Images/webp/poster2.webp";

import ProductDetails from "../../components/userComponent/ProductDetails";

import DashboardAdPlacement from "../../components/DashboardAdPlacement";

// Converts API values (including objects and arrays) into safe readable UI text.

// Keep this at module scope so both the component JSX and response mappers can use it.

const readableValue = (value) => {
  if (value === null || value === undefined || value === "") return "—";

  if (Array.isArray(value)) {
    if (value.length === 0) return "—";

    return value

      .map((item) => {
        if (item === null || item === undefined) return "";

        if (typeof item === "object") {
          const name = item.name || item.label || item.title;

          const status = item.status || item.value;

          if (name && status) return `${name}: ${readableValue(status)}`;

          if (name) return String(name);

          return Object.entries(item)

            .map(
              ([key, nested]) =>
                `${key.replaceAll("_", " ")}: ${readableValue(nested)}`,
            )

            .join(" · ");
        }

        return String(item);
      })

      .filter(Boolean)

      .join(", ");
  }

  if (typeof value === "object") {
    return Object.entries(value)

      .map(
        ([key, nested]) =>
          `${key.replaceAll("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}: ${readableValue(nested)}`,
      )

      .join(" · ");
  }

  return String(value);
};

const recCards = [
  {
    label: "HS Code",

    main: "6109.10.00",

    sub: "T-shirts, singlets and other vests, of cotton",

    rows: [
      ["IGST Rate (India)", "12%"],

      ["UAE Customs Duty", "5%"],
    ],

    link: "View HS Code Details",
  },

  {
    label: "Incentive",

    main: "₹8,420",

    mainColor: "text-emerald-600",

    sub: "Total Incentive Value",

    rows: [
      ["RoDTEP", "₹3,420"],

      ["MEIS", "₹5,000"],

      ["State Incentive (TN)", "₹0"],
    ],

    link: "View Incentive Details",
  },

  {
    label: "Freight",

    routeLabel: "Route",

    route: "Tirupur → Dubai",

    rows: [
      ["Mode", "Air Freight"],

      ["Est. Freight Cost", ""],
    ],

    freightCost: "₹24,860",

    link: "View Freight Breakdown",
  },

  {
    label: "Landed Cost",

    main: "₹1,24,680",

    sub: "Total Landed Cost",

    rows: [
      ["Product Cost", "₹76,230"],

      ["Freight & Insurance", "₹24,860"],

      ["Duties & Taxes", "₹13,590"],

      ["Other Charges", "₹9,99"],
    ],

    link: "View Cost Breakdown",
  },
];

const analysisTabs = [
  "HS Code Analysis",

  "Incentive Analysis",

  "Freight Analysis",

  "Landed Cost Breakdown",

  "Compliance & Documents",

  "Market Insights",
];

const resultSummary = [
  {
    icon: BsAirplane,

    label: "Best Mode",

    value: "Air Freight",

    iconColor: "text-teal-500",
  },

  {
    icon: BsAirplane,

    label: "Recommended Route",

    value: "Tirupur, India → Dubai, UAE",

    iconColor: "text-blue-500",

    small: true,
  },

  {
    icon: FiClock,

    label: "Est. Transit Time",

    value: "3 – 5 Days",

    iconColor: "text-yellow-500",
  },

  {
    icon: FiDollarSign,

    label: "Total Landed Cost (Est.)",

    value: "₹1,24,680",

    iconColor: "text-red-500",
  },

  {
    icon: FiGift,

    label: "Total Incentive (Est.)",

    value: "₹8,420",

    iconColor: "text-emerald-500",

    valueColor: "text-emerald-600",
  },
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

const tabContent = {
  "HS Code Analysis": {
    left: [
      ["HS Code", "6109.10.00"],

      ["Description", "T-shirts, singlets and other vests, of cotton"],

      ["Classification Basis", "Chapter 61, Note 7, Section XI"],

      ["IGST (India)", "12%"],

      ["UAE Customs Duty", "5%"],

      ["Applicable Cess", "NA"],
    ],

    insight:
      "This HS code covers cotton T-shirts. Ensure accurate declaration of fabric composition and HS classification to avoid customs delays.",

    assumption:
      "Product is 100% cotton, knitted. Shipment weight is 500kg. Prices and duties are based on current available data and may change.",

    disclaimer:
      "All results are for reference only. Please verify with official government and customs sources before making business decisions.",

    buttonText: "Create Shipment ",
  },

  "Incentive Analysis": {
    left: [
      ["RoDTEP", "₹3,420"],

      ["MEIS", "₹5,000"],

      ["State Incentive (TN)", "₹0"],

      ["Total Incentive", "₹8,420"],
    ],

    insight:
      "RoDTEP scheme replaces MEIS for most textile exports. Verify eligibility and current rates before filing.",

    assumption:
      "Product is 100% cotton, knitted. Shipment weight is 500kg. Prices and duties are based on current available data and may change.",

    disclaimer:
      "All results are for reference only. Please verify with official government and customs sources before making business decisions.",

    buttonText: "Create Shipment ",
  },

  "Freight Analysis": {
    left: [
      ["Route", "Tirupur → Dubai, UAE"],

      ["Mode", "Air Freight"],

      ["Est. Freight Cost", "₹24,860"],

      ["Transit Time", "3–5 Days"],
    ],

    insight:
      "Air freight is fastest but costlier. Consider sea freight for large volumes to reduce landed cost significantly.",

    assumption:
      "Product is 100% cotton, knitted. Shipment weight is 500kg. Prices and duties are based on current available data and may change.",

    disclaimer:
      "All results are for reference only. Please verify with official government and customs sources before making business decisions.",

    buttonText: "Create Shipment ",
  },

  "Landed Cost Breakdown": {
    left: [
      ["Product Cost", "₹76,230"],

      ["Freight & Insurance", "₹24,860"],

      ["Duties & Taxes", "₹13,590"],

      ["Other Charges", "₹9,99"],

      ["Total Landed Cost", "₹1,24,680"],
    ],

    insight:
      "Total landed cost is ₹1,24,680. Duties and taxes account for \~11% of landed cost.",

    assumption:
      "Product is 100% cotton, knitted. Shipment weight is 500kg. Prices and duties are based on current available data and may change.",

    disclaimer:
      "All results are for reference only. Please verify with official government and customs sources before making business decisions.",

    buttonText: "Create Shipment ",
  },

  "Compliance & Documents": {
    left: [
      ["Certificate of Origin", "Required"],

      ["GSP Form A", "Recommended"],

      ["Packing List", "Required"],

      ["Commercial Invoice", "Required"],

      ["Airway Bill", "Required"],
    ],

    insight:
      "Ensure all documents are prepared and verified before shipment to avoid customs clearance delays at Dubai port.",

    assumption:
      "Product is 100% cotton, knitted. Shipment weight is 500kg. Prices and duties are based on current available data and may change.",

    disclaimer:
      "All results are for reference only. Please verify with official government and customs sources before making business decisions.",

    buttonText: "Create Shipment",
  },

  "Market Insights": {
    left: [
      ["UAE Market Demand", "High"],

      ["Avg. Selling Price (UAE)", "AED 18–24 / piece"],

      ["Key Competitors", "Bangladesh, China"],

      ["India Market Share", "14.2%"],
    ],

    insight:
      "India's textile exports to UAE are growing. Leverage FTA benefits and competitive pricing to gain market share.",

    assumption:
      "Product is 100% cotton, knitted. Shipment weight is 500kg. Prices and duties are based on current available data and may change.",

    disclaimer:
      "All results are for reference only. Please verify with official government and customs sources before making business decisions.",

    buttonText: "Create Shipment",
  },
};

const assistantApiBaseURL = (
  import.meta.env.VITE_AI_API_BASE_URL ||
  import.meta.env.VITE_CARGOMATE_API_URL ||
  "https://ai-service-nb69.onrender.com/api/api"
).replace(/\/+$/, "");

const formatINR = (value, currency = "INR") => {
  if (value === null || value === undefined || value === "") return "—";

  const amount = Number(value);

  if (!Number.isFinite(amount)) return String(value);

  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",

      currency: currency || "INR",

      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${currency || "INR"} ${amount.toLocaleString("en-IN")}`;
  }
};

const getAssistantView = (result) => {
  if (!result) return null;

  const recommended = result.recommended || {};

  const analysis = result.analysis || {};

  const summary = result.result_summary || {};

  const currency = result.currency || summary.currency || "INR";

  const hs = recommended.hs_code || {};

  const incentive = recommended.incentive || {};

  const freight = recommended.freight || {};

  const landed = recommended.landed_cost || {};

  const hsFields = analysis.hs_code?.fields || {};

  const incentiveFields = analysis.incentive?.fields || {};

  const freightFields = analysis.freight?.fields || {};

  const landedFields = analysis.landed_cost?.fields || {};

  const compliance = analysis.compliance_documents || {};

  const market = analysis.market_insights || {};

  const cards = [
    {
      label: "HS Code",

      main: hs.hs_code_dotted || hs.hs_code || hsFields.hs_code || "—",

      sub:
        hs.description ||
        hsFields.description ||
        "Recommended product classification",

      rows: [
        [
          "IGST Rate (India)",
          (hs.igst_pct ?? hsFields.igst_india_pct) != null
            ? `${hs.igst_pct ?? hsFields.igst_india_pct}%`
            : "—",
        ],

        [
          "Destination Customs Duty",
          (hs.dest_customs_duty_pct ?? hsFields.dest_customs_duty_pct) != null
            ? `${hs.dest_customs_duty_pct ?? hsFields.dest_customs_duty_pct}%`
            : "—",
        ],
      ],

      link: "View HS Code Details",
    },

    {
      label: "Incentive",

      main: formatINR(
        incentive.total ??
          incentiveFields.total_incentive ??
          summary.total_incentive,
        currency,
      ),

      mainColor: "text-emerald-600",

      sub: "Total Incentive Value",

      rows: [
        [
          "RoDTEP",
          formatINR(incentive.rodtep ?? incentiveFields.rodtep, currency),
        ],

        [
          "Duty Drawback",
          formatINR(incentive.drawback ?? incentiveFields.drawback, currency),
        ],

        [
          "State Incentive",
          formatINR(
            incentive.state_incentive ?? incentiveFields.state_incentive,
            currency,
          ),
        ],
      ],

      link: "View Incentive Details",
    },

    {
      label: "Freight",

      routeLabel: "Route",

      route:
        freight.route ||
        freightFields.route ||
        summary.recommended_route ||
        "—",

      rows: [
        [
          "Mode",
          freight.mode || freightFields.mode || summary.best_mode || "—",
        ],

        [
          "Est. Freight Cost",
          formatINR(
            freight.est_cost ?? freightFields.est_freight_cost,
            currency,
          ),
        ],

        [
          "Transit Time",
          `${freightFields.transit_time || summary.est_transit_time_days || "—"}${freightFields.transit_time || summary.est_transit_time_days ? " days" : ""}`,
        ],
      ],

      freightCost: formatINR(
        freight.est_cost ?? freightFields.est_freight_cost,
        currency,
      ),

      link: "View Freight Breakdown",
    },

    {
      label: "Landed Cost",

      main: formatINR(
        landed.total ??
          landedFields.total_landed_cost ??
          summary.total_landed_cost,
        currency,
      ),

      sub: "Total Landed Cost",

      rows: [
        [
          "Product Cost",
          formatINR(landed.product_cost ?? landedFields.product_cost, currency),
        ],

        [
          "Freight & Insurance",
          formatINR(
            landed.freight_and_insurance ?? landedFields.freight_and_insurance,
            currency,
          ),
        ],

        [
          "Duties & Taxes",
          formatINR(
            landed.duties_and_taxes ?? landedFields.duties_and_taxes,
            currency,
          ),
        ],

        [
          "Other Charges",
          formatINR(
            landed.other_charges ?? landedFields.other_charges,
            currency,
          ),
        ],
      ],

      link: "View Cost Breakdown",
    },
  ]; // Render nested API values as readable text instead of React's "[object Object]".

  const readableValue = (value) => {
    if (value === null || value === undefined || value === "") return "—";

    if (Array.isArray(value)) {
      return value
        .map((item) => {
          if (item && typeof item === "object") {
            const name = item.name || item.label || item.title || "";

            const status = item.status || item.value || "";

            return (
              [name, status].filter(Boolean).join(": ") || JSON.stringify(item)
            );
          }

          return String(item);
        })
        .join(", ");
    }

    if (typeof value === "object") {
      return Object.entries(value)

        .map(
          ([key, nestedValue]) =>
            `${key.replaceAll("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}: ${readableValue(nestedValue)}`,
        )

        .join(" · ");
    }

    return String(value);
  };

  const prettifyKey = (key) =>
    key.replaceAll("_", " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const getSection = (section, fallbackInsight) => {
    const fields = section?.fields || {};

    const rows = Object.entries(fields)

      .filter(([key]) => key !== "notes")

      .map(([key, value]) => [prettifyKey(key), readableValue(value)]); // Some API versions return notes beside fields; expose each note as its own row.

    const notes =
      section?.notes ||
      fields.notes ||
      (section === analysis.incentive ? result.notes || incentive.notes : null);

    if (notes && typeof notes === "object" && !Array.isArray(notes)) {
      Object.entries(notes).forEach(([key, value]) => {
        const label = `Note — ${prettifyKey(key)}`;

        const existingIndex = rows.findIndex(
          ([rowLabel]) => rowLabel.toLowerCase() === label.toLowerCase(),
        );

        if (existingIndex >= 0)
          rows[existingIndex] = [label, readableValue(value)];
        else rows.push([label, readableValue(value)]);
      });
    }

    return {
      left: rows,

      insight:
        section?.ai_insight ||
        fallbackInsight ||
        "No additional insight returned by the API.",

      assumption:
        readableValue(section?.assumptions || result.assumptions) !== "—"
          ? readableValue(section?.assumptions || result.assumptions)
          : "No assumptions were provided by the API.",

      disclaimer:
        section?.disclaimer ||
        result.disclaimer ||
        "Indicative result. Verify official sources before making trade decisions.",

      buttonText: "Create Shipment",
    };
  };

  const tabData = {
    "HS Code Analysis": getSection(
      analysis.hs_code,
      "Review the recommended HS classification and applicable taxes.",
    ),

    "Incentive Analysis": getSection(
      analysis.incentive,
      "Review the incentive values and eligibility before claiming.",
    ),

    "Freight Analysis": getSection(
      analysis.freight,
      "Compare freight cost and transit time before booking.",
    ),

    "Landed Cost Breakdown": getSection(
      analysis.landed_cost,
      "Review all components included in the estimated landed cost.",
    ),

    "Compliance & Documents": {
      ...getSection(
        compliance,
        "Check the document requirements before shipping.",
      ),

      left: [
        ...(Array.isArray(compliance.fields?.documents)
          ? compliance.fields.documents.map((doc) => [
              doc.name || "Document",
              doc.status || "Check requirement",
            ])
          : []),

        ...(compliance.fields?.export_policy_hint
          ? [
              [
                "Export Policy Hint",
                readableValue(compliance.fields.export_policy_hint),
              ],
            ]
          : []),

        ...getSection(compliance, "").left.filter(
          ([label]) => label !== "Documents" && label !== "Export Policy Hint",
        ),
      ],
    },

    "Market Insights": {
      ...getSection(
        market,
        "Review market demand and competition for the selected product.",
      ),

      left: Object.entries(market.fields || {}).map(([key, value]) => [
        prettifyKey(key),
        readableValue(value),
      ]),
    },
  };

  const resultSummaryItems = [
    {
      icon: BsAirplane,
      label: "Best Mode",
      value: summary.best_mode || freight.mode || "—",
      iconColor: "text-teal-500",
    },

    {
      icon: BsAirplane,
      label: "Recommended Route",
      value: summary.recommended_route || freight.route || "—",
      iconColor: "text-blue-500",
      small: true,
    },

    {
      icon: FiClock,
      label: "Est. Transit Time",
      value: summary.est_transit_time_days
        ? `${summary.est_transit_time_days} Days`
        : "—",
      iconColor: "text-yellow-500",
    },

    {
      icon: FiDollarSign,
      label: "Total Landed Cost (Est.)",
      value: formatINR(summary.total_landed_cost ?? landed.total, currency),
      iconColor: "text-red-500",
    },

    {
      icon: FiGift,
      label: "Total Incentive (Est.)",
      value: formatINR(summary.total_incentive ?? incentive.total, currency),
      iconColor: "text-emerald-500",
      valueColor: "text-emerald-600",
    },
  ];

  return {
    cards,
    tabData,
    resultSummaryItems,
    currency,
    dataSources: result.data_sources || result.sources || [],
    isEstimate: result.is_estimate,
    queryId: result.query_id,
    responseAssumptions: result.assumptions || [],
    responseDisclaimer: result.disclaimer || "",
  };
};

const AiCargoMateAssistant = () => {
  const [activeTab, setActiveTab] = useState("AI CargoMate Assistant");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [analysisTab, setAnalysisTab] = useState("HS Code Analysis");

  const content = tabContent[analysisTab];

  const [newQuery, setNewQuery] = useState(false);

  const [showProductDetails, setShowProductDetails] = useState(false);

  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false);

  const [saveReportPopup, setSaveReportPopup] = useState(false);

  const [downloadReport, setDownloadReport] = useState(false);

  const [shipment, setShipment] = useState("");

  const [saveReport, setSaveReport] = useState(false);

  const [shareReport, setShareReport] = useState(false);

  const [dataSource, setDataSource] = useState(false);

  const [queryText, setQueryText] = useState("");

  const [productValue, setProductValue] = useState("5000");

  const [currency, setCurrency] = useState("INR");

  const [assistantResult, setAssistantResult] = useState(null);

  const [analysisLoading, setAnalysisLoading] = useState(false);

  const [analysisError, setAnalysisError] = useState("");

  const liveView = getAssistantView(assistantResult);

  const hasAnalyzedShipment = Boolean(assistantResult);
  const saveCurrentReport=async()=>{if(!assistantResult){await errorAlert("Analyze a shipment first");return;}try{await reportRequest("","POST",{reportName:`AI Shipment - ${assistantResult.query_id||new Date().toISOString()}`,description:queryText,category:"Analytics & Trends",module:"Analytics",type:"Analytics",dataSource:"AI CargoMate Assistant",reportData:assistantResult});await successAlert("Report saved. Open Saved to view it.")}catch(e){await errorAlert(e.message)}};
  const zeroCards = [
    {
      label: "HS Code",
      main: "0",
      sub: "No shipment analyzed yet",
      rows: [
        ["IGST Rate (India)", "0%"],
        ["UAE Customs Duty", "0%"],
      ],
      link: "View HS Code Details",
    },
    {
      label: "Incentive",
      main: "₹0",
      mainColor: "text-emerald-600",
      sub: "Total Incentive Value",
      rows: [
        ["RoDTEP", "₹0"],
        ["MEIS", "₹0"],
        ["State Incentive", "₹0"],
      ],
      link: "View Incentive Details",
    },
    {
      label: "Freight",
      routeLabel: "Route",
      route: "—",
      rows: [
        ["Mode", "—"],
        ["Est. Freight Cost", "₹0"],
      ],
      freightCost: "₹0",
      link: "View Freight Breakdown",
    },
    {
      label: "Landed Cost",
      main: "₹0",
      sub: "Total Landed Cost",
      rows: [
        ["Product Cost", "₹0"],
        ["Freight & Insurance", "₹0"],
        ["Duties & Taxes", "₹0"],
        ["Other Charges", "₹0"],
      ],
      link: "View Cost Breakdown",
    },
  ];
  const zeroSummary = resultSummary.map((item) => ({
    ...item,
    value:
      item.label === "Best Mode" || item.label === "Recommended Route"
        ? "—"
        : item.label === "Est. Transit Time"
          ? "0 Days"
          : "₹0",
  }));
  const displayedCards = hasAnalyzedShipment
    ? liveView?.cards || zeroCards
    : zeroCards;
  const displayedSummary = hasAnalyzedShipment
    ? liveView?.resultSummaryItems || zeroSummary
    : zeroSummary;
  const displayedTabContent = hasAnalyzedShipment
    ? liveView?.tabData?.[analysisTab] || content
    : {
        left: [
          ["Status", "No shipment analyzed yet"],
          ["HS Code", "—"],
          ["Duty", "0%"],
        ],
        insight:
          "Enter a shipment query and select Analyze Shipment to view AI insights.",
        assumption: "No assumptions available until a shipment is analyzed.",
        disclaimer: "Analysis has not been generated yet.",
      };

  const runAssistantAnalysis = async (event) => {
    event?.preventDefault?.();

    if (!queryText.trim()) {
      setAnalysisError("Please enter a shipment query.");

      return;
    }

    setAnalysisLoading(true);

    setAnalysisError("");

    try {
      const token =
        getSession()?.token;

      const response = await axios.get(
        `${assistantApiBaseURL}/assistant/analyze`,
        {
          params: {
            query: queryText.trim(),

            product_value_inr:
              productValue === "" ? undefined : Number(productValue),

            currency: currency.trim() || "INR",
          },

          timeout: 60000,

          headers: {
            Accept: "application/json",

            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        },
      );

      setAssistantResult(response.data);

      setAnalysisTab("HS Code Analysis");
    } catch (error) {
      setAnalysisError(
        error?.response?.data?.detail ||
          error?.response?.data?.message ||
          error?.message ||
          "Unable to analyze this shipment. Please try again.",
      );
    } finally {
      setAnalysisLoading(false);
    }
  };

  useEffect(() => {
    setShowProductDetails(false);
  }, []);
  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden pt-14">
           
      {activeTab === "AI CargoMate Assistant" && (
        <div>
                 
          <main className="flex-1 overflow-y-auto bg-gray-50 p-3 sm:p-4 lg:p-5">
                     
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                         
              <div>
                             
                <div className="flex items-center gap-2 flex-wrap">
                                 
                  <h1 className="text-sm sm:text-lg font-bold text-gray-900">
                                      AI CargoMate Assistant                
                  </h1>
                                 
                  <span className="flex items-center gap-1 bg-[#EEF2FF] text-[#4338CA] text-[10px] font-semibold px-2 py-0.5 rounded-full border border-[#EEF2FF]">
                                     
                    <FiStar size={10} className="text-[#4338CA]" /> Core Module
                                   
                  </span>
                               
                </div>
                             
                <p className="text-xs font-normal  text-gray-500 mt-0.5">
                                  Your AI trade assistant for smarter decisions
                               
                </p>
                           
              </div>
                         
              <div className="flex flex-wrap gap-2">
                             
                <button
                  onClick={() => setShowProductDetails(true)}
                  className="flex items-center gap-1.5 border border-gray-200 bg-white text-gray-700 text-xs  font-bold  px-2 py-1.5 rounded-lg hover:bg-gray-50"
                >
                                  <FiArrowLeft size={13} /> New Query          
                     
                </button>
                             
                <button
                  onClick={saveCurrentReport}
                  className="flex items-center gap-1.5 border border-gray-200 bg-white text-gray-700 text-xs  font-bold  px-3 py-1.5 rounded-lg hover:bg-gray-50"
                >
                                  <FiSave size={13} /> Save Report              
                </button>
                             
                <button
                  onClick={() => setDownloadReport(true)}
                  className="flex items-center gap-1.5 border border-gray-200 bg-white text-gray-700 text-xs  font-bold  px-3 py-1.5 rounded-lg hover:bg-gray-50"
                >
                                  <FiDownload size={13} /> Download Report (PDF)
                               
                </button>
                             
                <button
                  onClick={() => {
                    setShipment("shipment");

                    setActiveTab("");
                  }}
                  className="flex items-center gap-1.5 bg-[#0D9488] text-white text-xs font-bold px-3 py-1.5 rounded-lg"
                >
                                  <FiPlus size={13} /> Create Shipment          
                     
                </button>
                           
              </div>
                       
            </div>
                               
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-4">
                         
              <div className="flex flex-col gap-4">
                             
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                                 
                  <form onSubmit={runAssistantAnalysis} className="space-y-3">
                                     
                    <div>
                                         
                      <p className="text-sm font-bold text-gray-900">
                        Analyze a Shipment
                      </p>
                                                           
                    </div>
                                     
                    <textarea
                      value={queryText}
                      onChange={(event) => setQueryText(event.target.value)}
                      rows={3}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-800 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                      placeholder="Describe product, weight, origin, destination and trade details..."
                    />
                                     
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                         
                      <label className="text-xs font-medium text-gray-600">
                                              Product Value                    
                         
                        <input
                          type="number"
                          min="0"
                          value={productValue}
                          onChange={(event) =>
                            setProductValue(event.target.value)
                          }
                          className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-800"
                          placeholder="5000"
                        />
                                           
                      </label>
                                         
                      <label className="text-xs font-medium text-gray-600">
                                              Currency                      
                        <select
                          value={currency}
                          onChange={(event) => setCurrency(event.target.value)}
                          className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-800"
                        >
                                                 
                          <option value="INR">INR (₹)</option>                 
                                <option value="USD">USD ($)</option>           
                                      <option value="AED">AED</option>         
                                        <option value="EUR">EUR (€)</option>   
                                           
                        </select>
                                           
                      </label>
                                       
                    </div>
                                     
                    {analysisError && (
                      <p
                        role="alert"
                        className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700"
                      >
                        {analysisError}
                      </p>
                    )}
                                     
                    <div className="flex flex-wrap items-center gap-3">
                                         
                      <button
                        type="submit"
                        disabled={analysisLoading}
                        className="rounded-lg bg-[#0D9488] px-4 py-2 text-xs font-semibold text-white disabled:opacity-60"
                      >
                                             
                        {analysisLoading
                          ? "Analyzing shipment..."
                          : "Analyze Shipment"}
                                           
                      </button>
                                         
                      {assistantResult?.query_id && (
                        <span className="text-xs text-gray-500">
                          Query ID: {assistantResult.query_id}
                        </span>
                      )}
                                         
                      {assistantResult?.is_estimate && (
                        <span className="text-xs text-amber-700">
                          Includes AI estimates — verify before booking.
                        </span>
                      )}
                                       
                    </div>
                                   
                  </form>
                               
                </div>
                             
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                                 
                  <p className="text-xs font-bold text-gray-900 mb-3 flex items-center gap-2">
                                      Your Query                
                  </p>
                                 
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                                     
                    <div className="flex items-start gap-3">
                                         
                      <div className="w-9 h-9 bg-blue-50 rounded-full hidden sm:flex items-center justify-center flex-shrink-0">
                                             
                        <FiMap className="text-blue-500 text-base" />           
                               
                      </div>
                                         
                      <div className="flex-1 min-w-0">
                                             
                        <p className="text-xs font-medium text-gray-800 leading-relaxed">
                                                 
                          {assistantResult?.query?.raw || queryText}           
                                   
                        </p>
                                             
                        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-xs font-medium  text-gray-400">
                                                 
                          <span className="">
                                                      Query ID:                
                                     
                            <span className="t">
                                                                               
                                    AIQ-2025-04-24-000123                      
                                 
                            </span>
                                                   
                          </span>
                                                 
                          <span>• 24 Apr 2025, 09:25 AM</span>                 
                                <span>• User: Arjun Soni</span>                 
                             
                        </div>
                                           
                      </div>
                                                           
                    </div>
                                   
                  </div>
                               
                </div>
                             
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                                 
                  <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                                     
                    <p className="text-xs sm:text-sm  font-bold text-gray-900 flex items-center gap-2">
                                         
                      <FiStar className="text-teal-500 text-base" /> AI
                      Recommended Summary                  
                    </p>
                                     
                    <div className="flex gap-3">
                                         
                      <button
                        type="button"
                        onClick={() => setDataSource(true)}
                        className="flex items-center gap-1 text-xs text-blue-500 font-medium hover:underline"
                        aria-label={`View all ${Array.isArray(liveView?.dataSources) ? liveView.dataSources.length : 0} data sources`}
                      >
                                              <FiDatabase size={12} /> Data
                        Sources (
                        {Array.isArray(liveView?.dataSources)
                          ? liveView.dataSources.length
                          : 0}
                        )                    
                      </button>
                                       
                      <button className="flex items-center gap-1 text-xs font-medium text-gray-400">
                                              <FiAlertCircle size={12} />
                        Disclaimer                    
                      </button>
                                       
                    </div>
                                   
                  </div>
                                 
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
                                     
                    {displayedCards.map((card, i) => (
                      <div
                        key={i}
                        className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex flex-col"
                      >
                                             
                        <p className="text-xs text-[#222222] font-medium mb-1">
                                                  {card.label}                 
                             
                        </p>
                                             
                        {card.route ? (
                          <>
                                                     
                            <p className="text-[11px] font-bold text-gray-800 mb-0.5">
                                                          Route                
                                       
                            </p>
                                                     
                            <p className="text-sm font-bold text-gray-900 mb-2">
                                                          {card.route}         
                                             
                            </p>
                                                   
                          </>
                        ) : (
                          <>
                                                     
                            <p
                              className={`text-base font-bold mb-1 ${
                                card.mainColor || "text-gray-900"
                              }`}
                            >
                                                          {card.main}           
                                           
                            </p>
                                                     
                            <p className="text-xs font-medium  text-gray-500 mb-2 leading-tight">
                                                          {card.sub}           
                                           
                            </p>
                                                   
                          </>
                        )}
                                             
                        <div className="flex flex-col gap-1 flex-1">
                                                 
                          {card.rows.map(([k, v], j) => (
                            <div
                              key={j}
                              className="flex justify-between text-xs"
                            >
                                                         
                              <span className="text-gray-500 text-xs font-medium">
                                                              {k}               
                                           
                              </span>
                                                         
                              <span className="text-gray-800   text-xs font-medium">
                                                              {v}               
                                           
                              </span>
                                                       
                            </div>
                          ))}
                                                 
                          {card.freightCost && (
                            <p className="text-base font-bold text-gray-900 mt-1">
                                                          {card.freightCost}   
                                                   
                            </p>
                          )}
                                               
                        </div>
                                             
                        <button
                          type="button"
                          onClick={() => {
                            const targetTab =
                              card.label === "HS Code"
                                ? "HS Code Analysis"
                                : card.label === "Incentive"
                                  ? "Incentive Analysis"
                                  : card.label === "Freight"
                                    ? "Freight Analysis"
                                    : "Landed Cost Breakdown"; // Keep the assistant view visible, select the matching analysis tab,
                            // then scroll to Detailed AI Analysis after React has rendered it.

                            setActiveTab("AI CargoMate Assistant");

                            setAnalysisTab(targetTab);

                            setShowDetailedAnalysis(true);

                            window.setTimeout(() => {
                              document
                                .getElementById("sectionId")
                                ?.scrollIntoView({
                                  behavior: "smooth",

                                  block: "start",
                                });
                            }, 180);
                          }}
                          className="text-teal-500 text-xs font-medium text-left mt-2 hover:underline"
                        >
                                                  {card.link}                   
                           
                        </button>
                                             
                        <button
                          onClick={() => {
                            setShipment("shipment");

                            setActiveTab("");
                          }}
                          className="mt-2 w-full border border-teal-500 text-teal-500 text-xs    font-semibold py-1.5 rounded-lg hover:bg-teal-50"
                        >
                                                  Create Shipment              
                                 
                        </button>
                                           
                      </div>
                    ))}
                                   
                  </div>
                               
                </div>
                             
                {showDetailedAnalysis && (
                  <div
                    id="sectionId"
                    className="bg-white rounded-xl border border-gray-200 p-4"
                  >
                                   
                    <p className="text-sm  font-bold text-gray-900 mb-3 flex items-center gap-2">
                                       
                      <FiClipboard className="text-teal-500 text-base" />
                      Detailed AI Analysis                
                    </p>
                                   
                    <div className="flex flex-wrap gap-1 border-b border-gray-200 mb-5 sm:mb-8 pb-0">
                                       
                      {analysisTabs.map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setAnalysisTab(tab)}
                          className={`px-3 py-2 text-xs font-bold whitespace-normal text-left border-b-2 -mb-px transition-colors

                            ${
                            analysisTab === tab
                              ? "border-teal-500 text-teal-500"
                              : "border-transparent text-gray-500 hover:text-gray-700"
                          }`}
                        >
                                                {tab}                   
                        </button>
                      ))}
                                     
                    </div>
                                   
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                                       
                      <div>
                                           
                        {displayedTabContent.left.map(([k, v], i) => (
                          <div
                            key={i}
                            className="flex justify-between space-y-2 py-2 border-b border-gray-100 last:border-0 text-xs"
                          >
                                                   
                            <span className="text-gray-500  font-medium text-xs">
                                                        {k}                     
                               
                            </span>
                                                   
                            <span
                              className={`font-medium text-xs text-right max-w-[55%] ${
                                k === "Total Landed Cost" ||
                                k === "Total Incentive"
                                  ? "text-teal-600"
                                  : "text-gray-800"
                              }`}
                            >
                                                        {v}                     
                               
                            </span>
                                                 
                          </div>
                        ))}
                                         
                      </div>
                                       
                      <div className="space-y-5">
                                           
                        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                                               
                          <p className="flex items-center gap-1.5 text-sm font-bold text-emerald-800 mb-2">
                                                   
                            <FiStar size={12} className="text-emerald-500" />   
                                                AI Insight                      
                          </p>
                                               
                          <p className="text-xs font-normal text-emerald-900 leading-relaxed">
                                                   {displayedTabContent.insight}
                                                 
                          </p>
                                             
                        </div>
                                           
                        <div className="bg-[#DBDBDB] border border-gray-200 rounded-lg p-3">
                                               
                          <p className="flex items-center gap-1.5 t text-sm font-bold text-gray-700 mb-2">
                                                    <FiClipboard size={12} />   
                                                Assumptions                    
                             
                          </p>
                                               
                          <p className="text-xs font-normal text-gray-600 leading-relaxed">
                                                   
                            {displayedTabContent.assumption}                   
                             
                          </p>
                                             
                        </div>
                                           
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                                               
                          <p className="flex items-center gap-1.5 text-sm font-bold text-orange-700 mb-2">
                                                    <FiAlertCircle size={12} /> 
                                                  Disclaimer                    
                             
                          </p>
                                               
                          <p className="text-xs font-normal text-orange-800 leading-relaxed">
                                                   
                            {displayedTabContent.disclaimer}                   
                             
                          </p>
                                             
                        </div>
                                         
                      </div>
                                     
                    </div>
                                 
                  </div>
                )}
                             
              
                           
              </div>
                         
              <div className="flex flex-col gap-4">
                             
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                                 
                  <p className="text-sm sm:text-base font-bold text-gray-900 mb-3">
                                      Result Summary                
                  </p>
                                 
                  {displayedSummary.map(
                    (
                      {
                        icon: Icon,

                        label,

                        value,

                        iconColor,

                        small,

                        valueColor,
                      },

                      i,
                    ) => (
                      <div
                        key={i}
                        className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0 text-xs font-medium"
                      >
                                             
                        <div
                          className={`flex items-center text-xs font-medium gap-2 text-gray-500`}
                        >
                                                 
                          <Icon size={14} className={iconColor} /> {label}     
                                         
                        </div>
                                             
                        <span
                          className={`font-medium text-right max-w-[50%] ${
                            valueColor || "text-gray-900"
                          } ${small ? "text-xs font-medium " : "text-xs font-medium"}`}
                        >
                                                  {value}                     
                        </span>
                                           
                      </div>
                    ),
                  )}
                                 
                  <button
                    onClick={() => {
                      setShipment("shipment");

                      setActiveTab("");
                    }}
                    className="mt-3 w-full bg-[#0D9488] text-white text-sm   font-semibold py-2.5 rounded-xl"
                  >
                                      Create Shipment                
                  </button>
                         
                </div>
                             
                <DashboardAdPlacement location="User Dashboard - AI CargoMate Assistant" />
                                       
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                                 
                  <p className="text-sm  font-bold   text-gray-900 mb-3">
                                      Report Information                
                  </p>
                                 
                  {[
                    ["Report ID", "AIR-2025-04-24-000123"],

                    ["Generated On", "24 Apr 2025, 09:25 AM"],

                    ["Generated By", "Arjun Soni"],

                    ["Plan", "Pro Plan"],

                    ["AI Model Version", "v2.1.0"],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="flex justify-between py-1.5 text-[11px]"
                    >
                                         
                      <span className="text-gray-500 text-xs  font-medium">
                                              {k}                   
                      </span>
                                         
                      <span className="text-gray-800  text-xs font-medium">
                                              {v}                   
                      </span>
                                       
                    </div>
                  ))}
                                               
                </div>{" "}
                       
              </div>
                       
            </div>
                               
            {/* <div className="w-full min-w-0 mt-4 mb-2"> */}
                       
            <DashboardAdPlacement
              location="User Dashboard - AI CargoMate Assistant"
              layout="banner"
              slot="banner"
              intervalMs={5000}
            />
                     {/* </div> */}                     
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-3">
                         
              <div className="bg-white  flex flex-col justify-center gap-10 rounded-xl border border-gray-200  px-3 py-4">
                             
                <div className=" flex flex-row items-center justify-between">
                                 
                  <h3 className="text-xs  font-bold text-gray-900 ">
                                      Data Sources Used                
                  </h3>
                                 
                  <button
                    onClick={() => setDataSource(true)}
                    className=" text-teal-500 text-xs  font-medium hover:underline"
                  >
                                      View All Sources                
                  </button>
                               
                </div>
                             
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                                 
                  {Array.isArray(liveView?.dataSources) &&
                  liveView.dataSources.length > 0 ? (
                    liveView.dataSources.map((source, index) => {
                      const sourceLabel = String(source ?? "")
                        .replaceAll("_", " ")

                        .replace(/\s+/g, " ")

                        .trim();

                      return sourceLabel ? (
                        <div
                          key={`${sourceLabel}-${index}`}
                          className="flex min-w-0 items-start gap-2 text-gray-700"
                          title={sourceLabel}
                        >
                                                 
                          <FiDatabase size={14} className="mt-0.5 shrink-0" /> 
                                               
                          <span className="break-words">{sourceLabel}</span>   
                                           
                        </div>
                      ) : null;
                    })
                  ) : (
                    <p className="col-span-full text-gray-500">
                                          Run shipment analysis to see the data
                      sources returned by the API.                  
                    </p>
                  )}
                               
                </div>
                           
              </div>
                         
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                             
                <h3 className="text-xs  font-bold text-gray-900 mb-4">
                                  Connected To Live Data              
                </h3>
                             
                <p className="text-xs  text-[#64748B] leading-relaxed mb-4">
                                  All modules are connected to backend systems
                  and databases for                 real-time, accurate
                  information.              
                </p>
                             
                <div className="inline-flex items-center gap-2 px-3 py-1.5    b0">
                                 
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> 
                               
                  <span className="text-xs sm:text-sm font-medium text-emerald-700">
                                      Connected                
                  </span>
                               
                </div>
                           
              </div>
                         
              <div className="bg-white flex rounded-xl border border-gray-200 px-4">
                             
                <NeedHelp
                  mobile={"+91 22 1234 5678"}
                  para={" Our trade experts are here to help you."}
                  heading={"Need help ?"}
                />
                           
              </div>
                       
            </div>
                   
          </main>
        </div>
      )}
           
      <div className="fixed right-5 bottom-5">
                <img src={chat} />     
      </div>
           
      {shipment === "shipment" && (
        <div>
                   
          <Shipment
            setActiveTab={setActiveTab}
            setShipment={setShipment}
            currentTab={"AI CargoMate Assistant"}
            prefill={assistantResult}
          />
                 
        </div>
      )}
           
      {downloadReport && (
        <DownloadReportModal onClose={() => setDownloadReport(false)} />
      )}
                 
      {showProductDetails && (
        <ProductDetails onClose={() => setShowProductDetails(false)} />
      )}
           
      {saveReportPopup && (
        <SaveReportPopup onClose={() => setSaveReportPopup(false)} />
      )}
           
      {saveReport && <SaveReportModal onClose={() => setSaveReport(false)} />} 
         
      {shareReport && (
        <ShareReportModal onClose={() => setShareReport(false)} />
      )}
           
      {dataSource && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setDataSource(false)}
        >
                   
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="data-sources-modal-title"
            className="w-full max-w-lg rounded-xl bg-white p-5 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
                       
            <div className="mb-4 flex items-center justify-between gap-3">
                           
              <div>
                               
                <h2
                  id="data-sources-modal-title"
                  className="text-base font-bold text-gray-900"
                >
                  All Data Sources Used
                </h2>
                               
                <p className="mt-1 text-xs text-gray-500">
                  Sources returned by the shipment analysis API.
                </p>
                             
              </div>
                           
              <button
                type="button"
                onClick={() => setDataSource(false)}
                aria-label="Close data sources"
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
              >
                                <FiX size={18} />             
              </button>
                         
            </div>
                       
            <div className="max-h-[60vh] space-y-2 overflow-y-auto">
                           
              {Array.isArray(liveView?.dataSources) &&
              liveView.dataSources.length > 0 ? (
                liveView.dataSources.map((source, index) => {
                  const sourceLabel = String(source ?? "")
                    .replaceAll("_", " ")

                    .replace(/\s+/g, " ")

                    .trim();

                  return sourceLabel ? (
                    <div
                      key={`${sourceLabel}-${index}`}
                      className="flex items-start gap-3 rounded-lg border border-gray-200 p-3 text-sm text-gray-700"
                    >
                                           
                      <FiDatabase
                        size={16}
                        className="mt-0.5 shrink-0 text-teal-600"
                      />
                                           
                      <span className="break-words">{sourceLabel}</span>       
                                 
                    </div>
                  ) : null;
                })
              ) : (
                <p className="rounded-lg bg-gray-50 p-4 text-sm text-gray-500">
                  No data sources returned yet. Run shipment analysis first.
                </p>
              )}
                         
            </div>
                       
            <div className="mt-5 flex justify-end">
                           
              <button
                type="button"
                onClick={() => setDataSource(false)}
                className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
              >
                Close
              </button>
                         
            </div>
                     
          </div>
                 
        </div>
      )}
         
    </div>
  );
};

export default AiCargoMateAssistant;
