// // // import React, { useState, useMemo, useEffect } from "react";
// // // import {
// // //   getDashboard,
// // //   getFilterOptions,
// // //   getExportTrend,
// // //   getCountryDistribution,
// // //   getTopProducts,
// // //   getTopBuyers,
// // //   getTopExporters,
// // //   getPortWiseExports,
// // //   getRecentShipments
// // // } from '../../api/ExportIntelApi';
// // // import DatePicker from "react-datepicker";
// // // import { getCommodityCountryTrend } from '../../api/CargoMateApi';
// // // import "react-datepicker/dist/react-datepicker.css";
// // // import ExportReport from "../../components/b2bComponent/ExportReport";
// // // import {
// // //   CalendarDays,
// // //   Download,
// // //   Package,
// // //   IndianRupee,
// // //   Users,
// // //   Truck,
// // //   Globe,
// // //   Clock3,
// // //   ChevronDown,
// // //   HelpCircle,
// // //   Clock,
// // // } from "lucide-react";

// // // import {
// // //   PieChart,
// // //   Pie,
// // //   Cell,
// // //   ResponsiveContainer,
// // //   LineChart,
// // //   Line,
// // //   XAxis,
// // //   YAxis,
// // //   Tooltip,
// // // } from "recharts";

// // // const HEADING = "text-[#07156B]";
// // // // ==========================================
// // // // 1. RAW EXPORT DATA (Image {B06B6444-DD0A-4D01-9B45-F1AF036CA639}.png के अनुसार)
// // // // ==========================================

// // // /*const INITIAL_PRODUCTS = [
// // //   { hsCode: "85", desc: "Electrical Machinery & Equipment", shipments: "1,985", value: 412.35, share: "21.0%", barWidth: "w-[21%]" },
// // //   { hsCode: "84", desc: "Machinery & Mechanical Appliances", shipments: "1,542", value: 352.80, share: "18.1%", barWidth: "w-[18.1%]" },
// // //   { hsCode: "90", desc: "Optical, Medical & Precision Instruments", shipments: "895", value: 231.40, share: "11.7%", barWidth: "w-[11.7%]" },
// // //   { hsCode: "72", desc: "Iron & Steel", shipments: "724", value: 165.70, share: "8.5%", barWidth: "w-[8.5%]" },
// // //   { hsCode: "39", desc: "Plastics & Articles", shipments: "628", value: 128.90, share: "6.5%", barWidth: "w-[6.5%]" },
// // // ];

// // // const INITIAL_LINE_DATA = [
// // //   { date: "01 Apr", value: 600 }, { date: "06 Apr", value: 850 }, { date: "11 Apr", value: 780 },
// // //   { date: "16 Apr", value: 1100 }, { date: "21 Apr", value: 1020 }, { date: "24 Apr", value: 1245 },
// // // ];

// // // const INITIAL_PIE_DATA = [
// // //   { name: "USA", value: 512.35, percent: "27.3%", color: "#2563EB" },
// // //   { name: "UAE", value: 302.80, percent: "16.1%", color: "#10B981" },
// // //   { name: "China", value: 268.40, percent: "14.3%", color: "#8B5CF6" },
// // //   { name: "Germany", value: 208.40, percent: "10.3%", color: "#F59E0B" },
// // //   { name: "Bangladesh", value: 268.40, percent: "14.3%", color: "#6366F1" },
// // //   { name: "Netherland", value: 268.40, percent: "14.3%", color: "#94A3B8" },
// // //   { name: "Other", value: 268.40, percent: "14.3%", color: "#EC4899" },
// // // ];

// // // const INITIAL_EXPORTERS = [
// // //   { name: "ABC Trading Co. Ltd.", shipments: "845", value: "₹125.40 Cr", growth: "▲ 18.9%", isUp: true, country: "USA" },
// // //   { name: "Global Industrial Inc.", shipments: "712", value: "₹96.75 Cr", growth: "▲ 15.2%", isUp: true, country: "UAE" },
// // //   { name: "Omega Supplies", shipments: "588", value: "₹76.30 Cr", growth: "▲ 11.4%", isUp: true, country: "China" },
// // //   { name: "Prime Exports Ltd.", shipments: "502", value: "₹64.20 Cr", growth: "▲ 9.8%", isUp: true, country: "Germany" },
// // // ];

// // // const INITIAL_BUYERS = [
// // //   { name: "ABC Imports Pvt. Ltd.", shipments: "1,245", value: "₹152.45 Cr", growth: "▲ 18.9%", isUp: true, country: "USA" },
// // //   { name: "Global Enterprises", shipments: "1,021", value: "₹128.75 Cr", growth: "▲ 15.2%", isUp: true, country: "UAE" },
// // //   { name: "Omega Traders", shipments: "812", value: "₹98.60 Cr", growth: "▲ 11.4%", isUp: true, country: "China" },
// // //   { name: "Shree Impex", shipments: "708", value: "₹86.20 Cr", growth: "▲ 9.8%", isUp: true, country: "Germany" },
// // // ];

// // // const INITIAL_PORTS = [
// // //   { name: "Nhava Sheva (Mumbai)", shipments: "2,856", value: "₹412.40 Cr", share: "33.1%" },
// // //   { name: "Mundra (Gujarat)", shipments: "1,745", value: "₹286.40 Cr", share: "23.0%" },
// // //   { name: "Chennai", shipments: "1,256", value: "₹181.20 Cr", share: "14.5%" },
// // //   { name: "Kolkata", shipments: "986", value: "₹134.80 Cr", share: "10.8%" },
// // // ];

// // // const INITIAL_SHIPMENTS = [
// // //   { id: "EXP-2025-2045", hsCode: "85", desc: "Electrical Machinery & Equipment", exporter: "ABC Exports Pvt. Ltd.", buyer: "Global Retail Inc.", country: "USA", port: "Nhava Sheva", date: "24 Apr 2025", value: "₹ 45.80 Cr", status: "DELIVERED" },
// // //   { id: "EXP-2025-2044", hsCode: "84", desc: "Machinery & Mechanical Appliances", exporter: "Global Trade Solutions", buyer: "TechMart USA", country: "UAE", port: "Mundra", date: "23 Apr 2025", value: "₹ 38.75 Cr", status: "DELIVERED" },
// // //   { id: "EXP-2025-2043", hsCode: "90", desc: "Optical, Medical & Precision Instruments", exporter: "Prime Exports Ltd.", buyer: "Mega Traders LLC", country: "Germany", port: "Chennai", date: "22 Apr 2025", value: "₹ 28.30 Cr", status: "IN TRANSIT" },
// // //   { id: "EXP-2025-2042", hsCode: "72", desc: "Iron & Steel", exporter: "Shree Exports", buyer: "Euro International GmbH", country: "China", port: "Nhava Sheva", date: "21 Apr 2025", value: "₹ 18.90 Cr", status: "DELIVERED" },
// // //   { id: "EXP-2025-2041", hsCode: "39", desc: "Plastics & Articles", exporter: "Omega Exports Pvt. Ltd.", buyer: "Oceanic Distributors", country: "Bangladesh", port: "Kolkata", date: "20 Apr 2025", value: "₹ 16.20 Cr", status: "PENDING" },
// // // ];*/

// // // export default function ExportIntelligenceDashboard({setMainTab}) {

// // //   const [dashboard, setDashboard] = useState({});
// // //   const [filterOptions, setFilterOptions] = useState({});
// // //   const [exportTrend, setExportTrend] = useState([]);
// // //   const [countryDistribution, setCountryDistribution] = useState([]);
// // //   const [countryTotalValue,setCountryTotalValue]=useState(0);
// // //   const [topProducts, setTopProducts] = useState([]);
// // //   const [topExporters, setTopExporters] = useState([]);
// // //   const [topBuyers, setTopBuyers] = useState([]);
// // //   const [portWiseExports, setPortWiseExports] = useState([]);
// // //   const [recentShipments, setRecentShipments] = useState([]);
// // //   // ==========================================
// // //   // 2. STATE MANAGEMENT FOR DYNAMIC FILTERS
// // //   // ==========================================
// // //   const [searchQuery, setSearchQuery] = useState("");
// // //   const [tradeTrendResult, setTradeTrendResult] = useState(null);
// // //   const [tradeTrendLoading, setTradeTrendLoading] = useState(false);
// // //   const [tradeTrendError, setTradeTrendError] = useState("");
// // //   const runTradeTrendSearch = async () => {
// // //     if (!searchQuery.trim()) { setTradeTrendError("Enter an HS code to search trade trends."); return; }
// // //     setTradeTrendLoading(true); setTradeTrendError("");
// // //     try {
// // //       const response = await getCommodityCountryTrend({ hs_code: searchQuery.trim(), trade_type: "export", year: "2025-2026", values_in: "crore" });
// // //       setTradeTrendResult(response.data);
// // //     } catch (err) {
// // //       setTradeTrendError(err?.response?.data?.detail || err?.response?.data?.message || err.message || "Trade trend search failed.");
// // //     } finally { setTradeTrendLoading(false); }
// // //   };

// // //   const [selectedPort, setSelectedPort] = useState("All Ports");
// // //   const [selectedCountry, setSelectedCountry] = useState("All Countries");
// // //   const [selectedExporter, setSelectedExporter] = useState("All Exporters");
// // //   const [selectedBuyer, setSelectedBuyer] = useState("All Buyers");
// // //    const [shipmentStartDate, setShipmentStartDate] = useState(null);
// // //     const [shipmentEndDate, setShipmentEndDate] = useState(null);
// // //      const [dateRange, setDateRange] = useState(false)
// // //      const [exportReport, setExportReport] = useState(false)

// // //   const fetchDashboard = async () => {
// // //     try {
// // //       const res = await getDashboard();
// // //       setDashboard(res.data.data || {});
// // //     } catch (err) {
// // //         console.error(err);
// // //       }
// // //   };

// // //   const fetchFilterOptions = async () => {
// // //     try {
// // //       const res = await getFilterOptions();
// // //       setFilterOptions(res.data.data || {});
// // //     } catch (err) {
// // //       console.error(err);
// // //     }
// // //   };
// // //   const fetchExportTrend = async () => {
// // //     try {
// // //       const res = await getExportTrend();
// // //       setExportTrend(res.data.data || []);
// // //     } catch (err) {
// // //       console.error(err);
// // //     }
// // //   };
// // //   const fetchCountryDistribution = async () => {
// // //     try {
// // //       const res = await getCountryDistribution();
// // //       setCountryDistribution(res.data.data || []);
// // //       setCountryTotalValue(res.data.totalValue || 0);
// // //     } catch (err) {
// // //       console.error(err);
// // //     }
// // //   };
// // //   const fetchTopProducts = async () => {
// // //     try {
// // //       const res = await getTopProducts();
// // //       setTopProducts(res.data.data || []);
// // //     } catch (err) {
// // //       console.error(err);
// // //     }
// // //   };
// // //   const fetchTopExporters = async () => {
// // //     try {
// // //       const res = await getTopExporters();
// // //       setTopExporters(res.data.data || []);
// // //     } catch (err) {
// // //       console.error(err);
// // //     }
// // //   };
// // //   const fetchTopBuyers = async () => {
// // //     try {
// // //       const res = await getTopBuyers();
// // //       setTopBuyers(res.data.data || []);
// // //     } catch (err) {
// // //       console.error(err);
// // //     }
// // //   };
// // //   const fetchPortWiseExports = async () => {
// // //     try {
// // //       const res = await getPortWiseExports();
// // //       setPortWiseExports(res.data.data || []);
// // //     } catch (err) {
// // //       console.error(err);
// // //     }
// // //   };
// // //   const fetchRecentShipments = async () => {
// // //     try {
// // //       const res = await getRecentShipments();
// // //       setRecentShipments(res.data.data || []);
// // //     } catch (err) {
// // //       console.error(err);
// // //     }
// // //   };
  
// // //   useEffect(() => {
// // //     fetchDashboard();
// // //     fetchFilterOptions();
// // //     fetchExportTrend();
// // //     fetchCountryDistribution();
// // //     fetchTopProducts();
// // //     fetchTopExporters();
// // //     fetchTopBuyers();
// // //     fetchPortWiseExports();
// // //     fetchRecentShipments();
// // //   }, []);
  
// // //   // Filter application triggers state
// // //   const [appliedFilters, setAppliedFilters] = useState({
// // //     search: "", port: "All Ports", country: "All Countries", exporter: "All Exporters", buyer: "All Buyers"
// // //   });

// // //   const handleApplyFilters = () => {
// // //     setAppliedFilters({
// // //       search: searchQuery,
// // //       port: selectedPort,
// // //       country: selectedCountry,
// // //       exporter: selectedExporter,
// // //       buyer: selectedBuyer
// // //     });
// // //   };

// // //   const handleResetFilters = () => {
// // //     setSearchQuery(""); setSelectedPort("All Ports"); setSelectedCountry("All Countries");
// // //     setSelectedExporter("All Exporters"); setSelectedBuyer("All Buyers");
// // //     setAppliedFilters({ search: "", port: "All Ports", country: "All Countries", exporter: "All Exporters", buyer: "All Buyers" });
// // //   };

// // //   const INITIAL_STATS = [
// // //     { title: "Total Export Shipments", value: dashboard.totalExportShipments || 0, change: "", icon: Package, color: "text-blue-500", bg: "bg-blue-50", isUp: true },
// // //     { title: "Total Export Value (INR)", value: `₹${((dashboard.totalExportValue || 0) / 10000000).toFixed(2)} Cr`, change: "", icon: IndianRupee, color: "text-green-500", bg: "bg-green-50", isUp: true },
// // //     { title: "Total Exporters", value: dashboard.totalExporters || 0, change: "", icon: Users, color: "text-cyan-500", bg: "bg-cyan-50", isUp: true },
// // //    { title: "Countries of Origin", value: dashboard.countries || 0, change: "", icon: Globe, color: "text-purple-500", bg: "bg-purple-50", isUp: true },
// // //     { title: "Avg. Shipment Value (INR)", value: `₹${((dashboard.avgShipmentValue || 0) / 100000).toFixed(2)} L`, change: "", icon: IndianRupee, color: "text-orange-500", bg: "bg-orange-50", isUp: false },
// // //       ];
// // //   // ==========================================
// // //   // 3. MEMOIZED FILTERING LOGIC
// // //   // ==========================================
// // //  const filteredShipments = useMemo(() => {
// // //   return recentShipments.filter((ship) => {
// // //     const matchSearch =
// // //       ship.cargo?.productName
// // //         ?.toLowerCase()
// // //         .includes(appliedFilters.search.toLowerCase()) ||
// // //       ship.cargo?.hsCode?.hsCode
// // //         ?.toString()
// // //         .includes(appliedFilters.search);

// // //     const matchPort =
// // //       appliedFilters.port === "All Ports" ||
// // //       ship.route?.originCity === appliedFilters.port;

// // //     const matchCountry =
// // //       appliedFilters.country === "All Countries" ||
// // //       ship.route?.destinationCountry === appliedFilters.country;

// // //     const matchExporter =
// // //       appliedFilters.exporter === "All Exporters" ||
// // //       ship.exporter?.companyName === appliedFilters.exporter;

// // //     const matchBuyer =
// // //       appliedFilters.buyer === "All Buyers" ||
// // //       ship.buyer?.companyName === appliedFilters.buyer;

// // //     return (
// // //       matchSearch &&
// // //       matchPort &&
// // //       matchCountry &&
// // //       matchExporter &&
// // //       matchBuyer
// // //     );
// // //   });
// // // }, [recentShipments, appliedFilters]);

