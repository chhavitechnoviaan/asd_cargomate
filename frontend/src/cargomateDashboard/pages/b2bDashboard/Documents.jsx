import React,{ useEffect,useState } from "react";
import ReactCountryFlag from "react-country-flag";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ExportReport from "../../components/b2bComponent/ExportReport";
import { 
  getDocumentDashboard,
  getDashboardDocuments,
  getDocumentsByType,
  getDocumentStatusOverview,
  getDocumentInsights,
  getDashboardExpiringDocuments,
  getDashboardRecentUploads,
  getDocumentFilterOptions,
  getStorage
} from "../../api/DocumentApi";
import {
  CalendarDays,
  Download,
  Upload,
  Search,
  ChevronDown,
  FileText,
  Clock,
  CalendarClock,
  CheckCircle2,
  Archive,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  FileCheck,
  Sparkles,
  Eye,X
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import DateRangeModal from "../../components/b2bComponent/DateRange";
import AllRecentUploadsModal from "../../components/b2bComponent/AllRecentUpload";

import UploadShipment from "../../components/b2bComponent/UploadShipment";
import RecentBuyerActivityModal from "../../components/b2bComponent/RecentBuyerActivity";
const HEADING = "text-[#07156B]";

const COUNTRY_CODES = {
  China: "CN",
  "S. Korea": "KR",
  Germany: "DE",
  USA: "US",
  India: "IN",
  Singapore: "SG",
  UAE: "AE",
  Belgium: "BE",
  Netherlands: "NL",
};

function Flag({ country, size = 13 }) {
  return (
    <ReactCountryFlag
      countryCode={COUNTRY_CODES[country] || "US"}
      svg
      style={{ width: size, height: size, borderRadius: "2px" }}
    />
  );
}

function StatusBadge({ status }) {
  const styles = {
    Verified: "bg-green-100 text-green-600",
    "In Transit": "bg-blue-100 text-blue-600",
    Pending: "bg-amber-100 text-amber-600",
    Expired: "bg-rose-100 text-rose-600",
  };
  return <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg whitespace-nowrap ${styles[status]}`}>{status}</span>;
}

const DOC_STYLES = {
  "Commercial Invoice": "bg-slate-800",
  "Packing List": "bg-teal-500",
  "Bill of Lading": "bg-blue-500",
  "Certificate of Origin": "bg-sky-400",
  "Insurance Certificate": "bg-indigo-900",
  "Phytosanitary Certificate": "bg-teal-600",
  "Import License": "bg-amber-500",
  "Customs Declaration": "bg-purple-600",
  MSDS: "bg-slate-900",
  "Inspection Report": "bg-slate-400",
};

function DocIcon({ type }) {
  return (
    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-white ${DOC_STYLES[type] || "bg-slate-500"}`}>
      <FileText size={13} />
    </div>
  );
}

/*const KPI_STATS = [
  { title: "Total Documents", value: "2,458", change: "▲ 18.6% vs last month", icon: FileText, bg: "bg-blue-50", color: "text-blue-500", up: true },
  { title: "Uploaded This Month", value: "462", change: "▲ 12.3% vs last month", icon: Upload, bg: "bg-emerald-50", color: "text-emerald-500", up: true },
  { title: "Pending Verification", value: "128", change: "▼ 8.4% vs last month", icon: Clock, bg: "bg-orange-50", color: "text-orange-500", up: false },
  { title: "Expiring Soon", value: "74", change: "▼ 6.2% vs last month", icon: CalendarClock, bg: "bg-rose-50", color: "text-rose-500", up: false },
  { title: "Verified Documents", value: "2,154", change: "▲ 20.7% vs last month", icon: CheckCircle2, bg: "bg-teal-50", color: "text-teal-500", up: true },
];*/

/*const DOCUMENTS = [
  { name: "INV-10045.pdf", type: "Commercial Invoice", shipment: "SHP-2025-1045", related: "Export Shipment", country: "China", upload: "24 Apr 2025", expiry: "24 Apr 2026", status: "Verified" },
  { name: "PL-10045.pdf", type: "Packing List", shipment: "SHP-2025-1045", related: "Export Shipment", country: "China", upload: "24 Apr 2025", expiry: "24 Apr 2026", status: "Verified" },
  { name: "BOL-1044.pdf", type: "Bill of Lading", shipment: "SHP-2025-1044", related: "Export Shipment", country: "S. Korea", upload: "23 Apr 2025", expiry: "-", status: "In Transit" },
  { name: "CO-1043.pdf", type: "Certificate of Origin", shipment: "SHP-2025-1043", related: "Export Shipment", country: "Germany", upload: "23 Apr 2025", expiry: "23 Oct 2025", status: "Verified" },
  { name: "IC-1042.pdf", type: "Insurance Certificate", shipment: "SHP-2025-1042", related: "Export Shipment", country: "USA", upload: "22 Apr 2025", expiry: "22 Apr 2026", status: "Verified" },
  { name: "PC-1041.pdf", type: "Phytosanitary Certificate", shipment: "SHP-2025-1041", related: "Import Shipment", country: "India", upload: "21 Apr 2025", expiry: "21 Jul 2025", status: "Pending" },
  { name: "IL-1040.pdf", type: "Import License", shipment: "SHP-2025-1040", related: "Import Shipment", country: "Singapore", upload: "21 Apr 2025", expiry: "21 Apr 2026", status: "Pending" },
  { name: "CD-1039.pdf", type: "Customs Declaration", shipment: "SHP-2025-1039", related: "Import Shipment", country: "UAE", upload: "20 Apr 2025", expiry: "-", status: "Verified" },
  { name: "MSDS-1038.pdf", type: "MSDS", shipment: "SHP-2025-1038", related: "Export Shipment", country: "Belgium", upload: "19 Apr 2025", expiry: "19 Apr 2026", status: "Verified" },
  { name: "IR-1037.pdf", type: "Inspection Report", shipment: "SHP-2025-1037", related: "Export Shipment", country: "Netherlands", upload: "19 Apr 2025", expiry: "-", status: "Expired" },
];*/

