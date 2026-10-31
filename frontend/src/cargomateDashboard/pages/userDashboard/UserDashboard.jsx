import AccountProfile, {AccountBadge} from "../../../components/AccountProfile";
import React, { useState, useRef, useEffect } from "react";
import DashboardAdPlacement from "../../components/DashboardAdPlacement";
import logo from "../../assets/Images/logo.png";
import axios from "axios";
// import { FiAlertCircle } from "react-icons/fi";


import { FaRupeeSign } from "react-icons/fa";

import {  FiX,
  FiAlertTriangle,
  FiEdit3,
  FiLink2,
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
    FiAward,
  FiShoppingCart,
  FiFolder,
  FiPercent,
  FiZap,
  FiEye,
  FiCheckCircle,
  FiExternalLink,
  FiCalendar, FiChevronDown,
  FiUploadCloud,
  FiWifi,
  FiMapPin, FiPhone, FiSearch, FiMail, FiSun
} from "react-icons/fi";
import Shipment from "../../components/ShipmentForm"
import calculator from "../../assets/Images/webp/calculator.webp"
import checker from "../../assets/Images/webp/checker.webp"
import shipment from "../../assets/Images/webp/shipment.webp"
import Chatbot from "../../components/Chatbot"

import { BsAirplane } from "react-icons/bs";
import { MdOutlineRocketLaunch } from "react-icons/md";
import HSCodeLookup from "./HsCodeLookUp";
import IncentiveChecker from "./IncentiveChecker";
import ShipmentPlanning from "./ShipmentPlanning";
import FreightCalculator from "./FreightCalculator";
import AiCargoMateAssistant from "./AiCargoMateAssistant";

import robot from "../../assets/Images/webp/robot.webp";

import {
  MdMenu,
  MdLocalShipping,
  MdDescription,
  MdPsychology,
  MdPayments,
  MdDoubleArrow,
  MdBolt,
  MdAdd,
  MdForum,
  MdCloudUpload,
  MdMyLocation,
  MdCalculate,
  MdSavings,
  MdHelp,
  MdDownload,
  MdTrendingFlat,
  MdCheckCircle,
  MdStorage,
  MdApi,
  MdSync,
  MdDashboard,
  MdSettings,
  MdArrowUpward,
  MdQrCode2,
  MdCheckroom,
  MdPerson,
} from "react-icons/md";


import { FaAnchor, FaShip } from "react-icons/fa";

import { MdMonitor } from "react-icons/md";

import SavedReports from "./SavedReport";
import Saved from "./Saved"

import AuditLogs from "./AuditLogs";
import AnalyticsTrends from "./Analysis&Trends";

import UpgradePlan from "./UpgradePlan";
import Subscription from "./Subscription";
import NotificationDashboard from "./Notification";
import HelpSupportDashboard from "./Help&Support";
import ProfileSettingsDashboard from "./ProfileSettings";
import { useNavigate } from "react-router-dom";
import MessagesModal from "../../components/Messages";
import NotificationsModal from "../../components/Notifications";
import FreightCalculatorModal from "../../components/FreightCalculator";
import IncentivesCheckerModal from "../../components/IncentiveChecker";
import TrackShipmentModal from "../../components/userComponent/TrackShipment";
import UploadDocumentationModal from "../../components/userComponent/UploadDocumentation";
import EditAdditionalInformation from "../../components/userComponent/EditAdditionalInformation";
import EditGoodsInformation from "../../components/userComponent/EditGoodsInformation";
import EditPartiesInformation from "../../components/userComponent/EditPartiesInformation";
import BookShipment from "../../components/userComponent/BookShipment";
import TrackShipment from "../../components/userComponent/TrackShipment";
import FullDisclaimer from "../../components/userComponent/FullDisclaimer";
import RiskInsights from "../../components/userComponent/RiskInsights"
import SharePlan from "../../components/userComponent/SharePlan";
import CertificateOfOrigin from "../../components/userComponent/CertificateOfOrigin";
import NewQueryModal from "../../components/userComponent/NewQuery";
import ViewTradeInformation from  "../../components/userComponent/ViewTradeInformation"
import ViewShipmentEligibility from "../../components/userComponent/ViewShipmentEligibility";
import VendorInsightsDetailedAnalytics from "../../components/userComponent/VendorInsightDetailAnalytics";
import ShareReportModal from "../../components/userComponent/ShareReport";
import SaveReportModal from "../../components/userComponent/SaveReport";
import ResultSummaryModal from "../../components/userComponent/ResultSummary";
import PartnerAnalysis from "../../components/userComponent/PartnerAnalysis";
import FiltersModal from "../../components/userComponent/Filters";
import DownloadReportModal from "../../components/userComponent/DownloadReport";
import DataSourceModal from "../../components/userComponent/DataSource";
import AuditLogSettingsModal from "../../components/userComponent/AuditLogSettings";
import AllDecliningCountriesModal from "../../components/userComponent/AllDecliningCountries";