// // //   const dynamicPieData = useMemo(() => {
// // //     const colors=["#2563EB","#10B981","#8B5CF6","#F59E0B","#6366F1","#94A3B8","#EC4899"];
// // //     let data=countryDistribution.map((item,index)=>({
// // //       name:item.country,
// // //       value:item.value,
// // //       percent:item.percentage+"%",
// // //       color:colors[index%colors.length]
// // //     }));
// // //     if(appliedFilters.country!=="All Countries"){
// // //       data=data.filter(item=>item.name===appliedFilters.country);
// // //     }
// // //     return data;
// // //   },[countryDistribution, appliedFilters.country]);
  
// // //   const computedTotalValue=useMemo(()=>{
// // //     if(appliedFilters.country==="All Countries"){
// // //       return `₹ ${(countryTotalValue/10000000).toFixed(2)} Cr`;
// // //     }
// // //     const match=dynamicPieData.find(item=>item.name===appliedFilters.country);
// // //     if(!match) return "₹0.00 Cr";
// // //     return `₹ ${(match.value/10000000).toFixed(2)} Cr`;
// // //   },[dynamicPieData, countryTotalValue, appliedFilters.country]);
  
// // //   const lineChartData = useMemo(() => {
// // //     return exportTrend.map(item => ({
// // //       date: new Date(item._id).toLocaleDateString("en-GB", {
// // //         day: "2-digit",month: "short"
// // //       }),
// // //       value: Number((item.totalValue / 10000000).toFixed(2)),
// // //       shipments: item.shipments
// // //     }));
// // //   }, [exportTrend]);

// // //   const totalExportValue = useMemo(() => {
// // //     return lineChartData.reduce((sum, item) => sum + item.value, 0);
// // //   }, [lineChartData]);

// // //   const totalShipments = useMemo(() => {
// // //     return lineChartData.reduce((sum, item) => sum + item.shipments, 0);
// // //   }, [lineChartData]);

// // //   return (
// // //     <div className="min-h-screen  overflow-y-auto bg-[#f8fafc] p-6 text-slate-700 antialiased  flex flex-col justify-between pt-14">
// // //       <div>
// // //         {/* HEADER */}
// // //         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
// // //           <div>
// // //             <h1 className="text-2xl font-bold text-[#1e293b]">Export Intelligence</h1>
// // //             <p className="text-sm text-slate-400 mt-0.5">
// // //               Discover export performance, markets, buyers, and opportunities.
// // //             </p>
// // //           </div>
// // //                 <div className="flex gap-3"> 
// // //                <div className="relative flex-1 ">
// // //                       <DatePicker
// // //                         selected={shipmentStartDate}
// // //                         onChange={(dates) => {
// // //                           const [start, end] = dates;
// // //                           setShipmentStartDate(start);
// // //                           setShipmentEndDate(end);
// // //                         }}
// // //                         startDate={shipmentStartDate}
// // //                         endDate={shipmentEndDate}
// // //                         selectsRange
// // //                         dateFormat="dd MMM yyyy"
// // //                         placeholderText="01 Apr 2025 - 24 Apr 2025"
// // //                         className={`bg-white border border-slate-200 text-[11px] sm:text-xs font-semibold pl-3 pr-9 py-2 rounded-xl shadow-xs hover:bg-slate-50 transition whitespace-nowrap outline-none cursor-pointer ${HEADING}`}
// // //                       />
// // //                       <CalendarDays
// // //                         size={14}
// // //                         className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
// // //                       />
// // //                     </div>
// // //                     <button onClick={() => setExportReport(true)} className={`flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-slate-200 text-[11px] sm:text-xs font-semibold px-3 sm:px-4 py-2 rounded-xl shadow-xs hover:bg-slate-50 transition whitespace-nowrap ${HEADING}`}>
// // //                       <Download size={14} className="text-slate-400" />
// // //                       Export Report
// // //                     </button> </div>
// // //         </div>

// // //         {/* METRICS STATS GRID */}
// // //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
// // //           {INITIAL_STATS.map((item, index) => {
// // //             const Icon = item.icon;
// // //             return (
// // //               <div key={index} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col justify-between">
// // //                 <div className="flex justify-between items-start">
// // //                   <span className="text-[13px] font-medium text-slate-600 leading-tight block max-w-[85%]">
// // //                     {item.title}
// // //                   </span>
// // //                   <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${item.bg} ${item.color}`}>
// // //                     <Icon size={18} />
// // //                   </div>
// // //                 </div>
// // //                 <div className="mt-3">
// // //                   <h3 className="font-bold text-lg text-slate-800 tracking-tight">{item.value}</h3>
// // //                   <span className={`text-[10px] font-medium block mt-0.5 ${item.isUp ? "text-green-500" : "text-red-500"}`}>
// // //                     {item.change}
// // //                   </span>
// // //                 </div>
// // //               </div>
// // //             );
// // //           })}
// // //         </div>

// // //         {/* FILTERS PANEL */}
// // //         <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm mb-6">
// // //           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4 items-end">
// // //             <div>
// // //               <label className="text-[11px] text-slate-400 font-bold block mb-1.5 uppercase">HS Code / Product</label>
// // //               <input
// // //                 type="text"
// // //                 value={searchQuery}
// // //                 onChange={(e) => setSearchQuery(e.target.value)}
// // //                 placeholder="Search HS Code or Product"
// // //                 className="w-full bg-slate-50/60 border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-600 focus:outline-none focus:border-blue-500"
// // //               />
// // //             <div className="mt-2 rounded-lg border border-slate-200 bg-white p-3 text-xs">
// // //               <button type="button" onClick={runTradeTrendSearch} disabled={tradeTrendLoading} className="rounded-md bg-blue-600 px-3 py-2 font-semibold text-white disabled:opacity-60">
// // //                 {tradeTrendLoading ? "Searching trade data…" : "Search live trade trends"}
// // //               </button>
// // //               {tradeTrendError && <p className="mt-2 text-red-600">{tradeTrendError}</p>}
// // //               {tradeTrendResult && <div className="mt-2"><p className="font-semibold text-slate-700">Live Export trade trend</p><pre className="mt-1 max-h-48 overflow-auto whitespace-pre-wrap break-words text-slate-600">{JSON.stringify(tradeTrendResult, null, 2)}</pre></div>}
// // //             </div>
// // //             </div>

// // //             {/*<div>
// // //               <label className="text-[11px] text-slate-400 font-bold block mb-1.5 uppercase">Port of Exit</label>
// // //               <div className="relative">
// // //                 <select value={selectedPort} onChange={(e) => setSelectedPort(e.target.value)} className="w-full bg-slate-50/60 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs text-slate-600 appearance-none focus:outline-none focus:border-blue-500">
// // //                   <option value="All Ports">All Ports</option>
// // //                   {filterOptions.ports?.map((port,index)=>(
// // //                     <option key={index} value={port}>{port}</option>
// // //                   ))}
// // //                 </select>
// // //                 <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
// // //               </div>
// // //             </div>*/}

// // //             <div>
// // //               <label className="text-[11px] text-slate-400 font-bold block mb-1.5 uppercase">Country of Destination</label>
// // //               <div className="relative">
// // //                 <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} className="w-full bg-slate-50/60 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs text-slate-600 appearance-none focus:outline-none focus:border-blue-500">
// // //                   <option value="All Countries">All Countries</option>
// // //                   {filterOptions.countries?.map((country,index)=>(
// // //                     <option key={index} value={country}>{country}</option>
// // //                   ))}
// // //                 </select>
// // //                 <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
// // //               </div>
// // //             </div>

// // //             {/*<div>
// // //               <label className="text-[11px] text-slate-400 font-bold block mb-1.5 uppercase">Exporter</label>
// // //               <div className="relative">
// // //                 <select value={selectedExporter} onChange={(e) => setSelectedExporter(e.target.value)} className="w-full bg-slate-50/60 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs text-slate-600 appearance-none focus:outline-none focus:border-blue-500">
// // //                   <option value="All Exporters">All Exporters</option>
// // //                   {filterOptions.exporters?.map((exporter,index)=>(
// // //                     <option key={index} value={exporter}>{exporter}</option>
// // //                   ))}
// // //                 </select>
// // //                 <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
// // //               </div>
// // //             </div>

// // //             <div>
// // //               <label className="text-[11px] text-slate-400 font-bold block mb-1.5 uppercase">Buyer</label>
// // //               <div className="relative">
// // //                 <select value={selectedBuyer} onChange={(e) => setSelectedBuyer(e.target.value)} className="w-full bg-slate-50/60 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs text-slate-600 appearance-none focus:outline-none focus:border-blue-500">
// // //                   <option value="All Buyers">All Buyers</option>
// // //                   {filterOptions.buyers?.map((exporter,index)=>(
// // //                     <option key={index} value={buyer}>{buyer}</option>
// // //                   ))}
// // //                 </select>
// // //                 <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
// // //               </div>
// // //             </div>*/}


// // //             <div className="flex gap-2 w-full">
// // //               <button onClick={handleApplyFilters} className="flex-1  whitespace-nowrap bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-xl py-2 px-3 transition shadow-sm">
// // //                 Search
// // //               </button>
// // //               <button onClick={handleResetFilters} className="text-slate-400 hover:text-slate-600 font-medium text-xs rounded-xl py-2 px-3 transition border border-slate-200 bg-white">
// // //                 Reset
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* CHARTS LAYER */}
// // //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          
// // //           {/* TOP EXPORTED PRODUCTS */}
// // //           <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex flex-col justify-between">
// // //             <div>
// // //               <div className="flex justify-between items-center mb-4">
// // //                 <h3 className="font-bold text-sm text-slate-800">Top Exported Products</h3>
// // //                 {/* <button className="text-blue-600 text-xs font-semibold">View All</button> */}
// // //               </div>
// // //               <div className="space-y-3">
// // //                 {topProducts.map((prod, i) => (
// // //                   <div key={i} className="text-xs">
// // //                     <div className="flex justify-between items-start text-slate-600 mb-1.5 gap-2">
// // //                       <span className="font-medium text-slate-400 shrink-0">{prod.hsCode}</span>
// // //                       <span className="truncate flex-1 font-medium text-slate-700">{prod.productName}</span>
// // //                       <span className="font-semibold text-slate-800 shrink-0">₹ {(prod.value / 10000000).toFixed(2)} Cr</span>
// // //                     </div>
// // //                     <div className="flex items-center gap-3">
// // //                       <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
// // //                         <div className="bg-blue-500 h-full rounded-full ${prod.barWidth" style={{ width: `${prod.share}%` }}/>
// // //                       </div>
// // //                       <span className="text-[10px] text-slate-400 font-medium shrink-0 w-8 text-right">{prod.share}%</span>
// // //                     </div>
// // //                   </div>
// // //                 ))}
// // //               </div>
// // //             </div>
            
// // //           </div>

// // //           {/* EXPORT VALUE TREND */}
// // //           <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
// // //             <div className="flex justify-between items-center mb-2">
// // //               <h3 className="font-bold text-sm text-slate-800">Export Value Trend (INR)</h3>
// // //               <span className="text-[10px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100 font-medium">This Month</span>
// // //             </div>
// // //             <div className="mb-4">
// // //               <span className="text-xl font-bold text-slate-800">₹{totalExportValue.toFixed(2)} Cr</span>
// // //               <span className="text-xs text-green-500 font-medium ml-2">▲ 17.6% vs last month</span>
// // //             </div>
// // //             <div className="h-[150px] w-full">
// // //               <ResponsiveContainer width="100%" height="100%">
// // //                 <LineChart data={lineChartData}>
// // //                   <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 10 }} tickLine={false} axisLine={false} />
// // //                   <Tooltip formatter={(value) => [`₹${value} Cr`, "Export Value"]}/>
// // //                   <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2.5} dot={{ fill: '#10B981', r: 3 }} />
// // //                 </LineChart>
// // //               </ResponsiveContainer>
// // //             </div>
// // //             <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-slate-50 text-center">
// // //               <div className="bg-slate-50/70 p-2 rounded-xl border border-slate-100">
// // //                 <span className="text-[10px] text-slate-400 font-medium block">Export Value (INR)</span>
// // //                 <span className="text-xs font-bold text-slate-700"> ₹{totalExportValue.toFixed(2)} Cr</span>
// // //               </div>
// // //               <div className="bg-slate-50/70 p-2 rounded-xl border border-slate-100">
// // //                 <span className="text-[10px] text-slate-400 font-medium block">Export Shipments</span>
// // //                 <span className="text-xs font-bold text-slate-700">{totalShipments}</span>
// // //               </div>
// // //             </div>
// // //           </div>

// // //           {/* EXPORTS BY COUNTRY OF DESTINATION */}
// // //           <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex flex-col justify-between">
// // //             <div>
// // //               <div className="flex justify-between items-center mb-4">
// // //                 <h3 className="font-bold text-sm text-slate-800">Exports by Country of Destination</h3>
// // //                 {/*<button className="text-blue-600 text-xs font-semibold">View All</button>*/}
// // //               </div>
// // //               <div className="flex items-center justify-between gap-2">
// // //                 <div className="relative w-[120px] h-[120px] shrink-0">
// // //                   <ResponsiveContainer width="100%" height="100%">
// // //                     <PieChart>
// // //                       <Pie data={dynamicPieData} innerRadius={40} outerRadius={55} dataKey="value" stroke="none">
// // //                         {dynamicPieData.map((item, index) => <Cell key={index} fill={item.color} />)}
// // //                       </Pie>
// // //                     </PieChart>
// // //                   </ResponsiveContainer>
// // //                   <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
// // //                     <span className="text-[8px] uppercase text-slate-400 font-semibold">Total Value</span>
// // //                     <span className="font-bold text-[11px] text-slate-800 leading-none mt-0.5">{computedTotalValue}</span>
// // //                   </div>
// // //                 </div>
// // //                 <div className="flex-1 space-y-1 pl-2 max-h-[130px] overflow-y-auto">
// // //                   {dynamicPieData.slice(0, 6).map((country, idx) => (
// // //                     <div key={idx} className="flex items-center justify-between text-[11px]">
// // //                       <div className="flex items-center gap-1.5 truncate">
// // //                         <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: country.color }} />
// // //                         <span className="text-slate-600 font-medium truncate">{country.name}</span>
// // //                       </div>
// // //                       <span className="text-slate-500 font-semibold ml-1">₹ {(country.value/10000000).toFixed(2)} Cr</span>
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               </div>
// // //             </div>
           
// // //           </div>
// // //         </div>

// // //         {/* DATA TABLE LAYER */}
// // //         <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm overflow-hidden">
// // //           <div className="flex justify-between items-center mb-4">
// // //             <h3 className="font-bold text-sm text-slate-800">Recent Export Shipments</h3>
// // //             {/*<span className="text-xs text-blue-600 font-semibold cursor-pointer hover:underline">Filter</span>*/}
// // //           </div>