/*const DOC_TYPE_DIST = [
  { name: "Commercial Invoice", value: 642, percent: "26.1%", color: "#2563EB" },
  { name: "Packing List", value: 556, percent: "22.6%", color: "#10B981" },
  { name: "Bill of Lading", value: 398, percent: "16.2%", color: "#1E3A8A" },
  { name: "Certificate of Origin", value: 286, percent: "11.6%", color: "#F59E0B" },
  { name: "Insurance Certificate", value: 212, percent: "8.6%", color: "#B91C1C" },
  { name: "Other Documents", value: 364, percent: "14.9%", color: "#94A3B8" },
];*/

/*const STATUS_TREND = [
  { date: "01 Apr", verified: 700, transit: 400, pending: 250, expired: 100 },
  { date: "06 Apr", verified: 780, transit: 450, pending: 300, expired: 120 },
  { date: "11 Apr", verified: 750, transit: 420, pending: 280, expired: 90 },
  { date: "16 Apr", verified: 850, transit: 470, pending: 320, expired: 130 },
  { date: "21 Apr", verified: 820, transit: 460, pending: 300, expired: 110 },
  { date: "24 Apr", verified: 900, transit: 500, pending: 340, expired: 140 },
];*/

/*const DOC_INSIGHTS = [
  { icon: FileCheck, bg: "bg-blue-50", color: "text-blue-500", text: "Your document verification rate is 87.6% this month.", sub: "▲ 6.2% higher than last month" },
  { icon: FileText, bg: "bg-teal-50", color: "text-teal-500", text: "Most uploaded document type is Commercial Invoice.", sub: "642 documents uploaded" },
  { icon: Clock, bg: "bg-orange-50", color: "text-orange-500", text: "74 documents are expiring within the next 90 days.", sub: "View expiring documents" },
];*/

/*const EXPIRING_SOON = [
  { id: "CO-1043", type: "Certificate of Origin", date: "23 Oct 2025", days: "178 days left", level: "warn" },
  { id: "PC-1041", type: "Phytosanitary Certificate", date: "21 Jul 2025", days: "67 days left", level: "warn" },
  { id: "INV-1042", type: "Commercial Invoice", date: "15 Jun 2025", days: "31 days left", level: "warn" },
  { id: "IL-1040", type: "Import License", date: "21 May 2025", days: "6 days left", level: "critical" },
  { id: "IC-1042", type: "Insurance Certificate", date: "22 Apr 2026", days: "363 days left", level: "safe" },
];*/

/*const RECENT_UPLOADS = [
  { name: "INV-10045.pdf", type: "Commercial Invoice", date: "24 Apr 2025", by: "Abhishek B." },
  { name: "PL-10045.pdf", type: "Packing List", date: "24 Apr 2025", by: "Abhishek B." },
  { name: "BOL-1044.pdf", type: "Bill of Lading", date: "23 Apr 2025", by: "Rohit Jain" },
  { name: "CO-1043.pdf", type: "Certificate of Origin", date: "23 Apr 2025", by: "Neha Sharma" },
  { name: "IC-1042.pdf", type: "Insurance Certificate", date: "22 Apr 2025", by: "Rohit Jain" },
];*/

function SectionCard({ children, className = "" }) {
  return (
    <div className={`bg-white border border-slate-100 rounded-2xl p-4 shadow-xs ${className}`}>
      {children}
    </div>
  );
}

function ViewAllHeader({ title, text = "View All", onClick }) {
  return (
    <div className="flex justify-between items-center mb-3">
      <h3 className={`font-bold text-sm ${HEADING}`}>{title}</h3>
      <button className="text-blue-600 text-[11px] font-bold shrink-0" onClick={onClick}>{text} →</button>
    </div>
  );
}

export default function DocumentsDashboard() {
  const [dashboard, setDashboard] = useState({});
  const [documents, setDocuments] = useState([]);
  const [documentsByType, setDocumentsByType] = useState([]);
  const [statusOverview, setStatusOverview] = useState([]);
  const [documentInsights, setDocumentInsights] = useState({});
  const [expiringDocuments, setExpiringDocuments] = useState([]);
  const [recentUploads, setRecentUploads] = useState([]);
  const [filterOptions, setFilterOptions] = useState({});
  const [storage, setStorage] = useState({});
  const [loading, setLoading] = useState(false);
  const [shipmentStartDate, setShipmentStartDate] = useState(null);
  const [shipmentEndDate, setShipmentEndDate] = useState(null);
  const [dateRange, setDateRange] = useState(false);
  const [exportReport, setExportReport] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null)
    const [uploadShipment, setUploadShipment] = useState(false)
   const [recentUpload, setRecentUpload] = useState(false)

   const [selectedDocSearch, setSelectedDocSearch] = useState("");