import AllPortsOfArrivalModal from "../../components/userComponent/AllPortsOfArrival";

import AISmartSummary from "../../components/userComponent/AiSmartSummary";
import UploadDocumentModal from "../../components/userComponent/UploadDocument";
import AllDocumentsTemplateModal from "../../components/userComponent/AllDocumentTemplate";
import CostBreakdownModal from "../../components/userComponent/CostBreakDown";
import FullRouteScheduleModal  from "../../components/userComponent/FullRouteSchedule";
import InsightsModal from "../../components/userComponent/Insights";
import WeightVolumeSummaryModal from "../../components/userComponent/WeightVolumeSummary";

import FullDocumentsModal from "../../components/userComponent/FullDocument";

import StorageDetailsModal from "../../components/userComponent/StorageDetails";





const C = {
  primary: "#00685f",
  secondary: "#006398",
  tertiary: "#a33900",
  bg: "#f8f9ff",
  surface: "#f8f9ff",
  onSurface: "#0d1c2e",
  onSurfaceVariant: "#3d4947",
  outlineVariant: "#bcc9c6",
  scLowest: "#ffffff",
  scLow: "#eff4ff",
  sc: "#e6eeff",
  scHigh: "#dce9ff",
  scHighest: "#d5e3fc",
  error: "#ba1a1a",
  errorContainer: "#ffdad6",
  tertiaryFixed: "#ffdbce",
  tertiaryContainer: "#cc4900",
  primaryFixed: "#89f5e7",
  secondaryFixed: "#cce5ff",
};

function StatCard({ label, value, change, iconBg, icon: Icon, iconColor }) {
  return (
    <div
      className=" flex-1 min-w-0 p-3 rounded-xl border shadow-sm"
      style={{ backgroundColor: C.scLowest, borderColor: C.outlineVariant }}
    >
      <div className="flex justify-between items-start mb-2">
        <span
          className="text-sm  font-semibold  leading-4"
          // style={{ color: C.onSurfaceVariant }}
        >
          {label}
        </span>
      </div>
      <div className="flex justify-between " style={{ color: C.onSurface }}>
        <div className="text-2xl font-bold  "> {value}</div>
        <div className="p-1 rounded-lg" style={{ backgroundColor: iconBg }}>
          <Icon size={22} style={{ color: iconColor }} />
        </div>
      </div>
      <div className="flex items-center gap-1 mt-1 text-[#00A63E]">
        <MdArrowUpward size={10} className="" />
        <span className="text-[10px] font-normal">{change}</span>
      </div>
    </div>
  );
}