// // //           <div className="overflow-x-auto -mx-5">
// // //             <div className="inline-block min-w-full align-middle px-5">
// // //               <table className="min-w-full divide-y divide-slate-100 text-xs">
// // //                 <thead>
// // //                   <tr className="text-left text-slate-400 font-semibold border-b border-slate-100">
// // //                     <th className="pb-3 font-medium">Shipment ID</th>
// // //                     <th className="pb-3 font-medium">HS Code</th>
// // //                     <th className="pb-3 font-medium">Product Description</th>
// // //                     <th className="pb-3 font-medium">Exporter</th>
// // //                     <th className="pb-3 font-medium">Buyer</th>
// // //                     <th className="pb-3 font-medium">Destination Country</th>
// // //                     <th className="pb-3 font-medium">Port of Exit</th>
// // //                     <th className="pb-3 font-medium">Ship Date</th>
// // //                     <th className="pb-3 font-medium">Value (INR)</th>
// // //                     <th className="pb-3 font-medium text-center">Status</th>
// // //                   </tr>
// // //                 </thead>
// // //                 <tbody className="divide-y divide-slate-50 text-slate-600 font-medium">
// // //                   {filteredShipments.length > 0 ? (
// // //                     filteredShipments.map((ship, idx) => (
// // //                       <tr key={ship._id} className="hover:bg-slate-50/80 transition">
// // //                         <td className="py-3.5 text-blue-600 font-semibold">{ship.sbNumber}</td>
// // //                         <td className="py-3.5 text-slate-400 font-bold">{ship.cargo?.hsCode?.hsCode || "-"}</td>
// // //                         <td className="py-3.5 max-w-[180px] truncate font-semibold text-slate-700"> {ship.cargo?.productName}</td>
// // //                         <td className="py-3.5 truncate text-slate-500">{ship.exporter?.companyName}</td>
// // //                         <td className="py-3.5 truncate text-slate-500">{ship.buyer?.companyName}</td>
// // //                         <td className="py-3.5 text-slate-700">{ship.route?.destinationCountry}</td>
// // //                         <td className="py-3.5 text-slate-500">{ship.route?.originCity || "-"}</td>
// // //                         <td className="py-3.5 text-slate-400 whitespace-nowrap">{new Date(ship.shipmentDate).toLocaleDateString("en-GB", {day: "2-digit", month: "short", year: "numeric",})}</td>
// // //                         <td className="py-3.5 font-bold text-slate-800">₹ {ship.cargo?.value?.toFixed(2)}</td>
// // //                         <td className="py-3.5 text-center">
// // //                           <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
// // //                             ship.status === "Delivered" ? "bg-green-100 text-green-700" :
// // //                             ship.status === "In Transit" ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700"
// // //                           }`}>{ship.shipmentStatus}</span>
// // //                         </td>
// // //                       </tr>
// // //                     ))
// // //                   ) : (
// // //                     <tr>
// // //                       <td colSpan="10" className="py-8 text-center text-slate-400 font-medium">
// // //                         No matching export records found.
// // //                       </td>
// // //                     </tr>
// // //                   )}
// // //                 </tbody>
// // //               </table>
// // //             </div>
// // //           </div>
// // //           <div className="text-center mt-4 pt-3 border-t border-slate-50">
// // //             <button onClick={() => setMainTab && setMainTab("Shipments")} className="text-blue-600 hover:text-blue-700 text-xs font-semibold">
// // //               View All Shipments →
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* FOOTER TIMESTAMPS BAR */}
// // //       <div className="mt-6 pt-4 mb-10 border-t border-slate-200/60 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-2">
// // //         <div className="flex items-center gap-1.5">
// // //           <Clock size={14} className="text-slate-300" />
// // //           <span>All data is updated daily. Last updated on 24 Apr 2025, 09:30 AM</span>
// // //         </div>
// // //         <div className="flex items-center gap-1 cursor-pointer hover:text-slate-500">
// // //           <HelpCircle size={14} className="text-slate-300" />
// // //           <span>Help Center</span>
// // //         </div>
// // //       </div>

// // //        {exportReport && (
// // //                         <ExportReport onClose={() => setExportReport(false)} />
// // //                       )}

// // //     </div>
// // //   );
// // // }

// // import React, { useState, useMemo, useEffect } from "react";
// // import {
// //   getDashboard,
// //   getFilterOptions,
// //   getExportTrend,
// //   getCountryDistribution,
// //   getTopProducts,
// //   getTopBuyers,
// //   getTopExporters,
// //   getPortWiseExports,
// //   getRecentShipments
// // } from '../../api/ExportIntelApi';
// // import DatePicker from "react-datepicker";
// // import { getCommodityCountryTrend } from '../../api/CargoMateApi';
// // import "react-datepicker/dist/react-datepicker.css";
// // import ExportReport from "../../components/b2bComponent/ExportReport";
// // import {
// //   CalendarDays,
// //   Download,
// //   Package,
// //   IndianRupee,
// //   Users,
// //   Truck,
// //   Globe,
// //   Clock3,
// //   ChevronDown,
// //   HelpCircle,
// //   Clock,
// // } from "lucide-react";

// // import {
// //   PieChart,
// //   Pie,
// //   Cell,
// //   ResponsiveContainer,
// //   LineChart,
// //   Line,
// //   XAxis,
// //   YAxis,
// //   Tooltip,
// // } from "recharts";

// // const HEADING = "text-[#07156B]";
// // // ==========================================
// // // 1. RAW EXPORT DATA (Image {B06B6444-DD0A-4D01-9B45-F1AF036CA639}.png के अनुसार)
// // // ==========================================

// // /*const INITIAL_PRODUCTS = [
// //   { hsCode: "85", desc: "Electrical Machinery & Equipment", shipments: "1,985", value: 412.35, share: "21.0%", barWidth: "w-[21%]" },
// //   { hsCode: "84", desc: "Machinery & Mechanical Appliances", shipments: "1,542", value: 352.80, share: "18.1%", barWidth: "w-[18.1%]" },
// //   { hsCode: "90", desc: "Optical, Medical & Precision Instruments", shipments: "895", value: 231.40, share: "11.7%", barWidth: "w-[11.7%]" },
// //   { hsCode: "72", desc: "Iron & Steel", shipments: "724", value: 165.70, share: "8.5%", barWidth: "w-[8.5%]" },
// //   { hsCode: "39", desc: "Plastics & Articles", shipments: "628", value: 128.90, share: "6.5%", barWidth: "w-[6.5%]" },
// // ];

// // const INITIAL_LINE_DATA = [
// //   { date: "01 Apr", value: 600 }, { date: "06 Apr", value: 850 }, { date: "11 Apr", value: 780 },
// //   { date: "16 Apr", value: 1100 }, { date: "21 Apr", value: 1020 }, { date: "24 Apr", value: 1245 },
// // ];

// // const INITIAL_PIE_DATA = [
// //   { name: "USA", value: 512.35, percent: "27.3%", color: "#2563EB" },
// //   { name: "UAE", value: 302.80, percent: "16.1%", color: "#10B981" },
// //   { name: "China", value: 268.40, percent: "14.3%", color: "#8B5CF6" },
// //   { name: "Germany", value: 208.40, percent: "10.3%", color: "#F59E0B" },
// //   { name: "Bangladesh", value: 268.40, percent: "14.3%", color: "#6366F1" },
// //   { name: "Netherland", value: 268.40, percent: "14.3%", color: "#94A3B8" },
// //   { name: "Other", value: 268.40, percent: "14.3%", color: "#EC4899" },
// // ];

// // const INITIAL_EXPORTERS = [
// //   { name: "ABC Trading Co. Ltd.", shipments: "845", value: "₹125.40 Cr", growth: "▲ 18.9%", isUp: true, country: "USA" },
// //   { name: "Global Industrial Inc.", shipments: "712", value: "₹96.75 Cr", growth: "▲ 15.2%", isUp: true, country: "UAE" },
// //   { name: "Omega Supplies", shipments: "588", value: "₹76.30 Cr", growth: "▲ 11.4%", isUp: true, country: "China" },
// //   { name: "Prime Exports Ltd.", shipments: "502", value: "₹64.20 Cr", growth: "▲ 9.8%", isUp: true, country: "Germany" },
// // ];

// // const INITIAL_BUYERS = [
// //   { name: "ABC Imports Pvt. Ltd.", shipments: "1,245", value: "₹152.45 Cr", growth: "▲ 18.9%", isUp: true, country: "USA" },
// //   { name: "Global Enterprises", shipments: "1,021", value: "₹128.75 Cr", growth: "▲ 15.2%", isUp: true, country: "UAE" },
// //   { name: "Omega Traders", shipments: "812", value: "₹98.60 Cr", growth: "▲ 11.4%", isUp: true, country: "China" },
// //   { name: "Shree Impex", shipments: "708", value: "₹86.20 Cr", growth: "▲ 9.8%", isUp: true, country: "Germany" },
// // ];

// // const INITIAL_PORTS = [
// //   { name: "Nhava Sheva (Mumbai)", shipments: "2,856", value: "₹412.40 Cr", share: "33.1%" },
// //   { name: "Mundra (Gujarat)", shipments: "1,745", value: "₹286.40 Cr", share: "23.0%" },
// //   { name: "Chennai", shipments: "1,256", value: "₹181.20 Cr", share: "14.5%" },
// //   { name: "Kolkata", shipments: "986", value: "₹134.80 Cr", share: "10.8%" },
// // ];

// // const INITIAL_SHIPMENTS = [
// //   { id: "EXP-2025-2045", hsCode: "85", desc: "Electrical Machinery & Equipment", exporter: "ABC Exports Pvt. Ltd.", buyer: "Global Retail Inc.", country: "USA", port: "Nhava Sheva", date: "24 Apr 2025", value: "₹ 45.80 Cr", status: "DELIVERED" },
// //   { id: "EXP-2025-2044", hsCode: "84", desc: "Machinery & Mechanical Appliances", exporter: "Global Trade Solutions", buyer: "TechMart USA", country: "UAE", port: "Mundra", date: "23 Apr 2025", value: "₹ 38.75 Cr", status: "DELIVERED" },
// //   { id: "EXP-2025-2043", hsCode: "90", desc: "Optical, Medical & Precision Instruments", exporter: "Prime Exports Ltd.", buyer: "Mega Traders LLC", country: "Germany", port: "Chennai", date: "22 Apr 2025", value: "₹ 28.30 Cr", status: "IN TRANSIT" },
// //   { id: "EXP-2025-2042", hsCode: "72", desc: "Iron & Steel", exporter: "Shree Exports", buyer: "Euro International GmbH", country: "China", port: "Nhava Sheva", date: "21 Apr 2025", value: "₹ 18.90 Cr", status: "DELIVERED" },
// //   { id: "EXP-2025-2041", hsCode: "39", desc: "Plastics & Articles", exporter: "Omega Exports Pvt. Ltd.", buyer: "Oceanic Distributors", country: "Bangladesh", port: "Kolkata", date: "20 Apr 2025", value: "₹ 16.20 Cr", status: "PENDING" },
// // ];*/

// // const getCurrentFinancialYear = () => {
// //   const currentYear = new Date().getFullYear();
// //   return `${currentYear - 1}-${currentYear}`;
// // };

// // export default function ExportIntelligenceDashboard({setMainTab}) {

// //   const [dashboard, setDashboard] = useState({});
// //   const [filterOptions, setFilterOptions] = useState({});
// //   const [exportTrend, setExportTrend] = useState([]);
// //   const [countryDistribution, setCountryDistribution] = useState([]);
// //   const [countryTotalValue,setCountryTotalValue]=useState(0);
// //   const [topProducts, setTopProducts] = useState([]);
// //   const [topExporters, setTopExporters] = useState([]);
// //   const [topBuyers, setTopBuyers] = useState([]);
// //   const [portWiseExports, setPortWiseExports] = useState([]);
// //   const [recentShipments, setRecentShipments] = useState([]);
// //   // ==========================================
// //   // 2. STATE MANAGEMENT FOR DYNAMIC FILTERS
// //   // ==========================================
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [tradeTrendResult, setTradeTrendResult] = useState(null);
// //   const [tradeTrendLoading, setTradeTrendLoading] = useState(false);
// //   const [tradeTrendError, setTradeTrendError] = useState("");

// //   const runTradeTrendSearch = async () => {
// //     const query = searchQuery.trim();
// //     if (!query) {
// //       setTradeTrendError("Enter an HS code or product to search trade trends.");
// //       setTradeTrendResult(null);
// //       return;
// //     }

// //     setTradeTrendLoading(true);
// //     setTradeTrendError("");
// //     try {
// //       const params = {
// //         hs_code: query,
// //         country: selectedCountry === "All Countries" ? "" : selectedCountry,
// //         trade_type: "export",
// //         year: getCurrentFinancialYear(),
// //         values_in: "crore",
// //       };
// //       const response = await getCommodityCountryTrend(params);
// //       setTradeTrendResult(response?.data?.data ?? response?.data ?? null);
// //     } catch (err) {
// //       setTradeTrendResult(null);
// //       setTradeTrendError(
// //         err?.response?.data?.detail ||
// //         err?.response?.data?.message ||
// //         err.message ||
// //         "Trade trend search failed."
// //       );
// //     } finally {
// //       setTradeTrendLoading(false);
// //     }
// //   };

// //   const [selectedPort, setSelectedPort] = useState("All Ports");
// //   const [selectedCountry, setSelectedCountry] = useState("All Countries");
// //   const [selectedExporter, setSelectedExporter] = useState("All Exporters");
// //   const [selectedBuyer, setSelectedBuyer] = useState("All Buyers");
// //    const [shipmentStartDate, setShipmentStartDate] = useState(null);
// //     const [shipmentEndDate, setShipmentEndDate] = useState(null);
// //      const [dateRange, setDateRange] = useState(false)
// //      const [exportReport, setExportReport] = useState(false)

// //   const fetchDashboard = async () => {
// //     try {
// //       const res = await getDashboard();
// //       setDashboard(res.data.data || {});
// //     } catch (err) {
// //         console.error(err);
// //       }
// //   };

// //   const fetchFilterOptions = async () => {
// //     try {
// //       const res = await getFilterOptions();
// //       setFilterOptions(res.data.data || {});
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };
// //   const fetchExportTrend = async () => {
// //     try {
// //       const res = await getExportTrend();
// //       setExportTrend(res.data.data || []);
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };
// //   const fetchCountryDistribution = async () => {
// //     try {
// //       const res = await getCountryDistribution();
// //       setCountryDistribution(res.data.data || []);
// //       setCountryTotalValue(res.data.totalValue || 0);
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };
// //   const fetchTopProducts = async () => {
// //     try {
// //       const res = await getTopProducts();
// //       setTopProducts(res.data.data || []);
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };
// //   const fetchTopExporters = async () => {
// //     try {
// //       const res = await getTopExporters();
// //       setTopExporters(res.data.data || []);
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };
// //   const fetchTopBuyers = async () => {
// //     try {
// //       const res = await getTopBuyers();
// //       setTopBuyers(res.data.data || []);
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };
// //   const fetchPortWiseExports = async () => {
// //     try {
// //       const res = await getPortWiseExports();
// //       setPortWiseExports(res.data.data || []);
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };
// //   const fetchRecentShipments = async () => {
// //     try {
// //       const res = await getRecentShipments();
// //       setRecentShipments(res.data.data || []);
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };
  
// //   useEffect(() => {
// //     fetchDashboard();
// //     fetchFilterOptions();
// //     fetchExportTrend();
// //     fetchCountryDistribution();
// //     fetchTopProducts();
// //     fetchTopExporters();
// //     fetchTopBuyers();
// //     fetchPortWiseExports();
// //     fetchRecentShipments();
// //   }, []);
  
// //   // Filter application triggers state
// //   const [appliedFilters, setAppliedFilters] = useState({
// //     search: "", port: "All Ports", country: "All Countries", exporter: "All Exporters", buyer: "All Buyers"
// //   });

// //   const handleApplyFilters = () => {
// //     setAppliedFilters({
// //       search: searchQuery,
// //       port: selectedPort,
// //       country: selectedCountry,
// //       exporter: selectedExporter,
// //       buyer: selectedBuyer
// //     });
// //   };

