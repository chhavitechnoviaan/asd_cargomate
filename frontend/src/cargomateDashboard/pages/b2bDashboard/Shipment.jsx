import React, { useState,useEffect,useMemo } from "react";
import ReactCountryFlag from "react-country-flag";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//changes//
import {
  getShipments,
  getDashboard,
  getShipmentStatusOverview,
  getShipmentsByMode,
  getTopOriginCountries,
  getRecentAlerts,
  getTopDestinationCountries,
  getFilterOptions,
  getShipmentDetails,
  getShipmentTracker,
} from "../../api/ShipmentApi";
import {
  getQuotationByShipment,
  acceptQuotation,
  rejectQuotation
} from "../../api/QuotationApi";
import B2BQuotation from "../../components/b2bComponent/B2BQuotation";
import ViewShipment from "../../components/b2bComponent/ShipmentView";
import {
  CalendarDays,
  Download,
  Plus,
  Search,
  ChevronDown,
  Square,
  RectangleHorizontal,
  CheckCircle2,
  Clover,
  ArrowUpCircle,
  Gem,
  MoreVertical,
  Anchor,
  Plane,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  AlertCircle,
  Info,
  Clock,
  Check,
  MapPin,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const HEADING = "text-[#07156B]";
import ShipmentForm from "../../components/ShipmentForm";
import RecentHighRiskAlertsModal from "../../components/b2bComponent/RecentHighRisk";
import DateRangeModal from "../../components/b2bComponent/DateRange";
import ExportReport from "../../components/b2bComponent/ExportReport";
import ShipmentTrackingModal from "../../components/b2bComponent/ShipmentTracking";
const COUNTRY_CODES = {
  China: "CN",
  India: "IN",
  "South Korea": "KR",
  Netherlands: "NL",
  Germany: "DE",
  UAE: "AE",
  USA: "US",
  Japan: "JP",
  Australia: "AU",
  Singapore: "SG",
  Indonesia: "ID",
  Belgium: "BE",
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
    "In Transit": "bg-blue-100 text-blue-600",
    Pending: "bg-amber-100 text-amber-600",
    Delayed: "bg-rose-100 text-rose-600",
    Exception: "bg-purple-100 text-purple-600",
    Delivered: "bg-green-100 text-green-600",
  };
  return <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg whitespace-nowrap ${styles[status]}`}>{status}</span>;
}

 
const TABS = ["All Shipments", "In Transit", "Pending", "Delivered", "Delayed", "Exception"];

function SectionCard({ children, className = "" }) {
  return (
    <div className={`bg-white border border-slate-100 rounded-2xl p-4 shadow-xs ${className}`}>
      {children}
    </div>
  );
}

function DropdownButton({ text, onClick }) {
  return (
    <button   onClick={onClick} className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg px-2 py-1 text-[10px] font-semibold text-slate-600 shrink-0">
      {text} <ChevronDown size={11} className="text-slate-400" />
    </button>
  );
}

export default function Shipment({setActiveTab:setParentTab, activeTab:parentTab, currectTab}) {
  const [activeTab, setActiveTab] = useState("All Shipments");
  //changes//
  const [dashboard, setDashboard] = useState({});
  const [shipments, setShipments] = useState([]);
  const [statusOverview, setStatusOverview] = useState([]);
  const [shipmentModes, setShipmentModes] = useState([]);
  const [originCountries, setOriginCountries] = useState([]);

  // ---- Shipment Tracker state ----
  // shipmentTracker  -> holds the ACTUAL tracking data fetched from the backend
  // showTrackingModal -> boolean that controls whether the tracking modal is open
  // (previously these two got mixed up, which is why tracking never showed up)
  const [shipmentTracker, setShipmentTracker] = useState(null);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [trackingId, setTrackingId] = useState("");
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [trackingShipmentId, setTrackingShipmentId] = useState("");

  const [destinationCountries, setDestinationCountries] = useState([]);
  const [recentAlerts, setRecentAlerts] = useState([]);
  const [filters, setFilters] = useState({status: ["All Status", "Active", "Inactive" , "Pending", "Approved", "Completed","Expired", "Draft", "Under Review"], origins: ["India", "USA" , "China"], destinations: ["India", "USA" , "China"], modes: ["Sea freight", "Air Freight", "Rail Freight", "Road Freight", "Multimodal", "Express"],});
  const [loading, setLoading] = useState(false);
  const [shipment, setShipment] = useState("")
  const [highRisk, setHighRisk] = useState(false)
    const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null)
  const [shipmentStartDate, setShipmentStartDate] = useState(null);
  const [shipmentEndDate, setShipmentEndDate] = useState(null);
   const [dateRange, setDateRange] = useState(false)
   const [exportReport, setExportReport] = useState(false)

   const [searchQuery, setSearchQuery] = useState("");
const [selectedStatus, setSelectedStatus] = useState("");
const [selectedOrigin, setSelectedOrigin] = useState("");
const [selectedDestination, setSelectedDestination] = useState("");
const [selectedMode, setSelectedMode] = useState("");
const [openMenu, setOpenMenu] = useState(null);
const [selectedShipment, setSelectedShipment] = useState(null);
const [showShipmentView, setShowShipmentView] = useState(false);
const [viewShipmentId, setViewShipmentId] = useState(null);
const [showQuotation, setShowQuotation] = useState(false);
const [selectedQuotation, setSelectedQuotation] = useState(null);
const [quotationLoading, setQuotationLoading] = useState(false);
const [appliedFilters, setAppliedFilters] = useState({
  search: "",
  status: "",
  origin: "",
  destination: "",
  mode: "",
  startDate: null,
  endDate: null,
});
const [editShipmentId, setEditShipmentId] = useState(null);


  const fetchShipments = async () => {
  try {
    setLoading(true);

    const res = await getShipments();

    console.log("Shipment Response", res.data);

    setShipments(res.data.data || []);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

const fetchDashboard = async () => {
  try {
    const res = await getDashboard();

    console.log("Dashboard Response", res.data);

    setDashboard(res.data.data);
  } catch (err) {
    console.log(err);
  }
};

const fetchStatusOverview = async () => {
  try {
    const res = await getShipmentStatusOverview();

    setStatusOverview(res.data.data || []);
  } catch (error) {
    console.error(error);
  }
};

const fetchShipmentModes = async () => {
  try {
    const res = await getShipmentsByMode();
    setShipmentModes(res.data.data || []);
  } catch (error) {
    console.error(error);
  }
};

const fetchTopOriginCountries = async () => {
  try {
    const res = await getTopOriginCountries();
    setOriginCountries(res.data.data || []);
  } catch (error) {
    console.error(error);
  }
};

const fetchTopDestinationCountries = async () => {
  try {
    const res = await getTopDestinationCountries();
    setDestinationCountries(res.data.data || []);
  } catch (error) {
    console.error(error);
  }
};

const fetchRecentAlerts = async () => {
  try {
    const res = await getRecentAlerts();
    setRecentAlerts(res.data.data || []);
  } catch (error) {
    console.error(error);
  }
};
const fetchShipmentTracker = async (id) => {
  const enteredId = id?.trim();

  if (!enteredId) {
    setShipmentTracker(null);
    setTrackingShipmentId("");
    return null;
  }

  try {
    setTrackingLoading(true);

    console.log("Entered Reference ID:", enteredId);

    // Reference Number se actual MongoDB _id find karo
    const matchedShipment = shipments.find((s) => {
      const referenceNumber =
        s.referenceNumber ||
        s.sbNumber ||
        "";

      return (
        referenceNumber.toLowerCase() ===
        enteredId.toLowerCase()
      );
    });

    console.log("Matched Shipment:", matchedShipment);

    if (!matchedShipment?._id) {
      console.log("Shipment not found for reference:", enteredId);

      setShipmentTracker(null);
      setTrackingShipmentId("");

      return null;
    }

    // Backend tracker API Mongo _id leta hai
    const mongoId = matchedShipment._id;

    console.log("Calling tracker API with Mongo ID:", mongoId);

    const res = await getShipmentTracker(mongoId);

    console.log("Tracker API Response:", res.data);

    const trackerData = res.data?.data;

    if (trackerData) {
      setShipmentTracker(trackerData);
      setTrackingShipmentId(mongoId);
      setTrackingId(enteredId);

      return trackerData;
    }

    setShipmentTracker(null);
    setTrackingShipmentId("");

    return null;

  } catch (error) {
    console.error("Tracker Error:", error);

    setShipmentTracker(null);
    setTrackingShipmentId("");

    return null;

  } finally {
    setTrackingLoading(false);
  }
};const fetchFilterOptions = async () => {
  try {
    const res = await getFilterOptions();
    setFilters(res.data.data || []);
  } catch (error) {
    console.error(error);
  }
};

const handleApplyFilters = () => {
  setAppliedFilters({
    search: searchQuery,
    status: selectedStatus,
    origin: selectedOrigin,
    destination: selectedDestination,
    mode: selectedMode,
    startDate: startDate,
    endDate: endDate,
  });
};
const handleResetFilters = () => {
  setSearchQuery("");
  setSelectedStatus("");
  setSelectedOrigin("");
  setSelectedDestination("");
  setSelectedMode("");
  setStartDate(null);
  setEndDate(null);

  setAppliedFilters({
    search: "",
    status: "",
    origin: "",
    destination: "",
    mode: "",
    startDate: null,
    endDate: null,
  });
};
const filteredShipments = useMemo(() => {
  return shipments.filter((s) => {
    const shipmentId =
      s.referenceNumber ||
      s.sbNumber ||
      "";

    const awbNumber =
      s.additionalInformation?.awbNumber ||
      "";

    const product =
      s.cargo?.productName ||
      "";

    const hsCode =
      s.cargo?.hsCode?.hsCode ||
      "";

    const status =
      s.status ||
      s.shipmentStatus ||
      "";

    const origin =
      s.route?.origin ||
      s.route?.originCountry ||
      "";

    const destination =
      s.route?.destination ||
      s.route?.destinationCountry ||
      "";

    const mode =
      s.route?.mode ||
      "";

    const shipmentDate = s.shipmentDate
      ? new Date(s.shipmentDate)
      : null;

    const searchText = `
      ${shipmentId}
      ${awbNumber}
      ${product}
      ${hsCode}
      ${origin}
      ${destination}
    `.toLowerCase();

    // Search
    if (
      appliedFilters.search &&
      !searchText.includes(
        appliedFilters.search.toLowerCase()
      )
    ) {
      return false;
    }

    // Status
    if (
      appliedFilters.status &&
      status !== appliedFilters.status
    ) {
      return false;
    }

    // Origin
    if (
      appliedFilters.origin &&
      origin !== appliedFilters.origin
    ) {
      return false;
    }

    // Destination
    if (
      appliedFilters.destination &&
      destination !== appliedFilters.destination
    ) {
      return false;
    }

    // Mode
    if (
      appliedFilters.mode &&
      mode !== appliedFilters.mode
    ) {
      return false;
    }

    // Date range
    if (
      appliedFilters.startDate &&
      shipmentDate < new Date(
        new Date(appliedFilters.startDate).setHours(0, 0, 0, 0)
      )
    ) {
      return false;
    }

    if (
      appliedFilters.endDate &&
      shipmentDate > new Date(
        new Date(appliedFilters.endDate).setHours(23, 59, 59, 999)
      )
    ) {
      return false;
    }

    return true;
  });
}, [shipments, appliedFilters]);
const KPI_STATS = [
  { title: "Total Shipments", value: dashboard.totalShipments || 0, change: "▲ 16.8% vs last month", icon: Square, bg: "bg-blue-50", color: "text-blue-500", up: true },
  { title: "In Transit", value: dashboard.inTransit || 0, change: "▲ 5.4% vs last month", icon: RectangleHorizontal, bg: "bg-blue-50", color: "text-blue-500", up: true },
  { title: "Delivered", value: dashboard.delivered || 0, change: "▲ 22.6% vs last month", icon: CheckCircle2, bg: "bg-emerald-50", color: "text-emerald-500", up: true },
  { title: "Delayed", value: dashboard.delayed || 0, change: "▼ 12.5% vs last month", icon: Clover, bg: "bg-rose-50", color: "text-rose-500", up: false },
  { title: "Exception", value: dashboard.exception || 0, change: "▼ 4.3% vs last month", icon: ArrowUpCircle, bg: "bg-rose-50", color: "text-rose-500", up: false },
  { title: "Total Shipment Value (INR)", value: `₹${(dashboard.shipmentValue / 10000000).toFixed(2)} Cr`, change: "▲ 16.7% vs last month", icon: Gem, bg: "bg-purple-50", color: "text-purple-500", up: true },
];

const STATUS_OVERVIEW = statusOverview.map((item) => ({
  name: item._id,
  value: item.count,
   percent:
    dashboard.totalShipments > 0
      ? ((item.count / dashboard.totalShipments) * 100).toFixed(1) + "%"
      : "0%",
  color:
    item._id === "In Transit"
      ? "#6366F1"
      : item._id === "Submitted"
      ? "#10B981"
      : item._id === "Pending"
      ? "#F59E0B"
      : item._id === "Delayed"
      ? "#EF4444"
      : "#A855F7",
}));

const TOP_DESTINATIONS = destinationCountries.map((item) => ({
  country: item._id,
  value: item.shipments,
  percent:
    dashboard.totalShipments > 0
      ? ((item.shipments / dashboard.totalShipments) * 100).toFixed(1) + "%"
      : "0%",
  width:
    dashboard.totalShipments > 0
      ? `${((item.shipments / dashboard.totalShipments) * 100).toFixed(1)}%`
      : "0%",
}));

const SHIPMENTS_BY_MODE = shipmentModes.map((item) => ({
  name: item._id,
  value: item.count,
   percent:
    dashboard.totalShipments > 0
      ? ((item.count / dashboard.totalShipments) * 100).toFixed(1) + "%"
      : "0%",
  color:
    item._id === "Sea"
      ? "#6366F1"
      : item._id === "Air"
      ? "#10B981"
      : item._id === "Road"
      ? "#F59E0B"
      : "#A855F7",
}));

const TOP_ORIGINS = originCountries.map((item) => ({
  country: item._id,
  value: item.shipments,
  percent:
    dashboard.totalShipments > 0
      ? ((item.shipments / dashboard.totalShipments) * 100).toFixed(1) + "%"
      : "0%",
  width:
    dashboard.totalShipments > 0
      ? `${(item.shipments / dashboard.totalShipments) * 100}%`
      : "0%",
}));

// ---- Build the step-tracker (the row of dots) from the real API shape ----
// Backend returns `trackingTimeline: [{ status, createdAt, current, ... }]`
const trackingTimelineData = shipmentTracker?.trackingTimeline || [];
const currentTrackIndex = trackingTimelineData.findIndex(
  (item) => item.current === true
);
const TRACKER_STEPS = trackingTimelineData.map((item, idx) => ({
  label: item.status,
  date: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "-",
  done: currentTrackIndex === -1 ? true : idx <= currentTrackIndex,
  current: idx === currentTrackIndex,
}));

const [currentPage, setCurrentPage] = useState(1);

const ITEMS_PER_PAGE = 10;
const totalPages = Math.max(
  1,
  Math.ceil(filteredShipments.length / ITEMS_PER_PAGE)
);
useEffect(() => {
  fetchShipments();
  fetchDashboard();
  fetchStatusOverview();

  fetchShipmentModes();
  fetchTopOriginCountries();
  fetchTopDestinationCountries();
  fetchRecentAlerts();
  fetchFilterOptions();
}, []);
useEffect(() => {
  if (shipments.length > 0 && !trackingId) {
    const firstShipment = shipments[0];

    const firstReference =
      firstShipment.referenceNumber ||
      firstShipment.sbNumber ||
      firstShipment._id ||
      "";

    setTrackingId(firstReference);

    if (firstShipment._id) {
      fetchShipmentTracker(firstShipment._id);
    }
  }
}, [shipments]);
useEffect(() => {
  const handleClickOutside = () => setOpenMenu(null);
  document.addEventListener("click", handleClickOutside);
  return () => document.removeEventListener("click", handleClickOutside);
}, []);
const handleOpenQuotation = async (shipmentData) => {
  try {
    setQuotationLoading(true);

    const shipmentId =
      shipmentData?._id ||
      shipmentData?.shipmentId;

    if (!shipmentId) {
      alert("Shipment ID not found");
      return;
    }

    console.log(
      "Fetching quotation for shipment:",
      shipmentId
    );

    const res = await getQuotationByShipment(shipmentId);

    console.log(
      "Quotation API Response:",
      res.data
    );

    const quotations =
      res.data?.data || [];

    const sharedQuotation =
      quotations.find(
        (quotation) =>
          quotation.status === "Shared"
      );

    if (!sharedQuotation) {
      alert(
        "No shared quotation available for this shipment"
      );
      return;
    }

    setSelectedShipment(shipmentData);
    setSelectedQuotation(sharedQuotation);
    setShowQuotation(true);
    setOpenMenu(null);

  } catch (error) {
    console.error(
      "FETCH QUOTATION ERROR:",
      error
    );

    alert(
      error?.response?.data?.message ||
      "Failed to fetch quotation"
    );

  } finally {
    setQuotationLoading(false);
  }
};
useEffect(() => {
  console.log("showQuotation:", showQuotation);
  console.log("selectedShipment:", selectedShipment);
}, [showQuotation, selectedShipment]);

  return (
    <div className="min-h-screen w-full overflow-y-auto bg-[#F8FAFC] text-slate-600  antialiased pt-5">
  {!shipment && ( <div className="max-w-[1500px] mx-auto p-3 sm:p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">
          <div>
            <h1 className={`text-xl sm:text-2xl font-bold tracking-tight ${HEADING}`}>Shipment</h1>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
              Track, manage and analyze your global shipments in real-time.
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
            <button  onClick={() => {
                setShipment("shipment")
                  setEditShipmentId(null);
              }} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-[11px] sm:text-xs font-semibold px-3 sm:px-4 py-2 rounded-xl text-white shadow-xs transition whitespace-nowrap">
              <Plus size={14} />
              Shipment
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-5">
          {KPI_STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white border border-slate-100 p-3 sm:p-3.5 rounded-2xl shadow-xs flex flex-col justify-between hover:shadow-md transition duration-200">
                <div className="flex justify-between items-start gap-2">
                  <span className={`text-[10px] sm:text-[13px] font-bold leading-tight ${HEADING}`}>{stat.title}</span>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${stat.bg} ${stat.color}`}>
                    <Icon size={15} />
                  </div>
                </div>
                <div className="mt-2.5">
                  <h4 className={`text-sm sm:text-base font-extrabold tracking-tight ${HEADING}`}>{stat.value}</h4>
                  <span className={`text-[9px] font-bold block mt-0.5 ${stat.up ? "text-green-500" : "text-rose-500"}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <SectionCard className="mb-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-3 items-end">
            <div>
              <label className="text-[10px] text-[#081B6B] font-bold block mb-1.5 uppercase">Search Shipment</label>
              <div className="relative">
                <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by B/L, Container, Ref. No."
                  className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs focus:outline-none placeholder-slate-400"
                />
                <Search size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>
           <div>
          <label className="text-[10px] text-[#081B6B] font-bold block mb-1.5 uppercase">
            Date Range
          </label>

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
            <CalendarDays
              size={13}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>
        </div>
            <div>
              <label className="text-[10px] text-[#081B6B] font-bold block mb-1.5 uppercase">Shipment Status</label>
              <div className="relative">
                <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none">
                  <option value="">All Status</option>
                  {filters.status?.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="text-[10px] text-[#081B6B] font-bold block mb-1.5 uppercase">Origin Country</label>
              <div className="relative">
                <select  value={selectedOrigin} onChange={(e) => setSelectedOrigin(e.target.value)} className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none">
                  <option value="">All Countries</option>
                  {filters.origins?.map((country) => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="text-[10px] text-[#081B6B] font-bold block mb-1.5 uppercase">Destination Country</label>
              <div className="relative">
                <select value={selectedDestination} onChange={(e) => setSelectedDestination(e.target.value)} className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none">
                  <option value="">All Countries</option>
                  {filters.destinations?.map((country) => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="text-[10px] text-[#081B6B] font-bold block mb-1.5 uppercase">Transport Mode</label>
              <div className="relative">
                <select  value={selectedMode} onChange={(e) => setSelectedMode(e.target.value)} className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none">
                  <option value="">All Modes</option>
                  {filters.modes?.map((mode) => (
                    <option key={mode} value={mode}>{mode}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 mt-3">
            <button onClick={handleApplyFilters} className=" flex bg-blue-100 border border-slate-200 text-slate-600 rounded-xl py-2 px-4 text-xs font-semibold hover:bg-slate-100 transition">
              Apply Filters
            </button>
            <button onClick={handleResetFilters} className="  flex-1 text-slate-400 hover:text-slate-600 text-xs font-medium px-1">Reset</button>
          </div>
          </div>
          
        </SectionCard>

        <div className="space-y-5 mb-5">
          <SectionCard className="w-full overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1150px] text-[10px]">
                <thead>
                  <tr className="text-[9px] text-[#081B6B] uppercase font-bold border-b border-slate-100">
                    <th className="text-left py-2 pr-2"><input type="checkbox" className="accent-blue-600" /></th>
                    <th className="text-left py-2 font-bold">Shipment / B.L No.</th>
                    <th className="text-left py-2 font-bold">Origin → Destination</th>
                    <th className="text-left py-2 font-bold">Status</th>
                    <th className="text-left py-2 font-bold">ETD / ATD</th>
                    <th className="text-left py-2 font-bold">ETA</th>
                    <th className="text-left py-2 font-bold">Mode</th>
                    <th className="text-left py-2 font-bold">Commodity</th>
                    <th className="text-right py-2 font-bold">Value</th>
                    <th className="text-right py-2 font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredShipments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  ).map((s, i) => (
                    <tr key={i}>
                      <td className="py-3 pr-2"><input type="checkbox" className="accent-blue-600" /></td>
                      <td className="py-3 whitespace-nowrap">
                        <div className={`font-bold ${HEADING}`}>{s.referenceNumber || s.sbNumber}</div>
                        <div className="text-[10px] text-slate-400">{s.additionalInformation?.awbNumber}</div>
                      </td>
                      <td className="py-3 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 font-medium text-slate-600">
                          <Flag country={s.route?.originCountry} /> {s.route?.originCity}
                        </div>
                        <div className="flex items-center gap-1.5 font-medium text-slate-600 mt-0.5">
                          → <Flag country={s.route?.destinationCountry} /> {s.route?.destinationCity}
                        </div>
                      </td>
                      <td className="py-3"><StatusBadge status={s.shipmentStatus} /></td>
                      <td className="py-3 font-medium whitespace-nowrap text-slate-500">
                        <div>{s.etd ? new Date(s.etd).toLocaleDateString() : "-"}</div>
                        <div>{s.atd ? new Date(s.atd).toLocaleDateString() : "-"}</div>
                      </td>
                      <td className="py-3  font-medium whitespace-nowrap text-slate-500">
                        <div>{s.eta ? new Date(s.eta).toLocaleDateString() : "-"}</div>
                        {s.etaNote && <div className={`font-semibold ${s.noteColor}`}>({s.etaNote})</div>}
                      </td>
                      <td className="py-3">
                        {s.route?.mode === "Sea" ? (
                          <Anchor size={14} className="text-slate-400" />
                        ) : (
                          <Plane size={14} className="text-slate-400" />
                        )}
                      </td>
                      <td className="py-3 whitespace-nowrap">
                        <div className="font-semibold text-slate-700">{s.cargo?.productName}</div>
                        <div className="text-[10px] text-slate-400">{s.cargo?.hsCode?.hsCode}</div>
                      </td>
                      <td className="py-3 text-right font-bold text-slate-800 whitespace-nowrap">₹{(s.cargo?.value / 10000000).toFixed(2)} Cr</td>
                      <td className="py-3 text-right relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                     setOpenMenu(openMenu === i ? null : i);
                    }}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <MoreVertical size={15} />
                  </button>

                  {openMenu === i && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute right-0 top-7 z-20 w-36 bg-white border border-gray-200 rounded-xl shadow-lg p-1.5 flex flex-col gap-1 text-left"
                    >
                      {s.shipmentStatus === "Draft" && (
      <button
        onClick={() => {
          setViewShipmentId(s._id);
          setShowShipmentView(true);
          setOpenMenu(null);
        }}
        className="w-full py-1.5 px-2.5 rounded-lg bg-blue-50 text-blue-600 font-medium text-xs text-left hover:bg-blue-100 transition-colors"
      >
        View
      </button>
    )}


<button
  onClick={(e) => {
    e.stopPropagation();

    console.log("Quotation clicked:", s);

   handleOpenQuotation(s);
  }}
  className="w-full py-1.5 px-2.5 rounded-lg bg-blue-50 text-green-600 font-medium text-xs text-left hover:bg-green-100 transition-colors"
>
  Quotation
</button>

                      <button
                        onClick={() => {
                          handleDelete(s.id);
                          setOpenMenu(null);
                        }}
                        className="w-full py-1.5 px-2.5 rounded-lg bg-red-50 text-red-600 font-medium text-xs text-left hover:bg-red-100 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                      )}
                    </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4 pt-3 border-t border-slate-100">

  <span className="text-[11px] text-slate-400 font-medium">
    Showing{" "}
    {filteredShipments.length === 0
      ? 0
      : (currentPage - 1) * ITEMS_PER_PAGE + 1}{" "}
    to{" "}
    {Math.min(
      currentPage * ITEMS_PER_PAGE,
      filteredShipments.length
    )}{" "}
    of {filteredShipments.length} shipments
  </span>

  <div className="flex items-center gap-1.5">

    <button
      onClick={() =>
        setCurrentPage((prev) => Math.max(prev - 1, 1))
      }
      disabled={currentPage === 1}
      className={`w-7 h-7 flex items-center justify-center rounded-lg border text-slate-400 ${
        currentPage === 1
          ? "border-slate-100 cursor-not-allowed opacity-50"
          : "border-slate-200 hover:bg-slate-50"
      }`}
    >
      <ChevronLeft size={14} />
    </button>

    {Array.from(
      { length: totalPages },
      (_, index) => index + 1
    )
      .filter(
        (page) =>
          page === 1 ||
          page === totalPages ||
          Math.abs(page - currentPage) <= 1
      )
      .map((page, index, pages) => (
        <React.Fragment key={page}>

          {index > 0 && pages[index - 1] !== page - 1 && (
            <span className="text-slate-400 text-[11px] px-1">
              ...
            </span>
          )}

          <button
            onClick={() => setCurrentPage(page)}
            className={`w-7 h-7 flex items-center justify-center rounded-lg text-[11px] font-bold ${
              currentPage === page
                ? "bg-blue-600 text-white"
                : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            {page}
          </button>

        </React.Fragment>
      ))}

    <button
      onClick={() =>
        setCurrentPage((prev) =>
          Math.min(prev + 1, totalPages)
        )
      }
      disabled={currentPage === totalPages}
      className={`w-7 h-7 flex items-center justify-center rounded-lg border text-slate-400 ${
        currentPage === totalPages
          ? "border-slate-100 cursor-not-allowed opacity-50"
          : "border-slate-200 hover:bg-slate-50"
      }`}
    >
      <ChevronRight size={14} />
    </button>

  </div>