const [selectedDocStatus, setSelectedDocStatus] = useState("");
const [selectedDocCountry, setSelectedDocCountry] = useState("");
const [selectedDocType, setSelectedDocType] = useState("");
const [selectedDocShipment, setSelectedDocShipment] = useState("");
const [currentDocumentPage, setCurrentDocumentPage] = useState(1);
const documentsPerPage = 10;
const [appliedDocFilters, setAppliedDocFilters] = useState({
  search: "",
  status: "",
  country: "",
  documentType: "",
  shipmentId: "",
  startDate: null,
  endDate: null,
});
const [selectedDocument, setSelectedDocument] = useState(null);
const [documentViewModal, setDocumentViewModal] = useState(false);
const handleViewDocument = (document) => {
  setSelectedDocument(document);
  setDocumentViewModal(true);
};
const getDocumentFileUrl = (fileUrl) => {
  if (!fileUrl) return "";

  // Agar already complete URL hai
  if (
    fileUrl.startsWith("http://") ||
    fileUrl.startsWith("https://")
  ) {
    return fileUrl;
  }

  // API URL se /api hata do
  const serverUrl = (
    import.meta.env.VITE_API_URL || ""
  )
    .replace(/\/api\/?$/, "")
    .replace(/\/$/, "");

  return `${serverUrl}${
    fileUrl.startsWith("/") ? fileUrl : `/${fileUrl}`
  }`;
};
  const fetchDashboard = async () => {
    try {
     const res = await getDocumentDashboard();
     console.log("Dashboard:", res.data);
     setDashboard(res.data.data || {});
    } catch (error) {
     console.error(error);
    }
  };
  const fetchDocuments = async () => {
   try {
     const res = await getDashboardDocuments();
     console.log("Documents:", res.data);
     setDocuments(res.data.data || []);
    } catch (error) {
     console.error(error);
    }
  };
  const fetchDocumentsByType = async () => {
   try {
     const res = await getDocumentsByType();
     console.log("Documents By Type:", res.data);
     setDocumentsByType(res.data.data || []);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchStatusOverview = async () => {
   try {
     const res = await getDocumentStatusOverview();
     console.log("Status Overview:", res.data);
     setStatusOverview(res.data.data || []);
    } catch (error) {
       console.error(error);
      }
  };
  const fetchDocumentInsights = async () => {
    try {
     const res = await getDocumentInsights();
     console.log("Insights:", res.data);
     setDocumentInsights(res.data.data || {});
    } catch (error) {
       console.error(error);
      }
  };
  const fetchExpiringDocuments = async () => {
    try {
      const res = await getDashboardExpiringDocuments();
      console.log("Expiring Documents:", res.data);
      setExpiringDocuments(res.data.data || []);
    } catch (error) {
       console.error(error);
      }
  };
  const fetchRecentUploads = async () => {
    try {
      const res = await getDashboardRecentUploads();
      console.log("Recent Uploads:", res.data);
      setRecentUploads(res.data.data || []);
    } catch (error) {
       console.error(error);
      }
  };
  const fetchFilterOptions = async () => {
    try {
      const res = await getDocumentFilterOptions();
      console.log("Filter Options:", res.data);
      setFilterOptions(res.data.data || {});
    } catch (error) {
       console.error(error);
      }
  };
  const fetchStorage = async () => {
    try {
      const res = await getStorage();
      console.log("Storage:", res.data);
      setStorage(res.data.data || {});
    } catch (error) {
      console.error(error);
    }
  };
  const handleApplyDocumentFilters = () => {
  setAppliedDocFilters({
    search: selectedDocSearch,
    status: selectedDocStatus,
    country: selectedDocCountry,
    documentType: selectedDocType,
    shipmentId: selectedDocShipment,
    startDate: startDate,
    endDate: endDate,
  });
  setCurrentDocumentPage(1);
};

const handleResetDocumentFilters = () => {
  setSelectedDocSearch("");
  setSelectedDocStatus("");
  setSelectedDocCountry("");
  setSelectedDocType("");
  setSelectedDocShipment("");

  setStartDate(null);
  setEndDate(null);

  setAppliedDocFilters({
    search: "",
    status: "",
    country: "",
    documentType: "",
    shipmentId: "",
    startDate: null,
    endDate: null,
  });

  setCurrentDocumentPage(1);
};
  const KPI_STATS = [
    {title: "Total Documents", value: dashboard.totalDocuments || 0, change: "", icon: FileText, bg: "bg-blue-50", color: "text-blue-500", up: true,},
    {title: "Uploaded This Month", value: dashboard.uploadedThisMonth || 0, change: "", icon: Upload, bg: "bg-emerald-50", color: "text-emerald-500", up: true,},
    {title: "Pending Verification", value: dashboard.pendingVerification || 0, change: "", icon: Clock, bg: "bg-orange-50", color: "text-orange-500", up: false,},
    // {title: "Expiring Soon", value: dashboard.expiringSoon || 0, change: "", icon: CalendarClock, bg: "bg-rose-50", color: "text-rose-500", up: false,},
    {title: "Verified Documents", value: dashboard.verifiedDocuments || 0, change: "", icon: CheckCircle2, bg: "bg-teal-50", color: "text-teal-500", up: true,},
  ];
  const colors = ["#2563EB", "#10B981", "#1E3A8A", "#F59E0B", "#B91C1C", "#94A3B8",];
  const totalDocuments = documentsByType.reduce((sum, item) => sum + item.count,0);
  const DOC_TYPE_DIST = documentsByType.map((item, index) => ({
    name: item._id,
    value: item.count,
    percent:totalDocuments > 0  ? ((item.count / totalDocuments) * 100).toFixed(1) + "%" : "0%", 
    color: colors[index % colors.length],
  }));
  const STATUS_TREND = statusOverview.map((item) => ({
    date: new Date(item._id).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    }),
    verified: item.verified,
    transit: item.transit,
    pending: item.pending,
    expired: item.expired,
  }));
  const DOC_INSIGHTS = [
    {icon: FileCheck, bg: "bg-blue-50", color: "text-blue-500", text: `Document Verification Rate`, sub: `${documentInsights.verificationRate}% (${documentInsights.verified} of ${documentInsights.total} verified)`,},
    {icon: Clock, bg: "bg-orange-50", color: "text-orange-500", text: `Pending Verification`, sub: `${documentInsights.pending} documents are pending verification`,},
    {icon: FileText, bg: "bg-rose-50", color: "text-rose-500", text: `Expired Documents`, sub: `${documentInsights.expired} documents have expired`,},
  ];
  
  useEffect(() => {
    fetchDashboard();
    fetchDocuments();
    fetchDocumentsByType();
    fetchStatusOverview();
    fetchDocumentInsights();
    fetchExpiringDocuments();
    fetchRecentUploads();
    fetchFilterOptions();
    fetchStorage();
  }, []);

  const filteredDocuments = documents.filter((d) => {
  const search = appliedDocFilters.search.toLowerCase().trim();

  const documentName =
    d.documentName ||
    d.fileName ||
    d.fileUrl?.split("/").pop() ||
    "";

  const shipmentNumber = d.shipmentId?.sbNumber || "";

  const matchesSearch =
    !search ||
    documentName.toLowerCase().includes(search) ||
    d.documentType?.toLowerCase().includes(search) ||
    shipmentNumber.toLowerCase().includes(search);

  const matchesStatus =
    !appliedDocFilters.status ||
    d.status === appliedDocFilters.status;

  const matchesCountry =
    !appliedDocFilters.country ||
    d.country === appliedDocFilters.country;

  const matchesDocumentType =
    !appliedDocFilters.documentType ||
    d.documentType === appliedDocFilters.documentType;

  const matchesShipment =
    !appliedDocFilters.shipmentId ||
    d.shipmentId?._id === appliedDocFilters.shipmentId;

  const documentDate = d.createdAt
    ? new Date(d.createdAt)
    : null;

  const matchesStartDate =
    !appliedDocFilters.startDate ||
    (documentDate &&
      documentDate >= new Date(
        new Date(appliedDocFilters.startDate).setHours(0, 0, 0, 0)
      ));

  const matchesEndDate =
    !appliedDocFilters.endDate ||
    (documentDate &&
      documentDate <= new Date(
        new Date(appliedDocFilters.endDate).setHours(23, 59, 59, 999)
      ));

  return (
    matchesSearch &&
    matchesStatus &&
    matchesCountry &&
    matchesDocumentType &&
    matchesShipment &&
    matchesStartDate &&
    matchesEndDate
  );
});
const totalDocumentPages = Math.max(
  1,
  Math.ceil(filteredDocuments.length / documentsPerPage)
);