// //   const handleResetFilters = () => {
// //     setSearchQuery(""); setSelectedPort("All Ports"); setSelectedCountry("All Countries");
// //     setSelectedExporter("All Exporters"); setSelectedBuyer("All Buyers");
// //     setAppliedFilters({ search: "", port: "All Ports", country: "All Countries", exporter: "All Exporters", buyer: "All Buyers" });
// //   };

// //   const INITIAL_STATS = [
// //     { title: "Total Export Shipments", value: dashboard.totalExportShipments || 0, change: "", icon: Package, color: "text-blue-500", bg: "bg-blue-50", isUp: true },
// //     { title: "Total Export Value (INR)", value: `₹${((dashboard.totalExportValue || 0) / 10000000).toFixed(2)} Cr`, change: "", icon: IndianRupee, color: "text-green-500", bg: "bg-green-50", isUp: true },
// //     { title: "Total Exporters", value: dashboard.totalExporters || 0, change: "", icon: Users, color: "text-cyan-500", bg: "bg-cyan-50", isUp: true },
// //    { title: "Countries of Origin", value: dashboard.countries || 0, change: "", icon: Globe, color: "text-purple-500", bg: "bg-purple-50", isUp: true },
// //     { title: "Avg. Shipment Value (INR)", value: `₹${((dashboard.avgShipmentValue || 0) / 100000).toFixed(2)} L`, change: "", icon: IndianRupee, color: "text-orange-500", bg: "bg-orange-50", isUp: false },
// //       ];
// //   // ==========================================
// //   // 3. MEMOIZED FILTERING LOGIC
// //   // ==========================================
// //  const filteredShipments = useMemo(() => {
// //   return recentShipments.filter((ship) => {
// //     const matchSearch =
// //       ship.cargo?.productName
// //         ?.toLowerCase()
// //         .includes(appliedFilters.search.toLowerCase()) ||
// //       ship.cargo?.hsCode?.hsCode
// //         ?.toString()
// //         .includes(appliedFilters.search);

// //     const matchPort =
// //       appliedFilters.port === "All Ports" ||
// //       ship.route?.originCity === appliedFilters.port;

// //     const matchCountry =
// //       appliedFilters.country === "All Countries" ||
// //       ship.route?.destinationCountry === appliedFilters.country;

// //     const matchExporter =
// //       appliedFilters.exporter === "All Exporters" ||
// //       ship.exporter?.companyName === appliedFilters.exporter;

// //     const matchBuyer =
// //       appliedFilters.buyer === "All Buyers" ||
// //       ship.buyer?.companyName === appliedFilters.buyer;

// //     return (
// //       matchSearch &&
// //       matchPort &&
// //       matchCountry &&
// //       matchExporter &&
// //       matchBuyer
// //     );
// //   });
// // }, [recentShipments, appliedFilters]);

// //   const dynamicPieData = useMemo(() => {
// //     const colors=["#2563EB","#10B981","#8B5CF6","#F59E0B","#6366F1","#94A3B8","#EC4899"];
// //     let data=countryDistribution.map((item,index)=>({
// //       name:item.country,
// //       value:item.value,
// //       percent:item.percentage+"%",
// //       color:colors[index%colors.length]
// //     }));
// //     if(appliedFilters.country!=="All Countries"){
// //       data=data.filter(item=>item.name===appliedFilters.country);
// //     }
// //     return data;
// //   },[countryDistribution, appliedFilters.country]);
  
// //   const computedTotalValue=useMemo(()=>{
// //     if(appliedFilters.country==="All Countries"){
// //       return `₹ ${(countryTotalValue/10000000).toFixed(2)} Cr`;
// //     }
// //     const match=dynamicPieData.find(item=>item.name===appliedFilters.country);
// //     if(!match) return "₹0.00 Cr";
// //     return `₹ ${(match.value/10000000).toFixed(2)} Cr`;
// //   },[dynamicPieData, countryTotalValue, appliedFilters.country]);
  
// //   const lineChartData = useMemo(() => {
// //     return exportTrend.map(item => ({
// //       date: new Date(item._id).toLocaleDateString("en-GB", {
// //         day: "2-digit",month: "short"
// //       }),
// //       value: Number((item.totalValue / 10000000).toFixed(2)),
// //       shipments: item.shipments
// //     }));
// //   }, [exportTrend]);

// //   const totalExportValue = useMemo(() => {
// //     return lineChartData.reduce((sum, item) => sum + item.value, 0);
// //   }, [lineChartData]);

// //   const totalShipments = useMemo(() => {
// //     return lineChartData.reduce((sum, item) => sum + item.shipments, 0);
// //   }, [lineChartData]);

// //   return (
// //     <div className="min-h-screen  overflow-y-auto bg-[#f8fafc] p-6 text-slate-700 antialiased  flex flex-col justify-between pt-14">
// //       <div>
// //         {/* HEADER */}
// //         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
// //           <div>
// //             <h1 className="text-2xl font-bold text-[#1e293b]">Export Intelligence</h1>
// //             <p className="text-sm text-slate-400 mt-0.5">
// //               Discover export performance, markets, buyers, and opportunities.
// //             </p>
// //           </div>
// //                 <div className="flex gap-3"> 
// //                <div className="relative flex-1 ">
// //                       <DatePicker
// //                         selected={shipmentStartDate}
// //                         onChange={(dates) => {
// //                           const [start, end] = dates;
// //                           setShipmentStartDate(start);
// //                           setShipmentEndDate(end);
// //                         }}
// //                         startDate={shipmentStartDate}
// //                         endDate={shipmentEndDate}
// //                         selectsRange
// //                         dateFormat="dd MMM yyyy"
// //                         placeholderText="01 Apr 2025 - 24 Apr 2025"
// //                         className={`bg-white border border-slate-200 text-[11px] sm:text-xs font-semibold pl-3 pr-9 py-2 rounded-xl shadow-xs hover:bg-slate-50 transition whitespace-nowrap outline-none cursor-pointer ${HEADING}`}
// //                       />
// //                       <CalendarDays
// //                         size={14}
// //                         className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
// //                       />
// //                     </div>
// //                     <button onClick={() => setExportReport(true)} className={`flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-slate-200 text-[11px] sm:text-xs font-semibold px-3 sm:px-4 py-2 rounded-xl shadow-xs hover:bg-slate-50 transition whitespace-nowrap ${HEADING}`}>
// //                       <Download size={14} className="text-slate-400" />
// //                       Export Report
// //                     </button> </div>
// //         </div>

// //         {/* METRICS STATS GRID */}
// //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
// //           {INITIAL_STATS.map((item, index) => {
// //             const Icon = item.icon;
// //             return (
// //               <div key={index} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col justify-between">
// //                 <div className="flex justify-between items-start">
// //                   <span className="text-[13px] font-medium text-slate-600 leading-tight block max-w-[85%]">
// //                     {item.title}
// //                   </span>
// //                   <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${item.bg} ${item.color}`}>
// //                     <Icon size={18} />
// //                   </div>
// //                 </div>
// //                 <div className="mt-3">
// //                   <h3 className="font-bold text-lg text-slate-800 tracking-tight">{item.value}</h3>
// //                   <span className={`text-[10px] font-medium block mt-0.5 ${item.isUp ? "text-green-500" : "text-red-500"}`}>
// //                     {item.change}
// //                   </span>
// //                 </div>
// //               </div>
// //             );
// //           })}
// //         </div>

// //         {/* TRADE TREND SEARCH */}
// //         <div className="bg-white border border-slate-100 rounded-2xl p-3 shadow-sm mb-6">
// //           <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(140px,0.8fr)_auto] gap-3 items-center">
// //             <input
// //               type="text"
// //               value={searchQuery}
// //               onChange={(e) => setSearchQuery(e.target.value)}
// //               onKeyDown={(e) => { if (e.key === "Enter") { handleApplyFilters(); runTradeTrendSearch(); } }}
// //               placeholder="Search HS Code or Product"
// //               aria-label="HS Code or Product"
// //               className="w-full min-w-0 bg-white border border-slate-200 rounded-xl py-2.5 px-3 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
// //             />
// //             <div className="relative min-w-0">
// //               <select
// //                 value={selectedCountry}
// //                 onChange={(e) => setSelectedCountry(e.target.value)}
// //                 aria-label="Country"
// //                 className="w-full appearance-none bg-white border border-slate-200 rounded-xl py-2.5 pl-3 pr-9 text-xs text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
// //               >
// //                 <option value="All Countries">All Countries</option>
// //                 {((filterOptions.countries?.length ? filterOptions.countries : countryDistribution.map((item) => item.country)) || []).filter(Boolean).map((country, index) => (
// //                   <option key={`${country}-${index}`} value={country}>{country}</option>
// //                 ))}
// //               </select>
// //               <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
// //             </div>
// //             <button
// //               type="button"
// //               onClick={() => { handleApplyFilters(); runTradeTrendSearch(); }}
// //               disabled={tradeTrendLoading}
// //               className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2.5 px-4 transition disabled:opacity-60"
// //             >
// //               {tradeTrendLoading ? "Searching..." : "Search"}
// //             </button>
// //             <button
// //               type="button"
// //               onClick={() => { handleResetFilters(); setTradeTrendResult(null); setTradeTrendError(""); }}
// //               className="rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-slate-700 hover:bg-slate-50 font-medium text-xs py-2.5 px-4 transition"
// //             >
// //               Reset
// //             </button>
// //           </div>
// //           {tradeTrendError && <p role="alert" className="mt-3 text-xs text-red-600">{tradeTrendError}</p>}
// //           {tradeTrendLoading && <p className="mt-3 text-xs text-slate-500">Fetching live export trade trends...</p>}
// //         </div>

// //         {tradeTrendResult && (
// //           <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm mb-6">
// //             <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
// //               <div>
// //                 <h3 className="text-sm font-bold text-slate-800">Live Export Trade Trend</h3>
// //                 <p className="text-xs text-slate-500 mt-1">
// //                   HS Code / Product: {searchQuery.trim()} · Country: {selectedCountry === "All Countries" ? "All Countries" : selectedCountry} · FY {getCurrentFinancialYear()} · Values in ₹ Crore
// //                 </p>
// //               </div>
// //               <span className="rounded-full bg-emerald-50 text-emerald-700 px-2.5 py-1 text-[10px] font-semibold">Live API data</span>
// //             </div>
// //             <pre className="max-h-72 overflow-auto whitespace-pre-wrap break-words rounded-xl bg-slate-50 border border-slate-100 p-3 text-xs text-slate-700">{JSON.stringify(tradeTrendResult, null, 2)}</pre>
// //           </div>
// //         )}

// //         {/* CHARTS LAYER */}
// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          
// //           {/* TOP EXPORTED PRODUCTS */}
// //           <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex flex-col justify-between">
// //             <div>
// //               <div className="flex justify-between items-center mb-4">
// //                 <h3 className="font-bold text-sm text-slate-800">Top Exported Products</h3>
// //                 {/* <button className="text-blue-600 text-xs font-semibold">View All</button> */}
// //               </div>
// //               <div className="space-y-3">
// //                 {topProducts.map((prod, i) => (
// //                   <div key={i} className="text-xs">
// //                     <div className="flex justify-between items-start text-slate-600 mb-1.5 gap-2">
// //                       <span className="font-medium text-slate-400 shrink-0">{prod.hsCode}</span>
// //                       <span className="truncate flex-1 font-medium text-slate-700">{prod.productName}</span>
// //                       <span className="font-semibold text-slate-800 shrink-0">₹ {(prod.value / 10000000).toFixed(2)} Cr</span>
// //                     </div>
// //                     <div className="flex items-center gap-3">
// //                       <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
// //                         <div className="bg-blue-500 h-full rounded-full ${prod.barWidth" style={{ width: `${prod.share}%` }}/>
// //                       </div>
// //                       <span className="text-[10px] text-slate-400 font-medium shrink-0 w-8 text-right">{prod.share}%</span>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
            
// //           </div>

// //           {/* EXPORT VALUE TREND */}
// //           <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
// //             <div className="flex justify-between items-center mb-2">
// //               <h3 className="font-bold text-sm text-slate-800">Export Value Trend (INR)</h3>
// //               <span className="text-[10px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100 font-medium">This Month</span>
// //             </div>
// //             <div className="mb-4">
// //               <span className="text-xl font-bold text-slate-800">₹{totalExportValue.toFixed(2)} Cr</span>
// //               <span className="text-xs text-green-500 font-medium ml-2">▲ 17.6% vs last month</span>
// //             </div>
// //             <div className="h-[150px] w-full">
// //               <ResponsiveContainer width="100%" height="100%">
// //                 <LineChart data={lineChartData}>
// //                   <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 10 }} tickLine={false} axisLine={false} />
// //                   <Tooltip formatter={(value) => [`₹${value} Cr`, "Export Value"]}/>
// //                   <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2.5} dot={{ fill: '#10B981', r: 3 }} />
// //                 </LineChart>
// //               </ResponsiveContainer>
// //             </div>
// //             <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-slate-50 text-center">
// //               <div className="bg-slate-50/70 p-2 rounded-xl border border-slate-100">
// //                 <span className="text-[10px] text-slate-400 font-medium block">Export Value (INR)</span>
// //                 <span className="text-xs font-bold text-slate-700"> ₹{totalExportValue.toFixed(2)} Cr</span>
// //               </div>
// //               <div className="bg-slate-50/70 p-2 rounded-xl border border-slate-100">
// //                 <span className="text-[10px] text-slate-400 font-medium block">Export Shipments</span>
// //                 <span className="text-xs font-bold text-slate-700">{totalShipments}</span>
// //               </div>
// //             </div>
// //           </div>

// //           {/* EXPORTS BY COUNTRY OF DESTINATION */}
// //           <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex flex-col justify-between">
// //             <div>
// //               <div className="flex justify-between items-center mb-4">
// //                 <h3 className="font-bold text-sm text-slate-800">Exports by Country of Destination</h3>
// //                 {/*<button className="text-blue-600 text-xs font-semibold">View All</button>*/}
// //               </div>
// //               <div className="flex items-center justify-between gap-2">
// //                 <div className="relative w-[120px] h-[120px] shrink-0">
// //                   <ResponsiveContainer width="100%" height="100%">
// //                     <PieChart>
// //                       <Pie data={dynamicPieData} innerRadius={40} outerRadius={55} dataKey="value" stroke="none">
// //                         {dynamicPieData.map((item, index) => <Cell key={index} fill={item.color} />)}
// //                       </Pie>
// //                     </PieChart>
// //                   </ResponsiveContainer>
// //                   <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
// //                     <span className="text-[8px] uppercase text-slate-400 font-semibold">Total Value</span>
// //                     <span className="font-bold text-[11px] text-slate-800 leading-none mt-0.5">{computedTotalValue}</span>
// //                   </div>
// //                 </div>
// //                 <div className="flex-1 space-y-1 pl-2 max-h-[130px] overflow-y-auto">
// //                   {dynamicPieData.slice(0, 6).map((country, idx) => (
// //                     <div key={idx} className="flex items-center justify-between text-[11px]">
// //                       <div className="flex items-center gap-1.5 truncate">
// //                         <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: country.color }} />
// //                         <span className="text-slate-600 font-medium truncate">{country.name}</span>
// //                       </div>
// //                       <span className="text-slate-500 font-semibold ml-1">₹ {(country.value/10000000).toFixed(2)} Cr</span>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             </div>
           
// //           </div>
// //         </div>

// //         {/* DATA TABLE LAYER */}
// //         <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm overflow-hidden">
// //           <div className="flex justify-between items-center mb-4">
// //             <h3 className="font-bold text-sm text-slate-800">Recent Export Shipments</h3>
// //             {/*<span className="text-xs text-blue-600 font-semibold cursor-pointer hover:underline">Filter</span>*/}
// //           </div>