</div>
                    </SectionCard>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
             <SectionCard>
            <div className="flex justify-between items-center mb-3">
              <h3 className={`font-bold text-sm ${HEADING}`}>Recent Alerts</h3>
              <button className="text-blue-600 text-[11px] font-bold" onClick={() => setHighRisk(true)}>View All →</button>
            </div>
            <div className="space-y-2.5">
              {recentAlerts.map((a, i) => {
                const Icon = AlertTriangle;
                const color =
  a.type === "Critical"
    ? "text-red-500"
    : a.type === "Warning"
    ? "text-orange-500"
    : "text-blue-500";

const bg =
  a.type === "Critical"
    ? "bg-red-50"
    : a.type === "Warning"
    ? "bg-orange-50"
    : "bg-blue-50";
                return (
                  <div key={a._id || i} className="flex items-start gap-2.5">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${bg} ${color}`}>
                      <Icon size={13} />
                    </div>
                    <div className="flex-1">
                      <p className={`text-[11px] font-semibold leading-snug ${HEADING}`}>{a.title || "-"}</p>
                      <p className="text-[10px] text-slate-400">{a.message || "-"}</p>
                    </div>
                    <span className="text-[9px] text-slate-400 font-medium whitespace-nowrap"> {a.createdAt ? new Date(a.createdAt).toLocaleTimeString() : "-"}</span>
                  </div>
                );
              })}
            </div>
          </SectionCard>

         {/* ---- Shipment Tracker ---- */}
<SectionCard>

  <div className="flex justify-between items-center mb-3">
    <h3 className={`font-bold text-sm ${HEADING}`}>
      Shipment Tracker
    </h3>

    <button
      className="text-xs font-semibold hover:underline text-blue-600"
      onClick={async () => {
    const enteredId = trackingId?.trim();

    if (!enteredId) return;

    const data = await fetchShipmentTracker(enteredId);

    if (data) {
      setShowTrackingModal(true);
    }
  }}
    >
      View
    </button>
  </div>

  {/* TRACKING ID INPUT */}
  <div className="mb-4">

    <label className="text-[9px] text-slate-400 font-semibold block mb-1">
      Shipment Reference ID
    </label>

    <div className="flex gap-2">

      <input
        type="text"
        value={trackingId}
        onChange={(e) => {
          setTrackingId(e.target.value);
        }}
        onKeyDown={async (e) => {
          if (e.key === "Enter") {
            const id = e.currentTarget.value.trim();

            if (!id) return;

            await fetchShipmentTracker(id);
          }
        }}
        placeholder="Enter Shipment ID"
        className="flex-1 min-w-0 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-[10px] text-slate-700 outline-none focus:border-blue-400"
      />

      <button
        onClick={() => {
          fetchShipmentTracker(trackingId);
        }}
        disabled={trackingLoading || !trackingId.trim()}
        className="px-3 py-2 bg-blue-600 text-white rounded-lg text-[10px] font-semibold disabled:opacity-50"
      >
        {trackingLoading ? "..." : "Track"}
      </button>

    </div>
  </div>

  {/* LOADING */}
  {trackingLoading && (
    <div className="text-center py-5 text-[10px] text-slate-400">
      Loading shipment tracking...
    </div>
  )}

  {/* SHIPMENT TRACKING DATA */}
{!trackingLoading && shipmentTracker && (
  <>
    {/* HEADER */}
    <div className="flex justify-between items-start mb-2">

      <div>

        <div className={`font-bold text-xs ${HEADING}`}>
          {shipmentTracker.referenceNumber ||
            shipmentTracker.sbNumber ||
            trackingId ||
            "-"}
        </div>

        <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-1">

          <Flag
            country={shipmentTracker.route?.originCountry}
            size={11}
          />

          <span>
            {shipmentTracker.route?.originCity || "-"},{" "}
            {shipmentTracker.route?.originCountry || "-"}
          </span>

          <span>→</span>

          <Flag
            country={shipmentTracker.route?.destinationCountry}
            size={11}
          />

          <span>
            {shipmentTracker.route?.destinationCity || "-"},{" "}
            {shipmentTracker.route?.destinationCountry || "-"}
          </span>

        </div>

      </div>

      <StatusBadge
        status={
          shipmentTracker.shipmentStatus ||
          shipmentTracker.status ||
          "Pending"
        }
      />

    </div>


    {/* SHIPMENT DETAILS */}
    <div className="grid grid-cols-3 gap-2 mt-3 text-center">

      {/* CURRENT LOCATION */}
      <div>

        <span className="text-[9px] text-slate-400 font-semibold block">
          Current Location
        </span>

        <span className={`text-[11px] font-bold ${HEADING}`}>
          {shipmentTracker.liveTracking?.location?.city ||
            shipmentTracker.liveTracking?.location?.country ||
            shipmentTracker.currentLocation?.city ||
            shipmentTracker.currentLocation?.country ||
            shipmentTracker.route?.originCity ||
            "-"}
        </span>

      </div>


      {/* LAST UPDATED */}
      <div>

        <span className="text-[9px] text-slate-400 font-semibold block">
          Last Updated
        </span>

        <span className={`text-[11px] font-bold ${HEADING}`}>
          {shipmentTracker.liveTracking?.lastUpdate
            ? new Date(
                shipmentTracker.liveTracking.lastUpdate
              ).toLocaleString()
            : shipmentTracker.updatedAt
            ? new Date(
                shipmentTracker.updatedAt
              ).toLocaleString()
            : "-"}
        </span>

      </div>


      {/* ETA */}
      <div>

        <span className="text-[9px] text-slate-400 font-semibold block">
          ETA
        </span>

        <span className={`text-[11px] font-bold ${HEADING}`}>
          {shipmentTracker.eta
            ? new Date(
                shipmentTracker.eta
              ).toLocaleDateString()
            : "-"}
        </span>

      </div>

    </div>


    {/* TRACKING TIMELINE */}
    <div className="flex items-center justify-between mt-4">

      {shipmentTracker.trackingTimeline?.length > 0 ? (

        shipmentTracker.trackingTimeline.map((item, i) => (

          <div
            key={i}
            className="flex-1 flex flex-col items-center relative"
          >

            {i !== 0 && (
              <div
                className={`absolute top-2.5 right-1/2 w-full h-[2px] -z-10 ${
                  item.current
                    ? "bg-purple-500"
                    : "bg-slate-200"
                }`}
              />
            )}

            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center ${
                item.current
                  ? "bg-purple-600"
                  : "bg-slate-200"
              }`}
            >
              {item.current && (
                <Check
                  size={11}
                  className="text-white"
                />
              )}
            </div>

            <span
              className={`text-[8px] font-bold mt-1 text-center leading-tight ${
                item.current
                  ? "text-purple-600"
                  : "text-slate-400"
              }`}
            >
              {item.status || "-"}
            </span>

            <span className="text-[8px] text-slate-300">
              {item.createdAt
                ? new Date(
                    item.createdAt
                  ).toLocaleDateString()
                : "-"}
            </span>

          </div>

        ))

      ) : (

        <div className="w-full text-center">

          <div className="flex items-center justify-center gap-2">

            <div className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center">
              <Check
                size={11}
                className="text-white"
              />
            </div>

          </div>

          <p className="text-[9px] font-bold text-purple-600 mt-1">
            {shipmentTracker.shipmentStatus ||
              shipmentTracker.status ||
              "Pending"}
          </p>

          <p className="text-[8px] text-slate-300">
            {shipmentTracker.updatedAt
              ? new Date(
                  shipmentTracker.updatedAt
                ).toLocaleDateString()
              : "-"}
          </p>

        </div>

      )}

    </div>

  </>
)}
</SectionCard>
            <SectionCard>
              <div className="flex justify-between items-center mb-3">
                <h3 className={`font-bold text-sm ${HEADING}`}>Shipment Status Overview</h3>
                <DropdownButton text="This Month"   onClick={() => setDateRange(true)}/>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative w-[110px] h-[110px] shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={STATUS_OVERVIEW} innerRadius={32} outerRadius={50} dataKey="value" stroke="none">
                        {STATUS_OVERVIEW.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className={`font-black text-sm ${HEADING}`}> {dashboard.totalShipments || 0}</span>
                    <span className="text-[6px] text-slate-500 font-bold uppercase leading-none">Total Shipments</span>
                  </div>
                </div>
                <div className="space-y-1.5 flex-1 text-[10px]">
                  {STATUS_OVERVIEW.map((r, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: r.color }} />
                        <span className="text-slate-600 font-semibold">{r.name}</span>
                      </div>
                      <span className={`font-bold ${HEADING}`}>{r.value} ({r.percent})</span>
                    </div>
                  ))}
                </div>
              </div>
            </SectionCard>

          <SectionCard>
            <div className="flex justify-between items-center mb-3">
              <h3 className={`font-bold text-sm ${HEADING}`}>Shipments by Mode</h3>
              <DropdownButton text="This Month" onClick={() => setDateRange(true)} />
            </div>
            <div className="flex items-center gap-3">
              <div className="relative w-[110px] h-[110px] shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={SHIPMENTS_BY_MODE} innerRadius={32} outerRadius={50} dataKey="value" stroke="none">
                      {SHIPMENTS_BY_MODE.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className={`font-black text-sm ${HEADING}`}> {SHIPMENTS_BY_MODE.length}</span>
                    <span className="text-[6px] text-slate-500 font-bold uppercase leading-none">Modes</span>
                  </div>
              </div>
              <div className="space-y-1.5 flex-1 text-[10px]">
                {SHIPMENTS_BY_MODE.map((r, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: r.color }} />
                      <span className="text-slate-600 font-semibold">{r.name}</span>
                    </div>
                    <span className={`font-bold ${HEADING}`}>{r.value} ({r.percent})</span>
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>

        </div>

          </div>
        </div>

       
       )}
 
 
        {shipment === "shipment" && (
            <ShipmentForm setActiveTab={setActiveTab} setShipment={setShipment} currentTab={"Shipments"} editId={editShipmentId} />
          )}
      
     {showQuotation &&
  selectedShipment &&
  selectedQuotation && (
    <B2BQuotation
      shipment={selectedShipment}
      quotation={selectedQuotation}
      onClose={() => {
        setShowQuotation(false);
        setSelectedShipment(null);
        setSelectedQuotation(null);
      }}
      onAccept={async () => {
        try {
          const quotationId =
            selectedQuotation?._id;

          if (!quotationId) {
            alert("Quotation ID not found");
            return;
          }

          const res =
            await acceptQuotation(
              quotationId
            );

          console.log(
            "Quotation accepted:",
            res.data
          );

          const updatedQuotation =
            res.data?.data;

          setSelectedQuotation(
            updatedQuotation
          );

          alert(
            res.data?.message ||
            "Quotation accepted successfully"
          );

        } catch (error) {
          console.error(
            "ACCEPT QUOTATION ERROR:",
            error
          );

          throw error;
        }
      }}
      onReject={async (rejectionReason) => {
        try {
          const quotationId =
            selectedQuotation?._id;

          if (!quotationId) {
            alert("Quotation ID not found");
            return;
          }

          const res =
            await rejectQuotation(
              quotationId,
              rejectionReason
            );

          console.log(
            "Quotation rejected:",
            res.data
          );

          const updatedQuotation =
            res.data?.data;

          setSelectedQuotation(
            updatedQuotation
          );

          alert(
            res.data?.message ||
            "Quotation denied successfully"
          );

        } catch (error) {
          console.error(
            "REJECT QUOTATION ERROR:",
            error
          );

          throw error;
        }
      }}
    />
  )}
{showShipmentView && viewShipmentId && (
  <ViewShipment
    shipmentId={viewShipmentId}
    onBack={() => {
      setShowShipmentView(false);
      setViewShipmentId(null);
    }}
    onEdit={() => {
      setEditShipmentId(viewShipmentId);
      setShowShipmentView(false);
      setViewShipmentId(null);
      setShipment("shipment");
    }}
  />
)}

        {highRisk && (<RecentHighRiskAlertsModal onClose={() => setHighRisk(false)}/>)}

          {dateRange && (
            <DateRangeModal onClose={() => setDateRange(false)}/>
          )}

          {exportReport && (
            <ExportReport onClose={() => setExportReport(false)} />
          )}

          {/* IMPORTANT: pass `open` explicitly - the modal returns null internally
              if `open` is falsy, regardless of this conditional wrapper */}
          {showTrackingModal && (
            <ShipmentTrackingModal
              open={showTrackingModal}
              shipmentId={trackingShipmentId || trackingId}
              onClose={() => setShowTrackingModal(false)}
            />
          )}
      
    </div>
  );
}