function QuickActionBtn({ id,icon: Icon, label, bgcolor, textColor }) {
   
  const [active, setActive] = useState("")

  return (
    <> 
     <button
      className="flex flex-col items-center gap-1 group"
      style={{ backgroundColor: bgcolor }}
    >
      <div onClick={() => setActive(id)} className="w-full  aspect-square rounded-xl flex  flex-col items-center justify-center transition-colors">
        <Icon size={24} style={{ color: textColor }} />
        <span className="text-[10px] text-center font-bold px-2 py-1 rounded-md">
          {label}
        </span>
      </div>
    </button>
   
      {active === "freight" && (
        <FreightCalculatorModal onClose={() => setActive(null)} />
      )}

       {active === "upload" && (
        <UploadDocumentationModal onClose={() => setActive(null)} />
      )}
      {active === "track" && (
        <TrackShipmentModal onClose={() => setActive(null)} />
      )}
      {active === "incentives" && (
        <IncentivesCheckerModal onClose={() => setActive(null)} />
      )} 
      
    </>
   
  );
}

function ActivityItem({
  dotColor,
  iconBg,
  icon: Icon,
  iconColor,
  title,
  subtitle,
  time,
  tag,
}) {
  return (
    <div
      className="flex gap-3 sm:gap-4 pb-4 sm:px-0 px-5 relative items-center  justify-around"
      style={{ borderColor: C.outlineVariant }}
    >
      <div className="p-2  rounded-lg h-fit" style={{ backgroundColor: iconBg }}>
         {typeof Icon === "string" ? (
        <img src={Icon || null} alt="icon" className="w-5 h-5" />
      ) : (
        React.createElement(Icon, {
          size: 22,
          style: { color: iconColor },
        })
      )}

      </div>
      <div className="flex-1 justify-">
        <div className="font-normal text-sm" style={{ color: C.onSurface }}>
          {title}
        </div>
        {subtitle && (
          <p className="text-[11px]" style={{ color: C.onSurfaceVariant }}>
            {subtitle}
          </p>
        )}
        <div className="text-[10px] mt-1" style={{ color: C.onSurfaceVariant }}>
          {time}
        </div>
        {tag && (
          <div className="flex items-center gap-1 mt-1 text-[10px] font-bold text-[#00A63E]">
            <MdCheckCircle size={12} />
            {tag}
          </div>
        )}
      </div>
    </div>
  );
}

function DetailCard({ tag, title, children, setShipment, setActiveTab }) {
  const [active ,setActive ] = useState("")
  const [value, setValue] = useState("")

  return (
    <div
      className="p-4 rounded-xl border flex flex-col justify-between"
      style={{ backgroundColor: C.scLowest, borderColor: C.outlineVariant }}
    >
      <div className="flex flex-col    mb-4">
        <div className="flex  justify-between">
          <h4 className="text-sm font-bold">{title}</h4>
          <button className="text-[10px] font-bold uppercase text-[#00A896]">
            View All
          </button>
        </div>
        <div className="flex justify-start">
          <span className="text-[10px] font-bold uppercase text-[#94A3B8]">
            {tag}
          </span>
        </div>
      </div>
      <div> 
      {children}</div>
     <div> 
      <button onClick={() => {
                  setShipment('shipment')
                       setActiveTab("")
            } }
              className="w-full py-2 mb-2  font-bold rounded-lg text-[9px] text-white bg-[#0FB5A9]">
        Create Shipment from this result
      </button>
      <button  onClick={() => setActive("report")} className="w-full text-xs flex items-center text-[#2563EB] justify-center gap-2 font-bold  ">
        <MdDownload size={16} className="" /> Download Report (PDF)
      </button>
      </div>


      {active === "report" && (
        <DownloadReportModal onClose={() => setActive(null)} setValue={setValue}  value={value}/>
      )}

       

    </div>
  );
}