// //           <div className="overflow-x-auto -mx-5">
// //             <div className="inline-block min-w-full align-middle px-5">
// //               <table className="min-w-full divide-y divide-slate-100 text-xs">
// //                 <thead>
// //                   <tr className="text-left text-slate-400 font-semibold border-b border-slate-100">
// //                     <th className="pb-3 font-medium">Shipment ID</th>
// //                     <th className="pb-3 font-medium">HS Code</th>
// //                     <th className="pb-3 font-medium">Product Description</th>
// //                     <th className="pb-3 font-medium">Exporter</th>
// //                     <th className="pb-3 font-medium">Buyer</th>
// //                     <th className="pb-3 font-medium">Destination Country</th>
// //                     <th className="pb-3 font-medium">Port of Exit</th>
// //                     <th className="pb-3 font-medium">Ship Date</th>
// //                     <th className="pb-3 font-medium">Value (INR)</th>
// //                     <th className="pb-3 font-medium text-center">Status</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody className="divide-y divide-slate-50 text-slate-600 font-medium">
// //                   {filteredShipments.length > 0 ? (
// //                     filteredShipments.map((ship, idx) => (
// //                       <tr key={ship._id} className="hover:bg-slate-50/80 transition">
// //                         <td className="py-3.5 text-blue-600 font-semibold">{ship.sbNumber}</td>
// //                         <td className="py-3.5 text-slate-400 font-bold">{ship.cargo?.hsCode?.hsCode || "-"}</td>
// //                         <td className="py-3.5 max-w-[180px] truncate font-semibold text-slate-700"> {ship.cargo?.productName}</td>
// //                         <td className="py-3.5 truncate text-slate-500">{ship.exporter?.companyName}</td>
// //                         <td className="py-3.5 truncate text-slate-500">{ship.buyer?.companyName}</td>
// //                         <td className="py-3.5 text-slate-700">{ship.route?.destinationCountry}</td>
// //                         <td className="py-3.5 text-slate-500">{ship.route?.originCity || "-"}</td>
// //                         <td className="py-3.5 text-slate-400 whitespace-nowrap">{new Date(ship.shipmentDate).toLocaleDateString("en-GB", {day: "2-digit", month: "short", year: "numeric",})}</td>
// //                         <td className="py-3.5 font-bold text-slate-800">₹ {ship.cargo?.value?.toFixed(2)}</td>
// //                         <td className="py-3.5 text-center">
// //                           <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
// //                             ship.status === "Delivered" ? "bg-green-100 text-green-700" :
// //                             ship.status === "In Transit" ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700"
// //                           }`}>{ship.shipmentStatus}</span>
// //                         </td>
// //                       </tr>
// //                     ))
// //                   ) : (
// //                     <tr>
// //                       <td colSpan="10" className="py-8 text-center text-slate-400 font-medium">
// //                         No matching export records found.
// //                       </td>
// //                     </tr>
// //                   )}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </div>
// //           <div className="text-center mt-4 pt-3 border-t border-slate-50">
// //             <button onClick={() => setMainTab && setMainTab("Shipments")} className="text-blue-600 hover:text-blue-700 text-xs font-semibold">
// //               View All Shipments →
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* FOOTER TIMESTAMPS BAR */}
// //       <div className="mt-6 pt-4 mb-10 border-t border-slate-200/60 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-2">
// //         <div className="flex items-center gap-1.5">
// //           <Clock size={14} className="text-slate-300" />
// //           <span>All data is updated daily. Last updated on 24 Apr 2025, 09:30 AM</span>
// //         </div>
// //         <div className="flex items-center gap-1 cursor-pointer hover:text-slate-500">
// //           <HelpCircle size={14} className="text-slate-300" />
// //           <span>Help Center</span>
// //         </div>
// //       </div>

// //        {exportReport && (
// //                         <ExportReport onClose={() => setExportReport(false)} />
// //                       )}

// //     </div>
// //   );
// // }


// import React, { useState, useMemo, useEffect } from "react";
// import {
//   getDashboard,
//   getFilterOptions,
//   getExportTrend,
//   getCountryDistribution,
//   getTopProducts,
//   getTopBuyers,
//   getTopExporters,
//   getPortWiseExports,
//   getRecentShipments
// } from '../../api/ExportIntelApi';
// import DatePicker from "react-datepicker";
// import { getCommodityCountryTrend } from '../../api/CargoMateApi';
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
//   HelpCircle,
//   Clock,
// } from "lucide-react";

// import {
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
// } from "recharts";

// const HEADING = "text-[#07156B]";
// // ==========================================
// // 1. RAW EXPORT DATA (Image {B06B6444-DD0A-4D01-9B45-F1AF036CA639}.png के अनुसार)
// // ==========================================

// /*const INITIAL_PRODUCTS = [
//   { hsCode: "85", desc: "Electrical Machinery & Equipment", shipments: "1,985", value: 412.35, share: "21.0%", barWidth: "w-[21%]" },
//   { hsCode: "84", desc: "Machinery & Mechanical Appliances", shipments: "1,542", value: 352.80, share: "18.1%", barWidth: "w-[18.1%]" },
//   { hsCode: "90", desc: "Optical, Medical & Precision Instruments", shipments: "895", value: 231.40, share: "11.7%", barWidth: "w-[11.7%]" },
//   { hsCode: "72", desc: "Iron & Steel", shipments: "724", value: 165.70, share: "8.5%", barWidth: "w-[8.5%]" },
//   { hsCode: "39", desc: "Plastics & Articles", shipments: "628", value: 128.90, share: "6.5%", barWidth: "w-[6.5%]" },
// ];

// const INITIAL_LINE_DATA = [
//   { date: "01 Apr", value: 600 }, { date: "06 Apr", value: 850 }, { date: "11 Apr", value: 780 },
//   { date: "16 Apr", value: 1100 }, { date: "21 Apr", value: 1020 }, { date: "24 Apr", value: 1245 },
// ];

// const INITIAL_PIE_DATA = [
//   { name: "USA", value: 512.35, percent: "27.3%", color: "#2563EB" },
//   { name: "UAE", value: 302.80, percent: "16.1%", color: "#10B981" },
//   { name: "China", value: 268.40, percent: "14.3%", color: "#8B5CF6" },
//   { name: "Germany", value: 208.40, percent: "10.3%", color: "#F59E0B" },
//   { name: "Bangladesh", value: 268.40, percent: "14.3%", color: "#6366F1" },
//   { name: "Netherland", value: 268.40, percent: "14.3%", color: "#94A3B8" },
//   { name: "Other", value: 268.40, percent: "14.3%", color: "#EC4899" },
// ];

// const INITIAL_EXPORTERS = [
//   { name: "ABC Trading Co. Ltd.", shipments: "845", value: "₹125.40 Cr", growth: "▲ 18.9%", isUp: true, country: "USA" },
//   { name: "Global Industrial Inc.", shipments: "712", value: "₹96.75 Cr", growth: "▲ 15.2%", isUp: true, country: "UAE" },
//   { name: "Omega Supplies", shipments: "588", value: "₹76.30 Cr", growth: "▲ 11.4%", isUp: true, country: "China" },
//   { name: "Prime Exports Ltd.", shipments: "502", value: "₹64.20 Cr", growth: "▲ 9.8%", isUp: true, country: "Germany" },
// ];

// const INITIAL_BUYERS = [
//   { name: "ABC Imports Pvt. Ltd.", shipments: "1,245", value: "₹152.45 Cr", growth: "▲ 18.9%", isUp: true, country: "USA" },
//   { name: "Global Enterprises", shipments: "1,021", value: "₹128.75 Cr", growth: "▲ 15.2%", isUp: true, country: "UAE" },
//   { name: "Omega Traders", shipments: "812", value: "₹98.60 Cr", growth: "▲ 11.4%", isUp: true, country: "China" },
//   { name: "Shree Impex", shipments: "708", value: "₹86.20 Cr", growth: "▲ 9.8%", isUp: true, country: "Germany" },
// ];

// const INITIAL_PORTS = [
//   { name: "Nhava Sheva (Mumbai)", shipments: "2,856", value: "₹412.40 Cr", share: "33.1%" },
//   { name: "Mundra (Gujarat)", shipments: "1,745", value: "₹286.40 Cr", share: "23.0%" },
//   { name: "Chennai", shipments: "1,256", value: "₹181.20 Cr", share: "14.5%" },
//   { name: "Kolkata", shipments: "986", value: "₹134.80 Cr", share: "10.8%" },
// ];

// const INITIAL_SHIPMENTS = [
//   { id: "EXP-2025-2045", hsCode: "85", desc: "Electrical Machinery & Equipment", exporter: "ABC Exports Pvt. Ltd.", buyer: "Global Retail Inc.", country: "USA", port: "Nhava Sheva", date: "24 Apr 2025", value: "₹ 45.80 Cr", status: "DELIVERED" },
//   { id: "EXP-2025-2044", hsCode: "84", desc: "Machinery & Mechanical Appliances", exporter: "Global Trade Solutions", buyer: "TechMart USA", country: "UAE", port: "Mundra", date: "23 Apr 2025", value: "₹ 38.75 Cr", status: "DELIVERED" },
//   { id: "EXP-2025-2043", hsCode: "90", desc: "Optical, Medical & Precision Instruments", exporter: "Prime Exports Ltd.", buyer: "Mega Traders LLC", country: "Germany", port: "Chennai", date: "22 Apr 2025", value: "₹ 28.30 Cr", status: "IN TRANSIT" },
//   { id: "EXP-2025-2042", hsCode: "72", desc: "Iron & Steel", exporter: "Shree Exports", buyer: "Euro International GmbH", country: "China", port: "Nhava Sheva", date: "21 Apr 2025", value: "₹ 18.90 Cr", status: "DELIVERED" },
//   { id: "EXP-2025-2041", hsCode: "39", desc: "Plastics & Articles", exporter: "Omega Exports Pvt. Ltd.", buyer: "Oceanic Distributors", country: "Bangladesh", port: "Kolkata", date: "20 Apr 2025", value: "₹ 16.20 Cr", status: "PENDING" },
// ];*/

// const getCurrentFinancialYear = () => {
//   const currentYear = new Date().getFullYear();
//   return `${currentYear - 1}-${currentYear}`;
// };

// export default function ExportIntelligenceDashboard({setMainTab}) {

//   const [dashboard, setDashboard] = useState({});
//   const [filterOptions, setFilterOptions] = useState({});
//   const [exportTrend, setExportTrend] = useState([]);
//   const [countryDistribution, setCountryDistribution] = useState([]);
//   const [countryTotalValue,setCountryTotalValue]=useState(0);
//   const [topProducts, setTopProducts] = useState([]);
//   const [topExporters, setTopExporters] = useState([]);
//   const [topBuyers, setTopBuyers] = useState([]);
//   const [portWiseExports, setPortWiseExports] = useState([]);
//   const [recentShipments, setRecentShipments] = useState([]);
//   // ==========================================
//   // 2. STATE MANAGEMENT FOR DYNAMIC FILTERS
//   // ==========================================
//   const [searchQuery, setSearchQuery] = useState("");
//   const [tradeTrendResult, setTradeTrendResult] = useState(null);
//   const [tradeTrendLoading, setTradeTrendLoading] = useState(false);
//   const [tradeTrendError, setTradeTrendError] = useState("");

//   const runTradeTrendSearch = async () => {
//     const query = searchQuery.trim();
//     if (!query) {
//       setTradeTrendError("Enter an HS code or product to search trade trends.");
//       setTradeTrendResult(null);
//       return;
//     }

//     setTradeTrendLoading(true);
//     setTradeTrendError("");
//     try {
//       const params = {
//         hs_code: query,
//         country: selectedCountry === "All Countries" ? "" : selectedCountry,
//         trade_type: "export",
//         year: getCurrentFinancialYear(),
//         values_in: "crore",
//       };
//       const response = await getCommodityCountryTrend(params);
//       setTradeTrendResult(response?.data?.data ?? response?.data ?? null);
//     } catch (err) {
//       setTradeTrendResult(null);
//       setTradeTrendError(
//         err?.response?.data?.detail ||
//         err?.response?.data?.message ||
//         err.message ||
//         "Trade trend search failed."
//       );
//     } finally {
//       setTradeTrendLoading(false);
//     }
//   };

//   const [selectedPort, setSelectedPort] = useState("All Ports");
//   const [selectedCountry, setSelectedCountry] = useState("All Countries");
//   const [selectedExporter, setSelectedExporter] = useState("All Exporters");
//   const [selectedBuyer, setSelectedBuyer] = useState("All Buyers");
//    const [shipmentStartDate, setShipmentStartDate] = useState(null);
//     const [shipmentEndDate, setShipmentEndDate] = useState(null);
//      const [dateRange, setDateRange] = useState(false)
//      const [exportReport, setExportReport] = useState(false)

//   const fetchDashboard = async () => {
//     try {
//       const res = await getDashboard();
//       setDashboard(res.data.data || {});
//     } catch (err) {
//         console.error(err);
//       }
//   };

