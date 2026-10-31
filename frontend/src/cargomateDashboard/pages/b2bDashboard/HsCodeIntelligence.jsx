// import React, { useState, useMemo, useEffect } from "react";
// import {
//   getDashboard,
//   getHSCodeList,
//   getHSCodeDetails,
//   getTradeFlow,
//   getTrends,
//   getTopProducts,
//   getImporters,
//   getExporters,
//   getCountries,
//   getFilterOptions
// } from '../../api/HsCodeIntelApi';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import ExportReport from "../../components/b2bComponent/ExportReport";
// import {
//   CalendarDays,
//   Download,
//   Package,
//   IndianRupee,
//   Users,
//   Truck,
//   Globe,
//   Clock3,
//   ChevronDown,
//   Sliders,
//   LayoutGrid,
//   List,
//   HelpCircle,
//   Clock,
//   MoreVertical
// } from "lucide-react";

// import {
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   XAxis,
//   Tooltip,
// } from "recharts";

// // ==========================================
// // STATIC RAW DATA (As per Image {2BE9DE08-E6B8-4112-B604-497638DB5188}.png)
// // ==========================================
// const HEADING = "text-[#07156B]";
// const tabs = [
//   "Overview",
//   "HS Code List",
//   "Trade Flow",
//   "Top Products",
//   "Countries",
//   "Importers",
//   "Exporters",
//   "Trends & Insights",
// ];

// /*const INITIAL_TOP_CODES_VALUE = [
//   { hsCode: "85", desc: "Electrical Machinery & Equipment", value: "₹ 320.45 Cr", share: "9.87%", width: "w-[9.87%]" },
//   { hsCode: "84", desc: "Machinery & Mechanical Appliances", value: "₹ 285.70 Cr", share: "8.79%", width: "w-[8.79%]" },
//   { hsCode: "84", desc: "Machinery & Mechanical Appliances", value: "₹ 285.70 Cr", share: "8.79%", width: "w-[8.79%]" },
//   { hsCode: "84", desc: "Machinery & Mechanical Appliances", value: "₹ 285.70 Cr", share: "8.79%", width: "w-[8.79%]" },
//   { hsCode: "84", desc: "Machinery & Mechanical Appliances", value: "₹ 285.70 Cr", share: "8.79%", width: "w-[8.79%]" },
// ];

// const INITIAL_CODES_GROWTH = [
//   { hsCode: "30", desc: "Pharmaceutical Products", value: "₹ 11.30 Cr", growth: "▲ 28.4%" },
//   { hsCode: "88", desc: "Aircraft, Spacecraft & Parts", value: "₹ 26.45 Cr", growth: "▲ 24.7%" },
//   { hsCode: "29", desc: "Organic Chemicals", value: "₹ 98.60 Cr", growth: "▲ 21.3%" },
//   { hsCode: "87", desc: "Vehicles other than Railway", value: "₹ 74.20 Cr", growth: "▲ 19.6%" },
//   { hsCode: "76", desc: "Aluminium & Articles", value: "₹ 42.75 Cr", growth: "▲ 18.1%" },
// ];

// const INITIAL_CODES_SHIPMENTS = [
//   { hsCode: "85", desc: "Electrical Machinery & Equipment", count: "2,145", share: "11.4%", width: "w-[11.4%]" },
//   { hsCode: "84", desc: "Machinery & Mechanical Appliances", count: "1,896", share: "10.1%", width: "w-[10.1%]" },
//   { hsCode: "39", desc: "Plastics & Articles", count: "1,256", share: "0.7%", width: "w-[7%]" },
//   { hsCode: "72", desc: "Iron & Steel", count: "1,102", share: "5.9%", width: "w-[5.9%]" },
//   { hsCode: "90", desc: "Optical, Medical & Precision Instruments", count: "987", share: "5.3%", width: "w-[5.3%]" },
// ];

// const INITIAL_TREND_DATA = [
//   { date: "01 Apr", value: 600 }, { date: "06 Apr", value: 850 }, { date: "11 Apr", value: 780 },
//   { date: "16 Apr", value: 1100 }, { date: "21 Apr", value: 1020 }, { date: "24 Apr", value: 1245 },
// ];

// const INITIAL_FLOW_DATA = [
//   { name: "Import", value: 1876.45, percent: "57.8%", color: "#10B981" },
//   { name: "Export", value: 1369.35, percent: "42.2%", color: "#2563EB" },
// ];

// const INITIAL_COUNTRY_DATA = [
//   { name: "USA", value: 512.35, percent: "27.3%", color: "#2563EB" },
//   { name: "UAE", value: 302.80, percent: "16.1%", color: "#10B981" },
//   { name: "China", value: 268.40, percent: "14.3%", color: "#8B5CF6" },
//   { name: "Germany", value: 208.40, percent: "10.3%", color: "#F59E0B" },
//   { name: "Bangladesh", value: 268.40, percent: "14.3%", color: "#6366F1" },
//   { name: "Netherland", value: 268.40, percent: "14.3%", color: "#94A3B8" },
//   { name: "Other", value: 268.40, percent: "14.3%", color: "#EC4899" },
// ];

// const INITIAL_DETAILS_TABLE = [
//   { hsCode: "85", desc: "Electrical Machinery & Equipment", heading: "Chapter 85 / Heading 8501-8548", flow: "Import", value: "₹ 320.45 Cr", shipments: "2,145", avgValue: "₹ 14.93 L", country: "China", growth: "▲ 14.6%", isUp: true },
//   { hsCode: "84", desc: "Machinery & Mechanical Appliances", heading: "Chapter 84 / Heading 8401-8466", flow: "Import", value: "₹ 285.70 Cr", shipments: "1,896", avgValue: "₹ 15.08 L", country: "Germany", growth: "▲ 12.2%", isUp: true },
//   { hsCode: "90", desc: "Optical, Medical & Precision Instruments", heading: "Chapter 90 / Heading 9001-9033", flow: "Import", value: "₹ 168.20 Cr", shipments: "1,256", avgValue: "₹ 13.41 L", country: "USA", growth: "▲ 10.5%", isUp: true },
//   { hsCode: "39", desc: "Plastics & Articles", heading: "Chapter 39 / Heading 3901-3926", flow: "Import", value: "₹ 125.35 Cr", shipments: "1,102", avgValue: "₹ 11.37 L", country: "UAE", growth: "▲ 9.8%", isUp: true },
//   { hsCode: "72", desc: "Iron & Steel", heading: "Chapter 72 / Heading 7201-7229", flow: "Export", value: "₹ 98.60 Cr", shipments: "987", avgValue: "₹ 9.99 L", country: "India", growth: "▲ 8.7%", isUp: true },
// ];*/

// export default function HSCodeIntelligence() {

//   const [dashboard, setDashboard] = useState({});
//   const [hsCodeList, setHSCodeList] = useState([]);
//   const [hsCodeDetails, setHSCodeDetails] = useState([]);
//   const [tradeFlow, setTradeFlow] = useState({});
//   const [trendData, setTrendData] = useState([]);
//   const [topProducts, setTopProducts] = useState([]);
//   const [importers, setImporters] = useState([]);
//   const [showAllImporters, setShowAllImporters] = useState(false);
//   const [exporters, setExporters] = useState([]);
//   const [countries, setCountries] = useState([]);
//   const [filterOptions, setFilterOptions] = useState({});
//    const [shipmentStartDate, setShipmentStartDate] = useState(null);
//     const [shipmentEndDate, setShipmentEndDate] = useState(null);
//      const [dateRange, setDateRange] = useState(false)
//      const [exportReport, setExportReport] = useState(false)
//   // ==========================================
//   // 2. STATE MANAGEMENT
//   // ==========================================
//   const [activeTab, setActiveTab] = useState("Overview");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedChapter, setSelectedChapter] = useState("All Chapter");
//   const [selectedHeading, setSelectedHeading] = useState("All headings");
//   const [selectedSubHeading, setSelectedSubHeading] = useState("All Sub-headings");
//   const [selectedCountry, setSelectedCountry] = useState("All Countries");
//   const [selectedFlow, setSelectedFlow] = useState("All Flow");

//   const fetchDashboard = async () => {
//   try {
//     const res = await getDashboard();
//     setDashboard(res.data.data || {});
//   } catch (err) {
//     console.error(err);
//   }
// };

// const fetchHSCodeList = async () => {
//   try {
//     const res = await getHSCodeList();
//     setHSCodeList(res.data.data || []);
//   } catch (err) {
//     console.error(err);
//   }
// };

// const fetchHSCodeDetails = async () => {
//   try {
//     const res = await getHSCodeDetails();
//     setHSCodeDetails(res.data.data || []);
//   } catch (err) {
//     console.error(err);
//   }
// };

// const fetchTradeFlow = async () => {
//   try {
//     const res = await getTradeFlow();
//     setTradeFlow(res.data.data || {});
//   } catch (err) {
//     console.error(err);
//   }
// };

