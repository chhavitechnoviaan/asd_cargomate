import React,{ useState,useEffect,useMemo,useRef } from 'react';
import {
  getDashboard,
  getInvoices,
  getStatusSummary,
 // getValueTrend,
  getRecentInvoices,
  getTopParties,
  getOverdueInvoices,
  getInsights,
  getFilterOptions
} from '../../api/InvoiceApi';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ExportReport from "../../components/b2bComponent/ExportReport";
import ViewInvoiceModal from "../../components/b2bComponent/viewInvoice";

import { 
  FileText, CheckCircle2, AlertCircle, Clock, BarChart3, Wallet, 
  Search, Calendar, ChevronDown, SlidersHorizontal, Sliders, Download, 
  Plus, MoreVertical, ChevronLeft, ChevronRight, ArrowUpRight, ArrowRight, 
  Info, HelpCircle, FileJson, ArrowRightLeft, User2, CalendarDays, Eye
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from "recharts";
import ReactCountryFlag from "react-country-flag";
import CreateInvoice from '../../components/b2bComponent/CreateInvoice';
import InvoiceInsights from '../../components/b2bComponent/InvoiceInsight';
import InvoiceInsightsModal from '../../components/b2bComponent/InvoiceInsight';
export default function InvoicesDashboard() {
  const [createInvoice, setCreateInvoice] = useState(false)
  const [dashboard, setDashboard] = useState({});
  const [invoices, setInvoices] = useState([]);
  const [statusSummary,setStatusSummary] = useState([]);
  ///const [valueTrend,setValueTrend] = useState([]);
  const [invoiceInsight, setInvoiceInsight] = useState(false)
  const [recentInvoices,setRecentInvoices] = useState([]);
  const [topParties,setTopParties] = useState([]);
  const [overdueInvoices,setOverdueInvoices] = useState([]);
  const [insights,setInsights] = useState({});
  const [filterOptions,setFilterOptions] = useState({ types: [], countries: [], partyTypes: [], statuses: [],});
  const [loading, setLoading] = useState(true);
  const [shipmentStartDate, setShipmentStartDate] = useState(null);
  const [shipmentEndDate, setShipmentEndDate] = useState(null);
  
  const [dateRange, setDateRange] = useState(false);
  const [exportReport, setExportReport] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null)

    const [filters, setFilters] = useState({
  search: "",
  type: "",
  country: "",
  status: "",
});

  // --- VIEW INVOICE ACTION STATES ---
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [viewInvoiceModal, setViewInvoiceModal] = useState(false);
  const [openActionMenu, setOpenActionMenu] = useState(null);
  const actionRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 5;
  const fetchDashboard = async () => {  
    try {
      const res = await getDashboard();
      console.log("Dashboard:", res.data.data);
      setDashboard(res.data.data || {});
    } catch (err) {
      console.error(err);
    }
  };
  const fetchInvoices = async () => {
    try {
      const res = await getInvoices({
      search: filters.search,
      type: filters.type,
      country: filters.country,
      status: filters.status,
    });
      console.log("Invoices:", res.data.data);
      setInvoices(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchStatusSummary = async () => {
    try {
      const res = await getStatusSummary();
      console.log("Status Summary:", res.data.data);
      setStatusSummary(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };
 /* const fetchValueTrend = async () => {
    try {
      const res = await getValueTrend();
      console.log("Value Trend:", res.data.data);
      setValueTrend(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };*/
  const fetchRecentInvoices = async () => {
    try {
      const res = await getRecentInvoices();
      console.log("Recent Invoices:", res.data.data);
      setRecentInvoices(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchTopParties = async () => {
    try {
      const res = await getTopParties();
      console.log("Top Parties:", res.data.data);
     setTopParties(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchOverdueInvoices = async () => {
    try {
      const res = await getOverdueInvoices();
      console.log("Overdue Invoices:", res.data.data);
      setOverdueInvoices(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchInsights = async () => {
    try {
      const res = await getInsights();
      console.log("Insights:", res.data.data);
      setInsights(res.data.data || {});
    } catch (err) {
      console.error(err);
    }
  };
  const fetchFilterOptions = async () => {
    try {
      const res = await getFilterOptions();
      console.log("Filter Options:", res.data.data);
      setFilterOptions(res.data.data || {});
    } catch (err) {
      console.error(err);
    }
  };
  
  const metrics = [
    {label: "Total Invoice", value: dashboard.totalInvoices || 0, change: "", icon: FileText, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100"},
    {label: "Paid Invoices", value: dashboard.paidInvoices || 0,change: "", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50",border: "border-emerald-100"},
    {label: "Pending Invoices", value: dashboard.pendingInvoices || 0, change: "", icon: Clock, color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-100"},
    {label: "Overdue Invoices", value: dashboard.overdueInvoices || 0, change: "", icon: AlertCircle, color: "text-rose-600", bg: "bg-rose-50", border: "border-rose-100"},
    {label: "Total Invoice Value (INR)", value: `₹${((dashboard.totalInvoiceValue || 0) / 10000000).toFixed(2)} Cr`, change: "", icon: BarChart3, color: "text-teal-600", bg: "bg-teal-50", border: "border-teal-100"},
    {label: "Avg. Invoice Value (INR)", value: `₹${((dashboard.averageInvoiceValue || 0) / 10000000).toFixed(2)} Cr`, change: "", icon: Wallet, color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-100"}
  ];

  useEffect(() => {
    setCurrentPage(1);
  fetchInvoices();
}, [
  filters.search,
  filters.type,
  filters.country,
  filters.status,
]);
  useEffect(() => {
    fetchDashboard();
    fetchStatusSummary();
   // fetchValueTrend();
    fetchRecentInvoices();
    fetchTopParties();
    fetchOverdueInvoices();
    fetchInsights();
    fetchFilterOptions();
  }, []);

  // --- CLOSE ACTION MENU ON OUTSIDE CLICK ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (actionRef.current && !actionRef.current.contains(event.target)) {
        setOpenActionMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

const valueTrend = useMemo(() => {
  const monthlyData = {};

  invoices.forEach((invoice) => {
    if (!invoice.invoiceDate) return;

    const month = new Date(invoice.invoiceDate).getMonth() + 1;

    if (!monthlyData[month]) {
      monthlyData[month] = 0;
    }

    monthlyData[month] += Number(invoice.invoiceValue) || 0;
  });

  return Object.entries(monthlyData)
    .map(([month, value]) => ({
      _id: {
        month: Number(month),
      },
      value,
    }))
    .sort((a, b) => a._id.month - b._id.month);
}, [invoices]);
const maxValue = Math.max(...valueTrend.map(item => item.value), 1);
  const points = valueTrend.map((item, index) => {
  const x = (index * 300) / (valueTrend.length - 1 || 1);
  const y = 80 - (item.value / maxValue) * 60;
  return { x, y };});
  
  const filteredStatusSummary = useMemo(() => {
  const summary = {};

  invoices.forEach((invoice) => {
    if (!invoice.status) return;

    summary[invoice.status] =
      (summary[invoice.status] || 0) + 1;
  });

  return Object.entries(summary).map(([status, count]) => ({
    _id: status,
    count,
  }));
}, [invoices]);
const totalPages = Math.ceil(invoices.length / itemsPerPage);

const paginatedInvoices = useMemo(() => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return invoices.slice(startIndex, endIndex);
}, [invoices, currentPage]);
  // --- TOP 6 METRIC CARDS DATA ---
  /*const metrics = [
    { label: "Total Invoice", value: "3,145", change: "▲ 14.8% vs last month", icon: FileText, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
    { label: "Paid Invoices", value: "2,521", change: "▲ 11.6% vs last month", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
    { label: "Pending Invoices", value: "268", change: "▲ 11.6% vs last month", icon: Clock, color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-100" },
    { label: "Overdue Invoices", value: "92", change: "▼ 5.2% vs last month", icon: AlertCircle, color: "text-rose-600", bg: "bg-rose-50", border: "border-rose-100" },
    { label: "Total Invoice Value (INR)", value: "₹2,845.60 Cr", change: "▲ 20.4% vs last month", icon: BarChart3, color: "text-teal-600", bg: "bg-teal-50", border: "border-teal-100" },
    { label: "Avg. Invoice Value (INR)", value: "₹2,845.60 Cr", change: "▲ 2.3 pts vs last month", icon: Wallet, color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-100" },
  ];*/
   
  // --- INVOICE TABLE LIST (10 ROWS MATCHING THE IMAGE STYLE) ---
  /*const invoicesList = [
    { id: "INV-2025-1045", date: "24 Apr 2025", party: "Shenzhen Tech Co.", type: "Commercial Invoice", country: "China", flag: "🇨🇳", due: "24 May 2025", value: "₹ 1,25,45,000", status: "Paid" },
    { id: "INV-2025-1044", date: "23 Apr 2025", party: "Kruppskoffin GmbH", type: "Commercial Invoice", country: "Germany", flag: "🇩🇪", due: "23 May 2025", value: "₹ 98,76,000", status: "Pending" },
    { id: "INV-2025-1043", date: "22 Apr 2025", party: "Reliance Industries", type: "Proforma Invoice", country: "India", flag: "🇮🇳", due: "22 May 2025", value: "₹ 78,32,000", status: "Paid" },
    { id: "INV-2025-1042", date: "21 Apr 2025", party: "Toyota Tsusho", type: "Commercial Invoice", country: "Japan", flag: "🇯🇵", due: "21 May 2025", value: "₹ 64,18,000", status: "Paid" },
    { id: "INV-2025-1041", date: "20 Apr 2025", party: "Uflex Ltd.", type: "Tax Invoice", country: "India", flag: "🇮🇳", due: "20 May 2025", value: "₹ 52,09,000", status: "Overdue" },
    { id: "INV-2025-1040", date: "19 Apr 2025", party: "BASF SE", type: "Commercial Invoice", country: "Germany", flag: "🇩🇪", due: "19 May 2025", value: "₹ 47,28,000", status: "Pending" },
    { id: "INV-2025-1039", date: "18 Apr 2025", party: "Taubang Trading", type: "Commercial Invoice", country: "China", flag: "🇨🇳", due: "18 May 2025", value: "₹ 36,75,000", status: "Paid" },
    { id: "INV-2025-1038", date: "17 Apr 2025", party: "Jindal Steel", type: "Tax Invoice", country: "India", flag: "🇮🇳", due: "17 May 2025", value: "₹ 32,10,000", status: "Pending" },
    { id: "INV-2025-1037", date: "16 Apr 2025", party: "JinkoSolar", type: "Commercial Invoice", country: "China", flag: "🇨🇳", due: "16 May 2025", value: "₹ 25,50,000", status: "Paid" },
    { id: "INV-2025-1036", date: "15 Apr 2025", party: "DHL Global Forwarding", type: "Service Invoice", country: "Singapore", flag: "🇸🇬", due: "15 May 2025", value: "₹ 18,40,000", status: "Paid" },
     { id: "INV-2025-1045", date: "24 Apr 2025", party: "Shenzhen Tech Co.", type: "Commercial Invoice", country: "China", flag: "🇨🇳", due: "24 May 2025", value: "₹ 1,25,45,000", status: "Paid" },
    { id: "INV-2025-1044", date: "23 Apr 2025", party: "Kruppskoffin GmbH", type: "Commercial Invoice", country: "Germany", flag: "🇩🇪", due: "23 May 2025", value: "₹ 98,76,000", status: "Pending" },
    { id: "INV-2025-1043", date: "22 Apr 2025", party: "Reliance Industries", type: "Proforma Invoice", country: "India", flag: "🇮🇳", due: "22 May 2025", value: "₹ 78,32,000", status: "Paid" },
  ];*/

  // --- BOTTOM LEFT DATA PANELS ---
  /*const topParties = [
    { rank: 1, name: "Shenzhen Tech Co.", value: "₹ 1,25,45,000" },
    { rank: 2, name: "Kruppskoffin GmbH", value: "₹ 98,76,000" },
    { rank: 3, name: "Reliance Industries", value: "₹ 78,32,000" },
    { rank: 4, name: "Toyota Tsusho", value: "₹ 64,18,000" },
    { rank: 5, name: "Uflex Ltd.", value: "₹ 52,09,000" },
  ];*/

 /* const overdueInvoices = [
    { id: "INV-2025-1041", party: "Uflex Ltd.", days: "20 days overdue", date: "20 Apr 2025" },
    { id: "INV-2025-1031", party: "Pacific Square", days: "15 days overdue", date: "12 Apr 2025" },
    { id: "INV-2025-0982", party: "Sarat & Sons Ltd.", days: "22 days overdue", date: "10 Mar 2025" },
    { id: "INV-2025-0954", party: "Global Industrial Parts", days: "34 days overdue", date: "28 Feb 2025" },
    { id: "INV-2025-0902", party: "Evergreen Logistics", days: "57 days overdue", date: "14 Feb 2025" },
  ];*/
 

  // --- RIGHT PANEL RECENT INVOICES ---
 /* const recentInvoices = [
    { id: "INV-2025-1045", party: "Shenzhen Tech Co.", date: "24 Apr 2025", value: "₹ 1,25,45,000", status: "PAID" },
    { id: "INV-2025-1044", party: "Kruppskoffin GmbH", date: "23 Apr 2025", value: "₹ 98,76,000", status: "PENDING" },
    { id: "INV-2025-1043", party: "Reliance Industries", date: "22 Apr 2025", value: "₹ 78,32,000", status: "PAID" },
  ];*/

  return (
    <div className="overflow-y-auto bg-[#f8fafc] text-slate-700 p-6  antialiased text-xs selection:bg-blue-100">
      
      {/* --- HEADER BAR --- */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 mt-10">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Invoices</h1>
          <p className="text-slate-500 text-xs mt-0.5">Track, manage and analyze all your trade invoices in one place.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2.5 self-end md:self-auto">
          <div className="relative flex-1 md:flex-none ">
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
              className="bg-white border border-slate-200 text-xs font-medium text-slate-600 pl-3 pr-9 py-1.5 rounded-lg shadow-sm hover:bg-slate-50 transition whitespace-nowrap outline-none cursor-pointer"
            />
            <CalendarDays
              size={13}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>
          <button onClick={() => setExportReport(true)} className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-3 py-1.5 font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
            <Download size={13} className="text-slate-500" />
            Export Report
          </button>
          {/*<button onClick={() => setCreateInvoice(true)} className="flex items-center gap-1 bg-blue-600 text-white rounded-lg px-3 py-1.5 font-semibold shadow-sm hover:bg-blue-700 transition-colors">
            <Plus size={14} />
            Create Invoice
          </button>*/}
        </div>
      </div>

      {/* --- 6 METRIC CARDS GRID --- */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {metrics.map((card, idx) => (
          <div key={idx} className={`bg-white p-4 rounded-xl border ${card.border} shadow-sm flex flex-col justify-between transition-all hover:shadow-md`}>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[10px] font-bold text-[#06155F] uppercase tracking-wider leading-none">{card.label}</span>
              <div className={`p-1.5 rounded-lg shrink-0 ${card.bg} ${card.color}`}>
                <card.icon size={14} />
              </div>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#06155F] leading-tight">{card.value}</h3>
              <p className={`text-[10px] font-semibold mt-1 flex items-center gap-0.5 ${card.color.includes('rose') ? 'text-rose-600' : 'text-emerald-600'}`}>
                {card.change}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* --- SEARCH & FILTERS CONTROLS --- */}
      <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm mb-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 items-end">
        <div>
          <label className="text-[10px] font-bold text-[#06155F] uppercase block mb-1">Search Invoice</label>
          <div className="relative">
            <Search size={13} className="absolute left-2.5 top-2.5 text-slate-400" />
            <input type="text" name="search" value={filters.search} onChange={(e)=>setFilters({...filters,search:e.target.value})}placeholder="Search by invoice no., party, etc..."className="w-full bg-[#f8fafc] pl-8 pr-2 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none placeholder:text-slate-400 focus:border-blue-500"/>
          </div>
        </div>
           <div>
                      <label className="text-[10px] text-[##06145F] font-bold block mb-1.5 uppercase">Date Range</label>
                      <div className="relative">
                         <DatePicker
                  selected={startDate}
                  onChange={(dates) => {
                    const [start, end] = dates;
                    setStartDate(start);
                    setEndDate(end);
                  }}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  dateFormat="dd MMM yyyy"
                  placeholderText="Select Date Range"
                  className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-9 text-xs focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
        
                        <CalendarDays size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      </div>
                    </div>

        {[
         
          { label:"Invoice Type", val:"All Type", options:filterOptions.types, key:"type" },
          { label:"Country / Region", val:"All Countries", options:filterOptions.countries, key:"country" },
  
          { label:"Status", val:"All Status", options:filterOptions.statuses, key:"status" },
        ].map((f, i) => (
          <div key={i}>
            <label className="text-[10px] font-bold text-[#06155F] uppercase block mb-1">{f.label}</label>
            {f.options ? (<select value={filters[f.key]} onChange={(e)=>setFilters({...filters,[f.key]:e.target.value})} className="w-full bg-[#f8fafc] border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-600">
              <option value="">{f.val}</option>
              {f.options?.map((item)=>(
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
            ) : (
            <div className="flex items-center justify-between bg-[#f8fafc] border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-600 cursor-pointer hover:bg-slate-50">
              <span className="truncate">{f.val}</span>
              <ChevronDown size={13} className="text-slate-400 ml-1 shrink-0" />
            </div>
            )}
          </div>
        ))}
        <div className="flex gap-2 h-8">
          <button className="flex-1 flex items-center  whitespace-nowrap justify-center gap-1 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-semibold text-slate-600 hover:bg-slate-100 transition-colors">
            <SlidersHorizontal size={12} /> Apply Filters
          </button>
          <button onClick={() =>
    setFilters({
      search: "",
      type: "",
      country: "",
      status: "",
    })
  } className="text-[11px] font-semibold text-slate-400 hover:text-slate-600 px-1">Reset</button>
        </div>
      </div>

      {/* --- MAIN DASHBOARD BODY GRID (Left Side + Right Sidebar) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* === LEFT MAIN AREA (8 COLS) === */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* INVOICE DATA TABLE */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-visible">
            <div className="p-4 flex items-center justify-between border-b border-slate-50">
              <h2 className="text-sm font-bold text-slate-900">Invoice List <span className="text-slate-400 font-medium">({invoices.length})</span></h2>
              <button className="flex items-center gap-1 text-blue-600 border border-blue-50/80 bg-blue-50/30 rounded-lg px-2.5 py-1 text-xs font-semibold hover:bg-blue-50 transition-colors">
                <Sliders size={12} /> Customize Columns
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#f8fafc] text-[#06155F] font-extrabold text-[10px] uppercase tracking-wider border-b border-slate-100">
                    <th className="p-3 pl-4 w-8"><input type="checkbox" className="rounded border-slate-300 accent-blue-600" /></th>
                    <th className="p-3 font-semibold">Invoice No.</th>
                    <th className="p-3 font-semibold">Invoice Date</th>
                    <th className="p-3 font-semibold">Party</th>
                    {/*<th className="p-3 font-semibold">Type</th>*/}
                    <th className="p-3 font-semibold">Country</th>
                    <th className="p-3 font-semibold">Due Date</th>
                    <th className="p-3 font-semibold text-right">Invoice Value (INR)</th>
                    <th className="p-3 font-semibold text-center">Status</th>
                    <th className="p-3 pr-4 text-center font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  {paginatedInvoices.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-3 pl-4"><input type="checkbox" className="rounded border-slate-300 accent-blue-600" /></td>
                      <td className="p-3 font-semibold text-blue-600 hover:underline cursor-pointer whitespace-nowrap">{row.invoiceNumber}</td>
                      <td className="p-3 text-slate-400 whitespace-nowrap">{new Date(row.createdAt).toLocaleDateString("en-GB")}</td>
                      <td className="p-3 font-medium text-slate-800 max-w-[140px] truncate">{row.party}</td>
                      {/*<td className="p-3 text-slate-400 whitespace-nowrap">{row.type}</td>*/}
                      <td className="p-3 text-slate-600 whitespace-nowrap"> <ReactCountryFlag countryCode={row.countryCode} svg style={{ width: "18px", height: "13px" }}/>{row.country}</td>
                      <td className="p-3 text-slate-400 whitespace-nowrap">{new Date(row.dueDate).toLocaleDateString("en-GB")}</td>
                      <td className="p-3 font-bold text-slate-800 text-right whitespace-nowrap">₹ {row.invoiceValue?.toLocaleString("en-IN")}</td>
                      <td className="p-3 text-center">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full font-bold text-[10px] leading-tight uppercase tracking-wide ${
                          row.status === "Paid" ? "bg-emerald-50 text-emerald-600"
                          : row.status === "Pending" ? "bg-amber-50 text-amber-500"
                          : row.status === "Overdue" ? "bg-rose-50 text-rose-600" 
                          : "bg-slate-100 text-slate-600"
                        }`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="p-3 pr-4 text-center">
                        <div className="relative inline-block" ref={openActionMenu === (row._id || idx) ? actionRef : null}>
                          <button
                            onClick={() =>
                              setOpenActionMenu(
                                openActionMenu === (row._id || idx) ? null : (row._id || idx)
                              )
                            }
                            className="p-1 rounded-md hover:bg-slate-100"
                          >
                            <MoreVertical size={14} className="text-slate-400 hover:text-slate-600" />
                          </button>

                          {openActionMenu === (row._id || idx) && (
                            <div className="absolute right-0 top-8 z-50 w-36 bg-white border border-slate-200 rounded-lg shadow-lg py-1 text-left">
                              <button
                                onClick={() => {
                                  setSelectedInvoice(row);
                                  setViewInvoiceModal(true);
                                  setOpenActionMenu(null);
                                }}
                                className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                              >
                                <Eye size={14} />
                                View Invoice
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* TABLE PAGINATION ROW */}
<div className="p-3.5 border-t border-slate-100 bg-[#f8fafc]/50 flex items-center justify-between text-xs text-slate-500 font-medium">

  <span>
    Showing{" "}
    {invoices.length > 0
      ? (currentPage - 1) * itemsPerPage + 1
      : 0}{" "}
    to{" "}
    {Math.min(currentPage * itemsPerPage, invoices.length)}{" "}
    of {invoices.length} invoices
  </span>

  <div className="flex items-center gap-1">

    {/* PREVIOUS */}
    <button
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
      className={`p-1 rounded border ${
        currentPage === 1
          ? "bg-white text-slate-300 cursor-not-allowed opacity-50"
          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
      }`}
    >
      <ChevronLeft size={14} />
    </button>

    {/* PAGE NUMBERS */}
    {Array.from({ length: totalPages }, (_, index) => index + 1).map(
      (page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`px-2.5 py-1 rounded font-semibold ${
            currentPage === page
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
          }`}
        >
          {page}
        </button>
      )
    )}

    {/* NEXT */}
    <button
      onClick={() =>
        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
      }
      disabled={currentPage === totalPages || totalPages === 0}
      className={`p-1 rounded border ${
        currentPage === totalPages || totalPages === 0
          ? "bg-white text-slate-300 cursor-not-allowed opacity-50"
          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
      }`}
    >
      <ChevronRight size={14} />
    </button>

  </div>
</div>
          </div>

          {/* TWO BOTTOM PANELS ROW */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* PANEL A: TOP PARTIES */}
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#06155F] mb-4">Top Parties by Invoice Value</h3>
                <div className="space-y-3">
                  {topParties.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between py-1 border-b border-slate-50 last:border-0">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-slate-400 w-4">{idx+1}</span>
                        <span className="font-semibold text-slate-700">{item._id}</span>
                      </div>
                      <span className="font-bold text-slate-900">₹ {item.total.toLocaleString("en-IN")}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button className="w-full mt-4 text-left text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 pt-3 border-t border-slate-100">
                View All Parties <ArrowRight size={13} />
              </button>
            </div>

            {/* PANEL B: OVERDUE INVOICES LIST */}
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-bold text-slate-900">Overdue Invoices</h3>
                  <span className="text-xs font-semibold text-blue-600 cursor-pointer hover:underline">View all</span>
                </div>
                <div className="space-y-3">
                  {overdueInvoices.map((item, idx) => (
                    <div key={idx} className="flex items-start justify-between py-1 border-b border-slate-50 last:border-0">
                      <div className="flex items-start gap-2.5">
                        <div className="p-1.5 rounded-lg bg-rose-50 text-rose-500 shrink-0 mt-0.5">
                          <FileText size={14} />
                        </div>
                        <div>
                          <span className="font-bold text-slate-800 text-xs block">{item.invoiceNumber}</span>
                          <span className="text-[11px] text-slate-400 block mt-0.5">{item.party}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] font-bold text-rose-600 block">{Math.max(0,Math.floor((new Date() - new Date(item.dueDate)) / (1000 * 60 * 60 * 24)))}{" "}days overdue</span>
                        <span className="text-[10px] text-slate-400 block mt-0.5">{new Date(item.dueDate).toLocaleDateString("en-GB")}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

             <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-slate-900">Recent Invoices</h3>
              <span className="text-xs font-semibold text-blue-600 cursor-pointer hover:underline">View All</span>
            </div>
            
            <div className="space-y-3">
              {recentInvoices.map((act, i) => (
                <div key={i} className="flex items-center justify-between py-1 border-b border-slate-50 last:border-0">
                  <div>
                    <span className="text-xs font-bold text-blue-600 hover:underline cursor-pointer block">{act.invoiceNumber}</span>
                    <span className="text-[11px] font-medium text-slate-700 block mt-0.5">{act.party}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-900 block">₹ {act.amount?.toLocaleString("en-IN")}</span>
                    <div className="flex items-center justify-end gap-1.5 mt-0.5">
                      <span className="text-[10px] text-slate-400 font-medium">{new Date(act.createdAt).toLocaleDateString("en-GB")}</span>
                      <span className={`text-[8px] px-1 rounded font-bold ${act.status === 'Paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-500'}`}>{act.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* WIDGET 4: INVOICE INSIGHTS PANEL */}
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-3">Invoice Insights</h3>
              <div className="space-y-3">
                {[
                   {text: `${insights.paidInvoices || 0} invoices are paid.`, icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50",},
                   {text: `₹ ${((insights.pendingAmount || 0) / 10000000).toFixed(2)} Cr in pending payments.`, icon: Wallet, color: "text-indigo-500", bg: "bg-indigo-50",},
                   {text: `${insights.overdueInvoices || 0} invoices are overdue.`, icon: AlertCircle, color: "text-rose-500", bg: "bg-rose-50",},
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-2 bg-[#f8fafc]/60 rounded-xl border border-slate-50">
                    <div className={`p-1 ${item.bg} ${item.color} rounded-lg shrink-0 mt-0.5`}>
                      <item.icon size={13} />
                    </div>
                    <p className="text-[11px] font-semibold text-slate-600 leading-normal">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
           {/*} <button onClick={() => setInvoiceInsight(true)} className="w-full mt-4 text-left text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 pt-3 border-t border-slate-50">
              View Detailed Insights <ArrowUpRight size={14} />
            </button> */}
          </div>


          </div>

        </div>

        {/* === RIGHT SIDEBAR COLUMN (4 COLS) === */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* WIDGET 1: INVOICE STATUS DONUT OVERVIEW */}
          <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-4">Invoice Status Overview</h3>
            
            <div className="flex items-center gap-6 my-2">
              {/* Exact High-Fidelity SVG Donut Arc Layout */}
              <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
                 <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={filteredStatusSummary}
            dataKey="count"
            nameKey="_id"
            cx="50%"
            cy="50%"
            innerRadius={42}
            outerRadius={56}
            paddingAngle={0}
            stroke="none"
          >
            {filteredStatusSummary.map((item, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  item._id === "Paid"
                    ? "#10b981"
                    : item._id === "Pending"
                    ? "#f59e0b"
                    : item._id === "Overdue"
                    ? "#ef4444"
                    : item._id === "Cancelled"
                    ? "#94a3b8"
                    : "#6366f1"
                }
              />
            ))}
          </Pie>

          <Tooltip
            formatter={(value, name) => [`${value}`, name]}
          />
        </PieChart>
      </ResponsiveContainer>
 {/* Center Total */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-base font-black text-slate-800 leading-none">
          {filteredStatusSummary.reduce(
            (sum, item) => sum + Number(item.count || 0),
            0
          )}
        </span>

        <span className="text-[9px] uppercase font-bold text-slate-400 mt-0.5 tracking-wider">
          Total
        </span>
      </div>

    </div>
              {/* Chart Legend Metrics */}
              <div className="flex-1 space-y-2 text-[11px]">
                {filteredStatusSummary.map((item, index) => {
                  const filteredTotal = filteredStatusSummary.reduce(
    (sum, item) => sum + Number(item.count || 0),
    0
  );

  const percentage =
    filteredTotal > 0
      ? ((item.count / filteredTotal) * 100).toFixed(1)
      : 0;
                return (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                    <span className={`w-2 h-2 rounded-full ${ 
                      item._id === "Paid" ? "bg-emerald-500"
                      : item._id === "Pending" ? "bg-amber-500"
                      : item._id === "Overdue" ? "bg-rose-500"
                      : "bg-slate-400"
                    }`}/>{item._id}
                  </div>
                    <span className="font-bold text-slate-800">{item.count} ({percentage}%)</span>
                </div>
                );
                })}
              </div>
            </div>

           {/*} <button className="w-full mt-4 text-center text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center justify-center gap-1 pt-3 border-t border-slate-50">
              View All Status <ArrowRight size={13} />
            </button>*/}
          </div>

          {/* WIDGET 2: INVOICE VALUE OVERVIEW LINE SPLINE CHART */}
          <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
            <div className="mb-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Invoice Value Overview (INR)</h3>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-lg font-black text-slate-900">₹ {valueTrend.reduce((sum, item) => sum + item.value, 0).toLocaleString("en-IN")}</span>
                <span className="text-[10px] text-slate-400 font-medium">Total Invoice Value</span>
              </div>
            </div>

            {/* High Fidelity Vector Dynamic Chart Graph Area */}
            <div className="h-28 w-full relative mt-4">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 300 100" preserveAspectRatio="none">
                {/* Horizontal Soft Grid Lines */}
                <line x1="0" y1="20" x2="300" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="0" y1="50" x2="300" y2="50" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="0" y1="80" x2="300" y2="80" stroke="#f1f5f9" strokeWidth="1" />
                
                {/* Smooth Graph Path */}
                <path 
                  d={points.length ? "M " + points.map((p) => `${p.x},${p.y}`).join(" L ") : ""}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2.5"
                  strokeLinecap="round" 
                />
                
                {/* Trend Points Bullets */}
                {points.map((p, index) => (
                  <circle key={index} cx={p.x} cy={p.y} r="3.5" fill="#3b82f6" stroke="#fff" strokeWidth="1.5"/>))}
              </svg>

              {/* X-Axis Labels */}
              <div className="flex justify-between items-center text-[9px] font-bold text-slate-400 uppercase tracking-wide mt-2 px-1">
               {valueTrend.map((item) => (
                <span key={item._id.month}>{new Date(2025, item._id.month - 1).toLocaleString("en", { month: "short",})}</span>))}
              </div>
            </div>

           {/*<button onClick={() => setInvoiceInsight(true)} className="w-full mt-4 text-center text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center justify-center gap-1 pt-3 border-t border-slate-50">
              View Detailed Analytics <ArrowRight size={13} />
            </button>*/}
          </div>

          {/* WIDGET 3: RECENT INVOICES */}
         
        </div>
      </div>

      {/* --- SYSTEM METADATA BOTTOM FOOTER --- */}
      <div className="mt-8 pt-4 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between text-[10px] font-semibold text-slate-400 gap-2">
        <div className="flex items-center gap-1.5">
          <Clock size={12} className="text-blue-500" />
          <span>All data is updated daily. Last updated on 24 Apr 2025, 09:30 AM</span>
        </div>
        <div className="flex items-center gap-1 cursor-pointer hover:text-slate-600 transition-colors">
          <HelpCircle size={12} className="text-slate-400" />
          <span>Help Center</span>
        </div>
      </div>

      {exportReport && (
        <ExportReport onClose={() => setExportReport(false)} />
      )}

      {createInvoice && (
        <CreateInvoice onClose={() => setCreateInvoice(false)}/>
      )}

      {invoiceInsight && (
        <InvoiceInsights onClose={() => setInvoiceInsight(false)} />
      )}

      {/* --- VIEW INVOICE MODAL --- */}
      {viewInvoiceModal && selectedInvoice && (
        <ViewInvoiceModal
          invoice={selectedInvoice}
          onClose={() => {
            setViewInvoiceModal(false);
            setSelectedInvoice(null);
          }}
        />
      )}
    </div>
  );
}