//   const fetchFilterOptions = async () => {
//     try {
//       const res = await getFilterOptions();
//       setFilterOptions(res.data.data || {});
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   const fetchExportTrend = async () => {
//     try {
//       const res = await getExportTrend();
//       setExportTrend(res.data.data || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   const fetchCountryDistribution = async () => {
//     try {
//       const res = await getCountryDistribution();
//       setCountryDistribution(res.data.data || []);
//       setCountryTotalValue(res.data.totalValue || 0);
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   const fetchTopProducts = async () => {
//     try {
//       const res = await getTopProducts();
//       setTopProducts(res.data.data || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   const fetchTopExporters = async () => {
//     try {
//       const res = await getTopExporters();
//       setTopExporters(res.data.data || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   const fetchTopBuyers = async () => {
//     try {
//       const res = await getTopBuyers();
//       setTopBuyers(res.data.data || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   const fetchPortWiseExports = async () => {
//     try {
//       const res = await getPortWiseExports();
//       setPortWiseExports(res.data.data || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   const fetchRecentShipments = async () => {
//     try {
//       const res = await getRecentShipments();
//       setRecentShipments(res.data.data || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };
  
//   useEffect(() => {
//     fetchDashboard();
//     fetchFilterOptions();
//     fetchExportTrend();
//     fetchCountryDistribution();
//     fetchTopProducts();
//     fetchTopExporters();
//     fetchTopBuyers();
//     fetchPortWiseExports();
//     fetchRecentShipments();
//   }, []);
  
//   // Filter application triggers state
//   const [appliedFilters, setAppliedFilters] = useState({
//     search: "", port: "All Ports", country: "All Countries", exporter: "All Exporters", buyer: "All Buyers"
//   });

//   const handleApplyFilters = () => {
//     setAppliedFilters({
//       search: searchQuery,
//       port: selectedPort,
//       country: selectedCountry,
//       exporter: selectedExporter,
//       buyer: selectedBuyer
//     });
//   };

//   const handleResetFilters = () => {
//     setSearchQuery(""); setSelectedPort("All Ports"); setSelectedCountry("All Countries");
//     setSelectedExporter("All Exporters"); setSelectedBuyer("All Buyers");
//     setAppliedFilters({ search: "", port: "All Ports", country: "All Countries", exporter: "All Exporters", buyer: "All Buyers" });
//   };

//   const INITIAL_STATS = [
//     { title: "Total Export Shipments", value: dashboard.totalExportShipments || 0, change: "", icon: Package, color: "text-blue-500", bg: "bg-blue-50", isUp: true },
//     { title: "Total Export Value (INR)", value: `₹${(tradeTrendResult?.rows?.find((row) => row.metric === "Values in ₹ Crore")?.values?.[tradeTrendResult?.years?.[tradeTrendResult.years.length - 1]] ?? ((dashboard.totalExportValue || 0) / 10000000)).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Cr`, change: tradeTrendResult?.years?.[tradeTrendResult.years.length - 1] || "", icon: IndianRupee, color: "text-green-500", bg: "bg-green-50", isUp: true },
//     { title: "Total Exporters", value: dashboard.totalExporters || 0, change: "", icon: Users, color: "text-cyan-500", bg: "bg-cyan-50", isUp: true },
//    { title: "Countries of Origin", value: dashboard.countries || 0, change: "", icon: Globe, color: "text-purple-500", bg: "bg-purple-50", isUp: true },
//     { title: "Avg. Shipment Value (INR)", value: `₹${((dashboard.avgShipmentValue || 0) / 100000).toFixed(2)} L`, change: "", icon: IndianRupee, color: "text-orange-500", bg: "bg-orange-50", isUp: false },
//       ];
//   // ==========================================
//   // 3. MEMOIZED FILTERING LOGIC
//   // ==========================================
//  const filteredShipments = useMemo(() => {
//   return recentShipments.filter((ship) => {
//     const matchSearch =
//       ship.cargo?.productName
//         ?.toLowerCase()
//         .includes(appliedFilters.search.toLowerCase()) ||
//       ship.cargo?.hsCode?.hsCode
//         ?.toString()
//         .includes(appliedFilters.search);

//     const matchPort =
//       appliedFilters.port === "All Ports" ||
//       ship.route?.originCity === appliedFilters.port;

//     const matchCountry =
//       appliedFilters.country === "All Countries" ||
//       ship.route?.destinationCountry === appliedFilters.country;

//     const matchExporter =
//       appliedFilters.exporter === "All Exporters" ||
//       ship.exporter?.companyName === appliedFilters.exporter;

//     const matchBuyer =
//       appliedFilters.buyer === "All Buyers" ||
//       ship.buyer?.companyName === appliedFilters.buyer;

//     return (
//       matchSearch &&
//       matchPort &&
//       matchCountry &&
//       matchExporter &&
//       matchBuyer
//     );
//   });
// }, [recentShipments, appliedFilters]);

//   const dynamicPieData = useMemo(() => {
//     const colors=["#2563EB","#10B981","#8B5CF6","#F59E0B","#6366F1","#94A3B8","#EC4899"];
//     let data=countryDistribution.map((item,index)=>({
//       name:item.country,
//       value:item.value,
//       percent:item.percentage+"%",
//       color:colors[index%colors.length]
//     }));
//     if(appliedFilters.country!=="All Countries"){
//       data=data.filter(item=>item.name===appliedFilters.country);
//     }
//     return data;
//   },[countryDistribution, appliedFilters.country]);
  
//   const computedTotalValue=useMemo(()=>{
//     if(appliedFilters.country==="All Countries"){
//       return `₹ ${(countryTotalValue/10000000).toFixed(2)} Cr`;
//     }
//     const match=dynamicPieData.find(item=>item.name===appliedFilters.country);
//     if(!match) return "₹0.00 Cr";
//     return `₹ ${(match.value/10000000).toFixed(2)} Cr`;
//   },[dynamicPieData, countryTotalValue, appliedFilters.country]);
  
//   const lineChartData = useMemo(() => {
//     return exportTrend.map(item => ({
//       date: new Date(item._id).toLocaleDateString("en-GB", {
//         day: "2-digit",month: "short"
//       }),
//       value: Number((item.totalValue / 10000000).toFixed(2)),
//       shipments: item.shipments
//     }));
//   }, [exportTrend]);

//   const totalExportValue = useMemo(() => {
//     return lineChartData.reduce((sum, item) => sum + item.value, 0);
//   }, [lineChartData]);

//   const totalShipments = useMemo(() => {
//     return lineChartData.reduce((sum, item) => sum + item.shipments, 0);
//   }, [lineChartData]);

//   // Live trade-statistics series returned by /tradestat/commodity-country-trend.
//   const liveTradeTrend = useMemo(() => {
//     if (!tradeTrendResult || typeof tradeTrendResult !== "object") {
//       return { chartData: [], latestValue: null, latestYear: null };
//     }
//     const years = Array.isArray(tradeTrendResult.years)
//       ? tradeTrendResult.years
//       : Object.keys(
//           tradeTrendResult.rows?.find((row) => row.metric === "Values in ₹ Crore")?.values || {}
//         );
//     const valueRow = tradeTrendResult.rows?.find(
//       (row) => row.metric === "Values in ₹ Crore"
//     );
//     const chartData = years.map((year) => ({
//       year,
//       value: Number(valueRow?.values?.[year] ?? 0),
//     })).filter((point) => Number.isFinite(point.value));
//     const latestYear = years.length ? years[years.length - 1] : null;
//     const latestValue = latestYear && valueRow?.values?.[latestYear] != null
//       ? Number(valueRow.values[latestYear])
//       : null;
//     return { chartData, latestValue, latestYear };
//   }, [tradeTrendResult]);

//   const displayedExportValue = liveTradeTrend.latestValue ?? totalExportValue;

//   return (
//     <div className="min-h-screen  overflow-y-auto bg-[#f8fafc] p-6 text-slate-700 antialiased  flex flex-col justify-between pt-14">
//       <div>
//         {/* HEADER */}
//         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
//           <div>
//             <h1 className="text-2xl font-bold text-[#1e293b]">Export Intelligence</h1>
//             <p className="text-sm text-slate-400 mt-0.5">
//               Discover export performance, markets, buyers, and opportunities.
//             </p>
//           </div>
//                 <div className="flex gap-3"> 
//                <div className="relative flex-1 ">
//                       <DatePicker
//                         selected={shipmentStartDate}
//                         onChange={(dates) => {
//                           const [start, end] = dates;
//                           setShipmentStartDate(start);
//                           setShipmentEndDate(end);
//                         }}
//                         startDate={shipmentStartDate}
//                         endDate={shipmentEndDate}
//                         selectsRange
//                         dateFormat="dd MMM yyyy"
//                         placeholderText="01 Apr 2025 - 24 Apr 2025"
//                         className={`bg-white border border-slate-200 text-[11px] sm:text-xs font-semibold pl-3 pr-9 py-2 rounded-xl shadow-xs hover:bg-slate-50 transition whitespace-nowrap outline-none cursor-pointer ${HEADING}`}
//                       />
//                       <CalendarDays
//                         size={14}
//                         className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
//                       />
//                     </div>
//                     <button onClick={() => setExportReport(true)} className={`flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-slate-200 text-[11px] sm:text-xs font-semibold px-3 sm:px-4 py-2 rounded-xl shadow-xs hover:bg-slate-50 transition whitespace-nowrap ${HEADING}`}>
//                       <Download size={14} className="text-slate-400" />
//                       Export Report
//                     </button> </div>
//         </div>

//         {/* METRICS STATS GRID */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
//           {INITIAL_STATS.map((item, index) => {
//             const Icon = item.icon;
//             return (
//               <div key={index} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col justify-between">
//                 <div className="flex justify-between items-start">
//                   <span className="text-[13px] font-medium text-slate-600 leading-tight block max-w-[85%]">
//                     {item.title}
//                   </span>
//                   <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${item.bg} ${item.color}`}>
//                     <Icon size={18} />
//                   </div>
//                 </div>
//                 <div className="mt-3">
//                   <h3 className="font-bold text-lg text-slate-800 tracking-tight">{item.value}</h3>
//                   <span className={`text-[10px] font-medium block mt-0.5 ${item.isUp ? "text-green-500" : "text-red-500"}`}>
//                     {item.change}
//                   </span>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* TRADE TREND SEARCH */}
//         <div className="bg-white border border-slate-100 rounded-2xl p-3 shadow-sm mb-6">
//           <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(140px,0.8fr)_auto] gap-3 items-center">
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onKeyDown={(e) => { if (e.key === "Enter") { handleApplyFilters(); runTradeTrendSearch(); } }}
//               placeholder="Search HS Code or Product"
//               aria-label="HS Code or Product"
//               className="w-full min-w-0 bg-white border border-slate-200 rounded-xl py-2.5 px-3 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//             />
//             <div className="relative min-w-0">
//               <select
//                 value={selectedCountry}
//                 onChange={(e) => setSelectedCountry(e.target.value)}
//                 aria-label="Country"
//                 className="w-full appearance-none bg-white border border-slate-200 rounded-xl py-2.5 pl-3 pr-9 text-xs text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//               >
//                 <option value="All Countries">All Countries</option>
//                 {((filterOptions.countries?.length ? filterOptions.countries : countryDistribution.map((item) => item.country)) || []).filter(Boolean).map((country, index) => (
//                   <option key={`${country}-${index}`} value={country}>{country}</option>
//                 ))}
//               </select>
//               <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
//             </div>
//             <button
//               type="button"
//               onClick={() => { handleApplyFilters(); runTradeTrendSearch(); }}
//               disabled={tradeTrendLoading}
//               className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2.5 px-4 transition disabled:opacity-60"
//             >
//               {tradeTrendLoading ? "Searching..." : "Search"}
//             </button>
//             <button
//               type="button"
//               onClick={() => { handleResetFilters(); setTradeTrendResult(null); setTradeTrendError(""); }}
//               className="rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-slate-700 hover:bg-slate-50 font-medium text-xs py-2.5 px-4 transition"
//             >
//               Reset
//             </button>
//           </div>
//           {tradeTrendError && <p role="alert" className="mt-3 text-xs text-red-600">{tradeTrendError}</p>}
//           {tradeTrendLoading && <p className="mt-3 text-xs text-slate-500">Fetching live export trade trends...</p>}
//         </div>

//         {tradeTrendResult && (
//           <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm mb-6">
//             <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
//               <div>
//                 <h3 className="text-sm font-bold text-slate-800">Live Export Trade Trend</h3>
//                 <p className="text-xs text-slate-500 mt-1">
//                   HS Code / Product: {searchQuery.trim()} · Country: {selectedCountry === "All Countries" ? "All Countries" : selectedCountry} · FY {getCurrentFinancialYear()} · Values in ₹ Crore
//                 </p>
//               </div>
//               <span className="rounded-full bg-emerald-50 text-emerald-700 px-2.5 py-1 text-[10px] font-semibold">Live API data</span>
//             </div>
//             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
//               {(tradeTrendResult.years || []).map((year) => {
//                 const row = tradeTrendResult.rows?.find((item) => item.metric === "Values in ₹ Crore");
//                 return (
//                   <div key={year} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
//                     <p className="text-[10px] text-slate-500">{year}</p>
//                     <p className="mt-1 text-sm font-bold text-slate-800">
//                       {row?.values?.[year] == null ? "—" : `₹${Number(row.values[year]).toLocaleString("en-IN", { maximumFractionDigits: 2 })} Cr`}
//                     </p>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}

//         {/* CHARTS LAYER */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          
//           {/* TOP EXPORTED PRODUCTS */}
//           <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex flex-col justify-between">
//             <div>
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="font-bold text-sm text-slate-800">Top Exported Products</h3>
//                 {/* <button className="text-blue-600 text-xs font-semibold">View All</button> */}
//               </div>
//               <div className="space-y-3">
//                 {topProducts.map((prod, i) => (
//                   <div key={i} className="text-xs">
//                     <div className="flex justify-between items-start text-slate-600 mb-1.5 gap-2">
//                       <span className="font-medium text-slate-400 shrink-0">{prod.hsCode}</span>
//                       <span className="truncate flex-1 font-medium text-slate-700">{prod.productName}</span>
//                       <span className="font-semibold text-slate-800 shrink-0">₹ {(prod.value / 10000000).toFixed(2)} Cr</span>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
//                         <div className="bg-blue-500 h-full rounded-full ${prod.barWidth" style={{ width: `${prod.share}%` }}/>
//                       </div>
//                       <span className="text-[10px] text-slate-400 font-medium shrink-0 w-8 text-right">{prod.share}%</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
            
//           </div>

//           {/* EXPORT VALUE TREND */}
//           <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
//             <div className="flex justify-between items-center mb-2">
//               <h3 className="font-bold text-sm text-slate-800">Export Value Trend (INR)</h3>
//               <span className="text-[10px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100 font-medium">{liveTradeTrend.latestYear || "Live trend"}</span>
//             </div>
//             <div className="mb-4">
//               <span className="text-xl font-bold text-slate-800">₹{displayedExportValue.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Cr</span>
//               {liveTradeTrend.latestYear && <span className="text-xs text-slate-500 font-medium ml-2">{liveTradeTrend.latestYear}</span>}
//             </div>
//             <div className="h-[150px] w-full">
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={liveTradeTrend.chartData.length ? liveTradeTrend.chartData : lineChartData}>
//                   <XAxis dataKey={liveTradeTrend.chartData.length ? "year" : "date"} tick={{ fill: '#94a3b8', fontSize: 10 }} tickLine={false} axisLine={false} />
//                   <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} tickLine={false} axisLine={false} width={42} />
//                   <Tooltip formatter={(value) => [`₹${Number(value).toLocaleString("en-IN", { maximumFractionDigits: 2 })} Cr`, "Export Value"]} />
//                   <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2.5} dot={{ fill: '#10B981', r: 3 }} connectNulls />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//             <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-slate-50 text-center">
//               <div className="bg-slate-50/70 p-2 rounded-xl border border-slate-100">
//                 <span className="text-[10px] text-slate-400 font-medium block">Export Value (INR)</span>
//                 <span className="text-xs font-bold text-slate-700"> ₹{displayedExportValue.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Cr</span>
//               </div>
//               <div className="bg-slate-50/70 p-2 rounded-xl border border-slate-100">
//                 <span className="text-[10px] text-slate-400 font-medium block">Export Shipments</span>
//                 <span className="text-xs font-bold text-slate-700">{totalShipments}</span>
//               </div>
//             </div>
//           </div>

//           {/* EXPORTS BY COUNTRY OF DESTINATION */}
//           <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex flex-col justify-between">
//             <div>
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="font-bold text-sm text-slate-800">Exports by Country of Destination</h3>
//                 {/*<button className="text-blue-600 text-xs font-semibold">View All</button>*/}
//               </div>
//               <div className="flex items-center justify-between gap-2">
//                 <div className="relative w-[120px] h-[120px] shrink-0">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <PieChart>
//                       <Pie data={dynamicPieData} innerRadius={40} outerRadius={55} dataKey="value" stroke="none">
//                         {dynamicPieData.map((item, index) => <Cell key={index} fill={item.color} />)}
//                       </Pie>
//                     </PieChart>
//                   </ResponsiveContainer>
//                   <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
//                     <span className="text-[8px] uppercase text-slate-400 font-semibold">Total Value</span>
//                     <span className="font-bold text-[11px] text-slate-800 leading-none mt-0.5">{computedTotalValue}</span>
//                   </div>
//                 </div>
//                 <div className="flex-1 space-y-1 pl-2 max-h-[130px] overflow-y-auto">
//                   {dynamicPieData.slice(0, 6).map((country, idx) => (
//                     <div key={idx} className="flex items-center justify-between text-[11px]">
//                       <div className="flex items-center gap-1.5 truncate">
//                         <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: country.color }} />
//                         <span className="text-slate-600 font-medium truncate">{country.name}</span>
//                       </div>
//                       <span className="text-slate-500 font-semibold ml-1">₹ {(country.value/10000000).toFixed(2)} Cr</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
           
//           </div>
//         </div>

//         {/* DATA TABLE LAYER */}
//         <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm overflow-hidden">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="font-bold text-sm text-slate-800">Recent Export Shipments</h3>
//             {/*<span className="text-xs text-blue-600 font-semibold cursor-pointer hover:underline">Filter</span>*/}
//           </div>

//           <div className="overflow-x-auto -mx-5">
//             <div className="inline-block min-w-full align-middle px-5">
//               <table className="min-w-full divide-y divide-slate-100 text-xs">
//                 <thead>
//                   <tr className="text-left text-slate-400 font-semibold border-b border-slate-100">
//                     <th className="pb-3 font-medium">Shipment ID</th>
//                     <th className="pb-3 font-medium">HS Code</th>
//                     <th className="pb-3 font-medium">Product Description</th>
//                     <th className="pb-3 font-medium">Exporter</th>
//                     <th className="pb-3 font-medium">Buyer</th>
//                     <th className="pb-3 font-medium">Destination Country</th>
//                     <th className="pb-3 font-medium">Port of Exit</th>
//                     <th className="pb-3 font-medium">Ship Date</th>
//                     <th className="pb-3 font-medium">Value (INR)</th>
//                     <th className="pb-3 font-medium text-center">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-slate-50 text-slate-600 font-medium">
//                   {filteredShipments.length > 0 ? (
//                     filteredShipments.map((ship, idx) => (
//                       <tr key={ship._id} className="hover:bg-slate-50/80 transition">
//                         <td className="py-3.5 text-blue-600 font-semibold">{ship.sbNumber}</td>
//                         <td className="py-3.5 text-slate-400 font-bold">{ship.cargo?.hsCode?.hsCode || "-"}</td>
//                         <td className="py-3.5 max-w-[180px] truncate font-semibold text-slate-700"> {ship.cargo?.productName}</td>
//                         <td className="py-3.5 truncate text-slate-500">{ship.exporter?.companyName}</td>
//                         <td className="py-3.5 truncate text-slate-500">{ship.buyer?.companyName}</td>
//                         <td className="py-3.5 text-slate-700">{ship.route?.destinationCountry}</td>
//                         <td className="py-3.5 text-slate-500">{ship.route?.originCity || "-"}</td>
//                         <td className="py-3.5 text-slate-400 whitespace-nowrap">{new Date(ship.shipmentDate).toLocaleDateString("en-GB", {day: "2-digit", month: "short", year: "numeric",})}</td>
//                         <td className="py-3.5 font-bold text-slate-800">₹ {ship.cargo?.value?.toFixed(2)}</td>
//                         <td className="py-3.5 text-center">
//                           <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
//                             ship.status === "Delivered" ? "bg-green-100 text-green-700" :
//                             ship.status === "In Transit" ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700"
//                           }`}>{ship.shipmentStatus}</span>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="10" className="py-8 text-center text-slate-400 font-medium">
//                         No matching export records found.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//           <div className="text-center mt-4 pt-3 border-t border-slate-50">
//             <button onClick={() => setMainTab && setMainTab("Shipments")} className="text-blue-600 hover:text-blue-700 text-xs font-semibold">
//               View All Shipments →
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* FOOTER TIMESTAMPS BAR */}
//       <div className="mt-6 pt-4 mb-10 border-t border-slate-200/60 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-2">
//         <div className="flex items-center gap-1.5">
//           <Clock size={14} className="text-slate-300" />
//           <span>All data is updated daily. Last updated on 24 Apr 2025, 09:30 AM</span>
//         </div>
//         <div className="flex items-center gap-1 cursor-pointer hover:text-slate-500">
//           <HelpCircle size={14} className="text-slate-300" />
//           <span>Help Center</span>
//         </div>
//       </div>

//        {exportReport && (
//                         <ExportReport onClose={() => setExportReport(false)} />
//                       )}

//     </div>
//   );
// }


import React, { useState, useMemo, useEffect } from "react";
import {
  getDashboard,
  getFilterOptions,
  getExportTrend,
  getCountryDistribution,
  getTopProducts,
  getTopBuyers,
  getTopExporters,
  getPortWiseExports,
  getRecentShipments
} from '../../api/ExportIntelApi';
import DatePicker from "react-datepicker";
import { getExportIntelligence } from '../../api/CargoMateApi';
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
  HelpCircle,
  Clock,
} from "lucide-react";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const HEADING = "text-[#07156B]";
// ==========================================
// 1. RAW EXPORT DATA (Image {B06B6444-DD0A-4D01-9B45-F1AF036CA639}.png के अनुसार)
// ==========================================