// const fetchTrendData = async () => {
//   try {
//     const res = await getTrends();
//     setTrendData(res.data.data || []);
//   } catch (err) {
//     console.error(err);
//   }
// };

// const fetchTopProducts = async () => {
//   try {
//     const res = await getTopProducts();
//     setTopProducts(res.data.data || []);
//   } catch (err) {
//     console.error(err);
//   }
// };

// const fetchImporters = async () => {
//   try {
//     const res = await getImporters();
//     setImporters(res.data.data || []);
//   } catch (err) {
//     console.error(err);
//   }
// };

// const fetchExporters = async () => {
//   try {
//     const res = await getExporters();
//     setExporters(res.data.data || []);
//   } catch (err) {
//     console.error(err);
//   }
// };

// const fetchCountries = async () => {
//   try {
//     const res = await getCountries();
//     setCountries(res.data.data || []);
//   } catch (err) {
//     console.error(err);
//   }
// };

// const fetchFilterOptions = async () => {
//   try {
//     const res = await getFilterOptions();
//     setFilterOptions(res.data.data || {});
//   } catch (err) {
//     console.error(err);
//   }
// };
//  useEffect(() => {
//    fetchDashboard();
//    fetchHSCodeList();
//    fetchHSCodeDetails();
//    fetchTradeFlow();
//    fetchTrendData();
//    fetchTopProducts();
//    fetchImporters();
//    fetchExporters();
//    fetchCountries();
//    fetchFilterOptions();
//   }, []);
//   // Applied filter state
//   const [filters, setFilters] = useState({
//     search: "", chapter: "All Chapter", heading: "All headings", subheading: "All Sub-headings", country: "All Countries", flow: "All Flow"
//   });

//   const handleApply = () => {
//     setFilters({
//       search: searchQuery, chapter: selectedChapter, heading: selectedHeading, subheading: selectedSubHeading, country: selectedCountry, flow: selectedFlow
//     });
//   };

//   const handleReset = () => {
//     setSearchQuery(""); setSelectedChapter("All Chapter"); setSelectedHeading("All headings");
//     setSelectedSubHeading("All Sub-headings"); setSelectedCountry("All Countries"); setSelectedFlow("All Flow");
//     setFilters({ search: "", chapter: "All Chapter", heading: "All headings", country: "All Countries", flow: "All Flow" });
//   };

//   const stats = [
//    { title: "Total Export Shipments", value: dashboard.totalShipments || 0, change: "", icon: Package, color: "text-blue-500", bg: "bg-blue-50", isUp: true },
//    { title: "Total Export Value (INR)", value: `₹${((dashboard.totalTradeValue || 0) / 10000000).toFixed(2)} Cr`, change: "", icon: IndianRupee, color: "text-green-500", bg: "bg-green-50", isUp: true },
//   { title: "Total Exporters", value: dashboard.totalExporters || 0, change: "", icon: Users, color: "text-cyan-500", bg: "bg-cyan-50", isUp: true },

//    { title: "Countries of Origin", value: dashboard.countries || 0, change: "", icon: Globe, color: "text-purple-500", bg: "bg-purple-50", isUp: true },
//    { title: "Avg. Shipment Value (INR)", value: `₹${((dashboard.avgShipmentValue || 0) / 100000).toFixed(2)} L`, change: "", icon: IndianRupee, color: "text-orange-500", bg: "bg-orange-50", isUp: false },
//     ];
//   // ==========================================
//   // 3. DYNAMIC FILTERING LOGIC
//   // ==========================================
//   const filteredTableData = useMemo(() => {
//   return hsCodeDetails.filter((item) => {
//     const matchSearch =
//       item.description?.toLowerCase().includes(filters.search.toLowerCase()) ||
//       item.hsCode?.includes(filters.search);

//     const matchChapter =
//       filters.chapter === "All Chapter" ||
//       item.chapter === filters.chapter.replace("Chapter ", "");

//     const matchCountry =
//       filters.country === "All Countries" ||
//       item.topCountry === filters.country;

//     const matchFlow =
//       filters.flow === "All Flow" ||
//       item.flow === filters.flow;

//     return matchSearch && matchChapter && matchCountry && matchFlow;
//   });
// }, [hsCodeDetails, filters]);

//   return (
//     <div className="overflow-y-auto bg-[#f8fafc] p-5  text-slate-600 antialiased flex flex-col justify-between pt-14">

//       {/* TOP HEADER */}
//       <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-5">
//         <div>
//           <h1 className="text-2xl font-bold text-[#1e293b]">HS Code Intelligence</h1>
//           <p className="text-xs text-slate-400 mt-0.5">Explore detailed global shipment records with advanced search and filters.</p>
//         </div>
//         <div className="flex gap-3">
//                 <div className="relative">
//                      <DatePicker
//                        selected={shipmentStartDate}
//                        onChange={(dates) => {
//                          const [start, end] = dates;
//                          setShipmentStartDate(start);
//                          setShipmentEndDate(end);
//                        }}
//                        startDate={shipmentStartDate}
//                        endDate={shipmentEndDate}
//                        selectsRange
//                        dateFormat="dd MMM yyyy"
//                        placeholderText="01 Apr 2025 - 24 Apr 2025"
//                        className={`bg-white border border-slate-200 text-[11px] sm:text-xs font-semibold pl-3 pr-9 py-2 rounded-xl shadow-xs hover:bg-slate-50 transition whitespace-nowrap outline-none cursor-pointer ${HEADING}`}
//                      />
//                      <CalendarDays
//                        size={14}
//                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
//                      />
//                    </div>
//                    <button onClick={() => setExportReport(true)} className={`flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-slate-200 text-[11px] sm:text-xs font-semibold px-3 sm:px-4 py-2 rounded-xl shadow-xs hover:bg-slate-50 transition whitespace-nowrap ${HEADING}`}>
//                      <Download size={14} className="text-slate-400" />
//                      Export Report
//                    </button></div>
//       </div>

//       {/* METRICS METERS ROW */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-3 mb-5">
//         {stats.map((stat, i) => {
//           const Icon = stat.icon;
//           return (
//             <div key={i} className="bg-white border border-slate-100 p-3.5 rounded-2xl shadow-sm flex flex-col justify-between">
//               <div className="flex justify-between items-start">
//                 <span className="text-[13px] font-semibold text-slate-600 leading-tight block max-w-[100%]  tracking-tight">{stat.title}</span>
//                 <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${stat.bg} ${stat.color}`}><Icon size={14} /></div>
//               </div>
//               <div className="mt-2.5">
//                 <h4 className="text-base font-bold text-slate-800 tracking-tight">{stat.value}</h4>
//                 <span className={`text-[9px] font-bold block mt-0.5 ${stat.isUp ? "text-green-500" : "text-red-500"}`}>{stat.change}</span>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* SEARCH AND FILTERS PANEL */}
//       <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm mb-5">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-3 items-end">
//           <div>
//             <label className="text-[10px] text-slate-400 font-bold block mb-1 uppercase">HS Code / Product</label>
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search HS Code or Product"
//               className="w-full bg-slate-50/60 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-blue-500"
//             />
//           </div>
//           {/*<div>
//             <label className="text-[10px] text-slate-400 font-bold block mb-1 uppercase">Chapter</label>
//             <div className="relative">
//               <select value={selectedChapter} onChange={(e) => setSelectedChapter(e.target.value)} className="w-full bg-slate-50/60 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none focus:border-blue-500">
//                 <option value="All Chapter">All Chapter</option>
//                 {filterOptions.chapters?.map((chapter) => (
//                   <option key={chapter} value={chapter}>{chapter}</option>
//                 ))}
//               </select>
//               <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
//             </div>
//           </div>
//           <div>
//             <label className="text-[10px] text-slate-400 font-bold block mb-1 uppercase">Heading</label>
//             <div className="relative">
//               <select value={selectedHeading} onChange={(e) => setSelectedHeading(e.target.value)} className="w-full bg-slate-50/60 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none focus:border-blue-500">
//                 <option value="All headings">All headings</option>
//                 {filterOptions.headings?.map((heading) => (
//                   <option key={heading} value={heading}>{heading}</option>
//                 ))}
//               </select>
//               <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
//             </div>
//           </div>
//           <div>
//             <label className="text-[10px] text-slate-400 font-bold block mb-1 uppercase">Sub-heading</label>
//             <div className="relative">
//               <select value={selectedSubHeading} onChange={(e) => setSelectedSubHeading(e.target.value)} className="w-full bg-slate-50/60 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none focus:border-blue-500">
//                 <option value="All Sub-headings">All Sub-headings</option>
//                 {filterOptions.subHeadings?.map((sub) => (
//                   <option key={sub} value={sub}>{sub}</option>
//                 ))}
//               </select>
//               <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
//             </div>
//           </div>*/}
//           <div>
//             <label className="text-[10px] text-slate-400 font-bold block mb-1 uppercase">Country</label>
//             <div className="relative">
//               <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} className="w-full bg-slate-50/60 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none focus:border-blue-500">
//                 <option value="All Countries">All Countries</option>
//                 {filterOptions.countries?.map((country) => (
//                   <option key={country} value={country}>{country}</option>
//                 ))}
//               </select>
//               <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
//             </div>
//           </div>
//           <div>
//             <label className="text-[10px] text-slate-400 font-bold block mb-1 uppercase">Flow</label>
//             <div className="relative">
//               <select value={selectedFlow} onChange={(e) => setSelectedFlow(e.target.value)} className="w-full bg-slate-50/60 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none focus:border-blue-500">
//                 <option value="All Flow">All Flow</option>
//                 {filterOptions.flows?.map((flow) => (
//                   <option key={flow} value={flow}>{flow}</option>
//                 ))}
//               </select>
//               <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
//             </div>
//           </div>

