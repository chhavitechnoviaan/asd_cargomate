import React,{ useState,useEffect }from 'react';
import {
  getDashboard,
  getOverview,
  getRecentReports,
  getPopularReports,
  getInsights,
  generateReport,
  downloadReport,
  exportData,
  getFilterOptions
} from '../../api/ReportsApi';
import { 
  FileText, Download, MoreVertical, Plus, Calendar, ArrowRight,
  ChevronDown, BarChart2, TrendingUp, Users, MapPin,
  Briefcase, ShoppingCart, HelpCircle, CheckCircle2, Info, AlertCircle
} from 'lucide-react';

// Data Arrays
/*const recentReports = [
  { name: "Trade Summary Report - Apr 2025", type: "Summary", mod: "Trade", date: "24 Apr 2025, 09:15 AM", by: "Abhishek B.", fmt: "PDF", isPdf: true },
  { name: "Shipment Performance Report", type: "Operational", mod: "Shipments", date: "24 Apr 2025, 08:45 AM", by: "Abhishek B.", fmt: "Excel", isPdf: false },
  { name: "Top Suppliers Report", type: "Analytics", mod: "Suppliers", date: "23 Apr 2025, 07:30 PM", by: "Neha Sharma", fmt: "PDF", isPdf: true },
  { name: "Invoice Aging Report", type: "Financial", mod: "Invoices", date: "23 Apr 2025, 06:20 PM", by: "Neha Sharma", fmt: "Excel", isPdf: false },
  { name: "Contracts Expiry Report", type: "Compliance", mod: "Contracts", date: "23 Apr 2025, 05:10 PM", by: "Amit Verma", fmt: "PDF", isPdf: true },
];*/

/*const popularReports = [
  { title: "Trade Summary Report", desc: "Summary of import & export trade activities.", icon: FileText, iconColor: "text-blue-500", bgColor: "bg-blue-50" },
  { title: "Shipment Performance Report", desc: "Detailed shipment volume and performance.", icon: MapPin, iconColor: "text-indigo-500", bgColor: "bg-indigo-50" },
  { title: "Supplier Performance Report", desc: "Analyze supplier contribution and reliability.", icon: Users, iconColor: "text-purple-500", bgColor: "bg-purple-50" },
  { title: "Buyer Performance Report", desc: "Analyze buyer activity and trends.", icon: Briefcase, iconColor: "text-sky-500", bgColor: "bg-sky-50" },
  { title: "Invoice Aging Report", desc: "Track outstanding invoices and aging details.", icon: TrendingUp, iconColor: "text-blue-500", bgColor: "bg-blue-50" },
  { title: "Contract Expiry Report", desc: "Contracts nearing expiry and renewal insights.", icon: FileText, iconColor: "text-indigo-500", bgColor: "bg-indigo-50" }
];*/

// Tailwind classes mapping configuration to bypass dynamic class constraints

const reportIcons = {
  "Shipment Reports": {icon: FileText, iconColor: "text-blue-500", bgColor: "bg-blue-50",},
  "Cost & Finance Reports": {icon: TrendingUp, iconColor: "text-emerald-500", bgColor: "bg-emerald-50",},
  "Vendor Reports": {icon: Users, iconColor: "text-purple-500", bgColor: "bg-purple-50",},
  "Compliance Reports": {icon: Briefcase, iconColor: "text-orange-500", bgColor: "bg-orange-50",},
  "Document Reports": {icon: FileText, iconColor: "text-red-500", bgColor: "bg-red-50",},
  "Performance Reports": {icon: TrendingUp, iconColor: "text-indigo-500", bgColor: "bg-indigo-50",},
  "Analytics & Trends": {icon: MapPin, iconColor: "text-sky-500", bgColor: "bg-sky-50",},
};