/*const INITIAL_PRODUCTS = [
  { hsCode: "85", desc: "Electrical Machinery & Equipment", shipments: "1,985", value: 412.35, share: "21.0%", barWidth: "w-[21%]" },
  { hsCode: "84", desc: "Machinery & Mechanical Appliances", shipments: "1,542", value: 352.80, share: "18.1%", barWidth: "w-[18.1%]" },
  { hsCode: "90", desc: "Optical, Medical & Precision Instruments", shipments: "895", value: 231.40, share: "11.7%", barWidth: "w-[11.7%]" },
  { hsCode: "72", desc: "Iron & Steel", shipments: "724", value: 165.70, share: "8.5%", barWidth: "w-[8.5%]" },
  { hsCode: "39", desc: "Plastics & Articles", shipments: "628", value: 128.90, share: "6.5%", barWidth: "w-[6.5%]" },
];

const INITIAL_LINE_DATA = [
  { date: "01 Apr", value: 600 }, { date: "06 Apr", value: 850 }, { date: "11 Apr", value: 780 },
  { date: "16 Apr", value: 1100 }, { date: "21 Apr", value: 1020 }, { date: "24 Apr", value: 1245 },
];

const INITIAL_PIE_DATA = [
  { name: "USA", value: 512.35, percent: "27.3%", color: "#2563EB" },
  { name: "UAE", value: 302.80, percent: "16.1%", color: "#10B981" },
  { name: "China", value: 268.40, percent: "14.3%", color: "#8B5CF6" },
  { name: "Germany", value: 208.40, percent: "10.3%", color: "#F59E0B" },
  { name: "Bangladesh", value: 268.40, percent: "14.3%", color: "#6366F1" },
  { name: "Netherland", value: 268.40, percent: "14.3%", color: "#94A3B8" },
  { name: "Other", value: 268.40, percent: "14.3%", color: "#EC4899" },
];

const INITIAL_EXPORTERS = [
  { name: "ABC Trading Co. Ltd.", shipments: "845", value: "₹125.40 Cr", growth: "▲ 18.9%", isUp: true, country: "USA" },
  { name: "Global Industrial Inc.", shipments: "712", value: "₹96.75 Cr", growth: "▲ 15.2%", isUp: true, country: "UAE" },
  { name: "Omega Supplies", shipments: "588", value: "₹76.30 Cr", growth: "▲ 11.4%", isUp: true, country: "China" },
  { name: "Prime Exports Ltd.", shipments: "502", value: "₹64.20 Cr", growth: "▲ 9.8%", isUp: true, country: "Germany" },
];

const INITIAL_BUYERS = [
  { name: "ABC Imports Pvt. Ltd.", shipments: "1,245", value: "₹152.45 Cr", growth: "▲ 18.9%", isUp: true, country: "USA" },
  { name: "Global Enterprises", shipments: "1,021", value: "₹128.75 Cr", growth: "▲ 15.2%", isUp: true, country: "UAE" },
  { name: "Omega Traders", shipments: "812", value: "₹98.60 Cr", growth: "▲ 11.4%", isUp: true, country: "China" },
  { name: "Shree Impex", shipments: "708", value: "₹86.20 Cr", growth: "▲ 9.8%", isUp: true, country: "Germany" },
];

const INITIAL_PORTS = [
  { name: "Nhava Sheva (Mumbai)", shipments: "2,856", value: "₹412.40 Cr", share: "33.1%" },
  { name: "Mundra (Gujarat)", shipments: "1,745", value: "₹286.40 Cr", share: "23.0%" },
  { name: "Chennai", shipments: "1,256", value: "₹181.20 Cr", share: "14.5%" },
  { name: "Kolkata", shipments: "986", value: "₹134.80 Cr", share: "10.8%" },
];

const INITIAL_SHIPMENTS = [
  { id: "EXP-2025-2045", hsCode: "85", desc: "Electrical Machinery & Equipment", exporter: "ABC Exports Pvt. Ltd.", buyer: "Global Retail Inc.", country: "USA", port: "Nhava Sheva", date: "24 Apr 2025", value: "₹ 45.80 Cr", status: "DELIVERED" },
  { id: "EXP-2025-2044", hsCode: "84", desc: "Machinery & Mechanical Appliances", exporter: "Global Trade Solutions", buyer: "TechMart USA", country: "UAE", port: "Mundra", date: "23 Apr 2025", value: "₹ 38.75 Cr", status: "DELIVERED" },
  { id: "EXP-2025-2043", hsCode: "90", desc: "Optical, Medical & Precision Instruments", exporter: "Prime Exports Ltd.", buyer: "Mega Traders LLC", country: "Germany", port: "Chennai", date: "22 Apr 2025", value: "₹ 28.30 Cr", status: "IN TRANSIT" },
  { id: "EXP-2025-2042", hsCode: "72", desc: "Iron & Steel", exporter: "Shree Exports", buyer: "Euro International GmbH", country: "China", port: "Nhava Sheva", date: "21 Apr 2025", value: "₹ 18.90 Cr", status: "DELIVERED" },
  { id: "EXP-2025-2041", hsCode: "39", desc: "Plastics & Articles", exporter: "Omega Exports Pvt. Ltd.", buyer: "Oceanic Distributors", country: "Bangladesh", port: "Kolkata", date: "20 Apr 2025", value: "₹ 16.20 Cr", status: "PENDING" },
];*/

const getCurrentFinancialYear = (date = new Date()) => {
  const year = date.getFullYear();
  const startYear = date.getMonth() >= 3 ? year : year - 1;
  return `${startYear}-${startYear + 1}`;
};

const unwrapTradeResponse = (response) =>
  response?.data?.data?.query ? response.data.data
    : response?.data?.query ? response.data
    : response?.data?.data ?? response?.data ?? null;