const documentStartIndex =
  (currentDocumentPage - 1) * documentsPerPage;

const paginatedDocuments = filteredDocuments.slice(
  documentStartIndex,
  documentStartIndex + documentsPerPage
);

const visibleDocumentPages = Array.from(
  { length: totalDocumentPages },
  (_, index) => index + 1
).filter((page) => {
  return (
    page === 1 ||
    page === totalDocumentPages ||
    Math.abs(page - currentDocumentPage) <= 1
  );
});
  return (
    <div className="min-h-screen w-full overflow-y-auto bg-[#F8FAFC] text-slate-600  antialiased py-5">
      <div className="max-w-[1500px] mx-auto p-3 sm:p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">
          <div>
            <h1 className={`text-xl sm:text-2xl font-bold tracking-tight ${HEADING}`}>Documents</h1>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
              Manage, organize and track all your trade documents in one place.
            </p>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
            <div className="relative flex-1 md:flex-none">
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
            </button>
            {/*<button onClick={() => setUploadShipment(true)} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-[11px] sm:text-xs font-semibold px-3 sm:px-4 py-2 rounded-xl text-white shadow-xs transition whitespace-nowrap">
              <Upload size={14} />
              Upload Shipment
            </button>*/}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-5">
          {KPI_STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white border border-slate-100 p-3 sm:p-3.5 rounded-2xl shadow-xs flex flex-col justify-between hover:shadow-md transition duration-200">
                <div className="flex justify-between items-start gap-2">
                  <span className={`text-[10px] sm:text-[11px] font-bold leading-tight ${HEADING}`}>{stat.title}</span>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${stat.bg} ${stat.color}`}>
                    <Icon size={15} />
                  </div>
                </div>
                <div className="mt-2.5">
                  <h4 className={`text-sm sm:text-lg font-bold tracking-tight ${HEADING}`}>{stat.value}</h4>
                  {stat.change && (<span className={`text-[9px] font-bold block mt-0.5 ${stat.up ? "text-green-500" : "text-rose-500"}`}>
                    {stat.change}
                    </span> )}
                </div>
              </div>
            );
          })}
          {/*<div className="bg-white border border-slate-100 p-3 sm:p-3.5 rounded-2xl shadow-xs flex flex-col justify-between hover:shadow-md transition duration-200">
            <div className="flex justify-between items-start gap-2">
              <span className={`text-[10px] sm:text-[11px] font-semibold leading-tight ${HEADING}`}>Storage Used</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-indigo-50 text-indigo-500">
                <Archive size={15} />
              </div>
            </div>
            <div className="mt-2.5">
              <h4 className={`text-sm sm:text-base font-extrabold tracking-tight ${HEADING}`}>{((storage.totalStorage || 0) / (1024 * 1024)).toFixed(2)} MB</h4>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1.5">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: "100%" }} />
              </div>
              <span className="text-[9px] font-bold block mt-1 text-slate-400">{storage.documents || 0} Documents</span>
            </div>
          </div>*/}
        </div>

        <SectionCard className="mb-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-3 items-end">
            <div>
              <label className="text-[10px] text-[##06145F] #06145F font-bold block mb-1.5 uppercase">Search Document</label>
              <div className="relative">
                <input value={selectedDocSearch} onChange={(e) => setSelectedDocSearch(e.target.value)}
                  placeholder="Search by document name, type"
                  className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs focus:outline-none placeholder-slate-400"
                />
                <Search size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
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
            <div>
              <label className="text-[10px] text-[##06145F] font-bold block mb-1.5 uppercase">Status</label>
              <div className="relative">
                <select value={selectedDocStatus} onChange={(e) => setSelectedDocStatus(e.target.value)} className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none">
                  <option value="">All Status</option>
                  { filterOptions.status?.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  )) }
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="text-[10px] text-[##06145F] font-bold block mb-1.5 uppercase">Country</label>
              <div className="relative">
                <select  value={selectedDocCountry} onChange={(e) => setSelectedDocCountry(e.target.value)} className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none">
                  <option value="">All Countries</option>
                  { filterOptions.countries?.map((country) => (
                    <option key={country} value={country}>{country}</option>
                  )) }
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="text-[10px] text-[##06145F] font-bold block mb-1.5 uppercase">Document Type</label>
              <div className="relative">
                <select value={selectedDocType} onChange={(e) => setSelectedDocType(e.target.value)} className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none">
                  <option value="">All Types</option>
                  { filterOptions.documentTypes?.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  )) }
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="text-[10px] text-[##06145F] font-bold block mb-1.5 uppercase">Shipment / Ref No.</label>
              <div className="relative">
                <select  value={selectedDocShipment} onChange={(e) => setSelectedDocShipment(e.target.value)} className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none">
                  <option value="">All Shipments</option>
                  { filterOptions.shipments?.map((shipment) => (
                    <option key={shipment._id} value={shipment._id}>{shipment.sbNumber}</option>
                  )) }
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
             <div className="flex justify-end gap-2 mt-3">
            <button onClick={handleApplyDocumentFilters} className="flex-1  whitespace-nowrap bg-slate-50/80 border border-slate-200 text-slate-600 rounded-xl py-2 px-4 text-xs font-semibold hover:bg-slate-100 transition">
              Apply Filters
            </button>
            <button onClick={handleResetDocumentFilters} className="flex-1 text-slate-400 hover:text-slate-600 text-xs font-medium px-1">Reset</button>
          </div>
          </div>
          {/* <div>
            
          </div> */}
         
        </SectionCard>

        <SectionCard className="mb-5">
          <h3 className={`font-bold text-base mb-4 ${HEADING}`}>Document List ({filteredDocuments.length})</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-[11px] min-w-[920px]">
              <thead>
                <tr className="text-[10px] text-[#06145F] uppercase font-bold border-b border-slate-100">
                  <th className="text-left py-2 pr-2"><input type="checkbox" className="accent-blue-600" /></th>
                  <th className="text-left py-2 font-bold">Document Name</th>
                  <th className="text-left py-2 font-bold">Type</th>
                  <th className="text-left py-2 font-bold">Shipment / Ref No.</th>
                  <th className="text-left py-2 font-bold">Related To</th>
                  <th className="text-left py-2 font-bold">Country</th>
                  <th className="text-left py-2 font-bold">Upload Date</th>
                  {/*<th className="text-left py-2 font-bold">Expiry Date</th>*/}
                  <th className="text-left py-2 font-bold">Status</th>
                  <th className="text-right py-2 font-bold">Action</th>
                  {/*<th className="text-right py-2 font-bold">Actions</th>*/}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {paginatedDocuments.map((d, i) => (
                  <tr key={i}>
                    <td className="py-3 pr-2"><input type="checkbox" className="accent-blue-600" /></td>
                    <td className="py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <DocIcon type={d.documentType} />
                        <span className="text-blue-600 text-xs font-bold  cursor-pointer">{d.documentName}</span>
                       {/* <span className="text-1px text-teal-600 truncate">{d.fileName ||
                          d.fileUrl?.split("/").pop() ||
                          "-"}</span>*/}
                      </div>
                    </td>
                    <td className="py-3 text-slate-600  font-bold whitespace-nowrap">{d.documentType}</td>
                    <td className={`py-3 font-bold whitespace-nowrap ${HEADING}`}>{d.shipmentId?.sbNumber || "-"}</td>
                    <td className="py-3 text-slate-500  font-bold whitespace-nowrap">{d.relatedTo || "-"}</td>
                    <td className="py-3 whitespace-nowrap">
                      <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                        <Flag country={d.country} /> {d.country || "-"}
                      </span>
                    </td>
                    <td className="py-3 text-slate-500 font-bold whitespace-nowrap">{new Date(d.createdAt).toLocaleDateString()}</td>
                    {/*<td className="py-3 text-slate-500 font-bold whitespace-nowrap">{d.expiry  ? new Date(d.expiryDate).toLocaleDateString() : "-"}</td>*/}
                    <td className="py-3"><StatusBadge status={d.status} /></td>
                    <td className="py-3 text-right">
  <button
    onClick={() => handleViewDocument(d)}
    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-600 text-[10px] font-bold hover:bg-blue-100 transition"
  >
    <Eye size={13} />
    View
  </button>
</td>
                    {/*<td className="py-3 text-right">
                      <button className="text-slate-400 hover:text-slate-600">
                        <MoreVertical size={15} />
                      </button>
                    </td>*/}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4 pt-3 border-t border-slate-100">
  <span className="text-[11px] text-blue-500 font-medium">
    {filteredDocuments.length > 0
      ? `Showing ${documentStartIndex + 1} to ${Math.min(
          documentStartIndex + documentsPerPage,
          filteredDocuments.length
        )} of ${filteredDocuments.length} documents`
      : "Showing 0 to 0 of 0 documents"}
  </span>

  {totalDocumentPages > 1 && (
    <div className="flex items-center gap-1.5">
      <button
        onClick={() =>
          setCurrentDocumentPage((prev) => Math.max(prev - 1, 1))
        }
        disabled={currentDocumentPage === 1}
        className={`w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 transition ${
          currentDocumentPage === 1
            ? "text-slate-300 cursor-not-allowed"
            : "text-slate-500 hover:bg-slate-50"
        }`}
      >
        <ChevronLeft size={14} />
      </button>

      {visibleDocumentPages.map((page, index) => (
        <React.Fragment key={page}>
          {index > 0 &&
            visibleDocumentPages[index - 1] !== page - 1 && (
              <span className="text-slate-400 text-[11px] px-1">
                ...
              </span>
            )}

          <button
            onClick={() => setCurrentDocumentPage(page)}
            className={`w-7 h-7 flex items-center justify-center rounded-lg text-[11px] font-bold transition ${
              currentDocumentPage === page
                ? "bg-blue-600 text-white"
                : "text-slate-500 hover:bg-slate-100"
            }`}
          >
            {page}
          </button>
        </React.Fragment>
      ))}

      <button
        onClick={() =>
          setCurrentDocumentPage((prev) =>
            Math.min(prev + 1, totalDocumentPages)
          )
        }
        disabled={currentDocumentPage === totalDocumentPages}
        className={`w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 transition ${
          currentDocumentPage === totalDocumentPages
            ? "text-slate-300 cursor-not-allowed"
            : "text-slate-500 hover:bg-slate-50"
        }`}
      >
        <ChevronRight size={14} />
      </button>
    </div>
  )}
</div>
        </SectionCard>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-5">
          <SectionCard>
            <div className="flex justify-between items-center mb-3">
              <h3 className={`font-bold text-sm ${HEADING}`}>Documents by Type</h3>
              <button  onClick={() => setDateRange(true)}  className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg px-2 py-1 text-[10px] font-semibold text-slate-600 shrink-0">
                This Month <ChevronDown size={11} className="text-slate-400" />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative w-[120px] h-[120px] shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={DOC_TYPE_DIST} innerRadius={36} outerRadius={56} dataKey="value" stroke="none">
                      {DOC_TYPE_DIST.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className={`font-black text-base ${HEADING}`}>{totalDocuments}</span>
                  <span className="text-[8px] text-slate-400 font-bold uppercase leading-none">Total</span>
                </div>
              </div>
              <div className="space-y-1.5 flex-1 text-[10px]">
                {DOC_TYPE_DIST.map((r, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: r.color }} />
                      <span className="text-slate-600 font-semibold truncate max-w-[100px]">{r.name}</span>
                    </div>
                    <span className={`font-bold whitespace-nowrap ${HEADING}`}>{r.value} ({r.percent})</span>
                  </div>
                ))}
              </div>
            </div>
            {/*<button className="text-blue-600 text-xs font-bold text-center mt-3 pt-2 border-t border-slate-50 w-full">
              View All Types →
            </button>*/}
          </SectionCard>

          <SectionCard>
            <div className="flex justify-between items-center mb-3">
              <h3 className={`font-bold text-sm ${HEADING}`}>Document Status Overview</h3>
              <button onClick={() => setDateRange(true) } className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg px-2 py-1 text-[10px] font-semibold text-slate-600 shrink-0">
                This Month <ChevronDown size={11} className="text-slate-400" />
              </button>
            </div>
            <div className="h-[130px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={STATUS_TREND} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid stroke="#F1F5F9" vertical={false} />
                  <XAxis dataKey="date" tick={{ fill: "#94a3b8", fontSize: 8 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fill: "#94a3b8", fontSize: 9 }} tickLine={false} axisLine={false} width={30} />
                  <Tooltip />
                  <Line type="monotone" dataKey="verified" stroke="#10B981" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="transit" stroke="#06B6D4" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="pending" stroke="#F59E0B" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="expired" stroke="#EF4444" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-3 justify-center mt-2 text-[10px] font-semibold text-slate-500">
              <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Verified</span>
              <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-cyan-500" /> In Transit</span>
              <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-amber-400" /> Pending</span>
              <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-rose-500" /> Expired</span>
            </div>
           {/* <button className="text-blue-600 text-xs font-bold text-center mt-3 pt-2 border-t border-slate-50 w-full">
              View Detailed Analytics →
            </button>*/}
          </SectionCard>

          <SectionCard>
            <div className="flex items-center gap-1.5 mb-3">
              <Sparkles size={14} className="text-blue-500" />
              <h3 className={`font-bold text-sm ${HEADING}`}>Document Insights</h3>
            </div>
            <div className="space-y-3">
              {DOC_INSIGHTS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${s.bg} ${s.color}`}>
                      <Icon size={14} />
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-700 font-semibold leading-snug">{s.text}</p>
                      <p className="text-[10px] text-emerald-500 font-semibold mt-0.5">{s.sub}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </SectionCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-5 mb-4">
          {/*<SectionCard>
            <ViewAllHeader title="Expiring Soon" />
            <div className="space-y-2.5">
              {expiringDocuments.map((doc, i) => {
                 const daysLeft = Math.ceil(
                 (new Date(doc.expiryDate) - new Date()) / (1000 * 60 * 60 * 24)
                 );
                 const level =  daysLeft <= 7 ? "critical": daysLeft <= 30 ? "warn" : "safe";
                const badgeStyles = {
                  warn: "bg-amber-100 text-amber-600",
                  critical: "bg-rose-100 text-rose-600",
                  safe: "bg-green-100 text-green-600",
                };
                return (
                  <div key={i} className="flex items-center justify-between gap-2 border border-slate-100 rounded-xl p-2.5">
                    <div className="flex items-center gap-2.5">
                      <AlertTriangle size={14} className="text-orange-400 shrink-0" />
                      <div>
                        <p className={`text-[11px] font-bold ${HEADING}`}>{doc.shipmentId?.sbNumber} <span className="text-slate-500 font-medium">{doc.documentType}</span></p>
                        <p className="text-[10px] text-slate-400">Expires on {new Date(doc.expiryDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full whitespace-nowrap ${badgeStyles[level]}`}>{daysLeft} days left</span>
                  </div>
                );
              })}
            </div>
          </SectionCard>*/}

          <SectionCard>
            <ViewAllHeader title="Recent Uploads"  onClick={() => setRecentUpload(true)} />
            <div className="overflow-x-auto">
              <table className="w-full text-[11px] min-w-[400px]">
                <thead>
                  <tr className="text-[9px] text-slate-400 uppercase font-bold">
                    <th className="text-left pb-2 font-bold">Document</th>
                    <th className="text-left pb-2 font-bold">Type</th>
                    <th className="text-left pb-2 font-bold">Date</th>
                    <th className="text-left pb-2 font-bold">Uploaded By</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {recentUploads.slice(0, 5).map((u) => (
                    <tr key={u._id}>
                      <td className="py-2.5">
                        <div className="flex items-center gap-2">
                          <DocIcon type={u.documentType} />
                          <span className="text-blue-600 font-semibold  whitespace-nowrap">{u.documentName}</span>
                        </div>
                      </td>
                      <td className="py-2.5 text-slate-600 whitespace-nowrap">{u.documentType}</td>
                      <td className="py-2.5 text-slate-500 whitespace-nowrap">{u.createdAt && new Date(u.createdAt).toLocaleDateString()}</td>
                      <td className="py-2.5 text-slate-600 whitespace-nowrap">{u.uploadedBy?.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </div>
      </div>

      {exportReport && (
        <ExportReport onClose={() => setExportReport(false)} />
      )}

       {dateRange && (
             <DateRangeModal onClose={() => setDateRange(false)}/>
           )}

         { uploadShipment && (
          <UploadShipment onClose={() => setUploadShipment(false)}/>
         )}

         {recentUpload && (
          <AllRecentUploadsModal onClose={() => setRecentUpload(false)} />
         )}

        {documentViewModal && selectedDocument && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-3 sm:p-5">
    <div className="bg-white w-full max-w-6xl max-h-[92vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
      
      {/* HEADER */}
      <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-100 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <DocIcon type={selectedDocument.documentType} />

          <div className="min-w-0">
            <h2 className={`text-base sm:text-lg font-bold truncate ${HEADING}`}>
              {selectedDocument.documentName ||
                selectedDocument.fileName ||
                "Document Details"}
            </h2>

            <p className="text-[11px] text-slate-400 mt-0.5">
              {selectedDocument.documentType || "Document"}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setDocumentViewModal(false);
            setSelectedDocument(null);
          }}
          className="w-9 h-9 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-500 transition shrink-0"
        >
          <X size={19} />
        </button>
      </div>

      {/* CONTENT */}
      <div className="overflow-y-auto p-4 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5">

          {/* DOCUMENT PREVIEW */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 min-h-[500px] flex flex-col">
            
            <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200">
              <div className="flex items-center gap-2 min-w-0">
                <FileText size={16} className="text-blue-600 shrink-0" />

                <span className={`text-xs font-bold truncate ${HEADING}`}>
                  {selectedDocument.documentName ||
                    selectedDocument.fileName ||
                    "Document Preview"}
                </span>
              </div>

              {selectedDocument.fileUrl && (
                <button
                  onClick={() =>
                    window.open(getDocumentFileUrl(selectedDocument.fileUrl), "_blank")
                  }
                  className="shrink-0 ml-3 flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold transition"
                >
                  <Eye size={12} />
                  Open Document
                </button>
              )}
            </div>

            <div className="flex-1 min-h-[450px] bg-slate-100">
              {selectedDocument.fileUrl ? (
                selectedDocument.fileUrl
                  .toLowerCase()
                  .match(/\.(jpg|jpeg|png|webp)$/i) ? (
                  <div className="w-full h-full min-h-[450px] flex items-center justify-center p-4">
                    <img
                      src={getDocumentFileUrl(selectedDocument.fileUrl)}
                      alt={selectedDocument.documentName || "Document"}
                      className="max-w-full max-h-[650px] object-contain rounded-lg shadow-sm"
                    />
                  </div>
                ) : (
                  <iframe
                    src={getDocumentFileUrl(selectedDocument.fileUrl)}
                    title={selectedDocument.documentName || "Document Preview"}
                    className="w-full min-h-[500px] border-0"
                  />
                )
              ) : (
                <div className="min-h-[450px] flex flex-col items-center justify-center text-center p-6">
                  <div className="w-16 h-16 rounded-2xl bg-slate-200 flex items-center justify-center mb-4">
                    <FileText size={28} className="text-slate-400" />
                  </div>

                  <p className={`font-bold text-sm ${HEADING}`}>
                    Document preview unavailable
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    No document file is available for this record.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* DOCUMENT DETAILS */}
          <div className="border border-slate-200 rounded-2xl bg-white h-fit">
            
            <div className="px-5 py-4 border-b border-slate-100">
              <h3 className={`text-sm font-bold ${HEADING}`}>
                Document Details
              </h3>

              <p className="text-[10px] text-slate-400 mt-1">
                Complete information for this document
              </p>
            </div>

            <div className="p-5 space-y-4">

              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Document Name
                </p>

                <p className={`text-xs font-bold break-words ${HEADING}`}>
                  {selectedDocument.documentName ||
                    selectedDocument.fileName ||
                    "-"}
                </p>
              </div>

              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Document Type
                </p>

                <p className="text-xs font-semibold text-slate-700">
                  {selectedDocument.documentType || "-"}
                </p>
              </div>

              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Shipment / Ref No.
                </p>

                <p className={`text-xs font-bold ${HEADING}`}>
                  {selectedDocument.shipmentId?.sbNumber ||
                    selectedDocument.shipmentId?.shipmentNumber ||
                    "-"}
                </p>
              </div>

              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Related To
                </p>

                <p className="text-xs font-semibold text-slate-700">
                  {selectedDocument.relatedTo || "-"}
                </p>
              </div>

              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Country
                </p>

                <div className="flex items-center gap-2">
                  {selectedDocument.country && (
                    <Flag
                      country={selectedDocument.country}
                      size={16}
                    />
                  )}

                  <span className="text-xs font-semibold text-slate-700">
                    {selectedDocument.country || "-"}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Upload Date
                </p>

                <p className="text-xs font-semibold text-slate-700">
                  {selectedDocument.createdAt
                    ? new Date(
                        selectedDocument.createdAt
                      ).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "-"}
                </p>
              </div>

              {selectedDocument.expiryDate && (
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                    Expiry Date
                  </p>

                  <p className="text-xs font-semibold text-slate-700">
                    {new Date(
                      selectedDocument.expiryDate
                    ).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              )}

              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Status
                </p>

                <StatusBadge
                  status={selectedDocument.status}
                />
              </div>

              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Uploaded By
                </p>

                <p className="text-xs font-semibold text-slate-700">
                  {selectedDocument.uploadedBy?.name ||
                    selectedDocument.createdBy?.name ||
                    "-"}
                </p>
              </div>

              {selectedDocument.fileName && (
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                    File Name
                  </p>

                  <p className="text-xs font-semibold text-slate-700 break-all">
                    {selectedDocument.fileName}
                  </p>
                </div>
              )}

              {selectedDocument.fileSize && (
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                    File Size
                  </p>

                  <p className="text-xs font-semibold text-slate-700">
                    {(selectedDocument.fileSize / 1024).toFixed(2)} KB
                  </p>
                </div>
              )}

              {selectedDocument.fileUrl && (
                <button
                  onClick={() =>
                    window.open(
                      getDocumentFileUrl(selectedDocument.fileUrl),
                      "_blank"
                    )
                  }
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-3 rounded-xl transition"
                >
                  <Download size={15} />
                  Open Document
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}
         
    </div>
  );
}