const sidebarSections = [
  
  {
    title: "AI & Trade Tools",
    items: [
      {
        icon: FiCpu,
        label: "AI Chatbot",
        badgeColor: "bg-teal-500",
      },
      {
        icon: FiCpu,
        label: "AI CargoMate Assistant",
        badge: "",
        badgeColor: "bg-teal-500",
      },
      { icon: FiHash, label: "HS Code Lookup" },
      { icon: FiGift, label: "Incentive Checker" },
      { icon: FiTruck, label: "Freight Calculator" },
      { icon: FiMap, label: "Shipment Planning" },
      {
        icon: FiBookmark,
        label: "Saved",
        // badge: "New",
        badgeColor: "bg-[#2B7FFF]",
      },
      // { icon: FiClipboard, label: "Audit Logs" },
      // { icon: FiBarChart2, label: "Analytics & Trends" },
    ],
  },
  // {
  //   title: "Reports & Insights",
  //   items: [
  //     {
  //       icon: FiBookmark,
  //       label: "Saved",
  //       // badge: "New",
  //       badgeColor: "bg-[#2B7FFF]",
  //     },
  //     // { icon: FiClipboard, label: "Audit Logs" },
  //     // { icon: FiBarChart2, label: "Analytics & Trends" },
  //   ],
  // },
  {
    title: "Account & Support",
    items: [
      {
        icon: FiCreditCard,
        label: "Subscription",
        badge: "Pro Plan",
        badgeColor: "bg-[#00BBA7]",
      },
      {
        icon: FiBell,
        label: "Notifications",
        badge: "",
        badgeColor: "bg-red-500",
      },
      { icon: FiHelpCircle, label: "Help & Support" },
      // { icon: FiSettings, label: "Profile Settings" },
    ],
  },
];

function Field({ label, placeholder, select }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-900 mb-1.5">
        {label}
      </label>
      {select ? (
        <div className="relative">
          <select className="w-full appearance-none border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500">
            <option>{placeholder}</option>
          </select>
          <FiChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
        </div>
      ) : (
        <input
          type="text"
          placeholder={placeholder}
          className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      )}
    </div>
  );
} 

function SectionCard({ number, title, subtitle, children }) {
  return (
    <div className="bg-white grid grid-cols-1 border border-gray-200 rounded-xl p-2 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
          {number}
        </span>
        <h3 className="text-sm font-bold  text-gray-900">{title}</h3>
      </div>
      {subtitle && (
        <p className="text-xs text-gray-500 whitespace-nowrap mt-1 ml-7">{subtitle}</p>
      )}
      <div className="mt-4 space-y-4">{children}</div>
    </div>
  );
}
 
function Label({ children }) {
  return (
    <label className="block text-xs xl:text-[11px]  font-semibold text-gray-700 mb-1">
      {children}
      <span className="text-red-500 ml-0.5">*</span>
    </label>
  );
}
 