export default function ExportIntelligenceDashboard({setMainTab}) {

  const [dashboard, setDashboard] = useState({});
  const [filterOptions, setFilterOptions] = useState({});
  const [exportTrend, setExportTrend] = useState([]);
  const [countryDistribution, setCountryDistribution] = useState([]);
  const [countryTotalValue,setCountryTotalValue]=useState(0);
  const [topProducts, setTopProducts] = useState([]);
  const [topExporters, setTopExporters] = useState([]);
  const [topBuyers, setTopBuyers] = useState([]);
  const [portWiseExports, setPortWiseExports] = useState([]);
  const [recentShipments, setRecentShipments] = useState([]);
  // ==========================================
  // 2. STATE MANAGEMENT FOR DYNAMIC FILTERS
  // ==========================================
  const [searchQuery, setSearchQuery] = useState("");
  const [topN, setTopN] = useState(10);
  const [tradeTrendResult, setTradeTrendResult] = useState(null);
  const [tradeTrendLoading, setTradeTrendLoading] = useState(false);
  const [tradeTrendError, setTradeTrendError] = useState("");

  const runTradeTrendSearch = async () => {
    const hsCode = searchQuery.trim();
    if (!hsCode) {
      setTradeTrendError("Enter an HS code to search export intelligence.");
      setTradeTrendResult(null);
      return;
    }

    setTradeTrendLoading(true);
    setTradeTrendError("");
    try {
      const params = {
        hs_code: hsCode,
        year: getCurrentFinancialYear(shipmentStartDate || new Date()),
        top_n: Math.max(1, Number(topN) || 10),
        include_trend: true,
        values_in: "₹ Crore",
      };
      const response = await getExportIntelligence(params);
      setTradeTrendResult(unwrapTradeResponse(response));
    } catch (err) {
      setTradeTrendResult(null);
      setTradeTrendError(
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        err.message ||
        "Export intelligence search failed."
      );
    } finally {
      setTradeTrendLoading(false);
    }
  };


  const [selectedPort, setSelectedPort] = useState("All Ports");
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [selectedExporter, setSelectedExporter] = useState("All Exporters");
  const [selectedBuyer, setSelectedBuyer] = useState("All Buyers");
   const [shipmentStartDate, setShipmentStartDate] = useState(null);
    const [shipmentEndDate, setShipmentEndDate] = useState(null);
     const [dateRange, setDateRange] = useState(false)
     const [exportReport, setExportReport] = useState(false)

  const fetchDashboard = async () => {
    try {
      const res = await getDashboard();
      setDashboard(res.data.data || {});
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
  const fetchExportTrend = async () => {
    try {
      const res = await getExportTrend();
      setExportTrend(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchCountryDistribution = async () => {
    try {
      const res = await getCountryDistribution();
      setCountryDistribution(res.data.data || []);
      setCountryTotalValue(res.data.totalValue || 0);
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
  const fetchTopExporters = async () => {
    try {
      const res = await getTopExporters();
      setTopExporters(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchTopBuyers = async () => {
    try {
      const res = await getTopBuyers();
      setTopBuyers(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchPortWiseExports = async () => {
    try {
      const res = await getPortWiseExports();
      setPortWiseExports(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchRecentShipments = async () => {
    try {
      const res = await getRecentShipments();
      setRecentShipments(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };
  
  useEffect(() => {
    fetchDashboard();
    fetchFilterOptions();
    fetchExportTrend();
    fetchCountryDistribution();
    fetchTopProducts();
    fetchTopExporters();
    fetchTopBuyers();
    fetchPortWiseExports();
    fetchRecentShipments();
  }, []);
  
  // Filter application triggers state
  const [appliedFilters, setAppliedFilters] = useState({
    search: "", port: "All Ports", country: "All Countries", exporter: "All Exporters", buyer: "All Buyers"
  });

  const handleApplyFilters = () => {
    setAppliedFilters({
      search: searchQuery,
      port: selectedPort,
      country: selectedCountry,
      exporter: selectedExporter,
      buyer: selectedBuyer
    });
  };

  const handleResetFilters = () => {
    setSearchQuery(""); setSelectedPort("All Ports"); setSelectedCountry("All Countries");
    setSelectedExporter("All Exporters"); setSelectedBuyer("All Buyers");
    setAppliedFilters({ search: "", port: "All Ports", country: "All Countries", exporter: "All Exporters", buyer: "All Buyers" });
  };

  const INITIAL_STATS = [
    { title: "Total Export Shipments", value: tradeTrendResult?.summary?.total_export_shipments ?? dashboard.totalExportShipments ?? 0, change: "", icon: Package, color: "text-blue-500", bg: "bg-blue-50", isUp: true },
    { title: "Total Export Value (INR)", value: `₹${Number(tradeTrendResult?.summary?.total_export_value ?? (dashboard.totalExportValue || 0) / 10000000).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Cr`, change: tradeTrendResult?.summary?.growth_pct == null ? "" : `${tradeTrendResult.summary.growth_pct}%`, icon: IndianRupee, color: "text-green-500", bg: "bg-green-50", isUp: true },
    { title: "Total Exporters", value: dashboard.totalExporters || 0, change: "", icon: Users, color: "text-cyan-500", bg: "bg-cyan-50", isUp: true },
   { title: "Countries of Destination", value: tradeTrendResult?.summary?.countries_of_destination ?? dashboard.countries ?? 0, change: "", icon: Globe, color: "text-purple-500", bg: "bg-purple-50", isUp: true },
    { title: "Avg. Shipment Value (INR)", value: `₹${((dashboard.avgShipmentValue || 0) / 100000).toFixed(2)} L`, change: "", icon: IndianRupee, color: "text-orange-500", bg: "bg-orange-50", isUp: false },
      ];
  // ==========================================
  // 3. MEMOIZED FILTERING LOGIC
  // ==========================================
 const filteredShipments = useMemo(() => {
  return recentShipments.filter((ship) => {
    const matchSearch =
      ship.cargo?.productName
        ?.toLowerCase()
        .includes(appliedFilters.search.toLowerCase()) ||
      ship.cargo?.hsCode?.hsCode
        ?.toString()
        .includes(appliedFilters.search);

    const matchPort =
      appliedFilters.port === "All Ports" ||
      ship.route?.originCity === appliedFilters.port;

    const matchCountry =
      appliedFilters.country === "All Countries" ||
      ship.route?.destinationCountry === appliedFilters.country;

    const matchExporter =
      appliedFilters.exporter === "All Exporters" ||
      ship.exporter?.companyName === appliedFilters.exporter;

    const matchBuyer =
      appliedFilters.buyer === "All Buyers" ||
      ship.buyer?.companyName === appliedFilters.buyer;

    return (
      matchSearch &&
      matchPort &&
      matchCountry &&
      matchExporter &&
      matchBuyer
    );
  });
}, [recentShipments, appliedFilters]);

  const dynamicPieData = useMemo(() => {
    const source = Array.isArray(tradeTrendResult?.exports_by_country)
      ? tradeTrendResult.exports_by_country : countryDistribution;
    const colors=["#2563EB","#10B981","#8B5CF6","#F59E0B","#6366F1","#94A3B8","#EC4899"];
    return source.map((item,index)=>({
      name: item.country ?? item.name ?? "Unknown",
      value: Number(item.value ?? 0),
      percent: `${Number(item.share_pct ?? item.percentage ?? 0).toFixed(2)}%`,
      color: colors[index % colors.length],
    })).filter((item)=>Number.isFinite(item.value));
  },[tradeTrendResult, countryDistribution]);

  const computedTotalValue=useMemo(()=>{
    if(appliedFilters.country==="All Countries"){
      return `₹ ${Number(tradeTrendResult?.summary?.total_export_value ?? (countryTotalValue/10000000)).toFixed(2)} Cr`;
    }
    const match=dynamicPieData.find(item=>item.name===appliedFilters.country);
    if(!match) return "₹0.00 Cr";
    return `₹ ${Number(match.value).toFixed(2)} Cr`;
  },[dynamicPieData, countryTotalValue, appliedFilters.country]);
  
  const lineChartData = useMemo(() => {
    return exportTrend.map(item => ({
      date: new Date(item._id).toLocaleDateString("en-GB", {
        day: "2-digit",month: "short"
      }),
      value: Number((item.totalValue / 10000000).toFixed(2)),
      shipments: item.shipments
    }));
  }, [exportTrend]);

  const totalExportValue = useMemo(() => {
    return lineChartData.reduce((sum, item) => sum + item.value, 0);
  }, [lineChartData]);

  const totalShipments = useMemo(() => {
    return lineChartData.reduce((sum, item) => sum + item.shipments, 0);
  }, [lineChartData]);

  // Live series returned by /export-intelligence.
  const liveTradeTrend = useMemo(() => {
    const points = tradeTrendResult?.value_trend?.points;
    const chartData = Array.isArray(points) ? points.map((point) => ({
      year: point.year,
      value: Number(point.value ?? 0),
    })).filter((point) => Number.isFinite(point.value)) : [];
    const latest = chartData[chartData.length - 1];
    return {
      chartData,
      latestValue: Number(latest?.value ?? tradeTrendResult?.summary?.total_export_value ?? 0),
      latestYear: latest?.year ?? tradeTrendResult?.summary?.current_year ?? tradeTrendResult?.query?.year ?? null,
    };
  }, [tradeTrendResult]);

  const displayedExportValue = Number(liveTradeTrend.latestValue ?? totalExportValue);

  return (
    <div className="min-h-screen  overflow-y-auto bg-[#f8fafc] p-6 text-slate-700 antialiased  flex flex-col justify-between pt-14">
      <div>
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#1e293b]">Export Intelligence</h1>
            <p className="text-sm text-slate-400 mt-0.5">
              Discover export performance, markets, buyers, and opportunities.
            </p>
          </div>
                <div className="flex gap-3"> 
               <div className="relative flex-1 ">
                      <DatePicker
                        selected={shipmentStartDate}
                        onChange={(dates) => {
                          const [start, end] = dates;
                          setShipmentStartDate(start);
                          setShipmentEndDate(end);
                        }}
                        startDate={shipmentStartDate}
                        endDate={shipmentEndDate}
                        selectsRange
                        dateFormat="dd MMM yyyy"
                        placeholderText="01 Apr 2025 - 24 Apr 2025"
                        className={`bg-white border border-slate-200 text-[11px] sm:text-xs font-semibold pl-3 pr-9 py-2 rounded-xl shadow-xs hover:bg-slate-50 transition whitespace-nowrap outline-none cursor-pointer ${HEADING}`}
                      />
                      <CalendarDays
                        size={14}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                      />
                    </div>
                    <button onClick={() => setExportReport(true)} className={`flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-slate-200 text-[11px] sm:text-xs font-semibold px-3 sm:px-4 py-2 rounded-xl shadow-xs hover:bg-slate-50 transition whitespace-nowrap ${HEADING}`}>
                      <Download size={14} className="text-slate-400" />
                      Export Report
                    </button> </div>
        </div>

        {/* METRICS STATS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
          {INITIAL_STATS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-[13px] font-medium text-slate-600 leading-tight block max-w-[85%]">
                    {item.title}
                  </span>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${item.bg} ${item.color}`}>
                    <Icon size={18} />
                  </div>
                </div>
                <div className="mt-3">
                  <h3 className="font-bold text-lg text-slate-800 tracking-tight">{item.value}</h3>
                  <span className={`text-[10px] font-medium block mt-0.5 ${item.isUp ? "text-green-500" : "text-red-500"}`}>
                    {item.change}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* TRADE TREND SEARCH */}
        <div className="bg-white border border-slate-100 rounded-2xl p-3 shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(140px,0.8fr)_auto] gap-3 items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { handleApplyFilters(); runTradeTrendSearch(); } }}
              placeholder="Search HS Code or Product"
              aria-label="HS Code or Product"
              className="w-full min-w-0 bg-white border border-slate-200 rounded-xl py-2.5 px-3 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
            <input
            type="number"
            min="1"
            max="100"
            value={topN}
            onChange={(e) => setTopN(e.target.value)}
            aria-label="Number of countries"
            placeholder="Top countries (10)"
            className="w-full min-w-0 bg-white border border-slate-200 rounded-xl py-2.5 px-3 text-xs text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
          <button
              type="button"
              onClick={() => { handleApplyFilters(); runTradeTrendSearch(); }}
              disabled={tradeTrendLoading}
              className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2.5 px-4 transition disabled:opacity-60"
            >
              {tradeTrendLoading ? "Searching..." : "Search"}
            </button>
            <button
              type="button"
              onClick={() => { handleResetFilters(); setTradeTrendResult(null); setTradeTrendError(""); }}
              className="rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-slate-700 hover:bg-slate-50 font-medium text-xs py-2.5 px-4 transition"
            >
              Reset
            </button>
          </div>
          {tradeTrendError && <p role="alert" className="mt-3 text-xs text-red-600">{tradeTrendError}</p>}
          {tradeTrendLoading && <p className="mt-3 text-xs text-slate-500">Fetching live export trade trends...</p>}
        </div>

        {tradeTrendResult && (
          <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm mb-6">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-800">Live Export Trade Trend</h3>
                <p className="text-xs text-slate-500 mt-1">
                  HS Code: {tradeTrendResult?.query?.hs_code || searchQuery.trim()} · FY {tradeTrendResult?.query?.year || getCurrentFinancialYear(shipmentStartDate || new Date())} · Values in ₹ Crore
                </p>
              </div>
              <span className="rounded-full bg-emerald-50 text-emerald-700 px-2.5 py-1 text-[10px] font-semibold">Live API data</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {(tradeTrendResult.value_trend?.points || []).map((point) => {
                const year = point.year;
                return (
                  <div key={year} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                    <p className="text-[10px] text-slate-500">{year}</p>
                    <p className="mt-1 text-sm font-bold text-slate-800">
                      {`₹${Number(point.value ?? 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })} Cr`}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* CHARTS LAYER */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          
          {/* TOP EXPORTED PRODUCTS */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-sm text-slate-800">Top Exported Products</h3>
                {/* <button className="text-blue-600 text-xs font-semibold">View All</button> */}
              </div>
              <div className="space-y-3">
                {topProducts.map((prod, i) => (
                  <div key={i} className="text-xs">
                    <div className="flex justify-between items-start text-slate-600 mb-1.5 gap-2">
                      <span className="font-medium text-slate-400 shrink-0">{prod.hsCode}</span>
                      <span className="truncate flex-1 font-medium text-slate-700">{prod.productName}</span>
                      <span className="font-semibold text-slate-800 shrink-0">₹ {(prod.value / 10000000).toFixed(2)} Cr</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full rounded-full ${prod.barWidth" style={{ width: `${prod.share}%` }}/>
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium shrink-0 w-8 text-right">{prod.share}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
          </div>

          {/* EXPORT VALUE TREND */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-sm text-slate-800">Export Value Trend (INR)</h3>
              <span className="text-[10px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100 font-medium">{liveTradeTrend.latestYear || "Live trend"}</span>
            </div>
            <div className="mb-4">
              <span className="text-xl font-bold text-slate-800">₹{displayedExportValue.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Cr</span>
              {liveTradeTrend.latestYear && <span className="text-xs text-slate-500 font-medium ml-2">{liveTradeTrend.latestYear}</span>}
            </div>
            <div className="h-[150px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={liveTradeTrend.chartData.length ? liveTradeTrend.chartData : lineChartData}>
                  <XAxis dataKey={liveTradeTrend.chartData.length ? "year" : "date"} tick={{ fill: '#94a3b8', fontSize: 10 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} tickLine={false} axisLine={false} width={42} />
                  <Tooltip formatter={(value) => [`₹${Number(value ?? 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })} Cr`, "Export Value"]} />
                  <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2.5} dot={{ fill: '#10B981', r: 3 }} connectNulls />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-slate-50 text-center">
              <div className="bg-slate-50/70 p-2 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-medium block">Export Value (INR)</span>
                <span className="text-xs font-bold text-slate-700"> ₹{displayedExportValue.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Cr</span>
              </div>
              <div className="bg-slate-50/70 p-2 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-medium block">Export Shipments</span>
                <span className="text-xs font-bold text-slate-700">{totalShipments}</span>
              </div>
            </div>
          </div>

          {/* EXPORTS BY COUNTRY OF DESTINATION */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-sm text-slate-800">Exports by Country of Destination</h3>
                {/*<button className="text-blue-600 text-xs font-semibold">View All</button>*/}
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="relative w-[120px] h-[120px] shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={dynamicPieData} innerRadius={40} outerRadius={55} dataKey="value" stroke="none">
                        {dynamicPieData.map((item, index) => <Cell key={index} fill={item.color} />)}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-[8px] uppercase text-slate-400 font-semibold">Total Value</span>
                    <span className="font-bold text-[11px] text-slate-800 leading-none mt-0.5">{computedTotalValue}</span>
                  </div>
                </div>
                <div className="flex-1 space-y-1 pl-2 max-h-[130px] overflow-y-auto">
                  {dynamicPieData.slice(0, Math.max(1, Number(topN) || 10)).map((country, idx) => (
                    <div key={idx} className="flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-1.5 truncate">
                        <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: country.color }} />
                        <span className="text-slate-600 font-medium truncate">{country.name}</span>
                      </div>
                      <span className="text-slate-500 font-semibold ml-1">₹ {(country.value/10000000).toFixed(2)} Cr</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
           
          </div>
        </div>

        {/* DATA TABLE LAYER */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-sm text-slate-800">Recent Export Shipments</h3>
            {/*<span className="text-xs text-blue-600 font-semibold cursor-pointer hover:underline">Filter</span>*/}
          </div>

          <div className="overflow-x-auto -mx-5">
            <div className="inline-block min-w-full align-middle px-5">
              <table className="min-w-full divide-y divide-slate-100 text-xs">
                <thead>
                  <tr className="text-left text-slate-400 font-semibold border-b border-slate-100">
                    <th className="pb-3 font-medium">Shipment ID</th>
                    <th className="pb-3 font-medium">HS Code</th>
                    <th className="pb-3 font-medium">Product Description</th>
                    <th className="pb-3 font-medium">Exporter</th>
                    <th className="pb-3 font-medium">Buyer</th>
                    <th className="pb-3 font-medium">Destination Country</th>
                    <th className="pb-3 font-medium">Port of Exit</th>
                    <th className="pb-3 font-medium">Ship Date</th>
                    <th className="pb-3 font-medium">Value (INR)</th>
                    <th className="pb-3 font-medium text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-slate-600 font-medium">
                  {filteredShipments.length > 0 ? (
                    filteredShipments.map((ship, idx) => (
                      <tr key={ship._id} className="hover:bg-slate-50/80 transition">
                        <td className="py-3.5 text-blue-600 font-semibold">{ship.sbNumber}</td>
                        <td className="py-3.5 text-slate-400 font-bold">{ship.cargo?.hsCode?.hsCode || "-"}</td>
                        <td className="py-3.5 max-w-[180px] truncate font-semibold text-slate-700"> {ship.cargo?.productName}</td>
                        <td className="py-3.5 truncate text-slate-500">{ship.exporter?.companyName}</td>
                        <td className="py-3.5 truncate text-slate-500">{ship.buyer?.companyName}</td>
                        <td className="py-3.5 text-slate-700">{ship.route?.destinationCountry}</td>
                        <td className="py-3.5 text-slate-500">{ship.route?.originCity || "-"}</td>
                        <td className="py-3.5 text-slate-400 whitespace-nowrap">{new Date(ship.shipmentDate).toLocaleDateString("en-GB", {day: "2-digit", month: "short", year: "numeric",})}</td>
                        <td className="py-3.5 font-bold text-slate-800">₹ {Number(ship.cargo?.value ?? 0).toFixed(2)}</td>
                        <td className="py-3.5 text-center">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
                            ship.status === "Delivered" ? "bg-green-100 text-green-700" :
                            ship.status === "In Transit" ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700"
                          }`}>{ship.shipmentStatus}</span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10" className="py-8 text-center text-slate-400 font-medium">
                        No matching export records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="text-center mt-4 pt-3 border-t border-slate-50">
            <button onClick={() => setMainTab && setMainTab("Shipments")} className="text-blue-600 hover:text-blue-700 text-xs font-semibold">
              View All Shipments →
            </button>
          </div>
        </div>
      </div>

      {/* FOOTER TIMESTAMPS BAR */}
      <div className="mt-6 pt-4 mb-10 border-t border-slate-200/60 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-2">
        <div className="flex items-center gap-1.5">
          <Clock size={14} className="text-slate-300" />
          <span>All data is updated daily. Last updated on 24 Apr 2025, 09:30 AM</span>
        </div>
        <div className="flex items-center gap-1 cursor-pointer hover:text-slate-500">
          <HelpCircle size={14} className="text-slate-300" />
          <span>Help Center</span>
        </div>
      </div>

       {exportReport && (
                        <ExportReport onClose={() => setExportReport(false)} />
                      )}

    </div>
  );
}