//           <div className="flex gap-2 w-full">
//             <button onClick={handleApply} className="flex-1 bg-blue-600  whitespace-nowrap hover:bg-blue-700 text-white font-medium text-xs rounded-xl py-2 transition shadow-sm">Search</button>
//             <button onClick={handleReset} className="text-slate-400 hover:text-slate-600 text-xs font-semibold px-2 border border-slate-200 rounded-xl bg-white">Reset</button>
//           </div>
//         </div>
//       </div>

//       {/* CORE CHARTS QUAD GRID */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">

//         {/* PANEL 1: TOP HS CODES BY TRADE VALUE */}
//         <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
//           <div>
//             <div className="flex justify-between items-center mb-3">
//               <h3 className="font-bold text-xs text-slate-800">Top HS Codes by Trade Value</h3>
//               {/*<button className="text-blue-600 text-[11px] font-bold">View All</button>*/}
//             </div>
//             <div className="space-y-3">
//               {hsCodeList.map((item, idx) => (
//                 <div key={idx} className="text-[11px]">
//                   <div className="flex justify-between text-slate-700 font-medium mb-1 gap-2">
//                     <span className="text-emerald-600 font-bold shrink-0">• {item.hsCode}</span>
//                     <span className="truncate flex-1 text-slate-500">{item.description}</span>
//                     <span className="font-bold text-slate-800 shrink-0"> ₹ {(item.tradeValue / 10000000).toFixed(2)} Cr</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
//                       <div className="bg-teal-500 h-full" style={{width: `${Math.min(Number(item.share), 100)}%`,}} />
//                     </div>
//                     <span className="text-[9px] font-bold text-slate-400 w-8 text-right">{item.share}%</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//           {/* <button className="text-blue-600 text-xs font-bold text-center mt-3 pt-2 border-t border-slate-50">View All HS Codes →</button> */}
//         </div>