function Input({ label, placeholder, value, required = true }) {
  return (
    <div>
      {required ? (
        <Label>{label}</Label>
      ) : (
        <label className="block text-xs whitespace-nowrap font-semibold text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        type="text"
        defaultValue={value}
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
 
function DateInput({ label }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          placeholder="Select date"
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <FiCalendar
          size={14}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>
    </div>
  );
}
 
function Select({ label, placeholder, required = true }) {
  return (
    <div>
      {required ? (
        <Label>{label}</Label>
      ) : (
        <label className="block text-xs font-semibold text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <select className="w-full appearance-none border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>{placeholder}</option>
        </select>
        <FiChevronDown
          size={14}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
        />
      </div>
    </div>
  );
}
 
function RadioGroup({ label, defaultValue = "no" }) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="flex items-center gap-4 mt-2">
        <label className="flex items-center gap-1.5 text-sm text-gray-700">
          <input
            type="radio"
            className="accent-blue-600"
            defaultChecked={defaultValue === "yes"}
          />
          Yes
        </label>
        <label className="flex items-center gap-1.5 text-sm text-gray-700">
          <input
            type="radio"
            className="accent-blue-600"
            defaultChecked={defaultValue === "no"}
          />
          No
        </label>
      </div>
    </div>
  );
}
 
function Grid2({ children }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">{children}</div>;
}
 
const docTypes = [
  { label: "Commercial Invoice", icon: FiFileText, color: "text-blue-600 bg-blue-50" },
  { label: "Packing List", icon: FiClipboard, color: "text-orange-600 bg-orange-50" },
  { label: "MSDS", icon: FiAward, color: "text-purple-600 bg-purple-50" },
  { label: "COO", icon: FiAward, color: "text-green-600 bg-green-50" },
  { label: "IEC / GST", icon: FiCreditCard, color: "text-blue-600 bg-blue-50" },
  { label: "Purchase Order", icon: FiShoppingCart, color: "text-orange-600 bg-orange-50" },
  { label: "Product Certificate", icon: FiAward, color: "text-purple-600 bg-purple-50" },
  { label: "Other Documents", icon: FiFolder, color: "text-gray-500 bg-gray-100" },
];

 
const aiTopStats = [
  { label: "Suggested HS Code", value: "8517.12.00", color: "bg-blue-50 text-blue-700" },
  { label: "Required Documents", value: "7 Documents", color: "bg-green-50 text-green-700" },
  { label: "Freight Estimate", value: "₹24,860", color: "bg-orange-50 text-orange-700" },
  { label: "RoDTEP / Incentive", value: "Eligible (2.5%)", color: "bg-purple-50 text-purple-700" },
];
 
const aiBottomStats = [
  { label: "Compliance Requirements", value: "12", sub: "Requirements" },
  { label: "Risk Score", value: "Low Risk", sub: "(18/100)", green: true },
  { label: "Estimated Timeline", value: "8-10 Days" },
  { label: "Recommended Action", value: "Proceed with Booking", green: true },
];
 
   const modals = [
    { key: "report", label: "Download Report" },
    { key: "freight", label: "Freight Calculator" },
    { key: "upload", label: "Upload Documentation" },
    { key: "track", label: "Track Shipment" },
    { key: "incentives", label: "Incentives Checker" },
  ];

  const navItems = [
    { icon: MdDashboard, label: "Dashboard" },
    { icon: MdLocalShipping, label: "Shipments" },
    { icon: MdDescription, label: "Documents" },
    { icon: MdMonitor, label: "Analytics" },
    { icon: MdSettings, label: "Settings" },
  ];

  const statCards = [
    {
      label: "Active Shipments",
      value: "18",
      change: "12% vs last month",
      iconBg: C.scHigh,
      icon: MdLocalShipping,
      iconColor: C.primary,
    },
    {
      label: "Pending Docs",
      value: "7",
      change: "8% vs last month",
      iconBg: C.tertiaryFixed,
      icon: MdDescription,
      iconColor: C.tertiary,
    },
    {
      label: "AI Queries Left",
      value: "42/100",
      change: "8% vs last month",
      iconBg: C.scHighest,
      icon: MdPsychology,
      iconColor: C.secondary,
    },
    {
      label: "Incentives",
      value: "₹86,420",
      change: "10% vs last month",
      iconBg: C.primaryFixed,
      icon: MdPayments,
      iconColor: C.primary,
    },
  ];

  const quickActions = [
    // {
    //   id: "shipment",
    //   icon: MdAdd,
    //   label: "Create Shipment",
    //   bgcolor: "#F0FDFA",
    //   textColor: "#00A896",
    // },
    {
      id:"cargo",
      icon: MdForum,
      label: "Ask CargoMate",
      bgcolor: "#F0FDFA",
      textColor: "#2563EB",
    },
    {
      id:"upload",
      icon: MdCloudUpload,
      label: "Upload Docs",
      bgcolor: "#FFF7ED",
      textColor: "#F97316",
    },
    {
      id: "track",
      icon: MdMyLocation,
      label: "Track Shipment",
      bgcolor: "#F0FDFA",
      textColor: "#4F46E5",
    },
    {
      id:"freight",
      icon: MdCalculate,
      label: "Freight Calculation",
      bgcolor: "#F0FDFA",
      textColor: "#0891B2",
    },
    {
      id:"incentives",
      icon: MdSavings,
      label: "Incentive Checker",
      bgcolor: "#FDF2F8",
      textColor: "#DB2777",
    },
  ];

  const shipments = [
    {
      id: "AS0-2025-104",
      route: "Nhava Sheva - Dubai",
      status: "Transit",
      statusBg: C.scHigh,
      statusColor: C.secondary,
      eta: "29 Apr 2025",
      mode: "Sea",
      vendor: "Oceanic Logistics",
      amount: "₹1,24,860",
    },
    {
      id: "ASD-2025-103",
      route: "Delhi - New York",
      status: "Delayed",
      statusBg: C.errorContainer,
      statusColor: C.error,
      eta: "27 Apr 2025",
      mode: "Air",
      vendor: "SkyFreight Global",
      amount: "₹2,48,600",
    },
    {
      id: "ASD-2025-102",
      route: "Mumbai - London",
      status: "Pending",
      statusBg: C.tertiaryFixed,
      statusColor: C.tertiary,
      eta: "30 Apr 2025",
      mode: "Sea",
      vendor: "SwiftLogix",
      amount: "₹98,450",
    },
    {
      id: "ASD-2025-101",
      route: "Mumbai - London",
      status: "Delivered",
      statusBg: C.tertiaryFixed,
      statusColor: C.tertiary,
      eta: "30 Apr 2025",
      mode: "Sea",
      vendor: "SwiftLogix",
      amount: "₹98,450",
    },
  ];

export default function UserDashboard({profileMode=false}) {
  const navigate = useNavigate();
   
    const [active, setActive] = useState(null);
  const [activeTab, setActiveTab] = useState("AI CargoMate Assistant");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [analysisTab, setAnalysisTab] = useState("HS Code Analysis");
  // const content = tabContent[analysisTab];
    const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [activeNav, setActiveNav] = useState(0);
   const [shipment, setShipment] = useState("")
   const [auditLogs, setAuditLogs] = useState(false)
 

  const userAdLocationByTab = {
    "AI Chatbot": "User Dashboard - AI Chatbot",
    "AI CargoMate Assistant": "User Dashboard - AI CargoMate Assistant",
    "HS Code Lookup": "User Dashboard - HS Code Lookup",
    "Incentive Checker": "User Dashboard - Incentive Checker",
    "Freight Calculator": "User Dashboard - Freight Calculator",
    "Shipment Planning": "User Dashboard - Shipment Planning",
    "Saved": "User Dashboard - Saved",
    "Subscription": "User Dashboard - Subscription",
    "Notifications": "User Dashboard - Notifications",
    "Help & Support": "User Dashboard - Help & Support",
  };
  const activeAdLocation = userAdLocationByTab[activeTab];

  return (
    <div className="flex h-screen bg-gray-100  ">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <header className="fixed top-0 w-full z-30 pr-3 bg-white border-b border-gray-200     py-0 flex items-center gap-3  ">
        <button
          className="lg:hidden p-1.5 pl-4 rounded-md hover:bg-gray-100 text-gray-600"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <MdMenu size={18} />
        </button>

        <div className="lg:flex  items-center sm:w-60 hidden  justify-center gap-2 px-4 py-2   ">
          <img src={logo} className="h-10" onClick={() => navigate("/")} />
        </div>

        <div className="flex items-center gap-1.5 ml-auto">
          <button    onClick={() => setShowNotifications(true)} className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 relative">
            <FiBell size={16} />
            <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
          </button>
          <button   onClick={() => setShowMessages(true)} className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600">
            <FiMail size={16} />
          </button>
         
          <AccountBadge />
        </div>
      </header>

      <aside
        className={`
          fixed lg:sticky top-14 bottom-0 lg:top-16   left-0  z-20 w-60  
           bg-white text-white flex flex-col sm:h-[calc(104vh-5rem)]  h-[calc(105vh-5rem)]
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 flex-shrink-0
        `}
      >
        <nav className="flex-1 overflow-y-auto py-3  bg-gray-900 pr-2">
           {/* <button className="w-full hover:bg-teal-500 hover:text-white px-4 py-2 flex items-center gap-2 text-[#8aa0bc] rounded-r-lg text-xs text-left transition-colors" onClick={() => setActiveTab("AI CargoMate Chatbot")} >
              AI CargoMate Chatbot</button> */}

          {sidebarSections.map((section) => (
            <div key={section.title} className="  " >
              
              <p
                onClick={() => {
                  if (section.items.length === 0) {
                    setActiveTab(section.title);
                  }
                }}
                className={`px-4 py-2 text-[0.7rem] font-normal cursor-pointer uppercase tracking-widest
                    ${section.items.length === 0 && activeTab === "AI CargoMate Assistant" ? " bg-teal-500 rounded-r-lg text-white" : "text-white hover:bg-teal-500 rounded-r-lg hover:text-white"}
                  `}
              >
                {section.title}
              </p>
              {section.items.map(({ icon: Icon, label, badge, badgeColor }) => (
                <button
                  key={label}
                  className={`w-full   flex items-center gap-2  rounded-r-lg text-xs text-left transition-colors
                    ${
                      activeTab === label
                        ? "bg-teal-500 text-white rounded-r-lg "
                        : "text-[#8aa0bc] hover:bg-teal-500 hover:text-white rounded-r-lg"
                    }`}
                      onClick={() => {
                        setActiveTab(label);
                        setSidebarOpen(false);
                      }}
                >
                  <div className=" flex gap-3 px-4 py-2">
                    <Icon className="text-base  flex-shrink-0" />
                    <span
                    
                      className="flex-1 font-normal text-xs  truncate  "
                    >
                      {label}
                    </span>
                    {badge && (
                      <span
                        className={`${badgeColor} text-white text-[9px] px-1.5 py-0.5 rounded-full font-normal`}
                      >
                        {badge}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          ))}
          <div className="bg-[##152A4E] rounded-xl p-4 text-white flex flex-col">
            <h3 className="text-sm font-semibold mb-4">AI Queries Left</h3>

            <div className="text-center mt-4">
              <p className="text-lg font-bold">42 / 100</p>
              <p className="text-xs text-slate-300 mt-1">
                Monthly Queries Remaining
              </p>
            </div>

            <button
              onClick={() => setActiveTab("UpgradePlan")}
              className="mt-4 bg-teal-500 hover:bg-teal-600 text-white text-xs font-semibold py-2 rounded-lg"
            >
              Upgrade Plan
            </button>
          </div>
        </nav>
      </aside>

      <main className=" w-full overflow-auto ">
        {profileMode ? <AccountProfile embedded /> : <>{activeTab === "AI Chatbot" && <Chatbot />}
        {activeTab === "AI CargoMate Assistant" && <AiCargoMateAssistant />}

        {activeTab === "HS Code Lookup" && <HSCodeLookup />}
        {activeTab === "Incentive Checker" && <IncentiveChecker />}
        {activeTab === "Shipment Planning" && <ShipmentPlanning setActiveTab={setActiveTab} activeTab={activeTab} />}
        {activeTab === "Freight Calculator" && <FreightCalculator />}

        {activeTab === "Saved" && <Saved />}
         {/* {activeTab === "Audit Logs" && <AuditLogs />}
        {activeTab === "Analytics & Trends" && <AnalyticsTrends />} */}
        {activeTab === "AI CargoMate Chatbot" && <Chatbot />}
      
       

        {activeTab === "Subscription" && <Subscription onChangePlan={() => setActiveTab("UpgradePlan")} />}
        {activeTab === "Notifications" && <NotificationDashboard />}
        {activeTab === "Help & Support" && <HelpSupportDashboard />}
        {/* {activeTab === "Profile Settings" && <ProfileSettingsDashboard />} */}

        {activeTab === "UpgradePlan" && <UpgradePlan />}</>}

         {showNotifications && (
        <NotificationsModal onClose={() => setShowNotifications(false)} />
        )}
      {showMessages && <MessagesModal onClose={() => setShowMessages(false)} />}


       {
        shipment === "shipment" && (
          <div>
            <Shipment setActiveTab={setActiveTab} setShipment={setShipment}  currentTab={"Dashboard"}/>
          </div>
        )
       }


       {auditLogs && (
        <AuditLogSettingsModal onClose={() => setAuditLogs(false)} />
       )}
      

      </main>
    </div>
  );
}