const colorMapping = {
  blue: { bg: "bg-blue-50", text: "text-blue-600" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-600" },
  purple: { bg: "bg-purple-50", text: "text-purple-600" },
  red: { bg: "bg-red-50", text: "text-red-600" },
  orange: { bg: "bg-orange-50", text: "text-orange-600" }
};

export default function ReportsDashboard() {

  const [dashboard, setDashboard] = useState({});
  const [overview, setOverview] = useState({tradeTrend: [], countries: [],});
  const [recentReports, setRecentReports] = useState([]);
  const [popularReports, setPopularReports] = useState([]);
  const [insights, setInsights] = useState({});
  const [filterOptions, setFilterOptions] = useState({categories: [], modules: [], status: [], frequency: [],});
  const [loading, setLoading] = useState(false);

  const fetchDashboard = async () => {
    try {
      const res = await getDashboard();
      setDashboard(res.data.data || {});
    } catch (err) {
        console.error(err);
      }
  };
  const fetchOverview = async () => {
    try {
      const res = await getOverview();
      setOverview(res.data.data || {});
    } catch (err) {
        console.error(err);
      }
  };
  const fetchRecentReports = async () => {
    try {
      const res = await getRecentReports();
      setRecentReports(res.data.data || []);
    } catch (err) {
        console.error(err);
      }
  };
  const fetchPopularReports = async () => {
    try {
      const res = await getPopularReports();
      setPopularReports(res.data.data || []);
    } catch (err) {
        console.error(err);
      }
  };
  const fetchInsights = async () => {
    try {
      const res = await getInsights();
      setInsights(res.data.data || {});
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
    fetchOverview();
    fetchRecentReports();
    fetchPopularReports();
    fetchInsights();
    fetchFilterOptions();
  }, []);

  const tradeTrend = overview.tradeTrend || [];
  const countries = overview.countries || [];
  const maxCountryValue = Math.max(...countries.map((item) => item.tradeValue),1);
  const maxTradeValue = Math.max(...tradeTrend.map((i) => i.tradeValue), 1);
  const linePath = tradeTrend.length > 0 ? tradeTrend.map((item, index) => {
    const x = tradeTrend.length > 1 ? (index * 100) / (tradeTrend.length - 1) : 0;
    const y = maxTradeValue > 0 ? 100 - (item.tradeValue / maxTradeValue) * 80 : 100;
    return `${index === 0 ? "M" : "L"}${x},${y}`;
  }).join(" ") : "";
  const areaPath = linePath !== "" ? `${linePath} L100,100 L0,100 Z` : "";
  const shipmentTrend = overview.tradeTrend || [];
  const maxShipment = Math.max(...shipmentTrend.map((item) => item.shipments), 1);
  const shipmentLinePath = shipmentTrend.length > 0 ? shipmentTrend.map((item, index) => {
    const x = shipmentTrend.length > 1 ? (index * 100) / (shipmentTrend.length - 1) : 0;
    const y = maxShipment > 0 ? 100 - (item.shipments / maxShipment) * 70 : 100;
    return `${index === 0 ? "M" : "L"}${x},${y}`;
  }).join(" ") : "";
  const shipmentAreaPath = shipmentLinePath !== "" ? `${shipmentLinePath} L100,100 L0,100 Z` : "";

  return (
    <div className="overflow-y-auto bg-slate-50 text-slate-800  p-6 selection:bg-blue-100">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 mt-10">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">Reports</h1>
          <p className="text-xs text-slate-500 mt-1">Explore key insights and generate customized reports to drive your trade decisions.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 border border-slate-200 rounded-md text-xs shadow-sm text-slate-600">
            <Calendar size={14} className="text-slate-400" />
            <span>01 Apr 2025 - 24 Apr 2025</span>
          </div>
          <button className="flex items-center gap-2 bg-white px-3 py-1.5 border border-slate-200 rounded-md text-xs font-medium shadow-sm text-slate-700 hover:bg-slate-50 transition-colors">
            <Download size={14} className="text-slate-500" />
            Export Report
          </button>
          {/*<button className="flex items-center gap-1.5 bg-blue-600 text-white px-3 py-1.5 rounded-md text-xs font-medium shadow-sm hover:bg-blue-700 transition-colors">
            <Plus size={14} />
            Create Reports
          </button>*/}
        </div>
      </div>

      
      {/* 3. SYNC FOOTER */}
      <div className="mt-8 pt-4 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-400 gap-2">
        <div className="flex items-center gap-1.5">
          <Info size={12} className="text-blue-500" />
          <span>All data is updated daily. Last updated on 24 Apr 2025, 09:30 AM</span>
        </div>
        <div className="flex items-center gap-1 cursor-pointer hover:text-slate-600 transition-colors">
          <HelpCircle size={12} className="text-blue-500" />
          <span>Help Center</span>
        </div>
      </div>

    </div>
  );
}