//         {/* PANEL 2: TRADE VALUE TREND */}
//         <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
//           <div>
//             <div className="flex justify-between items-center mb-1">
//               <h3 className="font-bold text-xs text-slate-800">Trade Value Trend (INR)</h3>
//               <span className="text-[9px] text-slate-400 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded font-medium">This Month</span>
//             </div>
//             <div className="mb-3">
//               <span className="text-lg font-bold text-slate-800"> ₹{(trendData.reduce((sum, item) => sum + item.tradeValue, 0) /10000000).toFixed(2)}{" "}Cr</span>
//               <span className="text-[10px] text-green-500 font-semibold ml-2">▲ 17.6% vs last month</span>
//             </div>
//             <div className="h-[120px] w-full">
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={trendData.map(item => ({date: new Date(item._id + "-01").toLocaleString("en-IN", {month: "short",year: "2-digit",}),
//                  value: Number((item.tradeValue / 10000000).toFixed(2)), shipments: item.shipments,}))}>
//                   <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 9 }} tickLine={false} axisLine={false} />
//                   <Tooltip formatter={(value) => [`₹${value} Cr`, "Trade Value"]}/>
//                   <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2} dot={{ fill: '#10B981', r: 2.5 }} />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//           <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-50 text-center">
//             <div className="bg-slate-50/60 p-1.5 rounded-xl border border-slate-100">
//               <span className="text-[9px] text-slate-400 block font-medium">Export Value (INR)</span>
//               <span className="text-xs font-bold text-slate-700">₹{(trendData.reduce((sum, item) => sum + item.tradeValue, 0) /10000000).toFixed(2)}{" "}Cr</span>
//             </div>
//             <div className="bg-slate-50/60 p-1.5 rounded-xl border border-slate-100">
//               <span className="text-[9px] text-slate-400 block font-medium">Export Shipments</span>
//               <span className="text-xs font-bold text-slate-700"> {trendData.reduce((sum, item) => sum + item.shipments, 0)}</span>
//             </div>
//           </div>
//         </div>

//         {/* PANEL 3: TRADE VALUE BY FLOW */}
//         <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
//           <div>
//             <h3 className="font-bold text-xs text-slate-800 mb-3">Trade Value by Flow</h3>
//             <div className="flex items-center justify-around gap-2 h-[150px]">
//               <div className="relative w-[110px] h-[110px] shrink-0">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <PieChart>
//                     <Pie data={[{name: "Import", value: tradeFlow.import || 0, color: "#10B981",},
//                                 {name: "Export", value: tradeFlow.export || 0, color: "#2563EB",},
//                               ]} innerRadius={38} outerRadius={50} dataKey="value" stroke="none">
//                       {[{ color: "#10B981" },{ color: "#2563EB" },].map((item, index) => <Cell key={index} fill={item.color} />)}
//                     </Pie>
//                   </PieChart>
//                 </ResponsiveContainer>
//                 <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
//                   <span className="text-[8px] text-slate-400 font-bold uppercase">Total Value</span>
//                   <span className="font-bold text-[10px] text-slate-800 leading-none mt-0.5">₹{(((tradeFlow.import || 0) + (tradeFlow.export || 0)) /10000000).toFixed(2)}{" "}Cr</span>
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 {[{name: "Import", value: tradeFlow.import || 0, percent:(((tradeFlow.import || 0) / ((tradeFlow.import || 0) + (tradeFlow.export || 1))) *100).toFixed(1) + "%",color: "#10B981",},
//                   {name: "Export", value: tradeFlow.export || 0,percent:(((tradeFlow.export || 0) / ((tradeFlow.import || 0) + (tradeFlow.export || 1))) * 100).toFixed(1) + "%",color: "#2563EB",},
//                  ].map((flow, i) => (
//                   <div key={i} className="flex items-center gap-4 text-[11px]">
//                     <div className="flex items-center gap-1.5 font-bold">
//                       <div className="w-2 h-2 rounded-full" style={{ backgroundColor: flow.color }} />
//                       <span className="text-slate-700">{flow.name}</span>
//                     </div>
//                     <span className="text-slate-500 font-semibold">₹{(flow.value / 10000000).toFixed(2)} Cr ({flow.percent})</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* DOUBLE GRAPH SLOT LAYER */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
//         {/* Top HS Codes by Growth */}
// <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
//   <div className="flex justify-between items-center mb-3">
//     <h3 className="font-bold text-xs text-slate-800">
//       Top HS Codes by Growth{" "}
//       <span className="text-[10px] text-slate-400 font-normal">
//         (vs last month)
//       </span>
//     </h3>

//     {importers.length > 5 && (
//       <button
//         onClick={() => setShowAllImporters(true)}
//         className="text-blue-600 hover:text-blue-700 text-[11px] font-bold"
//       >
//         View All
//       </button>
//     )}
//   </div>

//   <div className="divide-y divide-slate-50">
//     {importers.slice(0, 5).map((item, i) => (
//       <div
//         key={item._id || i}
//         className="flex justify-between items-center py-2 text-[11px]"
//       >
//         <div>
//           <div className="flex items-center gap-2">
//             <span className="font-bold text-slate-700">
//               {item.importer || "-"}
//             </span>
//           </div>
//         </div>

//         <div className="text-right flex items-center gap-4">
//           <span className="font-semibold text-slate-500">
//             ₹ {((item.tradeValue || 0) / 10000000).toFixed(2)} Cr
//           </span>

//           <span className="text-green-500 font-bold w-12">
//             {item.shipments || 0} Shipments
//           </span>
//         </div>
//       </div>
//     ))}
//   </div>
// </div>
//         {/* Top HS Codes by Shipments */}
//         <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
//           <div className="flex justify-between items-center mb-3">
//             <h3 className="font-bold text-xs text-slate-800">Top HS Codes by Shipments</h3>
//            {/* <button className="text-blue-600 text-[11px] font-bold">View All</button>*/}
//           </div>
//           <div className="space-y-2.5">
//             {topProducts.map((item, i) => (
//               <div key={i} className="text-[11px]">
//                 <div className="flex justify-between text-slate-600 font-medium mb-1">
//                   <div className="flex items-center gap-2"><span className="font-bold text-slate-700">{item.hsCode}</span><span className="truncate max-w-[160px]">{item.description}</span></div>
//                   <span className="font-bold text-slate-800">{item.shipments}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
//                     <div className="bg-blue-600 h-full" style={{ width: `${item.share}%` }} />
//                   </div>
//                   <span className="text-[9px] font-bold text-slate-400 w-8 text-right">{item.share}%</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Trade Value by Top Countries */}
//         <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
//           <div>
//             <div className="flex justify-between items-center mb-2">
//               <h3 className="font-bold text-xs text-slate-800">Trade Value by Top Countries</h3>
//               {/*<button className="text-blue-600 text-[11px] font-bold">View All</button>*/}
//             </div>
//             <div className="flex items-center justify-between gap-2 h-[140px]">
//               <div className="relative w-[100px] h-[100px] shrink-0">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <PieChart>
//                     <Pie data={countries} innerRadius={32} outerRadius={45} dataKey="tradeValue" nameKey="_id" stroke="none">
//                       {countries.map((item, index) => <Cell key={index} fill={["#2563EB", "#10B981", "#8B5CF6", "#F59E0B", "#6366F1", "#94A3B8", "#EC4899"][index % 7]} />)}
//                     </Pie>
//                   </PieChart>
//                 </ResponsiveContainer>
//                 <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
//                   <span className="text-[7px] uppercase text-slate-400 font-bold">Total Value</span>
//                   <span className="font-bold text-[9px] text-slate-800 leading-none">₹{(countries.reduce((sum, item) => sum + item.tradeValue, 0) / 10000000).toFixed(2)} Cr</span>
//                 </div>
//               </div>
//               <div className="flex-1 space-y-1 pl-1 max-h-[130px] overflow-y-auto scrollbar-none">
//                 {countries.map((country, idx) => (
//                   <div key={idx} className="flex items-center justify-between text-[10px]">
//                     <div className="flex items-center gap-1 truncate">
//                       <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor:  ["#2563EB","#10B981","#8B5CF6","#F59E0B","#6366F1","#94A3B8","#EC4899",][idx % 7], }} />
//                       <span className="text-slate-600 font-semibold truncate">{country._id}</span>
//                     </div>
//                     <span className="text-slate-500 font-bold ml-1"> ₹{(country.tradeValue / 10000000).toFixed(2)} Cr ({((country.tradeValue / countries.reduce((sum, item) => sum + item.tradeValue, 0)) * 100).toFixed(1)}%)</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* DYNAMIC METADATA GRID DATA TABLE
//       <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm ">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
//           <h3 className="font-bold text-sm text-slate-800">HS Code Details</h3>
//           <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
//             <button className="flex items-center gap-1.5 bg-white border border-slate-200 text-xs font-bold py-1.5 px-3 rounded-xl text-slate-700 shadow-sm">
//               <Sliders size={13} className="text-slate-400" /> Customize Columns
//             </button>
//             <div className="flex items-center border border-slate-200 rounded-xl bg-white p-0.5 shadow-sm">
//               <button className="p-1 text-slate-400 hover:text-slate-600"><LayoutGrid size={14} /></button>
//               <button className="p-1 bg-slate-100 rounded-lg text-blue-600"><List size={14} /></button>
//             </div>
//             <div className="relative">
//               <select className="bg-white border border-slate-200 rounded-xl py-1.5 pl-3 pr-7 text-xs font-bold text-slate-700 appearance-none shadow-sm focus:outline-none">
//                 <option>50 per page</option>
//               </select>
//               <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
//             </div>
//           </div>
//         </div>

//         <div className="overflow-x-auto -mx-4">
//           <div className="inline-block min-w-full align-middle px-4">
//             <table className="min-w-full divide-y divide-slate-100 text-xs text-left">
//               <thead>
//                 <tr className="text-slate-400 font-semibold border-b border-slate-100">
//                   <th className="pb-3 font-medium">HS Code</th>
//                   <th className="pb-3 font-medium">Description</th>
//                   <th className="pb-3 font-medium">Chapter / Heading</th>
//                   <th className="pb-3 font-medium">Flow</th>
//                   <th className="pb-3 font-medium">Trade Value (INR)</th>
//                   <th className="pb-3 font-medium">Shipments</th>
//                   <th className="pb-3 font-medium">Avg. Shipment Value (INR)</th>
//                   <th className="pb-3 font-medium">Top Country</th>
//                   <th className="pb-3 font-medium">Growth (vs last month)</th>
//                   <th className="pb-3 font-medium text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-50 text-slate-600 font-medium">
//                 {filteredTableData.length > 0 ? (
//                   filteredTableData.map((row, idx) => (
//                     <tr key={idx} className="hover:bg-slate-50/60 transition">
//                       <td className="py-3 text-slate-800 font-bold">{row.hsCode}</td>
//                       <td className="py-3 font-bold text-slate-700 max-w-[200px] truncate">{row.description}</td>
//                       <td className="py-3 text-slate-400 font-semibold">Chapter {row.chapter} / {row.heading}</td>
//                       <td className="py-3 text-slate-500">{row.flow}</td>
//                       <td className="py-3 font-bold text-slate-800">₹ {(row.tradeValue / 10000000).toFixed(2)} Cr</td>
//                       <td className="py-3 text-slate-500">{row.shipments}</td>
//                       <td className="py-3 text-slate-500">₹ {(row.avgShipmentValue / 100000).toFixed(2)} L</td>
//                       <td className="py-3 text-slate-700 font-semibold">{row.topCountry}</td>
//                       <td className="py-3 text-green-500 font-bold">-</td>
//                       <td className="py-3 text-center text-slate-400 cursor-pointer hover:text-slate-600"><MoreVertical size={14} className="mx-auto" /></td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="10" className="py-8 text-center text-slate-400 font-bold">
//                       No matching HS Code records found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>*/}

//       {/* FOOTER METADATA TIMESTAMP */}
//       <div className="mt-5 pt-3 border-t border-slate-200/60 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-2">
//         <div className="flex items-center gap-1.5">
//           <Clock size={13} className="text-slate-300" />
//           <span>All data is updated daily. Last updated on 24 Apr 2025, 09:30 AM</span>
//         </div>
//         <div className="flex items-center gap-1 cursor-pointer hover:text-slate-500">
//           <HelpCircle size={13} className="text-slate-300" />
//           <span>Help Center</span>
//         </div>
//       </div>

//         {exportReport && (
//                          <ExportReport onClose={() => setExportReport(false)} />
//                        )}

//         {showAllImporters && (
//   <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4">
//     <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl max-h-[85vh] flex flex-col">

//       {/* Modal Header */}
//       <div className="flex items-center justify-between p-5 border-b border-slate-100">
//         <div>
//           <h2 className="text-lg font-bold text-slate-800">
//             Top HS Codes by Growth
//           </h2>

//           <p className="text-xs text-slate-400 mt-1">
//             All importers and shipment details
//           </p>
//         </div>

//         <button
//           onClick={() => setShowAllImporters(false)}
//           className="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 text-xl"
//         >
//           ×
//         </button>
//       </div>

//       {/* Modal Content */}
//       <div className="overflow-y-auto p-5">
//         <div className="divide-y divide-slate-100">
//           {importers.map((item, i) => (
//             <div
//               key={item._id || i}
//               className="flex justify-between items-center py-4"
//             >
//               <div>
//                 <p className="text-sm font-bold text-slate-700">
//                   {item.importer || "-"}
//                 </p>
//               </div>

//               <div className="text-right flex items-center gap-6">
//                 <span className="text-sm font-semibold text-slate-500">
//                   ₹ {((item.tradeValue || 0) / 10000000).toFixed(2)} Cr
//                 </span>

//                 <span className="text-green-500 font-bold text-sm w-20">
//                   {item.shipments || 0} Shipments
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>

//         {importers.length === 0 && (
//           <div className="py-10 text-center text-sm text-slate-400">
//             No data available
//           </div>
//         )}
//       </div>

//       {/* Modal Footer */}
//       <div className="p-4 border-t border-slate-100 flex justify-end">
//         <button
//           onClick={() => setShowAllImporters(false)}
//           className="px-5 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   </div>
// )}
//     </div>
//   );
// }
import React, { useState, useMemo, useEffect } from "react";
import { getHsCodeIntelligence } from "../../api/CargoMateApi";
import {
  getDashboard,
  getHSCodeList,
  getHSCodeDetails,
  getTradeFlow,
  getTrends,
  getTopProducts,
  getImporters,
  getExporters,
  getCountries,
  getFilterOptions,
} from "../../api/HsCodeIntelApi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ExportReport from "../../components/b2bComponent/ExportReport";
import {
  CalendarDays,
  Download,
  Package,
  IndianRupee,
  Users,
  Truck,
  Globe,
  Clock3,
  ChevronDown,
  Sliders,
  LayoutGrid,
  List,
  HelpCircle,
  Clock,
  MoreVertical,
} from "lucide-react";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
} from "recharts";

// ==========================================
// STATIC RAW DATA (As per Image {2BE9DE08-E6B8-4112-B604-497638DB5188}.png)
// ==========================================
const HEADING = "text-[#07156B]";
const tabs = [
  "Overview",
  "HS Code List",
  "Trade Flow",
  "Top Products",
  "Countries",
  "Importers",
  "Exporters",
  "Trends & Insights",
];

/*const INITIAL_TOP_CODES_VALUE = [
  { hsCode: "85", desc: "Electrical Machinery & Equipment", value: "₹ 320.45 Cr", share: "9.87%", width: "w-[9.87%]" },
  { hsCode: "84", desc: "Machinery & Mechanical Appliances", value: "₹ 285.70 Cr", share: "8.79%", width: "w-[8.79%]" },
  { hsCode: "84", desc: "Machinery & Mechanical Appliances", value: "₹ 285.70 Cr", share: "8.79%", width: "w-[8.79%]" },
  { hsCode: "84", desc: "Machinery & Mechanical Appliances", value: "₹ 285.70 Cr", share: "8.79%", width: "w-[8.79%]" },
  { hsCode: "84", desc: "Machinery & Mechanical Appliances", value: "₹ 285.70 Cr", share: "8.79%", width: "w-[8.79%]" },
];

const INITIAL_CODES_GROWTH = [
  { hsCode: "30", desc: "Pharmaceutical Products", value: "₹ 11.30 Cr", growth: "▲ 28.4%" },
  { hsCode: "88", desc: "Aircraft, Spacecraft & Parts", value: "₹ 26.45 Cr", growth: "▲ 24.7%" },
  { hsCode: "29", desc: "Organic Chemicals", value: "₹ 98.60 Cr", growth: "▲ 21.3%" },
  { hsCode: "87", desc: "Vehicles other than Railway", value: "₹ 74.20 Cr", growth: "▲ 19.6%" },
  { hsCode: "76", desc: "Aluminium & Articles", value: "₹ 42.75 Cr", growth: "▲ 18.1%" },
];

const INITIAL_CODES_SHIPMENTS = [
  { hsCode: "85", desc: "Electrical Machinery & Equipment", count: "2,145", share: "11.4%", width: "w-[11.4%]" },
  { hsCode: "84", desc: "Machinery & Mechanical Appliances", count: "1,896", share: "10.1%", width: "w-[10.1%]" },
  { hsCode: "39", desc: "Plastics & Articles", count: "1,256", share: "0.7%", width: "w-[7%]" },
  { hsCode: "72", desc: "Iron & Steel", count: "1,102", share: "5.9%", width: "w-[5.9%]" },
  { hsCode: "90", desc: "Optical, Medical & Precision Instruments", count: "987", share: "5.3%", width: "w-[5.3%]" },
];

const INITIAL_TREND_DATA = [
  { date: "01 Apr", value: 600 }, { date: "06 Apr", value: 850 }, { date: "11 Apr", value: 780 },
  { date: "16 Apr", value: 1100 }, { date: "21 Apr", value: 1020 }, { date: "24 Apr", value: 1245 },
];

const INITIAL_FLOW_DATA = [
  { name: "Import", value: 1876.45, percent: "57.8%", color: "#10B981" },
  { name: "Export", value: 1369.35, percent: "42.2%", color: "#2563EB" },
];

const INITIAL_COUNTRY_DATA = [
  { name: "USA", value: 512.35, percent: "27.3%", color: "#2563EB" },
  { name: "UAE", value: 302.80, percent: "16.1%", color: "#10B981" },
  { name: "China", value: 268.40, percent: "14.3%", color: "#8B5CF6" },
  { name: "Germany", value: 208.40, percent: "10.3%", color: "#F59E0B" },
  { name: "Bangladesh", value: 268.40, percent: "14.3%", color: "#6366F1" },
  { name: "Netherland", value: 268.40, percent: "14.3%", color: "#94A3B8" },
  { name: "Other", value: 268.40, percent: "14.3%", color: "#EC4899" },
];

const INITIAL_DETAILS_TABLE = [
  { hsCode: "85", desc: "Electrical Machinery & Equipment", heading: "Chapter 85 / Heading 8501-8548", flow: "Import", value: "₹ 320.45 Cr", shipments: "2,145", avgValue: "₹ 14.93 L", country: "China", growth: "▲ 14.6%", isUp: true },
  { hsCode: "84", desc: "Machinery & Mechanical Appliances", heading: "Chapter 84 / Heading 8401-8466", flow: "Import", value: "₹ 285.70 Cr", shipments: "1,896", avgValue: "₹ 15.08 L", country: "Germany", growth: "▲ 12.2%", isUp: true },
  { hsCode: "90", desc: "Optical, Medical & Precision Instruments", heading: "Chapter 90 / Heading 9001-9033", flow: "Import", value: "₹ 168.20 Cr", shipments: "1,256", avgValue: "₹ 13.41 L", country: "USA", growth: "▲ 10.5%", isUp: true },
  { hsCode: "39", desc: "Plastics & Articles", heading: "Chapter 39 / Heading 3901-3926", flow: "Import", value: "₹ 125.35 Cr", shipments: "1,102", avgValue: "₹ 11.37 L", country: "UAE", growth: "▲ 9.8%", isUp: true },
  { hsCode: "72", desc: "Iron & Steel", heading: "Chapter 72 / Heading 7201-7229", flow: "Export", value: "₹ 98.60 Cr", shipments: "987", avgValue: "₹ 9.99 L", country: "India", growth: "▲ 8.7%", isUp: true },
];*/

export default function HSCodeIntelligence() {
  const [dashboard, setDashboard] = useState({});
  const [hsCodeList, setHSCodeList] = useState([]);
  const [hsCodeDetails, setHSCodeDetails] = useState([]);
  const [tradeFlow, setTradeFlow] = useState({});
  const [trendData, setTrendData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [importers, setImporters] = useState([]);
  const [showAllImporters, setShowAllImporters] = useState(false);
  const [exporters, setExporters] = useState([]);
  const [countries, setCountries] = useState([]);
  const [filterOptions, setFilterOptions] = useState({});
  const [shipmentStartDate, setShipmentStartDate] = useState(null);
  const [shipmentEndDate, setShipmentEndDate] = useState(null);
  const [dateRange, setDateRange] = useState(false);
  const [exportReport, setExportReport] = useState(false);
  const [hsIntelResult, setHsIntelResult] = useState(null);
  const [hsIntelLoading, setHsIntelLoading] = useState(false);
  const [hsIntelError, setHsIntelError] = useState("");
  // ==========================================
  // 2. STATE MANAGEMENT
  // ==========================================
  const [activeTab, setActiveTab] = useState("Overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("All Chapter");
  const [selectedHeading, setSelectedHeading] = useState("All headings");
  const [selectedSubHeading, setSelectedSubHeading] =
    useState("All Sub-headings");
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [selectedFlow, setSelectedFlow] = useState("All Flow");

  const fetchDashboard = async () => {
    try {
      const res = await getDashboard();
      setDashboard(res.data.data || {});
    } catch (err) {
      console.error(err);
    }
  };

  const fetchHSCodeList = async () => {
    try {
      const res = await getHSCodeList();
      setHSCodeList(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchHSCodeDetails = async () => {
    try {
      const res = await getHSCodeDetails();
      setHSCodeDetails(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTradeFlow = async () => {
    try {
      const res = await getTradeFlow();
      setTradeFlow(res.data.data || {});
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTrendData = async () => {
    try {
      const res = await getTrends();
      setTrendData(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTopProducts = async () => {
    try {
      const res = await getTopProducts();
      setTopProducts(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchImporters = async () => {
    try {
      const res = await getImporters();
      setImporters(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchExporters = async () => {
    try {
      const res = await getExporters();
      setExporters(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCountries = async () => {
    try {
      const res = await getCountries();
      setCountries(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchFilterOptions = async () => {
    try {
      const res = await getFilterOptions();
      setFilterOptions(res.data.data || {});
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchDashboard();
    fetchHSCodeList();
    fetchHSCodeDetails();
    fetchTradeFlow();
    fetchTrendData();
    fetchTopProducts();
    fetchImporters();
    fetchExporters();
    fetchCountries();
    fetchFilterOptions();
  }, []);
  // Applied filter state
  const [filters, setFilters] = useState({
    search: "",
    chapter: "All Chapter",
    heading: "All headings",
    subheading: "All Sub-headings",
    country: "All Countries",
    flow: "All Flow",
  });

  const getFiscalYearFromSelectedDate = (date) => {
    const selectedYear = (
      date instanceof Date && !Number.isNaN(date.getTime()) ? date : new Date()
    ).getFullYear();
    // API fiscal-year convention requested: a date in 2026 sends 2025-2026.
    return `${selectedYear - 1}-${selectedYear}`;
  };

  const handleApply = async () => {
    setFilters({
      search: searchQuery,
      chapter: selectedChapter,
      heading: selectedHeading,
      subheading: selectedSubHeading,
      country: selectedCountry,
      flow: selectedFlow,
    });

    const selectedDate = shipmentStartDate || new Date();
    const flow =
      selectedFlow === "All Flow"
        ? "both"
        : selectedFlow.toLowerCase().includes("export")
          ? "export"
          : selectedFlow.toLowerCase().includes("import")
            ? "import"
            : "both";

    setHsIntelLoading(true);
    setHsIntelError("");
    try {
      const response = await getHsCodeIntelligence({
        hs_code: searchQuery.trim() || "61091000",
        flow,
        year: getFiscalYearFromSelectedDate(selectedDate),
        values_in: "crore",
        top_n: 50,
        include_trend: true,
      });
      setHsIntelResult(response?.data?.data ?? response?.data ?? null);
    } catch (error) {
      setHsIntelError(
        error?.response?.data?.detail ||
          error?.response?.data?.message ||
          error?.message ||
          "Unable to load HS Code Intelligence data.",
      );
      setHsIntelResult(null);
    } finally {
      setHsIntelLoading(false);
    }
  };

  const handleReset = () => {
    setSearchQuery("");
    setSelectedChapter("All Chapter");
    setSelectedHeading("All headings");
    setSelectedSubHeading("All Sub-headings");
    setSelectedCountry("All Countries");
    setSelectedFlow("All Flow");
    setShipmentStartDate(null);
    setShipmentEndDate(null);
    setHsIntelResult(null);
    setHsIntelError("");
    setFilters({
      search: "",
      chapter: "All Chapter",
      heading: "All headings",
      country: "All Countries",
      flow: "All Flow",
    });
  };

  const stats = [
    {
      title: "Total Export Shipments",
      value: dashboard.totalShipments || 0,
      change: "",
      icon: Package,
      color: "text-blue-500",
      bg: "bg-blue-50",
      isUp: true,
    },
    {
      title: "Total Export Value (INR)",
      value: `₹${((dashboard.totalTradeValue || 0) / 10000000).toFixed(2)} Cr`,
      change: "",
      icon: IndianRupee,
      color: "text-green-500",
      bg: "bg-green-50",
      isUp: true,
    },
    {
      title: "Total Exporters",
      value: dashboard.totalExporters || 0,
      change: "",
      icon: Users,
      color: "text-cyan-500",
      bg: "bg-cyan-50",
      isUp: true,
    },

    {
      title: "Countries of Origin",
      value: dashboard.countries || 0,
      change: "",
      icon: Globe,
      color: "text-purple-500",
      bg: "bg-purple-50",
      isUp: true,
    },
    {
      title: "Avg. Shipment Value (INR)",
      value: `₹${((dashboard.avgShipmentValue || 0) / 100000).toFixed(2)} L`,
      change: "",
      icon: IndianRupee,
      color: "text-orange-500",
      bg: "bg-orange-50",
      isUp: false,
    },
  ];
  // ==========================================
  // 3. DYNAMIC FILTERING LOGIC
  // ==========================================
  const filteredTableData = useMemo(() => {
    return hsCodeDetails.filter((item) => {
      const matchSearch =
        item.description
          ?.toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        item.hsCode?.includes(filters.search);

      const matchChapter =
        filters.chapter === "All Chapter" ||
        item.chapter === filters.chapter.replace("Chapter ", "");

      const matchCountry =
        filters.country === "All Countries" ||
        item.topCountry === filters.country;

      const matchFlow =
        filters.flow === "All Flow" || item.flow === filters.flow;

      return matchSearch && matchChapter && matchCountry && matchFlow;
    });
  }, [hsCodeDetails, filters]);

  return (
    <div className="overflow-y-auto bg-[#f8fafc] p-5  text-slate-600 antialiased flex flex-col justify-between pt-14">
      {/* TOP HEADER */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-5">
        <div>
          <h1 className="text-2xl font-bold text-[#1e293b]">
            HS Code Intelligence
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Explore detailed global shipment records with advanced search and
            filters.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <DatePicker
              selected={shipmentStartDate}
              onChange={(date) => {
                setShipmentStartDate(date);
                setShipmentEndDate(date);
              }}
              dateFormat="dd MMM yyyy"
              placeholderText="Select trade date"
              maxDate={new Date()}
              isClearable
              className={`bg-white border border-slate-200 text-[11px] sm:text-xs font-semibold pl-3 pr-9 py-2 rounded-xl shadow-xs hover:bg-slate-50 transition whitespace-nowrap outline-none cursor-pointer ${HEADING}`}
            />
            <CalendarDays
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>
          <button
            onClick={() => setExportReport(true)}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-slate-200 text-[11px] sm:text-xs font-semibold px-3 sm:px-4 py-2 rounded-xl shadow-xs hover:bg-slate-50 transition whitespace-nowrap ${HEADING}`}
          >
            <Download size={14} className="text-slate-400" />
            Export Report
          </button>
        </div>
      </div>

      {/* METRICS METERS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-3 mb-5">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="bg-white border border-slate-100 p-3.5 rounded-2xl shadow-sm flex flex-col justify-between"
            >
              <div className="flex justify-between items-start">
                <span className="text-[13px] font-semibold text-slate-600 leading-tight block max-w-[100%]  tracking-tight">
                  {stat.title}
                </span>
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${stat.bg} ${stat.color}`}
                >
                  <Icon size={14} />
                </div>
              </div>
              <div className="mt-2.5">
                <h4 className="text-base font-bold text-slate-800 tracking-tight">
                  {stat.value}
                </h4>
                <span
                  className={`text-[9px] font-bold block mt-0.5 ${stat.isUp ? "text-green-500" : "text-red-500"}`}
                >
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* SEARCH AND FILTERS PANEL */}
      <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm mb-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-3 items-end">
          <div>
            <label className="text-[10px] text-slate-400 font-bold block mb-1 uppercase">
              HS Code
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter HS Code (e.g. 61091000)"
              className="w-full bg-slate-50/60 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-blue-500"
            />
          </div>
          {/*<div>
            <label className="text-[10px] text-slate-400 font-bold block mb-1 uppercase">Chapter</label>
            <div className="relative">
              <select value={selectedChapter} onChange={(e) => setSelectedChapter(e.target.value)} className="w-full bg-slate-50/60 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none focus:border-blue-500">
                <option value="All Chapter">All Chapter</option>
                {filterOptions.chapters?.map((chapter) => (
                  <option key={chapter} value={chapter}>{chapter}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="text-[10px] text-slate-400 font-bold block mb-1 uppercase">Heading</label>
            <div className="relative">
              <select value={selectedHeading} onChange={(e) => setSelectedHeading(e.target.value)} className="w-full bg-slate-50/60 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none focus:border-blue-500">
                <option value="All headings">All headings</option>
                {filterOptions.headings?.map((heading) => (
                  <option key={heading} value={heading}>{heading}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="text-[10px] text-slate-400 font-bold block mb-1 uppercase">Sub-heading</label>
            <div className="relative">
              <select value={selectedSubHeading} onChange={(e) => setSelectedSubHeading(e.target.value)} className="w-full bg-slate-50/60 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none focus:border-blue-500">
                <option value="All Sub-headings">All Sub-headings</option>
                {filterOptions.subHeadings?.map((sub) => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>*/}
          
          <div className="mr-10">
            <label className="text-[10px] text-slate-400 font-bold block mb-1 uppercase">
              Flow
            </label>
            <div className="relative">
              <select
                value={selectedFlow}
                onChange={(e) => setSelectedFlow(e.target.value)}
                className="w-full bg-slate-50/60 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none focus:border-blue-500"
              >
                <option value="All Flow">All Flow</option>
                <option value="Export">Export</option>
                <option value="Import">Import</option>
              </select>
              <ChevronDown
                size={14}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </div>
          </div>

          <div className="flex gap-2 w-full ml-20">
            <button
              onClick={handleApply}
              className="flex-1 bg-blue-600  whitespace-nowrap hover:bg-blue-700 text-white font-medium text-xs rounded-xl py-2 transition shadow-sm"
            >
              Search
            </button>
            <button
              onClick={handleReset}
              className="text-slate-400 hover:text-slate-600 text-xs font-semibold px-2 border border-slate-200 rounded-xl bg-white"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* HS CODE INTELLIGENCE API RESULTS */}
      {(hsIntelLoading || hsIntelError || hsIntelResult) && (
        <section className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm mb-5">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-800">
                HS Code Trade Intelligence
              </h2>
              <p className="text-[11px] text-slate-400 mt-1">
                HS Code:{" "}
                {hsIntelResult?.identity?.hs_code ||
                  searchQuery.trim() ||
                  "61091000"}{" "}
                · Fiscal year:{" "}
                {hsIntelResult?.query?.year ||
                  getFiscalYearFromSelectedDate(
                    shipmentStartDate || new Date(),
                  )}{" "}
                · Values in ₹ Crore
              </p>
            </div>
            {hsIntelLoading && (
              <span className="text-xs text-blue-600 font-semibold">
                Loading live data…
              </span>
            )}
          </div>
          {hsIntelError && (
            <div className="rounded-xl bg-red-50 border border-red-100 p-3 text-xs text-red-600">
              {hsIntelError}
            </div>
          )}
          {hsIntelResult && !hsIntelLoading && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 mb-4">
                {[
                  {
                    label: "Export Value",
                    value: hsIntelResult.export?.total_value,
                  },
                  {
                    label: "Import Value",
                    value: hsIntelResult.import?.total_value,
                  },
                  {
                    label: "Total Trade Value",
                    value: hsIntelResult.flow_summary?.total_trade_value,
                  },
                  {
                    label: "Trade Balance",
                    value: hsIntelResult.flow_summary?.trade_balance,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-slate-100 bg-slate-50 p-3"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                      {item.label}
                    </p>
                    <p className="text-lg font-bold text-slate-800 mt-1">
                      {item.value == null
                        ? "—"
                        : `₹ ${Number(item.value).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Cr`}
                    </p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {[
                  {
                    title: "Top Export Countries",
                    data: hsIntelResult.export?.by_country || [],
                  },
                  {
                    title: "Top Import Countries",
                    data: hsIntelResult.import?.by_country || [],
                  },
                ].map((group) => (
                  <div
                    key={group.title}
                    className="border border-slate-100 rounded-xl overflow-hidden"
                  >
                    <h3 className="text-xs font-bold text-slate-700 p-3 border-b border-slate-100">
                      {group.title}
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 text-slate-400">
                          <tr>
                            <th className="p-2.5 font-semibold">Country</th>
                            <th className="p-2.5 font-semibold text-right">
                              Value (₹ Cr)
                            </th>
                            <th className="p-2.5 font-semibold text-right">
                              Growth
                            </th>
                            <th className="p-2.5 font-semibold text-right">
                              Share
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {group.data.slice(0, 50).map((row, index) => (
                            <tr
                              key={`${row.country}-${index}`}
                              className="border-t border-slate-100"
                            >
                              <td className="p-2.5 text-slate-700">
                                {row.country || "—"}
                              </td>
                              <td className="p-2.5 text-right font-medium text-slate-700">
                                {row.value == null
                                  ? "—"
                                  : Number(row.value).toLocaleString("en-IN", {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    })}
                              </td>
                              <td
                                className={`p-2.5 text-right ${(Number(row.growth_pct) || 0) < 0 ? "text-red-500" : "text-emerald-600"}`}
                              >
                                {row.growth_pct == null
                                  ? "—"
                                  : `${Number(row.growth_pct).toFixed(2)}%`}
                              </td>
                              <td className="p-2.5 text-right text-slate-600">
                                {row.share_pct == null
                                  ? "—"
                                  : `${Number(row.share_pct).toFixed(2)}%`}
                              </td>
                            </tr>
                          ))}
                          {group.data.length === 0 && (
                            <tr>
                              <td
                                colSpan={4}
                                className="p-4 text-center text-slate-400"
                              >
                                No country data returned for this flow.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-[10px] text-slate-400">
                API sources:{" "}
                {(hsIntelResult.sources || []).join(", ") || "Not supplied"}
              </div>
            </>
          )}
        </section>
      )}

      {/* CORE CHARTS QUAD GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        {/* PANEL 1: TOP HS CODES BY TRADE VALUE */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-xs text-slate-800">
                Top HS Codes by Trade Value
              </h3>
              {/*<button className="text-blue-600 text-[11px] font-bold">View All</button>*/}
            </div>
            <div className="space-y-3">
              {hsCodeList.map((item, idx) => (
                <div key={idx} className="text-[11px]">
                  <div className="flex justify-between text-slate-700 font-medium mb-1 gap-2">
                    <span className="text-emerald-600 font-bold shrink-0">
                      • {item.hsCode}
                    </span>
                    <span className="truncate flex-1 text-slate-500">
                      {item.description}
                    </span>
                    <span className="font-bold text-slate-800 shrink-0">
                      {" "}
                      ₹ {(item.tradeValue / 10000000).toFixed(2)} Cr
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                      <div
                        className="bg-teal-500 h-full"
                        style={{
                          width: `${Math.min(Number(item.share), 100)}%`,
                        }}
                      />
                    </div>
                    <span className="text-[9px] font-bold text-slate-400 w-8 text-right">
                      {item.share}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* <button className="text-blue-600 text-xs font-bold text-center mt-3 pt-2 border-t border-slate-50">View All HS Codes →</button> */}
        </div>

        {/* PANEL 2: TRADE VALUE TREND */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-bold text-xs text-slate-800">
                Trade Value Trend (INR)
              </h3>
              <span className="text-[9px] text-slate-400 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded font-medium">
                This Month
              </span>
            </div>
            <div className="mb-3">
              <span className="text-lg font-bold text-slate-800">
                {" "}
                ₹
                {(
                  trendData.reduce((sum, item) => sum + item.tradeValue, 0) /
                  10000000
                ).toFixed(2)}{" "}
                Cr
              </span>
              <span className="text-[10px] text-green-500 font-semibold ml-2">
                ▲ 17.6% vs last month
              </span>
            </div>
            <div className="h-[120px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={trendData.map((item) => ({
                    date: new Date(item._id + "-01").toLocaleString("en-IN", {
                      month: "short",
                      year: "2-digit",
                    }),
                    value: Number((item.tradeValue / 10000000).toFixed(2)),
                    shipments: item.shipments,
                  }))}
                >
                  <XAxis
                    dataKey="date"
                    tick={{ fill: "#94a3b8", fontSize: 9 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    formatter={(value) => [`₹${value} Cr`, "Trade Value"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#10B981"
                    strokeWidth={2}
                    dot={{ fill: "#10B981", r: 2.5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-50 text-center">
            <div className="bg-slate-50/60 p-1.5 rounded-xl border border-slate-100">
              <span className="text-[9px] text-slate-400 block font-medium">
                Export Value (INR)
              </span>
              <span className="text-xs font-bold text-slate-700">
                ₹
                {(
                  trendData.reduce((sum, item) => sum + item.tradeValue, 0) /
                  10000000
                ).toFixed(2)}{" "}
                Cr
              </span>
            </div>
            <div className="bg-slate-50/60 p-1.5 rounded-xl border border-slate-100">
              <span className="text-[9px] text-slate-400 block font-medium">
                Export Shipments
              </span>
              <span className="text-xs font-bold text-slate-700">
                {" "}
                {trendData.reduce((sum, item) => sum + item.shipments, 0)}
              </span>
            </div>
          </div>
        </div>

        {/* PANEL 3: TRADE VALUE BY FLOW */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-xs text-slate-800 mb-3">
              Trade Value by Flow
            </h3>
            <div className="flex items-center justify-around gap-2 h-[150px]">
              <div className="relative w-[110px] h-[110px] shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        {
                          name: "Import",
                          value: tradeFlow.import || 0,
                          color: "#10B981",
                        },
                        {
                          name: "Export",
                          value: tradeFlow.export || 0,
                          color: "#2563EB",
                        },
                      ]}
                      innerRadius={38}
                      outerRadius={50}
                      dataKey="value"
                      stroke="none"
                    >
                      {[{ color: "#10B981" }, { color: "#2563EB" }].map(
                        (item, index) => (
                          <Cell key={index} fill={item.color} />
                        ),
                      )}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[8px] text-slate-400 font-bold uppercase">
                    Total Value
                  </span>
                  <span className="font-bold text-[10px] text-slate-800 leading-none mt-0.5">
                    ₹
                    {(
                      ((tradeFlow.import || 0) + (tradeFlow.export || 0)) /
                      10000000
                    ).toFixed(2)}{" "}
                    Cr
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  {
                    name: "Import",
                    value: tradeFlow.import || 0,
                    percent:
                      (
                        ((tradeFlow.import || 0) /
                          ((tradeFlow.import || 0) + (tradeFlow.export || 1))) *
                        100
                      ).toFixed(1) + "%",
                    color: "#10B981",
                  },
                  {
                    name: "Export",
                    value: tradeFlow.export || 0,
                    percent:
                      (
                        ((tradeFlow.export || 0) /
                          ((tradeFlow.import || 0) + (tradeFlow.export || 1))) *
                        100
                      ).toFixed(1) + "%",
                    color: "#2563EB",
                  },
                ].map((flow, i) => (
                  <div key={i} className="flex items-center gap-4 text-[11px]">
                    <div className="flex items-center gap-1.5 font-bold">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: flow.color }}
                      />
                      <span className="text-slate-700">{flow.name}</span>
                    </div>
                    <span className="text-slate-500 font-semibold">
                      ₹{(flow.value / 10000000).toFixed(2)} Cr ({flow.percent})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DOUBLE GRAPH SLOT LAYER */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        {/* Top HS Codes by Growth */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-xs text-slate-800">
              Top HS Codes by Growth{" "}
              <span className="text-[10px] text-slate-400 font-normal">
                (vs last month)
              </span>
            </h3>

            {importers.length > 5 && (
              <button
                onClick={() => setShowAllImporters(true)}
                className="text-blue-600 hover:text-blue-700 text-[11px] font-bold"
              >
                View All
              </button>
            )}
          </div>

          <div className="divide-y divide-slate-50">
            {importers.slice(0, 5).map((item, i) => (
              <div
                key={item._id || i}
                className="flex justify-between items-center py-2 text-[11px]"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-700">
                      {item.importer || "-"}
                    </span>
                  </div>
                </div>

                <div className="text-right flex items-center gap-4">
                  <span className="font-semibold text-slate-500">
                    ₹ {((item.tradeValue || 0) / 10000000).toFixed(2)} Cr
                  </span>

                  <span className="text-green-500 font-bold w-12">
                    {item.shipments || 0} Shipments
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Top HS Codes by Shipments */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-xs text-slate-800">
              Top HS Codes by Shipments
            </h3>
            {/* <button className="text-blue-600 text-[11px] font-bold">View All</button>*/}
          </div>
          <div className="space-y-2.5">
            {topProducts.map((item, i) => (
              <div key={i} className="text-[11px]">
                <div className="flex justify-between text-slate-600 font-medium mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-700">
                      {item.hsCode}
                    </span>
                    <span className="truncate max-w-[160px]">
                      {item.description}
                    </span>
                  </div>
                  <span className="font-bold text-slate-800">
                    {item.shipments}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 h-full"
                      style={{ width: `${item.share}%` }}
                    />
                  </div>
                  <span className="text-[9px] font-bold text-slate-400 w-8 text-right">
                    {item.share}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trade Value by Top Countries */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-xs text-slate-800">
                Trade Value by Top Countries
              </h3>
              {/*<button className="text-blue-600 text-[11px] font-bold">View All</button>*/}
            </div>
            <div className="flex items-center justify-between gap-2 h-[140px]">
              <div className="relative w-[100px] h-[100px] shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={countries}
                      innerRadius={32}
                      outerRadius={45}
                      dataKey="tradeValue"
                      nameKey="_id"
                      stroke="none"
                    >
                      {countries.map((item, index) => (
                        <Cell
                          key={index}
                          fill={
                            [
                              "#2563EB",
                              "#10B981",
                              "#8B5CF6",
                              "#F59E0B",
                              "#6366F1",
                              "#94A3B8",
                              "#EC4899",
                            ][index % 7]
                          }
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[7px] uppercase text-slate-400 font-bold">
                    Total Value
                  </span>
                  <span className="font-bold text-[9px] text-slate-800 leading-none">
                    ₹
                    {(
                      countries.reduce(
                        (sum, item) => sum + item.tradeValue,
                        0,
                      ) / 10000000
                    ).toFixed(2)}{" "}
                    Cr
                  </span>
                </div>
              </div>
              <div className="flex-1 space-y-1 pl-1 max-h-[130px] overflow-y-auto scrollbar-none">
                {countries.map((country, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-[10px]"
                  >
                    <div className="flex items-center gap-1 truncate">
                      <div
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{
                          backgroundColor: [
                            "#2563EB",
                            "#10B981",
                            "#8B5CF6",
                            "#F59E0B",
                            "#6366F1",
                            "#94A3B8",
                            "#EC4899",
                          ][idx % 7],
                        }}
                      />
                      <span className="text-slate-600 font-semibold truncate">
                        {country._id}
                      </span>
                    </div>
                    <span className="text-slate-500 font-bold ml-1">
                      {" "}
                      ₹{(country.tradeValue / 10000000).toFixed(2)} Cr (
                      {(
                        (country.tradeValue /
                          countries.reduce(
                            (sum, item) => sum + item.tradeValue,
                            0,
                          )) *
                        100
                      ).toFixed(1)}
                      %)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DYNAMIC METADATA GRID DATA TABLE 
      <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm ">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
          <h3 className="font-bold text-sm text-slate-800">HS Code Details</h3>
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <button className="flex items-center gap-1.5 bg-white border border-slate-200 text-xs font-bold py-1.5 px-3 rounded-xl text-slate-700 shadow-sm">
              <Sliders size={13} className="text-slate-400" /> Customize Columns
            </button>
            <div className="flex items-center border border-slate-200 rounded-xl bg-white p-0.5 shadow-sm">
              <button className="p-1 text-slate-400 hover:text-slate-600"><LayoutGrid size={14} /></button>
              <button className="p-1 bg-slate-100 rounded-lg text-blue-600"><List size={14} /></button>
            </div>
            <div className="relative">
              <select className="bg-white border border-slate-200 rounded-xl py-1.5 pl-3 pr-7 text-xs font-bold text-slate-700 appearance-none shadow-sm focus:outline-none">
                <option>50 per page</option>
              </select>
              <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto -mx-4">
          <div className="inline-block min-w-full align-middle px-4">
            <table className="min-w-full divide-y divide-slate-100 text-xs text-left">
              <thead>
                <tr className="text-slate-400 font-semibold border-b border-slate-100">
                  <th className="pb-3 font-medium">HS Code</th>
                  <th className="pb-3 font-medium">Description</th>
                  <th className="pb-3 font-medium">Chapter / Heading</th>
                  <th className="pb-3 font-medium">Flow</th>
                  <th className="pb-3 font-medium">Trade Value (INR)</th>
                  <th className="pb-3 font-medium">Shipments</th>
                  <th className="pb-3 font-medium">Avg. Shipment Value (INR)</th>
                  <th className="pb-3 font-medium">Top Country</th>
                  <th className="pb-3 font-medium">Growth (vs last month)</th>
                  <th className="pb-3 font-medium text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-600 font-medium">
                {filteredTableData.length > 0 ? (
                  filteredTableData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60 transition">
                      <td className="py-3 text-slate-800 font-bold">{row.hsCode}</td>
                      <td className="py-3 font-bold text-slate-700 max-w-[200px] truncate">{row.description}</td>
                      <td className="py-3 text-slate-400 font-semibold">Chapter {row.chapter} / {row.heading}</td>
                      <td className="py-3 text-slate-500">{row.flow}</td>
                      <td className="py-3 font-bold text-slate-800">₹ {(row.tradeValue / 10000000).toFixed(2)} Cr</td>
                      <td className="py-3 text-slate-500">{row.shipments}</td>
                      <td className="py-3 text-slate-500">₹ {(row.avgShipmentValue / 100000).toFixed(2)} L</td>
                      <td className="py-3 text-slate-700 font-semibold">{row.topCountry}</td>
                      <td className="py-3 text-green-500 font-bold">-</td>
                      <td className="py-3 text-center text-slate-400 cursor-pointer hover:text-slate-600"><MoreVertical size={14} className="mx-auto" /></td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="py-8 text-center text-slate-400 font-bold">
                      No matching HS Code records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>*/}

      {/* FOOTER METADATA TIMESTAMP */}
      <div className="mt-5 pt-3 border-t border-slate-200/60 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-2">
        <div className="flex items-center gap-1.5">
          <Clock size={13} className="text-slate-300" />
          <span>
            All data is updated daily. Last updated on 24 Apr 2025, 09:30 AM
          </span>
        </div>
        <div className="flex items-center gap-1 cursor-pointer hover:text-slate-500">
          <HelpCircle size={13} className="text-slate-300" />
          <span>Help Center</span>
        </div>
      </div>

      {exportReport && <ExportReport onClose={() => setExportReport(false)} />}

      {showAllImporters && (
        <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl max-h-[85vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  Top HS Codes by Growth
                </h2>

                <p className="text-xs text-slate-400 mt-1">
                  All importers and shipment details
                </p>
              </div>

              <button
                onClick={() => setShowAllImporters(false)}
                className="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 text-xl"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto p-5">
              <div className="divide-y divide-slate-100">
                {importers.map((item, i) => (
                  <div
                    key={item._id || i}
                    className="flex justify-between items-center py-4"
                  >
                    <div>
                      <p className="text-sm font-bold text-slate-700">
                        {item.importer || "-"}
                      </p>
                    </div>

                    <div className="text-right flex items-center gap-6">
                      <span className="text-sm font-semibold text-slate-500">
                        ₹ {((item.tradeValue || 0) / 10000000).toFixed(2)} Cr
                      </span>

                      <span className="text-green-500 font-bold text-sm w-20">
                        {item.shipments || 0} Shipments
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {importers.length === 0 && (
                <div className="py-10 text-center text-sm text-slate-400">
                  No data available
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setShowAllImporters(false)}
                className="px-5 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
